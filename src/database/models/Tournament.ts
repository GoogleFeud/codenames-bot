
import {DataTypes, Model} from "sequelize";
import {Provider} from "../instance";
import { TournamentTeamModel } from "./TournamentTeam";

export interface ITournament {
    id: string,
    channelId: string,
    guildId: string,
    name: string
}

export interface TournamentModel extends Model {
    id: string,
    name: string,
    channelId: string,
    guildId: string,
    teams: Array<TournamentTeamModel>
}

export const Tournament = Provider.define<TournamentModel>("Tournaments", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    tourneyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

