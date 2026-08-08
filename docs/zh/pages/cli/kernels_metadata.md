<!-- kaggle-docs: machine-translated zh-CN from English source -->

要上传并运行内核，必须指定一个特殊的 `kernel-metadata.json` 文件。 

这是 `kernel-metadata.json` 的基本示例：
```
{
  "id": "timoboz/my-awesome-kernel",
  "id_no": 12345,
  "title": "My Awesome Kernel",
  "code_file": "my-awesome-kernel.ipynb",
  "language": "python",
  "kernel_type": "notebook",
  "is_private": "false",
  "enable_gpu": "false",
  "enable_internet": "false",
  "machine_shape": "",
  "dataset_sources": ["timoboz/my-awesome-dataset"],
  "competition_sources": [],
  "kernel_sources": [],
  "model_sources": []
}
```
您还可以使用 API 命令 `kaggle kernels init -p /path/to/kernel` 让 API 为您的新内核创建此文件。如果您希望获取现有内核的元数据，可以使用`kaggle kernels pull -p /path/to/download -k username/kernel-slug -m`。

## 内容
我们目前支持内核的以下元数据字段。
* `id`：内核的 URL slug。必须指定 `id` 或 `id_no` 之一。如果两者都是，`id_no` 将是首选。
  1. 您的用户名
  2. 独特的内核slug
* `id_no`：内核的数字 ID。  必须指定 `id` 或 `id_no` 之一。如果两者都是，`id_no` 将是首选。
* `title`：内核的标题。新内核必需 - 现有内核可选。请注意，内核标题和 slugs 是相互链接的。内核 slug 的标题始终是小写的，并用破折号 (`-`) 替换空格。 
  * 如果您想重命名内核，您可以更改元数据中的标题。但是，您还需要在重命名完成后更新`id`。
* `code_file`：内核源代码的路径。必需的。如果不是绝对路径，则应该是相对于`kernel-metadata.json`的位置。* `language`：编写内核所用的语言。有效选项为 `python`、`r` 和 `rmarkdown`。必需的。
* `kernel_type`：内核类型。有效选项为 `script` 和 `notebook`。必需的。
* `is_private`：内核是否应该是私有的。如果未指定，将为`true`。
* `enable_gpu`：内核是否应该在 GPU 上运行。如果未指定，将为`false`。
* `enable_internet`：内核是否应该能够访问互联网。如果没有指定，则为`false`。
* `machine_shape`：要使用的加速器/GPU 类型（例如，`NvidiaTeslaT4`、`NvidiaTeslaP100` 或 `Tpu1VmV38`）。
  > [!警告]
  > `NvidiaTeslaP100` 不适用于默认的 Kaggle 图像。其 PyTorch 版本 (cu128) 不包含 Pascal (`sm_60`) 内核，因此 `torch.cuda.is_available()` 返回 `True`，但第一个 CUDA 操作失败并显示 `cudaErrorNoKernelImageForDevice`。请使用`NvidiaTeslaT4`，或者如果您需要 P100，请安装 Pascal 兼容的火炬版本。
* `dataset_sources`：数据集源列表，指定为`"username/dataset-slug"`
* `competition_sources`：竞赛来源列表，指定为`"competition-slug"`
* `kernel_sources`：内核源列表，指定为`"username/kernel-slug"`
* `model_sources`：模型源列表，指定为`"username/model-slug/framework/variation-slug/version-number"`

我们将在即将推出的 API 版本中添加进一步的元数据处理。