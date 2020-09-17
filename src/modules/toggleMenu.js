// Меню
import {scrollToElem} from "./scrollToElem";

export const toggleMenu = (menuButtonSelector, menuSelector) => {
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