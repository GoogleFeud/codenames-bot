const fs = require('fs');
const Util = require("./Util.js");
const Word = require("../Codenames/Word.js");

class Wordlist extends Array {
  constructor() {
     super();
     const data = fs.readFileSync("./assets/Words.txt", {encoding: 'utf8'});
     this.push(...data.split("\r\n"));
  }

  random(amount = 1, willDelete = false) {
    let res = new Words();
    while (res.length != amount) {
        let rng = Util.rngArr(this);
        if (!res.includes(rng)) {
           res.push(rng.toLowerCase());
           if (willDelete) this.splice(this.indexOf(rng), 1);
        }
    }
    return res;
}
}

const wordlist = new Wordlist();

class Words extends Array {
    constructor() {
        super();
    }

    random(amount = 1, willDelete = false) {
         let res = new Words();
         while (res.length != amount) {
             let rng = Util.rngArr(this);
             if (!res.includes(rng)) {
                res.push(rng.toLowerCase());
                if (willDelete) this.splice(this.indexOf(rng), 1);
             }
         }
         return res;
    }

    fromWhich(num, type) {
        const which = wordlist.random(num, true);
        const res = new Words();
        for (let i=0; i < which.length; i++) {
                const word = new Word(which[i], {type: type});
                res.push(word);
              //  this[this.indexOf(word.word)] = word;
        }
        return res; 
    }

    shuffle() {
            for (let i = this.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this[i], this[j]] = [this[j], this[i]];
            }
    }

    red() {
        return this.filter(w => w.type == 'red' && w.guessedBy);
    }

    blue() {
        return this.filter(w => w.type == 'blue' && w.guessedBy);
    }

    assassin() {
        return this.filter(w => w.type == 'assassin' && w.guessedBy)[0];
    }

    neutral() {
        return this.filter(w => w.type == 'neutral' && w.guessedBy);
    }

    unguessed() {
        return this.filter(w => !w.guessedBy);
    }




}

module.exports = {
    Words: Words,
    Wordlist: wordlist
}