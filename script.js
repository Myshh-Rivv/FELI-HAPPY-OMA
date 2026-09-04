// Iniciar con el regalo
document.getElementById('start-overlay').addEventListener('click', startExperience);

function startExperience() {
  document.getElementById('start-overlay').classList.add('hidden');
  const music = document.getElementById('bg-music');
  music.play();

  generateStars();
  runTimeline();
}

// Estrellas de fondo
function generateStars() {
  const container = document.getElementById('stars-container');
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 2;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(star);
  }
}

// Tiempos exactos
function runTimeline() {
  // Escena 1: Trompetas (0s a 8s)
  show('scene-1');

  // Escena 2: Feliz Cumple Mami Graciela (8s a 30s)
  setTimeout(() => {
    hide('scene-1');
    show('scene-2');
  }, 8000);

  // Escena 3: Torta y Deseo (30s a 45s)
  setTimeout(() => {
    hide('scene-2');
    show('scene-3');
    startCountdown();
  }, 30000);

  // Escena 4: Sol y Carta Darcy (45s a 90s)
  setTimeout(() => {
    hide('scene-3');
    show('scene-4');
  }, 45000);

  // Escena 5: Mariposa Verde (90s en adelante)
  setTimeout(() => {
    hide('scene-4');
    buildGreenButterfly();
    show('scene-5');
  }, 90000);
}

function show(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hide(id) {
  document.getElementById(id).classList.add('hidden');
}

// Cuenta regresiva torta
function startCountdown() {
  let val = 3;
  const numEl = document.getElementById('countdown-num');
  const titleEl = document.getElementById('wish-title');

  const interval = setInterval(() => {
    val--;
    if (val > 0) {
      numEl.innerText = val;
    } else {
      clearInterval(interval);
      document.getElementById('flame').style.display = 'none';
      titleEl.innerText = "¡BRAVOOO! 🎉✨";
      numEl.innerText = "";
      
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, 1000);
}

// Construcción de la Mariposa en Partículas Verdes
function buildGreenButterfly() {
  const canvas = document.getElementById('butterfly-canvas');
  const shades = ['#2ed573', '#10ac84', '#1dd1a1', '#7bed9f', '#00ff7f'];

  for (let t = 0; t < Math.PI * 4; t += 0.08) {
    const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
    const x = 140 + r * 40 * Math.cos(t);
    const y = 140 - r * 40 * Math.sin(t);

    const particle = document.createElement('div');
    particle.className = 'green-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    const chosenColor = shades[Math.floor(Math.random() * shades.length)];
    particle.style.color = chosenColor;
    particle.style.backgroundColor = chosenColor;
    particle.style.animationDelay = Math.random() * 2 + 's';

    canvas.appendChild(particle);
  }
}
