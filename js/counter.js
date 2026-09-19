/* ==========================================================================
   MEMORY COUNTERS CONTROLLER (Animated Stats Rollup)
   Cinematic Birthday Surprise Website
   ========================================================================== */

class MemoryCounterController {
  constructor() {
    this.counters = document.querySelectorAll('.counter-number');
    this.initScrollTrigger();
  }

  initScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: '#counter-section',
      start: 'top 75%',
      onEnter: () => this.animateCounters()
    });
  }

  animateCounters() {
    this.counters.forEach(counter => {
      const target = counter.getAttribute('data-target');
      const isPercentage = target.includes('%');
      const isPlus = target.includes('+');
      const numericVal = parseInt(target.replace(/[^0-9]/g, '')) || 0;

      if (numericVal > 0) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericVal,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            let formatted = Math.floor(obj.val).toLocaleString();
            if (isPercentage) formatted += '%';
            if (isPlus) formatted += '+';
            counter.innerText = formatted;
          }
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.memoryCounterController = new MemoryCounterController();
});
