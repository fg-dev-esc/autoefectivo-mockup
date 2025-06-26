// --- VARIABLES GLOBALES ---
let currentSlideIndex = 0;
let map = null;
let markers = [];
let infoWindow = null;
let userLocation = null;
let directionsService = null;
let directionsRenderer = null;

// --- DATOS DE SUCURSALES REALES ---
const branches = [
    {
        id: 'matriz',
        name: 'Sucursal Matriz San Jerónimo',
        address: 'Av. Contreras #246-304, Col. San Jerónimo Lídice, C.P. 10200, CDMX',
        lat: 19.368900,
        lng: -99.189200,
        phone: '(55) 5595-0926',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs | Sáb: 9:00 - 14:00 hrs',
        city: 'cdmx',
        email: 'sanjeronimo@prestium.com'
    },
    {
        id: 'centro',
        name: 'Sucursal Centro CDMX',
        address: 'Av. Juárez #123, Col. Centro, C.P. 06010, CDMX',
        lat: 19.434500,
        lng: -99.138600,
        phone: '(55) 5512-3456',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs',
        city: 'cdmx',
        email: 'centro@prestium.com'
    },
    {
        id: 'satelite',
        name: 'Sucursal Satélite',
        address: 'Av. Satélite #456, Col. Cd. Satélite, C.P. 53100, Naucalpan, Edo. Méx.',
        lat: 19.512400,
        lng: -99.238700,
        phone: '(55) 5387-9012',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs | Sáb: 9:00 - 15:00 hrs',
        city: 'edomex',
        email: 'satelite@prestium.com'
    },
    {
        id: 'guadalajara',
        name: 'Sucursal Guadalajara Centro',
        address: 'Av. Hidalgo #789, Col. Centro, C.P. 44100, Guadalajara, Jal.',
        lat: 20.676100,
        lng: -103.347800,
        phone: '(33) 3614-5678',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs',
        city: 'guadalajara',
        email: 'guadalajara@prestium.com'
    },
    {
        id: 'monterrey',
        name: 'Sucursal Monterrey',
        address: 'Av. Constitución #321, Col. Centro, C.P. 64000, Monterrey, N.L.',
        lat: 25.669100,
        lng: -100.309200,
        phone: '(81) 8343-2109',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs',
        city: 'monterrey',
        email: 'monterrey@prestium.com'
    },
    {
        id: 'puebla',
        name: 'Sucursal Puebla',
        address: 'Av. Reforma #654, Col. Centro, C.P. 72000, Puebla, Pue.',
        lat: 19.041300,
        lng: -98.206200,
        phone: '(222) 2485-7654',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs',
        city: 'puebla',
        email: 'puebla@prestium.com'
    },
    {
        id: 'queretaro',
        name: 'Sucursal Querétaro',
        address: 'Av. Universidad #987, Col. Centro Sur, C.P. 76090, Querétaro, Qro.',
        lat: 20.588800,
        lng: -100.389900,
        phone: '(442) 2156-4321',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs',
        city: 'queretaro',
        email: 'queretaro@prestium.com'
    },
    {
        id: 'tijuana',
        name: 'Sucursal Tijuana',
        address: 'Av. Revolución #234, Col. Centro, C.P. 22000, Tijuana, B.C.',
        lat: 32.525300,
        lng: -117.033600,
        phone: '(664) 6847-8901',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs',
        city: 'tijuana',
        email: 'tijuana@prestium.com'
    },
    {
        id: 'leon',
        name: 'Sucursal León',
        address: 'Blvd. López Mateos #567, Col. Centro, C.P. 37000, León, Gto.',
        lat: 21.122500,
        lng: -101.682800,
        phone: '(477) 7168-5432',
        hours: 'Lun - Vie: 9:00 - 18:00 hrs',
        city: 'leon',
        email: 'leon@prestium.com'
    }
];

// --- SLIDER HERO ---
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const heroImages = [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
    ];
    if (!slides.length) return;
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
    // Cambiar la imagen de fondo según el slide actual
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const imgIndex = currentSlideIndex % heroImages.length;
        heroSlider.style.backgroundImage = `url('${heroImages[imgIndex]}')`;
    }
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(n) {
    showSlide(n - 1);
}

// --- NAVBAR SCROLL EFFECT ---
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        }
    });
}

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
        case 'express15':
            monthlyPayment = amount * 0.03 * 2;
            total = (amount + (amount * 0.03 * 2) + storage) * iva;
            cat = '192%';
            break;
        case 'express30':
            monthlyPayment = amount * 0.05;
            total = (amount + monthlyPayment + storage) * iva;
            cat = '120%';
            break;
    }
    
    document.getElementById('monthlyPayment').textContent = 
        `$${monthlyPayment.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
    document.getElementById('totalPayment').textContent = 
        `$${total.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
    document.getElementById('catRate').textContent = cat;
}

// --- TABS FUNCTIONALITY ---
function initTabs() {
    const exampleTabs = document.querySelectorAll('.examples-tabs .tab-btn');
    exampleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            exampleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.example-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetTab).classList.add('active');
        });
    });

    const optionTabs = document.querySelectorAll('.option-tabs .option-btn');
    optionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetOption = this.getAttribute('data-option');
            const parentCard = this.closest('.express-options');
            
            parentCard.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            parentCard.querySelectorAll('.option-content').forEach(content => {
                content.classList.remove('active');
            });
            parentCard.querySelector(`#${targetOption}`).classList.add('active');
        });
    });

    const faqTabs = document.querySelectorAll('.faq-tabs .tab-btn');
    faqTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            faqTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.faq-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// --- FAQ FUNCTIONALITY ---
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = button.classList.contains('active');
    
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.parentElement.querySelector('.faq-answer').classList.remove('active');
    });
    
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
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i data-lucide="check"></i> Enviado';
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

// --- INICIALIZAR GOOGLE MAPS ---
function initGoogleMaps() {
    if (typeof google === 'undefined') {
        return;
    }

    const mapOptions = {
        zoom: 6,
        center: { lat: 23.6345, lng: -102.5528 },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    };

    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
    
    infoWindow = new google.maps.InfoWindow();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
            strokeColor: '#b01f18',
            strokeWeight: 4
        }
    });
    directionsRenderer.setMap(map);

    addBranchMarkers();
    renderBranchesList();
}

// --- AGREGAR MARCADORES ---
function addBranchMarkers() {
    branches.forEach(branch => {
        const marker = new google.maps.Marker({
            position: { lat: branch.lat, lng: branch.lng },
            map: map,
            title: branch.name,
            icon: {
                url: createCustomMarkerIcon(),
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40)
            }
        });

        const infoContent = `
            <div class="map-info-window">
                <h3>${branch.name}</h3>
                <p><i class="icon-map-pin"></i> ${branch.address}</p>
                <p><i class="icon-phone"></i> ${branch.phone}</p>
                <p><i class="icon-clock"></i> ${branch.hours}</p>
                <div class="info-actions">
                    <a href="tel:${branch.phone.replace(/[^\d]/g, '')}" class="info-btn primary">
                        Llamar
                    </a>
                    <a href="https://wa.me/52${branch.phone.replace(/[^\d]/g, '')}" target="_blank" class="info-btn">
                        WhatsApp
                    </a>
                    <button onclick="getDirections('${branch.lat},${branch.lng}')" class="info-btn">
                        Cómo llegar
                    </button>
                </div>
            </div>
        `;

        marker.addListener('click', () => {
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);
            highlightBranchInList(branch.id);
        });

        markers.push({ marker, branch });
    });
}

// --- CREAR ICONO PERSONALIZADO ---
function createCustomMarkerIcon() {
    const svg = `
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#b01f18" stroke="#ffffff" stroke-width="2"/>
            <circle cx="20" cy="20" r="8" fill="#ffffff"/>
            <text x="20" y="24" text-anchor="middle" fill="#b01f18" font-family="Arial, sans-serif" font-size="12" font-weight="bold">P</text>
        </svg>
    `;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

// --- RENDERIZAR LISTA DE SUCURSALES ---
function renderBranchesList(filteredBranches = branches) {
    const branchesList = document.getElementById('branchesList');
    
    branchesList.innerHTML = filteredBranches.map(branch => `
        <div class="branch-item" data-branch-id="${branch.id}" onclick="selectBranch('${branch.id}')">
            <div class="branch-name">
                <div class="branch-icon">
                    <i data-lucide="map-pin"></i>
                </div>
                ${branch.name}
            </div>
            <div class="branch-address">
                <i data-lucide="map-pin" size="14"></i>
                ${branch.address}
            </div>
            <div class="branch-meta">
                <div class="branch-distance" id="distance-${branch.id}">
                    <i data-lucide="navigation" size="12"></i>
                    Calculando...
                </div>
                <div class="branch-phone">
                    <i data-lucide="phone" size="12"></i>
                    ${branch.phone}
                </div>
            </div>
            <div class="branch-actions">
                <a href="tel:${branch.phone.replace(/[^\d]/g, '')}" class="branch-action-btn primary">
                    <i data-lucide="phone" size="14"></i>
                    Llamar
                </a>
                <a href="https://wa.me/52${branch.phone.replace(/[^\d]/g, '')}" class="branch-action-btn" target="_blank">
                    <i data-lucide="message-circle" size="14"></i>
                    WhatsApp
                </a>
                <button onclick="getDirections('${branch.lat},${branch.lng}')" class="branch-action-btn">
                    <i data-lucide="navigation" size="14"></i>
                    Ruta
                </button>
            </div>
        </div>
    `).join('');
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- FUNCIONES DE INTERACCIÓN ---
function selectBranch(branchId) {
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return;

    map.setCenter({ lat: branch.lat, lng: branch.lng });
    map.setZoom(15);

    const markerData = markers.find(m => m.branch.id === branchId);
    if (markerData) {
        google.maps.event.trigger(markerData.marker, 'click');
    }

    highlightBranchInList(branchId);
}

function highlightBranchInList(branchId) {
    document.querySelectorAll('.branch-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const branchItem = document.querySelector(`[data-branch-id="${branchId}"]`);
    if (branchItem) {
        branchItem.classList.add('active');
        branchItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function filterBranches(city) {
    if (!city) {
        renderBranchesList(branches);
        showAllBranches();
        return;
    }
    
    const filteredBranches = branches.filter(branch => branch.city === city);
    renderBranchesList(filteredBranches);
    
    if (filteredBranches.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        filteredBranches.forEach(branch => {
            bounds.extend(new google.maps.LatLng(branch.lat, branch.lng));
        });
        map.fitBounds(bounds);
        
        markers.forEach(markerData => {
            const isVisible = filteredBranches.some(branch => branch.id === markerData.branch.id);
            markerData.marker.setVisible(isVisible);
        });
    }
}

function showAllBranches() {
    markers.forEach(markerData => {
        markerData.marker.setVisible(true);
    });
    
    const bounds = new google.maps.LatLngBounds();
    branches.forEach(branch => {
        bounds.extend(new google.maps.LatLng(branch.lat, branch.lng));
    });
    map.fitBounds(bounds);
    
    document.getElementById('zoneSelect').value = '';
    renderBranchesList(branches);
}

// --- BÚSQUEDA POR DIRECCIÓN ---
function searchNearestBranch() {
    const address = document.getElementById('addressSearch').value.trim();
    if (!address) {
        alert('Por favor ingresa una dirección');
        return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
            const userLocation = results[0].geometry.location;
            
            if (window.userMarker) {
                window.userMarker.setMap(null);
            }
            
            window.userMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Tu ubicación',
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="12" fill="#FF9234" stroke="#ffffff" stroke-width="2"/>
                            <circle cx="15" cy="15" r="4" fill="#ffffff"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(30, 30)
                }
            });

            calculateDistancesAndSort(userLocation);
            map.setCenter(userLocation);
            map.setZoom(12);
            
        } else {
            alert('No se pudo encontrar la dirección. Intenta con una dirección más específica.');
        }
    });
}

function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        searchNearestBranch();
    }
}

// --- CALCULAR DISTANCIAS ---
function calculateDistancesAndSort(userLocation) {
    const branchesWithDistance = branches.map(branch => {
        const branchLocation = new google.maps.LatLng(branch.lat, branch.lng);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            userLocation, branchLocation
        );
        
        return {
            ...branch,
            distance: distance,
            distanceText: formatDistance(distance)
        };
    });

    branchesWithDistance.sort((a, b) => a.distance - b.distance);
    renderBranchesListWithDistance(branchesWithDistance);
}

function formatDistance(meters) {
    if (meters < 1000) {
        return `${Math.round(meters)} m`;
    } else {
        return `${(meters / 1000).toFixed(1)} km`;
    }
}

function renderBranchesListWithDistance(branchesWithDistance) {
    const branchesList = document.getElementById('branchesList');
    
    branchesList.innerHTML = branchesWithDistance.map((branch, index) => `
        <div class="branch-item ${index === 0 ? 'nearest' : ''}" data-branch-id="${branch.id}" onclick="selectBranch('${branch.id}')">
            <div class="branch-name">
                <div class="branch-icon">
                    <i data-lucide="map-pin"></i>
                </div>
                ${branch.name}
                ${index === 0 ? '<span class="nearest-badge">Más cercana</span>' : ''}
            </div>
            <div class="branch-address">
                <i data-lucide="map-pin" size="14"></i>
                ${branch.address}
            </div>
            <div class="branch-meta">
                <div class="branch-distance">
                    <i data-lucide="navigation" size="12"></i>
                    ${branch.distanceText}
                </div>
                <div class="branch-phone">
                    <i data-lucide="phone" size="12"></i>
                    ${branch.phone}
                </div>
            </div>
            <div class="branch-actions">
                <a href="tel:${branch.phone.replace(/[^\d]/g, '')}" class="branch-action-btn primary">
                    <i data-lucide="phone" size="14"></i>
                    Llamar
                </a>
                <a href="https://wa.me/52${branch.phone.replace(/[^\d]/g, '')}" class="branch-action-btn" target="_blank">
                    <i data-lucide="message-circle" size="14"></i>
                    WhatsApp
                </a>
                <button onclick="getDirections('${branch.lat},${branch.lng}')" class="branch-action-btn">
                    <i data-lucide="navigation" size="14"></i>
                    Ruta
                </button>
            </div>
        </div>
    `).join('');
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- OBTENER UBICACIÓN DEL USUARIO ---
function centerMapOnUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );
                
                if (window.userMarker) {
                    window.userMarker.setMap(null);
                }
                
                window.userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: 'Tu ubicación actual',
                    icon: {
                        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="12" fill="#FF9234" stroke="#ffffff" stroke-width="2"/>
                                <circle cx="15" cy="15" r="4" fill="#ffffff"/>
                                <circle cx="15" cy="15" r="8" fill="none" stroke="#FF9234" stroke-width="1" opacity="0.5"/>
                            </svg>
                        `),
                        scaledSize: new google.maps.Size(30, 30)
                    }
                });

                calculateDistancesAndSort(userLocation);
                map.setCenter(userLocation);
                map.setZoom(13);
                
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div class="user-location-info">
                            <h4>Tu ubicación actual</h4>
                            <p>Encontramos las sucursales más cercanas a ti</p>
                        </div>
                    `
                });
                infoWindow.open(map, window.userMarker);
                
            },
            (error) => {
                alert('No se pudo obtener tu ubicación. Verifica los permisos del navegador.');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    } else {
        alert('Tu navegador no soporta geolocalización.');
    }
}

// --- OBTENER DIRECCIONES ---
function getDirections(coordinates) {
    const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord));
    const destination = new google.maps.LatLng(lat, lng);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const origin = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );
                
                const request = {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                
                directionsService.route(request, (result, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(result);
                        
                        const route = result.routes[0];
                        const leg = route.legs[0];
                        
                        showRouteInfo({
                            distance: leg.distance.text,
                            duration: leg.duration.text,
                            start: leg.start_address,
                            end: leg.end_address
                        });
                        
                    } else {
                        alert('No se pudo calcular la ruta. Intenta de nuevo.');
                    }
                });
            },
            (error) => {
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                window.open(mapsUrl, '_blank');
            }
        );
    } else {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(mapsUrl, '_blank');
    }
}

function showRouteInfo(routeData) {
    const routeInfoHTML = `
        <div class="route-info-modal">
            <div class="route-info-content">
                <h3>
                    <i data-lucide="navigation" size="20"></i>
                    Información de la Ruta
                </h3>
                <div class="route-details">
                    <div class="route-detail">
                        <i data-lucide="map-pin" size="16"></i>
                        <strong>Distancia:</strong> ${routeData.distance}
                    </div>
                    <div class="route-detail">
                        <i data-lucide="clock" size="16"></i>
                        <strong>Tiempo estimado:</strong> ${routeData.duration}
                    </div>
                    <div class="route-detail">
                        <i data-lucide="play" size="16"></i>
                        <strong>Origen:</strong> ${routeData.start}
                    </div>
                    <div class="route-detail">
                        <i data-lucide="flag" size="16"></i>
                        <strong>Destino:</strong> ${routeData.end}
                    </div>
                </div>
                <div class="route-actions">
                    <button onclick="clearDirections()" class="btn btn-secondary">
                        <i data-lucide="x" size="16"></i>
                        Cerrar Ruta
                    </button>
                </div>
            </div>
        </div>
    `;
    
    if (infoWindow) {
        infoWindow.setContent(routeInfoHTML);
        infoWindow.setPosition(map.getCenter());
        infoWindow.open(map);
    }
}

function clearDirections() {
    if (directionsRenderer) {
        directionsRenderer.setDirections({routes: []});
    }
    if (infoWindow) {
        infoWindow.close();
    }
}

// --- CHAT WIDGET ---
function initChatWidget() {
    const chatButton = document.querySelector('.chat-button');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            const phoneNumber = '525555950926';
            const message = encodeURIComponent('Hola! Me interesa obtener información sobre los préstamos de Prestium.');
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

// --- MAPA DE SUCURSALES ---
function initBranchesMap() {
    if (typeof google === 'undefined') {
        loadGoogleMapsAPI();
    } else {
        initGoogleMaps();
    }
}

function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC1yMIt5xSm1MEyStJXJ0A7GHxoH3jipQk&libraries=geometry&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
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

// --- INICIALIZACIÓN PRINCIPAL ---
document.addEventListener('DOMContentLoaded', function() {
    // Cambiar aleatoriamente el fondo del hero-slider
    const heroImages = [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
    ];
    const randomHero = heroImages[Math.floor(Math.random() * heroImages.length)];
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.style.backgroundImage = `url('${randomHero}')`;
    }
    
    showSlide(0);
    
    // Auto-play slider
    setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000);
    
    initNavbarScroll();
    initSmoothNavigation();
    initContactForm();
    initTabs();
    initBranchesMap();
    initChatWidget();
    initFormValidation();
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// --- MANEJO DE ERRORES GLOBALES ---
window.addEventListener('error', function(e) {
    // Error handling silencioso
});

// --- PERFORMANCE MONITORING ---
window.addEventListener('load', function() {
    const loadTime = performance.now();
    // Performance tracking silencioso
});

// --- FUNCIÓN GLOBAL PARA COMPATIBILIDAD ---
window.initGoogleMaps = initGoogleMaps;