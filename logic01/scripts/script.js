'use strict';

const getDiscount = function (amount, itemsQuantity, promocode) {
  let discAmount = amount;
  switch (true) {
    case itemsQuantity >= 10: {
      discAmount *= 0.9;
      break;
    }
    case itemsQuantity >= 5: {
      discAmount *= 0.95;
      break;
    }
  }
  if (discAmount > 100000) {
    discAmount -= (discAmount - 100000) * 0.2;
  }
  switch (promocode) {
    case '15': {
      if (discAmount >= 25000) {
        discAmount *= 0.85;
      }
      break;
    }
    case '100': {
      discAmount = discAmount < 100 ? 0 : discAmount - 100;
      break;
    }
  }

  return discAmount;
};

const amount = document.querySelector('#amount');
const quantity = document.querySelector('#quantity');
const promo = document.querySelector('#promo');
const form = document.querySelector('form');
const discAmount = document.querySelector('#disc-amount');

form.addEventListener('submit', () => {
  event.preventDefault();
  if (!+amount.value) {
    alert('В поле "Сумма" должно быть число!');
    return;
  }

  discAmount.textContent = getDiscount(+amount.value, quantity.value, promo.value);
});
