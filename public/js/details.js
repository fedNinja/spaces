var map, rate, hours;

var populateTimings= function(data){ //1:00 PM
	var startTime = data[0].available_time_from.split(' ')[0].split(':')[0];
	var startAMPM = data[0].available_time_from.split(' ')[1];
	var endTime = data[0].available_time_to.split(' ')[0].split(':')[0];
	var endAMPM = data[0].available_time_to.split(' ')[1];
	var startTimeCounter = Number(startTime);
	var endTimeCounter = Number(endTime);
	if(startAMPM != endAMPM) {
		var tempText;
		endTimeCounter = endTimeCounter + 12;
		for(var i=startTimeCounter; i<13; i++) {
			if (i < 12) tempText = startAMPM+'">'+i+':00 ' + startAMPM+'</option>';
			else tempText = endAMPM+'">'+i+':00 '+endAMPM+'</option>';
			$("#js-startTime").append('<option value="'+i+':00 '+tempText);
		}
		for(var i=1; i<endTimeCounter-12; i++) {
			$("#js-startTime").append('<option value="'+i+':00 '+endAMPM+'">'+i+':00 '+endAMPM+'</option>');
		}
		for(var i=startTimeCounter+1; i<13; i++) {
			if (i < 12) tempText = startAMPM+'">'+i+':00 ' + startAMPM+'</option>';
			else tempText = endAMPM+'">'+i+':00 '+endAMPM+'</option>';
			$("#js-endTime").append('<option value="'+i+':00 '+tempText);
		}
		for(var i=1; i<=endTimeCounter-12; i++) {
			$("#js-endTime").append('<option value="'+i+':00 '+endAMPM+'">'+i+':00 '+endAMPM+'</option>');
		}
	} else {
		for(var i=startTimeCounter; i<endTimeCounter; i++) {
			$("#js-startTime").append('<option value="'+i+':00 '+startAMPM+'">'+i+':00 '+startAMPM+'</option>');
		}
		for(var i=startTimeCounter+1; i<=endTimeCounter; i++) {
			$("#js-endTime").append('<option value="'+i+':00 '+startAMPM+'">'+i+':00 '+startAMPM+'</option>');
		}
	}

}

var displayData = function(data){
	rate = data[0].rate;
	if(!data[0].rate) {
		data[0].rate=0;
	}
	
	$("#js-property-img").append('<div class="col-12"><img class="imgDimension" src="../uploads/'+data[0].picture[0]+'"></div>');
	$("#js-details-space").append('<h2 class="space-desc-details">'+data[0].address+" "+data[0].city+'</h2><p><h3 class="space-desc-details">About the space</h3></p><hr><p class="space-desc-details">'+data[0].name+'. This space is conveniently located at '+data[0].city+'.Spacious and comfortable place to hold your meeting or event.</p>'+
		'<h3 class="space-desc-details"><p>Amenities</p></h3><hr><p class="space-desc-details">'+data[0].amenities+'</p><h3 class="space-desc-details">Location Map</h3><hr><div id="propertyMap" class="mapDiv"></div><h3 class="space-desc-details">Rules</h3><hr><p class="space-desc-details">All booking start and end time are inclusive of set time and end time.</p>');
	$("#js-book-space").append('<span class="col-6 padTop">Total Attendees:'+data[0].capacity+'</span><span class="col-6 padTop verticalLine">$'+data[0].rate+' Per hour</span><hr>'
		+'<div class="col-12 form-book-space" id="js-book-form"><span class="col-4"><input type="date" class="date-sel" name="date-entry" id="js-date-booked" type="date" required="true"></span>'
		+'<span class="col-4"><select class="startTime" id="js-startTime" required="true"></select></span>'
		+'<span class="col-4"><select class="endTime" id="js-endTime" required="true"></select></span>'
		+'<div class="col-12 total-price" id="js-total-price"> </div>'
		+'<div class="submitBtn btn-book-space col-12"><button type="submit" id="js-book-submit">Book Space</button></div></div>'    			
		);
	populateTimings(data);
	getLocation(data[0].address+" "+data[0].city);
}

function initMap(newlat, newlon){
	var uluru = {lat: newlat, lng: newlon};
	map = new google.maps.Map(document.getElementById('propertyMap'), {
		zoom: 15,
		center: uluru
	});
	$('#propertyMap').show();
//        return map;
}

var getLocation = function(address) {
	geocoder = new google.maps.Geocoder();
	var latitude, longitude;
	geocoder.geocode({'address': address}, function(res, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			latitude = res[0].geometry.location.lat();
			longitude = res[0].geometry.location.lng();
			initMap(latitude, longitude);
			geocodeAddress(address);
		} 
	}); 
}

var geocodeAddress = function(address) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var marker = new google.maps.Marker({
				icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
				map: map,
				position: results[0].geometry.location,
				address: address
			})
		}
	});
}



$(function(){
	var total;
	var url = "/list-properties";
	var spaceId = window.location.href.split('?')[1].split('=').pop();

	if (sessionStorage.length>0) {
		console.log(sessionStorage.getItem("userid"));
		console.log(sessionStorage.getItem("username"));
		$('#login_link').html("Welcome "+sessionStorage.getItem("username")+"!");
		$('#signup_link').html("<a href='#' onclick='logout()'>Log Out</a>");
	}

	$(".includedContent").load("../html/login.html");
	$.ajax({
		url: url,
		type:'GET',
		data: {
			_id:spaceId
		},
		success:function(data){
			if(!data) console.log('no details of space found');
			else displayData(data);
		},
		error:function(){
			console.log("Sorry, server error");
		}
	});	

	$('#js-book-space').on("click",'#js-book-submit',function(e){
		e.preventDefault();
		$('#js-total-price').css('display','block');
		var totalTime;
		var initTime = $('#js-startTime').find(':selected').val();
		var finalTime = $('#js-endTime').find(':selected').val();
		var startTime = initTime.split(' ')[0].split(':')[0];
		var startAMPM = initTime.split(' ')[1];
		var endTime = finalTime.split(' ')[0].split(':')[0];
		var endAMPM = finalTime.split(' ')[1];
		var startTimeCounter = Number(startTime);
		var endTimeCounter = Number(endTime);
		if((startAMPM != endAMPM) || (startTimeCounter == 12)) {
			totalTime = endTimeCounter-startTimeCounter+12;
		}
		else{
			totalTime = endTimeCounter-startTimeCounter;
		}
		total = rate*totalTime + .05*(rate*totalTime);
		$('#js-total-price').append('<b><p class="col-12">Price</p></b><hr><p class="col-12"><span class="col-6">$'+rate+'.00 '+'x'+totalTime+'hours</span><span class="col-6">$'+(rate*totalTime)+'.00</span></p><p><span class="col-6">Processing Fee(5%)</span><span class="col-6">$'+.05*(rate*totalTime)+'.00</span></p><hr><p class="col-12"><span class="col-6"><b>Total</b></span><span class="col-6">$'+total+'.00</span></p>');
		$('.submitBtn').html('<button type="submit" id="js-reserve">Reserve</button>');
	});

	$('#js-book-space').on("click",'#js-reserve',function(e){
		e.preventDefault();
		var dateSelected = $('#js-date-booked').val();
		var startTime = $('#js-startTime').val();
		var endTime = $('#js-endTime').val();
		if (sessionStorage.length >0) {
			sessionStorage.setItem("propertyid", spaceId);
			sessionStorage.setItem("paymentAmount", total);
			sessionStorage.setItem("rDate", dateSelected);
			sessionStorage.setItem("startTime", startTime);
			sessionStorage.setItem("endTime", endTime);
			window.location.href='../html/payment.html';

		}

	});	

});
