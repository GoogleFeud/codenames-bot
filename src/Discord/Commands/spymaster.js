const Util = require("../../Util/Util.js");

module.exports = {
    name: "spymaster",
    description: "Become the spymaster!",
    permissions: Util.permissions.requiresSpymaster,
    exe(message, args, handler, game, player) {
        if (game.started) return message.channel.send("**✖ | The game has already started!**");
        if (!player) return message.channel.send("**✖ | You must be in a team!**")
        if (player.team.spymaster && player.team.spymaster.id == message.author.id) return message.channel.send("**✖ | You are already the spymaster for your team!**");
        player.team.setSpymaster(player);
        message.channel.send(`**✔ | You are now the spymaster for the \`${player.team}\` team!**`);
    }
}