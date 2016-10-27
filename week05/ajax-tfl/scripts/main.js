$(function(){
	// api endpoint for car park spaces in tfl car parks
	// including credentials
	var url = 'https://api.tfl.gov.uk/Occupancy/CarPark?app_id=badf762f&app_key=7855f2b8ed157ebe004b43fcba7ba876';

	var source = $("#parking-template").html(),
		template = Handlebars.compile(source);

	$.ajax({
		url: url,
		success: function(data, status) {
			for (var i = 0; i < data.length; i++) {
				var CarPark = data[i];
				$("#parking-list").append(template(CarPark));
			}
		},
		error: function(xhr, status) {
			$("#parking-list").append("something went wrong ("+status+") ");
		}
	});
});