// В этом меню у нас есть три листа с классами:
// TODO[done] 1. dropdown-lists__list--default - В нем должна содержаться информация о всех странах и ТОП 3 город каждой из этих стран.
// TODO[done] Данный список должен открываться по клику на инпут.
// TODO[done] 2. dopdown-lists__list--select - Список, в котором должна отображаться информация о всех городах выбранной страны.
// TODO[done] Открывается когда кликаем на линию со страной - dropdown-lists__total-line
// TODO[done] Возвращается обратно к dropdown-lists__list--default, когда кликаем на dropdown-lists__total-line уже
//  внутри dropdown-lists__list--select
// TODO[done] 3. dropdown-lists__list--autocomplete - Список, который будет открываться, когда мы будем вводить что-то
//  в инпут. Другие списки при этом скрываются.
// TODO[done] В этом списке будет отображаться информация из нашего объекта со схожими значениями. Ввели букву "М" и в списке должны отобразиться города начинающиеся на эту букву.
// TODO[done] Cкрипт должен работать так, чтобы регистр не имел значение.
// TODO[done] Если сходство не найдено, то выводим надпись "Ничего не найдено".
// TODO[done] Если стираем значение, тогда отображается список dropdown-lists__list--default.
// TODO[done] В нашей верстке для примера уже введены стартовые данные, чтобы вы могли посмотреть структуру, которую вам нужно будет генерировать для вывода списка. Все, что внутри dropdown-lists__col вам нужно будет удалить.
// TODO[done] Так же, когда мы кликаем на страну или город в любом из списков, то значение внутри этого поля должно вставляться в input(value), появляется крестик close-button.
// TODO[done] Если жмем на этот крестик, тогда стирается значение из input и закрывается выпадающее меню.
// TODO[done] Если кликаем на город, то в кнопку button должна вставляться ссылка link, ведущая на вики этого города.
// TODO[done] Если значение стираем или нажимаем на крестик, то кнопка блокируется (изначально должна быть заблокированной)

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

