/**
 * V8 ANIMATION & STABILITY ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Particle System (Golden Dust)
    const initParticles = () => {
        const canvas = document.createElement('canvas');
        canvas.id = 'v8-particles';
        Object.assign(canvas.style, {
            position: 'fixed', top: 0, left: 0,
            width: '100%', height: '100%',
            zIndex: -1, pointerEvents: 'none'
        });
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = Array.from({ length: 40 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speedX: Math.random() * 0.4 - 0.2,
                speedY: Math.random() * 0.4 - 0.2,
                opacity: Math.random() * 0.4
            }));
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.speedX; p.y += p.speedY;
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(247, 189, 87, ${p.opacity})`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };

        setup(); animate();
        window.addEventListener('resize', setup);
    };

    // 2. Reveal Animations (Anime.js)
    if (typeof anime !== 'undefined') {
        const timeline = anime.timeline({
            easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            duration: 1000
        });

        timeline.add({
            targets: '.v8-bg-glow',
            opacity: [0, 0.6],
            scale: [0.8, 1],
            duration: 2000
        });

        // Scroll Reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.elementor-section, .e-con').forEach(sec => {
            sec.style.opacity = 0;
            observer.observe(sec);
        });
    }

    initParticles();
});
