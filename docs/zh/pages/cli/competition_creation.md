<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 通过 CLI 举办竞赛

本页记录了在 kaggle-cli 中为新版本添加的面向主机的命令
公共竞赛创建 API 端点（kagglesdk 0.1.31+）：

- [⟦T32⟧](#kaggle-competitions-init)
- [⟦T33⟧](#kaggle-competitions-create)
- [⟦T34⟧](#kaggle-competitions-pages-create)
- [⟦T35⟧](#kaggle-competitions-hosts)
- [⟦T36⟧](#kaggle-competitions-settings-get)
- [⟦T37⟧](#kaggle-competitions-settings-update)
- [⟦T38⟧](#kaggle-competitions-data-update)
- [⟦T39⟧](#kaggle-competitions-solution-create)
- [⟦T40⟧](#kaggle-competitions-solution-status)
- [⟦T41⟧](#kaggle-competitions-launch)

所有这些命令都需要经过身份验证的会话
（`kaggle config set username/password` 或 API 令牌）。

典型的端到端主机工作流程如下所示：

```bash
# 1. Scaffold a metadata file.
kaggle competitions init ./my-comp

# 2. Edit ./my-comp/competition-metadata.json (fill in the INSERT_* placeholders).

# 3. Create the (unlaunched) competition.
kaggle competitions create -p ./my-comp
# → Competition created: https://www.kaggle.com/competitions/my-comp-slug

# 4. Author the description and rules pages.
kaggle competitions pages create my-comp-slug --name description -f ./description.md --publish
kaggle competitions pages create my-comp-slug --name rules -f ./rules.md --publish

# 5. Update the competition data (train.csv, test.csv, sample_submission.csv, ...).
kaggle competitions data update my-comp-slug -p ./data -m "Initial release"

# 6. Upload the private solution CSV, then poll until scoring is ready.
kaggle competitions solution create my-comp-slug -p ./solution.csv
kaggle competitions solution status my-comp-slug
# → Ready: true

# 7. Optionally tune host-only settings not covered by competition-metadata.json
#    (deadlines, runtime caps, leaderboard behavior, etc.).
kaggle competitions settings get my-comp-slug
kaggle competitions settings update my-comp-slug -f ./settings.json

# 8. Launch the competition (now, or schedule a future UTC time).
kaggle competitions launch my-comp-slug --at 2027-01-01T00:00:00Z
```

这些命令是独立的 - 例如，您可以调用 `pages create`
在已经存在的竞赛上，或在创建的竞赛上使用`launch`
通过主机向导。

---

## `kaggle competitions init`

将 `competition-metadata.json` 模板写入文件夹。

**用途：**

```bash
kaggle competitions init [folder]
```

**参数：**

- `folder`（可选）：在哪里写`competition-metadata.json`。默认为
  当前目录。

**示例：**

```bash
kaggle competitions init ./my-comp
```

生成的文件：

```json
{
  "title": "INSERT_TITLE_HERE",
  "slug": "INSERT_SLUG_HERE",
  "briefDescription": "INSERT_BRIEF_DESCRIPTION_HERE",
  "privacy": "PUBLIC",
  "disableKernels": false,
  "hackathon": false,
  "cloneCompetitionId": null,
  "cloneExcludeCompetitionData": null,
  "clonePageNames": null,
  "licenseId": null,
  "organizationId": null,
  "numPrizes": null,
  "restrictLinkToEmailList": null,
  "reward": null
}
```

请参阅下面的[Metadata reference](#competition-metadata-reference)了解每个内容的含义
场的意思。

---

## `kaggle competitions create`

从 `competition-metadata.json` 创建一个新的竞赛。比赛是
在未启动（暂存）状态下创建 - 使用
[⟦T51⟧](#kaggle-competitions-launch) 发布。

**用途：**

```bash
kaggle competitions create [-p folder]
```

**选项：**

- `-p, --path <folder>`：包含`competition-metadata.json`的文件夹。默认值
  到当前目录。

**示例：**

```bash
kaggle competitions create -p ./my-comp
# → Competition created: https://www.kaggle.com/competitions/my-comp-slug
```

**您可能会看到的错误：**- `Default title detected, please update competition-metadata.json before creating`
  — 您忘记替换其中一个 `INSERT_*_HERE` 占位符。
- `Invalid privacy '...'` — `privacy` 必须是 `PUBLIC`、`LIMITED`、`PRIVATE` 之一。
- `Metadata file not found: competition-metadata.json` — 首先运行`init`，或者通过
  `-p` 指向包含该文件的文件夹。

### 竞赛元数据参考

所有字段均采用 `competition-metadata.json`（驼峰式键）。

**必填：**

|领域|类型 |笔记|
|---|---|---|
| `title` |字符串 |显示比赛页面上显示的标题。 |
| `slug` |字符串 |网址段；小写字母、连字符必须在站点范围内唯一，并且不能全部是数字或连字符。 |
| `briefDescription` |字符串 |标题下的一行副标题。 |
| `privacy` |字符串 | `PUBLIC`、`LIMITED`、`PRIVATE` 之一。 |

**选修的：**|领域|类型 |笔记|
|---|---|---|
| `disableKernels` |布尔 |如果`true`，笔记本提交将被禁用。 |
| `hackathon` |布尔 |创建为黑客马拉松竞赛。 |
| `restrictLinkToEmailList` |布尔 |将邀请链接加入者限制在主机维护的允许列表中。 |
| `cloneCompetitionId` |整数 |如果设置，则克隆本次竞赛的配置/页面/数据/评估设置。 |
| `cloneExcludeCompetitionData` |布尔 |如果是克隆，请跳过复制数据（解决方案、沙箱提交、图像、数据包）。 |
| `clonePageNames` |字符串[] |如果是克隆，则仅复制这些页面名称。省略/null 以复制全部。 |
| `licenseId` |整数 |竞赛数据的许可证 ID。 |
| `organizationId` |整数 |将此竞赛与一个组织联系起来（所有组织成员的只读访问权限）。 |
| `numPrizes` |整数 |排行榜奖励位置的数量。 |
| `reward` |对象|见下文。 |

**`reward`对象：**

```json
{
  "id": "USD",
  "quantity": 25000,
  "clarification": "Total prize pool split across the top 5 teams."
}
```

`reward.id` 是以下之一：`USD`、`KUDOS`、`AUD`、`EUR`、`JOBS`、`SWAG`、`GBP`、
`KNOWLEDGE`、`PRIZES`。 `clarification` 是可选的自由格式文本，显示在旁边
奖品。

---

## `kaggle competitions pages create`

在 a 上创建一个新页面（描述、规则、评估、数据描述等）
您主办的比赛。

**用途：**

```bash
kaggle competitions pages create <competition> --page-name <page-name> -f <path> \
    [--mime-type <type>] [--post-title "<title>"] [--publish]
```

**参数：**

- `<competition>`：比赛子弹。

**选项：**- `--page-name <page-name>`（必填）：页面名称（例如`description`、`rules`、
  `evaluation`、`data-description`、`prizes`）。常规名称有
  被大赛页面UI识别；允许使用新名称，但不会
  显示在标准选项卡中。
- `-f, --file <path>`（必需）：内容成为页面的文件的路径
  身体。
- `--mime-type <type>`（可选）：内容的 MIME 类型。默认为
  `text/html` 服务器端。
- `--post-title "<title>"`（可选）：标题显示在页面正文上方。
  默认为页面名称。
- `--publish`（可选）：立即发布页面。如果没有这个标志
  页面是在暂存（未发布）状态下创建的，因此您可以在之前查看它
  上线了。

**示例：**

```bash
# Create the rules page in a staged (not-yet-published) state.
kaggle competitions pages create my-comp --page-name rules -f ./rules.md \
    --mime-type text/markdown --post-title "Competition Rules"

# When you're ready to make it visible to participants:
kaggle competitions pages update my-comp --page-name rules --publish
```

每个页面作为单个记录存在； `--publish` / `--unpublish` 切换其
可见性，而不是创建单独的草稿和实时副本。换新的
稍后内容，使用
[⟦T110⟧](#kaggle-competitions-pages-update) — 一个
相同页面名称的第二个`create`将被拒绝。

您可以使用 `kaggle competitions pages` 列出和检查现有页面
（或显式的`kaggle competitions pages list`），用以下命令修改一个
[⟦T114⟧](#kaggle-competitions-pages-update)，或
用 [⟦T115⟧](#kaggle-competitions-pages-delete) 删除一个。

---

## `kaggle competitions pages update`更新现有竞赛页面上的字段。只有您提供的标志是
已发送（FieldMask 是根据非默认参数构建的），所以这是
以及如何就地发布或取消发布页面。

**用途：**

```bash
kaggle competitions pages update <competition> --page-name <current-name> \
    [-f <path>] [--new-name <name>] [--mime-type <type>] \
    [--post-title "<title>"] [--publish | --unpublish]
```

**参数：**

- `<competition>`：比赛蛞蝓。

**选项：**

- `--page-name <current-name>`（必填）：页面的当前名称（用作
  标识符；通过`--new-name`重命名）。
- `-f, --file <path>`（可选）：包含新页面正文的文件的路径。
- `--new-name <name>`（可选）：重命名页面。
- `--mime-type <type>`（可选）：内容的新 MIME 类型。
- `--post-title "<title>"`（可选）：新标题显示在页面内容上方。
- `--publish` / `--unpublish`（可选，互斥）：发布或
  取消发布页面。

至少需要一个更新标志。

**示例：**

```bash
# Publish a staged page without changing its content.
kaggle competitions pages update my-comp --page-name rules --publish

# Swap in new content and update the visible title in one call.
kaggle competitions pages update my-comp --page-name rules \
    -f ./rules-v2.md --post-title "Competition Rules (v2)"

# Rename a page.
kaggle competitions pages update my-comp --page-name evaluation \
    --new-name scoring
```

**注意：**一小部分页面是后端保留的，无法修改
更名；尝试重命名会从服务器返回错误。

---

## `kaggle competitions pages delete`

从您主办的竞赛中删除页面。提示确认，除非
`-y/--yes` 已通过（匹配现有的 `kaggle datasets delete` /
`kaggle kernels delete` 模式）。

**用途：**

```bash
kaggle competitions pages delete <competition> --page-name <name> [-y]
```

**参数：**

- `<competition>`：比赛子弹。

**选项：**- `--page-name <name>`（必填）：要删除的页面的名称。
- `-y, --yes`（可选）：跳过确认提示 — 对于脚本很有用。

**示例：**

```bash
# Interactive: prompts "Are you sure you want to delete the page 'faq' ...?"
kaggle competitions pages delete my-comp --page-name faq

# Scripted: skip the prompt.
kaggle competitions pages delete my-comp --page-name faq -y
```

**注意：**一小部分页面受后端保护，无法修改
已删除；尝试删除一个会从服务器返回一个错误。

删除是不可恢复的——不存在“恢复删除”。首先列出页面
`kaggle competitions pages list <competition>` 如果您不确定名字。

---

## `kaggle competitions hosts`

列出竞赛的主机（具有主机访问权限的用户）。有用于
确认谁可以编辑设置、上传数据或启动 - 尤其是在之后
通过 Web UI 添加或删除协作者。

**用途：**

```bash
kaggle competitions hosts <competition> [-v | --format json]
```

**参数：**

- `<competition>`：比赛子弹。

**示例：**

```bash
# Table output.
kaggle competitions hosts my-comp

# CSV — useful for piping into other tools.
kaggle competitions hosts my-comp -v

# JSON.
kaggle competitions hosts my-comp --format json
```

输出列：`userName`、`displayName`、`id`、`profileUrl`。

---

## `kaggle competitions settings get`

显示您主办的比赛的统一设置 blob — 同一组
“设置”选项卡在 Web UI 中公开的字段，涵盖一般信息，
访问和团队、关键日期、提交和排行榜行为、代码
竞争参数和主持人归因。默认情况下，输出按 UI 部分分组，并隐藏其左侧的字段
输入默认值（未设置字符串、`false`布尔值、零整数）。通过`--json`
原始 blob（驼峰式键，匹配更新负载格式）。

**用途：**

```bash
kaggle competitions settings get <competition> [--json]
```

**参数：**

- `<competition>`：比赛子弹。

**示例：**

```bash
# Grouped, human-readable summary.
kaggle competitions settings get my-comp

# Machine-readable dump — pipe into jq, or save + edit + feed back to update.
kaggle competitions settings get my-comp --json > settings.json
```

---

## `kaggle competitions settings update`

对比赛设置进行部分更新。您编写 JSON 或
仅包含您要更改的字段的 YAML 文件； CLI 构建
服务器端 FieldMask 来自文件中存在的密钥，因此未指定
字段被保留。

典型的循环是：

1. `kaggle competitions settings get my-comp --json > settings.json` — 拉
   当前值。
2. 编辑文件，仅保留要更改的字段（删除其余字段）。
3.`kaggle competitions settings update my-comp -f ./settings.json`。

**用途：**

```bash
kaggle competitions settings update <competition> -f <path> [--json]
```

**参数：**

- `<competition>`：比赛鼻涕虫。

**选项：**

- `-f, --from-file <path>`（必需）：包含字段的 JSON 或 YAML 文件
  更新。扩展选择解析器（`.yaml`/`.yml`→YAML，其他任何→
  JSON）。密钥可能是 `snake_case` （匹配 SDK）或 `camelCase` （匹配
  `settings get` 的`--json` 输出）。
- `--json`（可选）：更新后，将返回的设置打印为JSON
  而不是分组文本视图。

**示例：**

切换单个布尔值：

```json
// disable-leaderboard.json
{ "has_leaderboard": false }
``````bash
kaggle competitions settings update my-comp -f ./disable-leaderboard.json
```

设定比赛截止日期：

```json
// deadline.json
{ "deadline": "2027-02-01T23:59:00Z" }
```

```bash
kaggle competitions settings update my-comp -f ./deadline.json
```

突破代码竞争运行时间上限并设置竞争和团队合并
截止日期（YAML，混合类型）：

```yaml
# tune.yaml
max_cpu_runtime_minutes: 540
max_gpu_runtime_minutes: 720
deadline: 2027-02-01T23:59:00Z
team_merger_explicit_deadline: 2027-01-15T00:00:00Z
rules_required: true
```

```bash
kaggle competitions settings update my-comp -f ./tune.yaml
```

**键入注释：**

- 布尔值 → JSON `true`/`false`（或 YAML 等效项）。
- 数字字段→普通数字（`240`，`1.5`）。
- 日期时间字段 → ISO-8601 字符串（`"2027-01-01T00:00:00Z"` 或带有
  显式偏移）。
- 枚举字段 (`host_segment`, `publicly_cloneable`) → 枚举成员名称
  作为字符串；全名 (`"HOST_SEGMENT_FEATURED"`) 或缩写
  后缀（`"FEATURED"`）有效。

**常见错误：**

- `Unknown competition setting: '<name>'` — 字段名称不在
  `CompetitionSettings`。检查 `settings get --json` 以获得确切的密钥。
- `Field '<name>' expects a bool, got str` — 文件有一个字符串，其中
  需要布尔值（例如 `"true"` 而不是 `true`）。
- `not a valid HostSegment. Allowed: ...` — 您传递的枚举值不是
  会员；该错误列出了接受的名称。
- 某些设置仅限于 Kaggle 管理员（在
  原型——例如`host_segment`、`directly_responsible_user_id`）和服务器
  将拒绝非管理主机对它们的写入。

---

## `kaggle competitions launch`

发起您主办的竞赛。没有`--at`，比赛开始
立即。通过 `--at`，后端安排给定 UTC 的启动
瞬间。

**用途：**

```bash
kaggle competitions launch <competition> [--at <ISO-8601 UTC>]
```

**参数：**- `<competition>`：比赛鼻涕虫。

**选项：**

- `--at <iso>`：安排在未来的 UTC 时间启动。接受 ISO-8601
  （例如 `2027-01-01T00:00:00Z` 或 `2027-01-01T00:00:00+00:00`）。比赛
  如果省略则立即启动。

**示例：**

```bash
# Launch right now.
kaggle competitions launch my-comp

# Schedule the launch for midnight UTC on 2027-01-01.
kaggle competitions launch my-comp --at 2027-01-01T00:00:00Z
```

一场比赛只能发起一次。后续调用将被拒绝
后端。

---

## `kaggle competitions data update`

为您主办的比赛创建新版本的数据文件。上传
通过标准 blob 上传管道，然后发送单个请求捆绑
上传的令牌。每次更新**都会替换先前版本的文件集
full** — v1 中没有每个文件的“保留上一个”模式，因此列出每个文件
新版本中您想要的文件。

**用途：**

```bash
kaggle competitions data update <competition> -p <path> -m "<version notes>" \
    [--rerun] [--include-hidden] [--ignore-patterns <patterns>]
```

**参数：**

- `<competition>`：比赛子弹。

**选项：**- `-p, --path <path>`（必需）：要么是一个**目录**（递归地遍历 -
  每个文件都会上传，其相对路径保留在 API 中
  `name` 字段，例如`train/images/img1.jpg`)，或**单个存档文件**
  （例如预打包的`.zip`或`.tar`）按原样上传。子目录是
  总是经过；隐藏条目（参见`--include-hidden`）是唯一的文件
  默认跳过。
- `-m, --message "<notes>"`（必填）：描述此版本的注释
  （例如`"Added test set"`）。
- `--rerun`（可选）：更新 RERUN 数据包 — 仅私有主机
  重新运行评分期间交换数据。目前需要 Kaggle 管理员访问权限。
  如果没有此标志，更新将针对 PUBLIC 数据包（什么
  参与者下载）。
- `--include-hidden`（可选）：上传隐藏文件并遍历隐藏
  子目录（名称以 `.` 开头 — 例如 `.DS_Store`、`.git/`、
  `.gitignore`）。默认情况下会跳过，这样您就不会意外发布操作系统
  元数据或版本控制碎片。
- `--ignore-patterns <patterns>`（可选）：上传文件/目录时要忽略的模式。可以指定多次。请注意，当 `--include-hidden` 为 True 时，将绕过默认忽略模式（如 `.git/`、`.cache/`、`.huggingface/`）。

**示例：**

```bash
# Update using a directory tree (recurses into sub-folders).
kaggle competitions data update my-comp -p ./data -m "Initial release"

# Update using a pre-packed archive as a single file (useful when you already
# need a zip for other purposes, or for directory-shaped file formats like
# Zarr).
kaggle competitions data update my-comp -p ./data.zip -m "Initial release"

# New version with a bug-fix.
kaggle competitions data update my-comp -p ./data -m "Fix label encoding in train.csv"

# Update the private rerun-scoring data.
kaggle competitions data update my-comp -p ./rerun-data \
    -m "Held-out test set" --rerun
```**关于目录形文件格式的注释：** 某些格式（Zarr、某些
TensorFlow SavedModel 布局等）是磁盘上的目录，逻辑上是
一个单元。如果您传递包含这种格式的目录，则递归
walk 将每个内部块作为自己的文件上传 - 通常是您想要的
Zarr，因为参与者可以流式传输各个块。如果你愿意
保持格式为不透明的单个上传，将其预先打包成`.zip`或
`.tar` 并将该文件传递给`-p`。

该命令打印公共 URL 以及新的 `databundle_id` 和
`databundle_version_id` 成功。

---

## `kaggle competitions solution create`

上传您主办的竞赛的专用解决方案 CSV。解决办法是
后端对提交进行评分的依据是什么 - 示例中每行一行
提交，具有相同的柱形。上传后，后台运行
预处理/采样；民意调查
[⟦T208⟧](#kaggle-competitions-solution-status)
直到`ready`才开始提交。

文件通过标准 blob 上传管道上传，然后生成结果
令牌被传递到`CreateCompetitionSolution`。

**用途：**

```bash
kaggle competitions solution create <competition> -p <path> [-q]
```

**参数：**

- `<competition>`：比赛子弹。

**选项：**- `-p, --path <path>`（必需）：单个 CSV 文件的路径。必须是单身
  file — 目录被拒绝。 CSV 形状必须与提交的内容匹配
  文件（与`sample_submission.csv`相同的列）。
- `-q, --quiet`（可选）：抑制每个文件上传进度线。

**示例：**

```bash
kaggle competitions solution create my-comp -p ./solution.csv
# → Solution uploaded for "my-comp". Run 'kaggle competitions solution status my-comp' to check readiness.
```

重新上传解决方案会替换之前的解决方案。请注意，这仅适用于
启动前；启动后解决方案文件被冻结。

---

## `kaggle competitions solution status`

显示竞赛解决方案文件的设置状态 - 是否
预处理/采样已完成，后端报告的任何错误，以及
（对于旧版 C# 指标）自动推断的列映射和所需指标
列。

在 `solution create` 之后（以及在 `data update` 之后进行轮询 — 一些设置步骤
针对数据包运行）直到 `Ready: true`。如果设置了`Setup error:`，
停止轮询并解决根本问题。

**用途：**

```bash
kaggle competitions solution status <competition> [--json]
```

**参数：**

- `<competition>`：比赛子弹。

**选项：**

- `--json`（可选）：以 JSON 形式发出原始状态，而不是
  人类可读的视图。

**示例：**

```bash
# Human-readable summary.
kaggle competitions solution status my-comp
# → Ready: true
#   Solution file: solution.csv — 12.3KB — uploaded 2027-01-01T00:00:00+00:00
#     total=1000, public=300, private=700

# Machine-readable — useful in a polling loop.
kaggle competitions solution status my-comp --json
```

**您可能看到的字段（人类视图）：**- `Ready: true|false` — 计分是否畅通。
- `Setup error: <msg>` — 如果预处理失败则填充。浮出水面
  显着地；当它出现时停止轮询。
- `Kernels metric: true` — 比赛的评分指标是 Kernels
  公制。内核指标自动检测其列映射；仅主机
  需要等待`Ready`翻转为真。
- `Row ID column: <name>` — 对于内核指标，自动检测到的 row-id
  列。
- `Solution file: <name> — <size> — uploaded <timestamp>` 和
  `total=..., public=..., private=...` — 解决方案文件元数据
  上传已处理。
- `Column mapping:` — 对于旧版 C# 指标，指标的当前映射
  列名称到 CSV 列名称。
- `Required columns:` — 对于旧版 C# 指标，指标列将
  主机需要填写（名称+期望的数据类型）。