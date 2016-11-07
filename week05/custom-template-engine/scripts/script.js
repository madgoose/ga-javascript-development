$(function(){

	// declare local variables
	var $templateDetails = $("#template-details").html();
	var $templateJobs = $("#template-jobs").html();

	function convertTemplate(templateString, values){

		//console.log(values);

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

		// write to DOM
		//debugger
		return templateString;
	};

	// function call
	$("body").append(convertTemplate($templateDetails, data.myDetails));
	//$("body").append(convertTemplate($templateJobs, data.jobs));
});