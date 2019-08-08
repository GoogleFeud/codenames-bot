
module.exports = {
    name: "endturn",
    description: "End your turn!",
    requiresGame: true,
    requiresTurn: true,
    exe(message, args, handler) {
         message.author.team.guesses = 0;
    }
}