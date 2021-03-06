var url ="/list-properties";

function logout(){
	sessionStorage.clear();
	window.location.href='/';
}

$( ".icon" ).click(function() {
	$(".hamburgerMenu" ).slideToggle("slow");
});

$(function(){

	$( "#js-date-selected" ).datepicker({minDate: 0, dateFormat: 'yy-mm-dd'});
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
		$('#addSpace_link').css('display','block');
	}

	$(".includedContent").load("../html/login.html");
	/************Login form :start**************/
	$('a.login-modal').click(function() {
    // Add the mask to body
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);
    $('#login-box').css("display","block");
    return false;

});

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
		window.location.href="./html/listPage.html?city="+cityName+"&date="+dateSelected;
	});


	/*************search form:End*************/


	$(document).on('submit', '#signin', function(e) {
		e.preventDefault();
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
				if(data.length==0) {
					$('#js-errorMsg').css('display','block');
					$('#js-errorMsg').css('color','red');
					$('#signin').each(function(){
					    this.reset();
					});
				}
				else {
					if(data[0].password==password) {
						console.log("passed");
						$('#mask , .login-popup').fadeOut(300 , function() {
							$('#mask').remove();
						});
						$('#login_link').html("Hello "+data[0].firstName+"!");
						$( '#login_link' ).hover(
							function() {
								$( this ).addClass( 'hover' );
							}, function() {
								$( this ).removeClass( 'hover' );
							}
							);
						$('#signup_link').html("<a href='#' onclick='logout()'>Log Out</a>");
						$('#addSpace_link').css('display','block');
						if (window.sessionStorage) {
							sessionStorage.setItem("userid", data[0]._id);
							sessionStorage.setItem("username", data[0].firstName);
						}
					} else {
						$('#js-errorMsg').css('display','block');
						$('#js-errorMsg').css('color','red');
						$('#signin').each(function(){
					    this.reset();
					});
					}

				};
			},
			error:function(){
				console.log("Sorry, server error");
			}
		});
	});

});
