/**
 * Function which deals with button event.
 */
const buttonHundler = () => {
    if (kogo.textContent === ""){
        nextQuestion();
    }
    else if (gendaigo.textContent === "") {
        showAnswer();
    }
    else if (gendaigo.textContent !== "") {
        nextQuestion();
    }
};

/**
 * Called when you want to show the answer.
 */
const showAnswer = () => {
    if (kogo.textContent === "終了"){ return; }
    let question = kogo.textContent;
    let answer = formatAnswer(question);
    gendaigo.innerHTML = answer;
    archiveWord(question);
};

/**
 * Called when you move on next question.
 */
const nextQuestion = () => {
    let question = selectKeyRandomly(wordDict);
    if (question === undefined) {
        kogo.textContent = "終了";
    }
    else {
        kogo.textContent = question;
    }
    gendaigo.textContent = "";
};

/**
 * Select key randomly from hash.
 * @param {Object} wordDict  Input hash.
 * @returns {String} Key selected randomly.
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
 * @param {String} key  Key to indicate value.
 * @returns {String} The answer formatted suitablly.
 */
const formatAnswer = (key) => {
    const answerText = wordDict[key];
    const splittedAnswer = answerText.split(" ");
    let formattedAnswer = splittedAnswer.map(a => a + "<br>").join(" ");
    return formattedAnswer;
};

/**
 * Delete element of wordDict indicated param key.
 * @param {String} key  Key to indicate value you want to delete.
 * @returns {Void}
 */
const archiveWord = (key) => {
    delete wordDict[key];
};

const wordDict = words_2;
const kogo = document.getElementById("kogo");
const gendaigo = document.getElementById("gendaigo");
const nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", buttonHundler);