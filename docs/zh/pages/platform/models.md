<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 型号

** **

<!--What is Kaggle Models?-->

### 什么是 Kaggle 模型

[Kaggle Models](https://www.kaggle.com/models) 提供了一种发现、使用和共享机器学习和生成人工智能应用模型的方法。 Kaggle Models 是预训练模型的存储库，与 Kaggle 平台深度集成，使其易于在 Kaggle 竞赛和笔记本中使用。与数据集一样，Kaggle 模型组织社区活动来丰富模型的实用性：每个模型页面都将包含讨论、公共笔记本以及下载和点赞等使用统计数据，使模型更有用。

#### 模型从哪里来？

Kaggle 模型来自多种来源，包括我们在 Meta 的 Llama 2 和阿里巴巴的 Qwen 等版本上合作的合作伙伴、与 Keras、[integrations with Hugging Face Hub](https://www.kaggle.com/blog/kaggle-hugging-face-integration) 等建模库的集成，以及数百万 Kaggler 社区共享微调变体和其他创新。

** **

<!--Finding a Model-->

### 寻找 Kaggle 模型

您可以使用 [Models landing page](https://www.kaggle.com/models) 找到 Kaggle 模型。有许多过滤器和排序以及自由文本搜索。例如，您可以通过以下方式搜索：- 按组织、社区或拥抱面孔模型过滤
- 按框架过滤
- 按您想要的任务标签过滤（例如分类）
- 按型号尺寸过滤
- 在自由文本搜索中按关键字搜索
- 按点赞数排序
- 等等

您可能还想仔细阅读竞赛中的“模型”选项卡，以了解哪些模型表现良好或在与您的用例相关的任务中很受欢迎。竞争对手通常会在公共笔记本和讨论文章中分享他们使用的模型。当您分叉一个附加了 Kaggle Models 模型的笔记本时，您的副本也将附加相同的模型。

最后，您还可以在笔记本编辑器中搜索模型。使用编辑器右侧窗格中的“添加模型”组件来搜索模型并将其附加到笔记本中。这与数据集类似。

#### 了解模型详细信息页面当您单击某个型号时，您将进入该型号的“详细信息页面”。例如，这是 [BERT model](https://www.kaggle.com/models/google/bert) 的详细信息页面。模型详细信息页面包含一个带有模型卡的概述选项卡（有关模型如何训练的元数据和信息、可接受的用例是什么、任何限制等）、框架和变体浏览器以及使用情况仪表板。有笔记本和讨论的选项卡。如果模型有用，您可以投票。

除了整体元数据之外，模型详细信息页面还组织给定模型的所有变体和框架。例如：

- **变体**：具有不同数量参数的同一模型，例如小、中和大。
- **框架**：具有不同 ML 库兼容性的同一模型，例如 TensorFlow、PyTorch 等。

您可以通过在模型卡下方的概述页面上的文件资源管理器中选择所需的特定框架和变体来查看和使用它。从这里，您可以单击“新笔记本”将其附加到新笔记本以开始使用该模型。

### 使用 Kaggle 模型Kaggle 模型有两种广泛的用途：在 Kaggle 上和 Kaggle 之外（例如，在生产应用程序中或使用 Colab 等非 Kaggle 工具）。

**在 Kaggle 上**

目前，Kaggle 模型在竞赛中非常有用，特别是在笔记本中使用。首先分叉附加模型的笔记本（您可以在任何笔记本的“输入”选项卡上查看附加模型），在模型上创建新笔记本，或者从编辑器的右侧窗格将模型添加到新笔记本。

系统将提示您确认框架和模型变体，然后只需复制并粘贴起始代码即可加载模型。

如果您在笔记本中下载 Hugging Face 模型（例如，通过使用 Transformers 库），则无需执行任何特殊操作即可使用 Kaggle 模型。模型页面将自动“附加”到您的笔记本上。

**Kaggle 之外**

许多开发人员需要在 Kaggle 之外下载代码中的模型。有几种不同的方法：通过[kagglehub Python library](https://github.com/Kaggle/kagglehub)，通过我们的[Kaggle CLI](https://github.com/Kaggle/kaggle-cli)，或者直接调用API。在提供每种方法的说明之前，了解您需要了解如何进行身份验证才能访问某些模型（例如 [Gemma](https://www.kaggle.com/models/google/gemma)）会很有帮助，这些模型需要 Kaggle 凭据来确认用户对自定义许可证的同意已得到验证。 [Obtain credentials](https://www.kaggle.com/settings) 登录 Kaggle 后，从“设置”页面单击“API”部分下的“生成新令牌”按钮。

下面的示例允许您下载 [google/gemma](https://www.kaggle.com/models/google/gemma) 模型的 `2b` PyTorch 变体。如果模型没有像 Gemma 这样的受限许可证，您将能够跳过下面示例中的 `kagglehub.login()` 步骤。

#### 方法 1. 通过 kagglehub Python 库

参见[kagglehub model download documentation](https://github.com/Kaggle/kagglehub?tab=readme-ov-file#download-model)。

#### 方法 2. 通过 Kaggle CLI

参见[Kaggle CLI model download documentation](https://github.com/Kaggle/kagglehub?tab=readme-ov-file#download-model)。

#### 方式三、直接调用API# 使用凭据进行身份验证
    导出 KAGGLE_USERNAME=xyz
    导出 kaggle-key=已编辑
    
    # 带有卷曲
    卷曲 -L -o ~/Downloads/model.tar.gz https://www.kaggle.com/api/v1/models/google/gemma/pyTorch/2b/1/download -u $KAGGLE_USERNAME:$KAGGLE_KEY
    
    # 下载特定版本（这里是版本1）
    wget https://www.kaggle.com/api/v1/models/google/gemma/pyTorch/2b/1/download --user=$KAGGLE_USERNAME --password=$KAGGLE_KEY --auth-no-challenge

** **

<!--Publishing a Model-->

### 创建模型

有几种方法可以在 Kaggle Models 上发布模型，包括仅通过 UI。我们建议结合使用 `kagglehub`（我们的 Python 客户端库）来管理工件创建和上传，以及使用 UI 来管理文档和协作功能。而且，如果您想在 Kaggle 上使用 Hugging Face 模型，您只需创建一个使用该模型的笔记本（例如在 Transformers 中），Kaggle 上就会自动为您创建一个模型页面。

#### 使用kagglehub Python客户端库上传（首选）

参见[kagglehub model upload documentation](https://github.com/Kaggle/kagglehub?tab=readme-ov-file#upload-model)。

#### 使用 Kaggle CLI 上传

参见[Kaggle CLI model creation tutorial](https://github.com/Kaggle/kaggle-cli/blob/main/docs/tutorials.md#tutorial-create-a-model-variation)。

#### 通过 UI 上传1. 前往：[https://www.kaggle.com/models?new=true](https://www.kaggle.com/models?new=true)，然后按照步骤进行操作，包括将“创建为”设置为您要在其下发布的组织资料
2. 最初创建模型后添加新变体：
    1. 向下滚动到“模型变体”部分。
    2. 单击“新变体”按钮打开“添加/编辑”变体模式。
    3. 选择您要更新权重/资产的 ML 框架。
    4. 单击“添加新变体”按钮
    5. 选择要上传的权重/资产文件
    6. 输入变体段
        1. 例如`7b`
        2. 选择许可证
    7. 单击“创建”按钮并等待您的实例完全处理完毕。
    8. 单击“转到型号详细信息页面”。
    9. 在“模型变体”部分，您应该在下拉列表中看到您的变体。
    10. 如果选择它，请确认您在“文件资源管理器”部分中拥有所需的所有文件。
    11. 上传现有变体的新版本。使用“新版本”按钮。

#### 通过拥抱脸部集成创建如果您已在 Hugging Face Hub 上发布了模型，则只需在 Kaggle Notebook 中使用您的模型即可轻松在 Kaggle 上为其创建页面。

1. 导航至 Hugging Face 上的模特页面
2. 单击页面标题中的“使用此模型”
3. 从下拉列表中选择“Kaggle”以创建 Kaggle Notebook
4. 如果您尚未登录，系统将提示您登录
5. （可选）对您的笔记本进行更改
6. 为您的笔记本命名并创建“保存版本”
7. （可选）单击“共享”以公开您的笔记本

完成这些步骤后，将自动创建模型的页面。使用该模型的任何公共笔记本都将显示在模型页面的“代码”选项卡中。

#### 记录模型

通过 UI 来记录模型是最简单的。1. 查看模型页面时，您将在顶部看到一个名为“待处理操作”的部分。
2. 按照以下每个步骤完成模型的文档：
    1.添加描述（型号卡）
    2. 添加模型实例描述，包括示例代码
    3.添加字幕
    4.添加标签
    5. 指定出处和其他元数据
    6. 发布笔记本（我们建议在模型公开后将其公开）
3. 模型公开后，您还可以选择从模型的“元数据”部分生成 DOI。
4. 完成后，您可以从模型页面的“设置”选项卡公开您的模型。
5. 您现在可以推广您的模型了！
6. 创建任何讨论主题时，您将自动订阅电子邮件和网站通知

#### 导入模型版本

该工具允许您将模型版本从一个模型复制到另一个模型。您可以从您具有协作者访问权限的任何公共模型或私有模型导入版本。1. 导航到 Kaggle 上的目标模型页面
    1. 点击右上角“︙”按钮
    2. 从下拉菜单中选择“导入版本”
2. 选择源型号：
    1. 点击“选择型号”按钮
    2. 浏览或搜索要从中导入版本的模型
        1. 您只能选择您拥有或协作者有权访问的模型
        2.当前型号将被禁用，防止自我复制
    3. 单击您选择的型号以选择它
3. 选择版本：
    1. 选择源模型后，您将看到所有可用版本
    2. 使用搜索栏按名称过滤版本
    3.使用框架芯片按特定框架（PyTorch、TensorFlow等）进行过滤
    4. 通过选中最左列中的框来选择版本
        1. 可以一次选择多个版本
    5. 点击“下一步”继续确认
4.确认并导入：
    1. 检查您选择的版本
        1. 每行显示将要复制的内容的完整路径
        2. 源路径→显示目标路径
    2. 重要提示：
        1. 如果从私有模型导入到公共模型，版本将永久公开2. 此操作无法撤消
    3. 单击“导入”开始复制过程
5. 导入后：
    1. 复制版本时会显示进度指示器
    2. 导入成功：
        1.您将看到一条成功消息
        2. 单击“转到模型”查看您导入的版本
    3. 如果有版本导入失败：
        1. 错误消息会解释发生了什么问题
        2. 您可以通过单击“重试”来重试失败的导入
        3. 复制成功的版本重试时不会重复

##### 导入提示

- 您可以随时使用“交换模型”按钮交换源模型
- 使用框架过滤器快速找到特定版本
- 版本计数显示您选择了多少项目
- 所有导入版本均保留其原始框架和变体版本

### 如何命名您的模型和变体

句柄表示为

###### 所有者\_slug/模型\_slug/框架/变体\_slug/版本\_number详细情况如下：
    
- **owner\_slug:** 您的组织或用户名。
- **model\_slug：** 您的模型系列的名称（例如“llama”）。
- **框架：** 使用的模型框架（例如“pytorch”）。
- **variation\_slug：** 有关模型的此特定版本的详细信息。
- **version\_number：** 用于跟踪模型更改的数字标识符。

#### 模型与变体：独特性 

变体用于添加有关模型的更精细的细节。变体应该捕捉模型的复杂性和细微差别。
    它们突出显示特定的变化或功能。示例包括：

- **模型大小：** 参数数量（例如 70 亿）
- **优化：**量化（例如int4）、模型蒸馏
- **任务：** 你的模型做什么（例如，图像生成、翻译、聊天）
- **培训：** 使用的特定技术（例如，指令调整、提示调整）
- **架构/代码修改：** 基本模型的任何更改
- **数据集：** 训练的数据（如果相关）
- **语言：** 如果您的模型是特定于语言的（例如，“en”表示英语）
- **硬件：** 针对 GPU、CPU、TPU 等进行优化。

#### 版本与变体：时间快照版本就像检查点。它们代表训练中特定点的模型，通常所有其他因素（变化细节）保持不变。

#### 指导您的变体命名的问题：

1. 您的模型有多大（参数数量）？例如：100m、2b、27b 等。
2.它执行什么任务？例如：图像生成、文本、聊天
3. 它是在什么数据集上训练的？例如：coco、imagenet
4. 您对代码、架构或配置进行过任何更改吗？
5. 你使用了哪些训练技巧？例如：指令调整、提示调整等……
6.它是否针对特定语言或硬件进行了优化？例如：GPU、CPU、TPU
7. 您是否应用了任何量化或其他优化？

#### 命名成功的一般准则：

- **保持简单：** 使用清晰、简洁的名称。
- **具有描述性：** 使用上述问题来指导您。
- **默认型号名称：** 如果不确定，也可以使用型号名称作为变体。
- **检查点版本：** 使用版本号来跟踪训练进度。

#### 现实世界的例子|手柄|变更说明|
| --- | --- |
|谷歌/gemma-2/gguf/2.0-27b-it/1 |版本 2，270 亿个参数，指令调整 |
|谷歌/gemma/tfLite/gemma-2b-it-gpu-int4/1 | 谷歌/gemma/tfLite/gemma-2b-it-gpu-int4/1 | 20 亿，指令调整，GPU，int4 量化 |
|元研究/llama-3/pyTorch/70b-聊天 | 700亿参数，聊天|
|米斯特拉尔-ai/米斯特拉尔/pyTorch/7b-v0.1-hf | 70 亿个参数，版本 0.1 |
|深度思维/biggan/tensorFlow1/128 | 128 x 128 图像生成 |

### 访问门控模型

Kaggle 上的门控模型要求用户同意特定协议并可能提供信息，然后才能访问它。该协议可以包括使用条款、隐私政策链接和收集用户数据的表格。

访问门控模型时，系统会提示用户根据访问协议输入信息。横幅将显示用户当前的访问状态（例如，需要同意、待定、接受、拒绝）。只有具有“已接受”状态的用户才能继续使用该模型。