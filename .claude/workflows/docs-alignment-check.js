// Workflow riusabile «check di allineamento documentazione» (Operatore; esaustivo 2026-07-22).
// Verifica che lo stato dichiarato in TUTTA la documentazione di piano/stato/spec/convenzioni
// rifletta il CODICE reale del working tree corrente, e CORREGGE i disallineamenti con
// evidenza DECISIVA, passando ogni correzione da una VERIFICA AVVERSARIALE prima di applicarla.
//
// Perimetro completo (esclude sempre: docs/discovery/ — storico del brainstorming —, docs/agents-changelog.md,
// docs/agents/*, CLAUDE.md e README.md — README del profilo GitHub, mai toccato):
// docs/TODO.md, docs/00..06 + coding-style, docs/README.md + TODO root, app.sdd,
// e tutte le .specdd/<NNN>-*/tasks.md (scoperte a ogni run, nessuna lista statica).
//
// Pipeline in 4 fasi (qualità: nessuna spunta sbagliata sfugge):
//   0. Discover       — inventario dell'albero: elenca i .specdd/<NNN>-*/tasks.md reali (sempre, anche con
//                       args.specs: gli id richiesti si validano contro l'albero, quelli inesistenti NON si
//                       contano come coperti e finiscono nel risultato come «non auditati»).
//   1. Audit/Propose  — agenti per gruppo di file DISGIUNTI propongono correzioni con evidenza (NON editano).
//   2. Verify         — ogni proposta passa da un revisore AVVERSARIALE che prova a refutarla (default: scarta).
//   3. Apply          — un solo agente per file applica le sole correzioni confermate (file disgiunti → parallelo sicuro).
//
// docs/TODO.md è gestito a parte (audit dedicato in propose, UN SOLO applier) per non
// avere due agenti che scrivono lo stesso file. NON committa: il diff resta nel working tree.
// Invocabile con /docs-alignment-check; args opzionale = focus testuale (es. "solo docs/01 e spec 00x"),
// oppure oggetto { focus?: string, specs?: string[] } (es. { specs: [ '096', '128' ] } per un run mirato).
// Il risultato riporta in `coverage` la copertura spec EFFETTIVA (auditate = assegnate a un agente che ha risposto: voci aperte verificate tutte, [x] a campione; inesistenti, non valide, avvisi).
export const meta = {
    name: 'docs-alignment-check',
    description: 'Verifica e corregge l\'allineamento di TODO/spec tasks/doc di stato contro il codice reale (tutta la documentazione, con verifica avversariale)',
    whenToUse: 'Quando l\'Operatore vuole «tutto in regola» sui documenti: dopo una feature grossa, prima di un giro di pianificazione, o periodicamente. Copre TUTTA la documentazione; corregge solo con evidenza verificata; il diff resta da committare.',
    phases: [
        { title: 'Discover', detail: 'inventario dei .specdd/<NNN>-*/tasks.md reali; valida gli id di args.specs contro l\'albero' },
        { title: 'Audit', detail: 'proponi correzioni con evidenza (per gruppo di file disgiunti)' },
        { title: 'Verify', detail: 'refutazione avversariale di ogni proposta (scarta in caso di dubbio)' },
        { title: 'Apply', detail: 'applica le sole correzioni confermate (un applier per file)' },
    ],
}

// ── Schemi strutturati ────────────────────────────────────────────────────────
const PROPOSAL_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: [ 'proposals', 'uncertain' ],
    properties: {
        proposals: {
            type: 'array',
            description: 'Correzioni proposte (NON ancora applicate)',
            items: {
                type: 'object',
                additionalProperties: false,
                required: [ 'file', 'current', 'proposed', 'evidence' ],
                properties: {
                    file: { type: 'string', description: 'Percorso del file da correggere (dentro il perimetro assegnato)' },
                    current: { type: 'string', description: 'old_string ESATTO e UNIVOCO già presente nel file' },
                    proposed: { type: 'string', description: 'new_string sostitutivo (correzione chirurgica, stesso stile)' },
                    kind: { type: 'string', description: 'tick | untick | note | date | count | ref' },
                    evidence: { type: 'string', description: 'percorso:riga del codice che prova la correzione + una riga di perché' },
                },
            },
        },
        uncertain: { type: 'array', items: { type: 'string' }, description: 'Item dubbi NON proposti, con cosa servirebbe per decidere' },
        notes: { type: 'string', description: 'Osservazioni trasversali' },
    },
}

const VERDICT_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: [ 'confirmed', 'reason' ],
    properties: {
        confirmed: { type: 'boolean', description: 'true SOLO se l\'evidenza regge in modo decisivo e la correzione è sicura' },
        reason: { type: 'string', description: 'una riga, con percorso:riga a supporto o refutazione' },
    },
}

const APPLY_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: [ 'applied', 'skipped' ],
    properties: {
        applied: { type: 'array', items: { type: 'string' }, description: 'Correzioni applicate (una riga: item, prima→dopo)' },
        skipped: { type: 'array', items: { type: 'string' }, description: 'Correzioni saltate col motivo (es. old_string non combaciante)' },
    },
}

const DISCOVER_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: [ 'paths', 'count', 'mode' ],
    properties: {
        mode: { type: 'string', enum: [ 'bash', 'glob' ], description: '"bash" se hai eseguito i due comandi, "glob" se hai usato il fallback Glob' },
        paths: { type: 'array', items: { type: 'string' }, description: 'Ogni riga di output del comando di inventario, VERBATIM (es. ".specdd/096-nome/tasks.md"), nessuna omessa' },
        count: { type: 'integer', description: 'Numero stampato dal comando di conteggio (wc -l), riportato tale e quale' },
    },
}

// ── Argomenti ─────────────────────────────────────────────────────────────────
// args stringa = focus testuale. args oggetto = { focus?: string, specs?: string[] }: `focus` fa da
// focus testuale; `specs` (array di numeri spec) restringe il perimetro spec (run mirati): gli id
// si validano contro l'inventario della Discover, che gira comunque.
const ARGS_OBJ = args && typeof args === 'object' && ! Array.isArray( args ) ? args : null

    , FOCUS_TEXT = typeof args === 'string'
        ? args.trim()
        : ( ARGS_OBJ && typeof ARGS_OBJ.focus === 'string' ? ARGS_OBJ.focus.trim() : '' )
;

// ── Regole comuni ─────────────────────────────────────────────────────────────
const FOCUS = FOCUS_TEXT
    ? `\n\nFOCUS RICHIESTO DALL'OPERATORE (concentra qui l'attenzione, il resto del perimetro solo a campione): ${ FOCUS_TEXT }`
    : ''

const COMMON = `Repo del portfolio lucaiaconelli.it (working directory corrente). Il RIFERIMENTO DI VERITÀ è il CODICE del working tree CORRENTE, oggi.

VINCOLI DURI:
- NON leggere né modificare docs/discovery/ (storico del brainstorming, con materiale di riferimento): escludila da ogni grep/ricerca (es. --exclude-dir=discovery).
- NON toccare mai: README.md (README del profilo GitHub), CHANGELOG.md, docs/agents-changelog.md, docs/agents/* (config di tooling in inglese), CLAUDE.md.
- Git SOLO in lettura (mai stash/reset/commit/checkout). Codice/identificatori in inglese, testi doc in italiano.
- MAI inventare completamenti, MAI cancellare item, MAI riscrivere lo stile o le sezioni descrittive: correzioni CHIRURGICHE nel formato già in uso.${ FOCUS }`

// ── Perimetri documentali (file DISGIUNTI tra gruppi) ─────────────────────────
const DOC_GROUPS = [
    { label: 'visione-deploy', files: [ 'docs/00-visione-progetto.md', 'docs/01-ambienti-e-deploy.md' ], hint: 'docs/00: correggi SOLO lo stato delle superfici e i puntatori a spec/file oggettivamente stantii, NON riscrivere visione e decisioni. docs/01: verifica script, versioni Node/pnpm, comandi generate/preview, upload FTP di .output/public, workflow CI e Pages vs package.json, .nvmrc e .github/workflows.' },
    { label: 'processo-tooling', files: [ 'docs/02-specdd.md', 'docs/03-agenti-e-comandi.md', 'docs/04-review-e-pr.md' ], hint: 'Verifica che i comandi in .claude/commands, gli agenti in .claude/agents, le skill di progetto, il flusso SpecDD (.specdd/, app.sdd) e il flusso di review/PR citati esistano ancora coi nomi/percorsi indicati.' },
    { label: 'convenzioni', files: [ 'docs/05-seo.md', 'docs/06-glossario.md', 'docs/coding-style.md' ], hint: 'Verifica che SEO, glossario e convenzioni non citino componenti/composable/moduli/alias/pattern rimossi o rinominati; correggi SOLO riferimenti oggettivamente stantii.' },
    { label: 'indici', files: [ 'docs/README.md', 'TODO.md', 'app.sdd' ], hint: 'docs/README.md: ogni documento presente in docs/ è indicizzato e nessun link è rotto. TODO root: resta un rimando a docs/TODO.md. app.sdd: Structure/Owns e Tasks coerenti con le cartelle e lo stato reali.' },
]

// Perimetri spec: niente lista statica (si fermava alla 100 e andava patchata a mano a ogni giro).
// I numeri arrivano dall'inventario dell'albero (fase Discover, sempre eseguita) o da args.specs
// (run mirati, validati contro lo stesso inventario), e si spezzano in blocchi da SPEC_CHUNK numeri,
// disgiunti per costruzione (l'agente risolve i path con Glob '.specdd/<num>-*/tasks.md').
const SPEC_CHUNK = 8

// L'agente NON sceglie le spec: trascrive l'output di un comando e i numeri li ricava il JS dai path,
// così nessuna spec dell'albero resta fuori per una selezione del modello. Il conteggio indipendente
// (wc -l) smaschera una trascrizione incompleta.
const discoverPrompt = `Inventario delle spec SpecDD del repo (working directory corrente). Esegui con Bash, dalla root del repo, ESATTAMENTE questi due comandi:
1. ls -1 .specdd/[0-9][0-9][0-9]-*/tasks.md
2. ls -1 .specdd/[0-9][0-9][0-9]-*/tasks.md | wc -l
Restituisci in \`paths\` OGNI riga di output del comando 1, verbatim e senza ometterne nessuna, in \`count\` il numero stampato dal comando 2 e \`mode\`="bash".
Se Bash non è disponibile, usa Glob '.specdd/*/tasks.md', tieni SOLO le cartelle il cui nome inizia con tre cifre seguite da un trattino, metti in \`count\` il numero di path che restituisci e \`mode\`="glob".
NON leggere il contenuto dei file e NON modificare nulla.`

// Normalizza a stringhe a tre cifre ('96' → '096'), senza duplicati, in ordine crescente.
// Valida PRIMA del padStart: un id vuoto o di soli spazi non diventa '000'.
const normalizeSpecNums = list => [ ...new Set( ( Array.isArray( list ) ? list : [] ).map( n => String( n ).trim() ).filter( n => /^\d{1,3}$/.test( n ) ).map( n => n.padStart( 3, '0' ) ) ) ].sort()

// Numero spec da un path (.specdd/<NNN>-*/tasks.md); null se non combacia.
const specNumOf = path => { const m = /\.specdd[\\/](\d{3})-[^\\/]*[\\/]tasks\.md$/i.exec( String( path || '' ).trim() ); return m ? m[ 1 ] : null }

const toSpecGroups = nums => {

    const groups = []

    for( let i = 0; i < nums.length; i += SPEC_CHUNK ) {

        const chunk = nums.slice( i, i + SPEC_CHUNK )

        groups.push( { label: `spec:${ chunk[ 0 ] }-${ chunk[ chunk.length - 1 ] }`, nums: chunk } )

    }

    return groups

}

// ── Prompt builder ────────────────────────────────────────────────────────────
const AUDIT_RULES = `Per ogni claim di stato nel perimetro ([x]/[ ]/[-], «FATTO»/«resta»/«non ancora»/«Presto»/«parziale»/«in corso», conteggi di test/file/spec, puntatori a file/endpoint/spec/PR), VERIFICA contro il CODICE reale del working tree (grep/read mirati: file citati, app/, test/, public/, nuxt.config.ts, package.json, .github/workflows/).
Proponi una correzione SOLO con evidenza DECISIVA: (a) un item [ ] è di fatto consegnato END-TO-END nel codice → tick con nota d'esito; (b) un puntatore/percorso/conteggio/data è oggettivamente stantio → aggiorna. In OGNI dubbio NON proporre: metti in \`uncertain\`.
Un item [ ] recente e forward-looking (feature non ancora nel codice) RESTA [ ]: non spuntarlo. Un [x] palesemente falso NON si despunta: va in \`uncertain\` con l'evidenza.
Ogni proposta DEVE avere: file, current (old_string ESATTO e UNIVOCO già nel file), proposed (new_string), kind, evidence (percorso:riga del codice + una riga di perché). NON modificare alcun file in questa fase.`

const auditDocPrompt = g => `${ COMMON }

FASE 1 — AUDIT / PROPOSTA (solo proporre, NON editare).
PERIMETRO (proponi correzioni SOLO su questi file): ${ g.files.join(', ') }.
NOTE DI PERIMETRO: ${ g.hint }

${ AUDIT_RULES }`

const auditSpecPrompt = g => `${ COMMON }

FASE 1 — AUDIT / PROPOSTA (solo proporre, NON editare).
PERIMETRO: le spec ${ g.nums.join(', ') } → risolvi i path con Glob '.specdd/<num>-*/tasks.md' per ciascun numero. Tocca SOLO i tasks.md (MAI requirements.md/design.md, che sono storici; al più un marcatore «non ancora implementato» palesemente superato può diventare «⤴ superato, vedi spec NNN», ma proponilo con cautela).
Le spec vecchie e mergiate sono per lo più coerenti, ma verifica OBBLIGATORIAMENTE OGNI voce «[ ]»/«[-]» e ogni marcatore «non ancora»/«resta»/«parziale» dei tasks.md assegnati; le voci «[x]» si possono controllare a campione. Proponi SOLO drift reale con evidenza decisiva.

${ AUDIT_RULES }`

const verifyPrompt = p => `${ COMMON }

FASE 2 — VERIFICA AVVERSARIALE di UNA proposta di correzione documentale. Il tuo compito è provare a REFUTARLA.
File: ${ p.file }
Tipo: ${ p.kind || '(non indicato)' }
Testo attuale (old_string): ${ JSON.stringify( ( p.current || '' ).slice( 0, 700 ) ) }
Testo proposto (new_string): ${ JSON.stringify( ( p.proposed || '' ).slice( 0, 700 ) ) }
Evidenza dichiarata: ${ p.evidence || '(nessuna)' }

Verifica TU l'evidenza nel codice reale (leggi/grep i file citati e il loro contesto: pagine, componenti, config, script, test). Chiediti: la feature è davvero cablata END-TO-END come la correzione afferma? il puntatore/conteggio/data è davvero quello? il testo «attuale» esiste ancora così com'è nel file?
confirmed=true SOLO se l'evidenza regge in modo DECISIVO e la correzione è accurata e sicura da applicare. In QUALSIASI dubbio → confirmed=false.`

const applyPrompt = ( file, proposals ) => `${ COMMON }

FASE 3 — APPLICA le correzioni CONFERMATE al file: ${ file } (modifica ESCLUSIVAMENTE questo file).
Usa Edit chirurgici: old_string = "current" ESATTO → new_string = "proposed". Se un current non combacia più esatto (spazi/riga cambiati), RILEGGI il file e adatta l'edit preservando senso e stile; se resta ambiguo o rischi di corrompere, SALTA e riportalo in \`skipped\` col motivo. NON fare modifiche non elencate.

Correzioni confermate (JSON): ${ JSON.stringify( proposals.map( p => ( { current: p.current, proposed: p.proposed, kind: p.kind, evidence: p.evidence } ) ) ) }`

// ── Utility ───────────────────────────────────────────────────────────────────
const validProposal = p => p && typeof p.file === 'string' && typeof p.current === 'string' && p.current.length > 0 && typeof p.proposed === 'string'

const verifyProposals = async( proposals, phaseLabel ) => {

    const checked = await parallel(
        proposals.map( p => () =>
            agent( verifyPrompt( p ), { label: `verify:${ p.file }`, phase: 'Verify', schema: VERDICT_SCHEMA, model: 'opus', effort: 'high' } )
                .then( v => ( { ...p, verdict: v } ) )
        )
    )

    const ok = checked.filter( Boolean )

    return {
        confirmed: ok.filter( p => p.verdict && p.verdict.confirmed ),
        refuted: ok.filter( p => ! ( p.verdict && p.verdict.confirmed ) ).map( p => `${ p.file }: «${ ( p.current || '' ).slice( 0, 70 ) }» — ${ ( p.verdict && p.verdict.reason ) || 'refutata' }` ),
    }

}

const applyByFile = async( confirmed ) => {

    const byFile = new Map()

    for( const p of confirmed ) {

        if( ! byFile.has( p.file ) )
            byFile.set( p.file, [] )

        byFile.get( p.file ).push( p )

    }

    const applies = await parallel(
        [ ...byFile.entries() ].map( ( [ file, ps ] ) => () =>
            agent( applyPrompt( file, ps ), { label: `apply:${ file }`, phase: 'Apply', schema: APPLY_SCHEMA, model: 'sonnet', effort: 'high' } )
        )
    )

    return {
        applied: applies.filter( Boolean ).flatMap( a => a.applied || [] ),
        skipped: applies.filter( Boolean ).flatMap( a => a.skipped || [] ),
    }

}

// ── Orchestrazione ────────────────────────────────────────────────────────────
// Discover: inventario dell'albero SEMPRE (anche con args.specs), perché la copertura dichiarata deve
// essere quella effettiva: un id che non ha una cartella .specdd/<NNN>-*/tasks.md non è auditabile
// e non si conta mai come coperto (prima { specs: [ '999' ] } chiudeva «riuscito» senza audit).
const USE_ARGS_SPECS = !! ( ARGS_OBJ && Array.isArray( ARGS_OBJ.specs ) )

phase( 'Discover' )

const inventory = await agent( discoverPrompt, { label: 'discover:spec', phase: 'Discover', schema: DISCOVER_SCHEMA, model: 'sonnet', effort: 'low' } )

    , TREE_OK = !! ( inventory && Array.isArray( inventory.paths ) )
    , TREE_PATHS = TREE_OK ? inventory.paths.map( p => String( p || '' ).trim() ).filter( Boolean ) : []
    , TREE_NUMS = normalizeSpecNums( TREE_PATHS.map( specNumOf ).filter( Boolean ) )
    // Solo in modalità bash il conteggio (wc -l) è indipendente dai path; col fallback Glob è derivato.
    , TREE_MODE = TREE_OK && inventory.mode === 'bash' ? 'bash' : 'glob'

    // Run mirato: id passati che non sono un numero da 1 a 3 cifre (es. 'abc', '1234', '', '  ').
    , INVALID_IDS = USE_ARGS_SPECS
        ? ARGS_OBJ.specs.map( n => String( n ).trim() ).filter( n => ! /^\d{1,3}$/.test( n ) )
        : []
    , REQUESTED = USE_ARGS_SPECS ? normalizeSpecNums( ARGS_OBJ.specs ) : TREE_NUMS

    // Senza inventario gli id richiesti non sono verificabili: non si auditano e si dichiarano tali.
    , SPEC_NUMS = TREE_OK ? REQUESTED.filter( n => TREE_NUMS.includes( n ) ) : []
    , MISSING_IDS = TREE_OK ? REQUESTED.filter( n => ! TREE_NUMS.includes( n ) ) : []
    , UNVERIFIED_IDS = TREE_OK ? [] : REQUESTED

    , SPEC_GROUPS = toSpecGroups( SPEC_NUMS )
    , coverageWarnings = []
;

if( ! TREE_OK )
    coverageWarnings.push( 'Inventario di .specdd/ fallito: nessun tasks.md auditato. Rilanciare il workflow.' )
else {

    const unparsed = TREE_PATHS.filter( p => ! specNumOf( p ) )

    if( TREE_MODE !== 'bash' )
        coverageWarnings.push( `Inventario via Glob: verifica del conteggio non disponibile (count derivato dai path), completezza dell'elenco non controllata.` )
    else if( Number.isInteger( inventory.count ) && inventory.count !== TREE_PATHS.length )
        coverageWarnings.push( `Inventario incoerente: ${ inventory.count } tasks.md contati, ${ TREE_PATHS.length } path trascritti. Copertura forse parziale: rilanciare il workflow.` )

    if( unparsed.length )
        coverageWarnings.push( `Inventario: ${ unparsed.length } path non riconosciuti come .specdd/<NNN>-*/tasks.md e ignorati (${ unparsed.slice( 0, 5 ).join( ', ' ) }).` )

}

if( INVALID_IDS.length )
    coverageWarnings.push( `Id di spec non validi in args.specs, NON auditati: ${ INVALID_IDS.map( n => n || '(vuoto)' ).join( ', ' ) }.` )

if( MISSING_IDS.length )
    coverageWarnings.push( `Id di spec inesistenti nell'albero (nessun .specdd/<NNN>-*/tasks.md), NON auditati: ${ MISSING_IDS.join( ', ' ) }.` )

if( UNVERIFIED_IDS.length )
    coverageWarnings.push( `Id di spec non verificabili senza inventario, NON auditati: ${ UNVERIFIED_IDS.join( ', ' ) }.` )

// Nessun taglio silenzioso: dichiara sempre il perimetro spec effettivo e cosa resta fuori.
log( SPEC_NUMS.length
    ? `Spec nel perimetro: ${ SPEC_NUMS.length } (${ SPEC_NUMS[ 0 ] }…${ SPEC_NUMS[ SPEC_NUMS.length - 1 ] }${ USE_ARGS_SPECS ? ', da args.specs' : '' }; ${ TREE_NUMS.length } nell'albero) in ${ SPEC_GROUPS.length } gruppi da max ${ SPEC_CHUNK }.`
    : 'Nessuna spec nel perimetro: audit dei tasks.md saltato.' )

for( const w of coverageWarnings )
    log( `ATTENZIONE copertura spec: ${ w }` )

phase( 'Audit' )

// docs/TODO.md: audit dedicato (in sola lettura) → verify → UN SOLO applier.
// Gestito a parte per non avere due agenti che scrivono lo stesso file.
const todoFlow = async() => {

    const TODO = 'docs/TODO.md'

        , sub = ( perimetro ) => `${ COMMON }

FASE 1 — AUDIT / PROPOSTA (solo proporre, NON editare).
PERIMETRO: ${ TODO }, ${ perimetro }

${ AUDIT_RULES }`

        // Il piano è ancora piccolo: un solo auditor sull'intero file. Quando crescerà, si spezza
        // per sezioni disgiunte (un agente per sezione), sempre con UN SOLO applier.
        , audits = await parallel( [
            () => agent( sub( 'tutto il file. Se cita commenti TODO/FIXME nel codice, verifica con grep che ogni commento citato esista ancora alla posizione indicata.' ), { label: 'todo', phase: 'Audit', schema: PROPOSAL_SCHEMA, model: 'sonnet', effort: 'high' } ),
        ] )

        // Guardia di perimetro: solo proposte su docs/TODO.md (nessun altro file).
        , proposals = audits.filter( Boolean ).flatMap( a => Array.isArray( a.proposals ) ? a.proposals : [] ).filter( validProposal ).filter( p => p.file === TODO )
        , uncertain = audits.filter( Boolean ).flatMap( a => Array.isArray( a.uncertain ) ? a.uncertain : [] )
        , notes = audits.filter( Boolean ).map( a => a.notes ).filter( Boolean )
    ;

    log( `TODO.md: ${ proposals.length } proposte da verificare` )

    const { confirmed, refuted } = await verifyProposals( proposals, 'todo' )
        , { applied, skipped } = await applyByFile( confirmed )
    ;

    return { group: 'docs/TODO.md', applied, skipped, refuted, uncertain, notes }

}

// Gli altri gruppi (doc + spec): pipeline per-gruppo, file disgiunti → nessun barrier globale.
const groupFlow = pipeline(
    [ ...DOC_GROUPS.map( g => ( { ...g, kind: 'doc' } ) ), ...SPEC_GROUPS.map( g => ( { ...g, kind: 'spec' } ) ) ],
    // stage 1 — audit/propose
    g => agent( g.kind === 'doc' ? auditDocPrompt( g ) : auditSpecPrompt( g ), { label: g.label, phase: 'Audit', schema: PROPOSAL_SCHEMA, model: 'sonnet', effort: 'high' } ),
    // stage 2 — verifica avversariale
    async( audit, g ) => {

        // Guardia di perimetro: scarta proposte fuori dai file assegnati al gruppo (evita
        // che due gruppi scrivano lo stesso file). Doc = lista esatta; spec = qualunque tasks.md sotto .specdd/.
        // Spec: non basta che sia un tasks.md, il numero (specNumOf) DEVE appartenere al gruppo → perimetri
        // davvero disgiunti (senza, due gruppi concorrenti potrebbero scrivere lo stesso file).
        const inPerimeter = p => g.kind === 'doc'
            ? g.files.includes( p.file )
            : g.nums.includes( specNumOf( p.file ) )

        const proposals = ( audit && Array.isArray( audit.proposals ) ) ? audit.proposals.filter( validProposal ).filter( inPerimeter ) : []
            , uncertain = ( audit && Array.isArray( audit.uncertain ) ) ? audit.uncertain : []
            , notes = ( audit && audit.notes ) ? [ audit.notes ] : []
        ;

        // auditedNums: le spec del gruppo contano come auditate solo se l'agente di audit ha risposto.
        const auditedNums = g.kind === 'spec' && audit ? g.nums : []

        if( ! proposals.length )
            return { group: g.label, auditedNums, confirmed: [], refuted: [], uncertain, notes }

        const { confirmed, refuted } = await verifyProposals( proposals, g.label )

        return { group: g.label, auditedNums, confirmed, refuted, uncertain, notes }

    },
    // stage 3 — applica le confermate (un applier per file)
    async( verified ) => {

        const confirmed = ( verified && verified.confirmed ) || []
            , { applied, skipped } = confirmed.length ? await applyByFile( confirmed ) : { applied: [], skipped: [] }
        ;

        return {
            group: verified.group,
            auditedNums: ( verified && verified.auditedNums ) || [],
            applied,
            skipped,
            refuted: ( verified && verified.refuted ) || [],
            uncertain: ( verified && verified.uncertain ) || [],
            notes: ( verified && verified.notes ) || [],
        }

    },
)

const [ todoResult, groupResults ] = await Promise.all( [ todoFlow(), groupFlow ] )

const all = [ todoResult, ...groupResults.filter( Boolean ) ]

    , applied = all.flatMap( r => r.applied || [] )
    , skipped = all.flatMap( r => r.skipped || [] )
    , refuted = all.flatMap( r => r.refuted || [] )
    , uncertain = all.flatMap( r => r.uncertain || [] )
    , notes = all.flatMap( r => r.notes || [] )

    // Copertura spec EFFETTIVA: auditate = solo gli id con un tasks.md reale nell'albero il cui
    // gruppo ha davvero un esito di audit (un agente fallito non conta come copertura).
    , AUDITED = normalizeSpecNums( all.flatMap( r => r.auditedNums || [] ) )
    , NOT_AUDITED = SPEC_NUMS.filter( n => ! AUDITED.includes( n ) )
;

if( NOT_AUDITED.length ) {

    coverageWarnings.push( `Audit fallito (agente senza esito), spec NON auditate: ${ NOT_AUDITED.join( ', ' ) }. Rilanciare con { specs: [ ... ] }.` )
    log( `ATTENZIONE copertura spec: ${ coverageWarnings[ coverageWarnings.length - 1 ] }` )

}

const coverage = {
        auditedSpecs: AUDITED,
        inventoryMode: TREE_OK ? TREE_MODE : null,
        treeSpecs: TREE_NUMS.length,
        missingIds: MISSING_IDS,
        invalidIds: INVALID_IDS,
        unverifiedIds: UNVERIFIED_IDS,
        warnings: coverageWarnings,
    }
    , coverageNote = coverageWarnings.length ? ` · ATTENZIONE copertura: ${ coverageWarnings.join( ' ' ) }` : ''
;

log( `Allineamento: ${ applied.length } correzioni applicate · ${ refuted.length } proposte refutate · ${ uncertain.length } incerte · ${ skipped.length } saltate · spec auditate ${ AUDITED.length }/${ TREE_NUMS.length } (aperte verificate tutte, [x] a campione)${ coverageNote }` )

return {
    summary: `${ applied.length } applicate, ${ refuted.length } refutate (avversariale), ${ uncertain.length } incerte, ${ skipped.length } saltate; spec auditate ${ AUDITED.length } su ${ TREE_NUMS.length } nell'albero (aperte verificate tutte, [x] a campione)${ coverageNote }`,
    coverage,
    applied,
    skipped,
    refuted,
    uncertain,
    notes,
    byGroup: all.map( r => ( { group: r.group, applied: ( r.applied || [] ).length, refuted: ( r.refuted || [] ).length, uncertain: ( r.uncertain || [] ).length } ) ),
}
