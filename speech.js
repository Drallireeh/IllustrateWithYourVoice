let recognizing;
let string = "";
let timeBreak = 600;
let timeoutVar = null;

if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("La web speech api n'est pas compatible sur ce navigateur");
} else {
    var recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
    console.log(recognition)
    recognition.continuous = true;   //Suitable for dictation. 
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "fr-FR";
    recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
}

recognition.onstart = function () {
    $("#button-start").css("background-color", "green");
    $("#button-start").text("Stopper l'enregistrement");
    recognizing = true;
};

recognition.onsoundstart = function() {
}

recognition.onspeechend = function() {
}

recognition.onend = function () {
    $("#button-start").css("background-color", "red");
    $("#button-start").text("Commencer l'enregistrement");
    recognizing = false;
};

recognition.onresult = function (event) {
    let final = "";
    let interim = "";
    if (typeof (event.results) === 'undefined') {
        console.error("STOP")
        recognition.stop();
        return;
    }

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final = event.results[i][0].transcript;
            console.log(filterPhrase(string));
            qresult = filterPhrase(string);


            axios.get('http://127.0.0.1:8000/api/test?q=' + qresult.join(' '))
              .then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
              });

            $(".temp").html(final + " ").removeClass("temp");
        } else {
            interim += event.results[i][0].transcript;
            string = interim;
            $("#textarea .temp").html(interim);
            clearTimeout(timeoutVar);
            phraseEndDetection();
        }
    }

    if (!$("#textarea .temp").length) $("#textarea").append(`<p class="temp">${interim}</p>`);
    else $("#textarea .temp").html(interim);
    
};

function toggleStartStop() {
    if (recognizing) {
        recognition.stop();
    } else {
        recognition.start();
        phraseEndDetection();
    }
}

function phraseEndDetection() {
    timeoutVar = setTimeout(function() {
        console.log("requête");
    }, timeBreak);
}