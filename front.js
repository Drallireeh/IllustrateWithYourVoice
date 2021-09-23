$( document ).ready(function() {
    var settingsDiplayed = false
    $('#settings > i').click(function() {
     if (settingsDiplayed == true){
         $('#settings > ul').css("visibility", "hidden");
         settingsDiplayed = false;
     } else {
         $('#settings > ul').css("visibility", "initial");
         settingsDiplayed = true;
    }
    });
    $('#display-text').click(function(){
        if ($('#display-text').is(':checked')) {
            $('#textarea').show();
        } else {
            $('#textarea').hide();
        }
    })
    $('#reset-content').click(function(){
        $('.story-ctn').empty();
    })
});