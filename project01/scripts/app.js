/*
 * Game class
 */

// constructor
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
Game.prototype.setNewCards = function(newCards) {

	// assign card collection from external JSON to local variable
	this.newCards = newCards;
	// initialise/declare local empty array variable for card collection
	this.dealersHand = [];
	// sublime text 3 syntax helper, revised for loop
	// http://stackoverflow.com/questions/17484227/javascript-improved-native-for-loop
	// iterate over cards array
	for (var i = newCards.length - 1; i >= 0; i--) {
		// new Card constructor
		this.card = new Card(newCards[i].value, newCards[i].suite, newCards[i].symbol);
		this.dealersHand.push(this.card);
	}

};

// get credits
Game.prototype.getNewCards = function(){
	return this.dealersHand;
};

/*
 * Card class
 */

// constructor
var Card = function(cardvalue, cardSuite, cardSymbol){
	this.cardvalue = cardvalue;
	this.cardSuite = cardSuite;
	this.cardSymbol = cardSymbol;
};

// construct new Game instance, assign to local variable hitorbust
var hitorbust = new Game(gameData.gameName, gameData.instructions);

// newCredits value will eventually be taken from text input on game interface
hitorbust.setCredits(gameData.startingCredit);
hitorbust.setNewCards(gameData.cards);
//console.log(hitorbust.newCards[6].suite);