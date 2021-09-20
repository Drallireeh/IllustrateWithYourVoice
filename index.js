const keyword_extractor = require("keyword-extractor");

const sentence =
"Je voudrais savoir comment acheter une maison rouge un samedi matin vers 10 heures"

//  Extract the keywords
const extraction_result =
keyword_extractor.extract(sentence,{
    language:"french",
    remove_digits: true,
    return_changed_case:true,
    return_chained_words:true,
    remove_duplicates: false

});

console.log(extraction_result)