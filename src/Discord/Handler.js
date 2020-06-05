const Discord = require("nakamura");
const Cooldowns = require("../Util/Cooldowns.js");
const fs = require("fs");
const Collection = require("@discordjs/collection");


class Handler extends Discord.Client {
    constructor() {
        super(process.env.TOKEN);
        this.prefix = "-",
        this.commands = new Collection();
        this.cooldowns = new Cooldowns(4);
        this.games = new Collection();
        this.owner = process.env.OWNER;
        let cmds = fs.readdirSync("./src/Discord/Commands").filter(cmd => cmd.endsWith("js"));
        for (let command of cmds) {
            const cmdobj = require(`./Commands/${command}`);
            this.commands.set(cmdobj.name, cmdobj);
        }
        let events = fs.readdirSync("./src/Discord/Events").filter(cmd => cmd.endsWith("js"));
        for (let event of events) {
            const evntobj = require(`./Events/${event}`);
            this.events.on(event.replace(".js", ""), evntobj.bind(null, this));
        }
    }

     findCommand(name) {
        return this.commands.get(name) || this.commands.find(cmd => cmd.aliases && cmd.aliases.some(p => p == name));
    }

    sendToChannel(channelId, content) {
       try {
           return super.sendToChannel(channelId, content);
       }catch(err) {
           return false;
       }
    }

}

module.exports = Handler;