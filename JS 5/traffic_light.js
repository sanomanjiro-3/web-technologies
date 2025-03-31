const redLight = document.getElementById("redLight");
const yellowLight = document.getElementById("yellowLight");
const greenLight = document.getElementById("greenLight");
const status = document.getElementById("status");
const nextStateButton = document.getElementById("nextStateButton");

let redDuration = 5000; // Червоний стан 5 секунд
let yellowDuration = 3000; // Жовтий стан 3 секунди
let greenDuration = 7000; // Зелений стан 7 секунд
let blinkCount = 3; // Кількість мігань жовтого

let currentState = "red"; // Початковий стан
let timer = null;
let isBlinking = false;

// Запитуємо у користувача нові тривалості для станів
function setDurations() {
    redDuration = parseInt(prompt("Введіть тривалість червоного світла в мс (за замовчуванням 5000):", redDuration)) || redDuration;
    yellowDuration = parseInt(prompt("Введіть тривалість жовтого світла в мс (за замовчуванням 3000):", yellowDuration)) || yellowDuration;
    greenDuration = parseInt(prompt("Введіть тривалість зеленого світла в мс (за замовчуванням 7000):", greenDuration)) || greenDuration;
}

// Оновлюємо світлофори та текст
function updateLights() {
    // Спочатку вимикаємо всі світла
    redLight.style.opacity = 0.3;
    yellowLight.style.opacity = 0.3;
    greenLight.style.opacity = 0.3;
    yellowLight.classList.remove("blinking");

    // Змінюємо стан світлофора
    switch (currentState) {
        case "red":
            redLight.style.opacity = 1;
            status.textContent = "Поточний стан: червоний";
            break;
        case "yellow":
            yellowLight.style.opacity = 1;
            status.textContent = "Поточний стан: жовтий";
            break;
        case "green":
            greenLight.style.opacity = 1;
            status.textContent = "Поточний стан: зелений";
            break;
        case "blinkingYellow":
            yellowLight.classList.add("blinking");
            status.textContent = "Поточний стан: миготливий жовтий";
            break;
    }
}

// Функція для автоматичного перемикання станів
function changeState() {
    switch (currentState) {
        case "red":
            setTimeout(() => {
                currentState = "yellow";
                updateLights();
                changeState();
            }, redDuration); // Червоний
            break;
        case "yellow":
            setTimeout(() => {
                currentState = "green";
                updateLights();
                changeState();
            }, yellowDuration); // Жовтий
            break;
        case "green":
            setTimeout(() => {
                currentState = "blinkingYellow";
                updateLights();
                changeState();
            }, greenDuration); // Зелений
            break;
        case "blinkingYellow":
            // Миготливий жовтий
            let blinkInterval = 500; // Період миготіння
            let blinkTimes = blinkCount * 2; // Кількість блимків (2 зміни кольору на кожне миготіння)

            let blinkTimer = setInterval(() => {
                // Перемикаємо між вимкненим та жовтим
                yellowLight.style.opacity = yellowLight.style.opacity == 0.3 ? 1 : 0.3;
            }, blinkInterval);

            setTimeout(() => {
                clearInterval(blinkTimer); // Остановлюємо миготіння
                currentState = "red"; // Переходимо до червоного
                updateLights();
                changeState();
            }, blinkInterval * blinkTimes); // Час, щоб мігати 3 рази
            break;
    }
}

// Запуск світлофора
function startTrafficLight() {
    setDurations();
    changeState();  // Починаємо з червоного
}

// Вручну перемикаємо на наступний стан
nextStateButton.addEventListener("click", () => {
    switch (currentState) {
        case "red":
            currentState = "yellow";
            break;
        case "yellow":
            currentState = "green";
            break;
        case "green":
            currentState = "blinkingYellow";
            break;
        case "blinkingYellow":
            currentState = "red";
            break;
    }
    updateLights();
});

// Ініціалізуємо світлофор
startTrafficLight();
