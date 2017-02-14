$('i').hover(function(){
     if($(this).hasClass('fa-star-o')){
       $(this).addClass('fa-star');
     }

   }, function(){
     if($(this).hasClass('fa-star-o')){
       $(this).removeClass('fa-star');
     }
   });

   $('.fa').click(function(){
     var id = $(this).attr('id');
     id = id.slice(5);
     if(id){       
        if($('#star-' + id).hasClass('fa-star-o')) {
          for(var i = 1; i <= id; i++){
            console.log(i);
            $('#star-' + i).removeClass('fa-star-o');
            $('#star-' + i).addClass('fa-star');
          }
        } else {
          for (var j=Number(id)+1; j<= 5; j++) {
            $('#star-' + j).removeClass('fa-star');
            $('#star-' + j).addClass('fa-star-o');
          }
        }
     }
   });
   