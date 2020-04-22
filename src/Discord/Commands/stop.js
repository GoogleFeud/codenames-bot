
module.exports = {
    name: "stop",
    description: "Stop the game!",
    aliases: ["end"],
    requiresGame: true,
    requiresGameMaster: true,
    exe(message, args, handler, game) {
       game.stop();
       handler.games.delete(message.channel.id);
       message.channel.send("**✔ | Game stopped!**");
    }
}