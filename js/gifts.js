/* ==========================================================================
   GIFT BOXES & SURPRISE MODAL CONTROLLER
   Cinematic Birthday Surprise Website
   ========================================================================== */

class GiftsController {
  constructor() {
    this.container = document.getElementById('gifts-container');
    this.modal = document.getElementById('gift-modal');
    this.modalTitle = document.getElementById('gift-modal-title');
    this.modalText = document.getElementById('gift-modal-text');
    this.modalIcon = document.getElementById('gift-modal-icon');
    this.closeBtn = document.getElementById('gift-modal-close');

    this.gifts = (window.SITE_CONFIG && window.SITE_CONFIG.gifts) || [];

    this.renderGifts();
    this.initModalEvents();
  }

  renderGifts() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.gifts.forEach((gift, idx) => {
      const boxWrapper = document.createElement('div');
      boxWrapper.className = 'gift-box-wrapper';
      boxWrapper.dataset.index = idx;

      boxWrapper.innerHTML = `
        <div class="gift-box">
          <div class="gift-box-lid">
            <div class="gift-box-bow"><i class="fa-solid fa-ribbon"></i></div>
          </div>
          <div class="gift-box-body">
            <div class="gift-box-ribbon-v"></div>
            <div class="gift-box-ribbon-h"></div>
            <i class="${gift.icon || 'fa-solid fa-gift'}" style="font-size: 2.5rem; color: var(--gold-primary); position: relative; z-index: 2;"></i>
          </div>
        </div>
      `;

      boxWrapper.addEventListener('click', (e) => this.openGift(boxWrapper, gift, e));
      this.container.appendChild(boxWrapper);
    });
  }

  openGift(wrapper, gift, event) {
    const isAlreadyOpen = wrapper.classList.contains('open');
    wrapper.classList.add('open');

    // Confetti from box position
    if (typeof confetti === 'function') {
      const rect = wrapper.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: isAlreadyOpen ? 30 : 70,
        spread: 60,
        origin: { x, y },
        colors: ['#F7D070', '#FF5E97', '#00F2FE', '#7A31F7']
      });
    }

    // Delay modal slightly for lid rotation to start
    setTimeout(() => {
      if (this.modalIcon) this.modalIcon.className = gift.icon || 'fa-solid fa-gift';
      if (this.modalTitle) this.modalTitle.innerText = gift.title;
      if (this.modalText) this.modalText.innerText = gift.hiddenMessage;

      if (this.modal) this.modal.classList.add('active');
    }, 250);
  }

  closeModal() {
    if (this.modal) this.modal.classList.remove('active');
  }

  initModalEvents() {
    if (!this.modal) return;
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.giftsController = new GiftsController();
});
