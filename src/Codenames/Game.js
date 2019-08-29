const {Collection} = require("discord.js");
const Word = require("./Word.js");
const Team = require("./Team.js");
const Words = require("../Util/Words.js");
const Canvas = require("../Util/Canvas.js");


class Game {
    constructor(channel, id) {
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
    }

    addWord(word, data) {
       this.words.push(new Word(word, data));
    }

    addPlayer(user, team) {
         this.players.set(user.id, user);
         user.team = this.teams[team];
         this.teams[team].players.set(user.id, user);
    }

    removePlayer(id) {
        const p = this.players.get(id);
        this.players.delete(id);
        p.team.players.delete(id);
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
        this.started = false;
         for (let [, player] of this.players) {
             player.team = null;
         }
        clearInterval(this.timer);
        this.channel.game = null;
    }

    displayMasterBoard() {
         for (let word of this.words) {
             word.update(this.masterBoard, true);
         }
         this.masterBoard.sendAsMessage(this.turn.spymaster, `**${this.turn.emoji} | Your team: ${this.turn}**`)
    }

}

module.exports = Game;
