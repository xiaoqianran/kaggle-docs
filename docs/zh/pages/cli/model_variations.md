<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 模型变化命令

用于与 Kaggle 模型的变体交互的命令。模型变体通常代表父模型的特定框架。

## `kaggle models variations init`

初始化元数据文件 (`model-instance-metadata.json`) 以创建新的模型变体。
请注意，文件的名称反映了变体的旧名称，即“instance”。

**用途：**

```bash
kaggle models variations init -p <FOLDER_PATH>
```

**选项：**

* `-p, --path <FOLDER_PATH>`：将创建`model-instance-metadata.json`文件的文件夹路径（默认为当前目录）。

**示例：**

在`tmp`文件夹中初始化模型变体元数据文件：

```bash
kaggle models variations init -p tmp
```

**目的：**

此命令创建一个模板 `model-instance-metadata.json` 文件。在创建变体之前，您必须编辑此文件，其中包含所有者 slug、父模型 slug、变体（或实例）slug（此变体的 URL 友好名称）和框架（例如，`tensorflow`、`pytorch`、`jax`、`sklearn`）等详细信息。

## `kaggle models variations create`

在 Kaggle 上的现有模型下创建新的模型变体。

**用途：**

```bash
kaggle models variations create -p <FOLDER_PATH> [options]
```

**选项：*** `-p, --path <FOLDER_PATH>`：包含模型变体文件和`model-instance-metadata.json` 文件的文件夹路径（默认为当前目录）。
* `-q, --quiet`：抑制详细输出。
* `-r, --dir-mode <MODE>`：如何处理上传中的目录：`skip`（忽略）、`zip`（压缩上传）、`tar`（未压缩上传）（默认：`skip`）。
* `--ignore-patterns <PATTERNS>`：要忽略的文件/目录模式。可以指定多次。


**示例：**

使用 `tmp` 文件夹中的元数据和文件创建一个新的模型变体，悄悄地跳过子目录。 （假设`tmp`中的`model-instance-metadata.json`已被正确编辑）：

```bash
# Example: Edit model-instance-metadata.json first
# sed -i 's/INSERT_OWNER_SLUG_HERE/your-username/' tmp/model-instance-metadata.json
# sed -i 's/INSERT_EXISTING_MODEL_SLUG_HERE/parent-model-slug/' tmp/model-instance-metadata.json
# sed -i 's/INSERT_INSTANCE_SLUG_HERE/my-variation-slug/' tmp/model-instance-metadata.json
# sed -i 's/INSERT_FRAMEWORK_HERE/jax/' tmp/model-instance-metadata.json
# echo "a,b,c,d" > tmp/data.csv # Example model file

kaggle models variations create -p tmp -q -r skip
```

**目的：**

此命令上传您的本地模型文件（例如权重、架构定义）和关联的变体元数据，以在 Kaggle 上的指定父模型下创建新变体。这有效地创建了该模型变体的第一个版本。

## `kaggle models variations get`

下载现有模型变体的 `model-instance-metadata.json` 文件。

**用途：**

```bash
kaggle models variations get <MODEL_VARIATION> -p <FOLDER_PATH>
```

**参数：**

* `<MODEL_VARIATION>`：型号变体 URL 后缀，格式为 `owner/model-slug/framework/variation-slug`（例如，`$KAGGLE_DEVELOPER/test-model/jax/main`）。

**选项：**

* `-p, --path <FOLDER_PATH>`：将`model-instance-metadata.json` 文件下载到的文件夹。

**示例：**

将模型变体 `$KAGGLE_DEVELOPER/test-model/jax/main` 的元数据下载到 `tmp` 文件夹中：

```bash
kaggle models variations get $KAGGLE_DEVELOPER/test-model/jax/main -p tmp
```

**目的：**此命令检索现有模型变体的元数据文件。这对于检查或作为更新的基础很有用。

## `kaggle models variations files`

列出模型变体当前版本的文件。

**用途：**

```bash
kaggle models variations files <MODEL_VARIATION> [options]
```

**参数：**

* `<MODEL_VARIATION>`：型号变体 URL 后缀（例如，`$KAGGLE_DEVELOPER/test-model/jax/main`）。

**选项：**

* `-v, --csv`：以 CSV 格式打印结果。
* `--page-size <SIZE>`：每页的项目数（默认值：20）。
* `--page-token <TOKEN>`：结果分页的页面令牌。

**示例：**

以 CSV 格式列出模型变体 `$KAGGLE_DEVELOPER/test-model/jax/main` 的前 5 个文件：

```bash
kaggle models variations files $KAGGLE_DEVELOPER/test-model/jax/main -v --page-size 5
```

**目的：**

使用此命令可查看与特定模型变体的最新版本关联的文件。

## `kaggle models variations update`

使用本地 `model-instance-metadata.json` 文件更新 Kaggle 上的现有模型变体。

**用途：**

```bash
kaggle models variations update -p <FOLDER_PATH>
```

**选项：**

* `-p, --path <FOLDER_PATH>`：包含包含更新信息的`model-instance-metadata.json` 文件的文件夹路径（默认为当前目录）。注意：此命令仅更新变体的元数据，而不是文件。要更新文件，请创建新版本。

**示例：**

更新详细信息在 `tmp/model-instance-metadata.json` 中的模型变体（确保 JSON 中的 slugs 和所有者与现有模型变体匹配）：

```bash
kaggle models variations update -p tmp
```

**目的：**使用此命令更改现有模型变体的元数据，例如其描述或 ⟦T​​56⟧ 文件中定义的其他字段。这不会上传新文件或创建新版本。

## `kaggle models variations delete`

从 Kaggle 中删除模型变体。

**用途：**

```bash
kaggle models variations delete <MODEL_VARIATION> [options]
```

**参数：**

* `<MODEL_VARIATION>`：型号变体 URL 后缀，格式为 `owner/model-slug/framework/variation-slug`（例如，`$KAGGLE_DEVELOPER/test-model/jax/main`）。

**选项：**

* `-y, --yes`：自动确认删除，不提示。

**示例：**

删除型号变体`$KAGGLE_DEVELOPER/test-model/jax/main`并自动确认：

```bash
kaggle models variations delete $KAGGLE_DEVELOPER/test-model/jax/main -y
```

**目的：**

此命令将从 Kaggle 中永久删除您的模型变体之一（及其所有版本）。谨慎使用。