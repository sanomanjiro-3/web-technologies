const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const startBtn = document.getElementById('start-game');
const resetBtn = document.getElementById('reset-settings');
const statsBtn = document.getElementById('show-stats');
const nameInput = document.getElementById('player-name');
const gridSizeSelect = document.getElementById('grid-size');
const difficultySelect = document.getElementById('difficulty');

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let timer;
let countdown;
let timeLimit = 180;
let stats = JSON.parse(localStorage.getItem('memoryStats')) || [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCards(size) {
  const totalCards = size * size;
  const pairs = totalCards / 2;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const selected = shuffle(alphabet.split('')).slice(0, pairs);
  const letters = shuffle([...selected, ...selected]);
  return letters.map(letter => createCardElement(letter));
}

function createCardElement(letter) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="back"></div>
    <div class="front">${letter}</div>
  `;
  card.dataset.letter = letter;
  card.addEventListener('click', handleCardClick);
  return card;
}

function handleCardClick() {
  if (lockBoard || this.classList.contains('flip')) return;
  this.classList.add('flip');
  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  updateMoves();

  if (firstCard.dataset.letter === secondCard.dataset.letter) {
    disableCards();
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(unflipCards, 1000);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  resetBoard();
}

function unflipCards() {
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  resetBoard();
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function updateMoves() {
  movesDisplay.textContent = `Ходи: ${moves}`;
}

function updateTimer() {
  const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
  const seconds = (countdown % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `Час: ${minutes}:${seconds}`;
  if (countdown === 0) {
    clearInterval(timer);
    lockBoard = true;
    resultDisplay.textContent = 'Час вичерпано!';
  }
  countdown--;
}

function startTimer(limit) {
  clearInterval(timer);
  countdown = limit;
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function checkWin() {
  const flipped = document.querySelectorAll('.card.flip');
  if (flipped.length === cards.length) {
    clearInterval(timer);
    const timeTaken = timeLimit - countdown;
    resultDisplay.textContent = `Вітаємо, ${nameInput.value}! Гру завершено за ${moves} ходів та ${timeTaken} секунд.`;
    stats.push({
      name: nameInput.value,
      grid: gridSizeSelect.value,
      moves,
      time: timeTaken
    });
    localStorage.setItem('memoryStats', JSON.stringify(stats));
  }
}

function setupBoard() {
  const name = nameInput.value.trim();
  if (!name) {
    alert('Введіть ім’я гравця!');
    return;
  }

  board.innerHTML = '';
  moves = 0;
  updateMoves();
  resultDisplay.textContent = '';
  const size = parseInt(gridSizeSelect.value.split('x')[0]);
  const difficulty = difficultySelect.value;
  timeLimit = difficulty === 'easy' ? 180 : difficulty === 'normal' ? 120 : 60;

  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  cards = createCards(size);
  cards.forEach(card => {
    card.style.margin = '10px';
    board.appendChild(card);
  });

  startTimer(timeLimit);
}


function resetSettings() {
  nameInput.value = '';
  gridSizeSelect.value = '4x4';
  difficultySelect.value = 'easy';
}

function showStats() {
  const log = stats.map(s => `${s.name} — ${s.grid}, ${s.moves} ходів, ${s.time} с`).join('\n');
  alert(log || 'Статистики ще немає.');
}

startBtn.addEventListener('click', setupBoard);
resetBtn.addEventListener('click', resetSettings);
restartBtn.addEventListener('click', setupBoard);
statsBtn.addEventListener('click', showStats);
