let ringing = false
let currentRingingAlarm = null
let lastTriggeredKey = null

export function initAlarmSystem() {

    let alarmSoundSrc = localStorage.getItem("alarmSound") || "../assets/sounds/default.mp3"
    let audio = new Audio();
    audio.src = alarmSoundSrc;
    audio.loop = true;

    const popup = document.getElementById("alarmPopup")
    const popupTime = document.querySelector(".alarm-popup-time")

    const snoozeBtn = document.getElementById("snoozeBtn")
    const stopBtn = document.getElementById("stopBtn")

    const soundInput = document.getElementById("alarmSoundInput")

    const okAlarm = document.getElementById("okAlarm")

    okAlarm.addEventListener("click", () => {

        const hour = document.getElementById("hourInput").value
        const minute = document.getElementById("minuteInput").value

        const periodBtn = document.querySelector(".ampm-btn.active")
        const period = periodBtn.dataset.period

        const timeText = `${hour}:${minute.padStart(2, "0")}`


        // EDIT MODE
        if (window.editingAlarmCard) {

            const card = window.editingAlarmCard

            card.querySelector(".alarm-time").textContent = timeText
            card.querySelector(".alarm-period").textContent = period

        }

        // CREATE MODE
        else {

            createAlarmCard(hour, minute, period)

        }

        window.editingAlarmCard = null
        document.getElementById("timeModal").classList.remove("active")

    })

    /* =========================
    SAVE CUSTOM SOUND
    ========================= */

    if (soundInput) {

        soundInput.addEventListener("change", (e) => {

            const file = e.target.files[0]
            if (!file) return

            const reader = new FileReader()

            reader.onload = function (event) {

                const base64Sound = event.target.result

                localStorage.setItem("alarmSound", base64Sound)

                alarmSoundSrc = base64Sound;
                audio.src = base64Sound;

            }

            reader.readAsDataURL(file)

        })

    }


    //DEFAULT ALARM SOUND
    alarmSoundSrc = new Audio("../assets/sounds/alarm.mp3");

    // PLAY ALARM
    function playAlarm() {
        alarmSoundSrc.currentTime = 0;
        alarmSoundSrc.play();
    }

    // STOP ALARM
    function stopAlarm() {
        alarmSoundSrc.pause();
        alarmSoundSrc.currentTime = 0;
    }



    /* =========================
    GET ALARMS FROM UI
    ========================= */

    function getAlarms() {

        const cards = document.querySelectorAll(".alarm-card")

        let alarms = []

        cards.forEach(card => {

            const time = card.querySelector(".alarm-time")?.textContent
            const period = card.querySelector(".alarm-period")?.textContent
            const toggle = card.querySelector("input[type='checkbox']")?.checked

            if (!time || !period) return

            const [hour, minute] = time.split(":")

            alarms.push({
                hour,
                minute,
                period,
                active: toggle
            })

        })

        return alarms

    }


    /* =========================
    SAVE ALARMS
    ========================= */

    function saveAlarms() {

        const alarms = getAlarms()

        localStorage.setItem("alarms", JSON.stringify(alarms || []))

    }


    /* =========================
    RESTORE ALARMS
    ========================= */

    function restoreAlarms() {

        const saved = JSON.parse(localStorage.getItem("alarms") || "[]");

        if (!saved) return

        const alarmList = document.querySelector(".alarm-list")

        if (!alarmList) return

        alarmList.innerHTML = ""

        saved.forEach(alarm => {

            const alarmCard = document.createElement("div")

            alarmCard.className = "alarm-card"

            alarmCard.innerHTML = `

<div class="alarm-info">
<span class="alarm-time">${alarm.hour}:${alarm.minute}</span>
<span class="alarm-period">${alarm.period}</span>
</div>

<div class="alarm-controls">

<label class="switch">
<input type="checkbox" ${alarm.active ? "checked" : ""}>
<span class="slider"></span>
</label>

<button class="delete-alarm">🗑</button>

</div>
`

            alarmList.appendChild(alarmCard)

        })

    }

    restoreAlarms()


    /* =========================
    CHECK ALARM EVERY SECOND
    ========================= */

    setInterval(() => {

        const now = new Date()

        let hour = now.getHours()
        let minute = now.getMinutes()

        let period = hour >= 12 ? "PM" : "AM"

        hour = hour % 12
        hour = hour ? hour : 12

        hour = hour.toString().padStart(2, "0")
        minute = minute.toString().padStart(2, "0")

        const alarms = getAlarms()

        alarms.forEach(alarm => {

            const key = `${alarm.hour}:${alarm.minute}-${alarm.period}`

            if (
                alarm.active &&
                alarm.hour === hour &&
                alarm.minute === minute &&
                alarm.period === period &&
                lastTriggeredKey !== key
            ) {

                triggerAlarm(alarm)

                lastTriggeredKey = key

            }

        })

    }, 1000)


    /* =========================
    TRIGGER ALARM
    ========================= */

    function triggerAlarm(alarm) {

        if (ringing) return

        ringing = true
        currentRingingAlarm = alarm

        popupTime.textContent = `${alarm.hour}:${alarm.minute} ${alarm.period}`

        popup?.classList.add("active")

        if (alarmSoundSrc) {

            audio.currentTime = 0
            audio.play().catch(() => { })

        }

    }


    /* =========================
    STOP ALARM
    ========================= */

    if (stopBtn) {

        stopBtn.addEventListener("click", () => {

            popup?.classList.remove("active")

            audio.pause()
            audio.currentTime = 0

            ringing = false

            if (currentRingingAlarm) {

                const cards = document.querySelectorAll(".alarm-card")

                cards.forEach(card => {

                    const time = card.querySelector(".alarm-time")?.textContent
                    const period = card.querySelector(".alarm-period")?.textContent

                    if (!time) return

                    const [hour, minute] = time.split(":")

                    if (
                        hour === currentRingingAlarm.hour &&
                        minute === currentRingingAlarm.minute &&
                        period === currentRingingAlarm.period
                    ) {

                        card.querySelector("input[type='checkbox']").checked = false

                    }

                })

                saveAlarms()

                currentRingingAlarm = null

            }

        })

    }


    /* =========================
    SNOOZE SYSTEM
    ========================= */

    if (snoozeBtn) {

        snoozeBtn.addEventListener("click", () => {

            popup?.classList.remove("active")

            audio.pause()
            audio.currentTime = 0

            ringing = false

            const snoozeAlarm = currentRingingAlarm

            setTimeout(() => {

                if (snoozeAlarm) {

                    triggerAlarm(snoozeAlarm)

                }

            }, 600000)

        })

    }


    /* =========================
    TOGGLE SAVE
    ========================= */

    document.addEventListener("change", (e) => {

        if (e.target.type === "checkbox") {

            saveAlarms()

        }

    })


    /* =========================
    DELETE ALARM
    ========================= */

    document.addEventListener("click", (e) => {

        const deleteBtn = e.target.closest(".delete-alarm")

        if (!deleteBtn) return

        const card = deleteBtn.closest(".alarm-card")

        if (!card) return

        // UI se alarm remove
        card.remove()

        // storage update
        saveAlarms()

    })


    /* =========================
    EDIT ALARM
    ========================= */

    document.addEventListener("click", (e) => {

        const card = e.target.closest(".alarm-card");
        if (!card) return;

        // toggle switch ignore
        if (e.target.closest(".switch")) return;

        // delete button ignore
        if (e.target.closest(".delete-alarm")) return;

        // modal open
        timeModal.classList.add("active");

        const time = card.querySelector(".alarm-time").textContent.trim();
        const period = card.querySelector(".alarm-period").textContent.trim();

        const [hour, minute] = time.split(":");

        document.getElementById("hourInput").value = hour;
        document.getElementById("minuteInput").value = minute;
        document.getElementById("periodInput").value = period;

        // save which card is editing
        window.editingAlarmCard = card;

    });


    /* =========================
    CREATE / EDIT SAVE
    ========================= */

    document.addEventListener("click", (e) => {

        if (e.target.id === "okAlarm") {

            if (window.editingAlarmCard) {

                const hour = document.getElementById("hourInput").value.padStart(2, "0")
                const minute = document.getElementById("minuteInput").value.padStart(2, "0")
                const period = document.getElementById("periodInput").value

                window.editingAlarmCard.querySelector(".alarm-time").textContent =
                    `${hour}:${minute}`

                window.editingAlarmCard.querySelector(".alarm-period").textContent =
                    period

            }

            saveAlarms()

        }

    })

}