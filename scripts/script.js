'use strict';
// Функции
const isNumber = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

const isText = function (v) {
  return !(v === null || v.trim() === '' || !isNaN(parseFloat(v)));
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
  // Не нужны,меняем на все
  // additionalIncomeItemInput1 = document.querySelectorAll('.additional_income-item')[0],
  // additionalIncomeItemInput2 = document.querySelectorAll('.additional_income-item')[1],
  additionalIncomeItemInputs = document.querySelectorAll('.additional_income-item'),
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
  incomeItems = document.getElementsByClassName('income-items'),
  // incomeTitleInput = document.querySelector('input.income-title'),
  // incomeAmountInput = document.querySelector('.income-amount'),
  expensesItems = document.getElementsByClassName('expenses-items'),
  // expensesTitleInput = document.querySelector('input.expenses-title'),
  // expensesAmountInput = document.querySelector('.expenses-amount'),
  additionalExpensesItemInput = document.querySelector('.additional_expenses-item'),
  targetAmountInput = document.querySelector('.target-amount'),
  periodSelectInput = document.querySelector('.period-select');

let missionPeriod; // Переменная не по заданию, чтобы не дублировать код в выводе

let appData = {
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
    // let temp;
    // do {  // Макс в 11ом удаляет проверку
    //   temp = prompt('Ваш месячный доход?');
    // } while (!isNumber(temp));

    // appData.getDipositInfo();
    if (salaryAmountInput.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = +salaryAmountInput.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getExpensesMonth();
    appData.getBudget();

    appData.showResult();
  },

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
  },
  addExpensesBlock: function () {
    let expensesItemClone = expensesItems[0].cloneNode(true);
    expensesAddButton.before(expensesItemClone);
    if (expensesItems.length > 2) {
      expensesAddButton.style.display = 'none';
    }
  },

  getExpenses: function () {
    Array.from(expensesItems).forEach(function (item) {
      let expensesTitleValue = item.querySelector('.expenses-title').value,
        expensesAmountValue = item.querySelector('.expenses-amount').value;
      if (expensesTitleValue !== '' && expensesAmountValue !== '') {
        appData.expenses[expensesTitleValue.trim()] = +expensesAmountValue;
      }

      //   } while (!isText(expense)); // Проверка что текст

      //   } while (!isNumber(amount)); /// Проверка что число
    });
  },
  getIncome: function () {
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

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  },
  getAddExpenses: function () {
    this.addExpenses = additionalExpensesItemInput.value.split(',');

    //   .toLocaleLowerCase()
    this.addExpenses = this.addExpenses.map((item) => item.trim()).filter((item) => item !== '');
  },
  getAddIncome: function () {
    additionalIncomeItemInputs.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
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
    return this.budgetMonth * periodSelectInput.value;
  },

  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return targetAmountInput.value / this.budgetMonth;
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

startButton.addEventListener('click', appData.start);
expensesAddButton.addEventListener('click', appData.addExpensesBlock);

// Инструкции

missionPeriod = appData.getTargetMonth(); // Использую переменную, чтобы в выводе три раза функцию не вызывать

// Вывод в консоль
// У Макса этого вывода вообще нет в 11ом
console.log(
  'Возможные расходы:',
  appData.addExpenses
    .map((item) => {
      return `${item[0].toUpperCase()}${item.slice(1)}`;
    })
    .join(', ')
);
// Макс в 11ом пока не удалил
// console.log(
//   missionPeriod < 0
//     ? 'Цель не будет достигнута'
//     : `Цель будет достигнута за: ${Math.ceil(missionPeriod)} ${
//         missionPeriod <= 1 ? 'месяц' : missionPeriod <= 4 ? 'месяца' : 'месяцев'
//       }`
// );
// У Макса этого вывода вообще нет в 11ом
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(`${key} : ${appData[key]}`);
}
