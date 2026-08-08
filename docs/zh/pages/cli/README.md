<!-- kaggle-docs: machine-translated zh-CN from English source -->

# Kaggle CLI 文档

欢迎使用 Kaggle CLI 文档。本指南提供了有关如何使用 Kaggle 命令行界面与 Kaggle 平台交互的详细信息。

## 安装

注意：确保您安装了 Python 3.11+ 和包管理器 `pip`。

使用 [pip](https://pypi.org/project/pip/) 安装 `kaggle` 软件包：

```sh
pip install kaggle
```

如果遇到 `Command kaggle not found` 错误，请确保您的 Python 可执行脚本位于 $PATH 中。对于 Linux 上的本地用户安装，默认位置是 `~/.local/bin`。在 Windows 上，默认位置是 `$PYTHON_HOME/Scripts`。

## 身份验证

首先，您需要一个 Kaggle 帐户。您可以报名[here](https://www.kaggle.com/account/login)。

登录后，您可以通过单击“API”部分下的“生成新令牌”按钮，在 https://www.kaggle.com/settings/api 下载您的 Kaggle API 凭证。

### 选项 1：OAuth

通过基于 Web 的授权流程获取 Kaggle 用户帐户的访问凭据。

```sh
kaggle auth login
```

### 选项 2：环境变量

```sh
export KAGGLE_API_TOKEN=xxxxxxxxxxxxxx # Copied from the settings UI
```

### 选项 3：API 令牌文件

将从 [Kaggle account API tokens settings page](https://www.kaggle.com/settings/api) 获取的 Kaggle API 令牌存储在`~/.kaggle/access_token` 的文件中。

### 选项 4：旧版 API 凭证文件在 [Kaggle account API tokens settings page](https://www.kaggle.com/settings/api) 的“旧版 API 凭证”下，单击“创建旧版 API 密钥”按钮以生成 `kaggle.json` 文件并将其存储在 `~/.kaggle/kaggle.json`。

## CLI 用法

运行以下命令列出可用命令：

```sh
kaggle --help
```

Kaggle CLI 分为几个命令组：

* [Competitions](./competitions.md)：管理和参加 Kaggle 比赛。
* [Datasets](./datasets.md)：搜索、下载和管理 Kaggle 数据集。
* [Forums](./forums.md)：浏览和阅读 Kaggle 讨论论坛。
* [Kernels](./kernels.md)：与 Kaggle Kernels（笔记本和脚本）交互。包括有关使用 [Kaggle Secrets](./kernels.md#using-secrets-in-kernels) 的信息。
* [Models](./models.md)：管理您的 Kaggle 模型。
* [Model Variations](./model_variations.md)：管理 Kaggle 模型的变体。
* [Model Variation Versions](./model_variations_versions.md)：管理 Kaggle 模型变体的版本。
* [Benchmarks](./benchmarks.md)：定义评估任务，针对LLM模型运行它们，并下载结果。
* [Configuration](./configuration.md)：配置 Kaggle CLI。

许多命令都会产生输出，可以根据不同的目的对其进行格式化：

* [Output Format](./output_format.md)：控制输出的格式。

## 教程

浏览这些教程以了解如何执行常见任务：

* [Tutorials](./tutorials.md)
    * [Create a Dataset](./tutorials.md#tutorial-create-a-dataset)
    * [Find and Download a Dataset](./tutorials.md#tutorial-find-and-download-a-dataset)
    * [Create a Model](./tutorials.md#tutorial-create-a-model)
    * [Create a Model Variation](./tutorials.md#tutorial-create-a-model-variation)
    * [Create a Model Variation Version](./tutorials.md#tutorial-create-a-model-variation-version)
    * [How to Submit to a Competition](./tutorials.md#tutorial-how-to-submit-to-a-competition)
    * [How to Submit to a Code Competition](./tutorials.md#tutorial-how-to-submit-to-a-code-competition)