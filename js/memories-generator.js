/* ==========================================================================
   RANDOM MEMORY GENERATOR (50+ Memories Dataset & Glass Modal Reveal)
   Cinematic Birthday Surprise Website
   ========================================================================== */

class RandomMemoriesController {
  constructor() {
    this.btn = document.getElementById('generate-random-memory-btn');
    this.modal = document.getElementById('random-memory-modal');
    this.tagEl = document.getElementById('random-memory-tag');
    this.titleEl = document.getElementById('random-memory-title');
    this.textEl = document.getElementById('random-memory-text');
    this.closeBtn = document.getElementById('random-memory-close');

    this.memories = (window.SITE_CONFIG && window.SITE_CONFIG.memoriesArray) || [];

    this.initEvents();
  }

  getRandomMemory() {
    if (!this.memories.length) return null;
    const randomIndex = Math.floor(Math.random() * this.memories.length);
    return this.memories[randomIndex];
  }

  showMemoryModal() {
    const memory = this.getRandomMemory();
    if (!memory) return;

    if (this.tagEl) this.tagEl.innerText = memory.tag || "Memory Secret ✨";
    if (this.titleEl) this.titleEl.innerText = memory.title || "A Precious Moment";
    if (this.textEl) this.textEl.innerText = memory.desc || "Every single day with you is a gift.";

    if (this.modal) this.modal.classList.add('active');

    // Confetti burst from button position
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F7D070', '#FF5E97', '#00F2FE', '#7A31F7']
      });
    }
  }

  closeModal() {
    if (this.modal) this.modal.classList.remove('active');
  }

  initEvents() {
    if (this.btn) {
      this.btn.addEventListener('click', () => this.showMemoryModal());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.randomMemoriesController = new RandomMemoriesController();
});
