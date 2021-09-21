const keyword_extractor = require('keyword-extractor');

// Add inside window to use it everywhere 
window.filterPhrase = function(sentence) {
    //  Extract the keywords
    const extraction_result =
        keyword_extractor.extract(sentence, {
            language: "french",
            remove_digits: true,
            return_changed_case: true,
            return_chained_words: true,
            remove_duplicates: false
        });

    return extraction_result
}