# Eterna Website 1.0 全站共性交互与页面设计基线 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 8.1 全站共性交互与页面设计规格

状态：`REVIEW_REQUIRED`

编制日期：`2026-08-08`（Asia/Shanghai）

> 本文件把 Node 1、Node 5–7 已确认的定位、需求、信息架构与视觉系统转化为所有页面共同遵守的交互和页面设计基线。
> 本文件不设计任何具体页面 Section，不撰写正式页面文案，不生成视觉资产，不冻结 Resident 最终外观，也不选择技术实现。

---

## 1. 文档目的与依据

### 1.1 目的

Node 8.1 只定义跨页面共同规则，确保后续具体页面设计不会各自发明导航、交互、Resident Presence、Motion、响应式或内容状态表达。

本文件处于 `REVIEW_REQUIRED`。其中规则是待人工审核的 Node 8.1 基线，不自行标记为 `PASS` 或 `FROZEN`。

### 1.2 输入优先级

1. Node 1：Eterna 上位事实与 Website 定位；
2. Node 5：Website 1.0 需求；
3. Node 6：Sitemap、导航、URL、页面关系与内容状态；
4. Node 7：`Living Precision / 静默生命感`、Web Design System 与 Resident Presence；
5. Node 4：只提供信息组织方法，不提供页面母版。

### 1.3 已核对状态

| 节点 | 当前状态 | 本文件使用方式 |
|---|---|---|
| Node 1 | `PASS / FROZEN` | 定位、产品边界和 Universe 表达的最高依据 |
| Node 4 | `PASS` | 只采用聚焦、稳定分类、分层扩展等方法 |
| Node 5 | `PASS` | 用户、真实性、双语、可访问性与降级要求 |
| Node 6 | `PASS` | 页面组、主导航、URL 和内容状态 |
| Node 7 | `PASS` | 继承已冻结的 Living Precision 与核心视觉原则 |

仓库中未发现独立的 Node 1–7 状态摘要文件；以上状态以各节点正式文档为准。

---

## 2. Global Page Framework

所有公开页面共享以下语义骨架：

```text
Page
├── Header
├── Main
│   ├── Standard Content Region
│   └── Presence / Visual Zone（按页面需要使用）
└── Footer
```

这只是全站骨架，不规定具体页面包含哪些 Section 或其排列顺序。

### 2.1 Header

- 作为全站一致的品牌识别、主导航和语言切换区域；
- 必须在 Resident 或高级视觉失败时独立可用；
- 不承担完整 Sitemap、产品状态清单、账户体系或高密度 CTA；
- 不因具体页面视觉构图改变其信息职责。

### 2.2 Main

- 每个页面只设置一个明确的主内容区域和一个语义 H1；
- Main 必须独立承载页面核心问题、事实状态和真实行动；
- 阅读与键盘顺序以内容语义为准，不因视觉非对称而改变；
- 具体页面可以使用不同内容节奏，不要求复制同一模板。

### 2.3 Standard Content Region

- 用于标题、正文、状态、来源、行动和阅读型内容；
- 遵守 Node 7 的阅读宽度、标准内容宽度、Grid、Typography 与 Spacing 角色；
- 对齐、留白和内容层级优先于 Card、阴影或装饰边界；
- 中文和英文可以调整断行与占用空间，但保持相同信息职责。

### 2.4 Presence / Visual Zone

- 只在内容关系确有需要时突破普通内容宽度；
- 可以承载 Resident Presence、经审核媒体或其他具有信息职责的视觉内容；
- 必须与 Standard Content Region 保持清楚的阅读边界和安全距离；
- 不得成为所有页面或所有 Section 的默认背景层；
- 即使该区域完全退出，页面的主要内容、导航和行动仍然成立。

---

## 3. Header / Navigation

### 3.1 冻结结构的继承

全站主导航保持 Node 6 已确认的三个入口：

- `Digital Residents / 数字居民`；
- `Products / 产品`；
- `About / 关于 Eterna`。

“About Eterna”是该页面的完整职责名称；英文主导航显示标签继续遵循 Node 6 的 `About`。Home 不占用主导航项，通过 Eterna 品牌入口返回当前语言首页。

不得加入 Genesis、Edu、Social、Work、World、Art、Sound、Cinema、Games、Life、Exchange 或其他长期 Universe 平台作为 Website 1.0 当前主导航。

### 3.2 当前页面状态

- 当前一级页面必须具有可见、非仅颜色的状态；
- 位于 Aftelle 或 Studio 时，`Products` 保持父级当前状态；
- 产品子级状态通过同一 Products 层级中的上下文导航或页面关系表达，不提升为新的主导航项；
- Home 通过品牌入口与页面上下文识别，不伪造一个隐藏的 Home 导航项；
- 当前状态、Hover 与 Focus 必须可区分。

### 3.3 滚动时 Header 行为

- Header 的品牌、导航与语言职责在滚动中持续可发现；
- 若后续页面设计采用持续可见或滚动后收束的 Header，其视觉重量可以降低，但不得移除核心入口；
- 不得仅依据滚动方向突然隐藏 Header，造成用户失去定位或键盘焦点；
- Header 状态变化不得遮挡锚点内容、页面标题或 Focus 目标；
- 是否采用 sticky、fixed 或普通文档流及其具体触发条件仍为 `NOT_FROZEN`。

### 3.4 Desktop 导航原则

- 三个主入口保持同一层级、清晰可扫描；
- Products 可提供 Aftelle 与 Studio 的下层入口，但不使用复杂 Mega Menu；
- 语言切换与主导航职责可区分，不混入产品列表；
- 不以 Primary CTA 抢占品牌和主导航的优先级。

### 3.5 Mobile 导航原则

- 允许将主导航收束为一个清楚、可操作的导航入口；
- 展开后保持 Digital Residents、Products、About 的原有层级和顺序；
- Aftelle 与 Studio 仍属于 Products，不与三个主入口平铺为同级；
- 语言切换始终可达，不隐藏在不可发现的手势中；
- 菜单打开、关闭、焦点进入和返回必须支持键盘与辅助技术；
- 具体菜单形态、图标与 breakpoint 为 `NOT_FROZEN`。

---

## 4. Footer

Footer 承担低频但必要的辅助导航和治理入口，不承担未来栏目占位。

### 4.1 当前信息职责

- 提供当前真实 Sitemap 的辅助入口；
- 可以提供 Aftelle、Studio 的产品直达入口；
- 提供语言关系和返回当前语言 Home 的路径；
- 与 Header 共享准确的页面名称和可用状态；
- 维持 About Eterna 的项目说明角色，不制造成熟公司组织。

### 4.2 条件式入口

以下入口只在内容真实存在、已审核且具有实际职责时出现：

- Legal；
- Privacy；
- Contact / Participation；
- 其他未来获批的正式内容。

不得创建假链接、空页面、`Coming soon` 或不可处理的联系入口。Footer 不提前列出 Research、Developers、News、Support 或长期 Universe 平台来制造站点规模感。

### 4.3 组织原则

- 通过少量语义分组、清楚标题和留白组织，不形成链接墙；
- 低频入口的视觉重量低于主内容，但可读性和 Focus 不得降低；
- Footer 可以比 Header 信息密度更高，但仍只反映已经启用的真实结构。

---

## 5. Language Switching

正式语言版本为 `/zh` 与 `/en`，两种语言地位对等。

### 5.1 对应页面规则

- 语言切换必须优先停留在同一页面的审核后对应版本；
- 例如 `/zh/products/studio` 与 `/en/products/studio` 互相对应；
- 不得把语言切换默认送回 Home；
- 不得用机器翻译、旧内容或另一语言正文临时填充目标语言页面；
- Website 1.0 当前六个页面组必须完成中英文一一对应后才能作为完整正式版本发布。

### 5.2 对应内容不可用

- 条件式未来内容没有审核后对应版本时，不创建空 URL 或假对应页；
- 不可用状态必须在当前上下文中清楚说明，不静默跳转到无关页面；
- 已发布核心页面发生单语失效时，应按 Node 6 内容治理规则撤回受影响表达并完成双语复核。

### 5.3 技术边界

根 `/` 只承担进入适合语言版本的入口职责。Redirect、rewrite、语言检测、默认语言呈现及具体 i18n 实现由 Node 9 决定，不属于本节点。

---

## 6. CTA System

CTA 必须指向真实内容、真实入口或可被实际处理的动作。Website 1.0 不以注册、购买或下载转化为核心目标。

### 6.1 Primary Action

- 用于当前决策语境中唯一最重要的真实行动；
- 一个内容区域原则上最多一个 Primary；
- 页面不要求每个 Section 都设置 Primary；
- 不得用于尚未公开可用的体验、下载、注册、购买或联系能力。

### 6.2 Secondary Action

- 用于与 Primary 同一决策语境中的次级路径；
- 视觉和语义优先级低于 Primary；
- 只在确有第二条真实路径时出现，不为构图平衡强行添加。

### 6.3 Text Action

- 用于继续阅读、进入详情、查看来源、理解状态或低频导航；
- 必须在非 Hover 状态下可识别为行动；
- 不得用模糊词掩盖目标页面或动作结果。

### 6.4 数量与状态约束

- 同一视野或内容语境中不得出现多个竞争性的 Primary；
- CTA 不能比 Eterna、数字居民或产品事实更先抢夺注意力；
- Hover、Focus、Active、Disabled、Loading、Success 与 Failure 必须可辨，并具有非颜色线索；
- Contact GAP、产品可用性或处理责任未解决时，不显示可执行假入口。

---

## 7. Scroll & Page Transition

### 7.1 默认滚动

- 全站默认采用连续纵向滚动；
- 不使用强制 scroll-snap 把阅读切成不可自由控制的场景；
- 用户可以按正常阅读速度前进、返回和快速略过视觉内容；
- 滚动不得成为读取核心信息或触发页面可用性的前置条件。

### 7.2 Section 进入与退出

- 内容进入可以通过克制的可见性、空间或层级变化辅助理解；
- 正文、标题和 CTA 不得因等待动画而长时间不可见或不可操作；
- Section 离开时不删除用户仍需理解的导航和页面上下文；
- 动效失败或被减少时，Section 的内容边界仍清楚。

### 7.3 Sticky / Pinned / Spatial Interaction

只在以下条件同时成立时允许使用：

- 有助于理解持续上下文、空间关系或 Resident 与内容的关系；
- 作用范围明确且有限；
- 用户可以自然进入、通过和离开，不被滚动劫持；
- 不遮挡导航、正文、CTA 或 Focus；
- Mobile 与 reduced-motion 情况具有简单、完整的替代体验。

不得为了延长视觉观看时间、制造技术展示或装饰节奏使用 sticky、pinned 或 spatial interaction。

### 7.4 跨页面转场

- 页面切换首先建立新页面身份、当前导航状态和焦点位置；
- 转场不延迟目标内容可用性，不改变浏览器式返回和直接访问的认知预期；
- 页面之间可以保持 Living Precision 的运动连续性，但不要求共享一个持续渲染场景；
- 转场失败、被跳过或 reduced-motion 启用时，应直接呈现目标页面的稳定状态；
- 具体转场形式、持续时间、缓动与实现为 `NOT_FROZEN`。

---

## 8. Resident Presence

Resident Presence 是 Node 8.1 的核心跨页面机制。Resident 是页面中的“存在”，不是 Hero 插图、Mascot、Avatar、普通粒子背景或每个 Section 的重复装饰。

### 8.1 必须继承的四层机制

**Stable Identity Structure + Living Particle Layer + Subtle Direction / Posture + Relationship Response**

| 机制 | 全站职责 | 本节点边界 |
|---|---|---|
| Stable Identity Structure | 在不同页面与状态中维持可识别的组织连续性 | 不冻结锚点算法、最终几何或身体 |
| Living Particle Layer | 表达呼吸、流动、聚合、形变、密度和亮度微动 | 不冻结粒子材质、颜色或渲染方式 |
| Subtle Direction / Posture | 形成朝向、姿态和极弱类生命轮廓 | 不冻结脸、性别、完整人体或最终比例 |
| Relationship Response | 让 Resident 与 Human、文字或页面空间形成克制响应 | 不把响应变成强制交互或唯一信息渠道 |

### 8.2 允许的全站行为

- 占据真实页面空间，而不是覆盖在内容背后；
- 与文字形成可感知的距离、朝向、尺度和空间关系；
- 在少数关键页面区域成为视觉重心；
- 随内容产生克制的密度、姿态、流动或响应变化；
- 在不同页面保持身份结构和运动气质的连续性；
- 在内容需要时主动退后，把注意力交还给阅读与操作。

### 8.3 禁止的全站行为

- 遮挡标题、正文、状态、导航、语言切换或 CTA；
- 抢夺 Header、Focus 或页面当前状态；
- 用持续运动打断阅读；
- 强制每个页面或每个 Section 出现；
- 把同一 Resident 复制成卡片、头像或产品缩略图阵列；
- 让粒子颜色或动画成为状态的唯一表达；
- 让页面脱离 Resident 动画后失去结构、事实、行动或品牌识别。

### 8.4 Presence Zone 规则

- 每个 Presence Zone 必须有明确的内容或关系职责；
- 同一阅读语境原则上只建立一个主要 Resident 视觉重心；
- Resident breathing space 与 Typography 安全区在静态、运动峰值和响应状态下均须成立；
- Presence Zone 可以突破普通内容宽度，但语义和键盘顺序仍跟随 Main；
- Resident 的出现、减少、静止或退出由内容优先级和设备承载能力决定；
- 具体哪些页面使用 Presence、使用何种构图，留给后续具体页面设计。

### 8.5 跨页面连续性

- 连续性来自稳定身份结构、运动纪律、尺度关系和出现逻辑，不来自每页复制同一 Hero；
- 页面切换不得无理由改变 Resident 的身份组织规律；
- 产品页面可以调整 Presence 的内容关系，但不得让产品视觉取代 Eterna 根身份；
- Resident 不必在所有页面持续可见；退出后仍通过 Layout、Typography、Spacing、内容与 Motion 保持 Living Precision。

### 8.6 当前未冻结的 Resident 项

以下继续保持 `NOT_FROZEN`：

- 最终身体与脸；
- 最终性别表达、比例与 Avatar；
- 最终颜色；
- 最终粒子材质；
- 最终人形程度；
- 最终页面构图与 Hero 形态；
- 具体渲染技术和参数。

---

## 9. Motion

全站 Motion 继承 Living Precision：

- slow；
- continuous；
- inertial；
- subtle；
- restrained；
- deterministic。

### 9.1 使用原则

- 运动必须说明状态、连续存在或空间关系，不能只用于展示效果；
- Resident 的生命节奏可以持续，但页面反馈必须及时、明确，不被慢速 Motion 拖延；
- 进入、离开和状态反馈应有来源、方向与收束；
- 避免 bounce、flashy transition、快速缩放、过度 parallax 和装饰动画堆叠；
- 不通过随机运动破坏 Stable Identity Structure；
- 不用 Motion 掩盖内容不足、加载等待或不清楚的层级。

### 9.2 `prefers-reduced-motion`

- 停止或显著减少非必要连续运动、视差、路径变化和装饰性 reveal；
- 保留即时且必要的操作反馈，但不依赖大幅位移；
- Resident 可以静态化或只保留不造成负担的最小生命提示；
- 身份、状态、页面关系和 CTA 仍以文字、结构和静态视觉完整表达；
- 不因 reduced motion 移除内容或创建功能差异。

具体持续时间、缓动、位移和响应参数均为 `NOT_FROZEN`。

---

## 10. Public Content State

公开内容必须自然区分以下事实性质，但不得直接复制成开发后台式标签系统。

| 状态 | 公开表达原则 | 禁止表达 |
|---|---|---|
| `CURRENT_VERIFIED` | 作为有当前来源支持的事实；时间敏感内容可同时说明审核日期或来源 | 不把历史状态或候选方案写成当前事实 |
| `IN_DEVELOPMENT` | 用自然语言明确“正在开发”，说明证据范围和当前不可用边界 | 不公开内部 Stage、技术债、仓库细节或虚假发布日期 |
| `LONG_TERM` | 明确为长期方向、愿景或生态拓扑，并与当前产品事实分隔 | 不与当前功能、可用入口或近期交付承诺混写 |
| `RESEARCH` | 明确为获准公开的研究探索，说明不确定性和证据范围 | 不包装为已立项产品、已验证能力或必然路线 |

### 10.1 呈现规则

- 优先通过准确措辞、标题层级、上下文和来源关系表达状态；
- 只在可能产生误解时使用简洁的公众状态说明，不要求每段内容都有 Badge；
- 状态不得仅由颜色、运动、图标或 Resident 变化表达；
- 一个页面包含多种状态时，各主张的边界必须可被普通访问者理解；
- 中文和英文的状态语义、事实范围、日期和行动可用性必须一致；
- 内部 `FROZEN`、文档生命周期和工程 Stage 不直接成为公开页面状态。

---

## 11. Information Density

| 页面或内容类型 | 密度原则 | 共同约束 |
|---|---|---|
| Home | 低密度 | 一次突出少数重点，不承担完整 Universe 解释，不以 CTA 或卡片堆积填充 |
| Digital Residents | 叙事与解释优先 | 先建立概念理解和边界，Resident Presence 不替代正式定义 |
| Product | 中等密度 | 产品职责、状态、当前事实和长期方向清楚分层 |
| Long-form | 阅读优先 | 使用稳定阅读宽度、语义标题、来源和时效信息 |
| Future technical / developer content | 允许更高密度 | 只有真实内容启用后适用，不反向控制主站整体视觉 |

密度由内容职责决定，不等于 Card 数量、动画数量或视觉资产面积。About Eterna 依据真实项目事实保持中低密度，不制造成熟企业信息量。

---

## 12. Responsive

本节点只冻结 Desktop、Tablet、Mobile 的重排原则，不冻结具体 breakpoint。

### 12.1 共同原则

- 内容优先级、语义顺序、状态、来源和核心行动在不同设备保持一致；
- 视觉顺序不得反转键盘和屏幕阅读器顺序；
- Typography 与 Spacing 按 Node 7 的相对角色调整，不做等比例整体缩小；
- 不因空间减少而删除核心内容、语言能力或产品边界。

### 12.2 Desktop

- 可以使用扩展 Grid、非对称关系和较完整的 Presence Zone；
- 主导航可以直接呈现三个一级入口；
- Resident 可占据更完整的空间关系，但仍不覆盖 Standard Content Region。

### 12.3 Tablet

- 减少并列内容和视觉层级，优先保留主叙事与真实行动；
- 非对称构图可以收束，Resident 可缩减复杂度或移动到独立空间；
- 导航可根据承载能力收束，但保持原有信息层级。

### 12.4 Mobile

- 优先形成清楚的单轴阅读顺序；
- 导航使用可发现、可访问的收束方式；
- Resident Presence 可以缩小、静态化、移到内容之后或完全退出；
- 不把 Resident 压缩为遮挡文字的背景，也不要求用户通过视觉场景才能继续；
- CTA 保持真实优先级和适合触控的可操作性。

最终 breakpoint、列数、尺寸、菜单形态和 Presence 切换条件为 `NOT_FROZEN`。

---

## 13. Accessibility

### 13.1 Semantic hierarchy

- 使用清楚的 Header、Navigation、Main、Footer 与内容区域语义；
- 每页只有一个语义 H1，后续标题不跳级表达视觉需求；
- 当前页、产品父子关系、语言和内容状态可由辅助技术理解；
- 视觉顺序与 DOM / 阅读顺序保持一致。

### 13.2 Keyboard navigation and focus

- 所有导航、语言切换、CTA、展开与关闭操作可通过键盘完成；
- Focus 始终可见，且不被 Header、Presence Zone 或视觉层遮挡；
- Mobile 导航打开后具有明确焦点进入、移动和返回路径；
- 不要求通过 Hover、拖拽或复杂手势获取唯一内容。

### 13.3 Contrast and readable typography

- 文本、图标、Hairline、状态与 Focus 在其所在表面上保持可读对比；
- Secondary Text 不得因克制风格而变得难以阅读；
- 中文和英文分别验证字号、行高、行长、断行和中英混排；
- 状态、错误和行动不只依赖颜色。

### 13.4 Resident and motion

- Resident 动画不承载唯一事实、状态或操作说明；
- Resident 不进入键盘操作路径，除非未来存在经过定义的真实交互职责；
- 装饰性视觉不制造无意义的辅助技术噪声；
- 有信息意义的视觉必须在文字内容中提供等价信息；
- 支持 `prefers-reduced-motion`，降级后内容和功能等价。

---

## 14. Loading / Failure / Degradation

高级视觉是增强层，不是页面成立的前置条件。

### 14.1 基础规则

- Header、Main 核心内容、Footer 和 CTA 不等待 Resident Render 或高级动画完成后才可用；
- Loading 状态不遮挡导航，不把空白视觉场景作为必经步骤；
- 可选视觉加载失败应被限制在其 Presence / Visual Zone 内，不扩散为整页失败；
- 失败后不显示虚假完成状态、不可操作 CTA 或误导性的产品可用性。

### 14.2 Resident / Visual 降级

Resident Render、动画或高级视觉失败、被关闭或不受支持时：

- 页面内容仍完整；
- 导航与语言切换仍可用；
- CTA 仍可用并指向真实结果；
- 当前页面和内容状态仍清楚；
- Layout、Typography、Spacing、Surface、内容与克制的 Motion 仍能表达 Living Precision；
- 品牌表达不完全依赖 Resident 图像或粒子效果，因此不会随视觉失败完全消失。

### 14.3 交互失败

- 任何真实提交或异步行动必须区分进行中、成功、失败和可恢复状态；
- 错误说明提供用户可理解的结果和下一步，不只显示颜色或动画；
- 非关键第三方服务失败不得移除核心企业、概念或产品事实；
- 具体加载策略、错误边界与渲染实现由 Node 9 决定。

---

## 15. Page Continuity

### 15.1 全站认知路径

```text
Home
  → Digital Residents
    → Products
      → Aftelle / Studio

About Eterna
  → 独立说明 Eterna 的项目、使命与经批准公开事实
```

该路径是认知关系，不要求用户按固定顺序访问，也不规定具体页面 Section。

### 15.2 页面职责连续性

- Home 建立 Eterna、数字居民和当前产品的最小总体认识，并提供继续探索路径；
- Digital Residents 负责解释中心主体及概念边界，不能被产品页面反向改写；
- Products 负责组织当前可公开产品及其关系；
- Aftelle 与 Studio 负责各自受来源约束的产品详情，并保持 Products 父级关系；
- About Eterna 独立说明品牌根、项目性质与获批事实，不承担产品集合或成熟公司资料目录。

### 15.3 连续但不模板化

全站连续性来自：

- Header、Footer、语言切换和当前状态；
- Node 7 Typography、Spacing、Surface、CTA 和 Motion 纪律；
- 内容状态与来源边界；
- Resident Presence 的身份与行为规则。

不同页面应依据自身问题形成不同叙事和密度，不复制同一 Hero、Section 顺序或 Resident 构图。用户直接进入任一深层页面时，也必须能够理解当前位置、所属层级和返回路径。

---

## 16. Universe 公共表达边界

Eterna Universe 的中心是 Digital Resident。Website 可以解释长期生态，但不得把长期领域平台转化为当前产品矩阵。

### 16.1 当前产品重点

Website 1.0 当前产品结构只包含：

- Aftelle；
- Studio。

两者仍需遵守各自正式来源和当前状态证据。Aftelle 缺少正式 Product North Star 时，不得补写完整定位、功能清单、可用性或虚假入口。

### 16.2 长期领域平台

Genesis、Edu、Social、Work、World、Art、Sound、Cinema、Games、Life、Exchange 等长期领域平台：

- 只能在有上位来源支持且确有必要时作为 `LONG_TERM` 生态背景被解释；
- 不进入 Website 1.0 当前主导航；
- 不作为当前 Products 集合中的已上线产品；
- 不使用产品卡片、可用性状态、下载、体验、注册或发布日期暗示；
- 不表达为已经上线、已经立项、当前施工或近期必然交付；
- 不因其长期存在于 Universe 拓扑，就自动创建页面、Footer 入口或视觉资产。

### 16.3 研究边界

研究探索只有在存在经批准公开的正式来源时才能使用 `RESEARCH` 表达。研究名称、候选方向和长期平台不得互相替代，也不得被视觉包装为已验证产品能力。

---

## 17. NOT_FROZEN

Node 8.1 不冻结以下事项：

- 任何具体页面的 Section 清单、顺序和版式；
- 正式页面文案；
- 最终 Hero 形态；
- 最终品牌色值和字体家族；
- Resident 最终身体、脸、性别表达、比例、颜色、粒子材质与外观；
- Resident 在各具体页面的最终出现位置、尺度和构图；
- 最终图片、视频或其他视觉资产；
- 页面宽度、Grid、gutter、Spacing、Typography、Radius 等具体数值 Token；
- 具体 breakpoint、Header 高度、滚动阈值和 Mobile 菜单外观；
- 具体动画持续时间、缓动、位移与页面转场形式；
- Redirect、rewrite、语言检测与 i18n 技术实现；
- WebGL、WebGPU、Three.js、Canvas、Shader、Particle 或其他渲染实现；
- React、Next.js、Vite、CMS、Hosting、Analytics 或其他技术选型。

以上事项不得从参考网站、第三方 `DESIGN.md`、Legacy 或当前假设中自动补齐。

---

## 18. Node 8.1 审核条件

人工审核时至少确认：

1. Global Page Framework 没有演变成具体页面模板；
2. 主导航保持 Digital Residents、Products、About，Home 通过品牌入口返回；
3. Aftelle 与 Studio 保持 Products 子级；
4. `/zh` 与 `/en` 的语言切换保持对应页面；
5. CTA、滚动和转场不制造 SaaS 式转化或视觉劫持；
6. Resident Presence 完整继承 Node 7 四层机制，并可安全退出；
7. Motion、Responsive、Accessibility 与降级规则可在后续页面设计中判断；
8. 四类公开内容状态不被混写成当前能力；
9. 长期 Universe 平台没有被包装为当前产品矩阵；
10. 所有 `NOT_FROZEN` 项仍保持开放，未选择技术实现；
11. 未开始具体页面设计、Node 8.2 或代码实现。

---

Node 8.1 状态：`REVIEW_REQUIRED`
