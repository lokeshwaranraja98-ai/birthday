# 🎆 Cinematic Birthday Surprise Website (Premium Emotional Upgrade)

A production-quality, single-page interactive birthday surprise experience created with HTML5, CSS3, vanilla JavaScript, GSAP, Three.js, Lenis smooth scrolling, tsParticles, canvas-confetti, Typed.js, and Vanilla-Tilt.

This version features a personalized emotional narrative detailing a friendship story that began on a random badminton court and grew into an inseparable bond over a year of shared happy and difficult times.

---

## 🚀 Quick Start (No Build Step Required)

You do **not** need to install dependencies, run Node.js, or run a build step.

1. **Option A (Direct File Opening)**:
   Double-click `index.html` to open the website directly in any modern browser (Chrome, Firefox, Safari, Edge).

2. **Option B (Local Static Server - Recommended)**:
   Run a local server from the project directory:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` (or `http://localhost:3000`) in your browser.

---

## 🎨 How to Reskin & Personalize the Whole Site

All personal content is centralized in **a single configuration object** located at the very top of `script.js`:

```javascript
window.SITE_CONFIG = { ... }
```

### Key Customization Options:

- **`recipientName`**: Change `"Sophia"` to your best friend's name.
- **`ourStorySentences`**: Edit the badminton meeting story text lines.
- **`voiceWishTrack`**: Put your voice recording in `music/birthday-wish.mp3` or update the URL.
- **`memoriesArray`**: 50+ memories for the Random Memory Generator modal.
- **`floatingCardsList`**: Floating memory toasts shown every 20-30 seconds.
- **`photos`**: Image URLs, dates, captions, and memory descriptions for the photo gallery & lightbox.
- **`letterContent`**: Heading, body message, and sign-off for the 3D envelope.
- **`timeline`**: Milestone entries (badminton match, shared times, present birthday).
- **`endingSurpriseLines`**: Emotional lines shown during the post-cake fade-to-black experience.

---

## 📁 Project Directory Structure

```
birthday-surprise/
├── index.html              ← Master HTML shell (All sections + modal popups)
├── style.css               ← Master styles, glassmorphism, voice visualizer & ending modal
├── script.js               ← SITE_CONFIG (50+ memories, badminton story, voice & ending text)
├── README.md               ← Setup & usage documentation
├── css/
│   ├── animations.css      ← Keyframes (auroras, moon pulse, flame flicker, toast float, heart burst)
│   └── responsive.css      ← Mobile/tablet breakpoints & prefers-reduced-motion
├── js/
│   ├── our-story.js          ← Our Story badminton narrative typing animation
│   ├── floating-memories.js  ← Floating toast memory notifications every 22s
│   ├── voice.js              ← Voice message audio player + waveform visualizer
│   ├── counter.js            ← Scroll-triggered stat roll-up counters
│   ├── memories-generator.js ← Random Memory Generator selecting from 50+ memories
│   ├── ending-surprise.js   ← Post-cake fade to black, typing letter, heart explosion & hidden collage
│   ├── loader.js           ← Loading screen logic, gift wobble, 0-100% progress, confetti
│   ├── stars.js             ← Fixed background twinkling stars + shooting star engine
│   ├── cursor.js            ← Custom cursor: dot, ring, sparkle trail, click-hearts
│   ├── hero.js               ← Three.js particle starfield, mouse parallax, Typed.js
│   ├── particles.js          ← tsParticles ambient floating sparkle layer
│   ├── gallery.js            ← Masonry grid + 3D tilt + enhanced lightbox (Date, Caption, Memory)
│   ├── timeline.js           ← ScrollTrigger scrubbed line + expanded timeline cards
│   ├── gifts.js              ← 3D gift boxes, location confetti + surprise modals
│   ├── cake.js               ← Layered CSS cake, blow button + mic detection -> triggers finale
│   ├── fireworks.js          ← Canvas fireworks engine with star/heart sparks & camera shake
│   └── music.js              ← Audio player with volume fade, ducking + synth fallback
├── images/                 ← Put your custom recipient photos here
├── music/                  ← Put your voice wish recording (`birthday-wish.mp3`) here
├── videos/
└── assets/
```

---

## 🌟 Upgraded Interactive Features Summary

1. **Our Story Section**: Badminton meeting narrative sentence-by-sentence typing animation.
2. **Floating Memory Cards**: Non-intrusive floating toast notifications every 22s.
3. **Voice Message Player**: Audio player with real-time animated waveform bars and background music ducking.
4. **Memory Counters**: Scroll-triggered animated counters (1 Year, 10,000+ Laughs, 100% Trust, Infinite Memories).
5. **Random Memory Generator**: Interactive button pulling from a 50+ memory dataset in `SITE_CONFIG`.
6. **Secret Letter Experience**: Audio ducks down while the envelope paper unfolds and typewriter effect types out the letter.
7. **Enhanced Lightbox**: Photo lightbox with zoom transform, date badge, caption, and detailed memory story.
8. **Final Emotional Surprise**: After cake candles blow out, screen fades to black, emotional text types out, heart explosion fires, and a gold button reveals "One Last Surprise ❤️".
9. **Hidden Surprise Memory Collage**: Fullscreen modal displaying a floating photo collage.
