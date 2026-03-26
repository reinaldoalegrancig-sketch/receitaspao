/**
 * V11 ENGINE — 13 Skills Edition
 * canvas-design | magic-animator | animejs-animation | design-spells
 * fixing-motion-performance | web-accessibility | data-storytelling
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  // ── 1. PARTICLES — canvas-design ─────────────────────────────
  const initParticles = () => {
    const canvas = document.getElementById('v8-particles') || document.createElement('canvas');
    if (!canvas.id) {
      canvas.id = 'v8-particles';
      Object.assign(canvas.style, {
        position:'fixed', top:0, left:0,
        width:'100%', height:'100%',
        zIndex:-1, pointerEvents:'none'
      });
      document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    let particles = [];

    const setup = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = isMobile ? 12 : 35;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.4,
        sx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.45),
        sy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.45),
        opacity: Math.random() * 0.55,
        color: Math.random() > 0.5 ? '#F7BD57' : '#FFFFFF'
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.sx; p.y += p.sy;
        if (p.x < 0 || p.x > canvas.width)  p.sx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.sy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    setup();
    if (!prefersReduced) animate();
    window.addEventListener('resize', setup);
  };

  // ── 2. SCROLL PROGRESS BAR — ui-ux-pro-max ───────────────────
  const initScrollProgress = () => {
    const bar = document.createElement('div');
    bar.id = 'v8-scroll-progress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  };

  // ── 3. SCROLL REVEALS — magic-animator ───────────────────────
  const initReveals = () => {
    if (typeof anime === 'undefined' || prefersReduced) {
      document.querySelectorAll('.v8-reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }

    const opts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        if (el.classList.contains('elementor-icon-list-items')) {
          anime({
            targets: el.querySelectorAll('.elementor-icon-list-item'),
            opacity: [0, 1], translateX: [-20, 0],
            delay: anime.stagger(80),
            easing: 'cubicBezier(0.16,1,0.3,1)', duration: 700
          });
        } else {
          const tx = el.classList.contains('v8-reveal-left') ? [45, 0]
                   : el.classList.contains('v8-reveal-right') ? [-45, 0] : [0, 0];
          const ty = el.classList.contains('v8-reveal-up') ? [40, 0] : [0, 0];
          anime({
            targets: el,
            opacity: [0, 1], translateX: tx, translateY: ty,
            easing: 'cubicBezier(0.16,1,0.3,1)', duration: 750
          });
        }
        observer.unobserve(el);
      });
    }, opts);

    document.querySelectorAll('.v8-reveal, .v8-reveal-up, .v8-reveal-left, .v8-reveal-right, .elementor-icon-list-items')
      .forEach(el => { if (!el.classList.contains('v8-no-reveal')) observer.observe(el); });
  };

  // ── 4. HERO TIMELINE — animejs-animation ─────────────────────
  const initHeroTimeline = () => {
    if (typeof anime === 'undefined' || prefersReduced) return;
    const hero = document.querySelector('.elementor-element-888cf2e, #elementor-section-bg-overlay');
    if (!hero) return;

    const name  = hero.querySelector('.elementor-element-b27d778');
    const title = hero.querySelector('.elementor-element-d862252');
    const sub   = hero.querySelector('.elementor-element-68b51f4');

    [name, title, sub].forEach(el => { if (el) { el.style.opacity = '0'; } });

    const tl = anime.timeline({ easing: 'cubicBezier(0.16,1,0.3,1)' });
    if (name)  tl.add({ targets: name,  opacity: [0,1], translateY: [-18,0], duration: 650 }, 120);
    if (title) tl.add({ targets: title, opacity: [0,1], translateY: [28,0],  duration: 750 }, 340);
    if (sub)   tl.add({ targets: sub,   opacity: [0,1], translateY: [20,0],  duration: 650 }, 600);
  };

  // ── 5. BUTTON MICRO-INTERACTIONS — design-spells ─────────────
  const initButtons = () => {
    if (typeof anime === 'undefined' || prefersReduced) return;
    document.querySelectorAll('.elementor-button, .eael-creative-button').forEach(btn => {
      btn.classList.add('v8-accessible-focus');
      btn.addEventListener('mouseenter', () => {
        anime({ targets: btn, scale: 1.06, duration: 380, easing: 'easeOutElastic(1,.65)' });
      });
      btn.addEventListener('mouseleave', () => {
        anime({ targets: btn, scale: 1, duration: 300, easing: 'easeOutQuad' });
      });
    });
  };

  // ── 6. BONUS CARDS STAGGER — magic-animator ──────────────────
  const initBonusStagger = () => {
    if (typeof anime === 'undefined' || prefersReduced) return;
    const cards = [
      '.elementor-element-1e5177b', '.elementor-element-713b2ae',
      '.elementor-element-8f2d0d4', '.elementor-element-e52bee4',
      '.elementor-element-e9328d9', '.elementor-element-ca8cff5'
    ].map(s => document.querySelector(s)).filter(Boolean);

    if (!cards.length) return;

    cards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(30px) scale(0.94)'; });

    const obs = new IntersectionObserver((entries) => {
      if (!entries.some(e => e.isIntersecting)) return;
      anime({
        targets: cards,
        opacity: [0, 1], translateY: [30, 0], scale: [0.94, 1],
        delay: anime.stagger(110), duration: 800,
        easing: 'cubicBezier(0.16,1,0.3,1)'
      });
      obs.disconnect();
    }, { threshold: 0.08 });

    obs.observe(cards[0]);
  };

  // ── 7. "GRÁTIS" GLOW — design-spells ─────────────────────────
  const initGratis = () => {
    document.querySelectorAll('.elementor-heading-title').forEach(el => {
      if ((el.textContent.includes('GRÁTIS') || el.textContent.includes('GRATIS')) && !el.dataset.g) {
        el.dataset.g = '1';
        el.innerHTML = el.innerHTML.replace(/GRÁTIS|GRATIS/g, '<span class="v8-gratis">$&</span>');
      }
    });
  };

  // ── 8. PRICE SCALE ENTRANCE — data-storytelling ──────────────
  const initPriceReveal = () => {
    if (typeof anime === 'undefined' || prefersReduced) return;
    const price = document.querySelector('.elementor-element-800304f .elementor-heading-title');
    if (!price) return;
    price.style.opacity = '0';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        anime({ targets: price, opacity: [0,1], scale: [0.7, 1], duration: 800, easing: 'easeOutElastic(1,.6)' });
        obs.unobserve(price);
      });
    }, { threshold: 0.5 });
    obs.observe(price);
  };

  // ── 9. FLOATING CTA ENTRANCE — design-spells ─────────────────
  const initFloatingCTA = () => {
    if (typeof anime === 'undefined' || prefersReduced) return;
    const cta = document.getElementById('purchase-container');
    if (!cta) return;
    cta.style.opacity = '0';
    cta.style.transform = 'translateX(100px)';
    anime({
      targets: cta, translateX: [100, 0], opacity: [0, 1],
      duration: 900, delay: 2800, easing: 'cubicBezier(0.16,1,0.3,1)'
    });
  };

  // ── INIT ──────────────────────────────────────────────────────
  initParticles();
  initScrollProgress();
  initReveals();
  initHeroTimeline();
  initButtons();
  initBonusStagger();
  initGratis();
  initPriceReveal();
  initFloatingCTA();

  console.log('%cV11 ENGINE ✦ 13 Skills Active', 'color:#F7BD57;font-weight:bold;font-size:14px');
});
