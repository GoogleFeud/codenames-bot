const Util = require("../../Util/Util.js");
const {Words} = require("../../Util/Words.js");

module.exports = {
    name: "rng",
    aliases: ["random"],
    description: "Randomize the teams and spymasters!",
    permissions: Util.addBits(Util.permissions.requiresGame, Util.permissions.requiresGameMaster),
    exe(message, args, handler, game) {
     if (game.started) return;
     const average = Math.round(game.players.size / Object.keys(game.teams).length);
     const rngTeams = new Words(...Object.values(game.teams));
     const players = new Words(...game.players.map(p => p.user));
     rngTeams.shuffle();
     game.players.clear();
     for (let team of rngTeams) {
        for (let player of players.random(average, true)) {
            game.addPlayer(player, team.name);
        }
        team.setSpymaster(team.players.random());
     }
     handler.commands.get("game").exe(message, args, handler, game);
}
}