// 1. МЕРЦАНИЕ (FLICKER)
const initFlicker = () => {
    const el = document.querySelectorAll('.flicker-text');
    if (!el.length) return setTimeout(initFlicker, 100);
    setInterval(() => {
        el.forEach(e => {
            const r = Math.random();
            if (r > 0.94) {
                e.style.opacity = '0.2';
                e.style.filter = 'blur(2px) brightness(2)';
            } else if (r > 0.88) {
                e.style.opacity = '0.5';
                e.style.filter = 'blur(1px)';
            } else {
                e.style.opacity = '1';
                e.style.filter = 'none';
            }
        });
    }, 50);
};
initFlicker();

// 2. ЛОГИКА ВИДЕО (МОБИЛКИ VS ПК)
function handleVideo(videoId) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // На телефонах — просто открываем прямую ссылку
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    } else {
        // На ПК — открываем модалку
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('modalVideo');
        if (modal && iframe) {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    if (modal && iframe) {
        modal.style.display = 'none';
        iframe.src = "";
        document.body.style.overflow = 'auto';
    }
}

// 3. ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ
document.addEventListener('DOMContentLoaded', () => {
    // Клики по работам
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', function() {
            const id = this.getAttribute('data-video');
            if (id) handleVideo(id);
        });
    });

    // FAQ Аккордеон
    document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.accordion-content').style.maxHeight = null;
                el.querySelector('i').classList.replace('fa-minus', 'fa-plus');
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                btn.querySelector('i').classList.replace('fa-minus', 'fa-plus');
            }
        });
    });
});

// 4. КУРСОР-ГИТАРА
const follower = document.getElementById('cursor-follower');
let mouseX = -100, mouseY = -100, ballX = -100, ballY = -100;
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animateCursor() {
    ballX += (mouseX - ballX) * 0.15; ballY += (mouseY - ballY) * 0.15;
    if(follower) { follower.style.left = ballX + 'px'; follower.style.top = ballY + 'px'; }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 5. АНИМАЦИЯ РУКИ ПРИ СКРОЛЛЕ
const hand = document.getElementById('scroll-hand');
const aboutSection = document.querySelector('.about');
window.addEventListener('scroll', () => {
    if (!aboutSection || !hand) return;
    const rect = aboutSection.getBoundingClientRect();
    const winH = window.innerHeight;
    if (rect.top <= winH * 0.8 && rect.bottom >= 0) {
        let progress = (winH * 0.8 - rect.top) / (winH * 0.6);
        progress = Math.max(0, Math.min(1, progress));
        hand.style.transform = `translateX(${(1 - progress) * 100}px) rotate(${40 - progress * 30}deg)`;
        hand.style.opacity = progress;
    }
});

// 6. REVEAL (ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active-reveal');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-text, .reveal-left, .reveal-scale, .reveal-up').forEach(el => revealObserver.observe(el));

document.addEventListener('keydown', e => { if (e.key === "Escape") closeVideo(); });