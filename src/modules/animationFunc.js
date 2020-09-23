import {toggleDropdown} from "./toggleDropdpwn";

const selectCitiesInput = document.getElementById('select-cities');
const dropdowns = document.querySelectorAll('.dropdown-lists__list');

export const animateFunc = (progress) => {
  const dropdownNumber = +selectCitiesInput.dataset.dropdown
  const direction = (dropdownNumber) ? progress : 1 - progress;
  console.log(direction);
  console.log(-progress);
  dropdowns[0].style.transform = `translateX(${-415 * direction}px)`;
  dropdowns[1].style.transform = `translateX(${-415 * direction}px)`;
  if (progress === 1) {

    toggleDropdown({dropdowns, flag: 'off', dropdown: (dropdownNumber) ? dropdowns[0] : dropdowns[1]});
    dropdowns[0].style.transform = ``;
    dropdowns[1].style.transform = ``;
  }
}