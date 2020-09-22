// Переключатель видимисти кнопки
export const toggleElem = ({elem, display, mode = 'show', className}) => {
  if (mode === 'hide') {
    elem.style.visibility = 'hidden';
    elem.style.display = 'none';
  }
  if(mode === 'add'){
    elem.classList.add(className);
  }

  if(mode === 'remove'){
    elem.classList.remove(className);
  }

  if(mode === 'toggle'){
    elem.classList.toggle(className);
  }

    if (mode === 'show') {
    elem.style.visibility = 'visible';
    elem.style.display = display || '';
  }
};
