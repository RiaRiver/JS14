'use strict';
// window.addEventListener('DOMContentLoaded', function(){});

// Timer
function countTimer(deadline, elements) {
  function getTimeRemaining() {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();
    const timeRemaining = (dateStop - dateNow) / 1000;
    const seconds = Math.floor(timeRemaining % 60);
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const hours = Math.floor(timeRemaining / 60 / 60);
    return { timeRemaining, hours, minutes, seconds };
  }

  function updateTimer() {
    const timer = getTimeRemaining();
    elements.hours.textContent = timer.hours;
    elements.minutes.textContent = timer.minutes;
    elements.seconds.textContent = timer.seconds;

    if (timer.timeRemaining > 0) {
      setTimeout(updateTimer, 1000);
    }
  }

  updateTimer();
}

const hours = document.querySelector('#timer-hours');
const minutes = document.querySelector('#timer-minutes');
const seconds = document.querySelector('#timer-seconds');
countTimer('01 september 2020 10:00:00', { hours, minutes, seconds });
