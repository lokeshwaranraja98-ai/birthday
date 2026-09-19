document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Controller
  const bgMusic = document.getElementById('bg-music');
  const soundBtn = document.getElementById('sound-control');
  let isPlaying = false;

  function toggleAudio() {
    if (isPlaying) {
      bgMusic.pause();
      soundBtn.querySelector('.sound-icon').textContent = '🔇';
    } else {
      bgMusic.play();
      soundBtn.querySelector('.sound-icon').textContent = '🎵';
    }
    isPlaying = !isPlaying;
  }

  soundBtn.addEventListener('click', toggleAudio);

  // 2. Cinematic Intro Sequence
  const introOverlay = document.getElementById('intro-overlay');
  const enterBtn = document.getElementById('enter-btn');
  const lines = document.querySelectorAll('.intro-line');

  lines.forEach((line, idx) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, (idx + 1) * 1400);
  });

  setTimeout(() => {
    enterBtn.classList.add('visible');
  }, (lines.length + 1) * 1400);

  enterBtn.addEventListener('click', () => {
    introOverlay.style.transition = 'opacity 1s ease';
    introOverlay.style.opacity = '0';
    setTimeout(() => {
      introOverlay.style.display = 'none';
      soundBtn.classList.remove('hidden');
      toggleAudio(); // Start music on explicit click interaction
    }, 1000);
  });

  // 3. Lightbox Gallery Interaction
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption');
      lightboxImg.src = src;
      lightboxCap.textContent = caption;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });

 // Append or integrate into your DOMContentLoaded listener in js/main.js

const flame = document.getElementById('flame');
const smoke = document.getElementById('smoke');
const cake = document.getElementById('cake-interactive');
const wishMessage = document.getElementById('wish-message');
const micBtn = document.getElementById('enable-mic-btn');
const micStatus = document.getElementById('mic-status');

let audioContext;
let analyser;
let microphone;
let javascriptNode;
let isBlownOut = false;

function blowOutCandle() {
  if (isBlownOut) return;
  isBlownOut = true;

  flame.classList.add('out');
  smoke.classList.add('active');

  if (micStatus) micStatus.textContent = "Candle blown out!";

  setTimeout(() => {
    wishMessage.classList.remove('hidden');
  }, 600);

  // Stop audio processing once blown out
  if (javascriptNode) javascriptNode.disconnect();
  if (microphone) microphone.disconnect();
}

// Manual click fallback
cake.addEventListener('click', blowOutCandle);

// Microphone Blow Detection
micBtn.addEventListener('click', async () => {
  if (isBlownOut) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);
    javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    micStatus.textContent = "🎙️ Listening... Blow into your mic!";
    micBtn.style.display = "none";

    javascriptNode.onaudioprocess = () => {
      if (isBlownOut) return;

      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);

      let values = 0;
      for (let i = 0; i < array.length; i++) {
        values += array[i];
      }

      const average = values / array.length;

      // Sensitivity Threshold: Trigger blowout if sound level spikes above limit
      if (average > 45) {
        blowOutCandle();
      }
    };
  } catch (err) {
    console.error("Microphone access denied or unsupported:", err);
    micStatus.textContent = "Mic access denied. Tap the candle instead!";
  }
});

  // 5. Final Surprise Button Reveal
  const lastBtn = document.getElementById('one-last-thing-btn');
  const lastMsg = document.getElementById('last-message');

  lastBtn.addEventListener('click', () => {
    lastMsg.classList.toggle('hidden');
  });

  // 6. Secret Easter Egg Interaction
  const eggTrigger = document.getElementById('secret-easter-egg');
  const secretModal = document.getElementById('secret-modal');
  const closeSecret = document.getElementById('close-secret');
  let clickCount = 0;

  eggTrigger.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 3) {
      secretModal.classList.remove('hidden');
      clickCount = 0;
    }
  });

  closeSecret.addEventListener('click', () => {
    secretModal.classList.add('hidden');
  });
});