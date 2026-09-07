(function () {
    // Modal functionaliteit
    function openModal(title, description) {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-description').innerText = description;
        document.getElementById('modal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('modal').style.display = 'none';
    }

    // Smooth scroll voor navigatie
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contactformulier-validatie en bedankbericht
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = form.querySelector('input[type="text"]').value.trim();
            const email = form.querySelector('input[type="email"]').value.trim();
            const message = form.querySelector('textarea').value.trim();

            if (!name || !email || !message) {
                alert('Vul alstublieft alle velden in.');
            } else {
                alert(`Bedankt voor uw bericht, ${name}!`);
                form.reset();
            }
        });
    }

    // Sluitknop voor modal
    const closeModalBtn = document.querySelector('.close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

})();

document.getElementById('modal').setAttribute('aria-hidden', 'true');
function openModal(title, description) {
    document.getElementById('modal').setAttribute('aria-hidden', 'false');
}
function closeModal() {
    document.getElementById('modal').setAttribute('aria-hidden', 'true');
}


