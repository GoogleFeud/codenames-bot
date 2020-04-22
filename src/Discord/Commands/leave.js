
module.exports = {
    name: "leave",
    description: "Leave the game!",
    requiresGame: true,
    exe(message, args, handler, game, doNotsend, player) {
        if (!player) player = game.players.get(message.author.id);
        if (!player) return message.channel.send("**✖ | You aren't in the game!**");
        if (game.started) return message.channel.send("**✖ | You cannot leave once the game has started!**");
        game.removePlayer(message.author.id);
        if (!doNotsend) message.channel.send(`**✔ | Successfully removed you from the game!**`);
    }
}