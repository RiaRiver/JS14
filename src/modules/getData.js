// Получение данных
import {storage} from "./storage";

export const getData = url => {
  return new Promise ((resolve, reject) => {
    const data = storage.load('heroesData');
    if (data.length) {
      resolve(data);
      return;
    }

    // setTimeout имитирует ситуацию долгого ответа от сервера
    setTimeout(()=>{
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
      }).then(data => {
        storage.save('heroesData', data);
        setTimeout(()=>{
          sessionStorage.removeItem('heroesData');
        }, 300000);
        return data;
      });
      resolve(fetchPromise);
    }, 5000);
  });
}

