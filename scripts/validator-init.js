'use strict';

// TODO[done] Подключить Валидатор написанный в уроке к нашему проекту
// TODO[done] Подключить его ко всем формам
// TODO[done] Написать кастомный паттерн на ввод только русских букв и применить его к полю “Ваше имя” и поле “Ваше сообщение”!

const newPattern =
{
  name: /^[а-яё]+$/i,
  message: /^[^a-z]+$/i
};

const form1Validation = new Validator({
  selector: '#form1',
  pattern: newPattern,
  method: {
    'form1-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form1-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
    'form1-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ]
  }
});

const form2Validation = new Validator({
  selector: '#form2',
  pattern: newPattern,
  method: {
    'form2-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form2-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
    'form2-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form2-message': [
      ['notEmpty'],
      ['pattern', 'message']
    ]
  }
});

const form3Validation = new Validator({
  selector: '#form3',
  pattern: newPattern,
  method: {
    'form3-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form3-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form3-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ]
  }
});

form1Validation.init();
form2Validation.init();
form3Validation.init();
