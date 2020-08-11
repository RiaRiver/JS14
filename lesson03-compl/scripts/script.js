'use strict';

// Задание 1: переменные
let lang,
  daysArr = [
    ['ru', 'понедельник', 'вторник', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    ['en', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  ],
  daysObj = {
    ru: ['понедельник', 'вторник', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    en: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  };

// Задание 2: переменные
let namePerson,
  // Временная переменная, чтобы логику в выводе не писать
  role;

// Задание 1: запрос на выбор языка
lang = prompt('Выберите язык: ru или en');

while (lang !== 'ru' && lang !== 'en') {
  alert('Вы ввели язык не верно!');
  lang = prompt('Выберите язык: ru или en');
}

// Задание 2: запрос на ввод имени и определение роли
namePerson = prompt('Введите имя:');
role =
  namePerson.toUpperCase() === 'АРТЕМ'
    ? 'директор'
    : namePerson.toUpperCase() === 'МАКСИМ'
    ? 'преподаватель'
    : 'студент';

// Задание 1: Вывод через if
if (lang === 'ru') {
  console.log('Дни недели: ' + daysObj.ru.join(', '));
} else if (lang === 'en') {
  console.log('Дни недели: ' + daysObj.en.join(', '));
} else {
  console.log('Ошибка: Не верно задано значение языка.');
}

// Задание 1: Вывод через switch
switch (lang) {
  case 'ru':
    console.log('Дни недели: ' + daysObj.ru.join(', '));
    break;
  case 'en':
    console.log('Дни недели: ' + daysObj.en.join(', '));
    break;
  default:
    console.log('Ошибка: Не верно задано значение языка.');
    break;
}

// Задание 1: вывод через массив
console.log(
  'Дни недели: ' +
    (daysArr.find((elem) => elem.includes(lang)) || [0, 'Не верно задано значение языка.']).slice(1).join(', ')
);

// Задание 1: Вывод через объект
console.log('Дни недели: ' + (daysObj[lang] || ['Не верно задано значение языка.']).join(', '));

// Задание 2: Вывод результата
console.log(`${namePerson} - ${role}`);
