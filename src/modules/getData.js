// Получение данных

import {locStorage} from "./storage";

export const getData = (url, locale) => {
  return new Promise((resolve, reject) => {
    const data = locStorage.load(`citiesData${locale}`);
    if (data.length) {
      resolve(data);
      return;
    }

    // setTimeout имитирует ситуацию долгого ответа от сервера
    setTimeout(() => {
      const fetchPromise = fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      ).then(response => {
        if (response.status !== 200) {
          throw new Error('Network status not 200.');
        }
        return response.json();
      }).then((data) => {
        const dataLoc = data[locale];
        locStorage.save(`citiesData${locale}`, dataLoc);
        return dataLoc;
      });
      resolve(fetchPromise);
    }, 2000);
  });
}