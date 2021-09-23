let recognizing;
let string = "";

import getDbImages from './main.js'

// Connect start/stop button
$("#button-start").on("click", toggleStartStop);

if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("La web speech api n'est pas compatible sur ce navigateur");
} else {
    var recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
    recognition.continuous = true;   //Suitable for dictation. 
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "fr-FR";
    recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
}

// Start recognizing
recognition.onstart = function () {
    $("#button-start").addClass("active");
    $("#button-start").html('<i class="fas fa-book-reader"></i>' + "Mettre fin à l'histoire");
    recognizing = true;
};

// Stop recognizing
recognition.onend = function () {
    $("#button-start").removeClass("active");
    $("#button-start").html('<i class="fas fa-book-reader"></i>' + "Commencer l'histoire");
    recognizing = false;
};

// When there is a result while recognizing
recognition.onresult = function (event) {
    let final = "";
    let interim = "";
    if (typeof (event.results) === 'undefined') {
        console.error("STOP")
        recognition.stop();
        return;
    }

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        // if result is consider as final result
        if (event.results[i].isFinal) {
            final = event.results[i][0].transcript;
            // Get keywords while removing useless words (un, une, le, la, ...)
            let qresult = filterPhrase(string);

            connectAppendElements(qresult.length);
            
            for (let i = 0; i < qresult.length; i++) {
                // check if we need to make a request to google or if we can work with our database
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
            string = interim;
            $("#textarea .temp").html(interim);
        }
    }

    if (!$("#textarea .temp").length) $("#textarea").append(`<p class="temp">${interim}</p>`);
    else $("#textarea .temp").html(interim);
    
};

// Launch or stop detection
export default function toggleStartStop() {
    if (recognizing) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

/**
 * Connect an event to detect when we append elements inside our section. Used to sort images with words order
 * @param {int} lengthCount the length of the array of words 
 */
function connectAppendElements(lengthCount) {
    $(".story-ctn-temp").on('DOMNodeInserted DOMNodeRemoved', function () {
		if ($(".story-ctn-temp").children().length === lengthCount) {
			for (let i = 0; i < lengthCount; i++) {
                // Get data-index value from loop and clone element into display section
                $(".story-ctn").append($(".story-ctn-temp").children(`img[data-index='${i + 1}']`).clone())
			}

            // Unbind event and clean temp section content
			$(".story-ctn-temp").unbind('DOMNodeInserted DOMNodeRemoved');
            $(".story-ctn-temp").html("");
            return;
		}
	});
}