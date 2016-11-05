$(function(){

	// declare local variables
	var $template = $("#my-custom-template").html();

	function convertTemplate(templateString, values){

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

/*		
		// iterate over array using Array.map()
		matches.map(function(key, index){

			// replace double parentheses with empty string
			key = key.replace(/{{/g, '').replace(/}}/g, '');
			
			// assign value to variable
			var correspondingValue = values[key];
			
			// replace key with value
			templateString = templateString.replace(matches[index], correspondingValue);
		});
*/
		// write to DOM
		$("body").append(templateString);
	};

	// function call
	convertTemplate($template, data.myDetails);
});