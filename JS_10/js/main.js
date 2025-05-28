import { debounce } from './debounce.js';

// --- Тестові дані (30 користувачів) ---
const testUsers = [
  {
    name: 'Олександр Іванов',
    age: 28,
    location: 'Київ, Україна',
    email: 'oleksandr.ivanov@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Марія Петрова',
    age: 34,
    location: 'Львів, Україна',
    email: 'maria.petrova@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Іван Коваленко',
    age: 22,
    location: 'Одеса, Україна',
    email: 'ivan.kovalenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Світлана Грищук',
    age: 30,
    location: 'Харків, Україна',
    email: 'svitlana.hryshchuk@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    name: 'Дмитро Левченко',
    age: 40,
    location: 'Дніпро, Україна',
    email: 'dmytro.levchenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Олена Кравченко',
    age: 27,
    location: 'Запоріжжя, Україна',
    email: 'olena.kravchenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    name: 'Володимир Тимошенко',
    age: 31,
    location: 'Чернігів, Україна',
    email: 'volodymyr.tymoshenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    name: 'Ірина Савченко',
    age: 24,
    location: 'Івано-Франківськ, Україна',
    email: 'iryna.savchenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Павло Козак',
    age: 29,
    location: 'Вінниця, Україна',
    email: 'pavlo.kozak@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    name: 'Анна Мельник',
    age: 33,
    location: 'Житомир, Україна',
    email: 'anna.melnyk@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    name: 'Олексій Федоренко',
    age: 26,
    location: 'Полтава, Україна',
    email: 'oleksii.fedorenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    name: 'Катерина Шевченко',
    age: 35,
    location: 'Рівне, Україна',
    email: 'kateryna.shevchenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    name: 'Євген Климчук',
    age: 38,
    location: 'Черкаси, Україна',
    email: 'yevhen.klymchuk@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
  },
  {
    name: 'Ольга Довженко',
    age: 23,
    location: 'Хмельницький, Україна',
    email: 'olha.dovzhenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
  },
  {
    name: 'Тарас Коваль',
    age: 41,
    location: 'Кропивницький, Україна',
    email: 'taras.koval@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
  {
    name: 'Наталія Бондаренко',
    age: 28,
    location: 'Миколаїв, Україна',
    email: 'nataliya.bondarenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
  },
  {
    name: 'Сергій Орел',
    age: 32,
    location: 'Чернівці, Україна',
    email: 'serhii.orel@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
  },
  {
    name: 'Людмила Іщенко',
    age: 27,
    location: 'Суми, Україна',
    email: 'liudmyla.ishchenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
  },
  {
    name: 'Андрій Бондар',
    age: 30,
    location: 'Тернопіль, Україна',
    email: 'andrii.bondar@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
  },
  {
    name: 'Оксана Климова',
    age: 26,
    location: 'Луцьк, Україна',
    email: 'oksana.klymova@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
  },
  {
    name: 'Віктор Гончар',
    age: 39,
    location: 'Ужгород, Україна',
    email: 'viktor.honchar@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
  },
  {
    name: 'Інна Романюк',
    age: 25,
    location: 'Кам’янець-Подільський, Україна',
    email: 'inna.romaniuk@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    name: 'Юрій Мазур',
    age: 34,
    location: 'Бердянськ, Україна',
    email: 'yurii.mazur@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    name: 'Ганна Павленко',
    age: 31,
    location: 'Ніжин, Україна',
    email: 'hanna.pavlenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
  },
  {
    name: 'Василь Чумак',
    age: 28,
    location: 'Кривий Ріг, Україна',
    email: 'vasyl.chumak@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
  },
  {
    name: 'Людмила Гнатюк',
    age: 36,
    location: 'Слов’янськ, Україна',
    email: 'liudmyla.hnatiuk@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  {
    name: 'Єгор Шевчук',
    age: 29,
    location: 'Біла Церква, Україна',
    email: 'yehor.shevchuk@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
  },
  {
    name: 'Ірина Добровольська',
    age: 33,
    location: 'Жовті Води, Україна',
    email: 'iryna.dobrovolska@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    name: 'Микола Піддубний',
    age: 37,
    location: 'Сєвєродонецьк, Україна',
    email: 'mykola.piddubnyi@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
  {
    name: 'Валентина Ткаченко',
    age: 24,
    location: 'Кам’янське, Україна',
    email: 'valentyna.tkachenko@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
  },
];

// --- Елементи ---
const usersContainer = document.getElementById('users-container');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

// Створюємо кнопку для фільтрації та додаємо її в DOM
const filterBtn = document.createElement('button');
filterBtn.textContent = 'Застосувати фільтрацію';
filterBtn.id = 'filter-btn';
filterBtn.type = 'button';
filterBtn.style.margin = '10px 0 20px 0';
usersContainer.parentNode.insertBefore(filterBtn, usersContainer);

let filteredUsers = [...testUsers];

// --- Функція рендеру ---
function renderUsers(users) {
  if (users.length === 0) {
    usersContainer.innerHTML = `<p>Нічого не знайдено.</p>`;
    return;
  }
  usersContainer.innerHTML = users
    .map(
      (user) => `
    <article class="user-card" tabindex="0" aria-label="Картка користувача ${user.name}">
      <img class="user-avatar" src="${user.avatar}" alt="Аватар користувача ${user.name}" loading="lazy" width="100" height="100" />
      <h3 class="user-name">${user.name}</h3>
      <p class="user-age">Вік: ${user.age}</p>
      <p class="user-location">Місто: ${user.location}</p>
      <a class="user-email" href="mailto:${user.email}">${user.email}</a>
    </article>
  `
    )
    .join('');
}

// --- Фільтрація ---
function filterUsers() {
  const query = searchInput.value.trim().toLowerCase();
  filteredUsers = testUsers.filter((user) =>
    user.name.toLowerCase().includes(query)
  );
  sortUsers(); // Після фільтрації сортуємо результат
  renderUsers(filteredUsers);
}

// --- Сортування ---
function sortUsers() {
  const sortOption = sortSelect.value;
  if (sortOption === 'name-asc') {
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'age-asc') {
    filteredUsers.sort((a, b) => a.age - b.age);
  } else if (sortOption === 'age-desc') {
    filteredUsers.sort((a, b) => b.age - a.age);
  }
}

// --- Обробники ---
filterBtn.addEventListener('click', filterUsers);

sortSelect.addEventListener('change', () => {
  sortUsers();
  renderUsers(filteredUsers);
});

// --- Початковий рендер ---
renderUsers(testUsers);
