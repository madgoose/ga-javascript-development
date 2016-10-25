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

	// use regex to target double curly parentheses + key values from data object
	function convertTemplate(templateString, values){

		var regexMatch = /\{\{([a-zA-Z]*)\}\}/g; // g at end means global - it will not stop after the first instance
		var matches = templateString.match(regexMatch);
		
		for(var i = 0; i < matches.length; i++){
			var key = matches[i].replace(/{{/g, '').replace(/}}/g, '');
			var correspondingValue = values[key];
			templateString = templateString.replace(key, correspondingValue);
			templateString = templateString.replace(/{{/g, '').replace(/}}/g, '');
		};

		// write to DOM
		$("body").append(templateString);
	};

	convertTemplate($template, data.myDetails);
});