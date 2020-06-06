
const Util = require("../../Util/Util.js");

module.exports = async (handler, message) => {
    if (!message.guild_id || message.author.bot || !message.author) return; // If DM channel / bot, ignore
    //if (!message.guild.me.hasPermission("SEND_MESSAGES")) return; - This one is yikes
    if (!message.content.startsWith(handler.prefix)) return;

    /**try {
      await handler._dummySend(message.channel_id);
    }catch(err) {
        return;
    } **/

    const args = message.content.slice(handler.prefix.length).replace(/\s+/g, " ").trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = handler.findCommand(cmdName);
    if (!command) return;

    if (handler.cooldowns.register(message.author, 8000)) {
        if (!handler.cooldowns.isMuted(message.author.id)) {
            handler.cooldowns.mute(message.author.id);
            handler.sendToChannel(message.channel_id, `> 🥶 ${message.author.username}, please wait a few seconds before using another command!`);
         }
        return;
    }

    let game;
    let player;
    if (command.permissions) {
        game = handler.games.get(message.channel_id);
        if (Util.perm(command.permissions, Util.permissions.requiresGame) && !game) return handler.sendToChannel(message.channel_id, "✖ | **This channel must have a game configured in order to use this command!**");
    
        player = game ? game.players.get(message.author.id):undefined;
        if (Util.perm(command.permissions, Util.permissions.requiresTurn) && game.turn && player && player.team.name != game.turn) return handler.sendToChannel(message.channel_id, "✖ | **You can use this command when it's your turn!**")
    
        if (game && game.started && Util.perm(command.permissions, Util.permissions.requiresSpymaster) && game.turn && game.turn.spymaster.user.id != message.author.id) return handler.sendToChannel(message.channel_id, "✖ | **You must be your team's spymaster in order to use this command!**");
    
        if (Util.perm(command.permissions, Util.permissions.requiresGameMaster) && game.master.id != message.author.id) return handler.sendToChannel(message.channel_id, "✖ | **You must be the game master in order to use this command!**");
    }

   try {
       const res = command.exe(message, args, handler, game, player);
       if (typeof res === "string") handler.sendToChannel(message.channel_id, res);
   }catch(err) {
       console.error(err);
       handler.sendToChannel(message.channel_id, `✖ | **An error occured!**\n \`\`\`${err.name}\n${err.message}\`\`\``);
   }
 }