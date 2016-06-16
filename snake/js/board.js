const Snake = require('./snake.js');
const Apple = require('./apple.js');


function Board(options = {}) {
  let s = new Snake();
  this.snake = s;
  this.apples = [];
  this.speed = 25;
  this.gridSize = options.gridSize || 50;
  this.grid = this.createBoard();
  this.addApple();
}

Board.prototype.createBoard = function() {
  let board = [];
  for (let i = 0; i < this.gridSize; i++) {
    let row = [];
    for (let j = 0; j < this.gridSize; j++) {
      row.push([]);
    }
    board.push(row);
  }
  return board;
};

Board.prototype.addApple = function () {
  let validPosition = false;
  while (!validPosition) {
    let apple = new Apple(this.gridSize);
    if (this.snake.isClear(apple)) {
      validPosition = true;
      this.apples.push(apple);
    }
  }
};


Board.prototype.checkCollisions = function() {
  // If any of these expressions return true, the whole expression
  // is true.
  this.appleCollision();
  return this.snakeCollision() || this.wallCollision();
};

Board.prototype.snakeCollision = function () {
  return this.snake.selfCollision();
};


Board.prototype.wallCollision = function () {
  if (this.snake.head().x < 0 || this.snake.head().x >= this.gridSize) {
    return true;
  } else if (this.snake.head().y < 0 || this.snake.head().y >= this.gridSize) {
    return true;
  } else {
    return false;
  }
};

Board.prototype.appleCollision = function () {
  for (let i = 0; i < this.apples.length; i++) {
    if (this.snake.head().x === this.apples[i].x && this.snake.head().y === this.apples[i].y) {
      // this.snake.addTo();
      this.snake.ateApple = true;
      this.apples.splice(i, 1);
      this.addApple();
      // if (this.speed >= 75) {
      this.speed -= 25;
      console.log(this.speed);
      // }
    }
  }
  return false;
};
module.exports = Board;
