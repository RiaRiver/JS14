// Плавная прокрутка к элементу
export const scrollToElem = elem => {
  elem.scrollIntoView({behavior: 'smooth'});
};