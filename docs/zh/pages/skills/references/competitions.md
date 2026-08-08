<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 竞赛 CLI 参考

使用`kaggle competitions`或别名`kaggle c`发现竞争、检查
并下载竞赛文件，提交预测或代码内核输出，检查
提交内容和排行榜，并浏览竞赛讨论主题。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- 大多数命令的 Kaggle 凭据。某些文件列表/下载流程可能会
  当竞赛允许公众访问时，工作将被注销。
- 对于省略 `<COMPETITION>` 的命令，设置默认值：

```bash
kaggle config set -n competition -v titanic
```

## 命令层次结构

```text
kaggle competitions (alias: kaggle c)
├── list
├── files
├── download
├── submit
├── submissions
├── submission
├── leaderboard
├── team-submissions
├── episodes
├── replay
├── logs
├── pages
├── topics
│   ├── list
│   └── show
└── topic-messages
```

## `kaggle competitions list`

列出可用的比赛。

**用途：**

```bash
kaggle competitions list [options]
```

**选项：**

- `--group <GROUP>`：竞赛组。
- `--category <CATEGORY>`：竞赛类别。
- `--sort-by <SORT>`：排序顺序。
- `-p, --page <PAGE>`：页码。
- `--page-size <SIZE>`：页面上的项目数。
- `--page-token <TOKEN>`：页面令牌。
- `-s, --search <TERM>`：搜索文本。
- `-v, --csv`：打印 CSV 而不是表格。
- `--format`：输出格式（`csv`、`table`、`json` 或场投影）。

**输出列：** `ref`、`deadline`、`category`、`reward`、`teamCount`、`userHasEntered`、`userRank`

`userRank` 是您进入时的公共排行榜位置。未进入或尚无公开排名时为`0`。

**示例：**

```bash
kaggle competitions list
kaggle competitions list --category gettingStarted --sort-by latestDeadline
kaggle competitions list --group entered -v
kaggle c list -s titanic -v
```**目的：** 查找与其他命令一起使用的竞争 slugs。使用`--group entered`查看您在参加的比赛中的排名。

## `kaggle competitions files`

列出比赛的数据文件。

**用途：**

```bash
kaggle competitions files [COMPETITION] [options]
```

**参数：**

- `[COMPETITION]`：比赛网址后缀。省略时使用配置的默认值。

**选项：**

- `--page-token <TOKEN>`：页面令牌。
- `--page-size <SIZE>`：页面大小，默认20。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions files titanic
kaggle c files titanic --page-size 3 -v -q
```

**用途：** 下载前检查可用文件。

## `kaggle competitions download`

下载一份或全部比赛数据文件。

**用途：**

```bash
kaggle competitions download [COMPETITION] [options]
```

**选项：**

- `-f, --file <NAME>`：下载一个文件。省略时下载所有文件。
- `-p, --path <PATH>`：下载目录。
- `-w, --wp`：下载到当前工作路径。
- `-o, --force`：即使本地文件看起来是最新的，也强制下载。
- `-q, --quiet`：抑制进度输出。

**示例：**

```bash
kaggle competitions download titanic
kaggle competitions download titanic -f train.csv -p data
kaggle c download -w -o -q
```

**目的：** 检索比赛数据以进行本地训练或分析。

## `kaggle competitions submit`

从本地文件或内核输出文件创建竞赛提交。

**用途：**

```bash
kaggle competitions submit [COMPETITION] -m <MESSAGE> [options]
```

**选项：**- `-f, --file <FILE>`：本地提交文件，或代码竞赛的输出文件名。
- `-k, --kernel <KERNEL>`：代码竞赛提交的内核名称。
- `-m, --message <MESSAGE>`：必填提交描述。
- `-v, --version <VERSION>`：代码竞赛的内核版本。
- `--sandbox`：标记为竞赛主办方/管理员的沙箱提交。
- `--wait [SECONDS]`：等待提交完成评分并打印公开评分。 `0` 或无值等待长达 12 小时（最大笔记本运行时间）；正值是以秒为单位的超时。评分失败或超时时以非零值退出。
- `--poll-interval <SECONDS>`：等待时状态轮询之间的最大秒数（默认 60，最小 5；从 5 秒开始，后退）。
- `-q, --quiet`：抑制进度输出。

**示例：**

```bash
kaggle competitions submit titanic -f submission.csv -m "baseline"
kaggle c submit lux-ai -k user/agent -f submission.tar.gz -m "agent run" -v 3
kaggle competitions submit titanic -f submission.csv -m "CI run" --wait 600
```

**目的：** 向竞赛提交预测或代码内核输出。

**注意：** 成功时，命令会打印 `Submission ref: <ref>`；与它一起使用
`kaggle competitions submission <ref>`。 `--sandbox` 用于比赛
主机/管理员。代码竞赛提交使用`-k`、`-f`和可选的`-v`。

## `kaggle competitions submission`

按数字参考显示单个提交的状态和分数。

**用途：**

```bash
kaggle competitions submission <SUBMISSION_REF>
```

**示例：**

```bash
kaggle competitions submission 12345678
```**目的：** 检查提交是否已完成评分并阅读其公开内容
分数（例如，在没有 `--wait` 的情况下提交后，或从脚本进行轮询时）。

## `kaggle competitions submissions`

显示您提交的竞赛内容。

**用途：**

```bash
kaggle competitions submissions [COMPETITION] [options]
```

**选项：**

- `--page-size <SIZE>`：页面大小。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions submissions titanic -v
```

**目的：** 查看提交状态和分数。

## `kaggle competitions leaderboard`

查看或下载比赛排行榜数据。

**用途：**

```bash
kaggle competitions leaderboard [COMPETITION] [options]
```

**选项：**

- `-s, --show`：显示排行榜顶部行。
- `-d, --download`：下载完整排行榜。
- `-p, --path <PATH>`：下载目录。
- `--page-size <SIZE>`：页面大小。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions leaderboard titanic --show
kaggle c leaderboard titanic --download -p leaderboards
```

**目的：** 查看比赛排行榜的排名数据。

## `kaggle competitions team-submissions`

列出团队的公开提交内容。

**用途：**

```bash
kaggle competitions team-submissions <TEAM_ID> [options]
```

**参数：**

- `<TEAM_ID>`：团队 ID。从比赛排行榜显示中查找团队 ID。

**选项：**

- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions team-submissions 12345
```

**目的：** 对于模拟比赛，列出所有活跃的公众提交内容；
对于常规比赛，列出团队提交的公共排行榜。## 模拟竞赛命令

### `kaggle competitions episodes`

列出模拟比赛中提交的剧集。

**用途：**

```bash
kaggle competitions episodes <SUBMISSION_ID> [options]
```

**参数：**

- `<SUBMISSION_ID>`：提交 ID。找到它与
  `kaggle competitions submissions <competition>`。

**选项：**

- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions episodes 12345678
```

**目的：** 检查与提交相关的模拟比赛片段。

### `kaggle competitions replay`

下载模拟剧集的重播。

**用途：**

```bash
kaggle competitions replay <EPISODE_ID> [options]
```

**参数：**

- `<EPISODE_ID>`：来自`kaggle competitions episodes <submission_id>`的剧集 ID。

**选项：**

- `-p, --path <PATH>`：目标文件夹。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions replay 987654 -p replays
```

**目的：** 下载重播工件以供本地审核。

### `kaggle competitions logs`

下载模拟事件中特定代理的日志。

**用途：**

```bash
kaggle competitions logs <EPISODE_ID> <AGENT_INDEX> [options]
```

**参数：**

- `<EPISODE_ID>`：来自`kaggle competitions episodes <submission_id>`的剧集 ID。
- `<AGENT_INDEX>`：特工在剧集中的从零开始的位置。

**选项：**

- `-p, --path <PATH>`：目标文件夹。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions logs 987654 0 -p logs
```

**用途：** 下载每个代理的事件日志以进行调试。

## `kaggle competitions pages`

列出竞赛的页面。

**用途：**

```bash
kaggle competitions pages [COMPETITION] [options]
```

**选项：**- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。
- `--content`：显示整页内容。
- `--page-name <NAME>`：过滤到特定页面，如`description`，
  `rules`，或`evaluation`。

**示例：**

```bash
kaggle competitions pages titanic
kaggle competitions pages titanic --page-name rules --content
```

**用途：** 检查竞赛页面元数据或检索页面内容。

## 竞赛讨论命令

### `kaggle competitions topics list`

列出竞赛的讨论主题。

**用途：**

```bash
kaggle competitions topics list [COMPETITION] [options]
```

**参数：**

- `[COMPETITION]`：比赛子弹。如果省略，则默认竞争来自
  可以使用配置。

**选项：**

- `-s, --sort-by <SORT>`：`hot`、`top`、`new`、`recent`、`active`、`relevance` 之一。
- `-p, --page <PAGE>`：页码。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions topics list titanic
kaggle competitions topics list titanic --sort-by recent -p 2
```

**目的：** 在打开特定主题之前浏览竞赛讨论。

`kaggle competitions topics` 没有 `list` 可作为快捷方式
列出主题。

### `kaggle competitions topics show`

以树形形式显示主题和评论。

**用途：**

```bash
kaggle competitions topics show <TOPIC_REF> [TOPIC_ID] [options]
```

**参数：**

- `<TOPIC_REF>`：主题参考。可能是 `<forum-or-entity>/<topic-id>` 或
  使用双参数形式时的实体引用。
- `[TOPIC_ID]`：二参数形式的可选主题 ID。

**选项：**

- `--page-size <SIZE>`：返回的评论数。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions topics show titanic/12345
kaggle competitions topics show titanic 12345
```**目的：** 阅读竞赛讨论主题及其评论。

### `kaggle competitions topic-messages`

列出竞赛讨论主题中的消息。

**用途：**

```bash
kaggle competitions topic-messages [COMPETITION] <TOPIC_ID> [options]
```

**参数：**

- `[COMPETITION]`：比赛子弹。如果省略，则默认竞争来自
  可以使用配置。
- `<TOPIC_ID>`：讨论主题 ID。

**选项：**

- `-s, --sort-by <SORT>`：`hot`、`new`、`old`、`top` 之一。
- `-n, --page-size <SIZE>`：返回的最大顶级消息； `-1` 适合所有人。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle competitions topic-messages titanic 12345
kaggle competitions topic-messages titanic 12345 --sort-by old -n 50
```

**目的：** 使用已弃用的隐藏别名列出竞赛评论
当旧的工作流程仍然调用`topic-messages`时的主题。