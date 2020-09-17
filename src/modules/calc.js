// Калькулятор
import {animate} from "./animate";

export const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcTypeSelect = document.querySelector('.calc-type'),
    calcSquareInput = document.querySelector('.calc-square'),
    calcCountInput = document.querySelector('.calc-count'),
    calcDayInput = document.querySelector('.calc-day'),
    totalOutput = document.getElementById('total');

  const calculate = () => {
    let total = 0,
      coef = 1;
    const typeValue = calcTypeSelect.value,
      squareValue = calcSquareInput.value,
      countValue = calcCountInput.value,
      calcDayValue = calcDayInput.value;
    if (countValue > 1) {
      coef += (countValue - 1) / 10;
    }
    if (calcDayValue && calcDayValue < 5) {
      coef *= 2;
    } else if (calcDayValue && calcDayValue < 10) {
      coef *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * coef;
    }

    if (total) {
      let count = 0;
      animate({
        duration: 2000,
        draw(progress) {
          if (count === 7 || progress === 1) {
            totalOutput.textContent = (progress * total).toFixed(0);
            count = 0;
          }
          count++;
        }
      });
    }
  };

  calcBlock.addEventListener('change', calculate);
};