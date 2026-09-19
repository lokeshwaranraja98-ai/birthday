/* ==========================================================================
   HERO SECTION CONTROLLER (Three.js Starfield, GSAP Reveals & Typed.js)
   Cinematic Birthday Surprise Website
   ========================================================================== */

class HeroController {
  constructor() {
    this.canvas = document.getElementById('hero-three-canvas');
    if (this.canvas && typeof THREE !== 'undefined') {
      this.initThreeStarfield();
    }
    this.initTypedSubtitle();
    this.initHeroTilt();
  }

  initThreeStarfield() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Layer 1: Distant dense starfield
    const geometry1 = new THREE.BufferGeometry();
    const count1 = 1200;
    const positions1 = new Float32Array(count1 * 3);
    const colors1 = new Float32Array(count1 * 3);

    for (let i = 0; i < count1 * 3; i += 3) {
      positions1[i] = (Math.random() - 0.5) * 18;
      positions1[i + 1] = (Math.random() - 0.5) * 18;
      positions1[i + 2] = (Math.random() - 0.5) * 18;

      colors1[i] = 0.96;     // R
      colors1[i + 1] = 0.81; // G
      colors1[i + 2] = 0.44; // B (Gold tone)
    }
    geometry1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));
    geometry1.setAttribute('color', new THREE.BufferAttribute(colors1, 3));

    const material1 = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    this.starsLayer1 = new THREE.Points(geometry1, material1);
    this.scene.add(this.starsLayer1);

    // Layer 2: Close glowing particle stars
    const geometry2 = new THREE.BufferGeometry();
    const count2 = 300;
    const positions2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2 * 3; i += 3) {
      positions2[i] = (Math.random() - 0.5) * 10;
      positions2[i + 1] = (Math.random() - 0.5) * 10;
      positions2[i + 2] = (Math.random() - 0.5) * 10;
    }
    geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
    const material2 = new THREE.PointsMaterial({
      size: 0.065,
      color: 0x00F2FE,
      transparent: true,
      opacity: 0.6
    });
    this.starsLayer2 = new THREE.Points(geometry2, material2);
    this.scene.add(this.starsLayer2);

    // Mouse Parallax Effect
    this.mouseX = 0;
    this.mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.animateThree();
  }

  animateThree() {
    requestAnimationFrame(() => this.animateThree());

    if (this.starsLayer1) {
      this.starsLayer1.rotation.y += 0.0005;
      this.starsLayer1.rotation.x += (this.mouseY - this.starsLayer1.rotation.x) * 0.05;
      this.starsLayer1.rotation.y += (this.mouseX - this.starsLayer1.rotation.y) * 0.05;
    }

    if (this.starsLayer2) {
      this.starsLayer2.rotation.y -= 0.0008;
      this.starsLayer2.rotation.x += (this.mouseY - this.starsLayer2.rotation.x) * 0.08;
    }

    this.renderer.render(this.scene, this.camera);
  }

  initTypedSubtitle() {
    const el = document.getElementById('hero-typed-text');
    if (!el || typeof Typed === 'undefined') return;

    const subtitles = (window.SITE_CONFIG && window.SITE_CONFIG.typedSubtitles)
      || ["Wishing you a year filled with magic & endless joy ✨", "Celebrating the wonderful soul that you are 🌸", "May your special day shine bright like the stars 🌟"];

    new Typed('#hero-typed-text', {
      strings: subtitles,
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 2500,
      loop: true,
      showCursor: true,
      cursorChar: '✨'
    });
  }

  initHeroTilt() {
    const heroCard = document.querySelector('.hero-glass-card');
    if (heroCard && typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(heroCard, {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.15
      });
    }
  }
}

// Global Hero Entrance Timeline called by Loader when ready
window.animateHeroEntrance = function() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline();

  tl.from('.hero-moon', {
    scale: 0,
    opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.7)'
  })
  .from('.hero-eyebrow', {
    y: -20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-title-word', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.hero-name', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.6)'
  }, '-=0.4')
  .from('.hero-subtitle-container', {
    opacity: 0,
    duration: 0.8
  }, '-=0.4')
  .from('.hero-cta-btn', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.5)'
  }, '-=0.4');
};

document.addEventListener('DOMContentLoaded', () => {
  window.heroController = new HeroController();
});
