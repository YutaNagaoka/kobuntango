const selectKeyRandomly = (wordDict) => {
    const keysArray = Object.keys(wordDict);
    const dictLength = keysArray.length;
    const index = Math.floor(Math.random() * dictLength);
    const key = keysArray[index];
    return key;
};

// const wordDict = getDict("a");
const wordDict = words_1;
const buttonElems = document.getElementsByClassName("phaseButton");
const buttons = Array.from(buttonElems);
const kogo = document.getElementById("kogo");
const gendaigo = document.getElementById("gendaigo");

// "次へ"のボタン
buttons[1].onclick = function () {
    const selectedWord = selectKeyRandomly(wordDict);
    kogo.textContent = selectedWord;
    gendaigo.textContent = "";
};

// "意味を表示"のボタン
buttons[0].onclick = function () {
    gendaigo.textContent = wordDict[kogo.textContent];
};