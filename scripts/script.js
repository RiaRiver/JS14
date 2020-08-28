'use strict';
// Функции
const isNumber = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

const isText = function (v) {
  return !(v === null || v.trim() === '' || !isNaN(parseFloat(v)));
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
  depositBankSelect = document.querySelector('.deposit-bank'),
  depositAmountInput = document.querySelector('.deposit-amount'),
  depositPercentInput = document.querySelector('.deposit-percent'),
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

class AppData {
  constructor() {
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

    this.changePercent = this.changePercent.bind(this);
    this.checkPercent = this.checkPercent.bind(this);
  }

  start() {
    if (!isNumber(salaryAmountInput.value)) {
      alert('Ошибка, "Месячный доход" должен быть числом!');
      return;
    }
    this.budget = +salaryAmountInput.value;

    this.getIncomesAndExpenses([incomeItems, expensesItems]);
    this.getAddIncomesAndExpenses([additionalIncomeItemInputs, additionalExpensesItemInput]);
    this.getDepositInfo();

    this.getBudget();
    this.showResult();
  }

  reset(inputs, itemsArr) {
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
          item.disabled = '';
          item.labels[0].style.cursor = '';
          break;
        }
      }
    });

    this.resetDepositInputs();

    itemsArr.forEach((items) => {
      Array.from(items)
        .slice(1)
        .forEach((item) => item.remove());
    });

    document.querySelectorAll('button').forEach((button) => {
      button.style.display = '';
      this.disableButton(button, false);
    });

    this.checkSalaryAmount();
    this.showPeriod();
  }
  addInputsBlock() {
    const count = 1; // Нужный максимум - 2 (для 3: 3 - 2 = 1)
    const inputItems = Array.from(event.target.parentElement.children).filter((item) => item.className.match(/-items/));
    const inputItemClone = inputItems[0].cloneNode(true);
    Array.from(inputItemClone.children).forEach((item) => {
      item.value = '';
      this.addInputListener(item, regExp);
    });
    event.target.before(inputItemClone);
    if (inputItems.length > count) {
      event.target.style.display = 'none';
    }
  }

  getIncomesAndExpenses(itemBlocks) {
    itemBlocks.forEach((block) => {
      const itemType = block[0].className.split('-')[0];
      Array.from(block).forEach((item) => {
        const itemTitleValue = item.querySelector(`.${itemType}-title`).value,
          itemAmountValue = item.querySelector(`.${itemType}-amount`).value;
        if (itemTitleValue !== '' && itemAmountValue !== '') {
          this[itemType][itemTitleValue.trim()] = +itemAmountValue;
        }
      });
      for (const key in this[itemType]) {
        if (isNumber(this[itemType][key])) {
          this[`${itemType}Month`] += this[itemType][key];
        }
      }
    });
  }
  getAddIncomesAndExpenses(inputBlocks) {
    inputBlocks.forEach((block) => {
      let values = [];
      let itemType;

      const getItemType = (item) => {
        return item.className.match(/_(.*)-/)[1];
      };

      if (typeof block[Symbol.iterator] === 'function') {
        itemType = getItemType(block[0]);

        block.forEach((item) => {
          values.push(item.value);
        });
      } else {
        itemType = getItemType(block);
        values = block.value.split(',');
      }

      itemType = `${itemType[0].toUpperCase()}${itemType.slice(1)}`;
      values = values.map((item) => item.trim()).filter((item) => item !== '');
      this[`add${itemType}`] = values;
    });
  }

  getBudget() {
    const depositMonth = this.depositAmount * (this.depositPercent / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + depositMonth;
    this.budgetDay = this.budgetMonth / 30;
  }

  calcSavedMoney() {
    return this.budgetMonth * periodSelectInput.value;
  }

  getTargetMonth() {
    return targetAmountInput.value / this.budgetMonth;
  }

  resetDepositInputs() {
    document.querySelectorAll('.deposit select, .deposit input').forEach((item) => {
      item.value = '';
      item.style.display = '';
      item.disabled = '';
    });
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBankSelect.style.display = 'inline-block';
      depositAmountInput.style.display = 'inline-block';
      this.deposit = true;
      depositBankSelect.addEventListener('change', this.changePercent);
    } else {
      this.resetDepositInputs();
      this.deposit = false;
      depositBankSelect.removeEventListener('change', this.changePercent);
    }
  }

  changePercent() {
    const bankSelectValue = event.target.value;

    if (bankSelectValue === 'other') {
      depositPercentInput.value = '';
      depositPercentInput.style.display = 'inline-block';
      depositPercentInput.addEventListener('input', this.checkPercent);
    } else {
      depositPercentInput.value = bankSelectValue;
      depositPercentInput.style.display = '';
      depositPercentInput.removeEventListener('input', this.checkPercent);
    }
  }

  checkPercent() {
    if (event.target.value < 0 || event.target.value > 100) {
      alert('Введите корректное значение в поле проценты: число в диапазоне от 0 до 100');
      this.disableButton(startButton, true);
    } else {
      this.checkSalaryAmount();
    }
  }

  getDepositInfo() {
    if (this.deposit) {
      this.depositPercent = +depositPercentInput.value;
      this.depositAmount = +depositAmountInput.value;
    }
  }

  showResult() {
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
  }

  // Старый метод, пока не используем
  getStatusIncome() {
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
  }

  // Дизактивация/активация кнопки
  disableButton(button, disable) {
    if (disable) {
      button.disabled = true;
      button.style.cursor = 'not-allowed';
    } else {
      button.disabled = '';
      button.style.cursor = '';
    }
  }

  checkSalaryAmount() {
    if (salaryAmountInput.value === '') {
      this.disableButton(startButton, true);
    } else {
      this.disableButton(startButton, false);
    }
  }

  // Изменение цифры под полем "Период расчета"
  showPeriod() {
    periodAmount.textContent = periodSelectInput.value;
  }

  // Контроль ввода в поле
  allowInput(event, pattern) {
    if (pattern.test(event.key) || event.key.length > 1 || event.ctrlKey) {
      return;
    } else {
      event.preventDefault();
    }
  }

  // Добавление слушателя на Input
  addInputListener(item, regExp) {
    if (item.placeholder === 'Наименование') {
      item.addEventListener('keydown', (event) => {
        this.allowInput(event, regExp.patternText);
      });
    }
    if (item.placeholder === 'Сумма' || item.placeholder === 'Процент') {
      item.addEventListener('keydown', (event) => {
        this.allowInput(event, regExp.patternDigits);
      });
    }
  }

  setEventsListeners() {
    salaryAmountInput.addEventListener('input', this.checkSalaryAmount.bind(this));
    startButton.addEventListener('click', () => {
      this.start();

      Array.from(inputs)
        .filter((item) => item.type !== 'range')
        .forEach((item) => (item.disabled = true));

      depositCheck.labels[0].style.cursor = 'not-allowed';
      depositBankSelect.disabled = true;

      plusButtons.forEach((button) => {
        this.disableButton(button, true);
      });

      event.target.style.display = 'none';

      cancelButton.style.display = 'block';
      cancelButton.addEventListener(
        'click',
        () => {
          this.reset(inputs, [incomeItems, expensesItems]);
        },
        { once: true }
      );
    });

    plusButtons.forEach((button) => {
      button.addEventListener('click', this.addInputsBlock.bind(this));
    });

    periodSelectInput.addEventListener('input', this.showPeriod);
    Array.from(inputs).forEach((item) => {
      this.addInputListener(item, regExp);
    });

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();

// Сброс при запуске и слушатели
appData.reset(inputs, [incomeItems, expensesItems]);
appData.setEventsListeners();
