
import {DataTypes, Model} from "sequelize";
import {Provider} from "../instance";

export interface IGuild {
    id: string,
    points?: number,
    wins?: number,
    gamesPlayed?: number,
    gameMaster?: string
}

export interface GuildModel extends Model {
    id: string,
    points: number,
    wins: number,
    gamesPlayed: number,
    gameMaster?: string
}


export const Guild = Provider.define<GuildModel>("Guilds", {
    id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    gamesPlayed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    gameMaster: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

