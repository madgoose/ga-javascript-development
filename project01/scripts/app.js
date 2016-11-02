// jqueizzle
// $(function(){
// });

/*
 * Game class
 */

// new Game constructor
var Game = function(name, instructions){

	// initialise constructor variables
	this.name = name;
	this.instructions = instructions;

	// declare variables for later use
	this.dealersHand = [];
	this.flippedCards = [];

};

// start new game
Game.prototype.startGame = function() {

	// show game container on web page
	gameContainer.className = "";
	this.player1 = new Player("Bob", 100); // abstract later to something like this.setNewPlayer();
	// display game name and instructions
	console.log("Welcome to " + gameData.name + "!\n" + gameData.instructions + "\n");
	this.setNewCards(gameData.cards);

};

// display game end message
Game.prototype.endGame = function() {
	console.log("Game over!\nBad luck, ", player1.name);
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

	// sublime text 3 syntax helper, revised for loop // http://stackoverflow.com/questions/17484227/javascript-improved-native-for-loop
	// iterate over cards collection from external JSON data.js
	for (var i = newCards.length - 1; i >= 0; i--) {

		// construct new Card instance for each item of "card" collection
		this.card = new Card(newCards[i].rank, newCards[i].suite, newCards[i].symbol);
		// push new Card instance to dealersHand array
		this.dealersHand.push(this.card);

	}

};

// returns array of playing cards
Game.prototype.getNewCards = function(){
	return this.dealersHand;
};

// returns randomCard from "this" object
Game.prototype.getRandomCard = function(){
	return this.randomCard;
};

// assigns randomCard with value of random item from dealersHand array
Game.prototype.setRandomCard = function(){
	var random = Math.floor((Math.random() * this.dealersHand.length));
	//	console.log(this.currentCard, this.dealersHand[random]);
	if (this.currentCard === this.dealersHand[random]) {
		console.log("error - random card same as current card");
	} else if (this.dealersHand.length === 0) {
		console.log("no more cards left to flip!");
	} else {
		this.randomCard = this.dealersHand[random];
	}
};

//
Game.prototype.flipCard = function(){
	/*  currentCard is the card the player is trying to guess, not
	 *  presented on interface at this point but available in memory
	 */

	this.currentCard = this.randomCard;
	console.log("dealersHand", this.dealersHand.length);
	console.log("flippedCards", this.flippedCards.length);
	this.dealersHand.pop(this.currentCard); // remove currentCard from dealersHand // TODO add condition for dealersHand reaching 0
	console.log("dealersHand", this.dealersHand.length);
	this.flippedCards.push(this.currentCard); // add currentCard to flippedCards
	console.log("flippedCards", this.flippedCards.length);
	console.log("hint:\n", this.currentCard.rank.toLowerCase(), "of", this.currentCard.suite.toLowerCase(), "\n ----"); // useful for being able guess the card ;-)
};

//
Game.prototype.compareCards = function(playerGuess){

	var guessRank = playerGuess[0];
	var guessSuite = playerGuess[1];

	if (typeof guessSuite === "undefined" && typeof guessRank === "undefined") {
		console.log("You need to choose both a rank and suite");
	} else if(typeof guessRank === "undefined") {
		console.log("You need to choose a rank");
	} else if(typeof guessSuite === "undefined") {
		console.log("You need to choose a suite");
	} else {
		if (guessRank === this.currentCard.rank.toLowerCase() && guessSuite === this.currentCard.suite.toLowerCase()) {
			console.log("you are teh winnar!!");
			// credits = credits + (wager * 100) // adjust odds as dealerHand.length gets smaller
			this.player1.credits = this.player1.credits * 3;

			this.setRandomCard();
			this.flipCard();

		} else {
			// if guess doesn't match currentCard then check flippedCards[]
			// to see if the guessed card has already been flipped
			console.log("unlucky buster");
			// credits = credits + (wager * -1)
		}
	}

};

//
Game.prototype.updateScore = function(){};

/*
 * Card class
 */

// new Card constructor
var Card = function(rank, suite, symbol){
	this.rank = rank;
	this.suite = suite;
	this.symbol = symbol;
};

/*
 * Player class
 */

// new Player constructor
var Player = function(name, credits){
	this.name = name;
	this.credits = credits;
};

// player enters card value and suite // duplication of setGuess() ?
Player.prototype.makeBet = function(){
	var playerGuess = this.setGuess();
	hitorbust.compareCards(playerGuess);
};

// value will be received from text input
Player.prototype.setGuess = function(){

	// http://www.dyn-web.com/tutorials/forms/radio/get-selected.php
	function getRadioVal(form, name) {

		var val;
	    // get list of radio buttons with specified name
	    var radios = form.elements[name];

	    // loop through list of radio buttons
	    for (var i=0, len=radios.length; i<len; i++) {
	        if ( radios[i].checked ) { // radio checked?
	            val = radios[i].value; // if so, hold its value in val
	            break; // and break out of for loop
	        }
	    }
	    return val; // return value of checked radio or undefined if none checked
	}

	// get values of radio buttons, compress into array to pass as arguement
	var guessRank = getRadioVal(inputGuessRank, "rank");
	var guessSuite = getRadioVal(inputGuessSuite, "suite");
	var playerGuess = [guessRank, guessSuite];

	return playerGuess;

};

// if wager > wallet then no bet // value will be user-set via text input: this.setGuess()
// wager must be more than 0
Player.prototype.setWager = function(){};
Player.prototype.getWager = function(){};
Player.prototype.cashOut = function(){}; // method: endsGame + winner message


// bind DOM elements to local variables
var gameContainer = document.getElementById("game-container");
var btnMakeBet = document.getElementById("make-bet");
var btnFlipCard = document.getElementById("flip-card");

var btnStartNewGame = document.getElementById("start-new-game");

var inputGuessSuite = document.getElementById("guess-suite");
var inputGuessRank = document.getElementById("guess-rank");

// construct new Game instance, assign to local variable hitorbust
var hitorbust = new Game(gameData.name, gameData.instructions);

// "Start new game" button clicked
btnStartNewGame.addEventListener('click', function() {
	hitorbust.startGame(); // need to pass all the below as arguments setCredits etc
	hitorbust.setRandomCard(); // tee-up first card to be flipped over
	hitorbust.flipCard(); // move randomCard from newCards[] to flippedCards[]
}, false);

// "Make bet" button clicked
btnMakeBet.addEventListener('click', function() {
	hitorbust.player1.makeBet();
}, false);

// "Flip card" button clicked
btnFlipCard.addEventListener('click', function() {
	hitorbust.setRandomCard();
	hitorbust.flipCard();
}, false);