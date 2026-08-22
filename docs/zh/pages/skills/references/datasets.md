<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 数据集 CLI 参考

使用`kaggle datasets`或别名`kaggle d`搜索数据集、列出和下载
文件、初始化元数据、创建数据集、创建版本、更新元数据、
检查创建状态、删除数据集以及浏览数据集讨论。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- 用于创建、版本、元数据更新、删除等的 Kaggle 凭据
  经过身份验证的列表/下载场景。
- 对于创建/版本流程，请准备一个带有 `dataset-metadata.json` 的文件夹。使用
  `kaggle datasets init -p <FOLDER>` 生成启动文件。

## 命令层次结构

```text
kaggle datasets (alias: kaggle d)
├── list
├── files
├── download
├── init
├── create
├── version
├── metadata
├── status
├── delete
└── topics
    ├── list
    └── show
```

## `kaggle datasets list`

列出可用的数据集。

**用途：**

```bash
kaggle datasets list [options]
```

**选项：**

- `--sort-by <SORT>`：排序顺序。
- `--size <SIZE>`：已弃用。使用`--max-size`和`--min-size`。
- `--file-type <TYPE>`：文件类型过滤器。
- `--license <LICENSE>`：许可证过滤器。
- `--tags <TAGS>`：逗号分隔的标签 ID。
- `-s, --search <TERM>`：搜索文本。
- `-m, --mine`：只有您的数据集。
- `--user <USER>`：用户或组织拥有的数据集。
- `-p, --page <PAGE>`：页码。
- `--max-size <BYTES>`：最大数据集大小。
- `--min-size <BYTES>`：最小数据集大小。
- `-v, --csv`：打印 CSV。

**示例：**

```bash
kaggle datasets list
kaggle datasets list -s "bird observation" --file-type csv
kaggle d list --user kaggle --sort-by votes -v
```

**目的：** 查找 `<owner>/<dataset-slug>` 格式的数据集句柄。

## `kaggle datasets files`

列出数据集中的文件。

**用途：**

```bash
kaggle datasets files [DATASET] [options]
```

**参数：**

- `[DATASET]`：`<owner>/<dataset-name>` 格式的数据集句柄。

**选项：**- `--page-token <TOKEN>`：页面令牌。
- `--page-size <SIZE>`：页面大小，默认20。
- `-v, --csv`：打印 CSV。

**示例：**

```bash
kaggle datasets files kaggle/titanic --page-size 7
```

**用途：** 下载前检查文件。

## `kaggle datasets download`

下载数据集文件。

**用途：**

```bash
kaggle datasets download [DATASET] [options]
```

**选项：**

- `-f, --file <NAME>`：下载一个文件。省略时下载所有文件。文件夹内的文件（例如 `train/labels.csv`）将该文件夹保留在 `--path` 下。
- `-p, --path <PATH>`：下载目录。
- `-w, --wp`：下载到当前工作路径。
- `--unzip`：解压下载的存档并删除zip。
- `-o, --force`：即使本地文件看起来是最新的，也强制下载。
- `-q, --quiet`：抑制进度输出。

**示例：**

```bash
kaggle datasets download kaggle/titanic
kaggle d download kaggle/titanic -f train.csv -p data --unzip
kaggle datasets download jpmiller/publicassistance -f WICAgencies2014ytd/Food_Costs.csv -p data
```

**用途：** 检索本地工作的数据集文件。

## `kaggle datasets init`

创建一个启动器 `dataset-metadata.json`。

**用途：**

```bash
kaggle datasets init [options]
```

**选项：**

- `-p, --path <FOLDER>`：写入元数据的文件夹。默认为当前目录。

**示例：**

```bash
kaggle datasets init -p my-dataset
```

**用途：** 创建数据集之前引导元数据。

## `kaggle datasets create`

从本地文件和元数据创建新数据集。

**用途：**

```bash
kaggle datasets create [options]
```

**选项：**

- `-p, --path <FOLDER>`：包含文件和`dataset-metadata.json`的文件夹。
- `-u, --public`：公开创建。默认是私有的。
- `-q, --quiet`：抑制进度输出。
- `-t, --keep-tabular`：不要将表格文件转换为 CSV。
- `-r, --dir-mode <skip|zip|tar>`：目录处理。默认`skip`。

**示例：**

```bash
kaggle datasets create -p my-dataset -u -q -t -r skip
```**目的：**上传本地文件和元数据以创建 Kaggle 数据集。

## `kaggle datasets version`

创建现有数据集的新版本。

**用途：**

```bash
kaggle datasets version -m <MESSAGE> [options]
```

**选项：**

- `-m, --message <MESSAGE>`：必需的版本说明。
- `-p, --path <FOLDER>`：包含更新文件和元数据的文件夹。
- `-q, --quiet`：抑制进度输出。
- `-t, --keep-tabular`：不要将表格文件转换为 CSV。
- `-r, --dir-mode <skip|zip|tar>`：目录处理。默认`skip`。
- `-d, --delete-old-versions`：删除此数据集的旧版本。

**示例：**

```bash
kaggle datasets version -p my-dataset -m "Updated data" -q -t -r skip
```

**目的：** 将更新的数据集文件或元数据发布为新版本。

## `kaggle datasets metadata`

下载或更新数据集元数据。

**用途：**

```bash
kaggle datasets metadata [DATASET] [options]
```

**选项：**

- `--update`：从本地元数据更新服务器元数据。
- `-p, --path <PATH>`：元数据文件夹。默认为当前目录。

**示例：**

```bash
kaggle datasets metadata kaggle/titanic -p metadata
kaggle datasets metadata kaggle/titanic --update -p metadata
```

**目的：** 检索或更新`dataset-metadata.json`。

**注意：** 元数据更新还支持选定的数据集元数据字段和
数据集涵盖CLI支持的图像文件。

## `kaggle datasets status`

获取数据集的创建状态。

**用途：**

```bash
kaggle datasets status [DATASET] [options]
```

**选项：**

- `--format <FORMAT>`：默认为普通状态。 `json`,
  `json(current_version_number)`，支持字段选择。

**示例：**

```bash
kaggle datasets status owner/dataset
kaggle d status owner/dataset --format json
```

**目的：**检查数据集创建/版本控制是否完成。

## `kaggle datasets delete`

删除数据集。**用途：**

```bash
kaggle datasets delete <DATASET> [options]
```

**选项：**

- `-y, --yes`：跳过确认。

**示例：**

```bash
kaggle datasets delete owner/dataset -y
```

**目的：** 从 Kaggle 中删除数据集。

## 数据集讨论命令

### `kaggle datasets topics list`

列出数据集的讨论主题。

**用途：**

```bash
kaggle datasets topics list [DATASET] [options]
```

**参数：**

- `[DATASET]`：`<owner>/<dataset-slug>` 格式的数据集句柄。

**选项：**

- `--sort-by <SORT>`：`hot`、`top`、`new`、`recent`、`active`、`relevance` 之一。
- `-s, --search <TERM>`：搜索文本。
- `--page-size <SIZE>`：要返回的主题数。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle datasets topics list zillow/zecon
kaggle datasets topics list zillow/zecon --sort-by recent --page-size 50
```

**目的：** 在打开特定主题之前浏览数据集讨论。

`kaggle datasets topics` 没有 `list` 可作为列出的快捷方式
主题。

### `kaggle datasets topics show`

以树形形式显示数据集讨论主题和评论。

**用途：**

```bash
kaggle datasets topics show <TOPIC_REF> [TOPIC_ID] [options]
```

**参数：**

- `<TOPIC_REF>`：使用两个参数时的主题引用或数据集句柄
  形式。
- `[TOPIC_ID]`：二参数形式的可选主题 ID。

**选项：**

- `--page-size <SIZE>`：返回的评论数。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle datasets topics show zillow/zecon/12345
kaggle datasets topics show zillow/zecon 12345
```

**目的：** 阅读数据集讨论主题及其评论。

## 错误场景及注释- 数据集句柄应为`<owner>/<dataset-slug>`。
- 创建/版本命令需要上传文件夹中的本地元数据。
- 目录上传遵循`--dir-mode`； `skip` 忽略目录，`zip`
  压缩它们，然后 `tar` 上传未压缩的存档。