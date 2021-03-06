"use strict";
var log = console.log;

/*
LOGIC NEEDED!

CONDITION:
incorrectly-guessed card needs to be removed from dealerHand[] as well as dealerCard !!

only destroy card if guess === dealer
	else destroy dealerCard

*/


/*

also: killstreak (consecutive victories)

*/


/*

weird bug : screenshot

*/

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
	this.player = new Player("Bob"); // abstract later to something like this.setNewPlayer() and bind credits to number of cards
	// display game name and instructions
	log("Welcome to " + gameData.name + "!\n"+  gameData.easterEgg);
	txtPlayerCard.innerHTML = "<span class=\"instructions\">Choose a card from below</span>";

	this.setNewCards(gameData.cards);
	this.player.credits = this.dealersHand.length;
	this.player.updatePlayerScore(this.player.credits);
	this.playerWager = inputPlayerWager.value;
	//this.gameOdds = this.dealersHand.length;
	this.updateGameOdds(this.playerWager);
};

// populate dealersHand array with data from external JSON i.eplayer. deal a new hand
Game.prototype.setNewCards = function(newCards) {
	// initialise/reset card arrays
	this.dealersHand = [];
	this.flippedCards = [];
	// clear any existing cards from UI
	importedCards.innerHTML = "";
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
	this.gameOdds = this.dealersHand.length;
};

// assigns randomCard with value of random item from dealersHand array
Game.prototype.setRandomCard = function(){
	var random = Math.floor((Math.random() * this.dealersHand.length));
	this.randomCard = this.dealersHand[random];

	// update UI with extractedCard
	// updatedealerCardUI()
	//txtDealerCard.innerHTML = "<span id=\"dealer-rank\" class=" + this.randomCard.suite + ">" + this.randomCard.rank + "</span>" + "<span id=\"dealer-suite\" class=\"symbol " + this.randomCard.suite + "\">" + this.randomCard.symbol + "</span>";
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
	} else {
		log("no more cards left to flip!");
	};

	this.gameOdds = this.dealersHand.length + 1;

	this.updateGameOddsUI(this.gameOdds, this.wager);
};

// toggle .flipped css to show/hide element with css3 animation and flip dealer-card over
Game.prototype.flipCardUI = function(card){

	var twoSidedCard = card.getElementsByClassName("flipper");
	twoSidedCard = twoSidedCard.item(0);

	var innerSpans = twoSidedCard.getElementsByTagName("span");

	// visually hide spans due to flash-of-content from text update
	if (!(twoSidedCard.classList.contains("flipped"))) {

		for (var i = innerSpans.length - 1; i >= 0; i--) {

			innerSpans[i].classList.remove("hidden");
		}
		twoSidedCard.classList.add("flipped");

	} else {

		for (var i = innerSpans.length - 1; i >= 0; i--) {

			innerSpans[i].classList.add("hidden");
		}
		twoSidedCard.classList.remove("flipped");
	}
};

//
Game.prototype.compareCards = function(playerGuess) {
	if (typeof playerGuess !== "undefined") {

		// disable makeBet button
		btnMakeBet.setAttribute("disabled", "true");

		// remove guessed card from the dom
		this.destroyCard(playerGuess);

		// update view from model
		txtDealerCard.innerHTML = "<span id=\"dealer-rank\" class=" + this.randomCard.suite + ">" + this.randomCard.rank + "</span>" + "<span id=\"dealer-symbol\" class=\"symbol " + this.randomCard.suite + "\">" + this.randomCard.symbol + "</span>";

		playerGuess = playerGuess.split("-");
		var guessRank = playerGuess[1];
		var guessSuite = playerGuess[0];
		if (guessRank === this.randomCard.rank && guessSuite === this.randomCard.suite) {

			this.flipCardUI(dealerCard);

			this.player.updatePlayerScore(this.player.credits = this.player.credits + (this.gameOdds * this.wager));

			//btnMakeBet.classList.add("hidden");
			btnNextCard.classList.remove("hidden");

			log("you are teh winnar!!\n<-- [Next bet]");

			message.innerText = "POW! You won " + (this.gameOdds * this.wager) + " credits. Bet again?";

			message.classList.remove("hidden");

			// unhide #messaging and insert content

		} else {

			this.flipCardUI(dealerCard);

			this.player.updatePlayerScore(this.player.credits = this.player.credits - (this.wager));

			//btnMakeBet.classList.add("hidden");
			btnNextCard.classList.remove("hidden");

			log("unlucky buster\n<-- [Next bet]");

			message.innerText = "Unlucky buster :-( Bet again?";

			message.classList.remove("hidden");

		}
	} else { alert("You need to choose a card"); }
};

// stuff
Game.prototype.updateGameOdds = function(wager) {
	//var wager = wager;
	this.wager = wager;
	// if wager > credits
	if (this.wager > this.player.credits) {
		alert("You can't bet more credits than you have!");
		wager = this.player.credits;
		this.wager = this.player.credits;
		inputPlayerWager.value = this.player.credits;
	}
	this.updateGameOddsUI(this.gameOdds, wager);
}
// thangs
Game.prototype.updateGameOddsUI = function(gameOdds, wager) {
	txtOdds.innerHTML = "Correct answer wins " + (this.gameOdds * wager) + " credits; incorrect answer loses " + wager + " credits";
}

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

// output currently selected card
Player.prototype.updatePlayerGuess = function(e){

	var playerGuess = e.target.nextSibling.nextSibling.innerHTML;

	var guessSuite = e.target.value.split("-");
	guessSuite = guessSuite[0];

	/*txtPlayerCard.className = "card " + guessSuite;*/
	txtPlayerCard.className = guessSuite;
	txtPlayerCard.innerHTML = playerGuess;

};

// output player score
Player.prototype.updatePlayerScore = function(adjustedScore){
	playerScore.textContent = adjustedScore;
};


/*
 * assign DOM elements to local variables
 */
var gameContainer = document.getElementById("game-container"),
	txtOdds = document.getElementById("odds"),
	message = document.getElementById("message"),
	btnMakeBet = document.getElementById("make-bet"),
	btnNextCard = document.getElementById("next-card"),
	btnStartNewGame = document.getElementById("start-new-game"),
	inputGuessCard = document.getElementById("guess-card"),
	inputPlayerWager = document.getElementById("player-wager"),
	importedCards = document.getElementById("imported-cards"),
	cardTemplate = document.getElementById("card-template").innerHTML, // html mark-up plus delimited placeholder text
	dealerCard = document.getElementById("dealer-card"),
	playerScore = document.getElementById("player-score"),
	txtPlayerCard = document.getElementById("text-player-card"),
	txtDealerCard = document.getElementById("text-dealer-card");

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
	var regexMatch = /\{\{([a-zA-Z]*)\}\}/g;

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
};


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

	hitorbust.player.makeBet();

}, false);

// "Flip card" button click event
btnNextCard.addEventListener("click", function() {

	if (!(hitorbust.dealersHand)) {
		message.innerText = "No more cards left!";
	}

	message.classList.add("hidden");

	btnNextCard.classList.add("hidden");
	btnMakeBet.classList.remove("hidden");
	btnMakeBet.removeAttribute("disabled");

	txtPlayerCard.innerHTML = "<span class=\"instructions\">Choose a card from below</span>";

	txtPlayerCard.className = "";

	hitorbust.setRandomCard();
	hitorbust.flipCard();
	hitorbust.flipCardUI(dealerCard);

}, false);

importedCards.addEventListener("change", function() {
	hitorbust.player.updatePlayerGuess(event);
}, false);

inputPlayerWager.addEventListener("keyup", function(e) {
	var val = e.target.value;
	hitorbust.updateGameOdds(val);
}, false);


//
//
// construct new Game instance, assign to local variable hitorbust
//
var hitorbust = new Game(gameData.name, gameData.instructions);
