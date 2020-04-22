const Util = require("../../Util/Util.js");
const Game = require("../Game.js");

class TwoTeamGame extends Game {
    constructor(channel, id, handler) {
    super(channel, id, handler);
    this.addTeam("red", {emoji: "🔴"});
    this.addTeam("blue", {emoji: "🔵"});
    }


    configure(customWords) {
       const words = super.configure(customWords);
       let redNum = Util.rngBtw(8, 9);
       const red = words.fromWhich(redNum, "red");
       const blue = words.fromWhich((redNum == 9) ? 8:9, "blue");
       const ass = words.fromWhich(1, "assassin");
       const neut = words.fromWhich(7, "neutral");
       this.teams.red.setWords(red);
       this.teams.blue.setWords(blue);
       this.words.push(...[...ass, ...neut, ...red, ...blue]);
       this.words.shuffle();
       const toarr = this.words.map(w => w.word);
       this.board.placeWords(toarr);
       this.masterBoard.placeWords(toarr);
       this.turn = (red.length == 9) ? this.teams.red:this.teams.blue;
    }

    start() {
        if (!this.turn) return;
        this.started = true;
        this.channel.send(`**${this.turn.emoji} | \`${this.turn}\` (${this.turn.players.map(p => p.user.username).join(", ")}), it's your turn!**`);
        this.displayBoard();
        this.displayMasterBoard();
        let counter = 1;
        this.lastAction = Date.now();
        const turns = [this.turn];
        (this.turn.name == 'red') ? turns.push(this.teams.blue):turns.push(this.teams.red);
        this.timer = setInterval(() => {
            const winner = this.isThereAWinner();
            if (winner) {
                this.masterBoard.sendAsMessage(this.channel, `**${winner.emoji} | \`${winner.name}\` (${winner.players.map(p => p.user.username).join(", ")}) wins!**`);
                this.stop();
            }else if (this.turn.guesses === 0) {
                   this.turn.canEnd = false;
                   this.turn.guesses = false;
                   this.clue = null;
                   this.turn = turns[counter];
                   this.channel.send(`**${this.turn.emoji} | \`${this.turn}\` (${this.turn.players.map(p => p.user.username).join(", ")}), it's your turn!**`);
                   this.displayBoard();
                   this.displayMasterBoard();
                   if (counter == turns.length - 1) counter = 0;
                   else counter++;
               }
            else if ((Date.now() - this.lastAction) >= 1200000) {
                this.stop();
                this.channel.send("** 📤 | Game disbanded. **")
            };
        }, 1000);
    }


    isThereAWinner() {
        if (this.teams.red.wordsLeft == 0) return this.teams.red;
        if (this.teams.blue.wordsLeft == 0) return this.teams.blue;
        if (this.words.assassin() && this.words.assassin().some(w => w.guessedBy.name == 'red')) return this.teams.blue;
        if (this.words.assassin() && this.words.assassin().some(w => w.guessedBy.name == 'blue')) return this.teams.red;
    }

    scores() {
        return `🔴 ${this.teams.red.wordsLeft} | 🔵 ${this.teams.blue.wordsLeft}`;
    }

    teamHasOneMember() {
        if (this.teams.red.players.size === 1 || this.teams.blue.players.size === 1) return true;
        return false;
    }

    teamsHaveSpymasters() {
        if (this.teams.red.spymaster && this.teams.blue.spymaster) return true;
        return false;
    }


    displayBoard() {
       this.board.sendAsMessage(this.channel, `🔴 ${this.teams.red.wordsLeft} | 🔵 ${this.teams.blue.wordsLeft}`);
    }


}

module.exports = TwoTeamGame;
