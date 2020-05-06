
const Util = require("../../Util/Util.js");

module.exports = async (handler, message) => {
    if (message.channel.type == 'dm' || message.author.bot) return;
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
    if (!message.content.startsWith(handler.prefix)) return;

    const args = message.content.slice(handler.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = handler.findCommand(cmdName);
    if (!command) return;

    if (handler.cooldowns.register(message.author, 8000)) {
        if (!handler.cooldowns.isMuted(message.author.id)) {
            handler.cooldowns.mute(message.author.id);
            message.channel.send(`> 🥶 ${message.author}, please wait a few seconds before using another command!`);
         }
        return;
    }

    let game;
    let player;
    if (command.permissions) {
        game = handler.games.get(message.channel.id);
        if (Util.perm(command.permissions, Util.permissions.requiresGame) && !game) return message.channel.send("✖ | **This channel must have a game configured in order to use this command!**");
    
        player = game ? game.players.get(message.author.id):undefined;
        if (Util.perm(command.permissions, Util.permissions.requiresTurn) && game.turn && player && player.team.name != game.turn) return message.channel.send("✖ | **You can use this command when it's your turn!**")
    
        if (game && game.started && Util.perm(command.permissions, Util.permissions.requiresSpymaster) && game.turn && game.turn.spymaster.user.id != message.author.id) return message.channel.send("✖ | **You must be your team's spymaster in order to use this command!**");
    
        if (Util.perm(command.permissions, Util.permissions.requiresGameMaster) && game.master.id != message.author.id) return message.channel.send("✖ | **You must be the game master in order to use this command!**");
    }

   try {
       command.exe(message, args, handler, game, player);
   }catch(err) {
       console.log(err);
       message.channel.send(`✖ | **An error occured!**\n \`\`\`${err.name}\n${err.message}\`\`\``);
   }
 }