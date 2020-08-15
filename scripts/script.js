function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let count = 10000000;
let nums = [];
for (let i = 0; i < count; i++) {
  nums.push(getRandomIntInclusive(1000000, 1000000000));
}

const dashatizeLera = function (num) {
  num = num.toString();
  let res = '';
  for (let i = 0; i < num.length; i++) {
    let curr = num[i];
    let prev = res[res.length - 1];

    if (curr % 2 !== 0) {
      if (prev !== '-' && i !== 0) {
        res += '-';
      }
      res += curr;
      if (i !== num.length - 1) {
        res += '-';
      }
    } else {
      res += curr;
    }
  }
  return res;
};

const dashatizeVasya = (num) => {
  num = num.toString();
  let result = '';

  for (let i = 0; i < num.length; i += 1) {
    let current = num[i];
    if (current % 2 !== 0) {
      result = `${result}-${current}-`;
    } else {
      result = `${result}${current}`;
    }
  }
  if (result[0] === '-') {
    result = result.slice(1, result.length);
  }
  if (result[result.length - 1] === '-') {
    result = result.slice(0, result.length - 1);
  }
  result = result.replace(/--/g, '-');
  return result;
};

const dashatizePair = function (num) {
  num = num.toString().split('');
  let res = '';

  for (let i = 0; i < num.length; i++) {
    let curr = num[i];
    let next = num[i + 1];
    if (next && (curr % 2 !== 0 || next % 2 !== 0)) {
      res += `${curr}-`;
    } else res += `${curr}`;
  }
  return res;
};

const dashatizeRegExp = function (num) {
  num = num.toString().split('');
  let res = num.join('-');
  let regExp = /([02468])-([02468])/g;
  for (let i = 0; i < 2; i++) res = res.replace(regExp, '$1$2');

  return res;
};

console.time('Test');
console.log('test');
console.timeEnd('Test');

console.time('RegExp');
console.log('RegExp: ', nums.map(dashatizeRegExp));
console.timeEnd('RegExp');

console.time('Pair');
console.log('Pair: ', nums.map(dashatizePair));
console.timeEnd('Pair');

console.time('Vasya');
console.log('Vasya: ', nums.map(dashatizeVasya));
console.timeEnd('Vasya');

console.time('Lera');
console.log('Lera: ', nums.map(dashatizeLera));
console.timeEnd('Lera');
