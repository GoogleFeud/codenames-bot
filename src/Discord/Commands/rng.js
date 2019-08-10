const Util = require("../../Util/Util.js");


module.exports = {
    name: "rng",
    aliases: ["random"],
    description: "Randomize the teams and spymasters!",
    requiresGame: true,
    requiresGameMaster: true,
    exe(message, args, handler) {
      //  if (message.channel.game.players.size <= 2) return message.channel.send("**✖ | There must be more than 2 players in order to use this command!**");
       message.channel.game.teams.red.players.clear();
       message.channel.game.teams.blue.players.clear();
       for (let [, player] of message.channel.game.players) {
           if (Math.floor(message.channel.game.teams.red.players.size / 2) >= message.channel.game.teams.blue.players.size) message.channel.game.addPlayer(player, "blue");
           else if (Math.floor(message.channel.game.teams.blue.players.size / 2) >= message.channel.game.teams.red.players.size) message.channel.game.addPlayer(player, "red");
           else {
             let rngesus = Util.rngBtw(0, 1);
             if (rngesus == 0) message.channel.game.addPlayer(player, "red");
             else message.channel.game.addPlayer(player, "blue");
           }
       }
       message.channel.game.teams.red.setSpymaster(message.channel.game.teams.red.players.random());
       message.channel.game.teams.blue.setSpymaster(message.channel.game.teams.blue.players.random());
       handler.commands.get("game").exe(message, args, handler);
    }
}