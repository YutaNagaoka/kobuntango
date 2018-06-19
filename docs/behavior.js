const wordDict = {
    "あいぎやう": "かわいらしさ 思いやり",
    "あいなし": "おもしろくない 気に食わない ただもう",
    "あからさまなり": "ちょっと ほんのしばらく 全く",
    "あきらむ": "明らかにする 晴らす"
}

const button = document.getElementById("nextButton");
button.onclick = function () {
    const elem = document.getElementById("panel-in");
    const content = selectPairRandomly(wordDict);
    elem.textContent = content[0];
};


function selectPairRandomly(wordDict) {
    const keysArray = Object.keys(wordDict);
    const dictLength = keysArray.length;
    const index = Math.floor(Math.random() * dictLength);
    const key = keysArray[index];
    return [key, wordDict[key]];
}
