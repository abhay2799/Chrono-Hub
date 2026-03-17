let timerInterval = null
let remainingTime = 0
let paused = false

export function initCountdown() {

    const startBtn = document.getElementById("startTimer")
    const popup = document.getElementById("timerPopup")
    const display = document.getElementById("timerDisplay")

    const hoursInput = document.getElementById("hours")
    const minutesInput = document.getElementById("minutes")
    const secondsInput = document.getElementById("seconds")

    const pauseBtn = document.getElementById("pauseTimer")
    const addMinuteBtn = document.getElementById("addMinute")
    const closeBtn = document.getElementById("closeTimer")



    /* ---------- START TIMER ---------- */

    startBtn.addEventListener("click", () => {

        let h = parseInt(hoursInput.value) || 0
        let m = parseInt(minutesInput.value) || 0
        let s = parseInt(secondsInput.value) || 0

        remainingTime = h * 3600 + m * 60 + s

        if (remainingTime <= 0) return

        popup.style.display = "flex"
        clearInterval(timerInterval)
        startCountdown(display)

    })

    /* ---------- CLOSE POPUP ---------- */

    closeBtn.addEventListener("click", () => {

        clearInterval(timerInterval)

        popup.style.display = "none"

        paused = false
        remainingTime = 0

    })


    /* ---------- PAUSE / RESUME ---------- */

    pauseBtn.addEventListener("click", () => {

        if (!paused) {

            paused = true
            clearInterval(timerInterval)
            pauseBtn.textContent = "▶"

        } else {

            paused = false
            startCountdown(display)
            pauseBtn.textContent = "⏸"

        }

    })



    /* ---------- +1 MINUTE ---------- */

    addMinuteBtn.addEventListener("click", () => {

        remainingTime += 60

    })

}



/* ---------- COUNTDOWN FUNCTION ---------- */

function startCountdown(display) {

    clearInterval(timerInterval)

    timerInterval = setInterval(() => {

        if (remainingTime <= 0) {

            clearInterval(timerInterval)
            return

        }

        remainingTime--

        let h = Math.floor(remainingTime / 3600)
        let m = Math.floor((remainingTime % 3600) / 60)
        let s = remainingTime % 60

        display.textContent =
            String(h).padStart(2, "0") + ":" +
            String(m).padStart(2, "0") + ":" +
            String(s).padStart(2, "0")

    }, 1000)

}