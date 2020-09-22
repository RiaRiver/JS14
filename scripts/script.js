'use strict';
// TODO[done] При помощи ajax запросов к загруженному файлу сформировать на странице карточки Героев со всеми данными
//  (фото, имя, настоящее имя,  список фильмов, статус). 1 персонаж - 1 карточка.

// TODO Реализовать переключатели-фильтры по фильмам. Выпадающее меню или список, на ваше усмотрение.
//  Показывать только те карточки, которые подходят под выбранный фильтр.

// TODO Стилизация карточек и всего внешнего вида - на ваше усмотрение. Упор сделать на главную цель -
//  донесение информации, никаких вырвиглазных цветов и шрифтов.

// Паттерн анимации
const animate = ({ timing = timeFraction => timeFraction, draw, duration = 500 }) => {
  const start = performance.now();

  requestAnimationFrame(function animateStep(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    const progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animateStep);
    }
  });
};

// Получение данных
const getData = url => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }, }
).then(response => {
  if (response.status !== 200) {
    throw new Error('Network status not 200.');
  }
  return response.json();
});

// Делает первую букву в слове или строке большой, остальные маленькими
const capitalize = word => word.toLowerCase().replace(word[0].toLowerCase(), word[0].toUpperCase());

// Рендер одной карточки, принимает родительский элемент и объект карточки
const renderCard = (cardsElem, hero) => {
  const newCard = document.createElement('li');
  newCard.className = `card ${(hero.status !== 'alive') ? 'card-dark' : ''}`;
  newCard.innerHTML = `
    <div class="card-flipper">
      <div class="card-front">
        <div class="card-photo ">
          <h2 class="card-name">${hero.name}</h2>
          <img class="click-icon" src="click.svg" alt="">
          <img class="card-image" src="${hero.photo}" alt="${hero.name}">
        </div>
        <div class="card-hero card-block">
          <span class="card-text card-prop">Real name</span>
          <span class="card-text card-value">${hero.realName || '-'}</span>
          <span class="card-text card-prop">Species</span>
          <span class="card-text card-value">${hero.species || '-'}</span>
          <span class="card-text card-prop">Citizenship</span>
          <span class="card-text card-value">${hero.citizenship || '-'}</span>
          <span class="card-text card-prop">Gender</span>
          <span class="card-text card-value">${hero.gender}</span>
          <span class="card-text card-prop">Birthday</span>
          <span class="card-text card-prop">Deathday</span>
          <span class="card-text card-value">${hero.birthDay || 'unknown'}</span>
          <span class="card-text card-value">${(hero.status !== 'alive' || hero.deathDay) ? hero.deathDay || 'unknown' : '-'}</span>
          <span class="card-text card-prop">Status</span>
          <span class="card-text card-value">${hero.status}</span>
        </div>
      </div>
      <div class="card-back">
        <div class="card-photo">
           <h2 class="card-name">${hero.name}</h2>
           <img class="click-icon" src="click.svg" alt="">
          <img class="card-image" src="${hero.photo}" alt="${hero.name}">
        </div>
        <div class="card-movie card-block">
          <span class="card-text card-prop">Actor</span>
          <span class="card-text card-value">${hero.actors}</span>
          <span class="card-text card-prop">Movies</span>
          <ul> ${(hero.movies) ? hero.movies.sort().map(movie => `<li class="card-text card-value">${movie}</li>`).join('') : `<li class="card-text card-value">-</li>`}</ul>
        </div>
      </div>
    </div>
`;
  cardsElem.append(newCard);
};

// Рендер нескольких карточек, приниммает родительский элемент и массив объектов карточек,
// перед рендером родительский элемент очищается.
const renderCards = (cardsElem, heroes) => {
  cardsElem.innerHTML = '';
  heroes.forEach(hero => renderCard(cardsElem, hero));
};

const render = (objects, filteredObjects, cards, selects, inputs) => {
  renderCards(cards, filteredObjects);
  updateSelects(selects, objects);
  inputs.forEach(input => {
    addDropdown(filteredObjects, input);
  });
};

// Получает множество уникальных значений свойства из массива объектов
const getUniqValues = (objects, prop, cap = true) => {
  const uniqValues = new Set();
  objects.forEach(obj => {
    const addUniqValue = value => { uniqValues.add(cap ? capitalize(value) : value); };
    const value = obj[prop];
    if (value) {
      Array.isArray(value) ? value.forEach(item => addUniqValue(item)) : addUniqValue(value);
    } else {
      uniqValues.add('none');
    }
  });
  return [...uniqValues].sort();
};

// Создает элемент option с заданным значением и текстом
const createOption = (value, text) => {
  const option = document.createElement('option');
  option.value = value.toLowerCase();
  option.innerText = text || value;
  return option;
};

// Создает элемент дропдауна с заданным текстом
const createDropdownItem = text => {
  const dropdownItem = document.createElement('li');
  dropdownItem.className = 'dropdown-item';
  dropdownItem.innerHTML = text;
  return dropdownItem;
};

// Добавляет в селект с id=hero-свойство варианты выбора, основанные на уникальных значениях этого свойства,
// полученных из массива объектов
const addSelect = (objects, select) => {
  select.innerHTML = '';
  const uniq = getUniqValues(objects, select.name);

  select.append(createOption('', 'All'));

  uniq.forEach(value => {
    select.append(createOption(value));
  });
};

// Наполняет дропдаун для инпута вариантами выбора, основанными на уникальных значениях этого свойства,
// полученных из массива объектов
const addDropdown = (objects, input) => {
  const dropdown =  input.nextElementSibling;
  dropdown.innerHTML = '';
  const uniq = getUniqValues(objects, input.name, false);

  uniq.forEach(value => {
    if (value.toLowerCase().includes(input.value.toLowerCase())) {
      dropdown.append(createDropdownItem(value));
    }
  });
};

// Фильтрует массив объектов на основании фильтрующего объекта, который содержит пары
// свойство: [фильтрующее_значение, флаг]  Флаг true проверяет includes, false - equals
// (для получения объекта, не содержащего свойство, фильтрующее значение = none)
const getFilteredObjects = (objects, filter = {}) => {
  const filterEquals = (objects, prop, filterValue) => {
    if (filterValue === 'none') {
      return objects.filter(obj => (!obj[prop]));
    } else {
      return objects.filter(obj => (obj[prop]) && obj[prop].toLowerCase() === filterValue.toLowerCase());
    }
  };

  const filterIncludes = (objects, prop, filterValue) => objects.filter(obj =>
    (obj[prop]) && String(obj[prop]).toLowerCase().includes(filterValue.toLowerCase()));

  return Object.keys(filter).reduce((res, prop) => {
    const filterValue = filter[prop][0],
      flag = filter[prop][1];
    if (flag) {
      return filterIncludes(res, prop, filterValue);
    } else {
      return filterEquals(res, prop, filterValue);
    }
  }, objects);
};

// Фильтрует карточки по значениям фильтрующих элементов, возвращает массив объектов
const filterCards = (filterElements, objects) => {
  const filterObj = {};
  [...filterElements].forEach(elem => {
    if (elem.value) {
      filterObj[elem.name] = [elem.value.trim(), elem.tagName.toLowerCase() === 'input'];
    }
  });
  return getFilteredObjects(objects, filterObj);
};

// Обновляет селекты (для того, чтобы каждый селект содержал только возможные и актуальные значения, учитывая выбор
// в других селектах и инпутах)
const updateSelects = (selects, heroesData) => {
  selects.forEach(select => {
    const selectValue = select.value;
    const filterForSelect = filterCards([...document.forms.filters.elements].filter(item => item.value && item !== select), heroesData);
    addSelect(filterForSelect, select);
    if (selectValue) {
      if (![...select.options].find(opt => opt.value === selectValue)) {
        const option = createOption(selectValue, capitalize(selectValue));
        const nextOption = [...select.options].find(opt => opt.value > selectValue);
        if (nextOption) {
          nextOption.before(option);
        } else { select.append(option); }
      }
      select.value = selectValue;
    }
  });
};

// Поворачивает карточку
const flipCard = card => {
  const flipper = event.target.closest('.card-flipper');
  if (!flipper.style.transform) {
    flipper.style.transform = 'rotateY(180deg)';
  } else { flipper.style.transform = ''; }
};

//
const toggleClearButton = (input, flag) => {
  const clearButton = input.parentElement.querySelector('.clear');
  if (flag) {
    clearButton.style.visibility = 'visible';
  } else {  clearButton.style.visibility = 'hidden'; }
};

// Главная функция
const start = () => {
  const cards = document.querySelector('.cards');
  const selects = document.querySelectorAll('select');
  const inputs = document.querySelectorAll('input');
  const resetButton = document.querySelector('.reset');
  const skipButton = document.querySelector('.skip');
  const video = document.querySelector('video');
  const preloader = document.querySelector('.preloader');
  const popupBlock = document.querySelector('.popup-block');
  const preload = document.querySelector('.preload');
  const filterForm = document.forms.filters;

  const videoPopUp = new PopUp('.popup', () => new Promise(resolve => {
    video.remove();
    preload.style.display = 'block';
    videoPopUp.closeButton.style.display = 'none';
    // Анимация на экранах больше 768px шириной
    animate({
      duration: 2000,
      draw(progress) {
        videoPopUp.popUp.style.opacity = 1 - progress;
        popupBlock.style.transform = `scale(${1 - progress})`;
        if (progress === 1) {
          resolve();
        }
      }
    });
  }), '.skip');

  setTimeout(() => {
    skipButton.style.display = 'block';
  }, 10000);

  video.addEventListener('playing', () => {
    preloader.style.display = 'none';
  });

  video.addEventListener('ended', () => {
    videoPopUp.closePopUp();
  }
  );

  video.autoplay = true;

  getData('./dbHeroes.json').then(heroesData => {
    setTimeout(() => { // Имитация задержки
      render(heroesData, heroesData, cards, selects, inputs);

      // Слушатель изменения фильтров
      filterForm.addEventListener('change', event => {
        // if (event.target.tagName === 'SELECT') {
        console.log('ch', event);
        const filtered = filterCards(filterForm.elements, heroesData);
        render(heroesData, filtered, cards, selects, inputs);
        inputs.forEach(input => {
          input.nextElementSibling.style.display = 'none';
        });
        // }
      });

      // Слушатели для инпутов: по фокусу открывается дропдаун, по потере фокуса закрывается,
      // по вводу фильтруются значения в дропдауне
      inputs.forEach(input => {
        const dropdown = input.nextElementSibling;
        const clear = input.parentElement.querySelector('.clear');
        const changeEvent = new CustomEvent('change',   {
          bubbles: true,
          cancelable: true,
          type: 'change'
        });
        input.addEventListener('focus', () => {
          console.log('фокус инпут', event);
          dropdown.style.display = 'block';
          dropdown.style.opacity = '100';
        });
        input.addEventListener('blur', () => {
          console.log(document.activeElement);

          dropdown.style.display = 'none';

          // dropdown.style.opacity = '0';

        });
        clear.addEventListener('click', () => {
          input.value = '';
          toggleClearButton(input, false);
          input.dispatchEvent(changeEvent);
        });
        input.addEventListener('input', event => {
          dropdown.style.display = 'block';
          dropdown.style.opacity = '100';
          if (input.value) {
            toggleClearButton(input, true);
          } else { toggleClearButton(input, false); }
          addDropdown(filterCards(filterForm.elements, heroesData), event.target);
        });
        dropdown.addEventListener('mousedown', event => {
          const item = event.target;
          console.log('drop', item);
          if (item.matches('.dropdown-item')) {
            input.value = item.textContent;
            toggleClearButton(input, true);
            // dropdown.style.display = 'none';
            // console.log('item', item);
            input.dispatchEvent(changeEvent);
          }
        });
      });

      // Сбрасывает все фильтры
      resetButton.addEventListener('click', () => {
        filterForm.reset();
        render(heroesData, heroesData, cards, selects, inputs);
        inputs.forEach(input => toggleClearButton(input, false));
      });

      // Показать кнопку "Пропустить"
      skipButton.style.display = 'block';

    }, 5000);
  }).catch(error => {
    // вывод ошибки
  });

  // Слушатель: по клику на фото в карточке - переворачивает ее
  cards.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card-photo') && !target.matches('.card-name')) {
      flipCard(target);
    }
  });
};

class PopUp {
  constructor(popUpSelector, closeEffectsFunc = () => {}, closeSelector = '.popup-close', popUpButtonsSelector) {
    this.popUp = document.querySelector(popUpSelector);
    this.closeEffectsFunc = closeEffectsFunc;
    this.closeButton = this.popUp.querySelector(closeSelector) || null;
    if (popUpButtonsSelector) {
      this.popUpButtons = document.querySelectorAll(popUpButtonsSelector);
    }

    this.popUp.addEventListener('click', event => {
      if (event.target === this.closeButton) {
        this.closePopUp();
      }
    });
  }

  // Закрытие модального окна
  closePopUp() {
    this.closeEffectsFunc().then(() => {
      this.popUp.style.display = 'none';
    });
  }
}

start();




