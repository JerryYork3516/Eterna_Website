# Eterna Website 1.0 信息架构 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 6 全站信息架构

状态：`PASS`

编制日期：`2026-08-07`（Asia/Shanghai）

> 本文件把 Node 5 需求整理为 Website 1.0 的网站骨架、页面关系与扩展规则。
> 本文件不设计视觉、页面布局或组件，不撰写最终营销文案，不选择技术栈、CMS、Hosting 或 Analytics，也不开始 Node 7。

---

## 1. 设计依据

### 1.1 输入优先级

1. Node 1：Eterna 上位事实与 Website 冻结定位；
2. Node 5：Website 1.0 用户、内容、治理和质量需求；
3. Node 3：Legacy 审计与迁移边界；
4. Node 4：只采用少而稳定、分层扩展和 Footer 分担低频入口的方法；
5. Legacy：只作为现状与参考，不作为目标结构来源。

Node 4 已完成人工审核，状态为 `PASS`；Node 5 已完成人工审核，状态为 `PASS`。

### 1.2 架构判断

- Website 是 Eterna 的长期主站，但 Website 1.0 只建立当前有正式内容支撑的最小根结构。
- Eterna 和数字居民位于产品之上；Aftelle、Studio 或未来产品不得取代 Eterna 根入口。
- 首页负责建立认识和指向深层内容，不负责完整解释 Eterna Universe。
- Research、Developers、Updates、News、Support 等未来类别只有满足真实内容、实际需求、责任人和审核机制后才进入公开结构。
- “About Eterna / 关于 Eterna”比成熟公司语境下的 “Company”更符合当前项目事实。
- 旧站 5 个 hash Section 不作为 Website 1.0 的站点骨架。

---

## 2. Website 1.0 Sitemap

### 2.1 当前规模

Website 1.0 采用 **4 个一级页面组 + 2 个产品二级页面组**：

- 一级：Home、Digital Residents、Products、About Eterna；
- 二级：Aftelle、Studio；
- 合计 6 个公开内容页面组，每组具有中文和英文正式版本；
- 根 `/` 只承担进入合适语言版本的入口职责，不是独立的语言选择页面，也不作为第三套重复内容页面。

### 2.2 树状结构

```text
/
├── /zh                         Home / 首页
│   ├── /zh/digital-residents   Digital Residents / 数字居民
│   ├── /zh/products            Products / 产品
│   │   ├── /zh/products/aftelle
│   │   └── /zh/products/studio
│   └── /zh/about               About Eterna / 关于 Eterna
└── /en                         Home
    ├── /en/digital-residents   Digital Residents
    ├── /en/products            Products
    │   ├── /en/products/aftelle
    │   └── /en/products/studio
    └── /en/about               About Eterna
```

### 2.3 各页面的内容边界

| 页面组 | 当前职责 | 不承担 |
| --- | --- | --- |
| Home | 用最少内容帮助公众理解 Eterna、数字居民与当前产品，并提供继续探索路径 | 完整 Universe 说明、全部产品详情、公司资料目录或动态信息流 |
| Digital Residents | 公开解释数字居民的正式核心定义、连续性原则及其与 Eterna 的关系 | 重写上位定义、展开完整内部规范或把产品能力混入居民定义 |
| Products | 说明当前可公开的产品集合、共同服务对象与产品间边界 | 把长期 Universe 拓扑平铺为已上线产品矩阵 |
| Aftelle | 在现有高层正式边界和经验证产品状态范围内介绍 Aftelle | 猜测 Product North Star、功能清单、可用性或体验入口 |
| Studio | 依据 Studio North Star 和经验证产品状态介绍 Studio | 把 Studio 表达为 Resident 本体、长期运行环境或完整 Universe |
| About Eterna | 解释 Eterna 项目性质、使命和经批准的公开项目事实 | 虚构法定主体、团队、地点、历史、融资或成熟公司组织 |

Aftelle 虽缺少独立 Product North Star，但 Node 1 已确认其高层职责边界，因此可以形成受限的产品页面；页面只能发布已有正式来源支持的内容。若上线前无法取得可公开的当前状态证据，不得用功能承诺、占位内容或虚假 CTA 填充。

---

## 3. 主导航

### 3.1 建议结构

| 中文 | English | 目标 |
| --- | --- | --- |
| 数字居民 | Digital Residents | 对应概念页 |
| 产品 | Products | 对应产品总览 |
| 关于 Eterna | About | 对应项目介绍 |

Home 通过 Eterna 品牌入口返回，不额外占用主导航项。Aftelle 和 Studio 归入 Products 层级，不分别占用主导航；当前不设置 Login、Download、Try now 或 Buy 入口。

### 3.2 Header 职责

Header 只负责：

- 识别 Eterna 并返回当前语言的 Home；
- 提供 3 个稳定的一级内容入口；
- 提供中文与英文对应页面之间的语言切换能力；
- 在存在真实、可公开且可完成的动作前，不制造产品或账户 CTA。

Header 不负责展示完整 Sitemap、未来栏目、产品状态清单或公司低频信息。本节点不决定 Header 的视觉、交互形式或移动端布局。

---

## 4. Footer 职责

Footer 负责提供比 Header 更完整但仍真实的网站地图：

- Home、Digital Residents、Products、About Eterna；
- Aftelle、Studio 两个产品直达入口；
- 当前语言与另一正式语言的对应关系；
- 只有满足启用条件后才出现的 Contact / Participation 与 Privacy / Legal 入口。

低频内容规则：

| 内容 | 当前处理 |
| --- | --- |
| Aftelle、Studio 直达入口 | 可进入 Footer，主导航仍只保留 Products |
| Contact / Participation | GAP-02 解决、接收责任明确后进入 Footer；相关页面可从适当内容提供上下文入口 |
| Privacy / Legal | 实际收集个人信息前必须发布并进入 Footer；未触发时不创建空页面 |
| Research、Developers、Updates、Support | 当前不进入 Footer；只有正式启用后才加入 |

Footer 不是把未来栏目名称全部预先列出的占位区，也不用于制造公司规模感。

---

## 5. URL 规则

### 5.1 基本规则

1. 中文和英文均使用明确语言前缀：`/zh` 与 `/en`；两种语言地位对等。
2. 同一内容的中英文使用相同 ASCII slug，仅语言前缀不同。
3. slug 使用小写、语义明确的英文词和连字符，不使用内部缩写、版本号或 Stage 编号。
4. 产品统一挂在 `/{lang}/products/{product}`，不为每个产品建立新的根分类。
5. 除语言首页外不建立不必要的中间层；当前最大内容深度为产品详情层。
6. hash 只可用于页面内辅助定位，不作为独立页面、语言版本或正式内容身份。
7. 一个公开内容只有一个规范地址；尾部斜杠等规范化行为由后续技术架构落实，但不得产生多套可索引副本。

### 5.2 根路径与语言入口

`/` 只负责进入合适的 `/zh` 或 `/en` 正式版本，不是独立的语言选择页面，也不承载第三份重复正文。具体采用 redirect、rewrite、语言检测还是默认语言呈现，属于 Node 9 技术实现，本节点不作决定。

语言切换必须优先进入同一内容的另一语言版本，例如：

```text
/zh/products/studio <-> /en/products/studio
```

不得把切换语言默认跳回首页，也不得用未经审核的机器翻译临时生成对应 URL 内容。

### 5.3 未来 URL 挂接位置

以下只定义满足启用条件后的自然位置，不代表 Website 1.0 当前创建这些页面：

```text
/{lang}/products/{new-product}
/{lang}/research
/{lang}/developers
/{lang}/updates
/{lang}/updates/{entry}
/{lang}/support
/{lang}/contact
/{lang}/privacy
```

正式公司信息首先扩展 `/{lang}/about`；只有内容规模与真实职责证明需要时，才在其下建立更细层级。

---

## 6. 页面类型

页面类型只定义信息职责，不定义 Hero、Section、卡片、布局或组件。

| 页面类型 | 当前实例 | 必须回答的问题 |
| --- | --- | --- |
| Homepage | Home | Eterna 是什么、数字居民为何居于中心、当前有哪些可信产品入口、下一步可以去哪里 |
| Concept / Topic Page | Digital Residents | 这个核心概念是什么、不是什么、与 Eterna 和产品是什么关系、依据来自哪里 |
| Collection / Index Page | Products | 当前有哪些可公开产品、分别承担什么职责、如何进入产品详情 |
| Product Overview | Aftelle、Studio | 产品服务什么对象、职责边界是什么、当前状态与可验证能力是什么、哪些是长期方向 |
| About / Project Information | About Eterna | Eterna 当前是什么项目、使命和公开身份事实是什么、哪些公司信息仍未确定 |

条件式页面类型：

- Contact / Participation：只有公开联系方式、接收责任、隐私告知和处理链路全部成立后启用；
- Privacy / Legal：在实际收集个人信息前启用；
- Update Index / Detail：只有形成持续、可审核、可失效的正式动态来源后启用。

条件未满足时，不创建空页面、占位页面或 “Coming soon”。

---

## 7. 页面关系

1. Home 是全站认识入口，指向 Digital Residents、Products 和 About Eterna。
2. Digital Residents 解释所有产品共同服务的中心主体，并可指向 Products；产品页面不能反向改写该定义。
3. Products 是 Aftelle、Studio 与未来产品的集合入口；产品详情不直接成为新的品牌根入口。
4. Aftelle 与 Studio 页面应能回到 Products，并在需要时引用 Digital Residents 的正式概念页。
5. About Eterna 只承载经批准的项目与公开身份事实；联系能力启用后可以从此处提供上下文入口。
6. Footer 提供当前公开结构的完整辅助地图，不展示尚未启用的未来类别。

该关系定义信息流向，不规定页面布局、区块顺序、交互动效或面包屑实现。

---

## 8. 中英文结构原则

1. 6 个当前页面组必须具有一一对应的中文和英文正式版本。
2. 页面层级、产品归属、事实状态和规范地址关系在两种语言中一致。
3. 导航与页面名称可以做自然本地化，但不得改变内容职责或产品边界。
4. 核心事实、产品状态、日期、来源和行动可用性必须同步复核。
5. 任一语言尚未完成审核时，不得用机器翻译、旧版本或另一语言正文冒充正式对应内容。
6. 语言选择器应指向当前页面的已审核对应版本；具体交互与实现留给 Node 8、Node 9。

---

## 9. 长期扩展规则

| 新增内容 | 挂接规则 | 启用条件 |
| --- | --- | --- |
| 新产品 | 加入 Products，并使用 `/{lang}/products/{product}` | 正式产品定义、可公开状态、责任人与双语内容齐备 |
| Research | 新建 `/{lang}/research`，是否进入主导航按内容规模重新审议 | 有经批准公开的研究内容和持续维护责任 |
| Developers | 新建 `/{lang}/developers` | 有真实开发者资源、稳定入口与维护责任 |
| Updates / News | 新建 `/{lang}/updates` 及详情 | 有持续、可审核、可失效的公开动态来源 |
| Support | 新建 `/{lang}/support` | 有正式支持范围、处理责任与更新机制 |
| 正式公司信息 | 优先扩展 About Eterna，必要时再建立下层内容 | 法定主体、公开名称和相应事实得到批准 |
| Contact / Participation | 新建 `/{lang}/contact` 或在真实场景中提供入口 | GAP-02、接收责任、隐私和处理链路全部解决 |
| Privacy / Legal | 使用低频独立地址并进入 Footer | 形成适用、获授权且与实际处理一致的正式文本 |

新增类别不会自动进入主导航。每次扩展都必须先证明：内容真实、用户有需要、有人负责、可以持续更新，而且不会改变 Eterna 根定位。

---

## 10. 当前暂不建立的栏目及原因

| 暂不建立 | 原因 |
| --- | --- |
| Research | 当前没有已确认可公开、可持续维护的正式研究内容集合 |
| Developers | 当前没有已确认的公开开发者资源与稳定维护入口 |
| Updates / Progress / News | Node 5 将其列为非阻塞能力；当前没有持续、已审核的公开动态来源 |
| Support | 当前没有正式支持范围、处理责任或更新机制 |
| Company / Corporate | Eterna 当前是项目阶段，GAP-01 未解决；About Eterna 已能承载真实项目信息 |
| Leadership / Team | 没有正式公开团队事实来源 |
| Careers | 没有正式招聘内容和运营责任 |
| Press / Media | 没有正式媒体资料与联系机制 |
| Investors / Investor Relations | 没有对应主体、事实或业务需求 |
| Partners | 没有可公开的正式合作体系内容 |
| Contact 独立页 | GAP-02 与接收责任尚未解决；先保留挂接规则，不发布虚假入口 |
| Privacy / Legal 独立页 | 当前尚未确认公开个人信息收集方案；一旦收集，发布前必须建立 |
| Account / Login | Website 1.0 不建设统一账户系统，也不创建无功能入口 |
| 站内搜索 | 当前内容规模不足以证明需要，Node 5 将其列为条件式能力 |

以上栏目不是永久禁止；启用时必须按第 9 节重新验证，不得仅为制造“大公司官网感”而建立。

---

Node 6 信息架构状态：`PASS`
