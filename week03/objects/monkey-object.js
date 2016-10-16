/* Work with a partner to create a monkey object, which has the following properties:
 * name
 * species
 * foodsEaten
 * And the following methods:
 * eatSomething(thingAsString)
 * introduce: producers a string introducing itself, including its name, species, and what it's eaten.
 *
 * Create 3 monkeys total. Make sure all 3 monkeys have all properties set and methods defined.
 * Exercise your monkeys by retrieving their properties and using their methods. Practice using both syntaxes
 * for retrieving properties (dot notation and brackets).
 */

var Monkey = function(name, species, foodsEaten){
	this.name = name,
	this.species = species,
	this.foodsEaten = foodsEaten,
	this.introduceSelf = function(){
		console.log('my name is ' + this.name + ' and i am a ' + this.species + ' monkey');
	},
	this.speakFoodsEaten = function(){
		console.log('i have eaten ' + this.foodsEaten);
	},
	this.eatFood = function(newFood){
		this.foodsEaten.push(newFood);
	}
};

Monkey.prototype.introduce = function() {
	console.log('This ' + this.species + ' monkey is called ' + this.name + '. ' + this.name + ' has eaten ' + this.foodsEaten);
};

// prevent duplicate items being added !! TODO !!
Monkey.prototype.eatSomething = function(newFood) {
/*
	if (this.foodsEaten.indexOf(newFood)) {
		console.log('i have eaten this before');
		return false;
	} else {
		this.foodsEaten.push(newFood);
		console.log('have not eaten this before');
	}
*/
	this.foodsEaten.push(newFood);
};

var monkey1 = new Monkey('Henry', 'Bonobo', ['nuts', 'stuff', 'thangs', 'filet Mignon']);
var monkey2 = new Monkey('Barry', 'Spider', ['bananas', 'spam', 'eggs']);
var monkey3 = new Monkey('Mildred', 'Cheeky', 'pizza');

monkey1.speakFoodsEaten();
monkey1.eatFood('ham');
monkey1.eatFood = 'lasagne';
console.log(monkey1.eatFood);
monkey1.speakFoodsEaten();
console.log('\n');
monkey2.speakFoodsEaten();
monkey2.eatSomething('melons');
monkey2.eatSomething = 'ginger';
monkey2.speakFoodsEaten();
