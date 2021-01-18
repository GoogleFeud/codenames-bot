
import { MessageEmbedOptions } from "discord.js-light";
import { TEAMS } from "../../utils/enums";
import { Grid } from "../Grid";
import { Player } from "./Player";
import { WordList } from "./WordList";

export abstract class Game {
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

    abstract start(customWords: Array<string>) : void
    abstract determineWinner() : number
    abstract createPlayer(id: string, team: string) : Player
    abstract hasPlayer(id: string) : boolean
    abstract getPlayer(id: string) : Player|undefined
    abstract randomPlayer() : Player|undefined
    abstract getPlayerSize() : number
    abstract removePlayer(id: string) : void
    abstract switchTeam(player: Player, team?: string) : void
    abstract hasTeam(str: string) : boolean
    abstract randomize() : void
    abstract display(description?: string, color?: string) : MessageEmbedOptions
    abstract move() : void
    abstract stop() : void
}