import { CommandContext, CommandExecuteRes } from "../..";
import { NormalGame } from "../../../codenames/gamemodes/NormalGame";

export default {
    name: "info",
    description: "Sends information about the game",
    execute: (ctx: CommandContext) : CommandExecuteRes => {
        const game = ctx.games.get(ctx.interaction.channel_id);
        if (!game) return [NormalGame.fakeDisplay()];
        return [game.display()];
    }
};