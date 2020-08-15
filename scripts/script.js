'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const currentDayIndex = (new Date().getDay() + 6) % 7;
const getStyle = function (dayInd, currentDayInd) {
  let style = 'font-family: Arial; font-size: 12px;';
  if (dayInd > 4) {
    style += ' font-style: italic;';
  }
  if (currentDayInd === dayInd) {
    style += ' font-weight: bold;';
  }
  return style;
};

week
  .map((item, i) => {
    const p = document.createElement('p');
    p.textContent = item;
    p.style.cssText = getStyle(i, currentDayIndex);
    return p;
  })
  .forEach((item) => document.body.append(item));
