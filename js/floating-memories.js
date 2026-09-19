/* ==========================================================================
   FLOATING TOAST MEMORY CARDS CONTROLLER
   Cinematic Birthday Surprise Website
   ========================================================================== */

class FloatingMemoriesController {
  constructor() {
    this.container = document.getElementById('floating-toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'floating-toast-container';
      this.container.className = 'floating-toast-container';
      document.body.appendChild(this.container);
    }

    this.toastList = (window.SITE_CONFIG && window.SITE_CONFIG.floatingCardsList) || [
      "🏸 Remember our first badminton match?",
      "😂 We laughed so much that day.",
      "❤️ Thank you for always being there.",
      "✨ One of my favorite memories.",
      "🌟 Grateful for every single conversation.",
      "🌸 You bring sunshine into every room.",
      "☕ Here's to countless more memories together!"
      
    ];

    this.startFloatingLoop();
  }

  showToast() {
    const text = this.toastList[Math.floor(Math.random() * this.toastList.length)];
    const toast = document.createElement('div');
    toast.className = 'floating-toast';
    toast.innerHTML = `<span>${text}</span>`;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 6000);
  }

  startFloatingLoop() {
    // Show first toast after 8 seconds, then every 22 seconds
    setTimeout(() => {
      this.showToast();
      setInterval(() => this.showToast(), 22000);
    }, 8000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.floatingMemoriesController = new FloatingMemoriesController();
});
