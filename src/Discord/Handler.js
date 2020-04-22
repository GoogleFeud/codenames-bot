const Discord = require("discord.js"),
LevitatingClient = require("levitate.djs"),
Cooldowns = require("../Util/Cooldowns.js");
fs = require("fs");


class Handler extends LevitatingClient {
    constructor() {
        super({
          channels: {
                cache: false
          },
          users: {
              cache: false,
              ignoreBots: true
          },
          members: {
             cache: false,
          },
          ignoreEmojis: true, 
          ignorePresences: true,
          ignoreReactions: true,
          disabledEvents: ["CHANNEL_CREATE", "CHANNEL_PINS_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "GUILD_EMOJIS_UPDATE", "GUILD_INTEGRATIONS_UPDATE", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_MEMBER_UPDATE", "INVITE_CREATE", "INVITE_DELETE", "MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "MESSAGE_REACTION_REMOVE_EMOJI", "MESSAGE_UPDATE", "PRESENCE_UPDATE", "TYPING_START", "USER_UPDATE", "VOICE_SERVER_UPDATE", "VOICE_STATE_UPDATE"]
        }, {
            messageCacheMaxSize: 0
        });
        this.prefix = "-",
        this.commands = new Discord.Collection();
        this.cooldowns = new Cooldowns(4);
        this.games = new Discord.Collection();
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