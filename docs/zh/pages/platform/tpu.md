<!-- kaggle-docs: machine-translated zh-CN from English source -->

# 张量处理单元 (TPU)

![TPU v3](https://storage.googleapis.com/kaggle-media/tpu/tpuv3angle.jpg)

    TPU 现已在 Kaggle 上免费提供。 TPU 是专门用于深度学习任务的硬件加速器。 Tensorflow 2.1 中通过 Keras 高级 API 以及较低级别的使用自定义训练循环的模型都支持它们。

    您每周最多可以使用 TPU 20 小时，单次会话一次最多可以使用 9 小时。

    本页说明如何：
    1) 在 Tensorflow 和 Keras 中启用 TPU，
    2）调整batch size和学习率，
    3) 优化数据管道以获得快速加速器

如果您想直接跳到示例，这里是：[Five flowers with Keras and Xception on TPU](https://www.kaggle.com/code/mgorner/five-flowers-with-keras-and-xception-on-tpu)

以下文档是为 Kaggle 不再支持的早期 TPU 版本编写的。有关新版本的帮助，请参阅 [official TPU documentation.](https://docs.cloud.google.com/tpu/docs)

### Keras 中的 TPU

将笔记本中的“加速器”开关切换到“TPU v3-8”后，即可在 Tensorflow Keras 中启用 TPU 训练：# 检测并初始化TPU
    tpu = tf.distribute.cluster_resolver.TPUClusterResolver()
    
    # 实例化分配策略
    tf.tpu.experimental.initialize_tpu_system(tpu)
    tpu_strategy = tf.distribute.TPUStrategy(tpu)
    
    # 在策略范围内实例化模型会在 TPU 上创建模型
    使用 tpu_strategy.scope()：
        model = tf.keras.Sequential( … ) # 正常定义模型
        模型.编译(...)
    
    # 正常训练模型
    model.fit（training_dataset，epochs=EPOCHS，steps_per_epoch=…）

TPU 是网络连接的加速器，您必须首先在网络上找到它们。这就是`TPUClusterResolver.connect()`的作用。

然后实例化一个`TPUStrategy`。该对象包含必要的分布式训练代码，可在具有 8 个计算核心的 TPU 上运行（请参阅下面的硬件部分）。

最后，您可以通过在策略范围内实例化模型来使用`TPUStrategy`。这将在 TPU 上创建模型。模型大小仅受 TPU RAM 的限制，而不受运行 Python 代码的虚拟机上可用内存量的限制。模型创建和模型训练使用常用的 Keras API。

### 批量大小、学习率、每次执行的步数要在 TPU 上运行得更快，请增加批量大小。经验法则是每个核心使用 128 个元素的批次（例如：对于具有 8 个核心的 TPU，批次大小为 128\*8=1024）。在这种大小下，TPU 的 128x128 硬件矩阵乘法器（请参阅下面的硬件部分）很可能保持忙碌状态。不过，您会开始看到每个核心 8 个批量大小的有趣加速。在上面的示例中，批量大小通过以下代码行随核心数量缩放：

    BATCH_SIZE = 16 * tpu_strategy.num_replicas_in_sync

当 TPUStrategy 在单个 TPU v3-8 上运行时，核心数量为 8。这是 Kaggle 上可用的硬件。它可能更多地依赖于谷歌云上可用的称为 TPU pod 的更大配置。

    ![illustration of batch size and learning rate scaling rule of thumb on TPU](https://storage.googleapis.com/kaggle-media/tpu/tpu_rule_of_thumb.png)

随着批量大小的增加，TPU 将更快地处理训练数据。仅当较大的训练批次产生更多的“训练工作”并使模型更快地达到所需的精度时，这才有用。这就是为什么经验法则还要求随着批量大小增加学习率。您可以从按比例增加开始，但可能需要进行额外的调整才能找到给定模型和加速器的最佳学习率计划。从 Tensorflow 2.4 开始，model.compile() 接受新的 `steps_per_execution` 参数。该参数指示 Keras 一次向 TPU 发送多个批次。除了降低通信开销之外，这还使 XLA 编译器有机会跨多个批次优化 TPU 硬件利用率。使用此选项，不再需要将批量大小推至非常高的值来优化 TPU 性能。只要每个核心使用至少 8 个批量大小（对于 TPUv3-8，>=64），性能就应该是可以接受的。示例：

        模型.编译（...，
                      每次执行的步骤=32)

### tf.data.Dataset 和 TFRecords

由于 TPU 速度非常快，许多移植到 TPU 的模型最终都会出现数据瓶颈。在每个训练周期的大部分时间里，TPU 都处于闲置状态，等待数据。 TPU 专门从 GCS（谷歌云存储）读取训练数据。如果 GCS 连续并行地从多个文件流式传输，它可以维持相当大的吞吐量。遵循一些最佳实践将优化吞吐量：> 
> 对于 TPU 训练，将 GCS 中的数据组织为合理数量（10 到 100）的相当大的文件（10 到 100 MB）。
>     

如果文件太少，GCS 将没有足够的流来获得最大吞吐量。如果文件太多，访问每个单独的文件就会浪费时间。

TPU 训练的数据通常分为适当数量的较大文件。常用的容器格式是 TFRecords。您可以通过编写以下内容从 TFRecords 文件加载数据集：

    # 在 Kaggle 上您还可以使用 KaggleDatasets().get_gcs_path() 获取 Kaggle 数据集的 GCS 路径
    filenames = tf.io.gfile.glob("gs://flowers-public/tfrecords-jpeg-512x512/*.tfrec") # 列出 GCS 上的文件
    数据集 = tf.data.TFRecordDataset(文件名)
    dataset = dataset.map(...) # TFRecord 在这里解码...

要启用多个 TFRecord 文件的并行流，请修改代码，如下所示：自动 = tf.data.experimental.AUTOTUNE
        ignore_order = tf.data.Options()
        ignore_order.experimental_definistic = False
        
        # 在 Kaggle 上您还可以使用 KaggleDatasets().get_gcs_path() 获取 Kaggle 数据集的 GCS 路径
        filenames = tf.io.gfile.glob("gs://flowers-public/tfrecords-jpeg-512x512/*.tfrec") # 列出 GCS 上的文件
        数据集 = tf.data.TFRecordDataset(文件名, num_parallel_reads=AUTO)
        数据集 = dataset.with_options(ignore_order)
        dataset = dataset.map(...) # TFRecord 在这里解码...

这里有两个设置：

- `num_parallel_reads=AUTO` 指示 API 从多个文件中读取（如果可用）。它会自动计算出有多少。
- `experimental_deterministic = False` 禁用数据顺序执行。无论如何，我们都会对数据进行改组，因此顺序并不重要。通过此设置，API 可以在任何 TFRecord 流入后立即使用它。这些代码片段中省略了一些细节，因此请检查示例以获取完整的数据管道代码。
    在 Keras 和 TensorFlow 2.1 中，还可以将训练数据作为内存中的 numpy 数组发送到 TPU。这可行，但不是最有效的方法，尽管对于适合内存的数据集来说，它可以是好的。

### 带有 TPU 的私有数据集

TPU 可与公共 Kaggle 数据集和私有 Kaggle 数据集配合使用。  
        唯一的区别是，如果您想使用私有 Kaggle 数据集，那么您需要： 
        (1) 在笔记本编辑器的“附加组件”菜单中启用“Google Cloud SDK”； 
        (2) 初始化TPU，然后运行“Google Cloud SDK凭据”代码片段；最后 
        (3) 记下返回的 Google Cloud Storage 路径。# 步骤1：从Cloud SDK获取凭证
        从 kaggle_secrets 导入 UserSecretsClient
        user_secrets = UserSecretsClient()
        user_credential = user_secrets.get_gcloud_credential()
        
        # 第 2 步：设置凭据
        user_secrets.set_tensorflow_credential(user_credential)
    
        # 步骤3：使用熟悉的调用来获取数据集的GCS路径
        从 kaggle_datasets 导入 KaggleDatasets
        GCS_DS_PATH = KaggleDatasets().get_gcs_path()	

如果您正在使用公共 Kaggle 数据集，则只需第 3 步。

### TPU 硬件

TPU v3-8 板大约 20 英寸（50 厘米），是一个相当大的硬件。它配备 4 个双核 TPU 芯片，总共 8 个 TPU 核心。

    ![TPU v3-8 hardware, 4 chips, 8 cores](https://storage.googleapis.com/kaggle-media/tpu/tpu_cores_and_chips.png)

每个 TPU 核心都有一个传统的矢量处理部分 (VPU) 以及能够处理 128x128 矩阵的专用矩阵乘法硬件。这是专门加速机器学习工作负载的部分。TPU 配备 128GB 高速内存，允许更大的批次、更大的模型以及更大的训练输入。在上面的示例中，您可以尝试使用数据集中也提供的 512x512 像素输入图像，并查看 TPU v3-8 轻松处理它们。

    <!-- The TPU monitor feature is currently not supported for TPUs. When it's supported, we can uncomment the below. -->
    <!--<h3 id="tpu5">TPU显示器</h3>-->
    
    <!--<p>-->
    <!--<img className="cms-img-left" alt="TPU monitor" style="padding: 0 15px; float: left;" src="https://storage.googleapis.com/kaggle-media/tpu/tpu_monitor.png" width="220pt">-->
    
    <!--When you are runnig a TPU workload on Kaggle, a performance monitor-->
    <!--appears when you click on the TPU gauge.-->
    <!--<br/>-->
    <!--<br/>-->
    <!--The MXU percentage indicates how efficiently the TPU compute hardware is utilized. Higher is better.-->
    <!--<br/>-->
    <!--<br/>-->
    <!--The "Idle Time" percentage measures how often the TPU is sitting idle waiting for data. You should optimize you data pipeline to make this as low as possible.-->
    <!--<br/>-->
    <!--<br/>-->
    <!--The measurements are refreshed approximately every 10 seconds and only appear when the TPU is running a computation.-->
    <!--</p>-->

### 在 TPU 上保存/加载模型

当从本地磁盘加载和保存模型TPU模型时，必须使用experimental\_io\_device选项。技术解释位于本节末尾。如果写入 GCS，则可以省略，因为 TPU 可以直接访问 GCS。此选项对 GPU 不起作用。

##### 在本地保存 TPU 模型

    save_locally = tf.saved_model.SaveOptions(experimental_io_device='/job:localhost')
    model.save('./model', options=save_locally) # 以 Tensorflow 的“SavedModel”格式保存

#####从本地磁盘加载TPU模型使用strategy.scope()：
        load_locally = tf.saved_model.LoadOptions(experimental_io_device='/job:localhost')
        model = tf.keras.models.load_model('./model', options=load_locally) # 以 Tensorflow 的“SavedModel”格式加载

##### 从 TPU 模型本地写入检查点

    save_locally = tf.saved_model.SaveOptions(experimental_io_device='/job:localhost')
    checkpoints_cb = tf.keras.callbacks.ModelCheckpoint('./checkpoints', options=save_locally)
    model.fit(..., 回调=[checkpoints_cb])

##### 将模型从 Tensorflow Hub 直接加载到 TPU

    导入tensorflow_hub作为集线器
    使用strategy.scope()：
        load_locally = tf.saved_model.LoadOptions(experimental_io_device='/job:localhost')
        pretrained_model = hub.KerasLayer('https://tfhub.dev/tensorflow/efficientnet/b6/feature-vector/1', trainable=True, input_shape=[512,512,3], load_options=load_locally)

例如这个[EfficientNetB7 Notebook](https://www.kaggle.com/mgornergoogle/efficientnetb7-on-100-flowers#Model)。

##### 实验\_io\_device 解释要了解 Experimental\_io\_device='/job:localhost' 标志的作用，首先需要一些背景信息。 TPU 用户会记得，为了在 TPU 上训练模型，您必须在 TPUStrategy 范围中实例化模型。像这样：

    # 连接到 TPU 并实例化分配策略
    tpu = tf.distribute.cluster_resolver.TPUClusterResolver(tpu='本地')
    tf.tpu.experimental.initialize_tpu_system(tpu)
    tpu_strategy = tf.distribute.TPUStrategy(tpu)
    
    # 在策略范围内实例化模型
    使用 tpu_strategy.scope()：
        模型 = tf.keras.Sequential( … )

这个样板代码实际上做了两件事：策略作用域指示 Tensorflow 在 TPU 内存中实例化模型的所有变量。
TPUClusterResolver.connect() 调用自动进入 TPU 设备范围，指示 Tensorflow 在 TPU 上运行 Tensorflow 操作。
现在，如果您在连接到 TPU 时调用 model.save('./model')，Tensorflow 将尝试在 TPU 上运行保存操作，并且由于 TPU 是网络连接的加速器，无法访问本地磁盘，因此操作将失败。请注意，保存到 GCS 仍然可以工作。 TPU 确实可以访问 GCS。

如果要将 TPU 模型保存到本地磁盘，则需要在本地计算机上运行保存操作，这就是experimental\_io\_device='/job:localhost' 标志的作用。

### 代码竞赛中的 TPU

由于某些纯代码竞赛的技术限制，我们无法支持在 TPU 上运行的笔记本提交，竞赛规则中有明确规定。但这并不意味着您不能使用 TPU 来训练您的模型！解决此限制的方法是在使用 TPU 的单独笔记本中运行模型训练，然后保存生成的模型。然后，您可以将该模型加载到用于提交的笔记本中，并使用 GPU 来运行推理并生成预测。

    这在实践中是如何运作的：

     **第 1 步：保存模型**

        # 使用 .save() 功能将模型保存到磁盘。这里我们保存为.h5格式
        # 此步骤将被替换为在 Tensorflow 2.3 中保存模型的替代调用
        model.save('model.h5')

     **第 2 步：将模型放入数据集中** 

    您可以通过数据查看器从笔记本的输出轻松创建数据集。更多详情可以查看我们的[Dataset Documentation](https://www.kaggle.com/docs/datasets#creating-a-dataset)

     **第 3 步：将模型加载到推理笔记本中** 

        # 您现在可以加载模型并使用此笔记本中的 GPU 运行推理。
        # 由于此笔记本仅使用 GPU，因此您可以将其提交到比赛
    
        模型 = tf.keras.models.load_model('../input/yourDataset/model.h5')

### 更多信息和教程此处提供包含更多信息、最佳实践和示例的 TPU 实践教程：  

    [Keras and modern convnets, on TPUs.](https://codelabs.developers.google.com/codelabs/keras-flowers-tpu/)

    您还可以在[our YouTube channel](https://www.youtube.com/kaggle)查看我们的TPU视频教程[Learn With Me: Getting Started With TPUs](https://youtu.be/1pdwRQ1DQfY)！

### TPU游乐场比赛

我们准备了包含 13,000 张花卉图像的数据集供您使用。您可以在这个游乐场竞赛中尝试一下 TPU：[Flower Classification with TPUs](https://www.kaggle.com/c/flower-classification-with-tpus)  

    要轻松开始，请查看本教程笔记本和入门项目，这是我们深度学习课程的一部分：

- [Getting Started with Petals to the Metal](https://www.kaggle.com/ryanholbrook/create-your-first-submission)
- [Starter Project: Create Your First Submission](https://www.kaggle.com/kernels/fork/10204702)

### PyTorch 中的 TPU

将笔记本中的“加速器”开关切换到“TPU v3-8”后，即可在 Tensorflow PyTorch 中启用 TPU 训练：# 第 1 步：安装 Torch-XLA（支持加速线性代数 (XLA) 的 PyTorch）
        !curl https://raw.githubusercontent.com/pytorch/xla/master/contrib/scripts/env-setup.py -o pytorch-xla-env-setup.py
        !python pytorch-xla-env-setup.py --version nightly --apt-packages libomp5 libopenblas-dev
    
        # 第 2 步：运行 PyTorch 代码
        TPU (TPU v3-8) 有 8 个核心，每个核心本身就是一个 XLA 设备。  
        您可以在单个 XLA 设备上运行代码，但要充分利用 
        对于 TPU，您将希望同时在所有 8 个内核上运行代码。 
        有关演示如何执行此操作的示例，您可以参考 
        终极 PyTorch TPU 教程，
        我喜欢干净的 TPU 训练内核并且我不能说谎，
        超级 Duper 快速 PyTorch TPU 内核，
        和 XLM Roberta Large Pytorch TPU 

将 TPU 与 PyTorch 结合使用时，还应注意以下事项：#1：启动脚本 
        https://raw.githubusercontent.com/pytorch/xla/master/contrib/scripts/env-setup.py
    
        #2：分布式训练函数mp_fn
        xmp.spawn(_mp_fn, nprocs=8, start_method='fork')
    
        #3：在 mp_fn 之外实例化模型并使用 MpModelWrapper
        MX = JigsawModel() => MX = xmp.MpModelWrapper(JigsawModel())
    
        #4：将模型发送到 TPU 设备
        设备 = xm.xla_device()
        型号 = MX.to(设备)
    
        #5：训练循环的更改：将数据发送到设备
        ids = ids.to(设备, dtype=torch.long)
        token_type_ids = token_type_ids.to(设备, dtype=torch.long)
        mask = mask.to(设备, dtype=torch.long)
        目标 = Targets.to(设备, dtype=torch.float)

        #6：打印消息
        xm.master_print#7：加载数据
        train_dataset = … # 用户定义，可以在 mp_fn 之外
        # 在 mp_fn 中：
        train_sampler = torch.utils.data.distributed.DistributedSampler(train_dataset,
                    num_replicas=xm.xrt_world_size(),rank=xm.get_ordinal(), …)
        train_data_loader = torch.utils.data.DataLoader(train_dataset,
                                    采样器=train_sampler，...）

        #8：数据训练
        对于范围内的纪元（EPOCHS）：
            para_loader = pl.ParallelLoader(train_data_loader, [设备])
            train_fn(para_loader.per_device_loader(设备), …)

        #9：TPU 的结果
        xm.mesh_reduce

        #10：模型保存/恢复（内存优化）
        导入 torch_xla.utils.serialization 作为 xser
        xser.save(model.state_dict(), f"model.bin", master_only=True)
        model.load_state_dict(xser.load(f"model.bin"))
    
        #11：模型保存/恢复（PyTorch 标准）
        torch_xla.core.xla_model.save
        火炬.负载（...）
    
        #12：内存数据集不足：
        可以从本地主机加载
        从 GCS 以 TFRecord 格式加载时，存在 TFRecords PyTorch 加载器