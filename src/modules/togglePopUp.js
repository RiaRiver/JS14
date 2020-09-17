// PopUp
import {animate} from "./animate";

export const togglePopUp = (popupButtonsSelector, popUpSelector) => {
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