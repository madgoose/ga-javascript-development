// separate the concerns: data
var data = {}
data.myDetails = {
  firstName: "Bob",
  lastName: "Hope",
  birthDate: "30 December 1856"
};

$(function(){
	
	// declare local variables
	var $template = $("#my-custom-template").html();
	
	function convertTemplate(templateString, values){

		// use regex to target double curly parentheses + key-value pairs from data.myDetails object
		var regexMatch = /\{\{([a-zA-Z]*)\}\}/g; // g at end means global - it will not stop after the first instance
		
		// new array containing strings that match regex expression
		var matches = templateString.match(regexMatch);
		
		// iterate over array
		matches.map(function(key){

			key = key.replace(/{{/g, '').replace(/}}/g, '');
			var correspondingValue = values[key];
			templateString = templateString.replace(key, correspondingValue).replace(/{{/g, '').replace(/}}/g, '');
		});

		// write to DOM
		$("body").append(templateString);
	};

	convertTemplate($template, data.myDetails);
});