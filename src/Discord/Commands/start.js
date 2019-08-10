
module.exports = {
    name: "start",
    description: "Start the game!",
    requiresGame: true,
    requiresGameMaster: true,
    exe(message, args, handler) {
       if (!message.channel.game.teams.red.spymaster) return message.channel.send("**✖ | The red team doesn't have a spymaster!**");
       if (!message.channel.game.teams.blue.spymaster) return message.channel.send("**✖ | The blue team doesn't have a spymaster!**");
     //  if (message.channel.game.teams.red.players.size == 1 || message.channel.game.teams.blue.players.size == 1) return message.channel.send("**✖ | At least 2 players in every team are required!**");
       message.channel.game.start();
    }
}