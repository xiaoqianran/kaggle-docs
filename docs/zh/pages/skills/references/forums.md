<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 论坛 CLI 参考

使用`kaggle forums`或别名`kaggle f`列出Kaggle讨论论坛，列出
论坛中的主题，并以树形形式显示带有评论的主题。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- 特定于用户的论坛组（例如拥有的、
  已添加书签、已投票或草稿。

## 命令层次结构

```text
kaggle forums (alias: kaggle f)
├── list
└── topics
    ├── list
    └── show
```

不带子命令的`kaggle forums`可作为快捷方式
`kaggle forums list`。

## `kaggle forums list`

列出讨论论坛。

**用途：**

```bash
kaggle forums list [options]
```

**选项：**

- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle forums
kaggle forums list -v
kaggle f list -q
```

**目的：** 查找论坛 slugs，例如 `getting-started` 或 `product-feedback`。

## `kaggle forums topics list`

列出论坛或更广泛的主题类别/组中的主题。

**用途：**

```bash
kaggle forums topics list [FORUM] [options]
```

**参数：**

- `[FORUM]`：论坛 slug。使用 `kaggle forums` 列出可用的论坛。

**选项：**

- `--group <GROUP>`：主题组过滤器。不确定时使用实时 `--help` 输出
  安装的 CLI 接受哪个组名称。
- `--category <CATEGORY>`：主题类别过滤器。使用实时 `--help` 输出
  不确定已安装的 CLI 接受哪个类别名称。
- `--sort-by <SORT>`：`hot`、`top`、`new`、`recent`、`active`、`relevance` 之一。
- `-s, --search <TERM>`：搜索文本。
- `--page-size <SIZE>`：页面大小。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。**示例：**

```bash
kaggle forums topics list getting-started
kaggle f topics list --category datasets --sort-by recent
kaggle forums topics list product-feedback -s "api" -v
```

**目的：** 浏览全球论坛和资源链接的讨论主题
类别。

没有 `list` 的 `kaggle forums topics` 可用作列出的快捷方式
主题。

## `kaggle forums topics show`

以树形形式显示主题和所有评论。

**用途：**

```bash
kaggle forums topics show <TOPIC_REF> [TOPIC_ID] [options]
```

**参数：**

- `<TOPIC_REF>`：`<forum-name>/<topic-id>` 形式的主题引用，或主题 id。
- `[TOPIC_ID]`：使用二参数形式时可选的主题 id。

**选项：**

- `--page-size <SIZE>`：页面大小。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：支持 CSV 输出。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle forums topics show getting-started/12345
kaggle f topics show getting-started 12345
```

**目的：** 阅读 CLI 中的讨论主题和评论。

## 注释

- 特定于资源的主题也存在于`competitions`、`datasets`、
  `models`和`benchmarks`。
- 对于实体主题，请使用实体命令，以便默认实体上下文和
  应用特定于资源的验证。