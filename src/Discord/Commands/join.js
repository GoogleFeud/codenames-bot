
module.exports = {
    name: "join",
    description: "Join the game!",
    requiresGame: true,
    exe(message, args, handler) {
        if (message.author.team) handler.commands.get("leave").exe(message, args, handler, true);
        const team = (args[0]) ? args[0].toLowerCase():null;
        if (!team || !message.channel.game.teams[team]) return message.channel.send("**✖ | You must enter either `red` or `blue`!**");
        message.channel.game.addPlayer(message.author, team);
        message.channel.send(`**${message.author.team.emoji} | Successfully joined the ${team} team!**`)
    }
}