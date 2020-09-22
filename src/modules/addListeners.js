import {filterCards} from "./filter";
import {render} from "./render";
import {toggleElem} from "./toggleElem";
import {addDropdown} from "./dropdowns";
import {PopUp} from "./popup";
import {getData} from "./getData";
import {handleError} from "./handleError";

export const addListeners = (objects, cards, selects, inputs, resetButton,skipButton, cardsPreloader, filterForm) => {
  // Слушатель изменения фильтров, фильтрует
  filterForm.addEventListener('change', () => {
    toggleElem(cardsPreloader, true, 'block');
    getData('./dbHeroes.json').then(heroesData => {
      const filtered = filterCards(filterForm.elements, heroesData);
      render(heroesData, filtered, cards, selects, inputs);
      inputs.forEach(input => {
        toggleElem(input.nextElementSibling, false)
      });
    }).catch(error => {
      handleError(error, cards);
    }).finally(()=>{
      toggleElem(cardsPreloader, false);
    });
  });

// Слушатели для инпутов: по фокусу открывается дропдаун, по потере фокуса закрывается,
// по вводу фильтруются значения в дропдауне. Кнопка Clear очищает инпут и запускает фильтрацию
  inputs.forEach(input => {
    const dropdown = input.nextElementSibling;
    const clear = input.parentElement.querySelector('.clear');
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      cancelable: true,
      type: 'change'
    });

    input.addEventListener('focus', () => {
      toggleElem(dropdown, true, 'block')
    });

    input.addEventListener('blur', () => {
      toggleElem(dropdown, false)
    });

    clear.addEventListener('click', () => {
      input.value = '';
      toggleElem(clear, false);
      input.dispatchEvent(changeEvent);
    });

    input.addEventListener('input', event => {
      toggleElem(dropdown, true, 'block')

      if (input.value) {
        toggleElem(clear, true);
      } else {
        toggleElem(clear, false);
      }

      addDropdown(filterCards(filterForm.elements, objects), input);
    });

    dropdown.addEventListener('mousedown', event => {
      const item = event.target;
      if (item.matches('.dropdown-item')) {
        input.value = item.textContent;
        toggleElem(clear, true);
        input.dispatchEvent(changeEvent);
      }
    });
  });

// Слушатель для сбрасывагия всех фильтров
  resetButton.addEventListener('click', () => {
    filterForm.reset();
    render(objects, objects, cards, selects, inputs);
    inputs.forEach(input => toggleElem(input.parentElement.querySelector('.clear'), false));
  });

  new PopUp({
    popUpSelector: '.help',
    closeSelector: '.close',
    popUpButtonsSelector: '.question',
    displayMode: 'block'
  });

// Показать кнопку "Пропустить"
  toggleElem(skipButton, true, 'block');
};