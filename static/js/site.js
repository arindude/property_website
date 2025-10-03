(function () {
    const emailAddress = 'rentals@83spaulding.com';

    function updateCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    function initContactDetails() {
        const contactLink = document.getElementById('contact-email');
        if (contactLink) {
            contactLink.href = `mailto:${emailAddress}`;
            contactLink.textContent = emailAddress;
        }

        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = (document.getElementById('name') || {}).value || '';
            const email = (document.getElementById('email') || {}).value || '';
            const message = (document.getElementById('message') || {}).value || '';

            const subject = encodeURIComponent(`Rental inquiry from ${name || 'prospective tenant'}`);
            const bodyLines = [
                `Name: ${name}`,
                `Email: ${email}`,
                '',
                'Message:',
                message,
            ];
            const body = encodeURIComponent(bodyLines.join('\n'));

            window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
        });
    }

    function initAnimations() {
        const animatedNodes = document.querySelectorAll('[data-animate]');
        if (!animatedNodes.length) return;

        if (!('IntersectionObserver' in window)) {
            animatedNodes.forEach(node => node.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px',
            }
        );

        animatedNodes.forEach(node => observer.observe(node));
    }

    document.addEventListener('DOMContentLoaded', function () {
        updateCurrentYear();
        initContactDetails();
        initAnimations();
    });
})();
