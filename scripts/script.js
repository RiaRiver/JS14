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
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.handler();
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  addToStorage() {
    localStorage.setItem('todoData', JSON.stringify([...this.todoData]));
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
    // кнопки, делегирование
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
    console.log(this.todoData);
  }

  deleteTodo(key) {
    this.todoData.delete(key);
    this.render();
  }

// TODO Сообщить пользователю (любым способом) что пустое дело добавить нельзя!
}

const todo = new Todo('.todo-control', '.header-input', '.todo-container', '.todo-list', '.todo-completed');

todo.init();
