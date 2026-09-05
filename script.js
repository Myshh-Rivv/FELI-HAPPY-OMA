// ============================================================
//  EXPERIENCIA DE CUMPLEAÑOS - MAMI GRACIELA
//  Inicio robusto para celular
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    const startOverlay = document.getElementById("start-overlay");
    const startBtn = document.getElementById("start-btn");
    const music = document.getElementById("bg-music");

    let experienceStarted = false;

    // --------------------------------------------------------
    // BOTÓN ABRIR
    // --------------------------------------------------------

    if (startBtn) {
        startBtn.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            startExperience();

        });
    }

    // También permitimos tocar la caja/regalo
    if (startOverlay) {
        startOverlay.addEventListener("click", (event) => {

            // Si ya comenzó, no hacemos nada
            if (experienceStarted) return;

            // Si tocaron el botón, el botón ya se encarga
            if (event.target.closest("#start-btn")) return;

            startExperience();

        });
    }


    // --------------------------------------------------------
    // COMENZAR EXPERIENCIA
    // --------------------------------------------------------

    function startExperience() {

        // Evita que un doble toque dispare todo dos veces
        if (experienceStarted) return;

        experienceStarted = true;

        console.log("🎁 Experiencia iniciada");


        // ----------------------------------------------------
        // QUITAR PANTALLA INICIAL
        // ----------------------------------------------------

        if (startOverlay) {

            startOverlay.classList.add("hidden");

            // Por seguridad
            setTimeout(() => {
                startOverlay.style.display = "none";
            }, 500);
        }


        // ----------------------------------------------------
        // MÚSICA
        // ----------------------------------------------------

        if (music) {

            music.currentTime = 0;

            const playMusic = music.play();

            // IMPORTANTE:
            // Si Chrome/Android bloquea el audio,
            // NO detenemos la animación.
            if (playMusic !== undefined) {

                playMusic
                    .then(() => {
                        console.log("🎵 Música iniciada");
                    })
                    .catch((error) => {
                        console.log(
                            "El navegador bloqueó el audio. La animación continúa.",
                            error
                        );
                    });

            }
        }


        // ----------------------------------------------------
        // FONDO
        // ----------------------------------------------------

        generateLights();


        // ----------------------------------------------------
        // COMENZAR HISTORIA
        // ----------------------------------------------------

        runTimeline();

    }



    // ========================================================
    // LUCES DEL FONDO
    // ========================================================

    function generateLights() {

        const container =
            document.getElementById("floating-background");

        if (!container) return;

        // Limpiar por si acaso
        container.innerHTML = "";

        const colors = [
            "#d7ff4f",
            "#b6ff00",
            "#7cff00",
            "#39ff88",
            "#00ffcc",
            "#ffffff"
        ];


        // MUCHAS más luces
        for (let i = 0; i < 90; i++) {

            const light = document.createElement("div");

            light.className = "pastel-sparkle";

            const size =
                Math.random() * 7 + 2;

            light.style.width = size + "px";
            light.style.height = size + "px";

            light.style.background =
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ];

            light.style.left =
                Math.random() * 100 + "%";

            light.style.top =
                Math.random() * 100 + "%";

            light.style.animationDuration =
                (Math.random() * 5 + 3) + "s";

            light.style.animationDelay =
                (Math.random() * 4) + "s";

            light.style.boxShadow =
                "0 0 " +
                (Math.random() * 12 + 5) +
                "px currentColor";

            container.appendChild(light);
        }

    }



    // ========================================================
    // CONTROL DE ESCENAS
    // ========================================================

    function show(id) {

        const element =
            document.getElementById(id);

        if (!element) {
            console.warn("No existe:", id);
            return;
        }

        element.classList.remove("hidden");

    }


    function hide(id) {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.classList.add("hidden");

    }



    // ========================================================
    // HISTORIA
    // ========================================================

    function runTimeline() {

        console.log("🎬 Timeline iniciada");


        // ----------------------------------------------------
        // ESCENA 1
        // ----------------------------------------------------

        show("scene-1");


        // ----------------------------------------------------
        // SEGUNDO 8
        // ----------------------------------------------------

        setTimeout(() => {

            console.log("✨ Escena 2");

            hide("scene-1");
            show("scene-2");

            startCountdown();

        }, 8000);


        // ----------------------------------------------------
        // DESPUÉS DE LA TORTA
        // ----------------------------------------------------

        setTimeout(() => {

            console.log("📜 Carta");

            hide("scene-2");
            show("scene-3");

        }, 15000);


        // ----------------------------------------------------
        // FINAL
        // ----------------------------------------------------

        setTimeout(() => {

            console.log("🦋 FINAL");

            hide("scene-3");
            show("scene-4");

            startButterflies();

        }, 30000);

    }



    // ========================================================
    // CUENTA REGRESIVA
    // ========================================================

    function startCountdown() {

        const number =
            document.getElementById("countdown-num");

        const title =
            document.getElementById("wish-title");

        const flame =
            document.getElementById("flame");

        if (!number) return;

        let count = 5;

        number.textContent = count;


        const timer =
            setInterval(() => {

                count--;

                if (count > 0) {

                    number.textContent = count;

                } else {

                    clearInterval(timer);

                    number.textContent = "";

                    if (flame) {

                        flame.classList.add("flame-off");

                        setTimeout(() => {
                            flame.style.display = "none";
                        }, 700);

                    }

                    if (title) {
                        title.textContent =
                            "✨ ¡Deseo concedido! ✨";
                    }

                    createStars();

                }

            }, 1000);

    }



    // ========================================================
    // ESTRELLAS
    // ========================================================

    function createStars() {

        const container =
            document.getElementById(
                "floating-background"
            );

        if (!container) return;


        for (let i = 0; i < 80; i++) {

            const star =
                document.createElement("div");

            star.className = "galaxy-star";

            star.style.left =
                Math.random() * 100 + "%";

            star.style.top =
                Math.random() * 100 + "%";

            star.style.animationDelay =
                Math.random() * 3 + "s";

            container.appendChild(star);

        }

    }



    // ========================================================
    // MARIPOSAS
    // ========================================================

    function startButterflies() {

        console.log("🦋 INICIANDO MARIPOSAS");

        const container =
            document.getElementById(
                "floating-background"
            );

        if (!container) return;


        // Crear muchas pequeñas luces
        for (let i = 0; i < 35; i++) {

            const butterfly =
                document.createElement("div");

            butterfly.className =
                "firefly-butterfly";

            butterfly.innerHTML = "🦋";

            butterfly.style.left =
                Math.random() * 100 + "%";

            butterfly.style.top =
                Math.random() * 100 + "%";

            butterfly.style.animationDelay =
                Math.random() * 4 + "s";

            container.appendChild(butterfly);

        }

    }



    // ========================================================
    // CONFETI
    // ========================================================

    function triggerConfetti() {

        if (typeof confetti !== "function") {
            console.log("Confetti no disponible");
            return;
        }

        confetti({
            particleCount: 150,
            spread: 100,
            startVelocity: 35,
            origin: {
                y: 0.6
            }
        });

    }

});
