var map;

var displayData = function(data){
	console.log("data", data);
	$("#js-property-img").append('<div class="col-12"><img src="../uploads/'+data[0].picture[0]+'"></div>');
	$("#js-details-space").append('<h2 class="space-desc-details">'+data[0].address+" "+data[0].city+'</h2><p><h3 class="space-desc-details">About the space</h3></p><hr><p class="space-desc-details">'+data[0].name+'. This space is conveniently located at '+data[0].city+'.Spacious and comfortable place to hold your meeting or event.</p>'+
		                   '<h3 class="space-desc-details"><p>Amenities</p></h3><hr><p class="space-desc-details">'+data[0].amenities+'</p><h3 class="space-desc-details">Location Map</h3><hr><div id="propertyMap" class="mapDiv"></div><h3 class="space-desc-details">Rules</h3><hr><p class="space-desc-details">All booking start and end time are inclusive of set time and end time.</p>');
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
			//infoWindow(marker, map, address);
			//bounds.extend(marker.getPosition());
			//map.fitBounds(bounds);
		}
	});
}



$(function(){
	var url = "/list-properties";
	var spaceId = window.location.href.split('?')[1].split('=').pop();
	console.log(spaceId);

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

});
