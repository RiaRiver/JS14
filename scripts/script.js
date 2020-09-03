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

// Меню
const toggleMenu = (menuButtonSelector, menuSelector) => {
  const menu = document.querySelector(menuSelector);

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  document.addEventListener('click', event => {
    const target = event.target,
      isMenuActive = menu.classList.contains('active-menu'),
      targetIsMenu = target.closest(menuSelector),
      targetIsMenuButton = target.closest(menuButtonSelector);

    if (targetIsMenuButton || (isMenuActive && !targetIsMenu)) {
      handlerMenu();
      return;
    }

    if (targetIsMenu && target.matches('a')) {
      handlerMenu();
      event.preventDefault();
      const hash = target.hash;
      if (hash !== '#close') {
        scrollToElem(document.querySelector(hash));
      }
    }
  });
};

// Вызов функции управления меню
toggleMenu('.menu', 'menu');

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
    const target = event.target;
    if (target === closeButton || target === popUp) {
      closePopUp();
    }
  });
};

// Получение кнопок открытия модалок и элемента модального окна, вызов функции управления модальными окнами
const popUp = document.querySelector('.popup'),
  popupButtons = document.querySelectorAll('.popup-btn');
togglePopUp(popupButtons, popUp);

// Настройка кнопки "Вниз"
const scrollDownButton = document.querySelector('[href = "#service-block"]'),
  scrollDownTarget = document.querySelector('#service-block');
scrollDownButton.addEventListener('click', event => {
  event.preventDefault();
  scrollToElem(scrollDownTarget);
});

// Табы
const controlTabs = (tabHeader, tabSelector, tabContents) => {
  const tabs = tabHeader.querySelectorAll(tabSelector);
  const changeTabContent = currentTab => {
    tabs.forEach((tab, i) => {
      if (tab === currentTab) {
        tabs[i].classList.add('active');
        tabContents[i].classList.remove('d-none');
      } else {
        tabs[i].classList.remove('active');
        tabContents[i].classList.add('d-none');
      }
    });
  };

  tabHeader.addEventListener('click', event => {
    const currentTab = event.target.closest(tabSelector);
    if (currentTab) {
      changeTabContent(currentTab);
    }
  });
};

// Получение блока с табами и блоков с контентом, вызов функции управления переключения табов
const tabHeader = document.querySelector('.service-header'),
  tabContents = document.querySelectorAll('.service-tab');
controlTabs(tabHeader, '.service-header-tab', tabContents);

// TODO[done] Реализовать слайдер на сайте по видеоуроку
// TODO Удалить все элементы со страницы с классом dot (из верстки Index.html)
// TODO Написать скрипт, который будет на страницу добавлять точки с классом dot равному количеству слайдов

// Слайдер
const slider = () => {
  const slides = document.querySelectorAll('.portfolio-item');
  const sliderButtons = document.querySelectorAll('.portfolio-btn');
  const dots = document.querySelectorAll('.dot');
  const sliderContainer = document.querySelector('.portfolio-content');
  let currentSlide = 0,
    interval;

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const nextSlide =  (elem, index, strClass)  => {
    elem[index].classList.add(strClass);
  };
  const autoPlaySlide = () => {
    prevSlide(slides, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slides.length) currentSlide = 0;
    nextSlide(slides, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');
  };
  const startSlider = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };
  const stopSlider = () => {
    clearInterval(interval);
  };

  sliderContainer.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }
    prevSlide(slides, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');
    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      currentSlide = [...dots].indexOf(target);
    }
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    nextSlide(slides, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');
  });

  sliderContainer.addEventListener('mouseover', event => {
    if (event.target.matches('.portfolio-btn,.dot ')) {
      stopSlider();
    }
  });
  sliderContainer.addEventListener('mouseout', event => {
    if (event.target.matches('.portfolio-btn,.dot ')) {
      startSlider();
    }
  });
  startSlider(1500);
};
slider();
