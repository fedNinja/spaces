var myIndex = 0;
carousel();
var url ="/list-properties";

function carousel() {
	var i;
	var x = document.getElementsByClassName("carousel-img");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";  
	}
	myIndex++;
	if (myIndex > x.length) {myIndex = 1}    
		x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 2000); // Change image every 2 seconds
}


$(function(){

	$('#js-space-form').submit(function(e){
		e.preventDefault();
		console.log("I am here");
		var cityName = $('#js-location').find(":selected").val();
		var dateSelected = $('#js-date-selected').val();
		console.log(dateSelected);
		window.location.href="./html/listPage.html?city="+cityName+"&date="+dateSelected;
	});

	$('#owner-form').submit(function(e){
		e.preventDefault();
		var files=$('#fileUpload')[0].files[0];
		var form=$('#owner-form')[0];
		console.log(files);
		//if(files.length>0){
			var formData = new FormData(form);
			// loop through all the selected files
			//for (var i = 0; i < files.length; i++) {
				//var file = files[i];

     		// add the files to formData object for the data payload
     		//formData.append('uploads', files);
     		console.log("form data", formData);
     		$.ajax({
     			url: '/upload',
     			type: 'POST',
     			data: formData,
     			processData: false,
     			contentType: false,
     			success: function(data){
     				console.log(data);
     			}
     		});
     	//}
     //}

 });



});