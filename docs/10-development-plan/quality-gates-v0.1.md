# Eterna Website 1.0 — Quality Gate Architecture

内部版本：`v0.1`

文档性质：`P6-A Quality Gate 架构与失败策略`

状态：`DRAFT / P6-IN-PROGRESS`

编制日期：`2026-08-10`（Asia/Shanghai）

设计基线：`New@01735066ada0ccc498680254e21af3b23d9cf8f3`

> 本文件定义 Website 自动化质量门禁的总体分类、执行强度、失败策略、统一严重度和 D1–D9 高层接入方式。
> P6-A 不选择或安装具体工具，不配置 CI，不定义完整命令与阈值，不执行 P6-B，也不开始 D1。

---

## 1. Scope

P6 自动化的职责是把已经由 Node 1–10、`AGENTS.md`、Engineering Standards 与 Tool Governance 冻结的确定性要求转换为可重复证据，而不是创造新的产品、内容、设计或发布事实。

```text
upstream rules and contracts
→ scope-aware automated checks
→ normalized evidence and severity
→ failure policy
→ human review where required
→ D-stage Exit Gate
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

P6-B / D1 只能依据正式阶段契约为具体检查分配强度，不得为了追求“更严格”把所有检查一律设为 blocker。

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

---

## 8. D-stage mapping

| Stage | High-level Gate focus |
|---|---|
| D1 | 工程基础 `CODE_GATE`，Legacy 隔离与最小 deterministic baseline |
| D2 | Content、route、locale、`pageId`、schema、source 与 publication 的 `WEBSITE_CONTRACT_GATE` |
| D3 | SEO、shared shell、semantic HTML 与 accessibility baseline |
| D4–D7 | 与页面范围相称的自动 Gate，加上不可替代的 Human Visual / Content / Motion Gate |
| D8 | 12 URL、全站 content / SEO / accessibility / performance / security / degradation 的 Release Candidate Gate，加上人工 RC Gate |
| D9 | release identity、production response、rollback readiness 等确定性 Gate，加上 Production authorization |

这是职责映射，不是命令清单。每一 D 阶段仍服从 Node 10 的 Acceptance Criteria、Automated Checks、Human Review 与 Exit Gate。

---

## 9. Deferred to P6-B / D1

P6-A 不决定或实施：

- ESLint 精确配置；
- Prettier 配置；
- Vitest / Playwright 的选择、安装或命令；
- axe package 与规则配置；
- Lighthouse 配置与阈值；
- CodeQL workflow；
- secret scanner 具体产品；
- dependency audit 具体产品与阈值；
- GitHub Actions YAML；
- npm scripts；
- CI pipeline、缓存、并行与具体执行顺序。

P6-B 负责在本架构内定义具体工具、Gate ownership、执行顺序、启用条件、阈值与 evidence format；实际依赖和工程配置仍由 D1 按正式授权落地。

---

## 10. P6-A state

```text
P6-A = PASS
P6 = IN_PROGRESS
P6-B = NOT_STARTED
P7 = NOT_STARTED
Node 10 = REVIEW_REQUIRED
D1–D9 = NOT_STARTED

TOOLS_INSTALLED = NO
CI_CONFIGURED = NO
NODE_1_10_CHANGED = NO
LEGACY_CHANGED = NO
```
