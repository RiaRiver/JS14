'use strict';

let money = +prompt('Ваш месячный доход?'),
  income = 'Freelance',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 300000,
  period = 9,
  budgetDay = money / 30, //это из предыдущих уроков, просили не удалять
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?'),
  missionPeriod, // Переменная не по заданию, чтобы не дублировать код в выводе
  accumulatedMonth;

// Функции
const showTypeOf = function (data) {
  console.log(`Тип значения "${data}": ${typeof data}`);
};

const getExpensesMonth = function (amount1, amount2) {
  return amount1 + amount2;
};

const getAccumulatedMonth = function (money, amount1, amoun2) {
  return money - getExpensesMonth(amount1, amount2);
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
addExpenses = addExpenses.toLocaleLowerCase().split(', ');

accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
budgetDay = accumulatedMonth / 30;
missionPeriod = getTargetMonth(mission, accumulatedMonth); // Использую переменную, чтобы в выводе три раза функцию не вызывать

// Вывод в консоль
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));
console.log('Возможные расходы: ', addExpenses);
console.log(
  `Цель будет достигнута за: ${Math.ceil(missionPeriod)} ${
    missionPeriod <= 1 ? 'месяц' : missionPeriod <= 4 ? 'месяца' : 'месяцев'
  }`
);
console.log('Бюджет на день: ', Math.floor(budgetDay));
console.log('Ваш статус: ', getStatusIncome(budgetDay));
