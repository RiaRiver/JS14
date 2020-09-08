'use strict';
// TODO[done] 1.Написать скрипт, которые заменяет слово "функция" и его однокоренные слова в div с id=task1 на «<strong>функция</strong>».

const task1 = document.getElementById('task1');

task1.innerHTML = task1.innerHTML.replace(/(?<!<strong>)(функци.+?)(?!<\/strong>)/ig, '<strong>$1</strong>');

// TODO 2. Написать скрипт который в div с id=task2 найдет время. Время имеет формат часы:минуты. И часы, и минуты состоят из двух цифр, пример: 09:00.заключить найденное время в тег <b></b>

const task2 = document.getElementById('task2');

task2.innerHTML = task2.innerHTML.replace(/(?<!<b>)(\d{2}:\d{2})(?!<\/b>)/g, '<b>$1</b>');

// TODO 3. Создать запрос во всем документе найти текст в кавычках и заключить его в теги <mark></mark>

const elems = [...document.body.children].filter(elem => elem.tagName !== "SCRIPT");
elems.forEach(elem => elem.innerHTML = elem.innerHTML.replace(/(?<=>[^<]*?|)("[^]+?"|«[^]+?»)/g, '<mark>$1</mark>'));

// TODO 4. Замените в документе домены вида http://site.ru на <a href="http://site.ru">site.ru</a>,

// TODO 6. Ссылки такого вида http://site.ru/aaaa/bbbb.html заменить на <a href="http://site.ru/aaaa/bbbb.html">site.ru</a>

elems.forEach(elem => elem.innerHTML = elem.innerHTML.replace(/(http:\/\/(.*?(\.[\w-]{2,})+)(\/[^<]*(\/|\.\w{2,4})|))/g, '<a href="$1">$2</a>'));

// TODO 5. Напишите регулярное выражение для поиска цвета, заданного как #ABCDEF, вывести цвет в консоль

document.body.innerHTML.match(/#\p{Hex_Digit}{6}/gu).forEach(color => console.log(color));


//Попрактикуйтесь на кроссвордах https://regexcrossword.com/ и на задачках https://habr.com/ru/post/167015/
