'use strict';
// 1) Выведите на страницу текущую дату и время в 2-х форматах:

//     a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'

//     б) '04.02.2020 - 21:05:33'

// 2) Для вывода в формате (а) напишите функцию, которая будет менять менять склонение слов в зависимости от числа, "час, часов, часа"

// 3) Для вывода в формате (б) напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)

// 4) С помощью функции setInterval, реализуйте вывод даты и времени каждую секунду

document.body.style.cssText = 'font-family: sans-serif; color: rgb(255, 0, 0); font-size: 14pt';

const getDateStrings = function (date) {
  // Функции
  const getValueText = function (value, units) {
    const hoursMap = {
        часа: [2, 3, 4, 22, 23],
        час: [1, 21],
      },
      hoursDefaultUnit = 'часов',
      minutesMap = {
        минуты: [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54],
        минута: [1, 21, 31, 41, 51],
      },
      minutesDefaultUnit = 'минут',
      secondsMap = {
        секунды: [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54],
        секунда: [1, 21, 31, 41, 51],
      },
      secondsDefaultUnit = 'секунд';

    const getUnitByValue = function (unitsMap) {
      for (let key in unitsMap) {
        if (unitsMap[key].includes(value)) {
          return key;
        }
      }
    };

    switch (units) {
      case 'hours': {
        return getUnitByValue(hoursMap) || hoursDefaultUnit;
      }
      case 'minutes': {
        return getUnitByValue(minutesMap) || minutesDefaultUnit;
      }
      case 'seconds': {
        return getUnitByValue(secondsMap) || secondsDefaultUnit;
      }
      default:
        return;
    }
  };

  const padLeftZero = function (value) {
    return value < 10 ? '0' + value : value;
  };

  // Данные
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
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    dayText = week[date.getDay()],
    monthText = months[month];

  const hoursText = getValueText(hours, 'hours'),
    minutesText = getValueText(minutes, 'minutes'),
    secondsText = getValueText(seconds, 'seconds');

  // Формирование строк
  const dateString1 = `Сегодня ${dayText}, ${day} ${monthText} ${year} года, ${hours} ${hoursText} ${minutes} ${minutesText} ${seconds} ${secondsText}`,
    dateString2 = `${padLeftZero(day)}.${padLeftZero(month)}.${year} - ${padLeftZero(hours)}:${padLeftZero(
      minutes
    )}:${padLeftZero(seconds)}`;

  return [dateString1, dateString2];
};

const outputCurrentDateTime = function () {
  getDateStrings(new Date())
    .map((item) => {
      const p = document.createElement('p');
      p.textContent = item;
      return p;
    })
    .forEach((item) => document.body.append(item));
};

window.setInterval(outputCurrentDateTime, 1000);
