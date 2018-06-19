const wordDict = {
    "あいぎやう": "かわいらしさ 思いやり",
    "あいなし": "おもしろくない 気に食わない ただもう",
    "あからさまなり": "ちょっと ほんのしばらく 全く",
    "あきらむ": "明らかにする 晴らす"
}

function selectPairRandomly(wordDict) {
    const keysArray = Object.keys(wordDict);
    const dictLength = keysArray.length;
    const index = Math.floor(Math.random() * dictLength);
    const key = keysArray[index];
    return [key, wordDict[key]];
}

const button = document.getElementById("nextButton");
const kogo = document.getElementById("kogo");
const gendaigo = document.getElementById("gendaigo");

button.onclick = function () {
    const content = selectPairRandomly(wordDict);
    kogo.textContent = content[0];
    gendaigo.textContent = content[1];
};