'use strict';

class Validator {
  constructor({ selector, pattern = {}, method =  {} }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.formElements = [...this.form.elements].filter(elem => elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button');
    this.errors = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();

    this.formElements.forEach(elem => elem.addEventListener('change', this.checkElement.bind(this)));

    this.form.addEventListener('submit', event => {
      this.formElements.forEach(elem => this.checkElement({ target: elem }));

      if (this.errors.size) {
        event.preventDefault();
      }
    });
  }

  applyStyle() {
    const docStyles = document.querySelectorAll('style');
    const style = document.createElement('style');

    style.textContent = `
      input.success {
        border: 2px solid green !important;
      }
      input.error {
        border: 2px solid red; !important;
      }
      .validator-error {
        font-size: 12px;
        font-family: sans-serif;
        color: red;
      }
`;

    if ([...docStyles].every(docStyle => docStyle.textContent !== style.textContent)) {
      document.head.append(style);
    }
  }

  setPattern() {
    this.pattern.phone = this.pattern.phone || /^\+?[78]([-()]?\d){10}$/;
    this.pattern.email = this.pattern.email || /^\w+@\w+\.\w{2,}$/;
  }

  checkElement(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.errors.delete(target);
    } else {
      this.showError(target);
      this.errors.add(target);
    }
  }

  isValid(elem) {
    const validatorMethods = {
      notEmpty() {
        return elem.value.trim() !== '';
      },
      pattern(pattern) {
        return pattern.test(elem.value);
      }
    };

    const methods = this.method[elem.id];
    if (methods) {
      return methods.every(method => validatorMethods[method[0]](this.pattern[method[1]])
      );
    }

    return true;
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');

    if (!elem.nextElementSibling || !elem.nextElementSibling.classList.contains('validator-error')) {
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'Ошибка в этом поле';
      errorDiv.classList.add('validator-error');
      elem.after(errorDiv);
    }
  }
}

