export const toggleDropdown = (dropdowns, flag, dropdown) => {
  if (flag) {
    dropdowns.forEach(drop => drop.style.display = (drop === dropdown) ? 'block' : 'none');
  } else {
    if (dropdown) {
      dropdown.style.display = 'none';
    } else {
      dropdowns.forEach(drop => drop.style.display = 'none');
    }
  }
}