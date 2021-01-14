
import { CommandContext, CommandExecuteRes } from "../..";
import { NormalGame } from "../../../codenames/gamemodes/NormalGame";
import { Player } from "../../../codenames/structures/Player";
import { CommandOptions } from "../../../utils/CommandOptionsBitfield";
import { ARGUMENT_TYPES } from "../../../utils/enums";

export default {
    name: "join",
    description: "Join the game in this channel, or switch your team",
    flags: new CommandOptions(["REQUIRES_GAME_NOT_STARTED"]),
    options: [
        {
            name: "team",
            description: "The team you want to join",
            type: ARGUMENT_TYPES.STRING,
            required: false
        }
    ],
    execute: ({game, interaction, games, args}: CommandContext) : CommandExecuteRes => {
        if (!interaction.member.user) return;
        const user = interaction.member.user;
        if (!game) {
            game = new NormalGame(interaction.channel_id);
            games.set(interaction.channel_id, game);
        }
        if (game.hasPlayer(user.id)) game.switchTeam(game.getPlayer(user.id) as Player, args.team as string);
        else {
            const p = game.createPlayer(user.id, args.team as string);
            if (!game.gameMaster) game.gameMaster = p;
        }
        
        return [game.display(`📥 | ${user.username} has joined`)];
    }
};