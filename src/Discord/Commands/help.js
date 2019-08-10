const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "help",
    description: "Get help!",
    exe(message, args, handler) {
        if (!args.length) {
       message.channel.send(`
\`\`\`ml
'Command' "List"\`\`\`

Use \`-help [command]\` to get more information on a command.

**1. Information -** \`help\`, \`game\`, \`tutorial\`, \`invite\`
**2. Game -** \`configure\`, \`join\`, \`leave\`, \`start\`, \`clue\`, \`guess\`, \`endturn\`, \`stop\`, \`rng\`

Found a bug / have suggestions & feedback? Create an issue here: https://github.com/GoogleFeud/codenames-bot/issues
`)
    }else {
        const command = handler.findCommand(args[0]);
        if (!command) return message.channel.send("**✖ | This command doesn't exist!**");
        let restrictions = '';
        const embed = new MessageEmbed();
        embed.setAuthor(message.author.username, message.author.displayAvatarURL());
        embed.setTitle(command.name);
        embed.setColor("RANDOM");
        embed.setDescription(command.description);
        if (command.usage) embed.addField("Usage", command.usage);
        if (command.aliases) embed.addField("Aliases", command.aliases);
        if (command.requiresGame) restrictions += '- A game needs to be configured on this channel\n';
        if (command.requiresTurn) restrictions += '- It must be your team\'s turn\n';
        if (command.requiresSpymaster) restrictions += '- You must be the spymaster\n'
        if (command.requiresGameMaster) restrictions += '- You must be the game master\n'
        if (restrictions != '') embed.addField("Restrictions", restrictions);
        message.channel.send(embed);
    }
}
}