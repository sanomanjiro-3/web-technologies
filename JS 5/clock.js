// Завдання 1: Цифровий годинник з анімацією
function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    clock.innerHTML = `${hours}:${minutes}:<span id="seconds" class="blinking">${seconds}</span>`;
}
setInterval(updateClock, 1000);

// Завдання 2: Таймер зворотного відліку
document.getElementById("startCountdown").addEventListener("click", function() {
    const countdownInput = document.getElementById("countdownInput").value;
    const countdownDisplay = document.getElementById("countdown");

    if (!countdownInput) {
        alert("Будь ласка, виберіть дату та час.");
        return;
    }

    const targetDate = new Date(countdownInput);
    const interval = setInterval(function() {
        const now = new Date();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(interval);
            countdownDisplay.innerHTML = "Таймер завершено!";
        } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownDisplay.innerHTML = `${days} днів ${hours} годин ${minutes} хвилин ${seconds} секунд`;
        }
    }, 1000);
});

// Завдання 3: Календар
document.getElementById("showMonth").addEventListener("click", function() {
    const monthInput = document.getElementById("monthInput").value;
    const monthDisplay = document.getElementById("monthDisplay");

    const date = new Date(monthInput + "-01");
    const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    monthDisplay.innerHTML = `Поточний місяць: ${monthName} ${year}`;
});

// Завдання 4: День народження
document.getElementById("calculateBirthday").addEventListener("click", function() {
    const birthdayInput = document.getElementById("birthdayInput").value;
    const birthdayResult = document.getElementById("birthdayResult");

    if (!birthdayInput) {
        alert("Будь ласка, введіть вашу дату народження.");
        return;
    }

    const birthday = new Date(birthdayInput);
    const now = new Date();

    if (birthday < now) {
        birthday.setFullYear(now.getFullYear() + 1); // Якщо день народження вже був цього року, перенести на наступний
    }

    const timeRemaining = birthday - now;
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    birthdayResult.innerHTML = `До вашого дня народження залишилось: ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд.`;
});
