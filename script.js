function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
            switchTab(btn.getAttribute('data-tab'));
        });
    });

    document.querySelectorAll('[data-tab-target]').forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-tab-target');
            if (target) switchTab(target);
        });
    });

    if (clientForm) {
        const status = document.getElementById('cli-status');
        clientForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cli-name').value.trim();
            const email = document.getElementById('cli-email').value.trim();
            const company = document.getElementById('cli-company').value.trim();
            const need = document.getElementById('cli-need').value.trim();
            const notes = document.getElementById('cli-notes').value.trim();

            if (!name || !isValidEmail(email) || !company) {
                status.textContent = 'Please complete your name, work email, and company.';
                status.className = 'status-msg error';
                return;
            }

            status.textContent = 'Opening your email client to confirm your request...';
            status.className = 'status-msg success';

            const subject = encodeURIComponent(`[AgenticMastery Client Partner] ${company} — ${need}`);
            const body = encodeURIComponent(
                `Hi Sundar,\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nInquiry: ${need}\nDetails: ${notes || 'N/A'}\n`
            );
            window.location.href = `mailto:sundarrajan.raman@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    if (engineerForm) {
        const status = document.getElementById('eng-status');
        engineerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('eng-name').value.trim();
            const email = document.getElementById('eng-email').value.trim();
            const role = document.getElementById('eng-role').value.trim();
            const link = document.getElementById('eng-link').value.trim();

            if (!name || !isValidEmail(email) || !link) {
                status.textContent = 'Please enter your name, email, and LinkedIn/GitHub URL.';
                status.className = 'status-msg error';
                return;
            }

            status.textContent = 'Opening your email client to submit your profile...';
            status.className = 'status-msg success';

            const subject = encodeURIComponent(`[AgenticMastery Architect Network] ${name} (${role})`);
            const body = encodeURIComponent(
                `Hi Sundar,\n\nName: ${name}\nEmail: ${email}\nSpecialty: ${role}\nLinkedIn / GitHub: ${link}\n`
            );
            window.location.href = `mailto:sundarrajan.raman@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
