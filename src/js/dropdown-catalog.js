const catalogToggle = document.getElementById('catalogToggle');
const catalogOptions = document.getElementById('catalogOptions');
const catalogCaret = catalogToggle.querySelector('i');
let catalogDropdownTimeout;

catalogToggle.addEventListener('mouseenter', () => {
    clearTimeout(catalogDropdownTimeout);
    catalogOptions.style.display = 'block';
    catalogCaret.classList.add('rotate');
});

catalogToggle.addEventListener('mouseleave', () => {
    catalogDropdownTimeout = setTimeout(() => {
        if (!catalogOptions.matches(':hover')) {
            catalogOptions.style.display = 'none';
            catalogCaret.classList.remove('rotate');
        }
    }, 150);
});

catalogOptions.addEventListener('mouseenter', () => {
    clearTimeout(catalogDropdownTimeout);
    catalogOptions.style.display = 'block';
});

catalogOptions.addEventListener('mouseleave', () => {
    catalogDropdownTimeout = setTimeout(() => {
        catalogOptions.style.display = 'none';
        catalogCaret.classList.remove('rotate');
    }, 150);
});
