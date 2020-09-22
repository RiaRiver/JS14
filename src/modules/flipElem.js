// Поворачивает элемент
export const flipElem = flipper => {
  if (!flipper.style.transform) {
    flipper.style.transform = 'rotateY(180deg)';
  } else {
    flipper.style.transform = '';
  }
};