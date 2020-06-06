
const Util = require("../../Util/Util.js");

module.exports = {
    name: "givemaster",
    description: "Give the game master permission to someone else!",
    permissions: Util.addBits(Util.permissions.requiresGame, Util.permissions.requiresGameMaster),
    exe(message, args, handler, game) {
        if (!message.mentions[0]) return "**✖ | You must ping the user you want to give master to!**";
        game.master = message.mentions[0];
        return `**✔ | \`${game.master.username}\` is now the game master!**`;
    }
}