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

## 9. React Component 规范

### 9.1 组件为什么存在

Component 至少应满足一项：

- 有独立语义职责；
- 有独立交互职责；
- 有明确视觉职责；
- 被真实复用；
- 拆分后显著提高可读性或测试边界。

JSX 超过几行、文件看起来较长或 AI 认为“应该组件化”，都不是独立拆分理由。不要用固定行数决定组件边界。

### 9.2 页面 Section 默认由页面所有

Home、Digital Residents、Products、Aftelle、Studio 与 About 的专属 Section 默认留在各自 feature 中。只有出现真实重复且语义、职责与变化方向一致时，才上提到 shared 层。

在真实实现证明必要之前，不创建 `UniversalHero`、`GenericSection`、`UniversalProductCard`、`ContentBlockRenderer`、`SectionFactory` 或 `PageBuilder`。

### 9.3 Composition 优先

优先使用清楚的 component composition、`children` 和少量语义明确的 props，不设计依赖几十个配置项的万能组件。

如果一个组件必须增加大量 `boolean`、`variant`、`mode`、`layout`、`alignment` 或 `specialCase` 才能适配不同页面，应重新检查这些调用方是否真的共享同一职责。

---

## 10. Server Component 与 Client Component

### 10.1 Server-first

默认使用 Server Component，尤其用于：

- 页面正文；
- Layout；
- 静态 Section；
- content loading；
- metadata；
- route-level composition；
- 不需要浏览器交互的 UI。

公开内容应尽量直接输出语义 HTML。不要因为框架支持客户端渲染，就把静态内容移入浏览器数据流。

### 10.2 Client Component 只承载真实浏览器职责

只有存在以下真实需求时才使用 Client Component：

- click 或 keyboard interaction；
- local UI state；
- focus management；
- browser API；
- subscription；
- runtime animation；
- Resident renderer。

`'use client'` 应停留在最小叶子节点。Header 中的 mobile menu、页面中的一个动画或单个按钮的 state，不构成把整个 page、root layout、大段静态正文或完整 Header 与页面一起 client 化的理由。

Server Component 可以组合独立 Client Island。不得为了包含一个 Client Component 而把父层整体改成 Client Component；跨边界传递的数据应保持小而明确，并符合框架可序列化约束。

---

## 11. React State

首版不引入全局状态库。状态按以下顺序寻找所有者：

```text
URL / Route
→ Server data
→ local component state
→ lifted state
→ Context
→ global state library（只有真实需求后重新评估）
```

### 11.1 不复制事实来源

当 URL 已经决定 locale、route 或当前页面时，不再把同一信息复制进 `useState`、localStorage 或 Context。一个事实只保留一个权威来源。

### 11.2 State 保持最小

不保存可以从现有 props 或 state 直接计算出的派生值。优先：

```ts
const isActive = currentPage === pageId
```

而不是再建立 `isActive` state 并用 effect 同步。State 只记录不能可靠地从当前输入计算出的变化。

### 11.3 Context 边界

Context 只用于稳定、跨组件树且具有明确语义的共享状态。不得建立 giant `AppContext`、全站万能 Provider，不把所有页面数据放入 Context，也不把任何 props drilling 都自动改成 Context。

---

## 12. `useEffect`

`useEffect` 不是默认数据流工具。它只用于与 React 外部系统同步，例如：

- browser lifecycle；
- DOM integration；
- event subscription；
- timer 或 observer；
- imperative third-party integration；
- renderer lifecycle。

不得用 Effect 处理：

- props 到 state 的同步；
- 可以直接计算的派生 state；
- Server Component 可以完成的数据读取；
- metadata；
- 普通 event response；
- 对错误组件边界的补丁。

禁止形成以下同步链：

```text
prop
→ state
→ effect
→ another state
```

Effect 涉及 listener、timer、observer、subscription 或 renderer 时，必须明确资源所有权和必要 cleanup。没有需要释放的资源时，不添加“以防万一”的 cleanup。

---

## 13. Props 与 Component Contract

Props 应表达真实语义，例如 `pageId`、`locale`、`status`、`items`、`onClose`。避免 `data`、`config`、`options`、`stuff`、`extra` 或 `mode2` 这类不能说明职责的名称。

### 13.1 避免 Boolean explosion

不要用大量可任意组合的 `isDark`、`isCompact`、`isCentered`、`isSpecial`、`isProduct`、`isHero` 或 `isAlternative` 支撑一个万能组件。

互斥状态优先使用明确 union：

```ts
type MenuState = 'closed' | 'opening' | 'open'
```

如果视觉或语义职责实际不同，应拆成两个清楚组件，而不是继续增加 boolean。

### 13.2 只传递调用方需要的数据

Content loader 应提供经过校验的结构。底层 UI 组件只接收自身职责需要的数据，不把巨大 YAML 页面对象逐层下传，也不让 primitive component 知道完整 page schema。

Component 的 public contract 应保持小、稳定且能从调用处理解；不得为了“未来扩展”预留未使用 props。

---

## 14. TypeScript

新站使用 TypeScript `strict`。基础规则：

- 不允许无理由使用 `any`；
- external 或尚未验证的数据先使用 `unknown`；
- runtime boundary 必须 validate；
- public contract 使用明确类型；
- 类型靠近真正所有者；
- 不重复定义同一 domain type；
- 不建立巨型 global `types.ts`。

### 14.1 `any`、`unknown` 与 runtime boundary

只有第三方类型确实无法表达、使用范围被隔离且有具体原因时，才可临时使用 `any`。不得用 `any` 让 TypeScript 停止报错，也不得把 `const data: any` 或 `handle(value: any)` 当作默认写法。

YAML、JSON、URL input、API response 等外部输入在验证前属于不可信数据。先以 `unknown` 接收并经过 runtime validation，再进入可信类型域。

无证据的 `value as SomeType` 不能替代验证。Type assertion 只用于编译器缺少、但代码已经具有可证明事实的窄边界。

### 14.2 类型所有权与命名

类型放在最接近其职责的位置：

- Home 专属类型归 Home feature；
- Content schema 类型归 content boundary；
- `Locale`、`PageId` 等稳定共享领域类型归其明确共享模块；
- Resident visual props 归 resident module。

优先使用 `PageId`、`Locale`、`PublicationState`、`ContentSource`、`ResidentPresenceProps` 等领域名称。避免 `Data`、`Info`、`ObjectData`、`CommonType`、`BaseType` 或 `GenericItem`。

### 14.3 类型清晰度优先

类型系统的职责是让错误更难发生、让代码更容易理解。没有真实收益时，不使用 deep conditional types、generic maze、mapped type layering、recursive type tricks，也不为两个对象建立复杂 generic framework。

---

## 15. 函数、命名与控制流

函数应有单一清楚职责、名字表达意图、输入输出清楚、side effect 可辨认，并尽量靠近使用位置。不得建立“超过固定行数必须拆分”的机械规则；判断标准是能否快速理解函数正在解决什么问题。

避免 `processData`、`handleStuff`、`doThing`、`helper`、`manager`、`util` 或 `func1`。

事件 handler 可以使用 `handleMenuOpen`、`handleMenuClose`、`handleLanguageChange` 等明确名称。普通函数优先表达领域动作，例如 `getPairedRoute` 或 `validatePublishedContent`。

优先清楚的 early return 和浅层控制流，避免多层嵌套、嵌套三元表达式或在一个函数中混入多组无关分支。但不要为了 early return 把简单逻辑拆得支离破碎。

---

## 16. 互斥状态与错误状态

互斥状态优先考虑明确 status 或 discriminated union，而不是多个可能互相冲突的 boolean：

```ts
type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Content }
  | { status: 'error'; error: Error }
```

只有当这种建模确实改善正确性和调用方理解时才使用。不要把每个简单按钮或局部交互都扩建成完整状态机。

---

## 17. React / TypeScript Anti-patterns

本批次明确禁止：

- entire-page Client Component；
- giant Context Provider；
- giant `useEffect`；
- prop → state → effect 同步链；
- 无真实需求的 global state；
- 一个组件依赖几十个 boolean；
- 万能 `variant` / `config` UI；
- 只为“组件化”把 JSX 拆成大量无意义文件；
- Server 能完成却强行 client fetch；
- 在 client effect 中设置 metadata；
- duplicated domain type；
- 把 `any` 当作逃生舱；
- generic type gymnastics。

这些禁令约束默认生成方式，不禁止有证据、边界清楚且更易维护的 React 模式。例外必须由当前真实需求证明，而不是由未来可能性证明。

---

## 18. 后续批次边界

P4-B 不详细规定以下内容：

- CSS Modules、design token、selector、responsive 与详细样式组织；
- accessibility 与 SEO HTML 实现细则；
- content YAML 的详细代码边界；
- testing 与 exact ESLint rules；
- dependency admission；
- logging、security、performance 与完整 Anti-AI-code review；
- ESLint / Prettier 具体配置；
- Cursor code standards adapter。

这些内容留给 P4-C 与 P4-D。本文件完成后，P4 仍为 `IN_PROGRESS`；Node 10 仍为 `REVIEW_REQUIRED`，D1–D9 仍为 `NOT_STARTED`。
