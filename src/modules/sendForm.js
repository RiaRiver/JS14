// Отправка формы AJAX
// Важно: в loadMessageOrInnerHTML можно передать текст или html прелоадера
// в loadMessageStyleCSS передаются CSS стили для прелоадера (если во всех формах один и тот же прелоадер
// с одинаковыми классами, стили достаточно передать только для первого вызова)
export const sendForm = (formSelector, {
  messageStyles = 'font-size: 2rem;',
  successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
  loadMessageOrInnerHTML = 'Загрузка ...',
  loadMessageStyleCSS = '',
  errorMessage = 'Что-то пошло не так ...'
} = {}) => {

  const form = document.querySelector(formSelector);

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = messageStyles;

  if (loadMessageStyleCSS) {
    const loadMessageStyles = document.createElement('style');
    loadMessageStyles.textContent = loadMessageStyleCSS;
    document.head.append(loadMessageStyles);
  }

  const getFormData = form => {
    const formData = new FormData(form);
    const body = {};
    formData.forEach((value, key) => body[key] = value.trim());
    return body;
  };

  const outputMessage = () => {
    statusMessage.textContent = successMessage;
  };
  const outputError = error => {
    statusMessage.textContent = errorMessage;
    console.error(error);
  };

  const sendData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(body)
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    form.append(statusMessage);
    statusMessage.innerHTML = loadMessageOrInnerHTML;
    sendData(getFormData(event.target))
      .then(response => {
        setTimeout(() => {
          statusMessage.textContent = '';
        }, 5000);
        if (response.status !== 200) {
          throw new Error('Network status not 200.');
        }
        outputMessage();
      })
      .catch(outputError);
    form.reset();
  });
};