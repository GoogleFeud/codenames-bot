const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "game",
    description: "Check info about the current game!",
    requiresGame: true,
    exe(message, args, handler) {
          const embed = new MessageEmbed();
          embed.setAuthor(message.channel.game.master.username, message.channel.game.master.displayAvatarURL());
          embed.addField("Red", message.channel.game.teams.red.players.map(p => `${p} ${(message.channel.game.teams.red.spymaster) ? (p.id == message.channel.game.teams.red.spymaster.id) ? "🕵🏻":"":""}`).join("\n") || "No players!", true);
          embed.addField("Blue", message.channel.game.teams.blue.players.map(p => `${p} ${(message.channel.game.teams.blue.spymaster) ? (p.id == message.channel.game.teams.blue.spymaster.id) ? "🕵🏻":"":""}`).join("\n") || "No players!", true);
          embed.attachFiles([message.channel.game.board.saveAsLink()]);
          message.channel.send(embed);
    }
}