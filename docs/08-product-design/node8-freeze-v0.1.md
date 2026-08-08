# Eterna Website 1.0 Node 8 冻结记录 v0.1

内部版本：`v0.1`

文档性质：Website 1.0 Node 8 正式范围收口与冻结记录

状态：`PASS / FROZEN`

冻结日期：`2026-08-08`（Asia/Shanghai）

> 本文件是 Node 8 的正式状态摘要与范围裁决。它冻结已经足以进入真实开发的产品设计规则，同时明确把最终高保真视觉从“开发前必须冻结”调整为“在真实浏览器实现中持续设计与收敛”。
> 本次收口不修改 Node 1–7 的定位、需求、信息架构或 Visual Quality Gate，也不把任何失败概念图提升为正式设计依据。

---

## 1. 最终结论

Node 8 最终状态：`PASS / FROZEN`。

Node 8 已经完成进入 Node 9 所需的产品设计冻结。现有 Node 8 子文档中标记为 `REVIEW_REQUIRED` 的页面结构与视觉探索材料，按本文件重新解释：

- Home 与 Digital Residents 的 Narrative Arc、Section Architecture、页面职责、CTA 层级、内容状态边界与 Resident Presence 使用边界，纳入本次冻结；
- 最终 Layout、Hero、高保真视觉、具体视觉参数与最终资产不因本次冻结而获得批准；
- 概念探索方向、生成批次和未通过质量门禁的输出不构成实现依据；
- 本文件是 Node 8 状态与冻结范围的最终裁决，后续以本文件列出的 `FROZEN` / `NOT_FROZEN` 边界为准。

---

## 2. 已冻结范围

以下内容正式标记为 `FROZEN`：

1. 全站共性交互规则；
2. Header / Navigation / Footer 设计原则；
3. Resident Presence 使用边界；
4. Motion / Responsive / Accessibility / Degradation 原则；
5. Home Narrative Arc 与 Section Architecture；
6. Digital Residents Narrative Arc 与 Section Architecture；
7. `Living Precision / 静默生命感` 视觉质量目标；
8. Visual Quality Gate；
9. Anti-pattern / DEAD Gate；
10. 产品级、简洁、好看、有辨识度、无明显 AI 味的设计要求。

### 2.1 Home 冻结内容

Home 继续采用以下五段叙事职责与顺序：

```text
H-01  Eterna Orientation
H-02  Digital Resident at the Center
H-03  Continuity and Human × Resident Relationship
H-04  Products around the Resident — Aftelle / Studio
H-05  Eterna Context and Continued Exploration
```

冻结的是叙事顺序、唯一职责、CTA 层级、内容状态和 Presence 出现逻辑，不是公开标题、最终版式或最终视觉。

### 2.2 Digital Residents 冻结内容

Digital Residents 继续采用以下八段叙事职责与顺序：

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

冻结的是叙事顺序、页面问题、产品边界、CTA 层级、内容状态和 Presence 节奏，不是正式定义文案、最终构图或 Resident 最终外观。

### 2.3 Visual Quality Gate 继续有效

后续浏览器设计与实现必须继续满足既有质量门禁，至少包括：

- 真实、完整、可上线的产品官网质量；
- 美观、简洁但不空洞；
- 具有 Eterna 自身的空间、排版和系统辨识度；
- 不退化为通用 AI、SaaS、Vibe Coding 或模板化页面；
- 中英文 Typography、Layout、状态和 CTA 成熟可信；
- 无明显 AI 生成感、随机样式、伪 UI、错误文字或细节漂移；
- 去除 Resident 与高级特效后，页面仍然完整成立；
- 能够真实实现，并具备 Mobile、Accessibility、reduced-motion 和失败降级路径；
- 能从 Home 扩展到全部 Website 1.0 页面，而不是一次性首屏效果。

命中既有 Anti-pattern / DEAD Gate 的方案不得因“已经写进代码”而自动通过。

---

## 3. 明确 `NOT_FROZEN`

以下内容不再阻塞 Node 8，统一转入真实开发阶段边做边设计：

- 最终 Home Layout；
- 最终高保真视觉稿；
- Hero；
- 最终 Typography 参数；
- 最终 Color；
- Resident 最终视觉形态；
- 图片 / 视频资产；
- Motion 具体参数；
- Products / Aftelle / Studio / About 的最终视觉布局；
- Mobile 最终视觉细节。

这些项目的 `NOT_FROZEN` 表示最终答案需要在真实浏览器中形成，不表示可以无记录地任意决定，也不表示可以绕过人工审核、质量门禁或上位事实边界。

### 3.1 Products / Aftelle / Studio / About Eterna 的设计处理

Products、Aftelle、Studio 与 About Eterna 的详细 Narrative Arc、Section Architecture、页面级交互和最终视觉，统一转入 `Design in Browser`。

实施时必须同时受以下正式边界约束：

- Node 6 已冻结的页面职责；
- Node 8.1 已冻结的全站规则；
- Node 7 / Node 8 Visual Quality Gate；
- Anti-pattern / DEAD Gate。

四个页面必须分别在真实路由、真实中英文内容、真实响应式与降级状态下接受逐页人工浏览器审核。任一页面未通过对应职责、产品边界、视觉质量、Accessibility、Responsive 或 Degradation 审核时，必须继续设计与收敛，不能因已经进入实现阶段而默认通过。

这不代表取消 Products、Aftelle、Studio 或 About Eterna 的页面设计，只是不再要求在开发前冻结其完整高保真规格。其详细叙事、Section 组织、页面交互和最终视觉必须在真实网页中形成、记录并经人工裁决。

---

## 4. 正式范围调整

这是一次正式的范围调整。

由于连续多轮静态概念图未达到产品级视觉质量要求，Eterna Website 不再强制要求在开发前冻结完整高保真页面视觉。

静态概念图没有充分证明以下关键质量：

- 真实页面的完整信息层级与滚动节奏；
- 中文与英文在真实宽度中的排版成熟度；
- Desktop、Tablet、Mobile 的连续响应；
- Motion、Resident Presence 与内容安全区的实际关系；
- Header、Navigation、CTA、Focus、reduced-motion 与降级状态的真实行为；
- 页面在浏览器中是否仍然产品级、好看、简洁、有辨识度且无明显 AI 味。

因此，“开发前冻结完整高保真页面”不再是 Node 8 的通过条件。Node 8 以已经冻结的规范、页面职责、叙事结构和质量门禁完成收口。

---

## 5. 后续正式工作方式：`Design in Browser`

后续采用：`Design in Browser`。

正式流程为：

```text
设计规范 + 页面职责先冻结
→ 技术架构
→ 开发真实网页
→ 浏览器人工审核
→ 边实现边设计和收敛最终视觉
```

该方式要求：

1. 使用真实内容结构、真实路由、真实响应式和真实浏览器渲染评估设计；
2. 允许在组件、页面和 Motion 层快速调整，但每次调整仍受 Node 1–8 已冻结边界约束；
3. 最终视觉通过浏览器人工审核收敛，不以单张静态图、生成图或代码完成度替代视觉判断；
4. Desktop、Tablet、Mobile、中文、英文、键盘、reduced-motion 和高级视觉降级均进入真实审核；
5. 未通过 Visual Quality Gate 的实现必须继续迭代，不能因架构或开发成本而降低标准；
6. 技术架构必须支持快速视觉迭代，不能让样式、内容、Motion 或高级视觉修改被过重抽象拖慢。

`Design in Browser` 不代表取消设计要求，也不得降低 Node 7 / Node 8 的 Visual Quality Gate。

---

## 6. 失败概念图处置

- 不保留任何失败概念图作为正式设计依据；
- 未通过 Product Reality、No-Resident、Implementability、Typography、Layout、Beauty、Distinctiveness、Refinement 或 Anti-pattern / DEAD Gate 的输出，不进入正式设计基线；
- 概念图文件、生成记录或外部工作区中的候选即使被保留为过程证据，也只能标记为历史探索，不能用于证明最终 Layout、Hero、Resident、Typography、Color、Motion 或 Mobile 细节已经获批；
- 当前仓库正式 Node 8 基线只由已冻结规则、页面职责、Narrative Arc、Section Architecture 和质量门禁构成，不由失败视觉输出构成。

---

## 7. 对 Node 9 的约束

Node 9 技术架构必须支持：

- 快速视觉迭代；
- 组件级调整；
- Motion 迭代；
- 浏览器实时审核；
- 中文与英文对应页面同时校验；
- Resident / advanced visual 的独立加载、关闭与降级；
- 不因架构过重拖慢设计修改。

Node 9 不得以技术选型重新打开或降低本文件已经冻结的产品设计边界，也不得把具体框架、渲染库或部署平台提升为品牌设计答案。

---

Node 8 最终状态：`PASS / FROZEN`
