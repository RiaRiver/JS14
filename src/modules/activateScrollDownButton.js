// Кнопка "Вниз"
import {scrollToElem} from "./scrollToElem";

export const activateScrollDownButton = targetHash => {
  const scrollDownButton = document.querySelector(`[href = "${targetHash}"]`),
    scrollDownTarget = document.querySelector(targetHash);

  scrollDownButton.addEventListener('click', event => {
    event.preventDefault();
    scrollToElem(scrollDownTarget);
  });
};