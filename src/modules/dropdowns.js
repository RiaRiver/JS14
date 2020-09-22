// Создает элемент дропдауна с заданным текстом
import {getUniqValues} from "./getUniqValues";

const createDropdownItem = text => {
  const dropdownItem = document.createElement('li');
  dropdownItem.className = 'dropdown-item';
  dropdownItem.innerHTML = text;
  return dropdownItem;
};
// Наполняет дропдаун для инпута вариантами выбора, основанными на уникальных значениях этого свойства,
// полученных из массива объектов
export const addDropdown = (objects, input) => {
  const dropdown = input.nextElementSibling;
  dropdown.innerHTML = '';
  const uniq = getUniqValues(objects, input.name, false);

  uniq.forEach(value => {
    if (value.toLowerCase().includes(input.value.toLowerCase())) {
      dropdown.append(createDropdownItem(value));
    }
  });
};