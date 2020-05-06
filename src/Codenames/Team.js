

class Team {
    constructor(name, options = {}) {
        this.name = name;
        this.game = options.game;
        this.spymaster = options.spymaster;
        this.emoji = options.emoji;
        this.canEnd = false;
        this.guesses = false;
    }

    get players() {
        return this.game.players.filter(p => p.team.name === this.name)
    }

    get words() {
        return this.game.words.filter(w => w.type === this.name);
    }

    get wordsLeft() {
        return this.game.words.filter(w => w.type === this.name && !w.guessedBy).length;
    }

    setSpymaster(user) {
        this.spymaster = user;
    }

    addPlayer(user) {
        this.players.push(user);
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
        return word.type === this.name;
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