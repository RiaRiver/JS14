// TODO[done] Теперь берем города из json базы (вам понадобится json-server). При загрузке страницы будем отправлять запрос на наш json-сервер, чтобы получить оттуда данные. - До тех пор пока данные не загрузились, вместо нашей странички показываем крутящийся спиннер(эффект загрузки сайта).

// TODO[done] Теперь, когда будем вводить что-то в инпут, то нужно показывать совпадение введенного и того, что есть в базе:

// TODO[done] Теперь при переключении списка с dropdown-lists__list--default на dropdown-lists__list--select и наоборот переключение должно быть анимированным(слайд влево, вправо) Написать на чистом js.

import {addDefault} from "./modules/dropdownLists";
import {toggleElem} from "./modules/toggleElem";
import {toggleDropdown} from "./modules/toggleDropdpwn";
import {getData} from "./modules/getData";
import {start} from "./modules/start";

const button = document.querySelector('.button');
const selectCitiesInput = document.getElementById('select-cities');
const dropdown = document.querySelector('.dropdown');
const dropdowns = document.querySelectorAll('.dropdown-lists__list');
const closeButton = document.querySelector('.close-button');
const linkButton = document.querySelector('.button');
const preloader = document.querySelector('.preloader');

// Скрываем дропдауны и отключаем кнопку
toggleDropdown(({dropdowns}));
toggleElem({elem: linkButton, mode:'add', className: 'button--disabled'})

// setTimeout имитирует задержку от сервера
setTimeout(()=>{getData('db_cities.json')
  .then((data)=>{
    // Убираем лоадер
    toggleElem({elem: preloader, mode:'hide'});
    // Добавляем сразу все страны и ТОП3 города
    addDefault(data.RU);
    start(data.RU, button,selectCitiesInput,dropdown, dropdowns,closeButton,linkButton);
})
.catch( (error) => {
  button.insertAdjacentHTML( 'afterend',`
      <div class="message">
        <p>Нам очень жаль, но что-то пошло не так.</p>
        <p>Пожалуйста, обновите страницу или повторите позже.</p>
      </div>
    `);
  console.error(error);
})}, 2000);