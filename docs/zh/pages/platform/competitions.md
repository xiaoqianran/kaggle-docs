<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 比赛

Kaggle 竞赛旨在为参赛者在机器学习职业生涯的各个不同阶段提供挑战。因此，它们非常多样化，类型广泛。

***

### 预测比赛

这些都是全面的监督机器学习挑战，带来了困难的预测问题。预测比赛吸引了一些最强大的专家，并提供丰厚的奖池。它们是向该领域最优秀的人学习技能的宝贵机会。

预测比赛可以采取多种独特的形式，这会影响您的参与方式。

#### 预测比赛形式

##### 经典比赛

经典比赛是遵循标准 Kaggle 格式的比赛。在简单的比赛中，用户可以在比赛开始时接受比赛规则后访问完整的数据集。作为参赛者，您将下载数据，在本地或 Kaggle Notebooks 中构建模型，生成预测文件，然后将您的预测作为提交上传到 Kaggle 上。

示例包括：- [American Express Default Prediction](https://www.kaggle.com/competitions/amex-default-prediction) – 使用客户的购物历史来预测他们将来是否会违约。
- [Jigsaw Toxic Comment Classification Challenge](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge) – 预测维基百科上有毒评论的存在和类型。
- [Google Landmark Retrieval Challenge](https://www.kaggle.com/c/landmark-retrieval-challenge) – 给定一张图像，在数据集中找到所有相同的地标。
- [Right Whale Recognition](https://www.kaggle.com/c/noaa-right-whale-recognition) – 在航空照片中识别濒临灭绝的露脊鲸。

##### Code Competitions

在这些比赛中，所有提交的内容都必须在 Kaggle Notebook 内进行。您无法直接上传预测。

- **平衡：** 每个用户都有相同的硬件津贴。
- **简单性：**模型必须在平台计算限制内运行。
- **限制：** 笔记本电脑可能受到 CPU/GPU 运行时、互联网访问或外部数据使用的限制。

###### 代码竞赛常见问题解答

- **错误：** 请参阅[debugging page](https://www.kaggle.com/code-competition-debugging)。
- **外部数据：** 仅在竞赛规则指定的情况下才允许。
- **计算限制：** 限制（RAM、CPU 等）在编辑器中可见。
- **获胜者：** 通常通过在截止日期后在私人测试集上重新运行笔记本来确定。

Examples Include:

- [The Konwinski Prize](https://www.kaggle.com/competitions/konwinski-prize) – 100 万美元的 AI 可以解决 90% 的新 GitHub 问题。
- [Detect AI Generated Text](https://www.kaggle.com/competitions/llm-detect-ai-generated-text) - 识别哪篇文章是由大型语言模型编写的。

##### 两阶段比赛一些代码竞赛分为第 1 阶段和第 2 阶段。第 2 阶段涉及一个新的测试数据集，该数据集之前在该阶段开始之前不可用。您的代码将在新的测试数据集上运行，您的最终分数将基于您在该未见过的数据集上的提交表现。两阶段比赛参与者的一个常见陷阱是，他们的笔记本编写方式不够灵活，无法适应新的、看不见的测试集！

示例包括：

- [Zillow Prize](https://www.kaggle.com/c/zillow-prize-1) – 构建可以挑战 Zestimates 的机器学习算法。
- [Jane Street Real-Time Market Data Forecasting](https://www.kaggle.com/competitions/jane-street-real-time-market-data-forecasting) - 使用真实世界数据预测金融市场反应者。

#### 入门和游乐场比赛

入门竞赛是最平易近人的竞赛，以特定的机器学习技术或数据格式为中心，旨在帮助新用户入门。他们不提供任何奖品或积分，并且接受大量辅导。

- [Digit Recognizer](https://www.kaggle.com/c/digit-recognizer)
- [Titanic: Machine Learning from Disaster](https://www.kaggle.com/c/titanic) – 预测泰坦尼克号上的生存情况。
- [Housing Prices: Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques)*注：入门竞赛有两个月的滚动排行榜。超过两个月的提交将被无效，以便新的 Kaggler 可以将分数与当前群组而不是数以万计的历史用户进行比较。*

游乐场比赛是一种比“入门”比赛更“有趣”的比赛。这些在较低风险的环境中提供相对简单的任务。奖项是典型的荣誉和公众认可。

- [Dogs versus Cats](https://www.kaggle.com/c/dogs-vs-cats)
- [Leaf Classification](https://www.kaggle.com/c/leaf-classification)
- [New York City Taxi Trip Duration](https://www.kaggle.com/c/nyc-taxi-trip-duration)

#### 提交内容

提交限制（通常每天 5 份）适用于整个团队。

##### 通过上传提交

在经典比赛中，使用“提交预测”按钮上传您的 .csv 文件。它必须通过处理才能获得分数。

##### 从笔记本提交

在代码竞赛中：

1. 使用竞赛数据集初始化一个 Notebook。
2. 在/kaggle/working中生成提交文件（例如submission.csv）。
3. 单击“保存版本”->“保存并运行全部”。
4. 从笔记本查看器中，转到输出部分并单击提交。

*注意：某些代码竞赛要求您在特定模板中提交代码。这将在比赛中作为演示笔记本提供。*#### 排行榜

- **公共排行榜：** 比赛期间可见；基于测试数据样本。
- **私人排行榜：** 基于剩余测试数据的最终排名。
- **过度拟合：** 高公共分数并不能保证高私人分数。避免“追逐”公共排行榜。

#### 泄漏

数据泄漏是指训练数据中存在意外信息，这些信息允许实现不切实际的高性能，但在现实世界中却失败了。

泄漏示例：

- 将真实情况泄漏到测试集中。
- 来自未来的信息泄漏到过去。
- 隐藏的“代理”变量（例如，预测“癌症”诊断的“手术”变量）。

Kaggle 可以通过重新启动竞赛或生成新的测试集来解决泄漏问题。

***

### 黑客马拉松比赛

Kaggle 黑客马拉松是一种竞赛形式，您可能会被要求执行各种独特的数据任务，例如构建应用程序、开发新指标、创造性地使用 LLM 或制作教育性 YouTube 视频。这些竞赛超越了传统的预测模型，为发展和创新开辟了解决问题的新途径。虽然监督机器学习竞赛（即“预测竞赛”）需要数据集、已知和私有的基本事实（答案关键）以及评估指标，但黑客马拉松允许用户针对更开放、更主观的挑战构建创造性的、多样化的解决方案。如果说预测竞赛类似于数学测试​​，那么黑客马拉松就类似于学期论文。

以下是您的团队在开发黑客马拉松时应考虑的一些细微考虑因素。

示例包括：

- [Gemma 3n Impact Challenge](https://www.kaggle.com/competitions/google-gemma-3n-hackathon/overview) - 使用最新的 Gemma 模型为更美好的世界打造最好的产品。
- [OpenAI to Z Challenge](https://www.kaggle.com/c/openai-to-z-challenge) - 使用 OpenAI o3/o4 mini 和 GPT 4.1 模型帮助识别可能隐藏的考古遗址。
- [Vibe Code with Gemini 3 Pro in AI Studio](https://www.kaggle.com/competitions/gemini-3/overview) - 与 Gemini 3 一起构建并争夺 500,000 美元的积分。
- [NFL Big Data Bowl](https://www.kaggle.com/competitions/nfl-big-data-bowl-2026-analytics) - 了解球在空中时的球员动作。

#### 提交内容有效的提交是通过 Kaggle Writeup 进行的，它提供了一个专门的空间来讲述数据科学项目背后的故事。虽然 Writeup 是您的最终报告，但您通常会使用 Kaggle Notebooks 来执行分析并生成可视化效果，然后您可以将其链接到或嵌入到 Writeup 中。 Writeups 允许您添加多媒体画廊（非常适合演练视频）、链接到外部资源（例如 GitHub 或带有丰富嵌入式卡片的 Hugging Face）、注释这些链接以提供上下文并解释它们的重要性。

每场黑客马拉松还可能要求您附上笔记本、链接或其他内容以供评委考虑。详细内容请参见具体评价标准。

##### 如何创建文章Kaggle Writeup 可作为您的项目报告。这应包括标题、副标题以及对您提交的内容的详细分析。您必须为您的写作选择一个曲目才能提交。赛道是主办方定义的特定类别或问题领域（例如“可视化赛道”与“创新赛道”），可能有不同的评估标准或奖项。请务必检查竞赛评估页面，看看您是否可以提交多个赛道，或者是否必须只选择一个

要创建新的Writeup，请单击竞赛页面中的“New Writeup”按钮。保存写作后，您应该在右上角看到“提交”按钮。

您的最终提交必须在截止日期之前提交。任何在比赛截止日期前未提交或草稿的文章将不会被评委考虑。

*注意：如果您将私人 Kaggle 资源附加到您的公开 Kaggle 文章中，您的私人资源将在截止日期后自动公开。*

Kaggle上的所有内容都是用[Markdown](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)编写的。如果您从其他应用程序（例如 Word 或浏览器）复制粘贴，则可能需要清理 markdown 或 html 才能正确显示。##### 提交要求

每场比赛都会概述您的文章中需要包含的必要元素，以供评委考虑。这可能包括笔记本、数据集、视频、论文、工作应用程序的链接等。如果您提交的内容不包含这些要求之一，评委可能会取消其资格或进行处罚。

确保任何外部链接不需要登录或包含付费专区，以便评委可以访问它们进行审查。

##### 评估标准

所有 Kaggle 比赛都是“技能竞赛”（而不是“机会竞赛”，如抽奖或彩票）。黑客马拉松的获胜者由评委小组使用预先制定的评分标准进行评估。主办团队负责在比赛开始前制定评分标准，并根据该评分标准对所有提交的作品进行评估。

评估部分描述了如何对提交的内容进行评分以及参与者应如何格式化其提交的内容。一个例子可能是：

**应用：评估标准（共 60 分）**|标准|可能的积分 |
| --- | --- |
|实用性：该应用程序具有有意义的目的并且功能正确且没有错误。 | 0-15分|
|信息性：该应用程序包含详细且准确的文档。 | 0-15分|
|参与度：Web 应用程序展示了一个有趣或引人入胜的用例。 | 0-10分 |
|文档质量：Web 应用程序有详细的文档记录并遵循最佳实践。 | 0-15分|
|新颖性：Web 应用程序展示了令人惊讶的、新的或新颖的用例。 | 0-5分|

**视频：评估标准（共 40 分）**

|标准|可能的积分 |
| --- | --- |
|准确性：视频提供准确的信息并利用当前的最佳实践。 | 0-10分|
|信息量：视频讨论了快速工程及其对项目的重要性等主题。 | 0-10分 |
|教学价值：该视频对于 Gemini API 用户来说是宝贵的学习资源。 | 0-10分 |
|娱乐和制作质量：视频赏心悦目，制作质量专业。 | 0-10分 |

##### 曲目和奖项单一竞赛可能会提供略有不同的问题、侧重点或参与者的评估途径。这些赛道解决了问题陈述的不同方面，但仍然处于更广泛的竞争的同一焦点内。不同的赛道也可能迎合具有不同专业知识或背景的参与者。

不同轨道的示例可能是：强调表格和图形的“数据可视化轨道”、仅限于学生参与者的“学生轨道”或强调使用合作伙伴工具的“外部工具轨道”。

##### 优胜者评选

提交的内容在黑客马拉松结束之前都是保密的，届时所有提交的内容都会公开供法官和 Kaggle 社区审核。评审团队将审核提交的作品并选出获奖者，获奖者将显示在比赛的获奖者选项卡上。

请注意，评委可能需要几周的时间才能完成对提交材料的审核，尤其是在比赛参与度很高的情况下。评委也很少能够向所有参与者提供个性化的反馈或分数。

***

### 模拟比赛模拟不是针对静态数据集进行预测，而是托管动态环境。您提交的代理是在游戏或模拟环境中与其他参与者的代理竞争的代理。环境规则概述了比赛的条款，提交的作品将与技术水平相似的对手进行匹配，玩多个回合以建立排行榜。

示例包括：

- [Halite](https://www.kaggle.com/competitions/halite/overview) 两西格码
- Lux AI 挑战赛的[Lux AI](https://www.kaggle.com/c/lux-ai-2021)

####模拟评估

每个提交都有一个估计的技能评级，该评级由高斯 $N(\mu,\sigma^2)$ 建模，其中 $\mu$ 是估计的技能，$\sigma$ 表示我们对该估计的不确定性，该不确定性会随着时间的推移而减少。

当您上传提交内容时，我们首先播放一个验证片段，其中该提交内容与自身的副本进行播放，以确保其正常工作。如果剧集失败，提交将被标记为错误。否则，我们使用 $\mu\_0=600$ 初始化提交，并将其加入所有提交的池中以进行持续评估。我们反复从所有提交的池中运行剧集，并尝试挑选具有相似评级的提交进行公平匹配。剧集结束后，我们将更新该剧集中所有提交内容的评分估算。如果一个提交获胜，我们将增加其 $\mu$ 并减少其对手的 $\mu$ - 如果结果是平局，那么我们将使两个 $\mu$ 值更接近其平均值。更新的幅度将相对于基于先前 $\mu$ 值的预期结果的偏差，并且也相对于每个提交的不确定性 $\sigma$。我们还减少了相对于结果获得的信息量的 $\sigma$ 项。您的特工赢得或输掉一集的分数不会影响技能评级更新。

每个提交的代理将在提交截止日期后继续播放剧集。排行榜上只会显示得分最高的经纪人。

此过程的目标是通过使用动态评级系统将自动提交的内容与具有相似技能水平的对手重复配对，来准确地对竞赛参与者进行排名。通过模拟大量比赛并完善性能统计估计，系统确保最终排行榜反映每个用户表现最好的代理的真实技能。

***### 入门资源

- **学习：** [Kaggle Learn](https://www.kaggle.com/learn/overview) 用于实践曲目。
- **视频：** [What Kaggle has learned](https://www.youtube.com/watch?v=oYNKc_u9Os8) 和 [How to (almost) win at Kaggle](https://www.youtube.com/watch?v=JyEm3m7AzkE)。
- **论坛：** [General Discussion](https://www.kaggle.com/discussion)、[Questions & Answers](https://www.kaggle.com/questions-and-answers) 和 [Kaggle Noobs Slack](https://kagglenoobs.slack.com/)。
- **博客：** [No Free Hunch](http://blog.kaggle.com/) 获奖者访谈和技术教程。

### 参加比赛

检查[Competitions listing](https://www.kaggle.com/competitions)是否有活跃的挑战。

- **规则选项卡：** 您必须在下载数据或提交之前接受规则。
- **概述选项卡：** 查看描述、数据、评估、时间表和奖项。
- **时间表：** 注意规则接受截止日期和提交截止日期。

### 组建团队

每个人都作为一个团队进行竞争（即使是一个人的团队）。

- **合并：** 您可以邀请其他人合并团队，直到团队合并截止日期为止。
- **限制：** 如果合并后的团队超过规模限制或历史提交限制，则不允许合并。
- **团队负责人：** 具有修改权限的主要联系人。

### 作弊

作弊行为受到非常严肃的对待。 Kaggle 监控抄袭和投票圈。违规行为可能会导致从排行榜中删除或永久帐户禁令。向[compliance account](https://www.kaggle.com/compliance)报告可疑活动。