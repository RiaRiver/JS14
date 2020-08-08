let num = 266219;
console.log('Значение num: ', num);

//Умножение цифр в числе: математический алгоритм
function multOfDigits(num) {
  let result = num < 0 ? ((num = -num), -1) : 1;
  do {
    if (num % 10 === 0) {
      result = 0;
      return result;
    } else {
      result *= num % 10;
      num = Math.floor(num / 10);
    }
  } while (num !== 0);
  return result;
}

//Умножение цифр в числе: алгоритм с использованием строк
function multOfDigits2(num) {
  let result = num < 0 ? ((num = -num), -1) : 1;
  let numToString = String(num);
  for (let ch of numToString) {
    result *= +ch;
  }
  return result;
}

//Вывов в консоль произведения (умножения) цифр числа num
let numTransform1 = multOfDigits(num);
console.log('Произведение цифр числа "num" (вычисление первым алгоритмом): ' + numTransform1);

numTransform1 = multOfDigits2(num);
console.log('Произведение цифр числа "num" (вычисление вторым алгоритмом): ' + numTransform1);

//Возведение полученного числа в степень 3
let numTransform2 = numTransform1 ** 3;
console.log(`Возведение ${numTransform1} в степень 3: ${numTransform2}`);

//Вывод в консоль первых 2ъ цифр полученного числа
console.log(`Первые две цифры числа ${numTransform2}: ${String(numTransform2).substr(0, 2)}`);
