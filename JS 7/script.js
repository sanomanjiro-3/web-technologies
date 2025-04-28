const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreEl = document.getElementById('score');
const collectSound = document.getElementById('collect-sound');
const gameoverSound = document.getElementById('gameover-sound');

let gameRunning = false;
let score = 0;
let hero, enemies, bonuses, gameLoopId;

const heroImg = new Image();
heroImg.src = 'img/hero.png';

const enemyImg = new Image();
enemyImg.src = 'img/enemy.png';

const bonusImg = new Image();
bonusImg.src = 'img/bonus.png';

// Об'єкти гри
class GameObject {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.speed = Math.random() * 2 + 1;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
    }
  }

  reset() {
    this.x = Math.random() * (canvas.width - this.width);
    this.y = -this.height;
  }
}

// Головний герой
function createHero() {
  return {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 50,
    speed: 7,
    dx: 0,
    draw() {
      ctx.drawImage(heroImg, this.x, this.y, this.width, this.height);
    },
    move() {
      this.x += this.dx;
      if (this.x < 0) this.x = 0;
      if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    }
  };
}

function spawnEnemies(count) {
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push(new GameObject(Math.random() * (canvas.width - 50), Math.random() * -canvas.height, 50, 50, enemyImg));
  }
  return list;
}

function spawnBonuses(count) {
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push(new GameObject(Math.random() * (canvas.width - 30), Math.random() * -canvas.height, 30, 30, bonusImg));
  }
  return list;
}

function detectCollision(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.height + obj1.y > obj2.y;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hero.move();
  hero.draw();

  enemies.forEach(enemy => {
    enemy.move();
    enemy.draw();
    if (detectCollision(hero, enemy)) {
      endGame();
    }
  });

  bonuses.forEach(bonus => {
    bonus.move();
    bonus.draw();
    if (detectCollision(hero, bonus)) {
      score += 10;
      updateScore();
      collectSound.play();
      bonus.reset();
    }
  });

  if (gameRunning) {
    gameLoopId = requestAnimationFrame(update);
  }
}

function startGame() {
  if (!gameRunning) {
    hero = createHero();
    enemies = spawnEnemies(5);
    bonuses = spawnBonuses(3);
    gameRunning = true;
    update();
  }
}

function pauseGame() {
  if (gameRunning) {
    gameRunning = false;
    cancelAnimationFrame(gameLoopId);
  }
}

function restartGame() {
  pauseGame();
  score = 0;
  updateScore();
  startGame();
}

function updateScore() {
  scoreEl.innerText = `Очки: ${score}`;
}

function endGame() {
  gameRunning = false;
  cancelAnimationFrame(gameLoopId);
  gameoverSound.play();
  alert('Гру закінчено! Ваш рахунок: ' + score);
}

function keyDownHandler(e) {
  if (e.key === 'ArrowLeft') {
    hero.dx = -hero.speed;
  } else if (e.key === 'ArrowRight') {
    hero.dx = hero.speed;
  }
}

function keyUpHandler(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    hero.dx = 0;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
restartBtn.addEventListener('click', restartGame);
