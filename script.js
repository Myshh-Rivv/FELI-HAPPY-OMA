
/* =====================================================
   ELEMENTOS
===================================================== */

const intro = document.getElementById("intro");
const trumpetScene = document.getElementById("trumpetScene");
const birthdayScene = document.getElementById("birthdayScene");
const cakeScene = document.getElementById("cakeScene");
const galaxyScene = document.getElementById("galaxyScene");
const letterScene = document.getElementById("letterScene");
const butterflyScene = document.getElementById("butterflyScene");

const openGift = document.getElementById("openGift");
const readLetter = document.getElementById("readLetter");
const closeLetter = document.getElementById("closeLetter");

const music = document.getElementById("bgMusic");

const countdown = document.getElementById("countdown");
const wishText = document.getElementById("wishText");
const flame = document.getElementById("flame");


/* =====================================================
   CANVAS ESPACIAL
===================================================== */

const spaceCanvas = document.getElementById("spaceCanvas");
const ctx = spaceCanvas.getContext("2d");

let W;
let H;

function resizeCanvas() {

    W = spaceCanvas.width = window.innerWidth * devicePixelRatio;
    H = spaceCanvas.height = window.innerHeight * devicePixelRatio;

    spaceCanvas.style.width = window.innerWidth + "px";
    spaceCanvas.style.height = window.innerHeight + "px";

    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =====================================================
   ESTRELLAS / LUCES
===================================================== */

const stars = [];

function createStars() {

    stars.length = 0;

    const amount =
        window.innerWidth < 600
            ? 130
            : 220;

    for (let i = 0; i < amount; i++) {

        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,

            radius:
                Math.random() * 1.6 + .2,

            alpha:
                Math.random() * .7 + .15,

            speed:
                Math.random() * .015 + .004,

            phase:
                Math.random() * Math.PI * 2
        });
    }
}

createStars();


function drawStars(time) {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    for (const star of stars) {

        const pulse =
            Math.sin(
                time * star.speed +
                star.phase
            ) * .5 + .5;

        const alpha =
            star.alpha * (.4 + pulse * .6);

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(150,255,215,${alpha})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00ff9d";

        ctx.fill();
    }

    requestAnimationFrame(drawStars);
}

requestAnimationFrame(drawStars);


/* =====================================================
   CAMBIO DE ESCENA
===================================================== */

function showScene(scene) {

    document.querySelectorAll(".screen")
        .forEach(s => s.classList.remove("active"));

    scene.classList.add("active");
}


/* =====================================================
   ABRIR REGALO
===================================================== */

openGift.addEventListener("click", () => {

    // Intentar reproducir audio
    music.currentTime = 0;

    music.play().catch(() => {
        console.log("El navegador bloqueó el audio.");
    });

    // Explosión inicial
    launchLights();

    // Abrir regalo visualmente
    document.querySelector(".gift").style.transform =
        "translateY(-30px) scale(1.15) rotateX(20deg)";

    setTimeout(() => {

        showScene(trumpetScene);

    }, 500);

    /*
       A los 8 segundos termina la sección
       de las trompetas.
    */

    setTimeout(() => {

        showBirthday();

    }, 8000);
});


/* =====================================================
   LUCES DE APERTURA
===================================================== */

function launchLights() {

    for (let i = 0; i < 130; i++) {

        const particle =
            document.createElement("div");

        particle.style.position = "fixed";

        particle.style.left = "50%";
        particle.style.top = "52%";

        particle.style.width =
            Math.random() * 5 + 2 + "px";

        particle.style.height =
            particle.style.width;

        particle.style.borderRadius = "50%";

        particle.style.background =
            i % 3 === 0
                ? "#ffe58b"
                : "#5dffc5";

        particle.style.boxShadow =
            "0 0 12px currentColor";

        particle.style.zIndex = "100";

        particle.style.pointerEvents = "none";

        document.body.appendChild(particle);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            150 + Math.random() * 500;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        particle.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.2)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: .15
                },

                {
                    transform:
                        `translate(calc(-50% + ${x}px),
                         calc(-50% + ${y}px))
                         scale(.1)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    900 + Math.random() * 1100,

                easing: "cubic-bezier(.1,.7,.2,1)"
            }
        );

        setTimeout(() => {
            particle.remove();
        }, 2200);
    }
}


/* =====================================================
   FELIZ CUMPLEAÑOS
===================================================== */

function showBirthday() {

    showScene(birthdayScene);

    /*
       Esperamos a que termine la aparición
       de todas las letras.

       Después:
       TEXTO → EXPLOSIÓN → TORTA
    */

    setTimeout(() => {

        explodeBirthday();

    }, 5200);
}


/* =====================================================
   EXPLOSIÓN DEL TEXTO
===================================================== */

function explodeBirthday() {

    const letters =
        document.querySelectorAll(".letter");

    letters.forEach((letter, index) => {

        const rect =
            letter.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        letter.style.position = "fixed";
        letter.style.left = centerX + "px";
        letter.style.top = centerY + "px";
        letter.style.margin = "0";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 250;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        letter.animate(

            [
                {
                    transform:
                        "translate(-50%,-50%) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                         )
                         rotate(${Math.random() * 500 - 250}deg)
                         scale(0)`,

                    opacity: 0
                }
            ],

            {
                duration: 1000,
                delay: index * 25,
                easing: "cubic-bezier(.1,.7,.2,1)",
                fill: "forwards"
            }
        );
    });

    // Partículas verdes y doradas
    birthdayExplosion();

    setTimeout(() => {

        showScene(cakeScene);

        startCakeCountdown();

    }, 1200);
}


/* =====================================================
   EXPLOSIÓN DEL CUMPLEAÑOS
===================================================== */

function birthdayExplosion() {

    const colors = [
        "#00ff9d",
        "#7affca",
        "#ffe28a",
        "#ffffff"
    ];

    confetti({

        particleCount: 180,

        spread: 150,

        startVelocity: 45,

        gravity: .7,

        scalar: .8,

        origin: {
            x: .5,
            y: .48
        },

        colors
    });
}


/* =====================================================
   CUENTA REGRESIVA
===================================================== */

function startCakeCountdown() {

    let number = 5;

    countdown.textContent = number;

    wishText.textContent =
        "SOPLA LA VELA";

    const timer =
        setInterval(() => {

            number--;

            if (number > 0) {

                countdown.textContent =
                    number;

            } else {

                clearInterval(timer);

                countdown.textContent = "";

                wishText.textContent =
                    "¡DESEO CONCEDIDO!";

                // Apagar vela
                flame.style.opacity = "0";

                flame.style.transform =
                    "translateX(-50%) scale(0)";

                // Después de apagar la vela
                setTimeout(() => {

                    showGalaxy();

                }, 1800);
            }

        }, 1000);
}


/* =====================================================
   GALAXIA
===================================================== */

function showGalaxy() {

    showScene(galaxyScene);

    createGalaxyParticles();

    setTimeout(() => {

        readLetter.style.opacity = "1";

    }, 1500);
}


/* =====================================================
   PARTÍCULAS DE GALAXIA
===================================================== */

function createGalaxyParticles() {

    for (let i = 0; i < 100; i++) {

        const particle =
            document.createElement("div");

        particle.style.position = "absolute";

        particle.style.left = "50%";
        particle.style.top = "50%";

        particle.style.width =
            Math.random() * 3 + 1 + "px";

        particle.style.height =
            particle.style.width;

        particle.style.borderRadius = "50%";

        particle.style.background =
            i % 4 === 0
                ? "#ffffff"
                : "#55ffc0";

        particle.style.boxShadow =
            "0 0 10px #00ff9d";

        particle.style.pointerEvents =
            "none";

        galaxyScene.appendChild(particle);

        const angle =
            Math.random() * Math.PI * 2;

        const radius =
            30 + Math.random() * 300;

        const x =
            Math.cos(angle) * radius;

        const y =
            Math.sin(angle) * radius * .65;

        particle.animate(

            [
                {
                    transform:
                        "translate(-50%,-50%) scale(0)"
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                         )
                         scale(1)`
                }
            ],

            {
                duration:
                    1500 + Math.random() * 2000,

                delay:
                    Math.random() * 1500,

                fill: "forwards",

                easing: "ease-out"
            }
        );
    }
}


/* =====================================================
   ABRIR CARTA
===================================================== */

readLetter.addEventListener("click", () => {

    showScene(letterScene);

});


/* =====================================================
   CERRAR CARTA
===================================================== */

closeLetter.addEventListener("click", () => {

    showScene(butterflyScene);

    startButterflyShow();

});


/* =====================================================
   MARIPOSA DE LUCIÉRNAGAS
===================================================== */

const butterflyCanvas =
    document.getElementById("butterflyCanvas");

const bctx =
    butterflyCanvas.getContext("2d");

let BW;
let BH;

function resizeButterflyCanvas() {

    BW =
        butterflyCanvas.width =
        window.innerWidth * devicePixelRatio;

    BH =
        butterflyCanvas.height =
        window.innerHeight * devicePixelRatio;

    butterflyCanvas.style.width =
        window.innerWidth + "px";

    butterflyCanvas.style.height =
        window.innerHeight + "px";

    bctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );
}

resizeButterflyCanvas();

window.addEventListener(
    "resize",
    resizeButterflyCanvas
);


/* =====================================================
   PUNTOS DE LA MARIPOSA
===================================================== */

let butterflies = [];

function generateButterflyPoints() {

    const points = [];

    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight * .43;

    const scale =
        Math.min(
            window.innerWidth,
            window.innerHeight
        ) * .004;

    /*
       Ecuación paramétrica aproximada
       para construir las alas.
    */

    for (
        let t = 0;
        t < Math.PI * 12;
        t += .025
    ) {

        const x =
            Math.sin(t) *
            (
                Math.exp(Math.cos(t))
                - 2 * Math.cos(4 * t)
                - Math.pow(
                    Math.sin(t / 12),
                    5
                )
            );

        const y =
            -Math.cos(t) *
            (
                Math.exp(Math.cos(t))
                - 2 * Math.cos(4 * t)
                - Math.pow(
                    Math.sin(t / 12),
                    5
                )
            );

        points.push({

            x:
                centerX + x * scale * 20,

            y:
                centerY + y * scale * 20

        });
    }

    return points;
}


/* =====================================================
   CREAR LUCIÉRNAGAS
===================================================== */

function startButterflyShow() {

    butterflies = [];

    const points =
        generateButterflyPoints();

    const amount =
        window.innerWidth < 600
            ? 250
            : 420;

    for (let i = 0; i < amount; i++) {

        const target =
            points[
                i % points.length
            ];

        butterflies.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                window.innerHeight +
                Math.random() * 300,

            targetX: target.x,
            targetY: target.y,

            size:
                Math.random() * 2.8 + 1,

            speed:
                .005 +
                Math.random() * .018,

            phase:
                Math.random() * Math.PI * 2,

            delay:
                Math.random() * 3000
        });
    }

    animateButterflies();

    /*
       Después de 4.5 segundos las
       mariposas ya formaron la figura.
    */

    setTimeout(() => {

        disperseButterflies();

    }, 7500);
}


/* =====================================================
   ANIMACIÓN DE MARIPOSAS
===================================================== */

let butterflyStart =
    performance.now();

function animateButterflies(time) {

    bctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    const elapsed =
        time - butterflyStart;

    butterflies.forEach((b, index) => {

        const delay =
            b.delay;

        const progress =
            Math.max(
                0,
                Math.min(
                    1,
                    (elapsed - delay) / 3500
                )
            );

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );

        b.x +=
            (b.targetX - b.x)
            * b.speed
            * eased
            * 2;

        b.y +=
            (b.targetY - b.y)
            * b.speed
            * eased
            * 2;

        const movement =
            Math.sin(
                time * .002 +
                b.phase
            ) * 2;

        const alpha =
            .35 +
            eased * .65;

        /*
           Halo
        */

        const gradient =
            bctx.createRadialGradient(
                b.x,
                b.y,
                0,
                b.x,
                b.y,
                b.size * 6
            );

        gradient.addColorStop(
            0,
            `rgba(210,255,235,${alpha})`
        );

        gradient.addColorStop(
            .25,
            `rgba(40,255,165,${alpha})`
        );

        gradient.addColorStop(
            1,
            "rgba(0,255,157,0)"
        );

        bctx.beginPath();

        bctx.fillStyle = gradient;

        bctx.arc(
            b.x,
            b.y + movement,
            b.size * 6,
            0,
            Math.PI * 2
        );

        bctx.fill();


        /*
           Núcleo brillante
        */

        bctx.beginPath();

        bctx.fillStyle =
            `rgba(220,255,240,${alpha})`;

        bctx.arc(
            b.x,
            b.y + movement,
            b.size,
            0,
            Math.PI * 2
        );

        bctx.fill();
    });

    requestAnimationFrame(
        animateButterflies
    );
}


/* =====================================================
   DISPERSIÓN
===================================================== */

function disperseButterflies() {

    butterflies.forEach(b => {

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            200 +
            Math.random() * 700;

        b.targetX =
            b.x +
            Math.cos(angle) * distance;

        b.targetY =
            b.y +
            Math.sin(angle) * distance;
    });

    /*
       Ahora el texto final aparece
       después de que empieza la dispersión.
    */

    const message =
        document.querySelector(".final-message");

    message.style.animation =
        "finalSoftAppear 2s forwards";
}


/* =====================================================
   CONFETI FINAL MUY SUTIL
===================================================== */

setTimeout(() => {

    // No hace nada hasta que se llegue
    // a la escena final.

}, 1000);
