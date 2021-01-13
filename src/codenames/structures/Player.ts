import { TEAMS } from "../../utils/enums";


export class Player {
    id: string
    team: TEAMS
    constructor(id: string, team: TEAMS) {
        this.id = id;
        this.team = team;
    }

    toString() : string {
        return `<@${this.id}>`;
    }
    
}