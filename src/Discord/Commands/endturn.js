
module.exports = {
    name: "endturn",
    description: "End your turn!",
    requiresGame: true,
    requiresTurn: true,
    exe(message, args, handler) {
        if (!message.author.team.canEnd) return message.channel.send("**✖ | You must make at least 1 guess!**");
         message.author.team.guesses = 0;
    }
}