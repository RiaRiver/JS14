// Создает элемент option с заданным значением и текстом
import {getUniqValues} from "./getUniqValues";
import {filterCards} from "./filter";
import {capitalize} from "./capitalize";

const createOption = (value, text) => {
  const option = document.createElement('option');
  option.value = value.toLowerCase();
  option.innerText = text || value;
  return option;
};
// Добавляет в селект варианты выбора, основанные на уникальных значениях этого свойства,
// полученных из массива объектов
const addSelect = (objects, select) => {
  select.innerHTML = '';
  const uniq = getUniqValues(objects, select.name);

  select.append(createOption('', 'All'));

  uniq.forEach(value => {
    select.append(createOption(value));
  });
};

// Обновляет селекты (для того, чтобы каждый селект содержал только возможные и актуальные значения, учитывая выбор
// в других селектах и инпутах)
export const updateSelects = (selects, objects) => {
  selects.forEach(select => {
    const selectValue = select.value;
    const filterForSelect = filterCards([...document.forms.filters.elements].filter(item => item.value && item !== select), objects);
    addSelect(filterForSelect, select);
    if (selectValue) {
      if (![...select.options].find(opt => opt.value === selectValue)) {
        const option = createOption(selectValue, capitalize(selectValue));
        const nextOption = [...select.options].find(opt => opt.value > selectValue);
        if (nextOption) {
          nextOption.before(option);
        } else {
          select.append(option);
        }
      }
      select.value = selectValue;
    }
  });
};