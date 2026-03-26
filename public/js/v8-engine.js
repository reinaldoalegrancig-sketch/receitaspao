/**
 * V8 ANIMATION & STABILITY ENGINE - 13 SKILLS EDITION
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Particle System (Golden Dust) - [Skill: canvas-design]
    const initParticles = () => {
        const canvas = document.getElementById('v8-particles') || document.createElement('canvas');
        if (!canvas.id) {
            canvas.id = 'v8-particles';
            Object.assign(canvas.style, {
                position: 'fixed', top: 0, left: 0,
                width: '100%', height: '100%',
                zIndex: -1, pointerEvents: 'none'
            });
            document.body.appendChild(canvas);
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // High performance density - [Skill: fixing-motion-performance]
            const isMobile = window.innerWidth < 768;
            const particleCount = isMobile ? 10 : 30; // Further reduction for better performance
            
            particles = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: Math.random() * (isMobile ? 0.3 : 0.5) - 0.25,
                speedY: Math.random() * (isMobile ? 0.3 : 0.5) - 0.25,
                opacity: Math.random() * 0.5,
                color: Math.random() > 0.5 ? '#F7BD57' : '#FFFFFF'
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
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };

        setup(); animate();
        window.addEventListener('resize', setup);
    };

    // 2. Advanced Reveals - [Skills: magic-animator, animejs-animation]
    const initReveals = () => {
        if (typeof anime === 'undefined') {
            console.warn('Anime.js not loaded. Falling back to CSS transitions.');
            document.querySelectorAll('.v8-reveal').forEach(el => el.style.opacity = 1);
            return;
        }

        // Staggered List Animations - [Skill: design-spells]
        const animateList = (container) => {
            const items = container.querySelectorAll('.elementor-icon-list-item, .v8-focus-item');
            anime({
                targets: items,
                opacity: [0, 1],
                translateX: [-20, 0],
                delay: anime.stagger(100),
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                duration: 800
            });
        };

        // Scroll Observer - [Skill: web-design-guidelines]
        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    
                    // Specific Logic per Skill Class
                    if (el.classList.contains('elementor-icon-list-items')) {
                        animateList(el);
                    } else {
                        anime({
                            targets: el,
                            opacity: [0, 1],
                            translateY: el.classList.contains('v8-reveal-up') ? [40, 0] : [0, 0],
                            translateX: el.classList.contains('v8-reveal-left') ? [40, 0] : (el.classList.contains('v8-reveal-right') ? [-40, 0] : [0, 0]),
                            scale: el.classList.contains('v8-z-depth') ? [0.95, 1] : [1, 1],
                            duration: 800,
                            easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                        });
                    }
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        // Auto-assign reveals to main containers if no specific classes exist
        const sections = document.querySelectorAll('.elementor-section, .e-con, .v8-reveal, .elementor-icon-list-items');
        sections.forEach(sec => {
            if (!sec.classList.contains('v8-no-reveal')) {
                sec.style.opacity = 0;
                observer.observe(sec);
            }
        });
    };

    // 3. UX Micro-interactions - [Skill: ui-ux-pro-max, radix-ui-design-system]
    const initInteractions = () => {
        // Button Spell Physics
        document.querySelectorAll('.elementor-button, .eael-creative-button').forEach(btn => {
            btn.classList.add('v8-button-spell', 'v8-accessible-focus');
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: 1.05,
                    duration: 400,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    };

    // ============================================================
    //  V9 ELEVATION — novas funções
    // ============================================================

    // 4. SCROLL PROGRESS BAR — (Skill: ui-ux-pro-max)
    const initScrollProgress = () => {
        const bar = document.createElement('div');
        bar.id = 'v8-scroll-progress';
        document.body.appendChild(bar);

        const update = () => {
            const scrolled = window.scrollY;
            const total = document.body.scrollHeight - window.innerHeight;
            bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
        };

        window.addEventListener('scroll', update, { passive: true });
        update();
    };

    // 5. HERO TIMELINE — (Skills: magic-animator, animejs-animation)
    const initHeroTimeline = () => {
        if (typeof anime === 'undefined') return;

        // Marcar os elementos do hero com classes
        const heroSection = document.querySelector('.elementor-element-888cf2e, [id="elementor-section-bg-overlay"]');
        if (!heroSection) return;

        const name  = heroSection.querySelector('.elementor-element-b27d778');
        const title = heroSection.querySelector('.elementor-element-d862252');
        const sub   = heroSection.querySelector('.elementor-element-68b51f4');
        const cta   = heroSection.querySelector('.elementor-button');

        [name, title, sub].forEach((el, i) => {
            if (!el) return;
            const cls = ['v8-hero-name', 'v8-hero-title', 'v8-hero-sub'][i];
            el.classList.add(cls);
        });

        const tl = anime.timeline({ easing: 'cubicBezier(0.16, 1, 0.3, 1)' });

        if (name) tl.add({ targets: name, opacity: [0, 1], translateY: [-20, 0], duration: 700 }, 100);
        if (title) tl.add({ targets: title, opacity: [0, 1], translateY: [30, 0], duration: 800 }, 350);
        if (sub)   tl.add({ targets: sub,   opacity: [0, 1], translateY: [20, 0], duration: 700 }, 600);
        if (cta)   tl.add({
            targets: cta,
            opacity: [0, 1],
            translateY: [15, 0],
            scale: [0.95, 1],
            duration: 600
        }, 850);
    };

    // 6. CARD REVEALS com scale — (Skill: magic-animator)
    const initCardReveals = () => {
        if (typeof anime === 'undefined') return;

        const cards = document.querySelectorAll(
            '.elementor-widget-image-box, .elementor-widget-icon-box, .elementor-widget-testimonial'
        );

        cards.forEach(card => card.classList.add('v8-card-reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    scale: [0.95, 1],
                    duration: 700,
                    easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                });
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        cards.forEach(card => observer.observe(card));
    };

    initParticles();
    initReveals();
    initInteractions();
    initScrollProgress();
    initHeroTimeline();
    initCardReveals();

    console.log('V9 Engine: 10 Skills Elevation Active.');
});
