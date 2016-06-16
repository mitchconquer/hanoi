function Apple(gridSize) {
  this.x = this.getRandomCoord(0, gridSize - 1);
  this.y = this.getRandomCoord(0, gridSize - 1);
}

Apple.prototype.getRandomCoord = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

module.exports = Apple;
