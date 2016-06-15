"use strict";

const HanoiGame = require('./game.js');
const HanoiView = require('./hanoi-view.js');

$(() => {
  console.log('Document is ready!');
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
