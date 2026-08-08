<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 论坛命令

用于浏览和阅读 Kaggle 讨论论坛的命令。

## `kaggle forums`

列出所有讨论论坛。也可用作 `kaggle forums list`。

**别名：** `f`

**用途：**

```bash
kaggle forums [options]
```

**选项：**

* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

以 CSV 格式列出所有论坛：

```bash
kaggle forums -v
```

**目的：**

此命令可帮助您发现 Kaggle 上所有可用的讨论论坛。

## `kaggle forums topics list`

列出论坛中的讨论主题。

**用途：**

```bash
kaggle forums topics list [FORUM] [options]
```

注意：支持`kaggle forums topics`（没有`list`子命令）作为列出所有主题（没有论坛过滤）的快捷方式。

**参数：**

* `[FORUM]`：论坛别名（例如`1`、`product-feedback`）。选修的。

**选项：**

* `--sort-by <SORT_BY>`：排序顺序。有效选项：`hot`、`top`、`new`、`recent`、`active`、`relevance`。
* `-s, --search <SEARCH_TERM>`：搜索查询以过滤主题。
* `--category <CATEGORY>`：按类别过滤。有效选项：`all`、`forums`、`competitions`、`datasets`、`competition_write_ups`、`models`、`benchmarks`。
* `--group <GROUP>`：按组过滤。有效选项：`all`、`owned`、`upvoted`、`bookmarked`、`my_activity`、`drafts`。
* `--page-size <PAGE_SIZE>`：每页的项目数。
* `--page-token <PAGE_TOKEN>`：用于分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**例子：**列出“入门”论坛中的主题，按最新排序，每页显示 5 个：

```bash
kaggle forums topics list getting-started --sort-by recent --page-size 5
```

**目的：**

此命令允许您浏览特定论坛中的讨论主题，并具有过滤和排序选项。

## `kaggle forums topics show`

以树形形式显示包含所有评论的主题（缩进）。

**用途：**

```bash
kaggle forums topics show <TOPIC_REF> [options]
```

**参数：**

* `<TOPIC_REF>`：主题参考，可以是：
    * `<forum-name>/<topic-id>`（例如，`getting-started/12345`）
    * `<forum-name> <topic-id>`（两个单独的参数，其中 `<topic-id>` 作为第二个参数传递）
    * `<topic-id>`（裸数字 ID）

**选项：**

* `--page-size <PAGE_SIZE>`：每页显示的评论数。
* `--page-token <PAGE_TOKEN>`：评论分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

显示“入门”论坛中的主题 12345：

```bash
kaggle forums topics show getting-started/12345
```

使用两个单独的参数显示同一主题：

```bash
kaggle forums topics show getting-started 12345
```

通过纯数字 ID 显示主题：

```bash
kaggle forums topics show 12345
```

**目的：**

此命令显示完整的讨论主题及其以缩进树结构呈现的所有注释。