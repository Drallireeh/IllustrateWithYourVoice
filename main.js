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
})});