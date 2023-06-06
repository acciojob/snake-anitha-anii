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
        if (
            (currentSnake[0] + width >= width * width && direction === width) || // Hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // Hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // Hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // Hits top
            squares[currentSnake[0] + direction].classList.contains("snakeBodyPixel") // Hits itself
        ) {
            return clearInterval(interval);
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove("snakeBodyPixel");
        currentSnake.unshift(currentSnake[0] + direction);

        if (squares[currentSnake[0]].classList.contains("food")) {
            squares[currentSnake[0]].classList.remove("food");
            squares[tail].classList.add("snakeBodyPixel");
            currentSnake.push(tail);
            generateFood();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime *= 0.9; // Increase snake speed
            interval = setInterval(move, intervalTime);
        }

        squares[currentSnake[0]].classList.add("snakeBodyPixel");
    }

    // Generate new food at a random position
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
