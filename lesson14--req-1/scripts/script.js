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

const testElem1 = new DomElement('#test-elem', 'Test Elem 1', '100px', '300px', 'greenyellow', '20px');
testElem1.insertDomElement();

const testElem2 = new DomElement(
  '.test-elem',
  'Test Elem 2',
  '300px',
  '600px',
  'center / cover no-repeat url("https://i.pinimg.com/736x/78/2b/49/782b49d8c709e79ba6f447290419fd88.jpg")',
  '30px'
);
testElem2.insertDomElement();
