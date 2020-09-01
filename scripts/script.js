'use strict';
const animation = document.querySelector('#animation'),
  parentElem = animation.parentElement,
  parentStyles = getComputedStyle(parentElem),
  parentIndents = parseInt(parentStyles.paddingLeft) + parseInt(parentStyles.marginLeft) + parseInt(parentStyles.paddingRight) + parseInt(parentStyles.marginRight),
  playButton = document.querySelector('#play'),
  reset = document.querySelector('#reset');

animation.style.position = 'relative';
let count = 0,
  flyInterval,
  reverse = false,
  animated = false;
const playAnimate = function() {
  if (!reverse) {
    count++;
    animation.style.left = count + 'px';
    if ((count + animation.offsetWidth) === (parentElem.offsetWidth - parentIndents)) {
      reverse = true;
      animation.style.transform = 'rotateY(180deg)';
    }
  } else {
    count--;
    animation.style.left = count + 'px';
    if (count === 0) {
      reverse = false;
      animation.style.transform = '';
    }
  }
  flyInterval = requestAnimationFrame(playAnimate);
};

playButton.addEventListener('click', () => {
  if (!animated) {
    flyInterval = requestAnimationFrame(playAnimate);
    animated = true;
  } else {
    cancelAnimationFrame(flyInterval);
    animated = false;
  }
});

reset.addEventListener('click', () => {
  cancelAnimationFrame(flyInterval);
  reverse = false;
  count = 0;
  animation.style.transform = '';
  animation.style.left = '';
  animated = false;
});
