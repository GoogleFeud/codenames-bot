const Util = require("../../Util/Util.js");

module.exports = {
    name: "start",
    description: "Start the game!",
    permissions: Util.addBits(Util.permissions.requiresGame, Util.permissions.requiresGameMaster),
    exe(message, args, handler, game) {
       if (game.started) return;
       if (game.teamHasOneMember()) return message.channel.send("**✖ | At least 2 players in every team are required!**");
       if (!game.teamsHaveSpymasters()) return message.channel.send("**✖ | All teams must have a spymaster assigned!**");
       game.start();
       const interval = setInterval(() => {
             const stillGame = handler.games.get(message.channel.id);
             if (stillGame && stillGame.id === game.id) {
               if ((Date.now() - stillGame.lastAction) > 1200000 || stillGame.players.size === 0) {
                   stillGame.stop();
                   clearInterval(interval);
                   return message.channel.send("** 📤 | Game disbanded. **");
               }
             }else clearInterval(interval);
       }, 240000);
    }
}