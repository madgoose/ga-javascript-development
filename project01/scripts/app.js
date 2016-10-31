$(function(){

	// the button _belongs_ to the document
	var btnStartNewGame = document.getElementById("start-new-game");

	// construct new Game instance, assign to local variable hitorbust
	var hitorbust = new Game(gameData.gameName, gameData.instructions);

	// "Start new game" button clicked
	btnStartNewGame.addEventListener('click', function() {
		hitorbust.startGame(); // need to pass all the below as arguments setCredits etc
/*
	hitorbust.setCredits(gameData.startingCredit); // newCredits value will be user-set via text input
	// hitorbust.setNewCards(gameData.cards);
	hitorbust.setRandomCard(); // tee-up first card to be flipped over
	//console.log(hitorbust.getRandomCard());
	//console.log(hitorbust.dealersHand[0],hitorbust.dealersHand[51]);

	var player1 = new Player("Bob", 100);
	*/

	}, false);

});



/*
 * Game class
 */

// new Game constructor
var Game = function(gameName, instructions){
	// initialise local variables
	this.gameName = gameName;
	this.instructions = instructions;
	// declare variables for later use
	this.flippedCards = [];
	this.currentCard = null;
};

// start new game
Game.prototype.startGame = function() {
	console.log("Welcome to " + gameData.gameName + "!\n" + gameData.instructions + "\n");
	this.setNewCards(gameData.cards);
};

// display game name and instructions
Game.prototype.introduceGame = function() {
	console.log("Welcome to " + this.gameName + "!\n" + this.instructions);
};

// display game end message
Game.prototype.endGame = function() {
	console.log("Game over!\nBad luck +playerNameToBeAddedLater+");
};

// set game credits // possibly abstract upper limit to gameData JSON data file
Game.prototype.setCredits = function(newCredits){

	if (newCredits < 0){ // can't gamble with zero credits or less
		console.log("No scratch, no snatch. Come back with some credits");
	} else if (newCredits > 5000) { // can't have more than 500 credits in bank
		console.log("House limit is 5000 credits, sorry");
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

// returns array of playing cards
Game.prototype.getNewCards = function(){
	return this.dealersHand;
};

/*
 * Card class
 */

// new Card constructor
var Card = function(cardValue, cardSuite, cardSymbol){
	this.cardValue = cardValue;
	this.cardSuite = cardSuite;
	this.cardSymbol = cardSymbol;
};

// returns randomCard from "this" object
Game.prototype.getRandomCard = function(){
	return this.randomCard;
};

// sets randomCard with value of random item from dealersHand array
Game.prototype.setRandomCard = function(){
	var random = Math.floor((Math.random() * this.dealersHand.length));
	this.randomCard = this.dealersHand[random];
	this.flipCard(this.randomCard);
};

//
Game.prototype.flipCard = function(randomCard){
	this.currentCard = this.randomCard;
	this.dealersHand.pop(this.currentCard);
	this.flippedCards.push(this.currentCard);
	console.log(this.currentCard);
};

//
Game.prototype.checkCard = function(){
	//	if player.guessCard.value && player.guessCard.suite === currentCard.guessCard.value && currentCard.guessCard.suite
	//		success! winHand() // // credits = credits + (wager * 10)
	//	else
	//		fail! loseHand() // credits = credits + (wager * -1)
};

//
Game.prototype.updateScore = function(){};

//
Game.prototype.someFunction = function(){};

/*
 * Player class
 */

// new Player constructor
var Player = function(name, credits){
	this.name = name;
	this.credits = credits;
};

// player enters card value and suite // duplication of setGuess() ?
Player.prototype.guessCard = function(){
	/*this.guessValue = "Ace"; // hard-coded for now
	this.guessSuite = "Spades";*/

};

// value will be received from text input
Player.prototype.setGuess = function(){
	// this.guessCard
	// pick a number
	// pick a suit
	var guessValue = "Ace"; // something like $("input#guess-value.val")
	var guessSuite = "Spades";
	return
};

// if wager > wallet then no bet // value will be user-set via text input: this.setGuess()
Player.prototype.setWager = function(){

};
Player.prototype.cashOut = function(){}; // method: endsGame + winner message

