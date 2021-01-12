
import {DataTypes, Model} from "sequelize";
import {Provider} from "../instance";

export interface IUser {
    id: string,
    wins?: number,
    gamesPlayed?: number,
    assassinHits?: number,
    credits?: number,
    points?: number
}

export interface UserModel extends Model {
    id: string,
    wins: number,
    gamesPlayed: number,
    assassinHits: number,
    credits: number,
    points: number
}


export const User = Provider.define<UserModel>("Users", {
    id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    gamesPlayed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    assassinHits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    credits: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

