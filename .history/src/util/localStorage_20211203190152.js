export const setLocalStorage = (key, value) => {
  localStorage.setItem("key");
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem("key"));
};
