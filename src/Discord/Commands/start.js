
module.exports = {
    name: "start",
    description: "Start the game!",
    requiresGame: true,
    requiresGameMaster: true,
    exe(message, args, handler) {
       if (message.channel.game.teamHasOneMember()) return message.channel.send("**✖ | At least 2 players in every team are required!**");
       if (!message.channel.game.teamsHaveSpymasters()) return message.channel.send("**✖ | All teams must have a spymaster assigned!**");
       message.channel.game.start();
    }
}