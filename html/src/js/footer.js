document.addEventListener('DOMContentLoaded', function() {
    // Botão Voltar ao Topo
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Newsletter form
    // const newsletterForm = document.querySelector('.newsletter-form');
    // const newsletterInput = newsletterForm.querySelector('input');
    // const newsletterBtn = newsletterForm.querySelector('button');
    
    // newsletterBtn.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     if (newsletterInput.value && isValidEmail(newsletterInput.value)) {
    //         newsletterInput.value = '';
    //         newsletterInput.placeholder = 'Inscrito com sucesso!';
    //         setTimeout(() => {
    //             newsletterInput.placeholder = 'Seu e-mail';
    //         }, 2000);
    //     }
    // });
    
    // function isValidEmail(email) {
    //     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return re.test(email);
    // }
    
    // Efeito de digitação para a descrição
    const descriptionText = "Sua plataforma para descobrir, avaliar e compartilhar filmes e séries. Conecte-se com outros cinéfilos e expanda seu universo cinematográfico.";
    const descriptionElement = document.querySelector('.footer-description');
    
    // Limpar texto inicial
    descriptionElement.textContent = '';
    
    // Efeito de digitação
    let charIndex = 0;
    function typeDescription() {
        if (charIndex < descriptionText.length) {
            descriptionElement.textContent += descriptionText.charAt(charIndex);
            charIndex++;
            setTimeout(typeDescription, 30);
        }
    }
    
    // Iniciar quando o elemento estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeDescription();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(descriptionElement);
});