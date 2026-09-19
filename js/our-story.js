/* ==========================================================================
   OUR STORY SECTION CONTROLLER (Badminton Narrative & Sentence Reveal)
   Cinematic Birthday Surprise Website
   ========================================================================== */

class OurStoryController {
  constructor() {
    this.container = document.getElementById('our-story-sentences');
    this.sentences = (window.SITE_CONFIG && window.SITE_CONFIG.ourStorySentences) || [
      "One random day, I went to play badminton.",
      "I never imagined that game would introduce me to someone who would become one of the most important people in my life.",
      "A year later...",
      "Here we are.",
      "Celebrating your birthday.",
      "Thank you for being the amazing person you are."
    ];

    this.renderSentences();
    this.initScrollReveal();
  }

  renderSentences() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.sentences.forEach((sentence, idx) => {
      const p = document.createElement('div');
      p.className = 'our-story-sentence';
      if (idx === 2 || idx === 3 || idx === 5) {
        p.classList.add('highlight-sentence');
      }
      p.innerText = sentence;
      this.container.appendChild(p);
    });
  }

  initScrollReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll('.our-story-sentence');
    gsap.to(elements, {
      scrollTrigger: {
        trigger: '#our-story',
        start: 'top 70%'
      },
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.4,
      ease: 'power3.out'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ourStoryController = new OurStoryController();
});
