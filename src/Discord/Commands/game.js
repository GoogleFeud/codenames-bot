const {MessageEmbed} = require("discord.js");
const Util = require("../../Util/Util.js");

module.exports = {
    name: "game",
    description: "Check info about the current game!",
    permissions: Util.permissions.requiresGame,
    exe(message, args, handler, game, withImg = true) {
          const embed = new MessageEmbed();
          embed.setAuthor(game.master.username, game.master.displayAvatarURL());
          embed.setColor("RANDOM");
          embed.setDescription(game.scores());
          for (let team in game.teams) {
              team = game.teams[team];
              embed.addField(team.name, team.display(), true);
          }
          if (game.clue) embed.addField("Clue:", `Clue for the ${game.turn.emoji} team: **${game.clue}**`);
          if (withImg) embed.attachFiles([game.board.saveAsLink()]);
          message.channel.send(embed);
    }
}