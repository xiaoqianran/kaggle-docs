<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 数据集

** **

<!--Types of Datasets-->

### 数据集类型

Kaggle 支持各种数据集发布格式，但我们强烈鼓励数据集发布者在可能的情况下以可访问的非专有格式共享其数据。该平台不仅可以更好地支持开放、可访问的数据格式，而且无论使用何种工具，更多人都可以更轻松地使用它们。

本页面介绍了我们在 Kaggle 数据集上共享数据时建议使用的文件格式。另外，了解为什么以及如何使数据科学社区尽可能访问支持不太好的文件类型。

#### 支持的文件类型

##### CSV

Kaggle 上可用的最简单且支持最好的文件类型是表格数据的“逗号分隔列表”或 CSV。上传到 Kaggle 的 CSV 应该有一个由人类可读的字段名称组成的标题行。例如，带有标题行的购物清单的 CSV 表示形式如下所示：

编号、类型、数量

0、香蕉、12

1、苹果、7

CSV 是 Kaggle 上最常见的文件格式，也是表格数据的最佳选择。在数据集的“数据”选项卡上，数据浏览器中可以看到文件内容的预览。这使得理解数据集的内容变得更加容易，因为它不需要在笔记本中打开数据或在本地下载数据。

CSV 文件还将具有关联的列描述和列元数据。列描述允许您为数据集的各个列分配描述，使用户更容易理解每​​列的含义。同时，列指标以图形格式呈现有关各个列的高级指标。

“[The Complete Pokemon Dataset](https://www.kaggle.com/rounakbanik/pokemon)”是一个很棒的 CSV 类型数据集的示例。

##### JSON

虽然 CSV 是“平面”数据最常见的文件格式，但 JSON 是“树状”数据最常见的文件格式，这些数据可能具有多个层，例如树上的分支：

{[{‘id’: 0, ‘type’: ‘香蕉’, ‘数量’: 12}, {‘id’: 1, ‘type’: ‘苹果’, ‘数量’: 7}]}对于 JSON 文件，“数据”选项卡预览将显示一个交互式树，其中附加了 JSON 文件中的节点。您可以单击各个键来打开和折叠树的各个部分，同时探索数据集的结构。 JSON 文件不支持列描述或指标。

您可以按文件类型过滤数据集列表以显示 [all datasets containing JSON files](https://www.kaggle.com/datasets?sortBy=hottest&amp;group=public&amp;page=1&amp;pageSize=20&amp;size=all&amp;filetype=json&amp;license=all)。

##### SQLite

Kaggle 支持使用轻量级 SQLite 格式的数据库文件。 SQLite 数据库由多个表组成，每个表都包含表格格式的数据。这些表比 CSV 文件更好地支持大型数据集，但在实践中在其他方面类似。

“数据”选项卡分别代表数据库中的每个表。与 CSV 文件一样，SQLite 表将由“列元数据”和“列指标”部分完全填充。

“[European Soccer Database](https://www.kaggle.com/hugomathien/soccer)”是一个很棒的 SQLite 类型数据集的示例。

##### 档案

尽管从技术上讲，Kaggle 本身并不是一种文件格式，但它还对使用 ZIP 文件格式以及其他常见存档格式（如 7z）压缩的文件提供一流的支持。压缩文件比未压缩文件占用的磁盘空间更少，这使得它们上传到 Kaggle 的速度明显更快，并允许您上传超出数据集大小限制的数据集。

我们这边对档案进行解压缩，以便用户可以在笔记本中访问其内容，而无需用户解压缩它们。存档当前不会填充单个文件内容的预览，但您仍然可以按文件名浏览内容。

因此，我们建议您仅在数据集足够大、由许多较小文件组成或组织到子文件夹中时才将数据集作为存档上传。例如，ZIP 和其他存档格式是在 Kaggle 上提供图像数据集的绝佳选择。

“[Chest X-Ray Images (Pneumonia)](https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia)”是由存档图像组成的数据集的示例。

##### BigQuery

Kaggle 还支持特殊的 BigQuery 数据集。 BigQuery 是 Google 发明的“大数据”SQL 存储。许多海量公共数据集，例如 GitHub 中的所有代码和比特币区块链的完整历史，都可以通过 Google BigQuery 公共数据集计划公开获得。其中一些也可以作为 Kaggle 数据集提供！BigQuery 数据集在很多方面都很特殊。由于它们是托管在 Google 服务器上的多 TB 数据集，因此无法上传或下载。在 Notebooks 中，您无需从磁盘加载文件，而是通过在 Google BigQuery Python 库或 Kaggle 的 bq\_helper 库中编写 SQL 获取查询来与数据集进行交互。而且，由于涉及的数据集规模较大，每个用户每 30 天扫描的数据配额为 5 TB。

用于了解如何使用 BigQuery 的一些资源：

- [Getting Started with Big Query](https://www.kaggle.com/sohier/getting-started-with-big-query)
- [Beyond Queries: Exploring the Bigquery API](https://www.kaggle.com/sohier/beyond-queries-exploring-the-bigquery-api)

“[USA Names Data](https://www.kaggle.com/datagov/usa-names)”是 BigQuery 类型数据集的示例。以下是一些有用的笔记本，可帮助您详细了解 BigQuery：“[SQL Scavenger Hunt Handbook](https://www.kaggle.com/rtatman/sql-scavenger-hunt-handbook/)、[Getting Started with BigQuery](https://www.kaggle.com/sohier/getting-started-with-big-query)”和“[Beyond Queries: Exploring the BigQuery API](https://www.kaggle.com/sohier/beyond-queries-exploring-the-bigquery-api)”。

##### 其他文件格式

上一节中列出的文件格式是 Kaggle 格式中最受支持且最常见的文件格式。这并不意味着其他类型的文件不能上传；任何您能想到的文件都可以上传。其他格式只是不太受支持：它们可能没有预览或任何其他可用的数据浏览器组件。他们也可能对 Kaggle 用户不太熟悉，因此不太容易接触到。如果您可以将文件转换为上述格式之一（越简单越好），我们强烈建议您这样做。例如，Excel 电子表格是一种专有格式，应作为 CSV 文件上传。您的用户会感谢您！

然而，仍然存在替代数据格式的用例。我们确实鼓励以 NPZ 等特殊数据格式、PNG 等图像文件格式以及 HDF5 等复杂的分层数据格式上传。但是，在这样做时，我们建议还上传一个笔记本，讨论文件的内容和位置、如何使用它们，并演示如何开始使用数据集。可重复的代码示例可以大大帮助数据科学界访问您的数据文件！

** **

<!--Searching for Datasets-->

### 搜索数据集

数据集不仅仅是一个简单的数据存储库。每个数据集都是一个社区，您可以在其中讨论数据、发现公共代码和技术以及在 Notebooks 中创建自己的项目。如果您花时间环顾四周并找到它们，您可以找到许多不同形状和大小的有趣数据集！

数据集中最新、最好的数据出现在 Kaggle 的几个不同地方。#### 新闻源

当您登录 Kaggle 帐户时，[Kaggle homepage](https://kaggle.com) 会提供人们在平台上所做的事情的实时新闻源。您关注的人上传的新数据集以及具有大量活动的热门数据集将显示在此处。通过浏览页面，您可以查看 Kaggler 同伴的所有最新更新。

您可以通过关注其他 Kaggler 来根据自己的喜好调整新闻源。要关注某人，请转到他们的个人资料页面并单击“关注用户”。您所关注的用户发布的内容和点赞的内容将更加显着地显示。

选择关注您的其他用户也是如此。发布高质量的内容，您很快就会发现其他用户正在关注您所做的事情！

#### 数据集列表

可以从主菜单栏中的“数据集”选项卡访问更结构化的数据集访问方式。

数据集按不同类别进行分组：“趋势数据集”、“热门数据集”、“最近查看的数据集”和其他一些轮换类别。在此页面底部，您可以单击“浏览所有公共数据集”按钮以获取所有数据集的列表视图。该列表默认按“热度”排序。 “热度”顾名思义：一种衡量平台上数据集的趣味性和新近度的方法。热度得分较高并因此在此列表中排名靠前的数据集通常是最近发布的已标记为“已审核”并且在参与度方面得分很高的数据集，或者是长期以来在平台上一直受欢迎的“历史上”伟大数据集。

其他排序方法包括最多投票、新的、更新的和可用性。

导航栏中提供的其他过滤选项包括大小（小、中或大）、文件类型（CSV、SQLite、JSON、BigQuery）、许可证（知识共享、GPL、其他数据库、其他）和标签（下一节中介绍）。

您还可以使用该列表查看您自己的数据集（“您的数据集”），或查看您之前添加书签的数据集（“书签”）。

最后，此处提供了特定于数据集的搜索栏。这通常是查找您正在寻找的特定数据集的最快方法。

#### 标签和标签页标签是数据集列表页面中可用的最高级的搜索选项。标签由数据集所有者添加，以指示数据集的主题、可以使用的技术（例如“分类”）或数据本身的类型（例如“文本数据”）。您可以导航到标签页面，通过单击数据集上的标签或单击网站标题中的“标签”下拉列表来浏览共享标签的更多内容。

按标签搜索允许您按主题区域搜索数据集。例如，如果您对动物收容所数据感兴趣，您可以尝试使用标签“动物”进行搜索；如果你对警察记录感兴趣，用“犯罪”进行搜索就可以了。

标签页面包括一个部分，列出了带有给定标签的最受欢迎的页面，这使得它们成为按内容搜索数据集的好方法。

** **

<!--Creating a Dataset-->

### 创建数据集在 Kaggle 上创建数据集很容易，这样做是开始数据科学组合、共享可重复研究或与合作者合作开展工作或学校项目的好方法。您可以选择创建私有数据集以单独工作或与受邀的合作者一起工作，或者将数据集公开发布到 Kaggle 供任何人查看、下载和分析。

#### 数据集界面导航

要发布私有或公共数据集，请首先导航到 [Datasets listing](https://www.kaggle.com/datasets)。在那里您将找到一个“新建数据集”按钮。单击它以打开“新数据集”模式。

按降序将数据集上传到 Kaggle 所需的“最低限度”字段为：

- **标题**是数据集的名称 - 例如搜索或浏览时列表中会显示什么。
- **URL** 是数据集所在的链接。 slug 将首先自动填充并模仿您的标题。但是，您可以将鼠标悬停在该块上以立即更改它。
- 最后，您可以从四个来源之一上传数据：- **您的本地计算机** - 通过拖放或在文件浏览器中选择文件/文件夹来上传文件/文件夹。要加快文件/文件夹上传速度，请尝试将它们作为 ZIP 存档上传；内容将在我们这边解压，以便在笔记本中访问。
    - **远程文件** - 输入公共 URL 列表，用于标识要导入数据集的文件
    - **Github 存储库** - 输入 github 存储库的 URL，其文件将导入到数据集中
    - **笔记本输出** - 使用内置搜索来探索从 Kaggle 的大型公共笔记本存储库生成的公开可用文件

为了使您的数据集对您的协作者和社区更有用，建议您更新以下设置：- 共享菜单控制数据集的可见性。数据集可以是私有的（仅对您和您的合作者可见，并且出于符合 Kaggle 隐私政策的目的对 Kaggle 可见）或公共（对所有人可见）。默认设置为私人。
- 许可证是数据集发布所依据的许可证（与公共数据集相关）。如果您需要的许可证没有出现在下拉列表中，请选择“其他（在描述中指定）”选项，并确保在编写数据集描述时（在下一步中）提供有关许可证的信息。以下是常见许可证的列表。

    		
###### 通用许可证- **知识共享**
        - [CC0: Public Domain](https://creativecommons.org/publicdomain/zero/1.0/)
        - [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
        - [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
        - [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
        - [CC BY 4.0 (Attribution 4.0 International)](https://creativecommons.org/licenses/by/4.0/)
        - [CC BY-NC 4.0 (Attribution-NonCommercial 4.0 International)](https://creativecommons.org/licenses/by-nc/4.0/)
        - [CC BY 3.0 (Attribution 3.0 Unported)](https://creativecommons.org/licenses/by/3.0/)
        - [CC BY 3.0 IGO (Attribution 3.0 IGO)](https://creativecommons.org/licenses/by/3.0/igo/)
        - [CC BY-NC-SA 3.0 IGO (Attribution-NonCommercial-ShareAlike 3.0 IGO)](https://creativecommons.org/licenses/by-nc-sa/3.0/igo/)
        - [CC BY-ND 4.0 (Attribution-NoDerivatives 4.0 International)](https://creativecommons.org/licenses/by-nd/4.0/)
        - [CC BY-NC-ND 4.0 (Attribution-NonCommercial-NoDerivatives 4.0 International)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
    - **GPL**
        - [GPL 2](http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
        - [LGPL 3.0 (GNU Lesser General Public License 3.0)](http://www.gnu.org/licenses/lgpl-3.0.html)
        - [AGPL 3.0 (GNU Affero General Public License 3.0)](http://www.gnu.org/licenses/agpl-3.0.html)
        - [FDL 1.3 (GNU Free Documentation License 1.3)](http://www.gnu.org/licenses/fdl-1.3.html)
    - **开放数据共享**
        - [Database: Open Database, Contents: Database Contents](http://opendatacommons.org/licenses/dbcl/1.0/)
        - [Database: Open Database, Contents: © Original Authors](http://opendatacommons.org/licenses/odbl/1.0/)
        - [PDDL (ODC Public Domain Dedication and Licence)](https://opendatacommons.org/licenses/pddl/1.0/)
        - [ODC-BY 1.0 (ODC Attribution License)](https://opendatacommons.org/licenses/by/1-0/index.html)
    - **社区数据许可证**
        - [Community Data License Agreement - Permissive - Version 1.0](https://cdla.io/permissive-1-0/)
        - [Community Data License Agreement - Sharing - Version 1.0](https://cdla.io/sharing-1-0/)
    - **特别**
        - [World Bank Dataset Terms of Use](https://www.worldbank.org/en/about/legal/terms-of-use-for-datasets)
        - [Reddit API Terms](https://www.reddit.com/wiki/api)
        - [U.S. Government Works](https://www.usa.gov/government-works/)
        - [EU ODP Legal Notice](https://ec.europa.eu/info/legal-notice_en)
- 所有者允许您指定数据集所有者（如果您属于任何组织）。您可以将所有权分配给您自己或您所属的任何组织（请参阅“创建和使用组织”部分以了解有关此功能的更多信息）。

提供了所需的信息以及数据源后，单击“创建数据集”，您的数据集将开始处理。数据集处理完成后，您将进入新数据集的主页。请注意，如果您的数据集非常大（大小为数 GB），处理可能需要一段时间，最多几分钟。在处理过程中，请随意离开浏览器窗口，因为它将在后台继续进行。

您的数据集现已创建！然而，对于真正出色的数据集，工作并不止于此。指定必填字段后，您还应该执行一些其他操作，以便最大限度地提高数据集对社区或合作者的有用性：- 上传封面图片。我们建议使用 [unsplash.com](http://unsplash.com/) 来获取可共享的高分辨率图像。
- 向数据集添加副标题。这是一小段文字，稍微详细地解释了其中的内容。该副标题将与搜索列表中的标题一起显示。
- 添加标签。标签使用户更容易找到他们感兴趣的主题的数据集。
- 添加描述。描述应以长文本形式解释数据集的内容。精彩的描述对于想要开始使用数据的 Kaggle 社区成员来说非常有用。
- 发布公共笔记本。使用笔记本向社区成员或您的协作者展示如何开始使用数据。这可以是简单的事情，例如探索性数据分析，也可以是使用数据重现研究的更复杂的项目。

格式良好的数据集的一些示例包括“[CS:GO Competitive Matchmaking Data](https://www.kaggle.com/skihikingkevin/csgo-matchmaking-damage)”、“[Yelp Dataset](https://www.kaggle.com/yelp-dataset/yelp-dataset)”、“[1.6 million UK traffic accidents](https://www.kaggle.com/daveianhickey/2000-16-traffic-flow-england-scotland-wales)”和“[Fashion MNIST](https://www.kaggle.com/zalando-research/fashionmnist)”。

#### 从各种连接器创建数据集如上所述，除了从本地计算机上传文件之外，您还可以从各种数据源创建数据集，包括 GitHub、远程 URL（托管在网络上的任何公共文件）和 Notebook 输出文件。这些图标可以在数据集上传模式侧栏中找到。

##### GitHub 和远程文件数据集

从 GitHub 存储库或托管（远程）文件创建的数据集直接从远程服务器下载到 Kaggle 的云存储，因此不会消耗本地网络的带宽。这使得远程文件连接器成为从大文件创建数据集的便捷解决方案。

当从 github 存储库或托管文件创建数据集时，发布者可以从数据集的“设置”选项卡设置自动间隔更新。这是每天更新的示例[stock market dataset](https://www.kaggle.com/timoboz/stock-data-dow-jones)。

不想等待刷新？没问题！单击数据集菜单标题中“...”下拉列表中的更新按钮可立即同步数据集。

##### 笔记本输出文件数据集从笔记本的输出文件创建数据集将允许您创建可重现的数据管道。要从笔记本的输出文件创建数据集，请单击上传器中的图标并搜索您的笔记本。或者，您可以从渲染笔记本上的“输出”选项卡中单击“创建数据集”。然后，选择要在数据集中使用的文件。

##### 限制

值得注意的是，为了用户体验和技术简单性，可以仅从一个数据源创建数据集并对其进行版本控制。也就是说，当前无法在任何给定数据集中混合和匹配数据源（例如，从 GitHub 存储库创建的数据集不能同时包含从本地计算机上传的文件）。如果您想在笔记本中使用各种不同的数据源，您可以创建多个数据集并将它们添加到所述笔记本中。

数据集创建的常用技术规范也适用于连接器。有关更多信息，请参阅 [Technical Specifications](https://www.kaggle.com/docs/datasets#technical-specifications) 部分。

#### 在笔记本中使用数据集

- [Dowload dataset with kagglehub](https://github.com/Kaggle/kagglehub?tab=readme-ov-file#download-dataset)
- [Upload dataset with kagglehub](https://github.com/Kaggle/kagglehub?tab=readme-ov-file#upload-dataset)

** **
<!--Collaborating on Datasets-->
### 数据集协作数据集协作是一项强大的功能。它允许多个用户共同拥有和共同维护私有或公开共享的数据集。例如，您可以邀请协作者查看和编辑私有数据集，以便在将其公开可见性之前共同准备该数据集。

    上传数据集时，您可以选择您自己或您所属的任何组织作为该数据集的所有者。如果您选择自己，则将以您作为所有者创建该数据集。如果您选择一个组织，该组织将成为数据集的所有者，并且该组织中的所有其他用户（包括您自己）都将被添加为具有编辑权限的协作者（如果您不熟悉组织，您可能还需要阅读“创建和使用组织”部分）。

    这意味着组织是管理对数据集或数据集组的访问的简单方法。

#### 邀请合作者

    或者，您可以直接管理协作者。为此，请转到您拥有的任何数据集，然后导航至“设置”>“共享”。在那里，使用搜索框查找其他用户并将其添加为数据集协作者。如果您的数据集是私有的，您可以选择授予协作者查看权限（“可以查看”）或编辑权限（“可以编辑”）。如果您的数据集是公开的，则只能使用编辑权限（“可以编辑”）添加协作者，因为任何人都可以查看它。

    当您添加协作者时，他们将通过电子邮件收到通知。

    “[Data Science for Good: Kiva Crowdfunding](https://www.kaggle.com/kiva/data-science-for-good-kiva-crowdfunding)”是协作数据集的一个很好的例子。

#### 将笔记本与数据集协作者一起使用

    使用 Kaggle 的交互式代码编辑和执行环境 Notebooks，是与协作者一起处理数据集的强大方式。您可能希望与协作者一起编写公共笔记本，以帮助其他用户熟悉您的数据集。或者，当你们一起处理私人共享的项目时，您可能希望将所有代码在协作者之间保密。默认情况下，您创建的笔记本是私有的，并且它们的共享设置与您的数据集上的共享设置不同。也就是说，您的数据集协作者不会自动看到您的私人笔记本。这意味着什么以及如何有效地一起使用数据集和笔记本上的共享设置：
    - 您可以在私有数据集上创建公共笔记本，这将允许任何人查看您的笔记本，但不能查看底层私有数据源。
    - 如果您想向私人笔记本添加查看或编辑协作者（无论数据集是私人还是公共），您可以通过笔记本上的“选项”>“共享”添加用户来完成此操作。

** **
<!--Resources for Starting a Data Project-->
### 用于启动数据项目的资源

    有许多在线资源可以帮助您开始开展开放数据项目。#### 使用数据集
    - [Getting Started on Kaggle video tutorials](https://www.youtube.com/playlist?list=PLqFaTIg4myu8gbDh6oBl7XRYNBlthpDEW)：刚开始使用 Kaggle？不确定什么在哪里以及为什么？以下是我们自己的 Kaggle 团队教程，可帮助您快速浏览 Kaggle 平台并创建您自己的数据集和笔记本
    - [A Guide to Open Data Publishing](http://blog.kaggle.com/2016/10/21/a-guide-to-open-data-publishing-analytics/)：本文包含开放数据项目的关键要素。
    - [Web scraping data in Python](http://blog.kaggle.com/2017/01/31/scraping-for-craft-beers-a-dataset-creation-tutorial/)：向您展示如何使用 BeautifulSoup 抓取数据的教程。它使用了用于创建在 Kaggle 上发布的 [Craft Beers dataset](https://www.kaggle.com/nickhould/craft-cans) 的相同代码。
    - [Making Kaggle the Home of Open Data](http://blog.kaggle.com/2016/08/17/making-kaggle-the-home-of-open-data/)：Ben 的帖子分享了在 Kaggle 上发布开放数据项目以及如何探索其他人的数据集的说明。
    - [Creating an Organization](https://www.kaggle.com/organizations/new)：如果您要发布来自组织的数据，您可以先创建组织配置文件。然后，您只需在发布时从头像附近的下拉列表中选择组织配置文件即可（[https://www.kaggle.com/datasets/new](https://www.kaggle.com/datasets/new)）。
    - [Open Data Spotlights](http://blog.kaggle.com/tag/open-data-spotlight/)：本系列重点介绍了 Kaggle 上一些最好的开放数据项目。
    - 有请求或想要讨论数据收集、清理或开放数据项目的其他方面吗？在 Kaggle 上的 [Datasets Discussion forum](https://www.kaggle.com/data) 中发布。#### 使用笔记本
    - [Getting Started on Kaggle video tutorials](https://www.youtube.com/playlist?list=PLqFaTIg4myu8gbDh6oBl7XRYNBlthpDEW)：刚开始使用 Kaggle？不确定什么在哪里以及为什么？以下是我们自己的 Kaggle 团队教程，可帮助您快速浏览 Kaggle 平台并创建您自己的数据集和笔记本
    - [Kaggle Learn](https://www.kaggle.com/learn/overview) 是开始使用笔记本掌握数据科学和机器学习技术的好地方。
    - [Does open data make you happy? An introduction to Kaggle Notebooks](https://medium.com/@meganrisdal/does-open-data-make-you-happy-an-introduction-to-kaggle-kernels-d8cce437d5ff)：学习如何使用笔记本来探索 Kaggle 上发布的数据集的任意组合。
    - [Seventeen Ways to Map Data in Notebooks](http://blog.kaggle.com/2016/11/30/seventeen-ways-to-map-data-in-kaggle-kernels/)：Kaggle 用户为 Python 和 R 用户提供的迷你教程集合。

####分析
    - [How to Get Started with Data Science in Containers](http://blog.kaggle.com/2016/02/05/how-to-get-started-with-data-science-in-containers/)：我们的一位数据科学家 Jamie Hall 解释了 Docker 容器如何以及为何成为 Notebooks 的核心——可重复分析。
    - [Approaching (Almost) Any Machine Learning Problem by Kaggle Grandmaster Abhishek Thakur](http://blog.kaggle.com/2016/07/21/approaching-almost-any-machine-learning-problem-abhishek-thakur/)：正如它所说的那样——一个很棒的教程。

####其他
    - [Kaggle Datasets Twitter](https://twitter.com/KaggleDatasets)：新帐户具有新特色的数据集和开放数据新闻。
    - [Collecting & Using Open Data](http://mlwave.com/how-to-produce-and-use-datasets-lessons-learned/)：Triskelion 推荐的 Kaggler MLWave 博客。

** **
<!--Technical Specifications-->
### 技术规格Kaggle 数据集允许您私下或公开发布和共享数据集。我们提供用于存储和处理数据集的资源，但有一定的技术规范：
    - 每个数据集限制 200GB
    - 最大 200GB 私有数据集（如果超出此范围，请将数据集公开或删除未使用的数据集）
    - 最多 50 个顶级文件（如果有更多，请使用目录结构并上传存档）

    当您上传数据集时，我们会应用某些处理步骤来使数据集更可用。
    - 创建完整的存档，以便以后可以轻松下载数据集
    - 您上传的任何档案（例如 ZIP 文件）均未压缩，以便可以在笔记本中轻松访问这些文件（保留目录结构）
    - 自动检测表格数据文件的数据类型（例如地理空间类型）
    - 列级指标是针对表格数据计算的，可在数据集的“数据”选项卡上的数据浏览器中查看

    发布数据集时，如果您打算使用（或鼓励其他 Kaggle 用户使用）笔记本来分析数据，您可能还需要考虑[the technical specifications of Notebooks](https://www.kaggle.com/docs/notebooks#technical-specifications)。