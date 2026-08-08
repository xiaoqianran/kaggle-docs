<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 型号变体 CLI 参考

使用 `kaggle models variations` 管理特定于框架的变体
卡格尔模型。 CLI 还接受旧别名
`kaggle models instances`、`kaggle models v`、`kaggle models i`。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- 私有模型和突变命令的 Kaggle 凭证。
- 用于创建流程的现有模型。
- 对于初始化/创建/更新流程，请使用`model-instance-metadata.json`。使用
  `kaggle models variations init -p <FOLDER>` 生成启动文件。

## 命令层次结构

```text
kaggle models variations (aliases: instances, v, i)
├── get
├── init
├── create
├── files
├── list
├── update
├── delete
└── versions | v
    ├── list
    ├── create
    ├── download
    ├── files
    └── delete
```

## `kaggle models variations init`

创建一个启动器 `model-instance-metadata.json`。

**用途：**

```bash
kaggle models variations init [options]
```

**选项：**

- `-p, --path <FOLDER>`：将写入元数据的文件夹。

**示例：**

```bash
kaggle models variations init -p my-model/main
```

**用途：** 模型变体的引导元数据。

## `kaggle models variations create`

创建新的模型变体和第一个版本。

**用途：**

```bash
kaggle models variations create [options]
```

**选项：**

- `-p, --path <FOLDER>`：包含文件和`model-instance-metadata.json`的文件夹。
- `-q, --quiet`：抑制进度输出。
- `-r, --dir-mode <skip|zip|tar>`：目录处理。默认`skip`。

**示例：**

```bash
kaggle models variations create -p tmp -q -r skip
```

**目的：** 在现有模型下上传变体元数据和文件。

## `kaggle models variations get`

获取模型变体元数据。

**用途：**

```bash
kaggle models variations get <MODEL_VARIATION> [options]
```

**参数：**

- `<MODEL_VARIATION>`：`<owner>/<model>/<framework>/<variation-slug>`。

**选项：**

- `-p, --path <FOLDER>`：将元数据下载到的文件夹。

**示例：**

```bash
kaggle models variations get google/gemma/pytorch/7b -p metadata
```

**用途：** 下载变体的元数据。

## `kaggle models variations files`列出模型变体当前版本的文件。

**用途：**

```bash
kaggle models variations files <MODEL_VARIATION> [options]
```

**选项：**

- `--page-size <SIZE>`：页面大小，默认20。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。

**示例：**

```bash
kaggle models variations files google/gemma/pytorch/7b -v --page-size 5
```

**用途：** 检查与最新变体版本相关的文件。

## `kaggle models variations list`

列出模型的变体。

**用途：**

```bash
kaggle models variations list <MODEL> [options]
```

**选项：**

- `--page-size <SIZE>`：页面大小，默认20。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。

**示例：**

```bash
kaggle models variations list google/gemma
```

**目的：** 查看模型下特定于框架的变体。

## `kaggle models variations update`

更新变体元数据。

**用途：**

```bash
kaggle models variations update [options]
```

**选项：**

- `-p, --path <FOLDER>`：包含更新的`model-instance-metadata.json`的文件夹。

**示例：**

```bash
kaggle models variations update -p tmp
```

**目的：** 更改变体元数据。这不会上传新文件或创建
一个版本；使用 `models variations versions create` 进行文件更新。的
变异身份从`ownerSlug`、`modelSlug`、`framework`读取，并且
`instanceSlug`在`model-instance-metadata.json`里面。

## `kaggle models variations delete`

删除模型变体。

**用途：**

```bash
kaggle models variations delete <MODEL_VARIATION> [options]
```

**选项：**

- `-y, --yes`：跳过确认。

**示例：**

```bash
kaggle models variations delete owner/model/jax/main -y
```

**目的：** 删除模型变体。

## 注释- 变化手柄使用`<owner>/<model-name>/<framework>/<variation-slug>`。
- `instances` 被接受为 `variations` 的传统拼写。
- 目录上传遵循`--dir-mode`； `skip` 忽略目录，`zip`
  压缩它们，然后 `tar` 上传未压缩的存档。