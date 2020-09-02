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

const scrollToElem = elem => {
  elem.scrollIntoView({ behavior: 'smooth' });
};
// TODO В функции toggleMenu() много обработчиков событий. Используя делегирование событий, сделать обработчики для:
// -  Крестика закрытия меню и пунктов меню.
// -  На кнопку меню.
// У вас должно быть максимум 2 обработчика события в  функции toggleMenu()
// Меню
const toggleMenu = (menuButton, menu) => {
  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  menuButton.addEventListener('click', handlerMenu);

  menu.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      handlerMenu();
      event.preventDefault();
      const hash = event.target.hash;
      if (hash !== '#close') {
        scrollToElem(document.querySelector(hash));
      }
    }
  });
};

// Получение кнопки открытия меню и элемента меню, вызов функции управления меню
const menuButton = document.querySelector('.menu'),
  menu = document.querySelector('menu');
toggleMenu(menuButton, menu);

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

// PopUp
const togglePopUp = (popupButtons, popUp) => {
  const closeButton = popUp.querySelector('.popup-close');

  // Открытие модального окна
  const openPopUp = () => {
    popUp.style.display = 'block';

    // Анимация на экранах больше 768px шириной
    if (innerWidth > 768) {
      animate({
        duration: 500,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          popUp.style.opacity = progress;
        }
      });
    }
  };

  // Закрытие модального окна
  const closePopUp = () => {
    popUp.style.display = '';
    popUp.style.opacity = '';
  };

  // Слушатели на управляющие кнопки
  popupButtons.forEach(button => {
    button.addEventListener('click', openPopUp);
  });

  popUp.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      closePopUp();
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        closePopUp();
      }
    }
  });
};

// Получение кнопок открытия модалок и элемента модального окна, вызов функции управления модальными окнами
const popUp = document.querySelector('.popup'),
  popupButtons = document.querySelectorAll('.popup-btn');
togglePopUp(popupButtons, popUp);

const scrollDownButton = document.querySelector('[href = "#service-block"]');
const scrollDownTarget = document.querySelector('#service-block');
scrollDownButton.addEventListener('click', event => {
  event.preventDefault();
  scrollToElem(scrollDownTarget);
});

// TODO[done] Реализовать табы по видео.
// Табы
const controlTabs = (tabHeader, tabs, tabContents) => {
  const changeTabContent = index => {
    for (let i = 0; i < tabContents.length; i++) {
      if (i === index) {
        tabs[i].classList.add('active');
        tabContents[i].classList.remove('d-none');
      } else {
        tabs[i].classList.remove('active');
        tabContents[i].classList.add('d-none');
      }
    }
  };

  tabHeader.addEventListener('click', event => {
    let target = event.target;
    target = target.closest('.service-header-tab');

    if (target) {
      tabs.forEach((tab, i) => {
        if (tab === target) {
          changeTabContent(i);
        }
      });
    }
  });
};

const tabHeader = document.querySelector('.service-header'),
  tabs = tabHeader.querySelectorAll('.service-header-tab'),
  tabContents = document.querySelectorAll('.service-tab');
controlTabs(tabHeader, tabs, tabContents);
