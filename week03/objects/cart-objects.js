var item1 = {
	name: 'trainers',
	price: 119.34
};

var item2 = {
	name: 'raincoat',
	price: 50.32
};

var item3 = {
	name: 't-shirt',
	price: 10.99
};

var cart = {
	totalValue: function() {
		var value = 0;
		for(var i = 0; i < this.items.length; i++) {
			//console.log(this.items[i].price);
			value += this.items[i].price;
		};
		return value;
	},
	items: [item1,item2,item3]
};

cart.totalValue();

console.log('\n  ')
console.log(cart.totalValue());