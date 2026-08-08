<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 搜索 CLI 参考

使用`kaggle search`在Kaggle比赛中进行统一搜索，
通过单个命令即可获取数据集、笔记本、模型、用户和讨论。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- Kaggle 凭证。

## 命令层次结构

```text
kaggle search "<query>"
```

## `kaggle search`

搜索 Kaggle 内容类型并返回一个排名结果列表。
与每个命令的 `-s/--search` 标志不同（例如
`kaggle datasets list --search`)，该命令搜索多种内容类型
在单个请求中还可以找到用户和讨论。

默认情况下，它会搜索所有 CLI 支持的内容类型（竞赛、数据集、
笔记本、模型、用户、讨论、基准）——并非所有后端文档类型；
CLI 无法有效呈现的类型（评论、博客、课程等）是
排除。排序使用后端的规范跨内容排名。

**用途：**

```bash
kaggle search "<query>" [options]
```

**选项：**- `query`：要搜索的术语（必填）。
- `-t, --type <TYPES>`：要限制的以逗号分隔的内容类型。有效：`competition`、`dataset`、`notebook`、`model`、`user`、`discussion`、`benchmark`。省略搜索所有这些 CLI 支持的类型。
- `-m, --mine`：将搜索限制为您自己的内容。
- `--sort-by <SORT_BY>`：`relevance`（默认）、`hotness`、`votes`、`dateCreated`、`dateUpdated`、`totalComments`、`lastViewed` 之一。
- `--page-size <SIZE>`：每页结果（默认 20，最多 100）。
- `--page-token <TOKEN>`：用于寻呼的页面令牌。
- `-v, --csv`：打印 CSV 而不是表格。
- `--format <FORMAT>`：`csv`、`table`、或`json`；支持投影，例如`--format 'json(type,ref)'`。

**示例：**

```bash
kaggle search "weather"
kaggle search "diffusion" --type dataset,model
kaggle search "andrew ng" --type user
kaggle search "baseline" --mine --sort-by dateUpdated
kaggle search "titanic" --format json
```

**目的：**当你不知道的时候发现整个平台的内容
提前输入内容类型，或者当您想要同时获得多种类型的结果时。

## 输出

结果是一个包含列 `type`、`ref`、`title`、`owner` 和 `votes` 的表。
`ref` 值可与其他命令重用：`owner/slug` 对于数据集，
笔记本电脑和模型；竞赛和用户的裸弹。例如，
`dataset`结果的`ref`可以传递给`kaggle datasets download`，并且
`competition` 结果为 `ref` 到 `kaggle competitions files`。