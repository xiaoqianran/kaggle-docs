<!-- kaggle-docs: machine-translated zh-CN from English source -->

Kaggle API 遵循 [Data Package specification](https://frictionlessdata.io/specs/data-package/) 在创建新数据集和数据集版本时指定元数据。在文件旁边，您必须将一个特殊的 `dataset-metadata.json` 文件与每个新数据集（版本）的文件一起放入上传文件夹中。 

这是 `dataset-metadata.json` 的基本示例：
```
{
  "title": "My Awesome Dataset", 
  "id": "timoboz/my-awesome-dataset", 
  "licenses": [{"name": "CC0-1.0"}]
}
```
您还可以使用 API 命令 `kaggle datasets init -p /path/to/dataset` 让 API 为您创建此文件。

这是包含文件元数据的示例：
```
{
  "title": "My Awesome Dataset", 
  "subtitle": "My awesomer subtitle",
  "description": "My awesomest description",
  "id": "timoboz/my-awesome-dataset", 
  "id_no": 12345,
  "licenses": [{"name": "CC0-1.0"}],
  "resources": [
    {
      "path": "my-awesome-data.csv",
      "description": "This is my awesome data!",
      "schema": {
        "fields": [
          {
            "name": "StringField",
            "description": "String field description",
            "type": "string"
          },
          {
            "name": "NumberField",
            "description": "Number field description",
            "type": "number"
          },
          {
            "name": "DateTimeField",
            "description": "Date time field description",
            "type": "datetime"
          }
        ]
      }
    },
    {
      "path": "my-awesome-extra-file.txt",
      "description": "This is my awesome extra file!"
    }
  ],
  "keywords": [
    "beginner",
    "tutorial"
  ],
  "expectedUpdateFrequency": "monthly",
  "userSpecifiedSources": "World Bank and OECD ([link](http://data.worldbank.org/indicator/NY.GDP.MKTP.CD))",
  "image": "relative/path/to/new/image.png"
}
```

## 内容
目前支持以下元数据：
* `kaggle datasets create`（创建一个新的数据集）：
  * `title`：数据集的标题，长度必须在 6 到 50 个字符之间。
  * `subtitle`：数据集的副标题，长度必须在20到80个字符之间。
  * `description`：数据集的描述。 
  * `id`：新数据集的 URL slug，是以下各项的组合：
    1. 您的用户名或组织名称（如果您是组织的成员）。
    2. 唯一的数据集段的长度必须在 3 到 50 个字符之间。
  * `licenses`：必须只有一个指定许可证的条目。仅评估`name`，忽略所有其他信息。请参阅下文了解选项。* `resources`：包含正在上传的文件数组。  （注意 - 这不是必需的，如果包含，也不需要包含所有要上传的文件。）：
    * `path`：文件路径。
    * `description`：文件描述。
    * `schema`：文件模式（定义如下）：
      * `fields`：数据集中的字段数组。  请注意，这需要按顺序包含数据中的所有字段，否则它们将无法正确匹配。  更高版本的 API 将修复此错误。
        * `name`: 字段名称
        * `description`：字段描述（注意：为了向后兼容，也接受`title`，但首选`description`）
        * `type`：字段类型。尽力而为的类型列表将保留在本页底部，但可能会添加此处未记录的新类型。
  * `keywords`：包含与 Kaggle 上现有标签相对应的字符串数组。  如果指定的标签不存在，上传将继续，但不会添加该特定标签。  
* `kaggle datasets version`（为现有数据集创建新版本）：
  * `subtitle`：数据集的副标题，长度必须在20到80个字符之间。
  * `description`：数据集的描述。* `id`：要更新的数据集的 URL slug（见上文）。您必须是该数据集的所有者或具有编辑权限。必须指定 `id` 或 `id_no` 之一。如果两者都是，`id_no` 将是首选。
  * `id_no`：数据集的ID。必须指定 `id` 或 `id_no` 之一。您必须是该数据集的所有者或具有编辑权限。如果两者都是，`id_no` 将是首选。
  * `resources`：包含正在上传的文件数组。  （注意 - 这不是必需的，如果包含，也不需要包含所有要上传的文件。）：
    * `path`：文件路径。
    * `description`：文件描述。
    * `schema`：文件模式（定义如下）：
      * `fields`：数据集中的字段数组。  请注意，这需要按顺序包含数据中的所有字段，否则它们将无法正确匹配。  更高版本的 API 将修复此错误。
        * `name`: 字段名称
        * `description`：字段描述（注意：为了向后兼容，也接受`title`，但首选`description`）
        * `type`：字段类型。尽力而为的类型列表将保留在本页底部，但可能会添加此处未记录的新类型。* `keywords`：包含与 Kaggle 上现有标签相对应的字符串数组。  如果指定的标签不存在，上传将继续，但不会添加该特定标签。  
* `kaggle datasets metadata --update`（更新现有数据集的元数据）支持上面提到的`kaggle datasets version`的所有字段，此外：
  * `expectedUpdateFrequency`：您期望使用新版本更新数据集的频率。请参阅[section below](#expected-update-frequencies)了解可能的值。
  * `userSpecifiedSources`：对数据集来源的解释。该字符串支持大多数基本的 Markdown 功能。
  * `image`：要用于数据集的新图像文件的相对文件路径。该路径应相对于 dataset-metadata.json 文件的位置。有关文件类型和预期图像大小的更多详细信息，请参阅[section below](#images)。

我们将在即将推出的 API 版本中添加进一步的元数据处理。

## 许可证
您可以为您的数据集指定以下许可证：
* `CC0-1.0`: [CC0: Public Domain](https://creativecommons.org/publicdomain/zero/1.0/)
* `CC-BY-SA-3.0`: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
* `CC-BY-SA-4.0`: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
* `CC-BY-NC-SA-4.0`: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
* `GPL-2.0`: [GPL 2](http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
* `ODbL-1.0`：数据库：[Open Database](http://opendatacommons.org/licenses/odbl/1.0/)，内容：© 原作者
* `DbCL-1.0`: 数据库: [Open Database](http://opendatacommons.org/licenses/odbl/1.0/), 内容: [Database Contents](http://opendatacommons.org/licenses/dbcl/1.0/)
* `copyright-authors`：数据文件©原作者
* `other`：其他（描述中指定）* `unknown`：未知
* `CC-BY-4.0`: 	
https://creativecommons.org/licenses/by/4.0/
* `CC-BY-NC-4.0`：https://creativecommons.org/licenses/by-nc/4.0/
* `PDDL`：https://opendatacommons.org/licenses/pddl/1.0/
*`CC-BY-3.0`： 	
https://creativecommons.org/licenses/by/3.0/
*`CC-BY-3.0-IGO`： 	
https://creativecommons.org/licenses/by/3.0/igo/
* `US-Government-Works`: 	
https://www.usa.gov/government-works/
* `CC-BY-NC-SA-3.0-IGO`: 	
https://creativecommons.org/licenses/by-nc-sa/3.0/igo/
*`CDLA-Permissive-1.0`： 	
https://cdla.io/permissive-1-0/
*`CDLA-Sharing-1.0`： 	
https://cdla.io/sharing-1-0/
* `CC-BY-ND-4.0`: 	
https://creativecommons.org/licenses/by-nd/4.0/
* `CC-BY-NC-ND-4.0`: 	
https://creativecommons.org/licenses/by-nc-nd/4.0/
* `ODC-BY-1.0`: 	
https://opendatacommons.org/licenses/by/1-0/index.html
* `LGPL-3.0`: 	
http://www.gnu.org/licenses/lgpl-3.0.html
*`AGPL-3.0`： 	
http://www.gnu.org/licenses/agpl-3.0.html
*`FDL-1.3`： 	
http://www.gnu.org/licenses/fdl-1.3.html
* `EU-ODP-Legal-Notice`：https://ec.europa.eu/info/legal-notice_en
*`apache-2.0`： 	
https://www.apache.org/licenses/LICENSE-2.0
* `GPL-3.0`: [GPL 2](https://www.gnu.org/licenses/gpl-3.0.html)

## 数据类型
您可以指定以下数据类型
* `string`
* `boolean`
* `numeric`
* `datetime`
* `id`
* `uuid`
* `latitude`
* `longitude`
* `coordinates`
* `country`
* `province`（这些是美国的州）
* `postalcode`* `address`
* `email`
* `url`
* `integer`
* `decimal`
* `city`

## 预期更新频率
您可以为 `expectedUpdateFrequency` 指定以下值：
* `not specified`
* `never`
* `annually`
* `quarterly`
* `monthly`
* `weekly`
* `daily`
* `hourly`

## 图片
更新数据集图像的推荐方法是将名为 `dataset-cover-image.png`（或 `.jpg`、`.jpeg`、`.webp`）的文件作为 `datasets-metadata.json` 的同级文件。

示例：
- `/some/path/dataset-metadata.json`
- `/some/path/dataset-cover-image.png`

图像文件将仅用于数据集元数据，不会作为数据集中的文件上传。

### 使用相对路径指定图像
作为替代方案，您可以使用 `image` 属性提供从 `datasets-metadata.json` 到图像文件的相对路径来更新数据集图像。

如果您的文件位于：
- `/some/path/dataset-metadata.json`
- `/some/path/to/my-image.jpg`

该属性应指定为：
```
"image": "to/my-image.jpg"
```

### 支持的图像文件类型和预期尺寸

支持以下文件类型：

* `.png`
* `.jpg`
* `.jpeg`
* `.webp`

图像的最小宽度为 560 像素，最小高度为 280 像素。

相同的图像文件将用于两种不同的作物：

- 标头，2:1 比例
  - 裁剪矩形：宽度：560px，高度：280px，顶部：0，左侧：0- 对于尺寸为 560 像素 x 280 像素的图像，这将是整个矩形图像。
- 缩略图，1:1 比例
  - 裁剪矩形：宽度：280px，高度：280px，顶部：0，左侧：140px
  - 对于尺寸为 560 像素 x 280 像素的图像，这将是一个居中的 280 像素正方形。

虽然您可以上传大于 560 像素 x 280 像素的图像，但将应用上面指定的裁剪，这可能看起来不太好。这些裁剪始终可以在 kaggle.com 数据集设置页面的 UI 中进行编辑。