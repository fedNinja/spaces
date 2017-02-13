
$(function(){
//    $('#js-contactForm').on("submit",'#contactus',function(e){
    $('#contactus').click(function(e) {
   //  $('#js-contactForm').submit(function(e){
    e.preventDefault();
    console.log("I am inside submit contact");
    var name = $('#js-name').val();
    var email = $('#js-email').val();
    var comment = $('#js-comment').val()||" ";
    console.log(name+" is here");
    var url = '/contactus';
    $.ajax({
        url: url,
        type:'POST',
        data: {
            name:name,
            email:email,
            comment:comment
        },
        success:function(data){
            console.log("Yay, send an email!");
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
            toastr.success('Thanks for contacting us. Your email is recieved!');    
        },
        error:function(){
            console.log("Sorry, server error");
        }

        });
    });        
});