
import { CommandContext, CommandExecuteRes } from "../..";
import { NormalGame } from "../../../codenames/gamemodes/NormalGame";
import { Player } from "../../../codenames/structures/Player";
import { ARGUMENT_TYPES } from "../../../utils/enums";

export default {
    name: "join",
    description: "Join the game in this channel, or switch your team",
    options: [
        {
            name: "team",
            description: "The team you want to join",
            type: ARGUMENT_TYPES.STRING,
            required: false
        }
    ],
    execute: (ctx: CommandContext) : CommandExecuteRes => {
        if (!ctx.interaction.member.user) return;
        const user = ctx.interaction.member.user;
        let game = ctx.games.get(ctx.interaction.channel_id);
        if (!game) {
            game = new NormalGame(ctx.interaction.channel_id);
            ctx.games.set(ctx.interaction.channel_id, game);
        }
        if (game.started) return "> ❌ | The game has already started!";

        if (game.hasPlayer(user.id)) game.switchTeam(game.getPlayer(user.id) as Player, ctx.args.team as string);
        else game.createPlayer(user.id, ctx.args.team as string);
        
        return [game.display(`📥 | ${user.username} has joined`)];
    }
};