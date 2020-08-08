let money = 5000;
let income = 'Freelance';
let addExpenses = 'Taxes, Internet, Taxi';
let deposit = true;
let mission = 300000;
let period = 9;

console.log('Type of "money": ' + typeof money);
console.log('Type of "income": ' + typeof income);
console.log('Type of "deposit": ' + typeof deposit);

console.log('Length of string "addExpenses": ' + addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log('Array "addExpenses": ', addExpenses);

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);
