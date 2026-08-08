# Eterna Website 1.0 Node 9 — 迁移、部署与切换组成文档 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 9 — Legacy 迁移、Repository 治理、部署与 Cutover 组成文档

状态：`IN_PROGRESS / REVIEW_REQUIRED`

编制日期：`2026-08-08`（Asia/Shanghai）

> 本文件与 `technical-architecture-v0.1.md`、`content-management-v0.1.md` 共同构成 Node 9，不是独立子节点。
> 本文件只提出迁移、分支治理、部署与切换方案；本轮不修改 `legacy/`，不合并、删除或重命名分支，不修改生产 DNS / Deployment，也不开始开发。

---

## 1. 决策摘要

### 1.1 总体方案

Website 1.0 采用并行新建、逐项重写、Preview 验收、可回滚切换：

```text
保留 Legacy 基线
→ 在仓库根建立全新 Website 1.0 应用（后续实施）
→ 逐项重写并重新审核双语内容与资产
→ Preview 完成 Content / SEO / Visual / Responsive / Accessibility / Degradation 验收
→ 人工批准 production promotion
→ DNS / domain cutover
→ 监控与 rollback window
→ Legacy 只读归档
```

不在 `legacy/` 内原地重构，不直接删除旧站，不把 Legacy 的页面、文案、Aurora、OGL、CSS 或 Airtable handler 自动迁入新站。

### 1.2 当前仓库事实

| 项目 | 当前事实 |
|---|---|
| 正式规划工作分支 | `New`；当前 HEAD 基线 `db03f10` |
| GitHub default branch | 旧 `main`；本地 `origin/HEAD -> origin/main` |
| 历史实现分支 | `Eternanet_v0.1` 本地与远端跟踪引用仍存在 |
| Legacy 位置 | `legacy/`；当前工作区没有 Legacy 修改 |
| 新站根应用 | 不存在；根目录没有 package、framework 或 deployment config |
| 当前生产平台 / 域名 / commit | `UNVERIFIED` |
| 当前 API 生产映射 | `UNVERIFIED` |
| 当前外部服务事实 | 代码只显示 Airtable handler；线上有效性未验证 |

---

## 2. Legacy 保留策略

### 2.1 开发与切换前

- `legacy/` 保持原路径、原内容、原 lockfile 与现有构建边界；
- 新应用未来位于仓库根，不把 Legacy 目录变成新应用子模块；
- 新应用不得 import、build 或运行 `legacy/src`；
- Legacy 只作为迁移证据、旧行为参考与紧急回滚来源；
- 本轮及正式开发期间不得“顺手清理” Legacy；
- ignored `legacy/dist/`、`legacy/node_modules/` 和根 `.env.local` 不属于可迁移资产。

### 2.2 Cutover 后

- 在 rollback window 结束前完整保留可恢复的旧部署、Git commit、配置清单与 `legacy/`；
- rollback window 结束且 production 验收稳定后，将 Legacy 标记为只读归档；
- 归档至少记录旧 commit、旧部署标识、域名映射、环境变量名称、第三方依赖和停止服务日期；
- 是否未来从主分支移出 `legacy/` 需要单独人工批准和可恢复归档证据，不属于本轮；
- 不直接删除旧站或历史分支。

---

## 3. Legacy 迁移分类

| Legacy 对象 | 分类 | Website 1.0 处理 |
|---|---|---|
| `Eterna` 品牌文字 | `KEEP` | 继续使用经上位输入确认的名称；不保留旧 CSS 圆标为正式 Logo |
| 语义 landmark、单一 H1、skip link、可见 label、focus、`aria-live`、reduced-motion 意识 | `KEEP` 行为底线 | 在新结构中重新实现并重新验收；旧代码存在不等于新站自动通过 |
| Digital Resident 核心语义与“Resident 为中心”关系 | `MIGRATE` 语义职责 | 从 Node 1 权威来源重新生成、双语审核，不直接复制 Legacy 句子 |
| `/zh` / `/en` 双语能力 | `MIGRATE` 能力 | 改为独立路径、稳定 `pageId` 与双语发布门禁 |
| title / description / Open Graph 能力 | `MIGRATE` 能力 | 按页面与语言从审核内容生成，不复制 DOM mutation 或旧文案 |
| Form idle / submitting / success / error 意图 | `REFERENCE_ONLY` | 只有 Contact 启用条件成立后重建；不自动形成业务需求 |
| Header 活动态、滚动 offset、Mobile 导航参考 | `REFERENCE_ONLY` | 只保留交互经验；新站使用真实 route 和 Node 8 全站规则 |
| Aurora / OGL / GLSL | `REFERENCE_ONLY` | 留在 Legacy；不进入新根依赖，不成为 Living Precision 或 Resident 默认答案 |
| 旧配色、玻璃表面、卡片和 Motion | `REFERENCE_ONLY` | 仅作为历史视觉证据，不能通过迁移获得 Visual Quality Gate 批准 |
| `legacy/src/App.jsx` | `REWRITE` | 页面、内容、metadata、导航、状态和 Form 分离；不复制根组件 |
| `legacy/styles.css` | `REWRITE` | 不作为新站 global CSS 或 token 基线；页面与组件样式重新建立 |
| NavigationTabs / LanguageToggle | `REWRITE` | 使用真实 route、父级 Products 状态和同页语言配对 |
| Studio 文案 | `REWRITE` | 绑定 Studio North Star 与当前产品证据后重新撰写 |
| Aftelle 文案与功能清单 | `REWRITE` | 只使用已批准高层边界；Product North Star 缺失时不补写完整能力 |
| Hero / Vision / 进展文案 | `REWRITE` | 删除无来源排他性、报酬与未版本化进展主张，按内容 schema 重建 |
| `/api/create` | `DROP / REWRITE` | 不迁移旧 handler；是否启用新接口由 Contact、Privacy、Legal 与真实接收链路决定 |
| 5 个 hash Section 作为 Sitemap | `DROP` | 不保留为站点架构；只在必要时提供短期兼容映射 |
| disabled Login、旧 `afterlife-language` key | `DROP` | 不进入 Website 1.0 |
| `dist/`、`node_modules/`、`.env.local`、`.DS_Store` | `DROP` 迁移资格 | 不复制到新应用或部署包；secret 值不得进入迁移文档 |

---

## 4. Aurora / OGL 处理

- Aurora 与 OGL 保留在 `legacy/` 归档中，分类始终为 `REFERENCE_ONLY`；
- 不把 OGL 加入新应用默认 dependency；
- 不迁移 shader、color stops、固定全页 Canvas、blend 或旧生命周期代码；
- 新站 Resident / advanced visual 必须从 Node 8 的真实页面职责和 Visual Quality Gate 出发，先验证 CSS / SVG / DOM 等轻量方式；
- 只有静态 / 轻量方式确实无法完成已获批视觉、且 fallback、性能、设备与 reduced-motion 全部成立时，才重新评估 Canvas / WebGL / Three.js；
- 即使未来再次选到 OGL，也必须作为新的受控选型，不视为 Legacy 复用通过。

---

## 5. `/api/create` 处理

### 5.1 默认切换行为

- Website 1.0 不创建同名占位 endpoint；
- 不把旧 Airtable 环境变量复制到新项目；
- 不把旧 Airtable record id、配置名或错误详情暴露给客户端；
- 在没有生产调用证据、真实接收人、Privacy / Legal 与防滥用方案前，不继续公开提交入口。

### 5.2 切换前审计

必须确认：

- 当前线上是否存在 `/api/create` 路由；
- 最近是否有真实请求、成功写入或外部引用；
- Airtable Base / Table / fields 是否仍存在；
- 谁是数据责任人，现有数据如何保留、导出或删除；
- 当前页面是否仍公开表单，以及用户告知是否适用。

### 5.3 关闭或重建

- 若业务决定不保留 Contact，切换时移除前端入口；服务端旧 endpoint 在确认无合法依赖后返回明确停止状态或由旧部署整体下线，具体状态码经实施审核决定；
- 若业务决定保留，按 `technical-architecture-v0.1.md` 的同源 server boundary 和 `content-management-v0.1.md` 的启用门禁重建；
- Preview 不得写入 production Airtable、CRM、邮箱或其他接收方；
- 旧 handler 不作为 fallback；生产 rollback 通过恢复旧完整部署完成，不通过新站继续调用旧 secret。

---

## 6. 旧 Hash URL 处理

Legacy 使用 `#vision`、`#resident`、`#products`、`#universe`、`#join`。URL fragment 不会发送到服务器，因此不能依赖普通 301 在边缘或服务端精确识别。

处理原则：

1. 切换前从真实流量、搜索索引、外链与用户资料中确认 hash 是否仍被使用；
2. 对确有价值的 fragment，在新根语言页面加载后的轻量客户端兼容层中映射到正式 route；
3. 映射只做过渡，不恢复 hash Sitemap，也不让核心导航依赖 JavaScript fragment；
4. 建议候选映射：`#resident -> /{lang}/digital-residents`、`#products -> /{lang}/products`、`#vision -> /{lang}`；
5. `#universe` 没有一一对应的当前页面，必须在内容审核后决定落到 Home、About 或移除，不得自动创建 Universe 产品矩阵；
6. `#join` 只有 Contact / Participation 正式启用后才能映射；未启用时不得跳到假表单或空页；
7. 兼容层需要记录期限和访问量，稳定后经人工批准移除。

根 `/` 的语言入口仍为 `OPEN_DECISION`；hash 映射必须在根语言确定后使用同一规则，禁止 IP 地理判断。

---

## 7. 旧双语内容重新审核

所有 Legacy 文案进入迁移时默认状态为：

```text
publicationState = DRAFT
migrationClass = REWRITE
```

逐项流程：

1. 以稳定 `pageId` 和 Node 8 页面职责建立目标内容槽位；
2. 将 Legacy 句子仅作为候选材料，不直接标记 `CURRENT_VERIFIED`；
3. 对每个关键主张绑定 Eterna_Docs、Product North Star、产品仓库或批准记录；
4. 删除“唯一途径”、报酬、无版本进展、完整 Aftelle 功能与当前 Universe 产品矩阵等越权表达；
5. 中文和英文分别重写，不使用自动翻译替代正式本地化；
6. 校验两种语言的定义、职责、状态、日期、CTA 与来源一致；
7. Fact Owner、Language Reviewer 与 Publish Approver 完成记录；
8. 只有 `PUBLISHED` 双语对可以进入 production build。

旧 metadata 同样进入重写，不因已有 title / description / OG 标签而自动迁移。

---

## 8. 旧资产迁移

当前仓库没有可直接迁移的独立 Logo、图片、视频、字体、3D 模型或正式品牌 master。迁移时：

- CSS 圆标、文本 `E`、Unicode 箭头和 CSS 下拉箭头不提升为正式品牌 / 图标资产；
- Aurora shader 作为 Legacy 源码归档，不进入资产库；
- `assets/brand`、`assets/images`、`assets/video` 当前只有占位文件，不视为已存在资产；
- 未来获得的正式资产先进入 `content-management-v0.1.md` 的 asset manifest，记录来源、权利、locale、alt / transcript、fallback 与状态；
- 大型视频、3D 和 master 资产根据真实平台选择对象存储 / CDN；
- 不迁移 ignored build bundle，也不从 `legacy/dist` 反向提取正式源码资产；
- social image 必须按语言和页面重新审核，不能从旧截图自动生成。

---

## 9. Repository 分支治理

### 9.1 当前风险

- 正式规划在 `New`，但默认入口仍是旧 `main`；
- 部署平台若按 default / production branch 自动发布，可能发布错误历史；
- PR 基线、README / docs 发现、保护规则和新成员默认 checkout 可能指向旧内容；
- `Eternanet_v0.1` 与 `main`、`New` 并存，职责和归档状态未正式说明；
- 任何直接删除或强制改写都会破坏回滚和历史证据。

### 9.2 最终治理建议

推荐最终状态：

| 分支 / 引用 | 推荐职责 |
|---|---|
| `main` | 唯一长期默认分支与 production branch；在人工审核和迁移完成前不得绑定新 production |
| `New` | 当前规划与新站建设来源；通过 reviewed PR / 可审计 promotion 进入更新后的 `main`，完成后再决定是否保留为历史工作分支 |
| `Eternanet_v0.1` | 旧网站历史实现基线；创建不可变 tag / release 记录后保留为只读历史，当前不删除 |

推荐执行顺序（本轮不执行）：

1. 冻结并记录三个引用的 SHA、ancestry、diff、保护规则和当前部署绑定；
2. 确认旧生产究竟来自哪个 branch / commit；
3. 在独立 PR 中审阅 `New` 相对旧 `main` 的完整变更，不做 blind merge；
4. 通过后把更新后的 `main` 设为 GitHub default 与 deployment production branch；
5. 为旧 `main` 生产基线和 `Eternanet_v0.1` 创建可恢复 tag / release notes；
6. 先验证 Preview，再允许 production promotion；
7. rollback window 结束前不删除任何历史分支；
8. 后续是否删除或锁定 `New` / `Eternanet_v0.1` 需要单独人工批准。

最终采用 `main` 作为 production branch 是本文件的推荐，不是本轮 Git 操作。实际 promotion、default branch 修改和分支归档仍为 `OPEN_DECISION`，必须在真实部署绑定确认后人工批准。

---

## 10. Deployment Environments

### 10.1 Local

- 只连接 repository content 和本地安全配置；
- 不要求 production CMS、Airtable 或其他第三方才能进行 Design in Browser；
- 能快速切换中文、英文、长文案、无资产、无 Resident、reduced-motion 与失败 fixture；
- secret 只在本地忽略文件，仓库只记录变量名与用途。

### 10.2 Preview

- 每个 PR / approved branch 产生 commit-specific Preview URL；
- 与 production 域名、数据、secret 和接收方隔离；
- 使用 `X-Robots-Tag: noindex, nofollow` 或等价平台级响应策略，并验证页面级 metadata；
- 未授权 Preview 应使用访问控制，不能把 draft 安全寄托在 robots；
- 显示 commit SHA、environment 与非生产标识；
- 可关闭 Resident / Motion，执行 No-Resident 与 degradation 审核；
- Preview 通过代码检查不代表内容、视觉或 production promotion 已批准。

### 10.3 Production

- 只从受保护、人工确认的 production branch 或显式 promotion 发布；
- 每个部署绑定 commit SHA、内容版本、构建结果和部署标识；
- production secret 使用最小权限，不向 Preview 全量复制；
- 发布是原子的，可回滚到上一个已知良好部署；
- 不在首次请求时执行内容迁移、数据库迁移或旧资产抓取；
- production build 不包含 draft、withdrawn、Legacy bundle 或本地配置。

---

## 11. Platform、Promotion 与 Rollback

### 11.1 平台

- Vercel 继续作为推荐首选：Next.js 支持直接、PR Preview 与 promotion 路径适合 Design in Browser、首版运维较轻；
- Cloudflare Workers + OpenNext 是可行备选：若现有 DNS、边缘、账户、成本或区域事实明显更适合，可提升为首选；
- 当前缺少真实账户、域名、费用、区域、现网平台和权限证据，最终平台保持 `OPEN_DECISION`；
- 选型前用同一最小 Preview 验证 SSG、Route Handler、image、headers、noindex、environment、rollback 与 build 行为，不用营销页面代替实测。

### 11.2 Promotion

推荐使用“immutable Preview deployment → 人工批准 → production promotion”，不因 push 任意分支自动上线。

Promotion 前必须有：

- CI 全部通过；
- 12 个 URL 与双语配对通过；
- content build gate 通过；
- SEO、canonical、hreflang、sitemap、robots 通过；
- Desktop / Tablet / Mobile、Keyboard、VoiceOver、Zoom、reduced-motion 通过；
- Node 7 / 8 Visual Quality Gate 与逐页浏览器审核通过；
- Resident / advanced visual 关闭与失败降级通过；
- production environment、canonical host、Form feature flag 与 secret 审核通过；
- rollback target 与执行权限已确认。

### 11.3 Rollback

- 保留上一个已知良好 production deployment 和 commit tag；
- 回滚优先切换平台 deployment alias / domain 指向，不在事故中临时修改代码；
- DNS 级回滚只作为域名 / 平台切换异常的后备路径；
- 回滚后复核 canonical、TLS、robots、sitemap、Form 与环境变量；
- 旧站在 rollback window 内保持可恢复，但不同时以两个 canonical production 站对外索引；
- rollback 条件、责任人、窗口长度与完成判定必须在切换前填写，当前为 `OPEN_DECISION`。

---

## 12. Domain、TLS、DNS 与 SEO 上线边界

### 12.1 Canonical host 与 www / apex

- 必须选择唯一 canonical host；apex 与 `www` 只能有一个返回规范内容，另一个永久重定向；
- 当前真实域名、注册商、DNS provider 与线上 host 未验证，因此 apex / www 选择保持 `OPEN_DECISION`；
- canonical、Open Graph URL、sitemap host、robots sitemap URL 与 redirect 必须使用同一 host；
- Preview、平台默认域名和旧 host 不得成为 production canonical。

### 12.2 HTTPS / TLS

- production 与 redirect host 全部强制 HTTPS；
- 使用部署平台或受控证书服务自动签发与续期；
- Cutover 前验证证书覆盖 apex / www、TLS 生效、HTTP → HTTPS 与非 canonical host redirect；
- 不在仓库提交私钥或证书 secret。

### 12.3 DNS

- 切换前记录现有 DNS 全量快照、TTL、owner 与 rollback 值；
- 在计划窗口前降低必要记录 TTL，但不提前改变 production 指向；
- 先在 Preview / temporary host 完成应用验收，再修改 production DNS；
- 切换后从多个网络验证 DNS、TLS、redirect、canonical 与页面响应；
- 不删除旧 DNS / deployment，直到 rollback window 结束。

### 12.4 Sitemap / Robots 上线检查

- production `robots.txt` 允许应公开页面并引用 production sitemap；
- sitemap 只含 12 个实际 `PUBLISHED` 核心 URL 与以后真实启用页面；
- Preview、draft、withdrawn、平台默认域名和 Legacy URL 不进入 sitemap；
- 每个页面 canonical 与 hreflang 对应正确；
- 上线后抓取实际响应，不能只检查源码配置；
- 回滚时同步验证旧部署的索引边界，避免两个站同时声明 canonical。

---

## 13. Environment Variables / Secrets

| 环境 | 规则 |
|---|---|
| Local | 只使用开发凭据或无第三方 fixture；忽略本地值 |
| Preview | 使用独立最小权限凭据，不写 production 数据 |
| Production | 只有正式启用功能所需 secret；最小权限、可轮换、可撤销 |

共同规则：

- 仓库只提交示例名称、用途、是否必需和环境范围；
- server-only secret 不进入客户端前缀、HTML、source map、日志或错误响应；
- 未启用 Contact 时不要求 Airtable / CRM secret；
- 从 Legacy 迁移 secret 必须视为新接入并重新授权，不能复制 `.env.local`；
- 切换和回滚 runbook 记录“变量是否存在及负责人”，不记录值；
- production promotion 前执行必需变量 fail-closed 检查。

---

## 14. Cutover Runbook

### 14.1 阶段 0 — 事实补齐

- 确认当前生产域名、平台、commit、production branch、DNS、TLS 与 owner；
- 确认旧站访问量、重要 URL / hash、backlinks 与 `/api/create` 使用情况；
- 确认平台账户、费用、权限、canonical host、Form 决策和 rollback owner；
- 记录旧部署与 DNS 快照。

### 14.2 阶段 1 — 新站 Preview

- 在选定平台建立隔离 Preview；
- 完成 12 个双语页面与内容门禁；
- 不连接 production Form 数据；
- 保持 Preview noindex / access control；
- 每个 Preview 绑定 commit SHA。

### 14.3 阶段 2 — 验收

```text
Content truth / bilingual
→ SEO / metadata / canonical / hreflang
→ Visual Quality Gate / Design in Browser
→ Responsive / Accessibility / reduced-motion
→ Resident degradation / asset failure
→ Performance / security / environment
→ Migration redirects / hash compatibility
```

任何阻塞门禁失败都退回 Preview，不为了排期降低 Node 7 / 8 标准。

### 14.4 阶段 3 — Production Cutover

- 冻结切换窗口内的内容与代码；
- 确认 production deployment、rollback deployment 与执行权限；
- 提升已验收的 immutable deployment；
- 更新 canonical domain / DNS；
- 验证 HTTPS、apex / www redirect、12 个页面、404、root language、robots、sitemap 与静态资产；
- 若 Contact 启用，执行不暴露个人数据的最小 production smoke test；
- 记录切换时间与 deployment id。

### 14.5 阶段 4 — 监控

- 监控 4xx / 5xx、route、asset、JS error、Core Web Vitals、DNS / TLS 与 Form；
- 抽查中文 / 英文 canonical、hreflang、social preview 与搜索抓取；
- 检查旧 URL / hash 访问和 redirect 结果；
- 不默认加入会触发 Cookie / Privacy 的 Analytics；若使用，必须先通过内容治理门禁。

### 14.6 阶段 5 — Rollback Window

- rollback window 内保留旧部署、旧配置、旧 DNS 值与执行权限；
- 触发条件包括核心路由不可用、错误 canonical / robots、大面积视觉或响应式失败、严重性能回退、数据泄露或 Form 错投；
- 触发后优先恢复已知良好 deployment / domain 指向，停止新 Form 写入并保留事故证据；
- 修复只能回到 Preview 重新通过完整门禁。

### 14.7 阶段 6 — Legacy Archive

- rollback window 结束且生产稳定后，记录旧站停止服务日期；
- 保留 Legacy Git tag / commit、配置名称、部署记录、迁移矩阵与资产权利记录；
- 将 `legacy/` 标记为只读归档来源；
- 不在该阶段自动删除旧站目录、历史分支或旧部署。

---

## 15. `OPEN_DECISION`

### 阻塞 production cutover

1. 根 `/` 使用固定 `/zh`，还是仅依据 `Accept-Language` 并 fallback `/zh`；禁止 IP 地理判断；
2. 最终部署平台选择 Vercel 还是 Cloudflare，以及对应账户、费用、区域与权限；
3. 当前真实 production 域名、平台、线上 commit、DNS provider 与 deployment owner；
4. canonical host 采用 apex 还是 `www`；
5. `main` 何时、以何种 reviewed promotion 接收 `New`，何时成为 GitHub default 与 production branch；
6. 当前旧站是否仍有真实流量、backlinks、重要 hash 与 `/api/create` 调用；
7. Contact / Participation 是否首发启用；如启用，其接收人、数据治理、Privacy / Legal 与接收服务；
8. 12 个核心页面的产品事实分别由谁担任 Fact Owner 与 Publish Approver；
9. cutover window、rollback window 长度、rollback owner 与明确触发阈值。

### 不阻塞核心 12 页继续进入后续开发计划

- `#universe`、`#join` 的最终兼容映射；
- Analytics / Cookie 是否启用；默认不启用；
- 大型媒体未来使用哪一种对象存储 / CDN；当前无正式大型资产；
- rollback window 结束后是否移出 `legacy/` 或删除历史分支；默认保留，后续单独审核。

---

## 16. Node 9 统一冲突检查

### 16.1 三份组成文档互检

| 检查面 | 结果 | 说明 |
|---|---|---|
| 技术架构 ↔ 内容管理 | `NO_CONFLICT` | SSG-first 页面只消费 schema 校验且 `PUBLISHED` 的 repository content；Draft 通过隔离 Preview，不要求全站 SSR |
| 技术架构 ↔ Legacy 迁移 | `NO_CONFLICT` | 新应用位于根目录，Legacy 保持独立；React/Vite/OGL/Airtable 不被默认继承 |
| 内容管理 ↔ Legacy 文案 | `NO_CONFLICT` | Legacy 文案默认 `DRAFT / REWRITE`，必须重新绑定来源并完成双语审核 |
| 内容管理 ↔ SEO | `NO_CONFLICT` | metadata、canonical、hreflang、sitemap 与正文共享 `pageId` 和发布状态 |
| 部署 ↔ Preview / Draft | `NO_CONFLICT` | Preview noindex、secret 与 production 隔离；Preview 通过不等于 production approval |
| 部署 ↔ 分支治理 | `NO_CONFLICT` | 推荐最终 `main` 为 default / production，但本轮不操作；`New` 与历史分支保留可恢复路径 |
| Design in Browser ↔ 架构 | `NO_CONFLICT` | 页面 Section 所有权、CSS Modules、局部 Client Islands 与 PR Preview 支持快速视觉迭代 |
| Resident degradation ↔ 性能 / SEO | `NO_CONFLICT` | 语义内容服务端输出，高级视觉按需加载、可关闭、失败不影响内容和索引 |
| Form ↔ Privacy / Legal | `NO_CONFLICT` | API 仅保留条件式边界；业务与法律条件未满足前不启用 |

### 16.2 Node 1–8 冲突检查

未发现 Node 9 三份组成文档与 Node 1–8 的实质冲突：

- Website 仍是公开表达与入口，不成为 Eterna 或产品上位事实源；
- 6 个页面组、12 个双语页面、Node 6 页面职责与 URL 层级保持不变；
- Node 7 `Living Precision`、Visual Quality Gate、Anti-pattern 与 Node 8 DEAD Gate 全部继续有效；
- `Design in Browser` 获得快速路由、局部样式、Preview 与 Motion / Resident 独立边界支持；
- Resident 与高级视觉退出后，内容、SEO、导航、CTA 与品牌结构仍完整；
- 技术架构没有自动引入 Tailwind、shadcn、Bento Grid、SaaS Component Library、generic Hero 或 generic Card system；
- Contact、Privacy、Legal、Research、Developers、Updates 与 Support 仍受 Node 5 / 6 启用条件约束；
- 根 `/` 继续保持 `OPEN_DECISION`，未越权冻结；
- 技术与部署推荐没有反向冻结最终 Layout、Typography、Color、Hero、Resident 或 Motion 参数。

### 16.3 Node 9 收口状态

三份组成文档已经形成一致的推荐方案，但第 15 节仍有 production 阻塞级人工决策。因此 Node 9 当前不得标记 `PASS / FROZEN`。

---

Node 9 当前状态：`IN_PROGRESS / REVIEW_REQUIRED`
