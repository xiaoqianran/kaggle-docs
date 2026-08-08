<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 搜索命令

通过单个命令搜索所有 Kaggle 内容。

## `kaggle search`

对 Kaggle 竞赛、数据集、笔记本、模型进行统一搜索，
用户、讨论并返回一个排名结果列表。这是
每个命令 `-s/--search` 标志的跨内容等效项（例如
`kaggle datasets list --search`);当您还不知道哪些内容时使用它
您正在寻找的类型，或者当您想要同时获得多种类型的结果时。

默认情况下，`kaggle search` 搜索所有 CLI 支持的内容类型
（竞赛、数据集、笔记本、模型、用户、讨论、基准）——并非全部
后端文档类型（它不包括 CLI 无法有效呈现的类型，例如
评论、博客和课程）。结果排序使用后端的规范
跨内容排名。使用 `--type` 缩小到特定类型。

**用途：**

```bash
kaggle search "<query>" [options]
```

**选项：*** `query`：要搜索的术语（必填）。
* `-t, --type <TYPES>`：将结果限制为以逗号分隔的内容类型列表。有效类型：`competition`、`dataset`、`notebook`、`model`、`user`、`discussion`、`benchmark`。如果省略，将搜索所有这些 CLI 支持的类型。
* `-m, --mine`：将搜索限制为您自己的内容。
* `--sort-by <SORT_BY>`：排序顺序。其中之一：`relevance`（默认）、`hotness`、`votes`、`dateCreated`、`dateUpdated`、`totalComments`、`lastViewed`。
* `--page-size <SIZE>`：页面上显示的结果数（默认：20，最大：100）。
* `--page-token <TOKEN>`：结果分页的页面标记（当存在更多结果时，在页面顶部打印为 `Next Page Token = ...`）。
* `-v, --csv`：以 CSV 格式而不是表格打印结果。
* `--format <FORMAT>`：以所选格式打印结果（`csv`、`table`、`json`）。支持现场投影，例如`--format 'json(type,ref)'`。

**结果列：** `type`、`ref`、`title`、`owner`、`votes`。 `ref`栏
是您可以传递给其他命令的标识符 - `owner/slug` 对于数据集，
笔记本电脑和模型；竞赛和用户的裸弹。

**示例：**

1. 在所有内容中搜索某个术语：

    ```bash
    kaggle search "protein folding"
    ```

2. 仅搜索数据集和模型：

    ```bash
    kaggle search "diffusion" --type dataset,model
    ```

3.查找用户：

    ```bash
    kaggle search "andrew ng" --type user
    ```

4.搜索自己的内容，最近更新的优先：

    ```bash
    kaggle search "baseline" --mine --sort-by dateUpdated
    ```

5. 获取机器可读的输出：

    ```bash
    kaggle search "titanic" --format json
    ```6. 获取下一页：

    ```bash
    kaggle search "llm" --page-size 50 --page-token <TOKEN>
    ```