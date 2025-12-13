import { PaperMap } from './types';

// In a real app, this would be fetched from an endpoint.
// Using the provided JSON structure.
export const PAPERS_DATA: PaperMap = {
    "4493845": {
        "paper_id": 4493845,
        "arxiv_id": "2512.05111",
        "title": "ARM-Thinker: Reinforcing Multimodal Generative Reward Models with Agentic Tool Use and Visual Reasoning",
        "authors": "Shengyuan Ding, Xinyu Fang, Ziyu Liu, Yuhang Zang, Yuhang Cao, Xiangyu Zhao, Haodong Duan, Xiaoyi Dong, Jianze Liang, Bin Wang, Conghui He, Dahua Lin, Jiaqi Wang",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.9421222417,
        "rating": 1.0,
        "total_likes": 1,
        "total_read": 7,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.05111",
        "abstract": "Reward models are critical for aligning vision-language systems with human preferences, yet current approaches suffer from hallucination, weak visual grounding, and an inability to use tools for verification, limiting their reliability on complex multimodal reasoning tasks. We present ARM-Thinker, an A}gentic multimodal Reward Model that autonomously invokes external tools (e.g., image cropping, doc page retrieval) to ground judgments in verifiable evidence, replacing static, non-interactive reward scoring. This enables the model to verify fine-grained visual details, cross-reference multi-page evidence, and validate reasoning claims, which are capabilities absent in existing reward models. We train ARM-Thinker with multi-stage reinforcement learning, jointly optimizing tool-calling decisions and judgment accuracy. To evaluate agentic reward modeling, we introduce ARMBench-VL, comprising three benchmarks that assess fine-grained visual grounding (image-level tools), multi-page document understanding (retrieval tools), and instruction following (text-level verification). ARM-Thinker achieves +16.2% average improvement on reward modeling benchmarks, +9.6% on tool-use tasks, and outperforms baselines on multimodal math and logical reasoning benchmarks. Our results demonstrate that agentic capabilities significantly enhance both accuracy and interpretability of reward models.",
        "relevance": 0.8842444834000001,
        "collections": [
            {
                "name": "Tool Calling",
                "color": "#f0eacd"
            },
            {
                "name": "Visual Reasoning",
                "color": "#e8eff8"
            }
        ]
    },
    "4493500": {
        "paper_id": 4493500,
        "arxiv_id": "2512.04763",
        "title": "MemLoRA: Distilling Expert Adapters for On-Device Memory Systems",
        "authors": "Massimo Bini, Ondrej Bohdal, Umberto Michieli, Zeynep Akata, Mete Ozay, Taha Ceritli",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.9021451359,
        "rating": 1.0,
        "total_likes": 3,
        "total_read": 8,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04763",
        "abstract": "Memory-augmented Large Language Models (LLMs) have demonstrated remarkable consistency during prolonged dialogues by storing relevant memories and incorporating them as context. Such memory-based personalization is also key in on-device settings that allow users to keep their conversations and data private. However, memory-augmented systems typically rely on LLMs that are too costly for local on-device deployment. Even though Small Language Models (SLMs) are more suitable for on-device inference than LLMs, they cannot achieve sufficient performance. Additionally, these LLM-based systems lack native visual capabilities, limiting their applicability in multimodal contexts. In this paper, we introduce (i) MemLoRA, a novel memory system that enables local deployment by equipping SLMs with specialized memory adapters, and (ii) its vision extension MemLoRA-V, which integrates small Vision-Language Models (SVLMs) to memory systems, enabling native visual understanding. Following knowledge distillation principles, each adapter is trained separately for specific memory operations$\\unicode{x2013}$knowledge extraction, memory update, and memory-augmented generation. Equipped with memory adapters, small models enable accurate on-device memory operations without cloud dependency. On text-only operations, MemLoRA outperforms 10$\\times$ larger baseline models (e.g., Gemma2-27B) and achieves performance comparable to 60$\\times$ larger models (e.g., GPT-OSS-120B) on the LoCoMo benchmark. To evaluate visual understanding operations instead, we extend LoCoMo with challenging Visual Question Answering tasks that require direct visual reasoning. On this, our VLM-integrated MemLoRA-V shows massive improvements over caption-based approaches (81.3 vs. 23.7 accuracy) while keeping strong performance in text-based tasks, demonstrating the efficacy of our method in multimodal contexts.",
        "relevance": 0.8042902718,
        "collections": [
            {
                "name": "Memory",
                "color": "#ddebf4"
            }
        ]
    },
    "4493788": {
        "paper_id": 4493788,
        "arxiv_id": "2512.05091",
        "title": "Visual Reasoning Tracer: Object-Level Grounded Reasoning Benchmark",
        "authors": "Haobo Yuan, Yueyi Sun, Yanwei Li, Tao Zhang, Xueqing Deng, Henghui Ding, Lu Qi, Anran Wang, Xiangtai Li, Ming-Hsuan Yang",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.8974834775,
        "rating": 1.0,
        "total_likes": 2,
        "total_read": 13,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.05091",
        "abstract": "Recent advances in Multimodal Large Language Models (MLLMs) have significantly improved performance on tasks such as visual grounding and visual question answering. However, the reasoning processes of these models remain largely opaque; they typically output only final predictions without revealing the intermediate steps or fine-grained evidence (e.g., pixels, locations) that lead to the result. This contrasts with human intelligence, which naturally operates through a chain of visual reasoning. To address this limitation, we introduce the Visual Reasoning Tracer (VRT) task, which requires models to not only localize the target object but also explicitly predict the intermediate objects that form the reasoning path. To advance research in this area, we contribute: (1) VRT-Bench, a human-annotated benchmark for evaluating visual reasoning; (2) a new metric for assessing the quality of reasoning traces; and (3) VRT-80k, a large-scale dataset for reasoning model training. Our experiments reveal that while existing models often produce the correct final output, they struggle to ground their intermediate reasoning. In contrast, models trained on VRT-80k achieve substantial improvements in tracing the reasoning path.",
        "relevance": 0.794966955,
        "collections": [
            {
                "name": "Benchmark",
                "color": "#d2e6f0"
            },
            {
                "name": "Visual Reasoning",
                "color": "#e8eff8"
            }
        ]
    },
    "4492755": {
        "paper_id": 4492755,
        "arxiv_id": "2512.04032",
        "title": "Jina-VLM: Small Multilingual Vision Language Model",
        "authors": "Andreas Koukounas, Georgios Mastrapas, Florian H\u00f6nicke, Sedigheh Eslami, Guillaume Roncari, Scott Martens, Han Xiao",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.869130238,
        "rating": 0.0,
        "total_likes": 0,
        "total_read": 11,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04032",
        "abstract": "We present Jina-VLM, a 2.4B parameter vision-language model that achieves state-of-the-art multilingual visual question answering among open 2B-scale VLMs. The model couples a SigLIP2 vision encoder with a Qwen3 language backbone through an attention-pooling connector that enables token-efficient processing of arbitrary-resolution images. The model achieves leading results on standard VQA benchmarks and multilingual evaluations while preserving competitive text-only performance. Model weights and code are publicly released at <a href='https://huggingface.co/jinaai/jina-vlm' target='_blank'>https://huggingface.co/jinaai/jina-vlm</a> .",
        "relevance": 0.738260476,
        "collections": [
            {
                "name": "Efficient Computation",
                "color": "#f0ecf8"
            },
            {
                "name": "VLMs",
                "color": "#ecf4e8"
            }
        ]
    },
    "4493598": {
        "paper_id": 4493598,
        "arxiv_id": "2512.04857",
        "title": "Autoregressive Image Generation Needs Only a Few Lines of Cached Tokens",
        "authors": "Ziran Qin, Youru Lv, Mingbao Lin, Zeren Zhang, Chanfan Gan, Tieyuan Chen, Weiyao Lin",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.8600357806,
        "rating": 1.0,
        "total_likes": 3,
        "total_read": 19,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04857",
        "abstract": "Autoregressive (AR) visual generation has emerged as a powerful paradigm for image and multimodal synthesis, owing to its scalability and generality. However, existing AR image generation suffers from severe memory bottlenecks due to the need to cache all previously generated visual tokens during decoding, leading to both high storage requirements and low throughput. In this paper, we introduce \\textbf{LineAR}, a novel, training-free progressive key-value (KV) cache compression pipeline for autoregressive image generation. By fully exploiting the intrinsic characteristics of visual attention, LineAR manages the cache at the line level using a 2D view, preserving the visual dependency regions while progressively evicting less-informative tokens that are harmless for subsequent line generation, guided by inter-line attention. LineAR enables efficient autoregressive (AR) image generation by utilizing only a few lines of cache, achieving both memory savings and throughput speedup, while maintaining or even improving generation quality. Extensive experiments across six autoregressive image generation models, including class-conditional and text-to-image generation, validate its effectiveness and generality. LineAR improves ImageNet FID from 2.77 to 2.68 and COCO FID from 23.85 to 22.86 on LlamaGen-XL and Janus-Pro-1B, while retaining only 1/6 KV cache. It also improves DPG on Lumina-mGPT-768 with just 1/8 KV cache. Additionally, LineAR achieves significant memory and throughput gains, including up to 67.61% memory reduction and 7.57x speedup on LlamaGen-XL, and 39.66% memory reduction and 5.62x speedup on Janus-Pro-7B.",
        "relevance": 0.7200715611999999,
        "collections": [
            {
                "name": "Attention Mechanism",
                "color": "#f0ddcd"
            },
            {
                "name": "Image Generation",
                "color": "#ecf4e8"
            }
        ]
    },
    "4493838": {
        "paper_id": 4493838,
        "arxiv_id": "2512.05105",
        "title": "Semantic Soft Bootstrapping: Long Context Reasoning in LLMs without Reinforcement Learning",
        "authors": "Purbesh Mitra, Sennur Ulukus",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.8436854647,
        "rating": 1.0,
        "total_likes": 3,
        "total_read": 6,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.05105",
        "abstract": "Long context reasoning in large language models (LLMs) has demonstrated enhancement of their cognitive capabilities via chain-of-thought (CoT) inference. Training such models is usually done via reinforcement learning with verifiable rewards (RLVR) in reasoning based problems, like math and programming. However, RLVR is limited by several bottlenecks, such as, lack of dense reward, and inadequate sample efficiency. As a result, it requires significant compute resources in post-training phase. To overcome these limitations, in this work, we propose \\textbf{Semantic Soft Bootstrapping (SSB)}, a self-distillation technique, in which the same base language model plays the role of both teacher and student, but receives different semantic contexts about the correctness of its outcome at training time. The model is first prompted with a math problem and several rollouts are generated. From them, the correct and most common incorrect response are filtered, and then provided to the model in context to produce a more robust, step-by-step explanation with a verified final answer. This pipeline automatically curates a paired teacher-student training set from raw problem-answer data, without any human intervention. This generation process also produces a sequence of logits, which is what the student model tries to match in the training phase just from the bare question alone. In our experiment, Qwen2.5-3B-Instruct on GSM8K dataset via parameter-efficient fine-tuning. We then tested its accuracy on MATH500, and AIME2024 benchmarks. Our experiments show a jump of 10.6%, and 10% improvements in accuracy, respectively, over group relative policy optimization (GRPO), which is a commonly used RLVR algorithm. Our code is available at <a href='https://github.com/purbeshmitra/semantic-soft-bootstrapping' target='_blank'>https://github.com/purbeshmitra/semantic-soft-bootstrapping</a>, and the model, curated dataset is available at <a href='https://huggingface.co/purbeshmitra/semantic-soft-bootstrapping' target='_blank'>https://huggingface.co/purbeshmitra/semantic-soft-bootstrapping</a>.",
        "relevance": 0.6873709294000001,
        "collections": [
            {
                "name": "Hierarchical Reasoning Model",
                "color": "#ecf4e8"
            }
        ]
    },
    "4493301": {
        "paper_id": 4493301,
        "arxiv_id": "2512.04563",
        "title": "COOPER: A Unified Model for Cooperative Perception and Reasoning in Spatial Intelligence",
        "authors": "Zefeng Zhang, Xiangzhao Hao, Hengzhu Tang, Zhenyu Zhang, Jiawei Sheng, Xiaodong Li, Zhenyang Li, Li Gao, Daiting Shi, Dawei Yin, Tingwen Liu",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.8390817682,
        "rating": null,
        "total_likes": 2,
        "total_read": 13,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04563",
        "abstract": "Visual Spatial Reasoning is crucial for enabling Multimodal Large Language Models (MLLMs) to understand object properties and spatial relationships, yet current models still struggle with 3D-aware reasoning. Existing approaches typically enhance either perception, by augmenting RGB inputs with auxiliary modalities such as depth and segmentation, or reasoning, by training on spatial VQA datasets and applying reinforcement learning, and thus treat these two aspects in isolation. In this work, we investigate whether a unified MLLM can develop an intrinsic ability to enhance spatial perception and, through adaptive interleaved reasoning, achieve stronger spatial intelligence. We propose \\textbf{COOPER}, a unified MLLM that leverages depth and segmentation as auxiliary modalities and is trained in two stages to acquire auxiliary modality generation and adaptive, interleaved reasoning capabilities. COOPER achieves an average \\textbf{6.91\\%} improvement in spatial reasoning while maintaining general performance. Moreover, even a variant trained only for auxiliary modality generation attains a \\textbf{7.92\\%} gain on distance and size estimation, suggesting that learning to generate auxiliary modalities helps internalize spatial knowledge and strengthen spatial understanding.",
        "relevance": 0.6781635364,
        "collections": []
    },
    "4493549": {
        "paper_id": 4493549,
        "arxiv_id": "2512.04810",
        "title": "EMMA: Efficient Multimodal Understanding, Generation, and Editing with a Unified Architecture",
        "authors": "Xin He, Longhui Wei, Jianbo Ouyang, Lingxi Xie, Qi Tian",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.8300567848,
        "rating": 1.0,
        "total_likes": 2,
        "total_read": 18,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04810",
        "abstract": "We propose EMMA, an efficient and unified architecture for multimodal understanding, generation and editing. Specifically, EMMA primarily consists of 1) An efficient autoencoder with a 32x compression ratio, which significantly reduces the number of tokens required for generation. This also ensures the training balance between understanding and generation tasks by applying the same compression ratio to images. 2) Channel-wise concatenation instead of token-wise concatenation among visual understanding and generation tokens, which further reduces the visual tokens in unified architectures. 3) A shared-and-decoupled network that enables mutual improvements across tasks while meeting the task-specific modeling requirements. 4) A mixture-of-experts mechanism adopted for visual understanding encoder, which substantially improves perceptual capabilities with a few parameters increase. Extensive experiments have shown that EMMA-4B can significantly outperform state-of-the-art unified multimodal approaches (e.g., BAGEL-7B) in both efficiency and performance, while also achieving competitive results compared to recent multimodal understanding and generation experts (e.g., Qwen3-VL and Qwen-Image). We believe that EMMA lays a solid foundation for the future development of unified multimodal architectures.",
        "relevance": 0.6601135696,
        "collections": [
            {
                "name": "Efficient Computation",
                "color": "#f0ecf8"
            },
            {
                "name": "VLMs",
                "color": "#ecf4e8"
            }
        ]
    },
    "4493719": {
        "paper_id": 4493719,
        "arxiv_id": "2512.04952",
        "title": "FASTer: Toward Efficient Autoregressive Vision Language Action Modeling via neural Action Tokenization",
        "authors": "Yicheng Liu, Shiduo Zhang, Zibin Dong, Baijun Ye, Tianyuan Yuan, Xiaopeng Yu, Linqi Yin, Chenhao Lu, Junhao Shi, Luca Jiang-Tao Yu, Liangtao Zheng, Tao Jiang, Jingjing Gong, Xipeng Qiu, Hang Zhao",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.790321406,
        "rating": null,
        "total_likes": 4,
        "total_read": 23,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04952",
        "abstract": "Autoregressive vision-language-action (VLA) models have recently demonstrated strong capabilities in robotic manipulation. However, their core process of action tokenization often involves a trade-off between reconstruction fidelity and inference efficiency. We introduce FASTer, a unified framework for efficient and generalizable robot learning that integrates a learnable tokenizer with an autoregressive policy built upon it. FASTerVQ encodes action chunks as single-channel images, capturing global spatio-temporal dependencies while maintaining a high compression ratio. FASTerVLA builds on this tokenizer with block-wise autoregressive decoding and a lightweight action expert, achieving both faster inference and higher task performance. Extensive experiments across simulated and real-world benchmarks show that FASTerVQ delivers superior reconstruction quality, high token utilization, and strong cross-task and cross-embodiment generalization, while FASTerVLA further improves overall capability, surpassing previous state-of-the-art VLA models in both inference speed and task performance.",
        "relevance": 0.580642812,
        "collections": []
    },
    "4493487": {
        "paper_id": 4493487,
        "arxiv_id": "2512.04748",
        "title": "Model Whisper: Steering Vectors Unlock Large Language Models Potential in Test-time",
        "authors": "Xinyue Kang, Diwei Shi, Li Chen",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.7883375949,
        "rating": null,
        "total_likes": 0,
        "total_read": 7,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04748",
        "abstract": "It is a critical challenge to efficiently unlock the powerful reasoning potential of Large Language Models (LLMs) for specific tasks or new distributions. Existing test-time adaptation methods often require tuning model parameters, which is not only computationally expensive but also risks degrading the model's pre-existing abilities.To address this, we introduce a lightweight component, Test-Time Steering Vectors (TTSV), which is prepended to the input while keeping the LLM's parameters entirely frozen. By optimizing the TTSV on test data to minimize the model's output entropy, we steer the model towards an internal state of higher confidence, activating its inherent abilities most relevant to the current task. TTSV is both lightweight and highly efficient to optimize, making it a true plug-and-play enhancement. Extensive experiments validate our approach's effectiveness on both base models and reasoning-enhanced models. For instance, on the MATH500 task, TTSV achieves a 45.88% relative performance gain on the Qwen2.5-Math-7B model and a 16.22% relative gain on the Qwen3-4B model. Furthermore, our approach exhibits robust generalization, with its steering vectors proving highly transferable across diverse tasks.",
        "relevance": 0.5766751898,
        "collections": []
    },
    "4493123": {
        "paper_id": 4493123,
        "arxiv_id": "2512.04359",
        "title": "Efficient Reinforcement Learning with Semantic and Token Entropy for LLM Reasoning",
        "authors": "Hongye Cao, Zhixin Bai, Ziyue Peng, Boyan Wang, Tianpei Yang, Jing Huo, Yuyao Zhang, Yang Gao",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8234038948,
            0.409333696,
            0.4901396872,
            0.3
        ],
        "ranking_score": 0.7833356209,
        "rating": null,
        "total_likes": 0,
        "total_read": 1,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04359",
        "abstract": "Reinforcement learning with verifiable rewards (RLVR) has demonstrated superior performance in enhancing the reasoning capability of large language models (LLMs). However, this accuracy-oriented learning paradigm often suffers from entropy collapse, which reduces policy exploration and limits reasoning capabilities. To address this challenge, we propose an efficient reinforcement learning framework that leverages entropy signals at both the semantic and token levels to improve reasoning. From the data perspective, we introduce semantic entropy-guided curriculum learning, organizing training data from low to high semantic entropy to guide progressive optimization from easier to more challenging tasks. For the algorithmic design, we adopt non-uniform token treatment by imposing KL regularization on low-entropy tokens that critically impact policy exploration and applying stronger constraints on high-covariance portions within these tokens. By jointly optimizing data organization and algorithmic design, our method effectively mitigates entropy collapse and enhances LLM reasoning. Experimental results across 6 benchmarks with 3 different parameter-scale base models demonstrate that our method outperforms other entropy-based approaches in improving reasoning.",
        "relevance": 0.5666712418,
        "collections": []
    },
    "4493262": {
        "paper_id": 4493262,
        "arxiv_id": "2512.04558",
        "title": "On the Limits of Test-Time Compute: Sequential Reward Filtering for Better Inference",
        "authors": "Yue Yu, Qiwei Di, Quanquan Gu, Dongruo Zhou",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8375175591,
            0.4520073621,
            0.500344242,
            0.3
        ],
        "ranking_score": 0.7408973483,
        "rating": null,
        "total_likes": 0,
        "total_read": 3,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04558",
        "abstract": "Test-time compute (TTC) has become an increasingly prominent paradigm for enhancing large language models (LLMs). Despite the empirical success of methods such as best-of-$n$ (BoN) sampling and sequential revision, their fundamental limits remain unclear. We address this gap by analyzing a mixture-of-reference policy model and proving that standard BoN is inherently suboptimal. To move closer to the optimal frontier, we study reward-filtered sequential inference, a simple procedure that selectively incorporates only high-reward generations into the context. This mechanism concentrates computation on superior policy candidates and suppresses inferior ones. On the theoretical side, we show that reward-filtered sequential inference yields strictly stronger guarantees than standard TTC paradigms. On the empirical side, we evaluate such an inference strategy across diverse benchmarks and observe consistent improvements over widely used approaches, demonstrating the practical effectiveness of our framework.",
        "relevance": 0.48179469659999996,
        "collections": []
    },
    "4493312": {
        "paper_id": 4493312,
        "arxiv_id": "2512.04513",
        "title": "BiTAgent: A Task-Aware Modular Framework for Bidirectional Coupling between Multimodal Large Language Models and World Models",
        "authors": "Yu-Wei Zhan, Xin Wang, Pengzhe Mao, Tongtong Feng, Ren Wang, Wenwu Zhu",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.889305032,
            0.5666685923,
            0.5441761394,
            0.3
        ],
        "ranking_score": 0.7098870882,
        "rating": null,
        "total_likes": 0,
        "total_read": 6,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04513",
        "abstract": "Building generalist embodied agents requires a unified system that can interpret multimodal goals, model environment dynamics, and execute reliable actions across diverse real-world tasks. Multimodal large language models (MLLMs) offer strong semantic priors and cross-modal generalization, while world models (WMs) provide actionable latent dynamics for prediction and control. Their combination holds promise for open-ended embodied intelligence, yet introduces two key challenges: (1) establishing a tight coupling between the semantic intent from MLLMs and the dynamic state representations within the WM's latent space, and (2) achieving task-aware adaptability that supports multi-task learning and cross-environment generalization. To address these limitations, we propose BiTAgent, a task-aware dynamic joint framework that enables bidirectional coupling between MLLMs and WMs. BiTAgent establishes two complementary pathways: a forward path that injects MLLM representations into the WM's latent space for semantically guided imagination, and a backward path where WM-generated feedback refines the MLLM's semantic space via dense text-conditioned rewards. This bidirectional interaction is realized through three synergistic components: Task-Aware Dynamic Joint Learning, Task-Aware Behavior Learning, and MLLM-WM Joint Optimization, which together harmonize semantic reasoning and dynamic prediction. Extensive experiments across multi-task and cross-environment settings demonstrate superior stability and generalization over state-of-the-art baselines, marking a step toward open-ended embodied learning.",
        "relevance": 0.41977417640000003,
        "collections": []
    },
    "4492737": {
        "paper_id": 4492737,
        "arxiv_id": "2512.04072",
        "title": "SkillFactory: Self-Distillation For Learning Cognitive Behaviors",
        "authors": "Zayne Sprague, Jack Lu, Manya Wadhwa, Sedrick Keh, Mengye Ren, Greg Durrett",
        "published_date": "2025-12-03T00:00:00",
        "color": [
            0.892240659,
            0.5720589476,
            0.5470957119,
            0.3
        ],
        "ranking_score": 0.7086938504,
        "rating": null,
        "total_likes": 1,
        "total_read": 7,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04072",
        "abstract": "Reasoning models leveraging long chains of thought employ various cognitive skills, such as verification of their answers, backtracking, retrying by an alternate method, and more. Previous work has shown that when a base language model exhibits these skills, training that model further with reinforcement learning (RL) can learn to leverage them. How can we get models to leverage skills that aren't exhibited by base models? Our work, SkillFactory, is a method for fine-tuning models to roughly learn these skills during a supervised fine-tuning (SFT) stage prior to RL. Our approach does not rely on distillation from a stronger model, but instead uses samples from the model itself, rearranged to provide training data in the format of those skills. These \"silver\" SFT traces may be imperfect, but are nevertheless effective for priming a model to acquire skills during RL. Our evaluation shows that (1) starting from SkillFactory SFT initialization helps a model to generalize to harder variants of a task post-RL, despite lower performance pre-RL; (2) cognitive skills are indeed used by the model; (3) RLed SkillFactory models are more robust to regression on out-of-domain tasks than RLed base models. Our work suggests that inductive biases learned prior to RL help models learn robust cognitive skill use.",
        "relevance": 0.4173877008,
        "collections": []
    },
    "4493844": {
        "paper_id": 4493844,
        "arxiv_id": "2512.05112",
        "title": "DraCo: Draft as CoT for Text-to-Image Preview and Rare Concept Generation",
        "authors": "Dongzhi Jiang, Renrui Zhang, Haodong Li, Zhuofan Zong, Ziyu Guo, Jun He, Claire Guo, Junyan Ye, Rongyao Fang, Weijia Li, Rui Liu, Hongsheng Li",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8951762861,
            0.5774493029,
            0.5500152844,
            0.3
        ],
        "ranking_score": 0.7060819522,
        "rating": null,
        "total_likes": 0,
        "total_read": 6,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.05112",
        "abstract": "Recent unified multimodal large language models (MLLMs) have shown impressive capabilities, incorporating chain-of-thought (CoT) reasoning for enhanced text-to-image generation. However, existing approaches remain limited, either treating the model merely as a standalone generator or relying on abstract textual planning. To this end, we propose Draft-as-CoT (DraCo), a novel interleaved reasoning paradigm that fully leverages both textual and visual contents in CoT for better planning and verification. Our method first generates a low-resolution draft image as preview, providing more concrete and structural visual planning and guidance. Then, we employ the model's inherent understanding capability to verify potential semantic misalignments between the draft and input prompt, and performs refinement through selective corrections with super-resolution. In this way, our approach addresses two fundamental challenges: the coarse-grained nature of textual planning and the difficulty in generating rare attribute combinations. To support training, we curate DraCo-240K, aiming to enhance three atomic capabilities spanning general correction, instance manipulation, and layout reorganization. Supported by DraCo-CFG, a specialized classifier-free guidance (CFG) strategy for interleaved reasoning, DraCo achieves a tremendous increase on GenEval (+8%), Imagine-Bench (+0.91), and GenEval++ (+3%), significantly outperforming direct generation and other generation methods empowered by CoT.",
        "relevance": 0.41216390440000006,
        "collections": []
    },
    "4492969": {
        "paper_id": 4492969,
        "arxiv_id": "2512.04222",
        "title": "ReasonX: MLLM-Guided Intrinsic Image Decomposition",
        "authors": "Alara Dirik, Tuanfeng Wang, Duygu Ceylan, Stefanos Zafeiriou, Anna Fr\u00fchst\u00fcck",
        "published_date": "2025-12-03T00:00:00",
        "color": [
            0.9010163227,
            0.5881865875,
            0.555869891,
            0.3
        ],
        "ranking_score": 0.7017648824,
        "rating": null,
        "total_likes": 0,
        "total_read": 9,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04222",
        "abstract": "Intrinsic image decomposition aims to separate images into physical components such as albedo, depth, normals, and illumination. While recent diffusion- and transformer-based models benefit from paired supervision from synthetic datasets, their generalization to diverse, real-world scenarios remains challenging. We propose ReasonX, a novel framework that leverages a multimodal large language model (MLLM) as a perceptual judge providing relative intrinsic comparisons, and uses these comparisons as GRPO rewards for fine-tuning intrinsic decomposition models on unlabeled, in-the-wild images. Unlike RL methods for generative models, our framework aligns conditional intrinsic predictors by rewarding agreement between the judge's relational assessments and analytically derived relations from the model's outputs. ReasonX is model-agnostic and can be applied to different intrinsic predictors. Across multiple base architectures and modalities, ReasonX yields significant improvements, including 9-25% WHDR reduction on IIW albedo and up to 46% depth accuracy gains on ETH3D, highlighting the promise of MLLM-guided comparative supervision to bridge low- and high-level vision reasoning.",
        "relevance": 0.4035297648,
        "collections": []
    },
    "4493143": {
        "paper_id": 4493143,
        "arxiv_id": "2512.04459",
        "title": "dVLM-AD: Enhance Diffusion Vision-Language-Model for Driving via Controllable Reasoning",
        "authors": "Yingzi Ma, Yulong Cao, Wenhao Ding, Shuibai Zhang, Yan Wang, Boris Ivanovic, Ming Jiang, Marco Pavone, Chaowei Xiao",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9192347998,
            0.6226766032,
            0.5774613738,
            0.3
        ],
        "ranking_score": 0.6891513783,
        "rating": null,
        "total_likes": 2,
        "total_read": 18,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04459",
        "abstract": "The autonomous driving community is increasingly focused on addressing the challenges posed by out-of-distribution (OOD) driving scenarios. A dominant research trend seeks to enhance end-to-end (E2E) driving systems by integrating vision-language models (VLMs), leveraging their rich world knowledge and reasoning abilities to improve generalization across diverse environments. However, most existing VLMs or vision-language agents (VLAs) are built upon autoregressive (AR) models. In this paper, we observe that existing AR-based VLMs -- limited by causal attention and sequential token generation -- often fail to maintain consistency and controllability between high-level reasoning and low-level planning. In contrast, recent discrete diffusion VLMs equipped with bidirectional attention exhibit superior controllability and reliability through iterative denoising. Building on these observations, we introduce dVLM-AD, a diffusion-based vision-language model that unifies perception, structured reasoning, and low-level planning for end-to-end driving. Evaluated on nuScenes and WOD-E2E, dVLM-AD yields more consistent reasoning-action pairs and achieves planning performance comparable to existing driving VLM/VLA systems despite a modest backbone, outperforming AR-based baselines with a 9 percent improvement in behavior-trajectory consistency and a 6 percent increase in RFS on long-tail WOD-E2E scenarios. These results suggest a controllable and reliable pathway for scalable end-to-end driving.",
        "relevance": 0.3783027565999999,
        "collections": []
    },
    "4492738": {
        "paper_id": 4492738,
        "arxiv_id": "2512.04069",
        "title": "SpaceTools: Tool-Augmented Spatial Reasoning via Double Interactive RL",
        "authors": "Siyi Chen, Mikaela Angelina Uy, Chan Hee Song, Faisal Ladhak, Adithyavairavan Murali, Qing Qu, Stan Birchfield, Valts Blukis, Jonathan Tremblay",
        "published_date": "2025-12-03T00:00:00",
        "color": [
            0.9192347998,
            0.6226766032,
            0.5774613738,
            0.3
        ],
        "ranking_score": 0.6883237788,
        "rating": null,
        "total_likes": 1,
        "total_read": 24,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04069",
        "abstract": "Vision Language Models (VLMs) demonstrate strong qualitative visual understanding, but struggle with metrically precise spatial reasoning required for embodied applications. The agentic paradigm promises that VLMs can use a wide variety of tools that could augment these capabilities, such as depth estimators, segmentation models, and pose estimators. Yet it remains an open challenge how to realize this vision without solely relying on handcrafted prompting strategies or enforcing fixed, predefined tool pipelines that limit VLMs' ability to discover optimal tool-use patterns. Reinforcement Learning could overcome this gap, but has so far been limited to reasoning with a single visual tool due to the large search space in multi-tool reasoning. We introduce Double Interactive Reinforcement Learning (DIRL), a two-phase training framework where VLMs learn to coordinate multiple tools through interactive exploration and feedback. In the teaching phase, we combine demonstrations from a single tool specialist trained via interactive RL with traces from a frontier model using all tools. In the exploration phase, the model further refines multi-tool coordination through continued RL. Our model, SpaceTools, with tool-augmented spatial reasoning ability, achieves state-of-the-art performance on spatial understanding benchmarks (RoboSpatial-Home, BLINK, BOP-ASK) and demonstrates reliable real-world manipulation using a 7-DOF robot as a tool. DIRL provides substantial improvements over the vanilla SFT (+12% on RoboSpatial) and RL (+16% on RoboSpatial) baselines. Project page: <a href='https://spacetools.github.io/' target='_blank'>https://spacetools.github.io/</a>.",
        "relevance": 0.3766475575999999,
        "collections": []
    },
    "4492787": {
        "paper_id": 4492787,
        "arxiv_id": "2512.04025",
        "title": "PSA: Pyramid Sparse Attention for Efficient Video Understanding and Generation",
        "authors": "Xiaolong Li, Youping Gu, Xi Lin, Weijie Wang, Bohan Zhuang",
        "published_date": "2025-12-03T00:00:00",
        "color": [
            0.9217931383,
            0.6275642917,
            0.5805646613,
            0.3
        ],
        "ranking_score": 0.6862878241,
        "rating": null,
        "total_likes": 1,
        "total_read": 3,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04025",
        "abstract": "Attention mechanisms are the core of foundation models, but their quadratic complexity remains a critical bottleneck for scaling. This challenge has driven the development of efficient attention mechanisms, with sparsity emerging as the dominant paradigm. Current methods typically retain or discard entire key-value blocks with binary masks, resulting in substantial information loss under high sparsity. To mitigate this gap, we present Pyramid Sparse Attention (PSA), a versatile module applicable to both video understanding and generation tasks. Instead of binary masking, PSA introduces multi-level pooled KV representations, enabling finer mask granularity. Specifically, each query block dynamically allocates lower pooling levels to critical KV blocks and higher levels to less important ones, creating an informative interpolation between full retention and complete pruning. This design, analogous to fixed-point quantization and classical feature pyramid networks in computer vision, effectively mitigates information loss while preserving computational efficiency under a low compute budget. It works with a native, hardware-friendly kernel that leverages decoupled block-tile design to ensure efficient execution. Across video understanding and generation benchmarks, PSA preserves contextual information and visual fidelity, consistently outperforming or achieving comparable performance over existing sparse attention baselines with superior efficiency-quality trade-offs. Our code and model weights are publicly available at: <a href='http://ziplab.co/PSA' target='_blank'>http://ziplab.co/PSA</a>",
        "relevance": 0.3725756482,
        "collections": []
    },
    "4493660": {
        "paper_id": 4493660,
        "arxiv_id": "2512.04926",
        "title": "Semantics Lead the Way: Harmonizing Semantic and Texture Modeling with Asynchronous Latent Diffusion",
        "authors": "Yueming Pan, Ruoyu Feng, Qi Dai, Yuqi Wang, Wenfeng Lin, Mingyu Guo, Chong Luo, Nanning Zheng",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9352825257,
            0.6552332423,
            0.5999735637,
            0.3
        ],
        "ranking_score": 0.6753253766,
        "rating": null,
        "total_likes": 5,
        "total_read": 22,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04926",
        "abstract": "Latent Diffusion Models (LDMs) inherently follow a coarse-to-fine generation process, where high-level semantic structure is generated slightly earlier than fine-grained texture. This indicates the preceding semantics potentially benefit texture generation by providing a semantic anchor. Recent advances have integrated semantic priors from pretrained visual encoders to further enhance LDMs, yet they still denoise semantic and VAE-encoded texture synchronously, neglecting such ordering. Observing these, we propose Semantic-First Diffusion (SFD), a latent diffusion paradigm that explicitly prioritizes semantic formation. SFD first constructs composite latents by combining a compact semantic latent, which is extracted from a pretrained visual encoder via a dedicated Semantic VAE, with the texture latent. The core of SFD is to denoise the semantic and texture latents asynchronously using separate noise schedules: semantics precede textures by a temporal offset, providing clearer high-level guidance for texture refinement and enabling natural coarse-to-fine generation. On ImageNet 256x256 with guidance, SFD achieves FID 1.06 (LightningDiT-XL) and FID 1.04 (1.0B LightningDiT-XXL), while achieving up to 100x faster convergence than the original DiT. SFD also improves existing methods like ReDi and VA-VAE, demonstrating the effectiveness of asynchronous, semantics-led modeling. Project page and code: <a href='https://yuemingpan.github.io/SFD.github.io/' target='_blank'>https://yuemingpan.github.io/SFD.github.io/</a>.",
        "relevance": 0.35065075320000005,
        "collections": []
    },
    "4493366": {
        "paper_id": 4493366,
        "arxiv_id": "2512.04643",
        "title": "SEASON: Mitigating Temporal Hallucination in Video Large Language Models via Self-Diagnostic Contrastive Decoding",
        "authors": "Chang-Hsun Wu, Kai-Po Chang, Yu-Yang Sheng, Hung-Kai Chung, Kuei-Chun Wang, Yu-Chiang Frank Wang",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9397206284,
            0.6644150813,
            0.6064641179,
            0.3
        ],
        "ranking_score": 0.6717608945,
        "rating": null,
        "total_likes": 1,
        "total_read": 4,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04643",
        "abstract": "Video Large Language Models (VideoLLMs) have shown remarkable progress in video understanding. However, these models still struggle to effectively perceive and exploit rich temporal information in videos when responding to user queries. Therefore, they often generate descriptions of events that are temporal inconsistent or causally implausible, causing severe hallucination issues. While most prior studies have focused on spatial hallucinations (e.g. object mismatches), temporal reasoning in video understanding remains relatively underexplored. To address this issue, we propose Self-Diagnostic Contrastive Decoding (SEASON), a training-free method that adaptively enhances temporal and spatial faithfulness for each output token. It achieves this by dynamically diagnosing each token's hallucination tendency and applying adaptive contrastive decoding against its corresponding temporal and spatial negatives. Extensive experiments demonstrate that SEASON outperforms all existing training-free hallucination mitigation approaches on three hallucination examination benchmarks, while further improves VideoLLMs across four general video understanding benchmarks. The code will be released upon acceptance.",
        "relevance": 0.34352178899999997,
        "collections": []
    },
    "4493763": {
        "paper_id": 4493763,
        "arxiv_id": "2512.05033",
        "title": "Arbitrage: Efficient Reasoning via Advantage-Aware Speculation",
        "authors": "Monishwaran Maheswaran, Rishabh Tiwari, Yuezhou Hu, Kerem Dilmen, Coleman Hooper, Haocheng Xi, Nicholas Lee, Mehrdad Farajtabar, Michael W. Mahoney, Kurt Keutzer, Amir Gholami",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9620677679,
            0.7196497001,
            0.6508560037,
            0.3
        ],
        "ranking_score": 0.6446867449,
        "rating": null,
        "total_likes": 1,
        "total_read": 2,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.05033",
        "abstract": "Modern Large Language Models achieve impressive reasoning capabilities with long Chain of Thoughts, but they incur substantial computational cost during inference, and this motivates techniques to improve the performance-cost ratio. Among these techniques, Speculative Decoding accelerates inference by employing a fast but inaccurate draft model to autoregressively propose tokens, which are then verified in parallel by a more capable target model. However, due to unnecessary rejections caused by token mismatches in semantically equivalent steps, traditional token-level Speculative Decoding struggles in reasoning tasks. Although recent works have shifted to step-level semantic verification, which improve efficiency by accepting or rejecting entire reasoning steps, existing step-level methods still regenerate many rejected steps with little improvement, wasting valuable target compute. To address this challenge, we propose Arbitrage, a novel step-level speculative generation framework that routes generation dynamically based on the relative advantage between draft and target models. Instead of applying a fixed acceptance threshold, Arbitrage uses a lightweight router trained to predict when the target model is likely to produce a meaningfully better step. This routing approximates an ideal Arbitrage Oracle that always chooses the higher-quality step, achieving near-optimal efficiency-accuracy trade-offs. Across multiple mathematical reasoning benchmarks, Arbitrage consistently surpasses prior step-level Speculative Decoding baselines, reducing inference latency by up to $\\sim2\\times$ at matched accuracy.",
        "relevance": 0.2893734898,
        "collections": []
    },
    "4493611": {
        "paper_id": 4493611,
        "arxiv_id": "2512.04895",
        "title": "Chameleon: Adaptive Adversarial Agents for Scaling-Based Visual Prompt Injection in Multimodal AI Systems",
        "authors": "M Zeeshan, Saud Satti",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9675126273,
            0.7357389739,
            0.6649079915,
            0.3
        ],
        "ranking_score": 0.6375981175,
        "rating": null,
        "total_likes": 1,
        "total_read": 3,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04895",
        "abstract": "Multimodal Artificial Intelligence (AI) systems, particularly Vision-Language Models (VLMs), have become integral to critical applications ranging from autonomous decision-making to automated document processing. As these systems scale, they rely heavily on preprocessing pipelines to handle diverse inputs efficiently. However, this dependency on standard preprocessing operations, specifically image downscaling, creates a significant yet often overlooked security vulnerability. While intended for computational optimization, scaling algorithms can be exploited to conceal malicious visual prompts that are invisible to human observers but become active semantic instructions once processed by the model. Current adversarial strategies remain largely static, failing to account for the dynamic nature of modern agentic workflows. To address this gap, we propose Chameleon, a novel, adaptive adversarial framework designed to expose and exploit scaling vulnerabilities in production VLMs. Unlike traditional static attacks, Chameleon employs an iterative, agent-based optimization mechanism that dynamically refines image perturbations based on the target model's real-time feedback. This allows the framework to craft highly robust adversarial examples that survive standard downscaling operations to hijack downstream execution. We evaluate Chameleon against Gemini 2.5 Flash model. Our experiments demonstrate that Chameleon achieves an Attack Success Rate (ASR) of 84.5% across varying scaling factors, significantly outperforming static baseline attacks which average only 32.1%. Furthermore, we show that these attacks effectively compromise agentic pipelines, reducing decision-making accuracy by over 45% in multi-step tasks. Finally, we discuss the implications of these vulnerabilities and propose multi-scale consistency checks as a necessary defense mechanism.",
        "relevance": 0.2751962349999999,
        "collections": []
    },
    "4492939": {
        "paper_id": 4492939,
        "arxiv_id": "2512.04279",
        "title": "Driving Beyond Privilege: Distilling Dense-Reward Knowledge into Sparse-Reward Policies",
        "authors": "Feeza Khan Khanzada, Jaerock Kwon",
        "published_date": "2025-12-03T00:00:00",
        "color": [
            0.9762940368,
            0.7697658544,
            0.6972799603,
            0.3
        ],
        "ranking_score": 0.6192148633,
        "rating": null,
        "total_likes": 0,
        "total_read": 3,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04279",
        "abstract": "We study how to exploit dense simulator-defined rewards in vision-based autonomous driving without inheriting their misalignment with deployment metrics. In realistic simulators such as CARLA, privileged state (e.g., lane geometry, infractions, time-to-collision) can be converted into dense rewards that stabilize and accelerate model-based reinforcement learning, but policies trained directly on these signals often overfit and fail to generalize when evaluated on sparse objectives such as route completion and collision-free overtaking. We propose reward-privileged world model distillation, a two-stage framework in which a teacher DreamerV3-style agent is first trained with a dense privileged reward, and only its latent dynamics are distilled into a student trained solely on sparse task rewards. Teacher and student share the same observation space (semantic bird's-eye-view images); privileged information enters only through the teacher's reward, and the student does not imitate the teacher's actions or value estimates. Instead, the student's world model is regularized to match the teacher's latent dynamics while its policy is learned from scratch on sparse success/failure signals. In CARLA lane-following and overtaking benchmarks, sparse-reward students outperform both dense-reward teachers and sparse-from-scratch baselines. On unseen lane-following routes, reward-privileged distillation improves success by about 23 percent relative to the dense teacher while maintaining comparable or better safety. On overtaking, students retain near-perfect performance on training routes and achieve up to a 27x improvement in success on unseen routes, with improved lane keeping. These results show that dense rewards can be leveraged to learn richer dynamics models while keeping the deployed policy optimized strictly for sparse, deployment-aligned objectives.",
        "relevance": 0.23842972659999995,
        "collections": []
    },
    "4493287": {
        "paper_id": 4493287,
        "arxiv_id": "2512.04540",
        "title": "VideoMem: Enhancing Ultra-Long Video Understanding via Adaptive Memory Management",
        "authors": "Hongbo Jin, Qingyuan Wang, Wenhao Zhang, Yang Liu, Sijie Cheng",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9796100319,
            0.787677845,
            0.715534209,
            0.3
        ],
        "ranking_score": 0.6102419734,
        "rating": null,
        "total_likes": 3,
        "total_read": 21,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04540",
        "abstract": "Ultra long video understanding remains an open challenge, as existing vision language models (VLMs) falter on such content due to limited context length and inefficient long term memory retention. To address this, recent works have attempted to construct external knowledge bases and corresponding retrieval agumented generation (RAG) systems, yet these incur enormous storage and computational overhead. In this paper, we propose VideoMem, a novel framework that pioneers models long video understanding as a sequential generation task via adaptive memory management. Specifically, VideoMem dynamically updates a global memory buffer, which adaptively retains critical information while discarding redundant content across the video timeline. To efficiently train VLMs for such long-term tasks, VideoMem integrates the Progressive Grouped Relative Policy Optimization (PRPO) algorithm, equipped with two core modules: Progressive State Propagation (PSP) adaptively retains valid current states, propagates them to the next rollout step, and gradually narrows the model exploration space. Temporal Cascading Reward (TCR) further alleviates reward sparsity, improving sample utilization and accelerating convergence. Extensive experiments demonstrate that VideoMem significantly outperforms existing open-source models across diverse benchmarks for ultra-long video understanding tasks.",
        "relevance": 0.22048394679999994,
        "collections": []
    },
    "4493251": {
        "paper_id": 4493251,
        "arxiv_id": "2512.04504",
        "title": "UltraImage: Rethinking Resolution Extrapolation in Image Diffusion Transformers",
        "authors": "Min Zhao, Bokai Yan, Xue Yang, Hongzhou Zhu, Jintao Zhang, Shilong Liu, Chongxuan Li, Jun Zhu",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9809220394,
            0.83250646,
            0.7673757948,
            0.3
        ],
        "ranking_score": 0.5838968685,
        "rating": null,
        "total_likes": 3,
        "total_read": 35,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04504",
        "abstract": "Recent image diffusion transformers achieve high-fidelity generation, but struggle to generate images beyond these scales, suffering from content repetition and quality degradation. In this work, we present UltraImage, a principled framework that addresses both issues. Through frequency-wise analysis of positional embeddings, we identify that repetition arises from the periodicity of the dominant frequency, whose period aligns with the training resolution. We introduce a recursive dominant frequency correction to constrain it within a single period after extrapolation. Furthermore, we find that quality degradation stems from diluted attention and thus propose entropy-guided adaptive attention concentration, which assigns higher focus factors to sharpen local attention for fine detail and lower ones to global attention patterns to preserve structural consistency. Experiments show that UltraImage consistently outperforms prior methods on Qwen-Image and Flux (around 4K) across three generation scenarios, reducing repetition and improving visual fidelity. Moreover, UltraImage can generate images up to 6K*6K without low-resolution guidance from a training resolution of 1328p, demonstrating its extreme extrapolation capability. Project page is available at \\href{<a href='https://thu-ml.github.io/ultraimage.github.io/' target='_blank'>https://thu-ml.github.io/ultraimage.github.io/</a>}{<a href='https://thu-ml.github.io/ultraimage.github.io/' target='_blank'>https://thu-ml.github.io/ultraimage.github.io/</a>}.",
        "relevance": 0.167793737,
        "collections": []
    },
    "4493673": {
        "paper_id": 4493673,
        "arxiv_id": "2512.04969",
        "title": "Rethinking the Use of Vision Transformers for AI-Generated Image Detection",
        "authors": "NaHyeon Park, Kunhee Kim, Junsuk Choe, Hyunjung Shim",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9795393389,
            0.8440851032,
            0.7822346244,
            0.3
        ],
        "ranking_score": 0.5745797555,
        "rating": null,
        "total_likes": 1,
        "total_read": 5,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04969",
        "abstract": "Rich feature representations derived from CLIP-ViT have been widely utilized in AI-generated image detection. While most existing methods primarily leverage features from the final layer, we systematically analyze the contributions of layer-wise features to this task. Our study reveals that earlier layers provide more localized and generalizable features, often surpassing the performance of final-layer features in detection tasks. Moreover, we find that different layers capture distinct aspects of the data, each contributing uniquely to AI-generated image detection. Motivated by these findings, we introduce a novel adaptive method, termed MoLD, which dynamically integrates features from multiple ViT layers using a gating-based mechanism. Extensive experiments on both GAN- and diffusion-generated images demonstrate that MoLD significantly improves detection performance, enhances generalization across diverse generative models, and exhibits robustness in real-world scenarios. Finally, we illustrate the scalability and versatility of our approach by successfully applying it to other pre-trained ViTs, such as DINOv2.",
        "relevance": 0.1491595109999999,
        "collections": []
    },
    "4492763": {
        "paper_id": 4492763,
        "arxiv_id": "2512.04040",
        "title": "RELIC: Interactive Video World Model with Long-Horizon Memory",
        "authors": "Yicong Hong, Yiqun Mei, Chongjian Ge, Yiran Xu, Yang Zhou, Sai Bi, Yannick Hold-Geoffroy, Mike Roberts, Matthew Fisher, Eli Shechtman, Kalyan Sunkavalli, Feng Liu, Zhengqi Li, Hao Tan",
        "published_date": "2025-12-03T00:00:00",
        "color": [
            0.9757105951,
            0.8601837127,
            0.804486829,
            0.3
        ],
        "ranking_score": 0.5634686817,
        "rating": null,
        "total_likes": 2,
        "total_read": 15,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04040",
        "abstract": "A truly interactive world model requires three key ingredients: real-time long-horizon streaming, consistent spatial memory, and precise user control. However, most existing approaches address only one of these aspects in isolation, as achieving all three simultaneously is highly challenging-for example, long-term memory mechanisms often degrade real-time performance. In this work, we present RELIC, a unified framework that tackles these three challenges altogether. Given a single image and a text description, RELIC enables memory-aware, long-duration exploration of arbitrary scenes in real time. Built upon recent autoregressive video-diffusion distillation techniques, our model represents long-horizon memory using highly compressed historical latent tokens encoded with both relative actions and absolute camera poses within the KV cache. This compact, camera-aware memory structure supports implicit 3D-consistent content retrieval and enforces long-term coherence with minimal computational overhead. In parallel, we fine-tune a bidirectional teacher video model to generate sequences beyond its original 5-second training horizon, and transform it into a causal student generator using a new memory-efficient self-forcing paradigm that enables full-context distillation over long-duration teacher as well as long student self-rollouts. Implemented as a 14B-parameter model and trained on a curated Unreal Engine-rendered dataset, RELIC achieves real-time generation at 16 FPS while demonstrating more accurate action following, more stable long-horizon streaming, and more robust spatial-memory retrieval compared with prior work. These capabilities establish RELIC as a strong foundation for the next generation of interactive world modeling.",
        "relevance": 0.12693736339999995,
        "collections": []
    },
    "4493522": {
        "paper_id": 4493522,
        "arxiv_id": "2512.04784",
        "title": "PaCo-RL: Advancing Reinforcement Learning for Consistent Image Generation with Pairwise Reward Modeling",
        "authors": "Bowen Ping, Chengyou Jia, Minnan Luo, Changliang Xia, Xin Shen, Zhuohang Dang, Hangwei Qian",
        "published_date": "2025-12-02T00:00:00",
        "color": [
            0.9476590369,
            0.9020091366,
            0.8767072671,
            0.3
        ],
        "ranking_score": 0.5243394062,
        "rating": null,
        "total_likes": 1,
        "total_read": 7,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04784",
        "abstract": "Consistent image generation requires faithfully preserving identities, styles, and logical coherence across multiple images, which is essential for applications such as storytelling and character design. Supervised training approaches struggle with this task due to the lack of large-scale datasets capturing visual consistency and the complexity of modeling human perceptual preferences. In this paper, we argue that reinforcement learning (RL) offers a promising alternative by enabling models to learn complex and subjective visual criteria in a data-free manner. To achieve this, we introduce PaCo-RL, a comprehensive framework that combines a specialized consistency reward model with an efficient RL algorithm. The first component, PaCo-Reward, is a pairwise consistency evaluator trained on a large-scale dataset constructed via automated sub-figure pairing. It evaluates consistency through a generative, autoregressive scoring mechanism enhanced by task-aware instructions and CoT reasons. The second component, PaCo-GRPO, leverages a novel resolution-decoupled optimization strategy to substantially reduce RL cost, alongside a log-tamed multi-reward aggregation mechanism that ensures balanced and stable reward optimization. Extensive experiments across the two representative subtasks show that PaCo-Reward significantly improves alignment with human perceptions of visual consistency, and PaCo-GRPO achieves state-of-the-art consistency performance with improved training efficiency and stability. Together, these results highlight the promise of PaCo-RL as a practical and scalable solution for consistent image generation. The project page is available at <a href='https://x-gengroup.github.io/HomePage_PaCo-RL/' target='_blank'>https://x-gengroup.github.io/HomePage_PaCo-RL/</a>.",
        "relevance": 0.04867881239999994,
        "collections": []
    },
    "4493145": {
        "paper_id": 4493145,
        "arxiv_id": "2512.04451",
        "title": "StreamEQA: Towards Streaming Video Understanding for Embodied Scenarios",
        "authors": "Yifei Wang, Zhenkai Li, Tianwen Qian, Huanran Zheng, Zheng Wang, Yuqian Fu, Xiaoling Wang",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.9156310599,
            0.9186585805,
            0.9232663185,
            0.3
        ],
        "ranking_score": 0.4989064023,
        "rating": null,
        "total_likes": 1,
        "total_read": 11,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04451",
        "abstract": "As embodied intelligence advances toward real-world deployment, the ability to continuously perceive and reason over streaming visual inputs becomes essential. In such settings, an agent must maintain situational awareness of its environment, comprehend the interactions with surrounding entities, and dynamically plan actions informed by past observations, current contexts, and anticipated future events. To facilitate progress in this direction, we introduce StreamEQA, the first benchmark designed for streaming video question answering in embodied scenarios. StreamEQA evaluates existing MLLMs along two orthogonal dimensions: Embodied and Streaming. Along the embodied dimension, we categorize the questions into three levels: perception, interaction, and planning, which progressively assess a model's ability to recognize fine-grained visual details, reason about agent-object interactions, and perform high-level goal-directed reasoning. For the streaming dimension, questions are divided into backward, real-time, and forward reasoning, with each mode relying on a distinct temporal context. Built upon 156 independent long videos, StreamEQA defines 42 tasks and generates approximately 21K question-answer pairs with precise timestamps through a hybrid pipeline combining automated generation and human refinement. Evaluations of 13 state-of-the-art video-LLMs reveal that, despite strong performance on conventional benchmarks, these models still struggle with streaming video understanding in embodied scenarios. We hope StreamEQA will catalyze research on streaming video understanding for embodied applications.",
        "relevance": -0.0021871954000000082,
        "collections": []
    },
    "4493824": {
        "paper_id": 4493824,
        "arxiv_id": "2512.05038",
        "title": "SuperActivators: Only the Tail of the Distribution Contains Reliable Concept Signals",
        "authors": "Cassandra Goldberg, Chaehyeon Kim, Adam Stein, Eric Wong",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8748353714,
            0.9080501248,
            0.961984556,
            0.3
        ],
        "ranking_score": 0.4866361026,
        "rating": null,
        "total_likes": 0,
        "total_read": 6,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.05038",
        "abstract": "Concept vectors aim to enhance model interpretability by linking internal representations with human-understandable semantics, but their utility is often limited by noisy and inconsistent activations. In this work, we uncover a clear pattern within the noise, which we term the SuperActivator Mechanism: while in-concept and out-of-concept activations overlap considerably, the token activations in the extreme high tail of the in-concept distribution provide a reliable signal of concept presence. We demonstrate the generality of this mechanism by showing that SuperActivator tokens consistently outperform standard vector-based and prompting concept detection approaches, achieving up to a 14% higher F1 score across image and text modalities, model architectures, model layers, and concept extraction techniques. Finally, we leverage SuperActivator tokens to improve feature attributions for concepts.",
        "relevance": -0.026727794799999982,
        "collections": []
    },
    "4493684": {
        "paper_id": 4493684,
        "arxiv_id": "2512.04923",
        "title": "Algorithmic Thinking Theory",
        "authors": "MohammadHossein Bateni, Vincent Cohen-Addad, Yuzhou Gu, Silvio Lattanzi, Simon Meierhans, Christopher Mohri",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.8190724519,
            0.8796699305,
            0.990746474,
            0.3
        ],
        "ranking_score": 0.4715052533,
        "rating": null,
        "total_likes": 0,
        "total_read": 5,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04923",
        "abstract": "Large language models (LLMs) have proven to be highly effective for solving complex reasoning tasks. Surprisingly, their capabilities can often be improved by iterating on previously generated solutions. In this context, a reasoning plan for generating and combining a set of solutions can be thought of as an algorithm for reasoning using a probabilistic oracle.   We introduce a theoretical framework for analyzing such reasoning algorithms. This framework formalizes the principles underlying popular techniques for iterative improvement and answer aggregation, providing a foundation for designing a new generation of more powerful reasoning methods. Unlike approaches for understanding models that rely on architectural specifics, our model is grounded in experimental evidence. As a result, it offers a general perspective that may extend to a wide range of current and future reasoning oracles.",
        "relevance": -0.056989493400000035,
        "collections": []
    },
    "4493751": {
        "paper_id": 4493751,
        "arxiv_id": "2512.05073",
        "title": "David vs. Goliath: Can Small Models Win Big with Agentic AI in Hardware Design?",
        "authors": "Shashwat Shankar, Subhranshu Pandey, Innocent Dengkhw Mochahari, Bhabesh Mali, Animesh Basak Chowdhury, Sukanta Bhattacharjee, Chandan Karfa",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.7651284162,
            0.8414351379,
            0.9996122952,
            0.3
        ],
        "ranking_score": 0.4581125088,
        "rating": null,
        "total_likes": 2,
        "total_read": 7,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.05073",
        "abstract": "Large Language Model(LLM) inference demands massive compute and energy, making domain-specific tasks expensive and unsustainable. As foundation models keep scaling, we ask: Is bigger always better for hardware design? Our work tests this by evaluating Small Language Models coupled with a curated agentic AI framework on NVIDIA's Comprehensive Verilog Design Problems(CVDP) benchmark. Results show that agentic workflows: through task decomposition, iterative feedback, and correction - not only unlock near-LLM performance at a fraction of the cost but also create learning opportunities for agents, paving the way for efficient, adaptive solutions in complex design tasks.",
        "relevance": -0.08377498240000003,
        "collections": []
    },
    "4492953": {
        "paper_id": 4492953,
        "arxiv_id": "2512.04220",
        "title": "On GRPO Collapse in Search-R1: The Lazy Likelihood-Displacement Death Spiral",
        "authors": "Wenlong Deng, Yushu Li, Boying Gong, Yi Ren, Christos Thrampoulidis, Xiaoxiao Li",
        "published_date": "2025-12-03T00:00:00",
        "color": [
            0.7000183387,
            0.7831050805,
            0.9886420745,
            0.3
        ],
        "ranking_score": 0.4422501694,
        "rating": null,
        "total_likes": 0,
        "total_read": 4,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04220",
        "abstract": "Tool-integrated (TI) reinforcement learning (RL) enables large language models (LLMs) to perform multi-step reasoning by interacting with external tools such as search engines and retrievers. Group Relative Policy Optimization (GRPO), exemplified by the recent Search-R1, offers fast convergence and a value-free formulation that makes it appealing for this setting, yet consistently suffers from training collapse. We identify Lazy Likelihood Displacement (LLD), a systematic reduction or stagnation in the likelihood of both correct and incorrect responses, as the core mechanism driving this failure. LLD emerges early and triggers a self-reinforcing LLD Death Spiral, where declining likelihood leads to low-confidence responses, inflating gradients, and ultimately causing collapse. We empirically characterize this process across models on a Search-R1-style, search-integrated question answering task, revealing a consistent three-phase trajectory: early stagnation, steady decay, and accelerated collapse. To address this, we propose a lightweight likelihood-preserving regularization LLDS for GRPO that activates only when a trajectory's likelihood decreases, and regularizes only the tokens responsible. This fine-grained structure mitigates LLD with minimal interference to optimization. Across seven open-domain and multi-hop QA benchmarks, our method stabilizes training, prevents gradient explosion, and yields substantial performance improvements, including +37.8% gains on Qwen2.5-3B and +32.0% gains on Qwen2.5-7B. Our results establish LLD as a fundamental bottleneck in GRPO-based TIRL and provide a practical path toward stable, scalable training of tool-integrated LLM.",
        "relevance": -0.11549966119999999,
        "collections": []
    },
    "4493589": {
        "paper_id": 4493589,
        "arxiv_id": "2512.04844",
        "title": "Mitigating Catastrophic Forgetting in Target Language Adaptation of LLMs via Source-Shielded Updates",
        "authors": "Atsuki Yamaguchi, Terufumi Morishita, Aline Villavicencio, Nikolaos Aletras",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.6935478447,
            0.7765216334,
            0.9861373059,
            0.3
        ],
        "ranking_score": 0.440824239,
        "rating": null,
        "total_likes": 1,
        "total_read": 7,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04844",
        "abstract": "Expanding the linguistic diversity of instruct large language models (LLMs) is crucial for global accessibility but is often hindered by the reliance on costly specialized target language labeled data and catastrophic forgetting during adaptation. We tackle this challenge under a realistic, low-resource constraint: adapting instruct LLMs using only unlabeled target language data. We introduce Source-Shielded Updates (SSU), a selective parameter update strategy that proactively preserves source knowledge. Using a small set of source data and a parameter importance scoring method, SSU identifies parameters critical to maintaining source abilities. It then applies a column-wise freezing strategy to protect these parameters before adaptation. Experiments across five typologically diverse languages and 7B and 13B models demonstrate that SSU successfully mitigates catastrophic forgetting. It reduces performance degradation on monolingual source tasks to just 3.4% (7B) and 2.8% (13B) on average, a stark contrast to the 20.3% and 22.3% from full fine-tuning. SSU also achieves target-language performance highly competitive with full fine-tuning, outperforming it on all benchmarks for 7B models and the majority for 13B models.",
        "relevance": -0.11835152199999999,
        "collections": []
    },
    "4493834": {
        "paper_id": 4493834,
        "arxiv_id": "2512.05103",
        "title": "TV2TV: A Unified Framework for Interleaved Language and Video Generation",
        "authors": "Xiaochuang Han, Youssef Emad, Melissa Hall, John Nguyen, Karthik Padthe, Liam Robbins, Amir Bar, Delong Chen, Michal Drozdzal, Maha Elbayad, Yushi Hu, Shang-Wen Li, Sreya Dutta Roy, Jakob Verbeek, XuDong Wang, Marjan Ghazvininejad, Luke Zettlemoyer, Emily Dinan",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.6488805417,
            0.7281241162,
            0.9634525194,
            0.3
        ],
        "ranking_score": 0.4297651161,
        "rating": null,
        "total_likes": 3,
        "total_read": 18,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.05103",
        "abstract": "Video generation models are rapidly advancing, but can still struggle with complex video outputs that require significant semantic branching or repeated high-level reasoning about what should happen next. In this paper, we introduce a new class of omni video-text models that integrate ideas from recent LM reasoning advances to address this challenge. More specifically, we present TV2TV, a unified generative modeling framework which decomposes video generation into an interleaved text and video generation process. TV2TV jointly learns language modeling (next-token prediction) and video flow matching (next-frame prediction) using a Mixture-of-Transformers (MoT) architecture. At inference time, TV2TV decides when to alternate between generating text and video frames, allowing the model to \"think in words\" about subsequent content before ``acting in pixels'' to produce frames. This design offloads much of the responsibility for deciding what should happen next to the language modeling tower, enabling improved visual quality and prompt alignment of generated videos. It also enables fine-grained controllability, allowing users to modify the video generation trajectory through text interventions at any point in the process. In controlled experiments on video game data, TV2TV demonstrates substantial improvements in both visual quality and controllability. TV2TV also scales to natural videos, as we show by augmenting sports videos with interleaved natural language action descriptions using vision-language models (VLMs). Training TV2TV on this corpus yields strong visual quality and prompt alignment, showcasing the model's ability to reason about and generate complex real-world action sequences. Together, these results highlight TV2TV as a promising step toward video generation with open-ended textual reasoning and control.",
        "relevance": -0.14046976779999998,
        "collections": []
    },
    "4493397": {
        "paper_id": 4493397,
        "arxiv_id": "2512.04678",
        "title": "Reward Forcing: Efficient Streaming Video Generation with Rewarded Distribution Matching Distillation",
        "authors": "Yunhong Lu, Yanhong Zeng, Haobo Li, Hao Ouyang, Qiuyu Wang, Ka Leong Cheng, Jiapeng Zhu, Hengyuan Cao, Zhipeng Zhang, Xing Zhu, Yujun Shen, Min Zhang",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.645766658,
            0.7244551052,
            0.9613268335,
            0.3
        ],
        "ranking_score": 0.4295264967,
        "rating": null,
        "total_likes": 0,
        "total_read": 17,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04678",
        "abstract": "Efficient streaming video generation is critical for simulating interactive and dynamic worlds. Existing methods distill few-step video diffusion models with sliding window attention, using initial frames as sink tokens to maintain attention performance and reduce error accumulation. However, video frames become overly dependent on these static tokens, resulting in copied initial frames and diminished motion dynamics. To address this, we introduce Reward Forcing, a novel framework with two key designs. First, we propose EMA-Sink, which maintains fixed-size tokens initialized from initial frames and continuously updated by fusing evicted tokens via exponential moving average as they exit the sliding window. Without additional computation cost, EMA-Sink tokens capture both long-term context and recent dynamics, preventing initial frame copying while maintaining long-horizon consistency. Second, to better distill motion dynamics from teacher models, we propose a novel Rewarded Distribution Matching Distillation (Re-DMD). Vanilla distribution matching treats every training sample equally, limiting the model's ability to prioritize dynamic content. Instead, Re-DMD biases the model's output distribution toward high-reward regions by prioritizing samples with greater dynamics rated by a vision-language model. Re-DMD significantly enhances motion quality while preserving data fidelity. We include both quantitative and qualitative experiments to show that Reward Forcing achieves state-of-the-art performance on standard benchmarks while enabling high-quality streaming video generation at 23.1 FPS on a single H100 GPU.",
        "relevance": -0.14094700660000004,
        "collections": []
    },
    "4493131": {
        "paper_id": 4493131,
        "arxiv_id": "2512.04395",
        "title": "Fourier-Attentive Representation Learning: A Fourier-Guided Framework for Few-Shot Generalization in Vision-Language Models",
        "authors": "Hieu Dinh Trung Pham, Huy Minh Nhat Nguyen, Cuong Tuan Nguyen",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.6180764772,
            0.6908702091,
            0.9406113321,
            0.3
        ],
        "ranking_score": 0.422368472,
        "rating": null,
        "total_likes": 0,
        "total_read": 9,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04395",
        "abstract": "Large-scale pre-trained Vision-Language Models (VLMs) have demonstrated strong few-shot learning capabilities. However, these methods typically learn holistic representations where an image's domain-invariant structure is implicitly entangled with its domain-specific style. This presents an opportunity to further enhance generalization by disentangling these visual cues. In this paper, we propose Fourier-Attentive Representation Learning (FARL), a novel framework that addresses this by explicitly disentangling visual representations using Fourier analysis. The core of our method is a dual cross-attention mechanism, where learnable representation tokens separately query an image's structural features (from the phase spectrum) and stylistic features (from the amplitude spectrum). This process yields enriched, disentangled tokens that are then injected deep into the VLM encoders to guide adaptation. Our design, which includes an asymmetric injection strategy, forces the model to learn a more robust vision-language alignment. Extensive experiments on 15 datasets demonstrate the effectiveness of our approach.",
        "relevance": -0.155263056,
        "collections": []
    },
    "4493310": {
        "paper_id": 4493310,
        "arxiv_id": "2512.04519",
        "title": "VideoSSM: Autoregressive Long Video Generation with Hybrid State-Space Memory",
        "authors": "Yifei Yu, Xiaoshan Wu, Xinting Hu, Tao Hu, Yangtian Sun, Xiaoyang Lyu, Bo Wang, Lin Ma, Yuewen Ma, Zhongrui Wang, Xiaojuan Qi",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.5912994299,
            0.6559630307,
            0.9159144689,
            0.3
        ],
        "ranking_score": 0.4151817901,
        "rating": null,
        "total_likes": 7,
        "total_read": 20,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04519",
        "abstract": "Autoregressive (AR) diffusion enables streaming, interactive long-video generation by producing frames causally, yet maintaining coherence over minute-scale horizons remains challenging due to accumulated errors, motion drift, and content repetition. We approach this problem from a memory perspective, treating video synthesis as a recurrent dynamical process that requires coordinated short- and long-term context. We propose VideoSSM, a Long Video Model that unifies AR diffusion with a hybrid state-space memory. The state-space model (SSM) serves as an evolving global memory of scene dynamics across the entire sequence, while a context window provides local memory for motion cues and fine details. This hybrid design preserves global consistency without frozen, repetitive patterns, supports prompt-adaptive interaction, and scales in linear time with sequence length. Experiments on short- and long-range benchmarks demonstrate state-of-the-art temporal consistency and motion stability among autoregressive video generator especially at minute-scale horizons, enabling content diversity and interactive prompt-based control, thereby establishing a scalable, memory-aware framework for long video generation.",
        "relevance": -0.1696364198,
        "collections": []
    },
    "4493104": {
        "paper_id": 4493104,
        "arxiv_id": "2512.04381",
        "title": "FALCON: Actively Decoupled Visuomotor Policies for Loco-Manipulation with Foundation-Model-Based Coordination",
        "authors": "Chengyang He, Ge Sun, Yue Bai, Junkai Lu, Jiadong Zhao, Guillaume Sartoretti",
        "published_date": "2025-12-04T00:00:00",
        "color": [
            0.5626625774,
            0.6160063972,
            0.8842570765,
            0.3
        ],
        "ranking_score": 0.4071885387,
        "rating": null,
        "total_likes": 3,
        "total_read": 25,
        "venue": {
            "name": "Preprint",
            "color": "#EFEFEF"
        },
        "year": {
            "name": "2025",
            "color": "#ebe3f4"
        },
        "url": "https://arxiv.org/pdf/2512.04381",
        "abstract": "We present FoundAtion-model-guided decoupled LoCO-maNipulation visuomotor policies (FALCON), a framework for loco-manipulation that combines modular diffusion policies with a vision-language foundation model as the coordinator. Our approach explicitly decouples locomotion and manipulation into two specialized visuomotor policies, allowing each subsystem to rely on its own observations. This mitigates the performance degradation that arise when a single policy is forced to fuse heterogeneous, potentially mismatched observations from locomotion and manipulation. Our key innovation lies in restoring coordination between these two independent policies through a vision-language foundation model, which encodes global observations and language instructions into a shared latent embedding conditioning both diffusion policies. On top of this backbone, we introduce a phase-progress head that uses textual descriptions of task stages to infer discrete phase and continuous progress estimates without manual phase labels. To further structure the latent space, we incorporate a coordination-aware contrastive loss that explicitly encodes cross-subsystem compatibility between arm and base actions. We evaluate FALCON on two challenging loco-manipulation tasks requiring navigation, precise end-effector placement, and tight base-arm coordination. Results show that it surpasses centralized and decentralized baselines while exhibiting improved robustness and generalization to out-of-distribution scenarios.",
        "relevance": -0.18562292260000002,
        "collections": []
    }
};
