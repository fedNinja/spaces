$(function(){
	   console.log(" i am in payment");
		$('#js-amt-paid').html("$"+sessionStorage.getItem("paymentAmount")+".00");
		var propId=sessionStorage.getItem("propertyid");
		var dateReserved=sessionStorage.getItem("rDate");
		var bookStTime=sessionStorage.getItem("startTime");
		var bookEndtime=sessionStorage.getItem("endTime");
		var userId=sessionStorage.getItem("userid");
		var userName=sessionStorage.getItem("username");
		console.log("propId: "+propId);
		console.log("dateReserved: "+dateReserved);
		console.log("bookStTime: "+bookStTime);
		console.log("bookEndtime: "+bookEndtime);
		console.log("userId: "+userId);
		console.log("userName: "+userName);
		var url='/reservations';
	$('#js-paymentForm').submit(function(e){
		e.preventDefault();
		$.ajax({
		url: url,
        type:'POST',
        data: {
            propId:propId,
            dateReserved:dateReserved,
            bookStTime:bookStTime,
            bookEndtime:bookEndtime,
            userId:userId,
            userName:userName
        },
        success:function(data){
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr.success('Thanks for doing buisness with us. Your space is reserved!');   
        },
        error:function(){
            console.log("Sorry, server error");
        }
        });

	});





});