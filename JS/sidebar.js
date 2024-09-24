let bodyElement = document.querySelector('body');

const barraLateral = document.querySelector(".BarraLateral");

barraLateral.addEventListener('click',() => {
  barraLateral.classList.toggle("close");
})