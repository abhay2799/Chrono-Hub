let editingAlarm = null;
let selectedPeriod = "AM";


export function initAddAlarm() {

    const addAlarmBtn = document.querySelector(".add-alarm-btn")
    const timeModal = document.getElementById("timeModal")

    const cancelBtn = document.getElementById("cancelAlarm")
    const okBtn = document.getElementById("okAlarm")

    const hourInput = document.getElementById("hourInput")
    const minuteInput = document.getElementById("minuteInput")

    const ampmBtns = document.querySelectorAll(".ampm-btn")

    const alarmList = document.querySelector(".alarm-list")


    /* =========================
       AM / PM Toggle
    ========================= */

    ampmBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            ampmBtns.forEach(b => b.classList.remove("active"))

            btn.classList.add("active")

            selectedPeriod = btn.dataset.period

        })

    })



    /* =========================
       OPEN MODAL
    ========================= */

    addAlarmBtn.addEventListener("click", () => {

        timeModal.classList.add("active")

    })



    /* =========================
       CANCEL BUTTON
    ========================= */

    cancelBtn.addEventListener("click", () => {

        timeModal.classList.remove("active")

    })



    /* =========================
       OK BUTTON
    ========================= */

    okBtn.addEventListener("click", () => {

        let hour = parseInt(hourInput.value);
        let minute = parseInt(minuteInput.value);

        let valid = true;


        // hour validation
        if (hour < 1 || hour > 12 || isNaN(hour)) {

            hourError.style.display = "block";
            hourInput.classList.add("input-error");

            valid = false;

        } else {

            hourError.style.display = "none";
            hourInput.classList.remove("input-error");

        }


        // minute validation
        if (minute < 0 || minute > 59 || isNaN(minute)) {

            minuteError.style.display = "block";
            minuteInput.classList.add("input-error");

            valid = false

        } else {

            minuteError.style.display = "none";
            minuteInput.classList.remove("input-error");

        }


        // stop if invalid
        if (!valid) {
            return
        }


        // format time
        let hourStr = String(hour).padStart(2, "0");
        let minuteStr = String(minute).padStart(2, "0");


        // ⭐ check edit or create
        if (editingAlarm) {

            // update existing card
            editingAlarm.querySelector(".alarm-time").textContent = `${hourStr}:${minuteStr}`;

            editingAlarm.querySelector(".alarm-period").textContent =
                selectedPeriod;

            editingAlarm = null;

        } else {

            // create new alarm
            createAlarmCard(hourStr, minuteStr, selectedPeriod);

        }


        timeModal.classList.remove("active");

        hourInput.value = "";
        minuteInput.value = "";

    });

}



/* =========================
   CREATE ALARM CARD
========================= */

function createAlarmCard(hour, minute, period) {

    const alarmList = document.querySelector(".alarm-list")

    const alarmCard = document.createElement("div")

    alarmCard.className = "alarm-card"



    alarmCard.innerHTML = `

<div class="alarm-info">

<span class="alarm-time">${hour}:${minute}</span>
<span class="alarm-period">${period}</span>

</div>

<div class="alarm-controls">

<label class="switch">

<input type="checkbox" checked>
<span class="slider"></span>

</label>

<button class="delete-alarm" title="Delete">🗑</button>

</div> `


    alarmCard.addEventListener("click", (e) => {

        if (e.target.closest(".switch")) return;

        editingAlarm = alarmCard

        const timeText = alarmCard.querySelector(".alarm-time").textContent
        const periodText = alarmCard.querySelector(".alarm-period").textContent

        const [hour, minute] = timeText.split(":")

        hourInput.value = hour
        minuteInput.value = minute
        selectedPeriod = periodText

        timeModal.classList.add("active")

    });

    const toggle = alarmCard.querySelector('input[type="checkbox"]')

    toggle.addEventListener("change", (e) => {

        e.stopPropagation()
    });


    alarmList.appendChild(alarmCard)



    /* =========================
       DELETE ALARM
    ========================= */

    alarmCard.querySelector(".delete-alarm").addEventListener("click", (e) => {

        e.stopPropagation()

        alarmCard.remove()

    });

}