# Eterna Website 1.0 Node 10 — 正式开发计划 v0.1

内部版本：`v0.1`

文档性质：`Eterna Website 1.0 Node 10 — 正式开发计划`

状态：`PASS / FROZEN`

编制日期：`2026-08-09`（Asia/Shanghai）

> 本文件把 Node 1–9 已冻结结果转换为 Website 1.0 的开发、审核、迁移与上线执行顺序。
> Node 10 冻结的是开发计划，不代表任何开发阶段已经开始或通过。本轮不创建 Next.js 应用、不编写正式网站代码、不修改 `legacy/`、不部署、不修改 DNS 或 Git 分支，也不执行 Stage 1.1。

```text
Stage 0 = Website 1.0 规划、Node 1–10 与 Pre-development readiness P1–P7
Stage 1 = Website 1.0 正式开发
```

Stage 0 已完成。Node 1–10 保留原名称和历史身份，不重命名为 `0.x`。

---

## 1. 计划基线与执行原则

### 正式基线

- Repository：`Eterna_Website`；
- 当前规划分支：`New`；
- Node 9 freeze commit：`f9faa56120220596140a54ec39eb3b9d3d4213d3`；
- Node 1–9 是 Website 1.0 唯一正式规划基线；
- Node 8 正式采用 `Design in Browser`；
- Node 9 已冻结 Next.js App Router、内容治理、Vercel 首选、双语、迁移和分支治理原则。

### 不重新打开的决策

- Website 是 Eterna 的长期项目官网、品牌门户与公开产品体系总入口；
- Sitemap 为 6 个页面组、12 个双语 URL；
- 首版仅 `/zh` 与 `/en`，根 `/` 确定性进入 `/zh`；
- Header 提供 `中 / EN`，按稳定 `pageId` 保持当前页面切换；
- Next.js App Router + React + TypeScript strict；
- SSG-first、服务端语义内容、局部 Client Islands；
- CSS Custom Properties + CSS Modules、CSS Motion first；
- repository-managed YAML + build-time schema validation；
- Primary 为 Vercel，Fallback 为 Cloudflare Workers + OpenNext；
- Design in Browser、Living Precision、Visual Quality Gate、Anti-pattern / DEAD Gate；
- Resident 与高级视觉退出后页面仍须完整成立。

只有实施证据发现真实矛盾时，才暂停对应阶段并回到受影响的冻结文档人工处理；开发便利、框架默认值或视觉偏好不能单独重开决策。

### 阶段状态规则

- Stage 1 是 Website 1.0 的正式开发生命周期，由 Stage 1.1–1.9 依序组成；
- Node 10 冻结只批准本计划进入执行准备，不表示任何 Stage 1.x 已经开始或通过；
- 每阶段只有满足 Acceptance Criteria、Automated Checks、Human Review 与 Exit Gate 后才能完成；
- 自动检查通过不等于人工视觉、内容或上线授权通过；
- 阶段内 checklist、修复批次和浏览器迭代属于执行任务，不升级为新正式阶段。

### Stage-internal execution nodes

每个 Stage 1.x 在真正开始前，可以依据当时仓库事实拆成 `1.x.1–1.x.n` 内部执行节点。本文件不预先制定任何 Stage 1.1–1.9 的内部节点。

```text
进入 Stage 1.x 前
→ 查看当时真实仓库
→ 制定 1.x.1–1.x.n
→ 逐节点执行
→ Stage 1.x Final Gate
```

内部节点采用 `JUST_IN_TIME` decomposition，不是新的正式 Stage。必要修复批次可以使用 `R1 / R2` 或 `A1 / A2`，不得借此无限增加数字层级。

### Stage 0 / Pre-development Baseline

以下文件与 repo-local workflow 是 Stage 1.1–1.9 的正式开发前执行基线：

| Boundary | Formal entry |
|---|---|
| AI working discipline | `AGENTS.md` |
| Engineering | `docs/10-development-plan/engineering-standards-v0.1.md` |
| Skills / tools | `docs/10-development-plan/tool-governance-v0.1.md` |
| CORE Skill | `.agents/skills/website-behavior-preserving-simplification/SKILL.md` |
| CORE Skill | `.agents/skills/website-design-in-browser-review/SKILL.md` |
| Quality gates | `docs/10-development-plan/quality-gates-v0.1.md` |

`skills-audit-v0.1.md` 与 `plugins-mcp-audit-v0.1.md` 保留 P5-A / P5-B 的审计证据；Stage 1.1–1.9 的最终 Skill、tool routing、权限和自动 Gate 以 Tool Governance 与 Quality Gates 为执行入口。

P1–P6 文件中的 handoff state block 保留各自收口时点的历史快照；当前正式 Node / P / Stage 执行状态以本文件第 6 节的 P7 最终结论为准。

这些基线服从 Eterna 上位事实与 Node 1–10，不得覆盖产品、内容、设计、技术或阶段冻结；开发实现、Agent workflow、工具调用和验证必须遵守这些基线。Skill 与工具不产生新事实、授权或 Human Gate PASS。

### Stage 1.1 entry conditions

Stage 1.1 只有同时满足以下条件才可由一个明确任务正式开始：

- P1–P7 全部 `PASS`；
- Node 10 = `PASS / FROZEN`；
- current branch = `New`；
- working tree clean；
- unresolved `BLOCKER = NONE`；
- unresolved `MAJOR = NONE`；
- 当前任务明确授权执行 Stage 1.1。

P7 完成后的状态是：

```text
Stage 0 = COMPLETE
Stage 1 = READY_TO_START / NOT_STARTED
Stage 1.1 = READY_TO_START / NOT_STARTED
Stage 1.2–1.9 = NOT_STARTED
```

`READY_TO_START` 只表示进入条件已经满足，不构成创建应用、安装依赖、配置 CI 或执行任何 Stage 1.1 工作的授权。

---

## Stage 1.1 — 新站工程基线

### Goal

在仓库根建立可持续开发、可验证、可 Preview 的 Website 1.0 工程，同时保持新应用与 `legacy/` 完全隔离。

### Stage-internal execution nodes

1.1.1 — 根应用脚手架
1.1.2 — 代码质量基线
1.1.3 — 测试与 Legacy 边界基础
1.1.4 — 浏览器与无障碍测试基线
1.1.5 — CI 与确定性安全门禁
1.1.6 — 本地 / Preview / 环境
1.1.7 — 文档与运行准备
1.1.8 — Stage 1.1 最终门禁

### Scope

- 根目录 Next.js App Router 应用；
- React、TypeScript strict、npm 与 lockfile；
- Node.js Active LTS 版本固定；
- ESLint、Prettier、最小测试基础与 CI；
- Local / Preview 基础和环境变量示例；
- 根 README 更新为新站与 Legacy 两套边界清楚的运行说明。

### Main Tasks

- 在根目录建立最小 App Router 工程，不在 `legacy/` 内重构；
- 固定 Node 与 npm 使用方式，生成并提交 lockfile；
- 建立 `dev / lint / typecheck / test / build / format:check` 等脚本；
- 建立适合后续内容校验、组件测试和 E2E 的最小测试目录；
- 建立 CI 顺序和 commit-specific Preview 基础；
- 建立禁止根应用 import `legacy/` 的自动边界检查；
- 保持 production、Preview、local 环境职责分离，不接入真实 production secret。

### Inputs

- Node 9 技术架构、环境、测试、部署与 Legacy 隔离规则；
- 当前根 README、`.gitignore`、仓库目录与 `legacy/package.json`；
- `New@f9faa56120220596140a54ec39eb3b9d3d4213d3`。

### Deliverables

- 可安装、可运行、可构建的根应用；
- 根 `package.json`、lockfile、TypeScript、lint、format、test 与 CI 配置；
- Node 版本文件和环境变量示例说明；
- 最小 Preview；
- 新站 / Legacy 边界清楚的 README。

### Acceptance Criteria

- frozen install、lint、typecheck、适用测试和 production build 成功；
- 根应用不 import、bundle、copy 或运行 `legacy/src`、`legacy/styles.css`、Legacy OGL 或旧 Airtable handler；
- `legacy/` 文件和旧站运行边界未被修改或破坏；
- 本地一个明确命令可启动新站；
- Preview 可绑定 commit SHA，且不声称已经是正式页面或 production。

### Automated Checks

- frozen dependency install；
- format check、ESLint、TypeScript strict、基础测试、production build；
- import-boundary / tracked-file 检查；
- CI 在干净环境重复上述流程。

### Human Review

- 审核根工程是否足够轻、是否符合 Node 9、是否错误引入重型抽象；
- 审核 README 与 Legacy 隔离说明；
- Preview 只检查工程可达性，不进行 Home 视觉裁决。

### Dependencies

- Node 10 已人工冻结；
- `New` 分支仍是当前开发基线；
- 可用的 Node/npm 与 Preview 账户权限。

### Explicit Non-goals

- 不实现 12 个正式页面、最终内容、Design System 或 Home；
- 不迁移 Legacy、不引入 OGL / Three.js、不启用 Contact / Analytics；
- 不修改 production、DNS、`main` 或 GitHub default branch。

### Exit Gate

Stage 1.1 自动检查全部通过、工程边界完成人工审核，并形成可恢复的阶段 commit / push 后，才允许进入 Stage 1.2。

---

## Stage 1.2 — 路由、双语与内容系统

### Goal

建立 12 个正式 URL 的真实信息结构、URL 驱动的双语关系，以及来源可追溯、production fail-closed 的 repository content 基础。

### Scope

- `/zh`、`/en`、根 `/ -> /zh` 与非法 locale 404；
- 6 个页面组 × 2 种语言；
- `pageId`、route allowlist、同页语言配对；
- repository-managed YAML、Content Schema 与 build-time validation；
- `factState`、`publicationState`、sources、review / update / invalidation；
- asset manifest 基础；
- Preview 与 production 的内容读取边界。

### Main Tasks

- 建立 6 个稳定 `pageId` 与 12 个规范 route；
- 实现根 `/` 确定性进入 `/zh`，拒绝非 `zh / en` locale；
- 建立 Header `中 / EN` 所需的同页映射逻辑，URL 作为语言事实来源；
- 建立 YAML loader、严格 schema 和受控 enum；
- 校验双语 Section 身份、事实状态、来源、CTA 与 route 一致；
- 建立 production 只读取 `PUBLISHED`、Preview 可审核 `DRAFT / REVIEW_REQUIRED` 的明确模式；
- 建立未批准内容、缺失翻译、撤回内容、无来源主张和非法资产的失败用例；
- 建立 12 份真实、来源绑定的双语工作内容记录；不从 Legacy 直接复制文案。

### Inputs

- Node 1、5、6 的事实、需求、Sitemap 与内容状态；
- Node 8 Home / Digital Residents 结构与 Node 8 freeze；
- Node 9 Content Source、schema、locale、route、asset 与 build gate；
- Legacy 文案仅作为 `DRAFT / REWRITE` 候选证据。

### Deliverables

- 12 个 route 与稳定 `pageId` manifest；
- YAML 内容目录、schema、loader、双语配对和 source validation；
- asset manifest 基础；
- Preview / production 内容策略及验证 fixture；
- 首批真实双语工作内容记录和审核状态。

### Acceptance Criteria

- 12 个页面在 local / Preview 均可稳定生成，中文和英文一一对应；
- `/` 只进入 `/zh`，不做 Accept-Language 或 IP 判断；
- `/zh/products/aftelle ↔ /en/products/aftelle` 等切换保持当前页面；
- 非法 locale 返回真实 404，不模糊 fallback；
- production 不输出 `DRAFT / REVIEW_REQUIRED / WITHDRAWN`；
- 缺失来源、缺失语言、非法 route、schema 错误或无权资产使 production build fail closed；
- Preview 的草稿内容明确标识且 noindex，不被误认为已发布事实。

### Automated Checks

- schema、enum、route、locale、`pageId` 唯一性测试；
- 12 URL 与双语 pair matrix 测试；
- root redirect、非法 locale、语言切换测试；
- production positive / negative build fixture；
- source、publication state、CTA target、asset reference 校验。

### Human Review

- Fact / Language / Publish 角色审核真实内容、来源、双语自然度和公开边界；
- 确认 Preview 能支持真实内容审核，但没有把草稿提升为 production；
- Stage 1.4 开始前，Home 中英文必须已具备真实、可审核内容，禁止 lorem ipsum、假 UI 或占位营销文案。

### Dependencies

- Stage 1.1 已通过；
- Node 1 上位来源与产品事实仍有效；
- 需要进入 Preview 的内容具有可追溯来源和审核责任。

### Explicit Non-goals

- 不引入 Headless CMS、MDX 页面构建器、机器翻译或全局客户端状态库；
- 不完成最终视觉，不用内容 schema 决定 Layout；
- 不创建 Contact、Privacy、Research、Developers、Updates 或 Support 空路由。

### Exit Gate

路由、双语与内容门禁自动检查通过，真实工作内容完成必要人工审核，Preview / production 边界被证明有效并形成阶段 commit / push 后，才允许进入 Stage 1.3。

---

## Stage 1.3 — 全站基础框架与 SEO

### Goal

建立所有页面共享、无高级视觉也完整成立的语义网站框架，以及 12 个 URL 的准确 SEO 身份。

### Scope

- Header、Navigation、Footer、Language Switch、Mobile Navigation；
- Layout primitives、语义 HTML、Focus 与 reduced-motion 基线；
- CSS Custom Properties、CSS Modules 与基础 Typography 角色；
- metadata、canonical、hreflang、sitemap、robots、Open Graph 基础；
- 404 与 Preview noindex。

### Main Tasks

- 按 Node 6 / 8 建立品牌 Home 入口、三个主导航与 Products 父级状态；
- 建立 Footer 的真实站点地图，不加入未启用入口；
- 建立少量 Container / Stack / Cluster / Text / Action 等布局原语；
- 建立全局 reset、语义 Token、Focus 与 reduced-motion 基础；
- 建立每页唯一 H1、landmark、skip link、当前页与键盘顺序；
- 从已审核内容生成每页 metadata、canonical、hreflang 与 social metadata；
- 生成 production sitemap / robots，并强制 Preview noindex；
- 建立 Mobile Navigation 的焦点进入、移动、关闭和返回。

### Inputs

- Stage 1.2 route / content / locale manifest；
- Node 6 Header / Footer / URL / 页面关系；
- Node 7 Web Design System；
- Node 8 全站交互规范；
- Node 9 SEO、Component、Styling 与 Accessibility 架构。

### Deliverables

- 全站共享 Layout、Header、Navigation、Footer 与语言切换；
- Layout primitives 与基础 CSS / Typography 架构；
- 12 URL metadata、canonical、hreflang、sitemap、robots；
- 404、Preview noindex 与 Mobile Navigation。

### Acceptance Criteria

- 无 Resident、无图片、无高级 Motion 时，12 页仍有完整导航、层级、内容和行动；
- Header 只包含真实结构，Aftelle / Studio 时 Products 显示父级当前状态；
- 中英文导航、Footer 与语言切换完整；
- 每个正式 URL 只有一个 canonical，hreflang 成对且 metadata 语言正确；
- sitemap 不含 Preview、草稿、撤回或未启用内容；
- Keyboard、Focus、skip link 与 Mobile Navigation 基础行为正确。

### Automated Checks

- route / navigation / language E2E；
- metadata、canonical、hreflang、sitemap、robots snapshot / semantic checks；
- HTML landmark、唯一 H1、link / button 语义与 axe 基础检查；
- Preview response noindex 检查；
- lint、typecheck、tests、build。

### Human Review

- 键盘与基础 VoiceOver 检查；
- 中文 / 英文导航、换行和 Mobile Navigation 浏览器审核；
- 审核共享原语是否保持轻量，是否错误形成通用 SaaS Component Library。

### Dependencies

- Stage 1.2 已通过；
- 12 个 route 和内容身份稳定；
- Preview 可用于真实浏览器审核。

### Explicit Non-goals

- 不冻结最终字体、色值、Hero、页面 Layout 或 Motion 参数；
- 不采用 Tailwind、shadcn、Bento Grid、generic Hero、generic Card system；
- 不实现高级 Resident、WebGL、Contact、Analytics 或 production cutover。

### Exit Gate

共享框架与 SEO 自动检查通过，Keyboard / Mobile / bilingual 基础完成人工审核，并形成阶段 commit / push 后，才允许进入 Stage 1.4。

---

## Stage 1.4 — Home｜Design in Browser

### Goal

在真实浏览器、真实内容、真实路由和真实响应式中建立 Eterna Website 最终视觉语言，并完成最重要的 Home 产品级视觉裁决。

### Scope

- Home 的 `H-01`–`H-05` 五段叙事；
- Hero、Typography、Layout、Grid、内容密度、空间节奏与 Section continuity；
- Home CTA、Aftelle / Studio 首页表达；
- 中文、English、Desktop、Tablet、Mobile；
- 先无 Resident / 无高级视觉，再评估静态或轻量增强。

### Main Tasks

- 使用真实中英文内容、Header、Footer 与正式 route 完成静态 Home；
- 先通过 No-Resident test，再进行任何 Presence 探索；
- 在浏览器中迭代最终 Home Layout、Hero、Typography、Color 与响应式；
- 保持 Eterna → Digital Resident → Continuity / Relationship → Products → About 的叙事顺序；
- 让 Aftelle / Studio 形成职责关系，不退化为两张普通产品卡；
- 同时检查 Focus、reduced-motion、资产缺失和脚本部分失败状态；
- 记录未通过项与浏览器审核证据，持续收敛而不是自动进入 Stage 1.5。

### Inputs

- Stage 1.1–1.3 的真实工程、内容、路由、Header / Footer 与 SEO；
- Node 7 Living Precision / Web Design System；
- Node 8 Home Narrative、Visual Quality Gate、Anti-pattern / DEAD Gate 与 freeze 范围。

### Deliverables

- 完整的 `/zh` 与 `/en` Home；
- Desktop / Tablet / Mobile 的稳定浏览器实现；
- 无 Resident 基线与必要静态 fallback；
- 浏览器审核记录、关键视觉决策和质量门禁证据；
- 可供后续页面继承但不强制模板化的视觉 DNA。

### Acceptance Criteria

- Home 在无 Resident、无高级视觉时已产品级、完整、好看、简洁且有辨识度；
- 五段叙事、CTA 层级、内容状态与产品边界未被视觉改写；
- 中英文 Typography、Layout 与内容密度均成熟；
- Desktop、Tablet、Mobile 连续成立，不靠桌面拼贴硬压缩；
- 不命中 Visual Quality Gate、Anti-pattern / DEAD Gate 的失败项；
- 无明显 AI 生成感、模板感、假 UI、乱码、随机样式或粗糙细节。

### Automated Checks

- lint、typecheck、tests、build；
- Home route / CTA / language / metadata smoke；
- 关键 viewport 截图与视觉回归只作为变化提示；
- axe、reduced-motion、asset failure 与 no-Resident smoke；
- Lighthouse / bundle 结果作为风险证据，不作为视觉 PASS。

### Human Review

**强制人工 Home Visual Quality Gate。** 人工在真实浏览器中审核中文、英文、Desktop、Tablet、Mobile、Keyboard、reduced-motion 与无 Resident 状态。Codex、截图、测试、Lighthouse 或代码完成度均不能自动判定 Stage 1.4 PASS。

### Dependencies

- Stage 1.3 已通过；
- Home 双语真实内容已可审核；
- Preview 可稳定呈现真实页面与多 viewport。

### Explicit Non-goals

- 不在 Stage 1.4 完成 Digital Residents 或其他四个页面；
- 不因为“未来感”引入 WebGL / Three.js；
- 不用静态概念图或失败探索作为正式设计依据；
- 不把 Home 视觉结构强制复制为所有页面模板。

### Exit Gate

只有人工明确通过 Home Visual Quality Gate，且阻塞问题解决、自动检查通过、稳定审核点完成阶段 commit / push 后，才允许进入 Stage 1.5。

---

## Stage 1.5 — Digital Residents

### Goal

完成数字居民核心概念页，使普通访问者准确理解 Resident 的定义、边界、连续性及其与 Human、Studio、Aftelle 的关系。

### Scope

- Node 8 冻结的 `DR-01`–`DR-08` 八段 Narrative；
- 真实中英文内容、状态、来源与 CTA；
- 页面独立空间和叙事结构；
- Desktop、Tablet、Mobile、Keyboard、reduced-motion 与无 Resident 状态。

### Main Tasks

- 按八段顺序落实 Concept Orientation、正向定义、反向边界、Continuity、五个相关维度、跨平台、Human × Resident、产品关系；
- 从 Node 1 权威来源生成并审核公众表达，不重写上位定义；
- 延续 Home 已通过的视觉 DNA，同时建立概念页自己的节奏；
- 不把身份 / 人格 / 记忆 / 关系 / 成长做成功能卡片或技术 Schema；
- 先完成无 Resident 页面，再判断 Presence 是否具有不可替代价值；
- 对 Studio / Aftelle 只表达获准职责与状态，不把产品反向定义为 Resident。

### Inputs

- Stage 1.4 已通过的视觉基线；
- Node 1 数字居民权威边界；
- Node 6 Digital Residents 页面职责；
- Node 8 Digital Residents Narrative、Presence、CTA 与状态规则；
- Stage 1.2 内容治理和来源记录。

### Deliverables

- 完整 `/zh/digital-residents` 与 `/en/digital-residents`；
- 八段叙事的响应式浏览器实现；
- 内容来源与双语审核记录；
- 无 Resident / reduced-motion / failure 基线；
- 页面视觉与内容 Gate 证据。

### Acceptance Criteria

- 八段 Narrative 按冻结顺序完成，普通访问者能回答“是什么、不是什么、为何连续”；
- 不等同 Agent / Model / Avatar / Prompt / 工具 / 会话；
- 不做成技术白皮书、普通 AI 宣传页或产品功能页；
- Home 视觉 DNA 可辨，但页面不是 Home 模板复制；
- Resident Presence 不是通过必要条件，移除后页面仍完整、好看、可理解；
- 双语、状态、产品边界、Desktop / Tablet / Mobile 均通过审核。

### Automated Checks

- route / language / CTA / metadata / source smoke；
- section identity 与 content schema 检查；
- lint、typecheck、tests、build、axe；
- no-Resident、reduced-motion、asset failure 与关键 viewport 回归。

### Human Review

**强制人工 Digital Residents Visual / Content Gate。** 必须由人工审核公众可理解性、定义准确性、双语自然度、视觉质量和响应式；Resident 是否使用及其视觉价值也必须人工裁决。

### Dependencies

- Stage 1.4 已人工通过；
- Digital Residents 双语事实内容已由相应角色审核；
- Node 1 权威输入未发生未处理变化。

### Explicit Non-goals

- 不展开十三层规范、Runtime、数据 Schema、迁移协议或创建教程；
- 不冻结完整人体、Avatar、脸、性别或最终 Resident 外观；
- 不实现产品 Demo、下载、登录或 Contact。

### Exit Gate

人工 Visual / Content Gate 明确通过，自动检查和响应式 / 降级审核完成，并形成阶段 commit / push 后，才允许进入 Stage 1.6。

---

## Stage 1.6 — Products / Aftelle / Studio / About

### Goal

按顺序逐页完成其余四个页面，并在全部六个页面上建立同一品牌、同一视觉语言但非模板复制的整体一致性。

### Scope

按以下顺序执行且逐页审核：

1. Products；
2. Aftelle；
3. Studio；
4. About Eterna。

每页覆盖 Narrative、Section Architecture、Typography、Layout、Responsive、bilingual、CTA、content status、Design in Browser 与 Visual Quality Gate。

### Main Tasks

- Products：表达 Digital Resident 为中心及产品职责关系，不把长期 Universe 平铺为当前产品矩阵；
- Aftelle：只使用正式高层职责和已验证当前事实，不补写 North Star、功能或可用性；
- Studio：遵守 Studio North Star，并把方向职责与当前真实能力分开；
- About Eterna：只使用经批准项目事实，不虚构法定公司、团队、地点、历史、融资或成熟组织；
- 每页先完成无 Resident / 无高级视觉版本，再评估增强；
- 每页分别完成中文、英文、Desktop、Tablet、Mobile 与人工浏览器审核；
- 四页完成后执行六页面整体一致性审核。

### Inputs

- Stage 1.4 / Stage 1.5 已通过的视觉与交互基线；
- Node 1 产品和公司事实边界；
- Node 6 四页职责；
- Node 8 freeze 对四页 Design in Browser 的正式转移；
- Stage 1.2 内容来源、事实状态与双语治理。

### Deliverables

- Products、Aftelle、Studio、About Eterna 的 8 个双语页面实例；
- 每页独立 Narrative / Section / responsive 实现与审核记录；
- 六页面整体一致性审核记录；
- 每页无 Resident、reduced-motion 与失败降级基线。

### Acceptance Criteria

- 四页严格按顺序逐页完成和审核，不以一次性批量生成代替逐页设计；
- 每页职责、产品关系、事实状态、CTA 与来源准确；
- Aftelle 不出现未经验证能力，Studio 不越权，About 不虚构公司事实；
- 12 个双语 URL 至此均具备完整产品级页面；
- 六页属于同一品牌与视觉语言，但不是六个同模板页面；
- 每页均通过 Visual Quality、Responsive、Accessibility、Content 与 Degradation 检查。

### Automated Checks

- 8 个 route 的 language / CTA / metadata / source / status smoke；
- content schema、section identity、内部链接和 Products 父级状态；
- lint、typecheck、tests、build、axe；
- 关键 viewport、no-Resident、reduced-motion、asset failure 回归。

### Human Review

**Products、Aftelle、Studio、About 四个独立 Visual Gate 均为强制人工审核。** 四页全部通过后，再进行一次六页面视觉、内容、导航和品牌一致性人工审核；Codex 不得一次性自动判定 Stage 1.6 PASS。

### Dependencies

- Stage 1.5 已人工通过；
- 各页真实中英文内容与来源达到可审核状态；
- Aftelle / Studio 当前事实若仍缺失，页面必须以受限、诚实内容成立，不能用推测填补。

### Explicit Non-goals

- 不创建长期 Universe 平台页、Research、Developers、Updates、Support、Contact 或 Legal 空页；
- 不制造产品下载、体验、定价、账户或成熟公司入口；
- 不以共用组件为理由强行统一四页 Layout。

### Exit Gate

四个逐页人工 Visual Gate 与六页面一致性 Gate 全部明确通过，自动检查完成并形成稳定阶段 commit / push 后，才允许进入 Stage 1.7。

---

## Stage 1.7 — Motion 与 Resident Presence

### Goal

在静态网站已经产品级成立后，为真实交互、连续性与关系增加受控 Motion，并仅在证明不可替代价值时引入 Resident Presence 或高级渲染。

### Scope

- Navigation、CTA、Section transition、页面状态反馈和必要 scroll response；
- Resident Presence 的视觉必要性评估；
- CSS / DOM / SVG → Canvas → WebGL / Three.js 的渐进技术边界；
- static fallback、reduced-motion、failure、low-performance 与 Mobile degradation；
- renderer lifecycle、cleanup 与性能。

### Main Tasks

- 先用 CSS 建立即时、克制、可理解的基础交互反馈；
- 对每项持续 Motion 记录唯一职责、触发、退出和 reduced-motion 版本；
- 对 Resident 执行 No-Resident test 与不可替代价值证明；
- 优先 DOM / CSS / SVG，确实不足才评估 Canvas，再不足且有明确价值才评估 WebGL / Three.js；
- 将高级视觉保持为独立 Client Island，不进入内容、SEO、导航或 CTA critical path；
- 实现 renderer failure、asset failure、页面隐藏、卸载、低性能设备和 Mobile 降级；
- 在真实设备和 Preview 中复核 bundle、交互与视觉价值。

### Inputs

- Stage 1.4–1.6 已通过的静态六页面；
- Node 7 Motion / Resident 四层机制；
- Node 8 Presence / Degradation / No-Resident Gate；
- Node 9 Motion 分级、Client Island 与高级渲染准入条件。

### Deliverables

- 经审核的基础 Motion；
- Resident Presence 采用或不采用的证据化决定；
- 如采用，高级视觉边界、fallback、性能与生命周期实现；
- reduced-motion、static、failure、Mobile / low-performance 版本；
- 浏览器与设备审核记录。

### Acceptance Criteria

- 移除 Resident 与高级 Motion 后，网站仍完整、好看、可理解；
- 每项 Motion 都有内容、状态或关系职责，不是装饰套件；
- Resident 不遮挡内容、不成为品牌或页面成立的前置条件；
- reduced-motion 无功能差异，renderer / asset failure 被限制在视觉区域；
- Mobile 与低性能设备不会加载后再隐藏不必要高级渲染；
- 持续渲染可暂停、卸载、清理，无明显性能或交互回退。

### Automated Checks

- lint、typecheck、tests、build；
- reduced-motion、renderer-off、failure 与 navigation E2E；
- lifecycle / cleanup、页面隐藏和重复挂载测试；
- bundle、Lighthouse、Core Web Vitals 实验与关键 viewport 回归；
- 自动结果只说明工程风险，不判断视觉价值。

### Human Review

**强制人工 Resident / Motion 视觉判断。** 人工确认增强是否真正增加 Eterna 的 Presence、Continuity 与关系价值，是否符合 Living Precision，是否值得其性能与维护成本；Codex 不得因技术实现成功自动升级渲染层或判 PASS。

### Dependencies

- Stage 1.4–1.6 所有静态页面已达到产品级并完成人工审核；
- 有真实浏览器和设备测试条件；
- 高级资产若存在，来源、权利与 fallback 已通过治理。

### Explicit Non-goals

- 不因为“未来感”默认使用 WebGL、Three.js、粒子或全站固定 Canvas；
- 不迁移 Legacy Aurora / OGL；
- 不建立通用多渲染器平台或 Resident 最终上位外观规范；
- 不用 Motion 修补未解决的 Layout、Typography 或内容问题。

### Exit Gate

人工明确批准 Motion 与 Resident 决定，所有降级 / 生命周期 / 性能检查通过，并形成阶段 commit / push 后，才允许进入 Stage 1.8。

---

## Stage 1.8 — 全站质量与 Release Candidate

### Goal

对 Website 1.0 执行完整内容、视觉、可访问性、SEO、性能和失败降级验收，解决全部阻塞问题并形成可追溯的 Release Candidate。

### Scope

- Content：中文、English、来源、状态、CTA、双语一致性；
- Visual：六页一致性、Typography、Layout、Desktop / Tablet / Mobile、无 AI / template 感；
- Accessibility：Keyboard、Focus、VoiceOver、zoom、reduced-motion、WCAG 2.2 AA；
- SEO：metadata、canonical、hreflang、sitemap、robots、social metadata、404；
- Performance：Core Web Vitals、bundle、images、fonts、Motion、Resident、Client Islands；
- Failure / Degradation：部分 JS、Resident、asset、Motion off、no Resident、低能力 Mobile。

### Main Tasks

- 固定 RC candidate commit，建立完整测试矩阵与缺陷清单；
- 对 12 个 URL 执行内容、SEO、视觉、响应式和状态审计；
- 完成人工 Keyboard、VoiceOver、200% zoom 与 reduced-motion 检查；
- 以真实 production-like Preview 测量性能与资源行为；
- 验证无 JS / 部分 JS、无资产、无 Resident 和 renderer failure；
- 清除假入口、内部 Stage、草稿、过期来源和未启用内容；
- 阻塞问题全部回到责任阶段修复并重新验证；
- 形成 Release Candidate manifest、证据和已知非阻塞事项。

### Inputs

- Stage 1.1–1.7 所有已通过输出和阶段证据；
- Node 5 MUST / SHOULD 与 Node 7 / 8 质量门禁；
- Node 9 testing、performance、accessibility、SEO、Preview / production 规则。

### Deliverables

- Website 1.0 Release Candidate；
- 12 URL QA matrix；
- 内容、视觉、Accessibility、SEO、Performance、Degradation 报告；
- RC commit SHA、Preview URL、asset / content version 与已知问题记录；
- Stage 1.9 使用的发布候选和验收证据包。

### Acceptance Criteria

- Node 5 的全部 `MUST` 有实现或明确的条件式关闭证据，未启用能力没有假入口；
- 12 URL 的双语、SEO、导航、内容状态和 CTA 正确；
- 六页通过全站 Visual Quality Gate，Desktop / Tablet / Mobile 无阻塞视觉问题；
- WCAG 2.2 AA 目标与人工辅助技术 Gate 无阻塞问题；
- Core Web Vitals、bundle、媒体和 Client Islands 没有未接受的阻塞回退；
- 所有关键失败与降级路径完整；
- RC 内容、代码和资产绑定到同一可追溯 commit / version。

### Automated Checks

- frozen install、format、lint、typecheck、content validation、tests、build；
- 12 URL Playwright、metadata / sitemap / robots、axe；
- screenshot regression、Lighthouse CI、bundle report；
- broken-link、asset manifest、secret leakage 与 production state 检查；
- 自动检查结果不能替代人工 RC Gate。

### Human Review

**强制人工全站 Release Candidate Gate。** 人工审核六页视觉、双语内容、Keyboard / VoiceOver / zoom、真实设备响应式和已知问题；只有人工明确接受 RC，才可进入 Stage 1.9。

### Dependencies

- Stage 1.7 已通过；
- 全部正式内容、资产和 CTA 达到 production 审核状态；
- production-like Preview、测试设备和审核责任可用。

### Explicit Non-goals

- 不在 Stage 1.8 修改 DNS、切 production 或变更 Git 分支治理；
- 不以测试分数掩盖人工视觉、内容或可访问性失败；
- 不为赶 RC 降低 Node 7 / 8 Gate 或新增未审核功能。

### Exit Gate

全部阻塞问题关闭、RC 证据完整且人工明确批准，形成 Stage 1.8 阶段 commit / push 和 immutable RC candidate 后，才允许进入 Stage 1.9。

---

## Stage 1.9 — 迁移、部署与正式上线

### Goal

在完成迁移预检、发布输入和人工上线授权后，将已批准的 Website 1.0 Release Candidate 可回滚地切换为 production，并保留 Legacy 历史证据。

### Scope

- `MIGRATION_PREFLIGHT`、`CUTOVER_INPUT`、`RELEASE_RUNBOOK_INPUT`；
- Vercel Preview / Production、环境变量与 secret；
- `New -> main` reviewed promotion / PR 与 GitHub default branch；
- canonical host、apex / www、HTTPS / TLS、DNS；
- Legacy hash、`/api/create`、cutover、monitoring、rollback 与 archive。

### Main Tasks

- 核实旧站真实 production 域名、平台、commit、DNS、owner、流量、backlinks、hash 与 `/api/create`；
- 确认 canonical host、Vercel account / project / permissions、deployment owner、rollback owner、窗口和阈值；
- 在 Vercel Preview 对 RC 做最终 content / SEO / visual / responsive / accessibility / degradation 验收；
- 配置隔离的 Production environment 与最小 secret；
- 通过 reviewed promotion / PR 将 `New` 纳入 `main`；
- 使 `main` 成为 authoritative production branch，并在批准时更新 GitHub default branch；
- 配置 canonical、apex / www redirect、HTTPS / TLS、DNS、robots 与 sitemap；
- 根据真实流量处理 Legacy hash 和 `/api/create`，不恢复旧架构或假 Contact；
- 执行 production cutover、实际响应验证、monitoring 与 rollback window；
- rollback window 结束且人工确认稳定后，将 Legacy 标记为只读归档，保留 `Eternanet_v0.1` 历史基线。

### Inputs

- Stage 1.8 已批准的 immutable Release Candidate；
- Node 9 migration plan、分支治理与 deployment runbook；
- 真实账户、域名、DNS、旧生产、流量和责任人输入；
- 经批准的 cutover / rollback 授权。

### Deliverables

- 完整 migration preflight 与 release runbook；
- 经审核的 `main` promotion 记录和 production deployment；
- DNS / TLS / canonical / redirect / sitemap / robots 验证证据；
- production verification、monitoring 与 rollback 记录；
- Legacy archive 记录与保留基线。

### Acceptance Criteria

- 所有 `MIGRATION_PREFLIGHT`、`CUTOVER_INPUT` 与 `RELEASE_RUNBOOK_INPUT` 在执行前得到真实填写和批准；
- production deployment 与 RC commit / content / asset version 一致；
- 12 URL、root redirect、404、canonical、hreflang、robots、sitemap、TLS 和静态资产实际响应正确；
- Preview 保持 noindex，production 索引边界正确；
- Legacy hash 与 `/api/create` 有基于真实使用的明确处置；
- monitoring 和 rollback 可实际执行，旧部署在窗口内可恢复；
- rollback window 未完成前不删除 Legacy；`Eternanet_v0.1` 保留历史基线。

### Automated Checks

- production build / CI 与 deploy manifest 校验；
- DNS、TLS、redirect、HTTP status、canonical、hreflang、robots、sitemap 和 12 URL smoke；
- broken asset、secret exposure、4xx / 5xx 与 Core Web Vitals 检查；
- rollback deployment 可用性验证；
- 自动成功不构成上线授权。

### Human Review

**强制人工 Production Cutover Gate。** 人工批准 production promotion、DNS / domain 变更、rollback 条件和最终上线；切换后人工复核核心页面与关键设备。Codex 不得自行决定上线、改变分支、修改 DNS 或结束 rollback window。

### Dependencies

- Stage 1.8 RC 已明确人工批准；
- 真实迁移、账户、域名、DNS、owner 与窗口输入齐备；
- reviewed PR / promotion、production 与 rollback 权限可用。

### Explicit Non-goals

- 不在缺少真实输入或人工授权时猜测生产事实；
- 不在事故中临时修改代码代替回滚；
- 不启用未批准 Contact / Analytics / Cookie；
- 不删除 `legacy/`、历史分支或旧部署来制造“完成”。

### Exit Gate

人工完成 Production Cutover 授权，production 验证通过，监控稳定，rollback window 完成且 Legacy archive 记录获批后，Stage 1.9 才可完成。任何删除历史证据的动作仍需单独授权。

---

## 2. 开发阶段 Git、Commit 与 Push 规则

每个 Stage 1.x 完成并通过该阶段 Gate 后，执行：

```text
implement the authorized Stage 1.x scope
→ applicable machine gates, including diff / status checks
→ required human gates
→ scoped staging of approved files
→ create scoped commit
→ push current development branch
→ local / upstream / remote SHA verification
```

正式规则：

- `完成一个正式开发阶段 → 验收 → commit → push`；
- 不长期积累多个正式阶段后一次提交；
- 人工 Gate 未通过时不得使用“代码完成”创建阶段完成提交；
- Design in Browser 的中间小调整不要求每次单独 commit，应在形成可审核稳定点后提交；
- 工作区存在其他修改时只暂存当前阶段批准文件，不使用无边界 `git add -A`；
- commit / push 不等于自动进入下一阶段；下一阶段仍受依赖和 Exit Gate 约束；
- Stage 1.9 的 `New -> main`、default branch 与 production promotion 只能按 reviewed flow 和人工授权执行，不能把普通阶段 push 当作上线。

---

## 3. 强制人工审核 Gate

以下 Gate 不允许 Codex 自动判 PASS：

| 阶段 | 人工 Gate |
|---|---|
| Stage 1.4 | Home Visual Quality Gate：真实浏览器、双语、三类设备、无 Resident 与 reduced-motion |
| Stage 1.5 | Digital Residents Visual / Content Gate：定义准确性、公众可理解性、视觉与双语 |
| Stage 1.6 | Products / Aftelle / Studio / About 逐页 Visual Gate，以及六页面整体一致性 Gate |
| Stage 1.7 | Motion / Resident 视觉必要性、技术升级价值与降级质量 |
| Stage 1.8 | 全站 Release Candidate：内容、视觉、Accessibility、Responsive、SEO、Performance 与 Degradation |
| Stage 1.9 | Production Cutover、分支 promotion、DNS / domain、rollback 与上线授权 |

Stage 1.1–1.3 仍需要工程、内容、键盘和基础浏览器人工审核，只是不承担最终页面视觉 PASS。

---

## 4. Node 1–9 → Stage 1.1–1.9 覆盖检查

| 冻结职责 | 主要阶段 | 覆盖结论 |
|---|---|---|
| 6 页面 / 12 双语 URL | Stage 1.2、Stage 1.3、Stage 1.8、Stage 1.9 | `COVERED`：route、内容、SEO、RC 与 production 均验证 |
| Header / Footer / `中 / EN` | Stage 1.2、Stage 1.3、Stage 1.4–1.6、Stage 1.8 | `COVERED`：同页切换、共享框架与逐页审核 |
| Content Governance | Stage 1.2、Stage 1.4–1.6、Stage 1.8 | `COVERED`：schema、来源、双语、事实与发布状态、失效门禁 |
| SEO | Stage 1.3、Stage 1.8、Stage 1.9 | `COVERED`：metadata、canonical、hreflang、sitemap、robots、404 与上线响应 |
| Design in Browser | Stage 1.4–1.7 | `COVERED`：真实内容、路由、响应式、逐页浏览器人工审核 |
| Living Precision | Stage 1.3–1.8 | `COVERED`：基础系统、页面视觉、Motion 与全站质量 Gate |
| Visual Quality / Anti-pattern / DEAD Gate | Stage 1.4–1.8 | `COVERED`：Home、概念页、四页、增强层和 RC 分层审核 |
| Resident Presence | Stage 1.4、Stage 1.5、Stage 1.7、Stage 1.8 | `COVERED`：先无 Resident，后证据化增强与全站降级 |
| Motion | Stage 1.3、Stage 1.4–1.7、Stage 1.8 | `COVERED`：reduced-motion 基线、页面迭代、正式增强和 RC |
| Responsive | Stage 1.3–1.8 | `COVERED`：Desktop、Tablet、Mobile 从框架到 RC 全程审核 |
| Accessibility / WCAG 2.2 AA | Stage 1.1、Stage 1.3–1.8 | `COVERED`：语义、Keyboard、Focus、VoiceOver、zoom、motion 与人工 Gate |
| Performance | Stage 1.1、Stage 1.4、Stage 1.7、Stage 1.8、Stage 1.9 | `COVERED`：轻量基线、页面预算、高级视觉、RC 与 production 指标 |
| Preview | Stage 1.1–1.9 | `COVERED`：工程 Preview、草稿 noindex、逐页审核、RC 与最终 promotion |
| Production | Stage 1.2、Stage 1.3、Stage 1.8、Stage 1.9 | `COVERED`：fail-closed、SEO 身份、RC 与上线验证 |
| Legacy Migration | Stage 1.1、Stage 1.2、Stage 1.7、Stage 1.9 | `COVERED`：隔离、重写、禁止 Aurora 继承、迁移与归档 |
| Repository Branch Governance | 全阶段 Git 规则、Stage 1.9 | `COVERED`：阶段 push 与最终 reviewed `New -> main` 分开治理 |
| Cutover | Stage 1.8、Stage 1.9 | `COVERED`：immutable RC、preflight、promotion、DNS 与验证 |
| Rollback | Stage 1.1、Stage 1.8、Stage 1.9 | `COVERED`：可恢复构建、RC 绑定、rollback deployment / window / archive |
| Contact / Privacy / Legal | Stage 1.2、Stage 1.3、Stage 1.8、Stage 1.9 | `COVERED`：首版默认关闭、无假入口；真实收集个人信息前重新通过门禁 |
| Analytics / Cookie | Stage 1.1、Stage 1.3、Stage 1.8、Stage 1.9 | `COVERED`：首版默认关闭，不创建无意义 banner；未来按真实需求审核 |
| Asset source / rights / fallback | Stage 1.2、Stage 1.4–1.8 | `COVERED`：manifest、逐页资产、alt / transcript、失败和 RC 审核 |

覆盖检查未发现必须新增第十个正式开发阶段的职责。

---

## 5. 冲突、边界与非阻塞输入

### 未发现实质冲突

- Node 5 要求保留真实联系能力，Node 9 冻结首版默认不启用 Contact。开发计划以“保留受控技术边界、不创建页面 / 入口 / API；未来条件全部成立后再启用”同时满足两者；
- Node 8 将最终视觉保持 `NOT_FROZEN`，Node 10 通过 Stage 1.4–1.7 的 Design in Browser 和人工 Gate 收敛视觉，不把规划文档误当高保真批准；
- Node 9 的 SSG-first 与 Draft Preview 不冲突：production 只消费 `PUBLISHED`，受控 Preview 可以显示 `DRAFT / REVIEW_REQUIRED` 且必须 noindex；
- Node 9 选择 Next.js 不自动引入 Tailwind、shadcn、Bento Grid、generic Hero、generic Card system 或重型组件库；
- Resident 是增强层，Stage 1.4–1.6 静态页面先通过，Stage 1.7 才允许评估高级渲染，符合 No-Resident Gate；
- `New` 是当前开发基线，`main` 是最终 authoritative production branch；阶段 push 到 `New` 与 Stage 1.9 reviewed promotion 职责分离。

### 后续必须补齐但不阻塞 Node 10 冻结

| 分类 | 输入 | 最迟完成阶段 |
|---|---|---|
| `RELEASE_RUNBOOK_INPUT` | 12 个页面的 Fact Owner、Language Reviewer、Publish Approver | 对应内容进入 production 前；Stage 1.2 起记录，Stage 1.8 完成 |
| `MIGRATION_PREFLIGHT` | 旧站 production 域名、平台、commit、DNS、owner、流量、backlinks、重要 hash、`/api/create` | Stage 1.9 cutover 方案执行前 |
| `CUTOVER_INPUT` | canonical host 的 apex / www、cutover 日期 / 窗口、`New -> main` 和 default branch 具体时间 | Stage 1.9 production promotion 前 |
| `RELEASE_RUNBOOK_INPUT` | Vercel account / project / 权限 / owner、rollback owner / window / threshold | Stage 1.9 production 配置与 cutover 前 |
| `FUTURE_DECISION` | Contact / Privacy / Legal、Analytics / Cookie、CDN / Object Storage、Legacy 最终删除 | 仅在真实需求或单独授权出现时；不阻塞核心 Website 1.0 |

Aftelle Product North Star、正式公司公开身份、最终品牌资产和部分当前产品事实仍受既有来源限制。它们不允许被开发者补写；若某页面缺少足够公开事实，应以受限、诚实、来源明确的内容成立，不能用假功能、空页面或 `Coming soon` 填补。

---

## 6. Node 10 审核结论

- Stage 1.1–1.9 已覆盖 Node 1–9 的正式冻结职责；
- 未发现需要新增 Stage 1.10 的真实阻塞职责；
- 未发现需要重开产品定位、Sitemap、技术栈、内容源、部署、双语或 Design in Browser 路线的实质冲突；
- 所有人工视觉、内容、RC 与 production Gate 均保留人工裁决；
- P1–P6 均已通过，Node 10 已接入 `AGENTS.md`、Engineering Standards、Tool Governance、两个 CORE Skills 与 Quality Gates；
- 未发现 Node 10 与 P3–P6 的实质冲突，未发现 Node 8 / Node 9 regression，Stage 1.1–1.9 的实质规划保持不变；
- Stage 1.8 仍是唯一 Release Candidate 阶段，Stage 1.9 只验证 RC continuity、release preflight 与 Production authorization；
- Production authorization = `HUMAN_ONLY`；`New -> main` 与 GitHub default branch 变更只允许在 Stage 1.9 reviewed promotion 中执行；
- 本轮只冻结计划，没有开始 Stage 1.1，没有修改 Legacy、应用、CI、工具、Plugin / MCP、GitHub 权限、DNS 或 Deployment。

```text
P1 = PASS
P2 = PASS
P3 = PASS
P4 = FINAL PASS
P5 = FINAL PASS
P6 = FINAL PASS
P7 = PASS

BLOCKER = NONE
MAJOR = NONE
NEW_REGRESSION = NONE

Node 10 plan = FROZEN
Node 10 = PASS / FROZEN
Stage 0 = COMPLETE
Stage 1 = READY_TO_START / NOT_STARTED
Stage 1.1 = READY_TO_START / NOT_STARTED
Stage 1.2–1.9 = NOT_STARTED
```

Node 10 最终状态：`PASS / FROZEN`
