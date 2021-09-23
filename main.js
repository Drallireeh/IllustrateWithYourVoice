$( document ).ready(function() {
   var settingsDiplayed = false
   $('#settings > i').click(function() {
    if (settingsDiplayed == true){
        $('#settings > ul').hide()
        settingsDiplayed = false;
    } else {
        $('#settings > ul').css("display", "inline-flex");
        settingsDiplayed = true;
    }
    
    
})});