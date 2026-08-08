# Eterna Website 1.0 技术架构 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 9.1 目标技术架构决策建议

状态：`REVIEW_REQUIRED`

编制日期：`2026-08-08`（Asia/Shanghai）

> 本文件基于 Node 1–8 正式文档、Legacy 扫描与技术债审计、当前仓库与 `legacy/` 实际结构，以及框架和部署平台官方资料，提出 Website 1.0 的推荐技术架构。
> 本文件不创建正式网站代码，不修改 Legacy，不执行 Node 9.2、Node 9.3 或 Node 10。所有推荐等待人工审核；Node 9.1 不自行标记 `PASS`。

---

## 1. 决策摘要

### 1.1 推荐技术栈

| 层级 | 推荐 | 当前决策性质 |
|---|---|---|
| Framework | Next.js App Router | `RECOMMENDED / REVIEW_REQUIRED` |
| UI | React + TypeScript strict mode | `RECOMMENDED / REVIEW_REQUIRED` |
| Rendering | 公开内容页面默认 SSG / prerender；按需使用最小 SSR；交互与高级视觉使用局部 CSR | `RECOMMENDED / REVIEW_REQUIRED` |
| Routing | `app/[lang]/...` 文件路由，显式 `/zh` / `/en` | `RECOMMENDED / REVIEW_REQUIRED` |
| Styling | CSS Custom Properties + CSS Modules + 少量全局基础样式 | `RECOMMENDED / REVIEW_REQUIRED` |
| Motion | CSS 优先；只有复杂编排确有需要时才引入 Motion for React | `RECOMMENDED / REVIEW_REQUIRED` |
| Advanced visual | 独立 Client Island；不默认引入 Three.js / WebGL / Canvas | `RECOMMENDED / REVIEW_REQUIRED` |
| Content boundary | 页面组件只消费经过 schema 校验的结构化内容；内容不得继续内嵌在根组件 | `RECOMMENDED / REVIEW_REQUIRED` |
| Form / API | 条件成立后使用同仓 Route Handler 或独立同源服务；不迁移旧 Airtable handler | `RECOMMENDED / REVIEW_REQUIRED` |
| Package manager | npm + lockfile；Node.js 使用实施时 Active LTS 并通过版本文件固定 | `RECOMMENDED / REVIEW_REQUIRED` |
| Deployment | Vercel 作为首选；Cloudflare Workers + OpenNext 作为可行备选 | `RECOMMENDED / REVIEW_REQUIRED` |

### 1.2 核心架构句

**把 Eterna Website 1.0 建成“静态内容与语义 HTML 为主、局部交互与高级视觉按需增强”的 Next.js 多语言企业站，而不是一个全页客户端应用。**

这套架构服务于：

- `/zh` / `/en` 双语正式页面；
- 页面级 SEO、metadata、canonical、sitemap 与 robots；
- 快速 Design in Browser；
- 组件级视觉与 Motion 迭代；
- Resident / advanced visual 的独立加载、关闭和降级；
- 未来内容治理与 CMS 迁移，但不为尚未存在的内容规模提前建设重型平台。

---

## 2. 评估基线

### 2.1 当前仓库事实

| 项目 | 当前事实 |
|---|---|
| branch | `New` |
| Node 9.1 编制前 HEAD | `2996465`（`docs: add Node 8.2 page specs and Home visual brief`） |
| 新站根应用 | 尚不存在；根目录没有 `package.json`、框架配置或部署配置 |
| Legacy 路径 | `legacy/` |
| Legacy stack | React 19、Vite 6、OGL、JavaScript / JSX / CSS |
| Legacy shape | 单 HTML 入口、5 个 hash Section、全页 CSR |
| Legacy content | 中文与英文正文内嵌在 `legacy/src/App.jsx` |
| Legacy styles | 1 个全局 `legacy/styles.css`，页面、组件、响应式与 Motion 集中维护 |
| Legacy API | `legacy/api/create.js`，依赖 Airtable 与未声明平台的 serverless `req/res` 约定 |
| Deployment | 仓库未发现当前平台、域名、redirect / rewrite 或生产配置 |
| Tests / CI | Legacy 没有测试、lint、format 或 CI 配置 |

本次没有读取或输出 `.env.local` 的 secret 值。只依据既有审计与源码确认旧 handler 使用的六个 Airtable 变量名称。

### 2.2 Node 1–8 强约束

目标架构必须满足：

1. Eterna 是长期企业主站、品牌门户和产品体系总入口，不是单一 Landing Page；
2. 当前公开结构为 6 个页面组、12 个语言页面：Home、Digital Residents、Products、Aftelle、Studio、About Eterna × `/zh` / `/en`；
3. 根 `/` 只负责进入正式语言版本，不承载第三份重复正文；
4. 中英文内容、状态、日期、CTA 可用性与产品边界必须对应；
5. 每个正式内容需要来源、审核状态、事实性质、更新时间与失效边界；
6. 公开内容必须稳定可引用并具备页面级 SEO；
7. Resident 和高级视觉是增强层，失败、关闭或 reduced-motion 时页面仍完整；
8. Visual Quality Gate、Anti-pattern / DEAD Gate 不因进入开发而降低；
9. `Design in Browser` 是正式方式，架构必须支持快速视觉、组件与 Motion 迭代；
10. 不把 Legacy 的 React、Vite、OGL 或 Airtable 自动继承为目标答案。

---

## 3. 候选方案评估

### 3.1 评估维度

本次不以流行度评分，按 Website 的真实需求评估：

- 双语路径与页面级 metadata 的自然程度；
- SSG / SSR / CSR 边界是否清楚；
- 核心内容能否在少 JavaScript 下直接输出；
- Design in Browser 的本地反馈速度；
- Motion 与 Resident Client Island 的接入成本；
- Preview / Production 与部署复杂度；
- Form / API 的安全承载能力；
- 内容治理、测试和长期扩展成本；
- 对小型首版是否过重。

### 3.2 Framework 对比

| 候选 | 优点 | 主要代价 / 风险 | 结论 |
|---|---|---|---|
| Next.js App Router + React | 文件路由、Server / Client Component 边界、静态预渲染、metadata 文件约定、Route Handler 与 Preview 生态集中；适合 12 个可索引页面和局部交互 | 概念与缓存边界比纯 Vite 多；若把全站标成 Client Component 会重新变重；若滥用 RSC、Server Action 或中间件会拖慢设计迭代 | `RECOMMENDED`，但采用最小能力子集 |
| React + Vite SPA | HMR 直接、依赖少、视觉实验轻快；Legacy 团队已有经验 | 原生形态仍是一个 CSR 文档；pathname routing、SSG / SSR、metadata、sitemap、API 与部署边界需要另外组合；Vite 官方 SSR API本身偏底层 | `NOT_RECOMMENDED` 作为 Website 1.0 根架构；可用于独立视觉实验但不作为生产站骨架 |
| React + Vite 自建 SSR / SSG | 保留 Vite 开发体验，同时可实现服务端渲染与预渲染 | 需要自行维护 server entry、client entry、route manifest、metadata、预渲染、部署适配与缓存；对 6 页面主站是不必要的基础设施工作 | `REJECTED`，增加了不创造产品价值的复杂度 |
| Astro + React Islands | 内容静态优先、默认少 JS、组件岛清晰，适合内容站 | 当前 Node 8 预期可能需要跨 Section 的连续 Presence 与 React Motion 协调；Astro + React 双模型会增加团队心智和设计调试边界 | `VIABLE ALTERNATIVE`，但综合协作成本高于最小化 Next.js |
| 纯静态 HTML / 模板生成 | 极轻、性能与部署简单 | 双语内容治理、组件复用、Motion、Preview 与未来内容扩展会较快形成自建工具链 | `REJECTED` 作为长期主站架构 |

### 3.3 为什么不是“因为流行而选 Next.js”

Next.js 被推荐，是因为它用一套受约束的框架能力同时解决 Website 已经明确存在的四个问题：

1. 12 个双语、可索引、可稳定引用的页面；
2. 静态内容为主、局部 Motion / Resident 为客户端增强的渲染边界；
3. 页面级 metadata、sitemap、robots、canonical 与语言 alternate；
4. Preview、生产部署及未来条件式 Form / API 的统一边界。

如果 Website 只有一个无 SEO 要求的活动页，Vite SPA 会更直接；但当前 Node 1–8 已明确它不是这种产品。

---

## 4. Frontend Architecture

### 4.1 总体分层

```text
Route / Layout Layer
  → Validated Content View Model
    → Page-owned Sections
      → Shared UI Primitives
        → Optional Client Islands
          → Optional Resident / Advanced Visual Renderer
```

各层职责：

| 层 | 职责 | 禁止 |
|---|---|---|
| Route / Layout | URL、语言、页面 metadata、共享 Header / Footer、页面边界 | 不承载整页内容对象或全站交互状态 |
| Content View Model | 提供已经校验、可发布、语言对应的页面内容 | 不把未审核、已撤回或缺失翻译内容静默返回 |
| Page Sections | 落实每个页面冻结的 Narrative Arc 与 Section Architecture | 不为“复用率”提前做万能 Section Builder |
| UI Primitives | Container、Stack、Cluster、Text、Action、Surface 等少量通用角色 | 不建立庞大组件库或把所有内容 Card 化 |
| Client Islands | Mobile navigation、必要 Motion、语言交互、条件式 Form | 不把整个 Layout 或 Page 变成 Client Component |
| Advanced Visual | Resident Presence 或获批高级媒体渲染 | 不成为页面内容、品牌识别或导航的前置条件 |

### 4.2 TypeScript

- 新站使用 TypeScript strict mode；
- Content schema、locale、route id、事实状态、asset metadata 与 API contract 需要可校验类型；
- 不在本节点设计完整领域模型；只为 Website 内容和 UI 建立最小必要类型；
- 不把类型系统用作 CMS、审批系统或上位产品模型的替代品。

### 4.3 状态管理

首版不引入 Redux、Zustand 或其他全局状态库。

理由：

- 当前公开站核心状态是 route、locale、navigation UI、Motion preference 和条件式 Form state；
- route 与 locale 应由 URL 决定；
- 局部 UI 状态留在对应 Client Component；
- Resident 视觉状态只能来自该视觉模块的明确输入，不能变成全站隐式状态总线；
- 只有未来出现可证明的跨页面客户端业务状态时再重新评估。

---

## 5. Routing 与 `/zh` / `/en`

### 5.1 路由映射

推荐采用 App Router 的显式语言段：

```text
app/
├── page                         -> / 语言入口
└── [lang]/
    ├── layout                   -> /zh/* 与 /en/* 共享语言 Layout
    ├── page                     -> /zh, /en
    ├── digital-residents/page
    ├── products/page
    ├── products/aftelle/page
    ├── products/studio/page
    └── about/page
```

以上是目标结构说明，不是本轮创建代码的指令。

### 5.2 Locale 规则

- locale allowlist 只包含 `zh`、`en`；
- 非 allowlist 的语言段返回 404，不做模糊 fallback；
- `<html lang>` 分别为经过审核的中文与英文语义值；
- 语言切换根据稳定 `pageId` 映射到同一页面另一语言，不拼接任意字符串；
- `/zh/products/studio` 与 `/en/products/studio` 必须成对；
- 不用 localStorage 作为正式语言身份；可在未来仅用于记忆偏好，但 URL 始终是事实来源。

### 5.3 根 `/` 决策建议

推荐首版使用确定性 redirect：

```text
/  ->  /zh
```

理由：

- 行为稳定、可测试、无地理或 Cookie 推断；
- 不需要为根路径建立第三份内容或客户端语言选择屏；
- 不引入会改变静态路由边界的全局 request-time 语言中间件；
- 用户仍可在任何页面明确切换到对应 `/en` 页面。

是否在未来增加 `Accept-Language` 或语言偏好 redirect，留待有真实用户数据后重新评估。不得使用 IP 地理位置作为首版语言判断。

### 5.4 URL 规范化

- canonical 只指向当前语言的唯一规范 URL；
- trailing slash 策略全站统一，不能两套地址同时 200；
- hash 仅用于页内辅助定位，不构成页面身份；
- 未批准的 Research、Developers、Updates、Support、Contact、Privacy 页面不创建空路由；
- 未来产品继续使用 `/{lang}/products/{product}`。

---

## 6. SSR / SSG / CSR 边界

### 6.1 推荐默认值

**SSG / prerender 是公开内容页面默认值。**

| 内容 / 能力 | 默认渲染 | 理由 |
|---|---|---|
| Home、Digital Residents、Products、Aftelle、Studio、About | SSG / build-time prerender | 内容规模小、正式发布需要审核、SEO 重要、变化不是每次请求级 |
| Header、Footer、页面正文、metadata | Server Component / 静态 HTML | 降低客户端 JS，脚本失败时仍可读 |
| Mobile menu、局部 disclosure | Client Component | 需要事件与焦点管理 |
| 基础 reveal / hover / focus | CSS | 无需 hydration |
| 复杂 Motion 编排 | 局部 Client Component | 只对获批区域加载 |
| Resident / WebGL / Canvas | 动态加载 Client Island | 浏览器 API 专属，必须可退出和降级 |
| Contact / Participation | 未启用；未来表单 UI 为 Client Component，提交进入 server boundary | 当前 GAP 与合规条件未解决 |
| Preview draft | Node 9.2 决定；如引入 CMS，可按需 SSR / Draft Mode | 不让生产页面默认动态化 |

### 6.2 SSR 使用条件

首版不为“框架有能力”而使用 request-time SSR。只有出现以下真实需求时才使用：

- 经授权的 CMS draft preview；
- 无法在构建时确定、且确需请求时生成的已批准内容；
- 条件式服务端响应，但不影响核心公开正文；
- 需要服务端读取 secret 的非页面业务。

任何 SSR 引入都必须说明缓存、失败、Preview、SEO 和降级边界。

### 6.3 不采用全站 static export

本架构推荐“页面静态预渲染 + 平台运行时按需存在”，不在首版锁定 `output: export`。

原因：

- 条件式 Route Handler、preview draft、图片优化与未来受控动态能力需要保留 server boundary；
- 不锁 static export 不等于页面必须 SSR；12 个正式页面仍可全部在构建时生成；
- 保留可移植性时，应避免无必要的平台专属 API，而不是削去所有服务端能力。

---

## 7. SEO / Metadata / Sitemap / Robots / Canonical

### 7.1 页面级 metadata

每个页面、每种语言必须从已审核内容生成：

- `title`；
- `description`；
- canonical URL；
- `alternates.languages`：中文、英文与必要的 `x-default`；
- Open Graph locale、title、description、URL；
- Twitter / social preview（资产批准后启用）；
- index / follow 策略。

不得在客户端 `useEffect` 中修改正式 metadata。metadata 与正文使用同一份已审核内容身份，防止语言和版本漂移。

### 7.2 Sitemap

- production sitemap 只包含实际发布、允许索引的规范 URL；
- 首版预计最多包含 12 个核心语言 URL；
- 未审核、已撤回、条件未满足或 preview 内容不进入 sitemap；
- sitemap 中的更新时间只有在来源可追溯时才输出，不伪造每次构建时间为内容更新时间。

### 7.3 Robots

- production 使用明确的 robots 策略并引用 production sitemap；
- Preview / staging 必须通过响应头或平台策略设置 `noindex`，不能只依赖页面内 meta；
- `robots.txt` 不用于保护 secret、draft 或敏感内容；未授权内容不得被公开部署；
- 发布检查必须验证 preview 与 production 的索引策略没有反转。

### 7.4 Structured Data

首版不自动生成 `Organization`、产品可用性、下载、价格、团队或公司实体 JSON-LD。

只有对应事实来源、公开授权和页面内容成立时才添加结构化数据。GAP-01 未解决前，不用 schema.org 标记补写法定主体或成熟公司事实。

---

## 8. Component Architecture

### 8.1 组件分层建议

```text
components/
├── site/          Header, Footer, LanguageSwitch
├── ui/            Layout and interaction primitives
├── content/       Status, source, long-form presentation
├── motion/        Small approved motion wrappers
└── resident/      Presence boundary, fallback, renderer adapters

features/
├── home/
├── digital-residents/
├── products/
├── aftelle/
├── studio/
└── about/
```

目录名称是建议职责，不是本轮实现。

### 8.2 复用规则

- 页面 Section 默认由页面所有，避免先做“万能 Hero / 万能 Split / 万能 Feature Grid”；
- 只有出现两次以上的真实、稳定共同语义后才上提共享组件；
- Layout primitive 可以复用，视觉构图不要求模板化；
- Resident Presence 通过一个清楚边界接入，但不提前建立多渲染器插件系统；
- Header / Footer / Language Switch 的结构统一，具体响应式外观在浏览器中迭代；
- Content 与 Component 分离，但不建设拖拽 page builder。

### 8.3 Design in Browser 友好性

每个页面需要能够：

- 单独运行与热更新；
- 单独调整 Section CSS，而不触发全站样式副作用；
- 独立关闭 Motion / Resident；
- 使用稳定测试内容查看中文与英文长度；
- 在真实路由中检查 Header、Footer、Focus、canonical 与响应式；
- 不修改内容 schema 就能完成多数 Layout 和视觉实验。

---

## 9. Design Token / Styling Strategy

### 9.1 推荐方案

使用：

- 全局 CSS Custom Properties 承载语义 Token；
- CSS Modules 承载页面与组件局部样式；
- 一个小型全局样式入口负责 reset、基础 Typography、Canvas、Focus 与 reduced-motion 基线；
- Token 名称表达职责，不表达未冻结视觉结果。

例如只冻结语义角色：Canvas、Primary Text、Secondary Text、Hairline、Interactive、Resident Life Accent、Error、Success；最终值仍在 Design in Browser 中收敛。

### 9.2 为什么不推荐 Tailwind 作为首选

Tailwind 能提高通用界面的搭建速度，但当前 Website 的关键问题是原创空间逻辑、Typography、跨段节奏和持续视觉收敛，而不是大量标准组件拼装。

首选 CSS Modules 的理由：

- 视觉与 Section 关系更直接，浏览器调试路径短；
- 复杂 Grid、responsive、pseudo-element、media query 与 reduced-motion 不需要转译成密集 class；
- 避免未冻结 Token 在 markup 中扩散；
- 不诱导 Bento、Card-first 或通用 SaaS 组件化；
- 与 CSS Custom Properties 的实时调参自然。

Tailwind 不是技术上禁止；如果实施试验能证明它没有降低可读性、原创 Layout 和设计迭代速度，可以在人工审核前重新比较。但 Node 9.1 当前不推荐。

### 9.3 为什么不引入重型 Design System 工具

首版不推荐 CSS-in-JS runtime、完整主题引擎、Storybook 驱动的大型组件库或跨产品 Design Token 平台。

原因：

- Node 8 明确大量视觉参数需要在真实网页中收敛；
- 当前只有 6 个页面组；
- 过早抽象会使一次视觉调整需要修改多层 API；
- Website Design System 不应被误升为全部 Eterna 产品设计系统。

Storybook 可在共享组件数量和状态复杂度实际增长后再评估，不作为 Node 9.1 前置条件。

---

## 10. Motion Architecture

### 10.1 分级策略

| 级别 | 实现倾向 | 示例 |
|---|---|---|
| L0 Static | HTML + CSS | 无 Motion 时的完整页面 |
| L1 CSS feedback | CSS transition / keyframe | hover、focus、menu、简短状态反馈 |
| L2 Coordinated UI motion | 局部 Motion for React 候选 | 有明确叙事价值的 Section / layout 过渡 |
| L3 Advanced visual | 独立 renderer | Resident、Canvas、WebGL 或复杂媒体 |

默认从 L0 / L1 开始。只有 Visual Quality Gate 与浏览器审核证明 L2 / L3 提供不可替代价值时才增加依赖。

### 10.2 依赖边界

- 不默认引入 GSAP、scroll-jacking 或 page-wide timeline；
- Motion for React 只作为复杂组件编排候选，不作为所有元素的 wrapper；
- IntersectionObserver 等浏览器能力只在需要时封装于局部 Client Component；
- 所有持续 Motion 必须在页面隐藏、reduced-motion 或模块退出时停止；
- 动画参数使用 CSS variable 或集中 token，避免散落 magic number；
- 页面正文不能等待 reveal 才可读。

---

## 11. Resident Presence / Advanced Visual Rendering

### 11.1 技术边界

Resident 是可选增强层，推荐建立一个最小边界：

```text
ResidentPresence
├── Semantic content remains outside
├── Static / low-motion fallback
└── Optional advanced renderer loaded on demand
```

该边界只保证加载、降级、生命周期、可访问性和错误隔离，不冻结 Resident 外观或渲染技术。

### 11.2 默认不选 Three.js / WebGL / Canvas

当前没有通过质量门禁的最终 Resident 视觉，也没有模型、纹理或 3D 资产。此时选择 Three.js、OGL、WebGL 或 Canvas 会让技术先于设计。

因此：

- 不把 Three.js / OGL 作为根依赖；
- 不创建全站固定 Canvas；
- 不把 WebGL context 成功作为页面可用前提；
- 不迁移 Legacy Aurora；
- 不为未来可能性预建通用渲染引擎。

### 11.3 何时允许高级渲染

同时满足以下条件后才可选型：

1. 浏览器设计已经证明静态 / CSS / SVG / DOM 无法完成同等叙事；
2. Resident 的唯一职责、出现位置与退出时机明确；
3. 静态 fallback 与 reduced-motion 方案通过审核；
4. 有明确 Desktop / Tablet / Mobile 性能预算；
5. 加载失败不影响内容、CTA、导航、SEO 与品牌成立；
6. 技术原型通过真实浏览器、GPU 与设备测试；
7. 渲染库体积、维护成本和许可可接受。

选择顺序应从最轻方案开始：CSS / SVG / DOM → 2D Canvas → WebGL / Three.js。不是每一步都必须经过；按真实视觉需要选择。

---

## 12. 图片 / 视频 / 3D 资产策略

### 12.1 通用规则

每项正式资产必须记录：

- stable asset id；
- 用途与页面；
- 中文 / 英文适用范围；
- 来源与权利状态；
- alt / caption / transcript 策略；
- 宽高比与焦点区域；
- fallback；
- 审核状态与更新时间。

资产不得以内嵌 base64、大型 JS 常量或组件源码形式进入页面。

### 12.2 图片

- 优先使用框架图片能力输出响应式尺寸并避免 CLS；
- 原图与正式衍生图分离，避免反复压缩；
- 不在首屏加载与当前 viewport 无关的大图；
- 不使用普通 stock AI、机器人头、AI brain、网络节点或未经审核生成图；
- social image 与页面内容语言一致，资产未批准前不生成假预览图。

### 12.3 视频

- 不把自动播放视频作为核心信息唯一载体；
- 需要 poster、字幕 / transcript、静音策略、reduced-motion 处理和失败 fallback；
- 大型视频建议进入对象存储 / CDN，不直接扩大 Git 历史；
- 首屏视频必须经性能与必要性审核，不因“电影感”默认加入。

### 12.4 3D

- 当前没有正式 3D 资产，因此 Node 9.1 不建立 3D pipeline；
- 未来如启用，优先使用标准格式、压缩、渐进加载、静态 poster 和可取消渲染；
- 3D 不得阻止文字、导航与 CTA，也不得成为 Resident 身份的唯一表达。

---

## 13. Performance

### 13.1 目标

production 以真实用户第 75 百分位的 Core Web Vitals “Good” 阈值为目标：

- LCP ≤ 2.5s；
- INP ≤ 200ms；
- CLS ≤ 0.1。

这些目标不保证仅靠框架自动实现；必须通过浏览器与真实发布环境持续验证。

### 13.2 架构门禁

- 核心 HTML、Typography、Header、主要 CTA 不等待 Resident、视频或第三方服务；
- 页面级内容默认不 hydration；
- Client Component 尽可能小，`use client` 不上移到整个页面或根 Layout；
- advanced visual 使用动态加载并具有静态 fallback；
- 字体、图片、视频和第三方脚本纳入预算；
- 预留布局尺寸，避免媒体与字体造成 CLS；
- 不默认加入 Analytics、Cookie banner 或多套监控 SDK；
- production build 输出需要记录 route size 和主要 bundle 变化。

### 13.3 初始工程预算建议

以下是实施门禁候选，等待 Node 10 转化为自动检查：

- 普通内容页面的初始 client JavaScript 保持最小，只包含真实交互；
- Resident / advanced visual 不进入普通页面的 critical path；
- 单一可选视觉失败不得触发整页 error boundary；
- 第三方脚本默认 0，新增必须记录用途、数据、性能和失效影响；
- 在 Mobile 中可以不加载 Desktop 专属高级视觉，而不是加载后再隐藏。

Node 9.1 不伪造尚未实测的 KB 数值；实施后依据真实 bundle 与设备结果设定硬预算。

---

## 14. Accessibility

目标基线：WCAG 2.2 AA，并保留人工辅助技术验收。

架构要求：

- 服务端输出正确语义、标题、landmark、link 与 button；
- 每页单一 H1，视觉非对称不改变 DOM / 阅读顺序；
- Header、Mobile menu、语言切换和 Form 具备完整键盘与焦点管理；
- Focus 不被 sticky Header 或 Presence Zone 遮挡；
- 状态、错误、事实性质和 CTA 不只依赖颜色或 Motion；
- `prefers-reduced-motion` 是正式路径，不是事后补丁；
- 装饰性 Resident 不进入无意义的辅助技术树；有信息意义的视觉必须有等价文字；
- 中文和英文分别测试字号、行高、断行、缩放与中英混排；
- 自动 axe / lint 只能作为门禁之一，不能替代键盘、VoiceOver、缩放和真实设备审核。

---

## 15. Form / API Boundary

### 15.1 当前决策

当前不启用 Contact / Participation API，因为 GAP-02、接收责任、适用 Privacy / Legal 和处理链路尚未解决。

架构只保留条件式 server boundary，不创建假 endpoint、不迁移 `/api/create`、不连接 Airtable。

### 15.2 未来启用条件

业务启用前必须确定：

- 真实接收人与响应责任；
- 最小字段；
- purpose allowlist；
- 隐私告知、处理者、保留期和删除路径；
- server-side schema validation；
- rate limit、bot protection、origin / CSRF 风险与重复提交策略；
- timeout、错误边界、日志脱敏与第三方失败；
- 中文 / 英文成功、失败、恢复状态；
- Preview 不写入 production 数据。

### 15.3 推荐实现边界

如果最终启用：

- 浏览器只调用同源 endpoint；
- Route Handler 使用 Web Request / Response API，而不是旧平台专属 `req/res`；
- handler 只负责协议、校验、授权和响应；第三方接收方通过独立 adapter 隔离；
- secret 只在 server runtime；
- 客户端不接收第三方 record id、配置名或内部错误；
- Airtable、邮件、CRM 或其他接收方由 Node 9.2 / 9.3 的真实业务与数据治理决定。

---

## 16. Environment Variables / Secrets

### 16.1 环境分层

至少区分：

- local development；
- preview；
- production。

Preview 和 production 使用不同凭据、不同接收目标和最小权限；不得把 production secret 暴露给所有预览分支。

### 16.2 规则

- 仓库只提交变量名称和用途示例，不提交值；
- server-only secret 不使用 `NEXT_PUBLIC_` 或任何可进入 client bundle 的前缀；
- 启动或构建时对必需变量 fail closed；
- 未启用功能不要求配置无用 secret；
- 日志、错误响应、source map、HTML 与 client bundle 不输出 secret；
- secret rotation 和撤销由部署平台 / 接收服务管理，不写进代码；
- 不沿用旧 Airtable 变量名称作为目标架构承诺。

---

## 17. Preview / Production Environments

### 17.1 Local

- 一个命令启动 Website 1.0；
- 支持 route-level Fast Refresh / HMR；
- 提供固定的审核内容 fixture，覆盖中文、英文、长标题、无图片、无 Resident、reduced-motion 和产品未启用状态；
- 不要求连接 production CMS 或第三方服务才能设计页面。

### 17.2 Preview

- 每个 PR / branch 生成独立 URL；
- 默认 `noindex`；
- 使用 Preview 内容与 Preview secret；
- 支持 Desktop、Tablet、Mobile、中文、英文和 reduced-motion 的浏览器人工审核；
- Preview 通过不代表 production 内容已经批准；必须区分代码审核与内容公开审核；
- Resident / Motion 可通过非公开配置关闭，验证 No-Resident 和 degradation 路径。

### 17.3 Production

- 只从受保护的 production branch 或经过批准的 promotion 发布；
- production build 必须绑定 commit SHA；
- 发布前验证 canonical host、robots、sitemap、环境变量、语言对应与 Form 开关；
- 支持原子部署与可回滚到上一个已知良好部署；
- 不在浏览器首次访问时生成或迁移正式内容。

---

## 18. Testing / Lint / Formatting / CI

### 18.1 工具建议

| 类别 | 建议 |
|---|---|
| Type | TypeScript strict + framework type generation |
| Lint | ESLint CLI + React / Next / accessibility rules |
| Format | Prettier；CSS 可按需要增加 Stylelint |
| Unit | Vitest 或等价轻量 runner，测试纯内容与 UI logic |
| Component | Testing Library，测试语义、状态与键盘行为 |
| E2E | Playwright，覆盖 12 个正式 URL、语言切换、导航、404 与条件式 Form |
| Accessibility | axe 自动检查 + VoiceOver / keyboard / zoom / reduced-motion 人工验收 |
| Visual | 关键 viewport 截图回归作为提示，不替代 Visual Quality Gate 人工裁决 |
| Performance | Lighthouse CI / bundle report + production field metrics |

工具的精确包、版本和配置在 Node 10 决定；Node 9.1 冻结的是门禁职责。

### 18.2 必须自动验证的 Website 特有规则

- `/zh` 与 `/en` 页面集合一一对应；
- 语言切换目标存在；
- 每页有唯一 canonical；
- hreflang / language alternates 对应；
- production sitemap 不含 draft / withdrawn / preview；
- metadata 与页面语言一致；
- 每页只有一个 H1；
- 未审核、缺失翻译或已撤回内容不能构建为 production；
- 没有虚假 Login、Download、Try、Contact 或 `Coming soon` 入口；
- advanced visual 关闭后页面仍通过核心 smoke test。

### 18.3 CI 顺序建议

```text
frozen dependency install
→ format check
→ lint
→ typecheck
→ content / locale / route validation
→ unit / component tests
→ production build
→ route / metadata / sitemap checks
→ Playwright smoke + automated accessibility
→ Preview deployment
→ browser manual Visual Quality Gate
```

人工浏览器审核是正式门禁；自动截图相同不等于视觉已经产品级。

---

## 19. Deployment

### 19.1 推荐：Vercel

推荐 Vercel 作为首选部署平台，原因：

- 对 Next.js App Router、SSG、Route Handler、图片与 Preview 提供直接支持；
- Git PR Preview 与独立 URL 适合 Design in Browser；
- 生产与 Preview 环境分离，便于人工视觉、响应式和内容审核；
- 当前团队不需要先维护自建 Node server、CDN、cache 与发布编排；
- 对 6 页面首版运维负担较低。

这不是对现有生产平台的事实判断；当前生产平台仍是 `UNVERIFIED`。

### 19.2 备选：Cloudflare Workers + OpenNext

Cloudflare 当前官方路径可通过 OpenNext adapter 支持 Next.js App Router、SSG、SSR、Route Handler 与 Preview 相关能力，因此技术上可行。

但与 Vercel 相比，需要额外关注：

- adapter 版本与 Next.js 版本兼容；
- Node runtime compatibility；
- 图片优化接入；
- Preview / production 配置差异；
- 平台行为与 Next 原生能力的回归范围。

如果域名、边缘策略、成本或组织基础设施明确偏向 Cloudflare，可在 Node 9.3 将其提升为首选。Node 9.1 暂不因为“全球边缘”宣传自动选 Cloudflare。

### 19.3 可移植性原则

- route handler 优先使用 Web Standard Request / Response；
- content source 通过明确 boundary 进入页面，不在组件中直接调用平台 SDK；
- 不把核心内容依赖 Vercel Analytics、Edge Config、KV 或专有数据库；
- 平台特有功能必须可定位、可替换并有失败边界；
- deployment adapter 的差异不应进入页面设计 API。

---

## 20. Legacy Migration Implications

### 20.1 总原则

Website 1.0 应在根目录建立新应用，不在 `legacy/` 内原地重构。

本轮不创建新应用，也不修改 `legacy/`。迁移实施等待 Node 9.3 / Node 10。

### 20.2 迁移分类

| Legacy 对象 | 目标处理 | 影响 |
|---|---|---|
| `legacy/src/App.jsx` | `REWRITE` | 内容、页面、metadata、导航、表单和状态拆开；不复制根组件 |
| `legacy/styles.css` | `REWRITE` | 不作为新 Design Token 或全局样式基线；只保留已独立确认的行为需求 |
| 双语能力 | `MIGRATE` 需求 | 改为 `/zh` / `/en` 路由与审核后内容，不迁移 localStorage + DOM mutation |
| title / description / OG | `MIGRATE` 能力 | 改为每 route 的 server metadata，不复制旧文案 |
| Aurora / OGL | `REFERENCE_ONLY` | 不进入根依赖，不作为 Living Precision 或 Resident 默认答案 |
| semantic landmarks / skip link / focus / reduced-motion | `KEEP` 行为底线 | 在新结构中重做并重新验收，不复制即可视为通过 |
| NavigationTabs / LanguageToggle | `REWRITE` | 从 5 个 hash tab 改为真实路由、父级状态与对应语言页面 |
| `/api/create` Airtable handler | `DROP / REWRITE` | 不迁移；条件成立后按新 API、安全和隐私边界重建 |
| Legacy 文案 | `REWRITE` | 逐项绑定 Node 1 与产品来源，不直接搬运越权或过期表达 |
| `dist/` / `node_modules/` / `.env.local` | `DROP` | 不作为迁移资产，不复制进新应用 |
| package manager | 可保留 npm | 不是复用 Legacy 架构，只是降低无收益工具迁移 |

### 20.3 URL 与上线影响

- Legacy 主要是根页面与客户端 hash；服务端无法接收 URL fragment，因此 `#resident` 等旧 hash 不能通过普通 301 精确迁移；
- Node 9.3 必须先确认真实生产域名、线上 URL、外部 backlinks 与当前 commit；
- 根域切换后 `/` 按新语言入口策略处理；
- 如真实流量证明旧 hash 需要兼容，可在新 Home 的轻量客户端逻辑中提供明确映射，但不能让旧 hash 重新成为站点架构；
- `/api/create` 在切换前必须确认是否有真实生产调用，不能把未知 handler 静默继续暴露；
- Legacy 保留期、归档、回滚和删除策略由 Node 9.3 决定，本轮不删除。

### 20.4 不可直接迁移的内容风险

特别禁止直接迁移：

- “唯一途径”等无来源排他性主张；
- Aftelle 完整功能清单；
- 无版本产品进展；
- 完整 Universe 平台矩阵作为当前产品；
- 参与表单及其现有隐私说明；
- disabled Login；
- Legacy Aurora、蓝色系和玻璃卡片作为正式视觉系统。

---

## 21. `Design in Browser` 实施约束

推荐架构必须按以下方式被使用，才不会反过来拖慢设计：

1. 先建立真实 route、Header / Footer、语言对应和内容骨架；
2. 页面 Section 保持页面所有，允许在 CSS Module 中快速迭代；
3. 先完成无 Resident、无高级 Motion 的产品级页面；
4. 每次只增加一个有明确职责的 Motion 或 Presence 增强；
5. 在 Preview URL 中同时审核 Desktop、Tablet、Mobile、中文、英文与 reduced-motion；
6. 组件抽象发生在真实重复之后，不在首屏设计前建通用 page builder；
7. Visual Quality Gate 由人工浏览器审核裁决，不能被 TypeScript、测试通过或 Lighthouse 分数替代；
8. 未通过视觉门禁的实现继续迭代，不以“框架不好改”为理由降低 Node 7 / 8 标准。

---

## 22. Node 9.2 / 9.3 待决事项

### 22.1 Node 9.2 — 内容管理与发布治理

仍需正式决定：

- 首版内容源是 repository files、headless CMS，还是分阶段方案；
- 内容文件格式与 schema；
- `pageId`、locale pair、事实来源、审核人、状态、更新时间、失效触发的具体字段；
- `DRAFT` / `REVIEW_REQUIRED` / `PUBLISHED` / `WITHDRAWN` 如何落实到发布门禁；
- 中文与英文配对、缺失翻译和同步复核流程；
- 谁能编辑、谁能批准、谁能发布；
- CMS draft preview 是否需要 request-time SSR / Draft Mode；
- 图片、视频、social image 与权利信息如何入库；
- Contact / Privacy / Legal 内容与业务何时满足启用条件；
- 内容更新是否触发全量 build、增量 revalidation 或其他发布策略。

Node 9.1 只冻结“页面不能直接消费未校验内容，组件不能继续内嵌双语正文”的技术边界，不替 Node 9.2 选择 CMS。

### 22.2 Node 9.3 — 迁移、部署与切换方案

仍需正式决定：

- 当前生产域名、平台、线上 commit 与真实流量基线；
- Vercel 与 Cloudflare 的最终选择及费用 / 账户 / 区域约束；
- production branch、Preview access、环境变量与 promotion 权限；
- DNS、TLS、canonical host、www / apex、redirect 与 rollback；
- Legacy hash、旧路径和 `/api/create` 的兼容 / 关闭方式；
- 内容迁移清单、逐项来源审核和双语验收；
- 资产迁移、CDN / object storage 与 cache policy；
- 生产监控、错误告警、Core Web Vitals 和日志保留；
- 灰度、切换窗口、回滚条件与 Legacy 保留期；
- Analytics / Cookie 是否存在真实需求及合规条件。

---

## 23. 冲突检查

### 23.1 Node 1–8 实质冲突

本次未发现 Node 1–8 的实质语义冲突。

### 23.2 已识别的状态变化，但不构成冲突

1. Node 8.1 已是 `PASS`，Home / Digital Residents 页面结构与 Home 视觉 Brief 原为 `REVIEW_REQUIRED`；`node8-freeze-v0.1.md` 已通过正式范围调整统一裁决 Node 8 为 `PASS / FROZEN`，只冻结 Narrative Arc、Section Architecture、交互、Presence 与质量门禁，不冻结最终视觉。
2. Node 7 / 8 多处写明技术实现 `NOT_FROZEN`；Node 9.1 正是被授权评估并推荐技术架构，因此不是越权冻结视觉。
3. Node 6 将根 `/` 行为留给 Node 9；本文件推荐确定性 `/ -> /zh` redirect，与 Node 6 的边界一致，等待人工审核。
4. Node 5 要求保留真实联系能力，但 GAP-02 与 Privacy / Legal 尚未解决；本文件保留 server boundary 而不启用 Form，符合“能力要求存在、虚假入口不得上线”的共同约束。

### 23.3 需要人工审核的关键取舍

- 是否接受 Next.js App Router 作为根架构；
- 是否接受 `/` 固定 redirect 到 `/zh`，暂不做 Accept-Language；
- 是否接受 CSS Modules 而非 Tailwind；
- 是否接受 Vercel 首选、Cloudflare 备选；
- 是否接受高级视觉技术推迟到浏览器设计证明需要之后；
- 是否接受 Node 9.2 再正式选择 CMS 与内容发布流程。

---

## 24. 官方技术依据

以下资料只用于核对候选技术当前能力，不构成 Eterna 的产品或设计来源：

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Internationalization](https://nextjs.org/docs/app/guides/internationalization)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js Metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js Lazy Loading](https://nextjs.org/docs/app/guides/lazy-loading)
- [Vite SSR guide](https://vite.dev/guide/ssr.html)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Next.js on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)

---

Node 9.1 当前状态：`REVIEW_REQUIRED`
