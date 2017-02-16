
function logout(){
sessionStorage.clear();
window.location.href='/';
}


$(function(){
if (sessionStorage.length > 0) {
		$('#login_link').html("Hello "+sessionStorage.getItem("username")+"!");
		$( '#login_link' ).hover(
			function() {
				$( this ).addClass( 'hover' );
			}, function() {
				$( this ).removeClass( 'hover' );
			}
			);
		$('#signup_link').html("<a href='#' onclick='logout()'>Log Out</a>");
		$('#js-add-Space').css('display','block');
    }

var userId = sessionStorage.getItem("userid");
$('#testHidden').val(userId);
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
				amenities:JSON.stringify(amenities),
				owner:userId,
				available_date_from: dateFrom,
				available_date_to: dateTo,
				available_time_from: timeFrom,
				available_time_to: timeTo
			},
			success:function(data){
				window.location.href = '../html/imageDrop.html?propertyid='+data._id;
			},
			error:function(){
				console.log("Sorry, server error");
			}
		});	

	});

});
