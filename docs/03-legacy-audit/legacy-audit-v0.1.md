# Eterna Website 1.0 旧站审计 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 3 旧站问题、技术债与可复用资产审计

状态：`PASS`

审计日期：`2026-08-07`（Asia/Shanghai）

> 本文件基于 Node 1 已冻结定位与 Node 2 已完成事实扫描，对旧站问题、风险、技术债和复用边界作项目级判断。
> 本文件不修改旧站，不决定 Website 1.0 的页面、导航、视觉、技术栈或目标架构，也不开始后续节点。

---

## 1. 审计基线

### 1.1 Website 仓库快照

| 项目 | 审计值 |
| --- | --- |
| repository | `https://github.com/JerryYork3516/Eterna_Website.git` |
| 当前 branch | `New` |
| 当前 HEAD | `6a67f1c29fe6104da4978a57c2592ac025392e97` |
| 当前 upstream | `origin/New` |
| 审计开始时 Git 状态 | clean，`New...origin/New` |
| 旧站实现路径 | `legacy/` |
| 审计方式 | 文档与源码静态审计；未运行 build、dev、preview、在线表单或浏览器验收 |

Node 2 的事实扫描绑定 `Eternanet_v0.1@b72967fb1c87f0b14c94da67a706f3c16ccb49b6`。本节点以 Node 2 两份 `PASS` 文档为事实输入，并在当前 `New@6a67f1c...` 下只读核对 `legacy/`。本次核对未发现 `legacy/` 相对 Node 2 记录发生修改。

### 1.2 已读取输入

- `docs/01-positioning/upstream-baseline-v0.1.md`，状态 `FROZEN`；
- `docs/01-positioning/website-positioning-v0.1.md`，状态 `FROZEN`；
- `docs/02-existing-site-scan/repository-scan-v0.1.md`，状态 `PASS`；
- `docs/02-existing-site-scan/asset-inventory-v0.1.md`，状态 `PASS`；
- `legacy/index.html`、`legacy/package.json`、`legacy/package-lock.json`、`legacy/vite.config.js`；
- `legacy/src/` 全部源码、`legacy/styles.css`、`legacy/api/create.js`；
- 根 `README.md` 与 `.gitignore`，用于核对运行说明和旧站边界。

### 1.3 审计判定口径

| 分类 | 含义 |
| --- | --- |
| `KEEP` | 事实正确、边界清楚，可直接保留的资产或行为 |
| `MIGRATE` | 迁移语义目标、信息职责、正确概念边界或能力需求，不代表直接复用 Legacy 原文或实现；Website 1.0 正式文案必须重新依据 Node 1 上位事实生成并审核 |
| `REFERENCE_ONLY` | 仅保留为内容、视觉或交互参考，不直接复用旧实现 |
| `REWRITE` | 概念或业务意图可参考，但正文或实现不能直接进入 Website 1.0 |
| `DROP` | 旧实现不应进入 Website 1.0 基线 |

以上分类只决定旧站输入的处置，不决定新实现具体采用什么。

---

## 2. 总体结论

旧站是一套完成度较高的双语单页 React Landing Page，不是能够直接扩展为 Eterna 长期企业主站的 Website 1.0 基线。

旧站的正面基础包括：以数字居民为中心的叙事、Studio 与 Aftelle 的高层职责区分、Universe 长期愿景提示、完整的中英文覆盖、基本语义结构、skip link、表单 label、`aria-live`、focus 样式和 reduced-motion 处理。这些内容证明旧站并非无价值原型，但其价值主要是概念、交互和视觉参考。

旧站的核心问题包括：

1. 信息架构仍是 1 个 HTML 入口、5 个 hash Section 的单页结构，与 Node 1 冻结的“长期企业主站、品牌门户和产品体系总入口”不匹配；
2. Eterna 总体叙事、产品定义、当前进度、未来愿景、表单转化和双语文案全部集中在 `App.jsx`，缺少版本化来源和内容治理边界；
3. Aftelle 功能清单、当前开发进度以及部分愿景句超出当前已冻结上位输入能够直接支持的范围；
4. `App.jsx` 777 行、`styles.css` 1669 行，页面、内容、状态、SEO 更新、导航和表单职责高度集中；
5. Airtable 表单存在生产映射不确定、数据治理不足、滥用防护不足和错误边界过薄等风险；
6. 当前 Vite 单页实现只有一个文档入口和一套页面级 metadata，非 URL 级双语及缺失的企业站 SEO / legal / support 基础能力会限制 Website 1.0；
7. Aurora 有独立组件、清理和 reduced-motion 处理，但仍与全站固定背景和旧视觉系统绑定，只适合作为参考资产。

Node 3 结论：旧站不适合原样延续或扩建。Website 1.0 可以迁移少量经过复核的内容语义与交互能力，但旧页面骨架、内容承载方式、CSS 组织和 API 实现应退出目标基线。

---

## 3. 产品与信息架构问题

### 3.1 与企业主站定位不匹配

Node 1 已冻结 Website 是 Eterna 的长期企业主站、品牌门户和产品体系总入口，而不是单一产品 Landing Page。旧站当前 Vite 单页实现只有一个文档入口，并将所有内容压入 `Vision → Resident → Products → Scenarios → Join` 的线性阅读路径。

这一结构可以完成一次品牌介绍，但无法证明能够长期承载：

- 企业与品牌事实；
- 多产品的独立、可追溯公开信息；
- 产品状态变化与历史更新；
- 研究、开发者、新闻、支持等未来扩展内容；
- legal、privacy、support 等企业站基础信息。

本节点只确认现有结构与定位不匹配，不在此提出新页面或新导航。

### 3.2 单页 Section 同时承担过多叙事层级

旧站把以下层级放在同一页面连续展开：

- Eterna 总体愿景；
- 数字居民正式定义；
- Studio 与 Aftelle 产品关系；
- Universe 长期产品拓扑；
- 当前开发进度；
- 参与意向转化。

这些内容缺少独立的来源状态、更新时间和当前能力边界。访问者需要依赖末尾注释才能区分“长期愿景”与“当前实现”，容易把拓扑、场景和产品要点理解为已经可用的产品矩阵。

### 3.3 上位定义基本一致，但存在越权和时态风险

#### 可确认一致

- 数字居民不是模型、Agent、工具或外观，而是持续存在的主体；
- Studio 负责创作、验证、构建与发布；
- Aftelle 负责承载、交互、陪伴和个人入口；
- Universe 中平台不是中心主体，数字居民才是中心；
- 页面明确提示 Universe 不代表所有平台已立项或已开发。

#### 需要重写或重新取证

| 旧站表达 | 问题判断 | 依据 |
| --- | --- | --- |
| “成为进入数字世界的唯一途径” / “your only gateway into the digital world” | `REWRITE`；“唯一途径”不是 Node 1 冻结的 Eterna 或数字居民定义，构成未经来源支持的排他性主张 | `legacy/src/App.jsx` hero closing；Node 1 上位输入未提供该结论 |
| “创造价值并为你赚取报酬” | `REWRITE`；属于未来应用结果或能力承诺，未绑定当前产品事实与可用状态 | `legacy/src/App.jsx` vision paragraphs；Node 1 要求不把愿景写成当前能力 |
| Aftelle 的文字、语音、视觉、多模态、备份、恢复、迁移和个人设备能力清单 | `REWRITE`；高层职责部分受上位文档支持，但 Aftelle Product North Star 仍是 GAP，完整功能清单不能直接作为正式产品事实 | Node 1 `GAP-01`；`legacy/src/App.jsx` Products |
| “当前主线”中的 Studio Next、Aftelle、Runtime Core 推进与连续性验证状态 | `REWRITE`；可能符合项目进展，但旧站没有记录版本、日期、发布记录或产品仓库来源 | `legacy/src/App.jsx` Join progress；Node 1 `GAP-06` |
| Universe 平台组和公共基础设施完整列举 | `REFERENCE_ONLY`；名称可追溯到长期拓扑，但单页卡片形式仍可能被理解为当前产品清单 | `legacy/src/App.jsx` Universe；Node 1 表达时序原则 |

### 3.4 企业身份缺位

旧站主要解释理念、Resident、产品和参与方式，没有可验证的公司公开身份、公司介绍、团队、地点、媒体联系或法律主体信息。Node 1 已把这些内容记录为 GAP，因此旧站不能被视为已完成企业层表达。

### 3.5 旧站产品转化中心过强

Hero CTA、进度 CTA 和 Join 表单共同把页面导向参与意向提交。该路径适合 Landing Page，但“参与转化”是否应继续成为 Website 1.0 的主要职责尚未经过 Node 5 需求确认，不能从旧站存在直接推导为新站需求。

---

## 4. 技术债

### 4.1 Top 技术债

| 优先级 | 技术债 | 证据 | 对 Website 1.0 的影响 |
| --- | --- | --- | --- |
| HIGH | `App.jsx` 同时承载双语文案、全页 Section、Header/Footer、SEO DOM 更新、导航状态、表单状态与提交逻辑 | `legacy/src/App.jsx` 777 行；除 `SectionIntro` 外主要页面结构集中在 `App` | 内容、交互与页面结构无法独立演进，任何产品或语言变更都触碰根组件 |
| HIGH | 全站 CSS 单文件集中 | `legacy/styles.css` 1669 行，包含 tokens、全局样式、全部 Section、表单、响应式和动效 | 样式责任边界不清，局部迁移容易携带全局副作用 |
| HIGH | 内容是 JSX 内嵌双语对象，没有来源版本、审核状态或内容生命周期 | `content.cn` / `content.en` 位于 `App.jsx` | 不能满足 Node 1 的来源追溯要求，双语内容易漂移 |
| HIGH | 当前 Vite 单页实现以一个文档入口和 hash Section 承载全部内容 | `legacy/index.html`、`main.jsx`、5 个 Section ID；无 pathname 路由 | hash Section 没有独立 URL 文档、独立 metadata 和独立内容边界，不适合作为长期多栏目企业主站的信息发现与索引基础 |
| HIGH | 表单 API 与特定平台约定隐式耦合 | 前端固定 POST `/api/create`；`legacy/api/create.js` 不进入 Vite bundle；无部署路由配置 | 旧站在静态部署、预览和生产环境中的行为可能不同 |
| MAJOR | 无测试、lint、格式化或 CI 配置 | `package.json` 只有 `dev`、`build`、`preview` | 内容、响应式、表单与 WebGL 回归无法通过仓库门禁确认 |
| MAJOR | 语言能力依赖运行时 DOM 修改与 localStorage | `document.title`、meta mutation、`eterna-language`、旧 key `afterlife-language` | 语言状态没有独立 URL，不能直接复用到可索引多语言企业站 |
| MAJOR | Aurora 是全站固定渲染层，缺少 WebGL 初始化失败降级边界 | `App` 无条件挂载 `Aurora`；`Aurora.jsx` 直接创建 OGL `Renderer` | GPU、浏览器或上下文创建失败可能影响页面体验，视觉效果与页面根结构耦合 |
| MINOR | README 的运行路径仍按旧根目录书写 | 根 `README.md` 引用根 `src/`、`styles.css`、`api/create.js`，实际均在 `legacy/` | 新成员按文档执行会进入错误目录；属于旧站维护文档漂移 |
| MINOR | Git 跟踪 `.DS_Store` | 根与 `legacy/.DS_Store` 均被跟踪，`.gitignore` 无对应规则 | 形成无业务价值的仓库噪声；不影响页面运行 |

### 4.2 组件组织

`Aurora`、`NavigationTabs` 和 `LanguageToggle` 已拆为组件，但 Header、Footer、所有内容 Section、表单和 metadata side effects 仍在 `App`。当前拆分主要围绕可见交互，不围绕内容边界、产品边界或服务边界。

### 4.3 状态管理

旧站只有 `language`、`activeNav`、`submitStatus` 三类本地状态，不存在需要引入复杂状态框架的事实。问题不在“缺少状态管理库”，而在所有状态、副作用与内容均由根组件协调：

- 语言切换同时修改 localStorage、HTML lang、title、description 和 OG 文案；
- 导航同时依赖 DOM 查询、IntersectionObserver、Header 高度和自定义滚动；
- 表单状态、网络调用和消息定时复位直接写在页面组件中。

### 4.4 响应式实现

旧 CSS 覆盖 1120、920、860、720、520px 五个断点，包含安全区、移动导航横向滚动和 reduced-motion。响应式覆盖面可作为参考，但实现与 1669 行全局 CSS、固定 Section 结构及当前视觉密切绑定，不适合整体迁移。

本次未执行浏览器尺寸矩阵、真实设备、键盘或辅助技术验收，因此不能把静态 CSS 覆盖等同于响应式已经通过。

### 4.5 构建与依赖

- React、Vite、OGL 和 npm lockfile 构成完整旧站构建输入；
- 现有依赖数量较少，本身不是问题结论；
- 仓库没有冻结 Website 1.0 技术栈，本节点不得因旧站使用 React/Vite 而默认沿用；
- ignored `legacy/node_modules/` 与 `legacy/dist/` 是本地环境和生成物，不是可迁移资产；
- Node 2 未执行构建，本节点也未执行，因此当前源码的可构建性仍以静态配置存在为证据，不标记为已验证成功。

---

## 5. 功能与服务风险

### 5.1 Airtable 表单链路

风险等级：`HIGH`。

| 风险 | 当前证据 | 判断 |
| --- | --- | --- |
| 生产路由不确定 | Vite 只构建前端；`legacy/api/create.js` 未进入 `dist/`；无 Vercel、Netlify、Cloudflare 或 rewrite 配置 | 无法确认 `/api/create` 在线上由谁映射和执行 |
| 外部服务状态不确定 | 依赖 6 个 Airtable 环境变量；Node 2 未验证变量值、Base、Table 或表单在线写入 | 不能把“handler 存在”当作“表单可用” |
| PII 数据治理不足 | 收集姓名、邮箱和参与方向并发送 Airtable；页面只有简短用途说明 | 缺少隐私政策、处理者说明、保留期限、联系渠道和可核验授权依据 |
| 滥用防护缺失 | handler 未见 rate limit、bot 防护、origin 检查或提交幂等 | 公开端点可能被批量提交或造成重复记录 |
| 服务端校验偏弱 | 只做类型、trim、非空和长度；email 没有服务端格式校验，purpose 没有 allowlist | 绕过浏览器表单后可写入任意非空字符串 |
| 错误信息边界偏薄 | 配置缺失时向客户端返回缺失环境变量名称；成功时返回 Airtable record id | 暴露非必要的运维结构和第三方记录标识 |
| 上游调用韧性不足 | fetch 未设置 timeout、abort、retry 或幂等 key | Airtable 慢响应、网络中断或重复提交缺少明确控制 |

Node 3 不修复以上风险。参与表单是否进入 Website 1.0 必须先由 Node 5 确认；若保留业务能力，旧 API 实现仍需重写而不是直接迁移。

### 5.2 API 边界

前端通过 HTTP path 使用 `/api/create`，但源码层没有共享 request / response contract、版本标记或可独立验证的 schema。API handler 的函数签名依赖某类 serverless `req` / `res` 约定，仓库却没有声明具体平台。

因此 `legacy/api/create.js` 是“存在的候选 handler”，不是已确认的 Website 1.0 服务边界，也不是已验证的生产 API。

### 5.3 环境变量与数据暴露

- 六个 Airtable 变量均应只存在于服务端；当前前端没有直接读取它们；
- `.env.local` 被忽略，Node 2 只确认名称，未读取 secret 值；
- 无法确认生产环境是否配置同名变量；
- 表单备注没有明确第三方 Airtable 数据处理关系；
- 仓库未发现日志、审计、删除请求或数据导出处理机制。

### 5.4 前端错误处理

前端把所有非 2xx、网络错误和 API 错误统一显示为“稍后重试”，详细错误只写入 console。该策略避免向用户泄露响应正文，但也无法区分输入问题、配置问题、限流或服务不可用。状态在 5 秒后自动清除，失败证据不会保留。

### 5.5 当前生产映射

以下事项仍为 `UNVERIFIED`：

- 生产平台、域名和当前线上 commit；
- `legacy/dist/` 是否对应当前源码；
- `/api/create` 的 serverless 映射；
- Airtable Base / Table 是否存在且字段仍匹配；
- 线上是否存在仓库外 Analytics、CDN、反向代理或安全控制。

这些不确定项阻止对旧站作“生产可继续使用”的结论。

---

## 6. SEO、可访问性与企业站缺口

### 6.1 SEO 与可索引性

| 能力 | 当前状态 | 审计结论 |
| --- | --- | --- |
| 多页面可索引结构 | 只有一个 `index.html` 和客户端渲染内容 | `GAP`；不满足长期企业站的独立内容表达需要 |
| 语言 URL | 中英文共用同一 URL，通过 localStorage / React 切换 | `GAP`；搜索引擎和分享链接无法稳定表达语言版本 |
| 基础 metadata | 有 title、description、OG type/site/title/description | `MIGRATE` 能力；具体文案必须重写并绑定来源 |
| canonical / hreflang | 未发现 | `GAP` |
| sitemap / robots | 未发现 | `GAP` |
| OG image / URL、Twitter Card | 未发现 | `GAP` |
| structured data | 未发现 JSON-LD 或其他结构化数据 | `GAP` |
| favicon / manifest | 未发现 | `GAP` |
| hash navigation | click 被 preventDefault 后只执行 `window.scrollTo`，不更新 location hash | 当前交互不能稳定形成可分享、可回退的 Section URL 状态 |

当前 Vite 单页实现只有一个文档入口和一套页面级 metadata；hash Section 没有独立 URL 文档、独立 metadata 和独立内容边界，因此当前实现不适合作为长期多栏目企业主站的信息发现与索引基础。问题来自当前实现方式，不代表 SPA 技术天然不能实现 SEO，也不代表旧站存在 metadata 就已经具备企业级 SEO 基础设施。

### 6.2 已存在的可访问性基础

以下实现可保留为行为基线：

- `html lang` 随语言更新；
- skip link 指向 `main`；
- 使用 `header`、`nav`、`main`、`section`、`article`、`footer`；
- 页面有单一主 `h1`，Section 使用标题层级；
- 表单 input / select 包含可见 label、required 和 autocomplete；
- 状态文本使用 `aria-live="polite"`；
- 导航活动项使用 `aria-current="location"`；
- Aurora 标记为装饰性 `aria-hidden`；
- CSS 提供 focus-visible 与 reduced-motion 处理。

### 6.3 可访问性风险与未验证项

- disabled 登录按钮通常不能聚焦，其“即将开放”说明只在 `aria-label` / title 中，键盘和触屏用户未必能获得解释；
- 颜色对比度、缩放至 200%、键盘顺序、屏幕阅读器输出、移动导航滚动和表单错误提示尚未实测；
- 表单错误没有字段级关联或错误定位；
- WebGL 性能、GPU 降级、上下文创建失败和高对比度模式未验证；
- hash 导航阻止默认行为但不维护浏览器历史，返回键和深链接行为不完整。

### 6.4 企业站基础能力缺口

仓库未发现以下正式能力或正文：

- 公司公开身份与正式公司介绍；
- 隐私政策、服务条款、Cookie 或其他法律声明；
- 正式支持入口、联系渠道或服务状态信息；
- 新闻、发布记录或内容更新时间；
- 产品当前可用性、版本和官方入口的版本化来源；
- 研究与开发者内容的审核和失效机制；
- 品牌规范、正式 Logo、favicon、social image 或媒体资产。

上述缺口不自动等于 Website 1.0 首期页面清单；其需求与优先级必须在后续节点确认。

---

## 7. 可复用资产分类表

| 资产 / 能力 | 分类 | 理由与边界 |
| --- | --- | --- |
| 品牌文字 `Eterna` | `KEEP` | 名称与 Node 1 上位输入一致；不代表当前 CSS 圆标已获品牌规范批准 |
| skip link、语义标签、可见 label、focus-visible、`aria-live`、reduced-motion | `KEEP` | 是明确且低耦合的可访问性行为；后续实现仍需重新验收 |
| 数字居民正式定义的核心语义 | `MIGRATE` | 迁移的是语义目标、信息职责和正确概念边界，不代表直接复用 Legacy 原文；Website 1.0 正式文案必须重新依据 Node 1 上位事实生成并审核 |
| “数字居民为中心、平台是环境”的 Universe 表达原则 | `MIGRATE` | 迁移的是表达目标与正确概念边界，不代表直接复用 Legacy 原文；正式文案必须重新依据 Node 1 生成并审核，也不得迁移旧平台卡片结构或当前能力暗示 |
| 中英文语言能力 | `MIGRATE` | 企业站需要一致的多语言表达能力；旧 localStorage + DOM mutation 实现不能直接继承 |
| title / description / social metadata 能力 | `MIGRATE` | 保留的是能力需求，不代表复制旧 `index.html`、旧文案、单 URL 语言切换或 DOM 后改写实现 |
| 表单的 idle / submitting / success / error 反馈模式 | `REFERENCE_ONLY` | 交互状态可参考；业务是否保留需 Node 5 确认，旧网络实现不迁移 |
| Header 活动项、移动横向导航和滚动 offset | `REFERENCE_ONLY` | 可作为交互样本；Website 1.0 导航尚未设计，不能预设继续使用 |
| Aurora / OGL / GLSL 效果 | `REFERENCE_ONLY` | 有完整 shader、生命周期清理、visibility 和 reduced-motion 处理；但与旧全站背景、性能成本和旧视觉绑定 |
| CSS 色彩变量、玻璃质感、卡片与动效 | `REFERENCE_ONLY` | 可作为旧视觉证据；正式品牌规范缺失，不能提升为 Website 1.0 设计系统 |
| 现有 Vision / Resident / Products / Universe / Join Section | `REFERENCE_ONLY` | 可帮助后续理解旧叙事，不构成 Node 5 需求或 Node 6 页面清单 |
| Studio 产品正文 | `REWRITE` | 高层职责可追溯，但旧文案混合价值主张、用户类型和当前能力，需要按正式来源重写 |
| Aftelle 产品正文与功能点 | `REWRITE` | Aftelle Product North Star 缺失，不能直接复用完整功能清单 |
| “当前主线 / 开发进度”文案 | `REWRITE` | 缺少日期、版本和产品仓库来源，容易快速过期 |
| Hero / Vision 愿景文案 | `REWRITE` | 包含“唯一途径”“赚取报酬”等缺少正式来源或时态边界的表述 |
| Join 参与意向业务与文案 | `REWRITE` | 需求尚未确认，且数据用途说明不足以承担正式隐私告知 |
| `legacy/api/create.js` Airtable handler | `REWRITE` | 服务边界、部署映射、验证、反滥用、数据治理和错误处理不足 |
| `styles.css` 整体实现 | `REWRITE` | 1669 行全局单文件与当前页面结构强耦合，不适合作为目标样式基线 |
| `App.jsx` 整体实现 | `REWRITE` | 内容、页面、SEO、状态和网络职责集中，不能作为企业站根组件继续扩建 |
| 5 个 hash anchor 作为全站信息架构 | `DROP` | 不能承载长期企业主站；具体新 IA 留给 Node 6 |
| disabled 登录按钮 | `DROP` | 没有登录功能，仍占用主导航动作位置并形成能力预期 |
| `afterlife-language` 旧 localStorage key 兼容 | `DROP` | 属于旧命名遗留，不应进入 Website 1.0 内容或状态基线 |
| ignored `legacy/dist/`、`legacy/node_modules/`、本地 `.env.local` | `DROP` | 分别是生成物、安装环境和本地配置，不是可迁移源码或资产 |
| 跟踪的 `.DS_Store` | `DROP` | 无运行时用途，不应作为 Website 1.0 输入 |

仓库当前没有独立 Logo、图片、视频、字体、图标系统、3D 模型或品牌 master 可分类为可直接迁移的媒体资产。

---

## 8. 必须废弃的旧实现

以下判断只针对旧实现，不指定替代技术：

1. 废弃当前“一个文档入口 + 5 个 hash Section”的实现作为 Website 1.0 完整站点骨架；
2. 废弃在 `App.jsx` 内同时维护全站双语正文、页面结构、metadata、副作用与表单网络调用的方式；
3. 废弃把 `styles.css` 整体作为 Website 1.0 样式基础继续追加的方式；
4. 废弃把 `legacy/api/create.js` 直接认定为生产可用 API 的结论；
5. 废弃 disabled 登录按钮及其“即将开放”的无来源产品预期；
6. 废弃 `afterlife-language` 遗留 key；
7. 废弃把本地 `dist/`、`node_modules/`、`.env.local` 或 `.DS_Store` 当成迁移资产；
8. 废弃把旧站中的当前进度、Aftelle 功能点和长期 Universe 清单直接发布为 Website 1.0 当前事实。

---

## 9. 可迁移能力

### 9.1 可直接保持的行为底线

- 语义化页面骨架与单一主标题；
- skip link、focus-visible、表单 label 和状态播报；
- reduced-motion 与页面不可见时暂停动态背景的意识；
- 对中文与英文提供完整而非局部的内容覆盖。

### 9.2 需要重新接入的能力

本节的 `MIGRATE` 只迁移语义目标、信息职责、正确概念边界或能力需求，不代表复用 Legacy 原文或旧实现。Website 1.0 正式文案必须重新依据 Node 1 上位事实生成并审核；metadata 只保留能力需求，不复制旧 `index.html` 实现。

- 多语言切换与语言偏好；
- 数字居民核心定义和 Eterna / Universe 层级关系；
- metadata 与 social metadata；
- 若 Node 5 确认需要参与表单，可迁移其状态反馈意图，但不迁移旧 Airtable handler；
- 若后续视觉和性能审议仍需要动态背景，可参考 Aurora 的视觉与生命周期处理，但不预设采用 OGL、GLSL 或全站固定 canvas。

### 9.3 只能作为参考的内容

- 五段 Section 的叙事顺序；
- 当前深色玻璃质感、蓝色 Aurora 和卡片体系；
- 活动导航胶囊和移动横向滚动；
- Products handoff 图示；
- Join 参与角色、目的选项和转化文案。

---

## 10. 对 Website 1.0 后续节点的约束

1. Node 4 参考研究不得把旧站视觉或单页结构预设为目标，也不得用参考网站覆盖 Node 1 上位定位；
2. Node 5 必须先确认企业信息、产品信息、参与表单、新闻、研究、开发者和支持等内容的真实需求、负责人、来源和时效；
3. Node 5 必须把 Aftelle North Star、公司公开身份、品牌规范和当前产品可用性继续保留为 GAP，除非获得正式输入；
4. Node 5 若保留表单，必须明确数据字段、用途、第三方处理者、保留与删除规则、反滥用要求和用户告知；
5. Node 6 必须解决企业主站长期扩展与可索引内容结构问题，但本节点不指定页面、导航、URL 或语言路由；
6. Node 7 不得把旧圆形 CSS 标记、Aurora 色彩或玻璃卡片直接认定为正式品牌系统；
7. Node 8 可把旧站作为交互和视觉参考，不得把 `App.jsx` / `styles.css` 作为目标页面实现开始重构；
8. Node 9 必须独立决定 Website 1.0 的技术和服务边界，不因旧站使用 React、Vite、OGL 或 Airtable 而默认继承；
9. 后续公开文案必须区分上位事实、当前已验证能力、正在推进、长期愿景和 Website 项目决策；
10. 所有迁移内容必须保留来源版本与复核入口，不能让 Website 反向成为产品定义事实源；
11. 在正式开发前，应为可访问性、SEO、表单安全与数据治理建立可验证验收条件；本节点不创建测试或实现。

---

## 11. 未决问题

| 未决问题 | 当前状态 | 后续处理边界 |
| --- | --- | --- |
| 当前线上网站由哪个平台、域名和 commit 提供 | `UNVERIFIED` | 需要部署事实输入；Node 3 不猜测 |
| `/api/create` 是否在线可用、Airtable 目标是否有效 | `UNVERIFIED` | 需要生产配置与安全核验；不得输出 secret |
| Website 1.0 是否继续收集参与意向 | `UNDECIDED` | Node 5 需求阶段决定 |
| Aftelle 的正式完整定位和当前可用功能 | `GAP` | 等待正式 Product North Star 与版本化产品事实 |
| Eterna 公司公开身份和公司介绍 | `GAP` | 等待经审核的正式正文 |
| 正式品牌规范、Logo 和媒体资产 | `GAP` | 等待品牌治理输入；旧视觉只能作参考 |
| 哪些旧文案可逐句保留 | `UNVERIFIED` | 需逐条绑定 Eterna_Docs 或产品发布来源并完成中英文复核 |
| Aurora 的性能、兼容性和品牌适配是否合格 | `UNVERIFIED` | 本节点未做浏览器/GPU/真实设备验收 |
| 旧站颜色对比、键盘、屏幕阅读器和移动端是否通过 | `UNVERIFIED` | 静态存在可访问性处理不等于人工验收通过 |
| 是否存在仓库外 Analytics、CDN、Logo、媒体或 legal 文本 | `UNVERIFIED` | 需要生产和资产所有者提供证据 |

---

Node 3 最终状态：`PASS`
