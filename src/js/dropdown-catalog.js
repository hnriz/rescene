const catalogDropdown = document.querySelector('.catalogDropdown');
const catalogToggle = document.getElementById('catalogToggle');
const catalogOptions = document.getElementById('catalogOptions');

let dropdownTimeout;

catalogToggle.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
    catalogOptions.style.display = 'block';
});

catalogToggle.addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => {
        if (!catalogOptions.matches(':hover')) {
            catalogOptions.style.display = 'none';
        }
    }, 150);
});

catalogOptions.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
    catalogOptions.style.display = 'block';
});

catalogOptions.addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => {
        catalogOptions.style.display = 'none';
    }, 150);
});
