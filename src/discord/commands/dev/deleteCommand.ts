

import { CommandContext, CommandExecuteRes} from "../..";
import { ARGUMENT_TYPES } from "../../../utils/enums";

export default {
    name: "deletecommand",
    description: "Delete a command",
    devOnly: true,
    options: [
        {
            name: "command",
            description: "The name of the command",
            type: ARGUMENT_TYPES.STRING,
            required: true
        },
        {
            name: "isglobal",
            description: "The type of the command - true for global, false for local",
            type: ARGUMENT_TYPES.BOOLEAN,
            required: true
        }
    ],
    execute: async (ctx: CommandContext) : Promise<CommandExecuteRes> => {
        if (ctx.args.isglobal) {
            // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
            const allCommands = await ctx.client.api.applications(ctx.client.user.id).commands.get();
            // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
            ctx.client.api.applications(ctx.client.user.id).comamnds(allCommands.find(c => c.name === ctx.args.command).id).delete();
        } else {
            // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
            const allCommands = await ctx.client.api.applications(ctx.client.user.id).guilds(ctx.interaction.guild_id).commands.get();
            // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
            ctx.client.api.applications(ctx.client.user.id).guilds(ctx.interaction.guild_id).guilds(ctx.interaction.guild_id).comamnds(allCommands.find(c => c.name === ctx.args.command).id).delete();
        }
        return "Done!";
    }
};