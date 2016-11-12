// 7 restful routes defined

// would normally point to a field/table inside a database
let foods = [
  { id: 0, name: "Sushiritto", yumminess: "quite" },
  { id: 1, name: "Green Eggs & Ham", yumminess: "Sure!" },
  { id: 2, name: "Crayfish", yumminess: "Depending..." },
  { id: 3, name: "Foie Gras", yumminess: "omg" },
  { id: 4, name: "Kale", yumminess: "meh" }
];

// INDEX
const foodsIndex = (req, res) => {
	res.render("foods/index", { foods })
}

// In ES6
// Writing { ABunchOfData }
// will create {ABunchOfData: ABunchOfData}

// NEW // a form to send back a new food
const foodsNew = (req, res) => {
	res.render("foods/news")
}

// CREATE
const foodsCreate = (req, res) => {
	let food = req.body.food;
	food.id = foods.length;
	foods.push(food);
	res.redirect(302, "/foods");
}

// SHOW
const foodsShow = (req, res) => {
	const id = parseInt(req.params.id); // convert string to integer
	const food = foods[id];
	res.render("foods/show", { food }) // === { food: food }
}

// EDIT
const foodsEdit = (req, res) => {
	const id = parseInt(req.params.id); // same as above
	res.render("foods/edit", { food: foods[id] });
}

// UPDATE
const foodsUpdate = (req, res) => {
	const id = parseInt(req.params.id); // same as above
	let food = req.body.food;
	food.id = id;
	foods[id] = food;
	res.redirect(302, `/foods/${id}`);
}

// DELETE
const foodsDelete = (req, res) => {
	const id = parseInt(req.params.id); // same as above
	foods.splice(id, 1);
	foods = foods.map(food => {
		food.id--;
		return food;
	});
	res.redirect(302, "/");
}

module.exports = {
	index: foodsIndex,
	new: foodsNew,
	create: foodsCreate,
	show: foodsShow,
	edit: foodsEdit,
	update: foodsUpdate,
	delete: foodsDelete
}