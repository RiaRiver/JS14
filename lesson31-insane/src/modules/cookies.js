// Установка куки
export function setCookie(key, value, year, month, day) {
  let cookieString = `${key}=${value}`;
  if (year) {
    const expires = new Date(year, month - 1, day);
    cookieString += `; expires=${expires.toGMTString()}`;
  }
  document.cookie = cookieString;
}

// Получение куки
export const getCookie = (key) => {
  const cookies = document.cookie.split('; ');
  const cookiesData = {};

  cookies.forEach((item) => {
    const itemData = (item = item.split('='));
    cookiesData[itemData[0]] = itemData[1];
  });
  return cookiesData[key]
}