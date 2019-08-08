
module.exports = {
    name: "join",
    description: "Join the game!",
    requiresGame: true,
    exe(message, args, handler) {
        if (message.author.team) return message.channel.send("**✖ | You are already in a game!**");
        const team = (args[0]) ? args[0].toLowerCase():null;
        if (!team || !message.channel.game.teams[team]) return message.channel.send("**✖ | You must enter either `red` or `blue`!**");
        message.channel.game.addPlayer(message.author, team);
        message.channel.send(`**✔ | Successfully joined the ${team} team!**`)
    }
}