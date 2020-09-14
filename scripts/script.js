'use strict';
const output = document.getElementById('output');

const getData = url => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
      resolve(response);
    } else {
      reject(request.statusText);
    }
  });
  request.send();
});

const outputPhotos = data => {
  const random = Math.floor(Math.random() * data.length);
  const obj = data[random];
  output.innerHTML = `
  <h2>${obj.title}</h2>  
  <img src="${obj.url}" alt="${obj.title}">   
  `;

};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';
getData(urlPhotos)
  .then(outputPhotos)
  .catch(error => console.error(error));

