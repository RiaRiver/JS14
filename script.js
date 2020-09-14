'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('cars'),
    output = document.getElementById('output');

  const getData = () => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', './cars.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(request.responseText);
      } else if (request.readyState === 4 && request.status !== 200) {
        reject();
      }
    });

  });

  const outputData = json => {
    const data = JSON.parse(json);
    data.cars.forEach(item => {
      if (item.brand === select.value) {
        const { brand, model, price } = item;
        output.innerHTML = `
          Тачка ${brand} ${model} <br>
          Цена: ${price}$
        `;
      }
    });
  };

  const outputError = () => {
    output.innerHTML = 'Произошла ошибка';
  };

  select.addEventListener('change', () => {
    getData()
      .then(outputData)
      .catch(outputError);
  });
});
