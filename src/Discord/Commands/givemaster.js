const {User} = require("discord.js");

module.exports = {
    name: "givemaster",
    description: "Give the game master permission to someone else!",
    requiresGame: true,
    requiresGameMaster: true,
    exe(message, args, handler, game) {
        if (!message.mentions.users.length) return message.channel.send("**✖ | You must ping the user you want to give master to!**");
        game.master = new User(handler, message.mentions.users[0]);
        message.channel.send(`**✔ | \`${game.master.username}\` is now the game master!**`);
    }
}