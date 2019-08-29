const Util = require("../../Util/Util.js");
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
       this.teams.blue.setWords(blue);
       this.words.push(...[...ass, ...blue]);
       this.words.shuffle();
       const toarr = this.words.map(w => w.word);
       this.board.placeWords(toarr);
       this.masterBoard.placeWords(toarr);
       this.turn = this.teams.blue;
    }

    start() {
        if (!this.turn) return;
        this.started = true;
        this.channel.send(`**${this.turn.emoji} | \`${this.turn}\` (${this.turn.players.map(p => p.username)}), it's your turn!**`);
        this.displayBoard();
        this.displayMasterBoard();
        this.lastAction = Date.now();
        this.timer = setInterval(() => {
            const winner = this.isThereAWinner();
            if (winner) {
                if (typeof winner === "string") {
                    this.masterBoard.sendAsMessage(this.channel, winner);
                    return this.stop();
                }
                 this.masterBoard.sendAsMessage(this.channel, `**${winner.emoji} | \`${winner.name}\` (${winner.players.map(p => p.username)}) wins!**`);
                 this.stop();
            }else if (this.turn.guesses === 0) {
                   this.turn.canEnd = false;
                   this.turn.guesses = false;
                   this.clue = null;
                   this.turn = this.teams.blue;
                   this.channel.send(`**${this.turn.emoji} | \`${this.turn}\` (${this.turn.players.map(p => p.username)}), it's your turn!**`);
                   this.displayBoard();
                   this.displayMasterBoard();
               }
            else if ((Date.now() - this.lastAction) >= 1200000) {
                this.stop();
                this.channel.send("** 📤 | Game disbanded. **")
            };
        }, 1000);
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

    displayBoard() {
       this.board.sendAsMessage(this.channel, `🔵 ${this.teams.blue.wordsLeft}`);
    }


}

module.exports = TwoPlayerGame;
