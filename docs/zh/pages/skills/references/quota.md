<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 配额 CLI 参考

使用`kaggle quota`显示当前用户每周的GPU和TPU加速器
Kaggle 内核的配额。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- Kaggle 凭证。

## 命令层次结构

```text
kaggle quota
```

## `kaggle quota`

显示当前每周 GPU 和 TPU 加速器配额。

**用途：**

```bash
kaggle quota [options]
```

**选项：**

- `-v, --csv`：打印 CSV 而不是表格。

**示例：**

```bash
kaggle quota
kaggle quota -v
```

**用途：** 检查 GPU/TPU 配额的已用时间、剩余时间、总时间和刷新时间。

## 输出

表字段：

- `resource`：`GPU` 或 `TPU`。
- `used`：已用时间（以小时为单位）。
- `remaining`：剩余时间（以小时为单位）。
- `total`：允许的总时间（以小时为单位）。
- `refreshAt`：服务器返回的配额刷新时间戳。

CSV 标头：

```text
resource,used,remaining,total,refreshAt
```

## 行为细节

- 缺少的 GPU 或 TPU 配额条目将被跳过。
- 如果没有返回配额信息，则打印`No quota information available`。
- 当使用时间超过总时间时，剩余时间被固定在`0.00h`。

## 注释

- 此命令报告内核的加速器配额；这不是帐单或
  存储配额命令。