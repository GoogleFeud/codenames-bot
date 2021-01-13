
import {Collection} from "discord.js";
import { Interaction } from "../../discord";
import { TEAMS } from "../../utils/enums";
import { Team } from "./Team";
import { WordList } from "./WordList";

export class Game {
    id: string
    teams: Collection<string, Team>
    words: WordList
    started: boolean
    turn?: TEAMS
    constructor(channelId: string) {
        this.id = channelId;
        this.teams = new Collection();
        this.words = new WordList();
        this.started = false;
    }

    start() : void {
        throw new Error("NOT_IMPLEMENTED");
    }

    determineWinner() : number {
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