const Game = require("../../Codenames/Game.js");

module.exports = {
    name: "configure",
    description: "Configure a game on this channel!",
    exe(message, args, handler) {
        if (message.channel.game) return message.channel.send("✖ | **A game has already been configured on this channel! Do `-game` to check it out!**");
       message.channel.game = new Game(message.channel);
       message.channel.game.master = message.author;
       message.channel.game.configure();
       message.channel.game.displayBoard();
       setTimeout(() => {
            if (message.channel.game && message.channel.game.players.size == 0) message.channel.send("** GAME DISBANDED **")
       }, 120000);
    }
}