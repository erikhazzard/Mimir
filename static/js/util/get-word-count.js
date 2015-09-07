/**
 * returns a count of the number of words in a passed in string
 * @property inputString {string} - Input data string
 */
function getWordCount(inputString) {
    var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    var matchedPattern = inputString.match(pattern);
    var numWords = 0;

    if(matchedPattern === null){ return numWords; }

    var i = 0;
    var len = matchedPattern.length;

    for(i = 0; i < len; i++) {
        if(matchedPattern[i].charCodeAt(0) >= 0x4E00) {
            numWords += matchedPattern[i].length;
        } else {
            numWords += 1;
        }
    }
    return numWords;
}

export default getWordCount;
