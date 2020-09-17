// Timer
export const countTimer = (deadline, hoursSelector, minutesSelector, secondsSelector) => {
  const hours = document.querySelector(hoursSelector),
    minutes = document.querySelector(minutesSelector),
    seconds = document.querySelector(secondsSelector);
  let timerInterval = null;

  // Получение оставшегося времени
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);
    return {timeRemaining, hours, minutes, seconds};
  };

  // Обновление таймера
  const updateTimer = () => {
    const timer = getTimeRemaining();

    if (timer.timeRemaining < 1) {
      clearInterval(timerInterval);
      for (const key in timer) {
        timer[key] = 0;
      }
      hours.parentElement.style.color = 'red';
    }
    hours.textContent = String(timer.hours).padStart(2, '0');
    minutes.textContent = String(timer.minutes).padStart(2, '0');
    seconds.textContent = String(timer.seconds).padStart(2, '0');
  };

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
};