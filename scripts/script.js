'use strict';
const todoСontrol = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData;

const storage = {
  save: function (objName, obj) {
    localStorage[objName] = JSON.stringify(obj);
  },
  load: function (objName) {
    return localStorage[objName] ? JSON.parse(localStorage[objName]) : [];
  },
};

const render = function () {
  headerInput.value = '';
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
    <span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>
    `;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const todoCompleteButton = li.querySelector('.todo-complete');
    todoCompleteButton.addEventListener('click', () => {
      item.completed = !item.completed;
      render();
    });

    const todoRemoveButton = li.querySelector('.todo-remove');
    todoRemoveButton.addEventListener('click', () => {
      todoData.splice(todoData.indexOf(item), 1);
      render();
    });
  });
  storage.save('todoData', todoData);
};

todoСontrol.addEventListener('submit', (event) => {
  event.preventDefault();

  if (headerInput.value) {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };

    todoData.push(newTodo);
    render();
  }
});

document.addEventListener('focus', () => {
  todoData = storage.load('todoData');
  render();
});

// Старт
todoData = storage.load('todoData');
render();
