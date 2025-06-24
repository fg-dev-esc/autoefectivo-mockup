// --- SLIDER HERO ---
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    // Validar índice
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;
    
    // Actualizar slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
    });
    
    // Actualizar dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(n) {
    showSlide(n - 1);
}

// Auto-play slider
setInterval(() => {
    showSlide(currentSlideIndex + 1);
}, 5000);

// --- NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    }
});

// --- CALCULADORA ---
function calcular() {
   const amount = parseFloat(document.getElementById('loanAmount').value) || 0;
   const scheme = document.getElementById('schemeType').value;
   
   let monthlyPayment = 0;
   let total = 0;
   let cat = '';
   
   const iva = 1.16;
   const storage = scheme === 'tradicional' ? 1000 : 1500;
   
   switch(scheme) {
       case 'tradicional':
           monthlyPayment = amount * 0.05;
           total = (amount + monthlyPayment + storage) * iva;
           cat = '60%';
           break;
       case 'ventura15':
           monthlyPayment = amount * 0.03 * 2; // Quincenal x2
           total = (amount + (amount * 0.03 * 2) + storage) * iva;
           cat = '192%';
           break;
       case 'ventura30':
           monthlyPayment = amount * 0.05;
           total = (amount + monthlyPayment + storage) * iva;
           cat = '120%';
           break;
   }
   
   // Actualizar resultados
   document.getElementById('monthlyPayment').textContent = 
       `$${monthlyPayment.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
   document.getElementById('totalPayment').textContent = 
       `$${total.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
   document.getElementById('catRate').textContent = cat;
}

// --- FAQ FUNCTIONALITY ---
function toggleFAQ(button) {
   const faqItem = button.parentElement;
   const answer = faqItem.querySelector('.faq-answer');
   const isActive = button.classList.contains('active');
   
   // Cerrar todas las FAQs primero
   document.querySelectorAll('.faq-question').forEach(q => {
       q.classList.remove('active');
       q.parentElement.querySelector('.faq-answer').classList.remove('active');
   });
   
   // Si no estaba activa, abrir esta
   if (!isActive) {
       button.classList.add('active');
       answer.classList.add('active');
   }
}

// --- NAVEGACIÓN SUAVE ---
function initSmoothNavigation() {
   document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
       link.addEventListener('click', function(e) {
           const targetId = this.getAttribute('href').substring(1);
           const section = document.getElementById(targetId);
           
           if (section) {
               e.preventDefault();
               section.scrollIntoView({
                   behavior: 'smooth',
                   block: 'start'
               });
               
               // Actualizar enlace activo
               document.querySelectorAll('.nav-link').forEach(navLink => {
                   navLink.classList.remove('active');
               });
               this.classList.add('active');
           }
       });
   });
}

// --- FORMULARIO DE CONTACTO ---
function initContactForm() {
   const form = document.getElementById('contactForm');
   if (form) {
       form.addEventListener('submit', function(e) {
           e.preventDefault();
           
           // Simular envío
           const submitBtn = form.querySelector('button[type="submit"]');
           const originalText = submitBtn.innerHTML;
           
           submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Enviando...';
           submitBtn.disabled = true;
           
           // Simular delay de envío
           setTimeout(() => {
               submitBtn.innerHTML = '<i data-lucide="check"></i> ¡Enviado!';
               submitBtn.style.background = 'var(--accent-green)';
               
               setTimeout(() => {
                   submitBtn.innerHTML = originalText;
                   submitBtn.disabled = false;
                   submitBtn.style.background = '';
                   form.reset();
               }, 2000);
           }, 1500);
       });
   }
}

// --- OBSERVADOR DE INTERSECCIÓN PARA ANIMACIONES ---
function initScrollAnimations() {
   const observerOptions = {
       threshold: 0.1,
       rootMargin: '0px 0px -50px 0px'
   };
   
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.style.opacity = '1';
               entry.target.style.transform = 'translateY(0)';
           }
       });
   }, observerOptions);
   
   // Observar elementos que se animan
   document.querySelectorAll('.benefit-card, .scheme-card, .branch-card, .faq-item').forEach(el => {
       el.style.opacity = '0';
       el.style.transform = 'translateY(30px)';
       el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
       observer.observe(el);
   });
}

// --- CHAT WIDGET ---
function initChatWidget() {
   const chatButton = document.querySelector('.chat-button');
   if (chatButton) {
       chatButton.addEventListener('click', () => {
           // Aquí puedes integrar tu sistema de chat
           // Por ahora solo mostramos un alert
           alert('¡Hola! Nuestro chat estará disponible pronto. Por favor llama al (55) 5595-0926');
       });
   }
}

// --- VALIDACIÓN DE FORMULARIOS ---
function initFormValidation() {
   const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
   
   inputs.forEach(input => {
       input.addEventListener('blur', function() {
           validateField(this);
       });
       
       input.addEventListener('input', function() {
           if (this.classList.contains('error')) {
               validateField(this);
           }
       });
   });
}

function validateField(field) {
   const value = field.value.trim();
   let isValid = true;
   let errorMessage = '';
   
   // Validaciones básicas
   if (field.hasAttribute('required') && !value) {
       isValid = false;
       errorMessage = 'Este campo es obligatorio';
   } else if (field.type === 'email' && value && !isValidEmail(value)) {
       isValid = false;
       errorMessage = 'Por favor ingresa un email válido';
   } else if (field.type === 'tel' && value && !isValidPhone(value)) {
       isValid = false;
       errorMessage = 'Por favor ingresa un teléfono válido';
   }
   
   // Mostrar/ocultar error
   showFieldError(field, isValid, errorMessage);
   
   return isValid;
}

function isValidEmail(email) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}

function isValidPhone(phone) {
   const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
   return phoneRegex.test(phone);
}

function showFieldError(field, isValid, message) {
   const existingError = field.parentNode.querySelector('.field-error');
   
   if (existingError) {
       existingError.remove();
   }
   
   if (isValid) {
       field.classList.remove('error');
   } else {
       field.classList.add('error');
       
       const errorDiv = document.createElement('div');
       errorDiv.className = 'field-error';
       errorDiv.textContent = message;
       errorDiv.style.color = 'var(--accent-red)';
       errorDiv.style.fontSize = '0.875rem';
       errorDiv.style.marginTop = '0.25rem';
       
       field.parentNode.appendChild(errorDiv);
   }
}

// --- UTILIDADES ---
function formatCurrency(amount) {
   return new Intl.NumberFormat('es-MX', {
       style: 'currency',
       currency: 'MXN'
   }).format(amount);
}

function debounce(func, wait) {
   let timeout;
   return function executedFunction(...args) {
       const later = () => {
           clearTimeout(timeout);
           func(...args);
       };
       clearTimeout(timeout);
       timeout = setTimeout(later, wait);
   };
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', function() {
   console.log('🚀 AutoEfectivo - Iniciando aplicación');
   
   // Inicializar slider
   showSlide(0);
   
   // Inicializar funcionalidades
   initSmoothNavigation();
   initContactForm();
   initScrollAnimations();
   initChatWidget();
   initFormValidation();
   
   // Reinicializar iconos de Lucide después de cambios dinámicos
   if (typeof lucide !== 'undefined') {
       lucide.createIcons();
   }
   
   console.log('✅ Aplicación inicializada correctamente');
});

// --- MANEJO DE ERRORES GLOBALES ---
window.addEventListener('error', function(e) {
   console.error('Error en la aplicación:', e.error);
});

// --- PERFORMANCE MONITORING ---
window.addEventListener('load', function() {
   const loadTime = performance.now();
   console.log(`⚡ Página cargada en ${Math.round(loadTime)}ms`);
});
