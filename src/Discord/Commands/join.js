const Util = require("../../Util/Util.js");

module.exports = {
    name: "join",
    description: "Join the game!",
    permissions: Util.permissions.requiresGame,
    exe(message, args, handler, game, player) {
        if (game.started) return;
        if (player && player.team) handler.commands.get("leave").exe(message, args, handler, game, true, player);
        const team = (args[0]) ? args[0].toLowerCase():"blue";
        if (!team || !game.teams[team]) return message.channel.send(`**✖ | Available teams: ${game.mapTeams(t => `\`${t.name}\``)}**`);
        if (player) game.players.delete(message.author.id);
        player = game.addPlayer(message.author, team);
        message.channel.send(`**${player.team.emoji} | Successfully joined the ${team} team!**`)
    }
}