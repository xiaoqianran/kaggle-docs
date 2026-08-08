<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 内核命令

用于与 Kaggle Kernels（笔记本和脚本）交互的命令。

## `kaggle kernels list`

列出可用的内核。

**用途：**

```bash
kaggle kernels list [options]
```

**选项：**

* `-m, --mine`：仅显示您的内核。
* `-p, --page <PAGE>`：结果页码（默认值：1）。
* `--page-size <SIZE>`：每页的项目数（默认值：20）。
* `-s, --search <SEARCH_TERM>`：搜索词。
* `-v, --csv`：以 CSV 格式打印结果。
* `--parent <PARENT_KERNEL>`：按父内核过滤（格式：`owner/kernel-slug`）。
* `--competition <COMPETITION_SLUG>`：按比赛过滤。
* `--dataset <DATASET_SLUG>`：按数据集过滤（格式：`owner/dataset-slug`）。
* `--user <USER>`：按特定用户过滤。
* `--language <LANGUAGE>`：按语言过滤（`all`、`python`、`r`、`sqlite`、`julia`）。
* `--kernel-type <TYPE>`：按内核类型过滤（`all`、`script`、`notebook`）。
* `--output-type <TYPE>`：按输出类型过滤（`all`、`visualizations`、`data`）。
* `--sort-by <SORT_BY>`：对结果进行排序（`hotness`、`commentCount`、`dateCreated`、`dateRun`、`relevance`、`scoreAscending`、`scoreDescending`、`viewCount`、`voteCount`）。默认值：`hotness`。

**示例：**

1. 列出您自己的标题中包含“Exercise”的内核，第 2 页，每页 5 项，采用 CSV 格式，按运行日期排序：

    ```bash
    kaggle kernels list -m -s Exercise --page-size 5 -p 2 -v --sort-by dateRun
    ```

2. 列出 `$KAGGLE_DEVELOPER/exercise-lists` 子级的内核（将 `$KAGGLE_DEVELOPER` 替换为您的用户名）：

    ```bash
    kaggle kernels list --parent $KAGGLE_DEVELOPER/exercise-lists
    ```

3. 列出“房价高级回归技术”竞赛的前 5 个内核：

    ```bash
    kaggle kernels list --competition house-prices-advanced-regression-techniques --page-size 5
    ```4. 列出与数据集 `dansbecker/home-data-for-ml-course` 关联的前 5 个内核：

    ```bash
    kaggle kernels list --dataset dansbecker/home-data-for-ml-course --page-size 5
    ```

5. 按用户`$KAGGLE_DEVELOPER`列出输出数据的Python笔记本：

    ```bash
    kaggle kernels list --user $KAGGLE_DEVELOPER --language python --kernel-type notebook --output-type data
    ```

**目的：**

此命令允许您根据各种过滤器（例如所有权、相关竞争/数据集、语言或类型）查找内核。

## `kaggle kernels files`

列出特定内核的输出文件。

**用途：**

```bash
kaggle kernels files <KERNEL> [options]
```

**参数：**

* `<KERNEL>`：内核URL后缀（格式：`owner/kernel-slug`，例如`kerneler/sqlite-global-default`）。

**选项：**

* `-v, --csv`：以 CSV 格式打印结果。
* `--page-token <PAGE_TOKEN>`：结果分页的页面令牌。
* `--page-size <PAGE_SIZE>`：页面上显示的项目数（默认：20，最大：200）。

**示例：**

以 CSV 格式列出内核 `kerneler/sqlite-global-default` 的第一个输出文件：

```bash
kaggle kernels files kerneler/sqlite-global-default -v --page-size=1
```

**目的：**

使用此命令可以查看内核运行生成的文件。

## `kaggle kernels init`

为新的或现有的内核初始化元数据文件 (`kernel-metadata.json`)。参见[metadata file format](./kernels_metadata.md)。

**用途：**

```bash
kaggle kernels init -p <FOLDER_PATH>
```

**选项：**

* `-p, --path <FOLDER_PATH>`：将创建`kernel-metadata.json`文件的文件夹路径（默认为当前目录）。

**示例：**

在`tests/kernel`文件夹中初始化内核元数据文件：

```bash
kaggle kernels init -p tests/kernel
```

**目的：**此命令创建一个模板 `kernel-metadata.json` 文件。在将其推送到 Kaggle 之前，您需要编辑此文件，其中包含内核标题、ID (slug)、语言、内核类型和数据源等详细信息。

## `kaggle kernels push`

将新代码/笔记本和元数据推送到内核，然后运行内核。

**用途：**

```bash
kaggle kernels push -p <FOLDER_PATH> [options]
```

**选项：**

* `--accelerator <ACCELERATOR_ID>`：运行时使用的加速器的ID名称。例如。 “NvidiaTeslaP100”（又名默认 GPU）、“NvidiaTeslaT4”、“TpuV6E8”。
* `-p, --path <FOLDER_PATH>`：包含内核文件（例如，`.ipynb`、`.Rmd`、`.py`）和`kernel-metadata.json`文件的文件夹路径（默认为当前目录）。
* `-t, --timeout <SECONDS>`：最大运行时间（以秒为单位）。

**示例：**

从`tests/kernel`文件夹中推送内核（假设它包含内核文件和`kernel-metadata.json`）：

```bash
kaggle kernels push -p tests/kernel
```

**目的：**

此命令将本地内核文件及其元数据上传到 Kaggle。如果元数据中指定的内核存在于您的帐户下，它将被更新。否则，将创建一个新内核。上传后，Kaggle 将尝试运行内核。

截至 2026 年 2 月可用的加速器：* NvidiaTeslaP100
*TpuV38
* 英伟达特斯拉T4
* NvidiaTeslaT4Highmem
* Tpu1VmV38
* NvidiaTeslaA100
* 英伟达L4
* TpuV5E8
* NvidiaL4X1
* TpuV6E8
* 英伟达H100
* NvidiaRtxPro6000

其中一些仅适用于特定比赛的参与者，有些仅适用于 Kaggle 管理员。

> [!警告]
> `NvidiaTeslaP100` 不适用于默认 Kaggle 图像的 GPU 计算。其 PyTorch 版本 (cu128) 不包含 Pascal (`sm_60`) 内核，因此 `torch.cuda.is_available()` 返回 `True`，但第一个 CUDA 操作失败并显示 `cudaErrorNoKernelImageForDevice`。请使用`NvidiaTeslaT4`，或者如果您需要 P100，请安装 Pascal 兼容的火炬版本。

## `kaggle kernels pull`

获取内核的代码/笔记本和元数据。

**用途：**

```bash
kaggle kernels pull <KERNEL> [options]
```

**参数：**

* `<KERNEL>`：内核 URL 后缀（格式：`owner/kernel-slug` 或 `owner/kernel-slug/version`，例如 `$KAGGLE_DEVELOPER/exercise-as-with` 或 `$KAGGLE_DEVELOPER/exercise-as-with/2`）。

**选项：**

* `-p, --path <PATH>`：下载文件的文件夹（默认为当前目录）。
* `-w, --wp`：下载文件到当前工作路径。
* `-m, --metadata`：与内核代码一起生成`kernel-metadata.json` 文件。

**示例：**

1. 将内核`$KAGGLE_DEVELOPER/exercise-as-with`及其元数据拉入`tests/kernel`文件夹中：

    ```bash
    kaggle kernels pull -p tests/kernel $KAGGLE_DEVELOPER/exercise-as-with -m
    ```

2. 将内核`$KAGGLE_DEVELOPER/exercise-as-with`拉入当前工作目录：

    ```bash
    kaggle kernels pull --wp $KAGGLE_DEVELOPER/exercise-as-with
    ```3. 将版本 2 的内核`$KAGGLE_DEVELOPER/exercise-as-with`拉入当前工作目录：

    ```bash
    kaggle kernels pull --wp $KAGGLE_DEVELOPER/exercise-as-with/2
    ```

**目的：**

此命令允许您将内核的源代码和元数据（可选）从 Kaggle 下载到本地计算机。

## `kaggle kernels output`

获取最新运行的内核的数据输出。

**用途：**

```bash
kaggle kernels output <KERNEL> [options]
```

**参数：**

* `<KERNEL>`：内核 URL 后缀（例如，`kerneler/using-google-bird-vocalization-model`）。

**选项：**

* `-p, --path <PATH>`：将输出文件下载到的文件夹（默认为当前目录）。
* `-w, --wp`：下载文件到当前工作路径。
* `-o, --force`：强制下载，覆盖现有文件。
* `-q, --quiet`：抑制详细输出。
* `--file-pattern <REGEX>`：与文件名匹配的正则表达式模式。仅下载与模式匹配的文件。
* `--page-size <SIZE>`：每页请求的输出文件数。默认大小为 20，最大为 200。
* `--page-token <TOKEN>`：从特定输出页面下载文件。如果 Kaggle 返回另一个页面令牌，则会在下载后打印它。

**示例：**

下载内核`kerneler/using-google-bird-vocalization-model`的输出，强制覆盖：

```bash
kaggle kernels output kerneler/sqlite-global-default -o
```
仅下载 PNG 文件：

```bash
kaggle kernels output <kernel> --file-pattern ".*\.png$"  # Only PNG files
```

在所有输出页面下载匹配的 PNG 文件：

```bash
kaggle kernels output <kernel> --file-pattern ".*\.png$"
```

从特定输出页面下载文件：

```bash
kaggle kernels output <kernel> --page-token <TOKEN>
```以较小的页面下载文件：

```bash
kaggle kernels output <kernel> --page-size 50
```

**目的：**

使用此命令检索内核运行生成的文件，例如提交文件、处理的数据或可视化。默认情况下，输出下载会扫描每个可用的输出页面，因此 `--file-pattern` 可以匹配第一页以外的文件。使用`--page-size`控制每个页面请求多少个文件，当您只想从一个特定页面下载文件时使用`--page-token`。

## `kaggle kernels status`

显示内核最新运行的状态。

**用途：**

```bash
kaggle kernels status <KERNEL>
```

**参数：**

* `<KERNEL>`：内核 URL 后缀（例如，`kerneler/sqlite-global-default`）。

**示例：**

获取内核`kerneler/sqlite-global-default`的状态：

```bash
kaggle kernels status kerneler/sqlite-global-default
```

**目的：**

此命令告诉您最新运行的内核是否仍在运行、成功完成还是失败。

## `kaggle kernels delete`

从 Kaggle 中删除内核。

**用途：**

```bash
kaggle kernels delete <KERNEL> [options]
```

**参数：**

* `<KERNEL>`：内核URL后缀（格式：`owner/kernel-slug`，例如`$KAGGLE_DEVELOPER/exercise-delete`）。

**选项：**

* `-y, --yes`：自动确认删除，不提示。

**示例：**

删除内核`$KAGGLE_DEVELOPER/exercise-delete`并自动确认：

```bash
kaggle kernels delete $KAGGLE_DEVELOPER/exercise-delete --yes
```

**目的：**

此命令将从 Kaggle 中永久删除您的内核之一。谨慎使用。

## `kaggle kernels topics list`列出内核的讨论主题。

**用途：**

```bash
kaggle kernels topics list <KERNEL> [options]
```

**参数：**

* `<KERNEL>`：格式为 `<owner>/<kernel-slug>` 的内核引用（例如，`owner/kernel-slug`）。

**选项：**

* `--sort-by <SORT_BY>`：排序顺序。有效选项：`hot`、`top`、`new`、`recent`、`active`、`relevance`。
* `-s, --search <SEARCH_TERM>`：搜索查询以过滤主题。
* `--page-size <PAGE_SIZE>`：每页的项目数。
* `--page-token <PAGE_TOKEN>`：用于分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

列出 `owner/kernel-slug` 内核的最新主题：

```bash
kaggle kernels topics list owner/kernel-slug --sort-by recent
```

**目的：**

此命令允许您浏览特定内核的讨论主题。

## `kaggle kernels topics show`

以树形形式显示内核讨论主题以及所有评论。

**用途：**

```bash
kaggle kernels topics show <TOPIC_REF> [options]
```

**参数：**

* `<TOPIC_REF>`：主题参考，可以是：
    * `<kernel>/<topic-id>`（例如，`owner/kernel-slug/12345`）
    * `<kernel> <topic-id>`（两个单独的参数，其中 `<topic-id>` 作为第二个参数传递）
    * `<topic-id>`（裸数字 ID）

**选项：**

* `--page-size <PAGE_SIZE>`：每页显示的评论数。
* `--page-token <PAGE_TOKEN>`：评论分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

```bash
kaggle kernels topics show owner/kernel-slug/12345
```

**目的：**此命令显示完整的讨论主题及其以缩进树结构呈现的所有注释。

## 在内核中使用 Secret

如果您的内核需要访问敏感信息（例如 API 密钥或密码）而不在代码中公开它们，您应该使用 **Kaggle Secrets**。

### 1. 在 Kaggle.com 上定义 Secret（不支持 CLI）
1. 在 Kaggle 笔记本编辑器中打开您的笔记本。
2. 在菜单中，选择 **附加组件** -> **秘密**。
3. 将您的机密添加为键值对（例如，标签：`MY_API_KEY`，值：`your-actual-key-value`）。

### 2. 在 Kaggle.com 上运行的代码中使用 Secrets
使用 `kaggle_secrets` 包中的 `UserSecretsClient` 在运行时检索您的机密：

```python
from kaggle_secrets import UserSecretsClient

# Retrieve the secret value using the label you defined
secret_value = UserSecretsClient().get_secret("MY_API_KEY")
```

**注意：** `kaggle_secrets` 软件包是预安装的，并且仅在 Kaggle 笔记本执行环境中起作用。在本地运行脚本时它将不起作用。