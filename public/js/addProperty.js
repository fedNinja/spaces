
$(function(){


	$('#js-space-desc-form').submit(function(e){
		e.preventDefault();
		var name = $('#js-name').val();
		var address = $('#js-address').val();
		var city = $('#js-city').val();
		var state = $('#js-state').val();
		var zipcode = $('#js-zipcode').val();
		var dateFrom = $('#js-dateFrom').val();
		var dateTo = $('#js-dateTo').val();
		var timeFrom = $('#js-timeFrom').val();
		var timeTo = $('#js-timeTo').val();
		var rate = $('#js-rate').val();
		var capacity = $('#js-capacity').val();
		var amenities = [];
		if ($('#js-chbox1').is(':checked')) amenities.push($('#js-chbox1').val());
		if ($('#js-chbox2').is(':checked')) amenities.push($('#js-chbox2').val());
		if ($('#js-chbox3').is(':checked')) amenities.push($('#js-chbox3').val());
		if ($('#js-chbox4').is(':checked')) amenities.push($('#js-chbox4').val());
/*		var startTime = new Date();
		var endTime = new Date();
		var parts_Start = startTime.match(/(\d+):(\d+) (AM|PM)/);
		var parts_End = endTime.match(/(\d+):(\d+) (AM|PM)/);
		if (parts_Start) {
    	var hours = parseInt(parts_Start[1]),
        minutes = parseInt(parts_Start[2]),
        tt = parts_Start[3];
    	if (tt === 'PM' && hours < 12) hours += 12;
    	startTime.setHours(hours, minutes, 0, 0);
		}

		if (parts_End) {
    	var hours = parseInt(parts_End[1]),
        minutes = parseInt(parts_End[2]),
        tt = parts_End[3];
    	if (tt === 'PM' && hours < 12) hours += 12;
    	endTime.setHours(hours, minutes, 0, 0);
		}
*/		
		console.log("time from",timeFrom);
		console.log("time from",timeTo);
		var url ="/list-properties";
		$.ajax({
			url: url,
			type:'POST',
			data: {
				name:name,
				city:city,
				address:address+" "+city+" "+state+" "+zipcode,
				capacity:Number(capacity),
				rate: Number(rate),
				amenities:amenities,
				available_date_from: dateFrom,
				available_date_to: dateTo,
				available_time_from: timeFrom,
				available_time_to: timeTo
				},
				success:function(data){
				console.log(data);
				},
				error:function(){
					console.log("Sorry, server error");
				}
			});	

	});

});
