const Collection = require("@discordjs/collection");
const Word = require("./Word.js");
const Team = require("./Team.js");
const Words = require("../Util/Words.js");
const Canvas = require("../Util/Canvas.js");
const Player = require("./Player.js");

class Game {
    constructor(handler, channel, id) {
    this.handler = handler;
    this.channel = channel;
    this.board = new Canvas();
    this.id = id;
    this.masterBoard = new Canvas();
    this.words = new Words.Words();
    this.players = new Collection();
    this.teams = {};
    this.lastAction = null;
    this.started = false;
    this.turn = null;
    this.clue = null;
    }

    addWord(word, data) {
       this.words.push(new Word(word, data));
    }

    addPlayer(user, team) {
         const pl = new Player(user, this.teams[team]);
         this.players.set(user.id, pl);
         return pl;
    }

    removePlayer(id) {
        this.players.delete(id);
    }

    addTeam(name, data) {
        this.teams[name] = new Team(name, {game: this, ...data});
    }

    mapTeams(fn) {
        const res = [];
        for (let team in this.teams) {
            team = this.teams[team];
            res.push(fn(team));
        }
        return res;
    }

    configure(customWords) {
        const words = Words.Wordlist.random(25);
        if (customWords.length) words.replace(customWords.length, customWords.map(w => w.toLowerCase()));
        this.board.drawBoard(words);
        this.masterBoard.drawBoard(words);
        return words;
    }

    updateMasterBoard() {
        for (let word of this.words) {
            word.update(this.masterBoard, true);
        }
    }

    displayMasterBoard() {
         this.updateMasterBoard();
         this.masterBoard.sendAsMessage(this.handler, this.turn.spymaster.user.id, `**${this.turn.emoji} | Your team: ${this.turn}**`, true)
    }

    displayMasterBoardFirst() {
        for (let word of this.words) {
            word.update(this.masterBoard, true);
        }
        for (let teamName in this.teams) {
            this.masterBoard.sendAsMessage(this.handler, this.teams[teamName].spymaster.user.id, `**${this.teams[teamName].emoji} | Your team: ${teamName}**`, true)
        }
    }

}

module.exports = Game;
