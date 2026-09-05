/* =========================================================
   REFERENCIAS
========================================================= */

const scenes = {

    gift: document.getElementById("scene-gift"),

    trumpets: document.getElementById("scene-trumpets"),

    birthday: document.getElementById("scene-birthday"),

    cake: document.getElementById("scene-cake"),

    galaxy: document.getElementById("scene-galaxy"),

    letter: document.getElementById("scene-letter"),

    butterfly: document.getElementById("scene-butterfly")

};

const music = document.getElementById("birthdayMusic");

let currentScene = "gift";

let timers = [];

let experienceStarted = false;


/* =========================================================
   CAMBIO SEGURO DE ESCENA
========================================================= */

function goTo(sceneName) {

    if (!scenes[sceneName]) return;

    Object.values(scenes).forEach(scene => {

        scene.classList.remove("active");

    });

    scenes[sceneName].classList.add("active");

    currentScene = sceneName;

}


/* =========================================================
   CANCELAR TIMERS
========================================================= */

function clearTimers() {

    timers.forEach(timer => clearTimeout(timer));

    timers = [];

}

function wait(callback, milliseconds) {

    const timer = setTimeout(callback, milliseconds);

    timers.push(timer);

    return timer;

}


/* =========================================================
   ESTRELLAS DE FONDO
========================================================= */

function createStars() {

    const container =
        document.getElementById("stars");

    container.innerHTML = "";

    const amount =
        window.innerWidth < 600 ? 100 : 170;

    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("div");

        star.className = "star";

        const size =
            Math.random() * 3 + 1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.setProperty(
            "--duration",
            (Math.random() * 3 + 2) + "s"
        );

        star.style.animationDelay =
            Math.random() * 3 + "s";

        container.appendChild(star);

    }

}


/* =========================================================
   LUCES FLOTANTES
========================================================= */

function createFloatingLights() {

    const container =
        document.getElementById("particles");

    container.innerHTML = "";

    for (let i = 0; i < 45; i++) {

        const light =
            document.createElement("div");

        light.className = "floating-light";

        light.style.left =
            Math.random() * 100 + "%";

        light.style.setProperty(
            "--move",
            (Math.random() * 180 - 90) + "px"
        );

        light.style.setProperty(
            "--duration",
            (Math.random() * 8 + 5) + "s"
        );

        light.style.animationDelay =
            Math.random() * 8 + "s";

        container.appendChild(light);

    }

}


/* =========================================================
   EXPLOSIÓN DE LUCES DE LA CAJA
========================================================= */

function giftExplosion() {

    const container =
        document.getElementById("light-bursts");

    const amount = 100;

    for (let i = 0; i < amount; i++) {

        const light =
            document.createElement("div");

        light.className = "light-burst";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 480 + 100;

        light.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        light.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        light.style.animationDelay =
            Math.random() * .3 + "s";

        container.appendChild(light);

        setTimeout(() => {

            light.remove();

        }, 1600);

    }

}


/* =========================================================
   ABRIR REGALO
========================================================= */

document
    .getElementById("openGift")
    .addEventListener("click", startExperience);


function startExperience() {

    if (experienceStarted) return;

    experienceStarted = true;

    createStars();
    createFloatingLights();

    /*
       Importante:
       el navegador permite audio porque
       esta función nació del click del usuario.
    */

    music.volume = 0.8;

    music.currentTime = 0;

    music.play().catch(error => {

        console.log(
            "El navegador bloqueó el audio:",
            error
        );

    });

    giftExplosion();

    wait(() => {

        goTo("trumpets");

        startTrumpetSequence();

    }, 900);

}


/* =========================================================
   TROMPETAS
   HASTA SEGUNDO 8
========================================================= */

function startTrumpetSequence() {

    /*
       Las Mañanitas comienzan aquí.
       A los 8 segundos:
       transición al FELIZ CUMPLEAÑOS.
    */

    wait(() => {

        goTo("birthday");

        startBirthdaySequence();

    }, 7100);

}


/* =========================================================
   FELIZ CUMPLEAÑOS
========================================================= */

function startBirthdaySequence() {

    /*
       Las letras tardan aproximadamente 3.7 segundos
       en terminar de entrar.

       Dejamos un pequeño momento para apreciarlas.
    */

    wait(() => {

        scenes.birthday.classList.add("explode");

    }, 5700);


    wait(() => {

        scenes.birthday.classList.remove("explode");

        goTo("cake");

        startCakeSequence();

    }, 6600);

}


/* =========================================================
   TORTA + CUENTA REGRESIVA
========================================================= */

function startCakeSequence() {

    const countdown =
        document.getElementById("countdown");

    const wishText =
        document.getElementById("wishText");

    const flame =
        document.getElementById("flame");

    const blowMessage =
        document.getElementById("blowMessage");

    let number = 5;

    countdown.textContent = number;

    wishText.textContent =
        "Pide un deseo...";

    blowMessage.textContent =
        "Sopla la vela";

    flame.style.display = "block";


    /*
       Cada segundo baja un número.
    */

    const interval =
        setInterval(() => {

            number--;

            if (number > 0) {

                countdown.textContent =
                    number;

            }

            else {

                clearInterval(interval);

                countdown.textContent =
                    "";

                blowMessage.textContent =
                    "✨";

                flame.style.display =
                    "none";

                wishText.textContent =
                    "¡Deseo concedido!";

                createCandleExplosion();

                /*
                   Después de apagar la vela,
                   galaxia.
                */

                wait(() => {

                    goTo("galaxy");

                    createGalaxy();

                }, 1800);

            }

        }, 1000);

    timers.push(interval);

}


/* =========================================================
   CHISPAS AL APAGAR LA VELA
========================================================= */

function createCandleExplosion() {

    const container =
        document.getElementById("light-bursts");

    for (let i = 0; i < 60; i++) {

        const spark =
            document.createElement("div");

        spark.className = "light-burst";

        spark.style.left = "50%";
        spark.style.top = "45%";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 300 + 80;

        spark.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        spark.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        container.appendChild(spark);

        setTimeout(() => {

            spark.remove();

        }, 1500);

    }

}


/* =========================================================
   GALAXIA
========================================================= */

function createGalaxy() {

    const galaxy =
        document.getElementById("galaxy");

    galaxy.innerHTML = "";

    const amount = 180;

    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("div");

        star.className =
            "galaxy-star";

        /*
           Distribución espiral.
        */

        const angle =
            i * 0.42;

        const radius =
            Math.sqrt(i / amount) *
            Math.min(
                window.innerWidth,
                window.innerHeight
            ) *
            .65;

        const x =
            Math.cos(angle) * radius;

        const y =
            Math.sin(angle) * radius * .45;

        star.style.left =
            `calc(50% + ${x}px)`;

        star.style.top =
            `calc(50% + ${y}px)`;

        const size =
            Math.random() * 3 + 1;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        galaxy.appendChild(star);

    }

}


/* =========================================================
   ABRIR CARTA
========================================================= */

document
    .getElementById("readLetter")
    .addEventListener("click", () => {

        goTo("letter");

    });


/* =========================================================
   CERRAR CARTA -> MARIPOSAS
========================================================= */

document
    .getElementById("closeLetter")
    .addEventListener("click", () => {

        goTo("butterfly");

        startButterflyEnding();

    });


/* =========================================================
   LUCIÉRNAGAS
========================================================= */

function createFireflies() {

    const container =
        document.getElementById("fireflies");

    container.innerHTML = "";

    const amount =
        window.innerWidth < 600
            ? 80
            : 130;

    for (let i = 0; i < amount; i++) {

        const firefly =
            document.createElement("div");

        firefly.className =
            "firefly";

        firefly.style.left =
            Math.random() * 100 + "%";

        firefly.style.top =
            Math.random() * 100 + "%";

        firefly.style.setProperty(
            "--x",
            (Math.random() * 100 - 50) + "px"
        );

        firefly.style.setProperty(
            "--y",
            (Math.random() * 100 - 50) + "px"
        );

        firefly.style.setProperty(
            "--duration",
            (Math.random() * 2 + 2) + "s"
        );

        firefly.style.animationDelay =
            Math.random() * 2 + "s";

        container.appendChild(firefly);

    }

}


/* =========================================================
   MARIPOSA GRANDE
========================================================= */

function createButterfly() {

    const container =
        document.getElementById("bigButterfly");

    container.innerHTML = "";

    /*
       Coordenadas de una mariposa.

       Cada punto es una luciérnaga.
       Las partículas comienzan lejos y
       vuelan hacia estas coordenadas.
    */

    const points = [];

    /*
       ALA IZQUIERDA
    */

    for (let i = 0; i < 55; i++) {

        const t = Math.random();

        const x =
            -20 -
            Math.random() * 130 *
            (0.4 + Math.sin(t * Math.PI) * .7);

        const y =
            (Math.random() - .5) *
            170 *
            (0.5 + t);

        points.push([x, y]);

    }


    /*
       ALA DERECHA
    */

    for (let i = 0; i < 55; i++) {

        const t = Math.random();

        const x =
            20 +
            Math.random() * 130 *
            (0.4 + Math.sin(t * Math.PI) * .7);

        const y =
            (Math.random() - .5) *
            170 *
            (0.5 + t);

        points.push([x, y]);

    }


    /*
       BORDE SUPERIOR IZQUIERDO
    */

    for (let i = 0; i < 35; i++) {

        const angle =
            Math.random() * Math.PI;

        const radius =
            50 + Math.random() * 85;

        const x =
            -30 -
            Math.cos(angle) * radius;

        const y =
            -20 -
            Math.sin(angle) * radius * .65;

        points.push([x, y]);

    }


    /*
       BORDE SUPERIOR DERECHO
    */

    for (let i = 0; i < 35; i++) {

        const angle =
            Math.random() * Math.PI;

        const radius =
            50 + Math.random() * 85;

        const x =
            30 +
            Math.cos(angle) * radius;

        const y =
            -20 -
            Math.sin(angle) * radius * .65;

        points.push([x, y]);

    }


    /*
       CUERPO
    */

    for (let i = 0; i < 35; i++) {

        const y =
            -90 +
            Math.random() * 180;

        points.push([
            (Math.random() - .5) * 12,
            y
        ]);

    }


    points.forEach((point, index) => {

        const particle =
            document.createElement("div");

        particle.className =
            "butterfly-particle";

        /*
           Posición inicial:
           alejada.
        */

        particle.style.setProperty(
            "--sx",
            (Math.random() * 700 - 350) + "px"
        );

        particle.style.setProperty(
            "--sy",
            (Math.random() * 600 - 300) + "px"
        );


        /*
           Posición final.
        */

        particle.style.setProperty(
            "--tx",
            point[0] + "px"
        );

        particle.style.setProperty(
            "--ty",
            point[1] + "px"
        );

        particle.style.setProperty(
            "--scale",
            (Math.random() * .8 + .6)
        );

        particle.style.setProperty(
            "--delay",
            Math.random() * 1.7 + "s"
        );

        container.appendChild(particle);

    });

}


/* =========================================================
   DISPERSIÓN DE MARIPOSA
========================================================= */

function butterflyDisperse() {

    const particles =
        document.querySelectorAll(
            ".butterfly-particle"
        );

    particles.forEach((particle, index) => {

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 600 + 200;

        particle.style.animation =
            "none";

        particle.offsetHeight;

        particle.style.transition =
            "transform 2s ease-out, opacity 2s ease-out";

        particle.style.transform =
            `translate(
                ${Math.cos(angle) * distance}px,
                ${Math.sin(angle) * distance}px
            ) scale(.1)`;

        particle.style.opacity = "0";

    });

}


/* =========================================================
   CIERRE COMPLETO
========================================================= */

function startButterflyEnding() {

    /*
       Limpiamos cualquier resto.
    */

    clearTimers();

    createFireflies();

    createButterfly();


    /*
       La mariposa se forma.
    */

    wait(() => {

        /*
           Después de formarse permanece unos segundos.
           NO termina la página.
        */

    }, 3500);


    /*
       A los 8 segundos se dispersa.
    */

    wait(() => {

        butterflyDisperse();

    }, 8000);


    /*
       Luego dejamos las luces flotando
       y el mensaje final permanece.
    */

}


/* =========================================================
   PREVENIR DOBLE CLICK
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            currentScene === "gift" &&
            event.target !==
            document.getElementById("openGift")
        ) {

            /*
               No hacemos nada.
            */

        }

    }
);


/* =========================================================
   INICIO
========================================================= */

createStars();
createFloatingLights();
