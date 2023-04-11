$(document).ready(function(){


    var valor01 = $("#txtvalor1");
    var valor02 = $("#txtvalor2");

   $("#btnSomar").click(function(){
    var result= parseFloat(valor01.val()) + parseFloat(valor02.val());
    $("#resultado").html(result) ;
   });

   $("#btnSubtrair").click(function(){
    var result = parseFloat(valor01.val()) - parseFloat(valor02.val());
    $("#resultado").html(result) ;

    if (result < 0) {
        $("#resultado").css("color","aqua")
    }else{
        $("#resultado").css("color","black")
    }
   });
})