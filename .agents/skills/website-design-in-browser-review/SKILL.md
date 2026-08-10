---
name: website-design-in-browser-review
description: Review an implemented Eterna Website page in a real browser against the approved Website visual, interaction, responsive, accessibility, and degradation gates. Use when the user explicitly asks for browser, visual, UI, responsive, Design in Browser, Node 7, or Node 8 review. Collect evidence and findings only; never self-approve the human Visual Quality Gate.
---

# Website Design in Browser Review

Review an implemented page in a real browser. Organize evidence and findings; do not redesign the page or grant final visual approval.

## Inputs

Require:

- the target page and local or Preview URL;
- the reviewed commit or working-tree state;
- the current review scope and any known limitations.

Read `AGENTS.md`, the relevant page specification, and only the applicable sections of:

- `docs/07-design-system/visual-direction-v0.1.md`;
- `docs/07-design-system/web-design-system-v0.1.md`;
- `docs/08-product-design/global-interaction-spec-v0.1.md`;
- `docs/08-product-design/node8-freeze-v0.1.md`.

## Workflow

1. Record the target page, URL, commit or state, review scope, and evidence provider.
2. Use the current Browser / Computer Use capability to inspect the real rendered page. When P6 / D1 has installed project Playwright, use its results only as additional deterministic evidence.
3. Cover the task-relevant matrix: Chinese, English, Desktop, Tablet, Mobile, no-Resident, reduced-motion, keyboard, and focus.
4. Compare the rendered result with the applicable Node 7 / Node 8 rules for Product Reality, Living Precision, Typography, Layout, Responsive behavior, Accessibility, Degradation, and Anti-pattern / DEAD Gate.
5. Record concrete evidence for every finding: page, locale, viewport or state, reproduction steps, observed result, and violated rule.
6. Separate code defects, content or fact issues, visual-quality concerns, and unverified human-only judgments.
7. State which findings require implementation changes and which require human review.
8. End with `HUMAN_VISUAL_DECISION_REQUIRED`.

## Output

Report:

- reviewed scope and evidence matrix;
- findings with concrete evidence and governing rule;
- required changes and unresolved limitations;
- `HUMAN_VISUAL_DECISION_REQUIRED`.

## Must not

- Declare visual `PASS` because build, screenshots, Lighthouse, axe, or Playwright passed.
- Modify code unless the current task separately authorizes implementation.
- Treat missing Resident imagery as a failure by itself.
- Substitute personal taste for Node 7 / Node 8.
- Create product, content, brand, or visual facts.
- Treat Browser evidence as final human approval.

This skill is instruction-only and declares no MCP, Plugin, Playwright, or other external dependency.
