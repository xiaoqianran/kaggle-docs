<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 身份验证 CLI 参考

使用 `kaggle auth` 运行 OAuth 登录、打印 OAuth 访问令牌或撤销
活动 OAuth 刷新令牌。 CLI 还支持非命令身份验证
`KAGGLE_API_TOKEN`、`~/.kaggle/access_token` 和旧版 API 密钥凭证。

## 先决条件

- 安装了 `kaggle` 软件包的 Python 3.11+。
- Kaggle 帐户。
- 默认OAuth登录流程的浏览器访问，或使用`--no-launch-browser`
  打印 URL。

## 命令层次结构

```text
kaggle auth
├── login
├── print-access-token
└── revoke
```

## 身份验证来源

CLI 身份验证流程尝试这些来源：

1. 访问代币来源，例如`KAGGLE_API_TOKEN`或
   `~/.kaggle/access_token`。
2.来自环境/配置值`username`和`key`的旧版API密钥配置。
3. 由 `kaggle auth login` 创建的 OAuth 凭证。

如果没有成功，CLI 将打印身份验证帮助并退出。

一些命令是允许注销的，包括help/version和selected
公共数据集文件/下载流程。

## `kaggle auth login`

运行 Kaggle OAuth 登录。

**用途：**

```bash
kaggle auth login [options]
```

**选项：**

- `--no-launch-browser`：不启动浏览器；而是打印一个 auth URL。
- `--force`：即使已经登录，也要重新运行登录。

**示例：**

```bash
kaggle auth login
kaggle auth login --no-launch-browser
kaggle auth login --force
```

**用途：** 存储活动 Kaggle 帐户的 OAuth 凭据。

**行为详情：**- 如果凭据已存在且未设置`--force`，则该命令将打印
  当前帐户并退出，并显示使用 `--force` 的说明。
- OAuth 流程请求默认范围 `resources.admin:*`。

## `kaggle auth print-access-token`

打印活动 OAuth 帐户的访问令牌。

**用途：**

```bash
kaggle auth print-access-token [options]
```

**选项：**

- `--expiration <DURATION>`：覆盖令牌持续时间。正整数
  后跟单位后缀：`s`（秒）、`m`（分钟）、`h`（小时）、
  `d`（天）或`w`（周）。例如：`6h`、`30m`、`2d`。

**示例：**

```bash
kaggle auth print-access-token
kaggle auth print-access-token --expiration 6h
```

**目的：**发出一个可以放置在`KAGGLE_API_TOKEN`或其他中的令牌
支持的令牌源。

**行为详情：**

- 需要来自 `kaggle auth login` 的 OAuth 凭据。
- 如果不存在 OAuth 凭据，该命令会告诉用户运行
  `kaggle auth login`。
- `--expiration` 接受正整数后跟单个单位后缀
  (`s`、`m`、`h`、`d`、`w`)，例如`6h` 或 `2d`。化合物（`2h30s`）和结肠
  不支持 (`2:30`) 格式。

## `kaggle auth revoke`

撤销活动的 OAuth 刷新令牌。

**用途：**

```bash
kaggle auth revoke [options]
```

**选项：**

- `--reason <TEXT>`：发送到服务器的原因。

**示例：**

```bash
kaggle auth revoke
kaggle auth revoke --reason "rotating credentials"
```

**用途：** 使活动的 OAuth 凭据无效。

**行为详情：**- 如果不存在 OAuth 凭据，该命令将打印“There is no token to
  revoke.` 并成功退出。
- 如果没有提供原因，则默认原因是
  `Manually revoked by user with kaggle-cli`。

## 遗留和令牌授权说明

- `KAGGLE_API_TOKEN` 可以在没有旧用户名/密钥对的情况下进行身份验证
  令牌自省成功。
- 旧配置可以来自`~/.kaggle/kaggle.json`或环境变量
  例如`KAGGLE_USERNAME`和`KAGGLE_KEY`。
- 对于 OAuth 凭证，首选 `kaggle auth login`，对于 OAuth 凭证，首选 `KAGGLE_API_TOKEN`
  非交互式身份验证。