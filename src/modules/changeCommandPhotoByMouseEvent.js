// Смена фотографий в блоке команда по наведению мыши
export const changeCommandPhotoByMouseEvent = commandImageSelector => {
  const commandImages = document.querySelectorAll(commandImageSelector);

  const changePhoto = event => {
    const target = event.target,
      prevSrc = target.attributes.src.value;
    target.src = target.dataset.img;
    target.dataset.img = prevSrc;
  };

  commandImages.forEach(image => {
    image.addEventListener('mouseenter', changePhoto);
    image.addEventListener('mouseleave', changePhoto);
  });
};