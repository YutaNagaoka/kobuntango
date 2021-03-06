const kogo = document.getElementById("kogo");
const gendaigo = document.getElementById("gendaigo");
const nextButton = document.getElementById("nextButton");
const seekbar = document.getElementById("seekbar");

const selectButtons = Array.from(document.getElementsByClassName("selectButton"));
selectButtons.forEach((element, index) => {
    element.onclick = () => {
        const quizHundler = new QuizHundler(wordDicts[index]);
        hideModalWindow();
    };
});


/**
 * Hide modal window element when select button has pushed.
 */
const hideModalWindow = () => {
    const modalWindow = document.getElementById("modal-window");
    modalWindow.style.display = "none";
}


/**
 * Class to hundle quiz.
 */
class QuizHundler {
    constructor(wordDict) {
        this.wordDict = wordDict;
        this.allWordsNumber = Object.keys(this.wordDict).length;
        this.currentWordsNumber = this.allWordsNumber;
        this.uncertainWords = {};
        this.quizEndMessage = "終了"

        // Force "this" to indicate QuizHundler's instance
        // because "this" indicates nextButton object.
        const _bottonHundler = this.buttonHundler;
        nextButton.onclick = _bottonHundler.bind(this);
    }

    /**
     * Function which deals with button event.
     */
    buttonHundler() {
        if (kogo.textContent === "") {
            this.nextQuestion();
        }
        else if (kogo.textContent === this.quizEndMessage) {
            return;
        }
        else if (gendaigo.textContent === "") {
            this.showAnswer();
        }
        else if (gendaigo.textContent !== "") {
            this.nextQuestion();
        }
    }

    /**
     * Called when you want to show the answer.
     */
    showAnswer() {
        const question = kogo.textContent;
        const answer = this.formatAnswer(question);
        gendaigo.innerHTML = answer;
        this.archiveWord(question);
    }

    /**
     * Called when you want to move on next question.
     */
    nextQuestion() {
        const question = this.selectKeyRandomly(this.wordDict);
        if (question === undefined) {
            kogo.textContent = this.quizEndMessage;
        }
        else {
            kogo.textContent = question;
        }
        this.updateSeekbarWidth();
        gendaigo.textContent = "";
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
    
    /**
     * Calculate next width of seekbar and overwrite it directly.
     * @returns {Void}
     */
    updateSeekbarWidth() {
        const OriginalWidth = 80;
        const wordsNumber = this.currentWordsNumber;
        const width = OriginalWidth * wordsNumber / this.allWordsNumber;
        seekbar.style.width = width + "vw";
    }
}
