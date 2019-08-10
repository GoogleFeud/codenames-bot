const {Collection} = require("discord.js");


module.exports = async (handler, message) => {
    if (message.channel.type == 'dm' || message.author.bot) return;
    if (!message.content.startsWith(handler.prefix)) return;

    const args = message.content.slice(handler.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = handler.findCommand(cmdName);
    if (!command) return;

    if (command.botOwnerOnly && message.author.id != handler.owner) return message.channel.send("✖ | **Only my owner can use this command!**");

    if (command.requiresGame && !message.channel.game) return message.channel.send("✖ | **This channel must have a game configured in order to use this command!**");

    //if (command.requiresGame && message.channel.game.started && !message.channel.game.players.has(message.author.id)) return;

    if (command.requiresTurn && message.channel.game.turn && message.author.team.name != message.channel.game.turn) return message.channel.send("✖ | **You can use this command when it's your turn!**")

    if (command.requiresSpymaster && message.channel.game.turn && message.channel.game.turn.spymaster.id != message.author.id) return message.channel.send("✖ | **You must be your team's spymaster in order to use this command!**");

    if (command.requiresGameMaster && message.channel.game.master.id != message.author.id) return message.channel.send("✖ | **You must be the game master in order to use this command!**");

   try {
       command.exe(message, args, handler);
   }catch(err) {
       console.log(err);
       message.channel.send(`✖ | **An error occured!**\n \`\`\`${err.name}\n${err.message}\`\`\``);
   }
 }