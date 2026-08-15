# AGENTS.md — Eterna Website

> 本文件是所有在 `Eterna_Website` 仓库中工作的代码 AI（Codex / Cursor / Fable 等）的总工作入口。**执行任何任务前必读。**
>
> 本文件规定“AI 应该如何工作”；工程代码如何编写，以 `docs/10-development-plan/engineering-standards-v0.1.md` 为准。
>
> 规则冲突时，按以下优先级处理：
>
> **Eterna 上位事实 / Node 1–10 > 本文件 > Engineering Standards > Tool Governance > task-specific Skill > 工具能力。**
>
> 工具能够执行某项操作，不代表当前任务已经授权执行。

---

## 1. 执行前一致性门禁

执行前先核对当前对话项目、目标仓库、Stage / 内部节点和任务内容是否一致；不一致或无法确认时，立即停止并指出错位，不得修改、测试、提交或推送。

开始任何任务前至少确认：

- Project：`Eterna Website`；
- Repository：`Eterna_Website`；
- 当前 Git branch 与任务要求一致；
- 当前 Stage 与任务要求一致；
- 正式开发任务已经明确授权当前 `1.x.x` 内部节点；
- 当前任务确实属于该 Stage / 内部节点；
- working tree 状态已经检查并理解；
- 不存在来源不明的未提交修改。

任一项不成立时：

```text
STOP

→ 不修改
→ 不安装
→ 不测试
→ 不 commit
→ 不 push
→ 先报告错位或未知状态
```

不要根据聊天印象、历史 commit 或旧 handoff snapshot 猜测当前 Stage。当前 Stage / Node 的正式状态以 `docs/10-development-plan/development-plan-v0.1.md` 和当前明确任务为准。

---

## 2. 30 秒进入项目状态

### 2.1 Eterna Website 是什么

Eterna Website 是：

**Eterna 的长期项目官网、品牌门户与公开产品体系总入口。**

核心职责：

- 解释 Eterna；
- 解释 Digital Resident；
- 展示有真实来源支持的当前产品；
- 提供真实存在的公开产品入口；
- 表达长期方向，但不把长期愿景伪装成当前能力。

它不是：

- 通用公司简介网站；
- 单一产品 Landing Page；
- Aftelle 官网；
- Studio 官网；
- Eterna Universe 中新的产品平台。

基本认知层级：

```text
Eterna
→ Digital Resident
→ Products
→ Aftelle / Studio
```

Digital Resident 是 Eterna 的中心主体。模型、Agent、工作流、Avatar、Resident Renderer、页面视觉和具体产品都不能反向取代 Digital Resident 的主体定义。

### 2.2 生命周期模型

```text
Stage 0
= Website 1.0 规划与开发前准备
= FINAL CLOSED

Stage 1
= Website 1.0 正式开发生命周期
= Stage 1.1–1.9
```

Stage 1 内部采用：

```text
Stage 1.x
→ JUST_IN_TIME 制定 1.x.1–1.x.n
→ 逐节点执行
→ Stage 1.x Final Gate
```

不要在本文件中硬编码容易过期的“当前正在执行 1.x.x”状态。

---

## 3. 文档地图与按需读取

**禁止为了“理解整个项目”默认重新扫描全部文档。**

每次任务先读本文件，再只读取当前任务真正需要的正式输入。

| 文档 / 区域 | 什么时候读 |
|---|---|
| `AGENTS.md` | 每次任务开始前 |
| `docs/10-development-plan/development-plan-v0.1.md` | 确认 Stage、scope、dependencies、non-goals、Exit Gate |
| `docs/10-development-plan/engineering-standards-v0.1.md` | 写或审核正式 Website 代码 |
| `docs/10-development-plan/quality-gates-v0.1.md` | 测试、CI、浏览器验证、Stage Gate、RC / Release |
| `docs/10-development-plan/tool-governance-v0.1.md` | Skill / Plugin / MCP / Browser / GitHub / Vercel / 外部工具 |
| Node 6 | Sitemap、route、双语、页面关系、内容状态 |
| Node 7 | Living Precision、视觉系统、设计原则 |
| Node 8 | Design in Browser、页面职责、交互、Resident / Motion、Human Visual Gate |
| Node 9 Technical Architecture | Next.js、Server / Client、工程架构、环境、测试、部署 |
| Node 9 Content Management | YAML、schema、fact / publication / source、Preview / Production |
| Node 9 Migration Plan | Legacy、分支、迁移、cutover、rollback、Stage 1.9 |
| `.agents/skills/` | 当前任务明确触发对应 Skill 时 |

默认读取范围：

```text
AGENTS
+ 当前 Stage / 内部节点
+ 当前任务直接相关的 1–2 份正式文档
```

只有以下任务可以主动扩大到全仓或大范围读取：

- 明确要求的 full-repository audit；
- migration / release preflight；
- Release Candidate 审核；
- 安全或架构证据范围确实需要全仓；
- 当前任务明确授权的大范围扫描。

读取范围明显扩大时，先说明原因。不要反复重读没有变化的文件。

---

## 4. Stage 1 红线

### 4.1 不得越 Stage / 越内部节点

只执行当前明确授权的 Stage / `1.x.x`。完成 `1.1.1` 不代表可以自动开始 `1.1.2`；完成 Stage 1.1 也不代表可以自动开始 Stage 1.2。下一个节点必须重新获得明确任务授权。

### 4.2 Legacy 默认只读

`legacy/` 是历史实现、迁移证据和 `REFERENCE_ONLY` 材料。除非当前任务明确属于 migration / verification / preflight，否则不得读取或修改对应 Legacy 内容；具体边界见第 10.1 节。

### 4.3 Website 不创造 Eterna 产品事实

Website 是公开表达层，不是 Eterna、Aftelle、Studio 或 Digital Resident 的上位事实源。禁止：

- 根据页面需要补写不存在的产品能力；
- 把开发中功能写成当前已上线能力；
- 把长期 Universe 方向写成当前产品；
- 为 SEO、设计或 CTA 伪造公司、产品、团队、下载、体验、Contact 等事实；
- 用 Website 自己已发布的页面反向证明新产品事实。

不确定的事实必须回到对应正式上游来源。

### 4.4 核心内容不能依赖客户端增强层成立

Website 遵守：

```text
SSG / Server-first semantic content
→ local Client Islands
→ optional visual enhancement
```

不得把整页或 root layout 变成 Client Component，不得让正文依赖客户端 JS 才存在，也不得让 Resident、Motion、Canvas、WebGL 等高级视觉成为内容、导航或 CTA 的前提。详细实现规则以 Engineering Standards 为准。

### 4.5 Resident / Motion 是增强层

页面在 no-Resident、reduced-motion、advanced visual failure、renderer unavailable 和 Mobile 降级条件下仍须成立。Resident 不能成为普通背景、Avatar 阵列、Card 装饰、唯一事实或状态表达，也不能成为导航前置条件。

### 4.6 AI 不得自行通过 Human Gate

Design in Browser、Visual Quality Gate、Living Precision、模板化 / AI 味判断、内容公开批准、中英文表达质量、Release Candidate、Production authorization 和高影响架构 / 依赖取舍，都只能由人工最终裁决。

Build、Playwright、axe、Lighthouse、无变化截图或 AI 判断均不等于 Human Gate `PASS`。浏览器证据边界见第 9 章。

### 4.7 高影响操作必须明确人工授权

以下操作默认禁止自动执行：

- Production deployment / promotion / rollback，或 DNS、domain transfer、canonical cutover；
- secret 创建、读取、轮换或删除；
- branch protection、GitHub default branch、force push、branch 删除或 destructive repository admin；
- production data write；
- security / release gate bypass，或 `New -> main` promotion。

```text
TOOL_CAN_DO_IT
≠
AGENT_IS_AUTHORIZED_TO_DO_IT
```

---

## 5. 权威、执行证据与历史材料

### 5.1 Normative Authority

正式规范权威：

```text
Eterna_Docs
→ Node 1–10
→ AGENTS.md
→ Engineering Standards
→ Tool Governance
→ task-specific Skill
```

下层不能静默覆盖上层。Skill 和工具不产生新事实或授权，implementation 也不能成为新的上位事实源。

实施证据若表明上层冻结内容存在真实矛盾：

```text
STOP
→ 报告冲突
→ 回到受影响的正式文档人工裁决
```

不得用“代码已经这么写了”反向修改产品或架构事实。

### 5.2 Execution Evidence

以下属于执行证据，而不是新的规范事实源：

- 当前 implementation、automated tests 和 production build；
- Browser / Playwright、accessibility、performance 和 Quality Gate evidence；
- Preview / artifact。

执行证据用于证明实现是否符合规范；implementation 与 Node 文档不同时，不能默认 implementation 更正确。

### 5.3 Historical / Reference

以下属于历史或参考材料：

```text
legacy/
references/
historical P / Node handoff snapshots
旧 baseline SHA
旧实现事实
```

历史差异不是当前冲突。不要为了让历史文件“看起来最新”而机械修改。当前 Stage / Node 状态以 `docs/10-development-plan/development-plan-v0.1.md` 为最终锚点。

---

## 6. Stage / 内部节点执行协议

### 6.1 Before implementation

进入任何正式 `1.x.x` 实现任务前：

1. 通过第 1 章一致性门禁；
2. 确认当前 Stage / internal node；
3. 读取 Development Plan 中对应 Stage；
4. 读取当前内部节点任务说明；
5. 读取最少必要正式文档；
6. 明确预计修改文件范围；
7. 明确本节点适用的 Quality Gates；
8. 确认 non-goals；
9. 确认没有未知 working-tree 修改。

### 6.2 Implementation

```text
理解当前实现
→ 搜索已有能力
→ 做最小正确修改
→ 不扩大 scope
```

一次只解决当前节点。

### 6.3 Verification

```text
run applicable checks
→ inspect result
→ inspect git diff
→ verify no unrelated changes
```

需要 Human Gate 时，停在人工审核，不得自行宣布通过。

### 6.4 Delivery

任务明确要求提交时：

```text
scoped staging
→ commit
→ push
→ verify local / upstream / remote SHA
```

有正式内部节点时，commit 信息应清楚识别该节点，例如：

```text
[1.1.1] establish root application scaffold
```

不要求每次微小修改都单独 commit；只提交稳定、可审核的节点成果。

### 6.5 Stop

当前节点完成后必须停止。不要自动执行下一个 `1.x.x`、下一个 Stage，或顺手修复旁边发现的问题；额外问题只报告。

---

## 7. Scope、Reuse 与 Anti-AI-code

### 7.1 Scope Discipline 与外科手术式修改

- 一次只接一个边界明确的任务，只修改当前任务真正需要的文件和逻辑；
- 不顺手清理、重命名、升级 dependency 或统一全仓格式；
- 不覆盖用户已有修改；
- 修改范围明显扩大时先报告，并优先跟随当前已有代码风格。

发现的问题按以下方式处理：

```text
IN_SCOPE
→ 当前任务直接需要，处理

OUT_OF_SCOPE
→ 记录 / 报告，不处理
```

Bug 修复遵循“复现 / 定位 → 圈定范围 → 修复 → 回归验证”。连续修改仍不能证明方向正确时，停止并重新分析，不要持续堆补丁。

### 7.2 Reuse-first，但不过度抽象

创建 component、hook、utility、helper、type、schema、motion wrapper、layout primitive、validation rule 或 dependency 前：

1. 搜索仓库是否已有职责匹配的能力；
2. 检查 Web / React / Next 原生能力能否解决；
3. 检查已批准 dependency 是否已有合适能力；
4. 仍不能解决时，才考虑新增实现或 dependency。

优先级：

```text
Web Platform
→ React / Next.js
→ repository existing implementation
→ approved dependency
→ mature third-party dependency
→ custom implementation
```

只出现一两次的模式默认保留具体实现。只有重复真实存在、语义和职责相同，且抽象后调用方更清楚时才抽象；不要为未来复用预建 universal section、generic renderer、page builder 或 config-driven-everything。

### 7.3 Anti-AI-code

代码应像有经验的工程师为当前真实问题写出的最小、清楚、可维护实现。禁止：

- 不用多层 abstraction 包裹简单逻辑，不添加不改变职责的冗余 wrapper；
- 不创建没有真实调用者的 helper，不使用 empty catch、吞掉错误或制造 silent failure；
- 添加 speculative fallback 或没有真实失败语义的 “just in case” 分支；
- 编写没有真实 caller、threat 或 failure evidence 的 defensive code；
- 不建立 `CommonUtils`、`HelperManager` 等垃圾桶，不使用 `data1`、`item2` 等占位命名；
- 不建立无真实需求的 future-proof scaffolding，不为显得完整而添加未要求功能；
- 不借当前任务进行无关重构。

### 7.4 Comment / JSDoc

代码默认自解释。Comment 只解释非显然的 `why`，例如 architecture boundary、browser workaround、accessibility / SEO 原因、content governance、security 约束，或容易被未来错误优化掉的 design / motion tradeoff。

不得逐行教学解释 `what`，不得机械地为每个函数、接口或自解释参数生成 JSDoc；只有非显然 public contract 才考虑简短 JSDoc。

### 7.5 Dependency 简明准入

新增 dependency 前必须能够说明：

1. 当前解决什么真实问题；
2. Web / React / Next 原生能力为什么不足；
3. 仓库已有能力为什么不足；
4. package 的明确职责；
5. maintenance 状态；
6. bundle / runtime 成本；
7. 是否进入 client bundle；
8. replaceability。

不能证明清楚收益时，不添加。不得因为 AI 熟悉、教程常用或“网站通常都会装”而加入 UI kit、page builder、巨型 animation stack 或通用 state-management library。完整准入规则以 Engineering Standards 的 Dependency Admission 为准。

---

## 8. Engineering Standards 路由

正式代码必须读取 `docs/10-development-plan/engineering-standards-v0.1.md`。本文件不维护第二套详细代码规范，只保留以下工作方向：

```text
Correctness
→ Clarity
→ Simplicity
→ Maintainability
→ Reuse
→ Abstraction
```

正式实现遵守 concrete before abstract、complexity must be earned、Server-first、叶子化 Client Islands、TypeScript strict、外部输入验证、Content / Code 分离和已冻结的 CSS / Motion 路线。具体 Component、State、Effect、TypeScript、CSS、Accessibility、SEO、Content、Motion、Error Handling、Testing 和 Performance 规则均回到 Engineering Standards，不在此复制。

---

## 9. Design in Browser / Browser / Responsive / Accessibility

涉及真实页面视觉时，必须遵守 Node 7 / Node 8；正式设计方式是 `Design in Browser`。AI 不得仅根据源码判断页面视觉通过。

涉及视觉、Responsive 或浏览器兼容性的任务，必须根据当前 Stage 和 `docs/10-development-plan/quality-gates-v0.1.md` 提供真实证据。按适用范围可能包括：

- 中文 / English，以及 Desktop、Tablet、Mobile、Wide / 非典型比例；
- Chromium、WebKit、Firefox，以及 no-Resident、reduced-motion；
- keyboard、focus、zoom、accessibility。

具体兼容矩阵、viewport 和 Gate 强度由当前 Stage / Quality Gates 决定，不在本文件硬编码。

缺乏实际证据时，不得声称 cross-browser `PASS`、responsive `PASS`、accessibility `PASS`、Safari compatible 或 Mobile complete。自动工具只能产生证据，最终视觉裁决始终属于人工。

---

## 10. Legacy / Security / Tool Authority

### 10.1 Legacy

`legacy/` 默认只读。禁止：

- 从 root app import `legacy/`；
- copy Legacy 实现进入新站；
- 自动迁移 Aurora / OGL 或旧 Airtable `/api/create`；
- 升级 Legacy dependency；
- 修复、格式化或现代化 Legacy；
- 把 Legacy 文案当成当前正式 Website 文案；
- 把 Vite 架构当成 Website 1.0 目标架构。

只有明确的 migration / verification / preflight 任务才能读取或修改其授权范围内的对应内容。

### 10.2 Security 与产品默认值

永远不要：

- 输出 secret value、把 secret 写入 prompt 回报或日志；
- commit `.env*` 真实值，或把 server secret 移入 Client；
- 把 production credential 或 production data 用于 Preview。

Client environment variable 必须视为公开信息。

Contact 和 Analytics 默认关闭。未经后续明确 Stage / task 授权，不得启用 tracking、analytics、contact capability 或相关数据接入；不能因为“网站通常都有”而自行添加。

### 10.3 Tools

涉及 Skill、Plugin、MCP、Browser、GitHub、Vercel、Security tool 或 external SaaS 时，必须读取 `docs/10-development-plan/tool-governance-v0.1.md`。

默认路径：

```text
one capability
→ one preferred path
→ minimum permission
```

GitHub Connector 为 `READ_ONLY_FIRST`。Remote write 需要当前任务明确授权；Production、高权限和 destructive operation 需要明确人工授权。

---

## 11. Git 安全

正常节点流程：

```text
implement
→ applicable machine checks
→ required human review
→ inspect diff
→ scoped staging
→ commit
→ push
→ verify SHA
```

规则：

- 不使用无边界 `git add -A`，除非已经逐项检查全部变化；
- 不 reset、checkout、clean、force push、擅自 merge / 删除 branch，或覆盖用户未知修改；
- 不自行修改 branch protection 或 GitHub default branch；
- Stage 1.9 前不执行 `New -> main` production promotion；
- 当前开发 branch 的改变必须来自明确任务，push 后必须核对 local / upstream / remote SHA。

提交前至少检查：

```text
git diff --check
git diff
git status --short
```

并执行当前节点要求的其他验证。

---

## 12. Verification Truth 与完成定义

### 12.1 不允许伪造验证结果

只有真正执行过的检查才能报告 `PASS`。统一使用 `PASS`、`FAIL`、`NOT_RUN`、`BLOCKED`。

未执行时报告 `NOT_RUN` 和原因；被环境或依赖阻止时报告 `BLOCKED` 和原因。

不得用“应该可以”“理论上没问题”“看起来应该通过”或 AI judgment 代替真实检查。机器检查无法运行时，AI 判断不能替代机器 Gate；浏览器证据不存在时，源码分析不能替代 Browser Gate；人工 Gate 未执行时，自动检查不能替代 Human Gate。

### 12.2 Definition of Done

任务只有同时满足以下条件才能报告完成：

- 项目 / 仓库 / Stage / 内部节点一致；
- scope 没有扩大，且只修改了授权范围；
- 没有违反 Node 1–10 冻结边界；
- 没有未经批准的新 dependency；
- applicable machine checks 已执行并如实报告；
- 需要的 Browser / Accessibility evidence 已实际取得；
- 需要的 Human Gate 没有被 AI 自行宣布 `PASS`；
- `git diff` 已检查，且没有无关文件修改；
- 要求 commit / push 时已经完成并核对 SHA；
- 当前节点完成后没有自动进入下一节点。

详细 Gate 要求以 `docs/10-development-plan/quality-gates-v0.1.md` 为准。

---

## 13. Project Skills

Repo-local task workflow 的唯一来源是 `.agents/skills/`。Codex 与 Cursor 使用同一来源，不创建 Cursor-specific copy。

### 13.1 `$website-behavior-preserving-simplification`

只在用户明确要求 simplify、cleanup、remove unnecessary abstraction、remove real duplication 或 remove AI code smell 时使用。

必须保持 behavior、scope、public contract 和 visual result 不变，除非任务另有授权。不得在普通 feature 开发中自动触发“顺手重构”。

### 13.2 `$website-design-in-browser-review`

只在用户明确要求 browser、visual、UI、responsive 或 Design in Browser review 时使用。

该 Skill：

- 组织真实浏览器证据；
- 对照 Node 7 / Node 8；
- 输出 findings；
- 不自动修改代码，除非任务另行授权；
- 不自行通过 Human Visual Gate。

最终状态必须停在 `HUMAN_VISUAL_DECISION_REQUIRED`，除非人工已经明确给出裁决。

Project Skill 必须服从本文件、Engineering Standards、任务相关 Node 文档和当前明确任务。Skill 是 workflow，不是新事实源、规则、权限或自动 Gate。

---

## 14. 最终原则

任何 AI 在本仓库中的目标都不是“尽可能多地完成事情”，而是：

```text
确认正确项目
→ 确认正确 Stage / 节点
→ 读取最少必要上下文
→ 守住冻结边界
→ 做最小正确实现
→ 用真实证据验证
→ 形成可审核 Git 结果
→ 停在当前授权边界
```

如果不确定：

**停止并报告，不要猜。**
