

class Team {
    constructor(name, options = {}) {
        this.name = name;
        this.game = options.game;
        this.spymaster = options.spymaster;
        this.wordsLeft = options.wordsLeft || 0;
        this.words = options.words;
        this.emoji = options.emoji;
        this.canEnd = false;
        this.guesses = false;
    }

    get players() {
        return this.game.players.filter(p => p.team.name === this.name)
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
            if (this.game.teams[word.type]) this.game.teams[word.type].wordsLeft--;
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

    display() {
        return this.players.map(p => `${p.user.username} ${(this.spymaster) ? (p.user.id == this.spymaster.user.id) ? "🕵🏻":"":""}`).join("\n") || "No players!"
    }

    other() {
        return (this.name == 'blue') ? this.game.teams.red:this.game.teams.blue;
    }


}

module.exports = Team;