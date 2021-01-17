

import { CommandContext, CommandExecuteRes } from "../..";
import { ARGUMENT_TYPES } from "../../../utils/enums";
import * as Database from "../../../database";
import { GuildModel } from "../../../database/models/Guild";

export default {
    name: "spymaster",
    description: "Become the spymaster for your team, or select a player to become the spymaster",
    options: [
        {
            name: "player",
            description: "The player to become the new spymaster",
            type: ARGUMENT_TYPES.USER,
            required: false
        }
    ],
    execute: async ({game, player, interaction, args}: CommandContext) : Promise<CommandExecuteRes> => {
        const guildDb = await Database.getGuild(interaction.guild_id) as GuildModel;
        if (args.player) {
            if (guildDb.gameMaster && !interaction.member.roles.includes(guildDb.gameMaster)) return `> ❌ | You need the <@&${guildDb.gameMaster}> role in order to force who becomes the spymaster.`;
            if (!game) return `> ❌ | <@${args.player}> isn't in the game!`;
            if (!game.gameMaster || game.gameMaster.id !== interaction.member.user.id) return "> ❌ | You need to be the gamemaster in order to force who becomes the spymaster.";
            const newSpymaster = game.getPlayer(args.player as string);
            if (!newSpymaster) return `> ❌ | <@${args.player}> isn't in the game!`;
            newSpymaster.team.spymaster = newSpymaster;
            return [game.display()];
        } else {
            if (!game || !player) return "> ❌ | You are not in the game!";
            player.team.spymaster = player;
            return [game.display(`${interaction.member.user?.username} is now the spymaster for the ${player.team.emoji} team`)];
        } 
    }
};