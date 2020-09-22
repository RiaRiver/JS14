// Делает первую букву в слове или строке большой, остальные маленькими
export const capitalize = word => word.toLowerCase().replace(word[0].toLowerCase(), word[0].toUpperCase());