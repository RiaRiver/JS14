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

// Переменные, объект отдельно, а не через запятую, потому что мне так удобнее читать
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
