const Board = require('./board.js');
const SnakeView = require('./snake-view.js');
$(() => {
  console.log("Document is ready!");
  const rootEl = $('.snake-game');
  const board = new Board();
  new SnakeView(board, rootEl);
});
