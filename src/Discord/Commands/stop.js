const Util = require("../../Util/Util.js");

module.exports = {
    name: "stop",
    description: "Stop the game!",
    aliases: ["end"],
    permissions: Util.addBits(Util.permissions.requiresGame, Util.permissions.requiresGameMaster),
    exe(message, args, handler, game) {
       handler.games.delete(message.channel.id);
       message.channel.send("**✔ | Game stopped!**");
    }
}