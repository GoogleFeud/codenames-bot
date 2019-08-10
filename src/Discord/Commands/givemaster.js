
module.exports = {
    name: "givemaster",
    description: "Give the game master permission to someone else!",
    requiresGame: true,
    requiresGameMaster: true,
    exe(message, args, handler) {
        if (!message.mentions.users.size) return message.channel.send("**✖ | You must ping the user you want to give master to!**");
        message.channel.game.master = message.mentions.users.first();
        message.channel.send(`**✔ | \`${message.channel.game.master.username}\` is now the game master!**`);
    }
}