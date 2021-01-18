import { CommandContext, CommandExecuteRes } from "../..";
import { CommandOptions } from "../../../utils/CommandOptionsBitfield";

export default {
    name: "rng",
    description: "Randomize teams and spymasters",
    flags: new CommandOptions(["REQUIRES_GAMEMASTER", "REQUIRES_GAME_NOT_STARTED"]),
    execute: ({game, interaction}: CommandContext) : CommandExecuteRes => {
        if (!game) return "> ❌ There are no players.";
        game.randomize();
        return [game.display(`🃏 <@${interaction.member.user.id}> has randomized the teams and spymasters`)];
    }
};