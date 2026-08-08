<!-- kaggle-docs: machine-translated zh-CN from English source -->

# Kaggle CLI 配置

Kaggle CLI 使用配置文件来存储设置，例如 API 凭据和命令的默认值。

## 配置命令

### `config view`

显示当前配置值。

**用途：**

```bash
kaggle config view
```

**目的：**

此命令允许您检查 Kaggle CLI 的当前设置，例如配置的 API 端点、代理设置和默认竞争。

### `config set`

设置特定的配置值。

**用途：**

```bash
kaggle config set -n <NAME> -v <VALUE>
```

**参数：**

* `-n, --name <NAME>`：要设置的配置参数的名称。有效选项为 `competition`、`path` 和 `proxy`。
* `-v, --value <VALUE>`：为配置参数设置的值。
    * 对于`competition`：比赛网址后缀（例如，`titanic`）。
    * 对于`path`：下载文件的默认文件夹。
    * 对于`proxy`：代理服务器 URL。

**示例：**

将默认竞赛设置为“泰坦尼克号”：

```bash
kaggle config set -n competition -v titanic
```

**目的：**

使用此命令自定义 Kaggle CLI 的行为，例如设置默认竞争以避免在每个命令中指定它、定义默认下载路径或配置代理服务器。

### `config unset`

清除特定配置值，将其恢复为默认值。**用途：**

```bash
kaggle config unset -n <NAME>
```

**参数：**

* `-n, --name <NAME>`：要清除的配置参数名称。有效选项为 `competition`、`path` 和 `proxy`。

**示例：**

清除默认竞争：

```bash
kaggle config unset -n competition
```

**目的：**

此命令删除先前设置的配置值，允许 CLI 使用其默认行为或提示输入该值（如果需要）。

## 配置文件位置

Kaggle CLI 配置通常存储在名为 `kaggle.json` 的文件中，该文件位于 Linux 和 macOS 上的 `~/.kaggle/` 目录中，或 Windows 上的 `C:\Users\<Windows-username>\.kaggle\` 目录中。

该文件包含您的 API 用户名和密钥：

```json
{"username":"YOUR_USERNAME","key":"YOUR_API_KEY"}
```

您可以从 Kaggle 帐户页面 (`https://www.kaggle.com/<YOUR_USERNAME>/account`) 下载此文件并将其放置在正确的目录中。

或者，您可以设置 `KAGGLE_USERNAME` 和 `KAGGLE_KEY` 环境变量。