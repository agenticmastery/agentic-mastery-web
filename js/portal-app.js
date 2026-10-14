document.addEventListener('DOMContentLoaded', () => {
    const jdInput = document.getElementById('jd-input');
    const runMatchBtn = document.getElementById('run-match-btn');
    const presetChips = document.querySelectorAll('.chip');
    const pillarTabs = document.querySelectorAll('.p-tab');
    const agentStrip = document.getElementById('agent-strip');
    const candidateList = document.getElementById('candidate-list');
    const resultsSummary = document.getElementById('results-summary');

    const shortlistBtn = document.getElementById('shortlist-btn');
    const shortlistCount = document.getElementById('shortlist-count');
    const shortlistModal = document.getElementById('shortlist-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const shortlistText = document.getElementById('shortlist-text');
    const copyBriefBtn = document.getElementById('copy-brief-btn');
    const requestIntroLink = document.getElementById('request-intro-link');

    let activePillar = 'all';
    const pickedMap = new Map();

    function getPresetText(id) {
        if (!window.PRESET_JDS) return '';
        if (Array.isArray(window.PRESET_JDS)) {
            const found = window.PRESET_JDS.find(p => p.id === id);
            return found ? (found.jdText || found.text || '') : '';
        }
        return '';
    }

    function renderAgentStrip(jdAnalysis) {
        if (!agentStrip || !jdAnalysis) return;
        agentStrip.replaceChildren();

        const items = [
            { label: 'Detected Track', val: jdAnalysis.detectedPillar || 'AI & Cloud' },
            { label: 'Environment Bar', val: jdAnalysis.detectedDNA || 'Product & GCC' },
            { label: 'Matched Architecture Concepts', val: (jdAnalysis.coreConceptsRequired || []).slice(0, 3).join(' • ') || 'Multi-Agent & Cloud Scale' }
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

    function updateShortlistUI() {
        if (shortlistCount) shortlistCount.textContent = String(pickedMap.size);
        if (!shortlistText) return;

        if (pickedMap.size === 0) {
            shortlistText.textContent = 'No candidates picked yet. Click "+ Pick" on any candidate row to build your shortlist.';
            return;
        }

        const lines = ['AgenticMastery.ai — Pre-Checked Candidate Shortlist\n'];
        pickedMap.forEach(item => {
            lines.push(`• ${item.candidate.codename}: ${item.candidate.title} (${item.agenticScore}% Agentic Match)`);
            lines.push(`  Pedigree: ${item.candidate.pedigreeBadge} | Availability: ${item.candidate.availability}`);
            lines.push(`  Summary: ${item.recruiterPitch}\n`);
        });
        const fullText = lines.join('\n');
        shortlistText.textContent = fullText;

        if (requestIntroLink) {
            const subject = encodeURIComponent(`[AgenticMastery Shortlist] Requesting Interviews (${pickedMap.size} Candidates)`);
            const body = encodeURIComponent(fullText);
            requestIntroLink.href = `mailto:sundarrajan.raman@gmail.com?subject=${subject}&body=${body}`;
        }
    }

    function renderCandidates(rankedCandidates) {
        if (!candidateList) return;
        candidateList.replaceChildren();

        if (resultsSummary) {
            resultsSummary.textContent = `${rankedCandidates.length} Pre-Checked Candidates Ranked by Agentic Fit`;
        }

        rankedCandidates.forEach(item => {
            const c = item.candidate;
            const card = document.createElement('article');
            card.className = 'cand-card';

            const row = document.createElement('div');
            row.className = 'cand-row';

            // Left info
            const main = document.createElement('div');
            main.className = 'cand-main';

            const topLine = document.createElement('div');
            topLine.className = 'cand-top-line';

            const title = document.createElement('span');
            title.className = 'cand-title';
            title.textContent = `${c.codename} — ${c.title}`;

            const pill = document.createElement('span');
            pill.className = 'pedigree-pill';
            pill.textContent = c.pedigreeBadge;

            topLine.appendChild(title);
            topLine.appendChild(pill);

            const meta = document.createElement('div');
            meta.className = 'cand-meta';
            meta.textContent = `${c.experienceYears}+ Yrs Exp • ${c.availability} • ${c.location}`;

            const reason = document.createElement('p');
            reason.className = 'cand-reason';
            reason.textContent = `✓ Why Agentic Match Won: ${item.semanticDeltaExplanation}`;

            main.appendChild(topLine);
            main.appendChild(meta);
            main.appendChild(reason);

            // Right scores & buttons
            const right = document.createElement('div');
            right.className = 'cand-right';

            const scoreBox = document.createElement('div');
            scoreBox.className = 'score-box';

            const agScore = document.createElement('span');
            agScore.className = 'agentic-score';
            agScore.textContent = `${item.agenticScore}% Agentic Fit`;

            const kwScore = document.createElement('span');
            kwScore.className = 'kw-score';
            kwScore.textContent = `vs. ${item.keywordScore}% Keyword Search`;

            scoreBox.appendChild(agScore);
            scoreBox.appendChild(kwScore);

            const actions = document.createElement('div');
            actions.className = 'row-actions';

            const detailsBtn = document.createElement('button');
            detailsBtn.type = 'button';
            detailsBtn.className = 'btn btn-outline btn-sm';
            detailsBtn.textContent = 'Details ▾';

            const pickBtn = document.createElement('button');
            pickBtn.type = 'button';
            const isPicked = pickedMap.has(c.id);
            pickBtn.className = isPicked ? 'btn btn-picked btn-sm' : 'btn btn-primary btn-sm';
            pickBtn.textContent = isPicked ? '✓ Picked' : '+ Pick';

            actions.appendChild(detailsBtn);
            actions.appendChild(pickBtn);

            right.appendChild(scoreBox);
            right.appendChild(actions);

            row.appendChild(main);
            row.appendChild(right);

            // Expandable Drawer (Hidden by default to keep screen ultra-clean!)
            const drawer = document.createElement('div');
            drawer.className = 'cand-drawer hidden';

            const evidenceBox = document.createElement('div');
            evidenceBox.className = 'drawer-box';
            const evHead = document.createElement('h4');
            evHead.textContent = 'Verified Production Evidence';
            const evList = document.createElement('ul');
            evList.className = 'drawer-list';
            (item.matchedEvidence || c.verifiedHighlights || []).slice(0, 3).forEach(point => {
                const li = document.createElement('li');
                li.textContent = `• ${point}`;
                evList.appendChild(li);
            });
            evidenceBox.appendChild(evHead);
            evidenceBox.appendChild(evList);

            const pitchBox = document.createElement('div');
            pitchBox.className = 'pitch-box';
            const pitchWrap = document.createElement('div');
            const pHead = document.createElement('h4');
            pHead.textContent = 'Ready-to-Send Hiring Manager Note';
            const pText = document.createElement('p');
            pText.textContent = item.recruiterPitch;
            pitchWrap.appendChild(pHead);
            pitchWrap.appendChild(pText);

            const copyPitchBtn = document.createElement('button');
            copyPitchBtn.type = 'button';
            copyPitchBtn.className = 'btn btn-secondary btn-sm';
            copyPitchBtn.textContent = 'Copy Note for Hiring Manager';
            copyPitchBtn.addEventListener('click', () => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(item.recruiterPitch);
                    copyPitchBtn.textContent = '✓ Copied!';
                    setTimeout(() => { copyPitchBtn.textContent = 'Copy Note for Hiring Manager'; }, 1800);
                }
            });

            pitchBox.appendChild(pitchWrap);
            pitchBox.appendChild(copyPitchBtn);

            drawer.appendChild(evidenceBox);
            drawer.appendChild(pitchBox);

            detailsBtn.addEventListener('click', () => {
                const isHidden = drawer.classList.toggle('hidden');
                detailsBtn.textContent = isHidden ? 'Details ▾' : 'Hide ▴';
            });

            pickBtn.addEventListener('click', () => {
                if (pickedMap.has(c.id)) {
                    pickedMap.delete(c.id);
                    pickBtn.className = 'btn btn-primary btn-sm';
                    pickBtn.textContent = '+ Pick';
                } else {
                    pickedMap.set(c.id, item);
                    pickBtn.className = 'btn btn-picked btn-sm';
                    pickBtn.textContent = '✓ Picked';
                }
                updateShortlistUI();
            });

            card.appendChild(row);
            card.appendChild(drawer);
            candidateList.appendChild(card);
        });
    }

    function executeMatch() {
        if (!window.AgenticMatcher || !jdInput) return;
        const result = window.AgenticMatcher.analyzeAndRank(jdInput.value, activePillar);
        renderAgentStrip(result.jdAnalysis);
        renderCandidates(result.rankedCandidates || []);
    }

    // Initialize with first preset
    if (jdInput) {
        jdInput.value = getPresetText('product-fde');
        executeMatch();
    }

    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            presetChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const presetId = chip.getAttribute('data-preset');
            if (jdInput) jdInput.value = getPresetText(presetId);
            executeMatch();
        });
    });

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

    if (shortlistBtn && shortlistModal) {
        shortlistBtn.addEventListener('click', () => {
            updateShortlistUI();
            shortlistModal.classList.remove('hidden');
        });
    }

    if (closeModalBtn && shortlistModal) {
        closeModalBtn.addEventListener('click', () => shortlistModal.classList.add('hidden'));
    }

    if (copyBriefBtn && shortlistText) {
        copyBriefBtn.addEventListener('click', () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shortlistText.textContent);
                copyBriefBtn.textContent = '✓ Brief Copied!';
                setTimeout(() => { copyBriefBtn.textContent = 'Copy Hiring Manager Brief'; }, 1800);
            }
        });
    }
});
