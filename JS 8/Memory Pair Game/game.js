const startForm = document.getElementById('settings-form');
const resetBtn = document.getElementById('reset-settings');
const welcomeScreen = document.getElementById('settings-screen');
const gameScreen = document.getElementById('game-screen');
const statsScreen = document.getElementById('stats-screen');
const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const playerNameDisplay = document.getElementById('player-name-display');
const restartBtn = document.getElementById('restart-btn');
const statsList = document.getElementById('stats-list');
const backToGameBtn = document.getElementById('back-to-game');
let cards = [];
let flippedCards = [];
let moves = 0;
let timer = 0;
let gameInterval;
let playerName = '';
let gameSize = '4x4';
let difficulty = 'easy';
let stats = [];

startForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playerName = document.getElementById('player-name-1').value;
    gameSize = document.getElementById('board-size').value;
    difficulty = document.getElementById('difficulty').value;
    playerNameDisplay.textContent = playerName;
    welcomeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    startGame();
});

resetBtn.addEventListener('click', () => {
    document.getElementById('player-name-1').value = '';
    document.getElementById('board-size').value = '4x4';
    document.getElementById('difficulty').value = 'easy';
});

restartBtn.addEventListener('click', startGame);

function startGame() {
    resetGame();
    createBoard();
    startTimer();
}

function resetGame() {
    moves = 0;
    flippedCards = [];
    cards = [];
    movesDisplay.textContent = moves;
    timer = 0;
    timerDisplay.textContent = timer;
    clearInterval(gameInterval);
}

function createBoard() {
    const size = parseInt(gameSize.split('x')[0]);
    const totalCards = size * size;
    const cardValues = [];
    for (let i = 0; i < totalCards / 2; i++) {
        cardValues.push(String.fromCharCode(65 + i), String.fromCharCode(65 + i)); // A, B, C, etc.
    }
    cardValues.sort(() => Math.random() - 0.5);

    gameBoard.style.gridTemplateColumns = `repeat(${size}, 100px)`;

    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.textContent = '';
        card.addEventListener('click', () => flipCard(card, value));
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard(card, value) {
    if (flippedCards.length === 2 || card.textContent !== '') return;
    card.textContent = value;
    flippedCards.push({ card, value });
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    if (flippedCards[0].value === flippedCards[1].value) {
        flippedCards = [];
        if (cards.every(card => card.textContent !== '')) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            flippedCards[0].card.textContent = '';
            flippedCards[1].card.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    let timeLimit = 180; // Default for "easy"
    if (difficulty === 'normal') timeLimit = 120;
    if (difficulty === 'hard') timeLimit = 60;

    gameInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
        if (timer >= timeLimit) {
            endGame(false);
        }
    }, 1000);
}

function endGame(won) {
    clearInterval(gameInterval);
    alert(won ? 'Вітаємо, ви виграли!' : 'Час вийшов! Ви програли!');
    stats.push({
        player: playerName,
        moves: moves,
        time: timer,
        boardSize: gameSize,
    });
    gameScreen.style.display = 'none';
    statsScreen.style.display = 'block';
    displayStats();
}

function displayStats() {
    statsList.innerHTML = '';
    stats.forEach(stat => {
        const li = document.createElement('li');
        li.textContent = `${stat.player} - Розмір поля: ${stat.boardSize}, Ходи: ${stat.moves}, Час: ${stat.time} секунд`;
        statsList.appendChild(li);
    });
}

backToGameBtn.addEventListener('click', () => {
    statsScreen.style.display = 'none';
    welcomeScreen.style.display = 'block';
});
