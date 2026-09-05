/* =========================================================
   ELEMENTOS
========================================================= */

const intro = document.getElementById("intro");
const trumpetScene = document.getElementById("trumpetScene");
const birthdayScene = document.getElementById("birthdayScene");
const cakeScene = document.getElementById("cakeScene");
const galaxyScene = document.getElementById("galaxyScene");
const letterScene = document.getElementById("letterScene");
const finalScene = document.getElementById("finalScene");

const music = document.getElementById("birthdayMusic");

const openGift = document.getElementById("openGift");

const giftLid = document.querySelector(".gift-lid");

const birthdayText =
    document.getElementById("letterAnimation");

const countdown =
    document.getElementById("countdown");

const flame =
    document.getElementById("flame");

const wishMessage =
    document.getElementById("wishMessage");

const readLetter =
    document.getElementById("readLetter");

const letter =
    document.getElementById("letter");

const continueLetter =
    document.getElementById("continueLetter");


/* =========================================================
   CAMBIO DE ESCENAS
========================================================= */

function showScene(scene) {

    document
        .querySelectorAll(".screen")
        .forEach(s => {

            s.classList.remove("active");

        });

    scene.classList.add("active");
}


/* =========================================================
   EFECTOS GENERALES
========================================================= */

const effectsCanvas =
    document.getElementById("effectsCanvas");

const ctx =
    effectsCanvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    effectsCanvas.width =
        window.innerWidth * devicePixelRatio;

    effectsCanvas.height =
        window.innerHeight * devicePixelRatio;

    ctx.scale(
        devicePixelRatio,
        devicePixelRatio
    );
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   PARTICULAS
========================================================= */

function createParticle(
    x,
    y,
    color,
    speed = 5
) {

    particles.push({

        x,
        y,

        vx:
            (Math.random() - .5)
            * speed,

        vy:
            (Math.random() - .5)
            * speed,

        size:
            Math.random() * 4 + 1,

        life: 1,

        color

    });
}


function particleExplosion(
    x,
    y,
    amount = 150
) {

    const colors = [
        "#ffd84d",
        "#fff5a6",
        "#ffffff",
        "#ff9d00",
        "#ff5d22"
    ];

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        createParticle(

            x,
            y,

            colors[
                Math.floor(
                    Math.random()
                    * colors.length
                )
            ],

            12

        );

    }
}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach(
        (p, index) => {

            p.x += p.vx;

            p.y += p.vy;

            p.vy += .04;

            p.life -= .012;

            ctx.globalAlpha =
                Math.max(
                    p.life,
                    0
                );

            ctx.fillStyle =
                p.color;

            ctx.shadowBlur = 15;

            ctx.shadowColor =
                p.color;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

            if (p.life <= 0) {

                particles.splice(
                    index,
                    1
                );

            }

        }
    );

    ctx.globalAlpha = 1;

    requestAnimationFrame(
        animateParticles
    );
}

animateParticles();


/* =========================================================
   ABRIR REGALO
========================================================= */

let experienceStarted = false;

openGift.addEventListener(
    "click",
    startExperience
);


function startExperience() {

    if (experienceStarted)
        return;

    experienceStarted = true;

    /*
       Abrimos la tapa
    */

    giftLid.classList.add("open");


    /*
       Explosión inicial
    */

    setTimeout(() => {

        particleExplosion(
            window.innerWidth / 2,
            window.innerHeight / 2,
            220
        );

    }, 500);


    /*
       Música
    */

    music.volume = .8;

    music.currentTime = 0;

    music.play()
        .catch(() => {
            console.log(
                "El navegador bloqueó el audio."
            );
        });


    /*
       Cambiamos a trompetas
    */

    setTimeout(() => {

        showScene(
            trumpetScene
        );

        createGoldenParticles();

    }, 900);


    /*
       EXACTAMENTE alrededor
       del segundo 8
    */

    setTimeout(() => {

        transitionToBirthday();

    }, 8000);

}


/* =========================================================
   PARTICULAS DORADAS
========================================================= */

function createGoldenParticles() {

    for (
        let i = 0;
        i < 100;
        i++
    ) {

        setTimeout(() => {

            createParticle(

                Math.random()
                * window.innerWidth,

                Math.random()
                * window.innerHeight,

                Math.random() > .5
                    ? "#ffd84d"
                    : "#ffffff",

                2

            );

        }, Math.random() * 5000);

    }
}


/* =========================================================
   TRANSICIÓN FELIZ CUMPLEAÑOS
========================================================= */

function transitionToBirthday() {

    showScene(
        birthdayScene
    );

    createBirthdayLetters();


    /*
       Después de aparecer
       todas las letras,
       hacemos explosión
    */

    setTimeout(() => {

        explodeBirthdayText();

    }, 5500);

}


function createBirthdayLetters() {

    birthdayText.innerHTML = "";


    const text =
        "FELIZ CUMPLEAÑOS MAMIII!!";


    const colors = [
        "#ffd84d",
        "#ffffff",
        "#ffb52e",
        "#ffe99a",
        "#ffffff",
        "#ffc83d"
    ];


    [...text].forEach(
        (char, index) => {

            const span =
                document.createElement(
                    "span"
                );

            span.className =
                "birthday-letter";


            if (char === " ") {

                span.innerHTML =
                    "&nbsp;";

            } else {

                span.textContent =
                    char;

            }


            span.style.color =
                colors[
                    index %
                    colors.length
                ];


            /*
               Cada letra entra
               una después de otra
            */

            span.style.animationDelay =
                `${index * 0.16}s`;


            birthdayText.appendChild(
                span
            );

        }
    );

}


/* =========================================================
   EXPLOSIÓN DEL TEXTO
========================================================= */

function explodeBirthdayText() {

    const rect =
        birthdayText.getBoundingClientRect();


    particleExplosion(

        rect.left
        + rect.width / 2,

        rect.top
        + rect.height / 2,

        280

    );


    birthdayText.style.transition =
        "all .7s ease";

    birthdayText.style.transform =
        "scale(1.5)";

    birthdayText.style.opacity =
        "0";


    setTimeout(() => {

        showScene(
            cakeScene
        );

        startCakeCountdown();

    }, 900);

}


/* =========================================================
   CUENTA REGRESIVA DE LA TORTA
========================================================= */

function startCakeCountdown() {

    let number = 5;

    countdown.textContent =
        number;

    wishMessage.textContent =
        "PIDE UN DESEO...";


    const interval =
        setInterval(() => {

            number--;

            if (number >= 1) {

                countdown.textContent =
                    number;

                /*
                   pequeño destello
                */

                particleExplosion(

                    window.innerWidth / 2,

                    window.innerHeight / 2,

                    15

                );

            }


            if (number === 0) {

                clearInterval(interval);

                countdown.textContent =
                    "";

                blowCandle();

            }

        }, 1000);

}


/* =========================================================
   APAGAR VELA
========================================================= */

function blowCandle() {

    flame.style.transition =
        "all .5s ease";

    flame.style.transform =
        "scale(0) rotate(-70deg)";

    flame.style.opacity =
        "0";


    wishMessage.textContent =
        "¡DESEO CONCEDIDO!";


    particleExplosion(

        window.innerWidth / 2,

        window.innerHeight / 2,

        180

    );


    /*
       Después de apagar
       la vela aparece galaxia
    */

    setTimeout(() => {

        showGalaxy();

    }, 1800);

}


/* =========================================================
   GALAXIA
========================================================= */

const galaxyCanvas =
    document.getElementById(
        "galaxyCanvas"
    );

const galaxyCtx =
    galaxyCanvas.getContext(
        "2d"
    );

let galaxyStars = [];

let galaxyAnimation;


function resizeGalaxy() {

    galaxyCanvas.width =
        window.innerWidth
        * devicePixelRatio;

    galaxyCanvas.height =
        window.innerHeight
        * devicePixelRatio;

    galaxyCtx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );

}

resizeGalaxy();

window.addEventListener(
    "resize",
    resizeGalaxy
);


function createGalaxy() {

    galaxyStars = [];


    for (
        let i = 0;
        i < 700;
        i++
    ) {

        const angle =
            Math.random()
            * Math.PI * 2;


        const radius =
            Math.pow(
                Math.random(),
                .65
            )
            * Math.max(
                window.innerWidth,
                window.innerHeight
            );


        galaxyStars.push({

            angle,

            radius,

            speed:
                .0005
                + Math.random() * .0015,

            size:
                Math.random() * 1.8
                + .2,

            brightness:
                Math.random()

        });

    }

}


function animateGalaxy() {

    galaxyCtx.clearRect(

        0,
        0,
        window.innerWidth,
        window.innerHeight

    );


    const cx =
        window.innerWidth / 2;

    const cy =
        window.innerHeight / 2;


    galaxyStars.forEach(
        star => {

            star.angle +=
                star.speed;


            /*
               ESPIRAL
            */

            const spiral =
                star.angle
                + star.radius
                * .0025;


            const x =
                cx
                + Math.cos(spiral)
                * star.radius;

            const y =
                cy
                + Math.sin(spiral)
                * star.radius
                * .55;


            const alpha =
                Math.max(
                    0,
                    1 -
                    star.radius /
                    (window.innerWidth * .75)
                );


            galaxyCtx.globalAlpha =
                alpha;


            galaxyCtx.fillStyle =
                Math.random() > .97
                    ? "#ffffff"
                    : "#8f86ff";


            galaxyCtx.shadowBlur =
                8;

            galaxyCtx.shadowColor =
                "#7770ff";


            galaxyCtx.beginPath();

            galaxyCtx.arc(

                x,
                y,

                star.size,

                0,
                Math.PI * 2

            );

            galaxyCtx.fill();

        }
    );


    galaxyCtx.globalAlpha = 1;


    galaxyAnimation =
        requestAnimationFrame(
            animateGalaxy
        );

}


function showGalaxy() {

    showScene(
        galaxyScene
    );

    createGalaxy();

    cancelAnimationFrame(
        galaxyAnimation
    );

    animateGalaxy();

}


/* =========================================================
   ABRIR CARTA
========================================================= */

readLetter.addEventListener(
    "click",
    () => {

        showScene(
            letterScene
        );


        setTimeout(() => {

            letter.classList.add(
                "open"
            );


            setTimeout(() => {

                continueLetter.classList.add(
                    "show"
                );

            }, 1800);

        }, 200);

    }
);


/* =========================================================
   PASAR DE CARTA A FINAL
========================================================= */

continueLetter.addEventListener(
    "click",
    () => {

        continueLetter.classList.remove(
            "show"
        );


        letter.classList.remove(
            "open"
        );


        setTimeout(() => {

            showScene(
                finalScene
            );

            startFinalEffects();

        }, 900);

    }
);


/*
   También permitimos tocar
   directamente el pergamino
*/

letter.addEventListener(
    "click",
    () => {

        if (
            continueLetter.classList.contains(
                "show"
            )
        ) {

            continueLetter.click();

        }

    }
);


/* =========================================================
   EFECTOS FINALES VERDES
========================================================= */

function startFinalEffects() {

    const greenColors = [
        "#39ff69",
        "#aaff54",
        "#00ff9d",
        "#72ff42",
        "#d8ff78"
    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        setTimeout(() => {

            createParticle(

                Math.random()
                * window.innerWidth,

                Math.random()
                * window.innerHeight,

                greenColors[
                    Math.floor(
                        Math.random()
                        * greenColors.length
                    )
                ],

                1.5

            );

        }, Math.random() * 5000);

    }

}
