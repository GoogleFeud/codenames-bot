const Util = require("../../Util/Util.js");

module.exports = {
    name: "leave",
    description: "Leave the game!",
    permissions: Util.permissions.requiresGame,
    exe(message, args, handler, game, doNotsend, player) {
        if (game.started) return;
        if (!player) player = game.players.get(message.author.id);
        if (!player) return "**✖ | You aren't in the game!**";
        if (game.started) return "**✖ | You cannot leave once the game has started!**";
        game.removePlayer(message.author.id);
        if (!doNotsend) `**✔ | Successfully removed you from the game!**`;
    }
}