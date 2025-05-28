// js/utils.js

// Перевірка, чи елемент є HTML-елементом
const isElement = (el) => el instanceof Element || el instanceof HTMLDocument;

// Функція форматування дати у вигляді YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// Функція для отримання віку з дати народження
const getAgeFromDOB = (dob) => {
  const birthDate = new Date(dob);
  const diffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Функція для безпечного додавання тексту до елемента
const setText = (el, text) => {
  if (!isElement(el)) return;
  el.textContent = text;
};

// Функція для debounce
// Перемістимо її в debounce.js, але залишимо тут для імпорту, якщо треба
// Можна викликати debounce з окремого файлу.

// Функція для збереження в LocalStorage (stringify)
const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Функція для отримання з LocalStorage (parse)
const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export {
  isElement,
  formatDate,
  getAgeFromDOB,
  setText,
  saveToStorage,
  getFromStorage,
};
