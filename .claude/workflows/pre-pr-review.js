export const meta = {
  name: 'pre-pr-review',
  description: 'Gate di review pre-PR del portfolio: classifica il diff, fa fan-out parallelo dei subagent di review condizionato ai file toccati, verifica avversariale dei soli CRITICAL, e produce una sintesi unica con stato di copertura. Passa la base branch via args.base (default: develop).',
  phases: [
    { title: 'Scope', detail: 'classifica il diff del branch corrente verso la base' },
    { title: 'Review', detail: 'fan-out parallelo: reviewer + docs-sync sempre; design-system-checker se il diff tocca la UI; Codex e Copilot (CLI locali dirette) come revisori eterogenei se il diff non è banale' },
    { title: 'Verify', detail: 'verifica avversariale indipendente dei soli finding CRITICAL' },
  ],
}

// Robustezza d'invocazione (2026-08-18): args arriva spesso come STRINGA ("base=X dir=Y …")
// e il gate deve poter girare in un WORKTREE — la cwd di default degli agenti è il checkout
// principale della sessione, che può non contenere il branch in esame: due run sono andati
// a vuoto su develop proprio per questo.
const argObj = (typeof args === 'string')
  ? Object.fromEntries([...args.matchAll(/(\w+)=([^\s]+)/g)].map((m) => [m[1], m[2]]))
  : (args || {})
const base = argObj.base || 'develop'
const dir = argObj.dir || null
const preamble = dir
  ? `PRIMA DI TUTTO esegui \`cd ${dir}\`: il repository da esaminare è QUEL worktree, non la cwd di default — ogni comando git e ogni lettura di file avviene lì. `
  : ''

const SCOPE_SCHEMA = {
  type: 'object',
  properties: {
    base: { type: 'string' },
    changedFiles: { type: 'array', items: { type: 'string' } },
    touchesUi: { type: 'boolean' },
    codexWorthy: { type: 'boolean' },
    diffSummary: { type: 'string' },
  },
  required: ['base', 'changedFiles', 'touchesUi', 'codexWorthy', 'diffSummary'],
}

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    dimension: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['critical', 'warning', 'info'] },
          file: { type: 'string' },
          line: { type: 'string' },
          issue: { type: 'string' },
          evidence: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['severity', 'issue'],
      },
    },
    summary: { type: 'string' },
  },
  required: ['dimension', 'findings', 'summary'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    confirmed: { type: 'boolean' },
    reasoning: { type: 'string' },
  },
  required: ['confirmed', 'reasoning'],
}

phase('Scope')
const scope = await agent(
  `${preamble}Classifica il diff del branch Git corrente verso la base \`${base}\`. Con Bash:
- \`git diff --name-only ${base}...HEAD\` (se \`${base}\` non è disponibile in locale, prova \`origin/${base}\`, altrimenti il merge-base con \`origin/HEAD\`; riporta la base effettiva usata).
- \`git diff --stat ${base}...HEAD\` per un riassunto.
Poi determina i flag:
- touchesUi = il diff tocca file \`app/**/*.vue\`, il CSS del tema in \`app/assets/\`, \`app/app.config.ts\` o \`DESIGN.md\`
- codexWorthy = merita un secondo parere Codex? true se il diff tocca logica di codice significativa (\`nuxt.config.ts\`, build e generazione statica, pipeline foto e metadati, script, workflow CI/Pages, composable o componenti con logica) OPPURE supera ~40 righe di codice reale; false se piccolo o solo cosmetico (docs, copy, formattazione, rename, config minima).
Ritorna SOLO l'oggetto SCOPE_SCHEMA (base effettiva, changedFiles, i flag inclusi codexWorthy, diffSummary conciso).`,
  { schema: SCOPE_SCHEMA, label: 'scope', phase: 'Scope' }
)

const effectiveBase = scope.base || base
const reviewInstruction = (extra) =>
  `${preamble}Rivedi le modifiche del branch corrente verso \`${effectiveBase}\` (usa \`git diff ${effectiveBase}...HEAD\` e leggi i file toccati). ${extra} Esegui il tuo mandato come da tua definizione e mappa OGNI rilievo nello schema strutturato: severity (critical=violazione di regola non negoziabile o bug certo in produzione; warning=da correggere prima del merge; info=stile), file, line, issue, evidence (cosa hai trovato), fix. Niente CRITICAL senza evidenza concreta \`file:riga\`. dimension = il tuo nome.`

phase('Review')
const candidates = [
  { key: 'reviewer', agentType: 'reviewer', run: true, extra: 'Concentrati su bug e violazioni delle regole del progetto (solo generazione statica, niente segreti, niente GPS nelle foto pubblicate, README.md intoccato, HTML semantico e foto come vere immagini, performance, YAGNI).' },
  // docs-sync nel gate lavora in SOLA SEGNALAZIONE: dentro il fan-out parallelo le scritture
  // ai doc creerebbero race col working tree condiviso — le correzioni le applica il main loop.
  { key: 'docs-sync', agentType: 'docs-sync', run: true, extra: 'Verifica che docs/, .specdd/ e i file .sdd riflettano il diff (skill docs-update: docs/TODO.md, docs/agents-changelog.md, documenti di docs/ toccati, spec e tasks pertinenti, app.sdd). In QUESTO gate NON applicare modifiche e NON usare git in scrittura: segnala ogni disallineamento come finding (file, cosa è stantio, correzione proposta nel campo fix). Escludi docs/discovery/ (storico del brainstorming).' },
  { key: 'design-system-checker', agentType: 'design-system-checker', run: scope.touchesUi, extra: 'Il diff tocca la UI: verifica aderenza a Nuxt UI / DESIGN.md, semantica, accessibilità e docs/coding-style.md.' },
]
const active = candidates.filter((c) => c.run)
const skipped = candidates.filter((c) => !c.run).map((c) => c.key)
log(`Base: ${effectiveBase} · dimensioni attivate: ${active.map((c) => c.key).join(', ')}${skipped.length ? ` · saltate (diff non pertinente): ${skipped.join(', ')}` : ''}`)

// Revisori eterogenei LOCALI (Codex, famiglia GPT + Copilot), solo se il diff non è banale.
// Partono in concorrenza con i reviewer Claude e degradano a null in headless/CI o su timeout.
//
// IMPORTANTE (diagnosi 2026-07-23): si invocano le CLI DIRETTAMENTE (`codex exec review`,
// `copilot -p`), NON il runtime companion async di Codex (il vecchio agentType
// `codex:codex-rescue`). Quel companion si impianta sistematicamente in fase "verifying"
// (`thread not found`, job zombie) e non ritorna mai; la CLI diretta è sincrona, trasparente
// e ha dato review complete nei test. Entrambe read-only.
//
// Il `preamble` del worktree va prefissato ANCHE a questi due prompt (e passato a Copilot via
// `-C`): girano nella cwd di default come gli altri agenti, e se quel checkout è sulla base il
// loro `git diff ${base}...HEAD` è vuoto — review «senza rilievi» su un diff mai letto.
const codexPromise = scope.codexWorthy
  ? agent(
      `${preamble}Sei l'esecutore di una review CODEX LOCALE per il portfolio (motore GPT, secondo parere eterogeneo). Esegui via Bash, con timeout ampio (usa il massimo consentito, ~600000 ms), ESATTAMENTE questo comando dalla root del repo (se il preambolo qui sopra indica un worktree, la root è QUELLA):
\`codex exec review --base ${effectiveBase} -m gpt-5.6-sol\`
Se \`${effectiveBase}\` non è disponibile in locale, usa \`origin/${effectiveBase}\`. NON aggiungere un prompt custom: in questa versione della CLI \`--base\` e il prompt sono mutuamente esclusivi. La review è read-only.
Restituisci INTEGRALE l'output della review di Codex (tutti i finding P1/P2/…) senza filtrarlo né riassumerlo. Se il comando \`codex\` non esiste, fallisce o va in timeout, restituisci esattamente "CODEX_UNAVAILABLE: <motivo sintetico>".`,
      { agentType: 'general-purpose', label: 'review:codex', phase: 'Review' }
    ).catch(() => null)
  : Promise.resolve(null)

const copilotPromise = scope.codexWorthy
  ? agent(
      `${preamble}Sei l'esecutore di una review COPILOT LOCALE per il portfolio (GitHub Copilot CLI, secondo parere eterogeneo). Esegui via Bash, con timeout ampio (~600000 ms), READ-ONLY. Per evitare problemi di escaping scrivi il prompt in un file temporaneo e passalo, poi lancia dalla root del repo (se il preambolo qui sopra indica un worktree, la root è QUELLA):
\`copilot -p "$(cat <file-prompt>)" --allow-all-tools --deny-tool write -C "${dir || '<root-assoluta-del-repo>'}"\`
Il PROMPT deve chiedere: «Rivedi il diff \`git diff ${effectiveBase}...HEAD\` e i file toccati. SOLO bug reali di correttezza/sicurezza (HIGH/MED), niente stile. Regole del progetto: sito Nuxt generato in statico (nuxt generate, upload FTP, nessun runtime server in produzione); mai segreti o variabili private nel bundle client; nessuna coordinata GPS nelle foto o nei dati pubblicati; README.md non si tocca; foto come vere <img> con alt. Focus: generazione statica, privacy e segreti, pipeline foto, accessibilità e SEO di base, performance delle immagini. Output: Summary (1 frase), Issues [HIGH/MED] descrizione -> fix, Positives brevi. Se non trovi nulla di rilevante, dillo.»
Verifica a fine run che il working tree sia rimasto pulito (git status --porcelain vuoto): la review NON deve modificare file. Restituisci INTEGRALE l'output di Copilot. Se il comando \`copilot\` non esiste, fallisce o va in timeout, restituisci esattamente "COPILOT_UNAVAILABLE: <motivo sintetico>".`,
      { agentType: 'general-purpose', label: 'review:copilot', phase: 'Review' }
    ).catch(() => null)
  : Promise.resolve(null)

const reviews = (await parallel(
  active.map((c) => () =>
    agent(reviewInstruction(c.extra), { agentType: c.agentType, schema: FINDINGS_SCHEMA, label: `review:${c.key}`, phase: 'Review' })
  )
)).filter(Boolean)

const [codexReview, copilotReview] = await Promise.all([codexPromise, copilotPromise])

phase('Verify')
const criticals = reviews.flatMap((r) =>
  (r.findings || []).filter((f) => f.severity === 'critical').map((f) => ({ ...f, dimension: r.dimension }))
)
log(criticals.length ? `${criticals.length} finding CRITICAL da verificare in modo avversariale` : 'Nessun CRITICAL da verificare')

const verified = (await parallel(
  criticals.map((c) => () =>
    agent(
      `${preamble}Verifica AVVERSARIALE di un presunto problema CRITICAL trovato da @${c.dimension} sul branch corrente (base \`${effectiveBase}\`). Il tuo compito è tentare di REFUTARLO: leggi il codice reale (\`git diff ${effectiveBase}...HEAD\`, i file citati, la config e i file pertinenti) e stabilisci se è un problema reale e raggiungibile in produzione o un falso positivo. In caso di dubbio, default confermato=false.

Problema: ${c.issue}
File:riga: ${c.file || '?'}:${c.line || '?'}
Evidenza dichiarata: ${c.evidence || '(nessuna)'}
Fix proposto: ${c.fix || '(nessuno)'}

Ritorna SOLO VERDICT_SCHEMA: confirmed (true solo se il problema è reale, raggiungibile e supportato da evidenza concreta), reasoning conciso con riferimento \`file:riga\`.`,
      { schema: VERDICT_SCHEMA, label: `verify:${(c.file || c.dimension).slice(0, 40)}`, phase: 'Verify' }
    ).then((v) => ({ ...c, verdict: v }))
  )
)).filter(Boolean)

const confirmedCriticals = verified.filter((c) => c.verdict && c.verdict.confirmed)
const rejectedCriticals = verified.filter((c) => !c.verdict || !c.verdict.confirmed)

return {
  base: effectiveBase,
  coverage: { ran: active.map((c) => c.key), skipped, changedFiles: scope.changedFiles, heterogeneous: scope.codexWorthy ? 'codex + copilot (CLI locali dirette)' : 'skipped (diff piccolo/cosmetico)' },
  diffSummary: scope.diffSummary,
  codexReview,
  copilotReview,
  confirmedCriticals,
  rejectedCriticals,
  warnings: reviews.flatMap((r) => (r.findings || []).filter((f) => f.severity === 'warning').map((f) => ({ ...f, dimension: r.dimension }))),
  allFindings: reviews,
}
