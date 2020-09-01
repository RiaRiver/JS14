'use strict';
// window.addEventListener('DOMContentLoaded', function(){});

// Timer
function countTimer(deadline, { hours, minutes, seconds }) {
  // Получение оставшегося времени
  function getTimeRemaining() {
    const dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);
    return { timeRemaining, hours, minutes, seconds };
  }

  // Обновление таймера
  function updateTimer() {
    const timer = getTimeRemaining();

    if (timer.timeRemaining < 1) {
      clearInterval(timerInterval);
      for (const key in timer) {
        timer[key] = 0;
        console.log(key, timer[key]);
      }
      hours.parentElement.style.color = 'red';
    }
    hours.textContent = String(timer.hours).padStart(2, '0');
    minutes.textContent = String(timer.minutes).padStart(2, '0');
    seconds.textContent = String(timer.seconds).padStart(2, '0');
  }
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// Получение элементов и запуск таймера
const hours = document.querySelector('#timer-hours');
const minutes = document.querySelector('#timer-minutes');
const seconds = document.querySelector('#timer-seconds');

countTimer('03 september 2020 08:15:30', { hours, minutes, seconds });
