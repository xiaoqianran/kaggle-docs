<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 内核 CLI 参考

使用 `kaggle kernels` 或别名 `kaggle k` 列出内核，检查输出文件，
初始化元数据，推送笔记本/脚本代码，拉取代码，下载输出，
检查运行状态、流日志和删除内核。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- 用于推/拉/输出/状态/日志/删除的 Kaggle 凭据。
- 对于推流，准备一个包含`kernel-metadata.json`的文件夹。使用
  `kaggle kernels init -p <FOLDER>` 生成启动文件。

## 命令层次结构

```text
kaggle kernels (alias: kaggle k)
├── list
├── files
├── init
├── push | update
├── pull | get
├── output
├── status
├── logs
└── delete
```

注：`get`是`pull`的别名； `update` 是 `push` 的别名。

## `kaggle kernels list`

列出可用的内核。

**用途：**

```bash
kaggle kernels list [options]
```

**选项：**

- `-m, --mine`：只有你的内核。
- `-p, --page <PAGE>`：页码。
- `--page-size <SIZE>`：页面大小，默认20。
- `-s, --search <TERM>`：搜索文本。
- `--parent <KERNEL>`：父内核的子内核。
- `--competition <SLUG>`：比赛用的内核。
- `--dataset <OWNER/SLUG>`：数据集的内核。
- `--user <USER>`：用户的内核。
- `--language <LANG>`：`all`、`python`、`r`、`sqlite`、`julia`。
- `--kernel-type <TYPE>`：`all`、`script`、`notebook`。
- `--output-type <TYPE>`：`all`、`visualization`、`data`。
- `--sort-by <SORT>`：排序顺序。
- `-v, --csv`：打印 CSV。

**示例：**

```bash
kaggle kernels list
kaggle kernels list --user kaggle --language python --sort-by dateRun
kaggle k list -m -v
```

**目的：** 查找 `<owner>/<kernel-slug>` 格式的内核句柄。

## `kaggle kernels files`

列出内核的输出文件。

**用途：**

```bash
kaggle kernels files [KERNEL] [options]
```

**选项：**

- `--page-size <SIZE>`：页面大小。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。**示例：**

```bash
kaggle kernels files kerneler/sqlite-global-default -v --page-size 1
```

**用途：** 下载之前检查生成的输出。

## `kaggle kernels init`

创建一个启动器`kernel-metadata.json`。

**用途：**

```bash
kaggle kernels init [options]
```

**选项：**

- `-p, --path <FOLDER>`：将写入元数据的文件夹。

**示例：**

```bash
kaggle kernels init -p my-kernel
```

**用途：** 引导`kaggle kernels push`的本地元数据。

## `kaggle kernels push`

将代码推送到内核并运行它。

**用途：**

```bash
kaggle kernels push [options]
```

**选项：**

- `-p, --path <FOLDER>`：包含文件和`kernel-metadata.json`的文件夹。
- `-t, --timeout <SECONDS>`：限制运行时间，以 Kaggle 的最大值为界。
- `--accelerator <ACCELERATOR>`：内核运行的加速器类型。

**示例：**

```bash
kaggle kernels push -p my-kernel --timeout 3600 --accelerator gpu
kaggle kernels update -p my-kernel
```

**目的：**上传本地笔记本/脚本代码并创建新的内核版本。

**注意：** `NvidiaTeslaP100` 不可用于默认情况下的 GPU 计算
Kaggle 图像，其 PyTorch 版本 (cu128) 省略了 Pascal (`sm_60`) 内核：
`torch.cuda.is_available()` 返回 `True`，但第一个 CUDA 操作失败
与`cudaErrorNoKernelImageForDevice`。使用`NvidiaTeslaT4`或
安装 Pascal 兼容的 torch 版本。

## `kaggle kernels pull`

从内核中提取代码。

**用途：**

```bash
kaggle kernels pull [KERNEL] [options]
```

**选项：**

- `-p, --path <PATH>`：下载文件夹。
- `-w, --wp`：下载到当前工作路径。
- `-m, --metadata`：拉取时生成元数据。
**示例：**

```bash
kaggle kernels pull owner/kernel-slug -p pulled
kaggle kernels get owner/kernel-slug -w -m
kaggle k pull owner/kernel-slug/3 -w -m
```

**目的：** 从 Kaggle 检索笔记本/脚本源。

**注意：** 内核参考可能包括可选版本：
`<owner>/<kernel-name>/<version>`。

## `kaggle kernels output`下载最新内核运行的输出。

**用途：**

```bash
kaggle kernels output [KERNEL] [options]
```

**选项：**

- `-p, --path <PATH>`：下载文件夹。
- `-w, --wp`：下载到当前工作路径。
- `-o, --force`：强制下载。
- `-q, --quiet`：抑制进度输出。
- `--file-pattern <REGEX>`：仅下载匹配的输出文件。
- `--page-size <SIZE>`：每页输出文件。
- `--page-token <TOKEN>`：从一个输出页面下载。

**示例：**

```bash
kaggle kernels output owner/kernel-slug -p output
kaggle k output owner/kernel-slug --file-pattern ".*\\.png$"
```

**用途：** 检索生成的文件，例如提交、图像或已处理的文件
数据。

**注意：** 如果没有`--page-token`，输出下载会扫描可用页面，以便
`--file-pattern` 可以匹配首页以外的文件。

## `kaggle kernels status`

显示最新内核运行的状态。

**用途：**

```bash
kaggle kernels status [KERNEL]
```

**选项：**

- 没有可见的选项。如果省略`[KERNEL]`，则本地`kernel-metadata.json`
  提供内核参考。

**示例：**

```bash
kaggle kernels status owner/kernel-slug
```

**用途：**检查最新的运行是否已排队、正在运行、已完成或
出错了。

## `kaggle kernels logs`

打印最新内核运行的执行日志。

**用途：**

```bash
kaggle kernels logs [KERNEL] [options]
```

**选项：**

- `-f, --follow`：持续轮询并打印新的日志行。
- `--interval <SECONDS>`：跟随模式的轮询间隔。默认 5。

**示例：**

```bash
kaggle kernels logs owner/kernel-slug
kaggle k logs owner/kernel-slug --follow --interval 10
```

**用途：** 从 CLI 日志调试内核执行。

## `kaggle kernels delete`

删除一个内核。

**用途：**

```bash
kaggle kernels delete <KERNEL> [options]
```

**选项：**

- `-y, --yes`：跳过确认。**示例：**

```bash
kaggle kernels delete owner/kernel-slug -y
```

**目的：** 从 Kaggle 中删除内核。

## 错误场景及注释

- 内核句柄是`<owner>/<kernel-name>`或`<owner>/<kernel-name>/<version>`。
- 推送需要元数据文件和该元数据中的有效代码文件路径。
- `logs --follow`重复轮询；使用`--interval`来避免过多的调用。