/**
 * AgenticMastery.ai — Executive Recruiter Portal & Candidate Match Carousel
 * Strict adherence to Secure Web Frontend Principles:
 * Zero innerHTML/outerHTML/document.write/alert, safe DOM construction via createElement & textContent.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // DOM Elements - Search & Modes
    const modeTabPreset = document.getElementById('mode-tab-preset');
    const modeTabCustom = document.getElementById('mode-tab-custom');
    const presetSearchPanel = document.getElementById('preset-search-panel');
    const customResumePanel = document.getElementById('custom-resume-panel');

    const jdInput = document.getElementById('jd-input');
    const runMatchBtn = document.getElementById('run-match-btn');
    const presetChips = document.querySelectorAll('.chip');

    const customJdInput = document.getElementById('custom-jd-input');
    const customResumeInput = document.getElementById('custom-resume-input');
    const customCandidateTitle = document.getElementById('custom-candidate-title');
    const loadSampleResumeBtn = document.getElementById('load-sample-resume-btn');
    const runCustomMatchBtn = document.getElementById('run-custom-match-btn');

    // DOM Elements - Header & Status
    const agentStrip = document.getElementById('agent-strip');
    const resultsSummary = document.getElementById('results-summary');
    const pillarTabs = document.querySelectorAll('.p-tab');

    // DOM Elements - View Switcher
    const viewModeCarouselBtn = document.getElementById('view-mode-carousel');
    const viewModeTableBtn = document.getElementById('view-mode-table');
    const carouselViewContainer = document.getElementById('carousel-view-container');
    const tableViewContainer = document.getElementById('table-view-container');

    // DOM Elements - Carousel Controls
    const carouselViewport = document.getElementById('carousel-viewport');
    const candidateCarousel = document.getElementById('candidate-carousel');
    const carouselPrevBtn = document.getElementById('carousel-prev-btn');
    const carouselNextBtn = document.getElementById('carousel-next-btn');
    const carouselIndicator = document.getElementById('carousel-indicator');

    // DOM Elements - Table View
    const candidateTableBody = document.getElementById('candidate-table-body');

    // DOM Elements - Modals
    const proofModal = document.getElementById('proof-modal');
    const proofModalHeaderInfo = document.getElementById('proof-modal-header-info');
    const proofModalBody = document.getElementById('proof-modal-body');
    const closeProofModalBtn = document.getElementById('close-proof-modal-btn');

    const shortlistBtn = document.getElementById('shortlist-btn');
    const shortlistCount = document.getElementById('shortlist-count');
    const shortlistModal = document.getElementById('shortlist-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const shortlistText = document.getElementById('shortlist-text');
    const copyBriefBtn = document.getElementById('copy-brief-btn');
    const requestIntroLink = document.getElementById('request-intro-link');

    // State
    let activePillar = 'all';
    let currentViewMode = 'carousel'; // 'carousel' | 'table'
    let currentRankedCandidates = [];
    let customEvaluatedCandidate = null;
    const pickedMap = new Map();

    const SAMPLE_RESUME_TEXT = [
        'Candidate: Rahul Sharma | Location: Bengaluru, India',
        'Current Role: Lead Cloud & Distributed Systems Architect (FinTech GCC)',
        'Experience: 9+ Years | Ex-Morgan Stanley GCC, Infosys Tech Lead',
        '',
        'Executive Summary:',
        'Hands-on systems architect with 9 years of experience engineering high-throughput distributed microservices, event-driven streaming architectures, and production cloud infrastructure. Extensive experience architecting Kubernetes clusters, Kafka pipelines, and GenAI inference platforms under financial-grade security, OPA governance, and SOC2 compliance.',
        '',
        'Technical Skills:',
        '• Distributed Systems & Backend: Java, Spring Boot, Golang, TypeScript, Next.js, Node.js, Apache Kafka, RabbitMQ, REST, gRPC',
        '• Cloud & Infrastructure: Multi-region GKE, AWS EKS, Terraform, Istio mTLS, OPA Gatekeeper, Docker, Helm, GitOps',
        '• AI & Inference Platforms: vLLM, Triton Inference Server, Ray, KubeRay, Hybrid RAG, LangGraph multi-agent workflows, pgvector',
        '• Data & Persistence: PostgreSQL, Redis, AlloyDB Vector, Elasticsearch, MongoDB',
        '• Governance & Compliance: Zero-Trust architecture, SOC2, PCI-DSS, PII tokenization, automated audit trails',
        '',
        'Selected Production Highlights:',
        '• Architected multi-region payment settlement microservices in Go and Spring Boot processing 35,000 TPS at 99.99% uptime.',
        '• Deployed self-hosted vLLM inference cluster on GKE across 32 A100 GPUs with dynamic autoscaling, cutting API latency by 40%.',
        '• Built hybrid RAG pipeline using pgvector and cross-encoder reranking for enterprise wealth advisory with strict RBAC document ACLs.',
        '• Authored OPA policy-as-code and Istio mTLS configurations for 80+ banking microservices passing internal audit.'
    ].join('\n');

    function getPresetText(id) {
        if (!window.PRESET_JDS) return '';
        if (Array.isArray(window.PRESET_JDS)) {
            const found = window.PRESET_JDS.find(p => p.id === id);
            return found ? (found.jdText || found.text || '') : '';
        }
        return '';
    }

    // 1-Line Agent Status Strip
    function renderAgentStrip(jdAnalysis) {
        if (!agentStrip || !jdAnalysis) return;
        agentStrip.replaceChildren();

        const items = [
            { label: 'Detected Track', val: jdAnalysis.detectedPillar || 'AI & Cloud' },
            { label: 'Environment Bar', val: jdAnalysis.detectedDNA || 'Product & GCC' },
            { label: 'Key Architecture Signals', val: (jdAnalysis.coreConceptsRequired || []).slice(0, 3).join(' • ') || 'Multi-Agent & Cloud Scale' }
        ];

        items.forEach(item => {
            const badge = document.createElement('span');
            badge.className = 'agent-badge';
            const strong = document.createElement('strong');
            strong.textContent = `${item.label}: `;
            const text = document.createTextNode(item.val);
            badge.appendChild(strong);
            badge.appendChild(text);
            agentStrip.appendChild(badge);
        });
    }

    // Shortlist State & UI
    function updateShortlistUI() {
        if (shortlistCount) {
            shortlistCount.textContent = String(pickedMap.size);
        }
        if (!shortlistText) return;

        if (pickedMap.size === 0) {
            shortlistText.textContent = 'No candidates shortlisted yet.\n\nClick "+ Shortlist" on any candidate card or in the Proof & Pitch dialog to add them here.';
            return;
        }

        const lines = [
            'AgenticMastery.ai — Executive Talent Bench Shortlist',
            `Total Candidates: ${pickedMap.size}`,
            '---------------------------------------------------\n'
        ];

        pickedMap.forEach(item => {
            const c = item.candidate;
            lines.push(`• ${c.codename} — ${c.title}`);
            lines.push(`  Score: ${item.agenticScore}% Agentic Fit (vs ${item.keywordScore}% Keyword Baseline)`);
            lines.push(`  Pedigree: ${c.pedigreeBadge} | Experience: ${c.experienceYears || 8}+ Yrs`);
            lines.push(`  Availability: ${c.availability} | Location: ${c.location}`);
            lines.push(`  Executive Pitch: ${item.recruiterPitch}`);
            lines.push('');
        });

        const fullText = lines.join('\n');
        shortlistText.textContent = fullText;

        if (requestIntroLink) {
            const subject = encodeURIComponent(`[AgenticMastery Executive Shortlist] Interview Request (${pickedMap.size} Candidates)`);
            const body = encodeURIComponent(fullText);
            requestIntroLink.href = `mailto:sundarrajan.raman@gmail.com?subject=${subject}&body=${body}`;
        }
    }

    // Helper: Determine Specialty Badge
    function createSpecialtyBadge(candidate) {
        const span = document.createElement('span');
        if (candidate.isCustom) {
            span.className = 'badge-specialty-custom';
            span.textContent = '✦ Scored External Resume';
        } else if (candidate.pillar === 'Enterprise Systems' || candidate.specialtyBadge === 'Enterprise Engineering') {
            span.className = 'badge-specialty-enterprise';
            span.textContent = 'Enterprise Engineering';
        } else {
            span.className = 'badge-specialty-flagship';
            span.textContent = candidate.specialtyBadge || '★ Flagship Specialty';
        }
        return span;
    }

    // Helper: Build Executive Match Meter Element
    function buildMatchMeter(agenticScore, keywordScore) {
        const meterBox = document.createElement('div');
        meterBox.className = 'match-meter-box';

        const topRow = document.createElement('div');
        topRow.className = 'match-meter-top';

        const label = document.createElement('span');
        label.className = 'match-meter-label';
        label.textContent = 'Executive Match';

        const badge = document.createElement('span');
        badge.className = 'match-score-badge';
        badge.textContent = `${agenticScore}% Match`;

        topRow.appendChild(label);
        topRow.appendChild(badge);

        const barTrack = document.createElement('div');
        barTrack.className = 'match-bar-track';

        const barFill = document.createElement('div');
        barFill.className = 'match-bar-fill';
        barFill.style.width = `${Math.min(100, Math.max(10, agenticScore))}%`;

        barTrack.appendChild(barFill);

        const baseline = document.createElement('div');
        baseline.className = 'match-baseline-note';
        const kwText = document.createElement('span');
        kwText.textContent = `Keyword search baseline: ${keywordScore}%`;
        const deltaText = document.createElement('span');
        const diff = agenticScore - keywordScore;
        deltaText.textContent = diff > 0 ? `+${diff}% semantic lift` : 'Exact alignment';
        baseline.appendChild(kwText);
        baseline.appendChild(deltaText);

        meterBox.appendChild(topRow);
        meterBox.appendChild(barTrack);
        meterBox.appendChild(baseline);

        return meterBox;
    }

    // Render Proof & Pitch Modal
    function openProofModal(item) {
        if (!proofModal || !proofModalHeaderInfo || !proofModalBody) return;
        const c = item.candidate;

        // Header Info
        proofModalHeaderInfo.replaceChildren();

        const avatar = document.createElement('div');
        avatar.className = 'proof-avatar';
        avatar.textContent = c.initials || 'EM';

        const titleWrap = document.createElement('div');
        titleWrap.className = 'proof-title-wrap';

        const nameHead = document.createElement('h3');
        nameHead.id = 'proof-modal-title';
        nameHead.textContent = `${c.codename} — ${c.title}`;

        const subMeta = document.createElement('p');
        subMeta.textContent = `${c.pedigreeBadge} • ${c.experienceYears || 8}+ Yrs Exp • Panel Score: ${c.precheckScore || '9.6'}/10`;

        titleWrap.appendChild(nameHead);
        titleWrap.appendChild(subMeta);

        proofModalHeaderInfo.appendChild(avatar);
        proofModalHeaderInfo.appendChild(titleWrap);

        // Body Info
        proofModalBody.replaceChildren();

        // 1. Match Meter Summary
        const meter = buildMatchMeter(item.agenticScore, item.keywordScore);
        proofModalBody.appendChild(meter);

        // 2. Verified Systems & Highlights
        const evBox = document.createElement('div');
        evBox.className = 'proof-section-box';
        const evTitle = document.createElement('h4');
        evTitle.textContent = '3 Verified Production Systems & Track Record';
        const evList = document.createElement('ul');
        evList.className = 'proof-evidence-list';

        const points = (item.matchedEvidence && item.matchedEvidence.length > 0)
            ? item.matchedEvidence
            : (c.verifiedHighlights || ['Validated system architecture in live practitioner evaluation.']);

        points.slice(0, 3).forEach(pt => {
            const li = document.createElement('li');
            li.textContent = `• ${pt}`;
            evList.appendChild(li);
        });

        evBox.appendChild(evTitle);
        evBox.appendChild(evList);
        proofModalBody.appendChild(evBox);

        // 3. Honest Ramp-Up / Architecture Trade-Offs
        if (item.honestTradeoff || c.rampUpNotes) {
            const notesBox = document.createElement('div');
            notesBox.className = 'proof-section-box';
            const notesTitle = document.createElement('h4');
            notesTitle.textContent = 'Architecture & Ramp-Up Notes';
            const notesContent = document.createElement('div');
            notesContent.className = 'proof-note-card';
            const notesP = document.createElement('p');
            notesP.className = 'proof-note-text';
            notesP.textContent = item.honestTradeoff || c.rampUpNotes;
            notesContent.appendChild(notesP);
            notesBox.appendChild(notesTitle);
            notesBox.appendChild(notesContent);
            proofModalBody.appendChild(notesBox);
        }

        // 4. Ready-to-Send Hiring Manager Note
        const pitchBox = document.createElement('div');
        pitchBox.className = 'proof-section-box';
        const pitchTitle = document.createElement('h4');
        pitchTitle.textContent = 'Ready-to-Send Hiring Manager Brief';

        const pitchCard = document.createElement('div');
        pitchCard.className = 'proof-note-card';
        const pitchText = document.createElement('p');
        pitchText.className = 'proof-note-text';
        pitchText.textContent = item.recruiterPitch;

        const copyPitchBtn = document.createElement('button');
        copyPitchBtn.type = 'button';
        copyPitchBtn.className = 'btn btn-secondary btn-sm';
        copyPitchBtn.textContent = 'Copy Hiring Manager Brief';
        copyPitchBtn.addEventListener('click', () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(item.recruiterPitch);
                copyPitchBtn.textContent = '✓ Brief Copied!';
                setTimeout(() => {
                    copyPitchBtn.textContent = 'Copy Hiring Manager Brief';
                }, 1800);
            }
        });

        pitchCard.appendChild(pitchText);
        pitchCard.appendChild(copyPitchBtn);
        pitchBox.appendChild(pitchTitle);
        pitchBox.appendChild(pitchCard);
        proofModalBody.appendChild(pitchBox);

        // Footer Actions
        const footer = document.createElement('div');
        footer.className = 'proof-modal-footer';

        const isPicked = pickedMap.has(c.id);
        const toggleShortlistBtn = document.createElement('button');
        toggleShortlistBtn.type = 'button';
        toggleShortlistBtn.className = isPicked ? 'btn btn-picked' : 'btn btn-primary';
        toggleShortlistBtn.textContent = isPicked ? '✓ Shortlisted' : '+ Add to Shortlist';

        toggleShortlistBtn.addEventListener('click', () => {
            if (pickedMap.has(c.id)) {
                pickedMap.delete(c.id);
                toggleShortlistBtn.className = 'btn btn-primary';
                toggleShortlistBtn.textContent = '+ Add to Shortlist';
            } else {
                pickedMap.set(c.id, item);
                toggleShortlistBtn.className = 'btn btn-picked';
                toggleShortlistBtn.textContent = '✓ Shortlisted';
            }
            updateShortlistUI();
            // Also refresh card buttons
            renderCarouselView(currentRankedCandidates);
            renderTableView(currentRankedCandidates);
        });

        const reqEmailBtn = document.createElement('a');
        const mailSubject = encodeURIComponent(`[AgenticMastery] Request to Interview ${c.codename} (${c.title})`);
        const mailBody = encodeURIComponent(`Hello Sundar,\n\nI reviewed ${c.codename} (${c.title}, ${item.agenticScore}% Match) on the AgenticMastery Recruiter Portal and would like to request an interview.\n\nSummary:\n${item.recruiterPitch}\n\nBest regards,`);
        reqEmailBtn.href = `mailto:sundarrajan.raman@gmail.com?subject=${mailSubject}&body=${mailBody}`;
        reqEmailBtn.className = 'btn btn-outline';
        reqEmailBtn.textContent = 'Request Direct Interview →';

        footer.appendChild(toggleShortlistBtn);
        footer.appendChild(reqEmailBtn);
        proofModalBody.appendChild(footer);

        proofModal.classList.remove('hidden');
    }

    function closeProofModal() {
        if (proofModal) {
            proofModal.classList.add('hidden');
        }
    }

    // Build Single Executive Carousel Card
    function createCarouselCard(item) {
        const c = item.candidate;
        const card = document.createElement('article');
        card.className = c.isCustom ? 'exec-cand-card is-custom-profile' : 'exec-cand-card';

        // 1. Header (Avatar + Codename + Title + Pedigree)
        const headerTop = document.createElement('div');
        headerTop.className = 'card-header-top';

        const avatar = document.createElement('div');
        avatar.className = 'card-avatar';
        avatar.textContent = c.initials || 'EM';

        const headerText = document.createElement('div');
        headerText.className = 'card-header-text';

        const codename = document.createElement('div');
        codename.className = 'card-codename';
        codename.textContent = c.codename;

        const roleTitle = document.createElement('h3');
        roleTitle.className = 'card-role-title';
        roleTitle.textContent = c.title;

        const pedigreeSub = document.createElement('div');
        pedigreeSub.className = 'card-pedigree-sub';
        pedigreeSub.textContent = `${c.pedigreeBadge} • ${c.experienceYears || 8}+ Yrs • ${c.location || 'Hybrid'}`;

        headerText.appendChild(codename);
        headerText.appendChild(roleTitle);
        headerText.appendChild(pedigreeSub);

        headerTop.appendChild(avatar);
        headerTop.appendChild(headerText);

        // Specialty Badge Row
        const badgeRow = document.createElement('div');
        badgeRow.className = 'badge-row';
        badgeRow.appendChild(createSpecialtyBadge(c));

        // 2. Middle: Executive Match Meter
        const meter = buildMatchMeter(item.agenticScore, item.keywordScore);

        // Crisp Rationale Sentence
        const reason = document.createElement('p');
        reason.className = 'fit-reason-text';
        reason.textContent = item.semanticDeltaExplanation;

        // 3 Neutral Skill Chips
        const skillsRow = document.createElement('div');
        skillsRow.className = 'skill-chips-row';
        const skillsToShow = (c.explicitKeywords || ['Architecture', 'Distributed Systems', 'Cloud Scale']).slice(0, 3);
        skillsToShow.forEach(skill => {
            const chip = document.createElement('span');
            chip.className = 'skill-chip';
            chip.textContent = skill;
            skillsRow.appendChild(chip);
        });

        // 3. Bottom Actions
        const actionsRow = document.createElement('div');
        actionsRow.className = 'card-actions-row';

        const proofBtn = document.createElement('button');
        proofBtn.type = 'button';
        proofBtn.className = 'btn btn-outline btn-sm';
        proofBtn.textContent = 'View Proof & Pitch';
        proofBtn.addEventListener('click', () => openProofModal(item));

        const isPicked = pickedMap.has(c.id);
        const shortlistCardBtn = document.createElement('button');
        shortlistCardBtn.type = 'button';
        shortlistCardBtn.className = isPicked ? 'btn btn-picked btn-sm' : 'btn btn-primary btn-sm';
        shortlistCardBtn.textContent = isPicked ? '✓ Shortlisted' : '+ Shortlist';

        shortlistCardBtn.addEventListener('click', () => {
            if (pickedMap.has(c.id)) {
                pickedMap.delete(c.id);
                shortlistCardBtn.className = 'btn btn-primary btn-sm';
                shortlistCardBtn.textContent = '+ Shortlist';
            } else {
                pickedMap.set(c.id, item);
                shortlistCardBtn.className = 'btn btn-picked btn-sm';
                shortlistCardBtn.textContent = '✓ Shortlisted';
            }
            updateShortlistUI();
            renderTableView(currentRankedCandidates);
        });

        actionsRow.appendChild(proofBtn);
        actionsRow.appendChild(shortlistCardBtn);

        // Assemble Card
        const topSection = document.createElement('div');
        topSection.appendChild(headerTop);
        topSection.appendChild(badgeRow);
        topSection.appendChild(meter);
        topSection.appendChild(reason);
        topSection.appendChild(skillsRow);

        card.appendChild(topSection);
        card.appendChild(actionsRow);

        return card;
    }

    // Render Primary Carousel View
    function renderCarouselView(rankedCandidates) {
        if (!candidateCarousel) return;
        candidateCarousel.replaceChildren();

        rankedCandidates.forEach(item => {
            const card = createCarouselCard(item);
            candidateCarousel.appendChild(card);
        });

        updateCarouselControls();
    }

    // Render Compact Table View
    function renderTableView(rankedCandidates) {
        if (!candidateTableBody) return;
        candidateTableBody.replaceChildren();

        rankedCandidates.forEach(item => {
            const c = item.candidate;
            const tr = document.createElement('tr');

            // Col 1: Candidate
            const tdCand = document.createElement('td');
            const candWrap = document.createElement('div');
            candWrap.className = 'table-candidate-cell';

            const av = document.createElement('div');
            av.className = 'table-avatar';
            av.textContent = c.initials || 'EM';

            const names = document.createElement('div');
            const nameBold = document.createElement('div');
            nameBold.className = 'table-cand-name';
            nameBold.textContent = c.codename;
            const titleMuted = document.createElement('div');
            titleMuted.className = 'table-cand-title';
            titleMuted.textContent = c.title;

            names.appendChild(nameBold);
            names.appendChild(titleMuted);
            candWrap.appendChild(av);
            candWrap.appendChild(names);
            tdCand.appendChild(candWrap);

            // Col 2: Pillar / Specialty
            const tdPillar = document.createElement('td');
            tdPillar.appendChild(createSpecialtyBadge(c));

            // Col 3: Executive Match Meter
            const tdMeter = document.createElement('td');
            tdMeter.className = 'table-meter';
            const scoreLabel = document.createElement('div');
            scoreLabel.style.fontWeight = '700';
            scoreLabel.style.fontSize = '0.86rem';
            scoreLabel.textContent = `${item.agenticScore}% Match (vs ${item.keywordScore}%)`;

            const miniTrack = document.createElement('div');
            miniTrack.className = 'match-bar-track';
            miniTrack.style.margin = '0.3rem 0 0 0';
            const miniFill = document.createElement('div');
            miniFill.className = 'match-bar-fill';
            miniFill.style.width = `${Math.min(100, Math.max(10, item.agenticScore))}%`;
            miniTrack.appendChild(miniFill);

            tdMeter.appendChild(scoreLabel);
            tdMeter.appendChild(miniTrack);

            // Col 4: Experience & Pedigree
            const tdExp = document.createElement('td');
            tdExp.textContent = `${c.experienceYears || 8}+ Yrs • ${c.pedigreeBadge}`;

            // Col 5: Availability
            const tdAvail = document.createElement('td');
            tdAvail.textContent = `${c.availability || 'Immediate'} (${c.location || 'Hybrid'})`;

            // Col 6: Actions
            const tdActions = document.createElement('td');
            tdActions.className = 'table-actions-cell';

            const proofBtn = document.createElement('button');
            proofBtn.type = 'button';
            proofBtn.className = 'btn btn-outline btn-xs';
            proofBtn.textContent = 'Proof & Pitch';
            proofBtn.addEventListener('click', () => openProofModal(item));

            const isPicked = pickedMap.has(c.id);
            const shortlistTableBtn = document.createElement('button');
            shortlistTableBtn.type = 'button';
            shortlistTableBtn.className = isPicked ? 'btn btn-picked btn-xs' : 'btn btn-primary btn-xs';
            shortlistTableBtn.textContent = isPicked ? '✓ Shortlisted' : '+ Shortlist';

            shortlistTableBtn.addEventListener('click', () => {
                if (pickedMap.has(c.id)) {
                    pickedMap.delete(c.id);
                    shortlistTableBtn.className = 'btn btn-primary btn-xs';
                    shortlistTableBtn.textContent = '+ Shortlist';
                } else {
                    pickedMap.set(c.id, item);
                    shortlistTableBtn.className = 'btn btn-picked btn-xs';
                    shortlistTableBtn.textContent = '✓ Shortlisted';
                }
                updateShortlistUI();
                renderCarouselView(currentRankedCandidates);
            });

            tdActions.appendChild(proofBtn);
            tdActions.appendChild(shortlistTableBtn);

            tr.appendChild(tdCand);
            tr.appendChild(tdPillar);
            tr.appendChild(tdMeter);
            tr.appendChild(tdExp);
            tr.appendChild(tdAvail);
            tr.appendChild(tdActions);

            candidateTableBody.appendChild(tr);
        });
    }

    // Carousel Navigation Controls
    function updateCarouselControls() {
        if (!carouselViewport || !candidateCarousel || !carouselIndicator) return;
        const total = candidateCarousel.children.length;
        if (total === 0) {
            carouselIndicator.textContent = 'No matching candidates found';
            if (carouselPrevBtn) carouselPrevBtn.disabled = true;
            if (carouselNextBtn) carouselNextBtn.disabled = true;
            return;
        }

        const scrollLeft = carouselViewport.scrollLeft;
        const maxScroll = carouselViewport.scrollWidth - carouselViewport.clientWidth;

        if (carouselPrevBtn) {
            carouselPrevBtn.disabled = scrollLeft <= 4;
        }
        if (carouselNextBtn) {
            carouselNextBtn.disabled = scrollLeft >= maxScroll - 4;
        }

        // Estimate current visible card index
        const firstCard = candidateCarousel.firstElementChild;
        if (firstCard) {
            const cardWidth = firstCard.getBoundingClientRect().width + 20;
            const currentIndex = Math.min(total, Math.max(1, Math.round(scrollLeft / cardWidth) + 1));
            carouselIndicator.textContent = `Showing candidate ${currentIndex} of ${total}`;
        }
    }

    function scrollCarousel(direction) {
        if (!carouselViewport || !candidateCarousel) return;
        const firstCard = candidateCarousel.firstElementChild;
        const scrollAmount = firstCard ? (firstCard.getBoundingClientRect().width + 20) : 340;
        carouselViewport.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', () => scrollCarousel(-1));
    }
    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', () => scrollCarousel(1));
    }
    if (carouselViewport) {
        carouselViewport.addEventListener('scroll', () => {
            updateCarouselControls();
        }, { passive: true });
    }

    // Switch View Mode (Carousel vs. Table)
    function setViewMode(mode) {
        currentViewMode = mode;
        if (mode === 'carousel') {
            viewModeCarouselBtn.classList.add('active');
            viewModeCarouselBtn.setAttribute('aria-pressed', 'true');
            viewModeTableBtn.classList.remove('active');
            viewModeTableBtn.setAttribute('aria-pressed', 'false');

            carouselViewContainer.classList.remove('hidden');
            tableViewContainer.classList.add('hidden');
            updateCarouselControls();
        } else {
            viewModeTableBtn.classList.add('active');
            viewModeTableBtn.setAttribute('aria-pressed', 'true');
            viewModeCarouselBtn.classList.remove('active');
            viewModeCarouselBtn.setAttribute('aria-pressed', 'false');

            tableViewContainer.classList.remove('hidden');
            carouselViewContainer.classList.add('hidden');
        }
    }

    if (viewModeCarouselBtn) {
        viewModeCarouselBtn.addEventListener('click', () => setViewMode('carousel'));
    }
    if (viewModeTableBtn) {
        viewModeTableBtn.addEventListener('click', () => setViewMode('table'));
    }

    // Switch Search Mode (Preset Bench vs. Custom Resume)
    function setSearchMode(mode) {
        if (mode === 'preset') {
            modeTabPreset.classList.add('active');
            modeTabPreset.setAttribute('aria-selected', 'true');
            modeTabCustom.classList.remove('active');
            modeTabCustom.setAttribute('aria-selected', 'false');

            presetSearchPanel.classList.remove('hidden');
            customResumePanel.classList.add('hidden');
        } else {
            modeTabCustom.classList.add('active');
            modeTabCustom.setAttribute('aria-selected', 'true');
            modeTabPreset.classList.remove('active');
            modeTabPreset.setAttribute('aria-selected', 'false');

            customResumePanel.classList.remove('hidden');
            presetSearchPanel.classList.add('hidden');

            // Sync JD into custom JD textarea if currently empty
            if (customJdInput && !customJdInput.value.trim() && jdInput) {
                customJdInput.value = jdInput.value;
            }
        }
    }

    if (modeTabPreset) {
        modeTabPreset.addEventListener('click', () => setSearchMode('preset'));
    }
    if (modeTabCustom) {
        modeTabCustom.addEventListener('click', () => setSearchMode('custom'));
    }

    // 1-Click Load Sample Resume
    if (loadSampleResumeBtn && customResumeInput) {
        loadSampleResumeBtn.addEventListener('click', () => {
            customResumeInput.value = SAMPLE_RESUME_TEXT;
            if (customCandidateTitle) {
                customCandidateTitle.value = 'Lead Cloud & Distributed Systems Architect (Naukri Profile)';
            }
            if (customJdInput && !customJdInput.value.trim() && jdInput) {
                customJdInput.value = jdInput.value;
            }
            loadSampleResumeBtn.textContent = '✓ Sample Profile Loaded';
            setTimeout(() => {
                loadSampleResumeBtn.textContent = '⚡ Load Sample Naukri / LinkedIn Resume';
            }, 2000);
        });
    }

    // Execute Match Engine
    function executeMatch() {
        if (!window.AgenticMatcher) return;

        const currentJd = (jdInput && jdInput.value.trim().length > 0)
            ? jdInput.value
            : getPresetText('product-fde');

        const result = window.AgenticMatcher.analyzeAndRank(currentJd, activePillar);
        renderAgentStrip(result.jdAnalysis);

        let rankedList = result.rankedCandidates || [];

        // If custom resume was evaluated and matches current pillar filter, prepend it
        if (customEvaluatedCandidate) {
            const matchesFilter = (activePillar === 'all') ||
                (customEvaluatedCandidate.candidate.pillar &&
                 customEvaluatedCandidate.candidate.pillar.toLowerCase().includes(activePillar.toLowerCase()));

            if (matchesFilter) {
                rankedList = [customEvaluatedCandidate, ...rankedList.filter(item => item.candidate.id !== customEvaluatedCandidate.candidate.id)];
            }
        }

        currentRankedCandidates = rankedList;

        if (resultsSummary) {
            resultsSummary.textContent = `${rankedList.length} Candidates Ranked by Agentic Fit`;
        }

        renderCarouselView(rankedList);
        renderTableView(rankedList);

        if (carouselViewport) {
            carouselViewport.scrollLeft = 0;
            updateCarouselControls();
        }
    }

    // Custom Resume Evaluator
    function executeCustomResumeMatch() {
        if (!window.AgenticMatcher) return;

        const jdText = (customJdInput && customJdInput.value.trim().length > 0)
            ? customJdInput.value
            : (jdInput ? jdInput.value : getPresetText('product-fde'));

        const resumeText = customResumeInput ? customResumeInput.value.trim() : '';

        if (!resumeText) {
            if (customResumeInput) {
                customResumeInput.focus();
                customResumeInput.setAttribute('placeholder', '⚠️ Please paste resume text or click "⚡ Load Sample Naukri / LinkedIn Resume" first...');
            }
            return;
        }

        const candidateTitle = (customCandidateTitle && customCandidateTitle.value.trim().length > 0)
            ? customCandidateTitle.value.trim()
            : 'Lead Cloud & AI Engineer (LinkedIn Profile)';

        const evaluated = window.AgenticMatcher.evaluateCustomResume(jdText, resumeText, candidateTitle);
        evaluated.candidate.isCustom = true;
        customEvaluatedCandidate = evaluated;

        // Switch to Carousel View and re-run match to place candidate at index 0
        setViewMode('carousel');
        executeMatch();

        // Scroll carousel to start
        if (carouselViewport) {
            carouselViewport.scrollLeft = 0;
        }
    }

    if (runCustomMatchBtn) {
        runCustomMatchBtn.addEventListener('click', executeCustomResumeMatch);
    }

    // Preset Chips Handlers
    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            presetChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const presetId = chip.getAttribute('data-preset');
            const presetText = getPresetText(presetId);
            if (jdInput) jdInput.value = presetText;
            if (customJdInput) customJdInput.value = presetText;
            executeMatch();
        });
    });

    // Pillar Filter Tabs Handlers
    pillarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pillarTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activePillar = tab.getAttribute('data-pillar') || 'all';
            executeMatch();
        });
    });

    if (runMatchBtn) {
        runMatchBtn.addEventListener('click', executeMatch);
    }

    // Modal Events
    if (closeProofModalBtn) {
        closeProofModalBtn.addEventListener('click', closeProofModal);
    }
    if (proofModal) {
        proofModal.addEventListener('click', (e) => {
            if (e.target === proofModal) closeProofModal();
        });
    }

    if (shortlistBtn && shortlistModal) {
        shortlistBtn.addEventListener('click', () => {
            updateShortlistUI();
            shortlistModal.classList.remove('hidden');
        });
    }
    if (closeModalBtn && shortlistModal) {
        closeModalBtn.addEventListener('click', () => shortlistModal.classList.add('hidden'));
    }
    if (shortlistModal) {
        shortlistModal.addEventListener('click', (e) => {
            if (e.target === shortlistModal) shortlistModal.classList.add('hidden');
        });
    }

    // Keyboard ESC listener for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProofModal();
            if (shortlistModal) shortlistModal.classList.add('hidden');
        }
    });

    if (copyBriefBtn && shortlistText) {
        copyBriefBtn.addEventListener('click', () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shortlistText.textContent);
                copyBriefBtn.textContent = '✓ Brief Copied!';
                setTimeout(() => {
                    copyBriefBtn.textContent = 'Copy Hiring Manager Brief';
                }, 1800);
            }
        });
    }

    // Initial Load
    if (jdInput) {
        jdInput.value = getPresetText('product-fde');
        if (customJdInput) customJdInput.value = jdInput.value;
        executeMatch();
    }
});
