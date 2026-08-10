# Eterna Website 1.0 — Skills Audit & Capability Design

内部版本：`v0.1`

文档性质：`Eterna Website 1.0 — Skills Audit & Capability Design`

状态：`PASS / P5-A COMPLETE`

编制日期：`2026-08-10`（Asia/Shanghai）

> 本文件审计 Website 1.0 在 Stage 1.1–1.9 中真正值得封装的 AI 工作流程，并设计最小 Skill contract。
> 本轮不安装、创建或启用 Skill，不决定 Plugin / MCP，不配置 Automation，不修改 Rules，也不开始 Stage 1.1。

---

## 1. Scope

P5-A 只回答三个问题：哪些重复任务需要 task-specific workflow，哪些已经由 Rules 或 Engineering Standards 解决，哪些应交给 Plugin / MCP 或 Automation。

审计依据：

- `AGENTS.md` 的 always-on 工作纪律；
- `engineering-standards-v0.1.md` 的完整 P4 工程规范与 Code Review Checklist；
- `development-plan-v0.1.md` 的 Stage 1.1–1.9 重复任务和人工 Gate；
- 两份 `.cursor/rules/` 适配层；
- Aftelle 工具治理中“只解决真实问题、按需启用、自动化优先、数量从严”的可迁移经验。

Aftelle 的 Skill 名单和 Swift、Xcode、Metal、RuntimeCore、DR、Stage 7、macOS 专属约束不迁移到 Website。

---

## 2. Skill definition

Skill 是：

> 针对一类重复出现、具有稳定执行步骤、需要上下文判断但又不适合 always-on 的任务，提供可复用工作流程。

适合 Skill 的任务应重复发生、步骤稳定、普通 prompt 容易漏项，并且能通过流程显著降低错误率或人工提示成本。

以下边界必须保持：

```text
Rule
= always-on constraint

Skill
= task-specific reusable workflow

Plugin / MCP
= external capability / service / tool access

Automation
= deterministic machine gate
```

永久约束、一次性任务、可由机器确定的检查、外部服务能力和单纯的长提示词收藏都不应 Skill 化。

Skill 可以引用 Rules，不复制 Rules；可以组织工具使用，不替代 Plugin / MCP；可以汇总自动检查，不包装 Automation。

---

## 3. Current skill inventory

对 Website 仓库的明显定义位置和关键词搜索结果：

| 位置 | 结果 |
|---|---|
| `skills/` | 不存在 |
| `.agents/skills/` | 不存在 |
| `.codex/` | 不存在 |
| `.cursor/skills/` | 不存在 |
| 其他项目级 `SKILL.md` | 未发现 |
| `.cursor/rules/` | 存在两份 always-on Rule，不是 Skill |

```text
CURRENT_PROJECT_SKILLS = NONE
```

可用的环境级或其他项目工具不构成 Website project-specific Skill，也不能据此假设 Website 已安装某项能力。

---

## 4. Repeated task map

| 工作类别 | Stage 1.1–1.9 重复性 | 主要易错点 | 正确承载方式 |
|---|---:|---|---|
| Code Review | 高 | scope 扩张、重复造轮子、边界与 AI smell | `AGENTS.md` + Engineering Standards 第 33 节 + 普通 review task |
| Behavior-preserving simplification | 中高 | 自动重构、误改行为、清理范围扩张 | 明确触发的 Skill workflow |
| Design in Browser review | 高，集中在 Stage 1.4–1.8 | 矩阵漏项、证据不足、AI 自行判 PASS | Website-specific Skill workflow + Human final authority |
| Dependency review | 低 | 为方便引入依赖、遗漏成本与安全 | Engineering Standards 第 25 节；机器 audit 交 P6 |
| Content / fact review | 高 | 来源、事实状态、双语、发布边界混淆 | schema / gates + human Fact / Language / Publish review；Skill 暂缓 |
| Release / RC review | 后期重复 | 自动与人工证据混淆、跨域 checklist 漏项 | Node 10 Stage 1.8 / Stage 1.9 + P6 gates；等真实流程后再判断 Skill |
| format / lint / typecheck / build | 每阶段 | 结果漏跑或不一致 | P6 / CI Automation，不包装成 Skill |
| GitHub / Vercel / Browser / Figma | 按任务 | 外部权限、连接与状态 | P5-B Plugin / MCP，不包装成 Skill |

---

## 5. Candidate evaluation

裁决标准为 `CORE`、`OPTIONAL`、`DEFER`、`REJECT`。候选必须证明重复性、稳定流程、非 Rule、非 Automation、非 Plugin，并且不与其他 Skill 重叠。

| 候选 | 裁决 | 理由 |
|---|---|---|
| Website Code Review | `REJECT` | P4 第 33 节已有完整 Website checklist；普通 review 可直接引用，另建 Skill 只会形成第三套规则 |
| Behavior-Preserving Simplification | `CORE` | 需要稳定的“锁定行为、限缩范围、删除无价值复杂度、重新验证”流程；不能由 lint 自动完成，也不应 always-on |
| Design in Browser Review | `CORE` | Stage 1.4–1.8 高频且项目特异，必须稳定覆盖双语、三类 viewport、no-Resident、reduced-motion 和人工 Gate 边界 |
| Dependency Review | `REJECT` | P4 第 25 节已足够；新增很少，确定性 audit 属于 P6 |
| Content / Fact Review | `DEFER` | 高价值但当前由 schema、来源记录和人类审核共同承担；等待 Stage 1.2 暴露真实重复遗漏后再决定是否需要窄 Skill |
| Release / RC Review | `DEFER` | Stage 1.8 / Stage 1.9 已有正式 checklist，最终形态依赖 P6 gates 与 P5-B 外部能力；现在设计会预测性重复 |
| Run Lint / Typecheck / Build | `REJECT` | 纯机器步骤，应成为脚本与 CI gate |
| External Tool Wrapper | `REJECT` | 外部访问能力属于 Plugin / MCP；Skill 不能伪装成连接器 |

两个 CORE 的准入核对：

| 准入维度 | Behavior-Preserving Simplification | Design in Browser Review |
|---|---|---|
| Stage 1.1–1.9 会重复使用 | 是，复杂实现形成后按需使用 | 是，Stage 1.4–1.8 逐页和 RC 使用 |
| 流程稳定 | 行为基线 → 简化 → 回归验证 | 审核矩阵 → 证据 → findings → 人工裁决 |
| 普通 prompt 易漏项 | 易漏行为不变、scope 和回归证明 | 易漏语言、viewport、降级与 Human Gate |
| 非 always-on Rule | 只在明确请求 simplify 时触发 | 只在页面进入浏览器审核时触发 |
| 非 P4 重复 | P4 提供判断标准，Skill 提供变更流程 | P4 提供代码底线，Skill 组织视觉证据流程 |
| 非 P6 Automation | 行为等价与抽象质量需要判断 | 最终视觉质量不能机器裁决 |
| 不依赖外部服务定义职责 | 是 | 是；可使用人工提供的浏览器证据，外部控制只影响执行便利 |
| 明显降低遗漏 | 是 | 是 |
| Scope 可控 | 绑定明确文件、行为和验证 | 绑定明确页面、矩阵和审核轮次 |
| 与另一 Skill 不重叠 | 负责获授权的代码简化 | 默认只负责视觉审核与证据 |

没有 `OPTIONAL` 候选。当前有价值的流程要么足以成为 CORE，要么应等待真实证据或直接由现有治理承担。

---

## 6. Final minimal skill set

最终建议：

```text
CORE_SKILL_COUNT = 2
OPTIONAL_SKILL_COUNT = 0
```

1. `website-behavior-preserving-simplification`：只在明确请求时，对已经工作的限定实现做行为保持简化并重新验证。
2. `website-design-in-browser-review`：组织 Website 真实浏览器审核矩阵、证据和问题输出，始终保留人工最终裁决。

两者不重叠：前者是经明确授权的代码变更 workflow；后者默认是视觉审核与证据 workflow，不授权实现修改。

本轮不立即创建这两个 Skill。P5-C 应在 Rules、Plugin / MCP 与 P6 Automation 边界最终对齐后，决定是否实现。

---

## 7. Deferred and rejected candidates

### 7.1 `DEFER`

- Content / Fact Review：若 Stage 1.2–1.6 实际出现跨页面、双语和 publication 审核反复漏项，再设计只组织证据、不成为事实源的 contract。
- Release / RC Review：等 P6 自动门禁、P5-B 外部能力和真实 Stage 1.8 输入形成后，再判断是否仍有未被覆盖的人工编排工作。

### 7.2 `REJECT`

- Website Code Review：直接引用 Engineering Standards 第 33 节，不复制 checklist。
- Dependency Review：使用 Engineering Standards 第 25 节，机器检查交 P6。
- Context / Scope / Git / DoD Skill：这些是 `AGENTS.md` 的 always-on Rule。
- Lint、Typecheck、Build、Schema、Route、Locale、Secret Scan、Dependency Audit、axe、Playwright smoke：这些是 Automation。
- GitHub、Vercel、Browser、Figma、Security scanner、deployment wrapper：这些是 Plugin / MCP 或外部服务能力。

以上候选存在明显“为了工具而工具”的风险；增加 Skill 只会扩大上下文、产生冲突或掩盖真实责任归属。

---

## 8. Minimal contracts

### 8.1 `website-behavior-preserving-simplification`

**Trigger**

用户明确要求 simplify、cleanup、remove duplication 或 remove AI smell，且目标实现已经工作、行为基线可说明。

**Input**

- 明确的文件或 diff 范围；
- 必须保持的行为 / public contract；
- 当前验证方式和已知限制；
- 直接相关的 Rules、Engineering Standards 与 Node 文档。

**Workflow**

1. 锁定授权范围、行为基线和不可改变项；
2. 读取目标及最小调用上下文，确认真实所有者；
3. 识别无价值 abstraction、wrapper、重复、unnecessary state / effect 和 AI smell；
4. 只实施可证明行为等价的最小简化；
5. 复核 diff，确认没有新 dependency、API、内容或视觉变化；
6. 运行原验证与风险相称的回归检查；
7. 报告删除的复杂度、保持的行为、检查结果和未处理事项。

**Output**

- scoped changed files；
- simplification summary；
- preserved behavior / contract；
- verification evidence；
- remaining risks or `NONE`。

**Must not**

- 自动触发“看到代码就重构”；
- 改变 UX、route、content、public API 或事实边界；
- 扩大到邻近 cleanup；
- 用新 abstraction 或 dependency 替换旧复杂度；
- 把自动检查当作视觉 Gate PASS。

**Authority**

`AGENTS.md` → Engineering Standards → task-relevant Node docs → 当前明确任务。

### 8.2 `website-design-in-browser-review`

**Trigger**

Home、Digital Residents、Products、Aftelle、Studio、About、Motion、Resident 或 RC 已具备可审核的真实浏览器版本，需要执行 Node 7 / Node 8 视觉流程。

**Input**

- 明确的 commit / diff 与页面范围；
- local 或 Preview URL；
- 中文 / 英文 route；
- Desktop / Tablet / Mobile viewport；
- no-Resident、reduced-motion 与相关 failure states；
- 直接相关的 Node 7 / Node 8 页面与质量门禁。

**Workflow**

1. 锁定页面、语言、viewport、状态和不在范围内的项目；
2. 在真实 route 与真实内容中建立审核矩阵；
3. 收集中文、英文、Desktop、Tablet、Mobile 的可追溯证据；
4. 分别检查 no-Resident、reduced-motion、必要 failure / degradation；
5. 对照 Visual Quality、Anti-pattern / DEAD Gate 与页面冻结职责记录 findings；
6. 区分自动观察、AI review 和必须由人裁决的视觉结论；
7. 输出阻塞项、证据缺口和下一轮复核范围。

**Output**

- review matrix；
- evidence references；
- severity-ordered findings；
- unresolved / blocked items；
- `HUMAN_DECISION_REQUIRED`。

**Must not**

- 自动宣布 Human Visual Gate `PASS`；
- 用 build、Lighthouse、axe 或截图相同替代人工视觉判断；
- invent content、事实或视觉冻结结果；
- 未经请求修改实现；
- 把一个页面的审核扩大到全部页面。

**Authority**

`AGENTS.md` → Engineering Standards → task-relevant Node 7 / Node 8 / Node 10 docs → 当前明确任务。Browser access 是否通过外部能力提供，由 P5-B 决定，不改变本 workflow 的人工裁决边界。

---

## 9. Boundary with Rules, Plugins and Automation

### Rules already cover

`AGENTS.md` 已负责 minimal context、scope、surgical changes、reuse-first、Git、Legacy、安全边界和 DoD。Engineering Standards 已负责 React / Next.js / TypeScript / CSS、Content boundary、Dependency、Errors、Testing philosophy、Security、Performance、Anti-AI-code 和 Code Review Checklist。

`.cursor/rules/website-context-mode.mdc` 与 `website-code-standards.mdc` 只是上述权威的薄适配层，不形成第三套规范，也不是 Skill。

### P6 Automation owns

- format、lint、TypeScript strict、test、build；
- content schema、route、locale、publication 与 asset validation；
- secret scan、dependency audit、unused / dead-code checks；
- automated accessibility、Playwright smoke 与 deterministic release checks。

### P5-B Plugin / MCP owns

- GitHub 与 review / repository external state；
- Vercel、deployment service 与 production / Preview external state；
- Browser / Playwright external control；
- Figma 与设计源访问；
- Security scanner；
- MCP、external API、SaaS 与其他服务连接。

Plugin availability 不得改变 Rules、事实来源或 Human Gate。

---

## 10. P5-B handoff

P5-B 应审计外部能力是否真实需要、是否已有、权限与数据边界、维护状态和替换成本，但不得重新设计本文件的 Skill workflow，也不得因某个 Plugin 可用就自动批准安装。

P5-A 最终回答：

1. Website 当前没有 project-specific Skill；
2. 值得 Skill 化的是行为保持简化与 Design in Browser Review；
3. 工作纪律、工程规范和普通 Code Review 已由 AGENTS / P4 解决；
4. 确定性检查交给 P6 Automation；
5. 外部访问能力交给 P5-B Plugin / MCP；
6. 核心 Skill 建议数量为 `2`；
7. 两个 CORE 的职责分别是受控代码简化与浏览器视觉证据编排；
8. 两者没有职责重叠；
9. Code Review、Dependency Review 和机器检查包装存在“为了工具而工具”风险；
10. 现在不安装、不创建、不启用任何 Skill。

```text
SKILL_INSTALLATION = NOT_PERFORMED
P5 = IN_PROGRESS
P6 / P7 = NOT_STARTED
Stage 1.1–1.9 = NOT_STARTED
```
