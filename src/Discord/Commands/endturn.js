
const Util = require("../../Util/Util.js");

module.exports = {
    name: "endturn",
    description: "End your turn!",
    permissions: Util.addBits(Util.permissions.requiresGame, Util.permissions.requiresTurn),
    exe(message, args, handler, game, player) {
        if (!game.started) return;
        if (!player.team.canEnd) return message.channel.send("**✖ | You must make at least 1 guess!**");
        player.team.guesses = 0;
    }
}