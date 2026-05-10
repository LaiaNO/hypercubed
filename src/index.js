// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  ring.style.left   = rx + 'px';
  ring.style.top    = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width    = '16px';
    cursor.style.height   = '16px';
    ring.style.width      = '54px';
    ring.style.height     = '54px';
    ring.style.borderColor = 'var(--teal)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width    = '10px';
    cursor.style.height   = '10px';
    ring.style.width      = '38px';
    ring.style.height     = '38px';
    ring.style.borderColor = 'var(--blue)';
  });
});

// ── CAROUSEL ──
const track    = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const slides   = track ? Array.from(track.querySelectorAll('.carousel-slide')) : [];
let current    = 0;

function setSlideWidths() {
  const w = track.parentElement.offsetWidth;
  slides.forEach(s => s.style.width = w + 'px');
}

function buildDots() {
  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
}

function goTo(i) {
  current = Math.max(0, Math.min(i, slides.length - 1));
  const w = track.parentElement.offsetWidth;
  track.style.transform = `translateX(-${current * w}px)`;
  dotsWrap.querySelectorAll('.carousel-dot').forEach((d, idx) =>
    d.classList.toggle('active', idx === current)
  );
}

document.getElementById('carouselPrev')?.addEventListener('click', () => goTo(current - 1));
document.getElementById('carouselNext')?.addEventListener('click', () => goTo(current + 1));

window.addEventListener('resize', () => { setSlideWidths(); goTo(current); });

if (slides.length) {
  setSlideWidths();
  buildDots();
}

// Pills → carousel
document.querySelectorAll('.hero-pill[data-slide]').forEach(pill => {
  pill.addEventListener('click', e => {
    const index = parseInt(pill.getAttribute('data-slide'));
    goTo(index);
  });
});

// Mobile nav
const hamburger = document.getElementById('navHamburger');
const navMobile = document.getElementById('navMobile');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile.classList.toggle('open');
});

// Close when a link is clicked
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMobile.classList.remove('open');
  });
});