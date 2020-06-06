
const Util = require("../../Util/Util.js");

module.exports = {
    name: "endturn",
    description: "End your turn!",
    permissions: Util.addBits(Util.permissions.requiresGame, Util.permissions.requiresTurn),
    exe(message, args, handler, game, player) {
        if (!game.started) return;
        if (!player.team.canEnd) return "**✖ | You must make at least 1 guess!**";
        game.turn.canEnd = false;
        game.turn.guesses = false;
        game.clue = null;
        game.turn = game.other(player.team);
        handler.sendToChannel(message.channel_id, `**${game.turn.emoji} | \`${game.turn}\` (${game.turn.players.map(p => p.user.username).join(", ")}), it's your turn!**`);
        game.displayBoard();
        game.displayMasterBoard();
    }
}