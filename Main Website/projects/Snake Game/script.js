
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const box = 30;//chnange this number to make snake bigger or smaller
    const bgMusic = document.getElementById("bgMusic");

    let snake, dx, dy, score = 0;
    let food = [];
    let game, isPaused = false;
    let gameSpeed = 160;
    bgMusic.volume = 0.5;

    const eatSound = document.getElementById("eatSound");
    const gameOverSound = document.getElementById("gameOverSound");

    function restartGame() {
      snake = [
        { x: 5 * box, y: 5 * box },
        { x: 4 * box, y: 5 * box },
        { x: 3 * box, y: 5 * box }
      ];
      dx = box;
      dy = 0;
      score = 0;
      updateScore();
      generateFoods();
      document.getElementById("gameOverBox").style.display = "none";
      clearInterval(game);
      game = setInterval(gameLoop, gameSpeed);
    }

    function startGame() {
      document.getElementById("bgMusic").play();
      restartGame();  // start your game here
    }

    function generateFoods() {
      food = [];
      for (let i = 0; i < 3; i++) { // change the i value for the numver of food
        food.push({
          x: Math.floor(Math.random() * (canvas.width / box)) * box,
          y: Math.floor(Math.random() * (canvas.height / box)) * box
        });
      }
    }

    function updateScore() {
      document.getElementById("score_display").textContent = score;
    }

    function startMusic() {
      bgMusic.play();
    }

    function stopMusic() {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
      else if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
      else if (e.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
      else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
      else if (e.key === "p" || e.key === "P") { isPaused = !isPaused; }
    });

    function drawSnake() {
      snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#FFD700" : "#32CD32"; // Head gold, body green
        ctx.fillRect(part.x, part.y, box, box);
      });
    }

    function drawFood() {
      ctx.fillStyle = "red";
      food.forEach(f => {
        ctx.fillRect(f.x, f.y, box, box);
      });
    }

    function moveSnake() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Eat food logic
      let ateFood = false;
      food.forEach((f, index) => {
        if (head.x === f.x && head.y === f.y) {
          score++;
          updateScore();
          eatSound.play();
          food.splice(index, 1);
          generateFoods();
          ateFood = true;
        }
      });

      if (!ateFood) {
        snake.pop();
      }
      snake.unshift(head);
    }

    function checkCollision() {
      const head = snake[0];
      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height)
        return true;
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
      }
      return false;
    }

    function gameLoop() {
      if (isPaused) return;

      if (checkCollision()) {
        clearInterval(game);
        document.getElementById("finalScore").textContent = score;
        document.getElementById("gameOverBox").style.display = "block";
        gameOverSound.play();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFood();
      moveSnake();
      drawSnake();
    }

    document.getElementById("difficulty").addEventListener("change", function () {
      const selected = this.value;
      if (selected === "easy") gameSpeed = 200;
      else if (selected === "medium") gameSpeed = 120;
      else if (selected === "hard") gameSpeed = 60;
      else if (selected === "extreme") gameSpeed = 30;
      clearInterval(game);
      game = setInterval(gameLoop, gameSpeed);
    });

    restartGame();
  