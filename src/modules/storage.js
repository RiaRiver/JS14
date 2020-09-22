export const storage = {
  save: function (objName, obj) {
    sessionStorage[objName] = JSON.stringify(obj);
  },
  load: function (objName) {
    return sessionStorage[objName] ? JSON.parse(sessionStorage[objName]) : [];
  },
}