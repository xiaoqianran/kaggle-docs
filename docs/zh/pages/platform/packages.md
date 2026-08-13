<!-- kaggle-docs: machine-translated zh-CN from English source -->

# Kaggle 包

***

### 概述

Kaggle 包是一项新功能，可让您编写可在其他地方导入和重用的 Python 包。我们使用开源 `nbdev` 库（有关其 [homepage](https://nbdev.fast.ai) 的更多信息）让您在 Kaggle Notebook 中定义 Python 包，而我们的 `kagglehub` 库使您能够在其他地方导入并重复使用它。

Kaggle 包的核心优势之一是它简化了参与支持它们的代码竞赛的用户体验。以前，在大多数代码竞赛中，您的 Notebook 必须从 Kaggle 特定的文件路径读取测试集文件，自己运行推理循环，同时跟踪 Kaggle 特定的 `id` 列，然后小心地将您的预测和 `id` 值打包到写入另一个 Kaggle 特定文件路径的 `submission.csv` 文件中。有了 Kaggle Packages，您不再需要担心那些任务正交的细节，您只需编写实现竞赛的 ML 任务的推理代码，剩下的事情由我们来处理。此外，包提交应该更容易重用。您可以使用 `kagglehub` 导入包并在任何地方使用任意输入调用其代码。请参阅下文了解更详细的说明。

最初的目的是在（某些）代码竞赛中使用 Kaggle 包——例如，我们将与 [Drawing With LLMs competition](https://www.kaggle.com/competitions/drawing-with-llms) 一起推出——尽管您也可以在竞赛之外使用它们，我们希望扩大我们的支持。

***

### 什么是 Kaggle 包

Kaggle 包是从 Kaggle Notebook 生成的 Python 包。它是使用 `nbdev` 创建的，它将特定单元格（标有 `#| export`）从笔记本导出到 Python 文件中。生成的包位于笔记本输出的 `package` 子目录中。

Kaggle 包具有以下结构：- `__init__.py`：此文件将目录标记为 Python 包，并定义元数据，例如创建包时使用的 Docker 映像和 GPU，以及可选的依赖管理器配置。
- `*.py`：子模块文件包含您使用`nbdev`从笔记本导出的代码。 Notebook 中的 `#| default_exp` 指令确定主模块名称（例如 `core.py`）。
- `assets/`（可选）：此子目录存储您的包所需的任何资产文件，例如模型权重、配置文件或数据文件。您可以使用`kagglehub.get_package_asset_path()`访问这些文件。
- `kagglehub_requirements.yaml`：此文件列出了您的包所依赖的 Kaggle 资源（数据集、模型、笔记本、包），包括出于再现性原因的特定版本。

包结构示例：

```codeBlock
package/
├── __init__.py
├── core.py
├── kagglehub_requirements.yaml
└── assets/
    └── model.weights
```

***

### 创建包

要创建 Kaggle 包，您将使用 `nbdev` 约定编写 Kaggle Notebook。以下是该过程的详细说明：1. **从 Kaggle Notebook 开始：** 创建一个新的 Kaggle Notebook 或使用现有的 Kaggle Notebook。
2. **使用`nbdev`指令：**
   - 将 `#| default_exp core` （或其他模块名称）添加到代码单元中。这是必需的，并指定您的包的主模块。
   - 用`#| export`标记要导出的代码单元格。只有这些细胞才会包含在您的包裹中。
3. **定义您的包逻辑：** 为您的包编写代码，确保导出所需的部分，而不导出不需要的部分。这种有条件的导出功能是`nbdev`模式的主要目标之一，因此您可以定义导出的包，并在同一笔记本中还运行其他代码来测试或分析您的核心功能，但其本身不导出。
   - 确保导出的代码包含其代码所需的所有 `import` 语句。
   - 使用 `kagglehub` 引用任何 Kaggle 资源（模型、数据集、笔记本、其他包）。请参阅下文了解更多信息。
   - 对于代码竞赛，我们需要 `class Model` 和 `predict()` 方法来满足竞赛所需的输入/输出规范。4. **添加资源文件（可选）：** 如果您的包需要外部文件，请使用 `kagglehub.get_package_asset_path()` 保存它们，并让您的包代码使用相同的函数读取文件。
5. **配置Python依赖项（可选）：** 如果您需要我们的基础环境中不可用的Python包，您可以使用我们的依赖项管理器来添加它们。请参阅下文了解更多信息。
6. **保存版本：** 当您保存笔记本时，Kaggle 将照常运行您的笔记本，然后生成并验证您的包，并将其保存到您的笔记本的输出中。

您生成的包有一些特殊的逻辑，当它被`import`ed时会应用。如果您使用了依赖项管理器功能，则会安装您的依赖项。然后，我们将使用您的代码（例如来自 `#| default_exp core` 的 `core`）子模块，并将这些子模块（没有前导下划线的子模块）中的所有公共数据成员公开到顶级 Python 模块上；这意味着如果您导出`class Model`，那么您将可以直接使用`package.Model`。

#### 1. 使用 `kagglehub` 进行 Kaggle 资源依赖如果您的包需要使用其他 Kaggle 资源（数据集、模型、笔记本或其他包），则必须使用 `kagglehub` 来访问它们。这可以确保您的包保持可移植性，并且不依赖于 Kaggle 特定的文件路径，例如 `/kaggle/input`。您的笔记本\*必须\*附加了所有数据源，可以通过笔记本编辑器侧边栏，或者通过在`Save Version`之前执行`kagglehub`命令，因为不允许执行保存附加新数据源，甚至不同版本的数据源。

示例（加载 Kaggle 模型）：

```codeBlock
#| export
import kagglehub
import keras

class Model:
  def __init__(self):
    model_path = kagglehub.model_download('user/model/framework/variation')
    # OR model_download('user/model/framework/variation/version')
    self.model = keras.saving.load_model(model_path)

  def predict(self, features):
    return self.model.predict(features)
```

您可以使用笔记本编辑器输入侧栏中的 `Copy kagglehub command` 选项来获取给定资源的正确命令。

请注意，当前访问旧版本的数据集、笔记本或包数据源存在一些限制，请参阅下面的“已知问题”部分了解更多详细信息。

#### 2.使用Dependency Manager导入Python依赖Kaggle Notebooks 在其基本 Docker 映像中预装了许多流行的 python 软件包，但还有许多您可能想要使用的优秀软件包未预安装。 Kaggle Notebooks 有一个依赖管理器工具（请参阅[documentation](https://www.kaggle.com/discussions/product-announcements/532336)），它不仅将外部 python 包安装到您的 Notebook 中，而且还保存其版本，以便您的 Notebook（或导出的包）在以后重新使用时将使用相同的版本。这对于我们拥有可重现工件的目标非常重要，并且还意味着您的笔记本（或包）可以在不允许互联网访问的竞赛评分会话中使用这些依赖项。

在笔记本编辑器菜单中选择 `Add-ons` -> `Install Dependencies` 并编写 `pip install ...` 命令。在交互式笔记本编辑器会话中，您需要从 `Dependency Manager` 窗口手动 `Run` 来安装它们；这需要启用 Internet 的活动笔记本会话，但请注意，如果您想参加比赛，则必须禁用 Internet。当您保存笔记本时，即使您的笔记本已禁用 Internet，您的依赖项也会在保存执行之前安装。当导出的包在其他地方导入时，它将自动运行依赖项管理器的安装脚本，该脚本会安装其保存的包存档。

#### 3. 包验证

当您保存导出包的笔记本时，我们会对该包执行一些验证。此步骤检查几项内容：

- **导入：** 确保我们可以 `import` 您的包裹没有错误。
- **创建模型：** 如果您的包定义了 `class Model`，我们将创建它的实例以确保成功。
- **竞赛特定检查（如果适用）：** 如果您的软件包用于代码竞赛，我们会使用您的 `Model` 运行该竞赛的 `kaggle_evaluation.test` 函数，以检查您是否遵循预期的输入/输出格式。
- **创建模型：** 如果您的包定义了 `class Model`，我们将创建它的实例以确保成功。- **依赖项跟踪：** 我们在上述步骤中跟踪您的包请求的所有`kagglehub`依赖项，并将使用的版本写入`kagglehub_requirements.yaml`。这有助于提高可重复性，以便以后重新使用您的包将使用这些依赖项的相同版本，而不是默默地采用可能导致破坏或改变行为的新版本。

如果验证失败，您将在保存的笔记本的输出选项卡中看到错误消息。您需要解决问题并保存新版本。一种常见的错误情况可能是您的笔记本`import`编辑了一个在交互式会话中工作的所需包，但该`import`语句未通过`nbdev`标签`#| export`导出到您的包。

***

### 导入包

您可以在 Kaggle Notebooks、Colab、本地计算机或安装了 `kagglehub` 的任何地方使用 `kagglehub.package_import()` 导入 Kaggle 包。请参阅 `kagglehub` [homepage](https://github.com/Kaggle/kagglehub) 了解更多详细信息，包括如何使用访问私有资源所需的 Kaggle 凭据登录。

```codeBlock
import kagglehub

# Import the package (replace with the actual handle)
package = kagglehub.package_import('user/notebook-name') # Take latest version
# OR take specific version
package = kagglehub.package_import('user/notebook-name/versions/123')

# Use the package, calling whatever code it had defined, for example:
model = package.Model()
result = model.predict(...)
```

#### 码头工人在您自己的计算机上运行 Packages 时，我们强烈建议您使用 Docker。使用正确的 Docker 映像可确保包具有与创建时相同的系统依赖项。它还提供了一个沙盒环境，在运行代码时将您的代码与主系统隔离，这些代码可以通过安装依赖项来改变您的 python 环境，或者可能是完全不受信任的代码。

首先在您的机器上安装[Docker](https://www.docker.com/get-started/)。然后在包的 `package/__init__.py` 文件的 `__docker_image__` 元数据中找到目标包的 docker 镜像标签。例如你可能会发现

```codeBlock
__docker_image__ = 'gcr.io/kaggle-images/python@sha256:abcxyz...'
```

然后运行`docker pull gcr.io/...`（替换为正确的标签值）将图像下载到您的计算机。注意：我们的图像大小超过 20 GB。然后运行以下命令创建一个容器并输入 shell 以开始在其中工作：

```codeBlock
docker run -it --rm \
  gcr.io/... \
  /bin/bash
```

再次确保替换为正确的图像标签。您可以考虑其他论点，例如：- **`--gpus all`：** 这使 Docker 容器可以访问您机器的 GPU，这可能是某些软件包工作所必需的。您还可以提供更细粒度的访问。
- **`-v /path/on/your/host:/path/in/container:ro`:** 这会将主机上的目录链接到 Docker 容器内的目录，例如，如果您想访问自己的数据文件以将新输入传递到容器内的包。请注意，`:ro` 片段为容器提供了只读权限，但如果需要，可以删除该权限以启用写入权限，但在运行可能不受信任的代码时这样做时要小心。
- **`--name your-container-name`：** 这提供了一个自定义名称来引用您的容器，而不是自动生成的名称。

现在，您的容器内应该有一个 shell 会话，您可以在其中运行 `python` 并通过 `kagglehub.package_import` 访问包。如上所述，您需要登录 Kaggle 帐户才能访问私有资源。请注意，我们的 Docker 镜像每隔几周更新一次，通常每个镜像之间只进行适度的更新。在许多情况下，包仍然可以在相对于保存它的精确图像而言较旧或较新的图像上工作，并且您可以尝试此操作，而不是单独下载我们的几个大图像。需要注意的是，我们有两个图像“分支”，一个用于 CPU 会话，一个用于 GPU 会话，您应该注意使用正确的分支。请参阅我们的 [CPU-based Images](http://gcr.io/kaggle-images/python) 和 [GPU-based Images](http://gcr.io/kaggle-gpu-images/python) 存储库。

#### GPU

包可以使用 GPU 进行模型推理，我们将其标记为导出包的 `__init__.py` 文件中的元数据 `__gpus__ = ...`。当没有 GPU 运行时，或者甚至没有创建它时使用的精确 GPU 配置时，此类包可能会失败。

***

### 提交套餐竞赛

要提交使用包的 Kaggle 代码竞赛，请按照以下步骤操作：1. **参加比赛：** 确保您已参加比赛。
2. **创建包笔记本：** 按照“创建包”部分中的说明创建定义您的包的 Kaggle 笔记本。您的笔记本必须附加到竞赛中，例如使用竞赛的 `Code` 页面上的 `New Notebook` 按钮。
3. **遵循竞赛包格式：** 您的包必须定义带有 `predict()` 方法的 `class Model`。此方法必须接受正确的输入类型并返回正确的输出类型，如竞赛所指定。
4. **（可选）测试您的软件包：** 使用竞赛提供的 `kaggle_evaluation.test(Model)` 函数来测试您的 `Model` 是否返回适当的响应。包的验证在保存时运行也将运行它。
5. **保存版本并提交：** 笔记本的“保存版本”。完成运行并通过验证后，转到保存版本的“输出”选项卡，然后单击 `Submit to Competition`。
6. **（快捷方式）从笔记本编辑器提交：** 编辑器侧栏中的竞赛面板可让您直接从编辑器提交，该编辑器会自动按顺序组合“保存版本”和“提交”步骤。7. **查看竞赛文档：** 仔细阅读竞赛文档页面，了解您需要的任何特定规则或限制。

然后，Kaggle 的提交系统将运行一个隐藏的评分会话，我们在其中导入您的包，实例化一个 `Model` 实例，迭代竞赛的隐藏测试集并在每个测试批次中调用模型的 `predict` 函数，然后汇总您的预测并使用竞赛的评估指标计算您的分数。

您的评分会话将使用在生成包的 Kaggle Notebook 中配置的相同笔记本加速器 (GPU)。未来的改进可能会解耦这一点。

与任何 Kaggle 代码竞赛一样，我们有意限制您可以获得的有关评分会话的信息，以防止有关隐藏测试集的信息被泄露。查看更多信息和调试技巧[here](https://www.kaggle.com/code-competition-debugging)。

***

### 已知问题

以下是当前包功能的不完整限制列表：1. **无法引用旧版本的笔记本或包数据源：** 我们的笔记本编辑器将允许您通过 `kagglehub.notebook_output_download('user/notebook/versions/123')` 或 `kagglehub.package_import('user/notebook/versions/123')` 附加旧版本的笔记本数据源（包括包），并且这将在交互式会话中工作。但是，当您保存笔记本时，我们会自动附加最新版本，并且 `kagglehub` 命令将不幸失败。
2. **对于旧版本的数据集数据源，通过编辑器 UI 进行固定：** 上述相同行为适用于数据集数据源，但我们支持通过固定数据源来解决问题。附加旧数据集后，您可以使用右侧边栏将其固定到旧版本，在保存笔记本时将遵循该旧版本。
3. **无法引用多个版本的数据集或笔记本：**模型数据源支持多版本，但其他类型目前不支持。
4. **不支持实用程序脚本：**不幸的是，Kaggle Notebook 中不支持 `kagglehub.utility_script_install` 命令，并且无法在您的包中使用。但是，包（大部分）提供实用程序脚本行为的超集，因此您可以考虑将实用程序脚本转换为包并导入它。5. **不能将包嵌套到自身中：**您可以定义您的包以利用其中的另一个包（嵌套），但您不能引用您当前正在使用的笔记本或其旧版本。
6. **保存之前必须附加所有必需的数据源：** 当我们在保存时执行您的笔记本时，您不允许附加任何尚未附加的数据源版本，因此您必须确保您的笔记本在保存之前已附加所有内容。一种首选模式是让您的 `class Model` 有一个 `def __init__(self)` 构造函数来检索所有必需的依赖项，然后在交互式笔记本会话中使用 `model = Model()` 执行（未导出的）单元格（甚至运行竞赛的 `kaggle_evaluation.test` 函数），该会话应运行您的 `kagglehub` 命令来提取所需的依赖项。这还可以让您在尝试保存之前查看是否存在错误并更正它们。7. **`kagglehub_requirements.yaml` 推理不完善：**我们自动生成 `package/kagglehub_requirements.yaml` 文件，其中列出了您的 Package 通过相应的 `kagglehub` 调用请求的所有 Kaggle 资源，以及创建您的 Package 时使用的版本。然后，当稍后导入您的包时，它会尝试再次使用相同的版本，从而鼓励您保存的包工件具有更好的可重复性。但是，自动生成过程来自在保存时间验证运行期间执行包，可能无法捕获代码可能进行的所有可能的 `kagglehub` 调用。例如，如果您有条件地请求资源并且验证运行没有触发它，我们不知道您的包需要它。这里的**最佳实践**是检索顶级包代码中的所有资源（该代码在 `import` 上运行，或在 `class Model` 的 `__init__` 构造函数中运行，该构造函数也在验证时运行。8. **计算源笔记本和导出包之间的耦合设置：**我们根据源笔记本的加速器设置标记 `__gpus__` 包元数据，竞赛包将使用这些相同的设置进行评分运行。理想情况下，我们支持将这些解耦，因此源笔记本可以具有与其导出的包不同的设置。
9. **带有 Dependency Manager 的包需要类 Unix 系统：**Dependency Manager 目前假定它在类 Unix 系统上运行（使用 `.sh` 脚本），并且无法在 Windows 等其他平台上运行。我们希望解决此问题，但您也可以按照上面的指导在 Kaggle 的 Docker 映像中运行软件包，该映像提供了类 Unix 环境。