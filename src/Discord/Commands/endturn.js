
module.exports = {
    name: "endturn",
    description: "End your turn!",
    requiresGame: true,
    requiresTurn: true,
    exe(message, args, handler, game, player) {
        if (!player.team.canEnd) return message.channel.send("**✖ | You must make at least 1 guess!**");
        player.team.guesses = 0;
    }
}