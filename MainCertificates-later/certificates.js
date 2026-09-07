document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    modeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            modeToggle.innerHTML = '<i class="fa fa-sun"></i>';
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            modeToggle.innerHTML = '<i class="fa fa-moon"></i>';
        }
    });

    document.querySelector('.menu-btn').addEventListener('click', () => {
        document.getElementById('main-nav').classList.toggle('open');
    });
});
