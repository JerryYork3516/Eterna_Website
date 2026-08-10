# Eterna Website 1.0 — Skills / Plugins / Tool Governance

内部版本：`v0.1`

文档性质：`P5-C Rules / Tool Governance / P5 Finalization`

状态：`PASS / P5 COMPLETE`

编制日期：`2026-08-10`（Asia/Shanghai）

审计基线：`New@1a1d3d6eb37063d2f43cddc7c56e809c48ca4f7b`

> 本文件冻结 Website 的 repo-local Skills、工具路由、权限边界和生命周期。
> 本轮没有安装 Plugin、MCP、Playwright、axe、Lighthouse 或 Vercel CLI，没有修改外部权限、配置 CI、开始 P6 / P7 或执行 D1。

---

## 1. Scope

Tool Governance 决定 Agent 使用什么能力、默认权限是什么、何时必须转交人工。它不决定产品事实、页面设计、工程写法或 P6 自动门禁的具体实现。

```text
Rule = always-on constraint
Skill = task-specific reusable workflow
Plugin / MCP = external capability provider
External tool = CLI / CI / human-operated capability
Automation = deterministic machine gate
```

同一能力只保留一条 preferred path；fallback 必须承担不同职责或解决已证明的缺口。

---

## 2. Authority hierarchy

```text
Eterna upstream facts
→ Node 1–10
→ AGENTS.md
→ Engineering Standards
→ Tool Governance
→ task-specific Skill
→ Plugin / MCP / external tool
→ P6 deterministic automation
```

- Node 文档决定产品、内容、设计、技术和阶段边界。
- `AGENTS.md` 决定 Agent 如何工作。
- Engineering Standards 决定代码如何写和审核。
- Tool Governance 决定能力路由、权限和 lifecycle。
- Skill 只在匹配任务中组织 workflow。
- Plugin / MCP / external tool 只提供能力，不产生授权或事实。
- P6 负责可重复、确定性的机器门禁。

任何下层能力都不得覆盖上层规则。`TOOL_CAN_DO_IT ≠ AGENT_IS_AUTHORIZED_TO_DO_IT`。

---

## 3. Final Skill set

### CORE PROJECT SKILLS

1. `website-behavior-preserving-simplification`
   - 只在用户明确要求 simplify、cleanup、remove duplication / abstraction 或 AI code smell 时触发；
   - 对既有实现做行为保持的最小简化；
   - 不改变 scope、public contract 或视觉结果。
2. `website-design-in-browser-review`
   - 只在用户明确要求 browser、visual、UI、responsive 或 Design in Browser review 时触发；
   - 收集真实浏览器证据和 findings；
   - 最终停在 `HUMAN_VISUAL_DECISION_REQUIRED`。

```text
CORE = 2
OPTIONAL = NONE
```

### DEFER

- Content / Fact Review Skill；
- Release / RC Review Skill。

### REJECT

- Website Code Review Skill；
- Dependency Review Skill；
- Lint / Typecheck / Build Skill；
- Generic Website Helper；
- external tool wrapper Skill。

`.agents/skills/` 是 Codex 与 Cursor 的项目工作流单一来源。不创建 `.cursor/skills/`、第二套 prompt template 或其他 Skill copy。

---

## 4. Preferred tool paths

| Capability | Preferred | Fallback | Human-only / boundary |
|---|---|---|---|
| Local repository | native filesystem + shell + Git | `NONE` | destructive Git 仍需明确授权 |
| GitHub local work | native Git | `NONE` | force-push、merge 和 admin actions |
| GitHub remote context | existing GitHub Connector，`READ_ONLY_FIRST` | GitHub UI；按真实任务人工恢复的 `gh` | remote write 需当前任务授权；settings / protection / default branch 为人工 |
| Browser evidence | Codex Browser / Computer Use | manual Chrome / real device | final Visual Quality Gate = `HUMAN` |
| Deterministic browser evidence | Playwright + axe after P6 / D1 | existing task-specific manual evidence | 自动结果不产生视觉 PASS |
| Preview deployment | Vercel Git integration after D1 | human-operated Vercel Dashboard | Production promotion 不自动执行 |
| Deployment inspection | Vercel Dashboard；按需只读 CLI | approved read-only API / MCP only after a proven gap | promotion、rollback、domain、DNS、production secret |
| Documentation | official documentation through current Web access | locked dependency docs after D1 | 不增加 Documentation MCP / Context7 |
| Security | P6 deterministic dependency、secret、SAST / CodeQL checks | scoped human security review | finding disposition、bypass、patch merge |
| Figma | `DEFER` | named approved file 的未来 read-only access | design source approval、write / delete / publish |

明确拒绝重复 Filesystem MCP、Git MCP、Terminal MCP、第二套 GitHub MCP、第二套 Browser MCP 和 Documentation MCP。

---

## 5. Permission model

```text
one capability
→ one preferred path
→ minimum scope
→ explicit write authorization
→ auditable evidence
```

默认规则：

- 从单个 repository / project / file 的 read-only access 开始；
- technical capability 不自动扩大当前任务授权；
- remote write 必须由当前任务明确要求；
- Preview 与 Production identity、credential 和 data 分离；
- secret 不进入 prompt、repository、client、log 或 evidence；
- 第三方返回值按 untrusted input 处理；
- 自动检查不能替代 Content、Visual、RC、Security disposition 或 Production 人工裁决。

```text
KNOWN_CAPABILITY_RISK:
GitHub Connector technical permission scope is broader than Website's default operational authority.
```

治理结论：

```text
technical capability
≠
authorized action
```

GitHub Connector 默认只用于 read-only remote branch、PR、review 和 workflow context。任何 remote write 需要当前任务明确授权；任何 admin / destructive operation 需要人工明确授权。P5-C 不修改外部账户、Connector 权限或 GitHub settings。未来若产品 UI 能安全缩减为 single-repository read-only / minimal-write scope，推荐由人工调整。

---

## 6. High-impact actions

以下操作统一为 `HUMAN-AUTHORIZED HIGH-IMPACT ACTION`：

- Production deployment、promotion 或 rollback；
- DNS change、domain transfer 或 canonical cutover；
- secret creation、reveal、rotation 或 deletion；
- branch protection 或 GitHub default branch modification；
- destructive repository admin、force-push 或 branch deletion；
- production resource deletion 或 production data write；
- security / release gate bypass；
- rollback window close 或 Legacy deletion。

Plugin、MCP、CLI 或 Connector 暴露这些能力，不构成执行授权。必须获得当前操作的 explicit human authorization，并在执行前确认 target、rollback 和 evidence boundary。

---

## 7. Deferred / rejected tools

### DEFER

- Vercel MCP / Plugin：等真实只读 inspection 缺口和可限制 scope 被证明；
- Figma MCP / Plugin：等正式 Figma-centered workflow 出现；
- Codex Security：等 D8、攻击面扩大、server functionality 增多或真实 security review need；
- Cloudflare integration：保持 Node 9 fallback，不形成双平台首发工具链；
- Sentry、Analytics、CMS、visual regression 与 accessibility SaaS：等真实运营、内容或测量需求。

### REJECT

- 与 native filesystem、shell、Git 重复的 MCP；
- 与现有 GitHub Connector 重复的 GitHub MCP；
- 与 Browser / Computer Use + future Playwright 分工重复的 Browser MCP；
- 与 current Web access 重复的 Documentation MCP / Context7；
- “可能有用”但没有当前问题、owner、permission 和 removal path 的工具。

`DEFER` 不等于预批准；重新评估时仍需完整准入。

---

## 8. Tool lifecycle

新增 Skill、Plugin、MCP 或 external tool 前必须回答：

1. 当前真实问题是什么？
2. 当前 preferred path 为什么不够？
3. 是否与已有能力重复？
4. 使用频率是否值得？
5. 最小权限和高影响操作是什么？
6. repository code、内容、secret 或 deployment metadata 会发送给谁？
7. 配置、认证、版本和 failure surface 的维护成本是什么？
8. 是否容易停用、移除或替换？

不能证明净价值时：`DO NOT ADD`。

出现以下任一情况时，应由人工审核停用或移除：

- 长期不用；
- 被原生能力取代；
- 与其他工具重复；
- 权限成本明显高于收益；
- 维护停止、兼容性持续漂移；
- 产生不稳定、错误或不可审计行为。

工具移除不得删除项目证据、破坏 deterministic gate 或绕过 release / security history。

---

## 9. P6 handoff

P6 负责选择并落实：

- format、lint、typecheck、tests、build；
- YAML schema、route validation、locale pairing、publication gates；
- secret scanning、dependency auditing、SAST / security deterministic checks；
- axe automation、Playwright smoke；
- performance automation；
- deterministic release checks。

P5 不安装、配置或运行这些门禁。P6 必须继续服从 Engineering Standards、Tool Governance、最小依赖和人工 Gate 边界。

---

## 10. P5 final state

```text
P5-A = PASS
P5-B = PASS
P5-C = PASS
P5 = FINAL PASS

PROJECT_SKILLS_CREATED = YES
CORE_PROJECT_SKILLS = 2
OPTIONAL_PROJECT_SKILLS = NONE
EXTERNAL_INSTALLATION = NOT_PERFORMED

P6 = NOT_STARTED
P7 = NOT_STARTED
Node 10 = REVIEW_REQUIRED
D1–D9 = NOT_STARTED
Node 1–10 = UNCHANGED
Legacy = NO CHANGES
Production authority = HUMAN-AUTHORIZED
```
