$(function() {
	
	// local variables
	var $shoppingCart = $("#shopping-cart");
	var $totalPrice = $("#total");
	var $buttons = $(".buy-item");
	var currentTotal = parseInt($totalPrice.html());

	var updateCartPrice = function(productPrice) {
		
		// update price
		currentTotal = currentTotal + productPrice;
		
		// write to DOM
		$totalPrice.html(currentTotal);

	};

	var updateCartList = function(productPrice, productTitle) {
				
		// write to DOM
		$shoppingCart.append("<li>"+productTitle+" (&pound;<span>"+productPrice+"</span>)<button class=\"remove-item\">remove item</button></li>");

	};

	var removeListItem = function(itemToRemove){
		itemToRemove.remove();
	};

	// add click event handler to all ".remove-item" buttons
	$shoppingCart.on( "click", ".remove-item", function() {
		
		// get this li element
		var itemToRemove = $(this).parent().remove();
		// get value from adjacent span element
		var productPrice = parseInt($(this).siblings("span").html());
		
		removeListItem(itemToRemove);
		updateCartPrice(productPrice * -1); // multiply by -1 to create negative version of number
	});

	// add click event handler to all ".buy-item" buttons 
	$buttons.click(function() {
		
		// get string values of .product-title and .price sibling elements
		var productTitle = $(this).siblings(".product-title").html();
		var productPrice = parseInt($(this).siblings(".price").html());
		
		// function call
		updateCartPrice(productPrice);
		updateCartList(productPrice, productTitle);

	});

});