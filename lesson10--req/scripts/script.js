'use strict';

// Используя только файл скрипта (html руками не трогать) выполнить такие действия:
const books = document.querySelector('.books');
let booksList = document.querySelectorAll('.book');

// 1. Восстановить порядок книг.
books.prepend(booksList[1]);
books.append(booksList[2]);
booksList[3].before(booksList[4]);
// Выбираем элементы в новом порядке для удобства
booksList = document.querySelectorAll('.book');

// 2. Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = `url(./image/you-dont-know-js.jpg)`;

// 3. Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
booksList[2].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

// 4. Удалить рекламу со страницы
document.querySelector('.adv').remove();

// 5. Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const book2Chapters = booksList[1].querySelectorAll('li');
book2Chapters[10].before(book2Chapters[2]);
book2Chapters[3].after(book2Chapters[6], book2Chapters[8]);

const book5Chapters = booksList[4].querySelectorAll('li');
console.log('book5Chapters: ', book5Chapters);
book5Chapters[3].before(book5Chapters[9]);
book5Chapters[4].after(book5Chapters[2]);
book5Chapters[8].before(book5Chapters[5]);

// 6. В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const book6Chapters = booksList[5].querySelectorAll('li');
book6Chapters[book6Chapters.length - 1].insertAdjacentHTML('beforebegin', '<li>Глава 8: За пределами ES6</li>');
