/**
 * Select key randomly from hash.
 * @param {Object} wordDict : Input hash.
 * @returns {String} key : Key selected randomly.
 */
const selectKeyRandomly = (wordDict) => {
    const keysArray = Object.keys(wordDict);
    const dictLength = keysArray.length;
    const index = Math.floor(Math.random() * dictLength);
    const key = keysArray[index];
    return key;
};

/**
 * Get value from wordDict with key and replace space for <br> tag.
 * @param {String} key : Key to indicate value.
 * @returns {String} formattedAnswer
 */
const formatAnswer = (key) => {
    const answerText = wordDict[key];
    const splittedAnswer = answerText.split(" ");
    let formattedAnswer = splittedAnswer.map(a => a + "<br>").join(" ");
    return formattedAnswer;
};

/**
 * 
 * @param {String} key : Key to indicate value you want to delete.
 * @returns {Void}
 */
const archiveWord = (key) => {
    delete wordDict[key];
};

const wordDict = words_2;
const buttonElems = document.getElementsByClassName("phaseButton");
const buttons = Array.from(buttonElems);
const kogo = document.getElementById("kogo");
const gendaigo = document.getElementById("gendaigo");

// "次へ"のボタン
buttons[1].onclick = function () {
    const question = selectKeyRandomly(wordDict);
    if (question === undefined) {
        kogo.textContent = "終了";
    }
    else {
        kogo.textContent = question;
    }
    gendaigo.textContent = "";
};

// "意味を表示"のボタン
buttons[0].onclick = function () {
    const question = kogo.textContent;
    const answer = formatAnswer(question);
    gendaigo.innerHTML = answer;
    archiveWord(question);
};