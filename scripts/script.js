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
// Слайдер получает параметры: селектор контейнера, класс слайда, суффикс для классов активных слайда и точки,
// селекторы кнопок назад и вперед, флаг автопроигрывания (по умолчанию включено), период смены слайда (по умолчанию 3 секунды)
const slider = (sliderContainerSelector, slideClass, activeSuffix, dotClass, prevButtonSelector, nextButtonSelector, autoPlay = true, changeTime = 2000) => {
  const sliderContainer = document.querySelector(sliderContainerSelector),
    slides = document.getElementsByClassName(slideClass),
    dots = document.getElementsByClassName(dotClass),
    controlsSelectors = `${prevButtonSelector},${nextButtonSelector},.${dotClass}`;

  let currentSlide = 0,
    interval;

  // Исправление выхода текущего индекса за пределы количества слайдов
  const fixSliderOverflow = () => {
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
  };

  // Дизактивация слайда ( и соответствующей точки)
  const disactivateSlide = index => {
    slides[index].classList.remove(`${slideClass}${activeSuffix}`);
    dots[index].classList.remove(`${dotClass}${activeSuffix}`);
  };

  // Активация слайда ( и соответствующей точки)
  const activateSlide =  index  => {
    slides[index].classList.add(`${slideClass}${activeSuffix}`);
    dots[index].classList.add(`${dotClass}${activeSuffix}`);
  };

  // Смена слайда на следующий
  const changeSlideToNext = () => {
    disactivateSlide(currentSlide);
    currentSlide++;
    fixSliderOverflow();
    activateSlide(currentSlide);
  };

  // Запуск авпосмены слайдов
  const startAutoPlay = () => {
    if (autoPlay) interval = setInterval(changeSlideToNext, changeTime);
  };

  // Остановка автосмены слайдов
  const stopAutoPlay = () => {
    clearInterval(interval);
  };

  // Слушатель для управления по клику на контроллеры
  sliderContainer.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;

    // Если клик не по контроллеру, ничего не происходит
    if (!target.matches(controlsSelectors)) {
      return;
    }

    disactivateSlide(currentSlide);

    switch (true) {
    case target.matches(prevButtonSelector): {
      currentSlide--;
      break;
    }
    case target.matches(nextButtonSelector): {
      currentSlide++;
      break;
    }
    case target.matches(`.${dotClass}`): {
      currentSlide = [...dots].indexOf(target);
      break;
    }
    }

    fixSliderOverflow();
    activateSlide(currentSlide);
  });

  // Слушатель останавливает автопроигрывание при наведении курсора на контроллеры
  sliderContainer.addEventListener('mouseover', event => {
    if (event.target.matches(controlsSelectors)) {
      stopAutoPlay();
    }
  });

  // Слушатель запускает автопроигрывание (если параметр autoPlay = true) при уходе курсора c контроллера
  sliderContainer.addEventListener('mouseout', event => {
    if (event.target.matches(controlsSelectors)) {
      startAutoPlay();
    }
  });

  // Запуск автопроигрывания (если параметр autoPlay = true)
  startAutoPlay();
};

slider('.portfolio-content', 'portfolio-item', '-active', 'dot', '#arrow-left', '#arrow-right', true, 5000);
