<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 高效 GPU 使用技巧

Kaggle 提供对 NVIDIA TESLA P100 GPU 的免费访问。  这些 GPU 对于训练深度学习模型很有用，但它们不会加速大多数其他工作流程（即 pandas 和 scikit-learn 等库不会从访问 GPU 中受益）。

您每周最多可以使用 GPU 配额限制。配额每周重置，为 30 小时或有时更高，具体取决于需求和资源

以下是一些在 Kaggle 上充分利用 GPU 的提示和技巧。  一般来说，最有帮助的手段是：- 仅当您打算使用 GPU 时才打开 GPU。仅当您使用利用 GPU 加速库（例如 TensorFlow、PyTorch 等）的代码时，GPU 才有用。
- 主动监控和管理您的 GPU 使用情况
- Kaggle 在 Notebooks 编辑器的设置菜单、kaggle.com/notebooks 页面顶部、个人资料页面以及会话管理窗口中提供了用于监控 GPU 使用情况的工具。
- 避免使用批处理会话（提交按钮）来保存或检查进度。批处理会话（提交）从上到下运行所有​​代码。  这比简单地从 Notebook 编辑器下载 .ipynb 文件效率低。
- 取消不必要的批处理会话
- 如果您在完成第一次提交之前按下提交按钮，同一笔记本可以有多个并发批处理会话。  如果您的最新代码与以前的代码相比已更新，那么您最好取消第一次提交并仅保留第二次提交运行。- 在关闭窗口之前停止交互式会话。交互式会话保持活动状态，直到达到 60 分钟空闲超时限制。  如果您在关闭窗口之前停止会话，则可以节省最多 60 分钟的计算时间。
- 您可以使用屏幕左下角的活动事件窗口来管理活动会话，包括停止未使用的交互式会话。 [Learn more about Active Events here](https://www.kaggle.com/product-feedback/193925)。
- 考虑使用 Kaggle-API 来完全避免交互式会话。使用 Kaggle API，您可以推送笔记本的新版本，而无需在笔记本编辑器中打开交互式会话。

我们希望帮助您充分利用我们的免费 G​​PU 计算。快乐卡格！