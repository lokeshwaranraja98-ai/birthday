/* ==========================================================================
   tsParticles AMBIENT PARTICLE LAYERS
   Cinematic Birthday Surprise Website
   ========================================================================== */

class AmbientParticlesController {
  constructor() {
    if (typeof tsParticles === 'undefined') return;
    this.initParticles();
  }

  async initParticles() {
    try {
      await tsParticles.load('tsparticles-reasons', {
        fpsLimit: 60,
        particles: {
          number: {
            value: 25,
            density: { enable: true, value_area: 800 }
          },
          color: { value: ['#F7D070', '#FF5E97', '#7A31F7'] },
          shape: { type: ['circle', 'star'] },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 4,
            random: true,
            anim: { enable: true, speed: 2, size_min: 1, sync: false }
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'top',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'bubble' },
            resize: true
          },
          modes: {
            bubble: { distance: 150, size: 6, duration: 2, opacity: 0.8 }
          }
        },
        retina_detect: true
      });
    } catch (err) {
      console.log('tsParticles fallback mode active:', err);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ambientParticles = new AmbientParticlesController();
});
