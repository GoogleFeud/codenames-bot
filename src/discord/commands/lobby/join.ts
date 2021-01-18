
import { CommandContext, CommandExecuteRes } from "../..";
import { NormalGame } from "../../../codenames/gamemodes/NormalGame";
import { Player } from "../../../codenames/structures/Player";
import { CommandOptions } from "../../../utils/CommandOptionsBitfield";
import { ARGUMENT_TYPES } from "../../../utils/enums";
import * as Database from "../../../database";
import { GuildModel } from "../../../database/models/Guild";

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
    execute: async ({game, interaction, games, args}: CommandContext) : Promise<CommandExecuteRes> => {
        const user = interaction.member.user;
        if (!game) {
            game = new NormalGame(interaction.channel_id);
            games.set(interaction.channel_id, game);
        }
        if (game.hasPlayer(user.id)) {
            const player = game.getPlayer(user.id) as Player;
            game.switchTeam(game.getPlayer(user.id) as Player, args.team as string);
            return [game.display(`📥 <@${user.id}> has switched their team to ${player.team.emoji}`, "GREEN")];
        }
        else {
            const player = game.createPlayer(user.id, args.team as string);
            if (!game.gameMaster) {
                const guildDb = await Database.getGuild(interaction.guild_id) as GuildModel;
                if (!guildDb.gameMaster) game.gameMaster = player;
            }
            return [game.display(`📥 <@${user.id}> has joined`, "GREEN")];
        }
    }
};