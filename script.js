/* =========================================================
   EXPERIENCIA CUMPLEAÑOS - DACHI
   VERSION ROBUSTA PARA CELULAR
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

    /* -----------------------------------------------
       OCULTAR REGALO
    ------------------------------------------------ */
    if (giftScene) {
        giftScene.classList.remove("active");
        setTimeout(() => {
            giftScene.style.display = "none";
        }, 1000);
    }

    /* -----------------------------------------------
       MUSICA
    ------------------------------------------------ */
    if (music) {
        music.currentTime = 0;
        const promise = music.play();
        if (promise) {
            promise
                .then(() => {
                    console.log("🎵 Mañanitas reproduciéndose");
                })
                .catch(() => {
                    console.log("Audio bloqueado, pero continúa la experiencia.");
                });
        }
    }

    /* -----------------------------------------------
       LUCES
    ------------------------------------------------ */
    generateAmbientLights();

    /* -----------------------------------------------
       FELIZ CUMPLEAÑOS
    ------------------------------------------------ */
    setTimeout(() => {
        if (birthdayScene) {
            birthdayScene.style.display = "flex";
            setTimeout(() => {
                birthdayScene.classList.add("active");
            }, 50);
        }
        createBirthdayLetters();
    }, 250);
};

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Página cargada correctamente");

    /* ---------------------------------------------
       BOTON REGALO
    ---------------------------------------------- */
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

    /* ---------------------------------------------
       CARTA
    ---------------------------------------------- */
    const openLetter = document.getElementById("openLetterBtn");
    if (openLetter) {
        openLetter.addEventListener("click", openLetterScene);
    }

    /* ---------------------------------------------
       CONTINUAR CARTA
    ---------------------------------------------- */
    const closeLetter = document.getElementById("closeLetterBtn");
    if (closeLetter) {
        closeLetter.addEventListener("click", startFinalButterflies);
    }
});

/* =========================================================
   LUCES DE FONDO
========================================================= */

function generateAmbientLights() {
    const container = document.getElementById("ambient-lights");
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 120; i++) {
        const light = document.createElement("div");
        light.className = "ambient-light";

        const size = Math.random() * 5 + 2;
        light.style.width = size + "px";
        light.style.height = size + "px";

        light.style.left = Math.random() * 100 + "%";
        light.style.top = Math.random() * 100 + "%";

        light.style.setProperty("--speed", (Math.random() * 5 + 3) + "s");
        light.style.animationDelay = (Math.random() * 5) + "s";

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
    createWord("CUMPLEAÑOS", birthday, 5);
}

/* =========================================================
   CREAR PALABRA LETRA POR LETRA
========================================================= */

function createWord(word, container, delayStart) {
    for (let i = 0; i < word.length; i++) {
        const letter = document.createElement("span");
        letter.textContent = word[i];

        const randomX = (Math.random() * 500 - 250);
        const randomY = (Math.random() * 500 - 250);
        const randomRotation = (Math.random() * 70 - 35);

        letter.style.setProperty("--start-x", randomX + "px");
        letter.style.setProperty("--start-y", randomY + "px");
        letter.style.setProperty("--rotation", randomRotation + "deg");
        letter.style.animationDelay = (delayStart + i * .25) + "s";

        container.appendChild(letter);
    }
}

/* =========================================================
   TRANSICION A TORTA
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
        }, 100);
    }, 900);
}, 11000);

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
            }, 700);
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
            }, 800);
        }, 2500);
    }, 1000);
}

/* =========================================================
   GALAXIA ESPIRAL
========================================================= */

function createGalaxy() {
    const galaxy = document.getElementById("galaxy");
    if (!galaxy) return;

    galaxy.innerHTML = "";

    for (let i = 0; i < 180; i++) {
        const star = document.createElement("div");
        star.className = "galaxy-star";

        const radius = 30 + Math.random() * 230;
        const duration = 5 + Math.random() * 8;

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
    }, 900);
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
    }, 900);
}

/* =========================================================
   MARIPOSA DE LUCIÉRNAGAS PERFECTA
========================================================= */

function createFireflyButterfly() {
    const container = document.getElementById("fireflies");
    const text = document.getElementById("finalText");

    if (!container) return;

    container.innerHTML = "";

    const points = [];
    const totalParticles = 160;

    /* ---------------------------------------------
       1. ALAS (Ecuación Paramétrica de Mariposa)
    ---------------------------------------------- */
    for (let i = 0; i < totalParticles; i++) {
        const t = (i / totalParticles) * Math.PI * 2 * 2;
        const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin(t / 12), 5);

        const x = Math.sin(t) * r * 38;
        const y = -Math.cos(t) * r * 38 - 40;

        points.push({
            x: 50 + (x / window.innerWidth) * 100,
            y: 45 + (y / window.innerHeight) * 100
        });
    }

    /* ---------------------------------------------
       2. CUERPO Y ANTENAS
    ---------------------------------------------- */
    // Torso central
    for (let i = 0; i < 15; i++) {
        points.push({
            x: 50,
            y: 38 + (i * 0.9)
        });
    }

    // Antena Izquierda
    for (let i = 0; i < 8; i++) {
        points.push({
            x: 50 - (i * 0.6),
            y: 37 - (i * 0.8)
        });
    }

    // Antena Derecha
    for (let i = 0; i < 8; i++) {
        points.push({
            x: 50 + (i * 0.6),
            y: 37 - (i * 0.8)
        });
    }

    /* ---------------------------------------------
       CREAR ELEMENTOS DE LUZ
    ---------------------------------------------- */
    points.forEach((point, index) => {
        const firefly = document.createElement("div");
        firefly.className = "firefly";

        firefly.style.left = "50%";
        firefly.style.top = "50%";

        firefly.style.transitionDelay = (index * 0.012) + "s";

        firefly.dataset.x = point.x;
        firefly.dataset.y = point.y;

        container.appendChild(firefly);
    });

    /* ---------------------------------------------
       ANIMACIÓN: ARMAR MARIPOSA
    ---------------------------------------------- */
    setTimeout(() => {
        const fireflies = document.querySelectorAll(".firefly");

        fireflies.forEach(firefly => {
            firefly.style.left = firefly.dataset.x + "%";
            firefly.style.top = firefly.dataset.y + "%";
            firefly.classList.add("forming");
        });
    }, 300);

    /* ---------------------------------------------
       ANIMACIÓN: PULSACIÓN Y TEXTO FINAL
    ---------------------------------------------- */
    setTimeout(() => {
        const fireflies = document.querySelectorAll(".firefly");
        fireflies.forEach(firefly => {
            firefly.classList.add("glowing");
        });

        if (text) {
            text.classList.add("visible");
        }
    }, 2800);
}
