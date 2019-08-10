
module.exports = {
    name: "stop",
    description: "Stop the game!",
    aliases: ["end"],
    requiresGame: true,
    requiresGameMaster: true,
    exe(message, args, handler) {
       message.channel.game.stop();
       message.channel.send("**✔ | Game stopped!**");
    }
}