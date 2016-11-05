/*
 * Game class
 */

// new Game constructor
var Game = function(name, instructions){

	// initialise constructor variables
	this.name = name;
	this.instructions = instructions;

};

// start new game
Game.prototype.startGame = function() {

	// show game container on web page
	gameContainer.className = "";
	// initialise/reset card arrays
	this.dealersHand = [];
	this.flippedCards = [];
	this.player1 = new Player("Bob", 100); // abstract later to something like this.setNewPlayer();
	// display game name and instructions
	console.log("Welcome to " + gameData.name + "!\n" + gameData.instructions + "\n");
	this.setNewCards(gameData.cards);

};


// populate dealersHand array with data from external JSON i.e. deal a new hand
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


// assigns randomCard with value of random item from dealersHand array
Game.prototype.setRandomCard = function(){
	var random = Math.floor((Math.random() * this.dealersHand.length));
	this.randomCard = this.dealersHand[random];
};

//
Game.prototype.flipCard = function(){
	//  randomCard is the card the player is trying to guess, not presented on interface at this point but available in memory

	console.log(this.dealersHand.length, this.flippedCards.length)
	// extract randomCard from dealersHand
	var position = this.dealersHand.indexOf(this.randomCard);
	var splitArray = this.dealersHand.splice(position, 1);
	var extractedCard = splitArray.shift();
	console.log(this.dealersHand.length, this.flippedCards.length);

	// add extractedCard to flippedCards
	if (this.dealersHand.length !== 0) {
		this.flippedCards.push(extractedCard);
		console.log("hint:", extractedCard.rank.toLowerCase(), "of", extractedCard.suite.toLowerCase());
	} else {
		console.log("no more cards left to flip!");
	};

};

//
Game.prototype.compareCards = function(playerGuess){

	if (typeof playerGuess !== "undefined") {

		playerGuess = playerGuess.split("-");

		var guessRank = playerGuess[1];
		var guessSuite = playerGuess[0];

		if (guessRank === this.randomCard.rank.toLowerCase() && guessSuite === this.randomCard.suite.toLowerCase()) {

			console.log("you are teh winnar!!");


		} else {

			console.log("unlucky buster");

		}

	} else {

		alert("You need to choose a card");

	}

};

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


// value received from radio input
Player.prototype.setGuess = function(){

	// http://www.dyn-web.com/tutorials/forms/radio/get-selected.php
	function getRadioVal(form, name) {  // move to a utils object?

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
	var guessCard = getRadioVal(inputGuessCard, "suite-rank");

	return guessCard;

};


// get playerGuess then compare to Game.randomCard
Player.prototype.makeBet = function(){
	// playerGuess = value of selected radio button
	var playerGuess = this.setGuess();
	hitorbust.compareCards(playerGuess);
};

/*
 * assign DOM elements to local variables
 */

var gameContainer = document.getElementById("game-container");
var btnMakeBet = document.getElementById("make-bet");
var btnFlipCard = document.getElementById("flip-card");

var btnStartNewGame = document.getElementById("start-new-game");

var inputGuessSuite = document.getElementById("guess-suite");
var inputGuessRank = document.getElementById("guess-rank");
var inputGuessCard = document.getElementById("guess-card");

var textPlayerGuess = document.getElementById("playerGuess");


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


// construct new Game instance, assign to local variable hitorbust
var hitorbust = new Game(gameData.name, gameData.instructions);
/*
 * TEMP !!
 */
hitorbust.startGame(); // need to pass all the below as arguments setCredits etc
hitorbust.setRandomCard(); // tee-up first card to be flipped over
hitorbust.flipCard(); // move randomCard from newCards[] to flippedCards[]
/*
 *
 */
