'use strict';
// Функции
const isNumber = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

const isText = function (v) {
  return !(v === null || v.trim() === '' || !isNaN(parseFloat(v)));
};

// Дизактивация/активация кнопки "Рассчитать" в зависимости от заполнения поля "Месячный доход"
const checkSalaryAmount = function () {
  if (salaryAmountInput.value === '') {
    startButton.disabled = true;
    startButton.style.cursor = 'not-allowed';
  } else {
    startButton.disabled = false;
    startButton.style.cursor = '';
  }
};

// Изменение цифры под полем "Период расчета"
const showPeriod = function () {
  periodAmount.textContent = periodSelectInput.value;
};

// Контроль ввода в поле
const allowInput = function (event, pattern) {
  if (pattern.test(event.key) || event.key.length > 1 || event.ctrlKey) {
    return;
  } else {
    event.preventDefault();
  }
};

// Добавление слушателя на Input
const addInputListener = function (item, regExp) {
  if (item.placeholder === 'Наименование') {
    item.addEventListener('keydown', (event) => {
      allowInput(event, regExp.patternText);
    });
  }
  if (item.placeholder === 'Сумма') {
    item.addEventListener('keydown', (event) => {
      allowInput(event, regExp.patternDigits);
    });
  }
};

// Переменные
const startButton = document.getElementById('start'),
  cancelButton = document.getElementById('cancel'),
  salaryAmountInput = document.querySelector('.salary-amount'),
  incomeItems = document.getElementsByClassName('income-items'),
  plusButtons = document.querySelectorAll('.btn_plus'),
  additionalIncomeItemInputs = document.querySelectorAll('.additional_income-item'),
  expensesItems = document.getElementsByClassName('expenses-items'),
  additionalExpensesItemInput = document.querySelector('.additional_expenses-item'),
  depositCheck = document.querySelector('#deposit-check'),
  targetAmountInput = document.querySelector('.target-amount'),
  periodSelectInput = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  inputs = document.getElementsByTagName('input'),
  regExp = { patternText: /[а-яА-ЯёЁ\p{P} ]/u, patternDigits: /\d/ };

const AppData = function () {
  this.budget = 0;
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.addExpenses = [];
  this.expensesMonth = 0;
  this.budgetMonth = 0;
  this.budgetDay = 0;
  this.deposit = false;
  this.depositPercent = 0;
  this.depositAmount = 0;
};

// AppData.prototype.check;
AppData.prototype.start = function () {
  if (!isNumber(salaryAmountInput.value)) {
    alert('Ошибка, "Месячный доход" должен быть числом!');
    return;
  }
  this.budget = +salaryAmountInput.value;

  this.getIncome();
  this.getExpenses();
  this.getAddIncome();
  this.getAddExpenses();

  this.getBudget();
  this.showResult();
};

AppData.prototype.reset = function (inputs, itemsArr) {
  this.budget = 0;
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.addExpenses = [];
  this.expensesMonth = 0;
  this.budgetMonth = 0;
  this.budgetDay = 0;
  this.deposit = false;
  this.depositPercent = 0;
  this.depositAmount = 0;

  Array.from(inputs).forEach((item) => {
    switch (item.type) {
      case 'text': {
        item.value = '';
        item.disabled = item.classList.contains('result-total');
        break;
      }
      case 'range': {
        item.value = 1;
        break;
      }
      case 'checkbox': {
        item.checked = false;
        break;
      }
    }
  });

  itemsArr.forEach((items) => {
    Array.from(items)
      .slice(1)
      .forEach((item) => item.remove());
  });

  document.querySelectorAll('button').forEach((button) => (button.style.display = ''));

  checkSalaryAmount();
  showPeriod();
};
AppData.prototype.addInputsBlock = function () {
  const count = 1; // Нужный максимум - 2 (для 3: 3 - 2 = 1)
  const inputItems = Array.from(this.parentElement.children).filter((item) => item.className.match(/-items/));
  const inputItemClone = inputItems[0].cloneNode(true);
  Array.from(inputItemClone.children).forEach((item) => {
    item.value = '';
    addInputListener(item, regExp);
  });
  this.before(inputItemClone);
  if (inputItems.length > count) {
    this.style.display = 'none';
  }
};

AppData.prototype.getIncome = function () {
  Array.from(incomeItems).forEach((item) => {
    const incomeTitleValue = item.querySelector('.income-title').value,
      incomeAmountValue = item.querySelector('.income-amount').value;
    if (incomeTitleValue !== '' && incomeAmountValue !== '') {
      this.income[incomeTitleValue.trim()] = +incomeAmountValue;
    }
  });

  for (const key in this.income) {
    if (isNumber(this.income[key])) {
      this.incomeMonth += this.income[key];
    }
  }
};

AppData.prototype.getAddIncome = function () {
  additionalIncomeItemInputs.forEach((item) => {
    const itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpenses = function () {
  Array.from(expensesItems).forEach((item) => {
    const expensesTitleValue = item.querySelector('.expenses-title').value,
      expensesAmountValue = item.querySelector('.expenses-amount').value;
    if (expensesTitleValue !== '' && expensesAmountValue !== '') {
      this.expenses[expensesTitleValue.trim()] = +expensesAmountValue;
    }
  });

  for (let key in this.expenses) {
    if (isNumber(this.expenses[key])) {
      this.expensesMonth += this.expenses[key];
    }
  }
};

AppData.prototype.getAddExpenses = function () {
  this.addExpenses = additionalExpensesItemInput.value.split(',');
  this.addExpenses = this.addExpenses.map((item) => item.trim()).filter((item) => item !== '');
  // Пока оставлю, может пригодится еще
  // appData.addExpenses
  // .map((item) => {
  //   return `${item[0].toUpperCase()}${item.slice(1)}`;
  // })
  // .join(', ')
  //   .toLocaleLowerCase()
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelectInput.value;
};

AppData.prototype.getTargetMonth = function () {
  return targetAmountInput.value / this.budgetMonth;
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.floor(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalIncomeValue.value = this.addIncome.join(', ');
  additionalExpensesValue.value = this.addExpenses.join(', ');
  incomePeriodValue.value = this.calcSavedMoney();
  periodSelectInput.addEventListener('input', () => {
    incomePeriodValue.value = this.calcSavedMoney();
  });
  targetMonthValue.value = this.getTargetMonth() < 0 ? 'Цель не будет достигнута' : Math.ceil(this.getTargetMonth());
};

// Старые методы, пока не используем
AppData.prototype.getDipositInfo = function () {
  if (this.deposit) {
    do {
      this.depositAmount = prompt('Какая сумма вашего депозита?');
    } while (!isNumber(this.depositAmount));

    do {
      this.depositPercent = prompt('Какой процент у вашего депозита?');
    } while (!isNumber(this.depositPercent));
  }
};

AppData.prototype.getStatusIncome = function () {
  switch (true) {
    case this.budgetDay < 0:
      return 'Что-то пошло не так';
    case this.budgetDay < 600:
      return 'К сожалению, у вас уровень дохода ниже среднего';
    case this.budgetDay < 1200:
      return 'У вас средний уровень дохода';
    case this.budgetDay >= 1200:
      return 'У вас высокий уровень дохода';
    default:
      return 'Что-то пошло не так';
  }
};

const appData = new AppData();

// Сброс при запуске и слушатели

appData.reset(inputs, [incomeItems, expensesItems]);
salaryAmountInput.addEventListener('input', checkSalaryAmount);
startButton.addEventListener('click', () => {
  appData.start();

  Array.from(inputs)
    .filter((item) => item.type === 'text')
    .forEach((item) => (item.disabled = true));

  event.target.style.display = 'none';

  cancelButton.style.display = 'block';
  cancelButton.addEventListener('click', () => {
    appData.reset(inputs, [incomeItems, expensesItems]);
  });
});

plusButtons.forEach((button) => {
  button.addEventListener('click', appData.addInputsBlock);
});

periodSelectInput.addEventListener('input', showPeriod);
Array.from(inputs).forEach((item) => {
  addInputListener(item, regExp);
});
