/**
 * AgenticMastery.ai — Pre-Checked Candidate Pool & Preset Job Descriptions
 * Curated and verified by senior engineering & architecture leaders from
 * Tier-1 Product Companies (Google-style) and Global Capability Centers (Bank of America-style).
 */
(function (global) {
  'use strict';

  const PRESET_JDS_LIST = [
    {
      id: 'product-fde',
      label: 'Tier-1 Product Co: Principal FDE',
      title: 'Tier-1 Product Co (Google-Style): Principal Forward Deployed AI Engineer (FDE)',
      shortTitle: 'Principal Forward Deployed AI Engineer (FDE)',
      organizationType: 'Tier-1 Product Co (Google-Style)',
      pillar: 'FDE',
      text: [
        'Role: Principal Forward Deployed AI Engineer (FDE) — Tier-1 Product Company (Google Cloud / DeepMind Enterprise Style)',
        '',
        'About the Role:',
        'We are looking for a Principal Forward Deployed AI Engineer to embed directly with C-suite and VP Engineering stakeholders at our flagship enterprise customers. You will take ambiguous, high-stakes business bottlenecks and architect production-grade agentic workflows from 0-to-1 pilot to full production rollout in under 30 days.',
        '',
        'Core Technical Expectations:',
        '• Stateful Multi-Agent Orchestration: Deep hands-on mastery building cyclic, fault-tolerant agent workflows using LangGraph, Google ADK, AutoGen, or custom state-machine orchestrators with deterministic human-in-the-loop (HITL) checkpoints.',
        '• Production RAG & Grounding at Scale: Architect hybrid retrieval pipelines (dense vector embeddings + BM25 lexical search + cross-encoder reranking) with strict citation grounding and zero-hallucination guardrails.',
        '• Low-Latency Streaming SLOs: Optimize end-to-end P99 time-to-first-token (TTFT < 400ms) across streaming text and voice/multimodal agent interfaces using semantic caching, speculative decoding, and async tool execution.',
        '• Rapid Prototyping & Executive Advisory: Ability to write clean, production-grade Python/TypeScript under tight customer timelines while advising customer Chief Architects on LLM reliability, evals, and security boundaries.'
      ].join('\n')
    },
    {
      id: 'gcc-cloud-ai',
      label: 'Global Bank GCC: Staff Cloud & GenAI Infra Architect',
      title: 'Global Bank GCC (Bank of America-Style): Staff Cloud & GenAI Infrastructure Architect',
      shortTitle: 'Staff Cloud & GenAI Infrastructure Architect',
      organizationType: 'Global Bank GCC (Bank of America-Style)',
      pillar: 'Cloud & Infra',
      text: [
        'Role: Staff Cloud & GenAI Infrastructure Architect — Global Banking Capability Center (Bank of America / Tier-1 Financial GCC Style)',
        '',
        'About the Role:',
        'Our Global Technology & Operations Capability Center (GCC) is seeking a Staff Cloud & GenAI Infrastructure Architect to lead the design of our sovereign, multi-region Kubernetes and GPU inference platform serving 60,000+ internal wealth management, risk, and operations users globally.',
        '',
        'Core Technical Expectations:',
        '• Cloud-Native GPU & Kubernetes Inference: Architect multi-tenant GKE / EKS / OpenShift clusters running vLLM, NVIDIA Triton, and Ray (KubeRay) over MIG-partitioned H100/A100 GPU node pools with automated horizontal pod autoscaling.',
        '• Financial-Grade Zero-Trust Governance: Enforce strict air-gapped VPC perimeters, Istio mTLS service mesh, OPA Gatekeeper policy-as-code, KMS envelope encryption, PII tokenization, and immutable audit logging for SOC2, PCI-DSS, and regulatory compliance.',
        '• Multi-Region Resilience & Cloud FinOps: Design active-active multi-region disaster recovery (RPO < 5 mins, 99.99% availability) while driving GPU utilization and Cloud FinOps efficiency via dynamic LoRA adapter multiplexing and quantization (FP8/AWQ).',
        '• Enterprise Architecture Governance: Partner with global CISO, Enterprise Risk, and platform engineering teams across US and India GCC hubs to standardize Terraform/Crossplane GitOps blueprints.'
      ].join('\n')
    },
    {
      id: 'agentic-evals',
      label: 'High-Growth AI Platform: Senior Applied Agentic AI & Evals',
      title: 'High-Growth AI Platform: Senior Applied Agentic AI & Evaluation Engineer',
      shortTitle: 'Senior Applied Agentic AI & Evaluation Engineer',
      organizationType: 'High-Growth AI Platform',
      pillar: 'Agentic AI',
      text: [
        'Role: Senior Applied Agentic AI & Evaluation Engineer — High-Growth Frontier AI Platform',
        '',
        'About the Role:',
        'We are hiring a Senior Applied Agentic AI & Evaluation Engineer to own the core orchestration runtime, Model Context Protocol (MCP) tool ecosystem, and continuous simulation evaluation harness powering our autonomous enterprise agents across voice and text.',
        '',
        'Core Technical Expectations:',
        '• Multi-Agent Protocols & Tool Use: Build production multi-agent systems utilizing MCP (Model Context Protocol), Agent-to-Agent (A2A) delegation, structured JSON-Schema tool calling, and sandboxed code execution.',
        '• Golden Datasets & Simulation Eval Harnesses: Design automated CI/CD evaluation pipelines featuring 1,000+ multi-turn golden datasets, adversarial user persona simulations, trajectory grading, and calibrated LLM-as-a-Judge rubrics.',
        '• Voice & Multimodal Reliability: Solve real-time conversational agent challenges including barge-in / interruption handling, tool-call latency masking, state checkpointing, and deterministic fallback routing.',
        '• Production Telemetry & Self-Correction: Instrument deep OpenTelemetry tracing across every reasoning step, reflection loop, and retrieval call to systematically eliminate regression failures before production release.'
      ].join('\n')
    }
  ];

  // Populate compatibility aliases on each preset JD object and support lookup by ID key
  PRESET_JDS_LIST.forEach(function (item) {
    item.jdText = item.text;
    item.description = item.text;
    item.content = item.text;
    PRESET_JDS_LIST[item.id] = item;
  });

  const PRECHECKED_CANDIDATES = [
    {
      id: 'CAND-01',
      codename: 'Verified Profile #FDE-201',
      title: 'Principal Forward Deployed AI Architect',
      pillar: 'FDE',
      experienceYears: 10,
      pedigreeBadge: 'Tier-1 Product Pedigree • Pre-Checked',
      availability: '15 Days Notice',
      location: 'Bengaluru • Hybrid / Remote',
      precheckScore: 9.7,
      dnaScores: {
        productVelocity: 97,
        gccGovernance: 82,
        fdeClientFacing: 98,
        cloudScale: 86,
        agenticDepth: 95
      },
      explicitKeywords: [
        'Google ADK',
        'Directed Acyclic Stateful Workflows',
        'Vertex AI',
        'AlloyDB Vector Engine',
        'Reciprocal Rank Fusion',
        'Sub-400ms Streaming Agents',
        'Python',
        'TypeScript',
        'gRPC',
        'Executive Technical Discovery',
        'Semantic Response Caching'
      ],
      semanticCapabilities: [
        {
          concept: 'Stateful Multi-Agent Orchestration',
          evidence: 'Architected cyclic state-machine agent workflows using Google ADK and custom DAG checkpointing for 6 Fortune-500 production rollouts, handling partial tool failures and human approval gates.',
          equivalents: ['langgraph', 'adk', 'autogen', 'crewai', 'state machine', 'multi-agent', 'hitl', 'human-in-the-loop', 'orchestration']
        },
        {
          concept: 'Production Hybrid RAG & Grounded Retrieval',
          evidence: 'Built a hybrid dense-vector + BM25 lexical retrieval engine on AlloyDB pgvector with cross-encoder reranking and inline citation verification, cutting hallucination rates from 14.2% to 0.4%.',
          equivalents: ['rag', 'production rag', 'vector', 'pgvector', 'hybrid retrieval', 'reranking', 'bm25', 'grounding', 'hallucination']
        },
        {
          concept: 'Forward Deployed Customer Engineering & Rapid Prototyping',
          evidence: 'Embedded directly with client C-suite and VP Engineering teams to take 0-to-1 agentic systems from whiteboard discovery to audited production within 21-day sprint cycles.',
          equivalents: ['fde', 'forward deployed', 'customer-facing', 'rapid prototyping', '0-to-1', 'c-suite', 'stakeholder', 'pilot']
        },
        {
          concept: 'Low-Latency Real-Time & Multimodal Streaming SLOs',
          evidence: 'Engineered bi-directional streaming inference pipelines with Redis semantic caching and speculative execution, achieving 310ms P99 TTFT under 4,500 concurrent sessions.',
          equivalents: ['latency', 'slo', 'p99', 'ttft', 'streaming', 'semantic caching', 'voice', 'multimodal', 'real-time']
        }
      ],
      verifiedHighlights: [
        'Panel-Verified System #1: Multi-Agent Claims & Underwriting Copilot deployed in 19 days for a global insurer using Google ADK stateful graphs and deterministic HITL checkpoints.',
        'Panel-Verified System #2: Sub-350ms Streaming Hybrid RAG Engine over 22M technical manuals using AlloyDB pgvector, Reciprocal Rank Fusion, and strict citation span validation.',
        'Panel-Verified System #3: Live Architecture Defense (9.8/10) — Demonstrated live fault-injection recovery and cost-aware model routing across Gemini 1.5 Pro and Flash tiers.'
      ],
      precheckRubric: {
        architecture: 98,
        codeQuality: 95,
        productionDepth: 97,
        communication: 99
      },
      rampUpNotes: 'Primary production orchestration depth is in Google ADK and custom state graphs rather than LangGraph syntax; our panel verified full conceptual equivalence (~3 days syntax transition).'
    },
    {
      id: 'CAND-02',
      codename: 'Verified Profile #INF-401',
      title: 'Staff Cloud & GenAI Infrastructure Architect',
      pillar: 'Cloud & Infra',
      experienceYears: 12,
      pedigreeBadge: 'Global Banking GCC Pedigree • Pre-Checked',
      availability: '30 Days Notice',
      location: 'Hyderabad • GCC / Global',
      precheckScore: 9.6,
      dnaScores: {
        productVelocity: 84,
        gccGovernance: 99,
        fdeClientFacing: 83,
        cloudScale: 98,
        agenticDepth: 85
      },
      explicitKeywords: [
        'Multi-Region GKE',
        'Amazon EKS',
        'NVIDIA Triton',
        'MIG H100 Partitioning',
        'Istio Service Mesh',
        'Mutual TLS',
        'OPA Gatekeeper',
        'SOC2 Type II',
        'PCI-DSS',
        'Terraform',
        'FinOps GPU Multiplexing'
      ],
      semanticCapabilities: [
        {
          concept: 'Cloud-Native GPU & Kubernetes Inference',
          evidence: 'Designed and operated multi-region GKE and EKS GPU inference clusters running vLLM and NVIDIA Triton across 128 H100/A100 GPUs with MIG partitioning and KubeRay autoscaling.',
          equivalents: ['gke', 'eks', 'aks', 'kubernetes', 'k8s', 'vllm', 'ray', 'triton', 'gpu', 'h100', 'a100', 'kuberay']
        },
        {
          concept: 'Enterprise GCC & Financial-Grade Governance',
          evidence: 'Led regulated GenAI platform governance for a Tier-1 Global Bank GCC—implementing air-gapped private endpoints, Istio mTLS, OPA policy-as-code, KMS CMEK encryption, and SOC2/PCI-DSS audit pipelines.',
          equivalents: ['bank', 'gcc', 'regulated', 'compliance', 'soc2', 'pci', 'zero-trust', 'governance', 'mtls', 'opa', 'security', 'pii']
        },
        {
          concept: 'Cloud FinOps, Multi-Region Resilience & IaC Automation',
          evidence: 'Reduced annual GPU cloud spend by 38% ($1.9M saved) via dynamic LoRA adapter multiplexing, FP8 quantization, and automated Spot/On-Demand failover with active-active multi-region DR.',
          equivalents: ['finops', 'cost', 'multi-region', 'terraform', 'crossplane', 'iac', 'quantization', 'lora', 'disaster recovery', 'high availability']
        }
      ],
      verifiedHighlights: [
        'Panel-Verified System #1: Sovereign Multi-Region GenAI Inference Fabric for a Tier-1 Global Bank GCC serving 45+ internal business units at 99.99% availability.',
        'Panel-Verified System #2: Zero-Trust AI Gateway with inline PII tokenization, OPA Gatekeeper admission controls, and immutable regulatory compliance logging.',
        'Panel-Verified System #3: GPU FinOps & Multi-Tenant Scheduling Plane that boosted cluster GPU utilization from 34% to 79% across H100 node pools.'
      ],
      precheckRubric: {
        architecture: 99,
        codeQuality: 93,
        productionDepth: 98,
        communication: 94
      },
      rampUpNotes: 'Deepest focus is distributed GPU infrastructure, Kubernetes security, and GCC regulatory compliance rather than prompt-level agent persona design; best paired with applied AI engineers for application-layer UX.'
    },
    {
      id: 'CAND-03',
      codename: 'Verified Profile #AI-302',
      title: 'Senior Applied Agentic AI & Evaluation Systems Lead',
      pillar: 'Agentic AI',
      experienceYears: 8,
      pedigreeBadge: 'Tier-1 Product Pedigree • Pre-Checked',
      availability: 'Immediate',
      location: 'Bengaluru • Hybrid / Remote',
      precheckScore: 9.6,
      dnaScores: {
        productVelocity: 95,
        gccGovernance: 84,
        fdeClientFacing: 89,
        cloudScale: 85,
        agenticDepth: 99
      },
      explicitKeywords: [
        'Model Context Protocol (MCP)',
        'Agent-to-Agent (A2A) Delegation',
        'Adversarial Trajectory Simulation',
        'LLM-as-a-Judge Calibration',
        'Barge-In Voice Orchestration',
        'OpenTelemetry Span Tracing',
        'Deterministic Tool Schemas',
        'Python Asyncio',
        'Golden Evaluation Datasets'
      ],
      semanticCapabilities: [
        {
          concept: 'Agentic Evaluation, Simulation & Guardrail Harnesses',
          evidence: 'Built an automated CI/CD evaluation harness running 1,400+ golden multi-turn adversarial simulations per PR, measuring tool-selection precision, trajectory efficiency, and groundedness.',
          equivalents: ['eval', 'evals', 'evaluation', 'golden datasets', 'simulation', 'llm-as-a-judge', 'trajectory', 'guardrails', 'observability', 'telemetry']
        },
        {
          concept: 'Model Context Protocol (MCP) & Deterministic Tool Calling',
          evidence: 'Architected a federated MCP tool server registry and A2A handoff protocol enabling 12 specialized sub-agents to coordinate complex enterprise ERP/CRM actions with zero schema drift.',
          equivalents: ['mcp', 'model context protocol', 'a2a', 'tool calling', 'function calling', 'multi-agent', 'orchestration', 'json schema']
        },
        {
          concept: 'Low-Latency Real-Time & Multimodal Streaming SLOs',
          evidence: 'Engineered full-duplex voice & multimodal agent state machines with sub-250ms barge-in interruption handling, optimistic state rollback, and deterministic fallback routing.',
          equivalents: ['voice', 'multimodal', 'streaming', 'latency', 'real-time', 'slo', 'barge-in', 'reliability']
        },
        {
          concept: 'Stateful Multi-Agent Orchestration',
          evidence: 'Designed hierarchical supervisor-worker agent graphs with persistent memory checkpointing and automated reflection/self-correction loops.',
          equivalents: ['langgraph', 'adk', 'autogen', 'state machine', 'multi-agent', 'cyclic graph']
        }
      ],
      verifiedHighlights: [
        'Panel-Verified System #1: Continuous Agentic Simulation & Golden Eval Platform gating 50+ weekly production releases with automated trajectory scoring.',
        'Panel-Verified System #2: Production MCP & A2A Multi-Agent Runtime handling 1.2M daily autonomous tool invocations across voice and chat channels.',
        'Panel-Verified System #3: Live Coding & Eval Calibration Audit (9.7/10) — Built a live multi-turn simulation harness with Cohen’s Kappa human-judge alignment > 0.89.'
      ],
      precheckRubric: {
        architecture: 96,
        codeQuality: 98,
        productionDepth: 96,
        communication: 94
      },
      rampUpNotes: 'Focuses on application-layer multi-agent runtimes, MCP protocols, and simulation evaluation frameworks rather than bare-metal Terraform/Kubernetes cluster provisioning.'
    },
    {
      id: 'CAND-04',
      codename: 'Verified Profile #FDE-204',
      title: 'Lead Forward Deployed GenAI & Regulated Enterprise Engineer',
      pillar: 'FDE',
      experienceYears: 9,
      pedigreeBadge: 'Hybrid Product + Banking GCC Pedigree • Pre-Checked',
      availability: '15 Days Notice',
      location: 'Mumbai / Bengaluru • Remote',
      precheckScore: 9.4,
      dnaScores: {
        productVelocity: 91,
        gccGovernance: 94,
        fdeClientFacing: 96,
        cloudScale: 84,
        agenticDepth: 92
      },
      explicitKeywords: [
        'Customer-Facing Solution Architecture',
        'Stateful Agent Graphs',
        'Regulated Wealth & Risk Copilots',
        'Human-in-the-Loop Governance',
        'Hybrid Dense-Sparse Retrieval',
        'PII Redaction Guardrails',
        'FastAPI',
        'Next.js',
        'SOC2 Compliance'
      ],
      semanticCapabilities: [
        {
          concept: 'Forward Deployed Customer Engineering & Rapid Prototyping',
          evidence: 'Led 11 enterprise AI deployments across banking, insurance, and healthcare—translating CISO and business stakeholder requirements into audited production workflows in 4-week cycles.',
          equivalents: ['fde', 'forward deployed', 'customer-facing', 'rapid prototyping', 'stakeholder', 'discovery', 'pilot']
        },
        {
          concept: 'Enterprise GCC & Financial-Grade Governance',
          evidence: 'Built PII/PCI redaction pipelines, RBAC-scoped vector retrieval, and deterministic audit logs that passed Tier-1 bank model-risk management (MRM) reviews on first submission.',
          equivalents: ['bank', 'gcc', 'regulated', 'compliance', 'soc2', 'pci', 'zero-trust', 'governance', 'pii', 'rbac']
        },
        {
          concept: 'Stateful Multi-Agent Orchestration',
          evidence: 'Implemented LangGraph and state-machine financial analyst agents with mandatory human-in-the-loop sign-off for high-value transaction workflows.',
          equivalents: ['langgraph', 'adk', 'state machine', 'multi-agent', 'hitl', 'orchestration']
        },
        {
          concept: 'Production Hybrid RAG & Grounded Retrieval',
          evidence: 'Architected entitlement-aware RAG pipelines over SEC filings and internal credit policies with strict document-level ACL enforcement.',
          equivalents: ['rag', 'production rag', 'vector', 'hybrid retrieval', 'reranking', 'grounding']
        }
      ],
      verifiedHighlights: [
        'Panel-Verified System #1: Regulated Wealth Advisor Agentic Workstation deployed for a global financial institution with 100% entitlement-enforced RAG.',
        'Panel-Verified System #2: Rapid 3-Week FDE Pilot-to-Production Accelerator Template combining LangGraph state machines, PII guardrails, and live eval dashboards.',
        'Panel-Verified System #3: Executive Stakeholder Simulation (9.6/10) — Defended zero-trust GenAI architecture before simulated Bank CISO & VP Engineering panel.'
      ],
      precheckRubric: {
        architecture: 94,
        codeQuality: 92,
        productionDepth: 95,
        communication: 97
      },
      rampUpNotes: 'Strongest in regulated enterprise FDE deployments and Python/TypeScript full-stack agent delivery; custom CUDA kernel or low-level GPU driver tuning would require infra team support.'
    },
    {
      id: 'CAND-05',
      codename: 'Verified Profile #INF-408',
      title: 'Principal Distributed AI Runtime & Kubernetes Platform Engineer',
      pillar: 'Cloud & Infra',
      experienceYears: 11,
      pedigreeBadge: 'Tier-1 Product Pedigree • Pre-Checked',
      availability: '15 Days Notice',
      location: 'Bengaluru • Hybrid / Remote',
      precheckScore: 9.5,
      dnaScores: {
        productVelocity: 94,
        gccGovernance: 89,
        fdeClientFacing: 82,
        cloudScale: 99,
        agenticDepth: 87
      },
      explicitKeywords: [
        'KubeRay Operator',
        'vLLM Continuous Batching',
        'Custom Kubernetes CRDs',
        'Golang',
        'Rust',
        'Multi-Cluster GKE/EKS',
        'Crossplane GitOps',
        'FP8 Quantization',
        'P99 Tail Latency Optimization',
        'Envoy AI Gateway'
      ],
      semanticCapabilities: [
        {
          concept: 'Cloud-Native GPU & Kubernetes Inference',
          evidence: 'Authored custom Kubernetes operators in Go and KubeRay scheduling planes managing 300+ GPUs across GKE and EKS, supporting zero-downtime vLLM model rollouts and prefix-caching.',
          equivalents: ['gke', 'eks', 'kubernetes', 'k8s', 'vllm', 'ray', 'triton', 'gpu', 'kuberay', 'inference']
        },
        {
          concept: 'Low-Latency Real-Time & Multimodal Streaming SLOs',
          evidence: 'Engineered an Envoy/gRPC AI gateway with prefix-aware KV-cache routing and speculative decoding, slashing P99 inference latency by 54% at 15,000+ RPS.',
          equivalents: ['latency', 'slo', 'p99', 'ttft', 'streaming', 'throughput', 'real-time', 'speculative decoding']
        },
        {
          concept: 'Cloud FinOps, Multi-Region Resilience & IaC Automation',
          evidence: 'Built Crossplane and Terraform GitOps control planes with automated multi-region traffic shifting and dynamic LoRA hot-swapping across shared base models.',
          equivalents: ['finops', 'multi-region', 'terraform', 'crossplane', 'iac', 'lora', 'quantization', 'high availability']
        }
      ],
      verifiedHighlights: [
        'Panel-Verified System #1: High-Throughput vLLM & KubeRay Serving Platform handling 15,000+ RPS with KV-cache-aware load balancing on GKE/EKS.',
        'Panel-Verified System #2: Dynamic Multi-LoRA Adapter Serving Engine consolidating 28 fine-tuned domain models onto a single shared H100 replica set.',
        'Panel-Verified System #3: Systems Architecture & Go Operator Review (9.6/10) — Verified production-grade Kubernetes controller reconciliation and fault isolation.'
      ],
      precheckRubric: {
        architecture: 97,
        codeQuality: 96,
        productionDepth: 96,
        communication: 91
      },
      rampUpNotes: 'Thrives in high-scale distributed systems, Kubernetes operators, and GPU inference optimization; prefers platform engineering ownership over high-touch front-end UI prototyping.'
    },
    {
      id: 'CAND-06',
      codename: 'Verified Profile #AI-309',
      title: 'Staff Autonomous Systems & Enterprise RAG Architect',
      pillar: 'Agentic AI',
      experienceYears: 10,
      pedigreeBadge: 'Global Banking GCC Pedigree • Pre-Checked',
      availability: '30 Days Notice',
      location: 'Hyderabad / Bengaluru • Hybrid',
      precheckScore: 9.3,
      dnaScores: {
        productVelocity: 88,
        gccGovernance: 95,
        fdeClientFacing: 87,
        cloudScale: 89,
        agenticDepth: 96
      },
      explicitKeywords: [
        'GraphRAG Knowledge Graphs',
        'Multi-Agent Critique Loops',
        'Query Decomposition',
        'Qdrant / Milvus Distributed Vector DB',
        'Citation Grounding Verifier',
        'Arize Phoenix / OpenTelemetry',
        'MCP Enterprise Connectors',
        'Audit-Compliant Agent Telemetry'
      ],
      semanticCapabilities: [
        {
          concept: 'Production Hybrid RAG & Grounded Retrieval',
          evidence: 'Architected a multi-hop GraphRAG and hybrid vector-lexical platform indexing 80M+ financial, legal, and regulatory documents with deterministic citation verification.',
          equivalents: ['rag', 'production rag', 'graphrag', 'vector', 'hybrid retrieval', 'reranking', 'grounding', 'hallucination']
        },
        {
          concept: 'Agentic Evaluation, Simulation & Guardrail Harnesses',
          evidence: 'Created an automated reflection and factual-consistency verification pipeline with 950+ golden benchmark queries and real-time hallucination circuit-breakers.',
          equivalents: ['eval', 'evals', 'evaluation', 'golden datasets', 'simulation', 'llm-as-a-judge', 'guardrails', 'telemetry', 'observability']
        },
        {
          concept: 'Stateful Multi-Agent Orchestration',
          evidence: 'Built planner-executor-critic multi-agent workflows using LangGraph and MCP connectors to automate complex regulatory compliance audits.',
          equivalents: ['langgraph', 'adk', 'mcp', 'multi-agent', 'state machine', 'orchestration']
        },
        {
          concept: 'Enterprise GCC & Financial-Grade Governance',
          evidence: 'Designed immutable agent decision lineage and audit logs compliant with banking model governance and SOC2 controls.',
          equivalents: ['bank', 'gcc', 'regulated', 'compliance', 'soc2', 'governance', 'audit']
        }
      ],
      verifiedHighlights: [
        'Panel-Verified System #1: 80M-Document Enterprise GraphRAG & Multi-Agent Research Engine for a Global Financial GCC with 99.2% citation precision.',
        'Panel-Verified System #2: Self-Correcting Planner-Critic Agent Pipeline with automated hallucination circuit-breakers and OpenTelemetry lineage.',
        'Panel-Verified System #3: Retrieval & Evaluation Deep-Dive (9.4/10) — Demonstrated superior multi-hop query decomposition and golden dataset curation.'
      ],
      precheckRubric: {
        architecture: 95,
        codeQuality: 92,
        productionDepth: 95,
        communication: 92
      },
      rampUpNotes: 'Deepest expertise is in complex enterprise RAG, multi-agent reasoning, and evaluation governance; voice WebRTC audio streaming pipelines would require a brief 1–2 week ramp.'
    }
  ];

  global.PRESET_JDS = PRESET_JDS_LIST;
  global.PRECHECKED_CANDIDATES = PRECHECKED_CANDIDATES;
})(typeof window !== 'undefined' ? window : globalThis);
