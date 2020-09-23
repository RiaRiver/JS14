// Работа с локальным хранилищем и куки
export const locStorage = {
  save: function (objName, obj) {
    localStorage[objName] = JSON.stringify(obj);
  },
  load: function (objName) {
    return localStorage[objName] ? JSON.parse(localStorage[objName]) : [];
  },
};

export const sessStorage = {
  save: function (objName, obj) {
    sessionStorage[objName] = JSON.stringify(obj);
  },
  load: function (objName) {
    return sessionStorage[objName] ? JSON.parse(sessionStorage[objName]) : [];
  },
}
