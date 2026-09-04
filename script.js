document.getElementById('start-btn').addEventListener('click', function() {
  document.getElementById('start-overlay').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');

  const music = document.getElementById('bg-music');
  music.play();

  launchConfetti();
  setInterval(launchConfetti, 3000);
});

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}
