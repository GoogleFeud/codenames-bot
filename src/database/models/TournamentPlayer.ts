
import {DataTypes, Model} from "sequelize";
import {Provider} from "../instance";

export interface TournamentPlayerModel extends Model {
    playerId: string,
    teamId: string
}

export const TournamentPlayer = Provider.define<TournamentPlayerModel>("TournamentPlayers", {
    teamId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playerId: {
        type: DataTypes.STRING,
    }
});
