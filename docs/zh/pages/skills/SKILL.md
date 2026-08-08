<!-- kaggle-docs: machine-translated zh-CN from English source -->

---
名称：kaggle-cli
描述：>
  使用本地 Kaggle CLI 技能进行命令指导、工作流程和
  跨竞赛、数据集、内核/笔记本、模型进行故障排除，
  模型变体和版本、收件箱文件上传、论坛/讨论、
  基准、配置、OAuth/API 令牌身份验证和加速器
  配额。当用户询问 kaggle CLI 命令时激活此技能，
  示例、标志、元数据文件、下载/上传流程、提交、
  基准测试任务，或 Kaggle CLI 行为。
---

# Kaggle CLI

使用此技能可以在`kaggle`命令行工具上进行应答或操作。治疗
该技能及其参考作为可用的命令指南。

## 快速入门

```bash
pip install kaggle
kaggle --help
```

身份验证选项：

```bash
kaggle auth login
# or set KAGGLE_API_TOKEN
# or place an access token in ~/.kaggle/access_token
# or use legacy ~/.kaggle/kaggle.json credentials
```

## 命令树

```text
kaggle
├── competitions | c
│   ├── list, files, download, submit, submissions, leaderboard
│   ├── team-submissions, episodes, replay, logs, pages
│   └── topics {list, show}, topic-messages
├── datasets | d
│   ├── list, files, download, init, create, version
│   ├── metadata, status, delete
│   └── topics {list, show}
├── kernels | k
│   └── list, files, init, push|update, pull|get, output, status, logs, delete
├── models | m
│   ├── list, init, create, get, update, delete
│   ├── topics {list, show}
│   └── variations | instances | v | i
│       ├── get, init, create, files, list, update, delete
│       └── versions | v {list, create, download, files, delete}
├── files {upload}
├── forums | f {list, topics {list, show}}
├── benchmarks | b
│   ├── auth, init
│   ├── tasks | t {push, run, list, status, download, log|logs, models, delete, publish}
│   └── topics {list, show}
├── config {view, set, unset}
├── auth {login, print-access-token, revoke}
├── quota
└── search
```

注意：CLI 接受别名，例如 `kernels get` 代表 `kernels pull` 以及
`kernels update` 为 `kernels push`。不推荐
`models variations versions init`；使用 `models variations init` 进行变化
而是使用元数据。

## 参考图

仅阅读用户任务所需的参考：- [Competitions](references/competitions.md) - 竞赛发现、文件、下载、提交、排行榜、模拟、页面、主题。
- [Datasets](references/datasets.md) - 数据集搜索、文件、下载、元数据、创建/版本/状态/删除、主题。
- [Kernels](references/kernels.md) - 笔记本/脚本发现、元数据、推/拉、输出、状态、日志、删除。
- [Models](references/models.md) - 模型记录、元数据、创建/获取/更新/删除、模型主题。
- [Model Variations](references/model_variations.md) - 创建和管理特定于框架的模型变体。
- [Model Variation Versions](references/model_variations_versions.md) - 创建、列出、下载、检查和删除变体版本。
- [Files](references/files.md) - 收件箱上传、可断点上传、目录压缩行为。
- [Forums](references/forums.md) - 全球讨论论坛、主题和评论。
- [Benchmarks](references/benchmarks.md) - 基准验证/初始化、任务推送/运行/状态/下载/日志/模型流程、基准主题。
- [Configuration](references/configuration.md) - 配置文件，默认路径，代理，默认竞争。
- [Authentication](references/auth.md) - OAuth 登录、访问令牌打印、撤销、令牌/密钥源。
- [Quota](references/quota.md) - 每周 GPU/TPU 加速器配额。
- [Search](references/search.md) - 对竞赛、数据集、笔记本、模型、用户和讨论进行统一的跨内容搜索。

## 操作指导- 仅阅读用户任务所需的参考。
- 当标记时更喜欢`kaggle <group> --help`或`kaggle <group> <command> --help`
  在已安装的 CLI 中不确定。
- 对于元数据文件，更喜欢相关的`init`命令来生成启动器
  在编辑文件之前。
- 不要发明本技能中未列出的命令。如果活着`--help`
  输出不同，将其报告为特定于版本的差异。