# Eterna Website 1.0 现有仓库扫描 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 2 旧网站、仓库与现有资产事实快照

状态：`REVIEW_REQUIRED`

扫描日期：`2026-08-07`（Asia/Shanghai）

> 本文件只记录扫描时仓库中实际存在的结构、代码、配置和运行行为。
> 本文件不评价质量，不提出保留、删除、重构、页面、导航、视觉或技术方案。

---

## 1. 扫描基线

| 项目 | 扫描值 |
| --- | --- |
| repository | `https://github.com/JerryYork3516/Eterna_Website.git` |
| branch | `Eternanet_v0.1` |
| HEAD commit SHA | `b72967fb1c87f0b14c94da67a706f3c16ccb49b6` |
| upstream | `origin/Eternanet_v0.1` |
| upstream SHA | `b72967fb1c87f0b14c94da67a706f3c16ccb49b6` |
| 扫描开始时 Git 状态 | clean，`Eternanet_v0.1...origin/Eternanet_v0.1` |
| 本地 `main` 与 HEAD | `main...HEAD` 为 `0 5`，当前分支领先本地 `main` 5 个 commit |

扫描覆盖：

- 全部 Git 跟踪文件；
- 根目录隐藏文件，但不读取 `.git/` 内部对象内容；
- 被 `.gitignore` 忽略的根 `.env.local`，只读取变量名称，不读取或输出变量值；
- 被忽略的 `legacy/dist/` 构建产物；
- 被忽略的 `legacy/node_modules/` 目录结构、顶层安装版本和文件数量，不逐项审计第三方包源码；
- 网站源码、样式、HTML、API、配置、README、包清单、包锁与近期 Git 文件历史。

扫描写入本文件前，仓库共有 34 个 Git 跟踪文件；排除 `.git/` 与 `legacy/node_modules/` 后共有 38 个本地文件。`legacy/node_modules/` 中有 2,404 个文件，`legacy/dist/` 中有 3 个文件。

---

## 2. 仓库结构

```text
Eterna_Website/
├── .env.local                         # ignored；仅核对变量名称
├── .gitattributes                     # text=auto
├── .gitignore
├── README.md
├── assets/
│   ├── brand/.gitkeep
│   ├── images/.gitkeep
│   └── video/.gitkeep
├── docs/
│   ├── 01-positioning/
│   │   ├── .gitkeep
│   │   ├── upstream-baseline-v0.1.md
│   │   └── website-positioning-v0.1.md
│   ├── 02-existing-site-scan/.gitkeep
│   ├── 03-legacy-audit/.gitkeep
│   ├── 04-reference-study/.gitkeep
│   ├── 05-requirements/.gitkeep
│   ├── 06-information-architecture/.gitkeep
│   ├── 07-design-system/.gitkeep
│   ├── 08-product-design/.gitkeep
│   ├── 09-technical-architecture/.gitkeep
│   └── 10-development-plan/.gitkeep
├── legacy/
│   ├── api/create.js
│   ├── assets/                        # 空目录
│   ├── dist/                          # ignored；本地构建产物
│   │   ├── assets/index-Bwrnxuvp.css
│   │   ├── assets/index-D0tj2RiK.js
│   │   └── index.html
│   ├── node_modules/                  # ignored；本地安装依赖
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Aurora.css
│   │   ├── Aurora.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── NavigationTabs.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── styles.css
│   └── vite.config.js
└── references/
    ├── notes/.gitkeep
    └── screenshots/.gitkeep
```

根目录没有 `package.json`、`index.html`、`src/`、`api/` 或 Vite 配置。现有网站项目文件位于 `legacy/`。

---

## 3. 技术栈

### 3.1 Framework、Runtime 与 Language

| 类别 | 当前事实 | 来源 |
| --- | --- | --- |
| UI Framework | React | `legacy/package.json`、`legacy/src/main.jsx` |
| Build / Dev Runtime | Vite | `legacy/package.json`、`legacy/vite.config.js` |
| Browser rendering | React DOM `createRoot`，外层使用 `StrictMode` | `legacy/src/main.jsx` |
| WebGL library | OGL | `legacy/src/Aurora.jsx` |
| Node requirement | Node.js `>=20` | `legacy/package.json` |
| Module format | ES modules，`type: module` | `legacy/package.json` |
| Languages | JavaScript、JSX、CSS、HTML；Aurora 中内嵌 GLSL ES 3.00 vertex / fragment shader | `legacy/` 源码 |
| Application shape | 客户端单页 React 应用；另有一个未被前端 bundle import 的服务端 API handler | `legacy/src/`、`legacy/api/create.js` |

没有 TypeScript 源文件、React Router、SSR 框架或模板引擎配置。

### 3.2 Package manager 与版本

- Package manager：npm。
- Lockfile：`legacy/package-lock.json`，lockfileVersion 3。
- 包名与版本：`eterna-homepage@1.0.0`，`private: true`。

| 包 | `package.json` 声明 | 当前 `node_modules` 安装版本 | 用途 |
| --- | --- | --- | --- |
| `react` | `^19.0.0` | `19.2.7` | 组件与 hooks |
| `react-dom` | `^19.0.0` | `19.2.7` | 浏览器根节点渲染 |
| `ogl` | `^1.0.11` | `1.0.11` | WebGL renderer、program、mesh、color 与 triangle |
| `vite` | `^6.4.3` | `6.4.3` | 开发服务器、构建与预览 |
| `@vitejs/plugin-react` | `^4.7.0` | `4.7.0` | Vite React 插件 |

### 3.3 构建与启动命令

`legacy/package.json` 定义：

```text
npm run dev      -> vite
npm run build    -> vite build
npm run preview  -> vite preview
```

依赖安装命令为 `npm install`。由于当前 `package.json` 位于 `legacy/`，这些命令对应的工作目录是 `legacy/`，或从根目录使用 npm 的 `--prefix legacy` 形式。

根 `README.md` 仍记录直接运行 `npm install`、`npm run dev`、`npm run build`，并将源码路径写为根 `src/`、`styles.css` 与 `api/create.js`；当前实际路径带有 `legacy/` 前缀。

本次扫描没有执行 build、dev 或 preview，因此没有改写现有 `dist/`。

---

## 4. 页面与路由

### 4.1 页面数量

当前存在 1 个 HTML / React 单页入口：

- 源入口：`legacy/index.html`
- JavaScript 入口：`legacy/src/main.jsx`
- 根组件：`legacy/src/App.jsx`
- 本地构建入口：`legacy/dist/index.html`

没有多个 HTML 页面，没有 pathname 路由定义，也没有 React Router。页面内部使用 hash anchor 和 JavaScript 平滑滚动。

### 4.2 路由与锚点

| 入口 | 中文导航标签 | 英文导航标签 | 对应内容 |
| --- | --- | --- | --- |
| `#vision` | 愿景 | Vision | Hero、主 CTA，以及其后的“为什么要有数字居民”说明区 |
| `#resident` | 数字居民 | Resident | 正式定义、连续性标签、资源关系、两类发展方向 |
| `#products` | 产品 | Products | Studio、Aftelle 与同一 Resident 的关系 |
| `#universe` | 应用场景 | Scenarios | 五类场景、Universe 平台组与公共基础设施 |
| `#join` | 参与 | Join | 当前主线、参与角色与参与意向表单 |

其他页面内 ID：

- `#main-content`：skip link 目标；
- `#top`：Header 元素 ID；
- `#vision-reason-title`：愿景原因区的可访问性标题 ID。

Header 主导航包含 5 个锚点。Footer 导航包含前 4 个锚点，不包含 `#join`。所有可见 CTA 与导航链接均指向页面内部锚点；未发现外部跳转或下载链接。

### 4.3 页面入口行为

- `legacy/index.html` 中的 `#root` 由 `legacy/src/main.jsx` 使用 `createRoot` 挂载；
- 初始 HTML `lang` 为 `zh-CN`；React 根据语言状态切换为 `zh-CN` 或 `en`；
- Source HTML 通过绝对路径 `/src/main.jsx` 加载开发入口；
- Built HTML 通过 `/assets/index-D0tj2RiK.js` 和 `/assets/index-Bwrnxuvp.css` 加载构建 bundle。

---

## 5. 组件与 UI 结构

### 5.1 React 组件

| 组件 | 路径 | 当前职责 |
| --- | --- | --- |
| `App` | `legacy/src/App.jsx` | 双语内容、页面所有 Section、交互状态、表单、Header 与 Footer |
| `SectionIntro` | `legacy/src/App.jsx` 内部 | Section 编号、eyebrow、标题和可选 lead |
| `NavigationTabs` | `legacy/src/NavigationTabs.jsx` | Header 导航、活动指示器、移动端居中滚动 |
| `LanguageToggle` | `legacy/src/LanguageToggle.jsx` | 中文 / English 状态切换 |
| `Aurora` | `legacy/src/Aurora.jsx` | OGL WebGL canvas 背景与动画生命周期 |

Header 和 Footer 没有拆分为独立组件，均定义在 `App` JSX 内。

### 5.2 Header

- Sticky header；
- 文本品牌 `Eterna` 与 CSS 圆形 `brand-mark`；
- 5 项主导航；
- 活动导航胶囊指示器；
- 语言切换按钮；
- 登录按钮存在但为 `disabled`，中文提示“登录功能即将开放”，英文提示“Login is coming soon”。

### 5.3 主要 Section

1. Vision hero：主标题、两段 lead、两个内部 CTA；
2. Vision reason：三段原因文本和 closing；
3. Digital Resident：定义、4 个连续性标签、4 个资源角色、2 个方向卡片；
4. Products：2 个产品卡片，分别为 Eterna Studio 与 Eterna Aftelle，中间为 Resident handoff；
5. Universe：5 个场景卡片、5 个平台组、1 条公共基础设施列表；
6. Join：4 个当前主线条目、6 个参与角色、1 个表单；
7. Footer：品牌、tagline、4 个内部链接、`© 2026 Eterna`。

### 5.4 响应式与特殊布局

`legacy/styles.css` 包含以下断点：

- `max-width: 1120px`：调整导航、产品三列宽度和 Join 双列比例；
- `max-width: 920px`：愿景原因改为单列，资源与平台组变为两列，Join 改为单列，进度为两列；
- `max-width: 860px`：Header 高度变为 120px，导航移到底部并允许横向滚动，产品改为单列，场景改为两列；
- `max-width: 720px`：减少 Section 间距，Resident 定义、方向、Footer 和进度改为单列；
- `max-width: 520px`：Hero CTA 垂直排列，资源、场景和平台组改为单列，卡片 padding 与字号变化；
- `prefers-reduced-motion: reduce`：关闭平滑滚动、view animation，并将 transition / animation duration 降至最小值。

CSS 使用 `safe-area-inset-*` 环境变量适配设备安全区。移动 Header 中的主导航使用横向滚动、隐藏 scrollbar 和 `overscroll-behavior-x: contain`。

---

## 6. 功能

### 6.1 表单

参与意向表单位于 `#join`，包含：

- `name` 文本输入，required，maxLength 80；
- `email` 邮箱输入，required，maxLength 160；
- `purpose` select，required，中文和英文各有 4 个选项；
- submit button；
- `idle`、`submitting`、`success`、`error` 四种前端提交状态；
- 成功后 reset 表单，成功或失败状态在 5 秒后回到 idle；
- 状态文本使用 `aria-live="polite"`。

前端向 `/api/create` 发送 JSON POST：`name`、`email`、`purpose`。

`legacy/api/create.js`：

- 只允许 POST，其他方法返回 405 并设置 `Allow: POST`；
- 接受 string 或 object body；
- 检查 6 个 Airtable 环境变量；
- 对三个字段执行 trim、非空和 80 / 160 / 160 长度检查；
- 使用 Airtable REST API 创建一条 record；
- 返回 200、400、405、上游 Airtable status 或 500 JSON 响应；
- 成功响应包含 Airtable record id（若响应中存在）。

### 6.2 导航与滚动

- 所有导航 click handler 都阻止浏览器默认跳转并调用自定义 `scrollToHref`；
- 根据 sticky Header 高度计算滚动 offset；
- 常规模式使用 smooth scroll，reduced-motion 使用 auto；
- `IntersectionObserver` 根据可见 Section 更新活动导航；
- `NavigationTabs` 使用 `ResizeObserver` 和 window resize 更新指示器位置；
- 活动项变化时，移动导航自动滚动到居中位置。

### 6.3 语言

- 中文与英文内容均内嵌在 `legacy/src/App.jsx` 的 `content` 对象中；
- 默认读取 `localStorage.eterna-language`；若没有则读取旧 key `afterlife-language`；
- 只有值 `en` 会进入英文，其余情况进入中文；
- 切换后写入 `eterna-language`；
- 同步修改 `<html lang>`、document title、description、`og:title` 和 `og:description`；
- 语言不是单独 URL 路由。

### 6.4 动画、粒子与 WebGL

- `Aurora` 使用 OGL 创建一个全屏 WebGL canvas；
- 使用 1 个全屏 Triangle、1 段 GLSL vertex shader 和 1 段 GLSL fragment shader；
- fragment shader 使用 simplex noise、3 个 color stops、amplitude、blend、resolution 和 time uniforms；
- `requestAnimationFrame` 驱动动画；
- 页面 hidden 或 reduced-motion 时渲染静止帧；
- resize 时更新 renderer size 和 resolution；
- cleanup 时移除 canvas、监听器并调用 `WEBGL_lose_context`；
- Vision reason 使用 CSS `animation-timeline: view()` 的 `vision-reveal`；
- CSS 还包含 hover、focus、导航指示器和按钮 transition；
- 未发现独立粒子数据文件、3D model 文件或外部 shader 文件。

### 6.5 数据读取与其他交互

- 静态页面内容来自 `App.jsx` 内嵌对象；
- 浏览器端持久化读取仅发现语言 localStorage；
- 未发现其他本地数据文件、CMS 请求、GraphQL、数据库直连或 client-side state library；
- 未发现登录、账户、注册、支付、下载、文件上传、搜索或站外跳转功能；
- 登录按钮只呈现 disabled 状态。

---

## 7. 外部服务

| 服务 / 类型 | 用途 | 调用或声明位置 | 当前代码引用事实 |
| --- | --- | --- | --- |
| Airtable REST API | 保存参与意向表单记录 | `legacy/api/create.js` | 是；handler 直接 fetch `https://api.airtable.com/v0/...` |
| OGL | Aurora WebGL renderer 与 shader program | `legacy/src/Aurora.jsx`、npm dependency | 是；由 `App` 渲染 |
| npm registry | 安装 package-lock 中的依赖 | `legacy/package-lock.json` | 仅包安装元数据，不是页面运行时 API |
| Analytics | 未发现 analytics SDK、script 或调用 | 全仓库源码与 HTML 搜索 | 否 |
| Vercel | 未发现 `vercel.json`、Vercel dependency 或 Vercel 专有配置 | 全仓库配置扫描 | 无显式配置；API handler 使用常见 serverless `req` / `res` 形状 |
| 外部字体 / CDN | 未发现 font link、`@font-face`、远程媒体 URL 或 CDN script | `legacy/index.html`、CSS、React 源码 | 否 |
| 其他 SaaS | 未发现 Sentry、PostHog、Segment、Mixpanel、Stripe、Supabase、Firebase、Netlify 或 Cloudflare 调用 | 全仓库源码搜索 | 否 |

前端通过 `/api/create` 路径调用表单 API，但源码没有 import `legacy/api/create.js`；两者通过 HTTP 路径关联。

---

## 8. 配置与环境变量名称

### 8.1 配置文件

| 文件 | 当前内容 |
| --- | --- |
| `legacy/vite.config.js` | 只注册 `@vitejs/plugin-react`；未设置 base、server、proxy、alias、build、redirect 或 rewrite |
| `legacy/package.json` | scripts、依赖、ES module 模式、Node `>=20` |
| `legacy/package-lock.json` | npm lockfileVersion 3 与确定依赖树 |
| `.gitignore` | 忽略 `node_modules/`、`dist`、`.env*`、多种构建 / cache 输出；未包含 `.DS_Store` 规则 |
| `.gitattributes` | `* text=auto` |
| `legacy/index.html` | HTML、meta 与 Vite source entry |

没有发现 `.nvmrc`、`.node-version`、TypeScript config、ESLint config、Prettier config、test config、Dockerfile、compose、Netlify、Cloudflare 或专用 deployment config。

### 8.2 环境变量名称

根 `.env.local` 中发现以下名称；本扫描未读取或记录对应值：

```text
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
AIRTABLE_TABLE_NAME
AIRTABLE_NAME_FIELD
AIRTABLE_EMAIL_FIELD
AIRTABLE_PURPOSE_FIELD
```

`legacy/api/create.js` 使用相同 6 个 `process.env` 名称。前端源码未发现 `import.meta.env` 或浏览器环境变量读取。

---

## 9. 部署现状

- 当前 Git remote 位于 GitHub；
- 仓库没有明确声明当前生产部署平台；
- 没有发现域名、DNS、custom domain、Vercel project、Netlify site 或 Cloudflare Pages 配置；
- 没有 redirects 或 rewrites 配置；
- Vite source project 位于 `legacy/`；
- Vite build 默认输出 `legacy/dist/`，该目录被 `.gitignore` 的 `dist` 规则忽略；
- 当前本地 `legacy/dist/` 含一个 HTML、一个 CSS bundle 和一个 JS bundle；
- Built HTML 使用以 `/assets/` 开头的绝对 asset URL；
- `legacy/api/create.js` 不在 `legacy/dist/` 中；Vite 配置也没有定义 API proxy；
- 源码没有显式区分 production / development 的条件分支；可见差异来自 Vite 的 dev、build 和 preview scripts；
- README 将 `/api/create` 称为 existing serverless function，但仓库没有平台路由配置用于确认当前生产映射。

---

## 10. SEO 现状

`legacy/index.html` 当前包含：

- `<html lang="zh-CN">`；
- UTF-8 charset；
- viewport，包含 `viewport-fit=cover`；
- theme color；
- color scheme；
- Apple mobile web app status bar style；
- `<title>`；
- meta description；
- Open Graph `og:type=website`；
- `og:site_name`；
- `og:title`；
- `og:description`。

React 在语言切换时更新 document title、description、`og:title` 和 `og:description`，但没有切换 `og:site_name` 或 `og:type`。

仓库中未发现：

- canonical link；
- `og:url`、`og:image`；
- Twitter Card meta；
- JSON-LD 或其他 structured data；
- `robots.txt`；
- sitemap；
- favicon 或 apple-touch-icon 文件 / link；
- web manifest；
- alternate / hreflang URL；
- SSR、SSG 或按语言生成的独立 HTML。

---

## 11. Git / 历史结构相关事实

- 当前分支：`Eternanet_v0.1`；远端跟踪 `origin/Eternanet_v0.1`；
- `origin/HEAD` 指向 `origin/main`；
- 当前本地分支列表为 `Eternanet_v0.1` 与 `main`；
- commit `ff23d10` 将原根目录 `api/`、`index.html`、`package*.json`、`src/`、`styles.css` 和 `vite.config.js` 以 Git rename 形式移入 `legacy/`；
- 同一 commit 添加 Node 1 至 Node 10 的准备目录、`assets/` 与 `references/`；
- commit `8a07e3b` 添加 Node 1 两份定位文档；
- commit `b72967f` 将 Node 1 状态更新为 `PASS / FROZEN`；
- commit `4f48ec3` 是当前历史中名为 `Build Eterna homepage v0.1` 的旧站构建提交；
- `README.md` 的仓库指南针由 commit `ae9fe99` 添加；
- 当前跟踪文件中包含根 `.DS_Store` 与 `legacy/.DS_Store`；
- `legacy/dist/`、`legacy/node_modules/` 和根 `.env.local` 为本地存在但被忽略的内容。

---

## 12. 未能确认的事项

- 当前生产部署平台；
- 当前生产域名与域名配置；
- 线上正在运行的 commit 或 build；
- 本地 ignored `legacy/dist/` 是否与当前 HEAD 源码完全对应；
- `/api/create` 在当前生产部署中的实际路由映射；
- Airtable 环境变量当前值是否有效、目标 Base / Table 是否仍存在；
- 参与表单当前在线环境是否能够成功写入 Airtable；
- 是否存在仓库外的 Analytics、反向代理、redirect、rewrite、CDN 或部署平台设置；
- 是否存在仓库外的 Logo、图片、视频、字体、品牌文件或线上媒体资产；
- 当前线上页面是否与 `legacy/` 源码相同；
- `.DS_Store` 二进制内容的业务用途；源码没有引用这些文件。

当前文档状态：`REVIEW_REQUIRED`
