const {Collection} = require("discord.js");
const Word = require("./Word.js");
const Team = require("./Team.js");
const Words = require("../Util/Words.js");
const Canvas = require("../Util/Canvas.js");
const Player = require("./Player.js");

class Game {
    constructor(channel, id, handler) {
    this.channel = channel;
    this.handler = handler;
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
        this.board.drawBoard();
        this.masterBoard.drawBoard();
        const words = Words.Wordlist.random(25, true);
        if (customWords.length) words.replace(customWords.length, customWords.map(w => w.toLowerCase()));
        return words;
    }


    stop() {
        clearInterval(this.timer);
        this.handler.games.delete(this.channel.id);
    }

    displayMasterBoard() {
         for (let word of this.words) {
             word.update(this.masterBoard, true);
         }
         this.masterBoard.sendAsMessage(this.turn.spymaster.user, `**${this.turn.emoji} | Your team: ${this.turn}**`)
    }

}

module.exports = Game;
