// --- SLIDER HERO ---
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    console.debug('showSlide called', {index, slidesLength: slides.length, dotsLength: dots.length});
    if (!slides.length) {
        console.warn('No slides found');
        return;
    }
    // Asegura que el índice esté en rango
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;
    // Oculta todas las slides y dots
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlideIndex) console.debug('Activating slide', i);
    });
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentSlideIndex) console.debug('Activating dot', i);
    });
    // Muestra la slide y dot actual
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
    console.debug('Current slide index after showSlide:', currentSlideIndex);
}

function changeSlide(direction) {
    console.debug('changeSlide called', {direction, currentSlideIndex});
    showSlide(currentSlideIndex + direction);
}

function currentSlide(n) {
    console.debug('currentSlide called', {n});
    showSlide(n - 1);
}

// Auto-play slider
setInterval(() => {
    console.debug('Auto-play interval');
    showSlide(currentSlideIndex + 1);
}, 5000);

// --- NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
});

// --- CALCULADORA ---
window.calcular = function() {
    const amount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const scheme = document.getElementById('schemeType').value;
    let monthlyPayment = 0, total = 0, cat = '';
    const iva = 1.16;
    const storage = scheme === 'tradicional' ? 1000 : 1500;
    console.debug('calcular called', {amount, scheme});
    switch(scheme) {
        case 'tradicional':
            monthlyPayment = amount * 0.05;
            total = (amount + monthlyPayment + storage) * iva;
            cat = '60%';
            break;
        case 'ventura15':
            monthlyPayment = amount * 0.03 * 2;
            total = (amount + (amount * 0.03 * 2) + storage) * iva;
            cat = '192%';
            break;
        case 'ventura30':
            monthlyPayment = amount * 0.05;
            total = (amount + monthlyPayment + storage) * iva;
            cat = '120%';
            break;
    }
    document.getElementById('monthlyPayment').textContent = `$${monthlyPayment.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
    document.getElementById('totalPayment').textContent = `$${total.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
    document.getElementById('catRate').textContent = cat;
    console.debug('calcular result', {monthlyPayment, total, cat});
};

// --- NAVEGACIÓN SUAVE DEL NAVBAR ---
document.addEventListener('DOMContentLoaded', () => {
    console.debug('DOMContentLoaded');
    showSlide(0);
    // Navegación suave para enlaces del navbar
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').replace('#','');
            const section = document.getElementById(targetId) || document.querySelector(`[name='${targetId}']`);
            if (section) {
                e.preventDefault();
                section.scrollIntoView({behavior:'smooth', block:'start'});
            }
        });
    });
});