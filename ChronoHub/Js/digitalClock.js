export function updateDigitalClock(){

const digital = document.getElementById("digitalTime");

if(!digital) return;

const now = new Date();

let h = now.getHours();
let m = now.getMinutes().toString().padStart(2,"0");
let s = now.getSeconds().toString().padStart(2,"0");

let period = h >= 12 ? "PM" : "AM";

h = h % 12 || 12;
h = h.toString().padStart(2,"0");

digital.innerHTML = `${h}:${m}:<span class="seconds">${s}</span> <span class="ampm">${period}</span>`;

}