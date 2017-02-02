var myIndex = 0;
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
    setTimeout(carousel, 15000); // Change image every 2 seconds
}


$(function(){
	$(".includedContent").load("../html/login.html");
	
	/************Login form :start**************/
	$('a.login-modal').click(function() {
    // Add the mask to body
    console.log("Inside the log in modal");
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);
    $('#login-box').css("display","block");
    return false;

	});
	//carousel();

	$(document).on('click', 'a.close, #mask', function() {
  		$('#mask , .login-popup').fadeOut(300 , function() {
    	$('#mask').remove();  
		}); 
		return false;
	});
	/****Login form :End**************/


	/*************Search-form:start***********/
	$('#js-space-form').submit(function(e){
		e.preventDefault();
		console.log("I am here");
		var cityName = $('#js-location').find(":selected").val();
		var dateSelected = $('#js-date-selected').val();
		console.log(dateSelected);
		window.location.href="./html/listPage.html?city="+cityName+"&date="+dateSelected;
	});


	/*************search form:End*************/

//	$('#signin').submit(function(e){
	$(document).on('submit', '#signin', function(e) {
		e.preventDefault();
		console.log("Into the login submit");
		var name = $('#username').val();
		var password = $('#password').val();
		var requestData={
			"username":name
		};
		$.ajax({
     			url: '/users',
     			type: 'GET',
     			data: requestData,
     			
     			success: function(data){
     				console.log("data",data);
     				if(data.length==0) {
     					console.log('username not found');
     					$('#js-errorMsg').css('display','block');
     					$('#js-errorMsg').css('color','red');
     				}
					else {
						if(data[0].password==password) {
							console.log("yay! user autentihcated");
					  		$('#mask , .login-popup').fadeOut(300 , function() {
					    	$('#mask').remove();  
					    });
					  		//$('#login_link').css('display','none');
					  		$('#login_link').html("Welcome User!");
					    } else {
							console.log("Password incorrect");
							$('#js-errorMsg').css('display','block');
							$('#js-errorMsg').css('color','red');
						}

					};
 				},
				error:function(){
					console.log("Sorry, server error");
    			}
     		});
	});

	/*$('#owner-form').submit(function(e){
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

 });*/



});