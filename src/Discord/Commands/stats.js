
module.exports = {
    name: "stats",
    description: "Shows bot statistics!",
    botOwnerOnly: true,
    exe(message, args, handler) {
      handler.dbl.postStats(handler.guilds.size);
      message.channel.send(`
**Guilds:** ${handler.guilds.size}
**Users:** ${handler.users.size}
**Channels:** ${handler.channels.size}
      `)
    }
}