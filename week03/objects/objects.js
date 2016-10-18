var myHouse = {
	floor: 2,
	address: '123 Street Road',
	postCode: 'N13 7RW',
	city: 'London',
	residents: ['me', 'bob', 'Sam', 'Deirdre'],
	rentPrice: 2000000
};
// for-in statement to enumerate over object properties
for (var key in myHouse) { // http://stackoverflow.com/questions/921789/how-to-loop-through-plain-javascript-object-with-objects-as-members
	//console.log(key + ' = ' + myHouse[key]); // key:value pairs
}

// when using for-in loops, always make use of the hasOwnProperty method to determine if the
// current property in iteration is really a property of the object you're checking on, not the prototype object
for (var prop in myHouse) {
    if (!myHouse.hasOwnProperty(prop)) {
        //The current property (key) is not a direct property of myHouse
        console.log('current property (key) not a direct property of myHouse');
        continue;
    }
    //Do your logic with the property here
    console.log(prop + ' = ' + myHouse[prop]); // key:value pairs
}



/*
var secondHouse = myHouse; 	// _copying_ the original object
secondHouse.floor = 45; 	// however, it is just a reference to the original variable
							// and changing this property will change the value in the first variable
console.log('> myHouse.floor = ' + myHouse.floor + '\n> secondHouse.floor = ' + secondHouse.floor);
*/
// Person is a class. This is a constructor method.
var Person = function(firstName, lastName){
	this.firstName = firstName;
	this.lastName = lastName;
};

// always use prototype when defining a function because reasons
Person.prototype.identity = function(){
	console.log(this.firstName + ' is ' + this.age + ' years old.');
};

//get and set are called accessors

// setter
Person.prototype.setAge = function(newAge){
	if (newAge < 0){
		console.log('A person cannot be negative years old!');
	} else if (newAge > 140) {
		console.log('People do not generally live to the age of 140!');
	} else {
		this.age = newAge;
	}
};
// getter
Person.prototype.getAge = function(){
	return this.age;
};

// matt and gerry are instance of the class Person
var matt = new Person('Matt', 'Studdert'),
	gerry = new Person('Gerry', 'Mathe');

console.log(gerry.age); // hasn't yet been set --> doesn't exist --> undefined
gerry.setAge(25);
console.log(gerry.age); // has now been set (using setter method)

gerry.identity();