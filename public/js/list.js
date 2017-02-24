var city, reqDate;
var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();
var iw;
var listData;

function logout(){
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

var getMatchingRecords = function(options) {
	var returnData = [];
	var isMatchingRecordFlag;
	listData.forEach(function(record) {
		isMatchingRecordFlag = true;
		console.log("checking for record");
		options.forEach(function(option) {
			if ($.inArray(option, record.amenities) == -1) {
				isMatchingRecordFlag = false;
			}
		});
		if (isMatchingRecordFlag) returnData.push(record);
		else console.log("record not found");
	});
	return returnData;
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
	var numberOfRows = Math.ceil(data.length/4);
	for(var i=0;i<numberOfRows;i++){
		if(i==0) $('#listing').html('<div class="space-row" id="row'+(i+1)+'">');
		else $('#listing').append('<div class="space-row" id="row'+(i+1)+'">');
		if (data.length < 4*(i+1)) {
			for (var j=4*i; j< data.length ; j++) {
				$('#row'+(i+1)).append('<div class="space"><a class="spaceAddress" href=\"../html/details.html?id='+data[j]._id+'\"><div class="space-img" style="background-image: url(\'../uploads/'+data[j].picture[0]+'\')"></div><div class="space-desc">'+data[j].address+'</div></div></a></div>');
			}
		} else {
			for (var j=4*i; j< 4*(i+1) ; j++) {
				$('#row'+(i+1)).append('<div class="space"><a class="spaceAddress" href=\"../html/details.html?id='+data[j]._id+'\"><div class="space-img" style="background-image: url(\'../uploads/'+data[j].picture[0]+'\')"></div><div class="space-desc">'+data[j].address+'</div></div></a></div>');
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
		$('#login_link').html("Hello "+sessionStorage.getItem("username")+"!");
		$('#signup_link').html("<a href='#' onclick='logout()'>Log Out</a>");
		$('#addSpace_link').css('display','block');
	}

$(".includedContent").load("../html/login.html");

var url ="/list-properties";
city = window.location.href.split('?')[1].split('&')[0].split('=').pop();
if(city.includes('%20')) city = city.replace('%20',' ');


reqDate = window.location.href.split('?')[1].split('&')[1].split('=').pop();
$.ajax({
				url: url,
				type:'GET',
				data: {
					city:city

				},
				success:function(data){
					listData = data;
				if(!data) console.log('no spaces found');
				else processData(data,reqDate);
				},
				error:function(){
					console.log("Sorry, server error");
				}
			});	

$('#js-capacity').change(function(){
	var capacity = $('#js-capacity').find(":selected").val();
	var dispData = [];
	$('#listing').html("Sorry, No matching records found!!!");
	listData.forEach(function(record) {
		switch (capacity) {
			case "l10":
				if (record.capacity <= 10) dispData.push(record);
				break;
			case "l20":
				if ((record.capacity > 11) && (record.capacity <=20)) dispData.push(record);
				break;
			case "l30":
				if ((record.capacity > 21) && (record.capacity <=30)) dispData.push(record);
				break;
			case "l50":
				if ((record.capacity > 31) && (record.capacity <=50)) dispData.push(record);
				break;
			case "l100":
				if ((record.capacity > 51) && (record.capacity <=100)) dispData.push(record);
				break;
			case "m100":
				if (record.capacity > 100) dispData.push(record);
				break;
			default:
				dispData.push(record);
				break;
		}
	});
	processData(dispData, reqDate);	

});

$('#js-price').change(function(){
	var rate = $('#js-price').find(":selected").val();
	var dispData = [];
	$('#listing').html("Sorry, No matching records found!!!");
	listData.forEach(function(record) {
		switch (rate) {
			case "l50":
				if (record.rate <= 50) dispData.push(record);
				break;
			case "l100":
				if ((record.rate > 50) && (record.rate <=100)) dispData.push(record);
				break;
			case "l150":
				if ((record.rate > 100) && (record.rate <=150)) dispData.push(record);
				break;
			case "l200":
				if ((record.rate > 150) && (record.rate <=200)) dispData.push(record);
				break;
			case "l250":
				if ((record.rate > 200) && (record.rate <=250)) dispData.push(record);
				break;
			case "m250":
				if (record.rate > 250) dispData.push(record);
				break;
			default:
				dispData.push(record);
			break;
		}
	});
	processData(dispData, reqDate);
});


var $allothers = $('input[type="checkbox"][name="amenities"]').not('#all');
var $anyothers = $('input[type="checkbox"][name="amenities"]').not('#any');
$('input:checkbox').change(function (){
	var name=$(this).val();
	var value = $(this).is(':checked');
	var inputs = ["kitchenette", "restroom", "flatscreen", "whiteboard"];
	var dispData = [];
	$('#listing').html("Sorry, No matching records found!!!");
	switch (name) {
		case "any":
			console.log("Any checked");
			if(!value) $('#all').prop('checked', true);
			$anyothers.prop('checked', false);
			dispData = listData;
			break;
		case "all":
			console.log("All checked");
			if (!value) {
				$('#any').prop('checked', true);
				dispData = listData;
			}
			else {
				$allothers.prop('checked', false);
				dispData = getMatchingRecords(inputs);
			}
			break;
		default:
			console.log("Other than all and any");
			var count=0;
			var selected = [];
			for(var i=0; i<inputs.length; i++) {
				name=$("#"+inputs[i]).val();
				value= $("#"+inputs[i]).is(':checked');
				if(value) {
					$('#all').prop('checked', false);
					$('#any').prop('checked', false);
					selected.push(name);
					count++;
				}
			}
			console.log("count is "+count);
			console.log(selected);
			if (count == 4) dispData = getMatchingRecords(inputs);
			else dispData = getMatchingRecords(selected);
			if (count == 0) $('#any').prop('checked', true);
			break;
	}
	console.log(dispData);
	processData(dispData, reqDate);
});

});
