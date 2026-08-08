# Eterna Website 1.0 Digital Residents 页面结构规格 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 8.2A Digital Residents 页面叙事与结构设计

状态：`REVIEW_REQUIRED`

编制日期：`2026-08-08`（Asia/Shanghai）

> 本文件确定 Digital Residents 概念页的叙事顺序、Section 职责、CTA、Resident Presence、内容状态与响应式原则。
> 本文件不复制或重写《数字居民定义》，不展开十三层内部规范；所有定义性公开文案仍须从 Node 1 冻结上位输入生成并审核。

---

## 1. Page Purpose

Digital Residents 页面负责用普通访问者可以理解的方式，公开解释数字居民的正式核心定义、连续性原则、边界及其与 Eterna、Human、Studio、Aftelle 的关系。

页面必须让访问者理解：Digital Resident 是跨平台保持身份与连续性的中心主体，不等于模型、Prompt、临时 Agent、工具、工作流、外观、Artifact 或一次会话。

本页不是技术规范、字段字典、十三层说明书、产品功能页或 Resident 创建教程。Website 只做经审核的公开表达，不成为数字居民定义的事实源。

---

## 2. User Questions

页面必须回答：

1. Digital Resident 是什么？
2. 它不是什么？
3. 为什么一个模型、Agent、工具、角色设定、外观或会话不能单独等同于 Resident？
4. “连续性”具体解决什么认知问题，为什么它比一次互动重要？
5. 身份、人格、记忆、关系与成长如何共同参与同一 Resident 的持续存在？
6. Resident 如何在不同平台或承载环境中仍被理解为同一主体？
7. Human × Resident 的长期关系是什么性质？
8. Studio 与 Aftelle 分别如何服务 Resident，它们为什么都不是 Resident 本身？
9. 哪些是正式定义，哪些是长期方向，哪些产品能力仍需当前证据？

本页不回答具体数据结构、Runtime 实现、迁移协议、完整能力层级、创建步骤或产品发布日期。

---

## 3. Narrative Arc

访问者应沿以下顺序建立认知：

```text
Digital Resident 是 Eterna 的中心主体
→ 先明确它是什么
→ 再排除模型 / Agent / 工具 / 外观等错误等同
→ 通过连续性理解“同一存在”
→ 理解身份、人格、记忆、关系与成长的关联
→ 理解跨平台持续不等于复制一个新角色
→ 理解 Human × Resident 的长期关系
→ 理解 Studio / Aftelle 是服务 Resident 的不同产品
```

叙事应从公共概念进入关系与产品，不从技术组件、产品功能或视觉外观反向定义 Resident。

---

## 4. Section Architecture

Digital Residents 页面固定采用以下八段顺序：

```text
DR-01  Concept Orientation
DR-02  What a Digital Resident Is
DR-03  What a Digital Resident Is Not
DR-04  Why Continuity Matters
DR-05  Identity, Personality, Memory, Relationship, Growth
DR-06  Continuity Across Platforms
DR-07  Human × Resident over Time
DR-08  Studio / Aftelle around the Resident
```

Section 名称是内部结构标签，不是最终公开标题。页面不得在这八段之间插入十三层模块清单、技术架构、产品 Demo 或完整 Universe 平台说明。

---

## 5. Section-by-section Purpose

| ID | 唯一职责 | 内容意图，不是正式文案 | 事实状态 | CTA | Resident Presence |
|---|---|---|---|---|---|
| `DR-01` | 建立概念页方向和中心主体地位 | Digital Resident 是 Eterna Universe 的中心主体；本页回答存在、连续性与关系，而不是产品功能 | `CURRENT_VERIFIED` | 无；先建立理解 | 主要 Presence 起点；Resident 作为存在进入场域，不作为 Hero 商品图 |
| `DR-02` | 提供简洁的正向定义框架 | 依据 Node 1 说明跨平台身份与连续性，以及 Resident 作为完整领域主体的边界 | `CURRENT_VERIFIED` | 无 | 延续同一 Stable Identity Structure；不把定义画成部件信息图 |
| `DR-03` | 排除常见错误等同 | 模型、Prompt、临时 Agent、工具、工作流、外观、Artifact、角色卡或一次会话都不能单独构成完整 Resident | `CURRENT_VERIFIED` | 无 | Presence 退后或静止，让文本边界成为主角；不展示 AI 图标拼贴 |
| `DR-04` | 解释连续性为什么是核心 | 区分“同一次输出或会话”与“同一主体跨时间持续”；说明身份连续性是后续关系与成长叙事的前提 | `CURRENT_VERIFIED` | 无 | 开始一段有边界的连续性序列；同一组织规律在变化中保持可辨 |
| `DR-05` | 解释身份、人格、记忆、关系与成长的关联 | 将五者作为同一 Resident 持续存在的相关维度，而不是五个可独立等同于 Resident 的功能模块 | `CURRENT_VERIFIED`，公开表述须逐项核对上位来源 | 无 | Living Particle Layer 可产生局部变化，但不得把五个维度映射成五种颜色、器官或卡片 |
| `DR-06` | 说明跨平台持续存在的原则 | 平台或承载环境变化不应自动产生“另一个 Resident”；区分定义原则与当前迁移 / 产品实现能力 | `CURRENT_VERIFIED` 的定义原则；实现状态另行取证 | 无 | 延续 `DR-04` 的同一身份，不使用平台 Logo 网络、传送门或复制分身隐喻 |
| `DR-07` | 说明 Human × Resident 的长期关系 | 关系是长期共同发展与持续互动的方向，不是拥有商品、一次聊天或拟人替身 | `LONG_TERM`，受 Eterna 上位使命约束 | 无 | Relationship Response 成为主要机制；通过距离、朝向、注意关系表达，不冻结 Human 或 Resident 最终人物形象 |
| `DR-08` | 说明产品围绕 Resident 的职责并提供下一步 | Studio 负责定义、创作、配置、验证、构建与发布；Aftelle 负责已有上位支持的承载、交互、陪伴、恢复与个人运行入口；两者都不是 Resident | 产品职责为受来源约束的 `CURRENT_VERIFIED`；当前能力状态另行审核 | Primary：Products；Text Action：Aftelle；Text Action：Studio | Resident 退后，产品关系由内容层级表达；不得复制为两个产品 Avatar |

### 5.1 身份、人格、记忆、关系与成长的叙事纪律

`DR-05` 不是领域 Schema 或功能清单。公开表达只建立以下认知关系，最终文字必须逐项回到《数字居民定义》审核：

- **身份**：回答为什么跨时间仍被识别为同一主体；
- **人格**：说明稳定表达与行为倾向属于 Resident 的持续特征，但人格单独不等于 Resident；
- **记忆**：说明过往经历与持续状态相关，但记忆集合单独不等于 Resident；
- **关系**：说明与 Human 或其他主体的持续关系属于长期状态的一部分，但关系记录单独不等于 Resident；
- **成长**：说明变化能够在身份连续性中累积，不把更新理解为每次生成一个新角色。

以上是页面叙事问题和内容职责，不新增字段、权威关系、数据模型或当前实现承诺。

### 5.2 Studio / Aftelle 的边界

- Studio 是创作、配置、验证、构建与发布平台，不是 Resident 本体、正式长期运行环境或长期实例数据权威；
- Aftelle 只使用 Node 1 已确认的高层边界；正式 Product North Star 缺失期间不补写完整价值主张或功能清单；
- Runtime Core 的执行职责不能与 Studio、Aftelle 或 Resident 本体合并，但本页不展开 Runtime 技术说明；
- 产品页可以进一步说明经审核状态，本概念页不展示功能比较、下载或体验入口。

---

## 6. CTA

本页以完整理解为优先，不在前半页插入转化 CTA。

| 位置 | 层级 | 行动意图 | 目标地址 | 约束 |
|---|---|---|---|---|
| `DR-08` | Primary | 探索 Products 如何服务 Resident | `/{lang}/products` | 本页唯一 Primary；不改成注册或创建 Resident |
| `DR-08` | Text Action | 了解 Aftelle | `/{lang}/products/aftelle` | 只进入审核后产品内容，不暗示可用性 |
| `DR-08` | Text Action | 了解 Studio | `/{lang}/products/studio` | 区分 North Star 职责与当前能力 |

CTA 文案只冻结行动意图，不冻结最终中英文措辞。

数量约束：

- `DR-01`–`DR-07` 不设置 Primary；
- 不在“是什么 / 不是什么”之间插入产品 CTA；
- Aftelle 与 Studio 是 Products 子级，不提升为主导航；
- 不创建 Create、Try、Download、Login 或统一账户入口；
- 目标产品内容未通过审核时，不以空页或 `Coming soon` 代替。

---

## 7. Resident Presence

### 7.1 Presence 节奏

本页允许 Resident 承担比 Home 更深入的概念角色，但仍不把动画当作定义本身：

```text
DR-01–02  Establish one Resident and its stable identity
DR-03     Recede so boundaries are read in text
DR-04–06  Re-enter as one bounded continuity sequence
DR-07     Form a restrained Human × Resident relationship
DR-08     Recede; product relationships remain textual
```

### 7.2 连续性序列

- `DR-04`–`DR-06` 必须保持同一 Stable Identity Structure；
- Living Particle Layer 可以呼吸、流动、局部聚合、形变或调整密度，但不能随机重置身份；
- 变化用于支持“同一存在经历变化”，不是演示粒子技术；
- 不使用换颜色代表身份、人格、记忆、关系、成长或不同平台；
- 不使用复制、分身、上传、传送门或平台 Logo 网络作为跨平台连续性的默认隐喻。

### 7.3 Human × Resident

- `DR-07` 通过距离、朝向、姿态和 Relationship Response 表达长期关系；
- 不以支配、拥有、控制面板、宠物、恋爱角色或拟人替身作为默认关系；
- Human 可以只由空间、注意方向或局部存在暗示，不冻结人物资产；
- Resident 不冻结完整人体、脸、性别、身体比例或最终 Avatar。

### 7.4 降级

- Resident Render 或 Motion 关闭时，八段内容仍能完整回答页面问题；
- reduced-motion 下以静态的稳定组织规律保留身份连续性；
- Presence 不遮挡定义、反例、状态、CTA 或 Header；
- Mobile 空间不足时可减少、静态化或退出，不将 Resident 压成文字背景。

---

## 8. Public Content State

| 内容范围 | 允许状态 | 呈现要求 |
|---|---|---|
| Digital Resident 正式定义与“不是什么”边界 | `CURRENT_VERIFIED` | 所有定义性文字追溯到 Node 1 冻结来源，不用传播性简化改写边界 |
| 连续性与跨平台身份原则 | `CURRENT_VERIFIED` | 明确这是定义原则，不自动证明当前所有迁移、运行或产品能力已经实现 |
| 身份、人格、记忆、关系、成长的关联 | `CURRENT_VERIFIED`，逐项审核 | 只表达上位来源支持的关系，不新增层级、字段或数据模型 |
| Human × Resident 长期共同发展 | `LONG_TERM` | 与当前功能、可用入口和近期承诺分隔 |
| Studio / Aftelle 产品职责 | 受来源约束的 `CURRENT_VERIFIED` | 职责定义不等于当前能力；Aftelle 保持 North Star GAP |
| 产品当前进度 | 有正式证据时 `IN_DEVELOPMENT` | 本页只需最小状态说明，详情留给产品页，不公开内部 Stage |
| 研究探索 | 有正式公开来源时 `RESEARCH` | 当前不为研究创建 Section，也不以研究填补定义内容 |

状态表达规则：

- 页面不使用后台式 Badge 阵列；
- 状态通过准确措辞、内容分隔、来源和必要的公众说明表达；
- 不用 Resident 颜色、粒子密度或 Motion 作为唯一状态载体；
- 中文和英文的定义、边界、状态与 CTA 可用性必须一致；
- Website 文档状态、内部 `FROZEN` 和工程 Stage 不直接公开。

---

## 9. Responsive Principles

### 9.1 Desktop

- 允许 `DR-01`–`DR-02` 使用较完整的 Presence Zone，定义文本保持独立可读；
- `DR-03` 以文本边界为主，不使用图标墙或反例卡片 Grid；
- `DR-04`–`DR-06` 可以形成连续空间关系，但用户始终可以自然滚动通过；
- `DR-05` 的五个概念使用编辑式层级，不强制平铺成五列功能模块；
- `DR-08` 回到稳定内容区域，产品 CTA 不与 Resident 竞争。

### 9.2 Mobile

- 保持 `DR-01` 至 `DR-08` 原顺序；
- 定义、边界和连续性说明先于视觉效果；
- `DR-04`–`DR-06` 的连续性序列可收束为静态或低运动的单轴表达，不使用 pinned 长滚动；
- `DR-05` 依次呈现身份、人格、记忆、关系与成长，但不改变它们共同服务同一叙事的关系；
- `DR-07` 的 Human × Resident 关系可以只保留朝向或空间暗示；
- `DR-08` 的 Products、Aftelle、Studio 行动纵向排列并保持层级。

具体 breakpoint、Grid、Section 高度、sticky 行为、视觉切换与 Motion 参数均为 `NOT_FROZEN`。

---

## 10. Anti-patterns

Digital Residents 页面禁止：

- 写成十三层规范、Schema、数据字段或技术架构说明书；
- 把模型、Prompt、Agent、工具、工作流、角色卡、外观或一次会话称为 Resident；
- 把身份、人格、记忆、关系和成长拆成独立 Feature Cards 或可购买模块；
- 用 AI Brain、Neural Network、Knowledge Graph 或平台 Logo 网络解释 Resident；
- 把 Stable Identity Structure 画成发光核心、晶体、骨架或身份信息图；
- 用换颜色代表人格、记忆、关系、平台或成长；
- 把 Resident 做成完整无脸人体、Mascot、Avatar、沙人、烟雾灵魂或普通粒子球；
- 把跨平台持续误写成当前已完成的迁移、同步或运行能力；
- 把 Human × Resident 写成拥有、控制、商品陪伴或一次聊天；
- 用 Studio 或 Aftelle 的功能反向定义 Resident；
- 猜测 Aftelle Product North Star、功能清单、发布日期或可用性；
- 以空洞哲学表达代替“是什么 / 不是什么”的清楚边界。

---

## 11. Open / NOT_FROZEN

以下事项保持 `OPEN / NOT_FROZEN`：

- 八个 Section 的最终公开标题；
- 正式中文与英文定义性文案；
- 身份、人格、记忆、关系、成长的最终公众解释措辞；
- 最终 Hero 是否存在及其构图；
- Resident 最终身体、脸、性别表达、比例、颜色、材质与人形程度；
- Stable Identity Structure 与 Living Particle Layer 的具体视觉形式；
- 跨平台连续性的最终视觉隐喻；
- Human 的最终视觉呈现；
- Section 的版式、Grid、高度、留白、Typography 和 Spacing 数值；
- 最终字体、色值、图片、视频与其他视觉资产；
- Motion 持续时间、缓动、位移与关系响应参数；
- Studio / Aftelle 上线时的当前状态正文和 CTA 最终措辞；
- breakpoint、加载、降级、渲染和其他技术实现。

本文件确定的叙事顺序、页面问题、产品边界、CTA 层级和 Presence 节奏不得被概念图静默替换。

---

## 12. Node 8.2B Concept Image Handoff

Node 8.2B 只生成概念研究，不能用概念图新增数字居民定义或冻结最终 Resident。

### 12.1 建议概念研究对象

1. **Stable Identity through Change Study**
   - 研究同一 Resident 在呼吸、流动、聚合和形变中仍可被识别；
   - 不使用发光核心、骨架、五色状态或完整身体；
   - 同时提供常规 Motion 与 reduced-motion 静态理解方式。

2. **Cross-platform Continuity Study**
   - 研究“承载环境变化，但主体仍是同一 Resident”的空间表达；
   - 避免平台 Logo、网络节点、复制分身、传送门或数据上传图解；
   - 不暗示当前迁移或同步能力已经实现。

3. **Human × Resident Relationship Study**
   - 研究距离、朝向、尺度和注意关系；
   - 保持 Human 与 Resident 双方的主体感，不表现拥有或控制；
   - 不冻结 Human 资产、Resident 性别、脸或完整人体。

### 12.2 概念图必须验证

- Resident 是存在，不是插图、Avatar 或技术图腾；
- Stable Identity Structure 在变化中持续可辨；
- 正文安全区、CTA、Header 和阅读顺序不受遮挡；
- Desktop 与 Mobile 均可降级；
- 没有视觉效果时，“是什么 / 不是什么 / 为什么连续”仍能由内容说明。

### 12.3 概念图不得决定

- 最终 Resident 外观、身体、脸、颜色、材质或人形程度；
- 最终 Hero、页面版式或公开标题；
- 最终中文 / 英文文案；
- 最终字体、色值、数值 Token 或 Motion 参数；
- 任何 Runtime、数据权威、迁移能力或产品现状；
- 任何渲染技术或工程方案。

---

Node 8.2A Digital Residents 状态：`REVIEW_REQUIRED`
