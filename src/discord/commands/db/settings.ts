
import { CommandContext, CommandExecuteRes } from "../..";
import * as Database from "../../../database";
import { GuildModel } from "../../../database/models/Guild";
import { ARGUMENT_TYPES } from "../../../utils/enums";

export default {
    name: "settings",
    description: "See / change server settings.",
    options: [
        {
            name: "gamemaster",
            description: "Everyone with this role will be able to force spymaster, kick players, and stop the game.",
            type: ARGUMENT_TYPES.ROLE
        },
        {
            name: "name",
            description: "A friendly name for the server",
            type: ARGUMENT_TYPES.STRING
        }
    ],
    execute: async ({interaction, args, client}: CommandContext) : Promise<CommandExecuteRes> => {
        const guildDb = await Database.getGuild(interaction.guild_id) as GuildModel;
        if (args.gamemaster) guildDb.gameMaster = args.gamemaster as string;
        if (args.name) {
            const name = args.name as string;
            if (name.length > 17 || name.length < 3) return "> ❌ | Name must be between 3 and 16 characters!";
            guildDb.name = name;
        }
        await guildDb.save();
        return [
            {
                timestamp: new Date(),
                title: `⚙️ ${guildDb.name || client.guilds.cache.get(interaction.guild_id)?.name || "Guild"} settings`,
                fields: [
                    {
                        name: "Game Master Role",
                        value: guildDb.gameMaster ? `<@&${guildDb.gameMaster}>`:"Not set",
                        inline: true,
                    },
                    {
                        name: "Friendly name",
                        value: guildDb.name || "Not set",
                        inline: true
                    }
                ]
            }
        ];
    }
};