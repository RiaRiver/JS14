'use strict';
// В родительском элементе создаем спаны с текстами и текущими значениями, если update выставлен true, значения будут обновляться каждую секунду
const outputDate = function(parentElement, texts, update) {
  const spans = {};

  // Склонение числительных
  const unitWords = function(value, words) {
    return words[(value % 100 > 4 && value % 100 < 20) ? 0 : [0, 1, 2, 2, 2][(value % 10 < 5) ? value % 10 : 0]];
  };

  // Получение объекта с нужными данными даты
  const getDateObj = function() {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      greetings = ['Добрая ночь', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
      date = new Date(),
      newYear = new Date(date.getFullYear() + 1, 0, 1),
      toNewYear = Math.floor((newYear - date) / 1000 / 60 / 60 / 24);
    return {
      greeting: greetings[Math.floor(date.getHours() / 6)],
      weekDay: days[date.getDay()],
      time: date.toLocaleTimeString('en'),
      toNewYear: `${toNewYear} ${unitWords(toNewYear, ['дней', 'день', 'дня'])}`
    };
  };

  // Обновление даты
  const updateDate = function(spans) {
    const currentDate = getDateObj();
    for (const key in currentDate) {
      spans[key].textContent = currentDate[key];
    }
  };

  // Создание элементов на странице
  const addDataElements = function() {
    for (const key in texts) {
      const outerSpan = document.createElement('span');
      outerSpan.style.display = 'block';
      outerSpan.innerHTML = `${texts[key]}<span></span>`;
      parentElement.append(outerSpan);
      spans[key] = outerSpan.querySelector('span');
    }
    updateDate(spans);
  };

  addDataElements();
  if (update) {
    setInterval(updateDate, 1000, spans);
  }
};

// Получение родительского элемента, тексты для вывода и запуск
const parentElement = document.querySelector('h1');
const texts = {
  greeting: ``,
  weekDay: `Сегодня: `,
  time: `Текущее время: `,
  toNewYear: `До нового года осталось: `
};

outputDate(parentElement, texts, true);


