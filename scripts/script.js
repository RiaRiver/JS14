'use strict';
// TODO[done] Написать ToDo в виде класса

class Todo {
  constructor(formClass, inputClass, todoContainerClass, todoListClass, todoCompletedClass, todoItemClass = 'todo-item', editButtonClass = 'todo-edit', removeButtonClass = 'todo-remove', completeButtonClass = 'todo-complete') {
    this.todoItemClass = todoItemClass;
    this.editButtonClass = editButtonClass;
    this.removeButtonClass = removeButtonClass;
    this.completeButtonClass = completeButtonClass;
    this.form = document.querySelector(formClass);
    this.input = document.querySelector(inputClass);
    this.todoContainer = document.querySelector(todoContainerClass);
    this.todo = document.querySelector(todoListClass);
    this.todoCompleted = document.querySelector(todoCompletedClass);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoData')));
    this.popUpHandler = this.popUpHandler.bind(this);
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.handler();
    this.createPopUp();

    window.addEventListener('focus', () => {
      this.todoData = new Map(JSON.parse(localStorage.getItem('todoData')));
      this.render();
    });
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  addToStorage() {
    localStorage.setItem('todoData', JSON.stringify([...this.todoData]));
  }

  // TODO[done] Сообщить пользователю (любым способом) что пустое дело добавить нельзя!

  createPopUp() {
    const style = document.createElement('style');
    style.textContent = `
      .popup {
        visibility: hidden;
        opacity: 0;
        transition: 0.5s;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    
      .popup-content{
        position: relative;
      }
    
      .popup-close{
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
      }
    `;

    this.popUp = document.createElement('div');
    this.popUp.className  = 'popup';
    this.popUp.innerHTML = `
      <div class="popup-content">
        <button class="popup-close"></button>
        <h2>Пустое дело добавить нельзя!</h2></div>
      </div>
    `;
    document.head.append(style);
    document.body.append(this.popUp);
  }

  popUpHandler(e) {
    e.preventDefault();
    const target = e.target;
    if (target.matches('.popup-close') || e.key === 'Escape' || e.key === 'Enter') {
      this.togglePopUp();
    }
  }

  togglePopUp() {
    if (!this.popUp.style.visibility) {
      this.popUp.style.visibility = 'visible';
      this.popUp.style.opacity = '1';
      document.addEventListener('click', this.popUpHandler);
      document.addEventListener('keydown', this.popUpHandler);
      document.activeElement.blur();
    } else {
      this.popUp.style.visibility = '';
      this.popUp.style.opacity = '';
      this.input.focus();
      document.removeEventListener('click', this.popUpHandler);
      document.removeEventListener('keydown', this.popUpHandler);
    }
  }

  render() {
    this.input.value = '';
    this.todo.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createTodoItem, this);
    this.addToStorage();
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      this.togglePopUp();
    }
  }

  createTodoItem(todoItem) {
    const li = document.createElement('li');
    li.className = this.todoItemClass;
    li.key = todoItem.key;
    li.innerHTML = `
      <span class="text-todo">${todoItem.value}</span>
      <div class="todo-buttons">
        <button class="${this.editButtonClass}"></button>
        <button class="${this.removeButtonClass}"></button>
        <button class="${this.completeButtonClass}"></button>
      </div>`;

    if (todoItem.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todo.append(li);
    }
  }

  // TODO[done] Реализовать методы handler(), deleteItem(), completedItem()

  handler() {
    this.todoContainer.addEventListener('click', event => {
      const target = event.target;
      const targetTodoItem = target.closest(`.${this.todoItemClass}`);
      switch (true) {
      case target.matches(`.${this.removeButtonClass}`): {
        this.deleteTodo(targetTodoItem.key);
        break;
      }
      case target.matches(`.${this.completeButtonClass}`): {
        this.completeTodo(targetTodoItem.key);
        break;
      }
      }
    });
  }

  completeTodo(key) {
    const currentTodo = this.todoData.get(key);
    currentTodo.completed = !(currentTodo.completed);
    this.render();
  }

  deleteTodo(key) {
    this.todoData.delete(key);
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-container', '.todo-list', '.todo-completed');

todo.init();

