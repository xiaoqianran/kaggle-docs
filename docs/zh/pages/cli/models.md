<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 模型命令

用于与 Kaggle 模型交互的命令。

## `kaggle models list`

列出可用型号。

**用途：**

```bash
kaggle models list [options]
```

**选项：**

* `--owner <OWNER>`：按特定用户或组织过滤。
* `--sort-by <SORT_BY>`：对结果进行排序。有效选项：`hotness`、`downloadCount`、`voteCount`、`notebookCount`、`createTime`（默认值：`hotness`）。
* `-s, --search <SEARCH_TERM>`：搜索词。
* `--page-size <SIZE>`：每页的项目数（默认值：20）。
* `--page-token <TOKEN>`：结果分页的页面令牌。
* `-v, --csv`：以 CSV 格式打印结果。

**示例：**

1. 列出`$KAGGLE_DEVELOPER`拥有的模型（替换为您的用户名），按创建时间排序，CSV格式：

    ```bash
    kaggle models list --owner $KAGGLE_DEVELOPER --sort-by createTime -v
    ```

2. 列出与搜索词“gemini”匹配的前 5 个型号：

    ```bash
    kaggle models list -s gemini --page-size 5
    ```

**目的：**

此命令可帮助您在 Kaggle 上查找模型、按所有者过滤或按关键字搜索以及按各种条件排序。

## `kaggle models init`

初始化元数据文件（`model-metadata.json`）以创建新模型。参见[metadata file format](./models_metadata.md)。

**用途：**

```bash
kaggle models init -p <FOLDER_PATH>
```

**选项：**

* `-p, --path <FOLDER_PATH>`：将创建`model-metadata.json`文件的文件夹路径（默认为当前目录）。

**示例：**

在新的临时文件夹`tmp`中初始化模型元数据文件：

```bash
mkdir tmp
kaggle models init -p tmp
```

**目的：**此命令创建一个模板 `model-metadata.json` 文件。在 Kaggle 上创建模型之前，您必须使用模型的详细信息（例如所有者 slug、标题、模型 slug（标题的 URL 友好版本）和描述）编辑此文件。

## `kaggle models create`

在 Kaggle 上创建一个新模型。

**用途：**

```bash
kaggle models create -p <FOLDER_PATH>
```

**选项：**

* `-p, --path <FOLDER_PATH>`：包含`model-metadata.json` 文件的文件夹路径（默认为当前目录）。此文件夹还应包含您打算作为第一个模型变体的一部分上传的模型文件。

**示例：**

使用`tmp/model-metadata.json`中的元数据创建一个新模型。 （假设元数据文件已使用所有者、标题和 slug 进行编辑）：

```bash
# Example: Edit model-metadata.json first
# sed -i 's/INSERT_OWNER_SLUG_HERE/your-username/' tmp/model-metadata.json
# sed -i 's/INSERT_TITLE_HERE/My Awesome Model/' tmp/model-metadata.json
# sed -i 's/INSERT_SLUG_HERE/my-awesome-model/' tmp/model-metadata.json

kaggle models create -p tmp
```

**目的：**

此命令使用提供的元数据在 Kaggle 上注册一个新模型。之后，您通常会创建模型变体和版本。

## `kaggle models get`

下载现有模型的 `model-metadata.json` 文件。

**用途：**

```bash
kaggle models get <MODEL> -p <FOLDER_PATH>
```

**参数：**

* `<MODEL>`：模型 URL 后缀，格式为 `owner/model-slug`（例如，`$KAGGLE_DEVELOPER/test-model`）。

**选项：**

* `-p, --path <FOLDER_PATH>`：将`model-metadata.json` 文件下载到的文件夹。

**示例：**

将模型 `$KAGGLE_DEVELOPER/test-model` 的元数据下载到 `tmp` 文件夹中：

```bash
kaggle models get -p tmp $KAGGLE_DEVELOPER/test-model
```

**目的：**此命令检索现有模型的元数据文件，这对于检查或作为更新的基础很有用。

## `kaggle models update`

使用本地 `model-metadata.json` 文件更新 Kaggle 上的现有模型。

**用途：**

```bash
kaggle models update -p <FOLDER_PATH>
```

**选项：**

* `-p, --path <FOLDER_PATH>`：包含包含更新信息的`model-metadata.json` 文件的文件夹路径（默认为当前目录）。

**示例：**

更新`tmp/model-metadata.json`中详细信息的模型（确保 JSON 中的 slug 和所有者与现有模型匹配）：

```bash
kaggle models update -p tmp
```

**目的：**

使用此命令更改现有模型的元数据，例如其标题、描述或 `model-metadata.json` 文件中定义的其他字段。

## `kaggle models delete`

从 Kaggle 中删除模型。

**用途：**

```bash
kaggle models delete <MODEL> [options]
```

**参数：**

* `<MODEL>`：型号 URL 后缀，格式为 `owner/model-slug`（例如，`$KAGGLE_DEVELOPER/test-model`）。

**选项：**

* `-y, --yes`：自动确认删除，不提示。

**示例：**

删除型号`$KAGGLE_DEVELOPER/test-model`并自动确认：

```bash
kaggle models delete $KAGGLE_DEVELOPER/test-model -y
```

**目的：**

此命令将从 Kaggle 中永久删除您的模型之一（及其所有变体和版本）。谨慎使用。

## `kaggle models topics list`

列出模型的讨论主题。

**用途：**

```bash
kaggle models topics list <MODEL> [options]
```

**参数：**

* `<MODEL>`：格式为 `<owner>/<model-slug>` 的模型参考（例如，`google/gemma`）。**选项：**

* `--sort-by <SORT_BY>`：排序顺序。有效选项：`hot`、`top`、`new`、`recent`、`active`、`relevance`。
* `-s, --search <SEARCH_TERM>`：搜索查询以过滤主题。
* `--page-size <PAGE_SIZE>`：每页的项目数。
* `--page-token <PAGE_TOKEN>`：用于分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

```bash
kaggle models topics list google/gemma --sort-by hot
```

**目的：**

此命令允许您浏览特定模型的讨论主题。

## `kaggle models topics show`

以树形形式显示模型讨论主题以及所有评论。

**用途：**

```bash
kaggle models topics show <TOPIC_REF> [options]
```

**参数：**

* `<TOPIC_REF>`：主题参考，可以是：
    * `<model>/<topic-id>`（例如，`google/gemma/12345` - 请注意，这支持多斜杠模型段）
    * `<model> <topic-id>`（两个单独的参数，其中 `<topic-id>` 作为第二个参数传递）
    * `<topic-id>`（裸数字 ID）

**选项：**

* `--page-size <PAGE_SIZE>`：每页显示的评论数。
* `--page-token <PAGE_TOKEN>`：评论分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

```bash
kaggle models topics show google/gemma/12345
```

**目的：**

此命令显示完整的讨论主题及其以缩进树结构呈现的所有注释。