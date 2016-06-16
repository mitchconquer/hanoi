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
