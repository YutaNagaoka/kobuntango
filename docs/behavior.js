const fetchDict = (selection) => {
    let url = "https://script.google.com/macros/s/AKfycbwm3mG_PUYvY4YvAIACtWcC0yQvkp_hK4cxH4sUULwIT_VBWeq6/exec"
    url += "?num=" + selection;
    //var wordDict = null;
    fetch(url)
        .then(responce => {
            responce.json();
        });
    //return wordDict;
}

const getDict = (selection) => {
    let url = "https://script.google.com/macros/s/AKfycbwm3mG_PUYvY4YvAIACtWcC0yQvkp_hK4cxH4sUULwIT_VBWeq6/exec"
    url += "?num=" + selection;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200){
            const myJson = JSON.parse(xhr.responseText);
            console.log(myJson);
            return myJson;
        }
    };
    xhr.open('GET', url);
    xhr.send(null);
}

const selectKeyRandomly = (wordDict) => {
    const keysArray = Object.keys(wordDict);
    const dictLength = keysArray.length;
    const index = Math.floor(Math.random() * dictLength);
    const key = keysArray[index];
    return key;
}

const wordDict = getDict("a");
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