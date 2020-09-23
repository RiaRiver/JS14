import {toggleDropdown} from "./toggleDropdpwn";
import {toggleElem} from "./toggleElem";
import {addAutocomplete, addSelect} from "./dropdownLists";
import {animate} from "./animate";
import {animateFunc} from "./animationFunc";

export const start = (data, button, selectCitiesInput, dropdown, dropdowns, closeButton, linkButton) => {
  // Слушатель на фокус по инпуту
  selectCitiesInput.addEventListener('focus', () => {
    toggleDropdown({dropdowns, dropdown: dropdowns[selectCitiesInput.dataset.dropdown] || dropdowns[0]});
  });

// Слушатель на клики, управляет закрывает менюшки при внешнем клике и сброс по крестику
  document.addEventListener('click', (event) => {
    const closest = event.target.closest('#select-cities, .dropdown-lists__list');

    if (!closest) {
      toggleDropdown(({dropdowns}));
    }

    if (event.target === closeButton) {
      selectCitiesInput.value = '';
      selectCitiesInput.dataset.dropdown = '0';
      toggleElem({elem: closeButton, mode: 'hide'});
      toggleElem({elem: linkButton, mode: 'add', className: 'button--disabled'})
    }
  });

// Слушатель на дропдауны, управляет выборкой
  dropdown.addEventListener('click', event => {
    const dropdownType = selectCitiesInput.dataset.dropdown;
    const closestCountry = event.target.closest('.dropdown-lists__total-line');
    const closestCity = event.target.closest('.dropdown-lists__line');

    if (closestCountry) {
      if (!+dropdownType) {
        selectCitiesInput.value = closestCountry.firstElementChild.textContent;
        selectCitiesInput.dataset.dropdown = '1';
        addSelect(data, selectCitiesInput.value);
        toggleDropdown({dropdowns, flag: 'on', dropdown: dropdowns[1]})
        animate({draw: animateFunc});
      } else {
        selectCitiesInput.value = '';
        selectCitiesInput.dataset.dropdown = '0';
        toggleDropdown({dropdowns, flag: 'on', dropdown: dropdowns[0]})
        dropdowns[0].style.transform = `translateX(-415px)`;
        dropdowns[1].style.transform = `translateX(-415px)`;
        animate({draw: animateFunc});
      }
    }
    if (closestCity) {
      if (closestCity.dataset.cityLink !== 'none') {
        selectCitiesInput.value = closestCity.firstElementChild.textContent;
        selectCitiesInput.dataset.dropdown = '2';
        addAutocomplete(data, selectCitiesInput.value);
        button.href = closestCity.dataset.cityLink;
        toggleElem({elem: linkButton, mode: 'remove', className: 'button--disabled'})
      }
      toggleDropdown(({dropdowns}));
    }
    toggleElem({elem: closeButton, display: 'block'});
  })

// Слушатель на инпут поля
  selectCitiesInput.addEventListener('input', () => {
    if (selectCitiesInput.value) {
      addAutocomplete(data, selectCitiesInput.value);
      toggleDropdown({dropdowns, dropdown: dropdowns[2]});
    } else {
      toggleDropdown({dropdowns, dropdown: dropdowns[0]});
      toggleElem({elem: closeButton, mode: 'hide'});
      toggleElem({elem: linkButton, mode: 'add', className: 'button--disabled'})
    }
  });
}