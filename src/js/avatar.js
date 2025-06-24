document.addEventListener('DOMContentLoaded', () => {
    const avatarInput = document.getElementById('avatarInput');
    const newAvatar = document.getElementById('newAvatar');

    function triggerFileInput() {
        avatarInput.value = ""; // limpa o valor anterior pra garantir que o evento dispare sempre
        avatarInput.click();
    }

    newAvatar.onclick = triggerFileInput;

    avatarInput.addEventListener('change', function () {
        const file = avatarInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                newAvatar.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    });
});
