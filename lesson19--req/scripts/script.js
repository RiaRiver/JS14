'use strict';
// window.addEventListener('DOMContentLoaded', function(){});

// Timer
function countTimer(deadline, { hours, minutes, seconds }) {
  let timerInterval = null;

  // Получение оставшегося времени
  function getTimeRemaining() {
    const dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);
    return { timeRemaining, hours, minutes, seconds };
  }

  // Обновление таймера
  function updateTimer() {
    const timer = getTimeRemaining();

    if (timer.timeRemaining < 1) {
      clearInterval(timerInterval);
      for (const key in timer) {
        timer[key] = 0;
      }
      hours.parentElement.style.color = 'red';
    }
    hours.textContent = String(timer.hours).padStart(2, '0');
    minutes.textContent = String(timer.minutes).padStart(2, '0');
    seconds.textContent = String(timer.seconds).padStart(2, '0');
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Получение элементов и запуск таймера
const hours = document.querySelector('#timer-hours');
const minutes = document.querySelector('#timer-minutes');
const seconds = document.querySelector('#timer-seconds');
countTimer('03 september 2020 08:15:30', { hours, minutes, seconds });

// TODO[done] Написать скрипт Меню и модального окна по видео
// Меню
const toggleMenu = (menuButton, menu) => {
  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  menuButton.addEventListener('click', handlerMenu);

  menu.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      handlerMenu();
    }
  });
};

// Получение кнопки открытия меню и элемента меню, вызов функции управления меню
const menuButton = document.querySelector('.menu'),
  menu = document.querySelector('menu');
toggleMenu(menuButton, menu);

// TODO[done] Написать анимацию появления модального окна
// Использовать JS анимацию. Использовать нативный JavaScript. Использование сторонних библиотек запрещено!
// Необходимо манипулировать элементами посредством JS. СSS анимация не подходит.

// Паттерн анимации
function animate({ timing, draw, duration }) {
  const start = performance.now();

  requestAnimationFrame(function animateStep(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    const progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animateStep);
    }
  });
}

// TODO[done] Если пользователь заходит на сайт с устройства, у которого ширина экрана меньше 768px (мобильного устройства) - анимация отключается

// Popup
const togglePopup = (popupButtons, popup) => {
  const closeButton = popup.querySelector('.popup-close');

  // Открытие модального окна
  const openPopup = () => {
    popup.style.display = 'block';

    // Анимация на экранах больше 768px шириной
    if (innerWidth > 768) {
      animate({
        duration: 500,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          popup.style.opacity = progress;
        }
      });
    }
  };

  // Закрытие модального окна
  const closePopup = () => {
    popup.style.display = '';
    popup.style.opacity = '';
  };

  // Слушатели на управляющие кнопки
  popupButtons.forEach(button => {
    button.addEventListener('click', openPopup);
  });
  closeButton.addEventListener('click', closePopup);
};

// Получение кнопок открытия модалок и элемента модального окна, вызов функции управления модальными окнами
const popup = document.querySelector('.popup'),
  popupButtons = document.querySelectorAll('.popup-btn');
togglePopup(popupButtons, popup);
