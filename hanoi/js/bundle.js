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

	"use strict";
	
	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);
	
	$(() => {
	  console.log('Document is ready!');
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	}
	
	Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];
	
	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	};
	
	Game.prototype.isWon = function(){
	    // move all the discs to the last or second tower
	    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	
	Game.prototype.move = function(startTowerIdx, endTowerIdx) {
	    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	      return true;
	    } else {
	      return false;
	    }
	};
	
	
	Game.prototype.print = function(){
	    console.log(JSON.stringify(this.towers));
	};
	
	
	Game.prototype.promptMove = function(reader, callback) {
	    this.print();
	    reader.question("Enter a starting tower: ", start => {
	      const startTowerIdx = parseInt(start);
	      reader.question("Enter an ending tower: ", end => {
	        const endTowerIdx = parseInt(end);
	        callback(startTowerIdx, endTowerIdx);
	      });
	    });
	};
	
	Game.prototype.run = function(reader, gameCompletionCallback) {
	    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	      if (!this.move(startTowerIdx, endTowerIdx)) {
	        console.log("Invalid move!");
	      }
	
	      if (!this.isWon()) {
	        // Continue to play!
	        this.run(reader, gameCompletionCallback);
	      } else {
	        this.print();
	        console.log("You win!");
	        gameCompletionCallback();
	      }
	    });
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function HanoiView(game, gameSpace) {
	  this.game = game;
	  this.gameSpace = gameSpace;
	  this.render();
	  this.currentTower;
	}
	
	HanoiView.prototype.render = function () {
	  $(this.gameSpace).children().remove();
	  for (let i = 0; i < 3; i++) {
	    let $uList = $("<ul class='tower-" + i + "'></ul>");
	    this.game.towers[i].forEach(el => {
	      let $li = $("<li class='disc-" + el + "'></li>");
	      $li.css("width", el * 75);
	      $uList.prepend($li);
	    });
	    this.gameSpace.append($uList);
	  }
	
	  $('ul').on("click", event => {
	    event.preventDefault();
	    this.clickTower(event); });
	};
	
	HanoiView.prototype.clickTower = function(event) {
	  if (this.currentTower) {
	    let startIndex = this.currentTower.slice(-1);
	    let endIndex = $(event.currentTarget).attr("class").slice(-1);
	    this.handleMoveResult(this.game.move(startIndex, endIndex));
	    this.clearTower();
	  } else {
	    this.currentTower = $(event.currentTarget).attr("class");
	    $(event.currentTarget).addClass("active");
	  }
	};
	
	HanoiView.prototype.handleMoveResult = function (result) {
	  console.log("heree");
	  if (result) {
	    // debugger;
	    this.render();
	    this.clearTower();
	    if (this.game.isWon()) {
	      alert("You win!");
	    }
	  } else {
	    this.clearTower();
	    alert("Not a valid move!");
	  }
	};
	
	HanoiView.prototype.clearTower = function () {
	  $("." + this.currentTower).removeClass("active");
	  this.currentTower = undefined;
	};
	
	
	module.exports = HanoiView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map