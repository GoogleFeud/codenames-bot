
const Util = require("../../Util/Util.js");

module.exports = {
    name: "game",
    description: "Check info about the current game!",
    permissions: Util.permissions.requiresGame,
    exe(message, args, handler, game, withImg = true) {
          const embed = {
            author: {name: game.master.username, icon_url: handler.urlUserAvatar(game.master.id, game.master.avatar)},
            description: game.scores(),
            fields: []
          }

          for (let team in game.teams) {
              const t = game.teams[team];
              embed.fields.push({name: team, value: t.display(), inline: true});
          }
          if (game.clue) embed.fields.push({name: "Clue", value: `Clue for the ${game.turn.emoji} team: **${game.clue}**`});
          const opts = {};
          if (withImg) {
            opts.file = game.board.toBuffer();
            opts.filename = "file.png";
          }
          handler.sendToChannel(message.channel_id, {
             ...opts,
             embed
          });
    }
}