<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 型号变体版本 CLI 参考

使用`kaggle models variations versions`管理模型的编号快照
变体的文件。 CLI 还接受变体下的嵌套别名 `v`。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- 私有模型变体和突变命令的 Kaggle 凭证。
- `<owner>/<model>/<framework>/<variation>` 形式的现有模型变体。

## 命令层次结构

```text
kaggle models variations versions (alias under variations: v)
├── list
├── create
├── download
├── files
└── delete
```

注意：不推荐`kaggle models variations versions init`；使用
`kaggle models variations init` 创建变体元数据。

## `kaggle models variations versions list`

列出模型变体的版本。

**用途：**

```bash
kaggle models variations versions list <MODEL_VARIATION> [options]
```

**选项：**

- `--page-size <SIZE>`：页面大小，默认20。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。

**示例：**

```bash
kaggle models variations versions list google/gemma/pytorch/7b -v
```

**用途：** 在选择之前检查可用的编号版本。

## `kaggle models variations versions create`

为模型变体创建新版本。

**用途：**

```bash
kaggle models variations versions create <MODEL_VARIATION> [options]
```

**选项：**

- `-p, --path <FOLDER>`：包含新版本文件的文件夹。
- `-n, --version-notes <NOTES>`：版本说明。
- `-q, --quiet`：抑制进度输出。
- `-r, --dir-mode <skip|zip|tar>`：目录处理。默认`skip`。

**示例：**

```bash
kaggle models variations versions create owner/model/jax/main -p tmp -n "Updated files" -q -r skip
```

**用途：** 上传现有变体的新文件快照。

## `kaggle models variations versions download`

下载特定变体版本的文件。

**用途：**

```bash
kaggle models variations versions download <MODEL_VARIATION_VERSION> [options]
```

**参数：**

- `<MODEL_VARIATION_VERSION>`：
  `<owner>/<model>/<framework>/<variation>/<version-number>`。

**选项：**- `-p, --path <PATH>`：下载文件夹。
- `--untar`：解压下载的存档并删除tar文件。
- `-f, --force`：强制下载。
- `-q, --quiet`：抑制进度输出。

**示例：**

```bash
kaggle models variations versions download google/gemma/pytorch/7b/2 -p models --untar
```

**用途：** 检索特定版本的文件。

## `kaggle models variations versions files`

列出特定变体版本的文件。

**用途：**

```bash
kaggle models variations versions files <MODEL_VARIATION_VERSION> [options]
```

**选项：**

- `--page-size <SIZE>`：页面大小，默认20。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。

**示例：**

```bash
kaggle models variations versions files google/gemma/pytorch/7b/2 -v --page-size 3
```

**用途：** 检查编号版本内的文件。

## `kaggle models variations versions delete`

删除模型变体版本。

**用途：**

```bash
kaggle models variations versions delete <MODEL_VARIATION_VERSION> [options]
```

**选项：**

- `-y, --yes`：跳过确认。

**示例：**

```bash
kaggle models variations versions delete owner/model/jax/main/2 -y
```

**用途：** 删除特定版本快照。

## 注释

- 版本句柄使用
  `<owner>/<model-name>/<framework>/<variation-slug>/<version-number>`。
- 目录上传遵循`--dir-mode`； `skip` 忽略目录，`zip`
  压缩它们，然后`tar`上传未压缩的存档。