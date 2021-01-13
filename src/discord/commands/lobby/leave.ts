import { CommandContext, CommandExecuteRes } from "../..";

export default {
    name: "leave",
    description: "Leave the game. Works only when the game hasn't started",
    execute: (ctx: CommandContext) : CommandExecuteRes => {
        if (!ctx.interaction.member.user) return;
        const user = ctx.interaction.member.user;
        const game = ctx.games.get(ctx.interaction.channel_id);
        if (!game) return "> ❌ | You are not in the game!";
        if (game.started) return "> ❌ | The game has already started!";

        if (!game.hasPlayer(user.id)) return "> ❌ | You are not in the game!";
        game.removePlayer(user.id);
        if (game.getPlayerSize() === 0) ctx.games.delete(ctx.interaction.channel_id);
        return [game.display(`📤 | ${user.username} has left`)];
    }
};