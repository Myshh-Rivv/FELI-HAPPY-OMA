/* =========================================================
   EXPERIENCIA CUMPLEAÑOS - DACHI
   VERSIÓN OPTIMIZADA PARA MÓVIL (SIN LAG)
========================================================= */

let experienceStarted = false;
let countdownStarted = false;
let letterOpened = false;
let finalStarted = false;

/* =========================================================
   INICIAR
========================================================= */

window.startExperience = function () {
    if (experienceStarted) return;
    experienceStarted = true;

    console.log("🎁 INICIANDO EXPERIENCIA");

    const giftScene = document.getElementById("scene-gift");
    const birthdayScene = document.getElementById("scene-birthday");
    const music = document.getElementById("bgMusic");

    if (giftScene) {
        giftScene.classList.remove("active");
        setTimeout(() => {
            giftScene.style.display = "none";
        }, 1500);
    }

    if (music) {
        music.currentTime = 0;
        const promise = music.play();
        if (promise) {
            promise.catch(() => {
                console.log("Audio bloqueado por el navegador.");
            });
        }
    }

    generateAmbientLights();

    setTimeout(() => {
        if (birthdayScene) {
            birthdayScene.style.display = "flex";
            setTimeout(() => {
                birthdayScene.classList.add("active");
            }, 100);
        }
        createBirthdayLetters();
    }, 800);
};

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("openGiftBtn");
    const box = document.getElementById("giftBox");

    if (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            window.startExperience();
        });
    }

    if (box) {
        box.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            window.startExperience();
        });
    }

    const openLetter = document.getElementById("openLetterBtn");
    if (openLetter) {
        openLetter.addEventListener("click", openLetterScene);
    }

    const closeLetter = document.getElementById("closeLetterBtn");
    if (closeLetter) {
        closeLetter.addEventListener("click", startFinalButterflies);
    }
});

/* =========================================================
   LUCES DE FONDO (Ajustadas según pantalla)
========================================================= */

function generateAmbientLights() {
    const container = document.getElementById("ambient-lights");
    if (!container) return;

    container.innerHTML = "";
    // En pantallas pequeñas genera menos luces para no saturar
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : 80;

    for (let i = 0; i < count; i++) {
        const light = document.createElement("div");
        light.className = "ambient-light";

        const size = Math.random() * 4 + 2;
        light.style.width = size + "px";
        light.style.height = size + "px";

        light.style.left = Math.random() * 100 + "%";
        light.style.top = Math.random() * 100 + "%";

        light.style.setProperty("--speed", (Math.random() * 8 + 6) + "s");
        light.style.animationDelay = (Math.random() * 6) + "s";

        container.appendChild(light);
    }
}

/* =========================================================
   LETRAS FELIZ CUMPLEAÑOS
========================================================= */

function createBirthdayLetters() {
    const happy = document.getElementById("happyText");
    const birthday = document.getElementById("birthdayText");

    if (!happy || !birthday) return;

    happy.innerHTML = "";
    birthday.innerHTML = "";

    createWord("FELIZ", happy, 0);
    createWord("CUMPLEAÑOS", birthday, 12);
}

function createWord(word, container, delayStart) {
    for (let i = 0; i < word.length; i++) {
        const letter = document.createElement("span");
        letter.textContent = word[i];

        const randomX = (Math.random() * 300 - 150);
        const randomY = (Math.random() * 300 - 150);
        const randomRotation = (Math.random() * 60 - 30);

        letter.style.setProperty("--start-x", randomX + "px");
        letter.style.setProperty("--start-y", randomY + "px");
        letter.style.setProperty("--rotation", randomRotation + "deg");
        letter.style.animationDelay = ((delayStart + i * 0.45) * 0.25) + "s";

        container.appendChild(letter);
    }
}

/* =========================================================
   TRANSICIÓN A TORTA
========================================================= */

setTimeout(() => {
    if (!experienceStarted) return;

    const birthday = document.getElementById("scene-birthday");
    const cake = document.getElementById("scene-cake");

    if (!birthday || !cake) return;

    birthday.classList.remove("active");

    setTimeout(() => {
        birthday.style.display = "none";
        cake.style.display = "flex";

        setTimeout(() => {
            cake.classList.add("active");
            startCountdown();
        }, 300);
    }, 1800);
}, 22000);

/* =========================================================
   CUENTA REGRESIVA
========================================================= */

function startCountdown() {
    if (countdownStarted) return;
    countdownStarted = true;

    const number = document.getElementById("countdown");
    const title = document.getElementById("countdownText");
    const message = document.getElementById("cakeMessage");
    const flame = document.getElementById("flame");

    if (!number) return;

    let count = 5;
    number.textContent = count;

    const timer = setInterval(() => {
        count--;

        if (count > 0) {
            number.textContent = count;
            return;
        }

        clearInterval(timer);
        number.textContent = "";

        if (flame) {
            flame.classList.add("flame-off");
            setTimeout(() => {
                flame.style.display = "none";
            }, 1200);
        }

        if (title) {
            title.textContent = "✨ ¡Deseo concedido! ✨";
        }

        if (message) {
            message.textContent = "Que todos tus deseos se hagan realidad.";
        }

        createGalaxy();

        setTimeout(() => {
            const cake = document.getElementById("scene-cake");
            const galaxy = document.getElementById("scene-galaxy");

            if (!cake || !galaxy) return;

            cake.classList.remove("active");

            setTimeout(() => {
                cake.style.display = "none";
                galaxy.style.display = "flex";
                galaxy.classList.add("active");
            }, 1800);
        }, 4500);
    }, 1800);
}

/* =========================================================
   GALAXIA ESPIRAL
========================================================= */

function createGalaxy() {
    const galaxy = document.getElementById("galaxy");
    if (!galaxy) return;

    galaxy.innerHTML = "";
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 70 : 140;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "galaxy-star";

        const radius = 20 + Math.random() * (isMobile ? 140 : 220);
        const duration = 8 + Math.random() * 12;

        star.style.setProperty("--radius", radius + "px");
        star.style.setProperty("--duration", duration + "s");
        star.style.animationDelay = -(Math.random() * duration) + "s";

        galaxy.appendChild(star);
    }
}

/* =========================================================
   ABRIR CARTA
========================================================= */

function openLetterScene() {
    if (letterOpened) return;
    letterOpened = true;

    const galaxy = document.getElementById("scene-galaxy");
    const letter = document.getElementById("scene-letter");

    if (!galaxy || !letter) return;

    galaxy.classList.remove("active");

    setTimeout(() => {
        galaxy.style.display = "none";
        letter.style.display = "flex";
        letter.classList.add("active");
    }, 1800);
}

/* =========================================================
   FINAL MARIPOSAS
========================================================= */

function startFinalButterflies() {
    if (finalStarted) return;
    finalStarted = true;

    const letter = document.getElementById("scene-letter");
    const finalScene = document.getElementById("scene-butterfly");

    if (!letter || !finalScene) return;

    letter.classList.remove("active");

    setTimeout(() => {
        letter.style.display = "none";
        finalScene.style.display = "flex";
        finalScene.classList.add("active");

        createFireflyButterfly();
    }, 1800);
}

/* =========================================================
   MARIPOSA DE LUCIÉRNAGAS (OPTIMIZADA GPU Y MÓVIL)
========================================================= */

function createFireflyButterfly() {
    const container = document.getElementById("fireflies");
    const text = document.getElementById("finalText");

    if (!container) return;

    container.innerHTML = "";

    const isMobile = window.innerWidth < 768;
    // Reducimos la cantidad de partículas en móvil para fluido perfecto
    const totalParticles = isMobile ? 75 : 150;
    const scaleFactor = isMobile ? 22 : 36; // Escala adaptada a la pantalla

    const points = [];

    /* 1. ALAS */
    for (let i = 0; i < totalParticles; i++) {
        const t = (i / totalParticles) * Math.PI * 2 * 2;
        const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin(t / 12), 5);

        const x = Math.sin(t) * r * scaleFactor;
        const y = -Math.cos(t) * r * scaleFactor - (isMobile ? 20 : 40);

        points.push({ x, y });
    }

    /* 2. CUERPO Y ANTENAS */
    const bodyPoints = isMobile ? 8 : 14;
    for (let i = 0; i < bodyPoints; i++) {
        points.push({ x: 0, y: -20 + (i * 1.5) });
    }

    /* CREAR Y POSICIONAR USANDO TRASLACIÓN GPU */
    points.forEach((point, index) => {
        const firefly = document.createElement("div");
        firefly.className = "firefly";

        // Posición inicial (centro)
        firefly.style.transform = `translate3d(-50%, -50%, 0) scale(0)`;
        firefly.style.transitionDelay = (index * 0.02) + "s";

        // Guardamos las coordenadas relativas en atributos data
        firefly.dataset.tx = point.x;
        firefly.dataset.ty = point.y;

        container.appendChild(firefly);
    });

    /* ANIMACIÓN A POSICIÓN DE MARIPOSA */
    setTimeout(() => {
        const fireflies = document.querySelectorAll(".firefly");

        fireflies.forEach(firefly => {
            const tx = firefly.dataset.tx;
            const ty = firefly.dataset.ty;
            // Usar translate3d fuerza el uso del procesador gráfico (GPU) en móviles
            firefly.style.transform = `translate3d(calc(-50% + ${tx}px), calc(-50% + ${ty}px), 0) scale(1.1)`;
            firefly.classList.add("forming");
        });
    }, 400);

    /* ANIMACIÓN DE PULSACIÓN Y TEXTO */
    setTimeout(() => {
        const fireflies = document.querySelectorAll(".firefly");
        fireflies.forEach(firefly => {
            firefly.classList.add("glowing");
        });

        if (text) {
            text.classList.add("visible");
        }
    }, 4800);
}
