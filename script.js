function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidHttpUrl(value) {
    try {
        const parsed = new URL(value);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch (_err) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const clientForm = document.getElementById('client-form');
    const engineerForm = document.getElementById('engineer-form');

    function switchTab(target) {
        tabBtns.forEach(btn => {
            const isMatch = btn.getAttribute('data-tab') === target;
            btn.classList.toggle('active', isMatch);
            btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });
        if (clientForm && engineerForm) {
            clientForm.classList.toggle('hidden', target !== 'client');
            engineerForm.classList.toggle('hidden', target !== 'engineer');
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            if (tabName) {
                switchTab(tabName);
            }
        });
    });

    document.querySelectorAll('[data-tab-target]').forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-tab-target');
            if (target) {
                switchTab(target);
            }
        });
    });

    // Role Carousel Navigation
    const rolesTrack = document.getElementById('roles-track');
    const rolesPrev = document.getElementById('roles-prev');
    const rolesNext = document.getElementById('roles-next');

    if (rolesTrack && rolesPrev && rolesNext) {
        function getScrollDistance() {
            const firstCard = rolesTrack.querySelector('.role-card');
            return firstCard ? firstCard.getBoundingClientRect().width + 24 : 340;
        }

        rolesPrev.addEventListener('click', () => {
            rolesTrack.scrollBy({
                left: -getScrollDistance(),
                behavior: 'smooth'
            });
        });

        rolesNext.addEventListener('click', () => {
            rolesTrack.scrollBy({
                left: getScrollDistance(),
                behavior: 'smooth'
            });
        });
    }

    if (clientForm) {
        const status = document.getElementById('cli-status');
        clientForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('cli-name');
            const emailInput = document.getElementById('cli-email');
            const companyInput = document.getElementById('cli-company');
            const needInput = document.getElementById('cli-need');
            const notesInput = document.getElementById('cli-notes');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const company = companyInput ? companyInput.value.trim() : '';
            const need = needInput ? needInput.value.trim() : '';
            const notes = notesInput ? notesInput.value.trim() : '';

            if (!name || !isValidEmail(email) || !company) {
                if (status) {
                    status.textContent = 'Please complete your full name, valid work email, and organization name.';
                    status.className = 'status-msg error';
                }
                return;
            }

            if (status) {
                status.textContent = 'Opening your email client to connect with our consulting leaders...';
                status.className = 'status-msg success';
            }

            const subject = encodeURIComponent(`[AgenticMastery Consulting] ${company} — ${need}`);
            const body = encodeURIComponent(
                `Hello AgenticMastery.ai Leadership Team,\n\nPartner Name: ${name}\nWork Email: ${email}\nOrganization (Product / GCC): ${company}\nPrimary Hiring Need: ${need}\nRequirements / Context: ${notes || 'N/A'}\n`
            );
            window.location.href = `mailto:consulting@agenticmastery.ai?subject=${subject}&body=${body}`;
        });
    }

    if (engineerForm) {
        const status = document.getElementById('eng-status');
        engineerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('eng-name');
            const emailInput = document.getElementById('eng-email');
            const roleInput = document.getElementById('eng-role');
            const linkInput = document.getElementById('eng-link');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const role = roleInput ? roleInput.value.trim() : '';
            const link = linkInput ? linkInput.value.trim() : '';

            if (!name || !isValidEmail(email) || !isValidHttpUrl(link)) {
                if (status) {
                    status.textContent = 'Please enter your full name, valid email, and a valid https:// LinkedIn or GitHub URL.';
                    status.className = 'status-msg error';
                }
                return;
            }

            if (status) {
                status.textContent = 'Opening your email client to submit your profile for architecture verification...';
                status.className = 'status-msg success';
            }

            const subject = encodeURIComponent(`[AgenticMastery Pre-Checked Network] ${name} (${role})`);
            const body = encodeURIComponent(
                `Hello AgenticMastery.ai Evaluation Committee,\n\nCandidate Name: ${name}\nEmail: ${email}\nPrimary Track: ${role}\nLinkedIn / GitHub URL: ${link}\n`
            );
            window.location.href = `mailto:talent@agenticmastery.ai?subject=${subject}&body=${body}`;
        });
    }
});
