<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 模型变体版本命令

用于管理特定 Kaggle 模型变体的版本的命令。每个版本都代表模型变体文件在某个时间点的快照。

## `kaggle models variations versions create`

创建现有模型变体的新版本。

**用途：**

```bash
kaggle models variations versions create <MODEL_VARIATION> -p <FOLDER_PATH> [options]
```

**参数：**

* `<MODEL_VARIATION>`：新版本的目标模型变体URL后缀（格式：`owner/model-slug/framework/variation-slug`，例如`$KAGGLE_DEVELOPER/test-model/jax/main`）。

**选项：**

* `-p, --path <FOLDER_PATH>`：包含此新版本文件的文件夹路径（默认为当前目录）。
* `-n, --version-notes <NOTES>`：描述此版本的注释。
* `-q, --quiet`：抑制详细输出。
* `-r, --dir-mode <MODE>`：如何处理上传中的目录：`skip`（忽略）、`zip`（压缩上传）、`tar`（未压缩上传）（默认：`skip`）。
* `--ignore-patterns <PATTERNS>`：要忽略的文件/目录模式。可以指定多次。


**示例：**

使用 `tmp` 文件夹中的文件为模型变体 `$KAGGLE_DEVELOPER/test-model/jax/main` 创建一个新版本，并带有版本注释“更新的模型文件”，悄悄地并跳过子目录：

```bash
# Ensure tmp folder contains the new files for the version, e.g., data_v2.csv
# echo "e,f,g,h" > tmp/data_v2.csv

kaggle models variations versions create $KAGGLE_DEVELOPER/test-model/jax/main -p tmp -n "Updated model files" -q -r skip
```

**目的：**此命令将一组新文件上传到现有模型变体，创建一个新的编号版本。这允许您跟踪更改并恢复到模型变体文件的先前版本。

## `kaggle models variations versions download`

下载模型变体的特定版本的文件。

**用途：**

```bash
kaggle models variations versions download <MODEL_VARIATION_VERSION> [options]
```

**参数：**

* `<MODEL_VARIATION_VERSION>`：型号变体版本 URL 后缀，格式为 `owner/model-slug/framework/variation-slug/version-number`（例如，`$KAGGLE_DEVELOPER/test-model/jax/main/1`）。

**选项：**

* `-p, --path <PATH>`：下载文件的文件夹（默认为当前目录）。
* `--untar`：如果下载的文件是`.tar`存档，则解压（随后删除`.tar`文件）。
* `--unzip`：如果下载的文件是`.zip`存档，请解压（随后删除`.zip`文件）。
* `-f, --force`：强制下载，覆盖现有文件。
* `-q, --quiet`：抑制详细输出。

**示例：**

将模型变体 `$KAGGLE_DEVELOPER/test-model/jax/main` 的版本 1 下载到 `tmp` 文件夹中，解压（如果适用），强制覆盖，然后安静地进行：

```bash
kaggle models variations versions download $KAGGLE_DEVELOPER/test-model/jax/main/1 -p tmp -q -f --untar
```

**目的：**

此命令允许您检索与模型变体的特定版本关联的特定文件。

## `kaggle models variations versions files`

列出模型变体的特定版本的文件。

**用途：**

```bash
kaggle models variations versions files <MODEL_VARIATION_VERSION> [options]
```

**参数：*** `<MODEL_VARIATION_VERSION>`：型号变体版本 URL 后缀（例如，`google/gemma/pytorch/7b/2`）。

**选项：**

* `-v, --csv`：以 CSV 格式打印结果。
* `--page-size <SIZE>`：每页的项目数（默认值：20）。
* `--page-token <TOKEN>`：结果分页的页面令牌。

**示例：**

以 CSV 格式列出模型变体 `google/gemma/pytorch/7b` 版本 2 的前 3 个文件：

```bash
kaggle models variations versions files google/gemma/pytorch/7b/2 -v --page-size=3
```

**目的：**

在下载之前，使用此命令查看构成模型变体特定版本的各个文件。

## `kaggle models variations versions delete`

从 Kaggle 中删除模型变体的特定版本。

**用途：**

```bash
kaggle models variations versions delete <MODEL_VARIATION_VERSION> [options]
```

**参数：**

* `<MODEL_VARIATION_VERSION>`：型号变体版本 URL 后缀，格式为 `owner/model-slug/framework/variation-slug/version-number`（例如，`$KAGGLE_DEVELOPER/test-model/jax/main/1`）。

**选项：**

* `-y, --yes`：自动确认删除，不提示。

**示例：**

删除模型变体`$KAGGLE_DEVELOPER/test-model/jax/main`的版本1并自动确认：

```bash
kaggle models variations versions delete $KAGGLE_DEVELOPER/test-model/jax/main/1 -y
```

**目的：**

此命令将从 Kaggle 中永久删除模型变体的特定版本。谨慎使用。如果它是唯一的版本，如果不存在其他版本，这可能会导致模型变体本身被删​​除。