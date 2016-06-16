const Coord = require('./coord.js');

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

Snake.prototype.addToBack = function () {

}


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
