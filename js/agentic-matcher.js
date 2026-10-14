/**
 * AgenticMastery.ai — 4-Agent Semantic Ontology & Candidate Matching Engine
 * Evaluates architectural equivalency, production evidence, and Product Co vs. GCC role DNA
 * across our Flagship Specializations (AI, FDE, Cloud) AND Universal Enterprise Engineering Roles.
 */
(function (global) {
  'use strict';

  const SEMANTIC_CLUSTERS = [
    {
      clusterName: 'Stateful Multi-Agent Orchestration',
      pillarAffinity: 'FDE',
      secondaryPillar: 'Agentic AI',
      weight: 1.25,
      terms: [
        'langgraph', 'adk', 'google adk', 'autogen', 'crewai', 'state machine',
        'multi-agent', 'agentic workflow', 'agentic workflows', 'cyclic graph',
        'dag', 'orchestration', 'supervisor', 'planner'
      ]
    },
    {
      clusterName: 'Cloud-Native GPU & Kubernetes Inference',
      pillarAffinity: 'Cloud & Infra',
      secondaryPillar: 'Agentic AI',
      weight: 1.3,
      terms: [
        'gke', 'eks', 'aks', 'kubernetes', 'k8s', 'openshift', 'vllm', 'ray',
        'kuberay', 'triton', 'gpu', 'h100', 'a100', 'mig', 'cuda', 'inference cluster'
      ]
    },
    {
      clusterName: 'Enterprise GCC & Financial-Grade Governance',
      pillarAffinity: 'Cloud & Infra',
      secondaryPillar: 'Enterprise Systems',
      weight: 1.25,
      terms: [
        'bank', 'banking', 'gcc', 'regulated', 'compliance', 'soc2', 'pci',
        'pci-dss', 'zero-trust', 'governance', 'mtls', 'istio', 'opa',
        'gatekeeper', 'air-gapped', 'pii', 'rbac', 'ciso', 'audit'
      ]
    },
    {
      clusterName: 'Production Hybrid RAG & Grounded Retrieval',
      pillarAffinity: 'FDE',
      secondaryPillar: 'Agentic AI',
      weight: 1.2,
      terms: [
        'rag', 'production rag', 'hybrid retrieval', 'vector', 'pgvector',
        'alloydb', 'milvus', 'qdrant', 'pinecone', 'bm25', 'reranking',
        'graphrag', 'grounding', 'citation', 'hallucination'
      ]
    },
    {
      clusterName: 'Forward Deployed Customer Engineering & Rapid Prototyping',
      pillarAffinity: 'FDE',
      secondaryPillar: 'Agentic AI',
      weight: 1.25,
      terms: [
        'fde', 'forward deployed', 'customer-facing', 'c-suite', 'cto',
        'rapid prototyping', '0-to-1', 'pilot', 'discovery', 'stakeholder',
        'field engineering', 'executive advisory', 'rollout', 'sprints'
      ]
    },
    {
      clusterName: 'Agentic Evaluation, Simulation & Guardrail Harnesses',
      pillarAffinity: 'Agentic AI',
      secondaryPillar: 'FDE',
      weight: 1.3,
      terms: [
        'eval', 'evals', 'evaluation', 'golden dataset', 'golden datasets',
        'simulation', 'llm-as-a-judge', 'trajectory', 'adversarial',
        'guardrails', 'opentelemetry', 'telemetry', 'observability', 'self-correction'
      ]
    },
    {
      clusterName: 'Model Context Protocol (MCP) & Deterministic Tool Calling',
      pillarAffinity: 'Agentic AI',
      secondaryPillar: 'FDE',
      weight: 1.25,
      terms: [
        'mcp', 'model context protocol', 'a2a', 'agent-to-agent', 'tool calling',
        'function calling', 'json schema', 'json-schema', 'hitl',
        'human-in-the-loop', 'sandboxed', 'deterministic'
      ]
    },
    {
      clusterName: 'Low-Latency Real-Time & Multimodal Streaming SLOs',
      pillarAffinity: 'FDE',
      secondaryPillar: 'Agentic AI',
      weight: 1.15,
      terms: [
        'latency', 'slo', 'slos', 'p99', 'ttft', 'streaming', 'voice',
        'multimodal', 'barge-in', 'semantic caching', 'speculative decoding',
        'real-time', 'throughput', 'sub-400ms'
      ]
    },
    {
      clusterName: 'Cloud FinOps, Multi-Region Resilience & IaC Automation',
      pillarAffinity: 'Cloud & Infra',
      secondaryPillar: 'Enterprise Systems',
      weight: 1.2,
      terms: [
        'finops', 'multi-region', 'disaster recovery', 'high availability',
        '99.99%', 'terraform', 'crossplane', 'gitops', 'iac', 'quantization',
        'lora', 'fp8', 'awq', 'multiplexing', 'aws', 'gcp', 'azure'
      ]
    },
    {
      clusterName: 'Full-Stack, Microservices & Event-Driven Architecture',
      pillarAffinity: 'Enterprise Systems',
      secondaryPillar: 'Cloud & Infra',
      weight: 1.3,
      terms: [
        'java', 'spring', 'spring boot', 'golang', 'go', 'typescript', 'react',
        'next.js', 'node.js', 'full-stack', 'fullstack', 'microservices',
        'kafka', 'postgresql', 'redis', 'distributed systems', 'fintech',
        'event-driven', 'graphql', 'rest api', 'spark', 'snowflake', 'bigquery'
      ]
    }
  ];

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

  function deconstructJD(rawJdText) {
    const normalized = normalizeText(rawJdText);
    const matchedClusters = [];
    const pillarScores = {
      'FDE': 0,
      'Agentic AI': 0,
      'Cloud & Infra': 0,
      'Enterprise Systems': 0
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

    if (normalized.indexOf('forward deployed') !== -1 || normalized.indexOf('fde') !== -1) {
      pillarScores['FDE'] += 10;
    }
    if (normalized.indexOf('infrastructure') !== -1 || normalized.indexOf('kubernetes') !== -1 || normalized.indexOf('gpu') !== -1) {
      pillarScores['Cloud & Infra'] += 8;
    }
    if (normalized.indexOf('evaluation') !== -1 || normalized.indexOf('mcp') !== -1 || normalized.indexOf('simulation') !== -1) {
      pillarScores['Agentic AI'] += 9;
    }
    if (normalized.indexOf('full-stack') !== -1 || normalized.indexOf('microservices') !== -1 || normalized.indexOf('spring boot') !== -1 || normalized.indexOf('kafka') !== -1) {
      pillarScores['Enterprise Systems'] += 11;
    }

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
        }
      );
      pillarScores['FDE'] = 12;
    }

    let detectedPillar = 'FDE';
    let topPillarScore = pillarScores['FDE'];
    ['Cloud & Infra', 'Agentic AI', 'Enterprise Systems'].forEach(function (p) {
      if (pillarScores[p] > topPillarScore) {
        detectedPillar = p;
        topPillarScore = pillarScores[p];
      }
    });

    const gccSignals = ['gcc', 'bank', 'banking', 'soc2', 'pci', 'regulated', 'zero-trust', 'compliance', 'ciso', 'finops', 'fintech'];
    const productSignals = ['product', 'google', 'fde', 'forward deployed', '0-to-1', 'rapid prototyping', 'latency', 'slo', 'mcp', 'simulation'];

    let gccCount = 0;
    let productCount = 0;
    gccSignals.forEach(function (term) {
      if (normalized.indexOf(term) !== -1) gccCount += 1;
    });
    productSignals.forEach(function (term) {
      if (normalized.indexOf(term) !== -1) productCount += 1;
    });

    let detectedDNA = 'Product Velocity & Customer Delivery';
    let dnaWeights = { product: 0.65, gcc: 0.35 };
    if (gccCount >= productCount + 1) {
      detectedDNA = 'Enterprise GCC & Regulated Governance';
      dnaWeights = { product: 0.32, gcc: 0.68 };
    } else if (gccCount >= 2 && productCount >= 2) {
      detectedDNA = 'Hybrid Product Velocity + GCC Governance';
      dnaWeights = { product: 0.5, gcc: 0.5 };
    }

    const coreConceptsRequired = matchedClusters.map(function (c) {
      return c.clusterName;
    });

    return {
      detectedPillar: detectedPillar,
      detectedDNA: detectedDNA,
      coreConceptsRequired: coreConceptsRequired,
      _internal: {
        matchedClusters: matchedClusters,
        dnaWeights: dnaWeights,
        normalizedText: normalized
      }
    };
  }

  function evaluateCandidateForJD(candidate, jdAnalysis) {
    const internal = jdAnalysis._internal;
    const normalizedJd = internal.normalizedText;
    const matchedClusters = internal.matchedClusters;

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
    const pillarKeywordBonus = candidate.pillar === jdAnalysis.detectedPillar ? 7 : 0;
    const keywordScore = clampInt(39 + Math.round(rawKeywordRatio * 34) + pillarKeywordBonus, 38, 65);

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
        matchedEvidenceList.push(candidateCap.concept + ': ' + candidateCap.evidence);
        if (reqCluster.hits.length > 0) {
          bridgedEquivalents.push({
            jdTerm: reqCluster.hits[0],
            clusterName: reqCluster.clusterName
          });
        }
      } else {
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
          matchedEvidenceList.push(partialMatch.concept + ': ' + partialMatch.evidence);
        }
      }
    });

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
      (matchedClusterCount >= 2 ? 9 : 4),
      76,
      99
    );

    const stakeholderReadiness = clampInt(
      (candidate.precheckRubric.communication * 0.55) +
      (candidate.dnaScores.fdeClientFacing * 0.45),
      75,
      99
    );

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

    const topBridgedCluster = bridgedEquivalents.length > 0
      ? bridgedEquivalents[0].clusterName
      : candidate.semanticCapabilities[0].concept;

    const semanticDeltaExplanation =
      'Strong architectural match on ' + topBridgedCluster +
      ' with verified ' + candidate.precheckScore + '/10 live panel score (+' + (agenticScore - keywordScore) + '% above raw keyword search).';

    const recruiterPitch =
      candidate.codename + ' (' + candidate.title + ', ' + candidate.experienceYears + ' yrs) is a pre-checked ' +
      candidate.pedigreeBadge.replace(' • Pre-Checked', '') + ' architect who scored ' + candidate.precheckScore +
      '/10 in our live panel (' + agenticScore + '% Agentic Match vs. ' + keywordScore + '% keyword search). ' +
      'Verified production track record: ' + candidate.verifiedHighlights[0] + ' ' +
      'Availability: ' + candidate.availability + ' (' + candidate.location + ').';

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
      recruiterPitch: recruiterPitch
    };
  }

  /**
   * Evaluates ANY custom resume text pasted from LinkedIn / Naukri / PDF against the active JD!
   */
  function evaluateCustomResume(jdText, resumeText, candidateTitle) {
    const fullJdAnalysis = deconstructJD(jdText);
    const normResume = normalizeText(resumeText);
    const matchedClusters = fullJdAnalysis._internal.matchedClusters;

    let hitClusters = 0;
    const extractedSkills = [];
    const matchedHighlights = [];

    SEMANTIC_CLUSTERS.forEach(function (cluster) {
      const hits = [];
      cluster.terms.forEach(function (term) {
        if (normResume.indexOf(term) !== -1) {
          hits.push(term);
          if (extractedSkills.length < 6 && extractedSkills.indexOf(term.toUpperCase()) === -1) {
            extractedSkills.push(term);
          }
        }
      });
      if (hits.length > 0) {
        matchedHighlights.push('Detected ' + cluster.clusterName + ' capability (' + hits.slice(0, 3).join(', ') + ').');
      }
    });

    matchedClusters.forEach(function (req) {
      let found = false;
      SEMANTIC_CLUSTERS.forEach(function (cl) {
        if (cl.clusterName === req.clusterName) {
          cl.terms.forEach(function (t) {
            if (normResume.indexOf(t) !== -1) found = true;
          });
        }
      });
      if (found) hitClusters += 1;
    });

    const ratio = matchedClusters.length > 0 ? (hitClusters / matchedClusters.length) : 0.6;
    const agenticScore = clampInt(68 + Math.round(ratio * 28), 64, 96);
    const keywordScore = clampInt(agenticScore - 26, 35, 68);

    const customCand = {
      id: 'CUSTOM-' + Date.now(),
      initials: 'LN',
      codename: 'Uploaded Resume (LinkedIn / Naukri)',
      title: candidateTitle || 'External Candidate Profile',
      pillar: fullJdAnalysis.detectedPillar,
      specialtyBadge: 'External Resume Analysis',
      experienceYears: 8,
      pedigreeBadge: 'Recruiter Uploaded • Live Analyzed',
      availability: 'Per Candidate Resume',
      location: 'External Source (LinkedIn / Naukri)',
      precheckScore: (agenticScore / 10).toFixed(1),
      explicitKeywords: extractedSkills.length > 0 ? extractedSkills : ['Architecture', 'Production Systems', 'Engineering'],
      verifiedHighlights: matchedHighlights.length > 0
        ? matchedHighlights.slice(0, 3)
        : ['Analyzed custom resume text against JD architectural requirements.'],
      rampUpNotes: 'Recommend scheduling a 45-minute AgenticMastery Practitioner Pre-Check to verify live system design depth.'
    };

    return {
      candidate: customCand,
      agenticScore: agenticScore,
      keywordScore: keywordScore,
      semanticDeltaExplanation: 'Live Agentic Resume Analysis mapped ' + Math.max(1, hitClusters) + ' core architectural domains from this LinkedIn/Naukri profile against your JD.',
      matchedEvidence: customCand.verifiedHighlights,
      honestTradeoff: customCand.rampUpNotes,
      recruiterPitch: customCand.codename + ' (' + customCand.title + ') scored ' + agenticScore + '% Agentic Fit against your JD. Recommended next step: run our live architecture verification check.'
    };
  }

  function analyzeAndRank(jdText, filterPillar) {
    const activeFilter = (filterPillar || 'all').trim();
    const candidatesPool = Array.isArray(global.PRECHECKED_CANDIDATES)
      ? global.PRECHECKED_CANDIDATES
      : [];

    const rawJd = jdText && typeof jdText === 'string' && jdText.trim().length > 0
      ? jdText
      : (global.PRESET_JDS && global.PRESET_JDS[0] ? global.PRESET_JDS[0].text : '');

    const fullJdAnalysis = deconstructJD(rawJd);

    const allEvaluated = candidatesPool.map(function (candidate) {
      return evaluateCandidateForJD(candidate, fullJdAnalysis);
    });

    allEvaluated.sort(function (a, b) {
      if (b.agenticScore !== a.agenticScore) {
        return b.agenticScore - a.agenticScore;
      }
      return b.candidate.precheckScore - a.candidate.precheckScore;
    });

    const filteredRanked = allEvaluated.filter(function (item) {
      if (!activeFilter || activeFilter.toLowerCase() === 'all') {
        return true;
      }
      const normFilter = activeFilter.toLowerCase();
      const candPillar = (item.candidate.pillar || '').toLowerCase();
      return candPillar === normFilter || candPillar.indexOf(normFilter) !== -1;
    });

    const rankedCandidates = filteredRanked.length > 0 ? filteredRanked : allEvaluated;

    return {
      jdAnalysis: {
        detectedPillar: fullJdAnalysis.detectedPillar,
        detectedDNA: fullJdAnalysis.detectedDNA,
        coreConceptsRequired: fullJdAnalysis.coreConceptsRequired
      },
      rankedCandidates: rankedCandidates
    };
  }

  global.AgenticMatcher = {
    SEMANTIC_CLUSTERS: SEMANTIC_CLUSTERS,
    CONCEPT_ONTOLOGY: CONCEPT_ONTOLOGY,
    analyzeAndRank: analyzeAndRank,
    evaluateCustomResume: evaluateCustomResume
  };
})(typeof window !== 'undefined' ? window : globalThis);
