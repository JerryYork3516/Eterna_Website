# Eterna Website 1.0 — Plugins / MCP / External Tool Audit

内部版本：`v0.1`

文档性质：`P5-B Plugins / MCP / 外部工具审计`

状态：`PASS / P5-B COMPLETE`

审计日期：`2026-08-10`（Asia/Shanghai）

审计基线：`New@b24bd7bcd9ad220a22d5280779bb300edb9cea99`

> 本文件只决定 Website 1.0 Stage 1.1–1.9 所需外部能力、首选路径和权限边界。
> 本轮没有安装 Plugin、添加 MCP、登录 SaaS、创建 Token、修改权限、修改 Rules、配置 CI，也没有开始 P5-C、P6、P7 或 Stage 1.1。

---

## 1. Scope

P5-B 审计以下能力缺口：

- GitHub repository / PR / review / workflow external state；
- Vercel Preview、部署检查、Production promotion 与 rollback；
- Design in Browser 所需的真实浏览器证据；
- Figma 或其他设计源访问；
- dependency、secret、SAST 与 AI security review；
- Next.js / React / 工具链官方文档访问。

本文件使用以下边界：

```text
Skill
= reusable reasoning workflow

Rule
= always-on constraint

Plugin / MCP
= external capability

Automation
= deterministic machine gate
```

其中：

- **Plugin / Connector**：向 Agent 提供 GitHub、Vercel、Figma、Security service 等外部产品能力；
- **MCP**：以结构化工具接口把 browser、repository、deployment、documentation 或 SaaS 暴露给 Codex / Cursor；
- **External Tool**：可由 CLI、CI 或人工独立使用，不要求直接暴露给 Agent，例如 Playwright、Lighthouse、axe 与 dependency scanner。

同一能力只保留一条首选路径；第二条路径只有在承担不同职责或形成明确 fallback 时才保留。

---

## 2. Current capability inventory

### 2.1 Codex Desktop

当前会话真实可用：

- repository 文件读取、surgical editing、terminal / shell 与原生 Git；
- Web search 与直接读取官方文档；
- Skills 与 MCP host 能力；
- 已安装并暴露的 GitHub Connector，能够读取结构化 repository、PR、review、commit status 与 workflow state；
- 当前 Skill catalog 可见 Browser、Chrome 与 Computer Use provider，可在需要时控制真实浏览器或已有浏览器会话；
- code review、diff、检查运行和 Git 交付能力。

当前 GitHub Connector 对 `JerryYork3516/Eterna_Website` 报告 `pull / push / triage / maintain / admin` 均可用。这个**当前事实**不等于 Website 推荐权限；P5-B 的目标状态仍是 read-only-first，任何写入和管理操作必须由明确任务授权。

[OpenAI Skills / Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)、[Browser](https://learn.chatgpt.com/docs/browser)、[MCP](https://learn.chatgpt.com/docs/extend/mcp) 的官方文档确认这些能力当前存在；本仓库没有因此新增任何配置。

### 2.2 Cursor

当前本机存在 Cursor `3.8.11` desktop app；未发现可直接调用的 `cursor` CLI。项目内已有：

- repository editing、terminal 使用所需的 Cursor 应用基础；
- `.cursor/rules/website-context-mode.mdc`；
- `.cursor/rules/website-code-standards.mdc`。

Cursor 官方当前支持 repository search / edit、terminal、Web search / fetch 与 MCP；但本项目没有配置 Cursor MCP、Browser MCP、GitHub MCP、Vercel MCP 或 Figma MCP。能力支持不等于项目已连接或已授权。

官方依据：[Cursor Agent tools](https://docs.cursor.com/en/agent/tools)、[Cursor MCP](https://docs.cursor.com/en/context/model-context-protocol)。

### 2.3 Local CLI and project configuration

| 项目 | 当前状态 |
|---|---|
| `git` | `AVAILABLE` |
| `gh` | `AVAILABLE`，版本 `2.95.0`；当前 `gh auth status` 为 invalid token |
| Node / npm / npx | `AVAILABLE` |
| `vercel` CLI | `NONE` |
| `playwright` CLI | `NONE` |
| `.mcp.json` | `NONE` |
| `.cursor/mcp*` | `NONE` |
| project `.codex/` | `NONE` |
| `mcpServers` project config | `NONE` |
| Vercel project config | `NONE` |
| Playwright / Lighthouse / axe config | `NONE` |
| Figma project integration | `NONE` |

搜索没有读取或输出任何 secret。`legacy/` 未作为新站工具状态来源。

---

## 3. Audit principles

候选能力按以下维度判断：

1. **Value**：是否解决 Stage 1.1–1.9 的真实缺口；
2. **Existing overlap**：原生 Codex / Cursor / Git / CLI / P6 是否已解决；
3. **Frequency**：在 Stage 1.1–1.9 中是否重复发生；
4. **Permission risk**：是否需要 repo write、deployment、production、secret 或外部账户；
5. **Security / Privacy**：是否向第三方发送代码、内容、部署 metadata 或凭据；
6. **Maintenance**：配置、版本、认证、兼容性与 failure surface；
7. **Replaceability**：能否移除而不改变 Website architecture；
8. **Human gate impact**：是否可能绕过 Visual、Content、RC 或 Production 人工裁决。

Verdict 定义：

- `USE`：真实高频需求，明显提升能力，成本与风险合理；
- `OPTIONAL`：有价值，但当前首选路径已能完成；
- `DEFER`：未来需求或攻击面出现后再接；
- `REJECT`：重复、风险过高、收益过低或与当前架构不符。

`USE ≠ unrestricted access`，`available ≠ installed`，`installed ≠ authorized for every action`。

---

## 4. Candidate evaluation

| Candidate | Value / frequency | Existing overlap | Permission / data risk | Maintenance / replaceability | Human gate impact | Verdict |
|---|---|---|---|---|---|---|
| Native Git + shell | Stage 1.1–1.9 高频 local diff、commit、branch、push | 当前已经可用 | repository write；无 SaaS 扩权 | 最低；标准工具，易替换 | 不具备 Production 平台权限 | `USE` |
| Existing Codex GitHub Connector | PR、review、remote branch、workflow / check state 提供结构化证据 | 普通 Git 已覆盖 local work；Connector 补 remote context | 当前连接具备 repo read/write/admin-capable scope，明显高于推荐目标；会向 GitHub / Connector 处理 repository metadata | 已安装，无项目配置；可回退 Git / GitHub UI | write/admin 动作必须明确授权 | `USE`，但 read-only-first |
| Additional GitHub MCP for Codex / Cursor | 与现有 Connector、Git、GitHub UI 基本重复 | 重叠高 | 新 OAuth / PAT 与额外写入口 | 多一套认证、toolset 和版本面 | 增加误操作路径 | `REJECT` |
| Codex Desktop Browser / Computer Use | Stage 1.3–1.8 高频真实渲染、交互、截图与 DOM 证据 | 当前会话已暴露 provider | 优先 local / Preview；避免 production authenticated session | 已安装；不进入项目依赖 | 只收集证据，不判视觉 PASS | `USE` |
| Playwright Test / CLI | Stage 1.3–1.8 的 viewport、keyboard、reduced-motion、route、screenshot 与 E2E 可重复证据 | Browser 人工探索不能提供稳定自动回归 | 访问 local / Preview URL；测试凭据必须与 production 隔离 | 项目 dev dependency；具体版本与配置归 P6 / Stage 1.1 | 自动结果不替代人工 Gate | `USE` as P6 Automation capability |
| Additional Browser MCP | 当前 Codex Browser + 未来 Playwright 已覆盖 | 重叠高 | 可能访问浏览器 profile、cookie 与 authenticated session | 多一套浏览器 lifecycle / compatibility | 可能模糊自动证据与人工裁决 | `REJECT`，除非未来非 Codex host 出现已证明缺口 |
| Manual browser review | Stage 1.3–1.9 必需，尤其 Stage 1.4–1.8 Visual Gate | 自动工具不能覆盖视觉品质、VoiceOver 与真实设备判断 | 由人工控制会话和账户 | 无 Agent integration 维护 | 正式最终裁决路径 | `USE / HUMAN-ONLY` |
| Vercel Git integration | Stage 1.1–1.9 Preview 与 commit-specific URL 的核心路径 | Git provider 原生触发，无需 Agent 部署工具 | 连接 repo 与 Vercel project；Preview / Production branch 必须隔离 | Vercel 官方主路径，替换时仍保留标准 Git | Preview 不等于 Production approval | `USE` when Stage 1.1 creates the project |
| Vercel Dashboard / CLI read inspection | deployment status、build logs、deployment id 与 rollback evidence | Dashboard 已能人工检查；CLI 可结构化补充 | 需要 Vercel account；限制为 project / Preview inspect | CLI 可移除；本机当前未安装 | inspection 不能 promotion | `OPTIONAL` |
| Vercel MCP / Plugin | 可查项目、部署与 logs | Git integration + Dashboard / CLI 已覆盖首版 | 官方文档明确 MCP 继承连接用户的 Vercel access，可能包含 deploy / project write | 当前为 Beta；增加 OAuth、prompt-injection 与权限面 | 容易把 inspection 与 deployment write 混合 | `DEFER` |
| Figma MCP / Plugin | 有正式设计源时可读取 asset、variable、component 或 approved mock | Node 8 已冻结 Design in Browser；当前无 Figma workflow | 至少 design read；write 会修改外部设计文件并发送设计上下文 | 当前 Beta 演进快；无现有依赖，易延后 | 不能覆盖 Browser Visual Gate | `DEFER` |
| Deterministic security tools | dependency vulnerability、secret、SAST / CodeQL 与 supply-chain checks | 属于 P6 Automation，不应包装成 Skill / Plugin | CI / repo read；上传第三方前需单独判断 | 可重复、可设 gate；具体工具 P6 决定 | 只提供 finding，不替代人工 triage | `USE` as P6 Automation capability |
| GitHub native security visibility | 在 GitHub 汇总 Dependabot、secret scanning、CodeQL / code scanning 结果 | P6 local / CI scan 可先完成 | repository security metadata；启用规则可能需要 admin | 与 GitHub workflow 集成；当前是否启用未验证 | 告警处理与 bypass 需人工 | `OPTIONAL`，由 P6 核实 |
| Codex Security Plugin | threat model、攻击路径、验证与修复建议可补 deterministic scan | 当前首版无账户，Contact / Analytics 默认关闭，Server API 很少 | 需连接 GitHub repository 并分析 code / history；当前未激活 | 仍为 research preview；审查成本高于当前攻击面 | patch 仍需人工 review | `DEFER`，Stage 1.8 或攻击面扩大后复核 |
| Native Web / official docs | Stage 1.1–1.9 查 Next.js、React、Vercel、Playwright 等当前官方资料 | Codex 与 Cursor 当前均能访问 Web / docs | 只访问公开官方资料；不需项目 token | 无项目配置，低维护 | 不影响 Gate | `USE` |
| Documentation MCP / Context7 | 可聚合 version-specific docs | 当前 Web + official docs 足够；framework version 将由 Stage 1.1 lockfile 固定 | 新第三方会接收 query / dependency context | 新服务、索引时效与错误来源 | 无 Gate 增益 | `REJECT` for Website 1.0 |

当前官方状态核对：

- GitHub 提供官方 MCP server，能管理 repository、PR 与 workflow，并支持 token scope 控制；本项目已有等价结构化 GitHub Connector，因此不再添加。见 [GitHub MCP Server](https://github.com/github/github-mcp-server)。
- Vercel Git integration 会为 push / PR 建立 Preview；Vercel MCP 当前为 Beta，并提醒其访问等同于连接用户的 Vercel access。见 [Vercel Git deployments](https://vercel.com/docs/git)、[Vercel MCP](https://vercel.com/docs/agent-resources/vercel-mcp)。
- Figma 官方 MCP 当前可以读写设计上下文，但当前项目没有正式 Figma source-of-truth。见 [Figma MCP](https://developers.figma.com/docs/figma-mcp-server/)。
- Playwright 原生支持 screenshot、device / viewport、keyboard 与 reduced-motion emulation；其官方 accessibility 示例使用 `@axe-core/playwright`，同时明确自动检查不能替代人工测试。见 [Screenshots](https://playwright.dev/docs/screenshots)、[Emulation](https://playwright.dev/docs/emulation)、[Accessibility testing](https://playwright.dev/docs/accessibility-testing)。
- GitHub 提供 dependency review、secret scanning 与 CodeQL；准确启用项与 CI gate 留给 P6。见 [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features)。
- Codex Security 能建立 threat model、验证漏洞并提出供人工审核的修复，但当前仍为 research preview。见 [Codex Security](https://help.openai.com/en/articles/20001107)。

---

## 5. USE

| Capability | Preferred implementation | Solves |
|---|---|---|
| Local repository work | native filesystem + shell + Git | read、diff、checks、commit、branch、push |
| Structured GitHub external state | existing Codex GitHub Connector，read-only-first | PR、review comments、remote branch、workflow / check state |
| Interactive browser evidence | current Codex Desktop Browser / Computer Use provider | rendered page、responsive state、interaction、screenshot、DOM evidence |
| Repeatable browser evidence | Playwright Test / CLI，由 P6 / Stage 1.1 选择精确包与配置 | E2E、viewport、keyboard、reduced-motion、screenshot regression |
| Preview delivery | Vercel Git integration，在 Stage 1.1 建立 project 时接入 | commit-specific Preview、PR review URL、environment separation |
| Deterministic security evidence | P6 dependency / secret / SAST gate | repeatable vulnerability and supply-chain findings |
| Current documentation | native Web access，优先 official docs | version / API drift verification without new infrastructure |
| Final visual and production decisions | human review | Visual Quality Gate、RC acceptance、Production authority |

这些是能力路径批准，不是 P5-B 安装或配置记录。

---

## 6. OPTIONAL

- **Vercel Dashboard / CLI read inspection**：当 Stage 1.1 已存在真实 Vercel project 后，用于读取 deployment status、build logs、deployment id；当前 CLI 未安装，不在 P5-B 安装。
- **GitHub native security visibility**：P6 可根据 repository plan 和真实 CI 需要核实 Dependabot、secret scanning、dependency review 与 CodeQL；当前不假设已启用。
- **Manual Chrome session as browser fallback**：当 Codex isolated Browser 无法复现 profile-specific 或真实设备问题时，由人工控制；不把 production authenticated session 交给 Agent。

---

## 7. DEFER

- **Vercel MCP / Plugin**：等真实 project、只读 inspection 缺口和可限制 scope 被证明后再评估；不能继承 production-capable owner 权限。
- **Figma MCP / Plugin**：等出现正式 Figma workflow、approved asset / mock 或 token source-of-truth 后再评估；默认 read-only。
- **Codex Security Plugin**：等 Stage 1.8 targeted review、Contact / API 启用、账户边界出现或攻击面显著扩大后再评估。
- **Cloudflare integration**：Node 9 只把 Cloudflare Workers + OpenNext 冻结为 fallback，不形成 Website 1.0 双平台工具要求。
- **Visual regression SaaS、Sentry、Analytics、CMS、accessibility SaaS、bundle-analysis SaaS**：当前没有真实 operational / content / measurement requirement；需求出现后按独立权限和隐私审计处理。

---

## 8. REJECT

- **Filesystem MCP、Git MCP、Terminal MCP**：重复当前 native filesystem、shell 与 Git；增加上下文、配置和权限面。
- **第二套 GitHub MCP**：重复现有 Codex GitHub Connector；普通 commit / push 不需要外部 wrapper。
- **第二套 Browser MCP**：当前 Codex Browser + P6 Playwright 已形成交互与自动证据分工。
- **Documentation MCP / Context7**：当前 official Web docs 足以处理 Next.js / React / tooling drift。
- **默认安装所有 Marketplace / MCP candidate**：availability 不是 Website need。
- **让 Agent 默认拥有 production deploy、DNS、domain、secret、branch protection 或 repository admin write**：收益不能覆盖误操作与数据风险。
- **用 Plugin 代替 P6 deterministic gate，或用 automation 代替人工 Visual Gate**：职责错误。

---

## 9. Permission model

### 9.1 General rule

```text
one capability
→ one preferred path
→ minimum scope
→ explicit write authorization
→ auditable evidence
```

所有外部连接遵守：

- 从 read-only 开始；
- 限定单个 repository / project / design file；
- Preview 与 Production identity / credential 分离；
- 不向所有 preview branch 分发 production secret；
- 不读取、打印或把 token 写入 repository；
- write、delete、promotion、permission change 必须由当前明确任务授权；
- 外部返回数据在进入代码或决策前按 untrusted input 处理；
- Plugin / MCP access 定期可撤销，并保留工具调用与人工批准证据。

### 9.2 Minimum permissions by capability

| Capability | Minimum target permission | Not granted by default |
|---|---|---|
| GitHub structured context | single repository read：metadata、PR、review、checks | org admin、repo admin、branch protection、default branch、destructive write |
| GitHub delivery | current branch push，仅在明确 Git 交付任务内 | force-push、merge、release、branch delete |
| Browser | local / non-sensitive Preview URL；无 production cookie | authenticated production session、password manager、unrelated tabs |
| Playwright | local / isolated Preview；test-only fixture | production data write、shared production credential |
| Vercel inspection | single project Preview / deployment read | production promote、rollback、domain、DNS、environment secret write |
| Figma | named file / project read | file write、delete、library publish、organization admin |
| Security service | named repository read；findings export only when approved | automatic patch merge、secret access、organization-wide scan |

当前 Codex GitHub Connector 的 repo-level write/admin-capable scope 高于目标最小权限。P5-B 不改授权；P5-C 应把“是否能降低连接 scope、是否需要 per-action confirmation、哪些写动作禁止自动执行”收口为治理规则。

### 9.3 Production authority

除非未来 Stage 1.9 的当前任务中有人工做出明确授权，AI 不默认拥有：

- Production deploy / promote / rollback；
- DNS modification、domain transfer 或 canonical cutover；
- secret creation、rotation、reveal 或 deletion；
- repository destructive admin、branch protection 或 GitHub default branch modification；
- production database / external service write；
- rollback window 结束或 Legacy deletion 决定。

上述能力统一标记：`HUMAN-AUTHORIZED HIGH-IMPACT ACTION`。

---

## 10. Preferred tool paths

### Git / GitHub

```text
Preferred local work: native Git / shell
Preferred remote context: existing Codex GitHub Connector, read-only-first
Fallback: GitHub UI; human re-authenticated gh when a real task requires it
Human-only: merge / promotion policy, default branch, branch protection, destructive admin
```

### Browser / Design in Browser

```text
Preferred interactive evidence: Codex Desktop Browser / Computer Use
Preferred repeatable evidence: Playwright Test / CLI in P6 Automation
Fallback: manually controlled Chrome / real device
Human-only: Visual Quality Gate, VoiceOver judgement, final responsive acceptance
```

Playwright screenshots、DOM、keyboard、viewport、reduced-motion 与 axe output 都是 evidence；它们不产生 `PASS` authority。Lighthouse 可在 P6 / Stage 1.1 作为 performance、accessibility、best-practice 和 SEO risk evidence，不能替代视觉审核。官方能力见 [Lighthouse](https://developer.chrome.com/docs/lighthouse/)。

### Vercel / Deployment

```text
Preferred Preview: Vercel Git integration from non-production branches / PRs
Preferred inspection: Dashboard; optional read-only CLI
Fallback inspection: explicit Vercel API / MCP only after a proven gap and scope review
Human-only: production promotion, rollback, domain, DNS, environment secret and cutover
```

Vercel 官方当前支持 Git push / PR Preview、deployment inspection 和 manual promotion；P5-B 选择 Git Preview，不向 Agent 提供 production deployment write。

### Security

```text
Preferred deterministic path: P6 dependency + secret + SAST / CodeQL automation
Optional visibility: GitHub security findings when actually enabled
Deferred deep review: Codex Security for a scoped threat-model / attack-path review
Human-only: finding acceptance, risk disposition, patch merge and security bypass
```

### Documentation

```text
Preferred: official documentation through native Web access
Fallback: repository lockfile / installed package docs once Stage 1.1 exists
Rejected now: generic Documentation MCP
```

### Figma

```text
Preferred now: Design in Browser, no Figma connection
Future fallback: read-only Figma MCP for a named approved file
Human-only: design source approval, write / delete / publish
```

---

## 11. P5-A Skill integration

### `website-behavior-preserving-simplification`

该 Skill 不依赖外部 Plugin / MCP。最小能力只有：

```text
repository
→ shell / Git diff
→ existing tests / P6 checks
→ behavior-preserving review
```

如果必须连接 SaaS 才能运行，说明 Skill 已越过简化职责。

### `website-design-in-browser-review`

推荐 evidence chain：

```text
website-design-in-browser-review Skill
→ Codex Desktop Browser / Computer Use for interactive rendered evidence
→ Playwright for repeatable viewport / DOM / keyboard / reduced-motion / screenshot evidence
→ AI findings and unresolved-item log
→ Human Visual Quality Gate decision
```

Skill 负责矩阵、顺序和 evidence completeness；Browser / Playwright 提供外部能力；P6 自动化负责 deterministic checks；人工保留最终裁决。四层不得合并成单一“自动 PASS”。

---

## 12. P5-C handoff

P5-C 只需收口以下治理项，不重新做 P5-B 品牌审计：

1. 将本文件的 preferred path、read-only-first、write approval 和 `HUMAN-AUTHORIZED` 边界映射到最终 Rules / Governance；
2. 核实当前 Codex GitHub Connector 是否能降低到 repository read scope，或至少对 write/admin action 强制逐次确认；
3. 决定两个 P5-A Skill 是否实际创建；若创建，Design Review Skill 引用本文件的 Browser evidence chain；
4. 明确 P6 拥有 Playwright、axe、Lighthouse、dependency、secret 与 SAST 的精确 package / version / config / threshold；
5. 保留 `INSTALLATION = NOT_PERFORMED`，直到具体阶段出现真实 task、owner、permission 和 rollback boundary；
6. 不把 Vercel、Figma、Security 或 Docs candidate 因 Marketplace 可用而自动升级为安装批准。

P5-B 最终状态：

```text
P5-B = PASS / COMPLETE
P5 = IN_PROGRESS
P6 = NOT_STARTED
P7 = NOT_STARTED
Stage 1.1–1.9 = NOT_STARTED
Node 1–10 = UNCHANGED
Legacy = NO CHANGES
INSTALLATION = NOT_PERFORMED
```
