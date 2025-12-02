const userToggle = document.getElementById('userToggle');
const userOptions = document.getElementById('userOptions');
const userCaret = userToggle.querySelector('i');
let userDropdownTimeout;

userToggle.addEventListener('mouseenter', () => {
    clearTimeout(userDropdownTimeout);
    userOptions.style.display = 'block';
    userCaret.classList.add('rotate');
});

userToggle.addEventListener('mouseleave', () => {
    userDropdownTimeout = setTimeout(() => {
        if (!userOptions.matches(':hover')) {
            userOptions.style.display = 'none';
            userCaret.classList.remove('rotate');
        }
    }, 150);
});

userOptions.addEventListener('mouseenter', () => {
    clearTimeout(userDropdownTimeout);
    userOptions.style.display = 'block';
});

userOptions.addEventListener('mouseleave', () => {
    userDropdownTimeout = setTimeout(() => {
        userOptions.style.display = 'none';
        userCaret.classList.remove('rotate');
    }, 150);
});
