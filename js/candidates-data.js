/**
 * AgenticMastery.ai — Pre-Checked Candidate Pool & Preset Job Descriptions
 * Curated and verified by senior engineering & architecture leaders from
 * Tier-1 Product Hyperscalers and Fortune-100 Global Capability Centers (GCCs).
 * Flagship Specialization: AI, FDE & Cloud + Full-Spectrum Enterprise Engineering.
 */
(function (global) {
  'use strict';

  const PRESET_JDS_LIST = [
    {
      id: 'product-fde',
      label: '★ Flagship: Forward Deployed AI (FDE)',
      title: 'Tier-1 Product Hyperscaler: Principal Forward Deployed AI Engineer (FDE)',
      shortTitle: 'Principal Forward Deployed AI Engineer (FDE)',
      organizationType: 'Tier-1 Product Hyperscaler',
      pillar: 'FDE',
      text: [
        'Role: Principal Forward Deployed AI Engineer (FDE) — Tier-1 Product Company',
        'We need a customer-facing Principal AI Engineer to partner with enterprise CTOs, architect stateful multi-agent workflows (LangGraph / ADK), build grounded hybrid RAG pipelines (pgvector / BM25 / reranking), and ship sub-400ms production systems in 30-day sprints.'
      ].join('\n')
    },
    {
      id: 'gcc-cloud-ai',
      label: '★ Flagship: Bank GCC Cloud & AI Infra',
      title: 'Fortune-100 Global Bank GCC: Staff Cloud & GenAI Infrastructure Architect',
      shortTitle: 'Staff Cloud & GenAI Infrastructure Architect',
      organizationType: 'Fortune-100 Global Bank GCC',
      pillar: 'Cloud & Infra',
      text: [
        'Role: Staff Cloud & GenAI Infrastructure Architect — Global Banking GCC',
        'Lead multi-region GKE / EKS Kubernetes and GPU inference clusters (vLLM, Triton, KubeRay) serving 50,000+ internal banking users. Enforce financial-grade Zero-Trust mTLS, OPA policy-as-code, SOC2/PCI compliance, Terraform GitOps, and Cloud FinOps.'
      ].join('\n')
    },
    {
      id: 'agentic-evals',
      label: '★ Flagship: Applied Agentic AI & Evals',
      title: 'High-Growth AI Platform: Senior Applied Agentic AI & Evaluation Engineer',
      shortTitle: 'Senior Applied Agentic AI & Evaluation Engineer',
      organizationType: 'High-Growth AI Platform',
      pillar: 'Agentic AI',
      text: [
        'Role: Senior Applied Agentic AI & Evaluation Engineer — Frontier AI Platform',
        'Own multi-agent orchestration using Model Context Protocol (MCP) and A2A delegation, build 1,000+ scenario golden evaluation harnesses and LLM-as-a-Judge rubrics, and optimize real-time voice/multimodal agent reliability with OpenTelemetry tracing.'
      ].join('\n')
    },
    {
      id: 'enterprise-fullstack',
      label: 'Enterprise: Full-Stack & Distributed Systems',
      title: 'Enterprise GCC & Product: Principal Full-Stack & Distributed Systems Architect',
      shortTitle: 'Principal Full-Stack & Distributed Systems Architect',
      organizationType: 'Enterprise GCC & Product',
      pillar: 'Enterprise Systems',
      text: [
        'Role: Principal Full-Stack & Distributed Systems Architect — Enterprise Product / FinTech GCC',
        'Architect high-throughput microservices and customer portals using Java/Spring Boot, Go, TypeScript/React/Next.js, event-driven Kafka pipelines, and distributed PostgreSQL/Redis with 99.99% reliability and enterprise security governance.'
      ].join('\n')
    }
  ];

  PRESET_JDS_LIST.forEach(function (item) {
    item.jdText = item.text;
    item.description = item.text;
    item.content = item.text;
    PRESET_JDS_LIST[item.id] = item;
  });

  const PRECHECKED_CANDIDATES = [
    {
      id: 'CAND-01',
      initials: 'FD',
      codename: 'Profile #FDE-201',
      title: 'Principal Forward Deployed AI Architect',
      pillar: 'FDE',
      specialtyBadge: '★ Flagship Specialty',
      experienceYears: 10,
      pedigreeBadge: 'Ex-Product Co Leader • Pre-Checked',
      availability: '15 Days Notice',
      location: 'Bengaluru • Hybrid / Remote',
      precheckScore: 9.7,
      dnaScores: {
        productVelocity: 97,
        gccGovernance: 84,
        fdeClientFacing: 98,
        cloudScale: 86,
        agenticDepth: 95
      },
      explicitKeywords: [
        'Google ADK',
        'Vertex AI',
        'AlloyDB Vector',
        'Hybrid RAG',
        'Python / TypeScript',
        'Executive Advisory'
      ],
      semanticCapabilities: [
        {
          concept: 'Stateful Multi-Agent Orchestration',
          evidence: 'Architected cyclic state-machine agent workflows using Google ADK and DAG checkpointing for 6 Fortune-500 production rollouts.',
          equivalents: ['langgraph', 'adk', 'autogen', 'crewai', 'state machine', 'multi-agent', 'hitl', 'orchestration']
        },
        {
          concept: 'Production Hybrid RAG & Grounded Retrieval',
          evidence: 'Built hybrid dense-vector + BM25 retrieval on AlloyDB pgvector with cross-encoder reranking, cutting hallucinations to 0.4%.',
          equivalents: ['rag', 'production rag', 'vector', 'pgvector', 'hybrid retrieval', 'reranking', 'bm25', 'grounding']
        },
        {
          concept: 'Forward Deployed Customer Engineering & Rapid Prototyping',
          evidence: 'Embedded directly with client CTOs and VPs to take 0-to-1 agentic workflows from whiteboard to production in 21-day sprints.',
          equivalents: ['fde', 'forward deployed', 'customer-facing', 'rapid prototyping', '0-to-1', 'cto', 'stakeholder']
        }
      ],
      verifiedHighlights: [
        'Shipped a Multi-Agent Underwriting Copilot in 19 days for a global insurer using stateful graphs and human approval gates.',
        'Built a sub-350ms Streaming Hybrid RAG Engine over 22M manuals using pgvector and Reciprocal Rank Fusion.',
        'Scored 9.7/10 in live system design defense with our Product & GCC Architecture Panel.'
      ],
      precheckRubric: { architecture: 98, codeQuality: 95, productionDepth: 97, communication: 99 },
      rampUpNotes: 'Deepest production experience is in Google ADK and custom DAG state machines; verified full conceptual equivalence with LangGraph (~3 days ramp).'
    },
    {
      id: 'CAND-02',
      initials: 'CL',
      codename: 'Profile #INF-401',
      title: 'Staff Cloud & GenAI Infrastructure Architect',
      pillar: 'Cloud & Infra',
      specialtyBadge: '★ Flagship Specialty',
      experienceYears: 12,
      pedigreeBadge: 'Global Bank GCC Veteran • Pre-Checked',
      availability: '30 Days Notice',
      location: 'Hyderabad • Hybrid / Global',
      precheckScore: 9.6,
      dnaScores: {
        productVelocity: 84,
        gccGovernance: 99,
        fdeClientFacing: 83,
        cloudScale: 98,
        agenticDepth: 85
      },
      explicitKeywords: [
        'Multi-Region GKE / EKS',
        'vLLM / NVIDIA Triton',
        'Istio Zero-Trust mTLS',
        'OPA Gatekeeper',
        'SOC2 / PCI-DSS',
        'Terraform FinOps'
      ],
      semanticCapabilities: [
        {
          concept: 'Cloud-Native GPU & Kubernetes Inference',
          evidence: 'Designed and operated multi-region GKE and EKS GPU clusters running vLLM and Triton across 128 H100/A100 GPUs with KubeRay autoscaling.',
          equivalents: ['gke', 'eks', 'aks', 'kubernetes', 'k8s', 'vllm', 'ray', 'triton', 'gpu', 'h100', 'kuberay']
        },
        {
          concept: 'Enterprise GCC & Financial-Grade Governance',
          evidence: 'Led regulated GenAI platform governance for a Tier-1 Bank GCC with private VPC endpoints, Istio mTLS, OPA policy-as-code, and SOC2/PCI compliance.',
          equivalents: ['bank', 'gcc', 'regulated', 'compliance', 'soc2', 'pci', 'zero-trust', 'governance', 'mtls', 'opa', 'security']
        },
        {
          concept: 'Cloud FinOps, Multi-Region Resilience & IaC Automation',
          evidence: 'Reduced annual GPU cloud spend by 38% ($1.9M saved) via dynamic LoRA multiplexing, FP8 quantization, and active-active multi-region DR.',
          equivalents: ['finops', 'cost', 'multi-region', 'terraform', 'crossplane', 'iac', 'quantization', 'lora']
        }
      ],
      verifiedHighlights: [
        'Architected a Sovereign Multi-Region GenAI Inference Platform for a Global Bank GCC serving 45+ business units at 99.99% uptime.',
        'Delivered a Zero-Trust AI Gateway with inline PII tokenization and automated regulatory audit logging.',
        'Cut GPU infrastructure cost by 38% while increasing cluster utilization from 34% to 79%.'
      ],
      precheckRubric: { architecture: 99, codeQuality: 93, productionDepth: 98, communication: 94 },
      rampUpNotes: 'Specializes in Kubernetes, GPU serving, and banking GCC compliance; pairs best with applied AI engineers for front-end prompt design.'
    },
    {
      id: 'CAND-03',
      initials: 'AI',
      codename: 'Profile #AI-302',
      title: 'Senior Applied Agentic AI & Evaluations Lead',
      pillar: 'Agentic AI',
      specialtyBadge: '★ Flagship Specialty',
      experienceYears: 8,
      pedigreeBadge: 'Tier-1 Product Pedigree • Pre-Checked',
      availability: 'Immediate',
      location: 'Bengaluru • Remote / Hybrid',
      precheckScore: 9.6,
      dnaScores: {
        productVelocity: 95,
        gccGovernance: 85,
        fdeClientFacing: 89,
        cloudScale: 85,
        agenticDepth: 99
      },
      explicitKeywords: [
        'Model Context Protocol (MCP)',
        'A2A Multi-Agent',
        'Golden Eval Datasets',
        'LLM-as-a-Judge',
        'Voice / Multimodal',
        'OpenTelemetry'
      ],
      semanticCapabilities: [
        {
          concept: 'Agentic Evaluation, Simulation & Guardrail Harnesses',
          evidence: 'Built an automated CI/CD evaluation harness running 1,400+ golden multi-turn simulations per PR with calibrated LLM-as-a-Judge grading.',
          equivalents: ['eval', 'evals', 'evaluation', 'golden datasets', 'simulation', 'llm-as-a-judge', 'trajectory', 'guardrails', 'opentelemetry']
        },
        {
          concept: 'Model Context Protocol (MCP) & Deterministic Tool Calling',
          evidence: 'Architected a federated MCP tool server registry and A2A handoff protocol coordinating 12 specialized enterprise sub-agents.',
          equivalents: ['mcp', 'model context protocol', 'a2a', 'tool calling', 'function calling', 'multi-agent', 'orchestration']
        },
        {
          concept: 'Low-Latency Real-Time & Multimodal Streaming SLOs',
          evidence: 'Engineered voice & multimodal agent state machines with sub-250ms interruption handling and deterministic fallback routing.',
          equivalents: ['voice', 'multimodal', 'streaming', 'latency', 'real-time', 'slo', 'barge-in', 'reliability']
        }
      ],
      verifiedHighlights: [
        'Built a Continuous Agentic Simulation & Eval Platform gating 50+ weekly production releases with zero regression leaks.',
        'Scaled a production MCP & A2A Multi-Agent Runtime to 1.2M daily tool calls across voice and chat.',
        'Scored 9.6/10 in live coding and evaluation rubric calibration review.'
      ],
      precheckRubric: { architecture: 96, codeQuality: 98, productionDepth: 96, communication: 94 },
      rampUpNotes: 'Deepest in multi-agent orchestration, MCP protocols, and eval harnesses rather than bare-metal Terraform/network provisioning.'
    },
    {
      id: 'CAND-04',
      initials: 'FE',
      codename: 'Profile #FDE-204',
      title: 'Lead Forward Deployed GenAI & Regulated Systems Engineer',
      pillar: 'FDE',
      specialtyBadge: '★ Flagship Specialty',
      experienceYears: 9,
      pedigreeBadge: 'Product + Bank GCC Pedigree • Pre-Checked',
      availability: '15 Days Notice',
      location: 'Mumbai / Bengaluru • Hybrid',
      precheckScore: 9.4,
      dnaScores: {
        productVelocity: 91,
        gccGovernance: 94,
        fdeClientFacing: 96,
        cloudScale: 84,
        agenticDepth: 92
      },
      explicitKeywords: [
        'LangGraph State Machines',
        'Regulated Banking AI',
        'Entitlement RAG',
        'FastAPI / Next.js',
        'PII Guardrails',
        'Client Delivery'
      ],
      semanticCapabilities: [
        {
          concept: 'Forward Deployed Customer Engineering & Rapid Prototyping',
          evidence: 'Led 11 enterprise AI deployments across banking and healthcare—translating CISO & VP requirements into audited production in 4-week cycles.',
          equivalents: ['fde', 'forward deployed', 'customer-facing', 'rapid prototyping', 'stakeholder', 'discovery', 'pilot']
        },
        {
          concept: 'Enterprise GCC & Financial-Grade Governance',
          evidence: 'Built PII redaction pipelines, RBAC-scoped vector retrieval, and audit logs that passed Tier-1 bank model-risk reviews on first submission.',
          equivalents: ['bank', 'gcc', 'regulated', 'compliance', 'soc2', 'pci', 'zero-trust', 'governance', 'pii', 'rbac']
        },
        {
          concept: 'Stateful Multi-Agent Orchestration',
          evidence: 'Implemented LangGraph financial analyst agents with mandatory human-in-the-loop sign-off for regulated workflows.',
          equivalents: ['langgraph', 'adk', 'state machine', 'multi-agent', 'hitl', 'orchestration']
        }
      ],
      verifiedHighlights: [
        'Deployed a Regulated Wealth Advisor Agentic Workstation for a global bank with 100% document-level ACL enforcement.',
        'Created a reusable 3-week FDE Pilot-to-Production accelerator combining LangGraph, FastAPI, and live eval dashboards.',
        'Scored 9.4/10 in executive stakeholder & architecture defense.'
      ],
      precheckRubric: { architecture: 94, codeQuality: 92, productionDepth: 95, communication: 97 },
      rampUpNotes: 'Strongest in customer-facing full-stack AI delivery and regulated governance; custom GPU kernel tuning is handled via platform teams.'
    },
    {
      id: 'CAND-05',
      initials: 'KR',
      codename: 'Profile #INF-408',
      title: 'Principal Distributed AI Runtime & Kubernetes Architect',
      pillar: 'Cloud & Infra',
      specialtyBadge: '★ Flagship Specialty',
      experienceYears: 11,
      pedigreeBadge: 'Tier-1 Product Pedigree • Pre-Checked',
      availability: '15 Days Notice',
      location: 'Bengaluru • Hybrid',
      precheckScore: 9.5,
      dnaScores: {
        productVelocity: 94,
        gccGovernance: 89,
        fdeClientFacing: 82,
        cloudScale: 99,
        agenticDepth: 87
      },
      explicitKeywords: [
        'KubeRay / vLLM',
        'Go / Rust Operators',
        'Multi-Cluster GKE / EKS',
        'Envoy AI Gateway',
        'FP8 Quantization',
        'Crossplane GitOps'
      ],
      semanticCapabilities: [
        {
          concept: 'Cloud-Native GPU & Kubernetes Inference',
          evidence: 'Authored custom Kubernetes operators in Go and KubeRay scheduling planes managing 300+ GPUs across GKE and EKS.',
          equivalents: ['gke', 'eks', 'kubernetes', 'k8s', 'vllm', 'ray', 'triton', 'gpu', 'kuberay', 'inference']
        },
        {
          concept: 'Low-Latency Real-Time & Multimodal Streaming SLOs',
          evidence: 'Engineered an Envoy/gRPC AI gateway with KV-cache routing and speculative decoding, cutting P99 latency by 54% at 15,000+ RPS.',
          equivalents: ['latency', 'slo', 'p99', 'ttft', 'streaming', 'throughput', 'real-time', 'speculative decoding']
        }
      ],
      verifiedHighlights: [
        'Built a 15,000+ RPS vLLM & KubeRay serving platform with KV-cache-aware load balancing across GKE and EKS.',
        'Consolidated 28 fine-tuned domain models onto a shared H100 replica set via dynamic Multi-LoRA serving.',
        'Scored 9.5/10 in Distributed Systems & Go Kubernetes Operator evaluation.'
      ],
      precheckRubric: { architecture: 97, codeQuality: 96, productionDepth: 96, communication: 91 },
      rampUpNotes: 'Thrives in high-scale distributed infrastructure and GPU serving platforms rather than front-end UI development.'
    },
    {
      id: 'CAND-06',
      initials: 'FS',
      codename: 'Profile #SYS-502',
      title: 'Principal Full-Stack, Microservices & Distributed Systems Architect',
      pillar: 'Enterprise Systems',
      specialtyBadge: 'Enterprise Engineering',
      experienceYears: 11,
      pedigreeBadge: 'Global Bank GCC + Product Pedigree • Pre-Checked',
      availability: '15 Days Notice',
      location: 'Bengaluru / Chennai • Hybrid',
      precheckScore: 9.5,
      dnaScores: {
        productVelocity: 93,
        gccGovernance: 96,
        fdeClientFacing: 88,
        cloudScale: 94,
        agenticDepth: 82
      },
      explicitKeywords: [
        'Java / Spring Boot',
        'Golang Microservices',
        'TypeScript / React / Next.js',
        'Apache Kafka',
        'PostgreSQL / Redis',
        'High-Throughput APIs'
      ],
      semanticCapabilities: [
        {
          concept: 'Full-Stack, Microservices & Event-Driven Architecture',
          evidence: 'Architected high-throughput Java/Spring Boot and Go microservices with Kafka event streaming and Next.js enterprise portals handling 40,000+ TPS.',
          equivalents: ['java', 'spring', 'spring boot', 'golang', 'go', 'typescript', 'react', 'next.js', 'full-stack', 'fullstack', 'microservices', 'kafka', 'postgresql', 'redis', 'distributed systems', 'api']
        },
        {
          concept: 'Enterprise GCC & Financial-Grade Governance',
          evidence: 'Led core payments and trade-settlement engineering at a Global Bank GCC with 99.99% availability, OAuth2/OIDC security, and PCI-DSS compliance.',
          equivalents: ['bank', 'gcc', 'regulated', 'compliance', 'soc2', 'pci', 'zero-trust', 'governance', 'security', 'fintech']
        },
        {
          concept: 'Cloud FinOps, Multi-Region Resilience & IaC Automation',
          evidence: 'Designed active-active multi-region Kubernetes deployments on AWS EKS and GCP with automated Terraform CI/CD and zero-downtime schema migrations.',
          equivalents: ['multi-region', 'high availability', '99.99%', 'terraform', 'kubernetes', 'eks', 'gcp', 'aws']
        }
      ],
      verifiedHighlights: [
        'Architected a 40,000 TPS Event-Driven Core Banking & Payments Platform using Java/Spring Boot, Go, Kafka, and PostgreSQL.',
        'Led a 25-engineer GCC product modernization from legacy monolith to micro-frontends (React/Next.js) and cloud-native APIs.',
        'Scored 9.5/10 in High-Concurrency Distributed Systems & Full-Stack Architecture Review.'
      ],
      precheckRubric: { architecture: 96, codeQuality: 96, productionDepth: 95, communication: 94 },
      rampUpNotes: 'Demonstrates that our Agentic Matcher and Pre-Checked Network seamlessly evaluate core Full-Stack, Backend, and Data Engineering roles alongside flagship AI/Cloud tracks.'
    }
  ];

  global.PRESET_JDS = PRESET_JDS_LIST;
  global.PRECHECKED_CANDIDATES = PRECHECKED_CANDIDATES;
})(typeof window !== 'undefined' ? window : globalThis);
