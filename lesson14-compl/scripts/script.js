'use strict';

const DomElement = function (selector, text, height, width, bg, fontSize) {
  this.selector = selector;
  this.text = text;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.insertDomElement = function () {
  let newElement;
  const attrValue = this.selector.slice(1);

  switch (true) {
    case this.selector.startsWith('.'): {
      newElement = document.createElement('div');
      newElement.className = attrValue;
      break;
    }

    case this.selector.startsWith('#'): {
      newElement = document.createElement('p');
      newElement.id = attrValue;
      break;
    }

    default:
      return;
  }

  newElement.textContent = this.text;

  newElement.style.cssText = `
  height: ${this.height};
  width: ${this.width};
  background: ${this.bg};
  font-size: ${this.fontSize};
  `;

  document.body.append(newElement);
};

const square = new DomElement('.square', '', '100px', '100px', 'green');
square.position = 'absolute';

const handler = function () {
  this.insertDomElement();
  let elem = document.querySelector(this.selector);
  elem.style.position = this.position;
};

const move = function () {
  let elem = document.querySelector(this.selector);
  switch (event.key) {
    case 'ArrowUp': {
      elem.style.top = `${elem.offsetTop - 10}px`;
      break;
    }
    case 'ArrowRight': {
      elem.style.left = `${elem.offsetLeft + 10}px`;
      break;
    }
    case 'ArrowDown': {
      elem.style.top = `${elem.offsetTop + 10}px`;
      break;
    }
    case 'ArrowLeft': {
      elem.style.left = `${elem.offsetLeft - 10}px`;
      break;
    }
  }
};

document.addEventListener('DOMContentLoaded', handler.bind(square));
document.addEventListener('keydown', move.bind(square));
