// Game is a class. This is a constructor method.
var Game = function(gameName, startingCredit){
	this.gameName = gameName,
	this.startingCredit = startingCredit
};

Game.prototype.startGame = function() {
	console.log("Welcome to " + this.gameName + "!. ");
	// display game instructions TODO
};

Game.prototype.endGame = function() {
	console.log("Game over!");
};

var hitorbust = new Game(data.gameName, data.startingCredit);