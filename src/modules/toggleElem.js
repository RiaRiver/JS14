// Переключатель видимисти кнопки
export const toggleElem = (elem, flag, display) => {
  if (flag) {
    elem.style.visibility = 'visible';
    elem.style.display = display || '';
  } else {
    elem.style.visibility = 'hidden';
    elem.style.display = 'none';
  }
};