let recognizing;
let string = "";
let timeBreak = 600;
let timeoutVar = null;

import getDbImages from './main.js'

$("#button-start").on("click", toggleStartStop);

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
    $("#button-start").addClass("active");
    $("#button-start").html('<i class="fas fa-book-reader"></i>' + "Mettre fin à l'histoire");
    recognizing = true;
};

recognition.onsoundstart = function() {
}

recognition.onspeechend = function() {
}

recognition.onend = function () {
    $("#button-start").removeClass("active");
    $("#button-start").html('<i class="fas fa-book-reader"></i>' + "Commencer l'histoire");
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
            let qresult = filterPhrase(string);

            connectAppendElements(qresult.length);
            
            for (let i = 0; i < qresult.length; i++) {
                getDbImages().then(response => {
                    const isSameName = (element) => element.name.toLowerCase() === qresult[i];
                    let indexName = response.findIndex(isSameName)
                    if (indexName !== -1) $(".story-ctn").append(`<img src="${response[indexName].url}"/>`);
                    else searchGoogle(qresult[i], i); 
                });
            }

            string = "";
            $(".temp").html(final + " ").removeClass("temp");
        } else {
            interim += event.results[i][0].transcript;
            console.log(interim)
            string = interim;
            $("#textarea .temp").html(interim);
            clearTimeout(timeoutVar);
            phraseEndDetection();
        }
    }

    if (!$("#textarea .temp").length) $("#textarea").append(`<p class="temp">${interim}</p>`);
    else $("#textarea .temp").html(interim);
    
};

export default function toggleStartStop() {
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

function connectAppendElements(lengthCount) {
    $(".story-ctn-temp").on('DOMNodeInserted DOMNodeRemoved', function () {
		if ($(".story-ctn-temp").children().length === lengthCount) {
			for (let i = 0; i < lengthCount; i++) {
                $(".story-ctn").append($(".story-ctn-temp").children(`img[data-index='${i + 1}']`).clone())
			}
			$(".story-ctn-temp").unbind('DOMNodeInserted DOMNodeRemoved');
            $(".story-ctn-temp").html("");
            return;
		}
	});
}