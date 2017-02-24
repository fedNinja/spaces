$(function(){

	$(".forgotModal").load("../html/forgotPassword.html");
	/*******forgot password:start***********/
	$('a.login-modal').click(function() {
    // Add the mask to body
	    $('body').append('<div id="mask"></div>');
	    $('#mask').fadeIn(300);
	    $('#forgot-password-box').css("display","block");
	    return false;

		});

	$('#fpassword').submit(function(e) {
			e.preventDefault();
			console.log("ba ho ho ho");
			$('.pwdDiv').hide();
			$('.infoDiv').css('display','block');
		});

	$(document).on('click', 'a.close, #mask', function() {
		$('#mask , .login-popup').fadeOut(300 , function() {
			$('#mask').remove();  
		}); 
		return false;
	});

	//$('#fpassword').on('click', '#fpassword_submit',  function(e) {
		
		/************forgot Password:End**********/
		$('#signinMain').on('submit',function(e){
			e.preventDefault();
			var name = $('#uname').val();
			var password = $('#pword').val();
			var requestData={
				"username":name
			};
			$.ajax({
				url: '/users',
				type: 'GET',
				data: requestData,

				success: function(data){
					console.log("data", data);
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
							if (window.sessionStorage) {
								sessionStorage.setItem("userid", data[0]._id);
								sessionStorage.setItem("username", data[0].firstName);
							}
							window.location.href='/';
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
