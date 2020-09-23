// Локаль
import {getCookie, setCookie} from "./cookies";

export const chooseLocale = () => {
  let locale = getCookie('locale');
  if (locale) return locale;
  while (!locale) {
    locale = prompt('Пожалуйста выберете локаль: RU, EN или DE');
    if (locale && locale.match(/(RU)|(EN)|(DE)s/)) {
      setCookie('locale', locale, 2020, 12, 31);
      return locale;
    }
    alert('Вы ввели невернгое значение локали.')
    locale = '';
  }
}