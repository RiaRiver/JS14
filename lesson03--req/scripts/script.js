'use strict';

// Переменные предыдущих уроков
let money = 5000,
  income = 'Freelance',
  addExpenses = 'Taxes, Internet, Taxi',
  deposit = true,
  mission = 300000,
  period = 9,
  budgetDay = money / 30,
  // Переменные текущего урока
  expenses1,
  expenses2,
  amount1,
  amount2,
  budgetMonth,
  missionPeriod; // Переменная не по заданию, чтобы не дублировать код в выводе

// Функционал предыдущих уроков
addExpenses = addExpenses.toLocaleLowerCase().split(', ');

// Функционал текущего урока
//Вопросы пользователю
money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');

// Логика
budgetMonth = money - amount1 - amount2;
missionPeriod = mission / budgetMonth;
budgetDay = budgetMonth / 30;

// Вывод в консоль предудущих уроков
console.log('Type of "money": ' + typeof money);
console.log('Type of "income": ' + typeof income);
console.log('Type of "deposit": ' + typeof deposit);
console.log('Length of string "addExpenses": ' + addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log('Array "addExpenses": ', addExpenses);
// Из предыдущего урока, написано не удалять, но этот вывод не соответствует примеру
// console.log('budgetDay: ', budgetDay);

//Вывод в консоль текущего урока
console.log('Бюджет на месяц: ', budgetMonth);
console.log(
  `Цель будет достигнута за: ${Math.ceil(missionPeriod)} ${
    missionPeriod <= 1 ? 'месяц' : missionPeriod <= 4 ? 'месяца' : 'месяцев'
  }`
);
console.log('Бюджет на день: ', Math.floor(budgetDay));

switch (true) {
  case budgetDay < 0:
    console.log('Что-то пошло не так');
    break;
  case budgetDay < 600:
    console.log('К сожалению, у вас уровень дохода ниже среднего');
    break;
  case budgetDay < 1200:
    console.log('У вас средний уровень дохода');
    break;
  case budgetDay >= 1200:
    console.log('У вас высокий уровень дохода');
    break;
  default:
    console.log('Что-то пошло не так');
}
