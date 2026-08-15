# AGENTS.md — Eterna Website

> 本文件是所有在 `Eterna_Website` 仓库中工作的代码 AI（Codex / Cursor / Fable 等）的总工作入口。**执行任何任务前必读。**
>
> 本文件负责规定“AI 应该如何工作”；工程代码本身如何编写，以 `docs/10-development-plan/engineering-standards-v0.1.md` 为准。
>
> 若规则发生冲突，优先级为：
>
> **Eterna 上位事实 / Node 1–10 > 本文件 > Engineering Standards > Tool Governance > task-specific Skill > 工具能力。**
>
> 工具能够执行某项操作，不代表当前任务已经授权执行。

---

## 0. 执行前一致性门禁

执行前先核对当前对话项目、目标仓库、Stage / 内部节点和任务内容是否一致；如不一致或无法确认，立即停止执行并指出错位，不得修改、测试、提交或推送任何内容。

开始任何任务前至少确认：

- Project：`Eterna Website`
- Repository：`Eterna_Website`
- 当前 Git branch 与任务要求一致
- 当前 Stage 与任务要求一致
- 若任务属于正式开发，当前 `1.x.x` 内部节点已经明确授权
- 当前任务确实属于该 Stage / 内部节点
- working tree 状态已经检查并理解
- 不存在来源不明的未提交修改

如果任一项不成立：

```text
STOP

→ 不修改
→ 不安装
→ 不测试
→ 不 commit
→ 不 push
→ 先报告错位或未知状态
```

不要根据聊天印象、历史 commit 或旧 handoff snapshot 猜测当前 Stage。

当前 Stage / Node 的正式状态，以：

`docs/10-development-plan/development-plan-v0.1.md`

和当前明确任务为准。

---

## 1. 30 秒进入项目状态

### Eterna Website 是什么

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

Digital Resident 是 Eterna 的中心主体。

模型、Agent、工作流、Avatar、Resident Renderer、页面视觉和具体产品都不能反向取代 Digital Resident 的主体定义。

### 当前生命周期

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

## 2. 文档地图与按需读取

**禁止为了“理解整个项目”默认重新扫描全部文档。**

每次任务先读本文件，然后只读取当前任务真正需要的正式输入。

| 文档 / 区域                                                  | 什么时候读                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| `AGENTS.md`                                              | 每次任务开始前                                                       |
| `docs/10-development-plan/development-plan-v0.1.md`      | 确认 Stage、scope、dependencies、non-goals、Exit Gate               |
| `docs/10-development-plan/engineering-standards-v0.1.md` | 写或审核正式 Website 代码                                             |
| `docs/10-development-plan/quality-gates-v0.1.md`         | 测试、CI、浏览器验证、Stage Gate、RC / Release                           |
| `docs/10-development-plan/tool-governance-v0.1.md`       | Skill / Plugin / MCP / Browser / GitHub / Vercel / 外部工具       |
| Node 6                                                   | Sitemap、route、双语、页面关系、内容状态                                    |
| Node 7                                                   | Living Precision、视觉系统、设计原则                                    |
| Node 8                                                   | Design in Browser、页面职责、交互、Resident / Motion、Human Visual Gate |
| Node 9 Technical Architecture                            | Next.js、Server / Client、工程架构、环境、测试、部署                         |
| Node 9 Content Management                                | YAML、schema、fact / publication / source、Preview / Production  |
| Node 9 Migration Plan                                    | Legacy、分支、迁移、cutover、rollback、Stage 1.9                       |
| `.agents/skills/`                                        | 当前任务明确触发对应 Skill 时                                            |

默认行为：

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

读取范围明显扩大时，先说明原因。

不要反复重读没有变化的文件。

---

## 3. Stage 1 红线

以下红线违反任一条，都属于错误执行。

### 红线 1：不得越 Stage / 越内部节点

只执行当前明确授权的 Stage / `1.x.x`。

完成：

`1.1.1`

不代表可以自动开始：

`1.1.2`

完成：

`Stage 1.1`

也不代表可以自动开始：

`Stage 1.2`

下一个节点必须重新获得明确任务授权。

---

### 红线 2：Legacy 默认只读

`legacy/` 是：

**历史实现 / 迁移证据 / REFERENCE\_ONLY**

默认禁止：

- 从 root app import `legacy/`；
- copy Legacy 实现进入新站；
- 自动迁移 Aurora / OGL；
- 自动迁移旧 Airtable `/api/create`；
- 升级 Legacy dependency；
- 修复 Legacy；
- 格式化 Legacy；
- 把 Legacy 文案当当前正式 Website 文案；
- 把 Vite 架构当成 Website 1.0 目标架构。

只有明确的 migration / verification / preflight 任务才允许读取对应 Legacy 内容。

---

### 红线 3：Website 不创造 Eterna 产品事实

Website 是公开表达层，不是 Eterna、Aftelle、Studio 或 Digital Resident 的上位事实源。

禁止：

- 根据页面需要补写不存在的产品能力；
- 把开发中功能写成当前已上线能力；
- 把长期 Universe 方向写成当前产品；
- 为 SEO、设计或 CTA 伪造公司、产品、团队、下载、体验、Contact 等事实；
- 用 Website 自己已发布的页面反向证明新产品事实。

不确定的事实必须回到对应正式上游来源。

---

### 红线 4：核心内容不能依赖客户端增强层成立

Website 继续遵守：

```text
SSG / Server-first semantic content
→ local Client Islands
→ optional visual enhancement
```

不得为了方便：

- 把整页变成 Client Component；
- 把 root layout 变成 Client Component；
- 让正文依赖客户端 JS 才存在；
- 让 Resident、Motion、Canvas、WebGL 或其他高级视觉成为读取内容、导航或 CTA 的前提。

详细规则以 Engineering Standards 为准。

---

### 红线 5：Resident / Motion 是增强层，不是页面成立条件

页面必须在以下条件下仍然成立：

- no-Resident；
- reduced-motion；
- advanced visual failure；
- renderer unavailable；
- Mobile 降级。

Resident 不能成为：

- 普通背景；
- Avatar 阵列；
- Card 装饰；
- 唯一事实表达；
- 唯一状态表达；
- 导航前置条件。

---

### 红线 6：AI 不得自行通过 Human Gate

以下结果只能由人工最终裁决：

- Design in Browser；
- Visual Quality Gate；
- Living Precision；
- 页面是否模板化 / 是否存在明显 AI 味；
- 内容事实是否批准公开；
- 中英文表达质量；
- Release Candidate；
- Production authorization；
- 高影响架构或依赖取舍。

以下结果均不等于 Human PASS：

- build PASS；
- Playwright PASS；
- axe PASS；
- Lighthouse PASS；
- screenshot 没变化；
- AI 自己认为“看起来没问题”。

---

### 红线 7：高影响操作必须明确人工授权

以下操作默认禁止自动执行：

- Production deployment / promotion / rollback；
- DNS 修改；
- domain transfer；
- canonical cutover；
- secret 创建、读取、轮换、删除；
- branch protection 修改；
- GitHub default branch 修改；
- force push；
- branch 删除；
- destructive repository admin；
- production data write；
- security / release gate bypass；
- `New -> main` promotion。

```text
TOOL_CAN_DO_IT
≠
AGENT_IS_AUTHORIZED_TO_DO_IT
```

---

## 4. 权威、执行证据与历史材料

不要把所有文件都当成同一种“事实源”。

### 4.1 Normative Authority

正式规范权威：

```text
Eterna_Docs
→ Node 1–10
→ AGENTS.md
→ Engineering Standards
→ Tool Governance
→ task-specific Skill
```

下层不能静默覆盖上层。

如果实施证据表明上层冻结内容存在真实矛盾：

```text
STOP
→ 报告冲突
→ 回到受影响的正式文档人工裁决
```

不得通过“代码已经这么写了”反向修改产品或架构事实。

---

### 4.2 Execution Evidence

以下内容属于执行证据，而不是新的规范事实源：

- 当前 implementation；
- automated tests；
- production build；
- Browser / Playwright evidence；
- accessibility evidence；
- performance evidence；
- Quality Gate 输出；
- Preview / artifact。

执行证据用于证明实现是否符合规范。

不能因为当前 implementation 与 Node 文档不同，就默认 implementation 更正确。

---

### 4.3 Historical / Reference

以下属于历史或参考材料：

```text
legacy/
references/
historical P / Node handoff snapshots
旧 baseline SHA
旧实现事实
```

历史差异不是当前冲突。

不要为了让历史文件“看起来最新”而机械修改它们。

当前 Stage / Node 状态以：

`docs/10-development-plan/development-plan-v0.1.md`

为最终状态锚点。

---

## 5. Stage / 内部节点执行协议

进入任何正式 `1.x.x` 实现任务时，按以下顺序执行。

### Before implementation

1. 通过第 0 节一致性门禁；
2. 确认当前 Stage / internal node；
3. 读取 Development Plan 中对应 Stage；
4. 读取当前内部节点任务说明；
5. 读取最少必要正式文档；
6. 明确预计修改文件范围；
7. 明确本节点适用的 Quality Gates；
8. 确认 non-goals；
9. 确认没有未知 working-tree 修改。

### Implementation

```text
理解当前实现
→ 搜索已有能力
→ 做最小正确修改
→ 不扩大 scope
```

一次只解决当前节点。

### Verification

```text
run applicable checks
→ inspect result
→ inspect git diff
→ verify no unrelated changes
```

需要 Human Gate 时：

停在人工审核，不得自行宣布通过。

### Delivery

任务明确要求提交时：

```text
scoped staging
→ commit
→ push
→ verify local / upstream / remote SHA
```

有正式内部节点时，commit 信息应能够清楚识别对应节点，例如：

```text
[1.1.1] establish root application scaffold
```

不要求每次微小修改都单独 commit；只提交稳定、可审核的节点成果。

### Stop

当前节点完成后：

**停止。**

不要自动执行：

- 下一个 `1.x.x`；
- 下一个 Stage；
- 顺手修复旁边发现的问题。

发现额外问题时，只报告。

---

## 6. Scope Discipline 与外科手术式修改

- 一次只接一个边界明确的任务；
- 只修改当前任务真正需要的文件和逻辑；
- 不顺手清理整个项目；
- 不顺手升级 dependency；
- 不顺手重命名无关文件；
- 不顺手统一格式；
- 不因为“可以优化”就开始重构；
- 不因为发现未来需求就预建接口；
- 不覆盖用户已有修改；
- 修改范围明显扩大时先报告；
- 优先跟随当前已有代码风格。

开发过程中发现的问题分为：

```text
IN_SCOPE
→ 当前任务直接需要，处理

OUT_OF_SCOPE
→ 记录 / 报告，不处理
```

Bug 修复时：

```text
复现 / 定位
→ 圈定范围
→ 修复
→ 回归验证
```

如果连续修改仍无法证明方向正确，应停止并重新分析，而不是不断堆补丁。

---

## 7. Engineering Standards 路由

正式代码必须读取：

`docs/10-development-plan/engineering-standards-v0.1.md`

AGENTS 不复制完整代码规范。

只保留以下高层原则：

```text
Correctness
→ Clarity
→ Simplicity
→ Maintainability
→ Reuse
→ Abstraction
```

默认优先级：

```text
Web Platform
→ React / Next.js
→ repository existing implementation
→ approved dependency
→ mature third-party dependency
→ custom implementation
```

正式实现继续遵守：

- concrete before abstract；
- complexity must be earned；
- reuse-first，但不强行 DRY；
- Server-first；
- `'use client'` 尽量保持叶子化；
- TypeScript strict；
- external / untrusted input 必须经过验证；
- CSS Custom Properties + CSS Modules；
- CSS Motion first；
- Content 与代码分离；
- comment 解释 why，不逐行解释 what；
- 禁止 AI 式过度工程。

创建新 dependency 前必须通过 Engineering Standards 的 Dependency Admission。

不要在本文件维护第二套详细代码规范。

---

## 8. Design in Browser / Browser / Responsive / Accessibility

涉及真实页面视觉时，必须遵守 Node 7 / Node 8。

正式设计方式：

`Design in Browser`

AI 不得仅根据源码判断页面视觉通过。

涉及视觉、Responsive 或浏览器兼容性的任务，必须根据当前 Stage 和：

`docs/10-development-plan/quality-gates-v0.1.md`

要求提供真实证据。

按适用范围可能包括：

- 中文；
- English；
- Desktop；
- Tablet；
- Mobile；
- Wide / 非典型比例；
- Chromium；
- WebKit；
- Firefox；
- no-Resident；
- reduced-motion；
- keyboard；
- focus；
- zoom；
- accessibility。

具体兼容矩阵、viewport 和 Gate 强度由当前 Stage / Quality Gates 决定，不在 AGENTS 中硬编码。

禁止在缺乏实际证据时声称：

- cross-browser PASS；
- responsive PASS；
- accessibility PASS；
- Safari compatible；
- Mobile complete。

自动工具只能产生证据。

最终视觉裁决始终属于人工。

---

## 9. Legacy / Security / Tool Authority

### Legacy

`legacy/` 默认只读。

除非任务明确是 migration / preflight / verification，否则不修改。

### Secrets

永远不要：

- 输出 secret value；
- 把 secret 写入 prompt 回报；
- commit `.env*` 真实值；
- 把 server secret 移入 Client；
- 把 secret 写进日志；
- 把 production credential 用于 Preview。

Client environment variable 必须视为公开信息。

### Tools

涉及：

- Skill；
- Plugin；
- MCP；
- Browser；
- GitHub；
- Vercel；
- Security tool；
- external SaaS；

必须读取：

`docs/10-development-plan/tool-governance-v0.1.md`

默认：

```text
one capability
→ one preferred path
→ minimum permission
```

GitHub Connector：

`READ_ONLY_FIRST`

Remote write 需要当前任务明确授权。

Production、高权限、destructive operation 需要明确人工授权。

---

## 10. Git 安全

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
- 不 reset、checkout、clean 或覆盖用户未知修改；
- 不 force push；
- 不自行 merge；
- 不自行删除 branch；
- 不自行修改 branch protection；
- 不自行修改 GitHub default branch；
- Stage 1.9 前，不执行 `New -> main` production promotion；
- 当前开发 branch 的改变必须来自明确任务；
- push 后必须核对 local / upstream / remote SHA。

提交前检查：

```text
git diff --check
git diff
git status --short
```

以及当前节点要求的其他验证。

---

## 11. Verification Truth 与完成定义

### 11.1 不允许伪造 PASS

只有真正执行过的检查才能报告：

`PASS`

统一使用：

```text
PASS
FAIL
NOT_RUN
BLOCKED
```

如果检查没有执行：

```text
NOT_RUN
+ 原因
```

如果环境或依赖阻止检查：

```text
BLOCKED
+ 原因
```

禁止使用：

- “应该可以”；
- “理论上没问题”；
- “看起来应该通过”；
- AI judgment；

代替真实检查。

机器检查无法运行时，AI 判断不能替代机器 Gate。

浏览器证据不存在时，源码分析不能替代 Browser Gate。

人工 Gate 尚未执行时，自动检查不能替代 Human Gate。

---

### 11.2 Definition of Done

一个任务只有同时满足以下条件才能报告完成：

- 项目 / 仓库 / Stage / 内部节点一致；
- scope 没有扩大；
- 只修改了授权范围；
- 没有违反 Node 1–10 冻结边界；
- 没有未经批准的新 dependency；
- applicable machine checks 已执行并如实报告；
- 需要的 Browser / Accessibility evidence 已实际取得；
- 需要的 Human Gate 没有被 AI 自行宣布 PASS；
- `git diff` 已检查；
- 没有无关文件修改；
- 任务要求 commit / push 时已经完成并核对 SHA；
- 当前节点完成后没有自动进入下一节点。

详细 Gate 要求：

`docs/10-development-plan/quality-gates-v0.1.md`

---

## 12. Project Skills

Repo-local task workflow 的唯一来源：

`.agents/skills/`

当前 CORE Skills：

### `$website-behavior-preserving-simplification`

只在用户明确要求以下任务时使用：

- simplify；
- cleanup；
- remove unnecessary abstraction；
- remove real duplication；
- remove AI code smell。

必须：

- behavior unchanged；
- scope unchanged；
- public contract unchanged；
- visual result unchanged，除非任务另有授权。

不得在普通 feature 开发中自动触发“顺手重构”。

---

### `$website-design-in-browser-review`

只在用户明确要求以下任务时使用：

- browser review；
- visual review；
- UI review；
- responsive review；
- Design in Browser review。

该 Skill：

- 组织真实浏览器证据；
- 对照 Node 7 / Node 8；
- 输出 findings；
- 不自动修改代码，除非任务另行授权；
- 不自行通过 Human Visual Gate。

最终状态必须停在：

`HUMAN_VISUAL_DECISION_REQUIRED`

除非人工已经明确给出裁决。

---

## 最终原则

任何 AI 在本仓库中的目标都不是：

“尽可能多地完成事情”。

而是：

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
