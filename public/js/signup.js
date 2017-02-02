
$(function(){


	$('#js-space-signup-form').submit(function(e){
		e.preventDefault();
		var fname = $('#js-fname').val();
		var lname = $('#js-lname').val();
		var address = $('#js-user-address').val();
		var city = $('#js-user-city').val();
		var state = $('#js-user-state').val();
		var zipcode = $('#js-user-zipcode').val();
		var username = $('#js-username').val();//TODO: check unique username
		var password = $('#js-password').val();
		var email = $('#js-email').val();
		var url ="/signup";
		$.ajax({
			url: url,
			type:'POST',
			data: {
				firstName:fname,
				lastName:lname,
				address:address+" "+city+" "+state+" "+zipcode,
				username:username,
				password:password,
				email:email
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
