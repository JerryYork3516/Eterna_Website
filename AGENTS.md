# AGENTS.md — Eterna Website

> This file is the first stop for any AI agent working in this repository.
> Read this before changing code. Keep changes small, surgical, and verifiable.

## 1. What this project is

Eterna Website is **Eterna’s long-term project website, brand portal, and public product entry point**.

It is **not**:
- a generic company profile site,
- a single-product landing page,
- Aftelle,
- Studio,
- or a new product platform inside Eterna Universe.

Website responsibilities:
- present Eterna clearly,
- explain Digital Residents,
- show only real, source-backed products and public entry points,
- express long-term direction without pretending it is already delivered.

## 2. Current status

- Node 1–9 planning and freeze work is complete.
- Node 10 is still `REVIEW_REQUIRED`.
- P1, P2, P3, P4, and P5 are complete.
- P6 and P7 are not complete.
- D1 has **not** started.
- The root Next.js app does **not** exist yet.

Use the current Git branch and the Node 10 document as the working baseline.

## 3. Authority hierarchy

Read and obey sources in this order:

1. `Eterna_Docs` — upstream facts and product definitions
2. Node 1–10 formal documents — Website planning, freeze, and execution constraints
3. This `AGENTS.md` — AI working discipline for this repo
4. `docs/10-development-plan/engineering-standards-v0.1.md` — code and engineering rules
5. `docs/10-development-plan/tool-governance-v0.1.md` — capability routing and permission rules
6. The task-specific `.agents/skills/` workflow, when triggered
7. Plugin, MCP, and external-tool capabilities
8. P6 deterministic automation and its evidence
9. The root Website app created after D1 — the implementation
10. `legacy/` — historical implementation and migration evidence only
11. `references/` — reference-only material

Rules:
- Lower layers cannot override higher layers.
- Skills and tools are not new fact or authority sources.
- `legacy/` cannot override Website planning.
- `references/` cannot override formal decisions.
- Website implementation cannot become a new source of upstream facts.

## 4. Read only what the task needs

Before any task, read this file and then only the minimum additional documents needed for that task.

Suggested map:
- Engineering / code tasks: read `docs/10-development-plan/engineering-standards-v0.1.md` + the directly relevant Node 9 / Node 10 documents
- Content / bilingual tasks: read Node 6 + Node 9 content governance + related page docs
- UI / page design tasks: read Node 7 + Node 8 + related page docs
- Migration / deployment tasks: read Node 9 migration plan + Node 10 D9

For formal Website engineering or code work, `AGENTS.md` defines how the AI works, while `docs/10-development-plan/engineering-standards-v0.1.md` is the engineering standards source for how the code should be written. Cursor, Codex, and other agents must follow the same engineering standards instead of maintaining separate code rules.

Do not scan the whole docs set just to “understand everything”. Expand the reading set only when the task truly needs it.

## 5. Scope discipline

- Solve one clearly bounded task at a time.
- Do not widen the task because you noticed adjacent issues.
- If the task needs a wider file set, say so first.
- Prefer the smallest safe edit.
- Do not repeatedly reread unchanged files.
- For multi-file work, list the expected scope before changing anything.

## 6. Reuse-first, but do not over-abstract

Before creating a new component, hook, utility, helper, type, schema, motion wrapper, layout primitive, validation rule, or dependency:

1. search the repo for an existing fit,
2. check whether React / Next / Web Platform native capabilities already solve it,
3. only then consider a new implementation,
4. add a dependency only if it has real value that the current stack cannot provide.

Preferred order:

`Web / React / Next native capability` → `existing repo implementation` → `approved third-party dependency` → `new custom code`

Do **not** over-abstract early. If a pattern appears once or twice, keep the concrete implementation unless the duplication is real, stable, and semantically the same.

Avoid patterns like:
- universal section builders,
- generic page renderers,
- config-driven-everything,
- utility graveyards,
- helper managers,
- placeholder abstractions “for future reuse”.

## 7. Surgical modification

- Change only the files and logic required for the task.
- Do not reformat the whole repo.
- Do not rename unrelated files.
- Do not upgrade dependencies unless the task explicitly requires it.
- Follow the surrounding code style instead of imposing a new one.
- Prefer adding the smallest correct change over refactoring working code.

## 8. Anti-AI-code rules

Write code like an experienced engineer solving a real problem, not like an AI trying to look complete.

Avoid:
- explanatory comments on every line,
- tutorial-style comments,
- redundant wrappers,
- unused helpers,
- empty catch blocks,
- speculative fallback logic,
- defensive code with no real caller,
- generic `CommonUtils` / `HelperManager` style dumping grounds,
- placeholder names like `data1` or `item2`,
- “future-proof” scaffolding without an actual need.

Keep implementations small, direct, and maintainable.

## 9. Comment rules

Write comments only when they explain something not obvious from the code, such as:
- a non-obvious architecture boundary,
- a browser / accessibility constraint,
- a content governance boundary,
- a security or privacy reason,
- a design or motion tradeoff that future engineers might otherwise “optimize” away.

Comments should explain **why**, not narrate **what**.

## 10. Dependency rules

Do not add a new dependency unless you can justify it with all of the following:
- the real problem being solved,
- why native Web / React / Next capabilities are not enough,
- why existing approved dependencies do not already solve it,
- the package’s job,
- maintenance status,
- bundle/runtime cost,
- whether it enters the client bundle,
- whether it is easy to replace.

Do not add UI kits, page builders, giant animation stacks, or generic state-management libraries by default.

## 11. Server / Client boundaries

- Prefer server-first rendering for semantic content.
- Keep `use client` as deep and local as possible.
- Use Client Components only for real browser interaction.
- Do not turn an entire page or root layout into a Client Component just for convenience.
- Treat Resident / advanced visual work as a separate enhancement layer.

## 12. Design in Browser rules

AI must not declare visual approval on its own for pages such as Home, Digital Residents, Products, Aftelle, Studio, About, Resident, Motion, or Release Candidate work.

A build passing is not the same as design approval.

Any serious visual work must be checked in a real browser on:
- Chinese,
- English,
- Desktop,
- Tablet,
- Mobile,
- no-Resident,
- reduced-motion.

Node 7 / Node 8 visual gates are human decisions.

## 13. Legacy rules

`legacy/` is read-only by default.

Do not:
- import from `legacy/` unless the task explicitly says it is a migration / verification task,
- copy code from `legacy/` into the new Website implementation,
- update `legacy/` dependencies,
- fix `legacy/` code,
- move Aurora / OGL / old `/api/create` logic forward,
- modernize legacy copy or behavior unless the task is explicitly about migration evidence.

If you need to reference legacy behavior, mark it mentally and in code review as `REFERENCE_ONLY`.

## 14. Security / secrets

- Never read or print secret values.
- Never commit `.env*` files or other secrets.
- Never move secrets into client code.
- Never log secrets.
- Do not connect preview work to production data.
- Do not add tracking or analytics by default.
- Contact / Analytics remain disabled unless a later task explicitly enables them.

## 15. Git workflow

Follow the normal stage flow:

`implement` → `run applicable checks` → `verify manually when required` → `stage only approved files` → `commit` → `push` → `verify SHAs`

Rules:
- Do not use unbounded `git add -A` unless you have already reviewed every change.
- Do not overwrite user changes.
- Do not force-push.
- Do not merge `New` into `main` unless the task explicitly says to do so.
- Do not change GitHub default branch unless D9 / release work explicitly requires it.
- Small intermediate edits do not require a commit every time; commit stable, reviewable points.

## 16. Definition of Done

A task is only done when all of these are true:
- the scope stayed within the task,
- applicable lint / typecheck / test / build checks passed,
- the change was verified in the right way for the task,
- no frozen boundary was violated,
- no new dependency was added without justification,
- no unrelated files were changed,
- `git diff` was checked,
- human-only gates were not self-claimed as passed.

Do not say “done” because it looks fine or should work.

## 17. Project Skills & Tool Routing

Repo-local project workflows live only under `.agents/skills/`:

- `$website-behavior-preserving-simplification` — use only when the user explicitly requests behavior-preserving simplification, cleanup, abstraction reduction, duplication removal, or AI-smell removal.
- `$website-design-in-browser-review` — use only when the user explicitly requests browser, visual, UI, responsive, or Design in Browser review; it collects evidence and cannot approve the human Visual Quality Gate.

Project Skills must obey this `AGENTS.md`, `docs/10-development-plan/engineering-standards-v0.1.md`, task-relevant Node documents, and the current explicit task. A Skill is a workflow, not a new fact source, Rule, permission, or automated gate.

For any Skill, Plugin, MCP, Browser, GitHub, Vercel, or external-tool task, read `docs/10-development-plan/tool-governance-v0.1.md`. Codex and Cursor use the same `.agents/skills/` source; do not create Cursor-specific copies.
