$(function() {
	
	// local variables
	var $cart = $("#shopping-cart");
	var $totalPrice = $("#total");
	var $buttons = $(".buy-item");
	var currentTotal = parseInt($totalPrice.html());

	// add click event handler to all elements with "buy-item" class 
	$buttons.click(function() {
		
		// get string values of .product-title and .price sibling elements
		var productTitle = $(this).siblings(".product-title").html();
		var productPrice = parseInt($(this).siblings(".price").html());
		
		// function call
		updateCart(productTitle, productPrice);
	});

	var updateCart = function(productTitle, productPrice) {
		
		currentTotal = currentTotal + productPrice;
		$totalPrice.html(currentTotal);
		//console.log(currentTotal);
	};

});