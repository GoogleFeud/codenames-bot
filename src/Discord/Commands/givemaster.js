const {User} = require("discord.js");
const Util = require("../../Util/Util.js");

module.exports = {
    name: "givemaster",
    description: "Give the game master permission to someone else!",
    permissions: Util.addBits(Util.permissions.requiresGame, Util.permissions.requiresGameMaster),
    exe(message, args, handler, game) {
        if (!message.mentions.users.length) return message.channel.send("**✖ | You must ping the user you want to give master to!**");
        game.master = new User(handler, message.mentions.users[0]);
        message.channel.send(`**✔ | \`${game.master.username}\` is now the game master!**`);
    }
}