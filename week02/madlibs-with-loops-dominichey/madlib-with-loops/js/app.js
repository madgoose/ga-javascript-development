// initialise _global_ variables
var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter'],
	startupY = ['Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest'],
	targetElement = document.getElementById('xForY'),
	btnCreate = document.getElementById('create'),
	btnSave = document.getElementById('save'),
	btnPrint = document.getElementById('print'),
	favourites = document.getElementById('favourites'),
	favouritesList = [];

// generate and display random name
function generateRandomName() {
	var random1 = Math.floor((Math.random() * startupX.length)),
		random2 = Math.floor((Math.random() * startupY.length));
	// display random sentence in h1#xForY heading
	targetElement.textContent = 'A startup that is ' + startupX[random1] + ', but for ' + startupY[random2];
};

// save current sentence to favourites
function addToFavourites() {
	favouritesList.push(targetElement.textContent);
	console.log('Favourite \"' + targetElement.textContent + '\" added');
};

// print array of favourites to ordered list
function printFavourites() {
	// clear existing list first to prevent duplicate output
	while (favourites.firstChild) {
	    favourites.removeChild(favourites.firstChild);
	}
	// iterate through array of favourite sentences
	favouritesList.forEach(function (arrayItem, index){
		// local variables to display current arrayItem as li element
		var favouriteItemText = arrayItem,
			favouriteItem = document.createElement('li');
		// add class index for future DOM manipulation
		//favouriteItem.setAttribute('class', 'favourite' + (index+1));
		favouriteItem.setClassName = 'favourite' + (index+1);
		// append list item to unordered list
		favourites.appendChild(favouriteItem);
		// set textContent of current li to current arrayItem string
		favouriteItem.textContent = favouriteItemText;
	});
};

// 'Create' button clicked
btnCreate.addEventListener('click', function() {
	generateRandomName();
}, false);

// 'Save' button clicked
btnSave.addEventListener('click', function() {
	addToFavourites();
}, false);

// 'Print' button clicked
btnPrint.addEventListener('click', function() {
	printFavourites();
}, false);