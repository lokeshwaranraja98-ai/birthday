/* ==========================================================================
   CUSTOM CURSOR & INTERACTIVE SPARKLE TRAIL
   Cinematic Birthday Surprise Website
   ========================================================================== */

class CustomCursor {
  constructor() {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    this.dot = document.getElementById('custom-cursor-dot');
    this.ring = document.getElementById('custom-cursor-ring');
    this.canvas = document.getElementById('cursor-sparkle-canvas');
    if (!this.dot || !this.ring || !this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.sparkles = [];

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };

    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.dot.style.left = `${this.mouse.x}px`;
      this.dot.style.top = `${this.mouse.y}px`;

      this.addSparkle(this.mouse.x, this.mouse.y);
    });

    window.addEventListener('click', (e) => {
      this.spawnClickHearts(e.clientX, e.clientY);
      this.spawnClickRipple(e.clientX, e.clientY);
    });

    // Hover effect on interactive elements
    const hoverSelectors = 'a, button, .glass-card, .gallery-item, .gift-box-wrapper, .envelope-wrapper, input';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelectors)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelectors)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addSparkle(x, y) {
    if (Math.random() < 0.4) return;
    this.sparkles.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      size: Math.random() * 3 + 1,
      alpha: 1,
      vx: (Math.random() - 0.5) * 0.8,
      vy: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.5 ? '#F7D070' : '#FF5E97'
    });
  }

  spawnClickHearts(x, y) {
    const hearts = ['💖', '✨', '🌸', '⭐'];
    for (let i = 0; i < 8; i++) {
      const heartEl = document.createElement('div');
      heartEl.className = 'click-heart';
      heartEl.innerText = hearts[Math.floor(Math.random() * hearts.length)];
      heartEl.style.position = 'fixed';
      heartEl.style.left = `${x}px`;
      heartEl.style.top = `${y}px`;
      heartEl.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
      heartEl.style.pointerEvents = 'none';
      heartEl.style.zIndex = '9999';
      heartEl.style.setProperty('--dx', `${(Math.random() - 0.5) * 120}px`);
      heartEl.style.setProperty('--rot', `${(Math.random() - 0.5) * 60}deg`);
      heartEl.style.animation = 'clickHeartRise 0.9s ease-out forwards';

      document.body.appendChild(heartEl);
      setTimeout(() => heartEl.remove(), 900);
    }
  }

  spawnClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.borderRadius = '50%';
    ripple.style.border = '2px solid var(--gold-primary)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9998';
    ripple.style.animation = 'clickRipple 0.6s ease-out forwards';

    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  animate() {
    // Smooth lagging ring follow
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.18;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.18;
    this.ring.style.left = `${this.ringPos.x}px`;
    this.ring.style.top = `${this.ringPos.y}px`;

    // Render Canvas Sparkles
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      let s = this.sparkles[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.025;

      if (s.alpha <= 0) {
        this.sparkles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      this.ctx.fillStyle = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.customCursor = new CustomCursor();
});
