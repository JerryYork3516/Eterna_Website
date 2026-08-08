# Eterna Website 1.0 Web Design System v0.1

> 状态：`PASS`
>
> `Living Precision / 静默生命感`：`FROZEN`
>
> 核心视觉原则：`FROZEN`
>
> 最终色值、字体、Resident 最终形体、Hero、具体数值 Token、渲染实现：`NOT_FROZEN`
>
> 节点：Node 7 — 品牌视觉方向与 Web Design System
>
> 核对日期：2026-08-08

---

## 1. Design System 目标与边界

本文件将 `Living Precision / 静默生命感` 转换为可供 Node 8 页面设计和后续工程实现共同遵循的 Web 系统规则。

本文件将语义角色、层级关系和使用纪律标记为 `FROZEN`，但不假装已经具备完整成熟的 Design System。最终品牌色、字体、Resident 外观、粒子材质和具体渲染实现仍为 `NOT_FROZEN`。

本系统：

- 服务 Eterna Website 1.0，不重新定义全部 Eterna 产品或数字居民；
- 继承 Node 6 已确认的信息架构，不修改页面清单、导航或 URL；
- 同时支持中文、英文、Desktop、Tablet 与 Mobile；
- 必须在 Resident 或高级视觉被关闭、降级或无法加载时保持成立；
- 不决定 React、Next.js、Vite、WebGL、WebGPU、Metal、Three.js、Canvas、CMS、Hosting、Shader 或 Particle 技术实现；
- 不复制第三方色值、字体、Token、Component、Layout、Hero 或品牌识别。

---

## 2. Layout

### 2.1 页面宽度原则

- 使用有限、稳定的内容宽度角色，而不是每个页面自行设定宽度；
- 至少区分阅读宽度、标准内容宽度和扩展场域宽度；
- 长正文采用阅读宽度，避免行长随大屏无限增长；
- 产品与 Resident Presence 场域可以使用扩展宽度，但正文仍回到可读内容列；
- 具体最大宽度数值为 `NOT_FROZEN`。

### 2.2 Grid 原则

- 全站共享一致的外边距、内容边界、列关系与 gutter 逻辑；
- Grid 用于建立稳定对齐和响应关系，不要求每个元素都占满显式列；
- 文本、媒体、产品事实与行动应能追溯到同一布局骨架；
- Resident Presence 可跨越普通内容列，但不得破坏阅读顺序或遮挡核心信息；
- 最终列数、gutter 和断点为 `NOT_FROZEN`。

### 2.3 非对称布局允许范围

允许非对称用于：

- 表达 Human 与 Resident 的空间关系；
- 建立场景节奏；
- 区分主要内容与辅助内容；
- 让视觉内容主动退后或形成 Presence。

非对称不得：

- 打乱语义和键盘阅读顺序；
- 让 CTA、状态或正文位置不可预测；
- 在不同页面形成互不相关的构图规则；
- 以装饰性偏移代替层级。

### 2.4 内容对齐规则

- 同一内容组内的标题、正文、状态和行动共享清晰的起始边界；
- 跨区块至少保留一条稳定的主对齐轴；
- 居中只用于确有单一焦点的内容，不作为全站默认；
- 数字、状态、事实表和长正文优先采用便于扫描的对齐方式；
- 中英文可以调整换行和宽度，但必须保留相同语义层级。

### 2.5 空间与留白原则

- 留白用于建立关系、节奏与 Presence，不用于制造空洞的“高级感”；
- 页面级留白大于 Section，Section 大于 Component，Component 大于 Inline；
- 视觉资产周围的空间必须与内容重要性相关；
- Resident Presence Zone 需要独立呼吸空间，不挤压核心内容；
- 移动端可以压缩尺度，但不得消除层级差。

---

## 3. Spacing

系统使用一个简单的相对尺度。以基础节奏单位 `u` 表示关系，`u` 的最终像素值为 `NOT_FROZEN`。

| Token | 比例 | 主要职责 |
|---|---:|---|
| `space-xs` | `1u` | 紧邻图标、标签内部和细小 Inline 间距 |
| `space-s` | `2u` | 普通 Inline、短文本与控件内部关系 |
| `space-m` | `3u` | 紧凑 Component 内部层级 |
| `space-l` | `4u` | 标准 Component、内容组之间关系 |
| `space-xl` | `8u` | Section 内部或相邻内容群组 |
| `space-2xl` | `12u` | Section 之间和 Page 级主要节奏 |

使用纪律：

- 优先使用上述尺度，不为单个页面随意创建近似值；
- Inline 主要使用 `xs / s`；
- Component 主要使用 `m / l`；
- Section 主要使用 `xl`；
- Page 级节奏主要使用 `2xl`；
- 响应式调整应按语义层级整体缩放，不把所有间距压成同一大小；
- Resident 呼吸空间可以大于 `2xl`，但必须由场域关系说明，具体值在 Node 8 验证。

---

## 4. Typography Roles

Typography 的语义角色与比例关系为 `FROZEN`，字体家族为 `NOT_FROZEN`。以下比例以 Body 字号 `1` 为参照，具体字号可在 Node 8 结合语言和设备验证。

| Role | 建议比例 | 字重倾向 | 行高原则 | 职责 |
|---|---:|---|---|---|
| Display | `3.5–6` | Regular / Medium | 紧凑但不碰撞 | 极少量品牌级主命题 |
| H1 | `2.5–4` | Regular / Medium | 紧凑 | 页面唯一主标题 |
| H2 | `1.75–2.5` | Regular / Medium | 适度紧凑 | 页面主要内容层级 |
| H3 | `1.25–1.5` | Medium | 中等 | 内容组或子主题 |
| Lead | `1.125–1.375` | Regular | 舒展 | 主标题后的核心解释 |
| Body | `1` | Regular | 阅读优先 | 正文和事实说明 |
| Caption | `0.75–0.875` | Regular / Medium | 清晰 | 来源、状态、辅助说明 |
| Navigation | `0.875–1` | Medium | 紧凑清晰 | Header / Footer 导航 |
| CTA | `0.875–1` | Medium | 清晰 | 明确行动，不承担标题职责 |

规则：

- Display 不是每页必需，也不得成为掩盖内容不足的手段；
- 每页只设一个语义 H1，视觉层级不得破坏标题语义顺序；
- 标题避免依赖极粗字重；正文避免过细字重；
- 中文与英文使用相同角色，但不要求机械地使用完全相同的字号和断行；
- 中文字体必须在常用字、标点、数字和中英混排中验证；
- 英文大写和宽字距只可用于短标签，不用于长句；
- 正文行长应受阅读宽度约束；
- 最终字体家族、具体字号、字重文件和字距 Token 均为 `NOT_FROZEN`。

---

## 5. Color Roles

当前只定义语义角色，不提供最终色值。

| Role | 职责 | 使用约束 |
|---|---|---|
| Canvas | 默认页面基底 | 支撑长期阅读，不带通用 AI 色彩暗示 |
| Canvas Alternate | 内容或场域层级切换 | 必须有结构理由，不用于装饰性交替 |
| Primary Text | 主要标题与正文 | 在所有正式表面上满足可读对比 |
| Secondary Text | 辅助说明、来源和次要信息 | 不得低对比到难以阅读 |
| Hairline | 精细分隔与边界 | 克制使用，不形成工具界面网格 |
| Resident Life Accent | Resident 生命活动与 Presence 的受控强调 | 稀少使用，不承担全站装饰色职责 |
| Interactive | 链接、按钮和可操作状态 | 与 Resident Life Accent 的职责可辨 |
| Error | 错误与失败状态 | 同时提供文字或结构线索 |
| Success | 成功和完成状态 | 同时提供文字或结构线索 |

补充规则：

- 当前事实、开发中、长期愿景和研究探索不得只以颜色区分；
- Hover、Focus、Disabled、Error 和 Success 必须具有非颜色线索；
- 禁止默认使用蓝紫渐变作为品牌或 Resident 识别；
- 最终色值、对比组合、Resident 色彩和主题映射为 `NOT_FROZEN`。

---

## 6. Surface & Depth

层级优先依靠：

1. 空间；
2. 内容优先级；
3. 文字与表面的对比；
4. Light / Dark surface 关系；
5. Hairline；
6. 必要时才使用的阴影。

系统规则：

- 不采用 Card-first 设计；
- 只有具有独立边界、重复性或交互职责的内容才考虑容器化；
- 阴影不得成为默认层级机制；
- 不以玻璃、模糊和半透明堆叠制造科技感；
- Resident Presence 不放进普通卡片；
- 媒体与内容可以通过尺度和留白形成深度，不必增加表面装饰；
- 最终阴影、透明度和 surface Token 为 `NOT_FROZEN`。

---

## 7. Radius & Geometry

- 几何应清晰、稳定、克制，不通过过多异形制造未来感；
- Radius 由元素职责决定，而不是所有组件统一 pill 化；
- 按钮、输入、媒体和内容容器可以使用不同语义等级的 Radius，但等级数量应少；
- Hairline 与边角必须共同表达层级，不叠加过多描边；
- 完全圆形仅用于本身具有圆形语义的控制或状态，不作为默认品牌图形；
- Resident 形态不受普通 UI Radius 系统约束；
- 最终 Radius 数值和几何 Token 为 `NOT_FROZEN`。

---

## 8. Navigation

本节只定义视觉行为和层级，不修改 Node 6 已确认的导航结构。

- Header 保持低噪声，优先呈现主站身份、Node 6 主导航与必要工具入口；
- 当前页、Hover、Focus 和可展开状态必须清晰且不只依赖颜色；
- Header 不以高密度 CTA、账户入口或 Mega Menu 制造成熟公司形象；
- Footer 可以提高信息密度，承担 Node 6 规定的低频、语言、状态、联系与必要治理入口；
- Footer 的层级应通过分组、标题、留白和语义结构建立，不做链接墙；
- Desktop、Tablet 与 Mobile 可采用不同呈现方式，但信息职责和可达性保持一致；
- 导航视觉不得遮挡或依赖 Resident Presence。

---

## 9. Buttons / Links

### Primary

- 用于页面当前唯一或最主要的真实行动；
- 每个内容区域原则上不超过一个 Primary；
- 必须有真实目的地或真实业务处理能力；
- 不得创建虚假的“立即体验”“下载”或注册入口。

### Secondary

- 用于与主要行动并列但优先级较低的明确路径；
- 视觉重量低于 Primary，不与其竞争。

### Text Action

- 用于继续阅读、查看来源、了解状态或低频导航；
- 必须保持链接可识别性，不能只在 Hover 时显现。

通用规则：

- CTA 密度保持低；
- 按钮文案描述真实结果，不使用空泛行动词；
- Hover、Active、Focus、Disabled 和 Loading 状态可辨；
- 不全站 pill 化，不用高饱和强调填满页面；
- 具体尺寸、Radius、颜色和动效为 `NOT_FROZEN`。

---

## 10. Content Containers

| 类型 | 内容职责 | 视觉规则 |
|---|---|---|
| 普通内容区 | 标题、正文、状态与行动 | 依靠对齐和间距组织，默认不加卡片外壳 |
| 产品展示区 | 产品事实、当前状态、能力边界和后续探索 | 中等密度，事实与愿景清楚分层，不伪造可用性 |
| Resident Presence 区 | Resident 与 Human / 页面场域的关系 | 独立 Presence Zone，不作为普通组件重复排列 |
| Editorial / long-form 区 | 更新、解释性内容和未来长文 | 阅读宽度、稳定标题层级、来源与状态可追溯 |

容器类型描述内容职责，不预先决定具体页面 Section、Hero 或卡片样式。

---

## 11. Resident Integration

### 11.1 Presence Zone

Presence Zone 是允许 Resident 建立空间存在的受控区域，不是普通媒体框、Card 或背景容器。

- 必须定义 Resident、文本、交互与页面边界的关系；
- 可以跨越普通 Grid，但不得破坏语义顺序；
- 不应在多个相邻区域重复制造多个 Resident 焦点；
- 不得将 Resident 裁切成通用头像或产品缩略图来替代正式内容。

### 11.2 Resident breathing space

- Resident 周围保留足以感知朝向、呼吸和局部变化的空间；
- 呼吸空间不得挤压正文或制造无内容的大面积留白；
- 页面尺寸缩小时，应优先简化 Presence，而不是压缩到遮挡信息。

### 11.3 Typography 安全距离

- Resident 的高亮、粒子密度和运动不得穿过关键标题、正文、状态或 CTA 的可读区域；
- 文本安全区必须在静态、运动峰值和响应状态下均成立；
- 不以降低文字对比来融合 Resident 与页面。

### 11.4 降级原则

- Resident 关闭、静止、降低粒子数量或无法加载时，页面结构和内容保持完整；
- 核心信息不得仅由粒子、姿态、亮度或运动传达；
- reduced-motion 下保留身份连续性和必要状态，不保留无意义循环；
- 本文件不决定降级的工程实现。

---

## 12. Motion

运动 Token 的方向统一为：

- slow；
- continuous；
- inertial；
- subtle；
- deterministic。

系统规则：

- 页面转场和组件反馈应快速说明状态，不抢夺 Resident 的连续生命节奏；
- Resident 运动应有来源、方向、惯性与收束；
- 避免 bounce、闪烁、快速缩放、过度视差和装饰性循环；
- 不用运动掩盖内容加载或层级不清；
- 交互反馈必须在 reduced-motion 下仍可感知；
- 必须尊重 `prefers-reduced-motion`；
- 最终持续时间、缓动、位移和粒子响应 Token 为 `NOT_FROZEN`。

---

## 13. Responsive

系统覆盖 Desktop、Tablet 和 Mobile，但当前不锁具体 breakpoint。

- 内容优先级、语义顺序和核心行动在各设备保持一致；
- 布局变化由内容承载能力决定，不只按设备名称缩放；
- 非对称构图在空间不足时应收束为清晰的单轴或简化关系；
- Typography、间距和媒体按角色调整，不做等比例整体缩小；
- Resident Presence 可以降低复杂度、移动位置或静态化，但不得遮挡内容；
- 导航、表单和互动区域必须适合触控与键盘；
- 中英文分别验证换行、长度变化和内容完整性；
- 最终断点、列数和响应切换条件为 `NOT_FROZEN`。

---

## 14. Accessibility

Node 8 与后续实现至少必须满足：

- 所有可操作元素可通过键盘到达和操作；
- Focus 状态始终清晰，不只依赖颜色；
- 标题、区域、导航、链接、按钮和表单使用正确语义结构；
- 文本、图标、Hairline 和交互状态保持足够对比；
- 支持 `prefers-reduced-motion`，关键内容不依赖运动；
- 中文、英文均保持可读字号、行高、行长与换行；
- Resident 和视觉媒体不阻断屏幕阅读器的内容顺序；
- 装饰视觉与有信息意义的视觉采用不同的替代文本策略；
- 错误、成功、开发中与长期状态具有文本或结构说明。

最终验收阈值与测试方式由后续设计和工程节点落实，不在本节点选择实现方案。

---

## 15. Content Density

| 场景 | 目标密度 | 系统响应 |
|---|---|---|
| Homepage | 低 | 少数重点、强节奏、少 CTA、一个区域一个主要任务 |
| Product | 中等 | 能力、状态、事实来源与长期方向分层，不用卡片铺满 |
| Concept / About | 中低 | 理解和真实性优先，避免企业栏目堆积 |
| Long-form | 阅读优先 | 稳定阅读宽度、标题层级、来源和状态信息 |
| Future developer / tool content | 可较高 | 可使用更紧凑的数据与控件规则，但不反向控制主站视觉 |

任何密度等级都必须遵守内容真实性、双语对应、可访问性和 Resident 降级原则。

---

## 16. Visual Asset Rules

未来图片、视频、插图和 Resident Render 必须符合 Living Precision：

- 资产应承担事实、关系、Presence 或内容解释职责；
- 视觉内容主导时，UI 应主动退后，但导航和核心信息仍可访问；
- Human 素材不应变成通用企业团队、办公室或 AI 使用场景摆拍；
- 不使用普通 stock AI imagery、机器人头、AI brain、网络节点或蓝紫科技背景；
- 不将照片、视频或 3D 设为全站必须的品牌模式；
- 不复制 Runway、Claude、ElevenLabs、Linear、Vercel 或 xAI 的品牌资产和构图；
- 每项资产需要明确语言版本、用途、来源、权利状态和替代内容；
- 最终图片、视频、Resident Render 和 Hero 资产为 `NOT_FROZEN`。

---

## 17. Open Tokens

以下 Token 或实现参数统一标记为 `NOT_FROZEN`：

- 最终品牌色值与深浅表面组合；
- 最终字体家族、具体字号、字重文件、字距；
- Spacing 基础单位 `u` 的具体值；
- 页面最大宽度、Grid 列数、gutter 与 breakpoint；
- Radius、Hairline、阴影和透明度具体值；
- Button / Link 的具体尺寸、颜色与状态动效；
- Motion 持续时间、缓动、位移与响应参数；
- Resident 颜色、粒子材质、人形程度、外观与渲染参数；
- Hero 形态与最终视觉资产；
- 具体技术渲染实现。

开放 Token 不得从第三方 Reference Pack 直接复制。Node 8 可以提出候选并进行视觉验证，但不得无记录地将候选视为已冻结。

---

## 18. Node 8 Handoff

Node 8 可以使用本系统设计首页和核心页面，前提是：

1. 继承 `Living Precision / 静默生命感`，不重新发明另一套视觉方向；
2. 保持 Node 6 的 Sitemap、主导航、页面职责和中英文结构；
3. 使用本文件的 Layout、Spacing、Typography、Color、Surface、Motion、Density 与 Accessibility 规则；
4. 将 Resident 置于 Presence Zone，不作为普通 Card Component；
5. 同时提供 Resident 正常、降级和 reduced-motion 情况下成立的页面设计；
6. 不用视觉暗示虚假的产品可用性、成熟公司能力或未经确认的事实；
7. 对所有 `NOT_FROZEN` 项明确标注候选、验证状态和人工裁决需求；
8. 不以第三方色值、字体、Token、Component、Layout、Hero 或品牌识别作为捷径；
9. 不在设计稿中提前冻结技术栈、CMS、Hosting、Shader 或 Particle 实现。

第三方参考仅保留方法分工：

- Claude / ElevenLabs：Human / Warmth；
- Runway：Presence / Visual Confidence；
- Linear：Precision / Restraint；
- Vercel：System Discipline / Clarity；
- xAI：Futuristic Minimalism Boundary。

Eterna 的数字生命、Resident、粒子、连续存在与 Human × Resident 关系必须由 Eterna 自己独立设计，不能成为六家风格的平均混合。

---

> Node 7 状态：`PASS`
