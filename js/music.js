/* ==========================================================================
   BACKGROUND MUSIC CONTROLLER (With Audio Synthesizer Fallback)
   Cinematic Birthday Surprise Website
   ========================================================================== */

class MusicController {
  constructor() {
    this.btn = document.getElementById('music-toggle-btn');
    this.icon = document.getElementById('music-btn-icon');
    this.audio = new Audio();
    this.isPlaying = false;
    this.audio.loop = true;
    this.targetVolume = 0.5;

    // Use music track from SITE_CONFIG or default fallback
    const trackUrl = (window.SITE_CONFIG && window.SITE_CONFIG.musicTrack) || 'music/birthday-ambient.mp3';
    this.audio.src = trackUrl;

    this.initEvents();
    this.initFinaleDucking();
  }

  initEvents() {
    if (!this.btn) return;

    this.btn.addEventListener('click', () => {
      if (this.isPlaying) {
        this.pauseMusic();
      } else {
        this.playMusic();
      }
    });

    // Handle audio error gracefully by synthesizing ambient audio loop
    this.audio.addEventListener('error', () => {
      console.log('Audio file not found. Enabling Web Audio synthesized music fallback.');
      this.useSynthFallback = true;
    });
  }

  playMusic() {
    this.isPlaying = true;
    if (this.btn) this.btn.classList.add('playing');
    if (this.icon) this.icon.className = 'fa-solid fa-volume-high';

    if (this.useSynthFallback) {
      this.startSynthAudio();
    } else {
      this.audio.volume = 0;
      this.audio.play().then(() => {
        this.fadeVolume(this.targetVolume);
      }).catch((err) => {
        console.log('Auto-play restriction or audio error, falling back to synth:', err);
        this.useSynthFallback = true;
        this.startSynthAudio();
      });
    }
  }

  pauseMusic() {
    this.isPlaying = false;
    if (this.btn) this.btn.classList.remove('playing');
    if (this.icon) this.icon.className = 'fa-solid fa-volume-xmark';

    if (this.useSynthFallback) {
      this.stopSynthAudio();
    } else {
      this.fadeVolume(0, () => this.audio.pause());
    }
  }

  fadeVolume(target, callback) {
    const step = 0.05;
    const interval = setInterval(() => {
      if (Math.abs(this.audio.volume - target) < step) {
        this.audio.volume = target;
        clearInterval(interval);
        if (callback) callback();
      } else if (this.audio.volume < target) {
        this.audio.volume = Math.min(1, this.audio.volume + step);
      } else {
        this.audio.volume = Math.max(0, this.audio.volume - step);
      }
    }, 50);
  }

  initFinaleDucking() {
    if (typeof ScrollTrigger === 'undefined') return;

    ScrollTrigger.create({
      trigger: '#fireworks',
      start: 'top 50%',
      onEnter: () => {
        if (this.isPlaying && !this.useSynthFallback) {
          this.fadeVolume(0.2); // Duck volume to 20% for fireworks
        }
      },
      onLeaveBack: () => {
        if (this.isPlaying && !this.useSynthFallback) {
          this.fadeVolume(this.targetVolume);
        }
      }
    });
  }

  /* Web Audio API Synthesizer Fallback for soothing chime chords */
  startSynthAudio() {
    if (this.synthCtx) return;
    try {
      this.synthCtx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 pentatonic warm chord
      this.synthNodes = [];

      notes.forEach((freq, idx) => {
        const osc = this.synthCtx.createOscillator();
        const gain = this.synthCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.synthCtx.currentTime);

        gain.gain.setValueAtTime(0.05, this.synthCtx.currentTime);

        osc.connect(gain);
        gain.connect(this.synthCtx.destination);
        osc.start();
        this.synthNodes.push({ osc, gain });
      });
    } catch (e) {
      console.log('Synth error:', e);
    }
  }

  stopSynthAudio() {
    if (this.synthCtx) {
      this.synthCtx.close();
      this.synthCtx = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.musicController = new MusicController();
});
