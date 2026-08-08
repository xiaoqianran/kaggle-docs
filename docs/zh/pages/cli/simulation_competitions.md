<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 教程：模拟比赛

本教程将引导您使用 CLI 与 Kaggle 模拟竞赛进行交互 — 从查找竞赛到下载剧集重播和代理日志。

模拟比赛（例如[Connect X](https://www.kaggle.com/competitions/connectx)、[Lux AI](https://www.kaggle.com/competitions/lux-ai-season-3)）与标准比赛不同。您无需提交预测的 CSV，而是提交一个在剧集中与其他代理进行对抗的代理（代码）。每集都有多个特工相互竞争。您可以通过“模拟”标签来识别 [competitions page](https://www.kaggle.com/competitions) 上的模拟竞赛，或者查找在描述中提及代理、机器人或游戏环境的竞赛。

## 1. 寻找并检查比赛

按关键字搜索模拟比赛：

```bash
kaggle competitions list -s simulation
```

确定竞赛（例如`connectx`）后，请查看其页面以阅读规则、评估标准和其他详细信息：

```bash
kaggle competitions pages connectx
```

这列出了可用页面（例如，`description`、`rules`、`evaluation`、`data-description`）。要阅读页面的完整内容：

```bash
kaggle competitions pages connectx --content
```

您还可以浏览竞赛的讨论论坛，了解其他参与者正在谈论的内容 - 顶级策略、常见陷阱、环境怪癖。列出主题：

```bash
kaggle competitions topics list connectx
```这将打印包含 `id`、`title`、`authorName`、`commentCount`、`votes` 和 `postDate` 的主题表。使用 `-s/--sort-by`（`hot`、`top`、`new`、`recent`、`active`、`relevance` 之一）和 `--page-size` 进行排序和分页：

```bash
kaggle competitions topics list connectx -s top --page-size 10
```

要阅读某个主题下的完整讨论，请使用 `show` 子命令：

```bash
kaggle competitions topics show connectx 12345
```

这将返回主题内容及其以缩进树结构呈现的所有评论。
```

## 2. Accept the Competition Rules

Before you can submit or download data, you **must** accept the competition rules on the Kaggle website. Navigate to the competition page (e.g., `https://www.kaggle.com/competitions/connectx`) and click "Join Competition" or "I Understand and Accept".

You can verify you've joined by checking your entered competitions:

```bash
Kaggle比赛名单--分组进入
```

## 3. Download Competition Data

Download the competition's starter kit and any provided data:

```bash
Kaggle 竞赛下载 connectx -p connectx-data
```

## 4. Submit Your Agent

Simulation competitions require you to submit agent code. You can upload files directly from your local machine.

**Single file agent** — if your agent is a single `main.py`:

```bash
kaggle 竞赛提交 connectx -f main.py -m "单文件代理 v1"
```

**Multi-file agent** — if your agent spans multiple files, bundle them into a `submission.tar.gz` with `main.py` at the root:

```bash
tar -czf 提交.tar.gz main.py helper.py model_weights.pkl
Kaggle 竞赛提交 connectx -f Submit.tar.gz -m "多文件代理 v1"
```

**Notebook submission** — alternatively, you can submit via an existing Kaggle notebook:

```bash
kaggle 竞赛提交 connectx -k YOUR_USERNAME/connectx-agent -fsubmission.tar.gz -v 1 -m "Notebook agent v1"
```

## 5. Monitor Your Submission

Check the status of your submissions:

```bash
Kaggle 竞赛提交 connectx
```

Note the submission ID from the output — you'll need it to view episodes.

## 6. List Episodes for a Submission

Once your submission has played some games, list the episodes:

```bash
Kaggle 比赛剧集 12345678
```

Replace `12345678` with your submission ID. This shows a table of episodes with columns: `id`, `createTime`, `endTime`, `state`, and `type`.

To get the output in CSV format for scripting:

```bash
Kaggle 比赛剧集 12345678 -v
```

## 7. Download an Episode Replay

To download the replay data for a specific episode (useful for visualizing what happened):

```bash
Kaggle 比赛重播 98765432
```

This downloads the replay JSON to your current directory as `episode-98765432-replay.json`. To specify a download location:

```bash
Kaggle 比赛重播 98765432 -p ./replays
```

## 8. Download Agent Logs

To debug your agent's behavior, download the logs for a specific agent in an episode. You need the episode ID and the agent's index (0-based):

```bash
# 下载第一个代理的日志（索引 0）
Kaggle 比赛日志 98765432 0# 下载第二个代理的日志（索引 1）
Kaggle 比赛日志 98765432 1 -p ./logs
```

This downloads the log file as `episode-98765432-agent-0-logs.json`.

## 9. Inspect Top Teams' Active Agents

You can study how the leading teams' agents are performing — useful for scouting strategies or understanding the metagame. Start from the leaderboard to grab the team ID:

```bash
Kaggle 比赛排行榜 connectx -s
```

This prints a table with columns `teamId`, `teamName`, `submissionDate`, `score`. Take the `teamId` of the team you want to inspect (e.g., first place), then list every active submission they have on the leaderboard:

```bash
Kaggle 比赛团队提交 42
```

This returns the team's public-safe submissions — `id`, `dateSubmitted`, and `publicScore`. For simulation competitions every leaderboard-eligible submission is listed (not just the best one), so you can see the full rotation of agents a top team is fielding.

Pick the submission with the highest `publicScore` and list its episodes, just like you would for your own:

```bash
Kaggle 比赛剧集 98765432
```

From there you can pull replays and agent logs for any episode that submission played in (`kaggle competitions replay <episode_id>` / `kaggle competitions logs <episode_id> <agent_index>`).

## Putting It All Together

Here's a typical workflow for iterating on a simulation competition agent:

```bash
# 下载比赛数据
Kaggle 竞赛下载 connectx -p connectx-data

# 在迭代之前浏览讨论主题以获取提示
Kaggle 竞赛主题 connectx -s top
Kaggle 比赛主题消息 connectx <topic-id>

# 提交您的代理（单个文件）
Kaggle 竞赛提交 connectx -f main.py -m "v1"

# 检查提交状态
Kaggle 竞赛提交 connectx

# 列出剧集（替换为您的提交 ID）
Kaggle 比赛剧集 12345678

# 下载剧集的重播和日志
Kaggle 比赛重播 98765432
Kaggle 比赛日志 98765432 0

# 查看排行榜
Kaggle 比赛排行榜 connectx -s

# 侦察领导者：列出他们的活跃特工，然后选择最好的特工
Kaggle 比赛团队提交<leader-team-id>
Kaggle 比赛剧集<best-submission-id>
````