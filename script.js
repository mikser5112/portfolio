// 1. МЕРЦАНИЕ (FLICKER)
const initFlicker = () => {
    const el = document.querySelectorAll('.flicker-text');
    if (!el.length) return setTimeout(initFlicker, 100);
    setInterval(() => {
        el.forEach(e => {
            const r = Math.random();
            if (r > 0.94) {
                e.style.opacity = '0.3';
                e.style.filter = 'blur(2px) brightness(1.5)';
            } else {
                e.style.opacity = '1';
                e.style.filter = 'none';
            }
        });
    }, 60);
};
initFlicker();

// 2. АККОРДЕОН (FAQ)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');
            
            // Сначала закрываем все остальные
            document.querySelectorAll('.accordion-item').forEach(el => {
                if (el !== item) {
                    el.classList.remove('active');
                    el.querySelector('.accordion-content').style.maxHeight = null;
                    el.querySelector('i').className = 'fa-solid fa-plus';
                }
            });

            // Открываем/закрываем текущий
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                btn.querySelector('i').className = 'fa-solid fa-minus';
            } else {
                item.classList.remove('active');
                content.style.maxHeight = null;
                btn.querySelector('i').className = 'fa-solid fa-plus';
            }
        });
    });
});

// 3. КУРСОР-ГИТАРА
const follower = document.getElementById('cursor-follower');
let mouseX = -100, mouseY = -100, ballX = -100, ballY = -100;
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animateCursor() {
    ballX += (mouseX - ballX) * 0.15; ballY += (mouseY - ballY) * 0.15;
    if(follower) { follower.style.left = ballX + 'px'; follower.style.top = ballY + 'px'; }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 4. АНИМАЦИЯ РУКИ ПРИ СКРОЛЛЕ
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

// 5. REVEAL (ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active-reveal');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-text, .reveal-left, .reveal-scale, .reveal-up').forEach(el => revealObserver.observe(el));