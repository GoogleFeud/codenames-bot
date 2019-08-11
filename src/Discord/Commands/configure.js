const Game = require("../../Codenames/Game.js");
const Util = require("../../Util/Util.js");

module.exports = {
    name: "configure",
    description: "Configure a game on this channel!",
    exe(message, args, handler) {
        if (message.channel.game) return message.channel.send("✖ | **A game has already been configured on this channel! Do `-game` to check it out!**");
       if (args.length) {
           if (!Util.hasNoRepeats(args)) return message.channel.send("**✖ | There can't be any repeats!**");
        if (args.length > 25) return message.channel.send("**✖ | The maximum amount of custom words is `25`!**")
        if (args.some(w => w.length > 16)) return message.channel.send("**✖ | One of the custom words is too long! Maximum length is `16`!**");
       }
       message.channel.game = new Game(message.channel);
       message.channel.game.master = message.author;
       message.channel.game.configure(args);
       message.channel.game.displayBoard();
       setTimeout(() => {
            if (message.channel.game && message.channel.game.players.size == 0) message.channel.send("** 📤 | Lobby disbanded. **")
       }, 120000);
    }
}