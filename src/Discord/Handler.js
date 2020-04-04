const Discord = require("discord.js"),
fs = require("fs");


class Handler extends Discord.Client {
    constructor() {
        super();
        this.prefix = "-",
        this.commands = new Discord.Collection();
        this.owner = process.env.OWNER;
        this.login(process.env.TOKEN);
        let cmds = fs.readdirSync("./src/Discord/Commands").filter(cmd => cmd.endsWith("js"));
        for (let command of cmds) {
            const cmdobj = require(`./Commands/${command}`);
            this.commands.set(cmdobj.name, cmdobj);
        }
        let events = fs.readdirSync("./src/Discord/Events").filter(cmd => cmd.endsWith("js"));
        for (let event of events) {
            const evntobj = require(`./Events/${event}`);
            this.on(event.replace(".js", ""), evntobj.bind(null, this));
        }
    }

     findCommand(name) {
        return this.commands.get(name) || this.commands.find(cmd => cmd.aliases && cmd.aliases.some(p => p == name));
    }

}

module.exports = Handler;