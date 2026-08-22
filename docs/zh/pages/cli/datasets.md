<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 数据集命令

用于与 Kaggle 数据集交互的命令。

## `kaggle datasets list`

列出可用的数据集。

**用途：**

```bash
kaggle datasets list [options]
```

**选项：**

* `--sort-by <SORT_BY>`：对结果进行排序。有效选项：`hottest`、`votes`、`updated`、`active`（默认值：`hottest`）。
* `--size <SIZE_CATEGORY>`：已弃用。使用`--min-size`和`--max-size`。
* `--file-type <FILE_TYPE>`：按文件类型过滤。有效选项：`all`、`csv`、`sqlite`、`json`、`bigQuery`。
* `--license <LICENSE_NAME>`：按许可证过滤。有效选项：`all`、`cc`、`gpl`、`odb`、`other`。
* `--tags <TAG_IDS>`：按标签过滤（以逗号分隔的标签 ID）。
* `-s, --search <SEARCH_TERM>`：搜索词。
* `-m, --mine`：仅显示您的数据集。
* `--user <USER>`：按特定用户或组织过滤。
* `-p, --page <PAGE>`：结果页码（默认值：1）。
* `-v, --csv`：以 CSV 格式打印结果。
* `--max-size <BYTES>`：最大数据集大小（以字节为单位）。
* `--min-size <BYTES>`：最小数据集大小（以字节为单位）。

**示例：**

1.列出你自己的数据集：

    ```bash
    kaggle datasets list -m
    ```

2. 列出 CSV 数据集，第 2 页，按上次更新排序，标题中包含“student”，大小在 13000 到 15000 字节之间：

    ```bash
    kaggle datasets list --file-type csv --page 2 --sort-by updated -s student --min-size 13000 --max-size 15000
    ```

3. 列出具有 ODB 许可证、标记为“internet”并匹配搜索词“telco”的数据集：

    ```bash
    kaggle datasets list --license odb --tags internet --search telco
    ```

**目的：**此命令可帮助您根据所有者、文件类型、标签和大小等各种条件在 Kaggle 上查找数据集。

## `kaggle datasets files`

列出特定数据集的文件。

**用途：**

```bash
kaggle datasets files <DATASET> [options]
```

**参数：**

* `<DATASET>`：数据集 URL 后缀，格式为 `owner/dataset-name`（例如，`kerneler/brazilian-bird-observation-metadata-from-wikiaves`）。

**选项：**

* `-v, --csv`：以 CSV 格式打印结果。
* `--page-token <PAGE_TOKEN>`：结果分页的页面令牌。
* `--page-size <PAGE_SIZE>`：页面上显示的项目数（默认：20，最大：200）。

**示例：**

列出数据集`kerneler/brazilian-bird-observation-metadata-from-wikiaves`的前 7 个文件：

```bash
kaggle datasets files kerneler/brazilian-bird-observation-metadata-from-wikiaves --page-size=7
```

**目的：**

下载前使用此命令查看数据集中的各个文件。

## `kaggle datasets download`

下载数据集文件。

**用途：**

```bash
kaggle datasets download <DATASET> [options]
```

**参数：**

* `<DATASET>`：数据集 URL 后缀（例如，`willianoliveiragibin/pixar-films`）。

**选项：**

* `-f, --file <FILE_NAME>`：要下载的特定文件（如果不指定则下载全部）。文件夹内的文件（例如 `train/labels.csv`）将该文件夹保留在下载路径下。
* `-p, --path <PATH>`：下载文件的文件夹（默认为当前目录）。
* `-w, --wp`：下载文件到当前工作路径。
* `--unzip`：解压下载的文件（之后删除.zip 文件）。
* `-o, --force`：强制下载，覆盖现有文件。
* `-q, --quiet`：抑制详细输出。

**示例：**1. 下载数据集`willianoliveiragibin/pixar-films`的所有文件：

    ```bash
    kaggle datasets download -d willianoliveiragibin/pixar-films
    ```

2. 下载数据集`goefft/public-datasets-with-file-types-and-columns`，解压到`tmp`文件夹中，必要时覆盖，并抑制输出：

    ```bash
    kaggle datasets download goefft/public-datasets-with-file-types-and-columns -p tmp --unzip -o -q
    ```

3.从`goefft/public-datasets-with-file-types-and-columns`下载特定文件`dataset_results.csv`到当前工作目录，悄悄地，强制覆盖：

    ```bash
    kaggle datasets download goefft/public-datasets-with-file-types-and-columns -f dataset_results.csv -w -q -o
    ```

4. 下载数据集内文件夹中的文件。文件写入`data/WICAgencies2014ytd/Food_Costs.csv`：

    ```bash
    kaggle datasets download jpmiller/publicassistance -f WICAgencies2014ytd/Food_Costs.csv -p data
    ```

**目的：**

此命令允许您检索数据集文件以供本地使用。

## `kaggle datasets init`

初始化元数据文件（`dataset-metadata.json`）以创建新数据集。参见[metadata file format](./datasets_metadata.md)。

**用途：**

```bash
kaggle datasets init -p <FOLDER_PATH>
```

**选项：**

* `-p, --path <FOLDER_PATH>`：将创建`dataset-metadata.json`文件的文件夹路径（默认为当前目录）。

**示例：**

在`tests/dataset`文件夹中初始化数据集元数据文件：

```bash
kaggle datasets init -p tests/dataset
```

**目的：**

此命令创建一个模板 `dataset-metadata.json` 文件，您需要在 Kaggle 上创建新数据集之前对其进行编辑。该文件包含数据集标题、ID (slug) 和许可证等信息。

## `kaggle datasets create`

在 Kaggle 上创建一个新数据集。

**用途：**

```bash
kaggle datasets create -p <FOLDER_PATH> [options]
```

**选项：*** `-p, --path <FOLDER_PATH>`：包含数据文件和`dataset-metadata.json` 文件的文件夹路径（默认为当前目录）。
* `-u, --public`：公开数据集（默认为私有）。
* `-q, --quiet`：抑制详细输出。
* `-t, --keep-tabular`：不将表格文件转换为 CSV（默认为转换）。
* `-r, --dir-mode <MODE>`：如何处理目录：`skip`（忽略）、`zip`（压缩上传）、`tar`（未压缩上传）（默认：`skip`）。
* `--ignore-patterns <PATTERNS>`：要忽略的文件/目录模式。可以指定多次。


**示例：**

从`tests/dataset`中的文件安静地创建一个新的公共数据集，无需转换表格文件，也无需跳过子目录。 （假设`tests/dataset`中的`dataset-metadata.json`已正确编辑标题和副标题）：

```bash
# Example: Edit dataset-metadata.json first
# sed -i 's/INSERT_TITLE_HERE/My Dataset Title/' tests/dataset/dataset-metadata.json
# sed -i 's/INSERT_SLUG_HERE/my-dataset-slug/' tests/dataset/dataset-metadata.json

kaggle datasets create -p tests/dataset --public -q -t -r skip
```

**目的：**

此命令上传本地数据文件和关联的元数据，以在 Kaggle 上创建新的数据集。

## `kaggle datasets version`

创建现有数据集的新版本。

**用途：**

```bash
kaggle datasets version -p <FOLDER_PATH> -m <VERSION_NOTES> [options]
```

**选项：*** `-p, --path <FOLDER_PATH>`：包含更新数据文件和`dataset-metadata.json`的文件夹路径（默认为当前目录）。
* `-m, --message <VERSION_NOTES>`：（必填）描述新版本的消息。
* `-q, --quiet`：抑制详细输出。
* `-t, --keep-tabular`：不要将表格文件转换为 CSV。
* `-r, --dir-mode <MODE>`：目录处理模式（`skip`、`zip`、`tar`）。
* `-d, --delete-old-versions`：删除此数据集的旧版本。
* `--ignore-patterns <PATTERNS>`：要忽略的文件/目录模式。可以指定多次。


**示例：**

使用 `tests/dataset` 中的文件创建一个新版本的数据集，并带有版本注释“更新数据”，悄悄地保持表格格式，跳过目录并删除旧版本：

```bash
kaggle datasets version -m "Updated data" -p tests/dataset -q -t -r skip -d
```

**目的：**

使用此命令可使用新文件或元数据更改更新现有数据集。

## `kaggle datasets metadata`

下载数据集的元数据或更新本地元数据中的现有数据。

**用途：**

```bash
kaggle datasets metadata <DATASET> [options]
```

**参数：**

* `<DATASET>`：数据集 URL 后缀（例如，`goefft/public-datasets-with-file-types-and-columns`）。

**选项：**

* `-p, --path <PATH>`：下载/更新元数据文件的目录(`dataset-metadata.json`)。默认为当前工作目录。
* `--update`：使用本地元数据JSON文件的内容更新现有数据集版本的元数据。 （例如从本地“推送”）

**示例：**将数据集`goefft/public-datasets-with-file-types-and-columns`的元数据下载到`tests/dataset`文件夹中：

```bash
kaggle datasets metadata goefft/public-datasets-with-file-types-and-columns -p tests/dataset
```

**目的：**

此命令允许您获取现有数据集的 `dataset-metadata.json` 文件，这对于检查或作为创建新版本的模板很有用。

## `kaggle datasets status`

获取数据集的创建状态。

**用途：**

```bash
kaggle datasets status <DATASET>
```

**参数：**

* `<DATASET>`：数据集 URL 后缀（例如，`goefft/public-datasets-with-file-types-and-columns`）。

**示例：**

获取数据集`goefft/public-datasets-with-file-types-and-columns`的状态：

```bash
kaggle datasets status goefft/public-datasets-with-file-types-and-columns
```

**目的：**

创建或更新数据集后，此命令可帮助您检查该过程是否成功或是否存在任何问题。

## `kaggle datasets delete`

从 Kaggle 中删除数据集。

**用途：**

```bash
kaggle datasets delete <DATASET> [options]
```

**参数：**

* `<DATASET>`：数据集 URL 后缀（例如，`username/dataset-slug`）。

**选项：**

* `-y, --yes`：自动确认删除，不提示。

**示例：**

删除数据集`username/dataset-slug`并自动确认：

```bash
kaggle datasets delete username/dataset-slug --yes
```

**目的：**

此命令将从 Kaggle 中永久删除您的数据集之一。谨慎使用。

## `kaggle datasets topics list`

列出数据集的讨论主题。

**用途：**

```bash
kaggle datasets topics list <DATASET> [options]
```

**参数：**

* `<DATASET>`：格式为 `<owner>/<dataset-slug>` 的数据集引用（例如，`zillow/zecon`）。

**选项：*** `--sort-by <SORT_BY>`：排序顺序。有效选项：`hot`、`top`、`new`、`recent`、`active`、`relevance`。
* `-s, --search <SEARCH_TERM>`：搜索查询以过滤主题。
* `--page-size <PAGE_SIZE>`：每页的项目数。
* `--page-token <PAGE_TOKEN>`：用于分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

列出 zillow/zecon 数据集的最新主题：

```bash
kaggle datasets topics list zillow/zecon --sort-by recent
```

**目的：**

此命令允许您浏览特定数据集的讨论主题。

## `kaggle datasets topics show`

以树形形式显示数据集讨论主题以及所有评论。

**用途：**

```bash
kaggle datasets topics show <TOPIC_REF> [options]
```

**参数：**

* `<TOPIC_REF>`：主题参考，可以是：
    * `<dataset>/<topic-id>`（例如，`zillow/zecon/12345` - 请注意，这支持多斜线数据集段）
    * `<dataset> <topic-id>`（两个单独的参数，其中 `<topic-id>` 作为第二个参数传递）
    * `<topic-id>`（裸数字 ID）

**选项：**

* `--page-size <PAGE_SIZE>`：每页显示的评论数。
* `--page-token <PAGE_TOKEN>`：评论分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

```bash
kaggle datasets topics show zillow/zecon/12345
```

**目的：**

此命令显示完整的讨论主题及其以缩进树结构呈现的所有注释。