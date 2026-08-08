<!-- kaggle-docs: machine-translated zh-CN from English source -->

#kagglehub

`kagglehub` 库提供了一种与 Kaggle 资源交互的简单方法，例如 Python 中的数据集、模型、笔记本输出。

该库还与 Kaggle 笔记本环境原生集成。这意味着当您在 Kaggle 笔记本环境中使用 `kagglehub` 下载 Kaggle 资源时，行为会有所不同：

* 在 Kaggle 笔记本中：
    * 该资源会自动附加到您的 Kaggle 笔记本中。
    * 资源将显示在 Kaggle 笔记本编辑器的“输入”面板下。
    * 资源文件由共享的 Kaggle 资源缓存提供（不使用 VM 的磁盘）。
* Kaggle 笔记本之外：
    * 资源文件下载到本地[cache folder](#change-the-default-cache-folder)。

## 安装

使用 pip 安装 `kagglehub` 包：

```
pip install kagglehub
```

## 用法

### 验证

> [!注意]
> 在 Kaggle 笔记本中运行时，`kagglehub` 默认经过身份验证。

**仅**需要访问需要用户同意的公共资源或私有资源。

首先，您需要一个 Kaggle 帐户。您可以报名[here](https://www.kaggle.com/account/login)。

登录后，您可以通过单击“生成新令牌”按钮在 https://www.kaggle.com/settings/api 下载 Kaggle API 令牌。您有多种身份验证选项。请注意，如果您使用 `kaggle-api` （`kaggle` 命令行工具），您将拥有
已经配置了身份验证，可以跳过此步骤。

#### 选项 1：kagglehub.login()

这将提示您输入 Kaggle API 令牌：

```python
import kagglehub

kagglehub.login()
```

#### 选项 2：环境变量

您还可以选择将 Kaggle 令牌导出到环境中：

```sh
export KAGGLE_API_TOKEN=xxxxxxxxxxxxxx # Copied from the settings UI
```

#### 选项 3：API 令牌文件

将从 [Kaggle account API tokens settings page](https://www.kaggle.com/settings/api) 获取的 Kaggle API 令牌存储在`~/.kaggle/access_token` 的文件中。

#### 选项 4：Google Colab 秘密

将从 [Kaggle account API tokens settings page](https://www.kaggle.com/settings/api) 获取的 Kaggle API 令牌存储在名为 `KAGGLE_API_TOKEN` 的 Colab 密钥中。

有关在 Colab 和 Colab Enterprise 中添加机密的说明，请参阅[this article](https://www.googlecloudcommunity.com/gc/Cloud-Hub/How-do-I-add-secrets-in-Google-Colab-Enterprise/m-p/784866)。

#### 选项 5：旧版 API 凭证文件

在 [Kaggle account API tokens settings page](https://www.kaggle.com/settings/api) 的“旧版 API 凭证”下，单击“创建旧版 API 密钥”按钮以生成 `kaggle.json` 文件并将其存储在 `~/.kaggle/kaggle.json`。

### 下载模型

以下示例下载此 Kaggle 模型的 `answer-equivalence-bem` 变体：https://www.kaggle.com/models/google/bert/tensorFlow2/answer-equivalence-bem

```python
import kagglehub

# Download the latest version.
kagglehub.model_download('google/bert/tensorFlow2/answer-equivalence-bem')

# Download a specific version.
kagglehub.model_download('google/bert/tensorFlow2/answer-equivalence-bem/1')

# Download a single file.
kagglehub.model_download('google/bert/tensorFlow2/answer-equivalence-bem', path='variables/variables.index')

# Download a model or file, even if previously downloaded to cache.
kagglehub.model_download('google/bert/tensorFlow2/answer-equivalence-bem', force_download=True)

# Download to a custom local directory.
kagglehub.model_download('google/bert/tensorFlow2/answer-equivalence-bem', output_dir='./models')

# Overwrite an existing output directory.
kagglehub.model_download('google/bert/tensorFlow2/answer-equivalence-bem', output_dir='./models', force_download=True)
```

### 上传模型
上传新变体（如果已存在，则上传新变体的版本）。

```python
import kagglehub

# For example, to upload a new variation to this model:
# - https://www.kaggle.com/models/google/bert/tensorFlow2/answer-equivalence-bem
# 
# You would use the following handle: `google/bert/tensorFlow2/answer-equivalence-bem`
handle = '<KAGGLE_USERNAME>/<MODEL>/<FRAMEWORK>/<VARIATION>'
local_model_dir = 'path/to/local/model/dir'

kagglehub.model_upload(handle, local_model_dir)

# You can also specify some version notes (optional)
kagglehub.model_upload(handle, local_model_dir, version_notes='improved accuracy')

# You can also specify a license (optional)
kagglehub.model_upload(handle, local_model_dir, license_name='Apache 2.0')

# You can also specify a list of patterns for files/dirs to ignore.
# These patterns are combined with `kagglehub.models.DEFAULT_IGNORE_PATTERNS` 
# to determine which files and directories to exclude. 
# To ignore entire directories, include a trailing slash (/) in the pattern.
kagglehub.model_upload(handle, local_model_dir, ignore_patterns=["original/", "*.tmp"])
```

### 加载数据集根据所选的 `KaggleDatasetAdapter` 将文件从 Kaggle 数据集加载到 python 对象中：
- `KaggleDatasetAdapter.PANDAS` → [pandas DataFrame](https://pandas.pydata.org/docs/reference/frame.html)
  （或多个给定的某些文件/设置）
- `KaggleDatasetAdapter.HUGGING_FACE`→ 
  [Hugging Face Dataset](https://huggingface.co/docs/datasets/main/en/package_reference/main_classes#datasets.Dataset)
- `KaggleDatasetAdapter.POLARS` → 极地 [LazyFrame](https://docs.pola.rs/api/python/stable/reference/lazyframe/index.html) 或 [DataFrame](https://docs.pola.rs/api/python/stable/reference/dataframe/index.html)
  （或多个给定的某些文件/设置）

**注意：要使用这些适配器，您必须安装可选的依赖项（或者您的环境中已经有它们）**
- `KaggleDatasetAdapter.PANDAS` → `pip install kagglehub[pandas-datasets]`
- `KaggleDatasetAdapter.HUGGING_FACE`→ `pip install kagglehub[hf-datasets]`
- `KaggleDatasetAdapter.POLARS`→ `pip install kagglehub[polars-datasets]`

#### `KaggleDatasetAdapter.PANDAS`

该适配器支持以下文件类型，它们映射到相应的 `pandas.read_*` 方法：
|文件扩展名 | `pandas` 方法 |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| .csv、.tsv[^1] | .csv、.tsv[^1] | [⟦T47⟧](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html) |
| .json, .jsonl[^2] | .json, .jsonl[^2] | [⟦T48⟧](https://pandas.pydata.org/docs/reference/api/pandas.read_json.html) |
| .xml | [⟦T49⟧](https://pandas.pydata.org/docs/reference/api/pandas.read_xml.html) |
| .镶木地板| [⟦T50⟧](https://pandas.pydata.org/docs/reference/api/pandas.read_parquet.html) || .羽毛| [⟦T51⟧](https://pandas.pydata.org/docs/reference/api/pandas.read_feather.html) |
| .sqlite、.sqlite3、.db、.db3、.s3db、.dl3[^3] | [⟦T52⟧](https://pandas.pydata.org/docs/reference/api/pandas.read_sql_query.html) |
| .xls、.xlsx、.xlsm、.xlsb、.odf、.ods、.odt[^4] | [⟦T53⟧](https://pandas.pydata.org/docs/reference/api/pandas.read_excel.html) |

[^1]：对于 TSV 文件，会自动为 `sep` 参数提供 `\t`，但可能会被 `pandas_kwargs` 覆盖

[^2]：对于 JSONL 文件，为 `lines` 参数提供 `True`

[^3]：对于 SQLite 文件，必须提供 `sql_query` 才能生成 `DataFrame`

[^4]：特定的文件扩展名将指示需要安装哪个可选的`engine`依赖项才能读取文件

`dataset_load` 还支持 `pandas_kwargs` ，它将作为关键字参数传递给 `pandas.read_*` 方法。一些例子包括：

```python
import kagglehub
from kagglehub import KaggleDatasetAdapter

# Load a DataFrame with a specific version of a CSV
df = kagglehub.dataset_load(
    KaggleDatasetAdapter.PANDAS,
    "unsdsn/world-happiness/versions/1",
    "2016.csv",
)

# Load a DataFrame with specific columns from a parquet file
df = kagglehub.dataset_load(
    KaggleDatasetAdapter.PANDAS,
    "robikscube/textocr-text-extraction-from-images-dataset",
    "annot.parquet",
    pandas_kwargs={"columns": ["image_id", "bbox", "points", "area"]}
)

# Load a dictionary of DataFrames from an Excel file where the keys are sheet names 
# and the values are DataFrames for each sheet's data. NOTE: As written, this requires 
# installing the default openpyxl engine.
df_dict = kagglehub.dataset_load(
    KaggleDatasetAdapter.PANDAS,
    "theworldbank/education-statistics",
    "edstats-excel-zip-72-mb-/EdStatsEXCEL.xlsx",
    pandas_kwargs={"sheet_name": None},
)

# Load a DataFrame using an XML file (with the natively available etree parser)
df = dataset_load(
    KaggleDatasetAdapter.PANDAS,
    "parulpandey/covid19-clinical-trials-dataset",
    "COVID-19 CLinical trials studies/COVID-19 CLinical trials studies/NCT00571389.xml",
    pandas_kwargs={"parser": "etree"},
)

# Load a DataFrame by executing a SQL query against a SQLite DB
df = kagglehub.dataset_load(
    KaggleDatasetAdapter.PANDAS,
    "wyattowalsh/basketball",
    "nba.sqlite",
    sql_query="SELECT person_id, player_name FROM draft_history",
)
```

#### `KaggleDatasetAdapter.HUGGING_FACE`

该适配器提供的 Hugging Face `Dataset` 是专门使用 
[⟦T67⟧](https://huggingface.co/docs/datasets/main/en/package_reference/main_classes#datasets.Dataset.from_pandas)。 
因此，所有文件类型和`pandas_kwargs`支持都相同 
[⟦T69⟧](#kaggledatasetadapterpandas)。对此需要注意的一些重要事项：1. 由于 `Dataset.from_pandas` 无法接受 `DataFrame` 的集合，因此任何使用 `pandas_kwargs` 加载文件的尝试
   产生 `DataFrame` 集合将导致引发异常
2. 可以提供`hf_kwargs`，它将作为关键字参数传递给`Dataset.from_pandas`
2. 因为当不需要`pandas_kwargs`时，`pandas`的使用是透明的，所以我们默认为`preserve_index`使用`False`——这个 
   可以使用`hf_kwargs`覆盖

一些例子包括：

```python
import kagglehub
from kagglehub import KaggleDatasetAdapter
# Load a Dataset with a specific version of a CSV, then remove a column
dataset = kagglehub.dataset_load(
    KaggleDatasetAdapter.HUGGING_FACE,
    "unsdsn/world-happiness/versions/1",
    "2016.csv",
)
dataset = dataset.remove_columns('Region')

# Load a Dataset with specific columns from a parquet file, then split into test/train splits
dataset = kagglehub.dataset_load(
    KaggleDatasetAdapter.HUGGING_FACE,
    "robikscube/textocr-text-extraction-from-images-dataset",
    "annot.parquet",
    pandas_kwargs={"columns": ["image_id", "bbox", "points", "area"]}
)
dataset_with_splits = dataset.train_test_split(test_size=0.8, train_size=0.2)

# Load a Dataset by executing a SQL query against a SQLite DB, then rename a column
dataset = kagglehub.dataset_load(
    KaggleDatasetAdapter.HUGGING_FACE,
    "wyattowalsh/basketball",
    "nba.sqlite",
    sql_query="SELECT person_id, player_name FROM draft_history",
)
dataset = dataset.rename_column('season', 'year')
```

#### `KaggleDatasetAdapter.POLARS`

此适配器支持以下文件类型，它们映射到相应的 `polars.scan_*` 或 `polars.read_*` 方法：
|文件扩展名 | `polars` 方法 |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .csv、.tsv[^1] | .csv、.tsv[^1] | [⟦T85⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.scan_csv.html#polars.scan_csv) 或 [⟦T86⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.read_csv.html) || .json | [⟦T87⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.read_json.html) |
| .jsonl | [⟦T88⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.scan_ndjson.html) 或 [⟦T89⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.read_ndjson.html) |
| .镶木地板| [⟦T90⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.scan_parquet.html) 或 [⟦T91⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.read_parquet.html) |
| .羽毛| [⟦T92⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.scan_ipc.html) 或 [⟦T93⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.read_ipc.html) |
| .sqlite、.sqlite3、.db、.db3、.s3db、.dl3[^2] | [⟦T94⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.read_database.html) |
| .xls、.xlsx、.xlsm、.xlsb、.odf、.ods、.odt[^3] | [⟦T95⟧](https://docs.pola.rs/api/python/stable/reference/api/polars.read_excel.html) |

[^1]：对于 TSV 文件，会自动为 `separator` 参数提供 `\t`，但可能会被 `polars_kwargs` 覆盖

[^2]：对于 SQLite 文件，必须提供 `sql_query` 才能生成 `DataFrame`

[^3]：特定的文件扩展名可能指示需要安装哪个可选的`engine`依赖项才能读取文件

`dataset_load` 还支持 `polars_kwargs` ，它将作为关键字参数传递给 `polars.scan_*` 或 `polars_read_*` 方法。

##### `LazyFrame` 与 `DataFrame`根据 Polars 文档，[LazyFrame](https://docs.pola.rs/api/python/stable/reference/lazyframe/index.html)“除了并行性之外还允许进行整个查询优化，并且是 Polars 的首选（也是最高性能）操作模式。”因此，只要可能，默认情况下都会使用 `scan_*` 方法，而如果不可能，则在调用 [⟦T110⟧](https://docs.pola.rs/api/python/stable/reference/dataframe/api/polars.DataFrame.lazy.html) 后返回 `read_*` 方法的结果。如果首选 [DataFrame](https://docs.pola.rs/api/python/stable/reference/dataframe/index.html)，`dataset_load` 支持可选的 `polars_frame_type`，并且可以传入 `PolarsFrameType.DATA_FRAME`。这将强制使用 `read_*` 方法，而不调用 `.lazy()`。 **注意：** 对于支持 `scan_*` 的文件类型，更改 `polars_frame_type` 可能会影响底层方法可接受的 `polars_kwargs`，因为它将强制使用 `read_*` 方法而不是 `scan_*` 方法。

一些例子包括：

```python
import kagglehub
from kagglehub import KaggleDatasetAdapter, PolarsFrameType

# Load a LazyFrame with a specific version of a CSV
lf = kagglehub.dataset_load(
    KaggleDatasetAdapter.POLARS,
    "unsdsn/world-happiness/versions/1",
    "2016.csv",
)

# Load a LazyFramefrom a parquet file, then select specific columns
lf = kagglehub.dataset_load(
    KaggleDatasetAdapter.POLARS,
    "robikscube/textocr-text-extraction-from-images-dataset",
    "annot.parquet",
)
lf.select(["image_id", "bbox", "points", "area"]).collect()

# Load a DataFrame with specific columns from a parquet file
df = kagglehub.dataset_load(
    KaggleDatasetAdapter.POLARS,
    "robikscube/textocr-text-extraction-from-images-dataset",
    "annot.parquet",
    polars_frame_type=PolarsFrameType.DATA_FRAME,
    polars_kwargs={"columns": ["image_id", "bbox", "points", "area"]}
)

# Load a dictionary of LazyFrames from an Excel file where the keys are sheet names 
# and the values are LazyFrames for each sheet's data. NOTE: As written, this requires 
# installing the default fastexcel engine.
lf_dict = kagglehub.dataset_load(
    KaggleDatasetAdapter.POLARS,
    "theworldbank/education-statistics",
    "edstats-excel-zip-72-mb-/EdStatsEXCEL.xlsx",
    # sheet_id of 0 returns all sheets
    polars_kwargs={"sheet_id": 0},
)

# Load a LazyFrame by executing a SQL query against a SQLite DB
lf = kagglehub.dataset_load(
    KaggleDatasetAdapter.POLARS,
    "wyattowalsh/basketball",
    "nba.sqlite",
    sql_query="SELECT person_id, player_name FROM draft_history",
)
```

### 下载数据集

以下示例下载 `Spotify Recommendation` Kaggle 数据集：https://www.kaggle.com/datasets/bricevergnou/spotify-recommendation

```python
import kagglehub

# Download the latest version.
kagglehub.dataset_download('bricevergnou/spotify-recommendation')

# Download a specific version.
kagglehub.dataset_download('bricevergnou/spotify-recommendation/versions/1')

# Download a single file.
kagglehub.dataset_download('bricevergnou/spotify-recommendation', path='data.csv')

# Download one directory while preserving its nested structure.
kagglehub.dataset_download(
    'moltean/fruits/versions/99',
    path='fruits-360_meta/fruits-360-meta/Papers',
)

# Download a dataset, directory, or file, even if previously downloaded to cache.
kagglehub.dataset_download('bricevergnou/spotify-recommendation', force_download=True)

# Download a dataset to a custom output directory.
kagglehub.dataset_download('bricevergnou/spotify-recommendation', output_dir='./data')

# Download a single file to a custom output directory.
kagglehub.dataset_download('bricevergnou/spotify-recommendation', path='data.csv', output_dir='./data')

# Overwrite an existing output directory.
kagglehub.dataset_download('bricevergnou/spotify-recommendation', output_dir='./data', force_download=True)
```

### 上传数据集

上传新数据集（如果已存在，则上传新版本）。

```python
import kagglehub

# For example, to upload a new dataset (or version) at:
# - https://www.kaggle.com/datasets/bricevergnou/spotify-recommendation
# 
# You would use the following handle: `bricevergnou/spotify-recommendation`
handle = '<KAGGLE_USERNAME>/<DATASET>'
local_dataset_dir = 'path/to/local/dataset/dir'

# Create a new dataset
kagglehub.dataset_upload(handle, local_dataset_dir)

# You can then create a new version of this existing dataset and include version notes (optional).
kagglehub.dataset_upload(handle, local_dataset_dir, version_notes='improved data')

# You can also specify a list of patterns for files/dirs to ignore.
# These patterns are combined with `kagglehub.datasets.DEFAULT_IGNORE_PATTERNS` 
# to determine which files and directories to exclude. 
# To ignore entire directories, include a trailing slash (/) in the pattern.
kagglehub.dataset_upload(handle, local_dataset_dir, ignore_patterns=["original/", "*.tmp"])
```

### 下载竞赛

以下示例下载 `Digit Recognizer` Kaggle 竞赛：https://www.kaggle.com/competitions/digit-recognizer

```python
import kagglehub

# Download the latest version.
kagglehub.competition_download('digit-recognizer')

# Download a single file.
kagglehub.competition_download('digit-recognizer', path='train.csv')

# Download a competition or file, even if previously downloaded to cache. 
kagglehub.competition_download('digit-recognizer', force_download=True)

# Download competition data to a custom output directory.
kagglehub.competition_download('digit-recognizer', output_dir='./competition')

# Overwrite an existing output directory.
kagglehub.competition_download('digit-recognizer', output_dir='./competition', force_download=True)
```

### 下载笔记本输出以下示例下载 `Titanic Tutorial` 笔记本输出：https://www.kaggle.com/code/alexisbcook/titanic-tutorial

```python
import kagglehub

# Download the latest version.
kagglehub.notebook_output_download('alexisbcook/titanic-tutorial')

# Download a specific version of the notebook output.
kagglehub.notebook_output_download('alexisbcook/titanic-tutorial/versions/1')

# Download a single file.
kagglehub.notebook_output_download('alexisbcook/titanic-tutorial', path='submission.csv')

# Download notebook output to a custom output directory.
kagglehub.notebook_output_download('alexisbcook/titanic-tutorial', output_dir='./output')

# Overwrite an existing output directory.
kagglehub.notebook_output_download('alexisbcook/titanic-tutorial', output_dir='./output', force_download=True)
```

### 安装实用脚本

以下示例安装实用程序脚本 `Physionet Challenge Utility Script` 实用程序脚本：https://www.kaggle.com/code/bjoernjostein/physionet-challenge-utility-script。使用此命令允许此脚本中的代码在您的 python 环境中可用。

```python
import kagglehub

# Install the latest version.
kagglehub.utility_script_install('bjoernjostein/physionet-challenge-utility-script')

```

### 选项

#### 更改默认缓存文件夹

默认情况下，`kagglehub` 将文件下载到位于 `~/.cache/kagglehub/` 的主文件夹中。

您可以通过设置 `KAGGLEHUB_CACHE` 环境变量来覆盖此路径。

## 发展

### 先决条件

我们使用[hatch](https://hatch.pypa.io)来管理这个项目。

按照这些[instructions](https://hatch.pypa.io/latest/install/)进行安装。

### 测试

```sh
# Run all tests for current Python version.
hatch test

# Run all tests for all Python versions.
hatch test --all

# Run all tests for a specific Python version.
hatch test -py 3.11

# Run a single test file
hatch test tests/test_<SOME_FILE>.py
```

### 集成测试

要在本地计算机上运行集成测试，您需要设置 Kaggle API 凭据。您可以通过本文档前面部分中描述的两种方法之一来执行此操作。请参阅以下部分： 
- [Using environment variables](#option-2-read-credentials-from-environment-variables)
- [Using credentials file](#option-3-read-credentials-from-kagglejson)

通过任何这些方法设置凭据后，您可以运行集成测试，如下所示：

```sh
# Run all tests
hatch test integration_tests
```


### 从源代码运行`kagglehub`

#### 选项 1：从命令行执行一行代码

```sh
# Download a model & print the path
hatch run python -c "import kagglehub; print('path: ', kagglehub.model_download('google/bert/tensorFlow2/answer-equivalence-bem'))"
```#### 选项 2：从 /tools/scripts 目录运行保存的脚本

```sh
# This runs the same code as the one-liner above, but reads it from a 
# checked in script located at tool/scripts/download_model.py
hatch run python tools/scripts/download_model.py
```

#### 选项 3：从存储库的根目录运行临时脚本

在存储库根目录创建的任何脚本都是 gitignore 的，因此它们是
只是用于开发中测试的临时脚本。临时放置 
根目录下的脚本使得运行命令在本地更容易使用 
发展。

```sh
# Test out some new changes
hatch run python test_new_feature.py
```

### Lint / 格式

```sh
# Lint check
hatch run lint:style
hatch run lint:typing
hatch run lint:all     # for both

# Format
hatch run lint:fmt
```

### 覆盖率报告

```sh
hatch test --cover
```

### 构建

```sh
hatch build
```

### 在 Docker 内运行 `hatch` 命令

这对于在一致的环境中运行并在 Python 版本之间轻松切换非常有用。

下面显示了如何运行 `hatch run lint:all`，但这也适用于任何其他填充命令：

```
# Use default Python version
./docker-hatch run lint:all

# Use specific Python version (Must be a valid tag from: https://hub.docker.com/_/python)
./docker-hatch -v 3.10 run lint:all

# Run test in docker with specific Python version
./docker-hatch -v 3.10 test

# Run python from specific environment (e.g. one with optional dependencies installed)
./docker-hatch run extra-deps-env:python -c "print('hello world')"

# Run commands with other root-level hatch options (everything after -- gets passed to hatch)
./docker-hatch -v 3.10 -- -v env create debug-env-with-verbose-logging
```

## VS 代码设置

### 先决条件
安装推荐的扩展。

### 说明

配置孵化以在项目文件夹中创建虚拟环境。
```
hatch config set dirs.env.virtual .env
```

之后，创建运行`hatch test --all`所需的所有Python环境。

最后，配置 vscode 以使用选定的环境之一：
`cmd + shift + p` -> `python: Select Interpreter` -> 选择 `./.env` 中的文件夹之一

## 支持kagglehub 库已为控制台配置了自动日志记录。对于基于文件的日志记录，设置 `KAGGLE_LOGGING_ENABLED=1` 环境变量会将日志输出到目录。默认日志目标通过 [os.path.expanduser](https://docs.python.org/3/library/os.path.html#os.path.expanduser) 解析

下表包含可能的位置：
|操作系统 |日志路径 |
| -------- | ------------------------------------------------ |
|操作系统 | /user/$USERNAME/.kaggle/logs/kagglehub.log | /user/$USERNAME/.kaggle/logs/kagglehub.log |
| linux | 〜/.kaggle/logs/kagglehub.log |
|窗户 | C:\Users\\%USERNAME%\\.kaggle\logs\kagglehub.log |

如果需要，可以使用以下环境变量覆盖根日志目录：`KAGGLE_LOGGING_ROOT_DIR`

请包含日志以帮助解决问题。

## 贡献

如果您想为`kagglehub`做出贡献，请务必查看[CONTRIBUTING.md](CONTRIBUTING.md)。