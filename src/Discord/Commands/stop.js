
module.exports = {
    name: "stop",
    description: "Stop the game!",
    requiresGame: true,
    exe(message, args, handler) {
       if (message.author.id != message.channel.game.master.id) return message.channel.send("**✖ | Only the game master can stop the game!**");
       message.channel.game.stop();
    }
}