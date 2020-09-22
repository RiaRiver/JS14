// Получает множество уникальных значений свойства из массива объектов
import {capitalize} from "./capitalize";

export const getUniqValues = (objects, prop, cap = true) => {
  const uniqValues = new Set();
  objects.forEach(obj => {
    const addUniqValue = value => {
      uniqValues.add(cap ? capitalize(value) : value);
    };
    const value = obj[prop];
    if (value) {
      Array.isArray(value) ? value.forEach(item => addUniqValue(item)) : addUniqValue(value);
    } else {
      uniqValues.add('none');
    }
  });
  return [...uniqValues].sort();
};