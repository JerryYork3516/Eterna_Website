---
name: website-behavior-preserving-simplification
description: Simplify existing Eterna Website code without changing behavior or expanding scope. Use only when the user explicitly asks to simplify, clean up, reduce unnecessary abstractions, remove duplication, or remove AI code smell from an existing implementation. Do not invoke merely because code could be cleaner during feature work.
---

# Website Behavior-Preserving Simplification

Simplify only an explicitly authorized existing implementation. Preserve behavior, scope, public contracts, and visual output unless the current task separately authorizes a change.

## Inputs

Require:

- the target files or diff boundary;
- the behavior and public contracts that must remain unchanged;
- the existing verification baseline and known limitations.

Read `AGENTS.md`, the relevant sections of `docs/10-development-plan/engineering-standards-v0.1.md`, and only the directly related implementation and Node documents.

## Workflow

1. Restate the authorized scope, preserved behavior, public contracts, and visual boundary.
2. Establish the current validation baseline before editing.
3. Identify proven complexity: unnecessary wrappers or abstractions, duplicated same-semantics logic, unused helpers, unnecessary state or effects, unclear ownership, naming problems, or AI code smell.
4. Confirm that each target can be removed or simplified without changing behavior.
5. Make the smallest direct simplification. Do not add a dependency or replace one abstraction with another speculative abstraction.
6. Avoid unrelated formatting, cleanup, renaming, or refactoring.
7. Run the existing checks and focused regression evidence proportionate to the change risk.
8. Review the complete diff for scope, behavior, contract, visual, dependency, and Legacy integrity.

## Output

Report:

- changed files and removed complexity;
- preserved behavior, public contracts, and visual result;
- verification evidence and limitations;
- remaining risks or `NONE`.

## Must not

- Trigger automatically during feature implementation.
- Change public behavior, UX, route, content, public API, or visual output without separate authorization.
- Expand into adjacent cleanup or repository-wide refactoring.
- Create a new abstraction merely to remove an old abstraction.
- Merge implementations that only look similar but have different semantics, lifecycles, owners, or change reasons.
- Add a dependency.
- Claim an automated check passes a human visual gate.

This skill requires no scripts, references, assets, MCP, or Plugin dependency.
