
const {DBL} = require("../../Util/Util.js");

module.exports = (handler, data, shard) => {
    DBL(process.env.DBL, handler);
    shard.setPresence("Prefix: -", {type: "PLAYING"});
    console.log(`READY!\n\nCommands: ${handler.commands.size}\nGuilds: ${handler.guilds.cache.size}\nUsers: ${handler.users.cache.size}`);
}