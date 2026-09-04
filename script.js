document.getElementById('start-btn').addEventListener('click', function() {
  document.getElementById('start-overlay').classList.add('hidden');
  const music = document.getElementById('bg-music');
  music.play();

  createStars();
  runSequence();
});

// Crear fondo de estrellas LED
function createStars() {
  const container = document.getElementById('stars-container');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star-led';
    star.style.width = Math.random() * 4 + 2 + 'px';
    star.style.height = star.style.width;
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(star);
  }
}

// Secuencia de tiempos sincronizada
function runSequence() {
  // Escena 1: Segs 1 a 8
  showScene('scene-1');

  // Escena 2: Seg 8 (Título "FELIZ CUMPLE MAMII GRACIELA")
  setTimeout(() => {
    hideScene('scene-1');
    showScene('scene-2');
  }, 8000);

  // Escena 3: Seg 30 (Torta y Cuenta Regresiva)
  setTimeout(() => {
    hideScene('scene-2');
    showScene('scene-3');
    startCountdown();
  }, 30000);

  // Escena 4: Seg 45 (Sol y Carta)
  setTimeout(() => {
    hideScene('scene-3');
    showScene('scene-4');
  }, 45000);

  // Escena 5: Seg 90 (Mariposa de luz verde y cierre)
  setTimeout(() => {
    hideScene('scene-4');
    createButterfly();
    showScene('scene-5');
  }, 90000);
}

function showScene(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hideScene(id) {
  document.getElementById(id).classList.add('hidden');
}

// Cuenta regresiva y serpentinas
function startCountdown() {
  let count = 3;
  const countEl = document.getElementById('countdown');
  const wishEl = document.getElementById('wish-text');

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countEl.innerText = count;
    } else {
      clearInterval(timer);
      document.getElementById('candle-flame').style.display = 'none';
      wishEl.innerText = "¡BRAVOOO! 🎉✨";
      countEl.innerText = "";
      launchConfetti();
    }
  }, 1000);
}

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}

// Generar mariposa con puntos verdes de distintas tonalidades
function createButterfly() {
  const container = document.getElementById('butterfly-dots');
  const greenShades = ['#1dd1a1', '#10ac84', '#00d2d3', '#54a0ff', '#2ed573'];

  // Formación matemática de alas de mariposa en puntos
  for (let t = 0; t < Math.PI * 4; t += 0.1) {
    const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
    const x = 125 + r * 35 * Math.cos(t);
    const y = 125 - r * 35 * Math.sin(t);

    const dot = document.createElement('div');
    dot.className = 'green-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    dot.style.backgroundColor = greenShades[Math.floor(Math.random() * greenShades.length)];
    container.appendChild(dot);
  }
}
