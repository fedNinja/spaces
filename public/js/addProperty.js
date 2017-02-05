
$(function(){

/*
	if (sessionStorage.length>0) {
		console.log(sessionStorage.getItem("userid"));
		console.log(sessionStorage.getItem("username"));
		$('#login_link').html("Welcome "+sessionStorage.getItem("username")+"!");
		$('#signup_link').html("<a href='#' onclick='logout()'>Log Out</a>");
	}

	enctype =  "multipart/form-data"
     		  action =  "/upload"
     		method =  "post"
     		*/
//var a = $(document).getResponseHeader('filename');
//console.log(a);

/*$('#uploadForm').submit(function(e){
	e.preventDefault();
	var sampleFile = $('#sampleFile');
	var files = sampleFile[0].files[0];
	console.log($('#sampleFile'));
	console.log (sampleFile);
	console.log (files);
	//console.log($('#sampleFile'));
	$.ajax({
		url: '/upload',
		type:'POST',
		'content-Type':'multipart/form-data',

		data: {
			picture:files
		},
		success:function(data){
			console.log(data);
		},
		error:function(){
			console.log("Sorry, server error");
		}
	});	

});*/

var dropzone = new Dropzone(".dropzone", { url: "/upload" });
   dropzone.on("addedfile", function(file) {
       console.log("file added", file);
   });

   dropzone.on("complete", function(e) {
       if(e.status === "error") {
           console.log("error", e);
       }
       else {
           console.log("upload completed.....");
       }
   });


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
				owner:userId,
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
