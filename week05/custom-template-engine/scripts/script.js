// separate the concerns: data
var data = {}
data.myDetails = {
  firstName: "Bob",
  lastName: "Hope",
  birthDate: "30 December 1856"
};

$(function(){
	// use regex to target double curly parentheses + key values from data object
	function convertTemplate(templateString, values){
		var regexMatch = /\{\{([a-zA-Z]*)\}\}/g; // g at end means global - it will not stop after the first instance
		var matches = templateString.match(regexMatch);
		for(var i = 0; i < matches.length; i++){
			var key = matches[i].replace(/{{/g, '').replace(/}}/g, '');
			var correspondingValue = values[key];
			console.log(key, correspondingValue);
			templateString = templateString.replace(key, correspondingValue);
			//console.log(templateString);

			// use regex to remove curly braces, then write to DOM
		};
		//console.log(matches);
	};

	// get custom template
	var $template = $("#my-custom-template").html();
	convertTemplate($template, data.myDetails);
	$("body").append($template);
});