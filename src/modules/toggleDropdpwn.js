export const toggleDropdown = ({dropdowns, flag, dropdown}) => {
  console.log(dropdown)
  if (dropdown) {
    switch (flag) {
      case 'on': {
        dropdown.style.display = 'block';
        break;
      }
      case 'off': {
        dropdown.style.display = 'none';
        break;
      }
      default: {
        dropdowns.forEach(drop => drop.style.display = (drop === dropdown) ? 'block' : 'none');
      }
    }
  } else {
    dropdowns.forEach(drop => drop.style.display = 'none');
  }
}