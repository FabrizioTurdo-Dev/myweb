// 1. CONFIGURACIÓN DE REVEAL ON SCROLL (Animaciones + Tracking de Secciones)
const observerOptions = {
    threshold: 0.2 // Se dispara cuando se ve el 20% del elemento
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            // Lógica de Animación existente
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';

            // Tracking de Google Analytics: Detecta qué sección está viendo
            // Solo trackeamos si el elemento tiene un ID (como #servicios, #resultados, etc)
            if (e.target.id) {
                gtag('event', 'scroll_to_section', {
                    'section_id': e.target.id
                });
            }
        }
    });
}, observerOptions);

// Seleccionamos los elementos para animar y trackear
document.querySelectorAll('.service-card, .result-card, .tridente-step, section[id]').forEach(el => {
    // Aplicamos estilos iniciales para la animación si no los tiene
    if (!el.id) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
    observer.observe(el);
});


// 2. LÓGICA DEL LIGHTBOX (Portfolio) + Tracking de Interés
const lbImgs = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA94AAAE4CAYAAACt7yudAAAQAElEQVR4AeydBVgcyRaFz+DuFiXu2Y1nN+7u7u7u7u7u7u7uvrF9sY07xHB3f32LzDAQgiQDDHD56O7qquqSv3tgTt+qWxpQ+rEd5Zw76wiXqVlHudzIOtLJPetI5yjemEF6fgZel8gfxRszyKjPQBT/MIEMSsDZ1SOD9oy7xQSiouj5Vvr6zUEmwAQyCQGF8JYE9yjNKHyALGoaoqIqAzJLpNoPV8QEmAATYAJMgAkwASb...",
    // ... (aquí van el resto de tus strings de imágenes)
];

let currentImgIdx = 0;

function openLightbox(index) {
    currentImgIdx = index;
    const lbImg = document.getElementById('lbImg');
    if (lbImg) {
        lbImg.src = lbImgs[index];
        document.getElementById('lightbox').style.display = 'flex';

        // Tracking: El usuario está mirando tus trabajos
        gtag('event', 'view_portfolio', {
            'event_category': 'Engagement',
            'event_label': 'Imagen Portfolio #' + (index + 1)
        });
    }
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Cerrar con la tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});


// 3. TRACKING DE CONVERSIÓN (Clic en WhatsApp)
document.addEventListener('DOMContentLoaded', () => {
    const wppBtn = document.querySelector('.whatsapp-btn');

    if (wppBtn) {
        wppBtn.addEventListener('click', () => {
            gtag('event', 'generate_lead', {
                'event_category': 'Conversion',
                'event_label': 'WhatsApp Click - Local Targeting',
                'value': 1.0
            });
        });
    }

    // 4. TRACKING DE TIEMPO (Usuario Interesado)
    // Si se queda más de 30 segundos, es un lead potencial para Remarketing
    setTimeout(() => {
        gtag('event', 'time_on_site_30s', {
            'event_category': 'Engagement',
            'event_label': 'Lectura Profunda'
        });
    }, 30000);
});