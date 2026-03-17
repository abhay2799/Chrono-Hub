export function initStopwatch(){

const timeEl = document.getElementById("time")
const startBtn = document.getElementById("startBtn")
const lapBtn = document.getElementById("lapBtn")
const stopBtnn = document.getElementById("stopBtnn")
const resetBtn = document.getElementById("resetBtn")
const laps = document.getElementById("laps")

if(!timeEl) return

let startTime = 0
let elapsed = 0
let running = false
let frame = null
let lapCount = 1

/* ========= FORMAT ========= */

function format(ms){

const totalSeconds = Math.floor(ms/1000)

const minutes = Math.floor(totalSeconds/60)
const seconds = totalSeconds % 60
const milliseconds = Math.floor((ms % 1000) / 10)

return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}.${String(milliseconds).padStart(2,"0")}`

}

/* ========= UPDATE LOOP ========= */

function update(){

elapsed = performance.now() - startTime

timeEl.textContent = format(elapsed)

frame = requestAnimationFrame(update)

}

/* ========= START ========= */

function startStopwatch(){

if(running) return

startTime = performance.now() - elapsed

running = true

frame = requestAnimationFrame(update)

startBtn.classList.add("hidden")

lapBtn.classList.remove("hidden")
stopBtnn.classList.remove("hidden")
resetBtn.classList.remove("hidden")

}

/* ========= STOP ========= */

function stopStopwatch(){

if(!running) return

cancelAnimationFrame(frame)

elapsed = performance.now() - startTime

running = false

}

/* ========= RESET ========= */

function resetStopwatch(){

cancelAnimationFrame(frame)

running = false
elapsed = 0
startTime = 0

timeEl.textContent = "00:00.00"

laps.innerHTML = ""
lapCount = 1

startBtn.classList.remove("hidden")

lapBtn.classList.add("hidden")
stopBtnn.classList.add("hidden")
resetBtn.classList.add("hidden")

}

/* ========= LAP ========= */

function addLap(){

if(!running) return

const li = document.createElement("li")

li.innerHTML = `
<span>Lap ${lapCount}</span>
<span>${format(elapsed)}</span>
`

laps.prepend(li)

lapCount++

}

/* ========= EVENTS ========= */

startBtn.addEventListener("click",startStopwatch)
stopBtnn.addEventListener("click",stopStopwatch)
resetBtn.addEventListener("click",resetStopwatch)
lapBtn.addEventListener("click",addLap)

}