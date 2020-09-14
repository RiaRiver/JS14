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

пше const outputPhoto = data => {
  const random = Math.floor(Math.random() * data.length);
  const obj = data[random];
  output.innerHTML = `
  <h4>${obj.title}</h4>  
  <img src="${obj.thumbnailUrl}" alt="${obj.title}">   
  `;
};

const outputPhotos = data => {
  data.forEach(obj => {
    output.insertAdjacentHTML('beforeend', `
  <h4>${obj.title}</h4>  
  <img src="${obj.thumbnailUrl}" alt="${obj.title}">   
  `
    );
  });
};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const firstImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
  secondImg = getData('https://jsonplaceholder.typicode.com/photos/2');

// Promise.race([firstImg, secondImg])
//   .then(outputPhotos)
//   .catch(error => console.error(error));

Promise.all([firstImg, secondImg])
  .then(outputPhotos)
  .catch(error => console.error(error));


