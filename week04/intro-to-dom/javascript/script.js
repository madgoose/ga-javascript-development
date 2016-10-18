function appendH1() {
	var headingMain = document.createElement("h1");
	var headingMainText = document.createTextNode("Hello world");
	headingMain.appendChild(headingMainText);
	document.body.appendChild(headingMain);
}

function manipulateExistingContent(){
	var helloElement = document.getElementById("hello");
	helloElement.style.color = "red";

	var colours = ["red","yellow","blue","green","papayawhip"];

	var campusesContainer = document.getElementById("ga-campuses");
	var gaCampuses = campusesContainer.getElementsByTagName("li");

	for(var i = 0; i < gaCampuses.length; i++){
		gaCampuses[i].style.backgroundColor = colours[i];
	}
}

function watchForm(){
	var button = document.getElementsByTagName("button")[0];
	button.onclick = function(){
		var textInput = document.getElementById("my-input");
		MyApp.doSomething(textInput.value);
		return false;
	}
}

MyApp = {};

MyApp.doSomething = function(name){
	alert("Hello " + name);
}

window.onload = function(){
	appendH1();
	manipulateExistingContent();
	watchForm();
}



// generate random RGB colour
