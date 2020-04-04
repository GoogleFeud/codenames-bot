
module.exports = {
    name: "leave",
    description: "Leave the game!",
    requiresGame: true,
    exe(message, args, handler, doNotsend) {
        if (!message.author.team) return message.channel.send("**✖ | You aren't in the game!**");
        if (message.channel.game.started) return message.channel.send("**✖ | You cannot leave once the game has started!**");
        message.channel.game.removePlayer(message.author.id);
        message.author.team = null;
       if (!doNotsend) message.channel.send(`**✔ | Successfully removed you from the game!**`);
    }
}