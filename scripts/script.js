'use strict';
const converterForm = document.forms.converter,
  leftInput = converterForm.querySelector('#left-input'),
  rightInput = converterForm.querySelector('#right-input'),
  reverseButton = converterForm.querySelector('#reverse'),
  rateSpan = converterForm.querySelector('#rate'),
  apiUrl = new URL('https://api.exchangeratesapi.io/latest');

const getRates = url => fetch(url, { mode: 'cors' });

const validation = event => {
  const input = event.target;
  input.value = input.value.replace(/[^\d.]|^[0.]+|(?<=(\.|(?<!^[0.]+)\.\d+?))\./g, '');
};

const reverseInputs = () => {
  const tempInputName = leftInput.name;
  const tempLabelText = leftInput.labels[0].textContent;
  leftInput.name = rightInput.name;
  leftInput.labels[0].textContent = rightInput.labels[0].textContent;

  rightInput.name = tempInputName;
  rightInput.labels[0].textContent = tempLabelText;
  converterForm.reset();
  rateSpan.textContent = '';
};

const outputData = data => {
  const targetCurrency = rightInput.name.toUpperCase(),
    rate = data.rates[targetCurrency];

  rightInput.value = (leftInput.value * rate).toFixed(2);
  rateSpan.textContent = `Курc: ${rate}`;
};

const convert = event => {
  event.preventDefault();
  if (leftInput.value) {
    const params = {
      base: leftInput.name.toUpperCase(),
      symbols: rightInput.name.toUpperCase()
    };

    apiUrl.search = new URLSearchParams(params).toString();

    getRates(apiUrl)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network status not 200.');
        }
        return (response.json());
      })
      .then(outputData)
      .catch(error => {
        rateSpan.textContent = 'Что-то пошло не так.';
        console.error('Ошибка: ', error);
        setTimeout(() => {
          rateSpan.textContent = '';
        }, 3000);
      });
  }
};

converterForm.addEventListener('submit', convert);
reverseButton.addEventListener('click', reverseInputs);
leftInput.addEventListener('input', validation);
leftInput.addEventListener('paste', validation);
