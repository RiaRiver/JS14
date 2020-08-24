'use strict';
// Объект для работы с LocalStorage
const storage = {
  save: function (objName, obj) {
    localStorage[objName] = JSON.stringify(obj);
  },
  load: function (objName) {
    return localStorage[objName] ? JSON.parse(localStorage[objName]) : [];
  },
};

// Служебная, добавление нолей
const padLeftZero = function (value) {
  return value < 10 ? '0' + value : value;
};

// Служебная, строка даты
const getDateString = function (date) {
  const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ],
    currentDate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      monthTitle: '',

      // Формирование строки
      stringFormat: function () {
        return `${this.day}&nbsp;${this.monthTitle}&nbsp;${this.year}&nbsp;г., ${padLeftZero(this.hours)}:${padLeftZero(
          this.minutes
        )}:${padLeftZero(this.seconds)}`;
      },
    };

  currentDate.monthTitle = months[currentDate.month];

  return currentDate.stringFormat();
};

// Типы сообщений
const messages = {
    nameError: 'Введите Имя и Фамилию (два слова через пробел).',
    loginLength: 'Имя пользователя должно быть не короче 3х символов.',
    loginExist: 'Логин занят. Выберете другой',
    passwordLength: 'Пароль должен быть не короче 4х символов.',
    userNotFound: 'Пользователь не найден!',
    wrongData: 'Неверный пароль!',
    defaultName: 'аноним',
  },
  defaulUser = { firstName: messages.defaultName };

let currentUser = defaulUser,
  usersData = [];

// Элементы страницы
const userName = document.querySelector('#user-name'),
  usersBlock = document.querySelector('.users__block'),
  logoutButton = document.querySelector('.logout'),
  signInButton = document.querySelector('[data-toggle=signin]'),
  modalsToggleButtons = document.querySelectorAll('[data-toggle]'),
  forms = document.querySelectorAll('form');

// Очистка формы
const clearForm = function (form) {
  const inputs = form.querySelectorAll('input'),
    errorsBlock = form.querySelector('.errors-block');

  inputs.forEach((item) => (item.value = ''));
  errorsBlock.textContent = '';
};

// Открытие модалки
const openModal = function () {
  const target = event.target,
    modalType = target.dataset.toggle,
    modal = document.querySelector(`.modal-${modalType}`);

  modal.classList.add('modal--active');

  // Слушатель для закрытия
  modal.addEventListener('click', () => {
    const targetClasses = event.target.classList;

    if (targetClasses.contains('modal') || targetClasses.contains('modal__close')) {
      close(event.currentTarget);
    }
  });
};

// Закрытие модалки
function close(modal) {
  modal.classList.remove('modal--active');
  clearForm(modal.querySelector('form'));
  modal.removeEventListener('click', close);
}

// Создание пользователя
const createUser = function (name, login, password) {
  const user = {
    firstName: name[0],
    lastName: name[1],
    login: login,
    password: password,
    regDate: getDateString(new Date()),
    auth: false,
  };

  usersData.push(user);
  addUser(user);
  storage.save('usersData', usersData);
};

// Добавление пользователя на страницу
const addUser = function (userData) {
  const user = document.createElement('li');
  user.classList.add('user');
  user.innerHTML = `
  <div class="user-info">Имя: ${userData.firstName}, Фамилия: ${userData.lastName}, <span class="user-reg">Дата регистрации: ${userData.regDate}</span></div>
    <button class="user__remove"></button>
  `;

  // Обработчик удаления пользователя
  const userRemove = user.querySelector('.user__remove');

  userRemove.addEventListener('click', () => {
    usersData.splice(usersData.indexOf(userData), 1);
    user.remove();
    storage.save('usersData', usersData);
  });

  usersBlock.append(user);
};

// Поиск пользователя по логину
const findUser = function (login) {
  return usersData.find((item) => item.login === login);
};

// Создание елемента ошибки
const createError = function (message) {
  const error = document.createElement('p');
  error.classList = 'error';
  error.textContent = message;
  return error;
};

// Проверка формы
const checkSubmit = function (formType, name, login, password) {
  const errors = [];

  switch (formType) {
    case 'signup': {
      if (name.length !== 2) {
        errors.push(createError(messages.nameError));
      }
      if (login.length < 3) {
        errors.push(createError(messages.loginLength));
      }
      if (findUser(login)) {
        errors.push(createError(messages.loginExist));
      }
      if (password.length < 4) {
        errors.push(createError(messages.passwordLength));
      }
      break;
    }

    case 'signin': {
      currentUser = findUser(login);
      if (!currentUser) {
        errors.push(createError(messages.userNotFound));
      } else if (currentUser.password !== password) {
        errors.push(createError(messages.wrongData));
      }
      break;
    }
  }

  return errors;
};

// Прорисовка авторизации
const auth = function () {
  if (currentUser.auth) {
    logoutButton.style.display = 'inline-block';
    signInButton.style.display = 'none';
  } else {
    currentUser = defaulUser;
    logoutButton.style.display = 'none';
    signInButton.style.display = 'inline-block';
  }
  userName.textContent = currentUser.firstName;
};

// Отрисовка состояния
const render = function () {
  usersBlock.textContent = '';
  currentUser = defaulUser;
  usersData.forEach((item) => {
    addUser(item);
    if (item.auth) {
      currentUser = item;
    }
  });
  auth();
};

// Отрисовка состояния при фокусе на вкладке
document.addEventListener('focus', () => {
  usersData = storage.load('usersData');
  render();
});

// Обработчик отправки форм
forms.forEach((form) =>
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userNameInput = form.querySelector('.user-name'),
      login = form.querySelector('.login').value,
      password = form.querySelector('.password').value,
      formType = form.dataset.type,
      errorsBlock = form.querySelector('.errors-block'),
      name = userNameInput ? userNameInput.value.split(' ').filter((elem) => elem) : [];

    errorsBlock.textContent = '';
    const errors = checkSubmit(formType, name, login, password);

    if (errors.length) {
      errors.forEach((item) => {
        errorsBlock.append(item);
      });
      return;
    }

    switch (formType) {
      case 'signup': {
        createUser(name, login, password);
        close(form.closest('.modal'));
        return;
      }

      case 'signin': {
        currentUser.auth = true;
        storage.save('usersData', usersData);
        auth();
        close(form.closest('.modal'));
        return;
      }
    }
  })
);

// Обработчик кнопок регистрация и авторизация
modalsToggleButtons.forEach((toggle) => {
  toggle.addEventListener('click', openModal);
});

// Обработчик кнопки выход
logoutButton.addEventListener('click', () => {
  currentUser.auth = false;
  storage.save('usersData', usersData);
  auth();
});

// Старт
usersData = storage.load('usersData');
render();
