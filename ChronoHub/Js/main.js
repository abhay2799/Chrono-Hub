/* ==============================
   IMPORT MODULES
================================ */
import { updateAnalogClock } from "./clock.js"
import { updateDigitalClock } from "./digitalClock.js"
import { initSettings } from "./settings.js"
import { initTabs } from "../components/tabs.js"
import { initAddAlarm } from "../components/addAlarm.js"
import { initAlarmSystem } from "../components/alarm.js"
import { initStopwatch } from "../components/stopwatch.js"
import { initCountdown } from "../components/countdown.js"
/* ==============================
   START APP
================================ */

function startApp() {

    // settings initialize
    initSettings();

    // Stopwatch
    initStopwatch();

    // Pages and tab function
    initTabs();

    // Add Alarm
    initAddAlarm();

    // Alarm System
    initAlarmSystem();

    // CountDown system
    initCountdown();



    // first render
    updateAnalogClock();
    updateDigitalClock();


    /* ==============================
       CLOCK UPDATE LOOP
    ================================ */

    setInterval(() => {

        updateAnalogClock()
        updateDigitalClock()


    }, 1000)

}
/* ==============================
   RUN APP
================================ */

startApp()