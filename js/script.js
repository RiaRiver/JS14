// Объявляется константа filterByType и ей присваивается ссылка на функцию, которая принимает аргументы в два параметра:
// первый аргумент в параметр type, остальные в массив values. Функция возвращает массив,
// состоящий из элементов массива values, тип которых равен переданной в параметр type строке с названием типа.
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

  // Объявляется константа hideAllResponseBlocks и ей присваивается ссылка на функцию. При вызове функции:
  hideAllResponseBlocks = () => {
    // Объявляется константа responseBlocksArray и ей присваивается ссылка на массив, содержащий ссылки на элементы
    // документа div с классом dialog__response-block
    const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
    // Для каждого элемента документа, ссылка на который хранится в массиве responseBlocksArray добавляется
    // инлайн-стиль display = 'none' (т.е. елемент скрывается со страницы)
    responseBlocksArray.forEach(block => block.style.display = 'none');
  }, // Окончание тела функции hideAllResponseBlocks

  // Объявляется константа showResponseBlock и ей присваивается ссылка на функцию, которая принимает аргументы
  // в три параметра:  blockSelector, msgText, spanSelector. При вызове функции:
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    // Вызывается функция hideAllResponseBlocks
    hideAllResponseBlocks();
    // Для первого элемента документа, который соответствуют селектору в параметре blockSelector,
    // устанавливается свойство display = 'block' (если ранее он был скрыт, он появляется на странице)
    document.querySelector(blockSelector).style.display = 'block';
    // Если в параметр spanSelector был передан аргумент и он не пустой, то:
    if (spanSelector) {
      // В первый элемента документа, который соответствуют селектору в параметре spanSelector,
      // вставляется текст из параметра msgText
      document.querySelector(spanSelector).textContent = msgText;
    } // Окончание условного блока
  }, // Окончание тела функции showResponseBlock

  // Объявляется константа showError и ей присваивается ссылка на функцию, которая принимает аргумент в параметр msgText.
  // При вызове функция вызывает функцию showResponseBlock и передает аргументы: селектор .dialog__response-block_error
  // в параметр blockSelector, значение своего параметра msgText в параметр msgText и селектор #error в параметр spanSelector
  showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

  // Объявляется константа showResults и ей присваивается ссылка на функцию, которая принимает аргумент в параметр msgText.
  // При вызове функция вызывает функцию showResponseBlock и передает аргументы: селектор .dialog__response-block_ok
  // в параметр blockSelector, значение своего параметра msgText в параметр msgText и селектор #ok в параметр spanSelector
  showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

  // Объявляется константа showNoResults и ей присваивается ссылка на функцию.
  // При вызове функция вызывает функцию showResponseBlock и передает один аргумент:
  // селектор .dialog__response-block_no-results в параметр blockSelector
  showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

  // Объявляется константа tryFilterByType и ей присваивается ссылка на функцию, которая принимает два аргумента
  // в параметры type и values. При вызове функции:
  tryFilterByType = (type, values) => {
    // Выполняется код в блоке try
    try {
      // Объявляется константа valuesArray. Вызывается метод eval, который интерпретирует и выполняет JavaScript код, представленный строкой.
      // Строка, переданная в качестве аргумента в метод eval, описывает вызов функции filterByType,
      // в которую первым аргументом передается строка со значением параметра type,
      // а в качестве дальнейшего(их) аргумента(ов) - строковое представление значения параметра values.
      // Если строка, переданная в метод eval будет успешно интерпретирована, произойдет вызов функции filterByType.
      // И если вызов функции filterByType пройдет без ошибок и она вернет результирующий массив, то он будет преобразован с строку,
      // где элементы массива разделены ", ", а ссылка на эту строку будет присвоена константе valuesArray.
      // Если в процессе интерпритации методом eval своего аргумента или во время выполнения функции filterByType
      // случится ошибка, то выполнение инструкций блока try будет преврано и управление перейдет к блоку catch,
      // в который будет передан объект ошибки.
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      // Если предыдущая инструкция выполнится без ошибок, то:
      // объявляется константа alertMsg.
      // Если строка, ссылка на которую хранится в переменной valuesArray, не пустая,
      const alertMsg = (valuesArray.length) ?
        // то в константу alertMsg присваивается ссылка на строку  `Данные с типом ${type}: ${valuesArray}`,
        // где ${type} - строковое представление параметра type,  ${valuesArray} - строковое представление константы valuesArray
        `Данные с типом ${type}: ${valuesArray}` :
        // Иначе (строка valuesArray пустая) -  в константу alertMsg присваивается ссылка на строку `Отсутствуют данные типа ${type}`,
        // где ${type} - строковое представление параметра type.
        `Отсутствуют данные типа ${type}`;
      // Вызывается функция showResults, в качестве аргумента передается ссылка на строку, которая хранится в константе alertMsg
      showResults(alertMsg);
      // Если во время выполнения инструкций из блока try произошла ошибка, управление переходит блоку catch, в который передается
      // объект ошибки
    } catch (e) {
      // Вызывается функция showError, в качестве аргумента передается строка `Ошибка: ${e}`,
      // где  ${e} - строковое представление объекта ошибки.
      showError(`Ошибка: ${e}`);
    } // Окончание блока catch
  };// Окончание тела функции tryFilterByType

// Объявляется константа filterButton и ей присваивается ссылка на элемент документа с id="filter-btn"
const filterButton = document.querySelector('#filter-btn');

// Для элемента документа, ссылка на который содержится в константе filterButton, устанавливается прослушиватель события
// 'click'. Когда событие 'click' происходит на элементе, вызывается анонимная функция, в которую в качестве параметра e
// передается объект события
filterButton.addEventListener('click', e => {
  //  Объявляется константа typeInput и ей присваивается ссылка на элемент документа с id="type"
  const typeInput = document.querySelector('#type');
  //  Объявляется константа dataInput и ей присваивается ссылка на элемент документа с id="data"
  const dataInput = document.querySelector('#data');

  // Если значение свойства value элемента, ссылка на который хранится в константе dataInput равно пустой строке,
  // то выполняется следующий блок кода:
  if (dataInput.value === '') {
    // Для элемента, ссылка на который хранится в константе dataInput, вызывается метод setCustomValidity,
    // установливающий вместо собщения по умолчанию для невалидного поля формы сообщение 'Поле не должно быть пустым!'
    dataInput.setCustomValidity('Поле не должно быть пустым!');
    // Вызывается метод showNoResults
    showNoResults();
    // Иначе (значение свойства value элемента, ссылка на который хранится в константе dataInput не равно пустой строке)
    // блок кода, следующий за условным выражением (dataInput.value === '') пропускается и выполняется блок кода, следующий
    // за ключевым словом else
  } else {
    // Для элемента, ссылка на который хранится в константе dataInput, вызывается метод setCustomValidity
    // с пустой строкой в качестве аргумента, который для невалидного поля формы устанавливает сообщение браузера
    // по умолчанию.
    dataInput.setCustomValidity('');
    // Для события e отменяется действие браузера по умолчанию
    e.preventDefault();
    // Вызывается функция tryFilterByType, в качетсве аргументов которой передаются значения свойств value, с удалением
    // начальных и завершающих пробелов, элементов, ссылки на которые хранятся в константах typeInput и dataInput
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  } // Окончание блока else
}); // Окончание тела анонимной функции, переданной как обработчик в слушатель события
