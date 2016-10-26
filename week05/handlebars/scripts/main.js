$(function(){
	var data = {
		title: "General Assembly",
		body: "Online/Offline Digital Education",
		courses: ["WDI", "UXDI", "JS", "DAT", "PDM"]
	};

	var jobs = [
	{
		companyName: "Entropic Synergies",
		startDate: "10/09/2009",
		endDate: "10/09/2010",
		jobTitle: "Junior developer"
	},
	{
		companyName: "Le Wattman",
		startDate: "23/11/2010",
		endDate: "16/12/2012",
		jobTitle: "Developer"
	},
	{
		companyName: "My Startup",
		startDate: "22/02/2013",
		endDate: "22/05/2014",
		jobTitle: "Lead developer"
	},
	{
		companyName: "General Assembly",
		startDate: "22/07/2014",
		endDate: "----",
		jobTitle: "Faculty Chair"
	}
	];

	// simple template example
	var source = $("#my-template").html();
	var template = Handlebars.compile(source);
	$("#my-container").append(template(data));

	// collection example
	var jobTemplateSource = $("#resume").html();
	var jobTemplate = Handlebars.compile(jobTemplateSource);
	// jobs is the array declared above. we create an object with the key 'myPastJobs'
	// the object only has 1 key-value pair per iteration through the array,
	// with each key called "myPastJobs" per job
	$("#my-container").append(jobTemplate({myPastJobs: jobs}));
})