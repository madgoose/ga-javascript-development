// new Game constructor
var Game = function(gameName, instructions){
	this.gameName = gameName;
	this.instructions = instructions;
};

// display game name and instructions
Game.prototype.introduceGame = function() {
	console.log("Welcome to " + this.gameName + "!\n" + this.instructions);
};

// display game end message
Game.prototype.endGame = function() {
	console.log("Game over!\nBad luck +playerNameToBeAddedLater+");
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

// populate newCards array with data from external JSON
// i.e. deal a new hand
Game.prototype.setNewCards = function() {
	
	// populate new array with 
	this.newCards = gameData.cards.map(function(arrayItem){
		this.value = arrayItem.value;
		this.suite = arrayItem.suite;
		this.symbol = arrayItem.symbol;
		return arrayItem;
	});

	return this.newCards;
};

// get credits
Game.prototype.getNewCards = function(){
	return this.newCards;
};


// construct new Game instance, assign to local variable hitorbust
var hitorbust = new Game(gameData.gameName, gameData.instructions);

// newCredits value will eventually be taken from text input on game interface
hitorbust.setCredits(gameData.startingCredit);
hitorbust.setNewCards();
