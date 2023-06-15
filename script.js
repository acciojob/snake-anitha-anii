document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");
  const gridSize = 10; // Number of rows and columns in the grid
  const pixelSize = 40;
  const snakeSpeed = 100;

  let snake = [
    { row: 2, col: 5 },
    { row: 2, col: 4 },
    { row: 2, col: 3 }
  ];
  let direction = "right";
  let food = { row: 5, col: 7 };
  let score = 0;

  function createPixel(id, className) {
    const pixel = document.createElement("div");
    pixel.id = `pixel${id}`;
    pixel.className = className;
    return pixel;
  }

  function draw() {
    // Clear the game container
    gameContainer.innerHTML = "";

    // Draw the grid
    for (let row = 1; row <= gridSize; row++) {
      for (let col = 1; col <= gridSize; col++) {
        const gridPixel = createPixel(`${row}-${col}`, "pixel");
        gameContainer.appendChild(gridPixel);
      }
    }

    // Draw the snake
    snake.forEach((pixel, index) => {
      const snakePixel = createPixel(index, "snakeBodyPixel");
      snakePixel.style.top = `${(pixel.row - 1) * pixelSize}px`;
      snakePixel.style.left = `${(pixel.col - 1) * pixelSize}px`;
      gameContainer.appendChild(snakePixel);
    });

    // Draw the food
    const foodPixel = createPixel("food", "food");
    foodPixel.style.top = `${(food.row - 1) * pixelSize}px`;
    foodPixel.style.left = `${(food.col - 1) * pixelSize}px`;
    gameContainer.appendChild(foodPixel);

    // Update the score
    scoreElement.textContent = score;
  }

  function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "right") {
      head.col++;
    } else if (direction === "left") {
      head.col--;
    } else if (direction === "up") {
      head.row--;
    } else if (direction === "down") {
      head.row++;
    }

    snake.unshift(head);

    if (head.row === food.row && head.col === food.col) {
      score++;
      generateFood();
    } else {
      snake.pop();
    }

    if (head.row < 1 || head.row > gridSize || head.col < 1 || head.col > gridSize) {
      gameOver();
    }

    draw();
  }

  function changeDirection(event) {
    const key = event.keyCode;
    const leftKey = 37;
    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;

    if (key === leftKey && direction !== "right") {
      direction = "left";
    } else if (key === upKey && direction !== "down") {
      direction = "up";
    } else if (key === rightKey && direction !== "left") {
      direction = "right";
    } else if (key === downKey && direction !== "up") {
      direction = "down";
    }
  }

  function generateFood() {
    food = {
      row: Math.floor(Math.random() * gridSize) + 1,
      col: Math.floor(Math.random() * gridSize) + 1
    };

    snake.forEach(pixel => {
      if (pixel.row === food.row && pixel.col === food.col) {
        generateFood();
      }
    });
  }

  function gameOver() {
    clearInterval(gameInterval);
    alert("Game Over!");
  }

  document.addEventListener("keydown", changeDirection);
  generateFood();
  draw();
  const gameInterval = setInterval(moveSnake, snakeSpeed);
});
