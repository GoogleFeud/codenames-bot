
import { MessageEmbedOptions } from "discord.js-light";
import { TEAMS } from "../../utils/enums";
import { Grid } from "../Grid";
import { Player } from "./Player";
import { WordList } from "./WordList";

export class Game {
    id: string
    words: WordList
    started: boolean
    turn?: TEAMS
    board: Grid
    masterBoard: Grid
    gameMaster?: Player
    constructor(channelId: string) {
        this.id = channelId;
        this.words = new WordList();
        this.started = false;
        this.board = new Grid();
        this.masterBoard = new Grid();
    }

    start(customWords: Array<string>) : void {
        customWords;
        throw new Error("NOT_IMPLEMENTED");
    }

    determineWinner() : number {
        throw new Error("NOT IMPLEMENTED");
    }

    createPlayer(id: string, team: string) : Player {
        id; team;
        throw new Error("NOT IMPLEMENTED");
    }

    hasPlayer(id: string) : boolean {
        id;
        throw new Error("NOT IMPLEMENTED");
    }

    getPlayer(id: string) : Player|undefined {
        id;
        throw new Error("NOT IMPLEMENTED");
    }

    randomPlayer() : Player|undefined {
        throw new Error("NOT IMPLEMENTED");
    }

    getPlayerSize() : number {
        throw new Error("NOT IMPLEMENTED");
    }

    removePlayer(id: string) : void {
        id;
        throw new Error("NOT IMPLEMENTED");
    }

    switchTeam(player: Player, team?: string) : void {
        player;
        team;
        throw new Error("NOT IMPLEMENTED");
    }

    hasTeam(str: string) : boolean {
        str;
        throw new Error("NOT IMPLEMENTED");
    }

    displayTeams() : string {
        throw new Error("NOT IMPLEMENTED");
    }

    randomize() : void {
        throw new Error("NOT IMPLEMENTED");
    }

    display(title?: string) : MessageEmbedOptions {
        title;
        throw new Error("NOT IMPLEMENTED");
    }

    move() : void {
        throw new Error("NOT IMPLEMENTED");
    }

    stop() : void {
        throw new Error("NOT IMPLEMENTED");
    }


    
}