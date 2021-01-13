import { Collection } from "discord.js-light";
import { TEAMS } from "../../utils/enums";
import { Player } from "./Player";


export class Team {
    id: TEAMS
    players: Collection<string, Player>
    constructor(id: TEAMS) {
        this.id = id;
        this.players = new Collection();
    }

    addPlayer(id: string) : Player {
        const player = new Player(id, this.id);
        this.players.set(id, player);
        return player;
    }

    toString() : string {
        switch (this.id) {
        case TEAMS.RED: return "🔴 Red";
        case TEAMS.BLUE: return "🔵 Blue";
        }
    }

}