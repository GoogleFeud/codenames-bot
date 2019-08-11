const DBL = require("dblapi.js");

module.exports = (handler) => {
     const dbl = new DBL(process.env.DBLTOKEN, handler);
     handler.dbl = dbl;
     dbl.postStats(handler.guilds.size);
    setInterval(() => {
    dbl.postStats(handler.guilds.size);
}, 18000000); 
    handler.user.setActivity("Prefix: -", {type: "PLAYING"});
    console.log(`READY!\n\nCommands: ${handler.commands.size}\nGuilds: ${handler.guilds.size}\nUsers: ${handler.users.size}`);
}