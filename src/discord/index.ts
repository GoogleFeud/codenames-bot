
import Discord, { MessageEmbedOptions } from "discord.js-light";
import * as Util from "../utils";
import * as Database from "../database";
import { BotConfig } from "..";
import { Game } from "../codenames/structures/Game";

export function createClient(config: BotConfig) : Discord.Client {
    const client = new Discord.Client({
        cacheChannels: false,
        cacheEmojis: false,
        cacheOverwrites: false,
        cacheGuilds: true,
        cacheRoles: false,
        cachePresences: false,
        messageCacheLifetime: 0,
        messageSweepInterval: -1,
        ws: {
            intents: ["GUILDS"]
        },
        disabledEvents: ["GUILD_ROLE_CREATE", "GUILD_ROLE_UPDATE", "GUILD_ROLE_DELETE", "CHANNEL_CREATE", "CHANNEL_UPDATE", "CHANNEL_DELETE", "CHANNEL_PINS_UPDATE"]
    });

    const commands = new Discord.Collection<string, CommandExecute>();
    const games = new Discord.Collection<string, Game>();

    client.on("ready", () => {
        Database.sync();

        for (const pathToCmd of Util.getFiles(`${__dirname}/commands`)) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const cmdObject = require(pathToCmd).default as Command;
            commands.set(cmdObject.name, cmdObject.execute);
            //if (!cmdObject.devOnly) client.api.applications(client.user.id).commands.post({data: cmdObject});
            // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
            if (config.test || cmdObject.devOnly) client.api.applications(client.user.id).guilds(config.devGuildId).commands.post({data: cmdObject});  
        }
    });

    client.on("guildCreate", guild => {
        Database.findOrCreateGuild({id: guild.id});
    });

    client.ws.on("INTERACTION_CREATE" as Discord.WSEventType, async (interaction: Interaction) => {
        if (commands.has(interaction.data.name)) {
            const args: CommandArgs = {};
            if (interaction.data.options) {
                for (const arg of interaction.data.options) {
                    args[arg.name] = arg.value;
                }
            }
            const res = await (commands.get(interaction.data.name) as CommandExecute)({client, args, interaction, config, games});
            if (res) Util.respond(client, interaction, res);
        }
    });

    client.login(config.token);
    return client;
}


export type CommandExecute = (ctx: CommandContext) => CommandExecuteRes;

export type CommandExecuteRes = string|Array<MessageEmbedOptions>|undefined;

export type CommandArgs = Record<string, string|number>;

export interface CommandContext {
    client: Discord.Client,
    args: CommandArgs
    interaction: Interaction,
    config: BotConfig,
    games: Discord.Collection<string, Game>
}

export interface Command {
    name: string,
    execute: CommandExecute,
    devOnly?: boolean
}

export interface Interaction {
    id: string,
    token: string,
    type: number,
    guild_id: string,
    channel_id: string,
    member: GuildMember,
    data: InteractionData
}

export interface GuildMember {
    user?: User
    roles: Array<string>
}

export interface User {
    id: string,
    username: string
}

export interface InteractionData {
    name: string,
    options: Array<InteractionArgs>
}

export interface InteractionArgs {
    name: string,
    value: string|number
}