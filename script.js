// --- VARIABLES GLOBALES ---
let currentSlideIndex = 0;
let branchesMap = null;

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Prestium - Iniciando aplicación');
    
    // Inicializar funcionalidades
    initSmoothNavigation();
    initContactForms();
    initFAQ();
    initTabs();
    initBranchesMap();
    initScrollAnimations();
    initChatWidget();
    initFormValidation();
    
    // Reinicializar iconos de Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log('✅ Aplicación inicializada correctamente');
});

// --- NAVEGACIÓN SUAVE ---
function initSmoothNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        }
    });

    // Smooth scrolling para enlaces de navegación
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

// --- FORMULARIOS DE CONTACTO ---
function initContactForms() {
    // Formulario del hero
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Hero');
        });
    }

    // Formulario principal de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Contacto');
        });
    }
}

function handleFormSubmit(form, formType) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Mostrar loading
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular envío
    setTimeout(() => {
        submitBtn.innerHTML = '<i data-lucide="check"></i> ¡Enviado!';
        submitBtn.style.background = 'var(--accent-green)';
        
        // Mostrar mensaje de éxito
        showNotification(`¡Gracias! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.`, 'success');
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            form.reset();
        }, 3000);
    }, 2000);
}

// --- FAQ FUNCTIONALITY ---
function initFAQ() {
    // Tabs de FAQ
    const faqTabs = document.querySelectorAll('.faq-tabs .tab-btn');
    faqTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Actualizar tabs activos
            faqTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar contenido correspondiente
            document.querySelectorAll('.faq-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

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

// --- TABS FUNCTIONALITY ---
function initTabs() {
    // Tabs de ejemplos
    const tabButtons = document.querySelectorAll('.example-tabs .tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const parentCard = this.closest('.example-card');
            
            // Actualizar botones activos
            parentCard.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Mostrar contenido correspondiente
            parentCard.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            parentCard.querySelector(`#${targetTab}`).classList.add('active');
        });
    });
}

// --- MAPA DE SUCURSALES ---
function initBranchesMap() {
    if (typeof L !== 'undefined') {
        // Inicializar mapa con Leaflet
        branchesMap = L.map('branchesMap').setView([19.4326, -99.1332], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(branchesMap);
        
        // Agregar marcadores de sucursales
        const branches = [
            { name: 'Sucursal Matriz', lat: 19.3689, lng: -99.1892, address: 'Av. Contreras #246-304, Col. San Jerónimo Lídice', phone: '(55) 5595-09-26' },
            { name: 'Sucursal Aguascalientes', lat: 21.8818, lng: -102.2916, address: 'Av. Aguascalientes #123, Centro', phone: '(449) 123-45-67' },
            { name: 'Sucursal Guadalajara', lat: 20.6597, lng: -103.3496, address: 'Av. Guadalajara #456, Centro', phone: '(33) 123-45-67' },
            { name: 'Sucursal Morelia', lat: 19.7069, lng: -101.1955, address: 'Av. Morelia #789, Centro', phone: '(443) 123-45-67' },
            { name: 'Sucursal Toluca', lat: 19.2926, lng: -99.6554, address: 'Av. Toluca #012, Centro', phone: '(722) 123-45-67' },
            { name: 'Sucursal Zacatecas', lat: 22.7709, lng: -102.5832, address: 'Av. Zacatecas #345, Centro', phone: '(492) 123-45-67' }
        ];
        
        branches.forEach(branch => {
            const marker = L.marker([branch.lat, branch.lng]).addTo(branchesMap);
            marker.bindPopup(`
                <div class="map-popup">
                    <h4>${branch.name}</h4>
                    <p>${branch.address}</p>
                    <p><strong>${branch.phone}</strong></p>
                </div>
            `);
        });
    }
}

function showZone(zoneId) {
    const allZones = document.querySelectorAll('.zone-group');
    
    if (zoneId === '') {
        // Mostrar todas las zonas
        allZones.forEach(zone => {
            zone.style.display = 'block';
        });
    } else {
        // Mostrar solo la zona seleccionada
        allZones.forEach(zone => {
            if (zone.getAttribute('data-zone') === zoneId) {
                zone.style.display = 'block';
            } else {
                zone.style.display = 'none';
            }
        });
    }
}

// --- ANIMACIONES DE SCROLL ---
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
    document.querySelectorAll('.scheme-card, .example-card, .benefit-item, .faq-item, .branch-item').forEach(el => {
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
            // Integrar con WhatsApp Business
            const phoneNumber = '525555950926';
            const message = encodeURIComponent('¡Hola! Me interesa obtener información sobre los préstamos de Prestium.');
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappURL, '_blank');
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
        field.style.borderColor = '';
    } else {
        field.classList.add('error');
        field.style.borderColor = 'var(--accent-red)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--accent-red)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }
}

// --- NOTIFICACIONES ---
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-blue)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Crear iconos
    lucide.createIcons();
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
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

// --- MANEJO DE ERRORES GLOBALES ---
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// --- PERFORMANCE MONITORING ---
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Página cargada en ${Math.round(loadTime)}ms`);
});

// Agregar estilos CSS para notificaciones
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);