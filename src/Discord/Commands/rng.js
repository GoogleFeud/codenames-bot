const Util = require("../../Util/Util.js");
const {Words} = require("../../Util/Words.js");

module.exports = {
    name: "rng",
    aliases: ["random"],
    description: "Randomize the teams and spymasters!",
    requiresGame: true,
    requiresGameMaster: true,
    exe(message, args, handler) {
     const average = Math.round(message.channel.game.players.size / Object.keys(message.channel.game.teams).length);
     const rngTeams = new Words(...Object.values(message.channel.game.teams));
     const players = new Words(...message.channel.game.players.map(p => p.id));
     rngTeams.shuffle();
     for (let team of rngTeams) {
        team.players.clear();
        for (let player of players.random(average, true)) {
            message.channel.game.addPlayer(message.channel.game.players.get(player), team.name);
        }
        team.setSpymaster(team.players.random());
     }
     handler.commands.get("game").exe(message, args, handler);
}
}