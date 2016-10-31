// jqueizzle
$(function(){
	$("#suits li").on("click", function(){
		var chosenSuite = $(this).data("suit");
		var filteredPack = hitorbust.dealersHand.filter(function(item){ //filter returns a boolean; if true item added to new array
			return chosenSuite === item.cardSuite;
		});
		console.log(filteredPack);
		// filter() data.suit to create subset
	})
});

/*
 * Game class
 */

// new Game constructor
var Game = function(gameName, instructions){

	// initialise local variables
	this.gameName = gameName;
	this.instructions = instructions;

	// declare empty arrays etc for later use
	this.dealersHand = [];
	this.flippedCards = [];
	this.currentCard = null;

};

// start new game
Game.prototype.startGame = function() {
	// remove .hidden css class from game container
	gameContainer.className = "";
	var player1 = new Player("Bob", 100); // abstract later to something like setPlayers()
	// display game name and instructions
	console.log("Welcome to " + gameData.gameName + "!\n" + gameData.instructions + "\n");
	this.setNewCards(gameData.cards);

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
	//return this.randomCard;
};

//
Game.prototype.flipCard = function(){
	this.currentCard = this.randomCard;
	this.dealersHand.pop(this.currentCard);
	this.flippedCards.push(this.currentCard);
	console.log(this.currentCard);
};

//
Game.prototype.compareCards = function(){

	var cardToCompare = playerGuess.value;

	//console.log("current card: " + this.currentCard.cardValue + " " + this.currentCard.cardSuite, "\nPlayer's guess: " + cardToCompare);
	if (cardToCompare === this.currentCard.cardValue + this.currentCard.cardSuite) {
		console.log("you guessed correctly!")
	}

	//	if player.guessCard.value && player.guessCard.suite === currentCard.guessCard.value && currentCard.guessCard.suite
	//		success! winHand() // // credits = credits + (wager * 100) // adjust odds as deck gets smaller
	//	else
	//		fail! loseHand() // credits = credits + (wager * -1)
};

//
Game.prototype.updateScore = function(){};

/*
 * Player class
 */

// new Player constructor
var Player = function(name, credits){
	this.name = name;
	this.credits = credits;
};

// player enters card value and suite // duplication of setGuess() ?
Player.prototype.guessCard = function(){};

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


// bind DOM elements to this Game object
var gameContainer = document.getElementById("game-container");
var btnMakeBet = document.getElementById("make-bet");
var btnFlipCard = document.getElementById("flip-card");
var playerGuess = document.getElementById("guess");

var btnStartNewGame = document.getElementById("start-new-game");

// construct new Game instance, assign to local variable hitorbust
var hitorbust = new Game(gameData.gameName, gameData.instructions);

// "Start new game" button clicked
btnStartNewGame.addEventListener('click', function() {

	hitorbust.startGame(); // need to pass all the below as arguments setCredits etc
	hitorbust.setRandomCard(); // tee-up first card to be flipped over

}, false);

// "Make bet" button clicked
btnMakeBet.addEventListener('click', function() {

	hitorbust.compareCards();

}, false);

// "Flip card" button clicked
btnFlipCard.addEventListener('click', function() {

	hitorbust.setRandomCard();
	//var guess = document.getElementById("guess").value;
	//hitorbust.compareCards(hitorbust.getRandomCard(), guess);

}, false);