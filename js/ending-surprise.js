/* ==========================================================================
   ENDING EMOTIONAL SURPRISE & HIDDEN COLLAGE MODAL CONTROLLER
   Cinematic Birthday Surprise Website
   ========================================================================== */

class EndingSurpriseController {
  constructor() {
    this.overlay = document.getElementById('ending-dark-overlay');
    this.textBox = document.getElementById('ending-text-box');
    this.canvas = document.getElementById('ending-heart-canvas');
    this.hiddenBtn = document.getElementById('hidden-surprise-trigger-btn');
    this.hiddenModal = document.getElementById('hidden-surprise-modal');
    this.hiddenModalClose = document.getElementById('hidden-surprise-close');

    this.endingLines = (window.SITE_CONFIG && window.SITE_CONFIG.endingSurpriseLines) || [
      "A year ago, we were strangers.",
      "Today, you're someone I trust more than almost anyone.",
      "Thank you for standing beside me during every happy moment and every difficult day.",
      "Happy Birthday, my best friend ❤️"
    ];

    this.initEvents();
  }

  triggerFinalSurprise() {
    if (!this.overlay || !this.textBox) return;

    // Lock body scroll
    document.body.classList.add('scroll-locked');

    // Fade overlay to dark black
    this.overlay.classList.add('active');

    // Render lines into container
    this.textBox.innerHTML = '';
    this.endingLines.forEach((line, idx) => {
      const p = document.createElement('div');
      p.className = 'ending-line';
      if (idx === this.endingLines.length - 1) {
        p.classList.add('highlight-ending');
      }
      p.innerText = line;
      this.textBox.appendChild(p);
    });

    // Reveal lines sequentially
    const lineElements = this.textBox.querySelectorAll('.ending-line');
    lineElements.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 1500 + idx * 2200);
    });

    // Spawn Heart Particle Explosion
    setTimeout(() => {
      this.spawnHeartExplosion();
    }, 1500 + lineElements.length * 2200);

    // Reveal "One Last Surprise ❤️" Hidden Button
    setTimeout(() => {
      if (this.hiddenBtn) {
        this.hiddenBtn.classList.add('visible');
      }
    }, 1500 + lineElements.length * 2200 + 1200);
  }

  spawnHeartExplosion() {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    let width = (this.canvas.width = window.innerWidth);
    let height = (this.canvas.height = window.innerHeight);

    const hearts = [];
    const count = 70;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      hearts.push({
        x: width / 2,
        y: height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
        size: Math.random() * 20 + 14,
        color: Math.random() > 0.4 ? '#FF5E97' : '#F7D070'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let alive = false;
      hearts.forEach(h => {
        h.x += h.vx;
        h.y += h.vy;
        h.alpha -= h.decay;
        if (h.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = h.alpha;
          ctx.fillStyle = h.color;
          ctx.font = `${h.size}px sans-serif`;
          ctx.fillText('❤️', h.x, h.y);
          ctx.restore();
        }
      });
      if (alive) requestAnimationFrame(render);
    };
    render();

    // Trigger confetti burst as well
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF5E97', '#F7D070', '#7A31F7']
      });
    }
  }

  initEvents() {
    if (this.hiddenBtn) {
      this.hiddenBtn.addEventListener('click', () => {
        if (this.hiddenModal) this.hiddenModal.classList.add('active');
      });
    }
    if (this.hiddenModalClose) {
      this.hiddenModalClose.addEventListener('click', () => {
        if (this.hiddenModal) this.hiddenModal.classList.remove('active');
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.endingSurpriseController = new EndingSurpriseController();
});
