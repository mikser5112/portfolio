// ==========================================
// 1. МЕРЦАНИЕ (FLICKER) — УЛЬТИМАТИВНЫЙ ФИКС
// ==========================================
const initFlicker = () => {
    const elements = document.querySelectorAll('.flicker-text');
    
    if (elements.length === 0) {
        // Если элементов нет, пробуем еще раз через 100мс
        setTimeout(initFlicker, 100);
        return;
    }

    console.log("Мерцание запущено! Найдено элементов:", elements.length);

    setInterval(() => {
        elements.forEach(el => {
            const r = Math.random();
            if (r > 0.96) {
                el.style.opacity = '0.1';
                el.style.filter = 'blur(3px) brightness(2)';
            } else if (r > 0.90) {
                el.style.opacity = '0.5';
                el.style.filter = 'blur(1px)';
            } else {
                el.style.opacity = '1';
                el.style.filter = 'none';
            }
        });
    }, 45); 
};

// Запуск немедленно
initFlicker();

// ==========================================
// 2. ОТКРЫТИЕ ВИДЕО (МОБИЛКИ + ДЕСКТОП)
// ==========================================
function openVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    if (modal && iframe) {
        // playsinline и mute — критично для работы на смартфонах
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
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

// ==========================================
// 3. КУРСОР И ОСТАЛЬНОЕ
// ==========================================
const follower = document.getElementById('cursor-follower');
let mouseX = -100, mouseY = -100, ballX = -100, ballY = -100;
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function animateCursor() {
    ballX += (mouseX - ballX) * 0.15;
    ballY += (mouseY - ballY) * 0.15;
    if (follower) {
        follower.style.left = ballX + 'px';
        follower.style.top = ballY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// FAQ и мобильные тапы
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('touchend', function() {
            const attr = this.getAttribute('onclick');
            if (attr) {
                const id = attr.match(/'([^']+)'/)[1];
                openVideo(id);
            }
        });
    });

    document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });
});