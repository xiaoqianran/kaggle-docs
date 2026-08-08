<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 公共API

### kagglehub 和 kaggle CLI

Kaggle 提供了两种不同的方式与 Kaggle 进行编程交互：

- [kaggle CLI](https://github.com/Kaggle/kaggle-cli)：这是一个命令行界面工具，用于通过终端或 shell 脚本中的命令进行交互 ([Documentation](https://github.com/Kaggle/kaggle-cli/blob/main/docs/README.md))。
- [kagglehub](https://github.com/Kaggle/kagglehub)：这是一个 Python 库，旨在允许用户与 Kaggle 资源（主要是模型、数据集和竞赛）进行交互。它旨在无缝集成到 **Python** ML 工作流程 ([Documentation](https://github.com/Kaggle/kagglehub/blob/main/README.md))。

### 身份验证

您可以使用 CLI 的 `kaggle auth login` 通过 OAuth 流程进行身份验证。您还可以从 [Kaggle account API tokens settings page](https://www.kaggle.com/settings/api) 创建 API 密钥。

### 速率限制

Kaggle 对公共 API 和使用 kaggle.com 网站时进行的调用都使用动态速率限制。如果您遇到 HTTP 429 错误代码或“请求过多”错误，我们建议您执行以下步骤：- 暂停和重试：通常，最有效的解决方案是等待几分钟，然后重试您的请求。
- 检查您的逻辑：值得快速查看您的代码，以确保不会触发意外的循环或冗余调用。这在自动化脚本中进行 API 调用时特别有用，其中一个小的逻辑错误可能会无意中导致大量请求。
- 报告平台问题：如果您调查了您的代码，并认为 Kaggle 网站上的错误导致请求发生的频率高于应有的频率，请在 [Product Feedback](https://www.kaggle.com/discussions/product-feedback) 论坛中报告，以便我们进行调查。