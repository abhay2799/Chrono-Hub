export function initTabs(){

const tabs = document.querySelector(".tabs");

tabs.addEventListener("click",(e)=>{

const btn = e.target.closest(".tab-btn");
if(!btn) return;

const pageId = btn.dataset.page;


// remove active pages
document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active");
});


// show selected page
document.getElementById(pageId).classList.add("active");


// remove active button
document.querySelectorAll(".tab-btn").forEach(b=>{
b.classList.remove("active");
});


// activate clicked button
btn.classList.add("active");

});

}