// Selecionar os elementos do DOM
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let index = 0;
let slideInterval;

// Criar bolinhas de navegação dinamicamente para cada slide
slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

// Selecionar todas as bolinhas criadas
const dots = document.querySelectorAll('.dot');

// Função para atualizar a exibição do carrossel
function updateCarousel() {
    // Move o carrossel na horizontal para exibir o slide atual
    carousel.style.transform = `translateX(${-index * 100}%)`;
    
    // Remove a classe 'active' de todas as bolinhas
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adiciona a classe 'active' na bolinha correspondente ao slide atual
    dots[index].classList.add('active');
}

// Função para avançar para o próximo slide
function nextSlide() {
    // O operador de módulo (%) garante que o índice volte para 0 após o último slide
    index = (index + 1) % slides.length;
    updateCarousel();
}

// Função para voltar para o slide anterior
function prevSlideFunc() {
    // O cálculo com 'slides.length' garante que o índice não seja negativo
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
}

// Função para ir para um slide específico usando as bolinhas
function goToSlide(i) {
    index = i;
    updateCarousel();
}

// Inicia a transição automática dos slides
function startAutoSlide() {
    // A cada 3000ms (3 segundos), a função nextSlide é chamada
    slideInterval = setInterval(nextSlide, 3000);
}

// Para a transição automática dos slides
function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Adicionar ouvintes de evento (event listeners) aos botões de navegação
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlideFunc();
    stopAutoSlide();
    startAutoSlide();
});

// Pausar o carrossel ao passar o mouse por cima
carousel.addEventListener('mouseenter', stopAutoSlide);

// Retomar a transição automática ao tirar o mouse
carousel.addEventListener('mouseleave', startAutoSlide);

// Iniciar o carrossel ao carregar a página
updateCarousel();
startAutoSlide();