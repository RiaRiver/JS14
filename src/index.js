// TODO[done] При загрузке страницы нам высвечивается 1 модальное окно(prompt), где нас просят ввести локаль(RU, EN или DE).
// TODO[done] Ответ записываем в cookie. При последующей загрузке страницы, если данные в cookie имеются, то не спрашиваем.
//  Теперь будем брать данные из cookie

// TODO[done] В соответствии с выбранной локалью отправляем введенное значение как ключ на сервер, чтобы получить нужный перевод для стран и городов.

// TODO[done] Наш полученный объект сохраняем в localStorage. Это необходимо, чтобы при обновлении страницы больше
//  не отправлять запрос на сервер. Данные уже будем брать из локального хранилища и загружать в верстку.

// TODO[done] В зависимости оттого, какую локаль выбрали, то такую страну и ставим вверх списка. Выбрали DE, значит Германия должна быть первой в нашем списке.


import {addDefault} from "./modules/dropdownLists";
import {toggleElem} from "./modules/toggleElem";
import {toggleDropdown} from "./modules/toggleDropdpwn";
import {getData} from "./modules/getData";
import {start} from "./modules/start";
import {chooseLocale} from "./modules/chooseLocal";

const button = document.querySelector('.button');
const selectCitiesInput = document.getElementById('select-cities');
const dropdown = document.querySelector('.dropdown');
const dropdowns = document.querySelectorAll('.dropdown-lists__list');
const closeButton = document.querySelector('.close-button');
const linkButton = document.querySelector('.button');
const preloader = document.querySelector('.preloader');

// Скрываем дропдауны и отключаем кнопку
toggleDropdown(({dropdowns}));
toggleElem({elem: linkButton, mode: 'add', className: 'button--disabled'})

const locale = chooseLocale();

  getData('db_cities.json', locale)
    .then((data) => {
      // Убираем лоадер
      toggleElem({elem: preloader, mode: 'hide'});
      // Добавляем сразу все страны и ТОП3 города
      addDefault(data, locale);
      start(data, button, selectCitiesInput, dropdown, dropdowns, closeButton, linkButton);
    })
    .catch((error) => {
      button.insertAdjacentHTML('afterend', `
      <div class="message">
        <p>Нам очень жаль, но что-то пошло не так.</p>
        <p>Пожалуйста, обновите страницу или повторите позже.</p>
      </div>
    `);
      console.error(error);
    })
