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
       const id = Util.codeGen();
       message.channel.game = new Game(message.channel, id);
       message.channel.game.master = message.author;
       message.channel.game.configure(args);
       message.channel.game.displayBoard();
       message.channel.send("**🔌 | Note: The lobby will automatically be disbanded if there is no activity.**")
       let lastSize = 0;
       const interval = setInterval(() => {
             if (message.channel.game && message.channel.game.id === id && !message.channel.game.started) {
               if (lastSize === message.channel.game.players.size || message.channel.game.players.size === 0) {
                   message.channel.game.stop();
                   clearInterval(interval);
                   return message.channel.send("** 📤 | Game disbanded. **");
               }
               lastSize = message.channel.game.players.size;
             }else clearInterval(interval);
       }, 240000);
    }
}