'use strict';
// TODO[done] При помощи ajax запросов к загруженному файлу сформировать на странице карточки Героев со всеми данными
//  (фото, имя, настоящее имя,  список фильмов, статус). 1 персонаж - 1 карточка.

// TODO Реализовать переключатели-фильтры по фильмам. Выпадающее меню или список, на ваше усмотрение.
//  Показывать только те карточки, которые подходят под выбранный фильтр.

// TODO Стилизация карточек и всего внешнего вида - на ваше усмотрение. Упор сделать на главную цель -
//  донесение информации, никаких вырвиглазных цветов и шрифтов.

// Получение данных
const getData = start => {
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      start(JSON.parse(request.responseText));
    } else {

    }
  });
  request.open('GET', './dbHeroes.json');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send();
};

// Рендер одной карточки, принимает родительский элемент и объект карточки
const renderCard = (cardsElem, hero) => {
  const newCard = document.createElement('li');
  newCard.className = 'card';
  newCard.innerHTML = `
    <h2>${hero.name}</h2>
    <img src="${hero.photo}" alt="${hero.name}">
    <div class="card-texts">
      <span class="card-text">Real name: ${hero.realName || '-'}</span>
      <span class="card-text">Species: ${hero.species || '-'}</span>
      <span class="card-text">Citizenship: ${hero.citizenship || '-'}</span>
      <span class="card-text">Gender: ${hero.gender}</span>
      <span class="card-text">Birthday: ${hero.birthDay || 'unknown'}</span>
      ${(hero.status ===  'alive' && !hero.deathDay) ? ''    :
    `<span class="card-text">Deathday: ${hero.deathDay || 'unknown'}</span>`}
      <span class="card-text">Status: ${hero.status}</span>
      <div class="separator"></div>
      <span class="card-text">Actor: ${hero.actors}</span>
      <p>Movies: ${hero.movies || '-'}</p>
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

// Получает множество уникальных значений свойства из массива объектов
const getUniqValues = (objects, prop) => {
  const uniqValues = new Set();
  objects.forEach(obj => {
    const value = obj[prop];
    if (value) {
      uniqValues.add(`${value[0].toUpperCase()}${value.slice(1)}`);
    } else {
      uniqValues.add('none');
    }
  });
  return [...uniqValues].sort();
};

// Добавляет в селект с id=hero-свойство варианты выбора, основанные на уникальных значениях этого свойста,
// полученных из массива объектов
const addSelects = (objects, ...properties) => {
  properties.forEach(property => {
    const currentSelect = document.querySelector(`#hero-${property}`);
    const uniq = getUniqValues(objects, property);

    const createSelect = (value, text) => {
      const opt = document.createElement('option');
      opt.value = value.toLowerCase();
      opt.innerText = text || value;
      currentSelect.append(opt);
    };
    createSelect('', 'All');

    uniq.forEach(value => {
      if (value) {
        createSelect(value);
      }
    });
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

const filterCards = (event, cards, objects) => {
  const formElements = [...event.currentTarget.elements];
  const filterObj = {};
  formElements.forEach(elem => {
    if (elem.value) {
      filterObj[elem.name] = [elem.value.trim(), elem.tagName.toLowerCase() === 'input'];
    }
  });
  console.log(filterObj);
  renderCards(cards, getFilteredObjects(objects, filterObj));
};

const start = heroesData => {
  const cards = document.querySelector('.cards');
  renderCards(cards, heroesData);
  addSelects(heroesData, 'gender', 'species', 'citizenship', 'status');
  // renderCards(cards, filter(heroesData, { gender: 'Female', species: 'Human', citizenship: 'none' }));
  document.forms.filters.addEventListener('change', event => {
    filterCards(event, cards, heroesData);
  });
};

getData(start);



