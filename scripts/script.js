'use strict';

let money,
  income = 'Freelance',
  addExpenses,
  deposit,
  mission = 300000,
  period = 9,
  budgetDay = money / 30, //это из предыдущих уроков, просили не удалять
  expenses = [],
  expensesAmount,
  missionPeriod, // Переменная не по заданию, чтобы не дублировать код в выводе
  accumulatedMonth;

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

const showTypeOf = function (data) {
  return `Тип значения "${data}": ${typeof data}`;
};

// Не чистая. Можно разбить на получение статей расходов и сумм в переменные и на суммирование. Надо?
const getExpensesMonth = function () {
  let sum = 0;
  let amount;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');

    do {
      amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));

    sum += +amount;
  }

  return sum;
};

const getAccumulatedMonth = function (money, expensesAmount) {
  return money - expensesAmount;
};

const getTargetMonth = function (mission, accumulatedMonth) {
  return mission / accumulatedMonth;
};

const getStatusIncome = function (budgetDay) {
  switch (true) {
    case budgetDay < 0:
      return 'Что-то пошло не так';
    case budgetDay < 600:
      return 'К сожалению, у вас уровень дохода ниже среднего';
    case budgetDay < 1200:
      return 'У вас средний уровень дохода';
    case budgetDay >= 1200:
      return 'У вас высокий уровень дохода';
    default:
      return 'Что-то пошло не так';
  }
};

// Инструкции
money = start();

// Пересла сюда ввод из переменных, чтобы данные запрашивались в нужном порядке
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
deposit = confirm('Есть ли у вас депозит в банке?');

addExpenses = addExpenses.toLocaleLowerCase().split(', ');
expensesAmount = getExpensesMonth();
accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
budgetDay = accumulatedMonth / 30;
missionPeriod = getTargetMonth(mission, accumulatedMonth); // Использую переменную, чтобы в выводе три раза функцию не вызывать

// Вывод в консоль
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log('Расходы за месяц: ', expensesAmount);
console.log('Возможные расходы: ', addExpenses);
console.log(
  missionPeriod < 0
    ? 'Цель не будет достигнута'
    : `Цель будет достигнута за: ${Math.ceil(missionPeriod)} ${
        missionPeriod <= 1 ? 'месяц' : missionPeriod <= 4 ? 'месяца' : 'месяцев'
      }`
);
console.log('Бюджет на день: ', Math.floor(budgetDay));
console.log('Ваш статус: ', getStatusIncome(budgetDay));
