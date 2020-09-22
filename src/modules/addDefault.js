import {data} from "../../db_cities";

const createCountryBlock = () => {
  const countryBlock = document.createElement('div');
  countryBlock.className = 'dropdown-lists__countryBlock';
  return countryBlock;
}
const createTotalLine = (country, count) => {
  const totalLine = document.createElement('div');
  totalLine.className = 'dropdown-lists__total-line';
  totalLine.innerHTML = `
  <div class="dropdown-lists__country">${country}</div>
  <div class="dropdown-lists__count">${count}</div>
`;
  return totalLine;
}
const createLine = (city) => {
  const line = document.createElement('div');
  line.dataset.cityLink = city.link;
  line.className = 'dropdown-lists__line';
  line.innerHTML = `
  <div class="dropdown-lists__city">${city.name}</div>
  <div class="dropdown-lists__count">${city.count}</div>
`;
  return line;
}
export const addDefault = () => {
  const dropdownColDefault = document.querySelector('.dropdown-lists__list--default .dropdown-lists__col');
  dropdownColDefault.innerHTML = '';
  const RU = data.RU;
  RU.forEach(item => {
    const countryBlock = createCountryBlock();
    const totalLine = createTotalLine(item.country, item.count);
    countryBlock.append(totalLine);
    for (let i = 0; i < 3; i++) {
      const line = createLine(item.cities[i]);
      countryBlock.append(line);
    }
    dropdownColDefault.append(countryBlock);
  })
};

export const addSelect = (country) => {
  const dropdownColSelect= document.querySelector('.dropdown-lists__list--select .dropdown-lists__col');
  dropdownColSelect.innerHTML = '';
  const RU = data.RU;
  const item = RU.find(item => item.country === country);
    const countryBlock = createCountryBlock();
    const totalLine = createTotalLine(item.country, item.count);
    countryBlock.append(totalLine);
    for (let i = 0; i < item.cities.length; i++) {
      const line = createLine(item.cities[i]);
      countryBlock.append(line);
    }
  dropdownColSelect.append(countryBlock);

};

export const addAutocomplete = (value) => {
  const dropdownColAutocomplete= document.querySelector('.dropdown-lists__list--autocomplete .dropdown-lists__col');
  dropdownColAutocomplete.innerHTML = '';
  const RU = data.RU;
  console.log(RU);
  const items = RU.reduce((acc, country) => acc.concat(country.cities.filter(city => city.name.toLowerCase().startsWith(value.toLowerCase()))), []);
  const countryBlock = createCountryBlock();

  items.forEach(item =>{
    const line = createLine(item);
    countryBlock.append(line);
  })
if(!items.length) {
  const line = createLine({name: 'Ничего не найдено', count: ''});
  countryBlock.append(line);
}
  dropdownColAutocomplete.append(countryBlock);
};