/* Independent Practice

Making a favorites list: DOM manipulation


- When the user clicks the submit button, take the value they've typed
  into the input box and add it to the list (remember: appendChild)

- Also, when a new item is added to the list, clear the input box.

*/
MyApp = {};

MyApp.btnCreate = document.getElementById("new-thing-button");

MyApp.addToList = function(list, newThing){
	console.log("something");
}

window.onload = function() {
  // when someone clicks the button...
  MyApp.btnCreate.onclick = function(){
  	console.log("button clicked");
  	return false;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
};

/*

Bonus:

When they click submit without typing anything, alert the user
"you must type in a value!"
  (Hint: the `value` property of the input box, before anyone types in it,
  is the empty string.)

*/


