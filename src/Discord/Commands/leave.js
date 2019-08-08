
module.exports = {
    name: "leave",
    description: "Leave the game!",
    requiresGame: true,
    exe(message, args, handler) {
        if (!message.author.team) return message.channel.send("**✖ | You aren't in the game!**");
        message.channel.game.removePlayer(message.author.id);
        message.author.team = null;
        message.channel.send(`**✔ | Successfully removed you from the game!**`)
    }
}