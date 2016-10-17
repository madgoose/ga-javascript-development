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
	this.foodsEaten = foodsEaten
};

Monkey.prototype.introduce = function() {
	console.log('my name is ' + this.name + ' and i am a ' + this.species + ' monkey. i\'ve eaten ' + this.foodsEaten);
};
Monkey.prototype.speakFoodEaten = function() {
	console.log(this.name + ' has eaten ' + this.foodsEaten);
};

// no lteIE11 support for some(), okay to use in node.js environment
Monkey.prototype.checkFoodsEaten = function(value) {
	return this.foodsEaten.some(arrVal => value === arrVal); // arrow functions --> ES6 --> not yet covered in course
}

// check foodsEaten for newFood, add newFood to foodsEaten array if not duplicate
Monkey.prototype.eatSomething = function(newFood) {
	if (this.checkFoodsEaten(newFood)) {
		console.log(this.name + ' has already eaten ' + newFood);
	} else {
		console.log(this.name + ' has not eaten ' + newFood + ' before');
		this.foodsEaten.push(newFood);
	}
};

var monkey1 = new Monkey('Henry', 'Bonobo', ['nuts', 'stuff', 'thangs', 'filet Mignon']);
var monkey2 = new Monkey('Barry', 'Spider', ['bananas', 'spam', 'eggs']);
var monkey3 = new Monkey('Mildred', 'Cheeky', 'pizza');

monkey1.speakFoodEaten(); // print current array 
monkey1.eatSomething('calzone'); // try add new item to array
monkey1.eatSomething('nuts'); // try add existing item to array
monkey1.speakFoodEaten(); // print current array 