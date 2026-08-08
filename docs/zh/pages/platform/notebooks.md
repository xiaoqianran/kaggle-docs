<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 笔记本

** **

<!--Types of Notebooks-->

### 笔记本的类型

Kaggle 上有多种不同类型的笔记本。

#### 笔记本

最常见的类型是 Jupyter 笔记本（通常简称为“笔记本”）。 Jupyter 笔记本由一系列单元组成，其中每个单元都采用 Markdown（用于编写文本）或您选择的编程语言（用于编写代码）进行格式化。要启动笔记本，请单击 `Create > New Notebook`。这将打开笔记本编辑界面。

笔记本可以用 R 或 Python 编写。可以在`File > Language`菜单下更改语言。

#### 脚本

也可以创建脚本。脚本是按代码顺序执行所有内容的文件。要启动脚本，请创建一个新笔记本，然后将`File > Editor Type`下的类型更改为脚本。

另外，在`File`菜单下，您可以选择要执行的脚本类型。您可以使用 R 或 Python 编写脚本。

您还可以通过在编辑器界面中突出显示代码并单击“运行”按钮或按 Shift-Enter 来执行选定的代码行。任何结果都将打印到控制台。

##### RMarkdown 脚本RMarkdown 脚本是一种特殊类型的脚本，它不仅执行 R 代码，还执行 RMarkdown 代码。这是 R 代码和 Markdown 编辑语法的组合，受到我们社区中许多 R 作者的青睐。

RMarkdown 编辑器与用于基本 R 或 Python 脚本的编辑器相同，只是它使用特殊的 RMarkdown 语法。要开始编辑 RMarkdown 脚本，请创建一个新笔记本，将`File > Editor Type`下的文件类型更改为“脚本”，然后更改`File > Language`下的语言

** **

<!--Searching for Notebooks-->

### 搜索笔记本

除了作为交互式编辑平台之外，您还可以查找和使用社区中其他人公开共享的代码。 Kaggler 跨数据集和竞赛平台处理数据，不断构建很酷的东西。探索和阅读其他 Kaggler 的代码是学习新技术和参与社区的好方法。

没有比 Kaggle Notebooks 更好的地方来发现如此庞大的数据科学和机器学习公共、开源和可复制代码存储库了。

Notebooks 中的最新、最精彩的内容已在 Kaggle 上的多个不同位置出现。

#### 网站搜索您可以在任何页面上使用网站顶部栏中的站点搜索，不仅可以查找笔记本，还可以查找 Kaggle 上的数据集、竞赛、用户等。开始输入搜索查询以快速获取结果，然后按“Enter”键查看可深入查看的整页结果。从整页搜索结果中，您可以仅筛选“笔记本”，并使用页面左侧的筛选选项添加更多筛选条件。

#### 主页

当您登录 Kaggle 帐户时，[Kaggle homepage](https://kaggle.com) 会提供人们在平台上所做的事情的实时新闻源。虽然讨论论坛帖子和新数据集构成了主页的一些内容，但其中大部分内容专门用于热门的新笔记本活动。通过浏览页面，您可以查看 Kaggler 同伴的所有最新更新。

您可以通过关注其他 Kaggler 来根据自己的喜好调整新闻源。要关注某人，请转到他们的个人资料页面并单击“关注用户”。您所关注的用户发布的内容和点赞的内容将更加显着地显示。选择关注您的其他用户也是如此。发布高质量的笔记本和数据集，您很快就会发现其他用户正在关注您正在做的事情！

#### 笔记本列表

访问笔记本的一种更结构化的方式是[the Notebook listing](https://www.kaggle.com/notebooks)，可以从主菜单栏中的“笔记本”选项卡进行访问。

默认情况下，笔记本列表按“[Hotness](https://www.kaggle.com/notebooks?sortBy=hotness&amp;group=everyone&amp;pageSize=20)”排序。 “热度”顾名思义：一种衡量平台上笔记本有趣程度的方法。在热门度方面得分较高的笔记本，因此在此列表中排名靠前，通常要么是最近编写的在点赞和观看次数等方面得分较高的笔记本，要么是长期以来在平台上一直受欢迎的“历史上”伟大笔记本。

其他排序方法是

- [Most Votes](https://www.kaggle.com/code?sortBy=voteCount)：展示有史以来最受欢迎的笔记本电脑
- [Most Comments](https://www.kaggle.com/code?sortBy=commentCount)：返回有史以来讨论最多的笔记本
- [Recently Created](https://www.kaggle.com/code?sortBy=dateCreated)：新笔记本的实时流
- [Recently Run](https://www.kaggle.com/code?sortBy=dateRun)：实时活动流
- [Relevance](https://www.kaggle.com/code?sortBy=relevance)：根据结果与查询的相关性对结果进行排序导航栏中提供的其他过滤选项包括类别（数据集或竞赛？）、输出、语言（R 或 Python？）和类型（脚本或笔记本？）。

您还可以使用笔记本列表对您自己的笔记本（“您的作品”）进行排序，查找其他人与您共享的笔记本（“与您共享”），或者查看您之前投票过的笔记本（“收藏夹”）。

最后，此处提供了特定于笔记本的搜索栏。这通常是查找您正在寻找的特定笔记本的最快方法。

#### 数据集和竞赛

Kaggle 上的数据可通过数据集或我们的竞赛获得。两者都在“笔记本”选项卡上突出显示了社区创建的最佳笔记本。浏览有关数据集和竞赛的笔记本提供了一种快速熟悉特定数据集的方法。您可以分叉任何现有的公共笔记本来制作代码副本并开始尝试更改。

[Iris Species dataset](https://www.kaggle.com/uciml/iris) 和 [Titanic competition](https://www.kaggle.com/c/titanic/notebooks) 分别是数据集和竞赛的两个经典示例，托管有关其内容的精彩笔记本。

#### 标签和标签页标签是笔记本列表页面中可用的最高级的搜索选项。标签由笔记本所有者添加，以指示笔记本的主题、可以使用的技术（例如“分类”）或数据本身的类型（例如“文本数据”）。您可以导航到标签页面以浏览共享标签的更多内容，方法是单击笔记本上的标签，或使用标签特定的搜索语法按标签搜索：`tag:[TAG NAME]`。

通过标签搜索，您可以按主题领域或技术搜索笔记本。例如，如果您有兴趣学习解决分类问题的新技术，您可以尝试使用标签“分类”（`tag:classification`）进行搜索；如果您对警察记录分析感兴趣，也许使用“犯罪”（`tag:crime`）进行搜索就可以了。

或者，您可以通过访问相关标签页面来实现相同的目的。例如，犯罪和分类标签分别位于[https://www.kaggle.com/tags/crime](https://www.kaggle.com/tags/crime)和[https://www.kaggle.com/tags/classification](https://www.kaggle.com/tags/classification)。

标签页面包括一个部分，列出了带有给定标签的最受欢迎的页面，这使得它们成为按内容搜索笔记本的好方法。

** **

<!--Using the Notebook Editor-->

### 使用笔记本编辑器Kaggle 笔记本可以通过笔记本编辑器创建和编辑。在较大的屏幕上，Notebook 编辑器由三个部分组成：

- 编辑窗口
- 一个控制台
- 设置窗口

Notebook 编辑器允许您编写和执行传统脚本（适用于批量执行的纯代码文件或 Rmarkdown 脚本）和 Notebook（适用于交互式代码和 Markdown 编辑器，适用于叙述分析、可视化和共享工作）。

脚本和笔记本之间的主要区别在于编辑窗格以及编辑和执行代码的体验。

#### 编辑

您使用脚本还是笔记本可能取决于您选择的语言以及您的用例。 R 用户往往更喜欢脚本，而 Python 用户更喜欢笔记本。有关原因的更多信息，请参阅[“Types of Notebooks” section](https://www.kaggle.com/docs/notebooks#types-of-notebooks)。脚本也适用于以代码为重点的竞赛提交，而笔记本则适用于分享 EDA（探索性数据分析）、教程和其他值得分享的见解。两个编辑界面都是围绕“版本”的概念组织的。这是一个由 Notebook 版本、它生成的输出以及有关环境的关联元数据组成的集合。

在脚本编辑器中，每当您生成新版本时，您编写的代码都会立即执行。为了进行更细粒度的控制，还可以专门执行单行或选择的代码行。

笔记本是基于 Jupyter 笔记本构建的。笔记本由单独的单元组成，每个单元都可以是 Markdown（文本）单元或代码单元。可以通过运行单独的代码单元来运行代码（并保存结果变量），并且可以随时在笔记本中添加或删除单元。

#### 控制台

控制台选项卡为在 Notebook 中运行的同一 Python 或 R 容器提供了替代接口。您在控制台中输入的命令不会更改您的版本的内容。但是，您在控制台中创建的任何变量都将在整个会话中持续存在（除非您删除它们）。此外，您在编辑器中执行的任何代码也将在控制台窗格中执行。

＃＃＃＃ 设置在展开的编辑器中，“设置”窗格占据屏幕的右侧。在紧凑编辑器（隐藏设置窗格的位置）中，它折叠成“编辑器”选项卡上方的选项卡。无论哪种情况，“设置”窗格都包含以下主要选项卡：

- **输入**：添加和删除附加到笔记本的数据源。请参阅下面的“添加数据源”部分中的更多信息。
- **输出**：查看笔记本创建的输出文件。
- **目录**：查看并导航笔记本的标题。
- **会话选项**：配置笔记本的运行方式，包括语言、互联网、加速器和 Docker 映像设置。  请参阅下面的笔记本环境部分中的更多信息。
- **计划选项**：笔记本可以配置为自动运行。  请参阅下面的[Scheduling Notebooks](scheduling-notebooks)部分了解更多信息。

其他部分也可能可用，具体取决于笔记本电脑的配置。

** **

<!--Adding Data Sources-->

### 添加数据源使用 Notebooks 作为数据科学工作台的优点之一是，您可以轻松地从数千个公开可用的数据源中添加数据源，甚至上传您自己的数据源。您还可以使用另一个笔记本的输出文件作为数据源。您可以将多个数据源添加到笔记本环境中，从而将它们连接在一起并产生新的见解。

#### 型号

Kaggle 模型包含许多来自领先研究人员和 Kaggle 社区的最新模型。

在笔记本中加载模型有两种方法。第一种方法是导航到所选模型的详细信息页面，单击“代码”按钮，然后选择“新建笔记本”。加载笔记本编辑器时，您将能够选择框架和变体，然后模型将自动附加。

或者，您可能希望在创建笔记本后添加模型。为此，请导航到 Notebook 编辑器中的“输入”窗格，然后单击“添加输入”按钮。从这里，您可以搜索并添加您有权访问的任何模型。

请注意，某些型号要求您接受许可证，您必须先接受许可证，然后才能将它们添加到笔记本中。

#### 数据集Kaggle Datasets 为任何类型的数据科学项目提供了丰富多样的有趣数据集。

与模型类似，有两种方法可以在笔记本中加载数据集。第一个是导航到所选数据集的详细信息页面，单击“代码”按钮，然后选择底部的“创建笔记本”。这将启动一个新的笔记本会话，其中有问题的数据集已启动并准备就绪。

或者，您可能希望在创建笔记本后添加数据集。为此，请导航到 Notebook 编辑器中的“输入”窗格，然后单击“添加输入”按钮。从这里，您可以搜索并添加您有权访问的任何数据集。

#### 比赛

您还可以使用与上述相同的步骤将竞赛数据源添加到您的 Notebook 环境中。

主要区别在于，您需要接受添加到笔记本中的任何竞赛数据源的规则。无论您是从竞赛的“笔记本”选项卡启动新笔记本，还是从现有笔记本编辑器添加竞赛数据源，系统都会提示您首先阅读并接受规则。您可以在同一个笔记本中混合竞赛和数据集数据源，但请务必遵守特定竞赛关于使用外部数据源的规则。如果您不这样做，您将面临在比赛中违反规则的后果。

#### 笔记本

Notebook 最多 20 GB 的输出可以保存到磁盘 /kaggle/working 中。该数据会自动保存，然后您可以在任何未来的笔记本中重复使用该数据：只需导航到笔记本编辑器中的“输入”窗格，单击“添加输入”，然后搜索带有输出文件的任何笔记本，就像模型、数据集和竞赛一样。

通过以这种方式将笔记本链接为数据源，可以构建管道并生成比单独使用单个笔记本更多、更好的内容。

由 Jeremy Howard 编写的“[Minimal LSTM + NB-SVM baseline ensemble](https://www.kaggle.com/code/minimal-lstm-nb-svm-baseline-ensemble/notebook)”是使用此功能的出色笔记本的一个示例。单击“输入”选项卡可以查看他使用的数据源。

** **

<!--Collaborating on Notebooks-->

### 在笔记本上进行协作笔记本协作是一项强大的功能。它允许多个用户共同拥有和编辑笔记本。例如，您可以与竞赛团队成员一起迭代模型或与同学协作完成数据科学项目。

#### 邀请合作者

从您的笔记本编辑器或查看器（公共或私人）中，您可以导航到笔记本菜单中的“共享”或“共享”按钮，以显示“协作者”选项等设置。在那里，使用搜索框查找其他用户并将其添加为笔记本协作者。

如果您的笔记本是私人的，您可以选择授予协作者查看权限（“可以查看”）或编辑权限（“可以编辑”）。如果您的笔记本是公开的，则只能添加具有编辑权限（“可以编辑”）的协作者，因为任何人都可以查看它。

当您添加协作者时，他们将通过电子邮件收到通知。

“[Creating, Reading & Writing Data](https://www.kaggle.com/residentmario/creating-reading-writing-data)”是[Advanced Pandas Kaggle Learn track](https://www.kaggle.com/learn/overview)的一款笔记本，是出色的协作笔记本的一个例子。

#### 数据集协作

使用笔记本也是与数据集协作者合作的一种强大方式。在 Kaggle 上创建的数据集也有隐私设置，这些设置与笔记本上的共享设置不同，这意味着每个数据集都可以与不同的用户组共享。也就是说，您的 Notebook 协作者不会自动拥有与您相同的对任何私有数据集的访问权限，除非明确邀请他们就数据集进行协作。任何人都可以访问公开共享的数据集。

要了解有关如何协作使用数据集的更多信息，请阅读更多内容 [here.](https://www.kaggle.com/docs/datasets#collaborating-on-datasets)

** **

<!--The Notebook Environment-->

### 笔记本环境

Notebooks 不仅仅是一个代码编辑器。它是一个版本化的计算环境，旨在轻松重现数据科学工作。在 Notebooks IDE 中，您可以访问在具有预安装软件包的 Docker 容器中运行的交互式会话、挂载版本化数据源的能力、可自定义的计算资源（例如 GPU 等）。

#### 笔记本版本和容器当您使用“保存并运行全部”创建 Notebook 版本时，您可以在与交互式会话不同的单独会话中从上到下执行 Notebook。完成后，您将生成一个新的笔记本版本。 Notebook 版本是您工作的快照，包括编译的代码、日志文件、输出文件、数据源等。 Notebook 的最新 Notebook 版本是在 Notebook 查看器中向用户显示的内容。

您创建的每个 Notebook 版本也与特定的 Docker 映像版本相关联。 Docker 是一种容器化技术，它提供了一个隔离的工作环境。 Docker 使用所谓的镜像来指定该环境的内容，包括已安装的 Python 和 R 包。

默认情况下，对于新笔记本，这将是我们在 Kaggle 维护的默认 Python 或 R 映像的最新版本。该图像的内容可在 GitHub 上公开获取。对于 R 容器，您可以在 [https://github.com/Kaggle/docker-rstats](https://github.com/Kaggle/docker-rstats) 中查看，对于 Python 容器，您可以在 [https://github.com/Kaggle/docker-python](https://github.com/Kaggle/docker-python) 中查看。

#### Dockerfile 和笔记本版本即使您使用的是默认的 Kaggle 容器之一，您所使用的软件包的数量、名称和版本仍然是一个不断变化的目标，因为我们的团队会不断更新它们以确保提供最新和最好的软件包。我们大约每两周更新一次镜像，主要是为了升级到我们提供的软件包的最新版本，但偶尔也会添加或删除某些软件包。 [You can subscribe to notifications when we release a new Docker image on GitHub](https://www.kaggle.com/product-feedback/161327)。

如果有多个可用的自定义映像，还可以固定特定的 Docker 映像以在笔记本中使用。这可以通过访问笔记本编辑器中的“设置”窗格来完成。在“会话选项”部分下，查找“环境”选项。这将使您能够选择创建笔记本所用的原始环境或最新环境。使用原始环境有助于确保 Notebook 是可重现的，而使用最新环境可确保 Notebook 接收最新的软件包更新。为了确保 Notebook 保持可重现性，我们公开共享创建 Notebook 版本的 Docker 映像。您可以通过访问 Notebook 查看器中的“日志”选项卡并在“环境”标题下查看来找到此链接。

#### 修改默认环境

您可以通过向 GitHub 上的 [R](https://github.com/Kaggle/docker-rstats) 或 [Python](https://github.com/Kaggle/docker-python) 容器提交拉取请求或问题来请求修改默认环境。这也是让我们知道图像中的某些内容是否损坏的好方法，我们试图阻止这种情况，但有时也会发生这种情况。

如果您认为某个包对大多数 Kaggle 用户有益，请随时在我们的 GitHub 容器存储库中告知我们。请务必解释为什么您认为某个包对大多数 Kaggle 用户有用。请注意，我们有选择地添加包以避免大幅增加图像的大小。另请注意，即使获得批准，图像也可能需要几天时间才能在网站上更新。

另一方面，如果您需要仅为一个笔记本安装特定依赖项，请继续阅读下文。

#### 修改笔记本特定环境还可以修改与当前 Notebook 映像关联的 Docker 容器。

###### 使用标准包安装程序

在笔记本编辑器中，确保在“设置”窗格中启用“Internet”（如果是新笔记本，则默认启用）。

对于 Python，您可以通过在前面添加 ! 来运行任意 shell 命令。到代码单元格。例如，要使用 pip 安装新包，请运行 `!pip install my-new-package`。您还可以通过运行`!pip install my-existing-package==X.Y.Z`来升级或降级现有包。

要在 R 中安装来自 GitHub 的包，请通过运行 `library(devtools)` 加载 devtools 包。然后，您可以运行 `install_github("some_user/some_package")` 等命令从 GitHub 安装新包。

###### 使用依赖管理器进行包安装

配置您的笔记本以使用依赖项管理器编辑器执行离线 pip 安装。配置好的笔记本电脑就可以提交给互联网残疾人比赛。

在依赖管理器编辑器中，输入 pip install 命令，例如 `pip install my-new-package`。您还可以通过添加 `pip install -U my-existing-package` 来升级现有软件包。您还可以使用 pip 使用 `pip install git+https://github.com/author/package.git` 从 github 安装软件包。在每次笔记本提交期间，将与您共享依赖项安装笔记本并自动附加到您的笔记本。该笔记本包含 python 轮子和一个安装脚本，该脚本在笔记本启动之前执行以安装软件包。

如果依赖项安装笔记本无法下载软件包，笔记本将包含可用于调试的日志。

注意：笔记本电脑仍然需要禁用互联网才能提交给选定的比赛。

##### 添加免费 GPU

您可以免费向笔记本电脑添加一个 NVIDIA Tesla P100。 GPU 环境的 CPU 和主内存较低，但对于某些类型的工作（例如在图像数据上训练神经网络）而言，这是显着加速的好方法。与本地计算机或您自己的虚拟机相比，使用笔记本电脑的主要好处之一是，笔记本电脑环境已经预先配置了 GPU 就绪的软件和软件包，这些软件和软件包的设置可能非常耗时且令人沮丧。免费 GPU 的可用性是有限的：在繁忙时间，您可能会被排在队列中。要添加 GPU，请从笔记本编辑器导航到“设置”窗格，然后单击“加速器”> GPU 选项。您的会话将重新启动，如果您不需要在队列中等待访问支持 GPU 的计算机，这可能需要几分钟到几分钟的时间。

要了解有关在笔记本电脑中充分利用 GPU 的更多信息，请查看此[tutorial Notebook by Dan Becker](https://www.kaggle.com/dansbecker/running-kaggle-kernels-with-a-gpu)。

##### 添加免费 TPU

您可以免费向笔记本添加 TPU v3-8。 TPU 是专门用于深度学习任务的硬件加速器。 Tensorflow 2.1 中通过 Keras 高级 API 以及较低级别的使用自定义训练循环的模型都支持它们。免费 TPU 的可用性是有限的：在繁忙时间，您可能会被排在队列中。要了解有关在笔记本电脑中充分利用 TPU 的更多信息，请查看此[in depth guide](https://www.kaggle.com/docs/tpu)。

要添加 TPU，请从笔记本编辑器导航到“设置”窗格，然后单击“加速器”> TPU v3-8 选项。如果您不需要在队列中等待访问支持 TPU 的计算机，您的会话将重新启动，这可能需要几分钟到几分钟的时间。

** **

<!--Connecting Kaggle Notebooks to Google Cloud Services-->

### 将 Kaggle 笔记本连接到 Google 云服务**其中一些服务会向附加的 GCP 帐户收取费用。在您开始在笔记本电脑中使用以下每种产品之前，请查看它们的定价。**

Kaggle 目前已与 Google Cloud Storage、BigQuery 和 AutoML 产品集成。  要启用这些集成，请单击笔记本编辑器中的“附加组件”菜单，然后选择“Google 云服务”。  进入“Google 云服务”页面后，您需要将您的帐户附加到笔记本，并且需要选择要启用的集成。  启用这些集成后，您将获得一个代码片段，可以将其复制并粘贴到您的笔记本中。

此代码片段的每一行都对应于不同的 Google Cloud 服务集成，其中 `PROJECT_ID` 应该是现有的 Google Cloud 项目。根据 AutoML 文档（下面链接），AutoML 目前要求 GCS 存储桶的位置 (`COMPUTE_REGION`) 必须是 `us-central1`。

有关如何使用这些服务的更多信息，请参阅[Google Cloud Documentation](https://cloud.google.com/docs/)或任何特定产品文档。

#### BigQuery

- **[BQ Documentation](https://cloud.google.com/bigquery/docs/)，[BQML Documentation](https://cloud.google.com/bigquery-ml/docs/bigqueryml-intro)**Google BigQuery 是一个完全托管的 PB 级低成本分析数据仓库。用户不需要进行任何管理，相反，用户可以只专注于通过查询和 BigQuery ML 分析数据，以在即用即付的计费模型中找到有意义的见解。

可以使用 Kaggle 的免费帐户访问 Google BigQuery 来查询 [public data](https://console.cloud.google.com/marketplace/browse?filter=solution-type:dataset&_ga=2.188761902.446093747.1583860775-118720642.1583860775)，但需要 [billing-enabled](https://cloud.google.com/billing/docs/how-to/modify-project) GCP 帐户来查询 BigQuery 未公开发布的任何数据。在尝试在 Kaggle Notebooks 中集成之前，您应该仔细检查 BigQuery 的价格，因为它很容易产生费用。

`#在这里设置你自己的项目id
PROJECT_ID = '您的 Google 云项目'
从 google.cloud 导入 bigquery
bigquery_client = bigquery.Client(项目=PROJECT_ID)`  

有关使用集成的更深入的演练，请参阅以下笔记本：

- [BigQuery in Kaggle Notebooks](https://www.kaggle.com/jessicali9530/tutorial-how-to-use-bigquery-in-kaggle-kernels)
- [BigQuery Machine Learning Tutorial](https://www.kaggle.com/rtatman/bigquery-machine-learning-tutorial)

#### 谷歌云存储 (GCS)

- **[GCS Documentation](https://cloud.google.com/storage/docs/)**

Google Cloud Storage 允许在全球范围内随时存储和检索数据。用户可以将存储空间用于任何类型的数据，并且只需为已使用的存储空间付费（每月每 GB）。Google Cloud Storage 是一项付费服务​​，需要 [billing-enabled](https://cloud.google.com/billing/docs/how-to/modify-project) GCP 帐户。在尝试集成到 Kaggle Notebooks 之前，您应该仔细检查 GCS 的价格，因为它很容易产生费用。

`#在这里设置你自己的项目id
PROJECT_ID = '您的 Google 云项目'
从 google.cloud 导入存储
storage_client = storage.Client(项目=PROJECT_ID)`  

有关使用集成的更深入的演练，请参阅以下笔记本：

- [Moving Data to/from GCS](https://www.kaggle.com/paultimothymooney/how-to-move-data-from-kaggle-to-gcs-and-back)

#### 自动机器学习

- **[AutoML Documentation](https://cloud.google.com/automl/docs/)**

Google AutoML 是一套产品，使用户能够针对结构化数据、视觉和语言任务训练自定义机器学习模型。它目前处于[Beta](https://cloud.google.com/products/#product-launch-stages)，因此您可能会遇到可用性摩擦或已知问题。我们欢迎来自社区的所有反馈。用户反馈将帮助我们改进文档，并直接与 AutoML 团队共享，以帮助改进产品。

Google AutoML 是一项付费服务​​，需要 [billing-enabled](https://cloud.google.com/billing/docs/how-to/modify-project) GCP 帐户。在尝试集成到 Kaggle Notebooks 之前，您应该仔细检查 AutoML 的价格，因为它很容易产生费用。您可以在此处查看测试版中每种产品的定价：

- [AutoML Tables Pricing](https://cloud.google.com/automl-tables/pricing)
- [AutoML Vision Pricing](https://cloud.google.com/vision/automl/pricing)
- [AutoML Natural Language Pricing](https://cloud.google.com/natural-language/automl/pricing)`# 在这里设置你自己的项目id和计算区域
PROJECT_ID = '您的 Google 云项目'
COMPUTE_REGION = 'us-central1' # 必须是 `us-central1` 才能使用 AutoML（请参阅文档）
从 google.cloud 导入 automl_v1beta1 作为 automl
automl_client = automl.AutoMlClient()
项目位置 = automl_client.location_path(PROJECT_ID, COMPUTE_REGION)`  

有关使用集成的更深入的演练，请参阅以下笔记本：

- [AutoML Tables Tutorial](https://www.kaggle.com/devvret/automl-tables-tutorial-notebook)

#### Google Cloud AI 笔记本

如果您在 Kaggle 上使用笔记本时遇到计算限制，可以考虑升级到 Google Cloud AI 笔记本。这些笔记本在您的 Google Cloud 项目下运行，可以配置为使用您选择的虚拟机、加速器并无限制运行

要将笔记本导出到 Google Cloud，您可以转到 **文件** 菜单，然后从笔记本编辑器中选择“升级到 Google Cloud AI 笔记本”。您还可以通过单击右上角的三点菜单从查看器升级笔记本。

有关如何将 Kaggle Notebooks 导出到 Google Cloud AI Notebooks 的更详细说明，请查看此处的公告帖子：- [\[功能发布\]升级到 Google Cloud 上的笔记本以获得更多计算能力！](https://www.kaggle.com/product-feedback/159602)

** **

<!-- Scheduling Notebooks -->

### 安排笔记本

笔记本可以设置为根据不同的条件自动重新运行：

- 基于时间（频率）：将笔记本设置为每天、每周或每月运行。
- 数据集更新：只要笔记本使用的数据集发生变化，就运行笔记本。即使数据多次更改，这种情况每天最多发生一次。

可以在编辑器或查看器中安排笔记本。  在笔记本编辑器的右侧“设置”菜单下，找到名为“安排笔记本运行”的部分。  在该部分中，上述每个配置都有相应的选项。  笔记本查看器的“设置”选项卡中也提供了相同的选项。

请注意，您可以安排的笔记本数量是有限制的。  请参阅“活动事件”窗格以获取所有已安排笔记本的列表。

** **

<!--Kaggle Jupyter Server-->

### [实验] Kaggle Jupyter 服务器

笔记本工作负载在支持 *Kaggle Jupyter Server* 上执行，
  有时称为*会话*。*Kaggle Jupyter 服务器* 针对访问 Kaggle 支持硬件上的 Kaggle 资源（例如大型数据集、模型和竞赛数据）进行了高度优化。虽然 Kaggle Notebooks 是在 Kaggle 上执行工作负载的主要方式，但用户还可以从 Colab 或 VS Code 等各种笔记本编辑器连接到 *Kaggle Jupyter Server*。通过将 Colab 或 VS Code 连接到 *Kaggle Jupyter Server*，用户可以在这些环境中利用这些优化。

我们不断致力于与外部笔记本环境的更深入集成。我们欢迎您的反馈和建议来帮助我们改进。如果您有任何意见或需要帮助，请在 Kaggle [Product Feedback](https://www.kaggle.com/discussions/product-feedback) 论坛中创建帖子。

#### 
  在 Colab 中打开笔记本并自动连接到 Kaggle Jupyter 服务器

在 Kaggle Notebook 编辑器中，**运行 > Kaggle Jupyter Server** 菜单项会打开一个标题为 *Kaggle Jupyter Server* 的侧面板。

![...](/static/images/docs/notebooks/kaggle-jupyter-server-panel.png)该面板包含一个“在 Colab 中打开”* 按钮。仅当 *Kaggle Jupyter Server* 会话处于活动状态时，*“在 Colab 中打开”* 按钮才会启用； **用户需要在按钮变得可点击之前启动 Kaggle 会话**。单击 *“在 Colab 中打开”* 按钮将启动以下操作：当前 Kaggle 笔记本（.ipynb 文件）被复制到 Colab 中的新选项卡，并自动配置为将新的 Colab 笔记本连接到用户正在运行的 *Kaggle Jupyter Server* 会话。

在新选项卡中打开并连接 Colab 笔记本时，笔记本文件 (.ipynb) 为<string>已复制</string>，未同步。在 Colab 中进行的修改将“不会”反映在原始 Kaggle 笔记本中，反之亦然。 Kaggle 和 Colab 之间仅共享后端 Jupyter Server 及其执行环境。

新打开的 Colab 选项卡中的笔记本不会自动保存。为了避免丢失您的工作，请务必备份您的 Colab 笔记本 - 例如，使用 Colab 的 **文件 > 在云端硬盘中保存副本** 菜单选项。**如果您的 Kaggle Jupyter 服务器关闭** - 例如，由于不活动 - **那么您连接的 Colab 编辑器将默默地从该支持会话断开**。下一节将展示如何将这些断开连接的会话重新连接到新的 *Kaggle Jupyter Server*。

#### 
  将现有 Colab 笔记本重新连接到您的 *Kaggle Jupyter 服务器*

*Kaggle Jupyter Server* 面板提供“手动连接”部分。此部分显示“Colab 兼容 URL”，用户可以将其复制到剪贴板。要将现有 Colab 笔记本重新连接到 Kaggle：

1. 首先启动 *Kaggle Jupyter Server* 会话，
2. 从 *Kaggle Jupyter Server* 面板复制“Colab 兼容 URL”，
3. 在 Colab 笔记本中导航至
    **重新连接 > 连接到本地运行时**，
![...](/static/images/docs/notebooks/colab-connect-to-local-runtime.png)4。将复制的 URL 粘贴到提供的文本字段中，然后单击“连接”按钮。
![...](/static/images/docs/notebooks/colab-backend-url.png)

此过程将 Colab 笔记本连接到 *Kaggle Jupyter 服务器*。单击 [here](https://research.google.com/colaboratory/local-runtimes.html) 了解有关 Colab 本地运行时功能的更多信息。

用户可以使用这些相同的步骤将任何现有的 Colab 笔记本连接到 Kaggle Jupyter 服务器，即使该 Colab 笔记本从未从 Kaggle 打开。#### 
  从 VS Code 或 Jupyter `/tree` 连接

“手动连接”部分还提供了“VS Code 兼容 URL”。用户可以利用此 URL 将 VS Code 支持的 .ipynb 编辑器连接到 Kaggle 后端。请参阅 VSCode 的文档 *[Connect to Jupyter Server](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server)* 了解更多信息。

用户还可以将“Colab兼容URL”粘贴到浏览器的地址栏中，直接访问Jupyter服务器的`/tree`界面。

** **

<!--Technical Specifications-->

### 技术规格

Kaggle Notebooks 在远程计算环境中运行。我们提供硬件——您只需担心代码。

在撰写本文时，每个 Notebook 编辑会话都提供以下资源：

- CPU 和 GPU 笔记本会话的执行时间为 12 小时，TPU 笔记本会话的执行时间为 9 小时
- 20 GB 自动保存磁盘空间 (/kaggle/working)
- 额外的暂存器磁盘空间（/kaggle/working 之外）不会保存在当前会话之外

中央处理器规格

- 4个CPU核心
- 30 GB 内存

P100 GPU 规格

- 1 个 Nvidia Tesla P100 GPU
- 4个CPU核心
- 29 GB 内存

T4 x2 GPU 规格

- 2 个 Nvidia Tesla T4 GPU
- 4个CPU核心
- 29 GB 内存

TPU 1VM 规格- 96个CPU核心
- 330 GB 内存

注意：CPU 平台（例如 Intel Skylake、Broadwell、AMD）在常规笔记本运行期间可能会有所不同，但是提交的内容
运行（用于代码竞赛或批量重新运行提交时）始终在 Intel Skylake CPU 上运行。

中央处理器规格

编辑笔记本时，您将有 20 分钟的空闲时间进行交互式会话。如果代码在这段时间内没有被修改或执行，当前的交互会话将结束。如果发生这种情况，您将需要再次单击“编辑”按钮才能继续编辑。如果要运行需要更长时间的计算，可以通过选择“保存版本”菜单中的“保存并运行全部”选项，从上到下保存笔记本的版本（见下文）。

一旦您对笔记本的内容感到满意，您可以单击“保存版本”来保存更改。从那里您将有两个创建新版本的选项：- **快速保存** 跳过从上到下的笔记本执行，只拍摄笔记本的快照，与编辑器中显示的完全一样。当您仍在积极尝试时，这是一个获取多个版本的绝佳选择。 Quick Save 是 Kaggle 上保存工作的一种全新方式。
- **保存并运行全部** 创建一个具有完全干净状态的新会话，并从上到下运行您的笔记本。这非常适合重大里程碑或当您想要分享您的工作时，因为它让您（以及阅读您笔记本的其他人）确信您的笔记本可以重复运行。为了成功保存，整个Notebook必须在12小时内执行（TPU笔记本为9小时）。保存并运行全部与您之前在 Kaggle 上使用过的“提交”行为相同。

### [实验] 使用 Colab Pro 提高 GPU 计算能力

我们正在推出一项实验性功能，让您可以在 Kaggle 上获得额外的 GPU 时间
    如果您是 Colab Pro 客户。这是一个限时促销，我们希望它能够修改并升级为 Kaggle 上可持续的、长期的按比例付费功能。

**它是如何运作的**- 您可以通过`File`菜单并单击`Link to Colab`选项在笔记本编辑器中链接您的Colab帐户。之前链接过其帐户的用户将自动注册参加此促销活动。
- Colab Pro 和 Pro+ 用户将在 Kaggle 上分别获得**每周 15 小时和 30 小时的额外 GPU 小时**。要享受此优惠，您需要通过将您的 Kaggle 帐户与有效的 Colab Pro 帐户**链接**来验证您的 Colab 订阅。
- 这些额外的 GPU 时间不会消耗您的 Colab 计算单元。
- 您将使用您习惯的相同 Kaggle 硬件（CPU、T4、P100、TPUv3-8）。
- 一旦帐户被验证为具有有效的 Colab 订阅，您将获得额外的 GPU 时间，并且您可以在 Kaggle 帐户设置中的配额中看到它们。
- 您可以随时通过设置页面取消链接您的 Colab 帐户。

**法律条款**- Kaggle 保留随时自行决定终止或暂停促销活动的权利，无论是否发出通知。促销活动的结束日期可能不会公开宣布，并且可能会在没有事先警告的情况下发生。
- Kaggle 保留随时修改所提供的额外 GPU 小时数或促销条款的权利，恕不另行通知。
- Kaggle 对因促销活动终止或修改而造成的任何损失或不便不承担任何责任。
- 此促销仅限每位 Colab Pro 订阅者使用一个链接的 Kaggle 帐户。
- 如果 Kaggle 用户取消其 Colab Pro 帐户，Kaggle 可能会终止其链接的 Kaggle 帐户的额外 GPU 小时数。
- 额外的 GPU 时间不可转让，也不能兑换现金或任何其他商品或服务。
- Kaggle GPU 资源的使用须遵守 Kaggle 的使用条款和其他适用政策。滥用或误用 GPU 资源可能会导致您的 Kaggle 帐户被暂停或终止。
- Kaggle 保留取消任何违反这些条款或参与与促销相关的欺诈或滥用活动的用户资格的权利。