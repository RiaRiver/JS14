import {data} from '../db_cities.js';
import {addDefault, addAutocomplete, addSelect} from "./modules/addDefault";

const toggleDropdown = (flag, dropdown)=> {
  if(flag){
    dropdowns.forEach(drop => drop.style.display = (drop === dropdown) ? 'block' : 'none');
  } else {
    if(dropdown) {
      dropdown.style.display = 'none';
    } else{
      dropdowns.forEach(drop => drop.style.display = 'none');
    }
  }
}
console.log(data);
// В этом меню у нас есть три листа с классами:

// TODO 1. dropdown-lists__list--default - В нем должна содержаться информация о всех странах и ТОП 3 город каждой из этих стран. Данный список должен открываться по клику на инпут.

const button = document.querySelector('.button');
const selectCitiesInput = document.getElementById('select-cities');
const dropdowns = document.querySelectorAll('.dropdown-lists__list');
const dropdownDefault = document.querySelector('.dropdown-lists__list--default');
const dropdownSelect = document.querySelector('.dropdown-lists__list--select');
const dropdownAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete');
toggleDropdown(false);

selectCitiesInput.addEventListener('focus', () => {
console.log( selectCitiesInput.dataset.dropdown);
  toggleDropdown(true, dropdowns[selectCitiesInput.dataset.dropdown] ||dropdowns[0]);
});

document.addEventListener('click', () => {
  console.log('targ',event.target);
const closest = event.target.closest('#select-cities, .dropdown-lists__list');
  console.log('closest',closest)
if(!closest){
  toggleDropdown(false);
}
});

// TODO 2. dopdown-lists__list--select - Список, в котором должна отображаться информация о всех городах выбранной страны.

// TODO -  Открывается когда кликаем на линию со страной - dropdown-lists__total-line
//
dropdownDefault.addEventListener('click', event => {
  const closest = event.target.closest('.dropdown-lists__total-line');
  const closestCity = event.target.closest('.dropdown-lists__line');
  if (closest) {
    selectCitiesInput.value = closest.firstElementChild.textContent;
    selectCitiesInput.dataset.dropdown = '1';
    addSelect(selectCitiesInput.value);
    toggleDropdown(true, dropdownSelect);
  }
  if(closestCity){
    selectCitiesInput.value = closestCity.firstElementChild.textContent;
    selectCitiesInput.dataset.dropdown = '2';
    addAutocomplete(selectCitiesInput.value);
    button.href = closestCity.dataset.cityLink;
    toggleDropdown(false);
  }
});
// TODO -  Возвращается обратно к dropdown-lists__list--default, когда кликаем на dropdown-lists__total-line уже внутри dropdown-lists__list--select

dropdownSelect.addEventListener('click', event => {
  const closest = event.target.closest('.dropdown-lists__total-line');
  const closestCity = event.target.closest('.dropdown-lists__line');
  if (closest) {
    selectCitiesInput.value = '';
    selectCitiesInput.dataset.dropdown = '0';
    toggleDropdown(true, dropdownDefault);
  }
  if(closestCity){
    selectCitiesInput.value = closestCity.firstElementChild.textContent;
    selectCitiesInput.dataset.dropdown = '2';

    button.href = closestCity.dataset.cityLink;
    toggleDropdown(false);}
});

// TODO 3. dropdown-lists__list--autocomplete - Список, который будет открываться, когда мы будем вводить что-то в инпут.
//  - Другие списки при этом скрываются.

selectCitiesInput.addEventListener('input', () => {
  if (selectCitiesInput.value) {
    addAutocomplete(selectCitiesInput.value);
    toggleDropdown(true, dropdownAutocomplete);
  } else {
    toggleDropdown(true, dropdownDefault);
  }
});
//
// - В этом списке будет отображаться информация из нашего объекта со схожими значениями. Ввели букву "М" и в списке должны отобразиться города начинающиеся на эту букву.
//
// - Cкрипт должен работать так, чтобы регистр не имел значение.
//
// - Если сходство не найдено, то выводим надпись "Ничего не найдено".
//
// - Если стираем значение, тогда отображается список dropdown-lists__list--default.
//
// В нашей верстке для примера уже введены стартовые данные, чтобы вы могли посмотреть структуру, которую вам нужно будет генерировать для вывода списка. Все, что внутри dropdown-lists__col вам нужно будет удалить.
//
//   Так же, когда мы кликаем на страну или город в любом из списков, то значение внутри этого поля должно вставляться в input(value), появляется крестик close-button.
//
// - Если жмем на этот крестик, тогда стирается значение из input и закрывается выпадающее меню.
//
//   Если кликаем на город, то в кнопку button должна вставляться ссылка link, ведущая на вики этого города.
//
// - Если значение стираем или нажимаем на крестик, то кнопка блокируется (изначально должна быть заблокированной)


const dropdownColDefault = document.querySelector('.dropdown-lists__list--default .dropdown-lists__col');


addDefault();

