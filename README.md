<!-- BEGIN ETERNA REPOSITORY COMPASS -->

## Eterna 仓库指南针

| 仓库 | 职责 |
|---|---|
| [Eterna_Docs](https://github.com/JerryYork3516/Eterna_Docs) | Eterna 上位定义、数字居民规范、产品边界与长期知识库 |
| [Eterna_StudioLegacy](https://github.com/JerryYork3516/Eterna_StudioLegacy) | Studio Legacy 代码、历史实现、迁移来源与回归基线 |
| [Eterna_StudioNext](https://github.com/JerryYork3516/Eterna_StudioNext) | Studio Next 的规划、架构、契约、开发与测试主仓库 |
| [Eterna_Aftelle](https://github.com/JerryYork3516/Eterna_Aftelle) | 数字居民加载、运行、语音、视觉表现与陪伴应用 |
| [Eterna_Website](https://github.com/JerryYork3516/Eterna_Website) | Eterna 官方网站、品牌展示与公开产品入口 |

权威关系：

- Eterna 上位定义以 `Eterna_Docs` 为准。
- Studio Next 实现以 `Eterna_StudioNext` 为准。
- Legacy 事实与迁移基线以 `Eterna_StudioLegacy` 为准。
- Aftelle 运行端行为以 `Eterna_Aftelle` 为准。
- 官方网站实现以 `Eterna_Website` 为准。

<!-- END ETERNA REPOSITORY COMPASS -->

# Eterna Website

Eterna Website 是 Eterna 的长期项目官网、品牌门户与公开产品体系总入口。

## Current Status

- Website 1.0 的规划、冻结结果与开发约束位于 `docs/`。
- Stage 0 已完成：Node 1–10 与 P1–P7 均已收口。
- Node 10 状态为 `PASS / FROZEN`。
- Stage 1 与 Stage 1.1 均为 `READY_TO_START / NOT_STARTED`；Stage 1.2–1.9 为 `NOT_STARTED`。
- 仓库根目录的 Next.js App Router 正式应用尚不存在。

## Repository Structure

- `docs/`：Website 1.0 当前规划、冻结结果与开发约束。
- `legacy/`：旧 React / Vite 网站；仅作为历史实现、迁移事实与参考来源，不是 Website 1.0 目标实现。
- `references/`：参考材料，不构成正式设计权威。
- `assets/`：当前资产占位与未来正式资产区域。

## Development Entry

正式开发开始前：

- 不要按旧 Vite 方式从仓库根目录启动网站。
- 不要把 `legacy/` 当作 Website 1.0 的目标实现。
- Stage 1.1 将在仓库根目录建立新的 Next.js App Router 应用。
- `npm install`、`npm run dev` 等正式命令将在 Stage 1.1 实际创建工程后，根据真实脚本补充到本文件。

## Authority

- Eterna 上位事实以 `Eterna_Docs` 为准。
- Website 规划与开发约束以 `docs/` 为准。
- `legacy/` 只证明历史实现与迁移事实。
- Website 1.0 最终实现以 Stage 1.1 开始后建立的仓库根应用为准。
