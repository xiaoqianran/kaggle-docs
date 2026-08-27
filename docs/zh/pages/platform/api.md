<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 公共API

### kagglehub 和 kaggle CLI

Kaggle 提供了两种不同的方式与 Kaggle 进行编程交互：

- [kaggle CLI](https://github.com/Kaggle/kaggle-cli)：这是一个命令行界面工具，用于通过终端或 shell 脚本中的命令进行交互 ([Documentation](https://github.com/Kaggle/kaggle-cli/blob/main/docs/README.md))。
- [kagglehub](https://github.com/Kaggle/kagglehub)：这是一个 Python 库，旨在允许用户与 Kaggle 资源（主要是模型、数据集和竞赛）进行交互。它旨在无缝集成到 **Python** ML 工作流程 ([Documentation](https://github.com/Kaggle/kagglehub/blob/main/README.md))。

### 速率限制

Kaggle 对公共 API 和使用 kaggle.com 网站时进行的调用都使用动态速率限制。如果您遇到 HTTP 429 错误代码或“请求过多”错误，我们建议您执行以下步骤：- 暂停和重试：通常，最有效的解决方案是等待几分钟，然后重试您的请求。
- 检查您的逻辑：值得快速查看您的代码，以确保不会触发意外的循环或冗余调用。这在自动化脚本中进行 API 调用时特别有用，其中一个小的逻辑错误可能会无意中导致大量请求。
- 报告平台问题：如果您调查了您的代码并认为 Kaggle 网站上的错误导致请求发生的频率高于应有的频率，请在 [Product Feedback](https://www.kaggle.com/discussions/product-feedback) 论坛中报告，以便我们进行调查。

### 身份验证

Kaggle 根据您的用例支持多种身份验证方法：

- **API 密钥和个人令牌：** 对于自动化脚本、笔记本工作流程、CI/CD 环境和直接 SDK 调用，请从您的 [Kaggle account API tokens settings page](https://www.kaggle.com/settings/api) 创建 API 令牌。
- **Kaggle CLI：** 对于交互式命令行使用，请运行 `kaggle auth login` 通过浏览器进行身份验证。
- **用于第三方应用程序的 OAuth 2.0：** 对于需要代表 Kaggle 用户行事的外部网站、Web 应用程序和开发人员工具，Kaggle 提供了 OAuth 2.0 提供商服务。将 Kaggle 集成到其他网站或应用程序时，Kaggle 使用 PKCE（代码交换证明密钥）实现 OAuth 2.0 授权代码流程。这使得第三方服务能够安全地请求精细权限并获取访问令牌，而无需直接处理用户凭据。

该 API 支持：

- **授权代码授予**以及公共客户的 PKCE
- **刷新令牌授予**用于获取新的访问令牌
- **令牌内省**（RFC 7662）用于验证令牌
- **OAuth 2.0 发现** 通过众所周知的端点

#### 快速入门

对于公共客户端（CLI 工具、桌面应用程序等），典型流程是：

1. 向 Kaggle 团队请求预配置的客户端 ID
2.生成PKCE挑战（code\_verifier和code\_challenge）
3. 使用您的客户端详细信息将用户重定向到授权端点
4. 用户在 Kaggle 上批准授权请求
5. 在令牌端点将授权码交换为令牌
6. 使用访问令牌调用 Kaggle API
7. 访问令牌过期时刷新令牌

#### 发现端点

检索 OAuth 2.0 服务器元数据，包括支持的端点、授权类型和范围：

```
GET https://www.kaggle.com/.well-known/oauth-authorization-server
```检索有关受保护资源的元数据（Kaggle API）：

```
GET https://www.kaggle.com/.well-known/oauth-protected-resource
```

#### 客户端 ID 类型

Kaggle 支持两种类型的 OAuth 客户端：

|类型 |客户 ID 格式 |需要 PKCE |令牌交换验证 |重定向 URI |
| --- | --- | --- | --- | --- |
|公共客户| `<client-name>`（例如，`gemini-cli`）|是的 |无（PKCE 提供安全性）|仅限本地主机 |
|组织客户| `org:<organization-slug>` |没有 | HTTP Basic 与组织所有者的 [API key](/settings) |允许的 HTTPS URL |

要注册新的 OAuth 客户端，请联系 Kaggle 团队。

#### 请求主体编码

OAuth 2.0 令牌、刷新和自省端点都接受以下两种编码之一的请求正文：

- **`application/x-www-form-urlencoded`** — RFC 6749 §4.1.3 / §3.2 强制要求的编码，几乎每个现成的 OAuth 客户端库默认使用该编码。如有疑问，请使用此功能；本文档中的示例使用它。
- **`application/json`** — 也为喜欢发送 JSON 的客户提供便利而接受。正文必须是一个 JSON 对象，其顶级键与为每个端点列出的参数名称匹配。两种编码可以互换；选择与 HTTP 堆栈的其余部分匹配的那个。下面的每个示例首先显示表单 urlencoded 变体，然后立即显示等效的 JSON 变体。

#### 授权流程

##### 第 1 步：生成 PKCE 挑战

在开始授权流程之前，生成 PKCE 代码验证程序和质询。公共客户端需要执行此步骤，组织客户端应跳过此步骤。

```
import secrets
import hashlib
import base64

# Generate a random code_verifier (43-128 characters)
code_verifier = secrets.token_urlsafe(32)

# Create code_challenge using SHA-256
code_challenge = base64.urlsafe_b64encode(
    hashlib.sha256(code_verifier.encode()).digest()
).decode().rstrip('=')
```

##### 第 2 步：启动授权流程

将用户重定向到授权端点：

```
GET https://www.kaggle.com/api/v1/oauth2/authorize
```

**查询参数：**

|参数|必填|描述 |
| --- | --- | --- |
| `client_id` |是的 |您的注册客户ID |
| `redirect_uri` |是的 |必须与注册的重定向 URI 匹配 |
| `scope` |是的 |以空格分隔的范围列表 |
| `state` |是的 |用于 CSRF 保护的随机字符串（20-128 个字符）|
| `response_type` |是的 |必须是`"code"` |
| `response_mode` |是的 |必须是`"query"` |
| `code_challenge` |是\* | Base64URL 编码的 SHA-256 哈希代码\_verifier |
| `code_challenge_method` |是\* |必须是`"S256"` |

*\*公共客户需要。不得由组织客户发送。*

##### 步骤 3：用户授权用户将被重定向到 Kaggle 的同意屏幕，他们可以在其中登录（如果需要）、查看请求的权限、选择性地限制范围以及批准或拒绝请求。

##### 步骤 4：接收授权码

批准后，Kaggle 会使用授权码重定向回您的 `redirect_uri`：

```
http://localhost:8080/callback?code=<authorization_code>&state=xyzABC123456789012345
```

**重要：** 验证`state`参数是否与您发送的内容匹配，以防止 CSRF 攻击。

##### 步骤 5：用代码交换令牌

将授权代码交换为访问令牌和刷新令牌：

```
POST https://www.kaggle.com/api/v1/oauth2/token
Content-Type: application/x-www-form-urlencoded
```

如[Request Body Encoding](#oauth-request-encoding)中所述，相同的请求也可以使用`Content-Type: application/json`和JSON正文发送。

**请求正文参数：**

|参数|必填|描述 |
| --- | --- | --- |
| `grant_type` |是的 |必须是`"authorization_code"` |
| `code` |是的 |回调中的授权码 |
| `code_verifier` |仅限公共客户 |用于生成代码\_challenge的原始代码\_verifier。<br>**不得**由组织客户端发送。 |
| `client_id` |没有 |您的客户 ID |
| `redirect_uri` |没有 |授权请求中使用的重定向 URI |

##### 客户端身份验证

如何验证令牌交换请求取决于您的客户端类型：- **公共客户端**不需要任何身份验证标头。 `code_verifier` (PKCE) 证明调用者是发起授权流程的同一方。
- **组织客户端**必须使用组织所有者的 Kaggle API 凭证通过 HTTP 基本身份验证来验证请求。组织所有者的用户名和 [API key](/settings) 应包含在 `Authorization` 标头中。组织客户端不得**发送`code_verifier`。

##### 公共客户端示例（表单 urlencoded）

```
curl -X POST https://www.kaggle.com/api/v1/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=<authorization_code>" \
  -d "code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
```

##### 公共客户端示例 (JSON)

```
curl -X POST https://www.kaggle.com/api/v1/oauth2/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "code": "<authorization_code>",
    "code_verifier": "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
  }'
```

##### 组织客户端示例（表单 urlencoded）

```
curl -X POST https://www.kaggle.com/api/v1/oauth2/token \
  -u "<org_owner_username>:<org_owner_api_key>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=<authorization_code>"
```

##### 组织客户端示例 (JSON)

```
curl -X POST https://www.kaggle.com/api/v1/oauth2/token \
  -u "<org_owner_username>:<org_owner_api_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "code": "<authorization_code>"
  }'
```

**回应：**

```
{
  "access_token": "KGAT_...",
  "refresh_token": "KGRT_...",
  "token_type": "Bearer",
  "expires_in": 10800,
  "username": "johndoe",
  "user_id": 12345,
  "scope": "datasets.get:* models.get:*"
}
```

#### 代币管理

##### 刷新访问令牌

访问令牌将在 3 小时后过期。使用刷新令牌获取新的访问令牌。刷新令牌请求不需要对任一客户端类型进行客户端身份验证。

###### 表单编码

```
curl -X POST https://www.kaggle.com/api/v1/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "refresh_token=KGRT_..."
```

###### JSON（等效）

```
curl -X POST https://www.kaggle.com/api/v1/oauth2/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type": "refresh_token", "refresh_token": "KGRT_..."}'
```

##### 令牌自省 (RFC 7662)

验证和检查令牌：

###### 表单编码

```
curl -X POST https://www.kaggle.com/api/v1/oauth2/introspect \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token=<access_token_or_refresh_token>"
```

###### JSON（等效）

```
curl -X POST https://www.kaggle.com/api/v1/oauth2/introspect \
  -H "Content-Type: application/json" \
  -d '{"token": "<access_token_or_refresh_token>"}'
```

两种编码都会返回相同的 JSON 响应。对于活跃令牌：

```
{
  "active": true,
  "username": "johndoe",
  "user_id": 12345,
  "scope": "datasets.viewer:*",
  "exp": 1705719600
}
```对于过期、撤销或无效的令牌：

```
{
  "active": false
}
```

#### 范围

范围控制您的应用程序在代表用户执行操作时拥有哪些权限。范围遵循格式：`<permission-or-role>:<resource-id-or-*>`

- 使用 `*` 作为资源 ID，以授予跨该类型的所有资源的权限（例如，`datasets.get:*`）。
- 使用数字资源 ID 来确定单个资源的范围（例如，`datasets.get:124`）。

**通用权限：**

|许可|描述 |
| --- | --- |
| `datasets.get` |读取数据集元数据和文件 |
| `datasets.update` |更新现有数据集 |
| `models.get` |读取模型元数据和文件 |
| `models.create` |创建新模型|
| `models.update` |更新现有模型 |
| `kernels.get` |阅读笔记本/内核 |
| `kernels.update` |创建或更新笔记本 |
| `competitions.get` |阅读竞赛元数据 |
| `competitions.submit` |提交比赛 |

**可用角色**（捆绑相关权限）：

|角色 |描述 |
| --- | --- |
| `datasets.viewer` |对数据集的只读访问
| `datasets.editor` |对数据集的读写访问
| `models.viewer` |对模型的只读访问|
| `models.editor` |对模型的读写访问
| `kernels.viewer` |对笔记本的只读访问 |
| `kernels.editor` |对笔记本的读写访问
| `competitions.viewer` |竞赛的只读访问权限 |通过用空格分隔来请求多个范围：`datasets.get:* models.get:* kernels.get:*`

本文档末尾的[Appendix: Full Scope Reference](#oauth-scopes-appendix) 中提供了 OAuth 提供商接受的每个权限和角色的完整参考。

#### 使用访问令牌

使用 `Authorization` 标头在 API 请求中包含访问令牌：

```
curl https://www.kaggle.com/api/v1/datasets/list \
  -H "Authorization: Bearer KGAT_..."
```

#### 错误处理

**授权错误** 作为重定向 URI 上的查询参数返回：

|错误代码 |描述 |
| --- | --- |
| `invalid_request` |参数缺失或无效 |
| `invalid_client` |未知或禁用的客户端 |
| `invalid_scope` |此客户端不允许请求的范围 |
| `access_denied` |用户拒绝授权 |

**令牌端点错误** 返回 HTTP 状态 400 的 JSON：

|错误代码 |描述 |
| --- | --- |
| `invalid_request` |参数缺失或无效 |
| `invalid_grant` |授权码无效、过期或撤销 |
| `invalid_client` |未知的客户端 ID |

#### 安全考虑- **对于非本地主机重定向 URI 始终使用 HTTPS**
- **验证状态参数**以防止CSRF攻击
- **安全地存储刷新令牌** - 它们提供长期访问
- **使用最小范围** - 仅请求您的应用程序所需的权限
- **对于公共客户端来说，PKCE 是强制性的**，以防止授权码拦截
- **访问令牌在 3 小时后过期** - 使用刷新令牌获取新令牌
- **组织客户端必须使用组织所有者的 [API credentials](/settings) 通过 HTTP 基本身份验证来验证令牌交换请求**。将这些凭据安全地保存在您的服务器上 - 切勿在客户端代码中公开它们。

#### 附录：范围参考

下表涵盖了大多数应用程序在 Kaggle 的主要资源类型中所需的高级 CRUD 权限和角色：数据集、模型、内核（笔记本）、竞赛、论坛和基准测试，以及站点范围的角色。存在其他细粒度权限（例如投票、标记、IAM 策略管理、子资源版本）；如果您的应用程序需要此处未列出的权限，请联系 Kaggle 团队。注意：授予范围仅授权持有者对底层用户已经有权访问的资源进行操作。站点范围的管理范围（例如，`resources.admin`）无法将用户提升到超出其现有 IAM 权限的范围。

##### 权限

**数据集**

|许可|描述 |
| --- | --- |
| `datasets.get` |读取数据集元数据和文件 |
| `datasets.update` |更新现有数据集 |
| `datasets.delete` |删除数据集 |
| `dataset_versions.create` |创建新的数据集版本（也用于创建新的数据集）|

**型号**

|许可|描述 |
| --- | --- |
| `models.get` |读取模型元数据和文件 |
| `models.create` |创建新模型|
| `models.update` |更新现有模型 |
| `models.delete` |删除模型|

**内核（笔记本）**

|许可|描述 |
| --- | --- |
| `kernels.get` |阅读笔记本 |
| `kernels.update` |创建或更新笔记本 |
| `kernels.delete` |删除笔记本 |
| `kernels.execute` |执行笔记本 |

**比赛**

|许可|描述 |
| --- | --- |
| `competitions.get` |阅读竞赛元数据 |
| `competitions.update` |更新现有竞赛 |
| `competitions.download_data` |下载比赛数据文件 |
| `competitions.participate` |参加比赛 |
| `competitions.submit` |提交比赛 |
| `submissions.get` |阅读竞赛提交材料 |

**论坛**|许可|描述 |
| --- | --- |
| `forum_topics.get` |阅读论坛主题 |
| `forum_topics.create` |创建新的论坛主题 |
| `forum_topics.update` |更新论坛主题 |
| `forum_topics.delete` |删除论坛主题 |
| `forum_messages.get` |阅读论坛消息（回复）|
| `forum_messages.create` |发表论坛留言 |
| `forum_messages.update` |编辑论坛留言 |
| `forum_messages.delete` |删除论坛留言 |

**基准**

|许可|描述 |
| --- | --- |
| `benchmarks.get` |阅读基准元数据 |
| `benchmarks.list` |列出基准 |
| `benchmarks.create` |创造新标杆 |
| `benchmarks.update` |更新现有基准 |
| `benchmarks.delete` |删除基准 |

##### 角色

角色捆绑相关权限。 `viewer` 授予读取访问权限，`editor` 授予读取和写入访问权限，`admin` 授予完全管理访问权限（包括删除和 IAM 更改）。

**每资源角色**|角色 |描述 |
| --- | --- |
| `datasets.viewer` |对数据集的只读访问
| `datasets.editor` |对数据集的读写访问
| `datasets.admin` |数据集全面管理 |
| `models.viewer` |对模型的只读访问|
| `models.editor` |对模型的读写访问
| `models.admin` |模型全面管理|
| `kernels.viewer` |对笔记本的只读访问 |
| `kernels.editor` |对笔记本的读写访问
| `kernels.admin` |全面管理笔记本|
| `competitions.viewer` |竞赛的只读访问权限 |
| `competitions.participator` |参加并提交比赛 |
| `competitions.editor` |竞赛的读写权限|
| `competitions.admin` |赛事全程管理|
| `forum_topics.viewer` |论坛主题的只读访问权限 |
| `forum_topics.editor` |创建和更新论坛主题 |
| `forum_topics.admin` |论坛主题全面管理 |
| `forum_messages.viewer` |只读访问论坛消息 |
| `forum_messages.participator` |发布并回复论坛消息 |
| `forum_messages.editor` |创建和更新论坛消息 |
| `forum_messages.admin` |全面管理论坛消息|
| `benchmarks.viewer` |对基准测试的只读访问|
| `benchmarks.editor` |对基准的读写访问
| `benchmarks.admin` |全面管理基准 |

**全站范围**|角色 |描述 |
| --- | --- |
| `resources.viewer` |对用户可以看到的所有资源类型进行只读访问
| `resources.editor` |用户可以编辑的所有资源类型的读写访问权限
| `resources.admin` |用户可以管理的所有资源类型的完全管理访问权限