

module.exports = (handler) => {
    handler.user.setActivity("Prefix: -", {type: "PLAYING"});
    console.log(`READY!\n\nCommands: ${handler.commands.size}\nGuilds: ${handler.guilds.cache.size}\nUsers: ${handler.users.cache.size}`);
}