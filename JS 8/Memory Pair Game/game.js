let nickname = '';
let gridSize = 4;
let difficulty = 'easy';
let timeLimit = 180;  // default to easy (3 mins)
let gameTimer;
let moves = 0;
let timerInterval;
let stats = [];

// Отримуємо елементи
const startGameBtn = document.getElementById('start-game');
const resetGameBtn = document.getElementById('reset-game');
const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const playerForm = document.getElementById('player-form');
const gameContainer = document.getElementById('game-container');
const statsContainer = document.getElementById('stats');
const statsList = document.getElementById('stats-list');
const closeStatsBtn = document.getElementById('close-stats');
const viewStatsBtn = document.getElementById('view-stats');

// Вибір нікнейму та налаштувань
startGameBtn.addEventListener('click', function () {
    nickname = document.getElementById('nickname').value;
    gridSize = parseInt(document.getElementById('grid-size').value);
    difficulty = document.getElementById('difficulty').value;

    if (difficulty === 'easy') timeLimit = 180;
    else if (difficulty === 'normal') timeLimit = 120;
    else if (difficulty === 'hard') timeLimit = 60;

    document.getElementById('player-name').textContent = nickname;
    playerForm.style.display = 'none';
    gameContainer.style.display = 'block';

    startGame();
});

// Старт гри
function startGame() {
    resetGame();
    generateBoard();
    startTimer();
    moves = 0;
    updateMoves();

    resetGameBtn.style.display = 'block';
    viewStatsBtn.style.display = 'block';
}

// Генерація ігрового поля
function generateBoard() {
    const cards = [];
    const totalCards = gridSize * gridSize;
    const cardValues = [];

    for (let i = 1; i <= totalCards / 2; i++) {
        cardValues.push(String.fromCharCode(65 + i - 1));  // Використовуємо літери від A до Z
        cardValues.push(String.fromCharCode(65 + i - 1));  // Повторюємо кожну літеру
    }

    cardValues.sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = 'card-' + i;
        card.textContent = '';  // Спочатку картка порожня
        card.addEventListener('click', flipCard);
        cards.push(card);
    }

    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameBoard.innerHTML = '';
    cards.forEach(card => gameBoard.appendChild(card));
}

// Перевернути картку
let flippedCards = [];
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.textContent || String.fromCharCode(65 + (Math.random() * 26 | 0));  // Випадковий символ
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Перевірка на пару
function checkForMatch() {
    moves++;
    updateMoves();

    const [firstCard, secondCard] = flippedCards;

    if (firstCard.textContent === secondCard.textContent) {
        flippedCards = [];
        checkIfGameFinished();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';  // Скидаємо текст
            secondCard.textContent = '';  // Скидаємо текст
            flippedCards = [];
        }, 1000);
    }
}

// Оновлення кількості рухів
function updateMoves() {
    movesDisplay.textContent = 'Кількість ходів: ' + moves;
}

// Перевірка завершення гри
function checkIfGameFinished() {
    const allCards = document.querySelectorAll('.card');
    const flippedCards = document.querySelectorAll('.card.flipped');

    if (allCards.length === flippedCards.length) {
        endGame();
    }
}

// Завершення гри
function endGame() {
    clearInterval(timerInterval);
    alert(`Вітаємо! Ви виграли! Кількість ходів: ${moves}, час: ${timeLimit - remainingTime} секунд`);
    saveStats();
}

// Секундомір
let remainingTime = timeLimit;
function startTimer() {
    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            timerDisplay.textContent = `Час: ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`;
        } else {
            endGame();
        }
    }, 1000);
}

// Скидання гри
function resetGame() {
    clearInterval(timerInterval);
    remainingTime = timeLimit;
    timerDisplay.textContent = `Час: ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`;
    moves = 0;
    updateMoves();
    flippedCards = [];
    gameBoard.innerHTML = '';
    playerForm.style.display = 'block';
    gameContainer.style.display = 'none';
}

// Збереження результатів гри
function saveStats() {
    const playerStats = {
        nickname,
        difficulty,
        time: timeLimit - remainingTime,
        moves,
        gridSize
    };

    stats.push(playerStats);
}

// Перегляд статистики
viewStatsBtn.addEventListener('click', () => {
    statsContainer.style.display = 'block';
    statsList.innerHTML = stats.map(stat => 
        `<li>${stat.nickname}: ${stat.difficulty}, Час: ${stat.time} сек, Ходи: ${stat.moves}, Розмір: ${stat.gridSize}x${stat.gridSize}</li>`
    ).join('');
});

// Закрити статистику
closeStatsBtn.addEventListener('click', () => {
    statsContainer.style.display = 'none';
    playerForm.style.display = 'block';
});

resetGameBtn.addEventListener('click', resetGame);
