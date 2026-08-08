<!-- kaggle-docs: machine-translated zh-CN from English source -->

# Kaggle 基准 CLI 参考

本参考介绍了如何使用 `kaggle` CLI 管理 Kaggle Benchmark 任务 - 推送任务文件、针对 LLM 模型运行它们、检查状态和下载结果。

## 先决条件

- Python 3.11+
- 安装`kaggle` CLI (`pip install kaggle`)
- 有效的 Kaggle 凭据：`KAGGLE_API_TOKEN` env var、`~/.kaggle/access_token` 文件或通过 `kaggle auth login` 的 OAuth

## 命令层次结构

```
kaggle benchmarks (alias: kaggle b)
├── auth              — Fetch Model Proxy credentials
├── init              — Fetch credentials + setup local dev environment
├── tasks (alias: t)  — Manage benchmark tasks
│   ├── push          — Upload a task from a .py file
│   ├── run           — Run a task against model(s)
│   ├── list          — List your benchmark tasks
│   ├── status        — Show task details and per-model run status
│   ├── download      — Download completed run outputs
│   ├── log / logs    — View execution logs for runs
│   ├── models        — List available benchmark models
│   ├── delete        — Delete a task (not yet supported by server)
│   └── publish       — Publish a task (make it public)
└── topics            — List or show benchmark discussion topics
```

## 设置和身份验证

### `kaggle benchmarks init`

`init` 命令获取模型代理凭据、写入默认环境变量、生成入门示例任务文件和语法参考文档。

**用途：**

```bash
kaggle benchmarks init [options]
```

**示例：**

```bash
# Initialize with defaults (always writes .env, example_task.py, kaggle_benchmarks_reference.md)
kaggle b init -y

# Use custom paths for env file and/or example file:
# kaggle b init -y --env-file my_project/.env --example-file my_project/my_task.py
```

**选项：**
- `-y, --yes`：跳过确认提示
- `--env-file <FILE>`：写入环境变量的路径（默认：`.env`）
- `--example-file <FILE>`：编写示例任务的路径（默认：`example_task.py`）

**目的：** 使用模型代理凭据准备本地基准项目，
默认环境变量和入门基准文件。

**写入的环境变量（附加到env文件中）：**
- `MODEL_PROXY_URL` — 模型代理端点
- `MODEL_PROXY_API_KEY` — 短期 API 密钥
- `MODEL_PROXY_EXPIRY_TIME` — 代币到期
- `LLM_DEFAULT` — 默认模型段（例如 `google/gemini-3-flash-preview`）
- `LLM_DEFAULT_EVAL` — 默认评估模型 slug
- `LLMS_AVAILABLE` — 可用模型段的逗号分隔列表**⚠ 注意：** `LLMS_AVAILABLE` 是用于本地开发和测试的精选模型子集 - 它**不是**完整的模型列表，并且模型代理令牌 (`MODEL_PROXY_API_KEY`) 适用于所有模型，而不仅仅是列出的模型。使用 `kaggle b t models` 列出每个可用模型，并使用 `kaggle b t run` 在 Kaggle 基础设施上对其中任何模型执行（笔记本中可用的模型相同）。

**⚠ 注意：** 环境变量 **附加** 到 env 文件中。当通过 `dotenv` 加载时，最后一个值获胜，因此重新运行 `init` 或 `auth` 是安全的。随着时间的推移，文件可能会积累重复的条目；如果需要，请手动清理。

**与示例文件在同一目录中生成的文件：**
- `example_task.py` — 使用 `@task` 装饰器的入门基准测试任务
- `kaggle_benchmarks_reference.md` — `kaggle-benchmarks` Python 库的语法参考

如果任一文件已存在，则会跳过该文件而不进行覆盖。

### `kaggle benchmarks auth`

如果您只需要模型代理令牌（没有额外的环境变量和示例文件）：

**用途：**

```bash
kaggle benchmarks auth [options]
```

**选项：**

- `-y, --yes`：跳过确认提示。
- `--env-file <FILE>`：附加模型代理凭证变量的路径。

**示例：**

```bash
# Refresh only the 3 credential variables (MODEL_PROXY_URL, MODEL_PROXY_API_KEY, MODEL_PROXY_EXPIRY_TIME)
kaggle b auth -y

# Or write to a custom env file:
# kaggle b auth -y --env-file custom.env
```

**用途：** 仅刷新模型代理凭证变量而不创建
启动任务文件。## 核心工作流程：推送→运行→状态→下载

### 第 1 步：编写任务文件

任务文件是使用 `kaggle-benchmarks` 库的 Python 脚本。他们必须：
- 导入`kaggle_benchmarks as kbench`
- 定义至少一个用`@kbench.task(...)`修饰的函数
- 在任务函数上调用`.run(kbench.llm)`
- 使用`# %%`单元格标记来分隔笔记本单元格（百分比格式）

**⚠ 重要提示：** `.run()` 调用会触发执行并生成 `.run.json` 输出文件。如果不调用`.run()`（或`.evaluate()`），则不会生成运行文件，也不会记录任何内容。推送仍然会成功（因为推送验证仅检查 `@task` 装饰器），但任务在服务器上执行时不会默默地产生任何结果。

**最小示例：**
```python
# %%
import kaggle_benchmarks as kbench

# %%
@kbench.task(name="sample-task")
def sample_task(llm):
    response = llm.prompt("What is 2 + 2?")
    kbench.assertions.assert_in("4", response, expectation="Should contain 4")

sample_task.run(kbench.llm)
```

**任务名称默认值：** 如果省略 `@kbench.task()` 中的 `name=` 参数，则任务名称默认为函数名称，标题大小写，下划线替换为空格。例如，名为 `my_eval` 的函数上的 `@kbench.task()` 会生成任务名称 `"My Eval"`，该名称会被简化为 `my-eval`。**任务文件格式规则：**
- 必须是`.py`文件
- 使用“百分比格式” - `# %%` 单元格标记分隔笔记本单元格。每个`# %%`启动一个新单元。 CLI 使用 `jupytext` 将此格式的文件转换为 `.ipynb`。
- IPython 魔法（`%`、`!`、`%%`）在 AST 验证期间被剥离，但保留在最终笔记本中以供服务器执行
- 任务名称标准化为 URL 安全的 slug（例如 `"My Test Task"` → `my-test-task`）
- CLI 中使用的 slug 必须与文件中的 `@task` 装饰器匹配

### `kaggle benchmarks tasks push`

将基准测试任务文件推送到 Kaggle。

**用途：**

```bash
kaggle benchmarks tasks push <TASK> -f <FILE> [options]
```

**示例：**

```bash
# Push and wait for server-side creation to complete (recommended)
kaggle b t push my-task -f task.py --wait

# Push with timeout (60s) and custom poll interval (5s)
kaggle b t push my-task -f task.py --wait 60 --poll-interval 5

# Push with Kaggle datasets attached
kaggle b t push my-task -f task.py --wait -d kaggle/titanic -d user/my-dataset

# Push without waiting (fire-and-forget; check status with `kaggle b t status`)
# kaggle b t push my-task -f task.py
```

**参数：**
- `<TASK>`（位置，必需）：任务名称/slug（例如`my-task`）
- `-f, --file <FILE>`（必填）：`.py`源文件的路径**选项：**
- `--wait [TIMEOUT]`：等待创建完成。 `--wait` 独自=无限期地等待。 `--wait 60` = 60 秒后超时。
- `--poll-interval <SECONDS>`：状态轮询之间的最大秒数（默认值：`60`）。轮询从 5 秒开始，每次迭代增加 50%，直到达到该值。
- `-v, --verbose`：启用详细轮询日志。
- `-d, --kaggle-dataset <DATASET>`：将 Kaggle 数据集附加到任务的支持笔记本（格式：`owner/dataset-slug`）。对多个数据集重复此操作（例如`-d kaggle/titanic -d user/my-dataset`）。默认安装在`/kaggle/input/<dataset-slug>/`。如果发生命名冲突，则使用完全限定的安装路径`/kaggle/input/<owner>/<dataset-slug>/`。

**用途：** 从本地 `.py` 文件创建基准测试任务或对其进行版本控制。

**发生了什么：**
1. 验证文件是`.py`文件并且存在
2. 解析文件 AST 以验证它包含与任务名称匹配的 `@task` 装饰器
3. 如果任务名称与其 slug 形式不同，则打印警告（例如 `"My Task"` → `"my-task"`）
4. 通过`jupytext`将`.py`文件转换为`.ipynb`笔记本格式
5. 上传到 Kaggle 作为基准任务（如果存在则创建新版本或新版本）
6. 打印任务 URL 和运行提示**错误场景：**
- 未找到文件：`ValueError: File task.py does not exist`
- 非`.py`文件：`ValueError: File task.txt must be a .py file`
- 缺少 `@task` 装饰器：`ValueError: No @task decorators found in file task.py. The file must define at least one task.`
- 任务名称不匹配：`ValueError: Task 'wrong-name' not found in file task.py. Found tasks: real-task`
- 在上一个仍在处理时重新推送（没有`--wait`）：`ValueError: Task 'my-task' is currently being created (pending). Cannot push now. Use --wait to monitor the existing creation.`
- 使用`--wait`重新推送：等待现有创建完成，然后自动推送新版本
- 当以前的版本有数据集时，在没有 `-d` 的情况下重新推送：向 stderr 打印黄色警告：`⚠ Warning: The previous version of 'my-task' had attached Kaggle datasets: ...` 并分离它们（重新指定 `-d` 以保留它们）。
- 无效或无法访问的 Kaggle 数据集：`Failed to push task: Failed to attach the following data sources (not found or inaccessible): <dataset>`


### `kaggle benchmarks tasks run`

针对一个或多个模型运行基准测试任务。

**用途：**

```bash
kaggle benchmarks tasks run <TASK> [options]
```

**示例：**

```bash
# Run with interactive model selection (paginated picker)
kaggle b t run my-task

# Run against specific models
kaggle b t run my-task -m gemini-2.5-pro -m claude-sonnet-4

# Run against a model and wait for completion
kaggle b t run my-task -m gemini-2.5-pro --wait

# Run with timeout and custom poll interval
kaggle b t run my-task -m gemini-2.5-pro --wait 30 --poll-interval 5
```

**参数：**
- `<TASK>`（位置，必需）：任务名称/slug（例如`my-task`）

**选项：**
- `-m, --model <MODEL>`（例如`gemini-2.5-pro`）：模型子弹。对多个型号重复此操作（例如`-m gemini-2.5-pro -m claude-sonnet-4`）。如果省略，则显示交互式选择器。
- `--wait [TIMEOUT]`：等待运行完成。 `0` 或省略值 = 不确定。
- `--poll-interval <SECONDS>`：状态轮询之间的最大秒数（默认值：`60`）。轮询从 5 秒开始，每次迭代增加 50%，直到达到该值。
- `-v, --verbose`：启用详细轮询日志。

**目的：** 安排基准测试运行并可选择等待完成。**交互式模型选择：**
- 显示可用型号的编号列表
- 输入逗号分隔的数字（例如`1,3,5`）以选择特定型号
- 输入`all`选择每个可用型号
- 分页：`n` = 下一页，`p` = 上一页（当 > 20 个型号时）

**错误场景：**
- 不存在的任务：`ValueError: Task 'no-such-task' not found. Check the task name and try again. Use 'kaggle b t list' to see your tasks.`
- 无效型号：`ValueError: Failed to schedule runs. One or more model names may be invalid: ['nonexistent-model']. Use 'kaggle b t run my-task' (without -m) to select from available models.`
- 任务未准备好：`ValueError: Task 'my-task' is not ready to run (status: QUEUED). Only completed tasks can be run.`
- 超时：`Timed out waiting for runs after 30 seconds.`

### `kaggle benchmarks tasks status`

显示任务详细信息和每个模型的运行状态。

**用途：**

```bash
kaggle benchmarks tasks status <TASK> [options]
```

**参数：**

- `<TASK>`（位置，必需）：任务名称/slug。

**选项：**

- `-m, --model <MODEL>`：过滤特定型号的状态。重复进行
  多种型号。

**示例：**

```bash
# Full status for a task
kaggle b t status my-task

# Filter to specific models
kaggle b t status my-task -m gemini-2.5-pro
kaggle b t status my-task -m gemini-2.5-pro -m claude-sonnet-4
```

**用途：** 检查任务创建状态和模型运行进度或错误。

**输出格式：**
```
Task:     my-task
Status:   Completed
Created:  2026-04-28 18:13:04
Task URL: https://www.kaggle.com/...

Model                     Status      Started               Ended
--------------------------------------------------------------------------
gemini-2.5-pro            Completed   2026-04-28 18:13:04   2026-04-28 18:14:00
claude-sonnet-4           Errored     2026-04-28 18:13:04   2026-04-28 18:13:04

Errors:
  [claude-sonnet-4]
    Traceback (most recent call last):
      ...
    ValueError: some error
```

如果不存在运行：`No runs yet. Use 'kaggle b t run my-task' to start one.`

**任务创建失败：**当任务本身创建失败时
（例如`KERNEL_WITHOUT_RUN`、`NO_MODEL_SPECIFIED`、`VALIDATION_FAILED`、
`ERRORED`），`Status:`行显示失败*种类*（标题大小写
enum），并在其下方附加一个 `Error:` 行，其中包含服务器提供的
`creation_error_message` — 例如：

```
Status:   Kernel_Without_Run
Error:    Notebook finished but produced no output. Did you forget to call .run() or .evaluate()?
````kaggle b t run` 命令在拒绝时应用相同的模式
计划针对未完成的任务运行：引发的错误包括
`status: <KIND>` 以及（如果存在）`Error: <message>` 行
服务器的解释。

### `kaggle benchmarks tasks download`

下载已完成或出错的运行输出。

**用途：**

```bash
kaggle benchmarks tasks download <TASK> [options]
```

**参数：**

- `<TASK>`（位置，必需）：任务名称/slug。

**示例：**

```bash
# Download all terminal run outputs (completed and errored)
kaggle b t download my-task

# Download for specific model(s)
kaggle b t download my-task -m gemini-2.5-pro

# Download to a custom directory
kaggle b t download my-task -o ./results

# Download with source notebooks included
kaggle b t download my-task --include-source
```

**选项：**
- `-m, --model <MODEL>`（例如`gemini-2.5-pro`）：仅针对特定型号下载。对多个模型重复此操作。
- `-o, --output <DIRECTORY>`：输出目录（默认：当前目录）
- `-s, --include-source`：同时下载内核会话的源笔记本（`__notebook__.ipynb`、`__notebook_source__.ipynb`）
- `-f, --force`：强制重新下载已完成的运行，覆盖本地文件

**目的：** 检索基准输出工件以进行本地检查。

**输出目录结构：**
```
<output>/<task>/<version>/<model>/<run_id>/    (version is "unset" if unavailable)
   ├── output files...
```**行为详情：**
- 下载 **最终状态** 下所有运行的输出 - 这包括 `COMPLETED` 和 `ERRORED` 运行（错误的运行可能仍然有部分输出）
- 下载 zip 档案并自动解压
- 进度呈现为具有 `Model | File | Size | Progress` 列的表格。 `Size` 是运行输出目录提取的磁盘大小。
- 已下载的运行将被跳过（使用`--force`重新下载）并在表中显示为`Cached`行
- 损坏的拉链显示为 `Bad zip` 行；原始 `.zip` 保存在磁盘上并处理下一次运行
- 如果传递了 `-s`，但缓存运行的目录缺少源笔记本 (`__notebook__.ipynb` / `__notebook_source__.ipynb`)，则缓存行保持不变，并在摘要后打印提示： `Tip: N cached run(s) lack source notebooks. Re-run with -f -s to fetch them.` — 一起使用 `-f -s` 将源笔记本回填到现有缓存运行中。
- 没有可下载的运行（全部仍在进行中）：`No downloadable runs yet — N run(s) still in progress. Use 'kaggle b t status my-task' to check progress.`
- 根本没有运行：`No runs found for task 'my-task'. Use 'kaggle b t run my-task' to start one.`

### `kaggle benchmarks tasks log`

查看基准任务运行的日志。

**用途：**

```bash
kaggle benchmarks tasks log <TASK> [options]
```

**示例：**

```bash
# Show logs for all runs of a task
kaggle b t log my-task

# Show logs for a specific model's run(s)
kaggle b t log my-task -m gemini-2.5-pro

# Show logs for multiple models
kaggle b t logs my-task -m gemini-2.5-pro -m claude-sonnet-4
```

**参数：**
- `<TASK>`（位置，必需）：任务名称/slug（例如`my-task`）

**选项：**
- `-m, --model <MODEL>`（例如`gemini-2.5-pro`）：将日志过滤到特定模型。对多个模型重复此操作。如果省略，则显示所有运行的日志。**别名：** `log`、`logs`

**目的：** 检查每次运行的执行日志以进行调试。

**行为详情：**
- 每次运行的日志都打印有包含运行状态的标题：`═══ Logs for gemini-2.5-pro (Run 456) [COMPLETED] ═══`
- 每次运行都以行数页脚结束：`═══ (42 lines) ═══`
- 最后打印摘要：`Showed logs for N run(s) across N model(s).`
- 在循环中**顺序**记录运行：如果第一次运行处于活动状态，CLI 会实时阻止并流式传输它，直到完成，然后再打印或流式传输下一次运行的日志。这可以防止终端日志交错。
- 主动运行：日志通过服务器发送事件 (SSE) 实时传输
- 已完成的运行：返回并打印持久日志文件
- 未找到运行：`No runs found for task 'my-task'. Use 'kaggle b t run my-task' to start one.`

## 附加命令

### `kaggle benchmarks tasks list`

**用途：**

```bash
kaggle benchmarks tasks list [options]
```

**选项：**

- `--name-regex <REGEX>`：通过正则表达式过滤任务名称。
- `--status <STATUS>`：按创建状态过滤：`queued`、`running`、`completed`、`errored`。
- `--page-size <SIZE>`：交互式寻呼机中每页的任务。默认为 20。
- `--all`：一次打印每个任务并跳过交互式寻呼机。

**示例：**

```bash
# List all your tasks
kaggle b t list

# Filter by name (regex)
kaggle b t list --name-regex "^math"

# Filter by status
kaggle b t list --status completed

# Combine filters
kaggle b t list --name-regex "^math" --status errored

# Use a smaller interactive page size
kaggle b t list --page-size 5

# Print all tasks without the pager
kaggle b t list --all
```

**用途：** 查看拥有的基准测试任务并按任务名称或创建状态进行过滤。

**输出：** 与列对齐的表格：任务、版本（或`unset`）、状态、已创建。

### `kaggle benchmarks tasks models`列出可用的基准模型。

**用途：**

```bash
kaggle benchmarks tasks models
```

**选项：**

- 没有可见的选项。

**示例：**

```bash
kaggle b t models
```

**目的：** 查找`kaggle benchmarks tasks run`接受的模型段。

**输出：** 包含列的表：Slug、显示名称

### `kaggle benchmarks tasks delete`

当服务器支持可用时删除基准测试任务。

**用途：**

```bash
kaggle benchmarks tasks delete <TASK> [options]
```

**参数：**

- `<TASK>`（位置，必需）：任务名称/slug。

**选项：**

- `-y, --yes`：跳过确认。

**示例：**

```bash
kaggle b t delete my-task
kaggle b t delete my-task -y   # skip confirmation
```

**目的：** 请求删除任务。当前服务器行为不支持它。

**注意：** 服务器尚不支持删除。目前打印：`Delete is not supported by the server yet.`

### `kaggle benchmarks tasks publish`

发布基准测试任务。

**用途：**

```bash
kaggle benchmarks tasks publish <TASK> [options]
```

**参数：**

- `<TASK>`（位置，必需）：任务名称/slug。

**示例：**

```bash
# Publish a task and its backing notebook (default)
kaggle b t publish my-task

# Publish without the backing notebook
kaggle b t publish my-task --no-publish-backing-notebook
```

**选项：**
- `--no-publish-backing-notebook`：不发布支持笔记本（默认发布）。

**目的：** 公开基准测试任务，可以选择不发布其
支持笔记本。

**注释：**
- 幂等：重新发布已经公开的任务会打印一条消息并成功返回。
- 不支持通过此命令取消发布。
- 如果未找到任务，则引发 `ValueError: Task 'my-task' not found. Check the task name and try again. Use 'kaggle b t list' to see your tasks.`

### `kaggle benchmarks topics list`

列出基准测试的讨论主题。

**用法：**```bash
kaggle benchmarks topics list [BENCHMARK] [options]
```

**参数：**

- `[BENCHMARK]`：基准参考。

**选项：**

- `--sort-by <SORT>`：`hot`、`top`、`new`、`recent`、`active`、`relevance` 之一。
- `-s, --search <TERM>`：搜索文本。
- `--page-size <SIZE>`：要返回的主题数。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle benchmarks topics list my-benchmark
kaggle b topics list my-benchmark --sort-by recent --page-size 50
```

**目的：** 在打开特定主题之前浏览基准讨论。

`kaggle benchmarks topics` 没有 `list` 可作为快捷方式
列出主题。

### `kaggle benchmarks topics show`

以树形形式显示基准讨论主题和评论。

**用途：**

```bash
kaggle benchmarks topics show <TOPIC_REF> [TOPIC_ID] [options]
```

**参数：**

- `<TOPIC_REF>`：主题参考，或使用时的基准参考
  双参数形式。
- `[TOPIC_ID]`：二参数形式的可选主题 ID。

**选项：**

- `--page-size <SIZE>`：返回的评论数。
- `--page-token <TOKEN>`：页面令牌。
- `-v, --csv`：打印 CSV。
- `-q, --quiet`：抑制额外输出。

**示例：**

```bash
kaggle benchmarks topics show my-benchmark/12345
kaggle benchmarks topics show my-benchmark 12345
```

**目的：** 阅读基准讨论主题及其评论。

## 任务名称规范化

任务名称会自动标准化为 URL 安全的 slugs：
- `my_task` → `my-task`
- `My Test Task` → `my-test-task`
- `My Task` → `my-task`

当 CLI 标准化名称时，它会打印黄色警告：
```
⚠ Warning: task name 'My Test Task' was normalized to slug 'my-test-task'.
  Use 'my-test-task' in future commands.
```文件中的 `@task(name=...)` 装饰器和 CLI 命令之间的 slug 必须匹配。比较是在 slugified 名称上进行的，因此 `@task(name="My Task")` 与 `kaggle b t push my-task -f file.py` 匹配。

## 模型段标准化

基准模型名称在输入和输出上自动标准化。这使得可以轻松地互换传递各种格式，同时保持显示和目录干净。

- **灵活输入**：CLI 接受多种格式的型号名称：
  - **Canonical Slugs（推荐）**：`gemini-2.5-pro` 或 `claude-sonnet-4`
  - **带有提供商前缀**：`google/gemini-2.5-pro` 或 `anthropic/claude-sonnet-4`
  - **使用版本/代理`@`符号**：`anthropic/claude-haiku-4-5@20251001`或`claude-sonnet-4-6@default`
- **统一规范化**：客户端自动删除任何提供程序前缀（例如，`google/`或`anthropic/`）并用`-`替换`@`字符以匹配服务器的规范数据库slug格式。
- **干净的输出**：
  - **状态显示**：表格和错误日志显示规范的连字符段（例如，`claude-haiku-4-5-20251001`和`gemini-2.0-flash-lite-001`）以提高可读性。
  - **分层下载**：使用规范的 slugs（例如 `./<task>/<version>/claude-haiku-4-5-20251001/<run_id>/`）将运行输出提取到干净的文件夹中，文件夹名称中没有 `@` 或 `/` 符号。

## 常见工作流程

### 完整的端到端工作流程

```bash
# 1. Setup
kaggle b init -y

# 2. Write your task in task.py (see task file format above)

# 3. Push
kaggle b t push my-task -f task.py --wait

# 4. Run against models
kaggle b t run my-task -m gemini-2.5-pro -m claude-sonnet-4 --wait

# 5. Check status
kaggle b t status my-task

# 6. Download results
kaggle b t download my-task -o ./results
```### 局部迭代循环

在推送到服务器之前，您可以针对模型代理在本地测试您的任务，以尽早捕获错误。这避免了每次更改的推送→运行→等待→下载往返。

**1.获取凭证：**
```bash
kaggle b init -y
# or just: kaggle b auth -y
```

**2.加载环境变量并在本地运行：**
```bash
# Source the .env file to set MODEL_PROXY_URL, MODEL_PROXY_API_KEY, etc.
set -a && source .env && set +a

# Run your task file directly with Python
python task.py
```

**3.检查输出：**
- 成功运行会在当前目录中生成`.run.json`文件
- 断言内联打印通过/失败，以便您可以迭代提示和阈值
- 错误立即显示在您的终端中 - 无需等待服务器执行

**4.满意后，推送到服务器：**
```bash
kaggle b t push my-task -f task.py --wait && \
kaggle b t run my-task -m gemini-2.5-pro --wait && \
kaggle b t download my-task -o ./results
```

**⚠ 注意：** 本地运行仅限于 `LLMS_AVAILABLE` 中列出的模型（默认情况下使用 `LLM_DEFAULT`）——本地开发的精选子集。服务器通过 `kaggle b t run` 运行，可以访问完整的模型目录（使用 `kaggle b t models` 列出它们）并在 Kaggle 的基础设施上运行。模型之间的行为可能有所不同，因此请务必在本地迭代后在服务器上验证目标模型。

### 快速推送-运行-下载

```bash
# Push and wait, then run and wait, all in sequence
kaggle b t push my-task -f task.py --wait && \
kaggle b t run my-task -m gemini-2.5-pro --wait && \
kaggle b t download my-task -o ./results
```

### 测试故意出错的任务

```python
# t.py
# %%
import kaggle_benchmarks as kbench

# %%
@kbench.task()
def d(llm):
    raise ValueError("intentional error")

# %%
d.run(kbench.llm)
```

```bash
# Push succeeds (error only triggers at run time)
kaggle b t push d -f t.py --wait

# Run — will complete with ERRORED status
kaggle b t run d -m gemini-3-flash-preview --wait

# Status shows clean table + separate Errors section
kaggle b t status d
```