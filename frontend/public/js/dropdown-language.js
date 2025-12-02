const toggleBtn = document.getElementById('languageToggle');
const options = document.getElementById('languageOptions');
const items = options.querySelectorAll('li');

toggleBtn.addEventListener('click', () => {
    options.classList.toggle('hidden');
});

items.forEach(item => {
    item.addEventListener('click', () => {
        // Remove o id de todos
        items.forEach(i => i.removeAttribute('id'));

        // Adiciona o id ao item clicado
        item.id = 'selectedLanguage';

        // Fecha o dropdown
        options.classList.add('hidden');
    });
});

// Fecha o dropdown ao clicar fora
document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !options.contains(e.target)) {
        options.classList.add('hidden');
    }
});