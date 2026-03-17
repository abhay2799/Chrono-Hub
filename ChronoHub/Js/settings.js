/* =====================================================
   SETTINGS INITIALIZATION FUNCTION
   ===================================================== */

export function initSettings() {

    /* -----------------------------------------
       SELECT DOM ELEMENTS
    ------------------------------------------ */

    const settingsBtn = document.querySelector(".settings-btn")
    const settingsPanel = document.querySelector(".settings-panel")

    const autoToggle = document.getElementById("autoModeToggle")
    const darkToggle = document.getElementById("darkModeToggle")

    const digitalToggle = document.getElementById("digitalClockToggle")
    const analogToggle = document.getElementById("analogClockToggle")

    const analogClock = document.querySelector(".clock")
    const digitalClock = document.querySelector(".digital-clock")



    /* -----------------------------------------
       SETTINGS PANEL OPEN / CLOSE
    ------------------------------------------ */

    settingsBtn.addEventListener("click", () => {

        settingsPanel.classList.toggle("active")

        // change icon

        setTimeout(() => {

            if (settingsPanel.classList.contains("active")) {

                settingsBtn.innerHTML = "‹"
                settingsBtn.title = "Back"
                settingsBtn.classList.add("back")


            } else {

                settingsBtn.textContent = "≡"
                settingsBtn.title = "Options"
                settingsBtn.classList.remove("back")

            }


        }, 200);

    })



    /* -----------------------------------------
       AUTO THEME FUNCTION
    ------------------------------------------ */

    function applyAutoTheme() {

        const hour = new Date().getHours()

        if (hour >= 18 || hour < 6) {

            document.body.classList.add("dark")
            darkToggle.checked = true

        } else {

            document.body.classList.remove("dark")
            darkToggle.checked = false

        }

    }



    /* -----------------------------------------
       DEFAULT STATE (PAGE LOAD)
    ------------------------------------------ */

    autoToggle.checked = true

    analogToggle.checked = true
    digitalToggle.checked = false

    if (digitalClock) {
        digitalClock.style.display = "none"
    }

    applyAutoTheme()



    /* -----------------------------------------
       AUTO MODE TOGGLE
    ------------------------------------------ */

    autoToggle.addEventListener("change", () => {

        if (autoToggle.checked) {

            // auto mode → time based theme
            applyAutoTheme()

            // dark manual off
            darkToggle.checked = false

        }

    })



    /* -----------------------------------------
       DARK MODE TOGGLE
    ------------------------------------------ */

    darkToggle.addEventListener("change", () => {

        if (darkToggle.checked) {

            document.body.classList.add("dark")

            // auto mode off
            autoToggle.checked = false

        } else {

            document.body.classList.remove("dark")

        }

    })



    /* -----------------------------------------
       DIGITAL CLOCK TOGGLE
    ------------------------------------------ */

    digitalToggle.addEventListener("change", () => {

        if (digitalToggle.checked) {

            digitalClock.style.display = "block"
            analogClock.style.display = "none"

            analogToggle.checked = false

        } else {

            digitalClock.style.display = "none"
            analogClock.style.display = "block"

            analogToggle.checked = true

        }

    })



    /* -----------------------------------------
       ANALOG CLOCK TOGGLE
    ------------------------------------------ */

    analogToggle.addEventListener("change", () => {

        if (analogToggle.checked) {

            analogClock.style.display = "block"
            digitalClock.style.display = "none"

            digitalToggle.checked = false

        } else {

            analogClock.style.display = "none"
            digitalClock.style.display = "block"

            digitalToggle.checked = true

        }

    })

}