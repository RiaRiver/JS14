'use strict';
// Функции
const isNumber = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
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
  mission: 300000,
  period: 9,
  asking: function () {
    for (let i = 0; i < 2; i++) {
      let expense = prompt('Введите обязательную статью расходов?');
      let amount;
      do {
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));
      appData.expenses[expense] = +amount;
    }

    appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.')
      .toLocaleLowerCase()
      .split(',');
    appData.addExpenses.forEach((item, i, arr) => (arr[i] = item.trim()));

    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    switch (true) {
      case appData.budgetDay < 0:
        return 'Что-то пошло не так';
      case appData.budgetDay < 600:
        return 'К сожалению, у вас уровень дохода ниже среднего';
      case appData.budgetDay < 1200:
        return 'У вас средний уровень дохода';
      case appData.budgetDay >= 1200:
        return 'У вас высокий уровень дохода';
      default:
        return 'Что-то пошло не так';
    }
  },
};

// Инструкции
appData.budget = start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
missionPeriod = appData.getTargetMonth(); // Использую переменную, чтобы в выводе три раза функцию не вызывать

// Вывод в консоль
console.log('Расходы за месяц: ', appData.expensesMonth);
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
