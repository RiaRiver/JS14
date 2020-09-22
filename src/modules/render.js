// Создает и возвращает карточку, принимает объект карточки
import {updateSelects} from "./selects";
import {addDropdown} from "./dropdowns";

const createCard = (hero) => {
  const newCard = document.createElement('li');
  newCard.className = `card ${(hero.status !== 'alive') ? 'card-dark' : ''}`;
  newCard.innerHTML = `
    <div class="card-flipper">
      <div class="card-front">
        <div class="card-photo ">
          <h2 class="card-name">${hero.name}</h2>
          <img class="click-icon" src="media/click.svg" alt="">
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
           <img class="click-icon" src="media/click.svg" alt="">
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
  return newCard;
};
// Рендер нескольких карточек, принимает родительский элемент и массив объектов карточек,
// перед рендером родительский элемент очищается.
const renderCards = (cardsElem, heroes) => {
  cardsElem.innerHTML = '';
  heroes.forEach(hero => cardsElem.append(createCard(hero)));
};

// Рендер всех карточек и обновление фильтров, с учетом выбранных значений
export const render = (objects, filteredObjects, cards, selects, inputs) => {
  renderCards(cards, filteredObjects);
  updateSelects(selects, objects);
  inputs.forEach(input => {
    addDropdown(filteredObjects, input);
  });
};