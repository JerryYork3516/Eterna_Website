# Eterna Website 外部 design-md 视觉参考包 v0.1

内部版本：`v0.1`

文档性质：`REFERENCE_ONLY`

状态：`REFERENCE_ONLY`

整理日期：`2026-08-07`（Asia/Shanghai）

> 本文件是 Eterna Website 的外部只读视觉研究资料，不是 Eterna Design System，不是 Node 7 正式输出，也不是任何 Agent 可以直接照搬的视觉规范。
> 本文件不决定 Eterna 的最终颜色、字体、Hero、粒子、动效、组件或页面实现，不把六套来源 token 转化为 Eterna token。

---

## 1. 来源与使用边界

### 1.1 固定来源

- repository：`VoltAgent/awesome-design-md`
- local snapshot：`/private/tmp/eterna-awesome-design-md.4UBHtB/awesome-design-md`
- commit：`8147538b4226ae41e2487a9179e3bcc1f68e8554`

已读取文件：

| 对象 | 文件 |
| --- | --- |
| Claude | `design-md/claude/DESIGN.md` |
| Runway | `design-md/runwayml/DESIGN.md` |
| Linear | `design-md/linear.app/DESIGN.md` |
| Vercel | `design-md/vercel/DESIGN.md` |
| ElevenLabs | `design-md/elevenlabs/DESIGN.md` |
| xAI | `design-md/x.ai/DESIGN.md` |

### 1.2 证据属性

- 六份文件是 `awesome-design-md` 中的外部分析资料，不是六家品牌发布的官方设计规范。
- Claude、Linear、Vercel、ElevenLabs、xAI 文件在来源中标记为 `alpha`；Runway 文件未提供相同版本字段。
- 多份文件使用 “Inspired” 或 “design analysis” 描述自身，内容包含观察、提取、推断及示例性组件，不应被视为官方 token 或品牌授权资产。
- 固定 commit 中六个目录均只有 `DESIGN.md` 与 `README.md`，没有 `preview.html`、`preview-dark.html` 或其他本地预览文件。
- 本文件只提炼可供 Node 7 继续判断的设计维度，不验证来源网站当前线上状态，也不补全来源未记录的动效、资产或交互细节。

---

## 2. Claude

### 2.1 核心视觉特征

- 暖色、带纸张感的浅色画布与深色产品表面交替，形成编辑式节奏。
- 展示字体与人文无衬线正文形成“出版物而非传统 SaaS 页面”的气质。
- 视觉语言强调文学感、可亲近性和思考氛围，主动远离常见冷蓝 AI 品牌表达。

### 2.2 色彩使用原则

- 来源以暖奶油色为基础画布，以暖黑文字建立阅读层级。
- 珊瑚色承担来源品牌的主要强调和 CTA 电压，使用有明确范围。
- 深色表面主要承载代码、终端与产品展示，深浅表面切换承担页面节奏。
- 对 Eterna 只参考“温度、克制和表面节奏”，不继承任何具体颜色或组合。

### 2.3 Typography 原则

- 低字重 serif display 与 humanist sans body 分工明确。
- 标题依靠尺度、字形与紧凑 tracking 建立 editorial 层级，而不是依靠粗重字重。
- 正文、导航和标签保持清晰、稳定，代码内容才使用 monospace。

### 2.4 Layout / spacing 原则

- 来源采用稳定间距尺度、较大的区段呼吸和约束后的内容宽度。
- 内容卡片内部留白充分，标题与正文形成清楚的阅读节奏。
- 浅色内容区与深色产品区交替，页面节奏来自内容性质变化而非装饰堆积。

### 2.5 Surface / depth / shape 原则

- 深度首先由浅色画布、浅色卡片和深色产品表面的色块关系建立。
- 阴影使用极少，hairline 和表面色差比浮夸投影更重要。
- 圆角存在层级，但不是所有内容都使用同一种软化程度。

### 2.6 Motion / visual-content 原则

- 来源记录了线条插画、代码窗口、终端和产品界面作为主要视觉内容，摄影使用较少。
- 来源明确把消息出现、代码打字和演示卡动画时序列为未覆盖内容，因此不从该文件推导 Claude 的正式 motion 规则。

### 2.7 对 Eterna 值得参考的部分

- 人文感与温度；
- editorial 信息层级；
- 避免传统冷蓝 AI SaaS 气质；
- 以轻字重、内容节奏和表面关系建立沉静表达。

这些只对应 `Human / Warmth` 参考维度，不决定 Eterna 的颜色或字体。

### 2.8 明确禁止直接复制的部分

- Claude / Anthropic 配色；
- Copernicus、Tiempos、StyreneB 等专有或来源指定字体；
- 珊瑚 CTA；
- Anthropic 品牌标识、radial-spike glyph；
- Claude 卡片、导航、按钮、代码窗口或其他组件外观；
- 来源中的 token 数值与页面节奏配方。

---

## 3. Runway

### 3.1 核心视觉特征

- 电影化摄影和视频是主要视觉内容，界面自身退到接近不可见。
- 页面区段像镜头或场景切换一样形成连续节奏。
- 深色、编辑式、低 UI 噪声，内容图像承担大部分情绪和空间表达。

### 3.2 色彩使用原则

- 来源界面以黑、白和冷中性色为主，颜色主要来自摄影与视频本身。
- 不依靠 UI gradient 或装饰性色块制造丰富度。
- 暗色背景、微弱边界与高质量影像共同建立观看焦点。

### 3.3 Typography 原则

- 单一几何无衬线覆盖 display、正文与微标签，通过字号、字重、大小写和 tracking 区分层级。
- 大标题行高紧凑、字距略收紧，产生电影标题般的密度。
- uppercase 与较松字距用于小型导航标签，帮助建立结构标记。

### 3.4 Layout / spacing 原则

- 全幅视觉、宽容器和非对称图像网格形成 editorial magazine 节奏。
- 大区段之间保留场景式停顿，图像本身也承担留白与节奏功能。
- 混合尺寸视觉内容形成主次，而不是把所有项目做成均匀卡片阵列。

### 3.5 Surface / depth / shape 原则

- 界面基本无阴影，边框极少且非常轻。
- 深度来自摄影的光线、景深、构图和深浅区段交替，不来自 CSS 投影。
- 形状克制，小圆角服务内容容器，不形成强烈 UI 品牌符号。

### 3.6 Motion / visual-content 原则

- 来源明确记录 full-bleed photography 和 video 为主要视觉内容，并要求跨设备保持画面比例。
- 来源未记录动画时长、缓动或过渡系统，不能据此形成 Eterna motion 规范。

### 3.7 对 Eterna 值得参考的部分

- 电影感；
- 强视觉内容主导；
- UI 主动退后；
- 页面像场景一样形成节奏；
- 减少无意义装饰和阴影。

这些只对应 `Cinematic / Presence` 参考维度，不意味着 Eterna 必须采用摄影或视频。

### 3.8 明确禁止直接复制的部分

- 全站摄影或视频主导；
- abcNormal / Runway 字体体系；
- Runway 的影视品牌身份；
- 来源中的黑白冷灰配方、影像网格和 film-title 排版；
- Runway 导航、卡片、组件或具体页面结构。

---

## 4. Linear

### 4.1 核心视觉特征

- 近黑画布、极低视觉噪声和高度精确的产品工具气质。
- 多级深色 surface 与 hairline 构成细密层级，单一强调色只出现在少量关键位置。
- 产品 UI 截图是来源营销页面的视觉主角，外层网页界面只提供克制框架。

### 4.2 色彩使用原则

- 来源以深色中性色阶构成大部分层级，只保留一个低频品牌强调色。
- 强调色服务品牌标记、主要动作、focus 和链接，不作为装饰性大面积填充。
- 状态颜色与营销强调色保持不同职责。

### 4.3 Typography 原则

- 自定义 display / text sans 形成连续单一声线，mono 只进入代码和产品内容。
- 大字号使用更明显的负字距，正文保持克制和可读。
- 层级依靠尺度、字重和微小 tracking 差异精细区分。

### 4.4 Layout / spacing 原则

- 稳定的基础间距和统一 section rhythm 支撑密集但有序的产品信息。
- 产品截图面板可以占据完整内容宽度，外围说明保持紧凑。
- 卡片网格按设备减少列数，不通过压缩内容破坏精度。

### 4.5 Surface / depth / shape 原则

- 多级 surface ladder 与多级 hairline 是核心层级工具。
- 基本不依赖 drop shadow；背景亮度、边线和轻微边缘高光承担深度。
- 圆角尺度小而受控，pill 只用于特定状态或切换，不成为全局装饰。

### 4.6 Motion / visual-content 原则

- 来源把高保真产品 UI 截图视为主要视觉内容，并要求截图保持比例、不裁切。
- 文件没有形成动画、缓动或时序规则，因此只记录静态 precision，不推导 motion。

### 4.7 对 Eterna 值得参考的部分

- 高精度；
- 极低视觉噪声；
- surface hierarchy；
- hairline 层级；
- 单一强调色的克制使用；
- 不依赖阴影制造层级。

这些只对应 `Precision / Restraint` 参考维度。

### 4.8 明确禁止直接复制的部分

- Linear 黑紫视觉身份；
- Developer Tool 风格；
- 产品截图主导官网；
- Linear 专有字体；
- Linear surface、hairline、accent 和 radius token；
- Linear 按钮、状态 pill、产品面板及页面组件外观。

---

## 5. Vercel

### 5.1 核心视觉特征

- 近白画布、近黑文字和完整中性色阶形成高度系统化的技术品牌界面。
- 几何无衬线与技术型 monospace 分工清晰，复杂技术内容仍维持整齐视觉层级。
- 来源把多色 mesh gradient 视为品牌级装饰对象，但其余界面保持严格克制。

### 5.2 色彩使用原则

- 大部分营销界面由黑、白、近白和灰阶承担，语义色有清楚用途。
- 高饱和颜色主要集中为特定品牌 gradient，而非散落到所有组件。
- 明暗反转区段用于内容层级与节奏，避免同时引入过多强调机制。

### 5.3 Typography 原则

- 几何 sans 统一 display、正文、按钮和链接；mono 只承担代码、终端和技术标签。
- 标题使用有限字重、负字距和 sentence case 建立技术清晰感。
- 字号、行高、字重和间距形成一致层级，而不是依靠大量装饰。

### 5.4 Layout / spacing 原则

- 明确基础单位、完整 spacing scale、最大内容宽度和响应式列规则。
- 大区段留白充分，卡片内部信息密度较高，形成“外部宽松、内部精确”的节奏。
- 网格和容器规则允许技术内容、代码与营销内容保持同一秩序。

### 5.5 Surface / depth / shape 原则

- surface、hairline、语义色和 elevation 被系统化区分。
- 阴影由多个低强度层叠与 inset hairline 形成，不使用单一重投影。
- marketing radius、in-product radius 和 pill 尺度各自有明确职责。

### 5.6 Motion / visual-content 原则

- 来源记录 mesh gradient、代码窗口、模板缩略图和明暗区段作为主要视觉内容。
- 文件没有提供动画时长、缓动或状态转换规则；mesh gradient 在本参考包中只作为来源视觉事实，不形成 Eterna 动效或 Hero 建议。

### 5.7 对 Eterna 值得参考的部分

- Design Token 的系统性；
- 黑、白、中性色层级纪律；
- Typography 和 spacing 的一致性；
- 技术信息也能保持视觉清晰。

这些只对应 `System Discipline / Clarity` 参考维度，不表示 Eterna 应采用 Vercel 的视觉身份。

### 5.8 明确禁止直接复制的部分

- Vercel 品牌配色；
- mesh gradient；
- Geist 作为品牌特征；
- 开发者平台视觉身份；
- 来源中的 token 数值、阴影组合、pill、组件和页面模式；
- auto-derived illustrative examples 作为 Eterna 组件蓝本。

---

## 6. ElevenLabs

### 6.1 核心视觉特征

- 柔和、自然、接近编辑刊物的生命感，而不是暗色开发者工具气质。
- 大面积低刺激中性色与轻字重 display 构成安静背景，atmospheric color 提供有限视觉能量。
- CTA 保持低调，品牌主体由排版、空间与气氛共同承担。

### 6.2 色彩使用原则

- 来源以 off-white、暖黑和低对比中性色为基础。
- pastel atmospheric color 只作为柔和背景气氛，不作为按钮、正文或全部卡片的填充色。
- 主要 CTA 使用近黑中性色，而非高饱和品牌色。

### 6.3 Typography 原则

- 轻字重 serif display 与清晰 sans body 形成编辑式对照。
- 标题不依赖 bold，正文通过适度字距和行高保持阅读感。
- 标签与正文有稳定分层，但不抢夺主要叙事。

### 6.4 Layout / spacing 原则

- 较大 section rhythm 和约束后的内容宽度形成杂志式呼吸。
- 视觉气氛占用空间但不压迫正文，内容卡片之间保持适中间距。
- 响应式通过减少列数和缩小气氛元素维持同一信息秩序。

### 6.5 Surface / depth / shape 原则

- off-white canvas、白色 card、hairline 和单级轻阴影形成柔和深度。
- atmospheric light / color 独立于内容表面，不把 gradient 当作组件填充。
- 来源偏好较柔和圆角和 pill CTA，但这些属于 ElevenLabs 自身外观。

### 6.6 Motion / visual-content 原则

- 来源记录 atmospheric gradient orbs、waveform 和声音相关产品内容作为视觉元素。
- orb drift、waveform pulse 与 hero entrance 的动画时序被明确列为来源缺口，因此不形成 motion 结论。

### 6.7 对 Eterna 值得参考的部分

- 柔和、自然的生命感；
- 克制的视觉强调；
- atmospheric light / color 的使用方式；
- 编辑式排版；
- CTA 不抢夺品牌主体。

这些只对应 `Human / Warmth` 参考维度。

### 6.8 明确禁止直接复制的部分

- 具体 pastel gradient orb；
- Waldenburg 字体；
- ElevenLabs 卡片和按钮造型；
- 来源配色、pill、waveform、voice row 与其他组件外观；
- 来源 token 或 gradient stop 数值。

---

## 7. xAI

### 7.1 核心视觉特征

- 近黑画布、巨大常规字重标题、大空间与极低颜色密度构成工程化未来感。
- 白色 outline pill 和 hairline 是主要交互与层级语言。
- 视觉表达非常稀疏，接近研究机构发布界面而非传统产品营销页。

### 7.2 色彩使用原则

- 来源以白色与近黑色承担绝大多数信息和交互。
- 暖橙、紫和蓝等 accent 只在少量产品插图中出现，主界面保持低颜色密度。
- 颜色节制本身构成品牌姿态，不依赖大量特效制造未来感。

### 7.3 Typography 原则

- 单一几何 sans 以常规字重贯穿 display 与正文，层级主要来自巨大尺度和负字距。
- uppercase tracked monospace 只用于 eyebrow、指标与技术标签。
- 不通过加粗制造力量感。

### 7.4 Layout / spacing 原则

- 内容宽度受到约束，页面以大标题、大空间和少量双列内容形成稀疏节奏。
- 响应式规则简单，移动端缩小标题并将双列变为单列。
- 页面不依赖复杂网格或高密度内容维持气质。

### 7.5 Surface / depth / shape 原则

- 只有少量近黑 surface 层级，hairline 承担卡片和按钮边界。
- 来源不使用阴影；8px card 与 universal pill 构成非常有限的 shape vocabulary。
- 深度极弱，界面更接近平面信息发布。

### 7.6 Motion / visual-content 原则

- 来源记录稀疏 SVG 产品插图，并明确主营销表面不以摄影或 gradient hero 为主。
- 文件没有动画、缓动或过渡系统证据，不能推导 xAI motion 规则。

### 7.7 对 Eterna 值得参考的部分

xAI 主要作为 `Futuristic Minimalism Boundary` 对照参考：

- 极简；
- 巨大字体；
- 大空间；
- 低颜色密度；
- 未来感不依赖大量特效。

同时必须记录以下风险：

- 可能过度冷峻；
- 可能缺少生命和关系感；
- 容易形成研究实验室，而不是 Eterna 的数字生命品牌气质。

### 7.8 明确禁止直接复制的部分

- xAI 近黑白视觉身份；
- Universal Sans 与 tracked mono 的品牌组合；
- 全局 outline pill 语言；
- 研究实验室式冷峻语气；
- xAI 的卡片、按钮、标题尺度、颜色和 token；
- 以稀疏感替代 Eterna 对 Resident、关系与生命感的独立表达。

---

## 8. 五个综合参考轴

以下只定义不同来源分别提供的观察维度，不形成 Eterna 最终方案。

| 参考轴 | 主要来源 | 在本参考包中的作用 |
| --- | --- | --- |
| `Human / Warmth` | Claude、ElevenLabs | 观察人文温度、编辑感、柔和生命感与克制强调 |
| `Cinematic / Presence` | Runway | 观察强视觉内容、场景节奏与 UI 退后 |
| `Precision / Restraint` | Linear | 观察低噪声、surface / hairline 层级与精度 |
| `System Discipline / Clarity` | Vercel | 观察 token、typography、spacing 与技术信息秩序 |
| `Futuristic Minimalism Boundary` | xAI | 观察低颜色密度与大空间，同时识别过度冷峻的边界 |

---

## 9. Eterna 使用原则

1. Eterna 最终视觉不能是六家风格的平均混合。
2. 六个来源只负责提供不同设计维度，不提供可直接拼装的配色、字体、token、组件或页面。
3. Claude 与 ElevenLabs 不共同决定 Eterna 的暖色方案；它们只提供 `Human / Warmth` 观察。
4. Runway 不决定 Eterna 必须采用摄影或视频；它只提供 `Cinematic / Presence` 观察。
5. Linear 与 Vercel 不把 Eterna 变成开发者工具或平台品牌；它们只提供精度与系统纪律观察。
6. xAI 是边界对照，不是 Eterna 的目标风格。
7. Eterna 自己的核心视觉身份——数字生命、Resident、粒子、连续存在、人与数字智能的关系——必须在 Node 7 中独立设计。
8. Node 7 必须重新验证任何被考虑的方法是否符合 Eterna 上位事实、信息架构、双语、可访问性、性能与品牌 GAP；本参考包不替代该判断。

---

## 10. 来源缺失与不确定项

- 六份来源均不是官方品牌规范，不能证明对应公司完整、当前或唯一的设计系统。
- 六个目录没有本地 preview 文件，无法使用固定 commit 内的渲染结果交叉验证所有文字描述。
- Claude 未覆盖消息、代码打字和 agent demo 的动画时序；表单状态与产品 UI 也只覆盖一部分。
- Runway 记录视频和影像主导，但没有 motion duration、easing 或过渡规范。
- Linear 未记录营销站 light mode、表单错误状态或完整产品色彩系统；自定义字体为专有资源。
- Vercel 文件包含 auto-derived illustrative examples；这些示例不是 Eterna 组件需求，也不能证明全部为 Vercel 官方组件。
- ElevenLabs 未覆盖 orb drift、waveform pulse、hero entrance 时序，产品内部界面与表单状态只部分记录。
- xAI 没有正式 motion 规则或完整语义色系统记录；文件自身是 inspired analysis。
- 任何源文件未记录的内容保持未知，不从 README、印象或品牌常识补写。

---

本参考包最终性质：`REFERENCE_ONLY`
