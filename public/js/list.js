var city;
var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();
var iw;

function logout(){
	console.log("I am in logout");
sessionStorage.clear();
window.location.href='/';
}

var processData = function(data, reqDate) {
	var dispData =  checkAvailableDates(data,reqDate);
	if(!dispData || dispData.length <1) console.log("no matching record found");
	else {
		displayData(dispData);  
		var results = []; 
		dispData.forEach(function(record, index) {
			results.push([record.name, record.address + " " + record.city, index+1]);
		});
		getLocation(city, results);
    }
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

var getLocation = function(address, results) {
	geocoder = new google.maps.Geocoder();
	var latitude, longitude;
	geocoder.geocode({'address': address}, function(res, status) {
		if (status == google.maps.GeocoderStatus.OK) {
    		latitude = res[0].geometry.location.lat();
	   		longitude = res[0].geometry.location.lng();
	   		initMap(latitude, longitude);
	   		for (var i=0; i<results.length; i++) {
	   			geocodeAddress(results, i);
	   		}
    	} 
	}); 
}

var geocodeAddress = function(locations, i) {
	var title = locations[i][0];
	var address = locations[i][1];
	var url = locations[i][2];
	geocoder.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var marker = new google.maps.Marker({
				icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
				map: map,
				position: results[0].geometry.location,
				title: title,
				animation: google.maps.Animation.DROP,
				address: address,
				url: "Property "+url
			})
			infoWindow(marker, map, title, address, url);
			bounds.extend(marker.getPosition());
			map.fitBounds(bounds);
		}
	});
}

var infoWindow = function(marker, map, title, address, url) {
	google.maps.event.addListener(marker, 'click', function() {
		var html = "<div><h3>"+title+"<h3><p>" +address+"<br></div></p></div>";
		iw = new google.maps.InfoWindow({
			content: html,
			maxWidth: 350
		});
		iw.open(map, marker);
	});
}

var displayData = function(data) {
	console.log(data.length);
	console.log(data);
	var numberOfRows = Math.ceil(data.length/4);
	for(var i=0;i<numberOfRows;i++){
		$('#listing').append('<div class="space-row" id="row'+(i+1)+'">');
		if (data.length < 4*(i+1)) {
			for (var j=4*i; j< data.length ; j++) {
				console.log(data[j].picture);
				$('#row'+(i+1)).append('<div class="space"><a href=\"../html/details.html?id='+data[j]._id+'\"><div class="space-img" style="background-image: url(\'../uploads/'+data[j].picture[0]+'\')"></div><div class="space-desc">'+data[j].address+'</div></div></a></div>');
			}
		} else {
			for (var j=4*i; j< 4*(i+1) ; j++) {
				$('#row'+(i+1)).append('<div class="space"><a href=\"../html/details.html?id='+data[j]._id+'\"><div class="space-img" style="background-image: url(\'../uploads/'+data[j].picture[0]+'\')"></div><div class="space-desc">'+data[j].address+'</div></div></a></div>');
			}
		}
	}
}


function initMap(newlat, newlon){
        var uluru = {lat: newlat, lng: newlon};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: uluru
        });
        $('#map').show();
//        return map;
      }

$(function(){

	if (sessionStorage.length>0) {
		console.log(sessionStorage.getItem("userid"));
		console.log(sessionStorage.getItem("username"));
		$('#login_link').html("Welcome "+sessionStorage.getItem("username")+"!");
		$('#signup_link').html("<a href='#' onclick='logout()'>Log Out</a>");
	}

$(".includedContent").load("../html/login.html");

var url ="/list-properties";
city = window.location.href.split('?')[1].split('&')[0].split('=').pop();
if(city.includes('%20')) city = city.replace('%20',' ');


var reqDate = window.location.href.split('?')[1].split('&')[1].split('=').pop();
$.ajax({
				url: url,
				type:'GET',
				data: {
					city:city

				},
				success:function(data){
				if(!data) console.log('no spaces found');
				else processData(data,reqDate);
				},
				error:function(){
					console.log("Sorry, server error");
				}
			});	

$('#js-capacity').change(function(){
	var capacity = $('#js-capacity').find(":selected").val();
});

$('#js-price').change(function(){
	var rate = $('#js-price').find(":selected").val();
});

$('input:checkbox').change(function (){
	var name=$(this).val();
	var value= $(this).is(':checked');
});

});
