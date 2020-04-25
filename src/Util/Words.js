const fs = require('fs');
const Word = require("../Codenames/Word.js");

class Words extends Array {
    constructor(...items) {
        super(...items);
    }

    random(amount = 1, willDelete = false) {
        amount = Math.min(this.length, amount);
        if (willDelete) return Words.from({ length: amount }, () => this.splice(Math.floor(Math.random() * this.length), 1)[0]);
        else {
        const arr = this.slice();
		return Words.from({ length: amount }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
        }
    }

    fromWhich(num, type) {
        const which = this.random(num, true);
        const res = new Words();
        for (let i=0; i < which.length; i++) {
                const word = new Word(which[i], {type: type});
                res.push(word);
                this[this.indexOf(word.word)] = word;
        }
        return res; 
    }

    shuffle() {
            for (let i = this.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this[i], this[j]] = [this[j], this[i]];
            }
    }

    remove(word) {
        this.splice(this.indexOf(word), 1);
    }

    replace(amount, replacements = [], start = 0) {
         this.splice(start, amount, ...replacements)
    }

    red() {
        return this.filter(w => w.type == 'red' && w.guessedBy);
    }

    blue() {
        return this.filter(w => w.type == 'blue' && w.guessedBy);
    }

    assassin() {
        return this.filter(w => w.type == 'assassin' && w.guessedBy);
    }

    neutral() {
        return this.filter(w => w.type == 'neutral' && w.guessedBy);
    }

    unguessed() {
        return this.filter(w => !w.guessedBy);
    }

}

class Wordlist extends Words {
    constructor() {
       super();
       const data = fs.readFileSync("./assets/Words.txt", {encoding: 'utf8'});
       this.push(...data.split("\r\n").map(w => w.toLowerCase()));
    }
  
  }

module.exports = {
    Words: Words,
    Wordlist: new Wordlist()
}