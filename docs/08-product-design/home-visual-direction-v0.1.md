# Eterna Website 1.0 Home Visual Direction Recalibration v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 8.2B-R Home 视觉方向重校准与概念生成 Brief

状态：`PASS（冻结范围与最终裁决以 node8-freeze-v0.1.md 为准）`

视觉探索方向：`NOT_FROZEN / NOT_FINAL_VISUAL（不代表最终视觉已冻结）`

编制日期：`2026-08-08`（Asia/Shanghai）

> 本文件用于在生成 Home 概念图前重新校准视觉方向，并作为 Antigravity / Gemini 批量视觉探索的正式 Brief。
> 本文件不修改 Node 8.2A 页面结构，不生成图片，不冻结最终 Hero、Resident、字体、色值或技术实现。

---

## 1. 目的、输入与边界

### 1.1 目的

Node 8.2B-R 要解决的问题不是“选择一种漂亮配色”，而是建立一个能够持续产生高质量 Home 设计的视觉判断框架：

- 页面首先像真实、完整、可上线的产品官网；
- Living Precision 成为可执行的设计逻辑，而不是一组固定视觉素材；
- Home 在没有 Resident 特效时仍然拥有品牌、产品和空间辨识度；
- 概念探索形成真正不同的结构方向，不退化为同一模板换颜色；
- 后续六个页面可以从同一系统自然扩展。

### 1.2 输入优先级

1. Node 1：Eterna 上位事实与 Website 定位；
2. Node 5：Website 1.0 用户、真实性与质量要求；
3. Node 6：信息架构、页面职责、导航与内容状态；
4. Node 7：`Living Precision / 静默生命感` 与 Web Design System；
5. Node 8.1：全站交互与 Resident Presence 规则；
6. Node 8.2A Home：已确定的叙事职责与 Section 顺序；
7. Node 4 与外部 Design Reference Pack：只提供方法；
8. Aftelle 7.5：只提取产品设计 DNA，不提供 Website UI 母版。

### 1.3 Home 结构保持不变

本 Brief 必须承载 Node 8.2A 已确定的五段职责：

```text
H-01  Eterna Orientation
H-02  Digital Resident at the Center
H-03  Continuity and Human × Resident Relationship
H-04  Products around the Resident — Aftelle / Studio
H-05  Eterna Context and Continued Exploration
```

允许创新布局、空间关系、视觉内容与交互节奏；不得改变叙事顺序、产品边界、CTA 层级或公共内容状态。

内部 `H-01`–`H-05` 名称不得直接成为官网标题。

### 1.4 Aftelle 只读来源快照

- repository：`/Users/jerryyork/Eterna_Aftelle`
- branch：`7.5`
- HEAD：`b9d92d27c9ae8b252dc784e93b5a6ea78d13080d`
- 核对内容：`AGENTS.md`、`docs/06_product_design.md`、`.cursor/rules/aftelle-frontend-design.mdc`、Stage 7.5.9 字幕 / ParticleCore 状态同步契约与实施报告、`ResidentVisualIntent.swift`
- 工作区存在与本研究无关的本地音频代码修改；本次只读，未修改 Aftelle。

---

## 2. Living Precision 重新定义

Living Precision 不是某种固定的颜色、材质、粒子或页面模板。它描述的是：内容、空间、状态、运动和关系如何以有生命但不失秩序的方式共同工作。

### 2.1 六个纠偏公式

| 纠偏 | 正式含义 |
|---|---|
| **Living ≠ particles** | Living 来自连续状态、节奏、响应、关系和内容的生命感；粒子只是可能使用的一种媒介，不是默认答案 |
| **Precision ≠ white minimalism** | Precision 来自清楚层级、比例、对齐、状态真实性和细节完成度；不是白底、细线和大量空白的风格套件 |
| **Future ≠ sci-fi** | Future 来自新的关系模型、空间逻辑、交互行为与时间感；不是霓虹、宇宙、HUD、蓝紫渐变或科技符号 |
| **Distinctive ≠ weird** | Distinctive 来自可识别且可复用的构图与系统规则；不是故意难懂、破坏阅读或追求奇怪效果 |
| **Simple ≠ empty** | Simple 是经过编辑的优先级、少而准确的元素和高信息效率；不是小字号、空洞文案与大面积无职责留白 |
| **Product-grade ≠ SaaS template** | Product-grade 来自完整、可靠、清晰、响应式、可实现和状态诚实；不是 Hero、Feature Grid、圆角卡片与 CTA 阵列 |

### 2.2 旧默认表达终止

以下组合不得继续被视为 Living Precision 的默认视觉表达：

**暖白 + 黑色 Section + 金色粒子 + 大留白 + 细线**

这些元素单独存在并非自动禁止，但任何概念若只是再次组合它们，而没有新的 Layout 逻辑、Typography 系统、产品表达、状态关系和交互结构，应判定为未完成重校准。

黑白切换必须具有内容或空间理由；金色不能成为“生命”的自动符号；粒子不能成为“Living”的自动证明；细线不能成为“Precision”的自动证明；留白不能替代内容与构图。

### 2.3 新的核心视觉原则

Home 的 Living Precision 应由以下六项共同产生：

1. **Resolved hierarchy**：访问者无需猜测当前重点、事实状态与下一步；
2. **Original spatial logic**：页面拥有贯穿五段叙事的空间语法，而非每段独立做效果；
3. **Stateful presence**：当 Resident 或界面响应出现时，它对应存在、状态或关系，不是装饰；
4. **Typographic confidence**：Typography 本身能够建立品牌、节奏和产品可信度；
5. **Product truth**：Aftelle、Studio 和长期愿景的表达与真实证据严格一致；
6. **Controlled continuity**：布局、Motion、内容和视觉材料在变化中仍属于同一系统。

---

## 3. Home 最终质量目标

每个候选方向必须同时具备：

- **Product-grade**：像经过产品团队、设计团队和工程团队共同完成的正式官网；
- **Beautiful**：比例、构图、文字、图像和节奏形成明确审美判断；
- **Simple**：内容编辑清楚，元素少而有用；
- **Distinctive**：去掉 Logo 和 Resident 特效后，仍能从版式与系统认出其身份；
- **Refined**：细节、对齐、状态、边界和空白经过打磨；
- **Cohesive**：五段叙事共享同一空间与视觉逻辑；
- **Non-generic**：不属于常见 AI、SaaS、Vibe Coding、Awwwards 或大厂模仿模板；
- **Implementable**：可以被真实 Web 布局、响应式和可访问性合理实现；
- **No obvious AI-generated feel**：没有随机样式、伪文案、错误 UI、廉价渐变、失真图形或不一致细节。

### 3.1 无 Resident 验证

所有方向必须先通过以下测试：

> 暂时完全移除 Resident 主视觉、粒子与高级特效后，页面是否仍然依靠 Typography、Layout、节奏、交互逻辑和产品表达成立？

如果答案是否定的，该方向不能进入 Resident 视觉探索。

Resident 是增强品牌关系的可选高价值层，不是掩盖页面设计不足的补丁。

---

## 4. Home 设计方向基线

### 4.1 Layout language

- 使用一个贯穿整页的空间规则，例如持续对齐轴、内容场、尺度变化、边界穿越或模块重组；
- 五段叙事可以具有不同密度，但必须看得出属于同一系统；
- 允许非对称、跨列、留白、媒体主导或界面主导，但阅读顺序始终清楚；
- 避免“每段一个居中标题 + 一张图 + 一段说明”的重复长页；
- 避免默认左文右图、Bento Grid、两列产品卡或满屏 Hero 轮播；
- Layout 创新必须能在 Mobile 收束为清楚的单轴阅读，而不是依赖桌面拼贴；
- 页面应完整包含 Header、五段主叙事与 Footer，不能只设计首屏海报。

### 4.2 Typography language

- Typography 是主要视觉材料之一，不只是内容容器；
- 使用少量、稳定的文字角色建立层级，不用随机字体变化制造新鲜感；
- Display 必须具有命题职责，不因版面空而被无限放大；
- Body 必须成熟、易读，并能承载真实产品和状态信息；
- 中文与英文分别形成自然的行长、换行、标点和尺度关系，不把英文海报直接换成中文；
- 不使用随机 serif、极小字号、过宽字距或大面积空白制造“高级感”；
- 最终字体家族与具体字号保持 `NOT_FROZEN`。

### 4.3 Spatial composition

- 空间必须表达内容关系：Eterna 在上位、Resident 在中心、产品围绕 Resident、About 回到品牌根；
- 留白承担距离、节奏、注意力或关系，不是无内容面积；
- 视觉重心可以移动，但每次移动都服务叙事推进；
- Section 边界可以通过空间、材料、媒体、文字密度或运动形成，不默认依赖黑白背景交替；
- 页面需要至少一个可被记住的空间逻辑，但不能以可用性和实现性为代价；
- Human × Resident 关系通过尺度、距离、朝向、注意与共同空间表达，不依赖完整人物插画。

### 4.4 Visual hierarchy

全页优先级固定为：

```text
Eterna 根认识
→ Digital Resident 中心概念
→ Continuity / Human × Resident 关系
→ Aftelle / Studio 产品入口
→ About 与继续探索
```

- 当前事实高于装饰与愿景；
- `LONG_TERM` 不得比 `CURRENT_VERIFIED` 更像当前产品卖点；
- Primary CTA 只服务进入 Digital Residents，不能被产品 CTA 抢夺；
- Aftelle 与 Studio 不得通过视觉面积、颜色或位置暗示未经认定的旗舰关系；
- Header、当前状态、正文、CTA 和 Footer 在任何视觉环境中保持清楚。

### 4.5 Product presentation

Aftelle 与 Studio 不使用两张普通产品卡。可探索：

- 连续的产品章节；
- 同一空间系统中的两个不同产品界面；
- 真实且获批的产品画面、细节或状态；
- 通过职责差异形成的不同内容节奏；
- 产品与 Resident 关系的空间表达；
- Typography、界面片段、真实媒体或抽象系统共同构成的产品展示。

约束：

- 不编造截图、功能、发布日期、下载或体验状态；
- 合成界面不得伪装成已经存在的产品能力；
- Aftelle 缺少 Product North Star 时只使用已确认高层边界；
- Studio North Star 说明职责与方向，不自动证明当前能力；
- 产品表达必须能从 Website Design System 扩展到未来产品，而不是两个一次性视觉广告。

### 4.6 Scroll rhythm

- 默认连续纵向滚动；
- 节奏可以通过密度、尺度、媒体、文字与交互变化形成，不靠每段全屏和强制 snap；
- 重要时刻之间需要过渡与呼吸，但不允许空白拖延阅读；
- Sticky、pinned 或 spatial interaction 只有在解释关系时使用，并提供直接滚过的路径；
- H-01–H-03 建立认知，H-04 提升产品信息密度，H-05 收束到品牌与继续探索；
- Mobile 不保留只为桌面效果存在的长距离滚动机制。

### 4.7 Motion philosophy

- Motion 用于状态、注意、关系和连续性；
- 页面本身的微响应可以提供 Living，不需要粒子参与；
- Motion 应 slow、continuous、inertial、subtle、restrained、deterministic；
- 操作反馈必须及时，不能因为“慢”而迟钝；
- 避免 reveal 套件、bounce、过度 parallax、滚动劫持、鼠标追随和装饰循环；
- reduced-motion 版本必须保持相同层级和品牌感；
- 具体时长、缓动和实现保持 `NOT_FROZEN`。

### 4.8 Human × Resident relationship

- 关系不是人物插画加粒子对象，也不是 Human 操作 AI 工具的标准场景；
- 可以通过共同空间、互相朝向、注意力、响应、尺度或时间连续性表达；
- Human 可以由真实摄影、局部身体、环境痕迹、Typography 或纯空间关系暗示；
- 不默认采用 stock “person using AI” 图片；
- 不把 Resident 表现为宠物、助手、商品、控制对象或拟人替身；
- 长期关系属于 `LONG_TERM`，不得视觉包装为当前产品能力。

### 4.9 Resident Presence 使用时机

Resident 不再被要求贯穿整页。只有同时满足以下条件时才使用：

1. 当前内容确实涉及 Resident 的存在、状态、连续性或关系；
2. Resident 能提供 Typography、Layout、真实媒体无法完成的叙事价值；
3. 没有 Resident 时页面仍成立；
4. Resident 不遮挡内容、导航、CTA 或产品事实；
5. 其状态和响应具有明确逻辑，而不是抽象粒子装饰。

允许的探索：

- 只在 H-01 出现一次；
- 只在 H-03 的关系时刻出现；
- 以非粒子的材质、界面状态、空间响应或真实产品证据表达 Presence；
- 完全没有 Resident 的 Home 概念；
- 在 H-01–H-03 中使用同一身份的有限连续序列，然后退出。

禁止：

- 每个 Section 都出现 Resident；
- 用粒子数量证明“Living”；
- 用 Resident 填补空白；
- 把 Resident 变成 Home 的固定 Logo、Avatar 或背景层；
- 进一步冻结最终身体、脸、颜色、材质或人形程度。

### 4.10 Aftelle / Studio 的首页表现

- 两者属于同一 Products 层级，但不要求视觉形式完全相同；
- 差异应来自真实产品职责、交互表面和内容类型，不来自任意换色；
- Aftelle 可以借鉴“运行中的存在、状态与关系”的产品 DNA，但不能复制粒子 Shell、字幕界面或 macOS UI；
- Studio 可以表现创作、定义、构建与发布的产品职责，但不得发明未验证界面或当前能力；
- 两个产品应被看作围绕 Digital Resident 的不同入口，而不是两张相互竞争的 SaaS 卡；
- 产品区在没有 Resident 特效时必须完整、可信并具有视觉吸引力。

---

## 5. Aftelle 可复用设计哲学

Aftelle 只提供以下方法层 DNA：

| 可复用哲学 | Website 转译 | 不得复制 |
|---|---|---|
| 产品主表面不退化为通用聊天或 SaaS | Home 必须拥有与 Eterna 内容关系一致的主表面，不套通用营销模板 | Aftelle 粒子主视觉、电影字幕、输入框、设置抽屉 |
| 视觉状态由真实产品状态驱动 | Website 的状态、产品可用性和视觉反馈必须与内容事实一致，不由视觉猜测 | `idle / listening / thinking / speaking` 的具体粒子表现 |
| Speaking 只有真实播放开始才成立 | 任何“正在发生”的视觉都必须对应真实状态，不能用动画伪造进展或能力 | 音频生命周期、字幕同步与 ParticleCore 接线 |
| Interaction 由 Intent 驱动 | Home 交互表达目的和关系，不依赖坐标技巧、鼠标追随或炫技手势 | Aftelle screen-guide、具体 Intent 类型和 macOS 交互 |
| 高级表达需要传统可用路径兜底 | 实验空间、Motion 或 Resident 退出后，导航、内容与 CTA 仍完整 | 星图设置、传统设置抽屉的具体双模式 UI |
| Resident 差异由 Resident 数据驱动，不硬编码 | Website 系统不能把一种颜色、姿态或性格写成所有 Resident 的统一外观 | Aftelle per-resident 颜色、停顿、粒子参数 |
| 状态清楚、单向、可收口 | Loading、Failure、Motion 与产品状态要有明确来源、边界和降级 | Runtime / AppController / ParticleCore 的工程链路 |
| 安静、稳定、可重复 | Home 应能在多次访问和多设备上保持克制、可理解与一致 | Aftelle Demo Lock、具体演示流程 |

Aftelle 的灰白 / 暖金粒子、圆形 Shell、Abstract Bust、嘴部脉冲、粒子桥、电影字幕和 macOS 容器布局均属于产品实现，不构成 Website 视觉规范。

---

## 6. Visual Quality Gate

每张完整 Home 概念必须逐项得到 `PASS`。出现 DEAD Anti-pattern、伪造产品事实、无 Resident 即不成立或明显不可实现时，直接淘汰；其余未通过项标记为 `REWORK`，不能进入候选短名单。

| Gate | 必须回答的问题 | `PASS` 证据 |
|---|---|---|
| `QG-01 Product reality` | 是否像真实可以上线的产品官网？ | 包含完整 Header、五段叙事、真实状态层级、CTA 与 Footer，不是海报或拼贴 |
| `QG-02 Beauty` | 是否好看？ | 构图、比例、文字、媒体、空间和细节形成一致审美判断 |
| `QG-03 Simple, not empty` | 是否简洁但不空？ | 每块空间有职责，内容少而完整，无小字 + 巨大空白的假高级 |
| `QG-04 Distinctive` | 是否有品牌辨识度？ | 去掉 Logo、配色和 Resident 后，仍存在可识别的空间与 Typography 规则 |
| `QG-05 Non-generic` | 是否避免 SaaS / Vibe Coding 模板？ | 没有默认 Hero、Feature Grid、Bento Card、CTA 阵列或常见 AI 风格 |
| `QG-06 Typography maturity` | Typography 是否成熟？ | 中英文层级、行长、换行、字重和信息密度自然可信 |
| `QG-07 Original layout logic` | Layout 是否有原创空间逻辑？ | 五段内容由一个可解释、可延展的构图规则组织，而非随机错位 |
| `QG-08 No AI feel` | 是否存在明显 AI 味？ | 无乱码、伪 UI、错误文字、廉价渐变、随机图形、细节断裂或风格漂移 |
| `QG-09 Refined` | 是否存在粗糙、随意、未打磨感？ | 对齐、边缘、状态、交互、图像裁切、间距和层级均经过处理 |
| `QG-10 No-Resident test` | 没有 Resident 特效时是否成立？ | Typography、Layout、节奏、产品表达和 CTA 仍完整且有品牌感 |
| `QG-11 Implementable` | 是否能够合理实现？ | 可用标准 Web 布局与受控增强实现，Responsive、Accessibility 与降级路径可信 |
| `QG-12 System expansion` | 六个页面未来能否扩展到同一系统？ | 规则可以支持 Home、Digital Residents、Products、Aftelle、Studio、About，而非 Home 一次性效果 |

### 6.1 审核顺序

```text
事实与结构门禁
→ No-Resident test
→ Product reality / Implementability
→ Typography / Layout / Cohesion
→ Beauty / Distinctiveness / Refinement
→ 六页面扩展检查
```

视觉冲击不能抵消事实、可用性或实现门禁失败。

---

## 7. DEAD Anti-patterns

以下方向一旦成为概念主逻辑，直接标记为 `DEAD`：

| DEAD | 识别标准 |
|---|---|
| 粒子柱 | 以垂直粒子集合充当品牌主体或 Hero |
| 沙尘 / 星云 | 用松散尘埃、宇宙云或能量雾代替 Resident 与产品关系 |
| 无脸粒子人 | 以完整或近完整无脸人体冻结 Resident 形体 |
| 普通发光粒子球 | 用行业常见粒子球自动代表 AI、生命或 Eterna |
| 左文右图 | 标准营销文案与商品图并列，缺少原创空间逻辑 |
| Hero + Feature Grid | 首屏之后进入标准功能卡片模板 |
| SaaS 卡片阵列 | 依靠圆角卡片、图标和短句拼出全部页面 |
| Aftelle / Studio 两张普通产品卡 | 将两个产品降格为对称商品入口并丢失职责关系 |
| 蓝紫 AI 渐变 | 用通用 AI 色彩套件替代品牌判断 |
| Glassmorphism | 以模糊玻璃和透明卡片制造科技感 |
| Developer Tool 黑紫风 | 将 Eterna 主站变成开发者工具或终端产品 |
| 无意义黑白大面积交替 | Section 只靠背景翻转区分，没有内容与空间理由 |
| 到处细线 + 小标签 | 用 hairline、编号和微型标签伪装精密系统 |
| 小字号 + 大留白 | 牺牲阅读与内容密度制造假高级 |
| 随机 serif | 无系统地加入衬线体制造 editorial 感 |
| 随机大圆角 | 所有表面 pill / card 化且缺少语义 |
| 艺术馆 / 建筑事务所 / 奢侈品官网感 | 形式、稀缺感或抽象空间压过产品与公众理解 |
| Behance 概念海报感 | 只有首屏构图与氛围，不是完整可用网页 |
| 无意义哲学文案 | 用抽象口号填补事实与产品内容 |
| 每个 Section 一种视觉玩法 | 全页缺少共同规则，像多个生成提示的拼接 |
| 内部 Section 名称成为官网标题 | 直接显示 Eterna Orientation、H-01 等内部设计语言 |

同时继承 Node 7 已冻结 Anti-pattern：AI Brain、Neural Network、Knowledge Graph、水晶 / 玻璃球、烟雾灵魂、沙人、完整无脸人体和标准左文右 3D Hero。

---

## 8. Gemini 探索方向族群

以下六个族群必须在结构、内容主表面、空间逻辑和交互方式上真正不同。不能只通过颜色、字体或 Resident 材质区分。

### 8.1 Direction A — Editorial Spatial Narrative

**核心设计逻辑**

以 Typography、阅读节奏和非对称编辑空间作为品牌主表面。五段叙事像一个连续的观点展开，而不是营销组件堆叠。

**Layout 特征**

- 持续的编辑 Grid 与跨段对齐轴；
- 大小不同的文字区、媒体区和留白区形成阅读节奏；
- Section 边界通过密度与构图变化形成，不依赖黑白翻转；
- 完整页面像可阅读的数字出版物，但保留明确产品导航和 CTA。

**Typography 特征**

- Typography 是主要视觉材料；
- Display、Lead、Body 与 Caption 的层级成熟；
- 中文与英文分别排版，不追求同一海报式断行；
- 可以探索 serif / sans 关系，但不得随机使用或冻结字体。

**Motion / interaction**

- 以文字、媒体和空间关系的细微进入与重组为主；
- Motion 说明叙事推进，不做滚动特效秀。

**Resident Presence**

- 可完全不出现；
- 或只作为一次编辑空间中的“存在中断”，不使用粒子装饰。

**Aftelle / Studio**

- 作为两个连续产品章节，通过职责、真实媒体与 Typography 差异展开；
- 不使用两张产品卡。

**主要风险**

- 变成杂志、艺术馆或建筑事务所官网；
- 小字、大留白、随机 serif；
- 产品和 CTA 被审美压低。

**禁止模仿**

- 奢侈品 editorial、Monocle 式杂志、建筑作品集、Claude 配色与字体。

**Gemini 重点探索**

- 中英文都成立的成熟文字层级；
- 一条贯穿五段叙事的原创编辑 Grid；
- 无 Resident、无粒子情况下的品牌辨识度。

### 8.2 Direction B — Product-as-Experience

**核心设计逻辑**

让真实产品状态、界面片段、交互反馈和产品职责成为主要视觉内容，使 Eterna 通过“产品如何工作”被感知，而不是通过抽象品牌特效被感知。

**Layout 特征**

- H-01–H-03 建立简洁品牌与概念框架；
- H-04 成为信息密度较高的产品体验章节；
- 使用真实或明确标记为概念的界面表面、状态变化和产品细节；
- 产品内容可以跨越普通容器，但不变成 Dashboard。

**Typography 特征**

- 清晰、产品化、可扫描；
- 状态、来源、说明和行动层级成熟；
- 技术信息可清楚出现，但不形成开发者工具风格。

**Motion / interaction**

- 状态转换和界面响应必须对应真实逻辑；
- 不用假数据、自动播放 Demo 或鼠标跟随制造“产品感”。

**Resident Presence**

- 可由真实产品中的状态证据间接出现；
- 不要求单独生成抽象 Resident；
- 如出现，必须对应明确状态而非背景。

**Aftelle / Studio**

- 使用不同产品职责形成不同体验表面；
- Aftelle 强调运行中的状态与关系；Studio 强调定义、创作、构建与发布；
- 只使用获批真实资产，合成界面不得伪装为现有功能。

**主要风险**

- 编造产品能力；
- 变成 SaaS Dashboard、Apple 设备陈列或产品截图墙；
- Home 被 H-04 产品区反向控制。

**禁止模仿**

- Linear 产品截图官网、Vercel 开发者平台、Apple 设备营销、通用 Dashboard SaaS。

**Gemini 重点探索**

- 产品事实如何成为高质量视觉；
- Aftelle / Studio 不用卡片仍能被清楚区分；
- 产品区如何扩展到未来产品。

### 8.3 Direction C — Quiet Interactive Environment

**核心设计逻辑**

把页面设计成一个安静、可响应的环境。Living 来自页面对阅读、注意和状态的微弱响应，而不是粒子或持续动画。

**Layout 特征**

- 少量大尺度空间区域与稳定内容锚点；
- 内容与视觉环境共享场域，但文字拥有明确安全区；
- Section 边界柔和连续，不依赖卡片或背景翻转；
- 页面在静止截图中也必须完整。

**Typography 特征**

- 克制但不弱；
- 标题有清楚存在感，正文保持足够密度；
- 不使用极小字与空白制造静谧感。

**Motion / interaction**

- 页面表面、焦点、媒体或空间对滚动与输入产生低幅、确定性响应；
- reduced-motion 下用静态层级替代；
- 不使用鼠标追随、磁性按钮或连续视差套件。

**Resident Presence**

- 优先探索无 Resident 版本；
- Resident 只可在 H-03 关系时刻短暂出现或通过环境响应被暗示。

**Aftelle / Studio**

- 作为环境中的两个明确入口或状态场，不做卡片；
- 通过内容职责和交互响应区分，而非任意配色。

**主要风险**

- 过度空、过度冷、xAI 研究实验室或奢侈品氛围；
- Motion 过于细微导致页面没有重点；
- 静态方案失去辨识度。

**禁止模仿**

- xAI 极冷实验室、Aesop / 奢侈品留白、Apple Vision 式空间展示、粒子环境 Demo。

**Gemini 重点探索**

- 不依赖 Resident 的 Living；
- 页面环境如何通过状态和注意产生生命感；
- 静止、Motion、reduced-motion 三种状态的一致性。

### 8.4 Direction D — Modular Asymmetry

**核心设计逻辑**

使用可复用但不均质的模块与非对称 Grid，建立产品级系统纪律，同时通过尺度、跨列与密度差避免卡片阵列。

**Layout 特征**

- 模块是内容结构，不是统一圆角卡片；
- 允许边到边内容面、跨列媒体、错位文字和不同密度区；
- 五段叙事使用同一模块语法，但组合方式不同；
- 能自然扩展到六个页面和未来内容类型。

**Typography 特征**

- 系统化角色与严格基线；
- 标题、状态、正文、说明和 CTA 具有稳定对齐关系；
- 通过尺度和位置建立差异，不频繁换字体。

**Motion / interaction**

- 模块可在滚动中重排、展开或交接焦点；
- 行为必须可预测、可跳过、可降级。

**Resident Presence**

- 可以突破模块边界形成一次 Presence；
- 也可完全不用 Resident，由模块状态变化表达 Living；
- 不把 Resident 放入独立卡片。

**Aftelle / Studio**

- 两者使用同一模块语法，但通过真实内容类型形成不同组合；
- 不做对称双卡或 Logo + 三条 Feature。

**主要风险**

- 变成 Bento Grid、Dashboard、Vibe Coding 卡片页；
- 大圆角、细线、小标签过多；
- 系统纪律压过品牌生命感。

**禁止模仿**

- Bento SaaS、Linear / Vercel 卡片系统、Notion Dashboard、通用 Tailwind 模板。

**Gemini 重点探索**

- 不使用卡片外壳的模块化；
- 非对称如何在 Mobile 收束；
- 同一系统支持六页面的证据。

### 8.5 Direction E — Cinematic Interface

**核心设计逻辑**

以时间、尺度、媒体和界面节奏建立 Presence，让页面像一个连续体验，但始终保持完整网站结构和产品可用性。

**Layout 特征**

- 使用少数强场景与清晰的过渡区，而不是每段全屏海报；
- 媒体、Typography 和 UI 共同构成画面；
- Header、CTA、产品事实和 Footer 不被电影感隐藏；
- 静态页面仍能读懂全部内容。

**Typography 特征**

- 简短主命题与成熟正文形成尺度对比；
- 不复制电影海报、片头字幕或 Runway 字体；
- 产品状态和来源保持清楚。

**Motion / interaction**

- Motion 负责场景交接、注意与时间连续性；
- 不使用强制全屏、滚动劫持、自动播放依赖或连续黑白翻转；
- 为每个关键时刻定义静态 fallback。

**Resident Presence**

- Resident 只作为一次叙事事件，或完全由真实媒体 / 产品状态替代；
- 不做粒子柱、星云、沙人或无脸粒子人。

**Aftelle / Studio**

- 作为两个产品章节进入同一时间线；
- 可以使用获批视频、界面和状态，但不制造影视品牌或设备广告。

**主要风险**

- 变成 Runway 模仿、Behance 海报、视频 Showreel；
- 黑底、巨大文字和强 Motion 压过产品内容；
- 实现成本和性能不可信。

**禁止模仿**

- Runway 品牌、电影节网站、全屏视频代理公司、Apple 产品发布页。

**Gemini 重点探索**

- 完整网页而非 Hero 海报；
- 场景节奏与产品信息如何共存；
- 没有视频、Resident 或 Motion 时仍成立的静态系统。

### 8.6 Direction F — Systems-led Experimental Web

**核心设计逻辑**

建立一个 Eterna 独有、可解释、可实现的 Web 行为规则，让品牌辨识度来自系统本身，而不是固定视觉资产。

**Layout 特征**

- 选择一个原创但简单的规则贯穿全页，例如内容场响应、共享边界、尺度继承、连续索引或关系对齐；
- 规则在五段中产生不同结果，但不改变导航和阅读；
- 使用标准 Web 元素与受控增强，避免纯 Shader / Canvas Demo。

**Typography 特征**

- Typography 与系统规则共同变化，但角色和可读性稳定；
- 不使用 distortion、任意旋转、破坏性排版或小字密码感。

**Motion / interaction**

- 交互按 Intent 和内容状态响应；
- 允许页面自身表现 continuity、attention 或 relationship；
- 所有行为可由静态、键盘和 reduced-motion 版本等价表达。

**Resident Presence**

- 可以完全不存在；
- Presence 可由系统对内容与用户意图的响应间接表达；
- 如使用 Resident，只在系统规则真正需要一个主体时出现。

**Aftelle / Studio**

- 两个产品使用同一原创系统规则，但通过职责产生不同状态或空间行为；
- 不使用两卡、双 Logo 或任意双色对比。

**主要风险**

- 为实验而实验；
- Awwwards / Vibe Coding 式光标、变形和滚动技巧；
- 可访问性、Mobile 或实现性失败；
- Distinctive 变成 weird。

**禁止模仿**

- Awwwards 滚动实验、WebGL Shader Demo、光标跟随作品集、生成式艺术网站。

**Gemini 重点探索**

- 一个简单原创规则如何贯穿完整 Home；
- 无 Resident 时如何表现 continuity 与 relationship；
- 规则如何扩展到另外五个页面而不变成同一模板。

---

## 9. 跨方向共同约束

六个方向都必须：

- 保持 Node 8.2A 五段叙事职责和 CTA 层级；
- 保持 Header 主导航 `Digital Residents / Products / About`；
- 保持 Home 低信息密度，但不做空页面；
- 明确区分 `CURRENT_VERIFIED`、`IN_DEVELOPMENT`、`LONG_TERM` 与 `RESEARCH`；
- 不展示完整 Universe 平台矩阵；
- 不把 Aftelle / Studio 当成两张普通产品卡；
- 不编造产品状态、界面、下载、体验或公司事实；
- 同时考虑中文、英文、Desktop、Mobile、Keyboard 与 reduced-motion；
- 通过 No-Resident test；
- 避免第三方品牌色、字体、Token、组件、Layout 与 Hero 复制。

方向之间的差异必须来自结构和主表面：

| 方向 | 主要主表面 |
|---|---|
| Editorial Spatial Narrative | Typography + editorial space |
| Product-as-Experience | Real product evidence + interface state |
| Quiet Interactive Environment | Responsive spatial environment |
| Modular Asymmetry | Reusable asymmetric content system |
| Cinematic Interface | Time + media + interface sequence |
| Systems-led Experimental Web | One original implementable behavior rule |

---

## 10. Antigravity / Gemini Visual Exploration Brief

### 10.1 生成任务

Antigravity / Gemini 应对六个方向分别生成 **4–8 个完整 Desktop Home 概念**，总探索量为 24–48 个方向性候选。

每个概念必须：

- 展示从 Header、H-01–H-05 到 Footer 的完整网页；
- 优先探索整页设计，而不是 Hero 海报；
- 保持 Node 8.2A 的叙事职责与顺序，但允许创新 Layout；
- 只使用已确认的 Eterna、Digital Resident、Aftelle、Studio 和状态边界；
- 不编造功能、当前能力、发布日期、下载、体验、团队或公司事实；
- 不锁最终 Resident、Hero、色值或字体；
- 不因为 `Living Precision` 自动生成粒子；
- 每个方向至少包含一个完全没有 Resident 的方案；
- Resident 方案必须说明它在何处承担存在、状态、响应或关系职责；
- 允许真实图片、获批产品界面、抽象图形、Typography、空间和 Motion 成为主视觉手段；
- 合成产品 UI 必须明确为视觉占位，不得伪装为已实现产品；
- 为 Mobile、reduced-motion 和无高级视觉状态保留可信收束逻辑。

### 10.2 每个概念的交付内容

每个候选至少附带：

1. 所属方向族群；
2. 一句话核心空间 / 系统逻辑；
3. 完整 Desktop Home 长页；
4. H-01–H-05 的内容映射说明；
5. Resident 是否使用、出现位置与唯一职责；
6. Aftelle / Studio 的表达方式；
7. Motion / interaction 意图说明；
8. No-Resident test 结果；
9. 实现与 Mobile 收束说明；
10. Visual Quality Gate 自检；
11. 使用的占位内容、真实资产与未经确认项清单。

### 10.3 内容占位规则

- 使用短暂的内容意图或经过核对的上位事实，不完成正式营销文案；
- 不显示 `H-01`、`Eterna Orientation`、`CURRENT_VERIFIED` 等内部标签作为官网标题；
- 产品状态需要占位时，使用清楚的非承诺说明，不生成具体能力数字或发布日期；
- 中文与英文概念分别处理文字长度，不把乱码或假英文当作设计素材；
- 不用哲学口号、AI buzzwords 或假客户评价填补页面。

### 10.4 批次多样性要求

- 同一方向内的 4–8 个方案必须改变构图规则、主表面或信息组织，不只是换配色；
- 六个方向不能共享同一 Hero、同一产品卡、同一粒子对象或同一 Section 模板；
- 至少覆盖浅色、深色、混合表面和非颜色主导的多种候选，但不把任何一类冻结为品牌答案；
- “暖白 + 黑色 Section + 金色粒子 + 大留白 + 细线”不得成为批次默认或多数输出；
- 不得复制 Claude、ElevenLabs、Runway、Linear、Vercel、xAI 或 Aftelle 的现成网页 / UI。

### 10.5 淘汰规则

以下任一情况直接淘汰：

- 命中 DEAD Anti-pattern；
- 只生成 Hero、海报或首屏；
- 页面没有 Resident 就失去品牌或结构；
- 编造产品事实或当前能力；
- 明显 AI-generated feel；
- 无法解释实现路径或 Mobile 收束；
- 不能扩展到六页面设计系统；
- 以第三方品牌或 Aftelle UI 为母版。

---

## 11. Open / NOT_FROZEN

本文件不冻结：

- 六个探索族群中的最终选择；
- 最终 Home Layout 与 Hero；
- 最终 Resident 是否出现、出现位置、形体、脸、颜色、材质与人形程度；
- 最终 Human 资产与 Human × Resident 构图；
- 最终字体家族、字号、字重、字距与排版数值；
- 最终品牌色值、Surface、Radius、Hairline、阴影或材质；
- 最终图片、视频、产品界面或抽象图形资产；
- 最终 Motion、交互、持续时间、缓动与响应参数；
- Aftelle / Studio 可公开的具体当前能力和产品素材；
- 具体 breakpoint、渲染方案、技术栈与工程实现；
- 正式中文与英文 Home 文案。

概念图只能提供候选证据，不能自行把任何开放项升级为 `FROZEN`。

---

## 12. Review Status

本 Brief 完成以下重校准：

- Living Precision 不再与粒子、白色极简或科幻视觉绑定；
- Home 必须先通过 No-Resident test；
- 产品级、美观、简洁、辨识度、完成度、统一性与可实现性同时进入正式 Quality Gate；
- 所有旧默认模板和失败方向进入 DEAD 清单；
- Gemini 获得六个结构差异明确的探索族群；
- Aftelle 只提供状态诚实、Intent、可用性兜底与安静稳定等产品哲学，不提供 Website UI。

Node 8.2B-R 状态：`PASS（冻结范围与最终裁决以 node8-freeze-v0.1.md 为准；视觉探索方向不代表最终视觉已冻结）`
