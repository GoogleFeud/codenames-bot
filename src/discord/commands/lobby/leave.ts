import { CommandContext, CommandExecuteRes } from "../..";
import { CommandOptions } from "../../../utils/CommandOptionsBitfield";

export default {
    name: "leave",
    description: "Leave the game. Works only when the game hasn't started",
    flags: new CommandOptions(["REQUIRES_GAME_NOT_STARTED", "REQUIRES_IN_GAME"]),
    execute: ({game, games, interaction}: Required<CommandContext>) : CommandExecuteRes => {
        const user = interaction.member.user;

        if (!game.hasPlayer(user.id)) return "> ❌ | You are not in the game!";
        game.removePlayer(user.id);
        if (game.getPlayerSize() === 0) games.delete(interaction.channel_id);
        else if (game.gameMaster && game.gameMaster.id === user.id) game.gameMaster = game.randomPlayer();
        return [game.display(`📤 | ${user.username} has left`)];
    }
};