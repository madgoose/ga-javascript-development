// a is defined in the global scope
var a = 1;

function getScore() {
	// b a c are defined in the local scope 'getScore'
	var b = 2;
	var c = 3;

	function add() {
		// d is defined in the local scope 'add'
		var d = 10;
		return a + b +c + d;
	}
	//console.log(add);
	return add; // 
}

console.log(getScore()());