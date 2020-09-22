'use strict';
// TODO[done] При помощи ajax запросов к загруженному файлу сформировать на странице карточки Героев со всеми данными (фото, имя, настоящее имя,  список фильмов, статус).
//  1 персонаж - 1 карточка.

// TODO[done] Реализовать переключатели-фильтры по фильмам. Выпадающее меню или список, на ваше усмотрение. Показывать только те карточки, которые подходят под выбранный фильтр.

// TODO[done] Стилизация карточек и всего внешнего вида - на ваше усмотрение. Упор сделать на главную цель - донесение информации, никаких вырвиглазных цветов и шрифтов.

import "./modules/polyfills";

import {getData} from "./modules/getData";
import {flipElem} from "./modules/flipElem";
import {render} from "./modules/render";
import {setUpVideo} from "./modules/setUpVideo";
import {addListeners} from "./modules/addListeners";
import {handleError} from "./modules/handleError";

// Главная функция
const start = () => {
  const cards = document.querySelector('.cards');
  const selects = document.querySelectorAll('select');
  const inputs = document.querySelectorAll('input');
  const resetButton = document.querySelector('.reset');
  const skipButton = document.querySelector('.skip');
  const cardsPreloader = document.querySelector('.cards-preloader');
  const filterForm = document.forms.filters;

  setUpVideo();

  getData('./dbHeroes.json').then(heroesData => {
      render(heroesData, heroesData, cards, selects, inputs);
      addListeners(heroesData, cards, selects, inputs, resetButton, skipButton, cardsPreloader, filterForm);
  }).catch(error => {
    handleError(error, cards);
  });

  // Слушатель: по клику на фото в карточке - переворачивает ее
  cards.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card-photo') && !target.matches('.card-name')) {
      flipElem(target.closest('.card-flipper'));
    }
  });
};

start();

