//const DBL = require("dblapi.js");

module.exports = (handler) => {
     const dbl = new DBL(process.env.DBLTOKEN, handler);
     dbl.postStats(handler.guilds.size, 0, 0);
    setInterval(() => {
    dbl.postStats(handler.guilds.size, 0, 0);
}, 86400000); 
    handler.user.setActivity("Prefix: -", {type: "PLAYING"});
    console.log("READY!");
}