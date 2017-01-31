var city;

var processData = function(data, reqDate) {
	var dispData =  checkAvailableDates(data,reqDate);
	if(!dispData || dispData.length <1) console.log("no matching record found");
	else {
		displayData(dispData);  
		var results = []; 
	getLocation(city);
dispData.forEach(function(record) {
	results.push(record.address + " " + record.city);
});

window.eqfeed_callback = function(results) {
		console.log("I am here....");
		console.log(results);
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          console.log(latLng);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }


	}
}


function eqfeed_callback(response) {
  map.data.addGeoJson(response);
}

var checkAvailableDates = function(data, reqDate) {
	var returnData = [], avl_date_from, avl_date_to ;
	data.forEach(function(record){
		avl_date_from =  record.available_date_from.split('T')[0];
		avl_date_to =  record.available_date_to.split('T')[0];
		if ((reqDate >= avl_date_from) && (reqDate <= avl_date_to)) returnData.push(record);
	});
	return returnData;
}

var getLocation = function(address) {
	var geocoder = new google.maps.Geocoder();
	var latitude, longitude;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
    		latitude = results[0].geometry.location.lat();
	   		longitude = results[0].geometry.location.lng();
	   		initMap(latitude, longitude);
    	} 
	}); 
}

var displayData = function(data) {
	//console.log(data.length);
	var numberOfRows = Math.ceil(data.length/4);
	for(var i=0;i<numberOfRows;i++){
		$('#listing').append('<div class="space-row" id="row'+(i+1)+'">');
		if (data.length < 4*(i+1)) {
			for (var j=4*i; j< data.length ; j++) {
				$('#row'+(i+1)).append('<div class="space"><div class="space-img" style="background-image: url('+data[j].picture+')"></div><div class="space-desc">'+data[j].address+'</div></div></div>');
			}
		} else {
			for (var j=4*i; j< 4*(i+1) ; j++) {
				$('#row'+(i+1)).append('<div class="space"><div class="space-img" style="background-image: url('+data[j].picture+')"></div><div class="space-desc">'+data[j].address+'</div></div></div>');
			}
		}
	}
}


function initMap(newlat, newlon){
        var uluru = {lat: newlat, lng: newlon};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: uluru
        });
//        var marker = new google.maps.Marker({
//          position: uluru,
//          map: map
//        });
        $('#map').show();
      }

$(function(){

var url ="/list-properties";
city = window.location.href.split('?')[1].split('&')[0].split('=').pop();
var reqDate = window.location.href.split('?')[1].split('&')[1].split('=').pop();
$.ajax({
				url: url,
				type:'GET',
				data: {
					city:city

				},
				success:function(data){
				//console.log(data);
				if(!data) console.log('no spaces found');
				else processData(data,reqDate);
				},
				error:function(){
					console.log("Sorry, server error");
				}
			});	
});
