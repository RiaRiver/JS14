'use strict';
const week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
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

week.forEach((item, i) => {
  console.log('%c%s', getStyle(i, currentDayIndex), item);
});
