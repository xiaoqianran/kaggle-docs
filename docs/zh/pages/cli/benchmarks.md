<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 基准测试命令

用于与 Kaggle 基准交互的命令。基准允许您将评估任务定义为 Python 脚本，通过 Kaggle 模型代理针对一个或多个 LLM 模型运行它们，并下载结果。

顶级命令是`kaggle benchmarks`（别名：`kaggle b`），它具有以下子命令和组：

* **`auth`** — 获取模型代理凭据。
* **`init`** — 获取本地开发的凭据和默认环境变量。
* **`quota`** — 显示您的模型代理（AI 推理）支出配额。
* **`leaderboard`** — 获取基准排行榜信息。
* **`tasks`**（别名：`t`）— 管理基准测试任务（推送、运行、列表、状态、下载、日志、模型、删除、发布）。
* **`topics`** — 浏览讨论主题以获取基准。

## `kaggle benchmarks auth`

获取模型代理令牌并将凭证环境变量保存到文件中。

**用途：**

```bash
kaggle benchmarks auth [options]
```

**选项：**

* `-y, --yes`：自动确认，不提示。
* `--env-file <FILE>`：写入环境变量的文件（默认：`.env`）。

**示例：**

将模型代理凭据写入默认的 `.env` 文件，并自动确认：

```bash
kaggle b auth -y
```

**目的：**此命令从 Kaggle 获取短期模型代理 API 密钥和 URL，并将它们附加到您的环境文件中。写入的变量有：

* `MODEL_PROXY_URL`
* `MODEL_PROXY_API_KEY`
* `MODEL_PROXY_EXPIRY_TIME`

## `kaggle benchmarks init`

获取模型代理凭据**和**对本地基准测试开发有用的其他默认环境变量。还生成一个入门示例任务文件和一个语法参考文档。

**用途：**

```bash
kaggle benchmarks init [options]
```

**选项：**

* `-y, --yes`：自动确认，不提示。
* `--env-file <FILE>`：写入环境变量的文件（默认：`.env`）。
* `--example-file <FILE>`：用于写入示例基准测试任务的文件（默认值：`example_task.py`）。

**示例：**

1. 使用默认值进行初始化（写入 `.env`、`example_task.py` 和 `kaggle_benchmarks_reference.md`）：

    ```bash
    kaggle b init -y
    ```

2. 使用自定义环境文件和示例文件进行初始化：

    ```bash
    kaggle b init -y --env-file my_project/.env --example-file my_project/my_task.py
    ```

**目的：**

除了`auth`写入的三个凭证变量之外，`init`还写入：

* `LLM_DEFAULT` — 任务的默认模型 slug。
* `LLM_DEFAULT_EVAL` — 用于评估的默认模型段。
* `LLMS_AVAILABLE` — 可用模型段的逗号分隔列表。> [!警告]
> `LLMS_AVAILABLE` 是用于本地开发和测试的精选模型子集 - 它**不是**可用模型的完整集合，并且为本地开发铸造的模型代理代币**仅限于这些模型。要查看所有可用型号，请使用`kaggle benchmarks tasks models`。要针对任何模型（包括那些不在`LLMS_AVAILABLE`中的模型）运行任务，请使用`kaggle benchmarks tasks run`，它在 Kaggle 的基础设施上执行，可以访问完整的模型目录。

`init` 还在示例文件旁边创建了两个文件：

* **`example_task.py`**（或通过 `--example-file` 自定义名称） - 一个入门 Python 脚本，演示如何使用 `@task` 装饰器和 `kaggle_benchmarks` 库定义基准测试任务。
* **`kaggle_benchmarks_reference.md`** — `kaggle-benchmarks` 任务 API 的语法参考文档。

如果任一文件已存在，则会跳过该文件而不进行覆盖。

---

## `kaggle benchmarks quota`

显示您当前的模型代理（AI 推理）支出配额，每个补充周期一行。

**用途：**

```bash
kaggle benchmarks quota [options]
```

**选项：**

* `-v, --csv`：以 CSV 格式打印结果。
* `--format <FORMAT>`：以所选格式打印结果（`csv`、`table`、`json`）。

**示例：**

```bash
$ kaggle b quota
period   used    remaining  total    refillAt
-------  ------  ---------  -------  -------------------------
Daily    $1.20   $3.80      $5.00    2026-08-08T00:00:00+00:00
Monthly  $14.50  $85.50     $100.00  2026-09-01T00:00:00+00:00
```

**目的：**金额以美元为单位，反映通过模型代理的推理支出 - 这与顶级 `kaggle quota` 命令分开，该命令报告每周 GPU 和 TPU 加速器*小时*。 `remaining` 派生为 `total - used` 并固定在 `$0.00`，因此超额显示为剩余零，而不是负余额。

---

## `kaggle benchmarks leaderboard`

获取基准排行榜信息。

**用途：**

```bash
kaggle benchmarks leaderboard <BENCHMARK> [options]
```

**参数：**

* `<BENCHMARK>`：基准段（例如，`owner/benchmark-slug`）。

**选项：**

* `--version <VERSION>`：基准版本（可选）。
* `-s, --show`：在终端中显示排行榜。
* `-d, --download`：以 CSV 文件形式下载排行榜。
* `-p, --path <DIRECTORY>`：下载排行榜的文件夹（默认为当前工作目录）。
* `-v, --csv`：以 CSV 格式打印结果（与`--show` 一起使用时）。
* `--format <FORMAT>`：以特定格式打印结果（例如`json`）。

**示例：**

1. 显示基准排行榜：

    ```bash
    kaggle b leaderboard owner/my-benchmark --show
    ```

2. 下载 CSV 格式的排行榜：

    ```bash
    kaggle b leaderboard owner/my-benchmark --download
    ```

3.以JSON格式显示特定版本的排行榜：

    ```bash
    kaggle b leaderboard owner/my-benchmark --version 2 --show --format json
    ```

**目的：**显示或下载已在指定基准测试中运行任务的所有模型的评估结果。排行榜以表格形式表示，其中行是模型版本，列是基准任务，显示每个模型在每个任务上取得的分数。

---

## 任务命令

所有任务命令都位于`kaggle benchmarks tasks`（别名：`kaggle b t`）下。

### 任务名称格式

任务参数（`<TASK>`）支持两种格式：

* **Bare slug** (`my-task`)：指当前用户拥有的任务。
* **所有者前缀** (`owner/my-task`)：指特定所有者的任务（例如，另一个用户的公共任务，或`your-username/my-task`）。

|指挥组|支持的格式 |描述 |
|---|---|---|
| **查看并运行** (`run`、`status`、`download`、`log`) | `my-task`、`owner/my-task` |与您自己的任务或其他用户的公共任务进行交互 |
| **发布** (`publish`) | `my-task`、`your-username/my-task` |公开您自己的任务（必须是任务所有者） |
| **创建** (`push`) |仅`my-task` |必须与 Python 源文件中的 `@task(name="...")` 装饰器匹配 |> **Slug 标准化：** 任务名称自动转换为 URL 安全的 slug (`My Task` → `my-task`)。对于 `owner/task` 参数，每个段都是独立的 slugified (`Owner/My Task` → `owner/my-task`)，因此`/` 分隔符被保留。

### `kaggle benchmarks tasks push`

从本地 Python 源文件创建或更新基准测试任务。该文件必须至少包含一个用`@task`修饰的函数。

**用途：**

```bash
kaggle benchmarks tasks push <TASK> -f <FILE> [options]
```

**参数：**

* `<TASK>`：任务名称。自动标准化为 URL 安全的 slug（例如，`my_task` 或 `My Task` 变为 `my-task`）。

**选项：**

* `-f, --file <FILE>` *（必需）*：定义任务的源 Python 文件的路径。
* `--wait [TIMEOUT]`：等待任务创建完成。可以选择指定超时（以秒为单位）（`0` 或省略值 = 无限期等待）。
* `--poll-interval <SECONDS>`：状态轮询之间的最大秒数（默认值：`60`）。轮询从 5 秒开始，每次迭代增加 50%，直到达到该值。
* `-v, --verbose`：启用详细轮询日志。
* `-d, --kaggle-dataset <DATASET>`：附加到任务底层笔记本的 Kaggle 数据集（格式：`owner/dataset-slug`）。对多个数据集重复此操作（例如`-d kaggle/titanic -d user/my-dataset`）。默认安装在`/kaggle/input/<dataset-slug>/`。如果发生命名冲突，则使用完全限定的安装路径`/kaggle/input/<owner>/<dataset-slug>/`。


**示例：**1.推送任务并立即返回：

    ```bash
    kaggle b t push my-task -f benchmark.py
    ```

2. 推送任务并等待创建完成：

    ```bash
    kaggle b t push my-task -f benchmark.py --wait
    ```

3. 推送任务并等待 60 秒超时，每 5 秒轮询一次：
 
     ```bash
     kaggle b t push my-task -f benchmark.py --wait 60 --poll-interval 5
     ```
 
4. 推送附加了 Kaggle 数据集的任务：
 
     ```bash
     kaggle b t push my-task -f benchmark.py -d kaggle/titanic -d user/my-dataset
     ```
 
5. 推送带有数据集的任务并等待：
 
     ```bash
     kaggle b t push my-task -f benchmark.py --wait -d kaggle/titanic
     ```

**目的：**

该命令读取`.py`文件，将其转换为Jupyter笔记本格式，并将其上传到Kaggle作为基准任务。如果具有相同 slug 的任务已存在，则会创建新版本。该文件经过验证，以确保它包含与给定任务名称匹配的 `@task` 装饰器。
 
> [!注意]
> **关于数据集附件：** 当指定 `--kaggle-dataset` / `-d` 时，列出的数据集将附加到任务的底层笔记本内核。在执行期间，默认情况下可以在 `/kaggle/input/<dataset-slug>/` 访问它们，如果发生命名冲突，则回退到 `/kaggle/input/<owner>/<dataset-slug>/`。如果您在没有 `-d` 的情况下重新推送，则所有先前附加的数据集都将被分离（打印警告）。要在推送过程中保留数据集，请每次都重新指定它们。如果任何指定的数据集无效、不存在或无法访问，则推送命令将**失败**并显示错误：`Failed to push task: Failed to attach the following data sources (not found or inaccessible): <dataset>`。

---

### `kaggle benchmarks tasks run`针对一个或多个模型运行之前推送的任务。

**用途：**

```bash
kaggle benchmarks tasks run <TASK> [options]
```

**参数：**

* `<TASK>`：任务名称（slug，例如`my-task`或`owner/my-task`）。

**选项：**

* `-m, --model <MODEL>`：要运行的模型子弹（例如`gemini-2.5-pro`）。对多个型号重复此操作（例如`-m gemini-2.5-pro -m claude-sonnet-4`）。如果省略，将显示交互式模型选择器。
* `--wait [TIMEOUT]`：等待运行完成。可以选择指定超时（以秒为单位）（`0` 或省略值 = 无限期等待）。
* `--poll-interval <SECONDS>`：状态轮询之间的最大秒数（默认值：`60`）。轮询从 5 秒开始，每次迭代增加 50%，直到达到该值。
* `-v, --verbose`：启用详细轮询日志。

**示例：**

1. 运行带有交互式模型选择的任务：

    ```bash
    kaggle b t run my-task
    ```

2. 针对特定模型运行任务：

    ```bash
    kaggle b t run my-task -m gemini-2.5-pro -m claude-sonnet-4
    ```

3. 运行任务并等待所有运行完成：

    ```bash
    kaggle b t run my-task -m gemini-2.5-pro --wait
    ```

**目的：**

此命令安排服务器上的基准测试运行。任务必须处于 `COMPLETED` 创建状态才能运行。如果未指定模型，CLI 将显示可用模型的分页列表以供交互式选择。

---

### `kaggle benchmarks tasks list`

列出当前用户拥有的基准测试任务。

**用途：**

```bash
kaggle benchmarks tasks list [options]
```

**选项：*** `--name-regex <REGEX>`：通过正则表达式过滤任务名称。
* `--status <STATUS>`：按创建状态过滤任务。有效值：`queued`、`running`、`completed`、`errored`。

**示例：**

1. 列出您的所有任务：

    ```bash
    kaggle b t list
    ```

2.仅列出名称中包含“gemini”的已完成任务：

    ```bash
    kaggle b t list --name-regex gemini --status completed
    ```

**目的：**

显示基准测试任务表，其中显示任务 slug、当前版本（或 `unset`，如果不可用）、创建状态和创建时间戳。

---

### `kaggle benchmarks tasks status`

显示任务详细信息和每个模型的运行状态。

**用途：**

```bash
kaggle benchmarks tasks status <TASK> [options]
```

**参数：**

* `<TASK>`：任务名称（slug，例如 `my-task` 或 `owner/my-task`）。

**选项：**

* `-m, --model <MODEL>`：将运行表过滤为特定模型段（例如`gemini-2.5-pro`）。对多个模型重复此操作。

**示例：**

1. 显示任务的完整状态：

    ```bash
    kaggle b t status my-task
    ```

2. 显示其他用户任务的状态：

    ```bash
    kaggle b t status someuser/their-task
    ```

3. 仅显示特定型号的状态：

    ```bash
    kaggle b t status my-task -m gemini-2.5-pro
    ```

**目的：**

打印任务的元数据（slug、创建状态、创建时间、URL），后跟所有运行的表格。每个运行行显示模型名称、运行状态、开始时间和结束时间。任何错误的运行都会在表格下方显示其错误消息。如果任务创建本身失败，`Status:`行显示失败*kind* - 已清理的创建状态枚举，标题大小写（例如`Kernel_Without_Run`，`No_Model_Specified`，`Validation_Failed`，`Errored`） - 并且在其下方附加一个`Error:`行，其中包含服务器提供的`creation_error_message` 解释出了什么问题。

---

### `kaggle benchmarks tasks download`

下载已完成的基准测试运行的输出文件。

**用途：**

```bash
kaggle benchmarks tasks download <TASK> [options]
```

**参数：**

* `<TASK>`：任务名称（slug，例如`my-task`或`owner/my-task`）。

**选项：**

* `-m, --model <MODEL>`：仅下载特定模型段的输出（例如`gemini-2.5-pro`）。对多个模型重复此操作。
* `-o, --output <DIRECTORY>`：将输出文件下载到的目录（默认为当前工作目录）。
* `-s, --include-source`：同时下载内核会话的源笔记本。
* `-f, --force`：强制重新下载已完成的运行，覆盖本地文件。

**示例：**

1. 下载任务的所有已完成的运行输出：

    ```bash
    kaggle b t download my-task
    ```

2. 从另一个用户的公共任务下载输出：

    ```bash
    kaggle b t download someuser/their-task
    ```

3. 将特定模型的输出下载到自定义目录中：

    ```bash
    kaggle b t download my-task -m gemini-2.5-pro -o ./results
    ```

4. 下载包含源笔记本的输出：

    ```bash
    kaggle b t download my-task --include-source
    ```

5. 强制重新下载之前下载的运行：

    ```bash
    kaggle b t download my-task --force
    ```

**目的：**下载并解压每次完成的运行的输出 zip 存档。文件以分层布局进行组织，其中包括任务的版本号（或`unset`，如果不可用）：

```
<output>/<task>/<version>/<model>/<run_id>/
   ├── output files...
```

进度呈现为每次运行一行的表格：

```
Model                File                                     Size       Progress
──────────────────── ──────────────────────────────────────── ────────── ──────────
gemini-2.5-pro       gemini-2.5-pro/12345/                    1.24MB     Done
claude-sonnet-4      claude-sonnet-4/12346/                   2.10MB     Cached
```

`Size` 列报告提取的运行输出目录的磁盘大小。 `Progress` 列是`Done`（新下载的）、`Cached`（先前下载的磁盘上已存在的输出目录）或`Bad zip`（下载的存档已损坏）之一。

已下载的运行（输出目录存在的位置）将自动跳过 - 它们显示为 `Cached` 行 - 除非使用 `-f` / `--force` 标志，在这种情况下它们将被覆盖。

当使用`--include-source`时，下载的zip还包含内核会话的源文件（例如，`__notebook__.ipynb`和`__notebook_source__.ipynb`）。

如果在上次下载省略了源笔记本后重新使用 `-s` 运行，则不会重新获取缓存的目录，并且 `-s` 标志将被有效忽略。 CLI 检测到这一点并在摘要后打印提示：

```
Tip: 2 cached run(s) lack source notebooks. Re-run with -f -s to fetch them.
```

一起使用 `-f -s` 强制重新下载源笔记本并将其回填到缓存的运行中。

---

### `kaggle benchmarks tasks log`获取基准任务运行的执行日志。

**用途：**

```bash
kaggle benchmarks tasks log <TASK> [options]
```

**参数：**

* `<TASK>`：任务名称（slug，例如`my-task`或`owner/my-task`）。

**选项：**

* `-m, --model <MODEL>`：将日志过滤到特定模型段（例如`gemini-2.5-pro`）。对多个模型重复此操作。如果省略，则显示所有运行的日志。

**别名：** `log`、`logs`

**示例：**

1. 显示任务所有运行的日志：

    ```bash
    kaggle b t log my-task
    ```

2. 显示其他用户任务的日志：

    ```bash
    kaggle b t log someuser/their-task
    ```

3. 显示特定模型运行的日志：

    ```bash
    kaggle b t log my-task -m gemini-2.5-pro
    ```

4. 显示多个模型的日志：

    ```bash
    kaggle b t logs my-task -m gemini-2.5-pro -m claude-sonnet-4
    ```

**目的：**

获取并显示基准任务运行的执行日志。每次运行的日志都打印有结构化的页眉和页脚，以便清晰识别：

```
═══ Logs for gemini-2.5-pro (Run 123) [COMPLETED] ═══
<log output>
═══ (42 lines) ═══

═══ Logs for claude-sonnet-4 (Run 456) [ERRORED] ═══
<log output>
═══ (18 lines) ═══

Showed logs for 2 run(s) across 2 model(s).
```

* **标题**：显示模型名称、运行 ID 和运行状态（`COMPLETED`、`ERRORED`、`RUNNING` 等）。
* **页脚**：显示每次运行日志输出的行数。
* **摘要**：最后打印总运行数和模型数。

该命令处理来自服务器的两种响应类型：

* **主动运行**：日志通过服务器发送事件 (SSE) 实时传输。
* **完成的运行**：返回并打印持久化日志文件。

### 并发和流顺序查看多个并发模型运行的日志时，CLI 会**按顺序**处理并输出它们，以防止日志交错和混淆终端输出：
1. CLI 打印队列中第一个运行模型的标头。
2. 如果该运行当前处于活动状态，则 CLI 会阻止并通过 SSE 实时传输其日志输出，直至其完成。
3. 只有在上一个模型运行的日志流完成并关闭后，才会打印下一个模型运行的日志输出。
4. 当您观看第一个流时，任何在后台完成的模型运行一旦到达序列中的轮次，就会立即打印为已完成的持久日志。

### 模型段标准化

基准模型名称在输入和输出上自动标准化。这使得可以轻松地互换传递各种格式，同时保持显示和目录干净。* **灵活输入**：CLI 接受多种格式的型号名称：
    * **规范 Slug（推荐）**：`gemini-2.5-pro` 或 `claude-sonnet-4`
    * **带有提供商前缀**：`google/gemini-2.5-pro` 或 `anthropic/claude-sonnet-4`
    * **使用版本/代理 `@` 符号**：`anthropic/claude-haiku-4-5@20251001` 或 `claude-sonnet-4-6@default`
* **统一规范化**：客户端自动删除任何提供者前缀（例如，`google/`或`anthropic/`）并用`-`替换`@`字符以匹配服务器的规范数据库slug格式。
* **干净的输出**：
    * **状态显示**：表格和错误日志显示规范的、带连字符的 slugs（例如，`claude-haiku-4-5-20251001` 和 `gemini-2.0-flash-lite-001`）以提高可读性。
    * **分层下载**：使用规范的 slugs（例如 `./<task>/<version>/claude-haiku-4-5-20251001/<run_id>/`）将运行输出提取到干净的文件夹中，文件夹名称中没有 `@` 或 `/` 符号。

---

### `kaggle benchmarks tasks models`

列出所有可用的基准模型。

**用途：**

```bash
kaggle benchmarks tasks models
```

**示例：**

```bash
kaggle b t models
```

**目的：**

打印可用于基准运行的所有模型的表格，显示每个模型的 slug 和显示名称。这对于发现传递给 `run`、`status` 或 `download` 命令的有效模型段很有用。

---

### `kaggle benchmarks tasks delete`

删除基准测试任务。

**用途：**

```bash
kaggle benchmarks tasks delete <TASK> [options]
```

**参数：*** `<TASK>`：任务名称（slug，例如`my-task`或`owner/my-task`）。

**选项：**

* `-y, --yes`：自动确认删除，不提示。

**示例：**

```bash
kaggle b t delete my-task -y
```

**目的：**

删除基准测试任务和所有关联的运行。 **注意：** 服务器尚不支持该命令。
 
---
 
### `kaggle benchmarks tasks publish`
 
发布基准测试任务，使其公开可见。默认情况下，还会发布支持笔记本。
 
**用途：**
 
```bash
kaggle benchmarks tasks publish <TASK> [options]
```
 
**参数：**
 
* `<TASK>`：任务名称（slug，例如`my-task`或`owner/my-task`）。
 
**选项：**
 
* `--no-publish-backing-notebook`：不发布支持笔记本（默认发布）。
 
**示例：**
 
1. 发布任务及其支持笔记本（默认）：
 
    ```bash
    kaggle b t publish my-task
    ```
 
2. 发布没有其支持笔记本的任务：
 
    ```bash
    kaggle b t publish my-task --no-publish-backing-notebook
    ```
 
**目的：**
 
此命令将任务的可见性从私有更改为公开。默认情况下，还会发布支持笔记本（与任务关联的内核）。使用`--no-publish-backing-notebook`仅发布任务元数据。发布是幂等的——重新发布已经公开的任务会打印一条消息并成功返回。不支持通过此命令取消发布。

## `kaggle benchmarks topics list`

列出基准测试的讨论主题。

**用途：**

```bash
kaggle benchmarks topics list <BENCHMARK> [options]
```**参数：**

* `<BENCHMARK>`：基准段（例如，`kaggle/chess`）。

**选项：**

* `--sort-by <SORT_BY>`：排序顺序。有效选项：`hot`、`top`、`new`、`recent`、`active`、`relevance`。
* `-s, --search <SEARCH_TERM>`：搜索查询以过滤主题。
* `--page-size <PAGE_SIZE>`：每页的项目数。
* `--page-token <PAGE_TOKEN>`：用于分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

```bash
kaggle benchmarks topics list kaggle/chess
```

**目的：**

此命令允许您浏览特定基准测试的讨论主题。

## `kaggle benchmarks topics show`

以树形形式显示基准讨论主题以及所有评论。

**用途：**

```bash
kaggle benchmarks topics show <TOPIC_REF> [options]
```

**参数：**

* `<TOPIC_REF>`：主题参考，可以是：
    * `<benchmark>/<topic-id>`（例如，`kaggle/chess/614080` - 请注意，这支持多斜杠基准段）
    * `<benchmark> <topic-id>`（两个单独的参数，其中 `<topic-id>` 作为第二个参数传递）
    * `<topic-id>`（裸数字 ID）

**选项：**

* `--page-size <PAGE_SIZE>`：每页显示的评论数。
* `--page-token <PAGE_TOKEN>`：评论分页的页面标记。
* `-v, --csv`：以 CSV 格式打印结果。
* `-q, --quiet`：抑制详细输出。

**示例：**

```bash
kaggle benchmarks topics show kaggle/chess/614080
```

**目的：**

此命令显示完整的讨论主题及其以缩进树结构呈现的所有注释。