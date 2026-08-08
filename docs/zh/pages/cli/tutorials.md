<!-- kaggle-docs: machine-translated zh-CN from English source -->

# Kaggle CLI 教程

这些教程说明了如何使用一系列 Kaggle CLI 命令来完成常见任务。

## 简介

在开始这些教程之前，请确保您拥有：

1. 按照说明 [here](./README.md#installation) 安装 Kaggle CLI。
2. 按照说明设置您的 API 凭据 [here](./README.md#authentication)
3. 在 Web 浏览器中登录 Kaggle。这将允许您验证 Kaggle 配置文件的 [⟦T29⟧](https://www.kaggle.com/work) 部分中 CLI 命令的结果。

## 教程：创建数据集

本教程将引导您在 Kaggle 上创建新数据集。

1. **从空目录开始。** 为数据集文件创建一个新目录并导航到其中。

    ```bash
    mkdir my-new-dataset
    cd my-new-dataset
    ```

2. **创建示例数据文件。** 对于本示例，创建一个名为 `sample_data.csv` 的 CSV 文件，其中包含一个索引列和三个随机数据列以及几行数据。

    ```bash
    echo "id,col_a,col_b,col_c" > sample_data.csv
    echo "1,0.5,0.2,0.8" >> sample_data.csv
    echo "2,0.1,0.7,0.3" >> sample_data.csv
    echo "3,0.9,0.4,0.6" >> sample_data.csv
    ```

3. **初始化数据集元数据。** 这会在当前目录中创建一个 `dataset-metadata.json` 文件。

    ```bash
    kaggle datasets init
    ```4. **编辑元数据文件。** 在文本编辑器中打开 `dataset-metadata.json` 并进行以下更改：
    * 将 `"INSERT_TITLE_HERE"` 替换为您想要的数据集标题，例如 `"My Sample Dataset"`。
    * 将 `"INSERT_SLUG_HERE"` 替换为您的标题的 URL 友好版本，例如 `"my-sample-dataset"`。 URL 友好版本是通过将标题转换为小写并将空格更改为破折号来制作的。
    * 您还可以添加许可证、描述和其他相关信息。

5. **创建数据集。** 此命令将您的 `sample_data.csv` 和 `dataset-metadata.json` 上传到 Kaggle。

    ```bash
    kaggle datasets create -p .
    ```
    您可以添加`--public`立即公开。

6. **在 Kaggle.com 上验证。** 刷新 [⟦T40⟧ tab in ⟦T41⟧](https://www.kaggle.com/work/datasets)。您应该看到“我的示例数据集”。

## 教程：查找并下载数据集

本教程介绍如何使用 CLI 查找和下载。

1. **搜索数据集（可选）。**
    * 如果您知道所需的数据集，则可以跳过此步骤。否则，您可以搜索数据集。例如，要搜索与“iris”相关的数据集：
        ```bash
        kaggle datasets list -s iris
        ```
    * 此命令将列出与您的搜索查询匹配的数据集。请注意您将用于下载的数据集的“id”（例如，`uciml/iris`）。2. **选择数据集并创建目录。**
    * 在本教程中，我们将使用经典的“Iris”数据集，其 ID 为`uciml/iris`。
    * 为您的数据集创建一个新目录并导航到其中：
        ```bash
        mkdir iris-dataset-analysis
        cd iris-dataset-analysis
        ```

3. **下载数据集。**
    * 使用`kaggle datasets download`命令和数据集的id。
        ```bash
        kaggle datasets download -d uciml/iris
        ```
    * 这会将数据集文件（通常为 ZIP 存档（例如 `iris.zip`））下载到当前目录 (`iris-dataset-analysis`)。

4. **解压缩数据集。**
    * 注意：您可以通过在上一个命令中使用 `--unzip` 标志来跳过此步骤。
    * 大多数数据集以 ZIP 文件形式下载。您需要解压缩存档才能访问数据文件（例如 CSV 文件）。
        ```bash
        # Make sure you have unzip installed, or use your OS's GUI to extract
        # The actual zip file name might vary based on the dataset.
        # For uciml/iris, it's iris.zip
        unzip iris.zip
        ```
    

5. **验证结果。**
    * 解压后，您应该看到数据文件（例如，`Iris.csv`、`database.sqlite`）。


## 教程：更新内核（笔记本）

本教程展示了如何下载现有内核、修改它并将更改推送回 Kaggle。1. **在 Kaggle.com 上创建或识别内核。**
    * 登录 kaggle.com。
    * 找到您拥有的现有笔记本（或创建一个）。对于本教程，我们假设其标题是“我的 CLI 测试内核”。
    * 注意浏览器地址栏中的内核 slug。类似于`YOUR_USERNAME/my-cli-test-kernel`。

2. **为您的内核创建一个新的本地目录。**

    ```bash
    mkdir my-kernel-project
    cd my-kernel-project
    ```

3. **拉取内核。** 使用 `kaggle kernels pull` 命令以及您的用户名和内核 slug。 `-m` 标志包含推送更新所需的`kernel-metadata.json` 文件。

    ```bash
    # Replace YOUR_USERNAME with your actual Kaggle username
    kaggle kernels pull YOUR_USERNAME/my-cli-test-kernel -m
    ```
    这将下载`my-cli-test-kernel.ipynb`（或`.py`/`.Rmd`）和`kernel-metadata.json`。

4. **编辑内核或元数据。**
    * 打开下载的笔记本文件（例如`my-cli-test-kernel.ipynb`）并对代码或内容进行一些更改。
    * 打开`kernel-metadata.json`。让我们在关键字中添加“基准”。找到`"keywords": []`行并将其更改为`"keywords": ["benchmark"]`。
    * *注意：虽然您可以在此处编辑关键字，但通常最好在 kaggle.com 上管理它们，因为允许的关键字有限制列表。*

5. **推送内核。** 这会上传您的更改和更新的元数据，然后在 Kaggle 上运行内核。

    ```bash
    kaggle kernels push -p .
    ```6. **在 Kaggle.com 上验证。** 刷新 [⟦T62⟧ tab in ⟦T63⟧](https://www.kaggle.com/work/code)。您应该会看到代码更改以及“基准”标签添加到内核设置中。

## 教程：创建模型

本教程将指导您在 Kaggle 上创建新模型。

1. **从空目录开始。** 为模型文件创建一个新目录并导航到其中。

    ```bash
    mkdir my-new-model
    cd my-new-model
    ```

2. **复制模型定义文件（此步骤可选）。** 如果您有定义模型的文件（例如 Python 脚本、模型权重），请将它们复制到此目录中。对于 `kaggle models create` 步骤，仅严格需要元数据，但在创建模型变体时将需要文件。

3. **初始化模型元数据。** 这将创建一个 `model-metadata.json` 文件。

    ```bash
    kaggle models init
    ```

4. **编辑元数据文件。** 打开 `model-metadata.json` 并进行以下更改：
    * 将 `"INSERT_OWNER_SLUG_HERE"` 替换为您的 Kaggle 用户名（例如 `"YOUR_USERNAME"`）。
    * 将 `"INSERT_TITLE_HERE"` 替换为您的模型标题（例如 `"My Awesome AI Model"`）。
    * 将 `"INSERT_SLUG_HERE"` 替换为 URL 友好版本的标题（例如，`"my-awesome-ai-model"`）。
    * 填写`"description"`字段和其他相关部分，例如`"licenses"`。

5. **创建模型。**

    ```bash
    kaggle models create -p .
    ```

6. **在 Kaggle.com 上验证。** 刷新 [⟦T75⟧ tab in ⟦T76⟧](https://www.kaggle.com/work/models)。您应该看到“我很棒的 AI 模型”。## 教程：创建模型变体

本教程展示如何在现有模型下创建变体。模型变体通常表示在特定框架（如 TensorFlow、PyTorch、JAX 等）中实现的模型，并包含实际的模型文件。

1. **确保您有一个父模型。** 如果您还没有，请按照“创建模型”教程进行操作。假设您的模型 slug 是 `my-awesome-ai-model`，您的用户名是 `YOUR_USERNAME`。

2. **准备模型变体文件。** 在模型目录（例如，`my-new-model`）中，创建或放置此特定变体的文件。例如，JAX 模型可能有一个 `flax_model.params` 文件。

    ```bash
    # In the my-new-model directory
    echo "This is a placeholder for JAX model parameters" > flax_model.params
    ```

3. **初始化模型变体元数据。** 这将创建 `model-instance-metadata.json`。

    ```bash
    # Still in the my-new-model directory
    kaggle models variations init
    ```

4. **编辑变体元数据文件。** 打开 `model-instance-metadata.json` 并进行更改：
    * 将 `"INSERT_OWNER_SLUG_HERE"` 替换为您的 Kaggle 用户名（例如 `"YOUR_USERNAME"`）。
    * 将 `"INSERT_EXISTING_MODEL_SLUG_HERE"` 替换为您的父模型的 slug（例如 `"my-awesome-ai-model"`）。
    * 对于此变体，将 `"INSERT_INSTANCE_SLUG_HERE"` 替换为 slug（例如 `"jax-implementation"`）。
    * 将`"INSERT_FRAMEWORK_HERE"`替换为模型框架（例如，`"jax"`、`"tensorflow"`、`"pytorch"`、`"sklearn"`）。
    * 更新`"instance_size_bytes"`（如果已知），并添加`"description"`。5. **创建模型变体。** 这会上传当前目录中的文件（例如，`flax_model.params`）以及变体元数据。

    ```bash
    kaggle models variations create -p .
    ```

6. **在 Kaggle.com 上验证。** 通过单击 [⟦T97⟧ tab on ⟦T98⟧](https://www.kaggle.com/work/models) 中的模型转到 Kaggle 上的模型页面。您应该会看到列出了一个新的“jax-implementation”变体，并且它将有一个包含 `flax_model.params` 的版本。

## 教程：创建模型变体版本

本教程介绍如何向现有模型变体添加新版本，例如，当您更新模型权重或文件时。

1. **确保您有模型变体。** 按照“创建模型变体”教程进行操作。假设您的变体是 `YOUR_USERNAME/my-awesome-ai-model/jax/jax-implementation`。

2. **准备更新的文件。** 在模型变体目录（例如`my-new-model`）中，更新或添加此版本的新文件。例如，创建`flax_model_v2.params`。

    ```bash
    # In the my-new-model directory
    echo "Updated JAX model parameters for V2" > flax_model_v2.params
    # You might also remove or update flax_model.params if it's being replaced
    ```

3. **创建新的模型变体版本。** 您需要指定父模型变体并提供版本说明。 `-p` 路径中的文件将构成此新版本的内容。```bash
    # Replace YOUR_USERNAME and the slugs for model and variation accordingly
    kaggle models variations versions create YOUR_USERNAME/my-awesome-ai-model/jax/jax-implementation -p . -n "Second version with updated parameters"
    ```
    *注意：`-p .`表示当前目录中的所有文件都将作为新版本的一部分上传。如果您只想上传 `flax_model_v2.params`，请确保只有它（以及任何其他 V2 文件）位于目录中并将 `-p` 指向该目录，或者小心管理您的文件。*

4. **在 Kaggle.com 上验证。** 单击 [⟦T108⟧ tab on ⟦T109⟧](https://www.kaggle.com/work/models) 前往 Kaggle 上的模型变体页面（例如 `YOUR_USERNAME/my-awesome-ai-model/jax/jax-implementation`）。您应该会看到一个新版本（例如版本 2），其中列出了您的注释和新文件。

## 教程：如何提交比赛

本教程将引导您完成使用 CLI 提交 Kaggle 竞赛的过程。

1. **查找竞赛并接受规则。**
    * 首先，你需要找到一个竞争者。您可以使用`kaggle competitions list`列出正在进行的比赛。
    * 在本教程中，我们将使用“泰坦尼克号”竞赛，这是一个常见的起点。您可以在[⟦T111⟧](https://www.kaggle.com/c/titanic)找到它。
    * **重要**：在下载数据或提交之前，您*必须*加入竞赛并接受 Kaggle 网站上的竞赛规则。导航至 kaggle.com 上的竞赛即可执行此操作。2. **创建目录并下载竞赛文件。**
    * 为您的竞赛文件创建一个新目录并导航到其中。
        ```bash
        mkdir titanic-competition
        cd titanic-competition
        ```
    * 下载比赛文件。这通常包括训练数据、测试数据和样本提交文件。
        ```bash
        kaggle competitions download -c titanic
        ```
    * 这将下载`titanic.zip`。您需要解压缩它才能查看文件（例如，`train.csv`、`test.csv`、`gender_submission.csv`）。
        ```bash
        # Make sure you have unzip installed, or use your OS's GUI to extract
        # The actual zip file name might vary based on the competition.
        unzip titanic.zip
        ```

3. **创建您的提交文件。**
    * 提交文件所需的格式因每个比赛而异。您可以在竞赛的“评估”页面上或通过检查样本提交文件（例如，泰坦尼克号竞赛的`gender_submission.csv`）找到此信息。
    * 对于泰坦尼克号比赛，提交文件需要两栏：`PassengerId`和`Survived`。 `Survived` 列应包含您的预测（0 表示已故，1 表示幸存）。
    * 让我们根据`gender_submission.csv`（根据性别预测生存率）创建一个非常简单的提交文件。对于本教程，我们将复制它并将其用作我们的提交。在真实场景中，您可以根据模型对 `test.csv` 数据的预测生成此文件。
        ```bash
        cp gender_submission.csv my_submission.csv
        ```* 你的 `my_submission.csv` 应该看起来像这样：
        ```
        PassengerId,Survived
        892,0
        893,1
        894,0
        ...
        ```

4. **提交竞赛。**
    * 使用`kaggle competitions submit`命令。您需要指定：
        * 比赛ID（`titanic`）。
        * 您提交文件的路径（`-f my_submission.csv`）。
        * 描述您提交内容的消息 (`-m "My first submission via CLI"`)。
        ```bash
        kaggle competitions submit titanic -f my_submission.csv -m "My first submission via CLI"
        ```

5. **检查您的提交状态。**
    * 提交后，您将收到一条指示成功或失败的消息。
    * 您可以在 Kaggle.com 竞赛页面的“我的提交”选项卡上查看您提交的分数和状态（例如，[⟦T127⟧](https://www.kaggle.com/c/titanic/submissions)）。
    * 您还可以通过 CLI 列出您最近提交的内容及其分数：
        ```bash
        kaggle competitions submissions -c titanic
        ```
    * 此命令将显示您提交的内容、其状态（例如，`complete`、`error`）以及您的公共/私人分数（如果有）。


## 教程：如何提交代码竞赛

本教程将引导您完成在 Kaggle 上提交代码竞赛的过程。

1. **寻找代码竞赛。**

    * 首先，您需要找到一个可以参加的代码竞赛。您可以在[Kaggle competitions page](https://www.kaggle.com/competitions)上浏览可用的竞赛。许多特色竞赛都是代码竞赛。

2. **下载数据集。*** 选择比赛后，您需要下载数据集。您可以使用 `kaggle competitions download` 命令执行此操作：
    ```bash
    kaggle competitions download -c <competition-name>
    ```
    * 将`<competition-name>`替换为您要参加的比赛名称。

3. **创建一个笔记本。**

    * 接下来，您需要创建一个 Kaggle Notebook 来处理您提交的内容。 Kaggle Notebook 包含 Kaggle 运行和评估您提交的代码和环境设置。  如果您不确定如何执行此操作，请按照 [Creating / Updating Notebooks](#tutorial-update-a-kernel-notebook) 上的教程进行操作。

4. **编写您的代码。**

    * 现在是时候编写代码了！您可以使用 Kaggle 支持的任何编程语言或框架。目标是创建一个可以对测试集进行预测的模型。

5. **提交您的预测。*** 一旦您对模型感到满意，您就可以将您的预测提交给竞赛。您可以使用 `kaggle competitions submit` 命令执行此操作：
    ```bash
    kaggle competitions submit <competition-name> -k <username>/<notebook-slug> -f <output-filename> -v <notebook-version> -m <message>
    ```
    * 替换：
      * `<competition-name>` 与比赛名称
      * `<username>/<notebook-slug>` 与您笔记本的标识符
      * `<output-filename>` 与您的笔记本生成的提交文件的名称（例如`submission.csv`）。
      * `<notebook-version>` 以及要提交的版本（例如 `3` 提交笔记本的第三个版本）。
      * `<message>` 包含您提交内容的简要说明。

6. **检查你的分数。**

    * 提交预测后，您可以在比赛排行榜上查看您的得分。排行榜显示了所有参赛者在比赛中的得分。  您可以使用`kaggle competitions leaderboard`命令下载排行榜：
    ```bash
    kaggle competitions leaderboard <competition-name>
    ```