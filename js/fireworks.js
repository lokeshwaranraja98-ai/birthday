/* ==========================================================================
   CANVAS FIREWORKS FINALE CONTROLLER
   Cinematic Birthday Surprise Website
   ========================================================================== */

class FireworksController {
  constructor() {
    this.canvas = document.getElementById('fireworks-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.fireworks = [];
    this.particles = [];
    this.colors = ['#F7D070', '#FF5E97', '#00F2FE', '#7A31F7', '#FFFFFF', '#FFE5A3'];

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.initScrollTrigger();
    this.initRestartButton();
    this.animate();
  }

  resizeCanvas() {
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth || window.innerWidth;
    this.height = this.canvas.height = this.canvas.parentElement.clientHeight || window.innerHeight;
  }

  createFirework(targetX, targetY) {
    const startX = this.width / 2 + (Math.random() - 0.5) * (this.width * 0.6);
    const startY = this.height;

    this.fireworks.push({
      x: startX,
      y: startY,
      targetX: targetX || Math.random() * (this.width * 0.8) + this.width * 0.1,
      targetY: targetY || Math.random() * (this.height * 0.4) + 80,
      speed: Math.random() * 3 + 5,
      angle: Math.atan2((targetY || 100) - startY, (targetX || startX) - startX),
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    });
  }

  explode(x, y, color) {
    const count = 60;
    const isSpecialGlyph = Math.random() > 0.5;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i;
      const speed = Math.random() * 6 + 2;

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        color: color,
        glyph: isSpecialGlyph ? (Math.random() > 0.5 ? '♥' : '★') : null,
        size: Math.random() * 3 + 2
      });
    }

    // Screen Shake & Flash on major bursts
    if (Math.random() > 0.6) {
      document.body.style.transform = 'translate(2px, -2px)';
      setTimeout(() => document.body.style.transform = 'none', 50);
    }
  }

  draw() {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'lighter';

    // Update & Draw Rockets
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      let f = this.fireworks[i];
      f.x += Math.cos(f.angle) * f.speed;
      f.y += Math.sin(f.angle) * f.speed;

      this.ctx.fillStyle = f.color;
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Distance check to target
      let dist = Math.hypot(f.targetX - f.x, f.targetY - f.y);
      if (dist < 10 || f.y <= f.targetY) {
        this.explode(f.x, f.y, f.color);
        this.fireworks.splice(i, 1);
      }
    }

    // Update & Draw Sparks / Glyphs
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // gravity
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;

      if (p.glyph) {
        this.ctx.font = '14px sans-serif';
        this.ctx.fillText(p.glyph, p.x, p.y);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  initScrollTrigger() {
    if (typeof ScrollTrigger === 'undefined') return;

    ScrollTrigger.create({
      trigger: '#fireworks',
      start: 'top 60%',
      onEnter: () => {
        // Initial Grand Finale Burst Sequence
        for (let i = 0; i < 6; i++) {
          setTimeout(() => this.createFirework(), i * 300);
        }

        // Ambient burst loop while section visible
        this.ambientInterval = setInterval(() => {
          if (Math.random() < 0.7) this.createFirework();
        }, 1200);
      },
      onLeaveBack: () => {
        if (this.ambientInterval) clearInterval(this.ambientInterval);
      }
    });
  }

  initRestartButton() {
    const btn = document.getElementById('relive-magic-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.fireworksController = new FireworksController();
});
