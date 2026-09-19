/* ==========================================================================
   BIRTHDAY CAKE & CANDLE BLOW CONTROLLER (ENHANCED)
   Cinematic Birthday Surprise Website
   ========================================================================== */

class CakeController {
  constructor() {
    this.candlesRow = document.getElementById('cake-candles-row');
    this.blowBtn = document.getElementById('blow-candles-btn');
    this.micBtn = document.getElementById('mic-blow-btn');

    this.candleCount = (window.SITE_CONFIG && window.SITE_CONFIG.cakeConfig && window.SITE_CONFIG.cakeConfig.candleCount) || 5;
    this.blownOut = false;

    this.renderCandles();
    this.initBlowButton();
    this.initMicBlowDetection();
  }

  renderCandles() {
    if (!this.candlesRow) return;
    this.candlesRow.innerHTML = '';

    for (let i = 0; i < this.candleCount; i++) {
      const candle = document.createElement('div');
      candle.className = 'candle';
      candle.innerHTML = `<div class="flame" id="flame-${i}"></div>`;
      this.candlesRow.appendChild(candle);
    }
  }

  blowOutCandles() {
    if (this.blownOut) return;
    this.blownOut = true;

    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, idx) => {
      setTimeout(() => {
        flame.classList.add('extinguished');
        this.spawnSmoke(flame.parentElement);
      }, idx * 150);
    });

    if (this.blowBtn) {
      this.blowBtn.innerHTML = `<i class="fa-solid fa-sparkles"></i> Wish Made! 🎉`;
      this.blowBtn.disabled = true;
    }

    // Celebration Confetti
    setTimeout(() => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F7D070', '#FF5E97', '#00F2FE', '#7A31F7']
        });
      }
    }, flames.length * 150 + 200);

    // Trigger Final Emotional Surprise Overlay Transition
    setTimeout(() => {
      if (window.endingSurpriseController) {
        window.endingSurpriseController.triggerFinalSurprise();
      }
    }, flames.length * 150 + 3500);
  }

  spawnSmoke(candleEl) {
    for (let i = 0; i < 3; i++) {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-particle';
      smoke.style.left = `${Math.random() * 8 - 4}px`;
      smoke.style.animationDelay = `${i * 0.1}s`;
      candleEl.appendChild(smoke);
      setTimeout(() => smoke.remove(), 2000);
    }
  }

  initBlowButton() {
    if (this.blowBtn) {
      this.blowBtn.addEventListener('click', () => this.blowOutCandles());
    }
  }

  initMicBlowDetection() {
    if (!this.micBtn) return;

    this.micBtn.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        this.micBtn.innerText = "Listening... Blow into mic 🎤";

        javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          let values = 0;
          for (let i = 0; i < array.length; i++) {
            values += array[i];
          }
          const average = values / array.length;

          if (average > 45 && !this.blownOut) {
            this.blowOutCandles();
            stream.getTracks().forEach(track => track.stop());
            audioContext.close();
            this.micBtn.innerText = "Mic Blow Detected! 💨";
          }
        };
      } catch (err) {
        console.log('Mic access denied or unsupported, falling back to button:', err);
        this.micBtn.innerText = "Mic Unavailable (Use Button Above)";
        this.micBtn.disabled = true;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cakeController = new CakeController();
});
