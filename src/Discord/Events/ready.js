
const {DBL} = require("../../Util/Util.js");

module.exports = (handler) => {
    DBL(process.env.DBL, handler);
    handler.user.setActivity("Prefix: -", {type: "PLAYING"});
    console.log(`READY!\n\nCommands: ${handler.commands.size}\nGuilds: ${handler.guilds.cache.size}\nUsers: ${handler.users.cache.size}`);
}