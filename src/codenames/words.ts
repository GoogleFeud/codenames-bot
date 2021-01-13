import fs from "fs";

let _words: Array<string>|undefined;

export function getWords() : Array<string> {
    if (_words) return _words;
    const wordStr = fs.readFileSync("./assets/words.txt", "utf-8");
    _words = wordStr.split("\r\n").map(w => w.toLowerCase());
    if (_words.length === 1) _words = wordStr.split("\n").map(w => w.toLowerCase());
    return _words;
}

export function random(amount = 1) : Array<string> {
    if (!amount) return [];
    const wordArr = getWords();
    const words: Array<string> = [];
    do {
        const item = wordArr[Math.floor(Math.random() * wordArr.length)];
        if (words.includes(item)) continue;
        words.push(item);
    }while(words.length < amount);
    return words;
}