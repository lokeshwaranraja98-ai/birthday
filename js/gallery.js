/* ==========================================================================
   PHOTO GALLERY & LIGHTBOX CONTROLLER (ENHANCED)
   Cinematic Birthday Surprise Website
   ========================================================================== */

class GalleryController {
  constructor() {
    this.grid = document.getElementById('gallery-grid');
    this.modal = document.getElementById('lightbox-modal');
    this.modalImg = document.getElementById('lightbox-img');
    this.modalDate = document.getElementById('lightbox-date');
    this.modalCaption = document.getElementById('lightbox-caption');
    this.modalMemory = document.getElementById('lightbox-memory');
    this.closeBtn = document.getElementById('lightbox-close');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');

    this.currentIndex = 0;
    this.photos = (window.SITE_CONFIG && window.SITE_CONFIG.photos) || [];

    this.initGrid();
    this.initLightboxEvents();
    this.initScrollReveal();
  }

  initGrid() {
    if (!this.grid) return;
    this.grid.innerHTML = '';

    this.photos.forEach((photo, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <div class="gallery-card glass-card" data-tilt data-tilt-max="10" data-tilt-speed="400">
          <img src="${photo.url}" alt="${photo.caption}" class="gallery-img" loading="lazy" />
          <div class="gallery-overlay">
            <div class="gallery-caption">${photo.caption}</div>
          </div>
        </div>
      `;

      item.addEventListener('click', () => this.openLightbox(index));
      this.grid.appendChild(item);
    });

    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll('.gallery-card'));
    }
  }

  openLightbox(index) {
    if (!this.photos[index]) return;
    this.currentIndex = index;
    const photo = this.photos[index];

    this.modalImg.src = photo.url;
    if (this.modalDate) this.modalDate.innerText = photo.date || "Special Memory";
    if (this.modalCaption) this.modalCaption.innerText = photo.caption || "";
    if (this.modalMemory) this.modalMemory.innerText = photo.memoryDesc || "A beautiful moment shared together.";

    this.modal.classList.add('active');

    // Zoom transform animation
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(this.modalImg, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' });
    }
  }

  closeLightbox() {
    this.modal.classList.remove('active');
  }

  prevPhoto() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.openLightbox(this.currentIndex);
  }

  nextPhoto() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.openLightbox(this.currentIndex);
  }

  initLightboxEvents() {
    if (!this.modal) return;

    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeLightbox());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevPhoto());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextPhoto());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal || e.target.classList.contains('lightbox-content-wrapper')) {
        this.closeLightbox();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevPhoto();
      if (e.key === 'ArrowRight') this.nextPhoto();
    });
  }

  initScrollReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.gallery-item', {
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top 75%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.galleryController = new GalleryController();
});
