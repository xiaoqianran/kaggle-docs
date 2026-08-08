<!-- kaggle-docs: machine-translated zh-CN from English source -->

# Kaggle CLI 输出格式文档

本文档描述了 Kaggle CLI 中可用的输出格式选项。

## 输出格式选项

Kaggle CLI 支持为列出信息的各种命令选择输出格式。

### `--csv`（或`-v`）

从历史上看，许多命令支持 `-v` 或 `--csv` 选项，以将输出显示为逗号分隔值 (CSV)，而不是格式化表格。

示例：
```sh
kaggle competitions list --csv
```

### `--format`

我们引入了一个新的 `--format` 选项来提供指定输出格式的统一方法。
它接受以下值：
* `csv`：将输出显示为逗号分隔值。
* `table`：将输出显示为格式化表格（默认）。
* `json`：将输出显示为 JSON。

示例：
```sh
kaggle competitions list --format csv
kaggle competitions list --format table
kaggle competitions list --format json
```

对于大多数命令，JSON 输出是表示行的对象列表，其中键对应于列标题。对于像`topics show`这样的详细命令，它返回一个结构化对象：
```json
{
  "topic": { ... },
  "comments": [ ... ]
}
```

### 投影（字段选择）`--format` 选项通过将括号中的逗号分隔字段列表附加到格式名称来支持可选的 `gcloud` 样式字段选择（投影）。这允许您将输出限制为仅指定的字段并控制它们的顺序。

所有格式都支持投影（`csv`、`table`、`json`）。

示例：
```sh
# Only show 'ref' and 'reward' columns for competitions in a table
kaggle competitions list --format "table(ref,reward)"

# Export only 'id' and 'publicScore' to JSON for team submissions
kaggle competitions team-submissions --format "json(id,publicScore)" <team_id>

# Export only 'name' and 'size' to CSV for dataset files
kaggle datasets files -d zillow/zecon --format "csv(name,size)"
```

您可以使用字段名称（例如 `totalBytes`）或其显示标签（例如 `size`）来指定字段。如果某个字段无法识别，CLI 将显示一条错误，列出允许的字段。

#### 特例：主题展示

对于同时输出父主题和评论列表的`topics show`命令，投影适用于两种类型的对象。与主题匹配的字段将应用于主题输出，与评论匹配的字段将应用于评论输出。

示例：
```sh
kaggle forums topics show 123 --format "json(title,content)"
```
在这种情况下，`title`（这是一个主题字段）将保留在主题输出中，`content`（这是一个评论字段）将保留在评论输出中。
```json
{
  "topic": {
    "title": "Test Title"
  },
  "comments": [
    {
      "content": "Comment Content"
    }
  ]
}
```

### 相互排斥

`--csv`（或`-v`）选项和`--format`选项**互斥**。您不能同时指定两者。

如果您尝试同时使用两者，CLI 将显示错误：
```sh
kaggle competitions list --csv --format csv
# Error: argument --format: not allowed with argument -v/--csv
```## 支持的命令

以下命令支持 `--csv`（旧版）和 `--format` 选项：

### 比赛
* `kaggle competitions list`
* `kaggle competitions files`
* `kaggle competitions submissions`
* `kaggle competitions leaderboard`
* `kaggle competitions team-submissions`
* `kaggle competitions episodes`
* `kaggle competitions pages`
* `kaggle competitions topic-messages`
* `kaggle competitions topics list`
* `kaggle competitions topics show`

### 数据集
* `kaggle datasets list`
* `kaggle datasets files`
* `kaggle datasets topics list`
* `kaggle datasets topics show`

### 内核
* `kaggle kernels list`
* `kaggle kernels files`
* `kaggle kernels topics list`
* `kaggle kernels topics show`

### 模型
* `kaggle models list`
* `kaggle models topics list`
* `kaggle models topics show`
* `kaggle models instances list`
* `kaggle models instances files`
* `kaggle models instances versions list`
* `kaggle models instances versions files`

### 论坛
* `kaggle forums list`
* `kaggle forums topics list`
* `kaggle forums topics show`

### 基准
* `kaggle benchmarks topics list`
* `kaggle benchmarks topics show`

### 配额
* `kaggle quota`