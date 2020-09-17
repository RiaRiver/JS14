// Слайдер
// Слайдер получает параметры: селектор контейнера, класс слайда, суффикс для классов активных слайда и точки,
// селекторы кнопок назад и вперед, флаг автопроигрывания (по умолчанию включено), период смены слайда (по умолчанию 3 секунды)
export const slider = (sliderContainerSelector, slideClass, activeSuffix, dotsContainerSelector, dotClass, prevButtonSelector, nextButtonSelector, autoPlay = true, changeTime = 2000) => {
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