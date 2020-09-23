// Получение данных

export const getData = url =>
  fetch(url, {
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
  });
