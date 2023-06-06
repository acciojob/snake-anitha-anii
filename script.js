//your code here
document.addEventListener("DOMContentLoaded", function() {
  const gameContainer = document.getElementById("gameContainer");
  const scoreDisplay = document.getElementById("score");
  const width = 10; // Number of pixels per row
  let squares = [];
  let currentSnake = [2, 1, 0]; // Snake's body positions
  let direction = 1; // Starting direction (right)
  let score = 0;
  let intervalTime = 100; // Snake speed in ms
  let interval = 0;
  let foodIndex = 0;

  // Create the game grid
  function createGrid() {
    for (let i = 0; i < width * width; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.setAttribute("id", `pixel${i}`);
      gameContainer.appendChild(pixel);
      squares.push(pixel);
    }
  }
  createGrid();

  // Start and move the snake
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove("snakeBodyPixel"));
    squares[foodIndex].classList.remove("food");
    clearInterval(interval);
    currentSnake = [2, 1, 0];
    score = 0;
    direction = 1;
    intervalTime = 100;
    generateFood();
    scoreDisplay.textContent = score;
    interval = setInterval(move, intervalTime);
  }

// Move the snake
function move() {
  const head = currentSnake[0];
  let newHead;

  if (direction === 1) {
    // Move right
    if ((head + 1) % width === 0) {
      newHead = head - width + 1; // Wrap around to the same row
    } else {
      newHead = head + 1;
    }
  } else if (direction === -1) {
    // Move left
    if (head % width === 0) {
      newHead = head + width - 1; // Wrap around to the same row
    } else {
      newHead = head - 1;
    }
  } else if (direction === width) {
    // Move down
    newHead = (head + width) % (width * width);
  } else if (direction === -width) {
    // Move up
    newHead = (head - width + (width * width)) % (width * width);
  }

  if (
    squares[newHead].classList.contains("snakeBodyPixel") || // Hits itself
    squares[newHead].classList.contains("wallPixel") // Hits wall
  ) {
    return clearInterval(interval);
  }

  const tail = currentSnake.pop();
  squares[tail].classList.remove("snakeBodyPixel");
  squares[newHead].classList.add("snakeBodyPixel");
  currentSnake.unshift(newHead);

  if (squares[newHead].classList.contains("food")) {
    // Snake eats food
    squares[newHead].classList.remove("food");
    currentSnake.push(tail);
    generateFood();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime *= 0.9; // Increase snake speed
    interval = setInterval(move, intervalTime);
  }
}


	
  function generateFood() {
    do {
      foodIndex = Math.floor(Math.random() * squares.length);
    } while (squares[foodIndex].classList.contains("snakeBodyPixel"));
    squares[foodIndex].classList.add("food");
  }

  // Control the snake's direction with arrow keys
  function control(e) {
    if (e.key === "ArrowRight" && direction !== -1) {
      direction = 1;
    } else if (e.key === "ArrowUp" && direction !== width) {
      direction = -width;
    } else if (e.key === "ArrowLeft" && direction !== 1) {
      direction = -1;
    } else if (e.key === "ArrowDown" && direction !== -width) {
      direction = width;
    }
  }
  document.addEventListener("keydown", control);

  // Start the game
  startGame();

});


describe("Snake Game Test", () => {
  const baseUrl = "http://localhost:3000"; // Replace with your game URL

 
	   it("should move the snake up", () => {
                let snake_col, snake_row;
                cy.visit(baseUrl + "/main.html");

                cy.get('.snakeBodyPixel').then(e => {
                    for (let index = 0; index < 1; index++) {
                        const element = e[index];
                        snake_col = parseInt(element.id.substr(5, 30)) % 40;
                        snake_row = parseInt(parseInt(element.id.substr(5, 30)) / 40);
                        console.log(snake_row, snake_col, "snake");
                    }
                });

                cy.get('body').type('{uparrow}');
                cy.wait(100);

                cy.get('.snakeBodyPixel').then(e => {
                    for (let index = 0; index < e.length; index++) {
                        const element = e[index];
                        snake_col = parseInt(element.id.substr(5, 30)) % 40;
                        snake_row = parseInt(parseInt(element.id.substr(5, 30)) / 40);
                        console.log(snake_row, snake_col, "snake");
                    }
                    if (snake_row === 18) {
                        expect(true).to.be.true;
                    } else {
                        expect(false).to.be.true;
                    }
                });
            });
        });
  