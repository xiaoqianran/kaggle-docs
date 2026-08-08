<!-- kaggle-docs: machine-translated zh-CN from English source -->

# Kaggle CLI

与[Kaggle](https://www.kaggle.com)交互的官方CLI。

---

[User documentation](docs/README.md)

---

## 主要特点

一些主要功能是：

* 列出比赛、下载比赛数据、提交比赛。
* 列出、创建、更新、下载或删除数据集。
* 列出、创建、更新、下载或删除模型和模型变体。
* 列出、更新和运行、下载代码和输出或删除内核（笔记本）。
* 浏览和阅读讨论论坛。

## 安装

使用 [pip](https://pypi.org/project/pip/) 安装 `kaggle` 软件包：

```sh
pip install kaggle
```

其他安装说明可参见[here](docs/README.md#installation)。

## 快速开始

通过运行以下命令探索可用命令：

```sh
kaggle --help
```

有关更多示例和教程，请参阅[User documentation](docs/README.md)。

## 举办比赛

端到端的主机命令——搭建一个新的竞赛，创作它的页面，
调整其设置并启动它 - 记录在
[docs/competition_creation.md](docs/competition_creation.md)。封面
`kaggle competitions init`、`create`、`pages create`、`hosts`、
`settings get`、`settings update`、`launch`。

## 发展

### `kagglesdk` 更新

与 `kaggle.com` 交互的新功能可能需要更改 Python 库 `kagglesdk`。
确保在 `dependencies` 列表中指定 `kagglesdk` 所需的最低版本[pyproject.toml][pyproject.toml]]。确保所需的版本在
[pypi.org kagglesdk project](https://pypi.org/project/kagglesdk/#history)。

### 先决条件

我们使用[hatch](https://hatch.pypa.io)来管理这个项目。

按照这些[instructions](https://hatch.pypa.io/latest/install/)进行安装。

### 从源代码运行`kaggle`

#### 选项 1：从命令行执行一行代码

```sh
hatch run kaggle datasets list
```

#### 选项 2：在 shell 中运行许多命令

```sh
hatch shell

# Inside the shell, you can run many commands
kaggle datasets list
kaggle competitions list
...
```

### Lint / 格式

```sh
# Lint check
hatch run lint:style
hatch run lint:typing
hatch run lint:all     # for both

# Format
hatch run lint:fmt
```

### 测试

注意：这些测试不是真正的单元测试，而是调用 Kaggle Web 服务器。

```sh
# Run against kaggle.com
hatch run test:prod

# Run against a local web server (Kaggle engineers only)
hatch run test:local
```

### 集成测试

要在本地计算机上运行集成测试，您需要设置 Kaggle 凭据。您可以按照[authentication instructions](docs/README.md#authentication) 进行操作。

设置凭据后，您可以运行集成测试，如下所示：

```sh
hatch run test:integration
```

### 代码覆盖率

我们使用`pytest-cov`测量代码覆盖率。

要运行具有覆盖率的单元测试并生成报告：

```sh
hatch run test:cov
```

这会生成：
* 带有覆盖范围摘要的终端输出。
* `coverage.xml`（根中的 XML 报告，由 IDE 集成使用）。
* `htmlcov/index.html`（用于浏览器查看的 HTML 报告）。

#### 编辑器集成

##### VSCode安装 **Coverage Gutters** 扩展。运行覆盖率命令后，单击状态栏中的 **观察** 按钮以查看编辑器页边距中的覆盖率指示器。

##### JetBrains 骑士
安装 **Python** 插件后：
* **运行覆盖范围：** 创建 Pytest 运行配置并单击盾牌图标（“运行覆盖范围”）。
* **导入报告：** 转到 **工具** -> **显示代码覆盖率数据**，单击 **添加** (+)，然后选择 `coverage.xml`。

### 在 Docker 内运行 `hatch` 命令

这对于在一致的环境中运行并在 Python 版本之间轻松切换非常有用。

以下显示了如何运行 `hatch run lint:all`，但这也适用于任何其他填充命令：

```
# Use default Python version
./docker-hatch run lint:all
```

## 变更日志

参见[CHANGELOG](CHANGELOG.md)。

## 贡献

参见[CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

Kaggle CLI 在 [Apache 2.0 license](LICENSE.txt) 下发布。