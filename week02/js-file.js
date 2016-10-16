/*
Write a program that outputs results based on users' age. This exercise draws on if/else statements, Boolean logic, and comparison operators. See the conditions below:

If you are under 16, you cannot do much outside of going to school
If you are 16 or older, you can drive
If you 18 or older, you can vote
If you are 21 or older, you can drink alcohol
If you are 25 or older, you can rent a car
If you are 35 or older, you can run for president
If you are 62 or older, you collect social security benefits
Have the program print out only the most recent thing that they've become eligible to do, i.e. if they are 46, only print "You can run for president." (This will at least force them to use else if instead of just if).
*/

// define local variables
var age = 10;
var sentence = null;

// if and else if

/*if (age < 16) {
	sentence = 'go to school';
} else if (age >= 16 && age < 18) {
	sentence = 'you can drive';
} else if (age >= 18 && age < 21) {
	sentence = 'you can vote';
} else if (age >= 21 && age < 25) {
	sentence = 'you can rent a car';
} else if (age >= 35 && age < 62) {
	sentence = 'you can run for president';
} else if (age > 62) {
	sentence = 'you can collect social security';
} else {
	sentence = 'Enter a valid number';
}
*/

/*
switch (true) {
	case (age < 16):
	sentence = 'go to school';
	break;
	case (age >= 16 && age < 18):
	sentence = 'you can drive';
	break;
	case (age >= 18 && age < 21):
	sentence = 'you can vote';
	break;
	case 21:
	sentence = 'you can drink alcohol';
	break;
	case 25:
	sentence = 'you can rent a car';
	break;
	default:
	sentence = 'Please enter a valid age';
}
*/
console.log(sentence);