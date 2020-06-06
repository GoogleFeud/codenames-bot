
const {DBL} = require("../../Util/Util.js");

module.exports = (handler, data, shard) => {
    //DBL(process.env.DBL, handler);
    shard.setPresence({game: {name: "Prefix: -"}});
    console.log(`READY!`);
}