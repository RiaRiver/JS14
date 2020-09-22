// Фильтрует массив объектов на основании фильтрующего объекта, который содержит пары
// свойство: [фильтрующее_значение, флаг]  Флаг true проверяет includes, false - equals
// (для получения объекта, не содержащего свойство, фильтрующее значение = none)
const getFilteredObjects = (objects, filter = {}) => {
  const filterEquals = (objects, prop, filterValue) => {
    if (filterValue === 'none') {
      return objects.filter(obj => (!obj[prop]));
    } else {
      return objects.filter(obj => (obj[prop]) && obj[prop].toLowerCase() === filterValue.toLowerCase());
    }
  };

  const filterIncludes = (objects, prop, filterValue) => objects.filter(obj =>
    (obj[prop]) && String(obj[prop]).toLowerCase().includes(filterValue.toLowerCase()));

  return Object.keys(filter).reduce((res, prop) => {
    const filterValue = filter[prop][0],
      flag = filter[prop][1];
    if (flag) {
      return filterIncludes(res, prop, filterValue);
    } else {
      return filterEquals(res, prop, filterValue);
    }
  }, objects);
};

// Фильтрует карточки по значениям фильтрующих элементов, возвращает массив объектов
export const filterCards = (filterElements, objects) => {
  const filterObj = {};
  [...filterElements].forEach(elem => {
    if (elem.value) {
      filterObj[elem.name] = [elem.value.trim(), elem.tagName.toLowerCase() === 'input'];
    }
  });
  return getFilteredObjects(objects, filterObj);
};