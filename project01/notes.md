#things and actions required for turn-based games

##blackjack

Make a one player game where people down on their luck can lose all their money by guessing which card the computer will deal next!
###Class design
- Game // object
	- Player // object
		- name // string
		- wallet // number
			- if wallet <= 0 then endGame
		- makeGuess() // method
			- setAmount() // method
				- if amount > wallet then no bet
			- setGuess() // method
				- 
		- cashOut() // method: endsGame + winner message
	- CardDeck // object
		- cards // array 
		- card // object
			- suite // string
			- value // number
				- replace() to output jack/queen/king instead of 10, 11, 12…
		- getRandomCard() // method: select random index value of cards array
		- turnCard() // method: calls getRandomCard and pops the return value from CardDeck.cards and pushes to Board.discardedCards
	- Board // object
		- CardDeck.cards // 
		- discardedCards // array
		- displayScore() // method
		- displayCard() // method
	- endGame() // method