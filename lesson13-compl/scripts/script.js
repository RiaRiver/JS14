'use strict';
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const getNewColor = function () {
  let rgb = [0, 0, 0];
  rgb = rgb.map((elem) => (elem = getRandomIntInclusive(0, 255).toString(16).padStart(2, '0')));

  return `#${rgb.join('')}`;
};

const changeColor = function () {
  const color = getNewColor();

  main.style.backgroundColor = color;
  change.style.color = color;

  colorText.textContent = color;
};

const main = document.getElementById('main-block');
const colorText = document.getElementById('color-text');
const change = document.getElementById('change');

change.addEventListener('click', changeColor);
changeColor();
