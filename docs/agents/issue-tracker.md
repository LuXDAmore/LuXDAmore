# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues on `LuXDAmore/LuXDAmore`. Use the `gh` CLI for all
operations.

## How work is tracked in this repo — read this before creating anything

This repo already has a planning system. The tracker **adds a queue for incoming requests**; it does
not replace the planning docs, and nothing should ever exist in both places. Owners:

| Artifact                        | Source of truth for                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `docs/TODO.md`                  | The plan, by phase. Checkbox entries with criticality. Updated by hand (`CLAUDE.md` §1).                          |
| `docs/00-visione-progetto.md`   | Vision, decisions and open product questions for the Operator.                                                   |
| `.specdd/NNN-name/`             | The canonical spec of a feature: `requirements.md` → `design.md` → `tasks.md`. **No code without a spec.**        |
| `docs/agents-changelog.md`      | The session diary.                                                                                               |
| **GitHub issues**               | Requests and bugs arriving from *outside* a planning doc; their triage state; `wayfinder` maps for work too big for one session. |

**`docs/TODO.md` is a plan, not a queue** — no ids, no states, no comments, no room for a long body.
Don't mirror it onto the tracker, and don't append tracker items to it just because they exist.

### Crossing rules

- **`/to-spec`** — the spec body belongs in `.specdd/NNN-name/requirements.md` per `CLAUDE.md`
  §SpecDD. Publish an issue as the tracker-side entry (labelled `ready-for-agent`) whose body links
  the spec path; never let a GitHub issue be the only copy of a spec. `requirements.md` and
  `design.md` are approved by the Operator — an agent-published spec is a draft until then.
- **`/to-tickets`** — tickets are GitHub issues. If the work is already planned in `docs/TODO.md`,
  cite the entry in the ticket body instead of restating the plan.
- **Closing a ticket that corresponds to a plan entry** — tick the checkbox in `docs/TODO.md` in the
  same commit (`CLAUDE.md` §1), citing the issue number. Documentation and code ship together.
- **A bug arriving as an issue** is a *report*, not a spec: fix it via the repo's TDD flow
  (reproducing test → minimal fix → regression test). Register its edge case in the spec's `design.md`.
- **A product question for the Operator** goes to `docs/00-visione-progetto.md` §Domande aperte, not to triage.

### Labels present on the repo today

Only `wontfix` exists (a GitHub default, reused as-is). `needs-triage`, `needs-info`,
`ready-for-agent` and `ready-for-human` must be created on first use:
`gh label create "<name>" --description "..."`. See `docs/agents/triage-labels.md`.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

Copy in issues and comments follows the repo's language rule (`CLAUDE.md` §Regole non negoziabili,
rule 7): identifiers in English, prose in Italian.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

Deliberate, not a default left untouched: every PR here is internal (`main` ← `develop` ←
`feature/claude/*` / `fix/claude/*`, opened as draft) and reviewed by the `pre-pr-review` gate plus,
when the Operator asks for it, the `@codex review` loop. There are no external contributors, so triage would only ever pick up our
own work in progress. Revisit this if the repo ever takes outside PRs.

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either — resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies** — the canonical, UI-visible representation. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _not_ the `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only — the live gate). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children (`gh issue list --state open`, scoped to the map's sub-issues / task list), drop any with an open blocker (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the `Blocked by` line) or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me` — the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.

The `wayfinder:*` labels don't exist on the repo yet — create them on first use.
