const Util = require("../../Util/Util.js");

module.exports = {
    name: "spymaster",
    description: "Become the spymaster!",
    permissions: Util.permissions.requiresSpymaster,
    exe(message, args, handler, game, player) {
        if (game.started) return "**✖ | The game has already started!**";
        if (!player) return "**✖ | You must be in a team!**";
        if (player.team.spymaster && player.team.spymaster.id == message.author.id) return "**✖ | You are already the spymaster for your team!**";
        player.team.setSpymaster(player);
        return `**✔ | You are now the spymaster for the \`${player.team}\` team!**`;
    }
}