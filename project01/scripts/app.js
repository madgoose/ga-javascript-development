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
	console.log("Welcome to " + gameData.name + "!\n" + gameData.instructions + "\n");
	this.setNewCards(gameData.cards);
};


// populate dealersHand array with data from external JSON i.e. deal a new hand
Game.prototype.setNewCards = function(newCards) {
	// initialise/reset card arrays
	this.dealersHand = [];
	this.flippedCards = [];
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
};

//
Game.prototype.flipCard = function(){
	//  randomCard is the card the player is trying to guess, not presented on interface at this point but available in memory
	//console.log("dealer's hand", this.dealersHand.length, "flipped cards", this.flippedCards.length);
	// extract randomCard from dealersHand
	var position = this.dealersHand.indexOf(this.randomCard);
	var splitArray = this.dealersHand.splice(position, 1);
	var extractedCard = splitArray.shift();
	//console.log("dealer's hand", this.dealersHand.length, "flipped cards", this.flippedCards.length);
	// add extractedCard to flippedCards
	if (this.dealersHand.length) {
		this.flippedCards.push(extractedCard);
		console.log("hint:", extractedCard.rank.toLowerCase(), "of", extractedCard.suite.toLowerCase());
	} else {
		console.log("no more cards left to flip!");
	};
};

//
Game.prototype.compareCards = function(playerGuess) {
	if (typeof playerGuess !== "undefined") {
		playerGuess = playerGuess.split("-");
		var guessRank = playerGuess[1];
		var guessSuite = playerGuess[0];
		if (guessRank === this.randomCard.rank.toLowerCase() && guessSuite === this.randomCard.suite.toLowerCase()) {
			console.log("you are teh winnar!!\n<-- flip card");
		} else { console.log("unlucky buster");	}
	} else { alert("You need to choose a card"); }
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
	inputGuessSuite = document.getElementById("guess-suite"),
	inputGuessRank = document.getElementById("guess-rank"),
	inputGuessCard = document.getElementById("guess-card"),
	textPlayerGuess = document.getElementById("playerGuess");

/*
 * event handlers
 */

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

	// use regex to target double curly parentheses + key-value pairs from data.myDetails object
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

	// jquery write to DOM
	//$("body").append(templateString);
};


var cardTemplate = document.getElementById("card-template").innerHTML;
//console.log(cardTemplate);
utils.convertTemplate(cardTemplate, gameData.cards);



/*
 * playground
 */

// http://stackoverflow.com/questions/16483560/how-to-implement-dom-data-binding-in-javascript
// http://jsfiddle.net/SJYWY/5/
function Template(template) {
    // Look for identifiers in the template
    var regularExpression = /{{{(\w+)}}}/g;

    // Split on the identifiers. The ID will be retained because of the capture group
    var parts = template.split(regularExpression);

    // Here our template object will hold the MyCtor objects
    this.bindings = {};

    // Grab the identifiers from the parts (they're at odd indices)
    for (var i = 0; i < parts.length; i++) {
        if (i % 2 === 1) { // its an identifier
            var id = parts[i];
            // Make a temporary object holding the IDs until we make the elements.
            this.bindings[id] = {id: id, target:id + "__target__"};

            // Replace the ID with a span used to target the updates
            parts[i] = "<span id='" + id + "__target__'></span>";
        }
    }
//debugger
    // Render the HTML with the new spans
    document.getElementById("guess-card").innerHTML = parts.join("");

    // Replace the temporary objects that held the IDs with MyCtor objects that coordinate the updates.
    for (var b in this.bindings) {
        this.bindings[b] = new MyCtor(this.bindings[b].id,
                                      this.bindings[b].target);
    }
}
// Provide an interface to make changes by ID
Template.prototype.change = function(prop, value) {
    this.bindings[prop].change(value);
};
// And to retrieve the value by ID
Template.prototype.getValue = function(prop) {
    return this.bindings[prop].data;
};

// This holds the data, the input, and the target Element.
// A "change" handler is added to the input.
var MyCtor = function(input, target){

	this.data = "";
    this.target = document.getElementById(target);
    this.input = document.getElementById(input);

    this.input.addEventListener("change", this, false);

};


// Implement the EventListener interface
MyCtor.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "change":
            this.change(this.input.value);
    }
};
// Coordinate changes to both elements and the data
MyCtor.prototype.change = function (value) {
    this.data = value;
    this.input.value = value;
    this.target.textContent = value;
};

// Make a template
var template = "<pre>The value is: {{{myvalue}}}</pre>" +
    "<br>Enter a new value <input id='myvalue'>";

// Parse it
//var obj = new Template(template);

// Apply a change
//obj.change("myvalue", "foo");

// Apply changes every 10s to simulate JavaScript interaction.
/*setInterval(function() {
    var val = obj.getValue("myvalue");
    if (val.length < 50)
        obj.change("myvalue", val + val);
}, 10000);*/










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
hitorbust.flipCard(); // move randomCard from newCards[] to flippedCards[]
/*
 *
 */