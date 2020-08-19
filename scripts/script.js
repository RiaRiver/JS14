'use strict';
// 1) Выведите на страницу текущую дату и время в 2-х форматах:

//     a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'

//     б) '04.02.2020 - 21:05:33'

// 2) Для вывода в формате (а) напишите функцию, которая будет менять менять склонение слов в зависимости от числа, "час, часов, часа"

// 3) Для вывода в формате (б) напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)

// 4) С помощью функции setInterval, реализуйте вывод даты и времени каждую секунду

const getTitle = function (value, units) {
  let lastDigit = value % 10;
  let last2Digits = value % 100;

  switch (true) {
    case last2Digits > 10 && last2Digits < 20:
      return units[2];
    case lastDigit > 1 && lastDigit < 5:
      return units[1];
    case lastDigit === 1:
      return units[0];
    default:
      return units[2];
  }
};

const padLeftZero = function (value) {
  return value < 10 ? '0' + value : value;
};

const getDateStrings = function (date) {
  const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ],
    currentDate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      dayTitle: week[date.getDay()],
      monthTitle: '',
      hoursTitle: '',
      minutesTitle: '',
      secondsTitle: '',
      // Формирование строк
      stringFormat1: function () {
        return `Сегодня ${this.dayTitle}, ${this.day} ${this.monthTitle} ${this.year} года, ${this.hours} ${this.hoursTitle} ${this.minutes} ${this.minutesTitle} ${this.seconds} ${this.secondsTitle}`;
      },
      stringFormat2: function () {
        return `${padLeftZero(this.day)}.${padLeftZero(this.month)}.${this.year} - ${padLeftZero(
          this.hours
        )}:${padLeftZero(this.minutes)}:${padLeftZero(this.seconds)}`;
      },
    };

  currentDate.monthTitle = months[currentDate.month];
  currentDate.hoursTitle = getTitle(currentDate.hours, ['час', 'часа', 'часов']);
  currentDate.minutesTitle = getTitle(currentDate.minutes, ['минута', 'минуты', 'минут']);
  currentDate.secondsTitle = getTitle(currentDate.seconds, ['секунда', 'секунды', 'секунд']);

  return [currentDate.stringFormat1(), currentDate.stringFormat2()];
};

// Подготовка страницы к выводу
document.body.style.cssText = 'font-family: sans-serif; color: rgb(255, 0, 0); font-size: 14pt';

for (let i = 0; i < 2; i++) {
  document.body.append(document.createElement('p'));
}

const paragraphs = document.querySelectorAll('p');

// Функция вывода на экран
const outputCurrentDateTime = function () {
  const strings = getDateStrings(new Date());
  paragraphs.forEach((elem, i) => (elem.textContent = strings[i]));
};

// Запуск
window.setInterval(outputCurrentDateTime, 1000);
