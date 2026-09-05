/* =========================================================
   REFERENCIAS
========================================================= */

const scenes = {
    gift: document.getElementById("scene-gift"),
    birthday: document.getElementById("scene-birthday"),
    cake: document.getElementById("scene-cake"),
    galaxy: document.getElementById("scene-galaxy"),
    letter: document.getElementById("scene-letter"),
    butterfly: document.getElementById("scene-butterfly")
};

const music = document.getElementById("bgMusic");

let experienceStarted = false;
let cakeTimer = null;


/* =========================================================
   CAMBIO DE ESCENAS
========================================================= */

function showScene(scene) {

    Object.values(scenes).forEach(s => {
        s.classList.remove("active");
    });

    scene.classList.add("active");
}


/* =========================================================
   AMBIENTE DE LUCES
========================================================= */

function createAmbientLights() {

    const container =
        document.getElementById("ambient-lights");

    for (let i = 0; i < 35; i++) {

        const light = document.createElement("div");

        light.style.position = "absolute";

        light.style.width =
            `${Math.random() * 3 + 1}px`;

        light.style.height =
            light.style.width;

        light.style.borderRadius = "50%";

        light.style.background =
            Math.random() > .5
                ? "#78ffc9"
                : "#e5d27f";

        light.style.left =
            `${Math.random() * 100}%`;

        light.style.top =
            `${Math.random() * 100}%`;

        light.style.boxShadow =
            `0 0 10px ${light.style.background}`;

        light.style.opacity =
            Math.random() * .6 + .2;

        light.style.animation =
            `ambientPulse ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;

        light.style.animationDelay =
            `${Math.random() * 3}s`;

        container.appendChild(light);
    }
}

const ambientStyle = document.createElement("style");

ambientStyle.innerHTML = `
@keyframes ambientPulse {

    from {
        transform: scale(.5);
        opacity: .2;
    }

    to {
        transform: scale(1.8);
        opacity: .9;
    }
}
`;

document.head.appendChild(ambientStyle);

createAmbientLights();


/* =========================================================
   ABRIR REGALO
========================================================= */

document
    .getElementById("openGiftBtn")
    .addEventListener("click", startExperience);

document
    .getElementById("giftBox")
    .addEventListener("click", startExperience);


function startExperience() {

    if (experienceStarted) return;

    experienceStarted = true;

    /* Música */
    music.volume = 0.8;

    const playPromise = music.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            /*
             * Algunos navegadores bloquean audio.
             * Si pasa, la experiencia sigue funcionando.
             */

            console.log(
                "El navegador bloqueó el audio automático."
            );

        });
    }


    /* Explosión de luces */
    createOpeningBurst();

    /* Ir a FELIZ CUMPLEAÑOS */
    setTimeout(() => {

        showScene(scenes.birthday);

        buildBirthdayText();

    }, 900);

    /*
     * EXACTAMENTE después de 8 segundos
     * pasamos a la torta.
     */

    setTimeout(() => {

        showScene(scenes.cake);

        startCakeCountdown();

    }, 8000);
}


/* =========================================================
   EXPLOSIÓN AL ABRIR
========================================================= */

function createOpeningBurst() {

    const container =
        document.getElementById("ambient-lights");

    for (let i = 0; i < 80; i++) {

        const spark = document.createElement("div");

        spark.style.position = "fixed";

        spark.style.left = "50%";
        spark.style.top = "50%";

        spark.style.width =
            `${Math.random() * 5 + 2}px`;

        spark.style.height =
            spark.style.width;

        spark.style.borderRadius = "50%";

        spark.style.background =
            Math.random() > .4
                ? "#78ffc9"
                : "#e5d27f";

        spark.style.boxShadow =
            "0 0 15px currentColor";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            150 + Math.random() * 350;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        spark.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(.2)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`,
                    opacity: 0
                }
            ],
            {
                duration: 1200 + Math.random() * 900,
                easing: "cubic-bezier(.2,.8,.2,1)"
            }
        );

        container.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 2200);
    }
}


/* =========================================================
   FELIZ CUMPLEAÑOS
========================================================= */

function buildBirthdayText() {

    createLetters(
        "happyText",
        "FELIZ"
    );

    createLetters(
        "birthdayText",
        "CUMPLEAÑOS"
    );

    createGoldenParticles();
}


function createLetters(id, text) {

    const container =
        document.getElementById(id);

    container.innerHTML = "";

    [...text].forEach((letter, index) => {

        const span =
            document.createElement("span");

        span.textContent = letter;

        /*
         * Cada letra viene de una dirección distinta.
         */

        const directions = [
            [-300, -200],
            [300, -150],
            [-350, 150],
            [350, 220],
            [-250, 300],
            [300, 100],
            [-300, 80],
            [250, -250],
            [-180, 250],
            [200, 200]
        ];

        const direction =
            directions[index % directions.length];

        span.style.setProperty(
            "--start-x",
            `${direction[0]}px`
        );

        span.style.setProperty(
            "--start-y",
            `${direction[1]}px`
        );

        span.style.setProperty(
            "--rotation",
            `${Math.random() * 50 - 25}deg`
        );

        span.style.animationDelay =
            `${index * 0.16}s`;

        container.appendChild(span);
    });
}


/* =========================================================
   PARTÍCULAS DORADAS
========================================================= */

function createGoldenParticles() {

    const container =
        document.getElementById("goldenParticles");

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("span");

        particle.style.position = "absolute";

        particle.style.width =
            `${Math.random() * 4 + 1}px`;

        particle.style.height =
            particle.style.width;

        particle.style.borderRadius = "50%";

        particle.style.background =
            Math.random() > .5
                ? "#e5d27f"
                : "#78ffc9";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.boxShadow =
            "0 0 10px currentColor";

        particle.animate(
            [
                {
                    transform: "translateY(20px)",
                    opacity: .2
                },

                {
                    transform:
                        `translateY(-${40 + Math.random() * 80}px)`,
                    opacity: 1
                },

                {
                    transform: "translateY(20px)",
                    opacity: .2
                }
            ],
            {
                duration:
                    2500 + Math.random() * 3000,

                iterations: Infinity
            }
        );

        container.appendChild(particle);
    }
}


/* =========================================================
   TORTA + CUENTA REGRESIVA
========================================================= */

function startCakeCountdown() {

    const number =
        document.getElementById("countdown");

    const text =
        document.getElementById("countdownText");

    const message =
        document.getElementById("cakeMessage");

    const flame =
        document.getElementById("flame");

    let current = 5;

    number.textContent = current;

    text.textContent = "Sopla la vela";

    message.textContent =
        "Cierra los ojos y pide un deseo...";

    flame.style.display = "block";


    if (cakeTimer) {
        clearInterval(cakeTimer);
    }


    cakeTimer = setInterval(() => {

        current--;

        if (current > 0) {

            number.textContent = current;

        } else {

            clearInterval(cakeTimer);

            number.textContent = "✦";

            text.textContent =
                "¡Deseo concedido!";

            message.textContent =
                "Que este nuevo año de tu vida esté lleno de luz.";

            /* APAGAR VELA */
            flame.style.transition =
                "opacity .7s ease";

            flame.style.opacity = "0";

            /* Estrellas */
            createCakeStars();

            /*
             * Después de apagar la vela
             * pasamos a la galaxia.
             */

            setTimeout(() => {

                showScene(scenes.galaxy);

                createGalaxy();

            }, 1800);
        }

    }, 1000);
}


/* =========================================================
   ESTRELLAS DE LA TORTA
========================================================= */

function createCakeStars() {

    for (let i = 0; i < 60; i++) {

        const star =
            document.createElement("div");

        star.style.position = "fixed";

        star.style.left = "50%";
        star.style.top = "50%";

        star.style.width = "4px";
        star.style.height = "4px";

        star.style.borderRadius = "50%";

        star.style.background =
            i % 2 === 0
                ? "#78ffc9"
                : "#e5d27f";

        star.style.boxShadow =
            "0 0 12px currentColor";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 300;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        star.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(.2)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`,
                    opacity: 0
                }
            ],
            {
                duration: 1600,
                easing: "ease-out"
            }
        );

        document.body.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 1800);
    }
}


/* =========================================================
   GALAXIA
========================================================= */

function createGalaxy() {

    const galaxy =
        document.getElementById("galaxy");

    galaxy.innerHTML = "";

    for (let i = 0; i < 100; i++) {

        const star =
            document.createElement("span");

        star.className = "galaxy-star";

        const radius =
            50 + Math.random() * 400;

        const duration =
            5 + Math.random() * 12;

        star.style.setProperty(
            "--radius",
            `${radius}px`
        );

        star.style.setProperty(
            "--duration",
            `${duration}s`
        );

        star.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        galaxy.appendChild(star);
    }
}


/* =========================================================
   ABRIR CARTA
========================================================= */

document
    .getElementById("openLetterBtn")
    .addEventListener("click", () => {

        showScene(scenes.letter);

        createLetterConfetti();

    });


/* =========================================================
   DECORACIÓN DE LA CARTA
========================================================= */

function createLetterConfetti() {

    const container =
        document.querySelector(".letter-confetti");

    container.innerHTML = "";

    for (let i = 0; i < 35; i++) {

        const item =
            document.createElement("span");

        item.textContent =
            Math.random() > .5
                ? "✦"
                : "·";

        item.style.position = "absolute";

        item.style.left =
            `${Math.random() * 100}%`;

        item.style.top =
            `${Math.random() * 100}%`;

        item.style.color =
            Math.random() > .5
                ? "rgba(120,255,201,.35)"
                : "rgba(229,210,127,.35)";

        item.style.fontSize =
            `${Math.random() * 15 + 5}px`;

        item.animate(
            [
                {
                    transform: "translateY(0)",
                    opacity: .2
                },

                {
                    transform:
                        `translateY(-${20 + Math.random() * 40}px)`,
                    opacity: .8
                },

                {
                    transform: "translateY(0)",
                    opacity: .2
                }
            ],
            {
                duration:
                    2500 + Math.random() * 3000,

                iterations: Infinity
            }
        );

        container.appendChild(item);
    }
}


/* =========================================================
   CERRAR CARTA
========================================================= */

document
    .getElementById("closeLetterBtn")
    .addEventListener("click", () => {

        showScene(scenes.butterfly);

        startButterflyEnding();

    });


/* =========================================================
   FINAL - MARIPOSA DE LUCIÉRNAGAS
========================================================= */

function startButterflyEnding() {

    createFireflies();

    createSmallButterflies();

    /*
     * Esperamos un momento para que las luces
     * aparezcan desde la oscuridad.
     */

    setTimeout(() => {

        formButterfly();

    }, 700);
}


/* =========================================================
   CREAR LUCIÉRNAGAS
========================================================= */

function createFireflies() {

    const container =
        document.getElementById("fireflies");

    container.innerHTML = "";

    /*
     * Creamos una cantidad suficiente
     * para que la mariposa sea visible.
     */

    for (let i = 0; i < 70; i++) {

        const firefly =
            document.createElement("div");

        firefly.className = "firefly";

        /*
         * Al principio nacen en posiciones aleatorias.
         */

        firefly.style.left =
            `${Math.random() * 100}%`;

        firefly.style.top =
            `${Math.random() * 100}%`;

        firefly.style.opacity =
            "0";

        container.appendChild(firefly);

        /*
         * Aparecen poco a poco.
         */

        setTimeout(() => {

            firefly.classList.add("forming");

        }, Math.random() * 1300);
    }
}


/* =========================================================
   POSICIONES DE LA MARIPOSA
========================================================= */

function formButterfly() {

    const flies =
        document.querySelectorAll(".firefly");

    /*
     * Ecuación aproximada de corazón/mariposa.
     *
     * Generamos puntos sobre dos alas.
     */

    const positions = [];

    for (let i = 0; i < 35; i++) {

        const t =
            Math.PI * 2 * i / 35;

        /*
         * Ala izquierda
         */

        positions.push({
            x:
                50 -
                Math.abs(Math.sin(t)) * 28 -
                Math.random() * 4,

            y:
                45 +
                Math.cos(t) * 27
        });

        /*
         * Ala derecha
         */

        positions.push({
            x:
                50 +
                Math.abs(Math.sin(t)) * 28 +
                Math.random() * 4,

            y:
                45 +
                Math.cos(t) * 27
        });
    }


    flies.forEach((fly, index) => {

        const point =
            positions[index % positions.length];

        fly.style.left =
            `${point.x}%`;

        fly.style.top =
            `${point.y}%`;

        fly.classList.add("glow");
    });


    /*
     * Ahora aparece la mariposa grande.
     */

    setTimeout(() => {

        document
            .getElementById("mainButterfly")
            .classList.add("visible");

    }, 2400);


    /*
     * Las luciérnagas brillan formando la figura.
     */

    setTimeout(() => {

        flies.forEach((fly, index) => {

            setTimeout(() => {

                fly.classList.remove("glow");

            }, index * 15);

        });

    }, 4000);


    /*
     * Y DESPUÉS SE DISPERSAN.
     */

    setTimeout(() => {

        flies.forEach(fly => {

            fly.style.setProperty(
                "--random-x",
                `${Math.random() * 110 - 5}%`
            );

            fly.style.setProperty(
                "--random-y",
                `${Math.random() * 110 - 5}%`
            );

            fly.classList.add("disperse");

        });

    }, 5700);


    /*
     * AQUÍ ESTÁ EL CIERRE.
     *
     * No depende de que las luciérnagas
     * terminen ninguna animación.
     *
     * El texto aparece sí o sí.
     */

    setTimeout(() => {

        document
            .getElementById("finalText")
            .classList.add("visible");

    }, 6200);
}


/* =========================================================
   MARIPOSAS PEQUEÑAS
========================================================= */

function createSmallButterflies() {

    const container =
        document.getElementById("smallButterflies");

    container.innerHTML = "";

    const amount = 9;

    for (let i = 0; i < amount; i++) {

        const butterfly =
            document.createElement("div");

        butterfly.className =
            "small-butterfly";

        butterfly.textContent =
            "🦋";

        /*
         * Se usa solamente en las pequeñas.
         * La mariposa principal NO depende de emoji.
         */

        butterfly.style.left =
            `${10 + Math.random() * 80}%`;

        butterfly.style.top =
            `${15 + Math.random() * 65}%`;

        butterfly.style.setProperty(
            "--move-x",
            `${Math.random() * 120 - 60}px`
        );

        butterfly.style.setProperty(
            "--move-y",
            `${Math.random() * 120 - 60}px`
        );

        butterfly.style.setProperty(
            "--duration",
            `${4 + Math.random() * 4}s`
        );

        butterfly.style.animationDelay =
            `${Math.random() * 2}s`;

        container.appendChild(butterfly);
    }
}


/* =========================================================
   PREVENIR SCROLL DEL BODY
========================================================= */

document.body.addEventListener(
    "touchmove",
    function (event) {
