const {Collection} = require("discord.js");


class Team {
    constructor(name, options = {}) {
        this.name = name;
        this.game = options.game;
        this.spymaster = options.spymaster;
        this.wordsLeft = options.wordsLeft || 0;
        this.players = options.players || new Collection();
        this.words = options.words;
        this.emoji = (name == 'red') ? "🔴":"🔵";
        this.canEnd = false;
        this.guesses = false;
    }

    setSpymaster(user) {
        this.spymaster = user;
    }

    addPlayer(user) {
        this.players.push(user);
    }

    setWords(words) {
        this.words = words;
        this.wordsLeft = words.length;
    }

    guess(word) {
         word = this.game.words.find(w => w.word == word);
        if (!word) return 0;
        if (word.guessedBy) return 1;
        word.guessedBy = this;
        this.guesses--;
        this.game.lastAction = Date.now();
        if (!this.canEnd) this.canEnd = true;
        word.update(this.game.board, false);
        if (word.type != this.name) {
            if (this.other().name == word.type) this.other().wordsLeft--;
            return false;
        }
        else {
            this.wordsLeft--;
            return true;
        }
    }

    toString() {
        return this.name;
    }

    other() {
        return (this.name == 'blue') ? this.game.teams.red:this.game.teams.blue;
    }


}

module.exports = Team;