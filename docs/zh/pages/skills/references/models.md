<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 模型 CLI 参考

使用`kaggle models`或别名`kaggle m`来列出、初始化、创建、检索、
更新和删除 Kaggle 模型记录，以及浏览模型讨论主题。
模型文件通常存在于模型变体中；查看型号变化
变体和版本上传/下载流程的参考。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- 用于创建/更新/删除和私有模型访问的 Kaggle 凭据。
- 对于创建/更新流程，准备`model-metadata.json`。使用
  `kaggle models init -p <FOLDER>` 生成启动文件。

## 命令层次结构

```text
kaggle models (alias: kaggle m)
├── list
├── init
├── create
├── get
├── update
├── delete
├── topics
│   ├── list
│   └── show
└── variations | instances | v | i
```

## `kaggle models list`

列出公共模型。

**用途：**

```bash
kaggle models list [options]
```

**选项：**

- `--sort-by <SORT>`：排序顺序。
- `-s, --search <TERM>`：搜索文本。
- `--owner <OWNER>`：用户或组织拥有的模型。
- `--page-size <SIZE>`：页面大小。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。

**示例：**

```bash
kaggle models list
kaggle models list --owner google --sort-by downloadCount
kaggle m list -s gemma -v
```

**用途：** 查找 `<owner>/<model-name>` 格式的模型句柄。

## `kaggle models init`

创建一个启动器 `model-metadata.json`。

**用途：**

```bash
kaggle models init [options]
```

**选项：**

- `-p, --path <FOLDER>`：将写入元数据的文件夹。

**示例：**

```bash
kaggle models init -p my-model
```

**用途：** 创建之前引导模型元数据。

## `kaggle models create`

创建一个新的 Kaggle 模型。

**用途：**

```bash
kaggle models create [options]
```

**选项：**

- `-p, --path <FOLDER>`：包含`model-metadata.json`的文件夹。

**示例：**

```bash
kaggle models create -p my-model
```**目的：** 创建模型记录。文件通过变体进行管理
版本。

## `kaggle models get`

获取模型元数据。

**用途：**

```bash
kaggle models get <MODEL> [options]
```

**参数：**

- `<MODEL>`：`<owner>/<model-name>` 格式的模型句柄。

**选项：**

- `-p, --path <FOLDER>`：将模型元数据下载到的文件夹。

**示例：**

```bash
kaggle models get google/gemma -p metadata
```

**用途：** 下载现有模型的元数据。

## `kaggle models update`

更新模型元数据。

**用途：**

```bash
kaggle models update [options]
```

**选项：**

- `-p, --path <FOLDER>`：包含更新的`model-metadata.json`的文件夹。

**示例：**

```bash
kaggle models update -p my-model
```

**目的：** 更改模型元数据而不更改变体文件。型号
身份是从`model-metadata.json`内的`ownerSlug`和`slug`读取的。

## `kaggle models delete`

删除模型。

**用途：**

```bash
kaggle models delete <MODEL> [options]
```

**选项：**

- `-y, --yes`：跳过确认。

**示例：**

```bash
kaggle models delete owner/model-slug -y
```

**目的：** 删除模型及其关联资源。

## 模型讨论命令

### `kaggle models topics list`

列出模型的讨论主题。

**用途：**

```bash
kaggle models topics list [MODEL] [options]
```

**参数：**

- `[MODEL]`：`<owner>/<model-slug>` 格式的模型句柄。

**选项：**

- `--sort-by <SORT>`：`hot`、`top`、`new`、`recent`、`active`、`relevance` 之一。
- `-s, --search <TERM>`：搜索文本。
- `--page-size <SIZE>`：要返回的主题数。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle models topics list owner/model-slug
kaggle models topics list owner/model-slug --sort-by recent --page-size 50
```**目的：** 在打开特定主题之前浏览模型讨论。

没有 `list` 的 `kaggle models topics` 可用作列出的快捷方式
主题。

### `kaggle models topics show`

以树形形式显示模型讨论主题和评论。

**用途：**

```bash
kaggle models topics show <TOPIC_REF> [TOPIC_ID] [options]
```

**参数：**

- `<TOPIC_REF>`：主题引用，或使用两个参数时的模型句柄
  形式。
- `[TOPIC_ID]`：二参数形式的可选主题 ID。

**选项：**

- `--page-size <SIZE>`：返回的评论数。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle models topics show owner/model-slug/12345
kaggle models topics show owner/model-slug 12345
```

**目的：** 阅读模型讨论主题及其评论。

## 注释

- CLI 支持`models variations` 和旧版`models instances`
  命名。它们的行为与同一模型变体命令系列相同。
- 使用`model_variations.md`创建和管理特定于框架的模型
  变化。