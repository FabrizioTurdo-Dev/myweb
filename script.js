
// ── CONFIGURACIÓN ──────────────────────────────────────────
// Reemplazá este número con el tuyo (sin + ni espacios, con código de país)
const WA_NUMBER = '5491154922800';

const DEFAULT_MSG_ES = 'Hola! Me interesa mejorar mi posicionamiento local. ¿Podemos hablar?';
const DEFAULT_MSG_EN = 'Hi! I\'m interested in improving my local presence. Can we talk?';
// ───────────────────────────────────────────────────────────

// WHATSAPP OPEN
function openWhatsApp() {
    const textarea = document.getElementById('waMessage');
    const isEN = document.body.classList.contains('lang-en');
    const userText = textarea ? textarea.value.trim() : '';
    const msg = userText.length > 0 ? userText : (isEN ? DEFAULT_MSG_EN : DEFAULT_MSG_ES);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// CHAR COUNTER
const waTextarea = document.getElementById('waMessage');
const charCount = document.getElementById('charCount');
if (waTextarea && charCount) {
    waTextarea.addEventListener('input', () => {
        charCount.textContent = waTextarea.value.length;
    });
}

// LANG SWITCHER
function setLang(lang) {
    document.body.className = lang === 'en' ? 'lang-en' : '';
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
    });
    localStorage.setItem('lt-lang', lang);

    // Update textarea placeholder on lang change
    if (waTextarea) {
        waTextarea.placeholder = lang === 'en'
            ? waTextarea.dataset.placeholderEn
            : waTextarea.dataset.placeholderEs;
    }
}

// Load saved lang
const savedLang = localStorage.getItem('lt-lang');
if (savedLang === 'en') setLang('en');

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// SMOOTH SCROLL for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
