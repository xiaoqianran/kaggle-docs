<!-- kaggle-docs: machine-translated zh-CN from English source -->

完整的模型由 3 种类型的实体组成：

1. 型号
2. 变化
3. 变体版本

我们以[efficientnet](https://www.kaggle.com/models/tensorflow/efficientnet)为例来解释一下这些实体。

像 `efficientnet` 这样的模型包含多种变体。

变体是具有特定框架（例如 TensorFlow2）的模型（例如 B0、B1...）的特定变体。

## 型号

要创建模型，必须指定特殊的 `model-metadata.json` 文件。 

这是 `model-metadata.json` 的基本示例：
```
{
  "ownerSlug": "INSERT_OWNER_SLUG_HERE",
  "title": "INSERT_TITLE_HERE",
  "slug": "INSERT_SLUG_HERE",
  "subtitle": "",
  "isPrivate": true,
  "description": "Model Card Markdown, see below",
  "publishTime": "",
  "provenanceSources": ""
}
```

您还可以使用 API 命令 `kaggle models init -p /path/to/model` 让 API 为您的新模型创建此文件。如果您希望获取现有模型的元数据，可以使用`kaggle models get username/model-slug`。

### 内容

我们目前支持模型的以下元数据字段。

* `ownerSlug`：用户或组织的别名
* `title`: 模特的标题
* `slug`：模型的鼻涕虫（每个拥有者都是唯一的）
* `licenseName`：许可证名称（见下表）
* `subtitle`：模型的副标题
* `isPrivate`：模型是否应该是私有的（仅所有者可见）。如果没有指定，则为`true`
* `description`：markdown语法中模型的卡片（见下面的模板）
* `publishTime`：模型原始发布时间
* `provenanceSources`：模型的出处

## 型号变化要创建模型变体，必须指定特殊的 `model-instance-metadata.json` 文件。 

这是 `model-instance-metadata.json` 的基本示例：
```
{
  "ownerSlug": "INSERT_OWNER_SLUG_HERE",
  "modelSlug": "INSERT_EXISTING_MODEL_SLUG_HERE",
  "instanceSlug": "INSERT_INSTANCE_SLUG_HERE",
  "framework": "INSERT_FRAMEWORK_HERE",
  "overview": "",
  "usage": "Usage Markdown, see below",
  "licenseName": "Apache 2.0",
  "fineTunable": False,
  "trainingData": [],
  "modelInstanceType": "Unspecified",
  "baseModelInstance": "",
  "externalBaseModelUrl": ""
}
```

您还可以使用 API 命令 `kaggle models variations init -p /path/to/model-variation` 让 API 为您创建新模型变体的此文件。

### 内容

我们目前支持以下模型变体元数据字段。

* `ownerSlug`：模型的用户或组织的slug
* `modelSlug`: 现有模型的slug
* `instanceSlug`: 变种的蛞蝓
* `framework`：变体的框架（可能的选项：`tensorFlow1`，`tensorFlow2`，`tfLite`，`tfJs`，`pyTorch`，`jax`，`coral`，...）
* `overview`：变体的简短概述
* `usage`：markdown 语法中变体的用法（见下面的模板）
* `fineTunable`：变化是否可微调
* `trainingData`：字符串、URL、Kaggle 数据集等形式的训练数据列表...
* `modelInstanceType`：模型变体是基础模型、外部变体、内部变体还是未指定
* `baseModelInstance`：如果这是内部变体，则为基本模型变体的 `{owner-slug}/{model-slug}/{framework}/{variation-slug}`
* `externalBaseModelUrl`：如果这是外部变体，则为基本模型的 URL

### 许可证

以下是可用模型许可证的列表：- 阿帕奇2.0
- 归属 3.0 IGO（CC BY 3.0 IGO）
- 归因 3.0 未移植（CC BY 3.0）
- 国际归因 4.0（CC BY 4.0）
- 归属-NoDerivatives 4.0 国际（CC BY-ND 4.0）
- 归属-非商业 4.0 国际 (CC BY-NC 4.0)
- 归属-非商业性-NoDerivatives 4.0 国际 (CC BY-NC-ND 4.0)
- 署名-非商业性-相同方式共享 3.0 IGO (CC BY-NC-SA 3.0 IGO)
- BSD-3 条款
- CC BY-NC-SA 4.0
- CC BY-SA 3.0
- CC BY-SA 4.0
- CC0：公共领域
- 社区数据许可协议 - 许可 - 版本 1.0
- 社区数据许可协议 - 共享 - 版本 1.0
- GNU Affero 通用公共许可证 3.0
- GNU 自由文档许可证 1.3
- GNU 较宽松通用公共许可证 3.0
- GPL 2
- 麻省理工学院
- ODC 归属许可证 (ODC-By)
- ODC 公共领域奉献和许可 (PDDL)
- GPL 3

### 用法

在此 Markdown 中可以使用以下模板变量：- `${VERSION_NUMBER}` 渲染时替换为版本号
- 渲染时，`${VARIATION_SLUG}` 被变体 slug 替换
- `${FRAMEWORK}`替换为框架名称
- `${PATH}` 被`/kaggle/input/<model_slug>/<framework>/<variation_slug>/<version>` 取代。
- `${FILEPATH}` 被`/kaggle/input/<model_slug>/<framework>/<variation_slug>/<version>/<filename>` 取代。仅当数据包包含单个文件时才定义此值
- `${URL}`替换为模型的绝对URL