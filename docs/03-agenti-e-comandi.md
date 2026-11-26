# 03 — Agenti, comandi e skill

> Gli strumenti di Claude Code del repo: subagent per verificare, comandi per costruire, skill per i compiti ricorrenti, workflow per orchestrare. Metodo importato da WeGree e ripulito dal suo dominio.

## Subagent (`.claude/agents/`)

Un subagent è un file markdown con frontmatter YAML: un'istanza Claude separata, con contesto isolato, un compito mirato e tool ristretti, che restituisce alla sessione principale solo un riassunto. Si invoca con `@nome` (più affidabile) o per auto-delega, perché la `description` è scritta come condizione di attivazione.

I modelli sono assegnati per costo dell'errore (frontmatter `model:`, vedi `CLAUDE.md` §Orchestrazione economica).

| Agente | A cosa serve | Modello |
|---|---|---|
| `@reviewer` | Revisione del codice contro le regole non negoziabili di `CLAUDE.md` (statico, semantica e accessibilità, foto e privacy, niente segreti) oltre ai bug classici | Opus |
| `@test-writer` | Scrive i test seguendo la spec e gli strumenti del framework (`@nuxt/test-utils`, Vitest) | Opus |
| `@docs-sync` | Allinea `docs/` e le spec quando il codice cambia un flusso o una decisione | Sonnet |
| `@pr-writer` | Descrizione della PR pronta da incollare su GitHub | Sonnet |
| `@design-system-checker` | Verifica che la UI usi i componenti Nuxt UI (accessibilità e stile inclusi) invece di HTML grezzo e che `app/` segua `docs/coding-style.md` | Sonnet |

Esempi:

```text
@reviewer controlla l'ultimo commit
@design-system-checker rivedi la homepage
@test-writer copri la pagina index
@docs-sync allinea la doc dopo le ultime modifiche
@pr-writer prepara la descrizione PR di questo ramo
```

Gli agenti rimandano a `CLAUDE.md` e ai documenti in `docs/`: tenendo aggiornati quelli, restano allineati. Se si aggiunge una regola non negoziabile, si valuta se `@reviewer` debba cercarne le violazioni.

### Fan-out paralleli sullo stesso working tree

Quando più subagent editano file nello stesso working tree, il prompt vieta i comandi git che mutano lo stato (`stash`, `reset`, `checkout --`, `commit`, `add`): solo git in lettura (`status`, `diff`, `log`). I commit restano all'orchestratore, a batch verificato. Gli agenti istruiti come "solo lettura" non sono affidabili al 100%: dopo un fan-out di verifica si controlla `git status` prima di applicare le proposte. Per un fan-out davvero read-only si preferisce un tipo di agente senza tool di scrittura (per esempio Explore).

## Comandi (`.claude/commands/`)

Ogni file `.claude/commands/<nome>.md` diventa il comando `/<nome>`; alcuni accettano un argomento (`$ARGUMENTS`). Ogni comando legge i documenti in `docs/` prima di agire.

| Comando | A cosa serve |
|---|---|
| `/spec-new` | Crea una spec in `.specdd/NNN-nome/` dal template ([`02-specdd.md`](./02-specdd.md)) |
| `/wf-new-feature` | Avvia una feature: ramo `feature/claude/<nome>`, sviluppo guidato dai task della spec |
| `/wf-fix-bug` | Corregge un bug in TDD: test che lo riproduce, fix minimo, regression test, PR |
| `/wf-tests` | Scrive i test di un modulo seguendo la sua spec |
| `/visual-plan` | Trasforma un piano testuale in un piano visivo interattivo |
| `/visual-recap` | Riassunto visivo di una PR, di un ramo o di un diff |

Agenti e comandi si completano: il comando costruisce, gli agenti verificano, `@pr-writer` prepara la PR.

## Skill

Le skill sono file `SKILL.md` che Claude carica quando il compito lo richiede.

- **Di progetto:** `docs-update` (aggiornamento della documentazione a fine sessione), in `.agents/skills/docs-update/` con una copia identica in `.claude/skills/docs-update/`: si modificano insieme.
- **Vendor** (Nuxt, Nuxt UI, test, design…): vivono in `.agents/skills/` e arrivano con una PR dedicata, separata da quella della spec 001 per restare sotto la soglia di file delle review.

Se una feature può sfruttare una skill, la si cita nel `design.md` della spec.

## Workflow (`.claude/workflows/`)

Script che orchestrano più subagent in modo deterministico (fan-out parallelo, verifica, sintesi). Oggi ne esistono due:

- **`pre-pr-review`** (`.claude/workflows/pre-pr-review.js`) — il gate prima della PR: classifica il diff verso `develop`, lancia i reviewer condizionati ai file toccati (`@reviewer` e `@docs-sync` sempre, `@design-system-checker` se cambia la UI), verifica in modo avversariale i soli rilievi CRITICAL e produce una sintesi unica. Può aggiungere un secondo parere dalle CLI locali di Codex e Copilot.
- **`docs-alignment-check`** (`.claude/workflows/docs-alignment-check.js`) — confronta documenti e spec con il codice reale e corregge solo ciò che una verifica avversariale conferma; salta `docs/discovery/` e non tocca mai `README.md` né `CHANGELOG.md`. Il diff resta da committare.

Regola d'ingaggio: un workflow nuovo nasce solo quando un singolo agente non basta e dopo aver visto fallimenti reali; altrimenti è orchestrazione prematura.

## Configurazione

- `.claude/settings.json` — impostazioni condivise di Claude Code per il repo (permessi, plugin); `.claude/settings.local.json` è personale e non si versiona.
- `.codex/config.toml` — configurazione di Codex CLI per il repo, senza segreti.
- `.github/copilot-instructions.md` — rimando a `CLAUDE.md` per Copilot; `AGENTS.md` fa lo stesso per gli altri agenti.
