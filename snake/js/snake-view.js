
function SnakeView(board, gameSpace) {
  this.board = board;
  this.gameSpace = gameSpace;
  this.render();
  this.finished = false;
  $(document).on("keydown", this.keydownCallback.bind(this));
  this.renderBoard();
  this.step();
}

SnakeView.prototype.getSpeed = function () {
  return this.board.speed;
};

SnakeView.prototype.keydownCallback = function (event) {
  let direction = event.keyCode;
  switch (direction) {
    case 37:
      if (!this.board.snake.isOpposite("W")) {
        this.board.snake.direction = "W";
        break;
      } else {
        break;
      }
    case 38:
      if (!this.board.snake.isOpposite("N")) {
        this.board.snake.direction = "N";
        break;
      } else {
        break;
      }
    case 39:
      if (!this.board.snake.isOpposite("E")) {
        this.board.snake.direction = "E";
        break;
      } else {
        break;
      }
    case 40:
      if (!this.board.snake.isOpposite("S")) {
        this.board.snake.direction = "S";
        break;
      } else {
        break;
      }
    default:
      break;
  }
};

SnakeView.prototype.render = function () {
  if (this.board.checkCollisions()) {
    this.gameOver();
  }
  this.clearBoard();
  this.renderSnake();
  this.renderApples();
  this.renderScore();
};

SnakeView.prototype.renderScore = function () {
  console.log(this.board.score);
  $('h2').text(this.board.score);
};

SnakeView.prototype.gameOver = function () {
  $('h1').text("Game Over!");
  this.finished = true;
};

SnakeView.prototype.clearBoard = function () {
  $(this.gameSpace).children().each(function() {
    $(this).children().removeClass();
  });
};

SnakeView.prototype.renderApples = function () {
  this.board.apples.forEach(apple => {
    let row = $('ul')[apple.y];
    let square = $(row).children()[apple.x];
    $(square).addClass("apple");
  });
};

SnakeView.prototype.renderBoard = function () {
  for (let i = 0; i < this.board.gridSize; i++) {
    let $uList = $("<ul></ul>");
    for (let j = 0; j < this.board.grid[i].length; j++) {
      let $li = $("<li></li>");

      $uList.append($li);
    }
    this.gameSpace.append($uList);
  }
};

SnakeView.prototype.renderSnake = function () {
  this.board.snake.segments.forEach(coord => {
    let row = $('ul')[coord.y];
    let square = $(row).children()[coord.x];
    $(square).addClass("snake");
  });
};

SnakeView.prototype.step = function () {
  if (!this.finished) {
    setTimeout(this.step.bind(this), this.getSpeed());
  }
  this.board.snake.move();
  this.render();
};

module.exports = SnakeView;
