
import { Team } from "./Team";


export class Player {
    id: string
    team: Team
    constructor(id: string, team: Team) {
        this.id = id;
        this.team = team;
    }

    toString() : string {
        return `<@${this.id}>`;
    }
    
}