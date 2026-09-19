/* ==========================================================================
   TIMELINE SECTION CONTROLLER
   Cinematic Birthday Surprise Website
   ========================================================================== */

class TimelineController {
  constructor() {
    this.container = document.getElementById('timeline-container');
    this.entries = (window.SITE_CONFIG && window.SITE_CONFIG.timeline) || [];

    this.renderTimeline();
    this.initScrollAnimations();
  }

  renderTimeline() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="timeline-progress-line" id="timeline-progress-line"></div>
    `;

    this.entries.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-icon">
          <i class="${item.icon || 'fa-solid fa-star'}"></i>
        </div>
        <div class="timeline-card glass-card" data-tilt data-tilt-max="6">
          <div class="timeline-date">${item.date}</div>
          <div class="timeline-title">${item.title}</div>
          <div class="timeline-desc">${item.desc}</div>
        </div>
      `;
      this.container.appendChild(el);
    });

    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll('.timeline-card'));
    }
  }

  initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Scrubbed connecting line height growth
    gsap.to('#timeline-progress-line', {
      scrollTrigger: {
        trigger: '#timeline-container',
        start: 'top 70%',
        end: 'bottom 80%',
        scrub: true
      },
      height: '100%',
      ease: 'none'
    });

    // Staggered timeline item reveals
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, idx) => {
      const isOdd = idx % 2 === 0;
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%'
        },
        x: isOdd ? -60 : 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.timelineController = new TimelineController();
});
