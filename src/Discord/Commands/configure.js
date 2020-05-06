const TwoTeamGame = require("../../Codenames/Gamemodes/2TeamGame.js");
const OneTeamGame = require("../../Codenames/Gamemodes/1TeamGame.js");
const Util = require("../../Util/Util.js");

const gamemodes = {
    "2Team": TwoTeamGame, 
    "1Team": OneTeamGame
}

module.exports = {
    name: "configure",
    description: "Configure a game on this channel!",
    usage: "-configure [Gamemode?] [...Words?]\n-configure\n-configure 1Team\n-configure Word1 Word2 Word3...\n-configure 1Team Word1 Word2 Word3...",
    exe(message, args, handler) {
        if (handler.games.has(message.channel.id)) return message.channel.send("✖ | **A game has already been configured on this channel! Do `-game` to check it out!**");
        let [gamemode, ...words] = args;
        if (!gamemodes[gamemode]) {words = args; gamemode = "2Team"}
       if (words && words.length) {
           if (!Util.hasNoRepeats(words)) return message.channel.send("**✖ | There can't be any repeats!**");
        if (words.length > 25) return message.channel.send("**✖ | The maximum amount of custom words is `25`!**")
        if (words.some(w => w.length > 16)) return message.channel.send("**✖ | One of the custom words is too long! Maximum length is `16`!**");
       }
       game = new gamemodes[gamemode](message.channel, Util.codeGen(), handler);
       game.master = message.author;
       game.configure(words);
       game.displayBoard();
       handler.games.set(message.channel.id, game);
       message.channel.send("**🔌 | Note: The lobby will automatically be disbanded if there is no activity.**")
    }
}