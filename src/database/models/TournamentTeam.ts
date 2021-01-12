
import {DataTypes, Model} from "sequelize";
import {Provider} from "../instance";
import { TournamentPlayerModel } from "./TournamentPlayer";

export interface TournamentTeamModel extends Model {
    id: string,
    teamName: string,
    emoji: string,
    tourneyId: string,
    players: Array<TournamentPlayerModel>
}

export const TournamentTeam = Provider.define<TournamentTeamModel>("TournamentTeams", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    teamName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emoji: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tourneyId: {
        type: DataTypes.STRING,
        allowNull: false, 
    }
});