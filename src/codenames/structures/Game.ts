
import { Interaction } from "../../discord";
import { TEAMS } from "../../utils/enums";
import { Grid } from "../Grid";
import { WordList } from "./WordList";

export class Game {
    id: string
    words: WordList
    started: boolean
    turn?: TEAMS
    board: Grid
    masterBoard: Grid
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

    displayTeams() : string {
        throw new Error("NOT IMPLEMENTED");
    }

    randomize() : void {
        throw new Error("NOT IMPLEMENTED");
    }

    display(interaction: Interaction) : void {
        interaction;
        throw new Error("NOT IMPLEMENTED");
    }

    move() : void {
        throw new Error("NOT IMPLEMENTED");
    }

    stop() : void {
        throw new Error("NOT IMPLEMENTED");
    }


    
}