// 1. КУРСОР (ГИТАРА)
const follower = document.getElementById('cursor-follower');
let mouseX = -100, mouseY = -100; // Скрываем курсор за пределами экрана при старте
let ballX = -100, ballY = -100;

window.addEventListener('mousemove', e => { 
    mouseX = e.clientX; 
    mouseY = e.clientY; 
});

function animateCursor() {
    // Плавное следование за мышью
    ballX += (mouseX - ballX) * 0.15;
    ballY += (mouseY - ballY) * 0.15;
    
    follower.style.left = ballX + 'px';
    follower.style.top = ballY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Скрываем/показываем курсор при входе в окно браузера
document.addEventListener('mouseleave', () => { follower.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { follower.style.opacity = '1'; });


// 2. РУКА (АНИМАЦИЯ ПРИ СКРОЛЛЕ)
const hand = document.getElementById('scroll-hand');
const aboutSection = document.querySelector('.about');

window.addEventListener('scroll', () => {
    if (!aboutSection || !hand) return;

    const rect = aboutSection.getBoundingClientRect();
    const winH = window.innerHeight;

    if (rect.top <= winH * 0.8 && rect.bottom >= 0) {
        let progress = (winH * 0.8 - rect.top) / (winH * 0.6);
        progress = Math.max(0, Math.min(1, progress));

        const isMobile = window.innerWidth <= 768;
        
        // Настройка движения руки
        const moveX = isMobile ? (1 - progress) * 100 : (1 - progress) * 400;
        const rotation = isMobile ? (25 - progress * 20) : (40 - progress * 30);
        
        hand.style.opacity = isMobile ? Math.min(progress, 0.4) : progress;
        hand.style.transform = `translateX(${moveX}px) rotate(${rotation}deg)`;
    }
});


// 3. REVEAL АНИМАЦИИ (ПОЯВЛЕНИЕ КОНТЕНТА)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active-reveal');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-text, .reveal-left, .reveal-scale, .reveal-up').forEach(el => {
    revealObserver.observe(el);
});


// 4. FAQ (АККОРДЕОН)
document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        
        // Закрываем другие открытые вкладки (опционально)
        document.querySelectorAll('.accordion-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.accordion-content').style.maxHeight = null;
            el.querySelector('i').classList.replace('fa-minus', 'fa-plus');
        });

        if (!isActive) {
            item.classList.add('active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + "px";
            btn.querySelector('i').classList.replace('fa-plus', 'fa-minus');
        }
    });
});


// 5. ВИДЕО МОДАЛКА (YOUTUBE ВЕРСИЯ)
function openVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    
    if (!modal || !iframe) return;

    // Ссылка на встраивание YouTube с автоплеем
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Запрещаем скролл при открытом видео
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    
    if (!modal || !iframe) return;

    modal.style.display = 'none';
    iframe.src = ""; // Останавливаем видео
    document.body.style.overflow = 'auto'; // Возвращаем скролл
}

// Закрытие модалки при клике на Esc
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeVideo();
});