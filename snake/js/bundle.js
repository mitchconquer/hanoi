/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(1);
	const SnakeView = __webpack_require__(5);
	$(() => {
	  console.log("Document is ready!");
	  const rootEl = $('.snake-game');
	  const board = new Board();
	  new SnakeView(board, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(2);
	const Apple = __webpack_require__(4);
	
	
	function Board(options = {}) {
	  let s = new Snake();
	  this.snake = s;
	  this.apples = [];
	  this.speed = 150;
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
	      if (this.speed >= 75) {
	        this.speed -= 25;
	      }
	    }
	  }
	  return false;
	};
	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(3);
	
	function Snake() {
	  this.direction = "N";
	  this.segments = [new Coord(10, 10)];
	  this.ateApple = false;
	}
	
	Snake.prototype.head = function () {
	  return this.segments[0];
	};
	
	Snake.prototype.move = function () {
	  this.addToFront();
	  if (!this.ateApple) {
	    this.segments.pop();
	  } else {
	    this.ateApple = false;
	  }
	};
	
	Snake.prototype.selfCollision = function () {
	  for (let i = 1; i < this.segments.length; i++) {
	    if (this.segments[i].x === this.head().x && this.segments[i].y === this.head().y) {
	      return true;
	    }
	  }
	  return false;
	};
	
	Snake.prototype.addToFront = function() {
	  let head = this.segments[0];
	  this.segments.unshift(new Coord(head.x + this.deltaX(),
	      head.y + this.deltaY()));
	};
	
	
	
	
	Snake.prototype.isOpposite = function(direction) {
	  switch (direction) {
	    case "N":
	      if (this.direction === "S") {
	        return true;
	      }
	      return false;
	    case "W":
	      if (this.direction === "E") {
	        return true;
	      }
	      return false;
	    case "S":
	      if (this.direction === "N") {
	        return true;
	      }
	      return false;
	    case "E":
	      if (this.direction === "W") {
	        return true;
	      }
	      return false;
	    default:
	      return false;
	  }
	};
	Snake.prototype.deltaX = function() {
	  switch (this.direction) {
	    case "E":
	      return 1;
	    case "W":
	      return -1;
	    default:
	      return 0;
	  }
	};
	
	
	Snake.prototype.deltaY = function() {
	  switch (this.direction) {
	    case "N":
	      return -1;
	    case "S":
	      return 1;
	    default:
	      return 0;
	  }
	};
	
	Snake.prototype.isClear = function (apple) {
	  for (let i = 0; i < this.segments.length; i++) {
	    if (this.segments[i].x === apple.x && this.segments[i].y === apple.y) {
	      return false;
	    }
	  }
	  return true;
	};
	module.exports = Snake;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Coord(x, y) {
	 this.x = x;
	 this.y = y;
	}
	
	module.exports = Coord;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function Apple(gridSize) {
	  this.x = this.getRandomCoord(0, gridSize - 1);
	  this.y = this.getRandomCoord(0, gridSize - 1);
	}
	
	Apple.prototype.getRandomCoord = function (min, max) {
	  return Math.round(Math.random() * (max - min) + min);
	};
	
	module.exports = Apple;


/***/ },
/* 5 */
/***/ function(module, exports) {

	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map