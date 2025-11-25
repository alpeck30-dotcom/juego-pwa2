const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let player = { x: 150, y: 450, size: 20 };
let obstacles = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
  ctx.fillStyle = "#00ffea";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
    obs.y += 3;
  });
}

function spawnObstacle() {
  const size = 20;
  const x = Math.random() * (300 - size);
  obstacles.push({ x, y: 0, size });
}

function detectCollision() {
  obstacles.forEach(obs => {
    if (
      player.x < obs.x + obs.size &&
      player.x + player.size > obs.x &&
      player.y < obs.y + obs.size &&
      player.y + player.size > obs.y
    ) {
      gameOver = true;
    }
  });
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Puntos: " + score, 10, 25);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", 70, 250);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawObstacles();
  drawScore();
  detectCollision();

  if (Math.random() < 0.02) spawnObstacle();
  score++;

  requestAnimationFrame(gameLoop);
}

document.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left - player.size / 2;
});

document.getElementById("startBtn").addEventListener("click", () => {
  if (!gameOver) gameLoop();
});
