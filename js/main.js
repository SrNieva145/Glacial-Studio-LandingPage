// ── Cursor personalizado ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '56px';
    ring.style.height = '56px';
    ring.style.borderColor = 'rgba(91,200,245,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(91,200,245,0.4)';
  });
});

// ── Typewriter ──
const phrases = [
  'Narrativa indie en español.',
  'Horror atmosférico y pixel art.',
  'Mundos que no deberían existir.',
];
const target = document.getElementById('typewriter-text');
let pi = 0, ci = 0, deleting = false, wait = 0;

function typeStep() {
  const phrase = phrases[pi];
  if (!deleting) {
    target.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; wait = 60; }
  } else {
    if (wait-- > 0) { setTimeout(typeStep, 30); return; }
    target.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeStep, deleting ? 40 : 70);
}
setTimeout(typeStep, 1200);

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
