//NAV BAR
const nav = document.querySelector('nav');
const menuBtn = document.querySelector('.nav-bars');
const line2 = document.querySelector('.line2-bar');
const line3 = document.querySelector('.line3-bar');

menuBtn.addEventListener('click', ()=>{
    nav.classList.toggle('showNav')
    line2.classList.toggle('activeLine2');
    line3.classList.toggle('activeLine3');
})

//MODE
const handle = document.querySelector('.handle');

handle.addEventListener('click', ()=>{
    handle.classList.toggle('moveHandle');
})

const body = document.querySelector('body')
let altura = body.scrollHeight; 
console.log(altura)