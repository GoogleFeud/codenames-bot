
import { CommandContext, CommandExecuteRes } from "../..";
import { ARGUMENT_TYPES } from "../../../utils/enums";
import { CommandOptions } from "../../../utils/CommandOptionsBitfield";

export default {
    name: "kick",
    description: "Kick a player from the game.",
    flags: new CommandOptions(["REQUIRES_GAMEMASTER"]),
    options: [
        {
            name: "player",
            description: "The player to kick",
            type: ARGUMENT_TYPES.USER,
            required: true
        }
    ],
    execute: async ({game, interaction, args}: CommandContext) : Promise<CommandExecuteRes> => {
        if (!game || !game.hasPlayer(args.player as string)) return `> ❌ | <@${args.player}> isn't in the game.`;
        if (args.player === interaction.member.user.id) return "> ❌ | You cannot kick yourself.";
        game.removePlayer(args.player as string);
        return [game.display(`👢 <@${args.player}> has been kicked by <@${interaction.member.user.id}>`, "RED")];
    }
};