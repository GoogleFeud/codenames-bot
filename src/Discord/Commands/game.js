const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "game",
    description: "Check info about the current game!",
    requiresGame: true,
    exe(message, args, handler, game) {
          const embed = new MessageEmbed();
          embed.setAuthor(game.master.username, game.master.displayAvatarURL());
          embed.setColor("RANDOM");
          embed.setDescription(game.scores());
          for (let team in game.teams) {
              team = game.teams[team];
              embed.addField(team.name, team.display(), true);
          }
          if (game.clue) embed.addField("Clue:", `Clue for the ${game.turn.emoji} team: **${game.clue}**`);
          embed.attachFiles([game.board.saveAsLink()]);
          message.channel.send(embed);
    }
}