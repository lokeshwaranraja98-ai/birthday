/* ==========================================================================
   AMBIENT BACKGROUND STARS & SHOOTING STARS
   Cinematic Birthday Surprise Website
   ========================================================================== */

class AmbientStarfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.numStars = 220;

    this.init();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  init() {
    this.resize();
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        color: Math.random() > 0.3 ? '#ffffff' : (Math.random() > 0.5 ? '#F7D070' : '#7A31F7')
      });
    }
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  spawnShootingStar() {
    if (Math.random() < 0.015 && this.shootingStars.length < 3) {
      this.shootingStars.push({
        x: Math.random() * this.width * 0.8,
        y: Math.random() * this.height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 4,
        angle: Math.PI / 4,
        alpha: 1,
        width: Math.random() * 1.5 + 0.5
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Twinkling Stars
    for (let star of this.stars) {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 1 || star.alpha < 0.1) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.shadowBlur = star.radius * 4;
      this.ctx.shadowColor = star.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw Shooting Stars
    this.spawnShootingStar();
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      let s = this.shootingStars[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.alpha -= 0.015;

      if (s.alpha <= 0 || s.x > this.width || s.y > this.height) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      let tailX = s.x - Math.cos(s.angle) * s.length;
      let tailY = s.y - Math.sin(s.angle) * s.length;

      let grad = this.ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#F7D070');
      grad.addColorStop(1, 'transparent');

      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = s.width;
      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ambientStars = new AmbientStarfield('ambient-stars-canvas');
});
