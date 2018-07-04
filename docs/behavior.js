const kogo = document.getElementById("kogo");
const gendaigo = document.getElementById("gendaigo");
const nextButton = document.getElementById("nextButton");
const seekbar = document.getElementById("seekbar");


class QuizHundler {
    constructor() {
        this.wordDict = words_1;
        this.allWordsNumber = Object.keys(this.wordDict).length;
        this.currentWordsNumber = this.allWordsNumber;

        // Force "this" to indicate this class's instance. 
        const _bottonHundler = this.buttonHundler;
        nextButton.onclick = _bottonHundler.bind(this)
    }

    /**
     * Function which deals with button event.
     */
    buttonHundler() {
        if (kogo.textContent === "") {
            this.nextQuestion();
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
        if (kogo.textContent === "終了") { return; }
        const question = kogo.textContent;
        const answer = this.formatAnswer(question);
        gendaigo.innerHTML = answer;
        this.archiveWord(question);
    }

    /**
     * Called when you move on next question.
     */
    nextQuestion() {
        const question = this.selectKeyRandomly(this.wordDict);
        if (question === undefined) {
            kogo.textContent = "終了";
        }
        else {
            kogo.textContent = question;
            const currentWidth = this.calculateSeekbarWidth();
            seekbar.style.width = currentWidth + "vw";
        }
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
     * Returns next seekbar length.
     * @returns {Float} Next seekbar length which changes every question.
     */
    calculateSeekbarWidth() {
        const OriginalWidth = 80;
        const wordsNumber = this.currentWordsNumber;

        const width = OriginalWidth * wordsNumber / this.allWordsNumber;
        return width;
    }
}

const quizHundler = new QuizHundler();

