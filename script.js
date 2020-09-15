'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('cars'),
    output = document.getElementById('output');

  const getData = () => fetch('./cars.json', {
    cache: 'default',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Network status not 200.');
      }
      return (response.json());
    });

  const outputData = data => {
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

  const outputError = error => {
    output.innerHTML = 'Произошла ошибка';
    console.error(error);
  };

  select.addEventListener('change', () => {
    getData()
      .then(outputData)
      .catch(outputError);
  });
});
