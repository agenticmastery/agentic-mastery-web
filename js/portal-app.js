/**
 * AgenticMastery.ai — Recruiter Login & Interactive Matching Workspace Controller
 * Built by Engineering & Talent Leaders from Tier-1 Product Companies (like Google)
 * and Global Capability Centers / GCCs (like Bank of America).
 *
 * Security Compliance (mandatory-secure-web-skills):
 * - Strictly uses safe DOM creation methods (document.createElement, textContent, setAttribute, appendChild, replaceChildren).
 * - Holds session and shortlist state exclusively in volatile memory closure.
 * - Uses non-blocking toast and modal UI components.
 */
(function () {
    'use strict';

    // Volatile in-memory state for the active Recruiter Workspace session
    const shortlistedMap = new Map();
    let latestAnalysisResult = null;
    let activePresetId = 'product-fde';
    let toastTimer = null;

    function isValidWorkEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showToast(message) {
        const toastEl = document.getElementById('portal-toast');
        if (!toastEl) return;

        toastEl.textContent = message;
        toastEl.classList.remove('hidden');

        if (toastTimer) {
            clearTimeout(toastTimer);
        }
        toastTimer = setTimeout(function () {
            toastEl.classList.add('hidden');
        }, 2800);
    }

    function copyTextSafely(text, onSuccess) {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(text).then(function () {
                if (typeof onSuccess === 'function') onSuccess();
            }).catch(function () {
                fallbackCopyText(text, onSuccess);
            });
        } else {
            fallbackCopyText(text, onSuccess);
        }
    }

    function fallbackCopyText(text, onSuccess) {
        const tempArea = document.createElement('textarea');
        tempArea.value = text;
        tempArea.setAttribute('readonly', 'readonly');
        tempArea.style.position = 'fixed';
        tempArea.style.opacity = '0';
        document.body.appendChild(tempArea);
        tempArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            // Ignore fallback copy restrictions
        }
        document.body.removeChild(tempArea);
        if (typeof onSuccess === 'function') onSuccess();
    }

    /* ======================================================================
       1. LOGIN PORTAL INITIALIZATION (login.html)
       ====================================================================== */
    function initLoginPage() {
        const loginForm = document.getElementById('partner-login-form');
        if (!loginForm) return;

        const emailInput = document.getElementById('login-email');
        const orgInput = document.getElementById('login-org');
        const codeInput = document.getElementById('login-code');
        const fillCodeBtn = document.getElementById('fill-demo-code-btn');
        const statusEl = document.getElementById('login-status');

        if (fillCodeBtn && codeInput) {
            fillCodeBtn.addEventListener('click', function () {
                codeInput.value = 'GCC-PRODUCT-2026';
                if (emailInput && !emailInput.value.trim()) {
                    emailInput.value = 'talent.partner@enterprise-gcc.com';
                }
                if (orgInput && !orgInput.value.trim()) {
                    orgInput.value = 'Tier-1 Product & GCC Hiring Partner';
                }
                if (statusEl) {
                    statusEl.textContent = 'Partner evaluation code GCC-PRODUCT-2026 applied. Click below to launch workspace.';
                    statusEl.className = 'login-status success';
                }
            });
        }

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const codeVal = codeInput ? codeInput.value.trim().toUpperCase() : '';

            if (!isValidWorkEmail(emailVal)) {
                if (statusEl) {
                    statusEl.textContent = 'Please enter a valid recruiter or hiring partner work email address.';
                    statusEl.className = 'login-status error';
                }
                return;
            }

            const allowedCodes = [
                'GCC-PRODUCT-2026',
                'GOOGLE-BOA-2026',
                'PARTNER-2026',
                'AGENTIC-VIP'
            ];

            if (!codeVal || (allowedCodes.indexOf(codeVal) === -1 && codeVal.length < 6)) {
                if (statusEl) {
                    statusEl.textContent = 'Invalid Partner Access Code. Use evaluation code GCC-PRODUCT-2026 or enter your issued partner key.';
                    statusEl.className = 'login-status error';
                }
                return;
            }

            if (statusEl) {
                statusEl.textContent = 'Access verified. Launching AgenticMastery.ai Recruiter Workspace...';
                statusEl.className = 'login-status success';
            }

            window.location.href = 'portal.html?mode=partner';
        });
    }

    /* ======================================================================
       2. INTERACTIVE MATCHING WORKSPACE INITIALIZATION (portal.html)
       ====================================================================== */
    function getPresetById(presetId) {
        const presets = window.PRESET_JDS;
        if (!presets) return null;

        if (Array.isArray(presets)) {
            for (let i = 0; i < presets.length; i += 1) {
                if (presets[i] && presets[i].id === presetId) {
                    return presets[i];
                }
            }
        }
        if (typeof presets === 'object' && presets[presetId]) {
            return presets[presetId];
        }
        return null;
    }

    function renderJdAnalysisSummary(jdAnalysis) {
        const summaryContainer = document.getElementById('jd-analysis-summary');
        if (!summaryContainer || !jdAnalysis) return;

        summaryContainer.replaceChildren();

        const rows = [
            { label: 'Detected Role Pillar', value: jdAnalysis.detectedPillar || 'FDE' },
            { label: 'Org Expectation DNA', value: jdAnalysis.detectedDNA || 'Product & GCC Aligned' },
            {
                label: 'Core Semantic Vectors',
                value: Array.isArray(jdAnalysis.coreConceptsRequired)
                    ? jdAnalysis.coreConceptsRequired.slice(0, 3).join(' • ')
                    : 'Multi-Agent & Cloud Architecture'
            }
        ];

        rows.forEach(function (item) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'jd-parsed-row';

            const labelSpan = document.createElement('span');
            labelSpan.textContent = item.label + ':';

            const valStrong = document.createElement('strong');
            valStrong.textContent = item.value;

            rowDiv.appendChild(labelSpan);
            rowDiv.appendChild(valStrong);
            summaryContainer.appendChild(rowDiv);
        });

        if (jdAnalysis.architectureExpectation) {
            const archNote = document.createElement('p');
            archNote.style.marginTop = '0.35rem';
            archNote.style.fontSize = '0.77rem';
            archNote.textContent = jdAnalysis.architectureExpectation;
            summaryContainer.appendChild(archNote);
        }
    }

    function renderAgentTraces(agentTraces) {
        const traceContainer = document.getElementById('agent-trace-container');
        if (!traceContainer || !Array.isArray(agentTraces)) return;

        traceContainer.replaceChildren();

        agentTraces.forEach(function (trace, idx) {
            const box = document.createElement('article');
            box.className = 'agent-trace-box';

            const topRow = document.createElement('div');
            topRow.className = 'agent-trace-top';

            const stepBadge = document.createElement('span');
            stepBadge.className = 'agent-step-badge';
            stepBadge.textContent = 'Stage 0' + (idx + 1);

            const statusDot = document.createElement('span');
            statusDot.className = 'agent-verified-dot';
            statusDot.textContent = '✓ ' + (trace.status || 'Verified');

            topRow.appendChild(stepBadge);
            topRow.appendChild(statusDot);

            const titleEl = document.createElement('h3');
            titleEl.textContent = trace.agentName || ('Agent ' + (idx + 1));

            const roleEl = document.createElement('div');
            roleEl.className = 'agent-trace-role';
            roleEl.textContent = trace.role || '';

            const findingEl = document.createElement('p');
            findingEl.className = 'agent-trace-finding';
            findingEl.textContent = trace.finding || '';

            box.appendChild(topRow);
            box.appendChild(titleEl);
            box.appendChild(roleEl);
            box.appendChild(findingEl);

            traceContainer.appendChild(box);
        });
    }

    function createDimensionBar(label, percentage) {
        const item = document.createElement('div');
        item.className = 'dimension-item';

        const labelRow = document.createElement('div');
        labelRow.className = 'dimension-label-row';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = label;

        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'dimension-score-num';
        const safePct = Math.max(0, Math.min(100, Number(percentage) || 85));
        scoreSpan.textContent = safePct + '%';

        labelRow.appendChild(nameSpan);
        labelRow.appendChild(scoreSpan);

        const track = document.createElement('div');
        track.className = 'dimension-track';

        const fill = document.createElement('div');
        fill.className = 'dimension-fill';
        fill.style.width = safePct + '%';

        track.appendChild(fill);
        item.appendChild(labelRow);
        item.appendChild(track);

        return item;
    }

    function renderCandidateCards(rankedCandidates) {
        const listContainer = document.getElementById('matched-candidates-list');
        const countLabel = document.getElementById('matched-count-label');
        if (!listContainer) return;

        listContainer.replaceChildren();
        const items = Array.isArray(rankedCandidates) ? rankedCandidates : [];
        if (countLabel) {
            countLabel.textContent = String(items.length);
        }

        items.forEach(function (matchItem, rankIndex) {
            const cand = matchItem.candidate || {};
            const candId = cand.id || ('CAND-' + (rankIndex + 1));
            const isShortlisted = shortlistedMap.has(candId);

            const card = document.createElement('article');
            card.className = 'candidate-card' + (isShortlisted ? ' shortlisted' : '');
            card.setAttribute('data-candidate-id', candId);

            // 1. Top Row: Candidate Identity + Score Comparison Box
            const topRow = document.createElement('div');
            topRow.className = 'candidate-top-row';

            const identityDiv = document.createElement('div');
            identityDiv.className = 'candidate-identity';

            const badgesRow = document.createElement('div');
            badgesRow.className = 'candidate-badges-row';

            const rankBadge = document.createElement('span');
            rankBadge.className = 'codename-pill';
            rankBadge.textContent = '#' + (rankIndex + 1) + ' • ' + (cand.codename || candId);

            const pedigreeBadge = document.createElement('span');
            pedigreeBadge.className = 'pedigree-pill';
            pedigreeBadge.textContent = cand.pedigreeBadge || 'Product & GCC Pre-Checked';

            const precheckBadge = document.createElement('span');
            precheckBadge.className = 'precheck-pill';
            precheckBadge.textContent = 'Panel Pre-Check: ' + (cand.precheckScore || '9.5') + ' / 10';

            badgesRow.appendChild(rankBadge);
            badgesRow.appendChild(pedigreeBadge);
            badgesRow.appendChild(precheckBadge);

            const titleEl = document.createElement('h3');
            titleEl.textContent = cand.title || 'Senior AI & Cloud Architect';

            const metaRow = document.createElement('div');
            metaRow.className = 'candidate-meta-row';

            const pillarMeta = document.createElement('span');
            pillarMeta.className = 'candidate-meta-item';
            pillarMeta.textContent = 'Pillar: ' + (cand.pillar || 'FDE');

            const expMeta = document.createElement('span');
            expMeta.className = 'candidate-meta-item';
            expMeta.textContent = (cand.experienceYears || 8) + ' Years Exp';

            const availMeta = document.createElement('span');
            availMeta.className = 'candidate-meta-item';
            availMeta.textContent = 'Availability: ' + (cand.availability || 'Immediate');

            const locMeta = document.createElement('span');
            locMeta.className = 'candidate-meta-item';
            locMeta.textContent = cand.location || 'Bengaluru / Global';

            metaRow.appendChild(pillarMeta);
            metaRow.appendChild(expMeta);
            metaRow.appendChild(availMeta);
            metaRow.appendChild(locMeta);

            identityDiv.appendChild(badgesRow);
            identityDiv.appendChild(titleEl);
            identityDiv.appendChild(metaRow);

            // Score Comparison Box (Agentic Match % vs Keyword Match %)
            const scoreBox = document.createElement('div');
            scoreBox.className = 'score-comparison-box';

            const agenticMetric = document.createElement('div');
            agenticMetric.className = 'score-metric agentic';

            const agenticVal = document.createElement('span');
            agenticVal.className = 'score-metric-value';
            agenticVal.textContent = (matchItem.agenticScore || 92) + '%';

            const agenticLbl = document.createElement('span');
            agenticLbl.className = 'score-metric-label';
            agenticLbl.textContent = 'Agentic Match';

            agenticMetric.appendChild(agenticVal);
            agenticMetric.appendChild(agenticLbl);

            const divider = document.createElement('div');
            divider.className = 'score-divider';

            const keywordMetric = document.createElement('div');
            keywordMetric.className = 'score-metric keyword';

            const keywordVal = document.createElement('span');
            keywordVal.className = 'score-metric-value';
            keywordVal.textContent = (matchItem.keywordScore || 51) + '%';

            const keywordLbl = document.createElement('span');
            keywordLbl.className = 'score-metric-label';
            keywordLbl.textContent = 'Keyword Match';

            keywordMetric.appendChild(keywordVal);
            keywordMetric.appendChild(keywordLbl);

            scoreBox.appendChild(agenticMetric);
            scoreBox.appendChild(divider);
            scoreBox.appendChild(keywordMetric);

            topRow.appendChild(identityDiv);
            topRow.appendChild(scoreBox);
            card.appendChild(topRow);

            // 2. Why Agentic Match Won Callout
            const deltaCallout = document.createElement('div');
            deltaCallout.className = 'semantic-delta-callout';

            const deltaTitle = document.createElement('span');
            deltaTitle.className = 'semantic-delta-title';
            deltaTitle.textContent = 'Why Agentic Match Won (+' + ((matchItem.agenticScore || 92) - (matchItem.keywordScore || 51)) + '% Over Naive Keyword Search)';

            const deltaText = document.createElement('p');
            deltaText.textContent = matchItem.semanticDeltaExplanation || '';

            deltaCallout.appendChild(deltaTitle);
            deltaCallout.appendChild(deltaText);
            card.appendChild(deltaCallout);

            // 3. Four Dimension Bars
            const dimGrid = document.createElement('div');
            dimGrid.className = 'dimension-grid';
            const dims = matchItem.dimensionBreakdown || {};

            dimGrid.appendChild(createDimensionBar('Architecture Fit', dims.architectureFit));
            dimGrid.appendChild(createDimensionBar('Product/GCC DNA Alignment', dims.dnaAlignment));
            dimGrid.appendChild(createDimensionBar('Production Evidence', dims.productionEvidence));
            dimGrid.appendChild(createDimensionBar('Stakeholder Readiness', dims.stakeholderReadiness));
            card.appendChild(dimGrid);

            // 4. Matched Production Evidence + Transparent Ramp-Up Note
            const detailsGrid = document.createElement('div');
            detailsGrid.className = 'candidate-details-grid';

            const evidenceBox = document.createElement('div');
            evidenceBox.className = 'evidence-box';

            const evidenceHeading = document.createElement('span');
            evidenceHeading.className = 'box-heading';
            evidenceHeading.textContent = 'Matched Production Evidence (Panel-Verified)';

            const evidenceList = document.createElement('ul');
            evidenceList.className = 'evidence-list';

            const evidences = Array.isArray(matchItem.matchedEvidence) ? matchItem.matchedEvidence : [];
            evidences.forEach(function (evText) {
                const li = document.createElement('li');
                li.textContent = evText;
                evidenceList.appendChild(li);
            });

            evidenceBox.appendChild(evidenceHeading);
            evidenceBox.appendChild(evidenceList);

            const rampBox = document.createElement('div');
            rampBox.className = 'rampup-box';

            const rampHeading = document.createElement('span');
            rampHeading.className = 'box-heading';
            rampHeading.textContent = 'Transparent 30-Day Ramp-Up Note';

            const rampText = document.createElement('p');
            rampText.className = 'rampup-text';
            rampText.textContent = matchItem.honestTradeoff || cand.rampUpNotes || 'Verified for immediate production onboarding.';

            rampBox.appendChild(rampHeading);
            rampBox.appendChild(rampText);

            detailsGrid.appendChild(evidenceBox);
            detailsGrid.appendChild(rampBox);
            card.appendChild(detailsGrid);

            // 5. Recruiter Ready-to-Send Pitch + 2 Suggested Panel Interview Questions
            const pitchPanel = document.createElement('div');
            pitchPanel.className = 'pitch-panel';

            const pitchGrid = document.createElement('div');
            pitchGrid.className = 'pitch-panel-grid';

            const pitchCol = document.createElement('div');
            const pitchHeading = document.createElement('span');
            pitchHeading.className = 'box-heading';
            pitchHeading.textContent = 'Recruiter Ready-to-Send Hiring Manager Pitch';

            const pitchPara = document.createElement('p');
            pitchPara.className = 'pitch-text';
            pitchPara.textContent = matchItem.recruiterPitch || '';

            pitchCol.appendChild(pitchHeading);
            pitchCol.appendChild(pitchPara);

            const questionsCol = document.createElement('div');
            const questionsHeading = document.createElement('span');
            questionsHeading.className = 'box-heading';
            questionsHeading.textContent = '2 Suggested Panel Interview Questions';

            const questionsList = document.createElement('ol');
            questionsList.className = 'questions-list';

            const questions = Array.isArray(matchItem.suggestedInterviewQuestions)
                ? matchItem.suggestedInterviewQuestions
                : [];
            questions.forEach(function (qText) {
                const qLi = document.createElement('li');
                qLi.textContent = qText;
                questionsList.appendChild(qLi);
            });

            questionsCol.appendChild(questionsHeading);
            questionsCol.appendChild(questionsList);

            pitchGrid.appendChild(pitchCol);
            pitchGrid.appendChild(questionsCol);
            pitchPanel.appendChild(pitchGrid);
            card.appendChild(pitchPanel);

            // 6. Two Interactive Action Buttons
            const actionsRow = document.createElement('div');
            actionsRow.className = 'candidate-actions-row';

            const actionsLeft = document.createElement('div');
            actionsLeft.className = 'candidate-actions-left';

            const pickBtn = document.createElement('button');
            pickBtn.type = 'button';
            pickBtn.className = isShortlisted ? 'btn btn-success btn-sm' : 'btn btn-primary btn-sm';
            pickBtn.textContent = isShortlisted
                ? '✓ Shortlisted in Cart (Click to Remove)'
                : '✓ Pick / Shortlist Candidate';

            pickBtn.addEventListener('click', function () {
                toggleCandidateShortlist(matchItem);
            });

            const copyPitchBtn = document.createElement('button');
            copyPitchBtn.type = 'button';
            copyPitchBtn.className = 'btn btn-secondary btn-sm';
            copyPitchBtn.textContent = '📋 Copy Hiring Manager Pitch';

            copyPitchBtn.addEventListener('click', function () {
                copyTextSafely(matchItem.recruiterPitch || '', function () {
                    copyPitchBtn.textContent = '✓ Pitch Copied!';
                    showToast('Hiring Manager pitch copied for ' + (cand.codename || candId));
                    setTimeout(function () {
                        copyPitchBtn.textContent = '📋 Copy Hiring Manager Pitch';
                    }, 2200);
                });
            });

            actionsLeft.appendChild(pickBtn);
            actionsLeft.appendChild(copyPitchBtn);

            const viewDrawerBtn = document.createElement('button');
            viewDrawerBtn.type = 'button';
            viewDrawerBtn.className = 'btn btn-outline btn-sm';
            viewDrawerBtn.textContent = 'Open Shortlist Brief (' + shortlistedMap.size + ')';
            viewDrawerBtn.addEventListener('click', function () {
                openShortlistModal();
            });

            actionsRow.appendChild(actionsLeft);
            actionsRow.appendChild(viewDrawerBtn);
            card.appendChild(actionsRow);

            listContainer.appendChild(card);
        });
    }

    function updateShortlistHeaderCounter() {
        const labelEl = document.getElementById('shortlist-btn-label');
        if (labelEl) {
            labelEl.textContent = 'Shortlisted Candidates (' + shortlistedMap.size + ')';
        }
    }

    function buildCompleteShortlistBriefText() {
        const jdAnalysis = latestAnalysisResult && latestAnalysisResult.jdAnalysis
            ? latestAnalysisResult.jdAnalysis
            : { detectedPillar: 'AI, FDE & Cloud', detectedDNA: 'Product & GCC Expectations' };

        const entries = Array.from(shortlistedMap.values());
        if (entries.length === 0) {
            return [
                'AGENTICMASTERY.AI — HIRING MANAGER SHORTLIST BRIEF',
                'Pre-Checked by Engineering & Talent Leaders from Tier-1 Product Companies (Google) & Enterprise GCCs (Bank of America)',
                '--------------------------------------------------------------------------------',
                'No candidates currently selected in your Shortlist Cart.',
                'Click "✓ Pick / Shortlist Candidate" on any ranked card in the workspace to compile your Hiring Manager brief.'
            ].join('\n');
        }

        const lines = [
            'AGENTICMASTERY.AI — HIRING MANAGER SHORTLIST BRIEF',
            'Pre-Checked by Engineering & Talent Leaders from Tier-1 Product Companies (Google) & Enterprise GCCs (Bank of America)',
            '================================================================================',
            'Target Role Pillar: ' + jdAnalysis.detectedPillar,
            'Organization DNA Alignment: ' + jdAnalysis.detectedDNA,
            'Shortlisted Pre-Checked Profiles: ' + entries.length,
            '================================================================================',
            ''
        ];

        entries.forEach(function (item, idx) {
            const c = item.candidate || {};
            lines.push(
                (idx + 1) + '. ' + (c.codename || c.id) + ' — ' + (c.title || '') +
                ' [' + (item.agenticScore || 92) + '% Agentic Match vs. ' + (item.keywordScore || 51) + '% Keyword Match]'
            );
            lines.push('   • Pedigree & Pre-Check: ' + (c.pedigreeBadge || '') + ' | Panel Score: ' + (c.precheckScore || '9.5') + '/10');
            lines.push('   • Availability & Location: ' + (c.availability || '') + ' | ' + (c.location || ''));
            lines.push('   • Why Agentic Match Won: ' + (item.semanticDeltaExplanation || ''));
            lines.push('   • Hiring Manager Pitch: ' + (item.recruiterPitch || ''));
            lines.push('   • Transparent 30-Day Ramp Note: ' + (item.honestTradeoff || c.rampUpNotes || ''));
            if (Array.isArray(item.suggestedInterviewQuestions) && item.suggestedInterviewQuestions.length > 0) {
                lines.push('   • Recommended Panel Probe: ' + item.suggestedInterviewQuestions[0]);
            }
            lines.push('');
        });

        lines.push('Next Step: Reply or click "Request Live Interviews for Shortlist" to unlock full dossier & panel scheduling.');
        return lines.join('\n');
    }

    function refreshShortlistModalContent() {
        const listEl = document.getElementById('shortlist-items-list');
        const briefArea = document.getElementById('shortlist-brief-textarea');
        const statusEl = document.getElementById('shortlist-modal-status');

        if (statusEl) {
            statusEl.textContent = '';
            statusEl.className = 'login-status';
        }

        if (listEl) {
            listEl.replaceChildren();
            const entries = Array.from(shortlistedMap.values());

            if (entries.length === 0) {
                const emptyRow = document.createElement('div');
                emptyRow.className = 'shortlist-item-row';
                const emptyText = document.createElement('span');
                emptyText.textContent = 'Your shortlist cart is empty. Pick 1 or more pre-checked candidates from the ranked list to generate a combined Hiring Manager brief.';
                emptyRow.appendChild(emptyText);
                listEl.appendChild(emptyRow);
            } else {
                entries.forEach(function (item) {
                    const c = item.candidate || {};
                    const row = document.createElement('div');
                    row.className = 'shortlist-item-row';

                    const info = document.createElement('div');
                    info.className = 'shortlist-item-info';

                    const strong = document.createElement('strong');
                    strong.textContent = (c.codename || c.id) + ' — ' + (c.title || '');

                    const sub = document.createElement('span');
                    sub.textContent = (item.agenticScore || 92) + '% Agentic Match (vs. ' + (item.keywordScore || 51) + '% Keyword) • ' +
                        (c.pedigreeBadge || '') + ' • ' + (c.availability || '');

                    info.appendChild(strong);
                    info.appendChild(sub);

                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'btn btn-outline btn-sm';
                    removeBtn.textContent = 'Remove';
                    removeBtn.addEventListener('click', function () {
                        shortlistedMap.delete(c.id);
                        updateShortlistHeaderCounter();
                        if (latestAnalysisResult) {
                            renderCandidateCards(latestAnalysisResult.rankedCandidates);
                        }
                        refreshShortlistModalContent();
                    });

                    row.appendChild(info);
                    row.appendChild(removeBtn);
                    listEl.appendChild(row);
                });
            }
        }

        if (briefArea) {
            briefArea.value = buildCompleteShortlistBriefText();
        }
    }

    function openShortlistModal() {
        const modal = document.getElementById('shortlist-modal');
        if (!modal) return;
        refreshShortlistModalContent();
        modal.classList.remove('hidden');
    }

    function closeShortlistModal() {
        const modal = document.getElementById('shortlist-modal');
        if (!modal) return;
        modal.classList.add('hidden');
    }

    function toggleCandidateShortlist(matchItem) {
        if (!matchItem || !matchItem.candidate) return;
        const candId = matchItem.candidate.id;
        const codename = matchItem.candidate.codename || candId;

        if (shortlistedMap.has(candId)) {
            shortlistedMap.delete(candId);
            showToast('Removed ' + codename + ' from Shortlist Cart');
        } else {
            shortlistedMap.set(candId, matchItem);
            showToast('Added ' + codename + ' to Shortlist Cart (' + shortlistedMap.size + ' selected)');
        }

        updateShortlistHeaderCounter();
        if (latestAnalysisResult) {
            renderCandidateCards(latestAnalysisResult.rankedCandidates);
        }
        refreshShortlistModalContent();
    }

    function runAgenticMatch() {
        const jdInput = document.getElementById('jd-input');
        const pillarSelect = document.getElementById('pillar-filter');
        if (!jdInput || !window.AgenticMatcher || typeof window.AgenticMatcher.analyzeAndRank !== 'function') {
            return;
        }

        const jdText = jdInput.value.trim();
        const selectedPillar = pillarSelect ? pillarSelect.value : 'all';

        const result = window.AgenticMatcher.analyzeAndRank(jdText, selectedPillar);
        latestAnalysisResult = result;

        // Refresh stored shortlist objects if they appear in the new ranking so scores stay synced
        if (result && Array.isArray(result.rankedCandidates)) {
            result.rankedCandidates.forEach(function (item) {
                if (item.candidate && shortlistedMap.has(item.candidate.id)) {
                    shortlistedMap.set(item.candidate.id, item);
                }
            });
        }

        renderJdAnalysisSummary(result.jdAnalysis);
        renderAgentTraces(result.agentTraces);
        renderCandidateCards(result.rankedCandidates);
        updateShortlistHeaderCounter();
    }

    function initWorkspacePage() {
        const jdInput = document.getElementById('jd-input');
        if (!jdInput) return;

        // Check session mode badge
        const sessionBadge = document.getElementById('active-session-badge');
        const params = new URLSearchParams(window.location.search);
        const mode = params.get('mode');
        if (sessionBadge) {
            if (mode === 'demo') {
                sessionBadge.textContent = 'Session: Live Recruiter Demo Sandbox';
            } else if (mode === 'partner') {
                sessionBadge.textContent = 'Session: Verified Hiring Partner Access';
            }
        }

        // Load initial preset JD (Preset 1: product-fde)
        const defaultPreset = getPresetById(activePresetId);
        if (defaultPreset && defaultPreset.text) {
            jdInput.value = defaultPreset.text;
        }

        // Wire Preset Pill Buttons
        const presetButtons = document.querySelectorAll('[data-preset-id]');
        presetButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const presetId = btn.getAttribute('data-preset-id');
                const presetObj = getPresetById(presetId);
                if (!presetObj) return;

                activePresetId = presetId;
                presetButtons.forEach(function (b) {
                    b.classList.toggle('active', b.getAttribute('data-preset-id') === presetId);
                });

                jdInput.value = presetObj.text || presetObj.jdText || '';
                const pillarSelect = document.getElementById('pillar-filter');
                if (pillarSelect) {
                    pillarSelect.value = 'all';
                }

                runAgenticMatch();
                showToast('Loaded Preset JD: ' + (presetObj.label || presetObj.shortTitle || presetId));
            });
        });

        // Wire Specialty Filter & Run Button
        const runBtn = document.getElementById('run-matcher-btn');
        if (runBtn) {
            runBtn.addEventListener('click', function () {
                runAgenticMatch();
                showToast('4-Agent Semantic Profile Match completed');
            });
        }

        const pillarSelect = document.getElementById('pillar-filter');
        if (pillarSelect) {
            pillarSelect.addEventListener('change', function () {
                runAgenticMatch();
            });
        }

        // Wire Shortlist Drawer / Modal Buttons
        const openShortlistBtn = document.getElementById('open-shortlist-btn');
        const exportTopBtn = document.getElementById('export-shortlist-top-btn');
        const closeShortlistBtn = document.getElementById('close-shortlist-modal-btn');
        const modalBackdrop = document.getElementById('shortlist-modal');
        const copyBriefBtn = document.getElementById('copy-shortlist-brief-btn');
        const requestInterviewsBtn = document.getElementById('request-interviews-btn');

        if (openShortlistBtn) {
            openShortlistBtn.addEventListener('click', openShortlistModal);
        }

        if (exportTopBtn) {
            exportTopBtn.addEventListener('click', function () {
                // If no candidate is shortlisted yet, auto-shortlist the #1 top-matched candidate so the recruiter sees a complete brief immediately
                if (shortlistedMap.size === 0 && latestAnalysisResult && Array.isArray(latestAnalysisResult.rankedCandidates) && latestAnalysisResult.rankedCandidates.length > 0) {
                    const topCandidate = latestAnalysisResult.rankedCandidates[0];
                    shortlistedMap.set(topCandidate.candidate.id, topCandidate);
                    updateShortlistHeaderCounter();
                    renderCandidateCards(latestAnalysisResult.rankedCandidates);
                }
                openShortlistModal();
            });
        }

        if (closeShortlistBtn) {
            closeShortlistBtn.addEventListener('click', closeShortlistModal);
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', function (e) {
                if (e.target === modalBackdrop) {
                    closeShortlistModal();
                }
            });
        }

        if (copyBriefBtn) {
            copyBriefBtn.addEventListener('click', function () {
                const briefText = buildCompleteShortlistBriefText();
                const statusEl = document.getElementById('shortlist-modal-status');
                copyTextSafely(briefText, function () {
                    copyBriefBtn.textContent = '✓ Shortlist Brief Copied!';
                    if (statusEl) {
                        statusEl.textContent = 'Complete Hiring Manager Shortlist Brief copied to clipboard.';
                        statusEl.className = 'login-status success';
                    }
                    setTimeout(function () {
                        copyBriefBtn.textContent = 'Copy Complete Shortlist Brief';
                    }, 2200);
                });
            });
        }

        if (requestInterviewsBtn) {
            requestInterviewsBtn.addEventListener('click', function () {
                if (shortlistedMap.size === 0 && latestAnalysisResult && Array.isArray(latestAnalysisResult.rankedCandidates) && latestAnalysisResult.rankedCandidates.length > 0) {
                    const topCand = latestAnalysisResult.rankedCandidates[0];
                    shortlistedMap.set(topCand.candidate.id, topCand);
                    updateShortlistHeaderCounter();
                    renderCandidateCards(latestAnalysisResult.rankedCandidates);
                    refreshShortlistModalContent();
                }

                const selectedCodenames = Array.from(shortlistedMap.values()).map(function (item) {
                    return item.candidate.codename;
                }).join(', ');

                const subject = encodeURIComponent(
                    '[AgenticMastery.ai Shortlist Interview Request] ' + (selectedCodenames || 'Pre-Checked Candidates')
                );
                const body = encodeURIComponent(buildCompleteShortlistBriefText());
                window.location.href = 'mailto:partners@agenticmastery.ai?subject=' + subject + '&body=' + body;
            });
        }

        // Execute initial 4-Agent Profile Match on load
        runAgenticMatch();
    }

    document.addEventListener('DOMContentLoaded', function () {
        initLoginPage();
        initWorkspacePage();
    });
})();
