document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".form").forEach((f) => f.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`${tab.dataset.tab}-form`).classList.add("active");
    });
  });
  
  document.querySelectorAll(".toggle-eye").forEach((eye) => {
    eye.addEventListener("click", () => {
      const input = eye.previousElementSibling;
      input.type = input.type === "password" ? "text" : "password";
    });
  });
  
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const countrySelect = registerForm.country;
  const citySelect = registerForm.city;
  
  const cities = {
    Україна: ["Київ", "Львів", "Харків"],
    Польща: ["Варшава", "Краків", "Гданськ"],
    Німеччина: ["Берлін", "Гамбург", "Мюнхен"],
  };
  
  Object.keys(cities).forEach((country) => {
    const opt = new Option(country, country);
    countrySelect.add(opt);
  });
  
  countrySelect.addEventListener("change", () => {
    citySelect.disabled = false;
    citySelect.innerHTML = "";
    cities[countrySelect.value].forEach((city) => {
      citySelect.add(new Option(city, city));
    });
  });
  
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const isValid = validateRegisterForm();
    if (isValid) {
      alert("Реєстрація успішна!");
      registerForm.reset();
      citySelect.disabled = true;
      document.querySelectorAll(".form-group").forEach((group) => group.classList.remove("success"));
    }
  });
  
  loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const usernameInput = loginForm.username.value.trim().toLowerCase();
  const passwordInput = loginForm.loginPassword.value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === usernameInput && u.password === passwordInput);

  if (user) {
    alert(`Ласкаво просимо, ${user.firstName} ${user.lastName}!`);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    loginForm.reset();
  } else {
    alert("Невірний email або пароль.");
  }
});
  
  function validateRegisterForm() {
    const f = registerForm;
    let valid = true;
  
    const nameCheck = (input, field) => {
      if (input.value.length < 3 || input.value.length > 15) {
        showError(input, `${field} має бути від 3 до 15 символів`);
        return false;
      }
      showSuccess(input);
      return true;
    };
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+380\d{9}$/;
    
  
    valid &= nameCheck(f.firstName, "Ім’я");
    valid &= nameCheck(f.lastName, "Прізвище");
  
    if (!emailRegex.test(f.email.value)) {
      showError(f.email, "Некоректний email");
      valid = false;
    } else showSuccess(f.email);
  
    if (f.password.value.length < 6) {
      showError(f.password, "Пароль мінімум 6 символів");
      valid = false;
    } else showSuccess(f.password);
  
    if (f.confirmPassword.value !== f.password.value) {
      showError(f.confirmPassword, "Паролі не збігаються");
      valid = false;
    } else showSuccess(f.confirmPassword);
  
    if (!phoneRegex.test(f.phone.value)) {
      showError(f.phone, "Телефон повинен починатися з +380 і мати 12 цифр");
      valid = false;
    } else showSuccess(f.phone);
  
    const dob = new Date(f.dob.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (dob > today || age < 12) {
      showError(f.dob, "Вам має бути 12+ років і дата не з майбутнього");
      valid = false;
    } else showSuccess(f.dob);
  
    if (!f.sex.value) {
      showError(f.sex, "Оберіть стать");
      valid = false;
    } else showSuccess(f.sex);
  
    if (!f.country.value) {
      showError(f.country, "Оберіть країну");
      valid = false;
    } else showSuccess(f.country);
  
    if (!f.city.value) {
      showError(f.city, "Оберіть місто");
      valid = false;
    } else showSuccess(f.city);
  
    return Boolean(valid);
  }
  
  function showError(input, message) {
    const group = input.closest(".form-group");
    group.classList.add("error");
    group.classList.remove("success");
    group.querySelector("small").textContent = message;
  }
  
  function showSuccess(input) {
    const group = input.closest(".form-group");
    group.classList.add("success");
    group.classList.remove("error");
    group.querySelector("small").textContent = "";
  }
  document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const forms = document.querySelectorAll(".form");
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  // Перемикання вкладок
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      forms.forEach(f => f.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(`${tab.dataset.tab}-form`).classList.add("active");
    });
  });

  // Збереження даних користувача в localStorage при реєстрації
  registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = validateRegisterForm();
  if (!isValid) return;

  const formData = new FormData(registerForm);
  const user = {
    firstName: formData.get("firstName").trim(),
    lastName: formData.get("lastName").trim(),
    email: formData.get("email").trim().toLowerCase(),
    password: formData.get("password"),
    phone: formData.get("phone").trim(),
    dob: formData.get("dob"),
    sex: formData.get("sex"),
    country: formData.get("country"),
    city: formData.get("city"),
  };

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some(u => u.email === user.email)) {
    alert("Користувач з таким email вже існує.");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Реєстрація успішна! Тепер ви можете увійти.");
  registerForm.reset();
  citySelect.disabled = true;
  document.querySelectorAll(".form-group").forEach((group) => group.classList.remove("success"));
});


  // Авторизація
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = loginForm.username.value.trim().toLowerCase();
    const passwordInput = loginForm.loginPassword.value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === usernameInput && u.password === passwordInput);

    if (user) {
      alert(`Ласкаво просимо, ${user.firstName} ${user.lastName}!`);
      // Якщо треба — зберегти в localStorage або перенаправити
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      alert("Невірний email або пароль.");
    }
  });
});
