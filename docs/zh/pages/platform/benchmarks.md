<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 基准测试

** **

### 概述

Kaggle 致力于成为高质量基准的多样化生态系统的家园，评估对行业非常重要的任务的模型能力，以帮助开发人员可靠地理解和信任在 ML 任务上效果好的方法。 Kaggle 拥有十多年举办机器学习竞赛的经验（对于行业和我们的合作伙伴而言，这是一种基准），我们将遵循以下原则：

- Kaggle 相信**稳健性**的重要性：真正帮助行业衡量人工智能进展的持久、高价值基准是不易被黑客攻击、饱和或泄露的基准
- Kaggle 相信**可重复性和透明度**对于确保行业可以信任基准和评估至关重要。我们也非常重视出版商对我们这个平台的信任。
- **Kaggle 不开发基准**。我们的作用是独立重现并公开发布结果，提供一个与模型无关的平台，随着时间的推移简化对新基准上新模型的评估，并推动社区参与和压力测试。[Kaggle Benchmarks](https://www.kaggle.com/benchmarks) 包含两种主要类型的基准：1) **研究基准**，这是由人工智能实验室的研究人员创建的评估，2) **社区基准**，这是由 Kaggle 社区创建的评估。

两者在技术上是相同的，唯一的区别是研究基准往往需要更多的计算。如果您是一名研究人员，想要与我们一起托管基准测试，请发送电子邮件至 kaggle-benchmarks@google.com，讨论如何获得更高的配额。

** **

### 创建任务和基准

首先，关于 Kaggle 基准的一些关键概念：

- **任务：** 定义问题的 Python 函数（例如，“解决这个谜语”）。
- **基准：** 您可以放在一起的任务集合。没有这方面的代码实现。这是 Kaggle 在图形用户界面上支持的一项功能，以便用户可以根据他们关心的任务整理自己的基准测试

#### 创建任务

📺 **视频指南**：[How to create a task](https://www.youtube.com/watch?v=brIF5xGPkcM)- 1.进入[Kaggle Benchmarks](https://www.kaggle.com/benchmarks)，点击“创建任务”
![Create a task](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/create_task_new.png)- 2. 创建一个新任务 - 您可以从头开始编写代码，也可以提示 AI 为您生成代码
    - ⚠️ 访问要求：请确保您的帐户经过电话验证才能访问 LLM API 配额等资源。此外，2025 年 12 月 15 日之后注册的帐户必须完成额外的身份验证才能执行任务笔记本。
![Generate a task](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/generate_task.png)![Generate a task](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/generate_task2.png)- 3. 创建任务笔记本后，您可以对其进行编辑。完成后，您可以在笔记本或“保存任务”中运行它，这将创建一个任务详细信息页面
![Task notebook](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/task_notebook.png)- 4. 在任务详细信息页面中，您可以添加描述、要评估的新模型、比较不同模型的输出，甚至与其他人共享
![Task detail page](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/task_detail_page.png)

要开始创建您的第一个任务，请查看 [Getting Started Notebook](https://www.kaggle.com/code/nicholaskanggoog/kaggle-benchmarks-getting-started-notebook?scriptVersionId=290215074)。

#### 创建基准

请记住，基准测试只是将多个任务放在一个集合中。

📺 **视频指南**：[How to create a benchmark](https://www.youtube.com/watch?v=V5tkw8zZJJc)- 1. 前往[Kaggle Benchmarks](https://www.kaggle.com/benchmarks)，点击“创建基准”
![Create a benchmark](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/benchmark%20creation/benchmark-creation.png)- 2. 填写面板中的信息。您以后可以随时更改名称和描述！
![Generate a benchmark](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/benchmark%20creation/benchmark-gen.png)- 3. 您应该进入“基准详细信息”页面，您需要在其中将任务添加到基准中。您可以添加自己的任务或其他人创建的公共任务。
![Add tasks](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/benchmark%20creation/benchmark-add-task.png)- 4. 接下来，您需要添加要在基准页面上显示的模型列表。
![Add models](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/benchmark%20creation/benchmark-add-model2.png)- 5. 完成后，您将看到已完成的基准详细信息页面。您可以编辑、共享和添加新模型和任务！
![Benchmark detail page](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/benchmark%20creation/benchmark-final.png)

** **

### 下载基准排行榜

您可以下载基准排行榜数据以供您自己分析。有两种方法可以访问下载选项：

- 从基准页面右上角的三点菜单（“︙”）。
- 使用排行榜表格正上方的“下载”按钮。

这两个操作都会打开一个下载弹出窗口，其中提供了检索数据的方法。

####通过API下载

弹出窗口提供了一个 cURL 命令，用于将排行榜数据下载为 JSON 对象。如果基准不公开，您将需要使用您的 Kaggle 凭据进行身份验证。# 未经验证的示例
    curl -L -o ~/Downloads/open-benchmarks_scicode_leaderboard.json \
      https://www.kaggle.com/api/v1/benchmarks/open-benchmarks/scicode/leaderboard
    
    # 已验证的示例
    # 导出您的 Kaggle 用户名和 API 密钥
    # 导出 KAGGLE_USERNAME=
    # 导出 kaggle-key=已编辑 -L -u $KAGGLE_USERNAME:$KAGGLE_KEY \
      -o ~/Downloads/myusername_my-benchmark_leaderboard.json \
      https://www.kaggle.com/api/v1/benchmarks/myusername/my-benchmark/leaderboard

#### 下载为 CSV

在下载弹出窗口的底部，您可以单击“将排行榜下载为 csv”，直接将数据下载为 CSV 文件。

** **

### 模型

#### 社区基准中支持的模型

随着新模型的发布和旧模型的弃用，我们将继续更新社区基准中的可用模型列表。我们目前不支持某些模型（例如 OpenAI 模型），但正在努力随着时间的推移不断扩大我们的列表。要查询当前支持的型号列表，请在任务笔记本中运行以下命令：

    将 kaggle_benchmarks 导入为 kbench
    # 返回要测试的当前可用模型列表
    列表（kbench.llms.keys（））![Query list of available models](https://storage.googleapis.com/kaggle-media/cms/page-images/kaggle-benchmarks/available_models/query_models.png)

#### 研究基准中支持的模型

研究基准中的模型选择由具体评估和所涉及的研究人员决定。因此，这些可能包括社区基准当前不支持的补充模型。

** **

###学习资源

- [Getting started notebook](https://www.kaggle.com/code/nicholaskanggoog/kaggle-benchmarks-getting-started-notebook?scriptVersionId=290215074)

- [Kaggle Benchmarks GitHub repo](https://github.com/Kaggle/kaggle-benchmarks)

- [Kaggle Community Benchmarks NotebookLM](https://notebooklm.google.com/notebook/56661d72-a74b-48cc-a2d0-08a6f7a595e8)