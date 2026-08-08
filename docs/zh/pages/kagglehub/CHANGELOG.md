<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 变更日志

## 下一个版本

* 修复了 Windows 上未从服务器端 zip 包装器中提取单个文件下载的问题，这使得原始 zip 存档缓存在请求的文件名下，而不是预期的文件下。 ([#252](https://github.com/Kaggle/kagglehub/issues/252))
* 支持通过`dataset_download(path=...)`下载一个数据集目录，包括文件嵌套和缓存复用。 ([#306](https://github.com/Kaggle/kagglehub/pull/306))

## v1.0.2（2026 年 6 月 9 日）

* 对 tar 文件使用安全提取过滤器以防止提取漏洞。 ([#303](https://github.com/Kaggle/kagglehub/pull/303))

## v1.0.1（2026 年 4 月 28 日）

* 修复返回的详细页面 URL。 ([#295](https://github.com/Kaggle/kagglehub/pull/295))
* 更新 API 令牌页面 URL。 ([#294](https://github.com/Kaggle/kagglehub/pull/294))

## v1.0.0（2026 年 2 月 11 日）

* 正式发布

## v0.4.3（2026 年 2 月 6 日）

* `dataset_download`、`model_download`、`notebook_output_download`、`competition_download`添加`output_dir`参数，可直接下载到自定义目录。 （[#283](https://github.com/Kaggle/kagglehub/pull/283)、[#284](https://github.com/Kaggle/kagglehub/pull/284)、[#285](https://github.com/Kaggle/kagglehub/pull/285)）

## v0.4.2（2026 年 1 月 29 日）

* 重新添加 `set_kaggle_credentials` 方法，以避免根据设置旧凭据对库造成破坏。 ([#281](https://github.com/Kaggle/kagglehub/pull/281))

## v0.4.1（2026 年 1 月 20 日）

* 使用新的 API 令牌进行 `kagglehub.login()` 和 Colab 秘密身份验证。 ([#279](https://github.com/Kaggle/kagglehub/pull/279))

## v0.4.0（2026 年 1 月 7 日）* 恢复版本检查逻辑。 ([#272](https://github.com/Kaggle/kagglehub/pull/272))
* 记录新的身份验证技术。 ([#270](https://github.com/Kaggle/kagglehub/pull/270))
* 使用`kagglesdk`代替自定义HTTP实现。 ([#268](https://github.com/Kaggle/kagglehub/pull/268))
* 放弃对 Python 3.9 的支持。现在所需的最低 Python 版本是 3.10。 ([#260](https://github.com/Kaggle/kagglehub/pull/260))

## v0.3.13（2025 年 8 月 25 日）

* 解决创建包含目录的数据集的问题。 ([#255](https://github.com/Kaggle/kagglehub/pull/255))
* 增强弃用警告的错误消息，使其更加清晰。 ([#249](https://github.com/Kaggle/kagglehub/pull/249))
* 修复 Kaggle 包中与多线程相关的错误。 ([#248](https://github.com/Kaggle/kagglehub/pull/248))
* 改进 Colab 缓存的日志消息，以获得更好的用户体验。 ([#243](https://github.com/Kaggle/kagglehub/pull/243))

## v0.3.12（2025 年 4 月 23 日）

* 修复 `model_signing` `1.0.0` 版本 ([#239](https://github.com/Kaggle/kagglehub/pull/239)) 的重大更改
* 添加`KaggleDatasetAdapter.POLARS`支持`dataset_load`（[#238](https://github.com/Kaggle/kagglehub/pull/238)）
* 将 kwargs 验证添加到`dataset_load` ([#241](https://github.com/Kaggle/kagglehub/pull/241))

## v0.3.11（2025 年 4 月 1 日）

* 添加 `torchtune` 作为用户代理 ([#237](https://github.com/Kaggle/kagglehub/pull/237))

## v0.3.10（2025 年 2 月 25 日）

* 修复Colab环境检测逻辑([#230](https://github.com/Kaggle/kagglehub/pull/230))

## v0.3.9（2025 年 2 月 18 日）

* 将load_datset重命名为dataset_load ([#228](https://github.com/Kaggle/kagglehub/pull/228))
* 支持[Kaggle Packages](https://www.kaggle.com/discussions/product-announcements/564941) ([#196](https://github.com/Kaggle/kagglehub/pull/196))

## v0.3.8（2025 年 2 月 13 日）

* 由于依赖性问题，将签名移至可选功能 ([#225](https://github.com/Kaggle/kagglehub/pull/225))

## v0.3.7（2025 年 1 月 31 日）* 下载时将数据加载器添加到用户代理([#215](https://github.com/Kaggle/kagglehub/pull/215))
* 签署模型并发布到sigstore ([#211](https://github.com/Kaggle/kagglehub/pull/211))
* 在笔记本缓存目录中使用版本号（[#212](https://github.com/Kaggle/kagglehub/pull/212)）
* 笔记本输出下载版本控制 ([#206](https://github.com/Kaggle/kagglehub/pull/206))
* 添加对实用脚本的支持 ([#207](https://github.com/Kaggle/kagglehub/pull/207))
* 修复`README` ([#202](https://github.com/Kaggle/kagglehub/pull/202)) 中的`load_dataset`错字

## v0.3.6（2024 年 12 月 19 日）

* 添加 `kagglehub.load_dataset(...)` ([#192](https://github.com/Kaggle/kagglehub/pull/192), [#197](https://github.com/Kaggle/kagglehub/pull/197))
* 修复自动压缩数据集下载（[#194](https://github.com/Kaggle/kagglehub/pull/194)、[#195](https://github.com/Kaggle/kagglehub/pull/195)）
*更新`docker-hatch`和文档([#193](https://github.com/Kaggle/kagglehub/pull/193))

## v0.3.5（2024 年 12 月 10 日）

* 包括服务器端错误（如果存在）([#183](https://github.com/Kaggle/kagglehub/pull/183))
* 默认情况下选择退出文件记录 ([#190](https://github.com/Kaggle/kagglehub/pull/190))
* 改进版本升级警告([#188](https://github.com/Kaggle/kagglehub/pull/188))
* 添加`kagglehub.notebook_output_download(...)`，目前仅支持HTTP解析器。 ([#184](https://github.com/Kaggle/kagglehub/pull/184))

## v0.3.4（2024 年 11 月 8 日）

* 添加一个简单的 Colab 数据集缓存解析器 ([#177](https://github.com/Kaggle/kagglehub/pull/177))
* 添加 `keras_hub` 作为用户代理 ([#176](https://github.com/Kaggle/kagglehub/pull/176))

## v0.3.3（2024 年 10 月 17 日）

* 在 `kaggle.login(...)` ([#173](https://github.com/Kaggle/kagglehub/pull/173)) 提示时隐藏终端中的 API 密钥
* 在 Kaggle 笔记本环境中使用 `force_download` 时减少日志垃圾邮件 ([#172](https://github.com/Kaggle/kagglehub/pull/172))

## v0.3.2（2024 年 10 月 15 日）* 如果设置了身份验证环境变量但为空，则回退到下一个身份验证机制 ([#168](https://github.com/Kaggle/kagglehub/pull/168))
* `kaggle.whoami()` 在 Kaggle Notebook 环境中返回正确的值 ([#166](https://github.com/Kaggle/kagglehub/pull/166))
* 使用 Colab 秘密时`kaggle.whoami()`返回正确的值（[#165](https://github.com/Kaggle/kagglehub/pull/165)）

## v0.3.1（2024 年 10 月 1 日）

* 附上Kaggle笔记本环境下的比赛（[#161](https://github.com/Kaggle/kagglehub/pull/161)）
* 使用`kagglehub.competition_download(...)` ([#158](https://github.com/Kaggle/kagglehub/pull/158)) 下载比赛
* 通过 Colab 密钥启用授权 ([#157](https://github.com/Kaggle/kagglehub/pull/157))

## v0.3.0（2024 年 9 月 4 日）

* 集成 Keras 指标 ([#152](https://github.com/Kaggle/kagglehub/pull/152))
* 增强日志消息 ([#151](https://github.com/Kaggle/kagglehub/pull/151))
* 升级Python版本支持至3.9及以上([#154](https://github.com/Kaggle/kagglehub/pull/154))

## v0.2.9（2024 年 7 月 31 日）

* 通过忽略模式改进上传 ([#147](https://github.com/Kaggle/kagglehub/pull/147))
* 上传空文件([#145](https://github.com/Kaggle/kagglehub/pull/145))
* 在Kaggle笔记本环境中附加数据集（[#134](https://github.com/Kaggle/kagglehub/pull/134)）
* 使用`kagglehub.dataset_upload(...)`（[#149](https://github.com/Kaggle/kagglehub/pull/149)）上传数据集
* 使用`kagglehub.dataset_download(...)` ([#131](https://github.com/Kaggle/kagglehub/pull/131)) 下载数据集

## v0.2.8（2024 年 7 月 16 日）

* 添加了对 Kaggle 笔记本中隐式令牌身份验证的支持 ([#141](https://github.com/Kaggle/kagglehub/pull/141))
* 改进 Kaggle 和 Colab 环境中缓存模型的日志记录 ([#142](https://github.com/Kaggle/kagglehub/pull/142))

## v0.2.7（2024 年 7 月 1 日）
* 修复模型下载错误

## v0.2.6（2024 年 6 月 10 日）

* 添加对 `.zip` 存档 ([#135](https://github.com/Kaggle/kagglehub/pull/135)) 的支持
* 减少垃圾邮件记录 ([#124](https://github.com/Kaggle/kagglehub/pull/124))
* 并行下载模型文件([#122](https://github.com/Kaggle/kagglehub/pull/122))## v0.2.5（2024 年 5 月 2 日）

* 添加缺少的打包依赖项 ([#115](https://github.com/Kaggle/kagglehub/pull/115))
* 创建 whoami 方法 ([#114](https://github.com/Kaggle/kagglehub/pull/114))
* 迁移所有测试以使用 Flask ([#111](https://github.com/Kaggle/kagglehub/pull/111))

## v0.2.4（2024 年 4 月 26 日）

* 当模型实例存在但尚未准备好版本时创建新版本([#108](https://github.com/Kaggle/kagglehub/pull/108))
* 删除上传时的压缩([#105](https://github.com/Kaggle/kagglehub/pull/105))

## v0.2.3（2024 年 4 月 16 日）

* 提高上传速度([#100](https://github.com/Kaggle/kagglehub/pull/100))

## v0.2.2（2024 年 3 月 27 日）

* 添加对单个文件上传的支持([#97](https://github.com/Kaggle/kagglehub/pull/97))

## v0.2.1（2024 年 3 月 21 日）

* 添加目录上传支持([#82](https://github.com/Kaggle/kagglehub/pull/93))

## v0.2.0（2024 年 2 月 28 日）

* 在post函数中添加raise_for_status() ([#82](https://github.com/Kaggle/kagglehub/pull/89))
* 使用 ArtifactRegistry 来获取辅助图像 ([#83](https://github.com/Kaggle/kagglehub/pull/87))

## v0.1.9（2023 年 2 月 5 日）

* 修复检测新版本时的消息（[#82](https://github.com/Kaggle/kagglehub/pull/82)）
* 错误链接到模型详细信息页面（Colab 解析器）([#83](https://github.com/Kaggle/kagglehub/pull/83))

## v0.1.8（2024 年 1 月 31 日）

* 在错误消息中包含模型详细信息页面的 URL ([#80](https://github.com/Kaggle/kagglehub/pull/80))
* 如果在这些环境上运行，请将 Kaggle/Colab 添加到用户代理 ([#78](https://github.com/Kaggle/kagglehub/pull/78))
* 改进 Colab 解析器的日志记录 ([#77](https://github.com/Kaggle/kagglehub/pull/77))

## v0.1.7（2024 年 1 月 29 日）

* 修复 `model_upload` 与嵌套目录 ([#75](https://github.com/Kaggle/kagglehub/pull/75))
* 检测`kagglehub`是否有新版本并建议升级([#73](https://github.com/Kaggle/kagglehub/pull/73))## v0.1.6（2024 年 1 月 22 日）

* 修复`model_upload`中的权限问题并添加集成测试（[#69](https://github.com/Kaggle/kagglehub/pull/69)）
* 在 `model_upload` ([#62](https://github.com/Kaggle/kagglehub/pull/62)) 中指定许可证为可选
* 改进日志记录（[#68](https://github.com/Kaggle/kagglehub/pull/68)、[#71](https://github.com/Kaggle/kagglehub/pull/71)）
* 添加断点续传([#55](https://github.com/Kaggle/kagglehub/pull/55))

## v0.1.5（2024 年 1 月 8 日）

* 防止某些环境下日志信息被打印两次([#57](https://github.com/Kaggle/kagglehub/pull/57))
* 添加 Colab 模型解析器 ([#53](https://github.com/Kaggle/kagglehub/pull/53))
* 添加 `kagglehub.model_upload(...)` ([#43](https://github.com/Kaggle/kagglehub/pull/43), [#51](https://github.com/Kaggle/kagglehub/pull/51), [#52](https://github.com/Kaggle/kagglehub/pull/52))
* 将 `kagglehub` 用户代理添加到 Kaggle API V1 调用 ([#50](https://github.com/Kaggle/kagglehub/pull/50))
* 为`kagglehub.model_download()`添加`force_download`选项（[#44](https://github.com/Kaggle/kagglehub/pull/44)）

## v0.1.4（2023 年 12 月 11 日）

* 改进`KaggleCacheResolver` ([#40](https://github.com/Kaggle/kagglehub/pull/40)) 的错误消息

## v0.1.3（2023 年 12 月 5 日）

* 改进 Kaggle API 调用的错误消息 ([#38](https://github.com/Kaggle/kagglehub/pull/38))
* 文件下载后执行完整性检查([#37](https://github.com/Kaggle/kagglehub/pull/37))

## v0.1.2（2023 年 11 月 30 日）

* 修复笔记本环境检测逻辑([#36](https://github.com/Kaggle/kagglehub/pull/36))

## v0.1.1（2023 年 11 月 30 日）

* 修复了登录凭据验证（[#33](https://github.com/Kaggle/kagglehub/pull/33)、[#34](https://github.com/Kaggle/kagglehub/pull/34)）

## v0.1.0（2023 年 11 月 29 日）

* 在禁用网络的 Kaggle 笔记本环境中附加模型 ([#27](https://github.com/Kaggle/kagglehub/pull/27))
* 通过笔记本中的 IPyWidgets 登录 ([#28](https://github.com/Kaggle/kagglehub/pull/28))
* 通过终端提示登录([#23](https://github.com/Kaggle/kagglehub/pull/23))
* 在 Kaggle Notebook 环境中附加模型 ([#19](https://github.com/Kaggle/kagglehub/pull/19))
* 支持断点续传([#17](https://github.com/Kaggle/kagglehub/pull/17))
* 支持无版本模型句柄([#16](https://github.com/Kaggle/kagglehub/pull/16))## v0.0.1a1（2023 年 10 月 26 日）

* 通过环境变量或凭据文件登录 ([#9](https://github.com/Kaggle/kagglehub/pull/9))
* 通过HTTP下载公共模型并存储在本地缓存中（[#8](https://github.com/Kaggle/kagglehub/pull/8)，[#12](https://github.com/Kaggle/kagglehub/pull/12)）

## v0.0.1a0（2023 年 10 月 5 日）

* kagglehub 库的骨架 ([#1](https://github.com/Kaggle/kagglehub/pull/1))