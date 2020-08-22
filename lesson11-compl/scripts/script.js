'use strict';
// Функции
const isNumber = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

const isText = function (v) {
  return !(v === null || v.trim() === '' || !isNaN(parseFloat(v)));
};

// Сброс всех полей, вызываю при загрузке, чтобы предыдущие данные не оставались
const resetInputs = function (elems) {
  elems.forEach((item) => {
    item.value = '';
    periodSelectInput.value = 1;
    depositCheck.checked = false;
    checkSalaryAmount();
    showPeriod();
  });
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
  salaryAmountInput = document.querySelector('.salary-amount'),
  incomeItems = document.getElementsByClassName('income-items'),
  incomeAddButton = document.getElementsByTagName('button')[0],
  additionalIncomeItemInputs = document.querySelectorAll('.additional_income-item'),
  expensesItems = document.getElementsByClassName('expenses-items'),
  expensesAddButton = document.getElementsByTagName('button')[1],
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
  inputs = document.querySelectorAll('input'),
  regExp = { patternText: /[а-яА-ЯёЁ\p{P} ]/u, patternDigits: /\d/ };

const appData = {
  budget: 0,
  income: {},
  addIncome: [],
  incomeMonth: 0,
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  budgetMonth: 0,
  budgetDay: 0,
  deposit: false,
  depositPercent: 0,
  depositAmount: 0,
  start: function () {
    //Обнуление объекта при каждом новом расчете
    appData.budget = 0;
    appData.income = {};
    appData.addIncome = [];
    appData.incomeMonth = 0;
    appData.expenses = {};
    appData.addExpenses = [];
    appData.expensesMonth = 0;
    appData.budgetMonth = 0;
    appData.budgetDay = 0;
    appData.deposit = false;
    appData.depositPercent = 0;
    appData.depositAmount = 0;

    if (!isNumber(salaryAmountInput.value)) {
      alert('Ошибка, "Месячный доход" должен быть числом!');
      return;
    }
    appData.budget = +salaryAmountInput.value;

    appData.getIncome();
    appData.getExpenses();
    appData.getAddIncome();
    appData.getAddExpenses();

    appData.getBudget();
    appData.showResult();
  },

  addIncomeBlock: function () {
    const incomeItemClone = incomeItems[0].cloneNode(true);
    Array.from(incomeItemClone.children).forEach((item) => {
      item.value = '';
      addInputListener(item, regExp);
    });
    incomeAddButton.before(incomeItemClone);
    if (incomeItems.length > 2) {
      incomeAddButton.style.display = 'none';
    }
  },

  addExpensesBlock: function () {
    const expensesItemClone = expensesItems[0].cloneNode(true);
    Array.from(expensesItemClone.children).forEach((item) => {
      item.value = '';
      addInputListener(item, regExp);
    });
    expensesAddButton.before(expensesItemClone);
    if (expensesItems.length > 2) {
      expensesAddButton.style.display = 'none';
    }
  },

  getIncome: function () {
    Array.from(incomeItems).forEach((item) => {
      const incomeTitleValue = item.querySelector('.income-title').value,
        incomeAmountValue = item.querySelector('.income-amount').value;
      if (incomeTitleValue !== '' && incomeAmountValue !== '') {
        appData.income[incomeTitleValue.trim()] = +incomeAmountValue;
      }
    });

    for (const key in this.income) {
      if (isNumber(this.income[key])) {
        this.incomeMonth += this.income[key];
      }
    }
  },

  getAddIncome: function () {
    additionalIncomeItemInputs.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpenses: function () {
    Array.from(expensesItems).forEach((item) => {
      const expensesTitleValue = item.querySelector('.expenses-title').value,
        expensesAmountValue = item.querySelector('.expenses-amount').value;
      if (expensesTitleValue !== '' && expensesAmountValue !== '') {
        appData.expenses[expensesTitleValue.trim()] = +expensesAmountValue;
      }
    });

    for (let key in this.expenses) {
      if (isNumber(this.expenses[key])) {
        this.expensesMonth += this.expenses[key];
      }
    }
  },

  getAddExpenses: function () {
    this.addExpenses = additionalExpensesItemInput.value.split(',');
    this.addExpenses = this.addExpenses.map((item) => item.trim()).filter((item) => item !== '');
    // Пока оставлю, может пригодится еще
    // appData.addExpenses
    // .map((item) => {
    //   return `${item[0].toUpperCase()}${item.slice(1)}`;
    // })
    // .join(', ')
    //   .toLocaleLowerCase()
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },

  calcSavedMoney: function () {
    return this.budgetMonth * periodSelectInput.value;
  },

  getTargetMonth: function () {
    return targetAmountInput.value / this.budgetMonth;
  },

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalIncomeValue.value = appData.addIncome.join(', ');
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelectInput.addEventListener('input', () => {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
    targetMonthValue.value =
      appData.getTargetMonth() < 0 ? 'Цель не будет достигнута' : Math.ceil(appData.getTargetMonth());
  },

  // Старые методы, пока не используем
  getDipositInfo: function () {
    if (this.deposit) {
      do {
        this.depositAmount = prompt('Какая сумма вашего депозита?');
      } while (!isNumber(this.depositAmount));

      do {
        this.depositPercent = prompt('Какой процент у вашего депозита?');
      } while (!isNumber(this.depositPercent));
    }
  },

  getStatusIncome: function () {
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
  },
};

// Сброс при запуске и слушатели
resetInputs(inputs);
salaryAmountInput.addEventListener('input', checkSalaryAmount);
startButton.addEventListener('click', appData.start);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
periodSelectInput.addEventListener('input', showPeriod);
inputs.forEach((item) => {
  addInputListener(item, regExp);
});
