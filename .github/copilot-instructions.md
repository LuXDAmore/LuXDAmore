# Copilot Instructions

Follow all the instructions in the [CLAUDE.md](../CLAUDE.md) file.

Key rules for this repository (personal portfolio `lucaiaconelli.it`, static Nuxt 4 site):

- Never modify `README.md`: it is the GitHub profile README.
- Static only: `pnpm generate` builds `.output/public`, uploaded via FTP. No server runtime in production.
- Never commit secrets, `.env*`, certificates, local configs or references to third-party projects.
- Photos are real `<img>` elements with descriptive `alt`; no GPS coordinates in published files; original exports stay out of git.
- Semantic, accessible, SEO-friendly HTML: one `<h1>` per page, landmarks, title and description, keyboard and focus support.
- TypeScript strict. Code and identifiers in English; comments, docs, specs, commits and site copy in Italian.
- Every change starts from a spec in `.specdd/NNN-name/`; documentation is updated in the same commit.
- Review comments are suggestions to verify against the code and these rules, not changes to apply blindly.
