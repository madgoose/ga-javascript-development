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
	this.player1 = new Player("Bob", 50); // abstract later to something like this.setNewPlayer();
	// display game name and instructions
	log("Welcome to " + gameData.name + "!\n" + gameData.instructions + "\n" + gameData.easterEgg);
	this.player1.updatePlayerScore(this.player1.credits);
	this.setNewCards(gameData.cards);
};

// populate dealersHand array with data from external JSON i.eplayer. deal a new hand
Game.prototype.setNewCards = function(newCards) {
	// initialise/reset card arrays
	this.dealersHand = [];
	this.flippedCards = [];
	// clear any existing cards from UI
	importedCards.innerHTML = "";
	// sublime text 3 syntax helper, revised for loop // http://stackoverflow.com/questions/17484227/javascript-improved-native-for-loop
	// iterate over cards collection from external JSON data.js
	for (var i = newCards.length - 1; i >= 0; i--) {
		// construct new Card instance for each item of "card" collection
		var card = new Card(newCards[i].rank, newCards[i].suite, newCards[i].symbol);
		// push new Card instance to dealersHand array
		this.dealersHand.push(card);
	}
	// iterate through card collection and apply template for each card object
	for (var i = 0; i < hitorbust.dealersHand.length; ++i) {
		var list = utils.convertTemplate(cardTemplate, hitorbust.dealersHand[i]); // 51 cards due to first flipped
		importedCards.appendChild(list);
	}
};

// assigns randomCard with value of random item from dealersHand array
Game.prototype.setRandomCard = function(){
	var random = Math.floor((Math.random() * this.dealersHand.length));
	this.randomCard = this.dealersHand[random];

	// update UI with extractedCard
	// updatedealerCardUI()
	txtDealerCard.innerHTML = "<span id=\"dealer-rank\" class=" + this.randomCard.suite + ">" + this.randomCard.rank + "</span>" + "<span id=\"dealer-suite\" class=\"symbol " + this.randomCard.suite + "\">" + this.randomCard.symbol + "</span>";
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

// toggle .flipped css to show/hide element with css3 animation and flip dealer-card over
Game.prototype.flipCardUI = function(card){

	var twoSidedCard = card.getElementsByClassName("flipcard");
	twoSidedCard = twoSidedCard.item(0);

	var innerSpans = twoSidedCard.getElementsByTagName("span");

	// visually hide spans due to flash-of-content from text update
	if (!(twoSidedCard.classList.contains("flipped"))) {

		for (var i = innerSpans.length - 1; i >= 0; i--) {

			innerSpans[i].classList.remove("visually-hidden");
		}
		twoSidedCard.classList.add("flipped");

	} else {

		for (var i = innerSpans.length - 1; i >= 0; i--) {

			innerSpans[i].classList.add("visually-hidden");
		}
		twoSidedCard.classList.remove("flipped");
	}
};

//
Game.prototype.compareCards = function(playerGuess) {
	if (typeof playerGuess !== "undefined") {

		this.destroyCard(playerGuess); // remove guessed card from the dom

		this.player1.updatePlayerScore(); //  need to pass through wager * odds --> (wager * -1)

		playerGuess = playerGuess.split("-");
		var guessRank = playerGuess[1];
		var guessSuite = playerGuess[0];
		if (guessRank === this.randomCard.rank && guessSuite === this.randomCard.suite) {
			this.flipCardUI(dealerCard);

			log("you are teh winnar!!\n<-- [Next bet]");
			btnMakeBet.classList.add("hidden");
			btnNextCard.classList.remove("hidden");

		} else {

			this.flipCardUI(dealerCard);

			log("unlucky buster\n<-- [Next bet]");
			btnMakeBet.classList.add("hidden");
			btnNextCard.classList.remove("hidden");
		}
	} else { alert("You need to choose a card"); }
};

// method to completely remove li from the DOM. this is needed to remove all focus from form element, to trigger "make bet"
//Game.prototype.destroyCard = function(defunctCard) {
Game.prototype.destroyCard = function(defunctCard) {
	defunctCard = document.getElementById(defunctCard);
	defunctCard= defunctCard.parentNode;
	var node = defunctCard.parentNode;
	node.removeChild(defunctCard);
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

// output player score
Player.prototype.updatePlayerScore = function(){
	playerScore.textContent = this.credits;
};


/*
 * assign DOM elements to local variables
 */
var gameContainer = document.getElementById("game-container"),
	btnMakeBet = document.getElementById("make-bet"),
	btnNextCard = document.getElementById("next-card"),
	btnStartNewGame = document.getElementById("start-new-game"),
	inputGuessCard = document.getElementById("guess-card"),
	importedCards = document.getElementById("imported-cards"),
	cardTemplate = document.getElementById("card-template").innerHTML, // html mark-up plus delimited placeholder text
	dealerCard = document.getElementById("dealer-card"),
	playerScore = document.getElementById("player-score"),
	txtDealerCard = document.getElementById("text-dealer-card");

/*
 * event handlers
 */

// "Start new game" button click event
/*btnStartNewGame.addEventListener("click", function() {

	hitorbust.startGame(); // need to pass all the below as arguments setCredits etc
	hitorbust.setRandomCard(); // tee-up first card to be flipped over
	hitorbust.flipCard(); // move randomCard from newCards[] to flippedCards[]

}, false);
*/
// "Make bet" button click event
btnMakeBet.addEventListener("click", function() {

	hitorbust.player1.makeBet();

}, false);

// "Flip card" button click event
btnNextCard.addEventListener("click", function() {

	btnNextCard.classList.add("hidden");
	btnMakeBet.classList.remove("hidden");

	// deduct 2 credits from Player.totalCredits
	hitorbust.setRandomCard();
	hitorbust.flipCard();
	hitorbust.flipCardUI(dealerCard);

}, false);

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
	return list;
	//importedCards.appendChild(list);
};



//
//
// construct new Game instance, assign to local variable hitorbust
//
var hitorbust = new Game(gameData.name, gameData.instructions);

	hitorbust.startGame(); // need to pass all the below as arguments setCredits etc
	hitorbust.setRandomCard(); // tee-up first card to be flipped over
	hitorbust.flipCard(); // move randomCard from newCards[] to flippedCards[]