#Things and actions required for turn-based games

##Blackjack

Make a one player game where people down on their luck can lose all their money by guessing which card the computer will deal next!

###Data
```
var data = {};

data.cards = [
	{
		value: "1",
		suite: "Clubs",
		symbol: "♣"
	},
	{
		value: "2",
		suite: "Clubs",
		symbol: "♣"
	},
	{
		value: "King",
		suite: "Spades",
		symbol: "♠"
	},
	{
		value: "Ace",
		suite: "Spades",
		symbol: "♠"
	}
	];
```

###Logic/objects

- Game // object
	- Player // object
		- name // string
		- credits // number: 1 credit = £1
			- if credits <= 0 then endGame
		- guessCard() // method
			- setGuess() // method
				- pick a number
				- pick a suit
			- setWager() // method
				- if wager > wallet then no bet
		- cashOut() // method: endsGame + winner message
	- Card // object defined in external JSON data file
		- suite // string
		- value // string
		- symbol // string (unicode character)
	- Board // object
		- newCards // array: data.cards.map()
		- oldCards // array: initialised empty
		- currentCard // number 0-51 corresponding to newCards array index
		- updateScore() // method
		- updateCard() // method: Game.getRandomCard()
	- getRandomCard() // method: pop the return value from Board.newCards and push to Board.oldCards
	-  // method: pop the return value from Board.newCards and push to Board.oldCards
	- endGame() // method

###Presentation layer
- html structure with handlebars.js templating
	- eg. html > body
		- div#player01.player
			- p.name {{name}}
			- p.credits £{{credits}}
		- div#board
			- div.current-card
				- div.card.card01 … .card52
- modular css to style the html

