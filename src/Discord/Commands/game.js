const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "game",
    description: "Check info about the current game!",
    requiresGame: true,
    exe(message, args, handler) {
          const embed = new MessageEmbed();
          embed.setAuthor(message.channel.game.master.username, message.channel.game.master.displayAvatarURL());
          embed.setColor("RANDOM");
          embed.setDescription(message.channel.game.scores());
          for (let team in message.channel.game.teams) {
              team = message.channel.game.teams[team];
              embed.addField(team.name, team.display(), true);
          }
          embed.attachFiles([message.channel.game.board.saveAsLink()]);
          message.channel.send(embed);
    }
}