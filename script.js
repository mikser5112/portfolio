// 1. КУРСОР (ГИБКИЙ)
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, ballX = 0, ballY = 0;

// Отслеживаем мышь только если это не тачскрин
window.addEventListener('mousemove', e => { 
    mouseX = e.clientX; 
    mouseY = e.clientY; 
});

function animateCursor() {
    // Плавное следование (lerp)
    ballX += (mouseX - ballX) * 0.15;
    ballY += (mouseY - ballY) * 0.15;
    
    if (follower) {
        follower.style.left = ballX + 'px';
        follower.style.top = ballY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 2. РУКА (АДАПТИВНАЯ АНИМАЦИЯ)
const hand = document.getElementById('scroll-hand');
const aboutSection = document.querySelector('.about');

window.addEventListener('scroll', () => {
    // Если экран меньше 768px, отключаем тяжелые расчеты для руки
    if (window.innerWidth <= 768 || !hand || !aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    const winH = window.innerHeight;

    // Анимация срабатывает, когда секция в поле зрения
    if (rect.top <= winH * 0.8 && rect.bottom >= 0) {
        let progress = (winH * 0.8 - rect.top) / (winH * 0.6);
        progress = Math.max(0, Math.min(1, progress));

        // На десктопе вылет и поворот
        const moveX = (1 - progress) * 400;
        const rotation = (40 - progress * 30);
        
        hand.style.opacity = progress;
        hand.style.transform = `translateX(${moveX}px) rotate(${rotation}deg)`;
    }
});

// 3. REVEAL АНИМАЦИИ (ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-reveal');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-text, .reveal-left, .reveal-scale, .reveal-up').forEach(el => {
    revealObserver.observe(el);
});

// 4. FAQ (АККОРДЕОН С ЦЕНТРИРОВАНИЕМ)
document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const content = item.querySelector('.accordion-content');
        const icon = btn.querySelector('i');
        
        // Закрываем другие открытые вкладки (опционально)
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = "0";
                otherItem.querySelector('i').classList.replace('fa-minus', 'fa-plus');
            }
        });

        item.classList.toggle('active');

        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.classList.replace('fa-plus', 'fa-minus');
        } else {
            content.style.maxHeight = "0";
            if (icon) icon.classList.replace('fa-minus', 'fa-plus');
        }
    });
});

// 5. ВИДЕО МОДАЛКА
function openVideo(src) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    if (!modal || !video) return;

    video.src = src;
    modal.style.display = 'flex';
    video.play();
    
    // Блокируем скролл страницы при открытом видео
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    if (!modal || !video) return;

    modal.style.display = 'none';
    video.pause();
    video.src = "";
    
    // Возвращаем скролл
    document.body.style.overflow = 'auto';
}

// Закрытие модалки по клавише ESC
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeVideo();
});