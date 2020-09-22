import {PopUp} from "./popup";
import {toggleElem} from "./toggleElem";
import {animate} from "./animate";

export const setUpVideo = () => {
  const popupBlock = document.querySelector('.popup-block');
  const video = document.querySelector('video');
  const preloadImage = document.querySelector('.preload-image');
  const preloader = document.querySelector('.preloader');
  const skipButton = document.querySelector('.skip');
  const sound = document.querySelector('.sound');

  const videoPopUp = new PopUp({
    popUpSelector: '.popup', closeEffectsFunc: () => new Promise(resolve => {
      video.remove();
      toggleElem(preloadImage, true);
      toggleElem(videoPopUp.closeButton, false);

      animate({
        duration: 2000,
        draw(progress) {
          videoPopUp.popUp.style.opacity = 1 - progress;
          popupBlock.style.transform = `scale(${1 - progress})`;
          if (progress === 1) {
            resolve();
          }
        }
      });
    }), closeSelector: '.skip'
  });

  setTimeout(() => {
    toggleElem(skipButton, true);
  }, 10000);

  video.addEventListener('playing', () => {
    toggleElem(preloader, false);
    toggleElem(sound, true, 'block');
  });

  video.addEventListener('ended', () => {
      videoPopUp.closePopUp();
    }
  );

  sound.addEventListener('click', () => {
    sound.style.opacity = video.muted ? 1 : 0.5;
    video.muted = !video.muted;
  })

  video.autoplay = true;
}