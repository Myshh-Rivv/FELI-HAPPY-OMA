document.getElementById('start-overlay').addEventListener('click', startExperience);

function startExperience() {
  document.getElementById('start-overlay').classList.add('hidden');
  const music = document.getElementById('bg-music');
  music.play();

  generatePastelSparkles();
  runTimeline();
}

// Crear burbujitas y chispas pastel flotantes
function generatePastelSparkles() {
  const container = document.getElementById('floating-background');
  const colors = ['#ffb6c1', '#ffd1dc', '#e0c3fc', '#b9fbc0', '#fbf8cc'];

  for (let i = 0; i < 40; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'pastel-sparkle';
    const size = Math.random() * 16 + 8;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(sparkle);
  }
}

// Cronología de la animación
function runTimeline() {
  // Escena 1: Mensaje inicial animado (0s a 8s)
  show('scene-1');

  // Escena 2: Torta de cumpleaños (8s a 30s)
  setTimeout(() => {
    hide('scene-1');
    show('scene-2');
    startCountdown();
  }, 8000);

  // Escena 3: Carta con flores desplegables (30s a 60s)
  setTimeout(() => {
    hide('scene-2');
    show('scene-3');
  }, 30000);

  // Escena 4: Pantalla final de flores y cariño (60s en adelante)
  setTimeout(() => {
    hide('scene-3');
    show('scene-4');
    triggerConfetti();
  }, 60000);
}

function show(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hide(id) {
  document.getElementById(id).classList.add('hidden');
}

// Cuenta regresiva velita
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
      titleEl.innerText = "¡Deseo Concedido! 💖";
      numEl.innerText = "";
      
      triggerConfetti();
    }
  }, 1000);
}

function triggerConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#ffb6c1', '#ff5e7e', '#6c5ce7', '#fbf8cc']
  });
}
