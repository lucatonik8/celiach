import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- visor: recorre todas las fotos del proyecto ---------- */
const dlg = $<HTMLDialogElement>('.lightbox');
const big = $<HTMLImageElement>('img', dlg);
const lbCount = $('.lb-count', dlg);
let lenis: Lenis | undefined;
let gallery: { src: string; alt: string }[] = [];
let at = 0;
const galleryOf = (look: Element) => {
  const shots = $$<HTMLButtonElement>('.shot', look).map((b) => ({ src: b.dataset.full!, alt: b.querySelector('img')?.alt ?? '' }));
  const extra: string[] = JSON.parse(look.querySelector<HTMLElement>('[data-extra]')?.dataset.extra ?? '[]');
  const title = (look as HTMLElement).dataset.title ?? '';
  return [...shots, ...extra.map((src, i) => ({ src, alt: `${title} — ${shots.length + i + 1}` }))];
};
const show = (i: number) => {
  at = (i + gallery.length) % gallery.length;
  big.src = gallery[at].src;
  big.alt = gallery[at].alt;
  lbCount.textContent = gallery.length > 1 ? `${String(at + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}` : '';
  dlg.classList.toggle('single', gallery.length < 2);
};
const openAt = (scope: Element, src: string | null, index?: number) => {
  gallery = galleryOf(scope);
  show(index ?? Math.max(0, gallery.findIndex((g) => g.src === src)));
  lenis?.stop();
  dlg.showModal();
};
$$<HTMLButtonElement>('.shot').forEach((b) =>
  b.addEventListener('click', () => openAt(b.closest('.look') ?? document.body, b.dataset.full!)),
);
$$<HTMLButtonElement>('.hs-more').forEach((b) =>
  b.addEventListener('click', () => openAt(b.closest('.look')!, null, +b.dataset.at!)),
);
$('.prev', dlg).addEventListener('click', (e) => { e.stopPropagation(); show(at - 1); });
$('.next', dlg).addEventListener('click', (e) => { e.stopPropagation(); show(at + 1); });
big.addEventListener('click', (e) => { e.stopPropagation(); if (gallery.length > 1) show(at + 1); else dlg.close(); });
dlg.addEventListener('click', () => dlg.close());
dlg.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') show(at + 1);
  if (e.key === 'ArrowLeft') show(at - 1);
});
let sx = 0;
dlg.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
dlg.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
});
dlg.addEventListener('close', () => lenis?.start());

/* ---------- videoclips: se cargan solo al pulsar ---------- */
$$<HTMLButtonElement>('.yt').forEach((b) =>
  b.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.id}?autoplay=1&rel=0&playsinline=1`;
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.title = b.getAttribute('aria-label') ?? 'Videoclip';
    b.replaceWith(f);
  }),
);

/* ---------- índice: miniatura que sigue al cursor ---------- */
const peek = $<HTMLImageElement>('.peek');
if (finePointer) {
  let px = 0, py = 0, tx = 0, ty = 0;
  $$<HTMLAnchorElement>('.index a[data-peek]').forEach((a) => {
    a.addEventListener('mouseenter', () => { peek.src = a.dataset.peek!; peek.classList.add('on'); });
    a.addEventListener('mouseleave', () => peek.classList.remove('on'));
  });
  addEventListener('mousemove', (e) => { tx = e.clientX + 24; ty = e.clientY - 80; });
  gsap.ticker.add(() => {
    px += (tx - px) * 0.18; py += (ty - py) * 0.18;
    peek.style.transform = `translate(${px}px, ${py}px) rotate(${(tx - px) * 0.05}deg)`;
  });
}

/* ---------- contador, raíl y progreso ---------- */
const counter = $('.counter');
const rail = $('.rail');
const railLinks = $$<HTMLAnchorElement>('.rail a');
const total = String(railLinks.length).padStart(2, '0');
const setActive = (n: string, title = '') => {
  counter.textContent = n ? `[${n}] / ${total}${title && innerWidth > 900 ? ' — ' + title.toUpperCase() : ''}` : '';
  railLinks.forEach((a) => a.classList.toggle('on', a.dataset.n === n));
};
$$('.look').forEach((el) =>
  ScrollTrigger.create({
    trigger: el,
    start: 'top 50%',
    end: 'bottom 50%',
    onToggle: (s) => s.isActive && setActive(el.dataset.n!, el.dataset.title),
  }),
);
ScrollTrigger.create({ trigger: '#formacion', start: 'top 50%', endTrigger: '#contacto', end: 'top 60%', onToggle: (s) => rail.classList.toggle('on', s.isActive) });
ScrollTrigger.create({ trigger: '#formacion', start: 'bottom 50%', onLeaveBack: () => setActive('') });
ScrollTrigger.create({ trigger: '#contacto', start: 'top 50%', onEnter: () => setActive(''), onLeaveBack: () => {
  const last = $$('.look').at(-1)!; setActive(last.dataset.n!, last.dataset.title);
} });
gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

/* ---------- utilidades de texto ---------- */
const splitChars = (el: HTMLElement) => {
  const text = el.textContent ?? '';
  el.setAttribute('aria-label', text);
  el.innerHTML = '';
  return [...text].map((c) => {
    const s = document.createElement('span');
    s.className = 'ch';
    s.setAttribute('aria-hidden', 'true');
    s.textContent = c;
    el.append(s);
    return s;
  });
};
const splitWords = (el: HTMLElement) => {
  const words = (el.textContent ?? '').trim().split(/\s+/);
  el.innerHTML = '';
  return words.map((w, i) => {
    const s = document.createElement('span');
    s.textContent = w;
    el.append(s, i < words.length - 1 ? ' ' : '');
    return s;
  });
};

if (!reduce) animate();
// Los triggers del contador se crearon antes que los pins: reordenar y recalcular
ScrollTrigger.sort();
ScrollTrigger.refresh();

function animate() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  document.documentElement.classList.add('anim');

  // Scroll suave solo con ratón/trackpad; en móvil se respeta el scroll nativo
  if (finePointer) {
    lenis = new Lenis({ lerp: 0.1, anchors: { offset: -46 } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis!.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const mm = gsap.matchMedia();

  /* ----- PORTADA: el marco de fotos se abre al hacer scroll ----- */
  const hero = $('.hero');
  const frame = $('.frame');
  const fts = $$('.ft').filter((el) => el.offsetParent);
  gsap.from($$('.ft img'), { scale: 0, opacity: 0, rotation: () => gsap.utils.random(-20, 20), duration: 0.9, ease: 'back.out(1.7)', stagger: { each: 0.035, from: 'random' }, delay: 0.15 });
  gsap.from('.hero-c > *', { y: 24, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.5 });

  const heroChars = splitChars($('.hero-s'));
  const vec = (el: HTMLElement, axis: 'x' | 'y') =>
    axis === 'x' ? (el.offsetLeft - frame.offsetWidth / 2) * 1.5 : (el.offsetTop - frame.offsetHeight / 2) * 1.5;
  gsap
    .timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=90%', scrub: 0.7, pin: true, invalidateOnRefresh: true } })
    .to(fts, { x: (_i, el) => vec(el, 'x'), y: (_i, el) => vec(el, 'y'), rotation: () => gsap.utils.random(-30, 30), scale: 1.35, opacity: 0, ease: 'power1.in', stagger: { each: 0.008, from: 'center' } }, 0)
    .to('.firma', { scale: 1.2, y: '-3vh', ease: 'none' }, 0)
    .to('.hero-t', { letterSpacing: () => (innerWidth < 700 ? '0.18em' : '0.4em'), ease: 'none' }, 0)
    .fromTo(heroChars, { opacity: 0 }, { opacity: 1, stagger: 0.02, duration: 0.01, ease: 'none' }, 0.25)
    .to('.down', { opacity: 0, duration: 0.2 }, 0);

  /* ----- titulares: efecto máquina de escribir ----- */
  $$('[data-type]').forEach((el) => {
    if (el.classList.contains('hero-s')) return;
    const chars = splitChars(el);
    gsap.from(chars, { opacity: 0, duration: 0.01, stagger: 0.03, ease: 'none', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  /* ----- índice ----- */
  gsap.from('.index li', { yPercent: 100, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.04, scrollTrigger: { trigger: '.index', start: 'top 85%' } });
  mm.add('(min-width: 701px)', () => {
    gsap.fromTo('.vert', { yPercent: 12 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.indice', scrub: true } });
  });

  /* ----- formación ----- */
  const words = splitWords($('[data-words]'));
  gsap.fromTo(words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '[data-words]', start: 'top 82%', end: 'bottom 45%', scrub: true } });
  $$('[data-rise]').forEach((el, i) =>
    gsap.from(el, { y: 60, opacity: 0, duration: 0.9, delay: (i % 2) * 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }),
  );
  $$('[data-rows]').forEach((dl) =>
    gsap.from(dl.children, { opacity: 0, x: -14, duration: 0.5, stagger: 0.04, ease: 'power2.out', scrollTrigger: { trigger: dl, start: 'top 88%' } }),
  );

  /* ----- proyectos ----- */
  $$('.look').forEach((look) => {
    gsap.fromTo($('.look-num', look), { yPercent: 35 }, { yPercent: -45, ease: 'none', scrollTrigger: { trigger: look, scrub: true } });
  });

  const scrub = (el: Element, start = 'top bottom', end = 'center center') => ({ trigger: el, start, end, scrub: 0.6 });

  $$('[data-anim="reveal"]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'none', scrollTrigger: scrub(el, 'top 95%', 'top 35%') });
    gsap.fromTo($('img', el), { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: scrub(el, 'top bottom', 'bottom top') });
  });
  $$('[data-anim="tone"]').forEach((el, i) => {
    gsap.fromTo($('img', el), { filter: 'grayscale(1) contrast(1.15)' }, { filter: 'grayscale(0) contrast(1)', ease: 'none', scrollTrigger: scrub(el, 'top 85%', 'top 30%') });
    gsap.from(el, { y: 40 + (i % 3) * 25, opacity: 0, ease: 'none', scrollTrigger: scrub(el, 'top bottom', 'top 70%') });
  });
  // Ficha de inventario: se queda fija mientras se rellena a mano, se revela la
  // polaroid, cae la segunda foto encima y se sella. Ocupa unas 2,5 pantallas.
  $$('.card-wrap').forEach((wrap) => {
    const stage = $('.card-stage', wrap);
    const card = $('.card', wrap);
    const p2 = wrap.querySelector<HTMLElement>('.p2');
    const fit = () => {
      gsap.set(card, { scale: 1 });
      gsap.set(card, { scale: Math.min(1, (stage.clientHeight - 16) / card.offsetHeight) });
    };
    fit();
    ScrollTrigger.addEventListener('refreshInit', fit);
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: wrap, start: 'top 85%', end: 'bottom bottom', scrub: 0.6 } });
    tl.fromTo(card, { y: '55vh', rotation: -9 }, { y: 0, rotation: 1.2, duration: 1 })
      .fromTo($$('.hand', card), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, stagger: 0.3 }, 0.8)
      .fromTo($('.polaroid img', card), { filter: 'brightness(2.2) sepia(0.7) blur(8px)' }, { filter: 'brightness(1) sepia(0) blur(0px)', duration: 1.1 }, '+=0.1');
    if (p2) tl.fromTo(p2, { y: '90vh', rotation: 28 }, { y: 0, rotation: 6, duration: 1 }, '+=0.1');
    tl.fromTo($('.stamp', card), { scale: 2.6, opacity: 0, rotation: -30 }, { scale: 1, opacity: 0.85, rotation: -12, duration: 0.3, ease: 'power2.in' }, '+=0.1')
      .to({}, { duration: 0.6 });
  });
  $$('[data-anim="flip"]').forEach((el) => {
    gsap.fromTo(el, { rotation: 180 }, { rotation: 0, ease: 'none', scrollTrigger: scrub(el, 'top bottom', 'center 55%') });
  });
  $$('[data-anim="zoom"]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(12% 18% 12% 18%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: scrub(el, 'top bottom', 'top 25%') });
    gsap.fromTo($('img', el), { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: scrub(el, 'top bottom', 'bottom top') });
  });
  $$('[data-anim="expand"]').forEach((el) => {
    gsap.fromTo(el, { scale: 0.62, rotation: -2 }, { scale: 1, rotation: 0, ease: 'none', scrollTrigger: scrub(el, 'top bottom', 'center 55%') });
  });

  // Galería que avanza en horizontal con el scroll vertical (solo escritorio)
  mm.add('(min-width: 900px)', () => {
    $$('.hs').forEach((hs) => {
      const track = $('.hs-track', hs);
      const dist = () => track.scrollWidth - hs.clientWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: hs, start: 'top top', end: () => '+=' + dist() * 0.75, pin: true, scrub: 0.6, invalidateOnRefresh: true } });
      $$('.hs-item', hs).forEach((it) =>
        gsap.fromTo($('img', it), { scale: 1.18, filter: 'grayscale(1)' }, { scale: 1, filter: 'grayscale(0)', ease: 'none', scrollTrigger: { trigger: it, containerAnimation: tween, start: 'left right', end: 'center 60%', scrub: true } }),
      );
    });
  });
  // Parallax por columnas (en móvil también la galería horizontal pasa a columnas)
  mm.add('(max-width: 899px)', () => {
    $$('.hs [data-speed]').forEach((el) => {
      gsap.fromTo(el, { yPercent: 0 }, { yPercent: -100 * +el.dataset.speed!, ease: 'none', scrollTrigger: { trigger: el, scrub: true } });
    });
  });
  $$('.cols [data-speed], .duo [data-speed]').forEach((el) => {
    gsap.fromTo(el, { yPercent: 0 }, { yPercent: -100 * +el.dataset.speed!, ease: 'none', scrollTrigger: { trigger: el, scrub: true } });
  });

  /* ----- marquee de prendas: acelera y cambia de sentido con el scroll ----- */
  $$('.mq-track').forEach((track) => {
    const tw = gsap.to(track, { xPercent: -50, repeat: -1, duration: 28, ease: 'none' });
    tw.totalTime(tw.duration() * 50);
    let dir = 1, boost = 0;
    ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (s) => (s.isActive ? tw.play() : tw.pause()),
      onUpdate: (s) => { dir = s.direction; boost = Math.min(6, Math.abs(s.getVelocity()) / 250); },
    });
    gsap.ticker.add(() => {
      boost *= 0.92;
      tw.timeScale(tw.timeScale() + (dir * (1 + boost) - tw.timeScale()) * 0.1);
    });
  });

  /* ----- GRACIAS ----- */
  gsap.fromTo('.gracias span', { yPercent: 110, rotation: 12 }, { yPercent: 0, rotation: 0, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top 85%', end: 'top 30%', scrub: 0.6 } });

  // Recalcular cuando cargan las imágenes perezosas (cambian alturas)
  let t: number | undefined;
  $$<HTMLImageElement>('main img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', () => { clearTimeout(t); t = window.setTimeout(() => ScrollTrigger.refresh(), 200); }, { once: true });
  });
}
