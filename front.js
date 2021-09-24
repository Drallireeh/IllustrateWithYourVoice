$(document).ready(function () {
    var settingsDiplayed = false;
    // settings container
    $('#settings > i').click(function () {
        if (settingsDiplayed == true) {
            $('#settings > ul').css("visibility", "hidden");
            settingsDiplayed = false;
        } else {
            $('#settings > ul').css("visibility", "initial");
            settingsDiplayed = true;
        }
    });
    // Display/hide textarea
    $('#display-text').click(function () {
        if ($('#display-text').is(':checked')) {
            $('#textarea').show();
        } else {
            $('#textarea').hide();
        }
    });
    // Reset content
    $('#reset-content').click(function () {
        $('.story-ctn').empty();
        $("#textarea").empty();
    });

    // Hide modal
    $("#modal-home").on("click", ".close", function() {
        $("#modal-home").hide();
    })
});