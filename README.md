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
- 仓库根目录已经建立 Website 1.0 的 Next.js App Router 工程基线。
- 当前根页面仅用于验证工程、测试与 Preview 链路，不是正式 Home，也不代表 Website 1.0 已上线 Production。
- 正式开发阶段、范围与完成状态以 `docs/10-development-plan/development-plan-v0.1.md` 为准。

## Repository Structure

- `docs/`：Website 1.0 当前规划、冻结结果与开发约束。
- `app/`：Website 1.0 根 Next.js 应用；新站开发和运行从仓库根目录进入。
- `tests/`：根应用的 contract、Legacy isolation、浏览器与 Accessibility smoke tests。
- `legacy/`：旧 React / Vite 网站；保持 `REFERENCE_ONLY` 与只读，仅作为历史实现、迁移事实和回归参考，不是 Website 1.0 的运行入口或依赖。
- `references/`：参考材料，不构成正式设计权威。
- `assets/`：仓库管理的 Website 资产区域。

## Requirements

- Node.js `24.17.0`，由 `.nvmrc` 固定；`package.json` 接受 `>=24.17.0 <25`。
- npm `11.13.0`，由 `packageManager` 固定；`package.json` 接受 `>=11.13.0 <12`。
- 依赖以根 `package-lock.json` 为准，使用 `npm ci` 进行 frozen install。

```bash
nvm use
npm ci
```

## Local Development

从仓库根目录启动 Website 1.0：

```bash
npm run dev
```

默认地址为 `http://localhost:3000`。当前应用不要求业务环境变量；`.env.example` 只记录 Local / Preview / Production 边界，真实值不得提交。若需要本地私有值，使用已被 Git 忽略的 `.env.local`。

`legacy/` 不得被根应用 import、copy 或作为依赖。默认不要修改、格式化、升级或运行 Legacy；任何 Legacy 验证或迁移都必须由单独任务明确授权，并在 `legacy/` 边界内执行。

## Commands

以下命令均从仓库根目录执行：

| Command                | Responsibility                                                               |
| ---------------------- | ---------------------------------------------------------------------------- |
| `npm run dev`          | 启动根 Next.js 本地开发服务器                                                |
| `npm run format:check` | 使用 Prettier 检查当前工程文件格式，不写入文件                               |
| `npm run lint`         | 运行 ESLint                                                                  |
| `npm run typecheck`    | 生成 Next.js 类型并执行 TypeScript strict typecheck                          |
| `npm test`             | 运行 Vitest contract tests，包括 Legacy isolation 的正常与违规路径           |
| `npm run build`        | 生成 production build artifact；不执行 Production deployment                 |
| `npm run start`        | 在 `npm run build` 后本地启动 production build                               |
| `npm run audit`        | 审核当前 npm 依赖树                                                          |
| `npm run test:browser` | 在 Chromium、Firefox、WebKit 中执行根页面、axe 与 reduced-motion smoke tests |

首次在本机运行 browser tests 前，安装当前 Playwright 版本对应的浏览器：

```bash
npx playwright install chromium firefox webkit
npm run test:browser
```

Browser smoke 会自行在 `127.0.0.1:3100` 启动根应用。自动检查只提供工程证据，不代表正式视觉、Responsive、Safari 或人工 Accessibility Gate 已通过。

## CI

GitHub Actions 在 push 和 pull request 上使用干净 checkout 与 `npm ci`，依次执行 format、lint、typecheck、Vitest、production build、dependency audit、CodeQL，以及 Chromium / Firefox / WebKit 的 browser 和 axe smoke tests。CI 复用上述 npm scripts，不定义第二套本地检查入口。

## Environments

- **Local**：通过 `npm run dev` 启动；当前不需要业务环境变量，不使用 Preview 或 Production secret。
- **Preview**：由 Vercel Git integration 为具体 commit 生成，用于工程与后续审核；Preview credential / data 只能位于 Vercel Preview 环境，响应带有 `X-Robots-Tag: noindex`。Preview 不是 Production，也不构成上线或内容发布证明。
- **Production**：与 Local、Preview 分离；Production credential / data 不得进入仓库或 Preview。Production deployment、promotion、domain 与 DNS 操作均不属于当前工程入口，必须经过后续明确授权。

Contact 与 Analytics 当前保持关闭，因此没有对应环境变量、运行命令或数据接入。

## Authority

- Eterna 上位事实以 `Eterna_Docs` 为准。
- Website 规划与开发约束以 `docs/` 为准。
- `legacy/` 只证明历史实现与迁移事实。
- Website 1.0 的当前实现以仓库根 Next.js 应用为准。
