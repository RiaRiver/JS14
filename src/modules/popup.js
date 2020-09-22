export class PopUp {
  constructor({
                popUpSelector, closeEffectsFunc = () => {
    }, closeSelector = '.popup-close', popUpButtonsSelector, displayMode
              }) {
    this.popUp = document.querySelector(popUpSelector);
    this.closeEffectsFunc = closeEffectsFunc;
    this.closeButton = this.popUp.querySelector(closeSelector) || null;
    // Слушатели на кнопки открытия, если они есть
    if (popUpButtonsSelector) {
      this.popUpButtons = document.querySelectorAll(popUpButtonsSelector);
    }
    if (this.popUpButtons && this.popUpButtons.length) {
      this.popUpButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.popUp.style.display = displayMode || '';
          this.popUp.style.visibility = 'visible';
        });
      });
    }

    // Слушатель на кнопку закрытия
    this.popUp.addEventListener('click', event => {
      if (event.target === this.closeButton) {
        this.closePopUp();
      }
    });
  }

  // Закрытие модального окна, вызывает функцию эффектов закрытия, потом закрывает окно
  closePopUp() {
    Promise.resolve(this.closeEffectsFunc()).then(() => {
      this.popUp.style.display = 'none';
      this.popUp.style.visibility = '';
    });
  }
}