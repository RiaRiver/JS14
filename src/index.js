// TODO Теперь берем города из json базы (вам понадобится json-server). При загрузке страницы будем отправлять запрос на наш json-сервер, чтобы получить оттуда данные. - До тех пор пока данные не загрузились, вместо нашей странички показываем крутящийся спиннер(эффект загрузки сайта).

// TODO Теперь, когда будем вводить что-то в инпут, то нужно показывать совпадение введенного и того, что есть в базе:

// TODO Теперь при переключении списка с dropdown-lists__list--default на dropdown-lists__list--select и наоборот переключение должно быть анимированным(слайд влево, вправо) Написать на чистом js.

import {addAutocomplete, dropdownLists, addSelect} from "./modules/dropdownLists";
import {toggleElem} from "./modules/toggleElem";
import {toggleDropdown} from "./modules/toggleDropdpwn";

const button = document.querySelector('.button');
const selectCitiesInput = document.getElementById('select-cities');
const dropdown = document.querySelector('.dropdown');
const dropdowns = document.querySelectorAll('.dropdown-lists__list');
const closeButton = document.querySelector('.close-button');
const linkButton = document.querySelector('.button');

// Скрываем дропдауны и отключаем кнопку
toggleDropdown(dropdowns, false);
toggleElem({elem: linkButton, mode:'add', className: 'button--disabled'})

// Слушатель на фокус по инпуту
selectCitiesInput.addEventListener('focus', () => {
  toggleDropdown(dropdowns,true, dropdowns[selectCitiesInput.dataset.dropdown] || dropdowns[0]);
});

// Слушатель на клики, управляет закрывает менюшки при внешнем клике и сброс по крестику
document.addEventListener('click', (event) => {
  const closest = event.target.closest('#select-cities, .dropdown-lists__list');

  if(!closest){
    toggleDropdown(dropdowns,false);
  }

  if(event.target === closeButton){
    selectCitiesInput.value = '';
    selectCitiesInput.dataset.dropdown = '0';
    toggleElem({elem: closeButton, mode:'hide'});
    toggleElem({elem: linkButton, mode:'add', className: 'button--disabled'})
  }
});

// Слушатель на дропдауны, управляет выборкой
dropdown.addEventListener('click', event =>{
  const dropdownType = selectCitiesInput.dataset.dropdown;
  const closestCountry = event.target.closest('.dropdown-lists__total-line');
  const closestCity = event.target.closest('.dropdown-lists__line');

  if(closestCountry) {
    if(!+dropdownType){
      selectCitiesInput.value = closestCountry.firstElementChild.textContent;
      selectCitiesInput.dataset.dropdown = '1';
      addSelect(selectCitiesInput.value);
      toggleDropdown(dropdowns,true, dropdowns[1]);
    } else{
      selectCitiesInput.value = '';
      selectCitiesInput.dataset.dropdown = '0';
      toggleDropdown(dropdowns,true, dropdowns[0]);
    }
  }
  if(closestCity){
    if(closestCity.dataset.cityLink !== 'none'){
    selectCitiesInput.value = closestCity.firstElementChild.textContent;
    selectCitiesInput.dataset.dropdown = '2';
    addAutocomplete(selectCitiesInput.value);
    button.href = closestCity.dataset.cityLink;
      toggleElem({elem: linkButton, mode:'remove', className: 'button--disabled'})
    }
    toggleDropdown(dropdowns,false);
  }
  toggleElem({elem: closeButton, display: 'block'});
})

// Слушатель на инпут поля
selectCitiesInput.addEventListener('input', () => {
  if (selectCitiesInput.value) {
    addAutocomplete(selectCitiesInput.value);
    toggleDropdown(dropdowns,true, dropdowns[2]);
  } else {
    toggleDropdown(dropdowns,true, dropdowns[0]);
    toggleElem({elem: closeButton, mode:'hide'});
    toggleElem({elem: linkButton, mode:'add', className: 'button--disabled'})
  }
});

// Добавляем сразу все страны и ТОП3 города
dropdownLists();

