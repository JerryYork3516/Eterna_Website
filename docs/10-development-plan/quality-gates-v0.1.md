# Eterna Website 1.0 — Quality Gate Architecture

内部版本：`v0.1`

文档性质：`P6 Quality Gate 架构、检查职责与执行策略`

状态：`PASS / P6 COMPLETE`

编制日期：`2026-08-10`（Asia/Shanghai）

P6-C 设计基线：`New@6ad78400f61b1c7d1165f8a61a2df271751be08c`

> 本文件定义 Website 自动化质量门禁的总体分类、检查职责、执行强度、失败策略、统一严重度和 Stage 1.1–1.9 接入方式。
> P6-A 冻结总体模型；P6-B 冻结首版工具职责、运行模式、执行顺序、owner 与 evidence contract；P6-C 冻结 Machine / Human 边界、Stage Acceptance、RC / Release evidence、例外规则与 P7 handoff。P6 没有安装工具、创建配置或 CI，也没有开始 Stage 1.1。

---

## 1. Scope

P6 自动化的职责是把已经由 Node 1–10、`AGENTS.md`、Engineering Standards 与 Tool Governance 冻结的确定性要求转换为可重复证据，而不是创造新的产品、内容、设计或发布事实。

```text
upstream rules and contracts
→ scope-aware automated checks
→ normalized evidence and severity
→ failure policy
→ human review where required
→ Stage 1.x Exit Gate
```

机器结果只能证明其实际检查的范围。它不能覆盖上层规则，不能自动扩大当前任务范围，也不能代替 Node 7 / Node 8、内容或 Production 的人工裁决。

```text
Automated PASS != Human PASS
```

---

## 2. Gate model

### A. `CODE_GATE`

验证代码和工程是否满足可构建、可检查的基础契约：

- format；
- lint；
- typecheck；
- tests；
- production build。

`CODE_GATE` 证明工程层面的确定性结果，不证明页面视觉、内容事实、抽象质量或依赖价值已经获批。

### B. `WEBSITE_CONTRACT_GATE`

验证 Eterna Website 特有且可机器判断的公开契约：

- 规范 route 与非法 locale 行为；
- 根 `/ -> /zh` 的确定性 redirect；
- `zh / en` 页面配对；
- 稳定且唯一的 `pageId`；
- YAML schema 与受控 enum；
- publication state 与 production fail-closed；
- required source、CTA 与 asset reference；
- metadata、canonical 与 hreflang；
- sitemap 与 robots。

这类 Gate 验证结构、状态和可追溯要求。Schema 通过不能证明内容事实为真，语言配对通过也不能证明中英文表达自然。

### C. `QUALITY_GATE`

验证运行结果并产生可复核的质量与风险证据：

- accessibility automation；
- browser smoke；
- performance；
- security；
- dependency audit；
- secret checks。

`QUALITY_GATE` 可以发现回归和风险，但工具分数或扫描结果不能直接批准视觉、内容、安全处置或 Release Candidate。

### D. `HUMAN_GATE`

保留机器不能可靠裁决、或必须由有权限的人作出的决定：

- Design in Browser；
- Visual Quality；
- Living Precision；
- content factual approval；
- bilingual language quality；
- dependency worth；
- abstraction quality；
- Production authorization。

自动化可以为 `HUMAN_GATE` 收集证据、定位问题和确认确定性前置条件，但不得输出该 Gate 的最终 `PASS`。

---

## 3. Enforcement

执行强度描述某项 Gate 在当前阶段是否必须运行，与 finding 的严重度和失败处置分开。

### `REQUIRED`

当前阶段的正式前置条件。必须执行并得到可接受结果；失败或无法执行时阻止对应阶段继续，不得以人工口头忽略代替证据。

### `CONDITIONAL`

只有相关能力、代码路径或发布范围存在时执行。例如 Contact 尚未启用时，不运行 form-specific Gate；Resident 尚未进入实现时，不运行 Resident lifecycle Gate。

条件不成立时记录 `NOT_APPLICABLE` 及原因，不记录为 `PASS`。能力一旦进入 scope，对应 Gate 必须按当时阶段规则启用。

### `ADVISORY`

提供趋势、回归或风险证据，但当前不直接阻断阶段。Advisory finding 必须可追踪，不得被隐藏；如证据显示它已经违反正式契约，应重新归入对应 `REQUIRED` Gate，而不是继续以 advisory 名义绕过。

P6-B / Stage 1.1 只能依据正式阶段契约为具体检查分配强度，不得为了追求“更严格”把所有检查一律设为 blocker。

---

## 4. Failure policy

失败策略描述检查未满足时如何形成最终决策。

### `FAIL_CLOSED`

用于可重复判断的正式确定性契约，例如：

- TypeScript typecheck；
- production build；
- content schema；
- route / locale / `pageId`；
- publication state；
- required source；
- secret leak。

失败结果为：

```text
BLOCK
```

不得自动忽略、静默 fallback、用默认内容伪造成功，或因其他检查通过而抵消。修复后必须重新运行并保留新证据。

### `REVIEW_REQUIRED`

用于需要结合上下文、阈值和影响范围判断的 finding，例如：

- performance regression；
- dependency warning；
- accessibility finding；
- security finding。

自动化必须给出证据和统一 severity，由明确责任人作出接受、修复、升级或暂缓决定。工具自己的“warning”或分数不能直接转换为 Website 阶段 `PASS`，也不能不经判断自动扩大成阻断。

### `HUMAN_ONLY`

用于必须由人工裁决的 Gate，例如：

- final visual quality；
- Product Reality；
- content approval；
- Production deployment / promotion。

机器最多输出前置检查结果与 `HUMAN_DECISION_REQUIRED`。没有明确人工决定时，Gate 保持未通过；自动检查、截图、分数或 AI review 均不能自行标记 `PASS`。

---

## 5. Unified severity

所有 Gate 的最终 Website finding 统一映射为：

| Severity | 含义 |
|---|---|
| `BLOCKER` | 违反必须成立的正式契约、造成泄密或使对应阶段无法安全继续 |
| `MAJOR` | 对核心行为、内容、可访问性、性能、安全或发布质量有显著影响，必须在阶段裁决前处理 |
| `MINOR` | 影响有限且不破坏核心契约，可在有明确处置和责任人的情况下跟踪 |
| `INFO` | 观察、趋势或无直接失败含义的证据 |

工具原始 severity、分数和术语必须保留在原始证据中，再映射到上述等级。最终是否 `BLOCK` 由 Enforcement、Failure Policy、severity 与阶段契约共同决定；severity 本身不替代处置规则。

---

## 6. Execution principles

### Deterministic first

机器能够稳定判断的契约由确定性检查负责，不依赖 AI 主观判断。AI 可以解释证据，但不能重写测试结果或代替正式人工 Gate。

### Fast first

开发期先运行便宜、快速、定位清楚的代码与契约检查，再运行 browser、E2E、performance 和完整安全检查。后置检查不能用来掩盖前置失败。

### Scope-aware

只运行与当前变更、已存在能力和 D 阶段相关的 Gate。未启用 Contact、Analytics、Resident 或 Production path 时，不制造无意义失败；条件式 Gate 必须明确记录启用条件。

### No duplicate gates

同一正式问题只保留一个清楚的 owning Gate。其他工具可以补充不同证据，但不得让三套重复工具以不同语言反复阻塞同一问题。

### Evidence-based

任何失败或 review finding 至少输出：

- check / Gate identity；
- observed evidence 与 expected contract；
- affected file、route、locale、viewport 或其他明确 target；
- normalized severity。

需要时补充复现上下文、原始工具输出位置和处置责任。禁止只输出 `quality check failed`。

---

## 7. Gate result contract

Gate 结果统一使用以下决策状态，避免把工具退出码直接当作阶段裁决：

- `PASS`：当前自动检查范围内满足契约；
- `BLOCK`：`FAIL_CLOSED` 或阶段要求明确阻止继续；
- `REVIEW_REQUIRED`：存在需要人工处置的 finding；
- `HUMAN_DECISION_REQUIRED`：自动证据完成，但人工 Gate 尚未裁决；
- `NOT_APPLICABLE`：`CONDITIONAL` 启用条件不成立，并已记录原因；
- `NOT_RUN`：尚未运行；不得解释为通过。

阶段只有在其 `REQUIRED` 自动 Gate 满足、所有 review finding 完成正式处置、所需 `HUMAN_GATE` 明确通过且 Exit Gate 其他条件成立后才能继续。

### 7.1 Final Machine / Human boundary

`Machine Gate` 负责可重复、可定位、可审计的确定性证据；`HUMAN_GATE` 负责机器不能可靠裁决的质量、事实、价值与授权。二者是共同前置条件，不是互相替代的两条可选路径。

```text
Automated PASS != Human PASS
Human PASS cannot waive a FAIL_CLOSED machine failure
without an explicit governed exception
```

最终规则：

- Machine PASS 只覆盖实际运行的 check、scope、commit 与 artifact，不能批准 Design、Content、Architecture 或 Production；
- Human PASS 不能把失败的确定性契约改写为机器通过；允许例外时只能按第 19 节记录 `GOVERNED_EXCEPTION`，且不得覆盖明确禁止 override 的 Gate；
- 必需 Human Gate 未裁决时，阶段保持 `HUMAN_DECISION_REQUIRED`，即使全部自动检查通过也不能继续；
- 人工裁决必须以当前实现和机器证据为输入，不得用主观认可忽略错误 route、内容发布状态、secret 或 broken build；
- AI、截图、axe、Playwright、Lighthouse、CodeQL 或 build success 均不能代表人工授权。

`HUMAN_GATE` 至少覆盖：

- Design in Browser；
- Visual Quality Gate 与 Living Precision；
- 页面是否模板化、是否有明显 AI 味；
- 内容事实、来源与公开范围；
- 中文与英文表达质量；
- 高影响 dependency / architecture decision；
- Production authorization。

---

## 8. Stage Acceptance Matrix

| Stage | Required Machine / deterministic acceptance | Required Human acceptance |
|---|---|---|
| Stage 1.1 | `CODE_GATE` baseline、production build、tooling / config consistency 与 Legacy isolation | 工程基线足够轻、可维护、可恢复且未引入无必要抽象 |
| Stage 1.2 | YAML / schema、6 `pageId`、12 routes、locale pairing、根 `/ -> /zh`、publication / source contract | content contract、事实责任、双语和公开边界审核 |
| Stage 1.3 | shell / navigation、metadata / canonical / hreflang、sitemap / robots、accessibility baseline | Header / Footer / navigation 的真实双语浏览器、keyboard 与基础辅助技术检查 |
| Stage 1.4 | 当前 Home 的适用 `CODE_GATE`、`WEBSITE_CONTRACT_GATE`、`QUALITY_GATE` | Home Design in Browser：中文 / English、Desktop / Tablet / Mobile、Visual Quality 与 no-Resident / reduced-motion |
| Stage 1.5 | 当前 Digital Residents 页的适用 Code / Contract / Quality checks | Digital Residents Visual / Content Gate：定义、双语、响应式与 Resident 价值 |
| Stage 1.6 | Products / Aftelle / Studio / About 的适用 Code / Contract / Quality checks | 四页逐页 Design in Browser 与六页面整体 Visual / Content / Brand consistency Gate |
| Stage 1.7 | no-Resident、reduced-motion、renderer / visual failure degradation、lifecycle 与 performance evidence | Resident / Motion 的必要性、Living Precision、视觉质量和成本价值 |
| Stage 1.8 | `RC_FULL`，且第 17 节 RC evidence 完整 | full-site Visual / Content / Accessibility / Responsive / Degradation RC approval |
| Stage 1.9 | 已批准 RC 仍有效、production build、environment / canonical host / release preflight 与 rollback readiness | explicit Production authorization、cutover 与 rollback 条件批准 |

本矩阵是最小阶段接受摘要，不替代 Node 10 的 Acceptance Criteria、Automated Checks、Human Review、Dependencies 与 Exit Gate。Machine 和 Human 两列均满足后，阶段才可能完成。

---

## 9. First-version check selection

P6-B 只冻结工具职责和 preferred path；精确 package、version、config、command 与 workflow 由 Stage 1.1 在真实根应用中落地。

### 9.1 `CODE_GATE`

| Check | Preferred responsibility | Boundary |
|---|---|---|
| Format | Prettier 只判断受控源码和文档是否符合统一格式 | 不承担 lint、语义或代码质量判断 |
| Lint | ESLint CLI + 与当前 Next / React / accessibility 边界相关的规则 | 精确 config 与 plugin 在 Stage 1.1 按实际 framework version 决定；lint 不能代替 axe 或人工可访问性审核 |
| Type | TypeScript strict + framework type generation / typecheck | 不用 type assertion、`any` 或跳过生成步骤伪造通过 |
| Unit / contract | Vitest，优先验证纯逻辑、schema、route、locale、publication 与 failure contract | 不以 coverage 数字或 implementation-detail tests 代替行为证据 |
| Build | Next production build | 失败为 `FAIL_CLOSED -> BLOCK` |

首版核心路径：

```text
format check
→ lint
→ typecheck
→ unit / contract tests
→ production build
```

### 9.2 `WEBSITE_CONTRACT_GATE`

Website 自有契约优先由 repository-owned deterministic validators 与 Vitest contract tests 验证，不依赖 AI 判断，也不把 YAML schema 变成 Layout engine。

必须覆盖：

- `pageId` 只允许 `home`、`digital-residents`、`products`、`product-aftelle`、`product-studio`、`about`；
- allowlist 恰好映射 12 个 `/zh` / `/en` 规范 route，且 route 唯一；
- 根 `/` 确定性 redirect 到 `/zh`，非法 locale 不做模糊 fallback；
- 每个 `pageId` 恰好有一份 `zh` 和一份 `en`，`pairedPageId` 与当前稳定身份一致；
- route、record locale 与 URL locale 一致；
- language switch target 存在，并保持当前 `pageId`；
- YAML 通过安全解析、schema、enum 与 required-field validation；
- publication state 合法，production 只消费 `PUBLISHED`；
- fact / source required fields、CTA target 与 asset reference 满足发布契约；
- canonical 唯一且匹配当前语言规范 URL；
- hreflang、sitemap 与 robots 来自同一受控 route / publication mapping；
- production 页面、metadata、navigation、sitemap 与输出 artifact 不含 `DRAFT`、`REVIEW_REQUIRED`、`WITHDRAWN` 或 Preview-only content。

上述 production contract 失败默认 `FAIL_CLOSED`。Validator 只证明结构、状态和引用关系成立，不证明内容事实、翻译质量或公开批准已经通过人工审核。

### 9.3 `QUALITY_GATE`

| Area | Preferred path | Human / fallback boundary |
|---|---|---|
| Browser smoke | Playwright | manual Chrome / real device 用于交互补证；自动 smoke 不产生视觉 PASS |
| Accessibility | axe 与 Playwright 集成，检查可自动判断的问题 | keyboard、VoiceOver、zoom、reduced-motion 和最终 WCAG 处置仍需人工 |
| Performance | Lighthouse CI；Next build / bundle output 作为补充证据；production field metrics 在可用后加入 | 不以 Lighthouse 分数批准视觉或真实用户性能 |
| Dependency security | `npm audit` 基于 committed lockfile；可用时由 GitHub dependency security 提供远端持续证据 | 同一 vulnerability 不建立两个重复 blocker |
| Secret scan | GitHub Secret Scanning；不可用时替换为一条等价 deterministic scanner | secret evidence 不输出 secret value；外部设置变更仍需明确授权 |
| SAST | CodeQL；不可用时替换为单一等价 SAST | 不叠加第二套商业 SAST；finding 进入统一 severity 与 disposition |

Playwright 的首版 browser smoke 覆盖：

- 12 个正式 URL；
- primary navigation 与当前状态；
- language switching；
- 404；
- no-Resident path；
- reduced-motion path。

Security 保持最小单一路径：

```text
dependency audit = npm ecosystem + available GitHub dependency security
secret scan = GitHub Secret Scanning or one equivalent deterministic scanner
SAST = CodeQL or one equivalent SAST
Codex Security = DEFER
```

GitHub capability 不可用时，Stage 1.1 / P6 实施可以选择职责等价、可审计且不重复的替代工具；替换不构成并行叠加批准。

---

## 10. Run modes

### `LOCAL_FAST`

开发过程中高频运行，只保留低成本、定位快速的当前范围检查：

```text
format
→ lint
→ typecheck
→ relevant unit / contract tests
```

不要求每次局部修改都运行完整浏览器、performance 或全仓安全扫描。提交前仍须按变更风险补足相关检查。

### `CI_STANDARD`

用于 commit / PR 的标准确定性证据：

```text
frozen install
→ format
→ lint
→ typecheck
→ content / route / locale validation
→ tests
→ production build
→ security deterministic checks
→ Playwright browser smoke + axe automation
```

没有数据依赖的步骤可以并行，但逻辑 Gate 顺序不变：高成本 browser checks 不应掩盖前置 `FAIL_CLOSED` 失败。

### `RC_FULL`

Stage 1.8 在 `CI_STANDARD` 基础上增加：

- 12-route full smoke 与 404；
- metadata、canonical、hreflang、sitemap 与 robots 全量验证；
- production / Preview content-state 与 noindex 边界；
- Lighthouse CI、bundle evidence 与可用的真实 field metrics；
- full axe evidence，加上 keyboard / VoiceOver / 200% zoom 人工证据；
- no-Resident、reduced-motion、asset / partial-JS / renderer degradation；
- Node 7 / Node 8 Visual Quality、内容、双语与 RC `HUMAN_GATE`。

Stage 1.9 不重新设计质量体系，也不重新批准视觉；它绑定已通过的 immutable RC evidence，执行 release identity、production response、rollback readiness 与 Production authorization。

---

## 11. Execution order and stopping policy

```text
cheap / deterministic checks
→ contract validation and tests
→ production build
→ security deterministic checks
→ expensive browser / accessibility checks
→ performance
→ human review
```

如果前置 `FAIL_CLOSED` Gate 已失败，默认停止高成本 downstream Gate。只有为定位根因、确认影响面或收集一次性诊断证据时才继续，并必须明确标记为 diagnostic run，不得把后续结果用于抵消前置 `BLOCK`。

并行只用于互不依赖的检查，不改变 owner、failure policy 或最终 stage decision。

---

## 12. Gate ownership

| Gate | Responsibility owner |
|---|---|
| `CODE_GATE` | Engineering |
| `WEBSITE_CONTRACT_GATE` | Content / Route contract |
| `QUALITY_GATE` | Engineering + Browser evidence |
| `HUMAN_GATE` | Human reviewer |

Owner 表示责任类型和 finding 去向，不虚构团队、职位或具体人员。跨 Gate finding 必须指定一个 primary owner，避免重复处置或无人负责。

---

## 13. Evidence format

各工具可以保留自己的原始输出；Website 只要求最终归一化摘要。每个失败或 review finding 至少包含：

```text
Gate:
Check:
Severity:
Target:
Evidence:
Action:
Blocking:
```

- `Target` 指向具体 file、route、locale、viewport 或 artifact；
- `Evidence` 记录 expected / observed 与可复现证据位置，不泄露 secret；
- `Action` 说明修复、人工处置或重新验证要求；
- `Blocking` 使用当前 Enforcement 与 Failure Policy 得出的结果，而不是直接复制工具退出码。

通过记录应至少绑定 check identity、scope、commit / artifact 与结果；`NOT_APPLICABLE` 必须记录条件不成立的原因。

---

## 14. Threshold policy

P6-B 只继承已经冻结的上位目标：

- accessibility 目标为 WCAG 2.2 AA，自动化只是其中一类证据；
- production 真实用户第 75 百分位 Core Web Vitals Good 目标为 LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1。

当前没有真实根应用、Preview 或 production baseline，因此不创建以下硬阈值：

- arbitrary coverage percentage；
- arbitrary bundle KB limit；
- Lighthouse 100；
- universal zero-warning policy。

Stage 1.1 建立工程基线，Stage 1.4–1.8 在真实页面、Preview 和 production-like evidence 上校准可执行 threshold。新阈值必须说明 metric、environment、sample、blocking policy 与回退方式，不能用工具默认值静默改写正式 Gate。

---

## 15. Conditional gates

以下能力未启用时，不运行其专项实现检查：

- Contact form tests；
- API security tests；
- Analytics checks；
- third-party integration tests；
- Resident renderer-specific tests。

关闭状态本身仍可确定性验证。例如 Contact 未批准时，route、navigation、CTA 与 production output 均不得暴露公开可执行 Contact 入口；Analytics 未批准时不得加载 tracking script。对应能力未来进入 scope 时，其 Conditional Gate 必须同步启用。

---

## 16. Stage 1.1 implementation handoff

Stage 1.1 在真实根应用中负责安装、固定版本并配置首版 repository tooling：

- Prettier；
- ESLint 与当前 Next / React / accessibility 相关规则；
- TypeScript strict 与 framework typecheck；
- Vitest；
- Playwright；
- axe 的 browser-test integration。

Lighthouse CI 在出现可测量页面与 Preview 后按阶段需要接入；`npm audit` 不新增 scanner dependency。GitHub dependency security、Secret Scanning 与 CodeQL 属于 hosted capability / workflow，不是 npm production dependency；其启用、权限和 workflow 变更必须遵守 Tool Governance 与当前任务授权。

Stage 1.1 还要定义具体 npm scripts、validator 实现、config、CI YAML、版本锁定、缓存和并行策略。P6-B 不执行这些动作。

---

## 17. Stage 1.8 Release Candidate evidence

Stage 1.8 的 `RC_FULL` 输出必须绑定同一 candidate identity，包括 commit、content、asset 与 production-like Preview；不能拼接不同提交或过期环境的通过结果。RC evidence 至少包含：

- commit SHA 与 Preview / artifact identity；
- production build result；
- 12-route result 与 404；
- content / locale / `pageId` / publication validation；
- metadata、canonical、hreflang、sitemap 与 robots；
- browser smoke；
- automated 与人工 accessibility evidence；
- no-Resident evidence；
- reduced-motion evidence；
- dependency、secret 与 SAST security result；
- Lighthouse / bundle / available field performance evidence；
- unresolved findings list；
- Human Visual / Content / bilingual / RC decisions。

RC candidate 只有同时满足以下条件才可通过：

```text
BLOCKER = NONE
MAJOR = NONE
REQUIRED MACHINE GATES = PASS
REQUIRED HUMAN GATES = PASS
```

`MINOR` 不得自动忽略。是否允许带入 RC，必须由人工对每项明确裁决并记录 reason、risk、owner、follow-up 与是否影响 Stage 1.9；未处置的 `MINOR` 使 RC 保持 `REVIEW_REQUIRED`。

---

## 18. Stage 1.9 Release evidence

Stage 1.9 不建立第二套 RC。它验证已批准 RC 与实际 release target 的连续性，至少记录：

- release commit 与 approved RC commit 的关系；
- production build 与 deploy artifact identity；
- environment identity 与必要配置完整性，不记录 secret value；
- canonical host；
- production robots 与 sitemap；
- Vercel deployment target；
- branch / reviewed promotion / default-branch state；
- rollback target、owner、window 与可用性；
- Contact、Analytics、Resident 等 Conditional feature flags；
- RC unresolved findings 是否仍适用、是否出现新风险。

如果 release commit、content、asset、environment 或 feature scope 相对 approved RC 发生变化，必须明确影响范围并重新运行受影响 Gate；不得把旧 RC evidence 静默套用到新 artifact。无关且可证明不影响 RC 的 release metadata 变化也必须记录关系。

```text
PRODUCTION_AUTHORIZATION = HUMAN_ONLY
```

自动 build、deployment、smoke、DNS / TLS 或 rollback check 成功不能自行批准 promotion、DNS、domain、default branch、cutover 或上线。

---

## 19. Exception policy

Gate 例外只能由人工明确授权，并且不把原失败结果改写成 `PASS`。最小记录为：

- failed Gate / check；
- severity；
- reason；
- scope；
- accepted risk；
- `TEMPORARY` 或 `PERMANENT`；
- follow-up requirement；
- explicit human authorization evidence。

临时例外还必须有失效条件或最晚复核点。例外只适用于记录的 scope、commit / artifact 与阶段；后续变更不得自动继承。

以下情况禁止 override：

- secret leak；
- invalid production content 或未批准 publication state；
- broken production build；
- wrong route / locale / `pageId` contract；
- 未经人工授权的 Production action。

本规则不建立额外审批系统；仓库中的可追溯记录和当前任务的明确人工授权构成最低治理要求。为赶进度、工具误报但无证据、或“其他 Gate 已通过”均不是有效例外理由。

---

## 20. Duplicate Gate Review

P6-A / P6-B final review：`PASS`。未发现实质冲突；总模型与具体检查保持一层 summary、一层 owning implementation responsibility。

- axe 是首版唯一 automated accessibility scanner；ESLint accessibility rules 只做静态代码提示，Playwright 只承载浏览器执行，三者不建立重复最终判决；
- CodeQL 是首版唯一 SAST preferred path，不同时要求第二套 SAST；
- Lighthouse CI 提供 lab / regression evidence，Core Web Vitals Good targets 是 production field outcome；二者进入同一 Performance finding / disposition，不作为两套独立最终 PASS；
- dependency audit、secret scan 与 SAST 检查不同风险面；同一 finding 只保留一个 primary owner 和一个 blocking decision；
- Code Review Skill 仍为 `REJECT`，abstraction、dependency worth 与 AI smell 保留人工工程审核，不复制为 Skill；
- screenshot regression 只提示变化，不能替代 Design in Browser 或 Human Visual Gate；
- 自动 Gate 不产生 Content、Visual、RC 或 Production 人工批准。

因此无需删除 P6-A/B 的正式职责；本轮通过最终边界、Stage Matrix 和单一 finding ownership 消除潜在重复解释。

---

## 21. Historical P7 handoff

P7 接收：

- P1–P6 `FINAL PASS` 状态；
- 本 `quality-gates-v0.1.md`；
- `AGENTS.md`；
- Engineering Standards；
- repo-local Skills 与 Tool Governance；
- Node 10 Development Plan。

P7 负责 Node 10 的最终一致性复核与冻结，确认 P1–P6 的治理、事实、设计、技术、工程和 Gate 输入能够共同支持 Stage 1.1。P7 不重新设计 P1–P6，也不能把 review 便利变成新的产品事实、工具安装、CI 实施或 Stage 1.1 开始授权。

P6 收口时，P7 尚未开始。该状态仅记录当时的 handoff snapshot，不代表当前状态。当前 Stage / Node 状态以 `development-plan-v0.1.md` 为准。

---

## 22. P6 historical final state

以下状态块仅记录 P6 收口时的历史快照，不代表当前 Stage / Node 状态。当前状态以 `development-plan-v0.1.md` 为准。

```text
P6-A = PASS
P6-B = PASS
P6-C = PASS
P6 = FINAL PASS
P7 = NOT_STARTED
Node 10 = REVIEW_REQUIRED
Stage 1.1–1.9 = NOT_STARTED

TOOLS_INSTALLED = NO
CI_CONFIGURED = NO
NODE_1_10_CHANGED = NO
LEGACY_CHANGED = NO
```
