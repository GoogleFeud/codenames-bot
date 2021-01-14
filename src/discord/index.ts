
import Discord, { MessageEmbedOptions } from "discord.js-light";
import * as Util from "../utils";
import * as Database from "../database";
import { BotConfig } from "..";
import { Game } from "../codenames/structures/Game";
import { CommandOptions } from "../utils/CommandOptionsBitfield";
import { GuildModel } from "../database/models/Guild";
import { Player } from "../codenames/structures/Player";


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

    const commands = new Discord.Collection<string, PartialCommand>();
    const games = new Discord.Collection<string, Game>();

    client.on("ready", () => {
        Database.sync();

        for (const pathToCmd of Util.getFiles(`${__dirname}/commands`)) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const cmdObject = require(pathToCmd).default as Command;
            commands.set(cmdObject.name, {execute: cmdObject.execute, flags: cmdObject.flags});
            // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
            if (!config.test) client.api.applications(client.user.id).commands.post({data: cmdObject});
            // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
            else if (cmdObject.devOnly) client.api.applications(client.user.id).guilds(config.devGuildId).commands.post({data: cmdObject}); 
        }
    });

    client.on("guildCreate", guild => {
        Database.findOrCreateGuild({id: guild.id});
    });

    client.ws.on("INTERACTION_CREATE" as Discord.WSEventType, async (interaction: Interaction) => {
        if (commands.has(interaction.data.name)) {

            // Represent the command arguments in a way that's easier to access
            const args: CommandArgs = {};
            for (const arg of interaction.data.options || []) args[arg.name] = arg.value;

            const command = commands.get(interaction.data.name) as PartialCommand;

            const game = games.get(interaction.channel_id);
            const userInGame = game?.getPlayer(interaction.member.user?.id as string);
            let guildDb;
            if (command.flags) {
                if (command.flags.has("REQUIRES_GAME_STARTED") && (!game || !game.started)) return Util.respond(client, interaction, "> ❌ | You can only use this command in-game!");
                if (command.flags.has("REQUIRES_GAME_NOT_STARTED") && (game && game.started)) return Util.respond(client, interaction, "> ❌ | You can only use this command in the lobby!");
                if (command.flags.has("REQUIRES_IN_GAME")) {
                    if (!userInGame || !game) return Util.respond(client, interaction, "> ❌ | You must be in the game in order to use this command!");
                    if (command.flags.has("REQUIRES_GAMEMASTER")) {
                        guildDb = await Database.getGuild(interaction.guild_id) as GuildModel;
                        if (guildDb.gameMaster && !interaction.member.roles.includes(guildDb.gameMaster)) return Util.respond(client, interaction, `> ❌ | You can only use this role if you have the <@&${guildDb.gameMaster}>!`);
                        if (!game.gameMaster || game.gameMaster.id !== userInGame.id) return Util.respond(client, interaction, "> ❌ | You can only use this command if you are the game master");
                    }
                    if (command.flags.has("REQUIRES_SPYMASTER") && (!userInGame.team.spymaster || userInGame.team.spymaster.id !== userInGame.id)) return Util.respond(client, interaction, "> ❌ | You can only use this command if you are the spymaster!");
                    if (command.flags.has("NO_SPYMASTER") && userInGame.team.spymaster && userInGame.team.spymaster.id === userInGame.id) return Util.respond(client, interaction, "> ❌ | You can only use this command if you are **not** the spymaster!");
                }
            }
            const res = await command.execute(({client, args, interaction, config, games, game, player: userInGame}));
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
    games: Discord.Collection<string, Game>,
    game?: Game,
    guildDb?: GuildModel,
    player?: Player
}


export interface Command {
    name: string,
    execute: CommandExecute,
    flags?: CommandOptions
    devOnly?: boolean
}

export interface PartialCommand {
    execute: CommandExecute,
    flags?: CommandOptions
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