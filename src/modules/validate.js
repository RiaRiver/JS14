// Функция валидации инпутов (вторым и последущими параметрами принимает массивы, где элементы - это первые два параметра
// метода String.replace, методы replace будут применены по очереди, сначала для значения value инпута, а далее для
// возвращающихся результатов)
export const validate = (inputsSelector, ...deniedPatterns) => {
  const inputs = document.querySelectorAll(inputsSelector);

  const replaceDenied = event => {
    const value = event.target.value;
    event.target.value = deniedPatterns.reduce((res, replacer)=> res.replace(replacer[0], replacer[1]), value);
  };

  inputs.forEach(input => {
    input.addEventListener('input', replaceDenied);
    input.addEventListener('paste', replaceDenied);
  });
};