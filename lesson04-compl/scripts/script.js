'use strict';

const transformString = function (str) {
  if (typeof str !== 'string') {
    return 'Получена не строка!';
  }

  let result = str.trim(); //Объявляю тут , потому что если не строка, то не имеет смысла.

  if (result.length > 30) {
    result = result.substr(0, 30) + '...';
  }

  return result;
};

console.log(`Тест с "не строкой": ${transformString(15)}`);
console.log(`Тест со строкой: "${transformString(prompt('Введите строку'))}"`);
