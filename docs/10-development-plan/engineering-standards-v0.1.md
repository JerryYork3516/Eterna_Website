# Eterna Website 1.0 — Engineering & Code Standards

内部版本：`v0.1`

文档性质：`Eterna Website 1.0 — Engineering & Code Standards`

状态：`DRAFT / P4-IN-PROGRESS`

编制日期：`2026-08-10`（Asia/Shanghai）

> 本文件定义 Eterna Website 1.0 的基础工程原则、目标目录职责、文件与模块边界，以及复用和抽象规则。
> P4 是 Node 10 开发前的内部规范整理，不是新的正式 Node 或开发阶段；本文件不修改 Node 1–10 的裁决，不开始 D1，也不创建根 Next.js 应用。

---

## 1. 范围与优先级

本版只规定工程规范的基础层。发生取舍时，按以下顺序判断：

```text
Correctness
→ Clarity
→ Simplicity
→ Maintainability
→ Reuse
→ Abstraction
```

复用和抽象不能以牺牲正确性、清晰度或简单性为代价。代码结构必须服务于当前真实问题，而不是服务于架构外观。

本文件服从 Node 9 已冻结的技术架构，不重新选择框架、渲染策略、内容系统、样式方案或部署平台。

---

## 2. 总体工程原则

### 2.1 Clarity first

代码首先要让另一位熟悉 React / Next.js 的工程师快速理解：它负责什么、依赖什么、由谁调用，以及修改会影响哪里。

不得为了以下目的增加无必要复杂度：

- 让架构看起来更完整；
- 增加抽象层数量；
- 为尚未出现的需求预留扩展点；
- 让实现看起来更“专业”或更像 AI 生成的完整方案。

命名、文件位置和调用关系应比注释更先说明设计。需要长篇解释才能成立的结构，应先检查结构本身是否过度复杂。

### 2.2 Native first

解决问题时按以下顺序寻找已有能力：

```text
Web Platform
→ React / Next.js 原生能力
→ 仓库已有实现
→ 已批准依赖
→ 成熟第三方依赖
→ 最后才自研
```

不得重新实现成熟平台能力。进入下一层之前，要能说明前一层为何不能清楚、可靠地解决当前问题。

本顺序不是依赖准入批准；第三方依赖的具体评估与准入规则留给后续 P4 批次。

### 2.3 Concrete before abstract

先写对当前问题最清楚的具体实现。只有同时满足以下条件时才抽象：

- 已经出现真实重复，而不是预测未来会重复；
- 重复承担相同语义和职责，而不只是外观相似；
- 抽象后调用方更容易理解；
- 复用不依赖大量 config、variant 或条件分支。

禁止以下路径：

```text
预测以后会重复
→ 提前建设框架
```

### 2.4 Complexity must be earned

简单不等于把所有内容写进一个文件。清楚的边界、稳定的所有权和真实复用都可以支持合理抽象。

但每新增一层目录、模块、接口、wrapper、配置或依赖，都必须能回答：

> 它现在解决了什么真实问题？

如果没有具体答案，就不增加这一层复杂度。

---

## 3. 目标目录职责

未来根应用可以按真实实现需要自然形成以下目录：

```text
app/
components/
features/
content/
lib/
styles/
public/
tests/
```

这是目标职责说明，不是 D1 的空目录清单。D1 不需要一次创建全部目录；只有出现真实文件和职责时才创建对应目录。

### 3.1 `app/`

负责：

- routing；
- layouts；
- metadata；
- route-level composition；
- server boundary。

`app/` 不得成为巨型业务逻辑目录、页面全部实现的堆放区或 content 数据库。页面路由负责组合，不默认拥有所有下层实现。

### 3.2 `features/`

承载页面或领域自己的具体实现。未来可按真实需要出现：

- `home`；
- `digital-residents`；
- `products`；
- `aftelle`；
- `studio`；
- `about`。

页面专属 Section 默认留在对应 feature。不得仅因两个 Section 外观相似，就提前搬到 shared 层。

### 3.3 `components/`

只承载真正跨页面复用且语义稳定的组件。可按已出现的职责逐步形成 `site`、`ui`、`content`、`motion` 或 `resident` 等边界。

不得提前创建完整组件库目录，不得以“以后可能复用”为理由把页面所有实现上提到 `components/`。

### 3.4 `content/`

承载 Website YAML、terminology、navigation content 与 asset manifest 等发布记录。

这里的内容是 Website 对上位来源的可追溯发布记录，不是 Eterna 上位事实源；内容文件不得执行任意代码，也不得通过页面实现反向补写产品事实。

### 3.5 `lib/`

只承载真正跨 feature 的纯能力。只有一个调用者的能力优先放在调用者附近。

禁止把 `lib/` 变成垃圾桶，也禁止建立持续吸纳无关逻辑的文件，例如：

- `utils.ts`；
- `helpers.ts`；
- `common.ts`；
- `misc.ts`。

文件应按真实能力命名并保持明确所有者。

### 3.6 `styles/`

只承载真正全局或共享的样式基础。不得重演 Legacy 由一个巨大 `styles.css` 管理全站页面、组件、响应式和 Motion 的结构。

具体 CSS 组织、selector 与 responsive 规则留给 P4-C。

### 3.7 `public/`

承载需要由根路径直接提供的公开静态资产。业务模块的私有实现文件不得因放置方便进入 `public/`。

资产的来源、权利、状态和 manifest 仍受 Node 9 内容治理约束；`public/` 不是绕过治理的投放目录。

### 3.8 `tests/`

承载需要跨模块或从公开行为验证系统的测试。与单一模块紧密绑定的测试可以保留在模块附近，避免测试目录与实现所有权脱节。

具体测试类型、工具和覆盖规则不在 P4-A 规定。

---

## 4. 文件与模块边界

基础规则：

- 一个文件有一个清楚的主要职责；
- 文件名表达真实内容，不使用模糊占位名称；
- 模块内部实现默认不向全仓暴露；
- public API 保持小而明确；
- 避免循环依赖；
- shared abstraction 必须来自真实重复；
- 不为了“一文件一个函数”机械拆碎实现；
- 不创建大量只做转发的三行 wrapper 文件。

代码默认放在最接近其所有者和调用者的位置。只有职责已经跨越原边界且语义稳定时，才把它上提到共享层。

### 4.1 Barrel exports

`index.ts` 只在模块确实存在明确公开边界时使用。不得为每个目录自动创建 `index.ts`。

机械 barrel exports 会隐藏依赖来源、扩大无意公开范围，并增加循环依赖风险。直接 import 更清楚时，优先直接 import。

---

## 5. Reuse-first

创建以下任何内容前，必须先检查已有能力：

- component；
- helper；
- utility；
- hook；
- type；
- schema；
- validator；
- layout primitive；
- motion wrapper；
- dependency。

创建前先确认：

1. 当前仓库是否已有职责匹配的实现；
2. Web Platform 是否已有原生能力；
3. React / Next.js 是否已有原生能力；
4. 当前已批准依赖是否已经解决问题；
5. 若仍不能解决，再按后续准入规则评估成熟第三方依赖或自研。

确认完成后，具体方案仍按 Native-first 的优先级选择；仓库中的重复实现不会因为已经存在就优先于更清楚的原生能力。

Reuse-first 不等于强行复用。两个实现即使外观相似，只要职责、页面语义或变化方向不同，就应保持各自所有权。

页面专属 Section 默认由页面 feature 所有；共享层不是“相似代码暂存区”。

---

## 6. DRY 与 YAGNI

DRY 处理真实、同语义的重复；YAGNI 阻止为未发生需求提前建设能力。两者必须同时成立。

如果同一业务规则已经在多处独立实现，应指定一个清楚所有者，避免规则漂移。外观相似、文案结构相近或代码行数重复，本身不足以证明应当抽象。

正式路径是：

```text
先写具体实现
→ 出现真实重复
→ 确认语义相同
→ 再抽象
```

禁止：

```text
预计未来会重复
→ 先设计扩展框架
```

在真实实现证明必要之前，不创建以下类型的万能抽象：

- `UniversalSection`；
- `GenericPageRenderer`；
- `UniversalHero`；
- `UniversalProductCard`；
- `PageBuilder`；
- `SectionFactory`；
- `ConfigDrivenEverything`；
- `BaseService`；
- `BaseComponent`；
- `CommonUtils`；
- `GenericManager`。

抽象是否成立，以职责和变化方向为准，不以“减少了几行代码”或“复用率更高”为准。

---

## 7. 基础 Anti-AI-code 原则

禁止典型的 AI 式扩张：

- 为了显得完整而添加未要求功能；
- 为未来可能需求预建接口、扩展点或 fallback；
- 创建没有调用者的 helper；
- 用多层 abstraction 包裹一层简单逻辑；
- 添加不改变职责的冗余 wrapper；
- 写教学式注释或逐行解释代码；
- 添加没有真实失败语义的 fallback 或 “just in case” 分支；
- 借当前任务进行无关重构；
- 顺手统一整个项目格式；
- 为了看起来专业而建立庞大架构。

判断标准：

> 这段实现是否像一位有经验的工程师为当前真实问题写出的最小、清楚、可维护代码？

如果新增内容不能由当前需求、当前调用者或当前失败路径证明，就不应进入实现。

---

## 8. 与 `AGENTS.md` 的关系

`AGENTS.md` 规定 AI 如何在本仓库工作，包括读取范围、任务边界、修改纪律、验证和 Git 流程。

本文件规定 Website 代码和工程结构应如何形成。它继承 scope discipline、surgical edits、verification 与 dependency caution 等工作原则，但不复制 `AGENTS.md` 的操作说明。

两者发生疑义时，先服从上位事实与 Node 1–10 冻结边界，再按 `AGENTS.md` 约束工作方式，按本文件约束工程实现。

---

## 9. 后续批次边界

P4-A 不详细规定以下内容：

- React Component、Server / Client Component、state 与 `useEffect`；
- TypeScript 类型规则；
- CSS Modules、selector、responsive 与详细样式组织；
- accessibility 与 SEO 实现细则；
- testing、security、logging 与 error handling；
- exact dependency admission；
- ESLint / Prettier 配置；
- Cursor code standards adapter。

这些内容分别留给 P4-B、P4-C 与 P4-D。本文件完成后，P4 仍为 `IN_PROGRESS`；Node 10 仍为 `REVIEW_REQUIRED`，D1–D9 仍为 `NOT_STARTED`。
