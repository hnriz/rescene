const userToggle = document.getElementById('userToggle');
const userOptions = document.getElementById('userOptions');
let userDropdownTimeout;

userToggle.addEventListener('mouseenter', () => {
    clearTimeout(userDropdownTimeout);
    userOptions.style.display = 'block';
});

userToggle.addEventListener('mouseleave', () => {
    userDropdownTimeout = setTimeout(() => {
        if (!userOptions.matches(':hover')) {
            userOptions.style.display = 'none';
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
    }, 150);
});
