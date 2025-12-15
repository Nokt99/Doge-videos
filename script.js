/* Doge Learns JavaScript — Pure Visuals + Voices + Memes + Transitions */

// Scene code typed live (will be revealed step by step)
const sceneCode = `class Doge {
  static wowCounter = 0;

  wow() {
    Doge.wowCounter++;
  }
}

// Instances arise...
const doge1 = new Doge();
doge1.wow();
console.log(Doge.wowCounter); // 1

// More doges descend from meme heaven
const doge2 = new Doge();
const doge3 = new Doge();
doge2.wow();
doge3.wow();
console.log(Doge.wowCounter); // 3
`;

// Simple shared state for the "video"
class Doge {
  static wowCounter = 0;
  wow() { Doge.wowCounter++; }
}

const el = {
  code: document.getElementById('code'),
  wowCount: document.getElementById('wow-count'),
  consoleOut: document.getElementById('console-output'),
  dogeMain: document.getElementById('doge-main'),
  particleLayer: document.getElementById('particle-layer'),
  memeCloud: document.querySelector('.meme-cloud'),
  stage: document.getElementById('stage')
};

// Utility: sleep
const wait = ms => new Promise(res => setTimeout(res, ms));

// Typewriter effect
async function typeCode(text, speed = 24) {
  el.code.textContent = '';
  for (let i = 0; i < text.length; i++) {
    el.code.textContent += text[i];
    // tiny jitter for organic feel
    await wait(speed + Math.random() * 18);
  }
}

// Console cinematic print
function consoleLog(line) {
  el.consoleOut.textContent = line;
  el.consoleOut.style.opacity = '1';
  el.consoleOut.style.transform = 'scale(1.02)';
  setTimeout(() => {
    el.consoleOut.style.opacity = '0.85';
    el.consoleOut.style.transform = 'scale(1)';
  }, 240);
}

// Update HUD
function updateWow() {
  el.wowCount.textContent = Doge.wowCounter;
  // small pulse
  el.wowCount.style.transform = 'scale(1.12)';
  setTimeout(() => (el.wowCount.style.transform = 'scale(1)'), 160);
}

// Jetpack particles
function spawnParticles(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const jitterX = (Math.random() - 0.5) * 30;
    const jitterY = (Math.random()) * 10;
    p.style.left = `${x + jitterX}px`;
    p.style.top = `${y + jitterY}px`;
    el.particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

// Spawn doge with jetpack
function spawnDoge(x, y, wowImmediately = false) {
  const d = document.createElement('div');
  d.className = 'spawned-doge';
  d.style.left = `${x}px`;
  d.style.top = `${y}px`;
  d.innerHTML = `
    <span class="doge-face">🐶</span>
    <span class="jetpack">🚀</span>
  `;
  el.stage.appendChild(d);

  // flame particles loop
  const flameInterval = setInterval(() => {
    const rect = d.getBoundingClientRect();
    spawnParticles(rect.left + rect.width / 2, rect.bottom - 4, 6);
  }, 140);

  // auto remove after cinematic time
  setTimeout(() => {
    clearInterval(flameInterval);
    d.remove();
  }, 7000);

  if (wowImmediately) {
    new Doge().wow();
    updateWow();
    consoleLog(`Doge.wowCounter → ${Doge.wowCounter}`);
    voiceDoge(['wow', 'such increment', 'very shared']);
  }
}

// Floating memes placement
function layoutMemes() {
  const memes = document.querySelectorAll('.meme');
  memes.forEach(m => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 70 + 15;
    const size = Math.random() * 22 + 16;
    const hue = Math.floor(Math.random() * 360);
    m.style.left = `${x}vw`;
    m.style.top = `${y}vh`;
    m.style.fontSize = `${size}px`;
    m.style.color = `hsl(${hue}, 80%, 70%)`;
    m.style.animationDelay = `${Math.random() * 4}s`;
    m.style.animationDuration = `${Math.random() * 5 + 6}s`;
  });
}

// Voice synthesis helpers
function speak(text, { rate = 1.0, pitch = 1.0, volume = 1.0 } = {}) {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = rate; utter.pitch = pitch; utter.volume = volume;
  // Try to pick a quirky voice if available
  const voices = window.speechSynthesis.getVoices();
  const chosen = voices.find(v => /Google UK English Male|Fred|Boing|Ralph|Alto|Trinoids/i.test(v.name)) || voices[0];
  if (chosen) utter.voice = chosen;
  window.speechSynthesis.speak(utter);
}

function voiceNarrator(lines) {
  const joined = lines.join(' ');
  speak(joined, { rate: 0.98, pitch: 0.9, volume: 1.0 });
}

function voiceDoge(lines) {
  const joined = lines.join('. ');
  speak(joined, { rate: 1.2, pitch: 1.3, volume: 1.0 });
}

// Main cinematic sequence
async function run() {
  layoutMemes();

  // Intro voice
  voiceNarrator([
    'In a world where variables are shared,',
    'one Doge rises to code.'
  ]);

  // Type the code live
  await typeCode(sceneCode, 20);

  // Reveal glasses after intro
  setTimeout(() => voiceDoge(['such class', 'much static', 'very wow']), 1200);

  // Scene: doge1 appears and wows
  await wait(800);
  const center = el.dogeMain.getBoundingClientRect();
  spawnParticles(center.left + center.width / 2, center.bottom, 14);
  new Doge().wow(); updateWow();
  consoleLog('console.log(Doge.wowCounter) // 1');
  voiceNarrator(['Behold the power of shared state.']);

  // Scene: spawn multiple doges with jetpacks
  await wait(1000);
  spawnDoge(window.innerWidth * 0.28, window.innerHeight * 0.62, true);
  await wait(400);
  spawnDoge(window.innerWidth * 0.72, window.innerHeight * 0.58, true);

  // Extra wow chaos
  await wait(600);
  new Doge().wow(); updateWow();
  consoleLog('console.log(Doge.wowCounter) // ' + Doge.wowCounter);
  voiceDoge(['WOW WOW WOW']);

  // Meme dreams crescendo
  await wait(900);
  voiceNarrator(['And thus, Doge became legend.']);
  voiceDoge(['pls no banana', 'wow counter not string']);

  // Finale: gold counter pulse
  el.wowCount.style.color = '#ffd166';
  el.wowCount.style.textShadow = '0 0 24px rgba(255,209,102,0.8)';

  // Gentle outro pause
  await wait(2500);
  consoleLog('Static means shared. Do not forget.');
}

// Ensure voices are loaded before speaking
window.speechSynthesis.onvoiceschanged = () => { /* voices warmed */ };

// Kick off the cinematic after a short pre-roll
window.addEventListener('load', () => {
  run().catch(err => console.warn(err));
});
