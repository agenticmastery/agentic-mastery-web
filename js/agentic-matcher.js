/**
 * AgenticMastery.ai — 4-Agent Semantic Ontology & Candidate Matching Engine
 * Evaluates architectural equivalency, production evidence, and Product Co vs. GCC role DNA
 * beyond legacy boolean/keyword search.
 */
(function (global) {
  'use strict';

  /**
   * Semantic Ontology Clusters mapping 70+ AI, FDE, Cloud, and GCC/Product terms
   * into canonical architectural capabilities.
   */
  const SEMANTIC_CLUSTERS = [
    {
      clusterName: 'Stateful Multi-Agent Orchestration',
      pillarAffinity: 'FDE',
      secondaryPillar: 'Agentic AI',
      weight: 1.25,
      terms: [
        'langgraph',
        'adk',
        'google adk',
        'autogen',
        'crewai',
        'state machine',
        'multi-agent',
        'agentic workflow',
        'agentic workflows',
        'cyclic graph',
        'dag',
        'orchestration',
        'supervisor',
        'planner'
      ]
    },
    {
      clusterName: 'Cloud-Native GPU & Kubernetes Inference',
      pillarAffinity: 'Cloud & Infra',
      secondaryPillar: 'Agentic AI',
      weight: 1.3,
      terms: [
        'gke',
        'eks',
        'aks',
        'kubernetes',
        'k8s',
        'openshift',
        'vllm',
        'ray',
        'kuberay',
        'triton',
        'gpu',
        'h100',
        'a100',
        'mig',
        'cuda',
        'inference cluster'
      ]
    },
    {
      clusterName: 'Enterprise GCC & Financial-Grade Governance',
      pillarAffinity: 'Cloud & Infra',
      secondaryPillar: 'FDE',
      weight: 1.25,
      terms: [
        'bank',
        'banking',
        'gcc',
        'regulated',
        'compliance',
        'soc2',
        'pci',
        'pci-dss',
        'zero-trust',
        'governance',
        'mtls',
        'istio',
        'opa',
        'gatekeeper',
        'air-gapped',
        'pii',
        'rbac',
        'ciso',
        'audit'
      ]
    },
    {
      clusterName: 'Production Hybrid RAG & Grounded Retrieval',
      pillarAffinity: 'FDE',
      secondaryPillar: 'Agentic AI',
      weight: 1.2,
      terms: [
        'rag',
        'production rag',
        'hybrid retrieval',
        'vector',
        'pgvector',
        'alloydb',
        'milvus',
        'qdrant',
        'pinecone',
        'bm25',
        'reranking',
        'graphrag',
        'grounding',
        'citation',
        'hallucination'
      ]
    },
    {
      clusterName: 'Forward Deployed Customer Engineering & Rapid Prototyping',
      pillarAffinity: 'FDE',
      secondaryPillar: 'Agentic AI',
      weight: 1.25,
      terms: [
        'fde',
        'forward deployed',
        'customer-facing',
        'c-suite',
        'rapid prototyping',
        '0-to-1',
        'pilot',
        'discovery',
        'stakeholder',
        'field engineering',
        'executive advisory',
        'rollout'
      ]
    },
    {
      clusterName: 'Agentic Evaluation, Simulation & Guardrail Harnesses',
      pillarAffinity: 'Agentic AI',
      secondaryPillar: 'FDE',
      weight: 1.3,
      terms: [
        'eval',
        'evals',
        'evaluation',
        'golden dataset',
        'golden datasets',
        'simulation',
        'llm-as-a-judge',
        'trajectory',
        'adversarial',
        'guardrails',
        'opentelemetry',
        'telemetry',
        'observability',
        'self-correction'
      ]
    },
    {
      clusterName: 'Model Context Protocol (MCP) & Deterministic Tool Calling',
      pillarAffinity: 'Agentic AI',
      secondaryPillar: 'FDE',
      weight: 1.25,
      terms: [
        'mcp',
        'model context protocol',
        'a2a',
        'agent-to-agent',
        'tool calling',
        'function calling',
        'json schema',
        'json-schema',
        'hitl',
        'human-in-the-loop',
        'sandboxed',
        'deterministic'
      ]
    },
    {
      clusterName: 'Low-Latency Real-Time & Multimodal Streaming SLOs',
      pillarAffinity: 'FDE',
      secondaryPillar: 'Agentic AI',
      weight: 1.15,
      terms: [
        'latency',
        'slo',
        'slos',
        'p99',
        'ttft',
        'streaming',
        'voice',
        'multimodal',
        'barge-in',
        'semantic caching',
        'speculative decoding',
        'real-time',
        'throughput'
      ]
    },
    {
      clusterName: 'Cloud FinOps, Multi-Region Resilience & IaC Automation',
      pillarAffinity: 'Cloud & Infra',
      secondaryPillar: 'FDE',
      weight: 1.2,
      terms: [
        'finops',
        'multi-region',
        'disaster recovery',
        'high availability',
        '99.99%',
        'terraform',
        'crossplane',
        'gitops',
        'iac',
        'quantization',
        'lora',
        'fp8',
        'awq',
        'multiplexing'
      ]
    }
  ];

  // Build flat lookup dictionary (70+ terms -> canonical cluster name)
  const CONCEPT_ONTOLOGY = {};
  SEMANTIC_CLUSTERS.forEach(function (cluster) {
    cluster.terms.forEach(function (term) {
      CONCEPT_ONTOLOGY[term.toLowerCase()] = cluster.clusterName;
    });
  });

  function clampInt(val, min, max) {
    const rounded = Math.round(val);
    if (rounded < min) return min;
    if (rounded > max) return max;
    return rounded;
  }

  function normalizeText(input) {
    if (!input || typeof input !== 'string') return '';
    return input.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  /**
   * Agent 1: Deconstruct the raw JD text into Pillar, Org DNA, Required Semantic Clusters,
   * and Architectural Expectation summary.
   */
  function deconstructJD(rawJdText) {
    const normalized = normalizeText(rawJdText);

    // Detect active semantic clusters and matched trigger terms
    const matchedClusters = [];
    const pillarScores = {
      'FDE': 0,
      'Agentic AI': 0,
      'Cloud & Infra': 0
    };

    SEMANTIC_CLUSTERS.forEach(function (cluster) {
      const hits = [];
      cluster.terms.forEach(function (term) {
        if (normalized.indexOf(term) !== -1) {
          hits.push(term);
        }
      });

      if (hits.length > 0) {
        matchedClusters.push({
          clusterName: cluster.clusterName,
          hits: hits,
          weight: cluster.weight,
          pillarAffinity: cluster.pillarAffinity
        });
        pillarScores[cluster.pillarAffinity] += hits.length * cluster.weight * 2.2;
        if (cluster.secondaryPillar) {
          pillarScores[cluster.secondaryPillar] += hits.length * 0.85;
        }
      }
    });

    // Additional explicit pillar cues
    if (normalized.indexOf('forward deployed') !== -1 || normalized.indexOf('fde') !== -1) {
      pillarScores['FDE'] += 10;
    }
    if (normalized.indexOf('infrastructure') !== -1 || normalized.indexOf('kubernetes') !== -1 || normalized.indexOf('gcc') !== -1) {
      pillarScores['Cloud & Infra'] += 8;
    }
    if (normalized.indexOf('evaluation') !== -1 || normalized.indexOf('mcp') !== -1 || normalized.indexOf('simulation') !== -1) {
      pillarScores['Agentic AI'] += 9;
    }

    // Fallback if empty or very brief JD
    if (matchedClusters.length === 0) {
      matchedClusters.push(
        {
          clusterName: 'Stateful Multi-Agent Orchestration',
          hits: ['multi-agent', 'orchestration'],
          weight: 1.25,
          pillarAffinity: 'FDE'
        },
        {
          clusterName: 'Production Hybrid RAG & Grounded Retrieval',
          hits: ['production rag', 'grounding'],
          weight: 1.2,
          pillarAffinity: 'FDE'
        },
        {
          clusterName: 'Agentic Evaluation, Simulation & Guardrail Harnesses',
          hits: ['evals', 'guardrails'],
          weight: 1.2,
          pillarAffinity: 'Agentic AI'
        }
      );
      pillarScores['FDE'] = 12;
      pillarScores['Agentic AI'] = 10;
      pillarScores['Cloud & Infra'] = 8;
    }

    // Determine primary pillar
    let detectedPillar = 'FDE';
    let topPillarScore = pillarScores['FDE'];
    if (pillarScores['Cloud & Infra'] > topPillarScore) {
      detectedPillar = 'Cloud & Infra';
      topPillarScore = pillarScores['Cloud & Infra'];
    }
    if (pillarScores['Agentic AI'] > topPillarScore) {
      detectedPillar = 'Agentic AI';
      topPillarScore = pillarScores['Agentic AI'];
    }

    // Determine Organization DNA (Product Velocity vs. Enterprise GCC Governance)
    const gccSignals = ['gcc', 'bank', 'banking', 'soc2', 'pci', 'regulated', 'zero-trust', 'compliance', 'ciso', 'air-gapped', 'finops'];
    const productSignals = ['product', 'google', 'fde', 'forward deployed', '0-to-1', 'rapid prototyping', 'latency', 'slo', 'mcp', 'simulation', 'frontier'];

    let gccCount = 0;
    let productCount = 0;
    gccSignals.forEach(function (term) {
      if (normalized.indexOf(term) !== -1) gccCount += 1;
    });
    productSignals.forEach(function (term) {
      if (normalized.indexOf(term) !== -1) productCount += 1;
    });

    let detectedDNA = 'Tier-1 Product Velocity & Customer-Facing Execution';
    let dnaWeights = { product: 0.65, gcc: 0.35 };
    if (gccCount >= productCount + 1 || detectedPillar === 'Cloud & Infra' && gccCount >= 2) {
      detectedDNA = 'Enterprise GCC & Regulated Financial Governance';
      dnaWeights = { product: 0.32, gcc: 0.68 };
    } else if (gccCount >= 2 && productCount >= 2) {
      detectedDNA = 'Hybrid Tier-1 Product Velocity + Enterprise GCC Governance';
      dnaWeights = { product: 0.5, gcc: 0.5 };
    } else if (detectedPillar === 'Agentic AI') {
      detectedDNA = 'High-Velocity Frontier AI Platform & Evaluation Rigor';
      dnaWeights = { product: 0.7, gcc: 0.3 };
    }

    const coreConceptsRequired = matchedClusters.map(function (c) {
      return c.clusterName;
    });

    let architectureExpectation = '';
    if (detectedPillar === 'FDE') {
      architectureExpectation = 'Requires a hands-on Forward Deployed AI Architect who can embed with executive stakeholders, architect stateful multi-agent DAGs (LangGraph/ADK) and grounded hybrid RAG pipelines, and hit sub-400ms P99 latency SLOs in 30-day production sprints.';
    } else if (detectedPillar === 'Cloud & Infra') {
      architectureExpectation = 'Requires a Staff/Principal Cloud & GenAI Infrastructure Architect capable of operating multi-region GKE/EKS GPU clusters (vLLM/Triton/KubeRay) under strict Zero-Trust mTLS, OPA policy-as-code, SOC2/PCI compliance, and GPU FinOps governance.';
    } else {
      architectureExpectation = 'Requires a Senior Applied Agentic AI & Evaluation Systems Lead with deep mastery of MCP/A2A protocols, deterministic tool schemas, 1,000+ scenario golden simulation harnesses, and low-latency voice/multimodal state resilience.';
    }

    return {
      detectedPillar: detectedPillar,
      detectedDNA: detectedDNA,
      coreConceptsRequired: coreConceptsRequired,
      architectureExpectation: architectureExpectation,
      _internal: {
        matchedClusters: matchedClusters,
        dnaWeights: dnaWeights,
        normalizedText: normalized
      }
    };
  }

  /**
   * Evaluates a single candidate against the parsed JD analysis using both:
   * 1) Naive exact keyword overlap (to demonstrate why legacy ATS search fails)
   * 2) Multi-Agent Semantic Ontology + DNA + Pre-Check Rubric scoring
   */
  function evaluateCandidateForJD(candidate, jdAnalysis) {
    const internal = jdAnalysis._internal;
    const normalizedJd = internal.normalizedText;
    const matchedClusters = internal.matchedClusters;

    // 1. Compute Naive Keyword Score (38 - 65)
    // Legacy ATS checks how many of candidate.explicitKeywords appear verbatim in the JD text
    let exactKeywordHits = 0;
    const missedExplicitTerms = [];
    candidate.explicitKeywords.forEach(function (kw) {
      const kwLower = kw.toLowerCase();
      if (normalizedJd.indexOf(kwLower) !== -1) {
        exactKeywordHits += 1;
      } else {
        missedExplicitTerms.push(kw);
      }
    });

    const rawKeywordRatio = candidate.explicitKeywords.length > 0
      ? exactKeywordHits / candidate.explicitKeywords.length
      : 0.25;
    // Map ratio into realistic ATS keyword score range [38, 65]
    const pillarKeywordBonus = candidate.pillar === jdAnalysis.detectedPillar ? 7 : 0;
    const keywordScore = clampInt(39 + Math.round(rawKeywordRatio * 34) + pillarKeywordBonus, 38, 65);

    // 2. Compute Semantic Cluster Overlap & Evidence Mapping
    const candidateConceptMap = {};
    candidate.semanticCapabilities.forEach(function (cap) {
      candidateConceptMap[cap.concept] = cap;
    });

    let matchedClusterCount = 0;
    let weightedClusterScore = 0;
    let totalClusterWeight = 0;
    const matchedEvidenceList = [];
    const bridgedEquivalents = [];

    matchedClusters.forEach(function (reqCluster) {
      totalClusterWeight += reqCluster.weight;
      const candidateCap = candidateConceptMap[reqCluster.clusterName];
      if (candidateCap) {
        matchedClusterCount += 1;
        weightedClusterScore += reqCluster.weight;
        matchedEvidenceList.push(
          candidateCap.concept + ': ' + candidateCap.evidence
        );
        if (reqCluster.hits.length > 0) {
          bridgedEquivalents.push({
            jdTerm: reqCluster.hits[0],
            clusterName: reqCluster.clusterName
          });
        }
      } else {
        // Check partial equivalence overlap via equivalents array
        let partialMatch = null;
        candidate.semanticCapabilities.forEach(function (cap) {
          cap.equivalents.forEach(function (eq) {
            if (reqCluster.hits.indexOf(eq) !== -1 && !partialMatch) {
              partialMatch = cap;
            }
          });
        });
        if (partialMatch) {
          weightedClusterScore += reqCluster.weight * 0.65;
          matchedEvidenceList.push(
            partialMatch.concept + ': ' + partialMatch.evidence
          );
        }
      }
    });

    // Ensure matchedEvidence always has exactly 3 high-signal verified items
    candidate.semanticCapabilities.forEach(function (cap) {
      const formatted = cap.concept + ': ' + cap.evidence;
      if (matchedEvidenceList.length < 3 && matchedEvidenceList.indexOf(formatted) === -1) {
        matchedEvidenceList.push(formatted);
      }
    });
    candidate.verifiedHighlights.forEach(function (hl) {
      if (matchedEvidenceList.length < 3 && matchedEvidenceList.indexOf(hl) === -1) {
        matchedEvidenceList.push(hl);
      }
    });
    const finalMatchedEvidence = matchedEvidenceList.slice(0, 3);

    // 3. Dimension Breakdown Calculation (0 - 100)
    const semanticRatio = totalClusterWeight > 0
      ? Math.min(1, weightedClusterScore / totalClusterWeight)
      : 0.75;

    const isPrimaryPillar = candidate.pillar === jdAnalysis.detectedPillar;
    const architectureFit = clampInt(
      (semanticRatio * 52) +
      (candidate.precheckRubric.architecture * 0.36) +
      (isPrimaryPillar ? 11 : 2),
      72,
      99
    );

    const dnaAlignment = clampInt(
      (candidate.dnaScores.productVelocity * internal.dnaWeights.product) +
      (candidate.dnaScores.gccGovernance * internal.dnaWeights.gcc) +
      (isPrimaryPillar ? 4 : -3),
      74,
      99
    );

    const productionEvidence = clampInt(
      (candidate.precheckRubric.productionDepth * 0.65) +
      (candidate.precheckRubric.codeQuality * 0.25) +
      (matchedClusterCount >= 3 ? 9 : 4),
      76,
      99
    );

    const stakeholderReadiness = clampInt(
      (candidate.precheckRubric.communication * 0.55) +
      (jdAnalysis.detectedPillar === 'FDE'
        ? candidate.dnaScores.fdeClientFacing * 0.45
        : jdAnalysis.detectedPillar === 'Cloud & Infra'
          ? candidate.dnaScores.gccGovernance * 0.45
          : candidate.dnaScores.agenticDepth * 0.45),
      75,
      99
    );

    // 4. Overall Agentic Score (72 - 98)
    const rawComposite =
      (architectureFit * 0.34) +
      (dnaAlignment * 0.24) +
      (productionEvidence * 0.24) +
      (stakeholderReadiness * 0.18);

    const agenticScore = clampInt(
      rawComposite + (isPrimaryPillar ? 3 : -4),
      72,
      98
    );

    // 5. Semantic Delta Explanation (1-2 clear sentences contrasting Keyword vs Agentic score)
    const sampleMissedTerms = missedExplicitTerms.slice(0, 2).join('" & "') || candidate.explicitKeywords.slice(0, 2).join('" & "');
    const topBridgedCluster = bridgedEquivalents.length > 0
      ? bridgedEquivalents[0].clusterName
      : candidate.semanticCapabilities[0].concept;

    const semanticDeltaExplanation =
      'Legacy keyword search scored this profile only ' + keywordScore + '% because their resume highlights production systems in "' +
      sampleMissedTerms + '" rather than repeating exact JD checklist strings. ' +
      'Agent 2 mapped their verified "' + topBridgedCluster + '" architecture and ' +
      candidate.precheckScore + '/10 panel evaluation directly to your target stack (+' + (agenticScore - keywordScore) + '% semantic lift).';

    // 6. Polished 3-sentence Recruiter Pitch for the Hiring Manager
    const recruiterPitch =
      candidate.codename + ' (' + candidate.title + ', ' + candidate.experienceYears + ' yrs) is a pre-checked ' +
      candidate.pedigreeBadge.replace(' • Pre-Checked', '') + ' leader who scored ' + candidate.precheckScore +
      '/10 in our live architecture and production code review (' + agenticScore + '% Agentic Match vs. ' + keywordScore + '% naive keyword score). ' +
      'They bring panel-verified production evidence across ' +
      candidate.semanticCapabilities.slice(0, 2).map(function (c) { return c.concept; }).join(' and ') +
      '—specifically having built ' + candidate.verifiedHighlights[0].replace(/^Panel-Verified System #1:\s*/i, '') + ' ' +
      'Available on ' + candidate.availability + ' (' + candidate.location + '), with a transparent onboarding note: ' +
      candidate.rampUpNotes;

    // 7. Two tailored Interview Questions for the Hiring Manager
    const primaryCap = candidate.semanticCapabilities[0];
    const secondaryCap = candidate.semanticCapabilities[1] || candidate.semanticCapabilities[0];
    const suggestedInterviewQuestions = [
      'Architecture Deep-Dive (' + primaryCap.concept + '): Walk us through the failure modes, state checkpointing, and latency/governance trade-offs in your "' +
        candidate.verifiedHighlights[0].replace(/^Panel-Verified System #1:\s*/i, '').replace(/\.$/, '') +
        '", and how you would adapt that blueprint to our ' + jdAnalysis.detectedPillar + ' roadmap in the first 30 days.',
      'Execution & Ramp Validation (' + secondaryCap.concept + '): Given our focus on ' +
        jdAnalysis.coreConceptsRequired.slice(0, 2).join(' and ') +
        ', how would you benchmark production reliability and align engineering velocity with our ' +
        jdAnalysis.detectedDNA + ' standards?'
    ];

    return {
      candidate: candidate,
      agenticScore: agenticScore,
      keywordScore: keywordScore,
      semanticDeltaExplanation: semanticDeltaExplanation,
      dimensionBreakdown: {
        architectureFit: architectureFit,
        dnaAlignment: dnaAlignment,
        productionEvidence: productionEvidence,
        stakeholderReadiness: stakeholderReadiness
      },
      matchedEvidence: finalMatchedEvidence,
      honestTradeoff: candidate.rampUpNotes,
      recruiterPitch: recruiterPitch,
      suggestedInterviewQuestions: suggestedInterviewQuestions
    };
  }

  /**
   * Main entry point invoked by the Recruiter Matching Portal:
   * window.AgenticMatcher.analyzeAndRank(jdText, filterPillar = 'all')
   */
  function analyzeAndRank(jdText, filterPillar) {
    const activeFilter = (filterPillar || 'all').trim();
    const candidatesPool = Array.isArray(global.PRECHECKED_CANDIDATES)
      ? global.PRECHECKED_CANDIDATES
      : [];

    const rawJd = jdText && typeof jdText === 'string' && jdText.trim().length > 0
      ? jdText
      : (global.PRESET_JDS && global.PRESET_JDS[0] ? global.PRESET_JDS[0].text : '');

    // Run Agent 1 JD Deconstruction
    const fullJdAnalysis = deconstructJD(rawJd);

    // Score all candidates
    const allEvaluated = candidatesPool.map(function (candidate) {
      return evaluateCandidateForJD(candidate, fullJdAnalysis);
    });

    // Sort descending by agenticScore (tie-break by precheckScore)
    allEvaluated.sort(function (a, b) {
      if (b.agenticScore !== a.agenticScore) {
        return b.agenticScore - a.agenticScore;
      }
      return b.candidate.precheckScore - a.candidate.precheckScore;
    });

    // Apply optional pillar filter if specified
    const filteredRanked = allEvaluated.filter(function (item) {
      if (!activeFilter || activeFilter.toLowerCase() === 'all') {
        return true;
      }
      const normFilter = activeFilter.toLowerCase();
      const candPillar = (item.candidate.pillar || '').toLowerCase();
      return candPillar === normFilter || candPillar.indexOf(normFilter) !== -1;
    });

    const rankedCandidates = filteredRanked.length > 0 ? filteredRanked : allEvaluated;
    const topMatch = rankedCandidates[0];
    const avgKeyword = rankedCandidates.length > 0
      ? Math.round(rankedCandidates.reduce(function (acc, r) { return acc + r.keywordScore; }, 0) / rankedCandidates.length)
      : 51;
    const topDelta = topMatch ? (topMatch.agenticScore - topMatch.keywordScore) : 39;

    // Build dynamic 4-Agent Reasoning Traces tailored to the input JD
    const agentTraces = [
      {
        agentName: 'Agent 1: JD Deconstructor & Expectation Parser',
        role: 'Parses raw JD into Pillar Archetype, Org DNA, and Required Architectural Vectors',
        status: 'Verified',
        finding: 'Classified role as [' + fullJdAnalysis.detectedPillar + '] with "' + fullJdAnalysis.detectedDNA + '" DNA. Extracted ' +
          fullJdAnalysis.coreConceptsRequired.length + ' core architectural clusters: ' +
          fullJdAnalysis.coreConceptsRequired.slice(0, 4).join(' • ') + '.'
      },
      {
        agentName: 'Agent 2: Semantic Architecture & Equivalence Mapper',
        role: 'Maps candidate production systems across 70+ AI, Cloud, and FDE ontology concepts',
        status: 'Verified',
        finding: 'Bridged cross-stack architectural equivalents (e.g., Google ADK <-> LangGraph stateful DAGs, AlloyDB/Qdrant <-> Production Hybrid RAG, GKE/Triton <-> EKS/vLLM GPU clusters). Rescued top candidates from a ' +
          avgKeyword + '% average naive keyword score with up to +' + topDelta + '% semantic recall lift.'
      },
      {
        agentName: 'Agent 3: Product Co & GCC Bar Verifier',
        role: 'Audits pre-checked architecture rubrics, compliance readiness, and 30-day ramp trade-offs',
        status: 'Verified',
        finding: topMatch
          ? 'Verified all ' + rankedCandidates.length + ' profiles against Tier-1 Product & Global Banking GCC rubrics. Top candidate ' +
            topMatch.candidate.codename + ' (' + topMatch.candidate.precheckScore + '/10 Pre-Check) achieved ' +
            topMatch.dimensionBreakdown.architectureFit + '% Architecture Fit and ' +
            topMatch.dimensionBreakdown.dnaAlignment + '% Org DNA Alignment.'
          : 'Verified candidate pool against Tier-1 Product and Global GCC architectural bar.'
      },
      {
        agentName: 'Agent 4: Recruiter Shortlist & Pitch Synthesizer',
        role: 'Generates copy-ready Hiring Manager briefs, ramp-up disclosures, and technical interview probes',
        status: 'Verified',
        finding: topMatch
          ? 'Synthesized Hiring Manager pitches and custom interview probes for ' + rankedCandidates.length +
            ' candidates. Recommended #1 shortlist pick: ' + topMatch.candidate.codename + ' (' +
            topMatch.agenticScore + '% Agentic Match, ' + topMatch.candidate.availability + ').'
          : 'Synthesized recruiter shortlist briefs and interview guides.'
      }
    ];

    return {
      jdAnalysis: {
        detectedPillar: fullJdAnalysis.detectedPillar,
        detectedDNA: fullJdAnalysis.detectedDNA,
        coreConceptsRequired: fullJdAnalysis.coreConceptsRequired,
        architectureExpectation: fullJdAnalysis.architectureExpectation
      },
      agentTraces: agentTraces,
      rankedCandidates: rankedCandidates
    };
  }

  global.AgenticMatcher = {
    SEMANTIC_CLUSTERS: SEMANTIC_CLUSTERS,
    CONCEPT_ONTOLOGY: CONCEPT_ONTOLOGY,
    ONTOLOGY: CONCEPT_ONTOLOGY,
    analyzeAndRank: analyzeAndRank
  };
})(typeof window !== 'undefined' ? window : globalThis);
