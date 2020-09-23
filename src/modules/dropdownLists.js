import {getData} from "./getData";

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

export const addDefault = (data) => {
  const dropdownColDefault = document.querySelector('.dropdown-lists__list--default .dropdown-lists__col');
  dropdownColDefault.innerHTML = '';
  data.forEach(item => {
    item.cities.sort((a, b) => b.count - a.count);
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

export const addSelect = (data, country) => {
  const dropdownColSelect = document.querySelector('.dropdown-lists__list--select .dropdown-lists__col');
  dropdownColSelect.innerHTML = '';
  const item = data.find(item => item.country === country);
  item.cities.sort((a, b) => b.count - a.count);
  const countryBlock = createCountryBlock();
  const totalLine = createTotalLine(item.country, item.count);
  countryBlock.append(totalLine);

  for (let i = 0; i < item.cities.length; i++) {
    const line = createLine(item.cities[i]);
    countryBlock.append(line);
  }

  dropdownColSelect.append(countryBlock);
};

export const addAutocomplete = (data, value) => {
  const dropdownColAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete .dropdown-lists__col');
  dropdownColAutocomplete.innerHTML = '';
  const items = data.reduce((acc, country) => acc.concat(country.cities.filter(city => city.name.toLowerCase().startsWith(value.toLowerCase()))), []);
  const countryBlock = createCountryBlock();

  items.forEach(item => {
    const line = createLine(item);
    const cityName = line.firstElementChild;
    console.log('child', cityName)
    const cityNameStr =cityName.textContent;
    cityName.innerHTML = `<span class="match">${cityNameStr.slice(0,value.length)}</span>${cityNameStr.slice(value.length)}`
    countryBlock.append(line);
  })

  if (!items.length) {
    const line = createLine({name: 'Ничего не найдено', count: '', link: 'none'});
    countryBlock.append(line);
  }

  dropdownColAutocomplete.append(countryBlock);
};