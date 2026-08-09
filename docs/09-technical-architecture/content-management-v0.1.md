# Eterna Website 1.0 Node 9 — 内容管理与发布治理组成文档 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 9 — 内容管理与发布治理组成文档

状态：`PASS / FROZEN`

编制日期：`2026-08-08`（Asia/Shanghai）

> 本文件与 `technical-architecture-v0.1.md`、`migration-plan-v0.1.md` 共同构成 Node 9，不是独立子节点。
> 本文件定义 Website 1.0 的内容源、结构、事实治理、双语配对、发布门禁与资产治理，不把 Website 变成 Eterna 上位事实源，也不选择最终页面视觉。

---

## 1. 决策摘要

### 1.1 推荐方案

Website 1.0 首版采用：

**Repository-managed structured content + build-time schema validation + Git/Preview 审核；满足真实规模与协作条件后，才引入 Headless CMS 的分阶段混合方案。**

具体边界：

- 当前 6 个页面组、12 个双语页面以仓库内 YAML structured content 为正式 Website 内容源；
- 页面文案、metadata、事实状态、发布状态、来源与资产引用从组件中分离；
- 当前页面使用 YAML 的原因是结构明确、支持多行正文、适合人工 diff，并可通过 schema 严格校验；
- Markdown 仅用于未来确有需要的长文、Update、Research 或 Legal 正文；当前核心页面不依赖自由 Markdown 结构；
- MDX 首版不启用，避免内容文件直接执行组件、导入代码或绕过页面职责；
- TypeScript 负责 schema、loader 与类型，不作为正式文案的默认承载格式；
- 不接入 Headless CMS，不建设审批后台，不为未来规模预建重型工作流；
- Draft 通过 Git branch / pull request 与独立 Preview URL 审核，production build 只接收满足门禁的内容。

### 1.2 为什么适合当前 Website

当前事实是：

- 只有 6 个页面组、12 个双语页面；
- 当前为单人维护；
- 内容变化频率低于新闻站、电商站或多编辑团队；
- 每项产品事实需要强来源、审核、双语和失效治理；
- Node 8 采用 `Design in Browser`，需要内容与页面组件可以在本地和 Preview 中快速共同迭代；
- Contact、Updates、Research、Developers、Support 等能力尚未满足启用条件。

因此首版的主要问题不是“非技术编辑如何实时发稿”，而是“未经来源、未经双语审核或已失效的内容不得进入 production”。仓库管理和构建门禁能以最小系统成本解决该问题。

---

## 2. 候选方案评估

| 候选 | 优点 | 风险 / 成本 | 当前结论 |
|---|---|---|---|
| Repository-managed content | 与 Git、代码审核、commit 来源、Preview 和 rollback 天然一致；无需新增账户与服务 | 编辑体验不如 CMS；非技术多人协作有限 | `RECOMMENDED`，符合当前规模与单人维护 |
| Markdown | 长文可读、diff 清楚、生态成熟 | 对复杂页面结构、状态和资产字段约束较弱 | `CONDITIONAL`，未来长文内容使用 |
| MDX | 可混合 Markdown 与组件 | 容易让文案耦合组件、执行逻辑或形成任意页面构图 | `NOT_RECOMMENDED` 作为首版核心内容源 |
| JSON | schema 清楚、解析确定、无 YAML 隐式类型 | 长正文编辑和 diff 可读性较差 | `VIABLE`，适合生成 manifest，不作为主要人工文案格式 |
| YAML | 结构化、多行正文友好、人工 diff 清楚 | 必须禁用危险类型转换并严格校验 | `RECOMMENDED` 作为核心页面内容记录 |
| TypeScript content | 类型反馈直接，可与组件协作 | 内容变成可执行源码，文案与实现边界容易混淆 | `NOT_RECOMMENDED` 作为默认内容源；只用于 schema / loader |
| Headless CMS | 非技术编辑、权限、Draft Preview 和发布工作流成熟 | 新服务、账号、成本、迁移、权限和供应商依赖；当前规模过重 | `DEFERRED`，达到明确触发条件后再评估 |
| 分阶段混合 | 首版轻量，未来可保持 schema 后替换内容 adapter | 需要守住 source boundary，避免双事实源 | `RECOMMENDED STRATEGY` |

“分阶段混合”不表示首版同时维护 repository 与 CMS 两套可写内容源。任一时刻必须只有一个正式可发布 Content Source。

---

## 3. Content Source

### 3.1 首版唯一来源

首版 Website 内容记录建议位于新应用根目录的受控内容区，例如：

```text
content/
├── pages/
│   ├── home/{zh,en}.yaml
│   ├── digital-residents/{zh,en}.yaml
│   ├── products/{zh,en}.yaml
│   ├── product-aftelle/{zh,en}.yaml
│   ├── product-studio/{zh,en}.yaml
│   └── about/{zh,en}.yaml
├── globals/
│   ├── navigation.yaml
│   └── terminology.yaml
└── assets/
    └── manifest.yaml
```

该目录结构是目标职责说明，不是本轮创建网站代码或内容文件的指令。

### 3.2 权威边界

- Content Source 是 Website 对外表达的可发布记录，不是 Eterna 上位事实源；
- Eterna、Universe、数字居民定义仍以 Node 1 固定的 Eterna_Docs 输入为准；
- Studio、Aftelle 与产品状态仍以对应正式产品来源、发布记录或明确批准输入为准；
- Website 内容记录必须引用权威来源，不得用自己的已发布页面反向证明产品事实；
- Website 页面 URL 可以作为公开引用入口，但不能成为新产品能力的原始证据。

---

## 4. Content Schema

### 4.1 页面记录最小字段

| 字段 | 规则 |
|---|---|
| `schemaVersion` | 内容 schema 版本；变更需迁移和兼容检查 |
| `pageId` | 跨语言稳定身份；只能来自当前 allowlist |
| `locale` | 只允许 `zh` 或 `en` |
| `pairedPageId` | 与当前记录相同，用于显式确认双语配对 |
| `route` | 必须与 Node 6 的当前语言规范路径一致 |
| `contentType` | 受控内容类型，不用任意字符串 |
| `factState` | `CURRENT_VERIFIED / IN_DEVELOPMENT / LONG_TERM / RESEARCH` |
| `publicationState` | `DRAFT / REVIEW_REQUIRED / PUBLISHED / WITHDRAWN` |
| `title` | 审核后的页面标题；不能是内部 Section 名称 |
| `metadata` | title、description、canonical identity、social text 与 index policy |
| `sections` | 具有稳定 `sectionId` 的页面内容集合，顺序受 Node 8 冻结边界约束 |
| `sources` | 权威来源数组；包含来源身份、版本 / commit、适用主张与公开授权 |
| `factOwner` | 提供或确认事实的责任身份；当前未确定时不能伪造 |
| `reviewOwner` | 批准公开表达的责任身份 |
| `reviewedAt` | 最近一次完成事实与语言审核的日期 |
| `updatedAt` | 内容实际变更日期，不使用每次 build 时间伪造 |
| `invalidatesOn` | 可选明确失效日期 |
| `invalidationTriggers` | 上位版本、产品状态、入口、授权、Legal 等触发条件 |
| `assetRefs` | 只引用已登记 asset id，不直接散落文件路径或第三方 URL |

### 4.2 `pageId` allowlist

首版固定使用：

| `pageId` | 中文路径 | 英文路径 |
|---|---|---|
| `home` | `/zh` | `/en` |
| `digital-residents` | `/zh/digital-residents` | `/en/digital-residents` |
| `products` | `/zh/products` | `/en/products` |
| `product-aftelle` | `/zh/products/aftelle` | `/en/products/aftelle` |
| `product-studio` | `/zh/products/studio` | `/en/products/studio` |
| `about` | `/zh/about` | `/en/about` |

新增 `pageId` 必须先满足 Node 6 的内容、责任、双语和启用条件；不得通过增加文件绕过 Sitemap 决策。

### 4.3 内容类型

允许的正式类型：

- `ETERNA_ROOT_EXPRESSION`；
- `DIGITAL_RESIDENT`；
- `PRODUCT_COLLECTION`；
- `PRODUCT`；
- `ABOUT_PROJECT`；
- 条件满足后才允许的 `PROJECT_UPDATE / RESEARCH / CONTACT / LEGAL_PRIVACY`。

内容类型描述事实职责，不自动生成页面 Layout、Hero、Card 或组件。

### 4.4 主张与来源

- 一个页面可以包含多种 `factState`，关键 Section 或关键主张必须能单独标明状态与来源；
- `sources` 至少记录 repository / document、version 或 commit、适用范围、核对日期与公开授权状态；
- URL、聊天记录、Legacy 文案或 Website 自身页面不能单独作为产品定义权威来源；
- 来源失效、无法确认或被替代时，关联主张不得继续保持 `CURRENT_VERIFIED`；
- source field 存在不等于审核通过，必须同时满足来源有效性与 `reviewOwner` 批准。

---

## 5. 事实状态与发布生命周期

### 5.1 事实状态

| 状态 | 允许内容 | 发布边界 |
|---|---|---|
| `CURRENT_VERIFIED` | 当前有效且有来源支持的定义、职责、状态或入口 | 必须有当前来源、适用时间和公开审核 |
| `IN_DEVELOPMENT` | 经批准公开的产品级开发状态 | 不得包含内部 Stage、技术债、未冻结方案或虚假日期 |
| `LONG_TERM` | 长期使命、方向、North Star 或 Universe 拓扑 | 必须与当前能力和产品入口清楚分隔 |
| `RESEARCH` | 经批准公开、仍不确定的研究探索 | 不得包装为产品承诺或已验证能力 |

### 5.2 发布生命周期

| 状态 | 是否进入 production | 规则 |
|---|---:|---|
| `DRAFT` | 否 | 可进入受控 Preview，不得索引或进入 sitemap |
| `REVIEW_REQUIRED` | 否 | 来源、事实、双语、公开范围或权利仍待审核 |
| `PUBLISHED` | 是 | 只有全部 production 门禁通过后可构建 |
| `WITHDRAWN` | 否 | 从当前路由、metadata、sitemap 与内部链接中撤出；必要时按迁移策略返回合适状态或替代路径 |

事实状态和发布生命周期是两个维度。`CURRENT_VERIFIED` 的草稿仍不能发布；`LONG_TERM` 在准确标明长期性质并完成审核后可以发布。

---

## 6. `/zh` / `/en` 双语配对

1. 每个 `pageId` 必须恰好对应一份中文和一份英文记录；
2. 两份记录必须具有相同 Section 身份集合、事实状态、来源适用范围、产品职责和 CTA 可用性；
3. 标题、句式、术语解释与段落长度可以自然本地化，不要求逐句直译；
4. 日期、状态、产品能力、来源和法律意义不得因本地化改变；
5. 任一语言仍为 `DRAFT`、`REVIEW_REQUIRED` 或 `WITHDRAWN` 时，配对页面不得以完整 production 页面发布；
6. 上位事实或产品状态变化时，两份记录作为一个 review unit 进入复核；
7. 禁止自动机器翻译成为正式内容；机器工具只能辅助草稿，最终必须完成人工事实和语言审核；
8. 禁止以另一语言正文、Legacy 旧译文或运行时自动翻译填补缺失页面。

术语表用于约束核心术语的一致性，但不能代替自然本地化和逐页人工审核。

### 6.1 语言入口与切换冻结规则

- Website 1.0 首版只支持中文 `/zh` 与 English `/en`；
- 根 `/` 确定性进入 `/zh`，不根据 `Accept-Language` 自动判断；
- 禁止使用 IP 地理位置判断语言；
- Header 提供明确的 `中 / EN` 手动切换入口；
- 切换必须根据稳定 `pageId` 进入当前页面的对应语言版本，例如 `/zh/products/aftelle` 与 `/en/products/aftelle` 互相切换，不返回 Home；
- URL 是当前语言的事实来源，内容加载不得用 localStorage、Cookie 或运行时推断覆盖 URL；
- 语言切换入口的最终视觉样式、尺寸和响应式表现属于 `Design in Browser`，不在 Node 9 冻结；
- 后续只有出现真实国际用户需求后，才重新评估自动语言偏好。

---

## 7. Build 发布门禁

Production build 必须 fail closed。至少验证：

1. 12 个核心页面记录全部存在，`pageId`、locale 与 route 唯一；
2. 中文和英文形成完整配对；
3. production 只消费 `PUBLISHED` 内容；
4. `WITHDRAWN`、`DRAFT`、`REVIEW_REQUIRED` 不进入页面、metadata、sitemap 或内部导航；
5. 所有关键主张具有有效来源，来源版本、commit 或批准记录不为空；
6. `reviewOwner`、`reviewedAt`、`updatedAt` 与失效触发条件满足 schema；
7. metadata、canonical、hreflang 与 route 一致；
8. CTA 目标存在、语言匹配且业务能力真实启用；
9. asset id 存在且权利 / 审核状态允许 production 使用；
10. Contact / Privacy / Legal 的条件关系没有被绕过；
11. Section 身份与 Node 8 已冻结顺序没有被内容文件静默改变；
12. 不存在机器翻译占位、内部 Stage、假入口或 `Coming soon` 空壳内容。

schema 校验通过不代表内容事实正确。Production promotion 仍需要内容人工审核与浏览器人工审核。

---

## 8. Draft Preview

### 8.1 首版方式

- Draft 通过专用 branch / pull request 进入独立 Preview deployment；
- Preview 可以读取 `DRAFT` 与 `REVIEW_REQUIRED` 内容，但必须明确显示非生产审核环境；
- Preview 默认 `noindex`，并通过响应头 / 平台策略防止索引；
- Preview URL 不作为权威来源，也不能被加入 production sitemap；
- Preview secret 与 production secret 隔离；当前内容预览不需要 production 数据或外部 CMS；
- 审核覆盖中文、英文、Desktop、Tablet、Mobile、reduced-motion、无 Resident 和资产失败状态。

### 8.2 未来 CMS 条件

只有满足第 12 节 CMS 触发条件后，才评估 CMS Draft Mode、受授权 SSR preview 或 webhook rebuild。不得为尚未存在的编辑规模提前把 production 页面改为 request-time SSR。

---

## 9. 图片、视频与 Social Asset 治理

### 9.1 Asset manifest 最小字段

- `assetId`；
- 类型：image / video / poster / social / 3d / other；
- source file / source URL；
- creator / rights holder；
- license / permission evidence；
- allowed usage、territory、expiry；
- 中文 / 英文适用范围；
- page / section purpose；
- intrinsic size、aspect ratio、focal point 与 variants；
- alt / caption / transcript；
- fallback；
- checksum；
- `DRAFT / REVIEW_REQUIRED / PUBLISHED / WITHDRAWN`；
- reviewed / updated date。

### 9.2 处理规则

- 当前没有已批准的正式图片、视频、字体、3D 或品牌 master，不能把占位目录当成资产；
- 小型、稳定、权利清楚的图片可进入仓库；大型视频与未来 3D 优先对象存储 / CDN，避免扩大 Git 历史；
- 原始 master 与发布衍生文件分离，不重复压缩 master；
- social asset 按页面与语言审核，不能用错误语言、假界面或未经批准 Resident 视觉；
- 图片必须有正确 alt 策略；视频必须有 poster、字幕 / transcript、reduced-motion 与失败 fallback；
- AI 生成或第三方素材也必须记录来源、权利、允许用途与人工视觉审核；不得因“可生成”自动获得发布资格；
- Asset 被撤回时，引用页面必须 fail closed 或使用已审核 fallback，不能保留破损或无权内容。

---

## 10. Contact / Privacy / Legal 启用条件

### 10.1 Contact / Participation

Website 1.0 首版默认不启用 Contact / Participation 页面、入口、表单或 API，也不创建空页面、假入口或 `Coming soon`。

未来只有以下条件全部成立后才能发布入口或 API：

- 存在真实公开联系方式或接收人；
- 有响应责任、处理时间与停止接收机制；
- 字段满足最小收集；
- purpose allowlist、服务端校验、防滥用和错误恢复成立；
- 数据接收方、第三方处理者、保留期和删除路径明确；
- 中文与英文告知和结果状态通过审核；
- Preview 不写入 production 数据；
- 适用 Privacy / Legal 已获授权并与真实数据流一致。

N5-GAP-02 未解决前，Contact 能力保留为架构边界，不显示假地址、假表单或无人处理入口。

### 10.2 Privacy / Legal

- 在公开收集任何个人信息前必须启用；
- 内容必须来自经授权的法律与数据治理输入；
- 必须覆盖实际字段、目的、接收方、第三方、保留 / 删除和用户权利；
- 数据流或供应商变化会触发双语复核；
- 不用 Legacy 表单 note、模板法律文本或营销文案替代正式告知；
- 未发生个人信息收集时，不为制造企业规模创建空 Privacy / Legal 页面。

### 10.3 Analytics / Cookie

- Website 1.0 首版默认不启用 Analytics；
- 没有真实、获批的测量需求时不加入追踪 SDK、像素或同类第三方脚本；
- 没有会触发 Cookie 告知或同意要求的真实功能时，不设置非必要 Cookie，也不显示无意义 Cookie banner；
- 未来启用 Analytics / Cookie 时，作为 `FUTURE_DECISION` 重新审核数据、用途、保留、第三方、性能与 Privacy / Legal 影响。

---

## 11. 编辑、审核与发布责任

当前单人维护不等于取消角色分离。每次变更至少需要在记录或 PR 中明确：

- Author：编写 Website 表达；
- Fact Owner：确认来源与产品事实；
- Language Reviewer：确认中文 / 英文自然且事实一致；
- Publish Approver：批准公开范围与 production promotion。

同一个人可以在当前阶段承担多个角色，但不得省略角色结果、来源证据或审核记录。未来多人协作时，可在不改变 schema 语义的前提下把这些角色映射到 CMS 权限。

---

## 12. Headless CMS 引入触发条件

只有出现可证明的持续需求时才重新评估 CMS，例如：

- 多名非工程编辑需要并行工作；
- 发布频率使 Git review 成为明显瓶颈；
- Updates / Research / Support 形成持续内容流；
- 需要细粒度角色权限、排期发布或合规审计；
- 资产规模需要 DAM；
- 多语言数量明显增加；
- 内容必须脱离代码 release 独立发布。

引入 CMS 时必须：

- 保持相同的 `pageId`、locale pair、事实状态、发布状态、来源和失效语义；
- 通过 content adapter 隔离 CMS SDK，不让页面组件直接绑定供应商模型；
- 一次迁移后只保留一个可写权威 Content Source；
- 重新审核 Preview、webhook、缓存、rollback、export 与供应商退出路径。

CMS 产品选择当前为 `DEFERRED`，不构成 Website 1.0 的阻塞项。

---

## 13. 禁止事项

- 不把 Website 变成 Eterna 上位事实源；
- 不把 Website 已发布文案反向作为产品定义证据；
- 不把自动机器翻译作为正式内容；
- 不发布没有来源、版本或批准记录的产品文案；
- 不从 Legacy 直接复制 Aftelle 功能、产品进展或越权愿景；
- 不允许内容文件导入任意组件并绕过页面职责；
- 不为 CMS 而 CMS；
- 不为未来栏目创建空 route、空内容或 `Coming soon`；
- 不让 `DRAFT / REVIEW_REQUIRED / WITHDRAWN` 静默进入 production；
- 不让资产路径、版权状态和替代内容散落在组件中无人治理。

---

## 14. 冻结结论与非阻塞后续输入

本组成文档正式冻结：

- repository-managed YAML 是首版 Content Source；
- Git / Preview review 与 build-time schema validation 是首版发布治理；
- `/zh` 与 `/en` 通过稳定 `pageId` 配对，根 `/` 确定性进入 `/zh`；
- Contact / Participation 首版默认不启用；
- Privacy / Legal 在真实收集个人信息前启用；
- Analytics / Cookie 首版默认不启用；
- Headless CMS 只在真实规模触发后重新评估。

以下不构成 Node 9 阻塞项：

| 输入 | 分类 | 后续处理 |
|---|---|---|
| 当前产品事实的具体 Fact Owner 与 Publish Approver 名单 | `RELEASE_RUNBOOK_INPUT` | 对应内容进入 production 前填写并审核 |
| Contact 接收人、字段、处理者、保留 / 删除与 Legal / Privacy | `FUTURE_DECISION` | 只有未来决定启用 Contact 时处理 |
| Analytics / Cookie 产品与治理方案 | `FUTURE_DECISION` | 当前默认不启用，出现真实需求后重新审核 |

内容管理、双语、SEO、Preview 与发布门禁之间未发现新的阻塞级冲突。本组成文档正式标记为 `PASS / FROZEN`。

---

Node 9 当前状态：`PASS / FROZEN`
