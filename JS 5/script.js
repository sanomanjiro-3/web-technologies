const lampButton = document.getElementById("lampButton");
const lamp = document.getElementById("lamp");
const lampType = document.getElementById("lampType");
const brightnessSlider = document.getElementById("brightness");

let isLampOn = false;
let isBrightnessLamp = false;
let lampTimer = null; // Перемінна для зберігання таймера

// Додаємо слухача на кнопку
lampButton.addEventListener("click", () => {
    isLampOn = !isLampOn;
    updateLamp();
    resetLampTimer(); // Скидаємо таймер при кожному кліку
});

// Додаємо слухача на зміну типу лампочки
lampType.addEventListener("change", () => {
    isBrightnessLamp = lampType.value === "brightness";
    brightnessSlider.disabled = !isBrightnessLamp;
    if (!isBrightnessLamp) {
        brightnessSlider.value = 100;
        lamp.style.opacity = 1;
    }
    updateLamp();
});

// Оновлюємо вигляд лампочки в залежності від її стану
function updateLamp() {
    if (isLampOn) {
        lamp.className = isBrightnessLamp ? 'lamp-on lamp-bright' : 'lamp-on';
        lamp.src = "lamp_on.jpg";
        lampButton.textContent = 'Вимкнути';
        startLampTimer(); // Стартуємо таймер після включення
    } else {
        lamp.className = 'lamp-off';
        lamp.src = "lamp_off.jpg";
        lampButton.textContent = 'Включити';
        clearTimeout(lampTimer); // Скидаємо таймер при вимкненні
    }
}

// Зміна яскравості при переміщенні повзунка
brightnessSlider.addEventListener("input", () => {
    const opacity = brightnessSlider.value / 100;
    lamp.style.opacity = opacity;
});

// Таймер, який вимикає лампочку через 5 хвилин бездіяльності
function startLampTimer() {
    lampTimer = setTimeout(() => {
        isLampOn = false; // Виключаємо лампочку
        updateLamp(); // Оновлюємо стан
    }, 5 * 60 * 1000); // 5 хвилин (в мілісекундах)
}

// Скидання таймера при кліку на кнопку
function resetLampTimer() {
    clearTimeout(lampTimer); // Очищаємо попередній таймер
    startLampTimer(); // Стартуємо новий таймер
}
