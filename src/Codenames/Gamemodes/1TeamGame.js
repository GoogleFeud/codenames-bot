
const Game = require("../Game.js");

class TwoPlayerGame extends Game {
    constructor(channel, id) {
    super(channel, id);
    this.addTeam("blue", {emoji: "🔵"});
    }


    configure(customWords) {
       const words = super.configure(customWords);
       const blue = words.fromWhich(10, "blue");
       const ass = words.fromWhich(15, "assassin");
       this.words.push(...ass, ...blue);
       this.words.shuffle();
       this.turn = this.teams.blue;
    }

    start() {
        if (!this.turn) return;
        this.started = true;
        this.channel.send(`**${this.turn.emoji} | \`${this.turn}\` (${this.turn.players.map(p => p.user.username).join(", ")}), it's your turn!**`);
        this.displayBoard();
        this.displayMasterBoard();
        this.lastAction = Date.now();
    }


    isThereAWinner() {
        if (this.teams.blue.wordsLeft == 0) return this.teams.blue;
        if (this.words.assassin() && this.words.assassin().some(w => w.guessedBy.name == 'blue')) return "**You didn't manage to get all your agents! You lose!**"
    }

    scores() {
        return `🔵 ${this.teams.blue.wordsLeft}`;
    }

    teamHasOneMember() {
        if (this.teams.blue.players.size === 1) return true;
        return false;
    }

    teamsHaveSpymasters() {
        if (this.teams.blue.spymaster) return true;
        return false;
    }

    other() {
        return this.teams["blue"];
    }

    displayBoard() {
       this.board.sendAsMessage(this.channel, `🔵 ${this.teams.blue.wordsLeft}`);
    }


}

module.exports = TwoPlayerGame;
