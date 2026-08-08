<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 文件 CLI 参考

使用 `kaggle files` 将本地文件或目录上传到 Kaggle 收件箱路径。
此命令与数据集/模型/内核上传分开，并使用收件箱
文件API。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- Kaggle 凭证。
- 要上传的本地文件系统路径。

## 命令层次结构

```text
kaggle files
└── upload | u
```

## `kaggle files upload`

将一个或多个本地路径上传到服务器收件箱。

**用途：**

```bash
kaggle files upload [options] <LOCAL_PATH> [LOCAL_PATH ...]
```

**参数：**

- `<LOCAL_PATH>`：一个或多个本地文件或目录。每条路径都会创建一个
  单独的收件箱文件。

**选项：**

- `-i, --inbox-path <PATH>`：服务器上存储上传文件的虚拟路径。
- `--no-resume`：跳过可断点上传。
- `--no-compress`：不压缩目录；将目录上传为 tar 存档。

**示例：**

```bash
kaggle files upload report.csv
kaggle files upload -i experiments/run-1 output.csv metrics.json
kaggle files upload --no-resume --no-compress local-directory
kaggle files u -i scratch data.zip
```

**用途：** 将任意本地文件上传到收件箱位置。

## 行为细节

- 该命令最多接受`MAX_NUM_INBOX_FILES_TO_UPLOAD`，当前为1000
  本地路径。
- 每个提供的本地路径都是独立上传的。
- 目录路径默认压缩为 zip 存档。
- 对于`--no-compress`，目录路径使用tar模式上传。
- 上传使用可恢复上传机制，除非设置了`--no-resume`。
- 上传每个 blob 后，CLI 创建一个收件箱文件并打印
  `Inbox file created: <name>`。## 错误场景及注释

- 上传失败的路径会被上传助手跳过；上传成功
  路径仍继续创建收件箱文件。
- 此命令不会创建 Kaggle 数据集。使用 `kaggle datasets create` 或
  `kaggle datasets version` 用于数据集上传。
- 该命令不接受`-q/--quiet`；进步/噪音行为来自
  上传行为。