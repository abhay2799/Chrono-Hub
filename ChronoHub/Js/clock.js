const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");

const fullDate = document.getElementById("fullDate");
const dayName = document.getElementById("dayName");

const months = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

const days = [
"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];

export function updateAnalogClock(){

const now = new Date();

const seconds = now.getSeconds();
const minutes = now.getMinutes();
const hours = now.getHours();

const secondDeg = seconds * 6;
const minuteDeg = minutes * 6 + seconds * 0.1;
const hourDeg = (hours % 12) * 30 + minutes * 0.5;

hourHand.style.transform = `rotate(${hourDeg}deg)`;
minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
secondHand.style.transform = `rotate(${secondDeg}deg)`;

fullDate.textContent =
`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

dayName.textContent =
days[now.getDay()].split("").join(" ");

}
