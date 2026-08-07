# Eterna Website 1.0 现有资产清单 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 2 内容与媒体资产事实清单

状态：`REVIEW_REQUIRED`

扫描日期：`2026-08-07`（Asia/Shanghai）

> 本文件只登记仓库中存在、重复、被引用、未被引用或用途无法确认的资产事实。
> “未引用”不等于应删除；本文件不作复用、质量或处置判断。

---

## 1. 品牌资产

| 资产 | 路径 / 形式 | 文件类型 | 当前用途 | 引用位置 | 当前事实 |
| --- | --- | --- | --- | --- | --- |
| Eterna 品牌文字 | `legacy/src/App.jsx` 中 `brand: 'Eterna'` | JSX 内嵌文案 | Header 与 Footer 品牌名称 | `App.jsx` Header / Footer | 中文与英文内容对象均定义同一品牌文字 |
| 圆形品牌标记 | `.brand-mark` | CSS 绘制 | Header 与 Footer 品牌文字前的圆形发光标记 | `legacy/styles.css`、`App.jsx` | 由 border、border-radius、box-shadow 构成，没有独立 Logo 文件 |
| Resident handoff 标记 | 文本 `E` | JSX 文本 + CSS | Products Section 中两张产品卡之间的中心标记 | `App.jsx`、`.resident-handoff__mark` | 没有独立图形文件 |
| 品牌资产目录 | `assets/brand/.gitkeep` | 目录占位文件 | 准备阶段目录占位 | 无运行时代码引用 | 目录中没有其他文件 |

仓库中没有发现 `.svg`、`.png`、`.jpg`、`.webp`、`.ico` 或其他独立 Logo / brand artwork 文件。

---

## 2. 图片

| 路径 | 文件数量 | 当前用途 | 引用事实 |
| --- | ---: | --- | --- |
| `assets/images/` | 0 个内容文件；1 个 `.gitkeep` | 准备阶段目录占位 | 未被运行时代码引用 |
| `legacy/assets/` | 0 | 当前为空 | 无引用对象 |
| `references/screenshots/` | 0 个截图；1 个 `.gitkeep` | 准备阶段参考目录占位 | 未被运行时代码引用 |

全仓库排除 `node_modules/` 后没有发现 PNG、JPEG、GIF、WebP、AVIF 或 SVG 图片文件。React 源码中没有 `<img>`、`<picture>` 或 inline `<svg>` 元素。CSS 中没有图片 URL。

---

## 3. 视频

| 路径 | 文件数量 | 当前用途 | 引用事实 |
| --- | ---: | --- | --- |
| `assets/video/` | 0 个视频；1 个 `.gitkeep` | 准备阶段目录占位 | 未被运行时代码引用 |

全仓库排除 `node_modules/` 后没有发现 MP4、MOV、WebM 或其他视频文件，也没有 `<video>`、`<source>` 或视频 embed。

---

## 4. 图标

| 资产 | 形式 | 当前用途 | 引用位置 |
| --- | --- | --- | --- |
| CTA 箭头 | Unicode 文本 `→` | Hero secondary CTA、Products closing link | `legacy/src/App.jsx` |
| Select 下拉箭头 | 两个 CSS linear-gradient | Join 表单 select indicator | `legacy/styles.css` |
| 列表圆点 | CSS `::before` 圆形 | Products 卡片列表项 | `legacy/styles.css` |
| 品牌圆形标记 | CSS 圆形 | Header / Footer 品牌标记 | `legacy/styles.css` |

没有发现 icon font、SVG icon set、favicon、apple-touch-icon 或独立图标文件。

---

## 5. 字体

`legacy/styles.css` 定义的字体栈：

```text
-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", "Noto Sans SC", sans-serif
```

当前事实：

- 没有仓库内 `.woff`、`.woff2`、`.ttf` 或 `.otf` 文件；
- 没有 `@font-face`；
- `legacy/index.html` 没有外部 font stylesheet 或 preload；
- CSS 字体栈依赖设备已有字体及通用 sans-serif fallback。

---

## 6. 动画 / 3D / 粒子资源

| 资产 | 路径 | 类型 | 当前用途 | 引用位置 |
| --- | --- | --- | --- | --- |
| Aurora WebGL 背景 | `legacy/src/Aurora.jsx` | React + OGL + inline GLSL | 全页固定背景 | `App.jsx` 导入并渲染 |
| Aurora 容器样式 | `legacy/src/Aurora.css` | CSS | canvas 尺寸、pointer events、screen blend | `Aurora.jsx` import |
| Aurora 配色 | `legacy/src/App.jsx` 中 `auroraColorStops` | 3 个 HEX 值 | WebGL shader color stops | `App` props |
| Vertex shader | `Aurora.jsx` 中 `VERT` | GLSL ES 3.00 字符串 | 全屏 triangle position | OGL `Program` |
| Fragment shader | `Aurora.jsx` 中 `FRAG` | GLSL ES 3.00 字符串 | simplex-noise Aurora 色带与 alpha | OGL `Program` |
| Vision reveal | `legacy/styles.css` 中 `@keyframes vision-reveal` | CSS keyframe + view timeline | 愿景原因标题、正文和 closing 入场 | `@supports (animation-timeline: view())` |
| UI transitions | `legacy/styles.css` | CSS transition / transform | 导航、按钮、hover、focus、表单 | 多个 CSS selector |

Aurora 使用一个运行时创建的 `<canvas>`，没有对应的图片、视频、sprite、外部 shader 或预渲染媒体文件。

没有发现 GLB、GLTF、OBJ、FBX、Mesh、纹理图、独立粒子数据文件或其他 3D 资产文件。当前“粒子 / WebGL”表现来自程序化 shader 代码，不来自文件化模型或纹理。

---

## 7. 文案及内容资产

| 内容 | 路径 | 形式 | 当前用途 | 引用位置 |
| --- | --- | --- | --- | --- |
| 中文网站文案 | `legacy/src/App.jsx` 的 `content.cn` | JSX 内嵌 object | 中文页面 title、meta、导航、全部 Section、表单与 Footer | `App` 根据 language 读取 |
| 英文网站文案 | `legacy/src/App.jsx` 的 `content.en` | JSX 内嵌 object | English 页面 title、meta、导航、全部 Section、表单与 Footer | `App` 根据 language 读取 |
| 初始 HTML title / description | `legacy/index.html` | HTML meta | JavaScript 执行前的中文 title 与 description | 浏览器 document head |
| Open Graph 文案 | `legacy/index.html` | HTML meta | `og:site_name`、`og:title`、`og:description` | document head；title / description 由 React 随语言更新 |
| 表单数据使用说明 | `legacy/src/App.jsx` | 中英文内嵌文案 | 说明提交信息用于项目进展与合作联系，不出售或用于无关营销 | Join form note |
| Copyright | `legacy/src/App.jsx` | JSX 文本 | Footer `© 2026 Eterna` | Footer |
| API 响应文案 | `legacy/api/create.js` | JavaScript 字符串 | 请求方法、配置、字段与 Airtable 请求错误响应 | API handler |
| 仓库说明 | `README.md` | Markdown | 仓库指南针、旧站运行与路径说明 | 不被页面运行时代码读取 |
| Node 1 定位文档 | `docs/01-positioning/*.md` | Markdown | Website 1.0 准备阶段定位记录 | 不被页面运行时代码读取 |

`App.jsx` 中可见内容数量：

- 2 套语言内容对象；
- 每套 5 项 Header 导航、4 项 Footer 导航；
- 4 个 Resident continuity 标签；
- 4 个 resource role；
- 2 个 Resident 发展方向；
- 2 个产品卡；
- 5 个 Universe 场景；
- 5 个平台组；
- 4 个进度条目；
- 6 个参与角色；
- 4 个表单 purpose 选项。

没有发现独立 JSON、YAML、Markdown CMS content、数据库 seed 或远程 CMS 内容读取。

### 7.1 法律或声明文本

当前仓库中与页面直接相关的声明文本只有：

- Join 表单的中英文信息使用说明；
- Footer copyright。

没有发现单独的隐私政策、服务条款、Cookie 声明、许可证页面、免责声明或法律文本文件，也没有对应页面链接。

---

## 8. 重复资产

### 8.1 完全相同文件

排除 `.git/`、`node_modules/` 和 `.env.local` 后，SHA-256 扫描发现唯一的完全相同文件组为 15 个 `.gitkeep`。它们均为 1 byte 的目录占位文件，分布在：

- `assets/` 3 个子目录；
- `docs/01-positioning/` 至 `docs/10-development-plan/`；
- `references/notes/`；
- `references/screenshots/`。

没有发现完全相同的 Logo、图片、视频、字体、图标、3D 或动画媒体文件；仓库当前不存在这些媒体文件。

### 8.2 源文件与构建产物关系

- `legacy/dist/assets/index-Bwrnxuvp.css` 是本地 Vite 构建 CSS bundle；
- `legacy/dist/assets/index-D0tj2RiK.js` 是本地 Vite 构建 JavaScript bundle；
- 两者分别承载 source CSS / JavaScript 的构建结果，但与源文件不是 byte-identical 文件；
- `legacy/dist/index.html` 与 `legacy/index.html` 包含相同的主要 meta 文案，script / stylesheet 入口不同。

---

## 9. 未被当前代码引用的资产

| 路径 / 资产 | 引用扫描事实 |
| --- | --- |
| `assets/brand/.gitkeep` | 未被网站源码、HTML 或 CSS 引用 |
| `assets/images/.gitkeep` | 未被网站源码、HTML 或 CSS 引用 |
| `assets/video/.gitkeep` | 未被网站源码、HTML 或 CSS 引用 |
| `references/notes/.gitkeep` | 未被网站运行时代码引用 |
| `references/screenshots/.gitkeep` | 未被网站运行时代码引用 |
| 根 `.DS_Store` | 未被网站源码引用 |
| `legacy/.DS_Store` | 未被网站源码引用 |

`legacy/dist/assets/` 中的两个 bundle 被 `legacy/dist/index.html` 引用。Source HTML 不引用这些 hash bundle，而是引用 `/src/main.jsx`。

`legacy/api/create.js` 没有被 JavaScript import；前端通过 `/api/create` HTTP path 与其逻辑路径关联。

---

## 10. 无法确认用途的资产

- 根 `.DS_Store` 与 `legacy/.DS_Store` 的业务用途无法从代码确认；
- ignored `legacy/dist/` 是否为当前 HEAD 源码的最新构建无法从静态文件树确认；
- 仓库外是否存在 Logo master、品牌源文件、截图、照片、视频、字体、3D 模型或其他媒体资产无法确认；
- 当前线上部署是否加载仓库外 CDN 或平台注入资产无法从仓库确认；
- `assets/` 与 `references/` 目录当前只有占位文件，未来用途不在 Node 2 中推定。

当前文档状态：`REVIEW_REQUIRED`
