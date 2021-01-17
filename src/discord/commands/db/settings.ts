
import { Guild, GuildMember } from "discord.js";
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
        },
        {
            name: "reset",
            description: "List of settings to reset to their defaults, separated by a comma and a white space.",
            type: ARGUMENT_TYPES.STRING
        }
    ],
    execute: async ({interaction, args, client, game}: CommandContext) : Promise<CommandExecuteRes> => {
        const guildDb = await Database.getGuild(interaction.guild_id) as GuildModel;
        if (interaction.data.options) {
            let member: GuildMember;
            if ((!guildDb.gameMaster || !interaction.member.roles.includes(guildDb.gameMaster)) &&
                (member = await (client.guilds.cache.get(interaction.guild_id) as Guild).members.fetch(interaction.member.user.id, false)) &&
                (!member.permissions.has("MANAGE_ROLES") || !member.permissions.has("KICK_MEMBERS"))
            ) return "> ❌ | You need the game master role, the `MANAGE_ROLES` permission, or the `KICK_MEMBERS` permission in order to use this command!";
            if (args.gamemaster) guildDb.gameMaster = args.gamemaster as string;
            if (args.name) {
                const name = args.name as string;
                if (name.length > 17 || name.length < 3) return "> ❌ | Name must be between 3 and 16 characters!";
                guildDb.name = name;
            }
            if (args.reset) {
                const reset = args.reset as string;
                const settingsToReset = reset.includes(" ") ? reset.split(", "):reset.split(",");
                if (settingsToReset.includes("gamemaster")) {
                    guildDb.gameMaster = null;
                    if (game && !game.gameMaster) game.gameMaster = game.randomPlayer();
                }
                if (settingsToReset.includes("name")) guildDb.name = null;
            }
            await guildDb.save();
        }
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