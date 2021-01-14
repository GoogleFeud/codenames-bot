
import { MessageEmbedOptions } from "discord.js";
import { rngBtw } from "../../utils";
import { TEAMS, WORD_TYPES } from "../../utils/enums";
import {Game} from "../structures/Game";
import { Player } from "../structures/Player";
import { Team } from "../structures/Team";

export class NormalGame extends Game {
    red: Team
    blue: Team
    constructor(channelId: string) {
        super(channelId);
        this.red = new Team(this, TEAMS.RED);
        this.blue = new Team(this, TEAMS.BLUE);
    }

    hasPlayer(id: string) : boolean {
        return this.red.players.has(id) || this.blue.players.has(id);
    }

    getPlayer(id: string) : Player|undefined {
        return this.red.players.get(id) || this.blue.players.get(id);
    }

    removePlayer(id: string) : void {
        this.red.removePlayer(id) || this.blue.removePlayer(id);
    }

    getPlayerSize() : number {
        return this.red.players.size + this.blue.players.size;
    }

    randomPlayer() : Player|undefined {
        return rngBtw(0, 1) ? this.red.players.random():this.blue.players.random();
    }

    hasTeam(str: string) : boolean {
        if (str.toLowerCase() === "red" || str.toLowerCase() === "blue") return true;
        return false;
    }

    switchTeam(player: Player, team?: string) : void {
        let teamObj;
        if (team && this.hasTeam(team)) teamObj = this[team as "red"|"blue"];
        else if (player.team.id === TEAMS.RED) teamObj = this.blue;
        else teamObj = this.red;
        if (!teamObj) return;
        player.team.removePlayer(player.id);
        player.team = teamObj;
        teamObj.players.set(player.id, player);
    }

    createPlayer(id: string, team: string) : Player {
        if (team !== "red" && team !== "blue") team = "blue";
        return (this[team as "red"|"blue"]).addPlayer(id);
    }

    start(customWords?: Array<string>) : void {
        this.red.wordsLeft = rngBtw(8, 9);
        this.blue.wordsLeft = this.red.wordsLeft === 9 ? 8:9;
        this.words.insert({
            neutral: 7,
            assassin: 1,
            red: this.red.wordsLeft,
            blue: this.blue.wordsLeft,
            presetWords: customWords || []
        });
        const wordArray = this.words.raw();
        this.board.draw(wordArray);
        this.masterBoard.draw(wordArray);
        this.started = true;
    }

    determineWinner() : number {
        if (this.red.wordsLeft === 0) return TEAMS.RED;
        else if (this.blue.wordsLeft === 0) return TEAMS.BLUE;
        else if (this.words.some(w => w.type === WORD_TYPES.ASSASSIN && w.guessedBy && w.guessedBy === this.red.id)) return TEAMS.RED;
        else if (this.words.some(w => w.type === WORD_TYPES.ASSASSIN && w.guessedBy && w.guessedBy === this.blue.id)) return TEAMS.BLUE;
        return 0;
    }

    display(title?: string) : MessageEmbedOptions {
        const obj: MessageEmbedOptions = {};
        obj.fields = [];
        obj.title = title || "Game info";
        if (!this.started) {
            obj.fields.push({ name: this.red.toString(), inline: true, value: this.red.players.map(p => `${p} ${this.red.spymaster && this.red.spymaster.id === p.id ? "🕵️":""} ${this.gameMaster && this.gameMaster.id === p.id ? "👑":""}`).join("\n") || "No players!" });
            obj.fields.push({ name: this.blue.toString(), inline: true, value: this.blue.players.map(p => `${p} ${this.blue.spymaster && this.blue.spymaster.id === p.id ? "🕵️":""} ${this.gameMaster && this.gameMaster.id === p.id ? "👑":""}`).join("\n") || "No players!" });
            obj.footer = {text: "Gamemode: Normal"};
        }
        return obj;
    }

    static fakeDisplay() : MessageEmbedOptions {
        return {
            title: "Game Info",
            fields: [
                {name: "🔴 Red", value: "No players!", inline: true},
                {name: "🔵 Blue", value: "No players!", inline: true}
            ],
            footer: {text: "Gamemode: Normal"}
        };
    }

    
}