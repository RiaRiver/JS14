'use strict';

// Описание задачи:
// Используйте функции alert, confirm, prompt для общения с пользователем.

// Написать игровой бот.

// Что должна делать программа:

// — спрашивает пользователя: "Угадай число от 1 до 100".
// — если пользовательское число больше, то бот выводит "Загаданное число меньше" и предлагает ввести новый вариант;
// — если пользовательское число меньше, то бот выводит "Загаданное число больше" и предлагает ввести новый вариант;
// — если пользователь ввел не число, то выводит сообщение "Введи число!" и предлагает ввести новый вариант;
// — если пользователь нажимает "Отмена", то игра заканчивается.

// Программа должны быть выполнена с помощью рекурсии, без единого цикла.

// Загаданное число должно храниться «в замыкании»

//Функции

// Получение рандомного целого в диапазоне
const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

// Проверка на число
const isNumber = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

// Логика в функции с замыканием
const game = function () {
  let hiddenNumber = getRandomIntInclusive(1, 100);
  let attempt = prompt('Угадай число от 1 до 100');

  const checkAttempt = function () {
    switch (true) {
      case attempt === null: {
        alert('Игра закончена.');
        return;
      }

      case !isNumber(attempt): {
        alert('Введи число!');
        break;
      }

      case attempt > hiddenNumber: {
        alert('Загаданное число меньше');
        break;
      }

      case attempt < hiddenNumber: {
        alert('Загаданное число больше');
        break;
      }

      case +attempt === hiddenNumber: {
        alert(`Вы угадали! Это число ${hiddenNumber}. Игра закончена.`);
        return;
      }
    }

    attempt = prompt('Введите новый вариант');
    checkAttempt();
  };

  return checkAttempt;
};

// Запуск
game()();
