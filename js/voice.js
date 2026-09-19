/* ==========================================================================
   VOICE MESSAGE PLAYER & WAVEFORM VISUALIZER CONTROLLER
   Cinematic Birthday Surprise Website
   ========================================================================== */

class VoiceMessageController {
  constructor() {
    this.btn = document.getElementById('play-voice-btn');
    this.card = document.getElementById('voice-card');
    this.statusText = document.getElementById('voice-status-text');
    this.waveformContainer = document.getElementById('voice-waveform');

    this.isPlaying = false;
    this.audio = new Audio();
    const trackUrl = (window.SITE_CONFIG && window.SITE_CONFIG.voiceWishTrack) || 'music/Kaatrae En Vaasal BGM.mp3';
    this.audio.src = trackUrl;

    this.renderWaveformBars();
    this.initEvents();
  }

  renderWaveformBars() {
    if (!this.waveformContainer) return;
    this.waveformContainer.innerHTML = '';
    for (let i = 0; i < 28; i++) {
      const bar = document.createElement('div');
      bar.className = 'waveform-bar';
      this.waveformContainer.appendChild(bar);
    }
  }

  initEvents() {
    if (!this.btn) return;

    this.btn.addEventListener('click', () => {
      if (this.isPlaying) {
        this.pauseVoice();
      } else {
        this.playVoice();
      }
    });

    this.audio.addEventListener('ended', () => {
      this.pauseVoice();
    });

    this.audio.addEventListener('error', () => {
      console.log('Voice audio file not found. Enabling synthesized audio fallback.');
      this.useSynthFallback = true;
    });
  }

  playVoice() {
    this.isPlaying = true;
    if (this.card) this.card.classList.add('playing');
    if (this.btn) this.btn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause Voice Wish`;
    if (this.statusText) this.statusText.innerText = "Playing voice wish... 💖";

    // Duck background music while voice message plays
    if (window.musicController && window.musicController.isPlaying) {
      window.musicController.fadeVolume(0.1);
    }

    if (this.useSynthFallback) {
      this.startSynthVoice();
    } else {
      this.audio.play().catch((err) => {
        console.log('Voice play fallback:', err);
        this.useSynthFallback = true;
        this.startSynthVoice();
      });
    }
  }

  pauseVoice() {
    this.isPlaying = false;
    if (this.card) this.card.classList.remove('playing');
    if (this.btn) this.btn.innerHTML = `<i class="fa-solid fa-play"></i> Play My Birthday Wish 🎙️`;
    if (this.statusText) this.statusText.innerText = "Click below to hear your audio birthday message";

    // Restore background music volume
    if (window.musicController && window.musicController.isPlaying) {
      window.musicController.fadeVolume(window.musicController.targetVolume || 0.5);
    }

    if (this.useSynthFallback) {
      this.stopSynthVoice();
    } else {
      this.audio.pause();
    }
  }

  startSynthVoice() {
    // Simulated speech chime synthesizer fallback
    if (this.synthCtx) return;
    try {
      this.synthCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = this.synthCtx.createOscillator();
      const gain = this.synthCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, this.synthCtx.currentTime); // E4 warm note
      gain.gain.setValueAtTime(0.08, this.synthCtx.currentTime);

      osc.connect(gain);
      gain.connect(this.synthCtx.destination);
      osc.start();

      setTimeout(() => {
        this.pauseVoice();
      }, 8000);
    } catch (e) {
      console.log('Voice synth error:', e);
    }
  }

  stopSynthVoice() {
    if (this.synthCtx) {
      this.synthCtx.close();
      this.synthCtx = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.voiceMessageController = new VoiceMessageController();
});
