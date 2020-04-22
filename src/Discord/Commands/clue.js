
module.exports = {
    name: "clue",
    description: "Give out a clue!",
    requiresGame: true,
    requiresTurn: true,
    requiresSpymaster: true,
    usage: "-clue [word] [guesses]\n-clue something 3",
    exe(message, args, handler, game, player) {
       if (game.clue) return message.channel.send("**✖ | You already gave a clue to your team!**")
       let [word, number] = args;
       if (isNaN(number)) return message.channel.send("**✖ | You need to provide the amount of guesses your team will have!**");
       number = Number(number);
       game.lastAction = Date.now();
       if (number > game.words.unguessed().size) return message.channel.send(`**✖ | Maximum guesses are ${game.words.unguessed().size}**`)
       game.clue = `${word} (${number})`;
       message.channel.send(`${player.team.emoji} | Clue for the **${player.team}** team: **${word}** (${number})`);
       if (number <= 0) number = 1;
       player.team.guesses = number + 1;
       handler.commands.get("game").exe(message, args, handler, game);
    }
}