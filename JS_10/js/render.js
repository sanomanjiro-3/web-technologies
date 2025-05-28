// js/render.js

import { getAgeFromDOB } from './utils.js';

const cardsContainer = document.getElementById('cards-container');
const favoritesStorageKey = 'friendsFavorites';

const getFavorites = () => {
  const data = localStorage.getItem(favoritesStorageKey);
  return data ? JSON.parse(data) : [];
};

const saveFavorites = (favorites) => {
  localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites));
};

const toggleFavorite = (uuid) => {
  const favorites = getFavorites();
  const index = favorites.indexOf(uuid);
  if (index === -1) {
    favorites.push(uuid);
  } else {
    favorites.splice(index, 1);
  }
  saveFavorites(favorites);
};

const isFavorite = (uuid) => {
  const favorites = getFavorites();
  return favorites.includes(uuid);
};

const createCard = (user) => {
  const {
    login: { uuid },
    picture: { large },
    name: { first, last },
    dob: { date, age },
    phone,
    email,
    location: { city, country },
    registered: { date: regDate },
  } = user;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.uuid = uuid;

  const favoriteClass = isFavorite(uuid) ? 'favorite active' : 'favorite';

  card.innerHTML = `
    <div class="card-header">
      <img src="${large}" alt="Photo of ${first} ${last}" class="card-photo" />
      <button class="${favoriteClass}" title="Add to favorites">&#9733;</button>
    </div>
    <div class="card-body">
      <h3 class="card-name">${first} ${last}</h3>
      <p>Age: ${age}</p>
      <p>Phone: ${phone}</p>
      <p>Email: <a href="mailto:${email}">${email}</a></p>
      <p>Location: ${city}, ${country}</p>
      <p>Registered: ${new Date(regDate).toLocaleDateString()}</p>
    </div>
  `;

  const favBtn = card.querySelector('button.favorite');
  favBtn.addEventListener('click', () => {
    toggleFavorite(uuid);
    favBtn.classList.toggle('active');
  });

  return card;
};

export function renderUsers(users) {
  const container = document.getElementById('users-container');
  container.innerHTML = '';

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('user-card');

    card.innerHTML = `
      <img src="${user.avatar || 'https://via.placeholder.com/96'}" alt="${user.name}" class="user-avatar" />
      <div class="user-info">
        <h3 class="user-name">${user.name}</h3>
        <p class="user-details">Вік: ${user.age} • Локація: ${user.location}</p>
        <p class="user-email">${user.email}</p>
      </div>
    `;

    container.appendChild(card);
  });
}


const renderError = (message) => {
  cardsContainer.innerHTML = `<div class="error-message">${message}</div>`;
};

export { renderUsers, renderError, getFavorites };
