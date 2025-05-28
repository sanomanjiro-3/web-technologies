document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const countrySelect = form.elements['country'];
  const citySelect = form.elements['city'];

  const countryCityMap = {
    'Україна': ['Київ', 'Львів', 'Харків'],
    'Польща': ['Варшава', 'Краків', 'Гданськ'],
    'Німеччина': ['Берлін', 'Мюнхен', 'Гамбург'],
  };

  // Заповнення країн
  function populateCountries() {
    countrySelect.innerHTML = '<option value="">Оберіть</option>';
    for (const country in countryCityMap) {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    }
  }

  // Заповнення міст залежно від країни
  function populateCities(country) {
    citySelect.innerHTML = '';
    if (!countryCityMap[country]) {
      citySelect.disabled = true;
      return;
    }

    citySelect.disabled = false;
    citySelect.innerHTML = '<option value="">Оберіть</option>';
    countryCityMap[country].forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }

  countrySelect.addEventListener('change', (e) => {
    populateCities(e.target.value);
  });

  // Перевірка форми
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const firstName = form.elements['firstName'];
    const lastName = form.elements['lastName'];
    const email = form.elements['email'];
    const password = form.elements['password'];
    const confirmPassword = form.elements['confirmPassword'];
    const phone = form.elements['phone'];
    const dob = form.elements['dob'];
    const sex = form.elements['sex'];
    const country = form.elements['country'];
    const city = form.elements['city'];

    form.querySelectorAll('small').forEach(s => s.textContent = '');

    [firstName, lastName].forEach(field => {
      if (field.value.trim().length < 2) {
        setError(field, 'Мінімум 2 символи');
        isValid = false;
      }
    });

    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      setError(email, 'Некоректний email');
      isValid = false;
    }

    if (password.value.length < 6) {
      setError(password, 'Мінімум 6 символів');
      isValid = false;
    }

    if (password.value !== confirmPassword.value) {
      setError(confirmPassword, 'Паролі не співпадають');
      isValid = false;
    }

    if (!/^\+?[0-9\s\-()]{10,}$/.test(phone.value)) {
      setError(phone, 'Некоректний номер телефону');
      isValid = false;
    }

    const date = new Date(dob.value);
    if (!dob.value || isNaN(date.getTime()) || date > new Date()) {
      setError(dob, 'Некоректна дата');
      isValid = false;
    }

    if (!sex.value) {
      setError(sex, 'Оберіть стать');
      isValid = false;
    }

    if (!country.value) {
      setError(country, 'Оберіть країну');
      isValid = false;
    }
    if (!city.value) {
      setError(city, 'Оберіть місто');
      isValid = false;
    }

    if (isValid) {
      const newUser = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value,
        phone: phone.value.trim(),
        dob: dob.value,
        sex: sex.value,
        country: country.value,
        city: city.value,
      };

      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const userExists = users.some(user => user.email === newUser.email);
      if (userExists) {
        setError(email, "Користувач з таким email вже існує");
        return;
      }

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Перехід на сторінку авторизації
      window.location.href = "login.html";
    }
  });

  function setError(input, message) {
    const small = input.closest('.form-group').querySelector('small');
    if (small) {
      small.textContent = message;
    }
  }

  populateCountries();
});
