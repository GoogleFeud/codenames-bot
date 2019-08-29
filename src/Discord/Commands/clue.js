
module.exports = {
    name: "clue",
    description: "Give out a clue!",
    requiresGame: true,
    requiresTurn: true,
    requiresSpymaster: true,
    usage: "-clue [word] [guesses]",
    exe(message, args, handler) {
       let [word, number] = args;
       if (isNaN(number)) return message.channel.send("**✖ | You need to provide the amount of guesses your team will have!**");
       number = Number(number);
       message.channel.game.lastAction = Date.now();
       if (number > message.channel.game.words.unguessed().size) return message.channel.send(`**✖ | Maximum guesses are ${message.channel.game.words.unguessed().size}**`)
       message.channel.game.clue = `${word} (${number})`;
       message.channel.send(`${message.author.team.emoji} | Clue for the **${message.author.team}** team: **${word}** (${number})`);
       if (number <= 0) number = 1;
       message.author.team.guesses = number + 1;
       handler.commands.get("game").exe(message, args, handler);
    }
}