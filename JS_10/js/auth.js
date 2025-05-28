function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUser(user) {
  const users = getUsers();
  if (users.some(u => u.email === user.email)) {
    alert('Користувач з таким email вже зареєстрований!');
    return false;
  }
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}

// Реєстрація (не обовʼязкова на сторінці login, але залишимо)
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
      alert('Усі поля обовʼязкові');
      return;
    }

    const success = saveUser({ username, email, password });
    if (success) {
      alert('Реєстрація успішна!');
      window.location.href = 'login.html';
    }
  });
}

// Авторизація
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    console.log('users from localStorage:', users);
    console.log('login attempt:', email, password);
    console.log('matched user:', user);

    if (user) {
      alert(`Вітаємо, ${user.username || user.email}!`);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'index.html';
    } else {
      alert('Невірний email або пароль');
    }
  });
}
