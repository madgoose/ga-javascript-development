var Game = function(gameName, instructions){
	this.gameName = gameName,
	this.instructions = instructions
};

Game.prototype.introduceGame = function() {
	console.log("Welcome to " + this.gameName + "!\n" + this.instructions);
};

Game.prototype.endGame = function() {
	console.log("Game over!");
};

// set credits
Game.prototype.setCredits = function(newCredits){
	if (newCredits < 0){
		console.log("No scratch, no snatch. Come back with some credits");
	} else if (newCredits > 500) {
		console.log("House limit is 500 credits, sorry");
	} else {
		this.credits = newCredits;
	}
};
// get credits
Game.prototype.getCredits = function(){
	return this.credits;
};

var hitorbust = new Game(gameData.gameName, gameData.instructions);

// newCredits value will eventually be taken from text input on game interface
hitorbust.setCredits(gameData.startingCredit);