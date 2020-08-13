'use strict';

// Задача 1
const arr = [];
let result;

const isNumber = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

// Проверяет, что число целое, положительное, 2х или более значное
const isMultiDigit = function (v) {
  return Number.isInteger(parseFloat(v)) && +v > 9;
};

const inputNum = function (i) {
  let num;
  do {
    num = prompt(`Введите ${i}-ое многозначное число (положительное целое, состоящее из 2х или более цифр):`);
  } while (!isNumber(num) || !isMultiDigit(num));
  return num.trim();
};

for (let i = 0; i < 7; i++) {
  arr[i] = inputNum(i + 1);
}

result = arr.filter((item) => item.charAt(0) === '2' || item.charAt(0) === '4').join(', ');

console.log(
  result !== '' ? 'Числа, начинающиеся с "2" или "4": ' + result : 'Отсутствуют числа, начинающиеся с "2" или "4"'
);

// Задача 2
const primes = [];

const isPrime = function (n) {
  if (n < 2) {
    return false;
  }

  if ((n !== 2 && n % 2) === 0) {
    return false;
  }

  for (let i = 2; i < n / 2; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
};

for (let i = 1; i <= 100; i++) {
  if (isPrime(i)) {
    primes.push(i);
  }
}

for (let pr of primes) {
  console.log(`${pr} : Делители этого числа: 1 и ${pr}`);
}
