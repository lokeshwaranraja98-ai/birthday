/* ==========================================================================
   LOADING SCREEN CONTROLLER
   Cinematic Birthday Surprise Website
   ========================================================================== */

class LoaderController {
  constructor() {
    this.loaderEl = document.getElementById('loader');
    this.progressBar = document.getElementById('loader-progress-bar');
    this.percentageText = document.getElementById('loader-percentage');
    this.giftIcon = document.getElementById('loader-gift-icon');
    this.whiteFlash = document.getElementById('loader-white-flash');
    this.canvas = document.getElementById('loader-starfield-canvas');

    if (!this.loaderEl) return;

    this.progress = 0;
    this.initStarfield();
    this.startLoading();
  }

  initStarfield() {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    let width = (this.canvas.width = window.innerWidth);
    let height = (this.canvas.height = window.innerHeight);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.1) s.speed = -s.speed;
        ctx.fillStyle = `rgba(247, 208, 112, ${Math.max(0.1, Math.min(1, s.alpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      if (this.loaderEl.style.display !== 'none') {
        requestAnimationFrame(render);
      }
    };
    render();
  }

  startLoading() {
    document.body.classList.add('scroll-locked');

    const interval = setInterval(() => {
      // Accelerating progress curve
      const increment = Math.floor(Math.random() * 8) + 2;
      this.progress = Math.min(100, this.progress + increment);

      if (this.progressBar) this.progressBar.style.width = `${this.progress}%`;
      if (this.percentageText) this.percentageText.innerText = `${this.progress}%`;

      // Increase gift wobble intensity with progress
      if (this.giftIcon) {
        const speed = Math.max(0.4, 2 - (this.progress / 100) * 1.5);
        this.giftIcon.style.animationDuration = `${speed}s`;
      }

      if (this.progress >= 100) {
        clearInterval(interval);
        setTimeout(() => this.finishLoading(), 300);
      }
    }, 80);
  }

  finishLoading() {
    if (this.giftIcon) {
      this.giftIcon.classList.add('popping');
    }

    // Confetti burst from gift center
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.45 },
        colors: ['#F7D070', '#FF5E97', '#7A31F7', '#00F2FE']
      });
    }

    // White Flash Transition
    setTimeout(() => {
      if (this.whiteFlash) {
        this.whiteFlash.style.opacity = '1';
      }
    }, 400);

    setTimeout(() => {
      this.loaderEl.style.opacity = '0';
      this.loaderEl.style.visibility = 'hidden';
      document.body.classList.remove('scroll-locked');

      if (this.whiteFlash) {
        this.whiteFlash.style.opacity = '0';
      }

      // Trigger Lenis smooth scroll & Hero animation entrance
      if (window.initLenis) window.initLenis();
      if (window.animateHeroEntrance) window.animateHeroEntrance();
    }, 800);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.loaderController = new LoaderController();
});
