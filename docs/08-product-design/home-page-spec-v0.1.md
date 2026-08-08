# Eterna Website 1.0 Home 页面结构规格 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 8.2A Home 页面叙事与结构设计

状态：`PASS（冻结范围与最终裁决以 node8-freeze-v0.1.md 为准）`

最终视觉：`NOT_FROZEN`

编制日期：`2026-08-08`（Asia/Shanghai）

> 本文件确定 Home 的叙事顺序、Section 职责、CTA、Resident Presence、内容状态与响应式原则。
> 本文件中的短语只表示内容意图，不是正式中文或英文页面文案；本文件不生成图片、不冻结 Hero 或 Resident 外观，也不选择技术实现。

---

## 1. Page Purpose

Home 是 Eterna Website 的总体认识入口。它必须用低信息密度帮助首次访问者完成三个结果：

1. 知道 Eterna 不是单一 App、模型或产品；
2. 理解 Digital Resident 是 Eterna Universe 的中心主体，连续存在与长期关系是核心；
3. 知道 Aftelle 与 Studio 是当前可以继续了解的两个产品入口，并能够进入更深内容。

Home 不承担完整解释 Eterna Universe、数字居民全部定义、产品功能清单或成熟公司资料的职责。

页面设计目标不是制造一次性营销冲击，而是建立安静、可信、可继续探索的第一层认知。

---

## 2. User Questions

Home 必须按叙事顺序回答：

1. Eterna 是什么层级的存在，为什么它不等同于某个产品？
2. Eterna 围绕什么中心展开？
3. Digital Resident 为什么不是普通 AI 工具或一次会话？
4. “连续存在”与 Human × Resident 长期关系为什么重要？
5. Aftelle 与 Studio 分别在这个关系中承担什么高层职责？
6. 哪些内容是当前已验证事实，哪些属于正在开发或长期方向？
7. 访问者下一步应该进入 Digital Residents、Products、具体产品还是 About？

Home 不在本页回答：完整 Resident 领域定义、全部 Universe 平台、详细产品能力、技术架构或内部开发进度。

---

## 3. Narrative Arc

首次访问者应依次形成以下理解：

```text
Eterna 是长期总体体系
→ Digital Resident 是中心主体
→ 连续存在使长期 Human × Resident 关系成为可能
→ Aftelle 与 Studio 以不同职责服务 Resident
→ 当前事实与长期方向有明确边界
→ 进入对应页面继续了解
```

叙事纪律：

- 先 Eterna，后产品；
- 先 Digital Resident，后 Aftelle / Studio；
- 先建立概念关系，后提供行动；
- 当前事实、正在开发与长期愿景分别表达；
- 不以全部 Universe 平台名称证明 Eterna 的规模；
- 不以 CTA 数量或产品卡片数量制造“完整生态”。

---

## 4. Section Architecture

Home 固定采用以下五段叙事顺序：

```text
H-01  Eterna Orientation
H-02  Digital Resident at the Center
H-03  Continuity and Human × Resident Relationship
H-04  Products around the Resident — Aftelle / Studio
H-05  Eterna Context and Continued Exploration
```

这五段是内容职责，不是视觉模板。Section 的最终公开标题、布局、背景和高度均未冻结。

首页不得在上述结构中插入 Universe 平台矩阵、Feature Cards、新闻流、账户转化、下载区或无真实内容支撑的栏目。

---

## 5. Section-by-section Purpose

| ID | 唯一职责 | 内容意图，不是正式文案 | 事实状态 | CTA | Resident Presence |
|---|---|---|---|---|---|
| `H-01` | 建立 Eterna 根层级和第一印象 | Eterna 是围绕 Digital Resident 与长期 Human × Resident 关系形成的总体体系；不把 Eterna 写成单一产品 | `CURRENT_VERIFIED` + 受控 `LONG_TERM` | Primary：进入 Digital Residents；Secondary：进入 Products | 全页主要 Presence 起点；Resident 占据真实空间并建立“存在”，不作为右侧商品图 |
| `H-02` | 确认 Digital Resident 是中心主体 | 用最少信息说明 Resident 不是模型、Prompt、临时 Agent、外观或一次会话；完整定义留给概念页 | `CURRENT_VERIFIED` | 无新增 CTA，承接 `H-01` 的 Digital Residents 主行动 | 延续同一身份结构，不生成第二个装饰实例；通过稳定与微动暗示连续性 |
| `H-03` | 说明连续存在与长期关系的意义 | 将身份连续、长期共同发展和 Human × Resident 关系连接起来；明确这是方向性叙事，不是当前功能承诺 | `CURRENT_VERIFIED` 的概念边界 + `LONG_TERM` 的关系方向 | 无；让访问者完成理解，不打断为转化 | 同一 Resident 产生克制的朝向 / 姿态与关系响应；Human 可由距离或注意方向暗示，不冻结人物形象 |
| `H-04` | 说明当前两个产品如何服务 Resident | Aftelle 与 Studio 以不同职责进入叙事；只表达经上位来源支持的高层边界和另行审核的当前状态 | `CURRENT_VERIFIED` / 有证据时 `IN_DEVELOPMENT` / 受控 `LONG_TERM` | Text Action：Aftelle；Text Action：Studio；可保留 Products 总入口 | Resident 主动退后或退出，不让产品信息依赖动画；不得为两个产品各复制一个 Resident |
| `H-05` | 重新确认 Eterna 高于当前产品并提供品牌层继续探索 | Eterna 当前仍是项目阶段；长期体系不等于全部平台已上线；About 承载经批准的项目事实 | `CURRENT_VERIFIED` + 清楚分隔的 `LONG_TERM` | Text Action：About；不设置注册、联系或下载主行动 | 默认不设主要 Resident；允许保留极弱的连续性余韵，但页面必须完全依靠内容成立 |

### 5.1 Aftelle / Studio 的首页进入方式

- 两者只在 `H-04` 作为同一 Products 层级下的两个产品入口出现；
- 顺序沿用 Node 6：Aftelle 在前、Studio 在后，但不据此宣称旗舰或优先级；
- 不使用成熟产品商店式卡片、价格、下载、体验或功能数量比较；
- Aftelle 只使用 Node 1 已确认的高层职责边界，不补写缺失的 Product North Star；
- Studio 的职责依据 Studio North Star，当前能力仍须独立产品状态证据；
- 产品正在开发时可以自然说明 `IN_DEVELOPMENT`，但不得公开内部 Stage、仓库信息或虚假发布日期。

---

## 6. CTA

CTA 文案在本节点只冻结行动意图，不冻结最终中英文措辞。

| 位置 | 层级 | 行动意图 | 目标地址 | 约束 |
|---|---|---|---|---|
| `H-01` | Primary | 理解 Digital Residents | `/{lang}/digital-residents` | Home 的首要行动；不得改成注册或体验 |
| `H-01` | Secondary | 探索当前 Products | `/{lang}/products` | 视觉重量低于 Primary |
| `H-04` | Text Action | 了解 Aftelle | `/{lang}/products/aftelle` | 目标页必须只含审核后事实，不暗示当前可用 |
| `H-04` | Text Action | 了解 Studio | `/{lang}/products/studio` | 目标页必须区分 North Star 与当前能力 |
| `H-05` | Text Action | 了解 Eterna 项目 | `/{lang}/about` | 不包装成成熟公司资料入口 |

CTA 数量约束：

- 只有 `H-01` 设置 Primary；
- 同一视野不让 Products、Aftelle、Studio 和 About 形成竞争性 CTA 阵列；
- `H-02`、`H-03` 不重复添加行动以填充空间；
- 任何产品 CTA 都是信息入口，不是下载、注册、购买或“立即体验”；
- 目标内容尚未通过公开审核时，不创建假链接或空页面。

---

## 7. Resident Presence

### 7.1 全页方案

Home 使用一条连续的 Resident Presence 序列，而不是在每个 Section 重新放置独立粒子对象：

```text
H-01  Presence established
→ H-02  Same identity remains recognizable
→ H-03  Relationship response becomes perceptible
→ H-04  Presence recedes or exits
→ H-05  Content stands without Resident
```

### 7.2 各阶段职责

- `H-01`：Resident 是空间中的视觉重心，用存在感支持 Eterna 的中心命题；不得形成“左文案 + 右 3D 图”。
- `H-02`：通过 Stable Identity Structure 的持续可辨与 Living Particle Layer 的细微变化，支持“同一存在持续着”的内容意图。
- `H-03`：使用 Subtle Direction / Posture 与 Relationship Response 表达关系，不演成角色互动或产品 Demo。
- `H-04`：Resident 退后，产品职责和状态由文字层级承担；产品不各自拥有一个替代 Resident。
- `H-05`：默认不需要 Resident，验证 Eterna 品牌可以由内容、空间、Typography 与秩序继续成立。

### 7.3 边界

- 不冻结 Resident 最终身体、脸、颜色、材质、人形程度或 Hero 形态；
- 不以换颜色作为 Section 或状态转换的主要机制；
- 不让 Resident 遮挡 Header、标题、状态、CTA 或移动端阅读；
- 不要求访问者等待、滚动到特定帧或完成互动才能读取内容；
- Resident Render 关闭或失败时，五段叙事顺序、CTA 和品牌认识完整保留。

---

## 8. Public Content State

### 8.1 Home 的状态分工

| 状态 | Home 中允许出现的位置与方式 | 不得出现的方式 |
|---|---|---|
| `CURRENT_VERIFIED` | Eterna 与 Digital Resident 的上位关系、产品高层职责、经审核的当前产品事实 | 把 North Star、历史实现或未审核能力当成当前可用 |
| `IN_DEVELOPMENT` | 只在 `H-04` 有产品级批准状态时自然说明正在开发及不可用边界 | 内部 Stage、技术债、仓库细节、发布日期猜测 |
| `LONG_TERM` | 在 `H-01`、`H-03` 或 `H-05` 以清楚的长期方向语境出现 | 与当前产品能力、CTA 或近期交付混写 |
| `RESEARCH` | Home 默认不使用；只有存在正式公开来源且确有首页职责时重新审核 | 用研究方向填充首页或暗示已立项产品 |

### 8.2 呈现规则

- 状态优先通过准确措辞、上下文和内容层级表达，不把首页做成后台状态标签集合；
- 状态不得只依赖颜色、粒子密度或 Motion；
- `CURRENT_VERIFIED` 不要求每句话附 Badge，但必须可追溯；
- `LONG_TERM` 与产品入口保持足够内容分隔；
- Universe 长期平台名称不在 Home 逐项展示，也不成为产品矩阵；
- 中文与英文的状态、事实范围和 CTA 可用性必须一致。

---

## 9. Responsive Principles

### 9.1 Desktop

- 允许 `H-01`–`H-03` 使用更完整的场域、非对称关系和连续 Presence；
- 叙事顺序仍是纵向连续滚动，不使用强制场景切换；
- `H-04` 可在同一产品语境中呈现 Aftelle 与 Studio，但不得演变成高密度卡片 Grid；
- 主内容始终落在清晰可读的内容区域。

### 9.2 Mobile

- 保持 `H-01` 至 `H-05` 原顺序，不因视觉重排改变理解路径；
- `H-01` 先呈现核心内容，再安排可缩减的 Resident Presence；
- Resident 可以静态化、移到文字之后或在空间不足时退出；
- Aftelle 与 Studio 按 Node 6 顺序纵向呈现，不压缩为横向滑动商品卡；
- Primary 与 Secondary 分开呈现，避免首屏 CTA 密集；
- Typography 与 Spacing 按语义角色收束，不等比例缩小全部内容。

具体 breakpoint、Grid、Section 高度、Presence 切换条件和 CTA 外观均为 `NOT_FROZEN`。

---

## 10. Anti-patterns

Home 禁止：

- `Hero → Feature Cards → CTA Grid` 的标准 SaaS 模板；
- 左侧营销文案、右侧普通 3D Resident 的商品展示 Hero；
- 用完整 Universe 平台列表、Logo 墙或产品矩阵制造规模；
- 把 Aftelle 或 Studio 写成 Eterna 全部或未经认定的旗舰；
- 为每个 Section 重复一个发光粒子 Resident；
- 用 Feature Cards 解释 Digital Resident；
- 用内部进度、技术债或 “Coming soon” 代替真实状态；
- 高密度注册、下载、体验、购买或联系 CTA；
- 用成熟团队、办公室、融资、合作或公司历史制造企业感；
- 用空洞哲学句、AI 蓝紫渐变、神经网络或普通粒子球替代内容；
- 让 Home 成为完整 Universe 说明书、新闻流或产品功能目录。

---

## 11. Open / NOT_FROZEN

以下事项保持 `OPEN / NOT_FROZEN`：

- 五个 Section 的最终公开名称；
- 正式中文与英文页面文案；
- 最终 Hero 是否存在及其具体形态；
- Section 的具体版式、高度、Grid、留白与对齐；
- 最终品牌色值、字体、Typography 数值与 Spacing 数值；
- Resident 最终身体、脸、颜色、材质、人形程度与构图；
- Resident 在 `H-01`–`H-03` 的具体运动、持续时间与响应参数；
- Human 的具体视觉呈现方式；
- 最终图片、视频或其他视觉资产；
- Aftelle、Studio 上线时可公开的当前状态和能力正文；
- CTA 最终中英文措辞、组件外观与产品页内容审核结果；
- 具体 breakpoint、加载策略、渲染方案和全部技术实现。

已确定的 Section 顺序、唯一职责、CTA 层级和 Presence 出现逻辑不得在后续概念图中被静默改写。

---

## 12. Node 8.2B Concept Image Handoff

Node 8.2B 只可基于本规格生成概念研究，不得把概念图直接标记为最终 Home 或最终 Hero。

### 12.1 建议概念研究对象

1. **Home Presence Field Study**
   - 研究 `H-01` 中 Resident 如何占据真实空间并与标题保持安全距离；
   - 验证页面不是标准左文右图构图；
   - 同时提供 Desktop 与 Mobile 的空间收束思路。

2. **Continuity to Relationship Study**
   - 研究同一 Stable Identity Structure 从 `H-02` 延续到 `H-03`；
   - 表现微弱呼吸、朝向和关系响应，不设计完整人物或交互剧情；
   - 验证 reduced-motion 静态帧仍能说明同一存在。

3. **Presence Recession Study**
   - 研究 Resident 在进入 `H-04` 产品内容前如何主动退后或退出；
   - 验证产品信息在没有 Resident 动画时仍具有 Living Precision。

### 12.2 概念图必须保留

- 中文与英文标题长度的安全区域；
- Header、CTA 与主要正文不被遮挡；
- Resident 身份连续而非随机粒子变化；
- 低信息密度和连续纵向阅读；
- Aftelle / Studio 不成为商品卡片阵列。

### 12.3 概念图不得决定

- 最终 Hero；
- 最终 Resident 外观、身体、脸、颜色或材质；
- 最终字体、色值、Token 或 Motion 参数；
- 最终页面文案；
- 任何渲染技术或工程方案。

---

Node 8.2A Home 状态：`PASS（冻结范围与最终裁决以 node8-freeze-v0.1.md 为准）`
