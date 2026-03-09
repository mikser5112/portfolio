// 1. КУРСОР
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, ballX = 0, ballY = 0;
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function animateCursor() {
    ballX += (mouseX - ballX) * 0.15;
    ballY += (mouseY - ballY) * 0.15;
    follower.style.left = ballX + 'px';
    follower.style.top = ballY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 2. РУКА (АДАПТИВНАЯ АНИМАЦИЯ)
const hand = document.getElementById('scroll-hand');
const aboutSection = document.querySelector('.about');

window.addEventListener('scroll', () => {
    const rect = aboutSection.getBoundingClientRect();
    const winH = window.innerHeight;

    // Анимация срабатывает, когда секция в поле зрения
    if (rect.top <= winH * 0.8 && rect.bottom >= 0) {
        let progress = (winH * 0.8 - rect.top) / (winH * 0.6);
        progress = Math.max(0, Math.min(1, progress));

        const isMobile = window.innerWidth <= 768;
        
        // На мобилках вылет меньше, чтобы не было скролла вбок
        const moveX = isMobile ? (1 - progress) * 100 : (1 - progress) * 400;
        const rotation = isMobile ? (25 - progress * 20) : (40 - progress * 30);
        
        hand.style.opacity = isMobile ? Math.min(progress, 0.6) : progress;
        hand.style.transform = `translateX(${moveX}px) rotate(${rotation}deg)`;
    }
});

// 3. REVEAL АНИМАЦИИ
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active-reveal');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-text, .reveal-left, .reveal-scale, .reveal-up').forEach(el => {
    revealObserver.observe(el);
});

// 4. FAQ
document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        item.classList.toggle('active');
        const content = item.querySelector('.accordion-content');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
            btn.querySelector('i').classList.replace('fa-plus', 'fa-minus');
        } else {
            content.style.maxHeight = "0";
            btn.querySelector('i').classList.replace('fa-minus', 'fa-plus');
        }
    });
});

// 5. ВИДЕО МОДАЛКА
function openVideo(src) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    video.src = src;
    modal.style.display = 'flex';
    video.play();
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    modal.style.display = 'none';
    video.pause();
    video.src = "";
}

