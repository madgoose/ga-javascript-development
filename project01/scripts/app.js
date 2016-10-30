/*
 * Game class
 */

// constructor
var Game = function(gameName, instructions){
	// initialise local variables
	this.gameName = gameName;
	this.instructions = instructions;
	// declare null variables for later use
	this.flippedCards = null;
	this.currentCard = null;
};

// display game name and instructions
Game.prototype.introduceGame = function() {
	console.log("Welcome to " + this.gameName + "!\n" + this.instructions);
};

// display game end message
Game.prototype.endGame = function() {
	console.log("Game over!\nBad luck +playerNameToBeAddedLater+");
};

// set credit value
Game.prototype.setCredits = function(newCredits){

	if (newCredits < 0){ // can't gamble with zero credits or less
		console.log("No scratch, no snatch. Come back with some credits");
	} else if (newCredits > 500) { // can't have more than 500 credits in bank
		console.log("House limit is 500 credits, sorry");
	} else { // can't gamble with zero credits or less
		this.credits = newCredits;
	}
};
// returns current credit value
Game.prototype.getCredits = function(){
	return this.credits;
};

// populate newCards array with data from external JSON
// i.e. deal a new hand
Game.prototype.setNewCards = function(newCards) {

	// assign "card" collection from external JSON to local variable
	this.newCards = newCards;
	// initialise/declare empty array variable for local "card" collection
	this.dealersHand = [];

	// sublime text 3 syntax helper, revised for loop // http://stackoverflow.com/questions/17484227/javascript-improved-native-for-loop
	// iterate over cards array
	for (var i = newCards.length - 1; i >= 0; i--) {

		// construct new Card instance for each item of "card" collection
		this.card = new Card(newCards[i].value, newCards[i].suite, newCards[i].symbol);
		this.dealersHand.push(this.card);
	}

};

// returns array of 52 playing cards
Game.prototype.getNewCards = function(){
	return this.dealersHand;
};

/*
 * Card class
 */

// constructor
var Card = function(cardValue, cardSuite, cardSymbol){
	this.cardValue = cardValue;
	this.cardSuite = cardSuite;
	this.cardSymbol = cardSymbol;
};

// returns random card from dealersHand
Game.prototype.getRandomCard = function(){
	return this.randomCard;
};

// returns random card from dealersHand
Game.prototype.setRandomCard = function(){
	var random = Math.floor((Math.random() * this.dealersHand.length));
	this.randomCard = this.dealersHand[random];
};
/*
 * new Game instance "*hit or bust"
 */

// construct new Game instance, assign to local variable hitorbust
var hitorbust = new Game(gameData.gameName, gameData.instructions);

// newCredits value will eventually be taken from text input on game interface
hitorbust.setCredits(gameData.startingCredit);
hitorbust.setNewCards(gameData.cards);
// tee-up first card to be flipped over
hitorbust.setRandomCard();
//console.log(hitorbust.dealersHand[0],hitorbust.dealersHand[51]);