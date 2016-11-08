"use strict";
var log = console.log;

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
	this.player1 = new Player("Bob", 100); // abstract later to something like this.setNewPlayer();
	// display game name and instructions
	log("Welcome to " + gameData.name + "!\n" + gameData.instructions + "\n" + gameData.easterEgg);
	this.setNewCards(gameData.cards);
};


// populate dealersHand array with data from external JSON i.e. deal a new hand
Game.prototype.setNewCards = function(newCards) {
	// initialise/reset card arrays
	this.dealersHand = [];
	this.flippedCards = [];
	this.cardFrontShowing = false;
	// sublime text 3 syntax helper, revised for loop // http://stackoverflow.com/questions/17484227/javascript-improved-native-for-loop
	// iterate over cards collection from external JSON data.js
	for (var i = newCards.length - 1; i >= 0; i--) {
		// construct new Card instance for each item of "card" collection
		var card = new Card(newCards[i].rank, newCards[i].suite, newCards[i].symbol);
		// push new Card instance to dealersHand array
		this.dealersHand.push(card);
	}
};

// assigns randomCard with value of random item from dealersHand array
Game.prototype.setRandomCard = function(){
	var random = Math.floor((Math.random() * this.dealersHand.length));
	this.randomCard = this.dealersHand[random];

	// update UI with extractedCard
	// updatedealerCardUI()
	txtDealerCard.innerHTML = "<span id=\"dealer-rank\">" + this.randomCard.rank + "</span>" + " of <span id=\"dealer-suite\">" + this.randomCard.suite + "</span>";
};

//
Game.prototype.flipCard = function(){
	//  randomCard is the card the player is trying to guess, not presented on interface at this point but available in memory
	//log("dealer's hand", this.dealersHand.length, "flipped cards", this.flippedCards.length);

	// extract randomCard from dealersHand
	var position = this.dealersHand.indexOf(this.randomCard);
	var splitArray = this.dealersHand.splice(position, 1);
	var extractedCard = splitArray.shift();

	// add extractedCard to flippedCards
	if (this.dealersHand.length) {
		this.flippedCards.push(extractedCard);
		log("flipped card hint:", extractedCard.rank, "of", extractedCard.suite);
		log("dealer's hand", this.dealersHand.length, "flipped cards", this.flippedCards.length);
	} else {
		log("no more cards left to flip!");
	};
};

// add .flipped css to show element with css3 animation and flip dealer card over
Game.prototype.flipCardOver = function(dealerCard){

	var twoSidedCard = dealerCard.getElementsByClassName("flipcard");
	twoSidedCard = twoSidedCard.item(0);
	twoSidedCard.classList.add("flipped");
};

// remove .flipped css to hide element with css3 animation and flip dealer card over
Game.prototype.flipCardBack = function(dealerCard){

	var twoSidedCard = dealerCard.getElementsByClassName("flipcard");
	twoSidedCard = twoSidedCard.item(0);
	twoSidedCard.classList.remove("flipped");
};

//
Game.prototype.compareCards = function(playerGuess) {
	if (typeof playerGuess !== "undefined") {
		playerGuess = playerGuess.split("-");
		var guessRank = playerGuess[1];
		var guessSuite = playerGuess[0];
		if (guessRank === this.randomCard.rank && guessSuite === this.randomCard.suite) {
			this.flipCardOver(dealerCard);
			// remove containing/parent li of selected radio button from DOM // TODO
			log("you are teh winnar!!\n<-- [flip card]");
			// wait for "Flip card" click event…

		} else { log("unlucky buster");	}
	} else { alert("You need to choose a card"); }
};

// method to completely remove li from the DOM. this is needed to remove all focus from form element, to trigger "make bet"
Game.prototype.destroyCard = function(defunctCard) {
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

// value taken from radio input
Player.prototype.setPlayerGuess = function(){
	var guessCard = utils.getRadioVal(inputGuessCard, "suite-rank");
	return guessCard;
};

// get playerGuess then compare to Game.randomCard
Player.prototype.makeBet = function(){
	// playerGuess = value of selected card (radio button)
	var playerGuess = this.setPlayerGuess();
	hitorbust.compareCards(playerGuess);
};

/*
 * assign DOM elements to local variables
 */
var gameContainer = document.getElementById("game-container"),
	btnMakeBet = document.getElementById("make-bet"),
	btnFlipCard = document.getElementById("flip-card"),
	btnStartNewGame = document.getElementById("start-new-game"),
	/*inputRadioGuessSuite = document.getElementById("guess-suite"),
	inputRadioGuessRank = document.getElementById("guess-rank"),*/
	inputGuessCard = document.getElementById("guess-card"),
	/*inputStrPlayerGuess = document.getElementById("playerGuess"),*/
	importedCards = document.getElementById("imported-cards"),
	cardTemplate = document.getElementById("card-template").innerHTML,
	dealerCard = document.getElementById("dealer-card"),
	txtDealerCard = document.getElementById("text-dealer-card");

/*
 * event handlers
 */

// "Start new game" button click event
btnStartNewGame.addEventListener("click", function() {

	hitorbust.startGame(); // need to pass all the below as arguments setCredits etc
	hitorbust.setRandomCard(); // tee-up first card to be flipped over
	hitorbust.flipCard(); // move randomCard from newCards[] to flippedCards[]

}, false);

// "Make bet" button click event
btnMakeBet.addEventListener("click", function() {

	hitorbust.player1.makeBet();

}, false);

// "Flip card" button click event
btnFlipCard.addEventListener("click", function() {

	// deduct 2 credits from Player.totalCredits
	hitorbust.setRandomCard();
	hitorbust.flipCard();

}, false);


// div#dealer-card click event
/*dealerCard.addEventListener("click", function() {
	hitorbust.flipCardOver(this);
}, false);
dealerCard.addEventListener("mouseleave", function() {
	hitorbust.flipCardBack(this);
}, false);*/


/*
 * Utilities
 */

// new Utilities namespace
var utils = {};

utils.getRadioVal = function(form, name){
	// http://www.dyn-web.com/tutorials/forms/radio/get-selected.php
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
};

utils.convertTemplate = function(templateString, values){

	// use regex to target double curly parentheses + key-value pairs from gameData.cards
	var regexMatch = /\{\{([a-zA-Z]*)\}\}/g; // g at end means global - it will not stop after the first instance

	// new array containing strings that match regex expression
	var matches = templateString.match(regexMatch);

	// iterate over array using for loop
	for (var i = 0; i < matches.length; i++) {

		var key = matches[i];
		key = key.replace(/{{/g, '').replace(/}}/g, '');

		// assign value to variable
		var correspondingValue = values[key];

		// replace key with value
		templateString = templateString.replace(matches[i], correspondingValue);

	}

	// write to DOM
	var list = document.createElement("li");
	list.innerHTML = templateString;
	importedCards.appendChild(list);
};

utils.removeElementFromDOM = function() {

};


//
//
// construct new Game instance, assign to local variable hitorbust
//
var hitorbust = new Game(gameData.name, gameData.instructions);
/*
 * TEMP !!
 */
hitorbust.startGame(); // need to pass all the below as arguments setCredits etc
hitorbust.setRandomCard(); // tee-up first card to be flipped over

// iterate through card collection and apply template for each card object
for (var i = 0; i < hitorbust.dealersHand.length; ++i) {

	utils.convertTemplate(cardTemplate, hitorbust.dealersHand[i]); // 51 cards due to first flipped

}

hitorbust.flipCard(); // move randomCard from newCards[] to flippedCards[]

/*
 *
 */