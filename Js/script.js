document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeButton = document.getElementById('mode-toggle');
    const menuButton = document.querySelector('.menu-btn');
    const navList = document.querySelector('#main-nav ul');

    const readStoredTheme = () => {
        try {
            return localStorage.getItem('theme');
        } catch {
            return null;
        }
    };

    const storeTheme = (theme) => {
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // The site still works when storage is unavailable (for example in strict privacy mode).
        }
    };

    const setTheme = (theme) => {
        const isLight = theme === 'light-mode';

        body.classList.toggle('light-mode', isLight);
        body.classList.toggle('dark-mode', !isLight);
        storeTheme(isLight ? 'light-mode' : 'dark-mode');

        if (themeButton) {
            themeButton.innerHTML = isLight
                ? '<i class="fa-solid fa-moon" aria-hidden="true"></i>'
                : '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
            themeButton.setAttribute('aria-label', isLight ? 'Schakel naar donkere modus' : 'Schakel naar lichte modus');
        }
    };

    const savedTheme = readStoredTheme();
    setTheme(savedTheme === 'light-mode' ? 'light-mode' : 'dark-mode');

    themeButton?.addEventListener('click', () => {
        const nextTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
        setTheme(nextTheme);
    });

    const closeMenu = () => {
        navList?.classList.remove('open');
        body.classList.remove('menu-open');
        menuButton?.setAttribute('aria-expanded', 'false');
    };

    menuButton?.addEventListener('click', () => {
        const isOpen = navList?.classList.toggle('open') ?? false;
        body.classList.toggle('menu-open', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            const target = targetId && targetId !== '#' ? document.querySelector(targetId) : null;

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    const sections = [...document.querySelectorAll('main section[id]')];
    const sectionLinks = [...document.querySelectorAll('#main-nav a[href^="#"]')];

    if ('IntersectionObserver' in window && sections.length && sectionLinks.length) {
        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            sectionLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
            });
        }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.35, 0.6] });

        sections.forEach((section) => observer.observe(section));
    }

    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        const form = new FormData(contactForm);
        const name = String(form.get('name') ?? '').trim();
        const email = String(form.get('email') ?? '').trim();
        const message = String(form.get('message') ?? '').trim();

        if (!name || !email || !message) return;

        const subject = encodeURIComponent(`Portfolio contact van ${name}`);
        const bodyText = `Naam: ${name}\nE-mail: ${email}\n\n${message}`;
        window.location.href = `mailto:adnanha6_@outlook.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    });

    document.querySelectorAll('[data-current-year]').forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });
});
