<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 配置 CLI 参考

使用 `kaggle config` 查看、设置和取消设置本地 Kaggle CLI 配置。的
CLI 从 JSON 文件和 `KAGGLE_` 环境变量中读取配置。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- 设置或取消设置值时对 Kaggle 配置目录的写访问权限。

## 命令层次结构

```text
kaggle config
├── view
├── set
└── unset
```

## 配置文件位置

- 如果设置了`KAGGLE_CONFIG_DIR`，CLI 将使用该目录。
- 否则通常使用`~/.kaggle`。
- 在 Linux 上，当 `~/.kaggle` 不存在时，它遵循 XDG 配置路径：
  `${XDG_CONFIG_HOME:-~/.config}/kaggle`。
- 配置文件名为`kaggle.json`。
- 新创建的配置文件被 chmodded 为 `0600`。
- 以`KAGGLE_`开头的环境变量合并到配置值中
  读取文件值后。

## `kaggle config view`

打印当前配置值。

**用途：**

```bash
kaggle config view
```

**选项：**

- 没有。

**示例：**

```bash
kaggle config view
```

**用途：** 检查配置的用户名、身份验证方法、路径、代理和默认值
竞争。

## `kaggle config set`

设置配置值。

**用途：**

```bash
kaggle config set -n <NAME> -v <VALUE>
```

**选项：**

- `-n, --name <NAME>`：配置键。
- `-v, --value <VALUE>`：配置值。

**常用名称：**

- `competition`：默认比赛子弹。
- `path`：默认下载文件夹。
- `proxy`：HTTP 请求的代理。

**示例：**

```bash
kaggle config set -n competition -v titanic
kaggle config set -n path -v /tmp/kaggle-downloads
kaggle config set -n proxy -v http://proxy.example:8080
```**用途：** 保留其他命令使用的默认值。

## `kaggle config unset`

从配置文件中删除配置值。

**用途：**

```bash
kaggle config unset -n <NAME>
```

**选项：**

- `-n, --name <NAME>`：要删除的配置键。

**示例：**

```bash
kaggle config unset -n competition
```

**目的：** 清除持久的默认值并返回回退行为。

## 行为细节

- `set` 更新内存配置和 JSON 配置文件。
- `unset` 仅从配置文件中删除密钥；环境变量可以
  仍然在下一次加载时提供一个值。
- 当没有明确指定时，下载命令使用配置的`path`作为基本默认值
  提供了路径。
- 接受可选竞争 slugs 的竞争命令可以使用配置的
  `competition` 作为默认值。

## 注释

- CLI 帮助文本名称 `competition`、`path` 和 `proxy` 作为有效的配置名称。
  与身份验证相关的密钥也可能出现在配置输出中。
- 如果配置文件在非 Windows 系统上是全局可读的，则 CLI 会打印
  权限警告。