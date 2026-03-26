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

    // ============================================================
    //  V10 ADVANCED — melhorias por seção
    // ============================================================

    // V10.1 — BONUS CARDS STAGGER (Skill: magic-animator)
    const initBonusStagger = () => {
        if (typeof anime === 'undefined') return;
        const bonusIds = [
            'elementor-element-1e5177b', 'elementor-element-713b2ae',
            'elementor-element-8f2d0d4', 'elementor-element-e52bee4',
            'elementor-element-e9328d9', 'elementor-element-ca8cff5'
        ];
        const cards = bonusIds.map(id => document.querySelector('.' + id)).filter(Boolean);
        if (!cards.length) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries.some(e => e.isIntersecting)) {
                anime({
                    targets: cards,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    scale: [0.92, 1],
                    delay: anime.stagger(120),
                    duration: 800,
                    easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                });
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (cards[0]) observer.observe(cards[0]);
    };

    // V10.2 — PROGRESS BAR ANIMADA (Skill: magic-animator)
    const initProgressBar = () => {
        const bar = document.querySelector('.elementor-element-4822645 .elementor-progress-bar');
        if (!bar) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                // Anima para 87%
                setTimeout(() => { bar.style.width = '87%'; }, 100);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });

        observer.observe(bar.closest('.elementor-progress-wrapper') || bar);
    };

    // V10.3 — "GRÁTIS" GLOW (Skill: design-spells)
    const initGratisGlow = () => {
        document.querySelectorAll('.elementor-heading-title').forEach(el => {
            if (el.textContent.includes('GRÁTIS') || el.textContent.includes('GRATIS')) {
                // Wrap "GRÁTIS" em span com classe
                el.innerHTML = el.innerHTML.replace(
                    /GRÁTIS|GRATIS/g,
                    '<span class="v8-gratis">$&</span>'
                );
            }
        });
    };

    // V10.4 — SEÇÃO DE PREÇO: strikethrough + price scale (Skill: landing-page-generator)
    const initPricingReveal = () => {
        if (typeof anime === 'undefined') return;
        const oferta = document.getElementById('oferta') || document.querySelector('.elementor-element-494fd4b');
        const priceEl = document.querySelector('.elementor-element-800304f .elementor-heading-title');
        const strikeSection = document.querySelector('.elementor-element-622d68d');

        if (!oferta) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                // Anima o preço principal
                if (priceEl) {
                    anime({
                        targets: priceEl,
                        opacity: [0, 1],
                        scale: [0.75, 1],
                        duration: 900,
                        easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                    });
                }

                // Ativa strikethrough
                if (strikeSection) {
                    setTimeout(() => strikeSection.closest('.elementor') && document.body.classList.add('v8-strike-active'), 400);
                }

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        observer.observe(oferta);
    };

    // V10.5 — SEÇÕES SEM REVEAL (Skill: magic-animator)
    const initMissingSectionReveals = () => {
        if (typeof anime === 'undefined') return;

        const sections = [
            { id: 'elementor-element-494fd4b', dir: 'up' },
            { id: 'elementor-element-82969c9', dir: 'up' },
            { id: 'elementor-element-8d816a6', dir: 'left' },
            { id: 'elementor-element-ce211ee', dir: 'up' },
            { id: 'elementor-element-e4dd371', dir: 'up' },
        ];

        sections.forEach(({ id, dir }) => {
            const el = document.querySelector('.' + id);
            if (!el) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    anime({
                        targets: el,
                        opacity: [0, 1],
                        translateY: dir === 'up' ? [30, 0] : [0, 0],
                        translateX: dir === 'left' ? [40, 0] : [0, 0],
                        duration: 800,
                        easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                    });
                    observer.unobserve(el);
                });
            }, { threshold: 0.1 });

            observer.observe(el);
        });

        // Payment methods — stagger nos 3 cards
        const paymentCards = document.querySelectorAll(
            '.elementor-element-075568e, .elementor-element-ed23bf8, .elementor-element-7856ea8'
        );
        if (paymentCards.length) {
            const observer = new IntersectionObserver((entries) => {
                if (entries.some(e => e.isIntersecting)) {
                    anime({
                        targets: paymentCards,
                        opacity: [0, 1],
                        translateY: [25, 0],
                        delay: anime.stagger(150),
                        duration: 700,
                        easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                    });
                    observer.disconnect();
                }
            }, { threshold: 0.1 });
            observer.observe(paymentCards[0]);
        }
    };

    // V10.6 — COUNT-UP NOS NÚMEROS CHAVE (Skill: data-storytelling)
    const initCountUp = () => {
        const countUp = (el, target, duration, prefix, suffix) => {
            const start = performance.now();
            const update = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Easing: easeOut cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.round(eased * target);
                el.textContent = prefix + value + suffix;
                if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
        };

        // Encontrar "200+" no texto
        document.querySelectorAll('.elementor-widget-text-editor p, .elementor-heading-title').forEach(el => {
            const text = el.textContent;
            if (text.includes('200+') && !el.dataset.v10counted) {
                el.dataset.v10counted = '1';
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) return;
                        // Só anima strong tags que contêm "200+"
                        el.querySelectorAll('strong').forEach(strong => {
                            if (strong.textContent.includes('200+')) {
                                const span = document.createElement('span');
                                span.className = 'v8-counter';
                                span.textContent = '200+';
                                strong.replaceChild(span, strong.firstChild);
                                countUp(span, 200, 1200, '', '+');
                            }
                        });
                        observer.unobserve(el);
                    });
                }, { threshold: 0.5 });
                observer.observe(el);
            }
        });
    };

    // V10.7 — FLOATING CTA ENTRADA (Skill: design-spells)
    const initFloatingCTA = () => {
        if (typeof anime === 'undefined') return;
        const cta = document.getElementById('purchase-container');
        if (!cta) return;
        // Entrada inicial da direita
        anime({
            targets: cta,
            translateX: [120, 0],
            opacity: [0, 1],
            duration: 900,
            delay: 2000,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)'
        });
    };

    initParticles();
    initReveals();
    initInteractions();
    initScrollProgress();
    initHeroTimeline();
    initCardReveals();

    // V10
    initBonusStagger();
    initProgressBar();
    initGratisGlow();
    initPricingReveal();
    initMissingSectionReveals();
    initCountUp();
    initFloatingCTA();

    console.log('V10 Engine: 17 Skills Active.');
});
