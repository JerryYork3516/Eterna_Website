# Eterna Website 1.0 — Engineering & Code Standards

内部版本：`v0.1`

文档性质：`Eterna Website 1.0 — Engineering & Code Standards`

状态：`PASS / P4 COMPLETE`

编制日期：`2026-08-10`（Asia/Shanghai）

> 本文件定义 Eterna Website 1.0 的基础工程原则、目标目录职责、文件与模块边界、复用和抽象规则，以及前端实现质量边界。
> P4 是 Node 10 开发前的内部规范整理，不是新的正式 Node 或开发阶段；本文件不修改 Node 1–10 的裁决，不开始 D1，也不创建根 Next.js 应用。
> P4 完成表示本文件可作为 Website 1.0 D1 的工程规范基线，不表示 Node 10 已通过或 D1 已开始。

---

## 1. 范围与优先级

本版规定 Website 1.0 D1 开发基线的工程与代码质量规则。发生取舍时，按以下顺序判断：

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

本顺序不是依赖准入批准；第三方依赖的具体评估与准入规则见第 25 节。

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

具体 CSS 组织、selector 与 responsive 规则见第 18–20 节。

### 3.7 `public/`

承载需要由根路径直接提供的公开静态资产。业务模块的私有实现文件不得因放置方便进入 `public/`。

资产的来源、权利、状态和 manifest 仍受 Node 9 内容治理约束；`public/` 不是绕过治理的投放目录。

### 3.8 `tests/`

承载需要跨模块或从公开行为验证系统的测试。与单一模块紧密绑定的测试可以保留在模块附近，避免测试目录与实现所有权脱节。

具体测试原则见第 27 节；测试工具、配置与 coverage threshold 留给 P6 / D1。

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
- external / untrusted runtime boundary 必须 validate；
- public contract 使用明确类型；
- 类型靠近真正所有者；
- 不重复定义同一 domain type；
- 不建立巨型 global `types.ts`。

### 14.1 `any`、`unknown` 与 runtime boundary

只有第三方类型确实无法表达、使用范围被隔离且有具体原因时，才可临时使用 `any`。不得用 `any` 让 TypeScript 停止报错，也不得把 `const data: any` 或 `handle(value: any)` 当作默认写法。

YAML、JSON、URL input、API request / response、environment-derived data、external service data，以及 browser / network supplied values 等外部输入，在验证前属于不可信数据。先以 `unknown` 接收并经过 runtime validation，再进入可信类型域。

内部 component、function 或 module 已由可靠 TypeScript contract 保证的数据，不因“更安全”机械重复 runtime validation。原则是：

```text
external / untrusted data
→ unknown
→ validation
→ trusted typed domain
```

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

本节明确禁止：

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

## 18. CSS / Styling 架构

### 18.1 冻结路线

Website 1.0 使用：

```text
CSS Custom Properties
+ CSS Modules
+ 少量必要 Global CSS
+ CSS motion first
```

本规范不重新选择 Tailwind、CSS-in-JS、UI Kit、styled-components 或 Sass architecture。未来只有经过正式重新评估，并证明新路线不会损害可读性、原创 Layout、设计迭代和渐进增强时，才可以改变当前选择。

### 18.2 Global CSS

Global CSS 只负责真正全局的样式基础：

- reset / normalization；
- document defaults；
- `body` 与 Canvas；
- base typography；
- focus baseline；
- shared semantic tokens；
- reduced-motion baseline。

不得重新形成一个巨大 `global.css` 控制所有页面、Section、组件、响应式和 Motion。页面与组件的具体样式应归其 feature 或 component 所有。

### 18.3 CSS Modules 与样式所有权

CSS Modules 负责：

- component-local styles；
- page Section styles；
- local layout；
- responsive behavior；
- hover、focus、active 等局部状态。

样式跟随组件或 feature 的真实所有权。不要为了表面 DRY 把不同页面的样式集中进 shared stylesheet，也不要仅因视觉相似就建立跨页面万能样式层。

### 18.4 Selector

优先使用清楚、局部的 class selector 和浅层结构。Selector 不应依赖具体 DOM 嵌套才能成立。

避免：

- 深层 descendant chain；
- ID selector 承担视觉样式；
- 大量 `!important`；
- fragile `nth-child` hack；
- 为局部问题建立全局 override。

不强制 BEM 或其他命名方法论。Class 名只需清楚表达当前局部职责，不制造冗长机械命名。

### 18.5 Inline style

普通视觉样式不得默认写成 React inline object。只有真正由运行时产生的值才使用 inline style，例如 measured position、runtime geometry 或动态 CSS custom property。

如果一个值本质上属于设计系统或组件状态，应回到 CSS，而不是通过 JSX 内联对象分散维护。

---

## 19. Design Token / CSS Custom Properties

Token 使用语义职责命名，不使用页面偶然值、临时色号或组件序号命名。

稳定的 Token 类别包括：

- color / surface；
- text；
- spacing；
- typography；
- radius；
- border；
- motion；
- layout。

推荐：

```css
--text-primary
--surface-canvas
--space-page-inline
--motion-duration-fast
```

避免：

```css
--gray4
--home-gap-37
--special-blue
--card2-padding
```

本规范冻结的是 Token architecture，不是当前视觉数值。以下内容继续保持 `NOT_FROZEN`，由 Design in Browser 在真实页面中收敛：

- 最终颜色与对比组合；
- 最终字体、字号、字重与字距；
- spacing unit 与具体间距；
- breakpoint、Grid、列数、宽度与 gutter；
- radius、border、shadow 与 transparency；
- Hero、Resident 与最终 Motion 参数。

具体实现值可以在浏览器设计期间调整，但不得被描述为 Node 7 / Node 8 已冻结的产品事实，也不得从 Legacy、第三方设计系统或参考站直接复制后冒充正式 Token。

---

## 20. Responsive

核心原则是：

```text
一套语义结构
→ 多尺寸自然适配
```

Desktop、Tablet 与 Mobile 应尽量保持相同语义 DOM、阅读顺序、内容优先级和核心行动。普通布局优先由 CSS Grid、Flexbox、container、`min()`、`max()`、`clamp()` 与 media query 处理。

空间减少时不得删除核心内容、语言能力、内容状态、来源或产品边界。导航、CTA 和互动区域同时满足触控与键盘操作；中文和英文必须分别验证字号、行高、行长、换行、长度变化和内容完整性。

不得默认：

- 为 Desktop 与 Mobile 复制两套完整页面或 JSX；
- 用 JavaScript 读取 viewport width 决定普通排版；
- 使用设备名称判断 Layout；
- 通过视觉重排反转 DOM、键盘或屏幕阅读器顺序；
- 加载重型 Desktop visual 后只在 Mobile 使用 `display: none`；
- 把 breakpoint 数值写成不可调整的产品事实。

只有真实交互行为不同，且共享语义结构无法清楚表达时，才考虑局部结构差异。最终 breakpoint、菜单形态、列数、Header 高度与 Presence 切换条件继续由 Design in Browser 收敛。

Resident 在空间不足时可以降低复杂度、静态化、移动位置或退出，但不得遮挡内容、破坏阅读顺序或成为继续浏览的前提。

---

## 21. Accessibility 基础规范

Website 继续以 `WCAG 2.2 AA` 为目标。本节冻结代码级底线；具体自动化工具与阈值留给 P6 / D1，Machine / Human 的职责边界见第 32 节。

### 21.1 Native semantics first

优先使用原生语义元素：

- `header`；
- `nav`；
- `main`；
- `section`；
- `article`；
- `footer`；
- `button`；
- `a`。

不得用 `div + onClick` 替代真实 button 或 link。原生语义已经足够时，不增加模拟语义的 role。

### 21.2 Keyboard 与 Focus

所有 pointer 可操作功能必须有合理 keyboard 路径，包括 Header、mobile navigation、language switch、button、link 和 interactive visual control。

必须保留清楚可见的 focus。不得直接使用 `outline: none` 消灭焦点而不提供等价替代，也不得让 Header、Presence Zone 或视觉层遮挡 focus。

### 21.3 Heading 与 Landmark

- 每页只有一个明确的主要 H1；
- heading level 表达内容结构，不用于选择视觉大小；
- 页面主体使用 `main` landmark；
- navigation 使用明确语义；
- 视觉顺序与 DOM / 阅读顺序一致。

不得为了 SEO 增加隐藏 H1 或无内容意义的 heading。

文本、图标、Hairline、状态与 focus 必须在所在表面保持可读对比。Secondary text 不得因克制风格而失去可读性；hover、focus、disabled、error、success 等状态与行动不得只通过颜色、运动、图标或 Resident 变化表达。

### 21.4 Images / Media

Informative image 或 media 必须提供与其信息职责匹配的替代文本。Decorative visual 使用正确的 decorative semantics，避免重复屏幕阅读器噪声。

禁止使用 `image`、`beautiful image`、文件名等无意义 alt。Resident 或视觉媒体如果承载信息，必须同时有可理解的文字等价表达。

### 21.5 Reduced motion

必须尊重 `prefers-reduced-motion`：

- 重要内容不能依赖 Motion 才出现；
- reduced-motion 下内容和功能保持等价；
- 停止或显著减少非必要连续运动、视差和装饰 reveal；
- 保留即时且必要的操作反馈；
- Resident / advanced visual 不得成为获取信息的前提。

Reduced-motion baseline 不应使用无差别规则消灭所有必要反馈，也不得通过减少 Motion 删除内容或改变功能。

### 21.6 ARIA

原则是：

> No ARIA is better than bad ARIA.

只有原生语义不足时才使用 ARIA。禁止给 `div` 堆 role 模拟 button、添加无意义 `aria-label`、让 accessible name 与可见文字冲突，或为了“看起来无障碍”机械添加大量 ARIA。

---

## 22. SEO 实现底线

SEO 来自 server-rendered semantic HTML、Next metadata、正确 route、canonical、hreflang、sitemap 与 robots，而不是客户端补丁。

### 22.1 Server-first metadata

公开内容页默认使用 SSG / build-time prerender，正文与正式 metadata 由 Server Component / build-time 路径从已审核内容生成。只有出现构建时无法确定且已获批准的真实动态需求时，才使用 request-time SSR，并明确缓存、失败、SEO 与降级边界。

禁止：

- 使用 `useEffect` 修改 title；
- 由 Client Component 管理 canonical；
- 由 Client Component 管理 hreflang；
- 让 metadata 与页面正文使用不同内容事实源。

### 22.2 Canonical / hreflang / locale

语言规则继续服从 Node 9：

- Website 只使用 `/zh` 与 `/en`；
- 根 `/` 确定性 redirect 到 `/zh`；
- canonical 指向当前语言的唯一规范 URL；
- 中文与 English 通过稳定 `pageId` 切换到同一页面的对应语言；
- URL 是 locale 的唯一事实来源。

不得使用 `Accept-Language`、IP detection、Cookie、localStorage 或 Client state 覆盖正式语言 URL。中文、英文和必要的 `x-default` alternate 必须来自同一受控 route mapping；在 `x-default` 的精确目标正式确定前，不得自行创造映射。

### 22.3 Structured data

Structured data 只能表达真实、有证据支持且获准公开的事实。Website 当前是 Eterna 的长期项目官网、品牌门户与公开产品体系总入口；如果公司、法律实体、团队或社会账号事实尚未正式确认，不得为了 SEO 自动生成虚假的：

- `Organization`；
- `Corporation`；
- employee count；
- address；
- founder facts；
- social profiles；
- review / rating。

### 22.4 禁止 SEO hack

禁止 hidden keyword text、重复 invisible heading、keyword stuffing、doorway page、伪造 review / rating，以及任何无事实支持的自动 schema。SEO 不得破坏真实用户体验或内容治理。

---

## 23. Content / Code Boundary

Website 1.0 使用：

```text
repository-managed YAML
→ build-time schema validation
→ publication / source / locale gates
→ trusted rendering contract
→ page / component
```

这里的 trusted 只表示内容已经通过当前渲染入口要求的校验与发布门禁，不表示 schema 可以证明事实为真。Website 内容仍必须服从上位来源、人工事实审核和 publication state。

### 23.1 Content 的职责

Content 文件是 Website 的可追溯发布内容记录，不是 React code、layout engine、arbitrary program 或 Eterna 上位事实源。

页面只消费经过验证且具备发布资格的明确 contract，不随手 parse 任意 YAML object，也不使用无证据 type assertion 把 raw content 伪装成可信类型。YAML 必须通过安全解析入口，禁用危险类型转换，再进入严格 schema validation。

### 23.2 正文所有权

需要发布治理的中文或英文正文必须只有一个正式内容来源。不得在 YAML 保存一份正文，又在 JSX 手写另一份。

少量纯 UI label 只有在未来明确内容所有权后才可放在相应实现边界；不得由此形成两套事实源。

### 23.3 Content 不控制任意代码

YAML 不得：

- 指定任意 React component name；
- 执行 JavaScript；
- 注入 arbitrary props；
- 构造万能 Layout；
- 动态选择任意 Hero、Card 或页面组件；
- 演化为隐式 Page Builder。

禁止建立读取 `component: "WhateverComponent"` 后动态执行页面组件的架构。Node 9 已明确不做 Universal Section Builder 或拖拽 Page Builder。

### 23.4 类型与 Schema 所有权

`PageId`、`Locale`、`PublicationState`、`FactState` 等稳定共享领域可以形成清楚的共享 contract。页面专属 Section UI 由对应页面 feature 所有；其内容 schema、loader 与可信类型归对应 content domain 所有。

不得预先创建一个覆盖六个页面的 `UniversalSectionSchema`。类型与 schema 应靠近真实所有者，只在稳定、同语义重复已经出现时上提。

### 23.5 Failure boundary

Production content 必须 fail closed。Schema、locale pair、publication state 或 required source 不满足时，不得静默降级成未知内容继续发布。

具体 validator、错误格式与 build gate 实现留给 P6 / D1；本节只冻结上述责任链和失败原则。

---

## 24. Motion / Degradation

### 24.1 CSS motion first

普通 hover、focus、reveal、transform、opacity 和 simple transition 优先使用 CSS。只有真实复杂编排需求同时通过 Visual Quality Gate 与浏览器审核，并证明 CSS / Web Platform 不能清楚解决时，才评估局部 runtime animation。

不得为了让页面显得“更高级”而默认引入 GSAP、Three.js、OGL、large animation runtime、scroll-jacking 或 page-wide timeline。Motion for React 仍只是复杂局部编排候选，不是默认依赖或所有元素的 wrapper。

### 24.2 内容与操作优先

- 页面正文、标题和 CTA 不能等待 reveal 后才可用；
- 页面没有 Motion 时仍必须完整、可读、可操作；
- 持续 Motion 必须响应页面隐藏、reduced-motion 和模块退出；
- Motion 不得掩盖加载、内容不足、错误或层级不清；
- 不使用强制 scroll-snap、长时间 parallax 或装饰动画堆叠控制阅读。

Sticky / pinned 只在服务明确空间或内容关系时使用，必须可以自然通过，并提供完整的 Mobile 与 reduced-motion 替代；不得以延长观看时间或展示技术为目的。

页面转场不得延迟目标内容可用性；转场结束后，当前导航状态与 focus 位置必须清楚。

### 24.3 Living Precision 的代码含义

本规范不重新定义 Living Precision 的视觉方向，只冻结实现边界：

- 页面没有 Resident 仍必须成立；
- 页面没有 Motion 仍必须成立；
- semantic structure 先于装饰效果；
- 视觉完整性不能依赖大量 JavaScript；
- Resident 不作为普通背景、Card、Avatar、重复装饰或唯一信息渠道；
- 同一阅读语境原则上只保留一个主要 Resident 视觉重心；
- Resident 的空间与运动峰值不得遮挡 Typography、导航、状态、CTA 或 focus；
- Resident / advanced visual 使用 progressive enhancement；
- optional visual failure 只能留在 Presence / Visual Zone，不能扩散成整页失败；
- 降级后主要内容、导航、语言切换与真实 CTA 仍可用。

Resident、Hero、最终视觉、动画参数与 advanced renderer 的具体形式继续保持 `NOT_FROZEN`，留给 Design in Browser 与 D7 收敛。

---

## 25. Dependency 准入

任何新的 production dependency 都必须先证明当前真实必要性。Development / tooling dependency 也遵守同一原则，但按其实际影响比例评估；不得因其不进入 production bundle 就绕过维护、安全与 license 检查。选择顺序继续遵守：

```text
Web Platform
→ React / Next.js
→ 仓库已有实现
→ 已有批准依赖
→ 成熟第三方依赖
→ 最后才自研
```

新增前至少回答：

1. 当前具体问题是什么？
2. 原生能力为什么不能合理解决？
3. 仓库已有能力为什么不能复用？
4. 该库是否仍在活跃维护？
5. bundle / runtime 成本是什么？
6. 是否进入 Client bundle？
7. security 风险是否合理？
8. license 是否适合？
9. 未来移除或替换的成本是否可接受？

答案可以简短记录在当前任务或 review 中，不要求为普通依赖另建 ADR 或审批系统。没有清楚收益时，结论为 `REJECT`。

不得因为 AI 熟悉、教程常用、“项目通常都会装”或写起来方便，就默认加入 lodash、axios、moment、Redux、Zustand、giant UI kit、shadcn、Tailwind、GSAP、Three.js、form framework、icon mega-pack 或 utility mega-library。

这不是永久禁止。真实需求出现后，按本节重新评估。Node 9 已将 advanced visual 延迟选型，D1 不得提前安装 Three.js 或 WebGL framework。

---

## 26. Error Handling

错误必须被当前所有者处理，或向一个明确 boundary 传播；不得静默吞掉。

禁止没有清楚失败语义的模式：

```ts
try {
  // ...
} catch {
}

promise.catch(() => undefined)
```

错误边界归真实职责所有，例如 Content validation、Route / locale、Asset、Resident enhancement 或 Server operation。不得为尚未出现的需求建立 `GlobalErrorManager`、`UniversalErrorService` 或 `ErrorHandlerFactory`。

Production content、schema、locale pair、publication 或 build gate 失败继续遵守 fail-closed，不得转换成默认内容或伪造成功。Optional Resident / visual 的 runtime failure 则只在 enhancement boundary 内局部降级；两类失败不得混为同一 fallback 策略。

用户界面不得暴露 stack trace、absolute file path、secret 或内部实现细节。可恢复错误应提供明确恢复路径；运行时不可恢复错误应提供清楚、安全且不伪造成功的 fallback。

---

## 27. Testing Principles

测试优先验证 Behavior / Contract，而不是 Implementation detail。

优先覆盖：

- route behavior 与根 `/ -> /zh`；
- language pairing、稳定 `pageId` 与 locale rules；
- content schema、publication rules 与 fail-closed；
- navigation 与重要 interaction；
- accessibility behavior；
- failure / degradation boundary。

避免为了 coverage 测 private helper 调用次数、CSS class 名、component 内部 state、hook 实现细节、无意义 snapshot 或 React 已经保证的行为。Snapshot 可以辅助审查，但不能成为唯一断言。

测试代码也保持具体、直接。不得为少量测试建立巨型 helper framework、复杂 mock infrastructure、测试 DSL 或 `TestFactoryFactory`。测试应帮助理解产品契约，而不是成为第二套应用框架。

本节不选择测试框架、coverage threshold 或 CI 配置；这些由 P6 / D1 根据真实工程落地。

---

## 28. Comments / JSDoc / Logging

### 28.1 Comments 与 JSDoc

代码默认自解释。Comment 只解释非显然的“为什么”，例如 architecture boundary、browser workaround、accessibility / SEO 原因、content governance、安全约束或容易被未来错误优化掉的行为。

禁止教学式注释，例如 `Loop through items`、`Set state`、`Create button`。解释性注释不应比其实现更长；不得机械地为每个函数、接口或自解释参数生成 JSDoc。只有非显然 public contract 才考虑简短 JSDoc。

### 28.2 Logging

Website 默认不需要大量业务日志。只保留可行动的信息，例如 production server、content validation、build / publication 或 critical operational failure。

禁止提交 render log、mount log、每次 click log、调试 `console.log`、完整 content dump、secret、token 或 private data。临时 debugging log 必须在提交前删除。

---

## 29. Security Code Baseline

P4 只冻结 Website 当前范围内的代码底线；具体 security tooling 留给 P6。

- secret 只存在于 server boundary；
- Client environment variable 一律按公开信息处理；
- 含真实值的本地 `.env*` 不进入 Git；脱敏 `.env.example` 只可记录变量名称、用途与安全示例，不得包含真实 secret；
- secret 不进入 Client bundle 或日志；
- 用户界面不暴露内部 stack、path 或实现细节；
- external URL 与 redirect 必须来自明确受控输入；
- third-party script 默认不引入；
- Contact 默认关闭，直到真实能力与数据治理成立；
- Analytics 默认关闭，直到正式决策；
- Preview 不连接 production-sensitive workflow。

默认不使用 `dangerouslySetInnerHTML`。未来只有在来源、sanitization、threat model 和普通 React rendering 不足的原因都明确后，才可单独评估。不得为了 Markdown 或 CMS 便利默认开放 arbitrary HTML。

---

## 30. Performance Code Baseline

原则是：

```text
measure before optimize
```

不得因为“以后可能会慢”而提前建设 cache abstraction、memoization network、virtualization、worker framework 或 custom scheduler。

基础边界：

- Server-first；
- Client Islands 尽量小，不做整页 hydration；
- 不创建无必要 Provider；
- 不重复加载同一数据；
- media 按真实需要加载；
- advanced visual 不进入 critical content path；
- Resident failure 不影响正文；
- Mobile 不加载只为 Desktop 使用的重资产；
- 不为微优化牺牲可读性。

不得机械加入 `useMemo`、`useCallback` 或 `memo`，也不得把 manual memoization 当作“高级 React”、默认性能优化或 AI 生成模板。当前 React / toolchain 如果提供可靠的自动优化能力，优先使用其能够清楚完成的优化，不为同一目的机械叠加 manual memoization。

以下任一真实条件可以证明 manual memoization 合理：

- profiling / measurement 发现实际性能问题；
- expensive calculation 确实值得缓存；
- reference identity 是真实 component / hook / integration contract；
- third-party integration 明确要求 stable identity；
- 其他当前代码证据证明 manual memoization 更清楚或必要。

核心原则是 `evidence or contract before manual memoization`，而不是要求 measurement、rerender 问题和 stable identity 三项同时成立。具体 bundle budget、Lighthouse threshold 与 performance tooling 留给 P6 / D1。

---

## 31. Anti-AI-Code / Anti-overengineering 收口

完整 Anti-AI-code 边界由已有单一职责章节共同组成，不建立第三份重复禁令清单：

- 第 6 节负责 DRY / YAGNI、错误共享抽象、Universal renderer / factory 与 config-driven everything；
- 第 7 节负责未要求功能、future-proof scaffolding、无调用者 helper、多层 wrapper、silent fallback、无关清理与教学式注释；
- 第 17 节负责 whole-page Client Component、giant Context / state / Effect、boolean explosion 与过量 TypeScript generic；
- 第 25 节负责 unnecessary dependency；
- 第 28 节负责机械 JSDoc、过长解释性注释与调试日志。

同一原则也禁止没有当前兼容性证据的 polyfill / compatibility layer，以及没有 threat / failure 证据的 defensive code。Manager、service、factory 或 generic 不是专业度指标；只有真实所有者、调用者和职责能证明其存在。

每新增一个 abstraction，都问：

> 删除这一层后，当前代码会不会更难理解、更容易出错？

如果答案是“不会”，这一层通常不应存在。

重复几行代码不一定比错误共享抽象更糟。只有逻辑、语义、生命周期和变化原因都相同，才值得抽象。Home 与 Studio 的 UI 即使当前视觉相似，只要变化方向不同，就允许保持两个清楚实现。

这些规则不禁止由当前真实复杂度证明的合理 abstraction，也不要求开发者为每个 helper 填表、写 ADR 或单独申请审批。

---

## 32. Machine Enforceable vs Human Review

### 32.1 `MACHINE_ENFORCEABLE`

P6 / D1 应尽可能自动化：

- formatting；
- lint；
- TypeScript strict；
- build 与 test；
- content schema、locale / route 与 publication validation；
- unused import 与明显 dead code；
- dependency audit；
- secret pattern；
- accessibility automated checks；
- deterministic release checks。

本节只定义职责分类，不安装或配置工具。

### 32.2 `HUMAN_REVIEW`

机器不能替代：

- abstraction 与 component boundary 是否自然；
- naming 是否符合领域；
- 是否真正 reuse-first、是否重复造轮子；
- dependency 是否值得；
- 是否存在 AI smell 或擅自扩张范围；
- 内容事实、来源与 publication decision 是否正确；
- 中英文表达是否分别经过人工事实与语言审核；
- keyboard / focus、VoiceOver、zoom 与 reduced-motion 是否在真实浏览器或设备中成立；
- 页面是否模板化；
- Living Precision 是否成立；
- Design in Browser 是否通过；
- Resident 是否必要；
- 最终视觉质量。

```text
Automated PASS ≠ Human Review PASS
```

普通非视觉 diff 不重复执行完整视觉 Gate；涉及页面视觉、Resident 或 Motion 的变更，仍必须进入 Node 7 / Node 8 的独立人工审核。

---

## 33. Code Review Checklist

- [ ] Diff 是否只解决当前任务？
- [ ] 是否先检查已有实现与原生能力？
- [ ] 新 abstraction 是否解决真实重复或错误风险？
- [ ] 重复逻辑的语义、生命周期和变化原因是否真的一致？
- [ ] Server / Client boundary 是否保持最小？
- [ ] State 与 Effect 是否真实必要？
- [ ] 类型是否清楚，是否用 `any` 逃避边界？
- [ ] 新 dependency 是否必要并通过第 25 节准入？
- [ ] 是否存在 silent failure、empty catch 或无证据 fallback？
- [ ] Comment / JSDoc 是否只解释非显然的 why？
- [ ] Semantic HTML、accessibility 与 SEO boundary 是否保持？
- [ ] Content source、validation 与 publication boundary 是否保持？
- [ ] 是否混入无关重构、格式噪声或临时日志？
- [ ] 是否完成与风险相称的自动和人工验证？
- [ ] 这个 diff 是否像一位有经验的工程师会提交的修改？

涉及页面视觉时，另行执行 Node 7 / Node 8 Visual Quality Gate；本清单不替代人工设计裁决。

---

## 34. 规范变更与 P4 最终状态

本文件冻结的是 Website 1.0 D1 开发基线工程规范，不是永久不可修改的教条。后续真实工程证据如果证明某条规则需要调整，应在受影响边界内完成正式变更，而不是由开发便利、框架默认值或个人偏好静默改写。

P4 — Website 工程与代码规范：`PASS / COMPLETE`

P4 完成不改变正式计划状态：Node 10 仍为 `REVIEW_REQUIRED`，D1–D9 仍为 `NOT_STARTED`。本轮没有开始 P5、P6 或 D1，没有创建应用代码、CSS、YAML、Component、依赖、tooling、CI 或新的正式 Node。
