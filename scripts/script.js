'use strict';
// window.addEventListener('DOMContentLoaded', function(){});

// Timer
const countTimer = (deadline, hoursSelector, minutesSelector, secondsSelector) => {
  const hours = document.querySelector(hoursSelector),
    minutes = document.querySelector(minutesSelector),
    seconds = document.querySelector(secondsSelector);
  let timerInterval = null;

  // Получение оставшегося времени
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);
    return { timeRemaining, hours, minutes, seconds };
  };

  // Обновление таймера
  const updateTimer = () => {
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
  };

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
};

// Запуск таймера
countTimer('11 september 2020 08:15:30', '#timer-hours', '#timer-minutes', '#timer-seconds');

// Плавная прокрутка к элементу
const scrollToElem = elem => {
  elem.scrollIntoView({ behavior: 'smooth' });
};

// Кнопка "Вниз"
const activateScrollDownButton = targetHash => {
  const scrollDownButton = document.querySelector(`[href = "${targetHash}"]`),
    scrollDownTarget = document.querySelector(targetHash);

  scrollDownButton.addEventListener('click', event => {
    event.preventDefault();
    scrollToElem(scrollDownTarget);
  });
};

// Настройка работы кнопки Вниз
activateScrollDownButton('#service-block');

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
const animate = ({ timing = timeFraction => timeFraction, draw, duration = 500 }) => {
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
};

// PopUp
const togglePopUp = (popupButtonsSelector, popUpSelector) => {
  const popUp = document.querySelector(popUpSelector),
    popupButtons = document.querySelectorAll(popupButtonsSelector),
    closeButton = popUp.querySelector('.popup-close');

  // Открытие модального окна
  const openPopUp = () => {
    popUp.style.display = 'block';

    // Анимация на экранах больше 768px шириной
    if (innerWidth > 768) {
      animate({
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

// Вызов функции управления модальными окнами
togglePopUp('.popup-btn', '.popup');

// Табы
const controlTabs = (tabsContainerSelector, tabSelector, tabContentsSelector) => {
  const tabsContainer = document.querySelector(tabsContainerSelector),
    tabs = tabsContainer.querySelectorAll(tabSelector),
    tabContents = document.querySelectorAll(tabContentsSelector);
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

  tabsContainer.addEventListener('click', event => {
    const currentTab = event.target.closest(tabSelector);
    if (currentTab) {
      changeTabContent(currentTab);
    }
  });
};

// Вызов функции управления переключения табов
controlTabs('.service-header', '.service-header-tab', '.service-tab');

// Слайдер
// Слайдер получает параметры: селектор контейнера, класс слайда, суффикс для классов активных слайда и точки,
// селекторы кнопок назад и вперед, флаг автопроигрывания (по умолчанию включено), период смены слайда (по умолчанию 3 секунды)
const slider = (sliderContainerSelector, slideClass, activeSuffix, dotsContainerSelector, dotClass, prevButtonSelector, nextButtonSelector, autoPlay = true, changeTime = 2000) => {
  const sliderContainer = document.querySelector(sliderContainerSelector),
    slides = document.getElementsByClassName(slideClass),
    dotsContainer = document.querySelector(dotsContainerSelector),
    dots = [],
    controlsSelectors = `${prevButtonSelector},${nextButtonSelector},.${dotClass}`;

  let currentIndex = 0,
    interval;

  // Добавление точек пагинации
  const createPaginationDots = () => {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.className = dotClass;
      dotsContainer.append(dot);
      dots.push(dot);
    }
    dots[currentIndex].classList.add(`${dotClass}${activeSuffix}`);
  };

  // Исправление выхода текущего индекса за пределы количества слайдов
  const fixSliderOverflow = () => {
    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;
  };

  // Дизактивация слайда ( и соответствующей точки)
  const disactivateSlide = () => {
    slides[currentIndex].classList.remove(`${slideClass}${activeSuffix}`);
    dots[currentIndex].classList.remove(`${dotClass}${activeSuffix}`);
  };

  // Активация слайда ( и соответствующей точки)
  const activateSlide = () => {
    slides[currentIndex].classList.add(`${slideClass}${activeSuffix}`);
    dots[currentIndex].classList.add(`${dotClass}${activeSuffix}`);
  };

  // Смена слайда на следующий
  const changeSlideToNext = () => {
    disactivateSlide();
    currentIndex++;
    fixSliderOverflow();
    activateSlide();
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

    disactivateSlide();

    switch (true) {
    case target.matches(prevButtonSelector): {
      currentIndex--;
      break;
    }
    case target.matches(nextButtonSelector): {
      currentIndex++;
      break;
    }
    case target.matches(`.${dotClass}`): {
      currentIndex = dots.indexOf(target);
      break;
    }
    }

    fixSliderOverflow();
    activateSlide();
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

  // Создаются точки пагинации
  createPaginationDots();
  // Запуск автопроигрывания (если параметр autoPlay = true)
  startAutoPlay();
};

slider('.portfolio-content', 'portfolio-item', '-active', '.portfolio-dots', 'dot', '#arrow-left', '#arrow-right', true, 5000);

// Смена фотографий в блоке команда по наведению мыши
const changeCommandPhotoByMouseEvent = commandImageSelector => {
  const commandImages = document.querySelectorAll(commandImageSelector);

  const changePhoto = event => {
    const target = event.target,
      prevSrc = target.attributes.src.value;
    target.src = target.dataset.img;
    target.dataset.img = prevSrc;
  };

  commandImages.forEach(image => {
    image.addEventListener('mouseenter', changePhoto);
    image.addEventListener('mouseleave', changePhoto);
  });
};

changeCommandPhotoByMouseEvent('.command__photo');

// Функция валидации инпутов
const validate = (inputsSelector, deniedPattern) => {
  const inputs = document.querySelectorAll(inputsSelector);

  const replaceDenied = event => {
    event.target.value = event.target.value.replace(deniedPattern, '');
  };

  inputs.forEach(input => {
    input.addEventListener('input', replaceDenied);
    input.addEventListener('paste', replaceDenied);
  });
};

validate('input.calc-item', /\D|^0+/g);
validate('input.form-phone', /[^+\d]|((?<=.)\+)|((?<=\d{12}).)/g);
validate('input.form-name, #form2-name', /[^\p{Script=Cyrillic}\s]/gu);
validate('input.mess', /[^\p{Script=Cyrillic}\p{P}\s]/gu);

// Калькулятор
const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcTypeSelect = document.querySelector('.calc-type'),
    calcSquareInput = document.querySelector('.calc-square'),
    calcCountInput = document.querySelector('.calc-count'),
    calcDayInput = document.querySelector('.calc-day'),
    totalOutput = document.getElementById('total');

  const calculate = () => {
    let total = 0,
      coef = 1;
    const typeValue = calcTypeSelect.value,
      squareValue = calcSquareInput.value,
      countValue = calcCountInput.value,
      calcDayValue = calcDayInput.value;
    if (countValue > 1) {
      coef += (countValue - 1) / 10;
    }
    if (calcDayValue && calcDayValue < 5) {
      coef *= 2;
    } else if (calcDayValue && calcDayValue < 10) {
      coef *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * coef;
    }

    if (total) {
      let count = 0;
      animate({
        duration: 2000,
        draw(progress) {
          if (count === 7 || progress === 1) {
            totalOutput.textContent = (progress * total).toFixed(0);
            count = 0;
          }
          count++;
        }
      });
    }
  };

  calcBlock.addEventListener('change', calculate);
};

calc(100);

// TODO[done] Переписать скрипт для отправки данных с формы, используя Fetch

// Отправка формы AJAX
// Важно: в loadMessageOrInnerHTML можно передать текст или html прелоадера
// в loadMessageStyleCSS передаются CSS стили для прелоадера (если во всех формах один и тот же прелоадер
// с одинаковыми классами, стили достаточно передать только для первого вызова)
const sendForm = (formSelector, {
  messageStyles = 'font-size: 2rem;',
  successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
  loadMessageOrInnerHTML = 'Загрузка ...',
  loadMessageStyleCSS = '',
  errorMessage = 'Что-то пошло не так ...'
} = {}) => {

  const form = document.querySelector(formSelector);

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = messageStyles;

  if (loadMessageStyleCSS) {
    const loadMessageStyles = document.createElement('style');
    loadMessageStyles.textContent = loadMessageStyleCSS;
    document.head.append(loadMessageStyles);
  }

  const getFormData = form => {
    const formData = new FormData(form);
    const body = {};
    formData.forEach((value, key) => body[key] = value);
    return body;
  };

  const outputMessage = () => {
    statusMessage.textContent = successMessage;
  };
  const outputError = error => {
    statusMessage.textContent = errorMessage;
    console.error(error);
  };

  const sendData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    form.append(statusMessage);
    statusMessage.innerHTML = loadMessageOrInnerHTML;
    sendData(getFormData(event.target))
      .then(response => {
        setTimeout(() => {
          statusMessage.textContent = '';
        }, 5000);
        if (response.status !== 200) {
          throw new Error('Network status not 200.');
        }
        outputMessage();
      })
      .catch(outputError);
    form.reset();
  });
};

sendForm('#form1',
  {
    loadMessageOrInnerHTML: `
      <div class="preloader">
        <div class="pl-child-1 pl-child"></div>
        <div class="pl-child-2 pl-child"></div>
        <div class="pl-child-3 pl-child"></div>
      </div>
    `,
    loadMessageStyleCSS: `
      .preloader {
        width: 6em;
        margin: auto;
        padding: 5px;
        text-align: center;
        }
        
      .pl-child {
        width: 1em;
        height: 1em;
        background-color: #19b5fe ;
        border-radius: 100%;
        display: inline-block;
        animation: preloader 1.4s ease-in-out 0s infinite both;
      }
  
      .pl-child-1 {
        animation-delay: -0.32s;
      }
      
      .pl-child-2 {
        animation-delay: -0.16s;
      }
  
      @keyframes preloader {
        0%, 80%, 100% {
          transform: scale(0);
        }
        40% {
          transform: scale(1.0);
        }
  `
  });

sendForm('#form2',
  {
    loadMessageOrInnerHTML: `
      <div class="preloader">
        <div class="pl-child-1 pl-child"></div>
        <div class="pl-child-2 pl-child"></div>
        <div class="pl-child-3 pl-child"></div>
      </div>
    `
  });

sendForm('#form3',
  {
    messageStyles: 'font-size: 2rem; color: white;',
    loadMessageOrInnerHTML: `
      <div class="preloader">
        <div class="pl-child-1 pl-child"></div>
        <div class="pl-child-2 pl-child"></div>
        <div class="pl-child-3 pl-child"></div>
      </div>
    `
  });

