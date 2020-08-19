'use strict';
// Функции
const isNumber = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

const isText = function (v) {
  return !(v === null || v.trim() === '' || !isNaN(parseFloat(v)));
};

const start = function () {
  let temp;
  do {
    temp = prompt('Ваш месячный доход?');
  } while (!isNumber(temp));

  return +temp;
};

// Переменные
// Урок 9 Пункт a: Кнопку "Рассчитать" через id
let startButton = document.getElementById('start'),
  // Урок 9 Пункт b: Кнопки “+” (плюс) через Tag, каждую в своей переменной.
  incomeAddButton = document.getElementsByTagName('button')[0],
  expensesAddButton = document.getElementsByTagName('button')[1],
  // Урок 9 Пункт c: Чекбокс по id через querySelector
  depositCheck = document.querySelector('#deposit-check'),
  // Урок 9 Пункт d: Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
  additionalIncomeItemInput1 = document.querySelectorAll('.additional_income-item')[0],
  additionalIncomeItemInput2 = document.querySelectorAll('.additional_income-item')[1],
  // Урок 9 Пункт e: Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
  // Сделала и budget_month-value, потому что в пункте f просят оставшиеся поля, не поняла надо его или нет
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  // Урок 9 Пункт f: Оставшиеся поля через querySelector каждый в отдельную переменную: поля ввода (input) с левой стороны и не забудьте про range.
  salaryAmountInput = document.querySelector('.salary-amount'),
  incomeTitleInput = document.querySelector('input.income-title'),
  incomeAmountInput = document.querySelector('.income-amount'),
  expensesTitleInput = document.querySelector('input.expenses-title'),
  expensesAmountInput = document.querySelector('.expenses-amount'),
  additionalExpensesItemInput = document.querySelector('.additional_expenses-item'),
  targetAmountInput = document.querySelector('.target-amount'),
  periodSelectInput = document.querySelector('.period-select');

let missionPeriod; // Переменная не по заданию, чтобы не дублировать код в выводе

let appData = {
  budget: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  budgetMonth: 0,
  budgetDay: 0,
  deposit: false,
  depositPercent: 0,
  depositAmount: 0,
  mission: 300000,
  period: 9,
  asking: function () {
    let expense, amount;

    if (confirm('Есть ли у вас дополнительный источник заработока?')) {
      let incomeItem, incomeAmount;

      do {
        incomeItem = prompt('Какой у вас дополнительный заработок?');
      } while (!isText(incomeItem));

      do {
        incomeAmount = prompt('Сколько вы зарабатываете на этом за месяц?');
      } while (!isNumber(incomeAmount));

      this.income[incomeItem.trim()] = +incomeAmount;
    }

    for (let i = 0; i < 2; i++) {
      do {
        expense = prompt('Введите обязательную статью расходов?');
      } while (!isText(expense));

      do {
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));

      this.expenses[expense.trim()] = +amount;
    }

    this.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.')
      .toLocaleLowerCase()
      .split(',');
    this.addExpenses = this.addExpenses.map((item) => item.trim()).filter((item) => item !== '');

    this.deposit = confirm('Есть ли у вас депозит в банке?');
  },

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

  calcSavedMoney: function () {
    return this.budgetMonth * this.period;
  },

  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return this.mission / this.budgetMonth;
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

// Инструкции
appData.budget = start();
appData.asking();
appData.getDipositInfo();
appData.getExpensesMonth();
appData.getBudget();
missionPeriod = appData.getTargetMonth(); // Использую переменную, чтобы в выводе три раза функцию не вызывать

// Вывод в консоль
console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(
  'Возможные расходы:',
  appData.addExpenses
    .map((item) => {
      return `${item[0].toUpperCase()}${item.slice(1)}`;
    })
    .join(', ')
);
console.log(
  missionPeriod < 0
    ? 'Цель не будет достигнута'
    : `Цель будет достигнута за: ${Math.ceil(missionPeriod)} ${
        missionPeriod <= 1 ? 'месяц' : missionPeriod <= 4 ? 'месяца' : 'месяцев'
      }`
);
console.log('Ваш статус: ', appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(`${key} : ${appData[key]}`);
}

// Временный вывод, чтобы проверить получение элементов
console.log('%c%sВременный вывод для проверки получения элементов:', 'font-weight: bold; color: blue;');
console.log('salaryAmountInput: ', salaryAmountInput);
console.log('incomeTitleInput: ', incomeTitleInput);
console.log('incomeAmountInput: ', incomeAmountInput);
console.log('incomeAddButton: ', incomeAddButton);
console.log('additionalIncomeItem1: ', additionalIncomeItemInput1);
console.log('additionalIncomeItem2: ', additionalIncomeItemInput2);
console.log('expensesTitleInput: ', expensesTitleInput);
console.log('expensesAmountInput: ', expensesAmountInput);
console.log('expensesAddButton: ', expensesAddButton);
console.log('additionalExpensesItemInput: ', additionalExpensesItemInput);
console.log('depositCheck: ', depositCheck);
console.log('targetAmountInput: ', targetAmountInput);
console.log('periodSelectInput: ', periodSelectInput);
console.log('budgetMonthValue: ', budgetMonthValue);
console.log('budgetDayValue: ', budgetDayValue);
console.log('expensesMonthValue: ', expensesMonthValue);
console.log('additionalIncomeValue: ', additionalIncomeValue);
console.log('additionalExpensesValue: ', additionalExpensesValue);
console.log('incomePeriodValue: ', incomePeriodValue);
console.log('targetMonthValue: ', targetMonthValue);
console.log('startButton: ', startButton);
