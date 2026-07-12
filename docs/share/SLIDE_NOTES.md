# 逐页解说 & 知识点手册

> 与 `index.html` 幻灯片和 `SPEECH.md` 演讲稿配套使用。
>
> 每一页包含三部分：
> - **① 页面解说**：这一页在讲什么、为什么讲、如何讲
> - **② 涉及知识点**：术语解释 · 深度补充 · 常见误解
> - **③ Q&A 预案**：听众可能提的问题（若适用）
>
> 阅读建议：讲者备课时逐页扫读；学生学员可作学习笔记。

---

## Page 1 · 封面

**页面解说**
封面页——建立信任的第一印象。三条信息卡片是"承诺"：
- 🎓 从大数据基础讲起 → 面向零 AI 背景听众
- 📈 生产验证 · 150 亿+/日 → 说明**不是 PPT 架构**
- 🧩 8 章 · 约 60 分钟 → 时间预期

**涉及知识点**
- **Flink 2.x**：Apache Flink 于 2025-03 发布的 2.0 版本，是 9 年来第一个大版本，AI 集成是最重要方向。
- **流式推理**：数据流入即推理，区别于传统"离线批量打标"。
- **Agent 训练评测取数闭环**：Agent 学习需要取历史样本 + 实时反馈两类数据，构成闭环。

**Q&A 预案**
- Q：Flink 1.x 和 2.x 有什么区别？→ 2.x 引入分离式状态管理、物化表、AI 深度集成，是 AI-Native 化的起点。

---

## Page 2 · Agenda

**页面解说**
路线图——8 章逐条展开，用逐步揭示（fragment）配合讲述节奏。开场提出**三个承诺**：① 从零讲起；② 真跑起来的系统；③ 面向硕士生的建议。这是 PPT 差异化的核心。

**涉及知识点**
- **Data-Centric AI**：以数据为中心的 AI 范式，强调"改数据"而非"改模型"（吴恩达 2021 年提出）。
- **Agent / Skill / MCP**：
  - Agent = 能规划、决策、调工具的 AI 智能体
  - Skill = Agent 可调用的技能包（Anthropic 2024 推出）
  - MCP = Model Context Protocol，Agent 与工具间的标准协议
- **FLIP-577**：Flink 社区 2025 最重要的 AI 提案

---

## Page 3 · 第 1 章 分隔页 · 大数据与数据工程全景

**页面解说**
分隔页——用视觉节奏切换章节。金句锚定：**"20 年大数据史 = 把延迟从天→秒→毫秒压缩"**。这个视角贯穿全场。

**涉及知识点**
- 该金句是本 PPT 的"元叙事"。后续每一章都能回到这个主线上。

---

## Page 4 · 什么是大数据 / 什么是数据工程

**页面解说**
定义澄清页。两个核心问题：
1. 大数据是什么？→ 单机存不下算不完
2. 数据工程做什么？→ 把原始数据变成可用资产

**涉及知识点**
- **4V**：
  - **Volume**（体量）：TB / PB / EB 级
  - **Velocity**（速度）：数据产生和处理速度
  - **Variety**（多样）：结构化 / 半结构化 / 非结构化
  - **Value**（价值密度低）：TB 数据里可能只有 GB 有用
- **数据工程 vs 数据科学**：
  - 数据工程师 → 修路修仓库（Pipeline、ETL、Data Warehouse）
  - 数据科学家 → 找规律建模型（EDA、Modeling、A/B Test）
- **AI 时代边界融合**：Agent 能自动做 EDA、写 SQL；数据工程师需要懂模型、懂 Prompt。

**Q&A 预案**
- Q：AI 时代还需要数据工程师吗？→ 需要，且需求更多。**Agent 能干"取数"，但数据平台、数据治理、数据合规必须人来设计**。

---

## Page 5 · 大数据 20 年发展历程

**页面解说**
时间线，从 2003 到今天。用 Logo 图（Hadoop、Spark、Kafka、Flink、Iceberg）帮学生建立视觉锚点。**注意：讲的时候强调主线——延迟一路在压**。

**涉及知识点**
- **Google 三驾马车（2003-2006）**：
  - **GFS**（Google File System, 2003）：分布式文件系统，Hadoop HDFS 的原型
  - **MapReduce**（2004）：分布式计算范式
  - **BigTable**（2006）：分布式 KV 存储
- **Hadoop（2006）**：Doug Cutting 开源实现，让每家公司都能玩大数据
- **Spark（2009-2014）**：Matei Zaharia 在 UC Berkeley 提出，用内存计算把 MR 提速 10-100 倍
- **Kafka（2011）**：LinkedIn 开源，分布式消息队列，流处理入口
- **Flink（2014）**：TU Berlin 学术项目 → Apache 顶级项目，真流处理
- **Iceberg（2020s）**：Netflix 出品的表格式，湖仓一体基石

**深度补充**：Lambda 架构 vs Kappa 架构
- Lambda：批+流双套系统（复杂）
- Kappa：一套流处理搞定（Flink 主推）

---

## Page 6 · 批处理 vs 流处理

**页面解说**
核心概念页——用**快递驿站 vs 传送带**类比。别一上来就讲技术，先讲直觉，再讲原理。

**涉及知识点**
- **批处理（Batch）**：数据有界，一次处理一批
  - 代表：Hadoop MapReduce、Spark、Hive
- **流处理（Streaming）**：数据无界，连续处理
  - 代表：Flink、Kafka Streams、Storm
- **有界 vs 无界**：Flink 的核心抽象——把批看作有界流，实现流批一体
- **微批（Micro-batch）**：Spark Streaming 的方案——把流切成小批处理。**Flink 不用微批，用真流**

**深度补充**
- Flink 的 **Watermark** 机制：处理乱序流的关键，允许晚到数据在窗口关闭前被处理。

**Q&A 预案**
- Q：Spark Streaming 也能做流处理，为什么用 Flink？→ Spark 用微批（100ms 级），Flink 是真流（毫秒级）；且 Flink 状态管理和 Exactly-Once 更成熟。

---

## Page 7 · 什么是 Apache Flink

**页面解说**
Flink 专属页。Logo 松鼠是德语"敏捷"。**三个关键词让学生记住：状态、Exactly-Once、流批一体**。

**涉及知识点**
- **状态（State）**：Flink 能记住历史，通过 RocksDB 或内存后端存储。**这是它超越无状态计算引擎的关键**。
- **Checkpoint**：周期性给整个流拍一致性快照，故障时恢复到快照点。基于 Chandy-Lamport 算法。
- **Exactly-Once**：不丢不重。Flink 内部通过 Checkpoint 实现，端到端需配合 Source（Kafka offset）和 Sink（2PC）。
- **流批一体（Unified Batch & Streaming）**：一套 API、一套引擎跑实时和离线。
- **Flink 2.0（2025-03）关键改进**：
  - **分离式状态管理**：计算和状态分离，云原生友好
  - **物化表（Materialized Table）**：SQL 声明式维护实时视图
  - **流式湖仓**：Flink + Iceberg/Paimon 深度集成
  - **AI 集成**：FLIP-577 是核心方向

**Q&A 预案**
- Q：Flink 和 Kafka Streams 的区别？→ Kafka Streams 是"库"，跟 Kafka 强绑定；Flink 是"引擎"，独立部署，能力更全（SQL、CEP、批处理）。

---

## Page 8 · 数据管道 / ETL 是什么

**页面解说**
ETL 澄清页。**核心命题：AI 推理进入 T 环节**。让学生理解"Flink for AI"到底做什么。

**涉及知识点**
- **ETL vs ELT**：
  - **ETL**：先转换后加载（传统数仓）
  - **ELT**：先加载再转换（现代数据湖，用 Snowflake、BigQuery 那种）
- **典型数据源**：
  - **MQ**：Kafka（LinkedIn 开源）、Pulsar（Yahoo 开源，多租户、分层存储）
  - **数据湖**：Hive（Facebook 开源，表格式老）、Iceberg（Netflix，新一代）、Hudi（Uber）
- **AI in T 的具体形式**：
  - Embedding 向量化（把文本转向量）
  - LLM 打标（分类、摘要、审核）
  - 特征生成（组合基础特征生成高阶特征）

---

## Page 9 · AI 训练 vs 推理 + 名词速查

**页面解说**
名词墙——学生看完这页就有底了。**训练是学生上课、推理是学生考试**——直白到不能再直白。

**涉及知识点**
- **Training（训练）**：优化模型参数，需要海量数据 + 高算力 + 长时间（几天到几个月）
- **Inference（推理）**：用训好的模型预测新样本，低延迟要求高
- **Fine-tuning（微调）**：在预训练模型基础上小规模训练，适配特定任务
- **GPU**：图形处理器，本用于游戏，深度学习兴起后成为算力基础设施。**NVIDIA A100/H100** 是主流。
- **Python GIL（Global Interpreter Lock）**：CPython 实现的一把大锁，同一时刻只有一个线程执行 Python 字节码。**是并行计算的瓶颈**。
- **gRPC**：Google 开源的 RPC 框架，基于 HTTP/2 + Protocol Buffers，跨语言、高性能。
- **Triton Inference Server**：NVIDIA 开源的模型推理服务器，支持 TensorRT / PyTorch / TensorFlow，支持动态 Batch。
- **HPA / AHPA**：
  - **HPA**（Horizontal Pod Autoscaler）：K8s 内置，基于 CPU/内存指标响应式扩缩
  - **AHPA**（Advanced/Predictive HPA）：基于预测提前扩缩，阿里云 ACK 提供

---

## Page 10 · 第 2 章 分隔页

**页面解说**
分隔页。**"AI 时代胜负手是谁能把新鲜数据更快送到模型面前"**——第二个金句。

---

## Page 11 · 三个时代对数据底座的要求

**页面解说**
时代对比表。**TB → PB → EB**，三次跃迁。让学生感受到"数据底座"每十年重写一次。

**涉及知识点**
- **互联网时代（2000s）**：关系型数据库、数据仓库、OLAP（在线分析）
  - 代表：Oracle、Teradata、Vertica
- **移动互联网时代（2010s）**：日志爆炸，Lambda 架构盛行
  - 代表：Hadoop + Storm、Spark + Kafka
- **AI 时代（2023+）**：非结构化爆炸 + GPU 算力
  - 新组件：向量数据库（Milvus、Pinecone、Weaviate）、特征平台（Feast、Tecton）、湖仓一体（Iceberg、Paimon）

---

## Page 12 · 大模型 = 大数据 + 大算力 · Data-Centric AI

**页面解说**
**引用 GPT-1 到 GPT-4 的数据规模**（4.8GB → 50TB），让学生震撼到数据的重要性。**Andrew Ng 的观点：AI 下半场是数据竞争**。

**涉及知识点**
- **Data-Centric AI**（吴恩达提出）：
  - Model-Centric：固定数据，调模型
  - Data-Centric：固定模型，调数据
- **SFT**（Supervised Fine-Tuning）：监督微调，用高质量指令数据训模型
- **RAG**（Retrieval-Augmented Generation）：检索增强生成，先检索相关文档再生成
- **数据工程占 90% 人力**：业界共识，Kaggle 2022 调查数据

---

## Page 13 · AI 对软件工程 & 数据工程的变化

**页面解说**
范式变革页。**从"确定逻辑"到"概率编排"**——这是软件工程史上的第三次范式变革（前两次：结构化 → 面向对象）。

**涉及知识点**
- **Prompt Engineering**：编写、优化提示词，让 LLM 输出更好
- **Eval（评测）**：LLM 的"单元测试"，用一组基准问题评估质量
- **Embedding**：把文本 / 图像 / 音频转为固定维度向量，用于相似度计算
- **数据血缘（Data Lineage）**：追踪数据从源到消费的路径，用于合规和调试
- **典型工具**：LangSmith（评测）、Ragas（RAG 评测）、Weights & Biases（实验追踪）

---

## Page 14 · AI × Data · 双向飞轮

**页面解说**
**范式判断页**——全场核心观点之一。左右对照 + 中间飞轮的视觉设计。**Flink 处在飞轮中枢**是关键台词。约 1.5 分钟。

**涉及知识点**
- **AI for Data**：AI 反哺数据工程
  - **Agentic ETL**：让 Agent 自动写数据管道
  - **NL2SQL**：自然语言转 SQL（Text-to-SQL）
  - **Skill**（Anthropic 2024）：Agent 的技能包
  - **MCP**（Model Context Protocol）：Agent 与工具的标准协议
  - **flink-agents**：Flink 社区的 Agent 项目
- **Data for AI**：数据为 AI 转型
  - **多模态入湖**：视频、音频、图像入数据湖
  - **合成数据**：LLM 生成训练数据
  - **RAG 索引**：向量检索基础设施

**Q&A 预案**
- Q：Agentic ETL 会不会取代数据工程师？→ 短期不会，长期会重塑角色——工程师从"写 SQL"变成"设计工具和护栏"。

---

## Page 15 · 大模型时代数据管道的变化

**页面解说**
**管道边界消失**——过去 ETL 只搬运，现在管道内嵌 AI。是"Flink for AI"提出的时代背景。

**涉及知识点**
- **UDF**（User-Defined Function）：用户自定义函数，Flink 允许 SQL 中调用。**AI 推理常做成 UDF**。
- **FLIP-577 · AI-Native Flink**：把 AI 深度集成到 Flink 主干的顶层设计
- **典型场景**：
  - 实时打标（内容审核）
  - 实时特征（推荐系统）
  - 实时摘要（新闻聚合）

---

## Page 16 · AI 数据平台的基本构成 & 痛点

**页面解说**
**五层链路 + 四大痛点**。**GPU 利用率低**是最刺眼的痛点，为后面 AHPA 埋伏笔。

**涉及知识点**
- **五层链路**：
  - **接入层**：Kafka、Pulsar、Debezium（CDC）
  - **存储层**：HDFS、S3、Iceberg
  - **处理层**：Flink、Spark
  - **智能层**：模型服务（Triton、TorchServe、KServe）
  - **服务层**：StarRocks、Doris、ClickHouse
- **离线在线特征不一致（Training-Serving Skew）**：模型效果衰退的头号元凶。**特征平台**（Feast、Tecton）就是为解决这个问题诞生。

---

## Page 17 · 第 3 章 分隔页 · 演进三部曲

**页面解说**
分隔页。**主线：把推理越做越"解耦"**——从"耦合在 Ray 里"到"耦合在 Jar 里"到"完全解耦"。

---

## Page 18 · 三大场景 & 三大痛点

**页面解说**
**用真实数据打动人**：日均 200 亿事件、GPU 5%、故障恢复 15-30 分钟。**这三个痛点是后续所有工作的动机**。

**涉及知识点**
- **GPU 利用率低的原因**：
  - 单请求粒度小（一次 1 条）
  - Python GIL 限制批量
  - 缺 Dynamic Batching
- **重复率 3-5% 的来源**：Checkpoint 未覆盖 Source offset，故障后 Source 重放，下游收到重复消息

---

## Page 19 · AI 推理方案演进时间线

**页面解说**
时间线总览。**三步走 + 主线一句话：AI 函数跑在哪、谁管**。

**涉及知识点**
- **UDF 部署三种模式**：
  - **本地嵌入**（Stage 2）：UDF 跑在 Flink JVM / Python 子进程
  - **远程调用**（Stage 3）：UDF 通过 gRPC 调外部服务
  - **Sidecar**：UDF 跑在 Flink Pod 的 sidecar 容器

---

## Page 20 · 阶段一 · Ray 批处理

**页面解说**
第一坑。**开发爽 = 生产坑**——Ray 上手快，但流式和 Exactly-Once 弱。

**涉及知识点**
- **Ray**：UC Berkeley RISELab 开源，Python 生态友好，主打分布式 Python
  - **Ray Core**：分布式 task/actor
  - **Ray Data**：批处理
  - **Ray Serve**：模型服务
  - **RLlib**：强化学习
- **Ray 的短板**：状态管理弱、无 Exactly-Once、SQL 能力弱

**Q&A 预案**
- Q：Ray 是不是不行？→ Ray 在**强化学习和小规模 Python 分布式**很强，但**大规模流式生产**Flink 更成熟。

---

## Page 21 · 阶段二 · FlinkJar + 本地算子

**页面解说**
**第二坑，全场情感点之一**。**Python GIL 让 32 核只跑 3%**——这个数字要重读，学生会震撼。

**涉及知识点**
- **Python GIL 详解**：CPython 用一把全局锁保护解释器状态，同一时刻只能一个线程执行字节码。
  - 绕过方案：**多进程**（multiprocessing）、**C 扩展释放 GIL**（NumPy、PyTorch 底层）、**Nogil Python**（3.13+ 实验特性）
- **PyFlink 的历史包袱**：
  - Flink 1.x 用 Beam Portability 桥接 Python，性能损耗大
  - Flink 2.x（FLIP-577）在改进 Python UDF 执行效率

---

## Page 22 · 阶段三 · FlinkSQL + 远程算子

**页面解说**
**转折高潮页**。**"把模型请出去"** 是最戳的一句话。要放慢、加重、留悬念（新挑战第 5 章讲）。

**涉及知识点**
- **FlinkSQL + 远程 UDF**：
  - SQL 里像调普通函数一样调模型：`SELECT predict(text) FROM t`
  - UDF 内部走 gRPC → 远程模型服务
- **好处**：
  - 模型和引擎解耦（换模型不改代码）
  - 打破 GIL（Python 不进 Flink JVM）
  - 独立扩缩（模型服务可单独伸缩）

**Q&A 预案**
- Q：远程调用不慢吗？→ 是的，天然慢。但通过 **AsyncIO + Batch + Keep-Alive**，端到端能追上本地调用（第 5 章讲）。

---

## Page 23 · 选型对比 · 为什么是 Flink

**页面解说**
选型对比表。**Flink 的甜点位：流批一体 + Exactly-Once + SQL/Python 多语言**。

**涉及知识点**
- **Spark**：批处理王者，Structured Streaming 微批限制
- **Ray**：Python 友好，状态和 SQL 弱
- **KServe**：纯模型服务（K8s 上跑推理），无数据管道能力
- **Flink 的独家能力**：**流批一体 + 精确一次 + 多语言 SQL** 全都有

---

## Page 24 · 第 4 章 分隔页

**页面解说**
分隔页。第 4 章开始给"可落地的架构图"。

---

## Page 25 · Flink + AI 算子库 · 三大组件

**页面解说**
**三大组件**：数据流引擎、远程模型服务、算子仓库。**核心：用 gRPC 标准协议串起来**。

**涉及知识点**
- **算子仓库（Operator Library）**：把常用 AI 算子（Embedding、召回、打分、审核）做成可复用组件，业务方按需组合
- **架构演进方向**：从"每个业务自己写"到"平台化组件复用"

---

## Page 26 · 端到端数据流全景图

**页面解说**
**全场技术地图**。允许拍照。**三层视角：控制面 → 数据面 → 支撑面**。留 30 秒静默让观众看图。

**涉及知识点**
- **控制面（Control Plane）**：管配置、管调度、管模型注册
- **数据面（Data Plane）**：真实的数据流和推理调用
- **支撑面（Infra Plane）**：Exactly-Once、AHPA、监控、日志
- **业界通用架构范式**——各家云厂商都在收敛到这个划分

---

## Page 27 · 两种 API · SQL 和 Python

**页面解说**
**一套底座、两种 API**。SQL 派给业务、Python 派给科学家。

**涉及知识点**
- **Flink SQL AI 语法（FLIP-437）**：
  ```sql
  CREATE MODEL my_model AS ...;
  SELECT PREDICT(my_model, text) FROM events;
  ```
- **PyFlink**：Python API，可写 DataStream/Table 程序
- **Table API**：Java/Scala/Python 都有，编程式声明

---

## Page 28 · 第 5 章 分隔页

**页面解说**
分隔页——**上章埋的悬念**："把模型请出去之后，新的挑战是什么？"三个：容错、伸缩、性能。

---

## Page 29 · 容错与 Exactly-Once

**页面解说**
**Chandy-Lamport 分布式快照**——用"给流拍一致性照片"类比。**外部服务不参与 Checkpoint 是要点**，讲清幂等 + 2PC + DLQ 三招。

**涉及知识点**
- **Chandy-Lamport 算法（1985）**：分布式快照的经典算法，Flink Checkpoint 的理论基础
- **Barrier**：Flink 在流里插入的特殊标记，触发算子做本地快照
- **两阶段提交（2PC）**：
  - Prepare 阶段：所有参与者确认能提交
  - Commit 阶段：全部提交或全部回滚
  - Flink Iceberg Sink 用此实现 Exactly-Once
- **DLQ（Dead Letter Queue）**：处理不了的坏数据旁路队列，不阻塞主流
- **幂等（Idempotent）**：多次调用同一操作等价于一次

**Q&A 预案**
- Q：Exactly-Once 会不会牺牲性能？→ 会有 5-15% 开销（Checkpoint、2PC），但一致性收益远大于成本。

---

## Page 30 · AHPA 预测式扩容

**页面解说**
**HPA 是响应式的、AHPA 是预测式的**——用流量曲线图讲，特别直观。**GPU 30% → 75%** 是最戳的数据。

**涉及知识点**
- **HPA（Horizontal Pod Autoscaler）**：Kubernetes 内置，基于 CPU/内存/自定义指标响应式扩缩容
- **AHPA（Advanced/Predictive HPA）**：阿里云 ACK 提供，基于 **时间序列预测**（ARIMA、Prophet、LSTM）提前扩容
- **为什么 GPU 场景 AHPA 特别重要**：
  - GPU 冷启动慢（30-60 秒加载模型）
  - GPU 贵，闲置成本高
  - 流量周期性明显（早晚高峰）

---

## Page 31 · 高性能远程调用

**页面解说**
**三招：AsyncIO 批量 + 连接池 + 动态 Batch**。**AsyncIO 单条→批量提升 10 倍以上吞吐**是要点。

**涉及知识点**
- **Flink AsyncIO**：Flink 的异步 IO 算子，支持无阻塞调用外部服务
  - 有序模式：保持事件顺序（延迟高）
  - 无序模式：不保序（吞吐高）
- **Triton Dynamic Batching**：Triton Server 端把多个小请求合并成大 Batch 上 GPU
- **连接池 + Keep-Alive**：复用 TCP 连接，避免每次握手（TCP 3 次握手 + TLS 4 次消息）
- **端到端优化**：客户端 batch + 服务端 batch + 连接复用，三管齐下

---

## Page 32 · 第 6 章 分隔页

**页面解说**
分隔页——**"我们真的把这套跑到了生产，而且正在往 Agent 演进"**。情绪要拔高。

---

## Page 33 · 大模型数据管道 · 业务场景 & 参考架构

**页面解说**
**参考架构 + Flink 四大角色**：接入、处理、调用协调、状态守护。**这是业界公约数**。

**涉及知识点**
- **Pulsar**：Yahoo 开源的消息队列，特点是**存算分离**（BookKeeper 分层存储），比 Kafka 更适合多租户
- **Iceberg**：Netflix 开源的表格式，湖仓一体基石，支持 ACID、Time Travel、Schema Evolution

---

## Page 34 · 大模型数据管道 · 端到端 Exactly-Once

**页面解说**
上一页是"业界怎么做"，这一页是"我们怎么做"。**Pulsar offset + AsyncIO 批量 + Iceberg 2PC + DLQ 旁路** 是我们的组合拳。**"一行 SQL 串 8 个模型"最戳观众**。

**涉及知识点**
- **Pulsar offset 精确管理**：类似 Kafka 的 offset，但 Pulsar 用 MessageID
- **8 模型串联的典型场景**：内容审核 → 标题生成 → 分类 → Embedding → 情感 → 摘要 → 关键词 → 质量评估

---

## Page 35 · 关键数据 · Before / After

**页面解说**
**数字很多，别一条条念**。抓三个最抢眼：延迟 6h→2h、故障恢复 20min→10s、GPU 30%→75%。**"省下的钱和值班的觉"** 是金句。

**涉及知识点**
- **8 项硬指标典型指标**：
  - 延迟、吞吐、故障恢复、GPU 利用率、重复率、迭代速度、单机成本、稳定性

---

## Page 36 · Agent 开发平台架构

**页面解说**
**中立视角**——不吹某家云厂商，讲**业界收敛的最大公约数**。**四层核心 + 两条横切**是模板。

**涉及知识点**
- **L1 数据与知识层**：数据接入、向量索引、知识图谱、RAG
- **L2 模型与推理层**：LLM、Embedding、Rerank、评测
- **L3 认知层**（Agent 大脑）：
  - **Planner**：任务分解、决策
  - **Memory**：短期（上下文）、长期（向量记忆）
  - **Tool Use**：调用外部工具（数据库、API、代码执行）
- **L4 应用与编排层**：对话 UI、Agent Inbox、A2A（Agent-to-Agent）、Human-in-the-Loop
- **横切 A · 安全治理**：权限、审计、合规
- **横切 B · 观测评测**：Trace、Metric、Eval

---

## Page 37 · Agent 训练 / 评测的取数瓶颈

**页面解说**
**Agent 时代最卡的地方不是模型，是取数**。**离线慢 + 流反馈断 = 两头都卡**。

**涉及知识点**
- **Agent 训练数据类型**：
  - 指令数据（Instruction）
  - 工具调用轨迹（Tool trajectories）
  - 用户反馈（RLHF、DPO）
- **Agent 评测数据类型**：
  - 基准测试集（GAIA、SWE-bench、AgentBench）
  - 回放数据（Replay）
  - 在线 A/B 数据

---

## Page 38 · 让「能查数」的服务层 · 也能「喂得动 Agent」

**页面解说**
**三层结合方案**：Spark 批 + StarRocks 交互 + Flink 流回灌。**批 + 交互 + 流三位一体**。

**涉及知识点**
- **StarRocks**：新一代 MPP OLAP，Doris 之父团队打造，秒级交互式查询
- **交互式查询（Interactive Query）**：Agent 或分析师提问 → 秒级返回，区别于批处理的分钟/小时级
- **流回灌（Streaming Feedback Loop）**：线上反馈数据实时写回训练/评测集，形成闭环

---

## Page 39 · 第 7 章 分隔页

**页面解说**
分隔页——**"没有留在公司内部，全部贡献回上游"**。这是文化输出。

---

## Page 40 · Triton 集成 · FLINK-38857

**页面解说**
**我们的旗舰贡献**——Flink 生态第一个官方 Triton 集成。**JIRA 编号 FLINK-38857**。

**涉及知识点**
- **Apache Flink 贡献流程**：
  1. 提 JIRA Issue
  2. 讨论设计（Design Doc）
  3. 提 PR
  4. Committer Review
  5. 合并
- **重大改动需 FLIP**：Flink Improvement Proposal，社区共识文档

---

## Page 41 · FLIP-577 · AI-Native Flink 总览

**页面解说**
**FLIP-577 是 2025 年最大的社区提案**。11 个子 FLIP 全景介绍。

**涉及知识点**
- **FLIP-577 主要子 FLIP**（示例）：
  - FLIP-437：SQL AI 函数（`PREDICT`、`EMBED`）
  - FLIP-522/525：Python UDF 性能提升
  - FLIP-579：模型服务集成
  - FLIP-580：AI 算子框架
  - 更多参见 [Apache Flink Wiki](https://cwiki.apache.org/confluence/display/FLINK/FLIP-577)

---

## Page 42 · FLIP-577 脑图 · 11 个子 FLIP

**页面解说**
脑图——从 SQL 层到运行时到 Python 层。**我们参与其中 5 个子 FLIP，20+ PRs**。

**涉及知识点**
- **贡献分工**：Committer 主导设计 + 社区 Contributor 实现 + 用户 Review

---

## Page 43 · FLIP-577 · 各模块改造清单 & 我们的参与

**页面解说**
**API 层 + 执行层 + Python 桥接层** 都做了工作。展现全栈能力。

---

## Page 44 · 50+ PRs & Upstream First

**页面解说**
**Upstream First 原则**：内部改进先提社区，绝不 fork。这是**对社区最大的尊重**，也是可持续的技术路线。

**涉及知识点**
- **Upstream First 反面 = Fork 风险**：
  - 与主线越走越远
  - 升级社区新版本痛苦
  - 内部积累无法沉淀到生态
- **典型正例**：Databricks 之于 Spark、Confluent 之于 Kafka、Ververica 之于 Flink

---

## Page 45 · 第 8 章 分隔页

**页面解说**
分隔页——**"给同学们的部分要来了"**。这是听众最期待的一章。

---

## Page 46 · 未来规划 · 三个方向

**页面解说**
三个方向：**Agent-Native Flink、多模态数据管道、端云一体推理**。展望性内容，简明扼要。

**涉及知识点**
- **Agent-Native Flink**：Flink 变成 Agent 可调用的工具，通过 MCP 暴露能力
- **多模态数据管道**：视频、音频、图像原生流处理
- **端云一体推理**：边缘设备做初步推理，云端做深度推理，模型分层部署

---

## Page 47 · 给同学的建议 · 科研方向

**页面解说**
**六个方向 + 一个签名式判断**。别快过六个方向，重点讲最后的**"个人判断"卡片**——**签名式观点最能让学生记住讲者**。约 2 分钟。

**涉及知识点**（六个方向可发论文的具体切入点）
1. **流式推理调度优化**：Batch 大小、请求路由、优先级调度 → 可发 VLDB、SIGMOD、EuroSys
2. **AI × 管道容错**：Exactly-Once 拓展到外部服务 → OSDI、SOSP 类
3. **Agent × 数据平台交互**：工具协议、意图理解 → EMNLP、ACL、NeurIPS
4. **多模态实时特征工程**：视频/音频实时特征 → MM、KDD
5. **AI-Native SQL 优化**：模型调用作为算子的代价估计 → VLDB、SIGMOD
6. **弹性 GPU 调度**：AHPA 通用化 → OSDI、SoCC

---

## Page 48 · 给同学的建议 · 就业与技能

**页面解说**
**全场情感高点**。"AI-Native 数据引擎，你正好赶上了它的第一年" 要**放慢、加重、停 2 秒**。**T 型能力 + 开源贡献两个心法**是核心。

**涉及知识点**
- **T 型能力**：
  - 横向广度（懂大数据全景：Flink / Spark / Kafka / Iceberg）
  - 纵向深度（至少精通一门，能改源码）
- **开源贡献路径**：
  1. 用起来（提 Issue、参加社区讨论）
  2. 报 Bug（Reproduce + Report）
  3. 贡献文档（英文文档修改是最佳入门）
  4. 提 PR（从小 Bug 修复开始）
  5. 设计 FLIP（技术设计能力）
  6. 成为 Committer

**Q&A 预案**
- Q：现在入门开源太晚了吗？→ 不晚。**AI-Native 数据引擎是 2025 才开始的新领域**，一切都是新的。

---

## Page 49 · 一页总结 · 你带走的 8 件事

**页面解说**
8 条精华，快速带过——学生拿回家的"随身卡片"。

**核心 8 条**：
1. 大数据 20 年 = 压缩延迟
2. AI 时代 = 数据工程主战场
3. AI × Data 双向飞轮
4. 把模型请出去 = 全局最优解
5. Exactly-Once + AHPA + AsyncIO 三大关键技术
6. 生产验证：150 亿+/日
7. Agent 取数 = 批 + 交互 + 流
8. 开源 + T 型 = 竞争力

---

## Page 50 · Thank You / 致谢

**页面解说**
致谢页——**Apache Flink 社区、FLIP-577 共建者、大模型与数据平台团队、在座每一位同学**。**问答时间欢迎难问题**，是对听众的尊重。

---

## 附录 A · 全场核心术语速查表

| 术语 | 类别 | 一句话解释 |
|---|---|---|
| Apache Flink | 引擎 | 开源分布式流处理引擎，流批一体，Exactly-Once |
| Checkpoint | Flink 机制 | 周期性给流拍一致性快照，故障恢复用 |
| Chandy-Lamport | 算法 | 分布式快照经典算法，Flink Checkpoint 基础 |
| Exactly-Once | 一致性 | 不丢不重，金融级一致性 |
| Watermark | Flink 机制 | 处理乱序流的时间标记 |
| UDF | 编程接口 | 用户自定义函数 |
| PyFlink | Flink API | Python 版 Flink API |
| SQL AI 函数 | Flink 2.x 新特性 | SQL 里像调函数一样调 AI |
| 4V | 大数据 | Volume/Velocity/Variety/Value |
| Data-Centric AI | 范式 | 以数据为中心的 AI，Andrew Ng 提出 |
| ETL | 数据工程 | Extract-Transform-Load |
| Kafka | MQ | LinkedIn 开源消息队列 |
| Pulsar | MQ | Yahoo 开源，存算分离，多租户 |
| Iceberg | 表格式 | Netflix 开源，湖仓一体基石 |
| gRPC | 协议 | Google 开源 RPC 框架 |
| Triton | 模型服务 | NVIDIA 开源推理服务器 |
| Python GIL | Python 限制 | 全局解释器锁，并行瓶颈 |
| HPA / AHPA | K8s 扩缩 | H 响应式、A 预测式 |
| Ray | 引擎 | UC Berkeley 分布式 Python 框架 |
| Spark | 引擎 | 内存计算之王，微批流处理 |
| Agent | AI | 能规划、决策、调工具的 AI 智能体 |
| Skill | Anthropic | Agent 的技能包 |
| MCP | 协议 | Model Context Protocol，Agent 与工具协议 |
| RAG | AI 技术 | 检索增强生成 |
| SFT | 模型训练 | 监督微调 |
| Embedding | 向量化 | 把内容转成固定维度向量 |
| Two-Phase Commit | 事务 | 两阶段提交，分布式一致性 |
| DLQ | 队列 | 死信队列，坏数据旁路 |
| FLIP | Flink | 改进提案文档 |
| FLIP-577 | Flink 2.x | AI-Native Flink 顶层提案 |
| Upstream First | 开源文化 | 内部改进先提社区 |

---

## 附录 B · 教师备课清单

- [ ] 提前 10 分钟到场，确认投屏、音频、翻页器
- [ ] 打开 `index.html`，用 `F` 进入全屏
- [ ] 试按 `←/→` 翻页、`O` 概览、`Space` 揭示 fragment
- [ ] 确认 `SPEECH.md` 打印或备用手机可翻阅
- [ ] 关键时间点：Ch3 转折（Page 22）、Ch5 关键技术（Page 29-31）、Ch8 情感高点（Page 47-48）
- [ ] 全程语速匀速，每章开头分隔页略停顿建立仪式感
- [ ] 三个金句要重读慢读：
  1. "20 年大数据史，就是一部把延迟从天→秒→毫秒压缩的历史"
  2. "AI 时代胜负手 = 谁能把新鲜数据更快送到模型面前"
  3. "AI-Native 数据引擎，你正好赶上了它的第一年"
- [ ] Q&A 预留 5-10 分钟
