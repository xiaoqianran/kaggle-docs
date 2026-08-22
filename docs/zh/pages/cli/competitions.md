<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 竞赛命令

与 Kaggle 竞赛交互的命令。

有关如何提交比赛的教程：
* [How to Submit to a Competition](./tutorials.md#tutorial-how-to-submit-to-a-competition)
* [How to Submit to a Code Competition](./tutorials.md#tutorial-how-to-submit-to-a-code-competition)

## `kaggle competitions list`

列出可用的比赛。

**用途：**

```bash
kaggle competitions list [options]
```

**选项：**

* `--group <GROUP>`：按比赛组别筛选。有效选项：`general`、`entered`、`inClass`。
* `--category <CATEGORY>`：按比赛类别过滤。有效选项：`all`、`featured`、`research`、`recruitment`、`gettingStarted`、`masters`、`playground`。
* `--sort-by <SORT_BY>`：对结果进行排序。有效选项：`grouped`、`prize`、`earliestDeadline`、`latestDeadline`、`numberOfTeams`、`recentlyCreated`（默认值：`latestDeadline`）。
* `-p, --page <PAGE>`：结果页码（默认值：1）。
* `-s, --search <SEARCH_TERM>`：搜索词。
* `-v, --csv`：以 CSV 格式打印结果。
* `--format`：输出格式（`csv`、`table`、`json` 或场投影）。参见[output_format.md](./output_format.md)。

**输出列：**

`ref`、`deadline`、`category`、`reward`、`teamCount`、`userHasEntered`、`userRank`

`userRank`是您参加比赛时的公共排行榜位置。当你还没有进入，或者还没有公开排名时，就是`0`。

**示例：**

列出一般组中的特色比赛，按奖项排序：

```bash
kaggle competitions list --group general --category featured --sort-by prize
```

列出已参加的比赛以及 CSV 格式的排名：

```bash
kaggle competitions list --group entered -v
```

**目的：**此命令可帮助您发现新的比赛或根据各种标准查找特定的比赛。使用`--group entered`查看您参加的比赛中的排名。

## `kaggle competitions files`

列出特定比赛的文件。

**用途：**

```bash
kaggle competitions files <COMPETITION> [options]
```

**参数：**

* `<COMPETITION>`：竞赛网址后缀（例如，`titanic`）。

**选项：**

* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。
* `--page-token <PAGE_TOKEN>`：结果分页的页面令牌。
* `--page-size <PAGE_SIZE>`：页面上显示的项目数（默认：20，最大：200）。

**示例：**

悄悄地列出 CSV 格式的“泰坦尼克号”竞赛的前 3 个文件：

```bash
kaggle competitions files titanic --page-size=3 -v -q
```

**目的：**

在下载之前，使用此命令查看可用于比赛的数据文件。

## `kaggle competitions download`

下载竞赛文件。

**用途：**

```bash
kaggle competitions download <COMPETITION> [options]
```

**参数：**

* `<COMPETITION>`：竞赛网址后缀（例如，`titanic`）。

**选项：*** `-f, --file <FILE_NAME>`：要下载的特定文件（如果不指定则下载全部）。文件夹内的文件（例如 `train/labels.csv`）将该文件夹保留在下载路径下。
* `-p, --path <PATH>`：下载文件的文件夹（默认为当前目录）。
* `-w, --wp`：下载文件到当前工作路径（相当于`-p .`）。
* `-o, --force`：强制下载，覆盖现有文件。
* `-q, --quiet`：抑制详细输出。

**示例：**

1. 将《泰坦尼克号》比赛的所有文件下载到当前目录，覆盖现有文件，悄悄地：

    ```bash
    kaggle competitions download titanic -w -o -q
    ```

2. 将“泰坦尼克号”竞赛中的`test.csv`文件下载到名为`tost`的文件夹中：

    ```bash
    kaggle competitions download titanic -f test.csv -p tost
    ```

3. 下载竞赛数据文件夹中的文件。文件写入`data/kaggle_evaluation/rsna_gateway.py`：

    ```bash
    kaggle competitions download rsna-intracranial-aneurysm-detection -f kaggle_evaluation/rsna_gateway.py -p data
    ```

**目的：**

此命令允许您将比赛所需的数据文件下载到本地计算机上。

## `kaggle competitions submit`

向竞赛提交新作品。

**用途：**

```bash
kaggle competitions submit <COMPETITION> -f <FILE_NAME> -m <MESSAGE> [options]
```

**参数：**

* `<COMPETITION>`：竞赛网址后缀（例如`house-prices-advanced-regression-techniques`）。
* `-f, --file <FILE_NAME>`：提交文件。
* `-m, --message <MESSAGE>`：提交消息。

**选项：*** `-k, --kernel <KERNEL>`：要提交的内核（笔记本）的名称（用于代码竞赛）。
* `-v, --version <VERSION>`：要提交的内核版本（例如`2`）。
* `-q, --quiet`：抑制详细输出。
* `--sandbox`：将提交标记为沙盒提交（仅限竞赛主持人/管理员）。
* `--wait [SECONDS]`：等待提交完成评分，完成后打印公开评分。可以选择以秒为单位传递超时（`0` 或无值 = 最多等待 12 小时，笔记本电脑的最长运行时间）。如果评分失败或达到超时，则退出非零。
* `--poll-interval <SECONDS>`：等待时状态轮询之间的最大秒数（默认值：`60`，最小值：`5`）。轮询从 5 秒开始并自动增加。

成功提交后，该命令会打印数字提交参考，例如`Submission ref: 12345678`。您可以稍后使用 [⟦T103⟧](#kaggle-competitions-submission) 查看该提交内容。

**示例：标准（非代码）竞赛：**

将 `sample_submission.csv` 提交至“房价高级回归技术”竞赛，并发送消息“测试消息”：

```bash
kaggle competitions submit house-prices-advanced-regression-techniques -f sample_submission.csv -m "Test message"
```

**示例：代码竞赛：**

提交由 `<YOUR_USERNAME>/rsna-submission` 的 `3` 版本生成的 `submission.csv` 参加 `rsna-2024-lumbar-spine-degenerative-classification` 竞赛：

```bash
kaggle competitions submit rsna-2024-lumbar-spine-degenerative-classification -f submission.csv -k <YOUR_USERNAME>/rsna-submission -v 3 -m "Test message"
```

**示例：提交并等待分数（在 CI 中有用）：**提交并阻止直到评分完成（最多 10 分钟超时），然后打印公共分数：

```bash
kaggle competitions submit house-prices-advanced-regression-techniques -f sample_submission.csv -m "CI run" --wait 600
```

一旦提交被评分，该命令就会退出`0`，如果评分失败或达到超时，该命令将退出`0`，因此它可以控制管道。

**目的：**

使用此命令将您的预测或代码上传到竞赛中进行评分。

## `kaggle competitions submission`

按数字参考显示单个提交的状态和分数（由 `kaggle competitions submit` 打印）。

**用途：**

```bash
kaggle competitions submission <SUBMISSION_REF>
```

**参数：**

* `<SUBMISSION_REF>`：`kaggle competitions submit`打印的数字提交参考。

**示例：**

```bash
kaggle competitions submission 12345678
```

输出：

```
Submission Ref:  12345678
Status:          COMPLETE
Public Score:    0.98765
Private Score:
Description:     Test message
Submission Date: 2026-07-19 12:00:00
```

**目的：**

使用此命令检查提交是否已完成评分并读取其公共分数 - 例如，在没有 `--wait` 的情况下提交后，或从脚本轮询结果。

## `kaggle competitions submissions`

显示您过去提交的竞赛内容。

**用途：**

```bash
kaggle competitions submissions <COMPETITION> [options]
```

**参数：**

* `<COMPETITION>`：竞赛网址后缀（例如，`house-prices-advanced-regression-techniques`）。

**选项：**

* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

以 CSV 格式安静地显示“房价高级回归技术”的提交内容：

```bash
kaggle competitions submissions house-prices-advanced-regression-techniques -v -q
```

**目的：**此命令允许您查看以前的提交尝试及其分数。

## `kaggle competitions submission-download`

按数字 ID 下载单个提交的已提交文件。

**用途：**

```bash
kaggle competitions submission-download <SUBMISSION_ID> [options]
```

**参数：**

* `<SUBMISSION_ID>`：由`kaggle competitions submit`打印的数字提交id，或由`kaggle competitions submissions <COMPETITION>`列出的数字提交id。

**选项：**

* `-p, --path <PATH>`：将文件下载到的文件夹。默认为当前工作目录的 Kaggle 下载位置。
* `-o, --force`：即使本地副本已存在也下载（跳过最新检查）。
* `-q, --quiet`：抑制详细输出。

**示例：**

下载提交文件`12345678`到`./subs`：

```bash
kaggle competitions submission-download 12345678 -p ./subs
```

**目的：**

使用此命令检索您（或队友）提交的确切文件 - 例如，检查旧提交或重现评分结果。

## `kaggle competitions leaderboard`

获取比赛排行榜信息。

**用途：**

```bash
kaggle competitions leaderboard <COMPETITION> [options]
```

**参数：**

* `<COMPETITION>`：竞赛网址后缀（例如，`titanic`）。

**选项：*** `-s, --show`：在控制台中显示排行榜的顶部。
* `-d, --download`：将整个排行榜下载到 CSV 文件。
* `-p, --path <PATH>`：下载排行榜的文件夹（如果使用`-d`）。
* `-v, --csv`：以 CSV 格式打印结果（与`-s` 一起使用）。
* `-q, --quiet`：抑制详细输出。

**示例：**

1. 将《泰坦尼克号》排行榜下载到名为`leaders`的文件夹中，悄悄地：

    ```bash
    kaggle competitions leaderboard titanic -d -p leaders -q
    ```

2.下载排行榜并保存到`leaderboard.txt`：

    ```bash
    kaggle competitions leaderboard titanic > leaderboard.txt
    ```

**目的：**

此命令可让您查看您的排名以及比赛中其他参与者的分数。

## `kaggle competitions topics list`

列出竞赛的讨论主题。

**用途：**

```bash
kaggle competitions topics list [COMPETITION] [options]
```

注意：支持`kaggle competitions topics`（不带`list`子命令）作为列出默认竞赛主题的快捷方式（通过`kaggle config set competition`配置）。

**参数：**

* `[COMPETITION]`：竞赛网址后缀（例如，`titanic`）。如果配置了默认竞争，则可选。

**选项：*** `-s, --sort-by <SORT_BY>`：排序顺序。有效选项：`hot`、`top`、`new`、`recent`、`active`、`relevance`。
* `--search <SEARCH>`：搜索查询以过滤主题。
* `--page-size <PAGE_SIZE>`：页面上显示的项目数。默认值为 20，最大为 200。
* `--page-token <PAGE_TOKEN>`：结果分页的页面令牌。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

列出“泰坦尼克号”竞赛的讨论主题（按最新排序）：

```bash
kaggle competitions topics list titanic -s recent
```

**目的：**

此命令可让您浏览特定比赛的讨论主题。

## `kaggle competitions topics show`

以树形形式显示竞赛讨论主题以及所有评论。

**用途：**

```bash
kaggle competitions topics show <TOPIC_REF> [options]
```

**参数：**

* `<TOPIC_REF>`：主题参考，可以是：
    * `<competition>/<topic-id>`（例如，`titanic/12345`）
    * `<competition> <topic-id>`（两个单独的参数，其中 `<topic-id>` 作为第二个参数传递）
    * `<topic-id>`（裸数字 ID）

**选项：**

* `--page-size <PAGE_SIZE>`：每页显示的评论数。
* `--page-token <PAGE_TOKEN>`：评论分页的页面标记。
* `-v, --csv`：以CSV格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

显示《泰坦尼克号》竞赛主题 12345：

```bash
kaggle competitions topics show titanic/12345
```

**目的：**此命令显示完整的讨论主题及其以缩进树结构呈现的所有注释。

## `kaggle competitions topic-messages`

列出竞赛讨论主题中的消息。

> **已弃用：** 该命令已弃用，取而代之的是 `kaggle competitions topics show`。它将在未来版本中删除。

**用途：**

```bash
kaggle competitions topic-messages <COMPETITION> <TOPIC_ID> [options]
```

**参数：**

* `<COMPETITION>`：竞赛网址后缀（例如，`titanic`）。
* `<TOPIC_ID>`：讨论主题id。

**选项：**

* `-s, --sort-by <SORT_BY>`：排序顺序。有效选项：`best`、`new`、`old`。
* `-n, --page-size <PAGE_SIZE>`：返回的最大顶级消息； `-1` 适合所有人。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

列出“泰坦尼克号”竞赛中主题 12345 的所有消息，按最新的在前排序：

```bash
kaggle competitions topic-messages titanic 12345 -s new -n -1
```

**目的：**

此命令显示特定竞赛讨论主题内的消息。