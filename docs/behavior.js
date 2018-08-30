/** 
 *  Class to hundle quiz.
 */
class QuizOwner {
    constructor(wordDict) {
        this.wordDict = {};
        this.quizEndMessage = "終了";
    }

    setWordDict(wordDict) {
        this.wordDict = wordDict;
        this.allWordsNumber = Object.keys(this.wordDict).length;
        this.currentWordsNumber = this.allWordsNumber;
    }

    /**
     * Called when you want to move on next question.
     */
    returnNextQuestion() {
        const question = this.selectKeyRandomly(this.wordDict);
        if (!question) {
            kogo.textContent = this.quizEndMessage;
        }
        else {
            kogo.textContent = question;
        }
        updateSeekbarWidth();
        gendaigo.textContent = "";
    }

    /**
     * Called when you want to show the answer.
     */
    returnAnswer() {
        const question = kogo.textContent;
        const answer = this.formatAnswer(question);
        gendaigo.innerHTML = answer;
        // this.archiveWord(question);
    }

    /**
     * Select key randomly from hash.
     * @param {Object} wordDict  Input hash.
     * @returns {String} Key selected randomly.
     */
    selectKeyRandomly(wordDict) {
        const keysArray = Object.keys(wordDict);
        const dictLength = keysArray.length;
        const index = Math.floor(Math.random() * dictLength);
        const key = keysArray[index];
        return key;
    }

    /**
     * Get value from wordDict with key and replace space for <br> tag.
     * @param {String} key  Key to indicate value.
     * @returns {String} The answer formatted suitablly.
     */
    formatAnswer(key) {
        const answerText = this.wordDict[key];
        const splittedAnswer = answerText.split(" ");
        let formattedAnswer = splittedAnswer.map(a => a + "<br>").join(" ");
        return formattedAnswer;
    }

    /**
     * Delete element of wordDict indicated param key.
     * @param {String} key  Key to indicate value you want to delete.
     * @returns {Void}
     */
    archiveWord(key) {
        delete this.wordDict[key];
        const previousWordsNumber = Object.keys(this.wordDict).length;
        this.currentWordsNumber = previousWordsNumber;
    }
}


// Declaration of constants.
const kogo = document.getElementById("kogo");
const gendaigo = document.getElementById("gendaigo");
const seekbar = document.getElementById("seekbar");
const quizOwner = new QuizOwner();
const uncertainWords = {};

const selectButtons = Array.from(document.getElementsByClassName("selectButton"));
selectButtons.forEach((element, index) => {
    element.onclick = () => {
        quizOwner.setWordDict(wordDicts[index]);
        hideModalWindow();
    };
});

document.getElementById("showAnswerButton").onclick = () => {
    buttonHundler();
}

document.getElementById("uncertainButton").onclick = () => {
    uncertainWords[kogo.textContent] = quizOwner.wordDict[kogo.textContent]
    quizOwner.archiveWord(kogo.textContent);
    console.log(uncertainWords);
    buttonHundler();
};

document.getElementById("sureButton").onclick = () => {
    quizOwner.archiveWord(kogo.textContent)
    buttonHundler();
};

/**
 * Function which deals with button event.
 */
const buttonHundler = () => {
    if (kogo.textContent === "") {
        quizOwner.returnNextQuestion();
    }
    else if (kogo.textContent === quizOwner.quizEndMessage) {
        var result = confirm("分からなかった単語をもう一度学習しますか?");
        if (result) {
            quizOwner.setWordDict(uncertainWords);
            quizOwner.returnNextQuestion();
        }
    }
    else if (gendaigo.textContent === "") {
        quizOwner.returnAnswer();
    }
    else if (gendaigo.textContent !== "") {
        quizOwner.returnNextQuestion();
    }
}

/**
 * Hide modal window element when select button has pushed.
 */
const hideModalWindow = () => {
    const modalWindow = document.getElementById("modal-window");
    modalWindow.style.display = "none";
}

/**
 * Calculate next width of seekbar and overwrite it directly.
 * @returns {Void}
 */
const updateSeekbarWidth = () => {
    const OriginalWidth = 80;
    const wordsNumber = quizOwner.currentWordsNumber;
    const width = OriginalWidth * wordsNumber / quizOwner.allWordsNumber;
    seekbar.style.width = width + "vw";
}
