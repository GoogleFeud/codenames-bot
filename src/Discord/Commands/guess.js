
module.exports = {
    name: "guess",
    description: "Guess a word!",
    requiresGame: true,
    requiresTurn: true,
    usage: ">guess [words]\n>guess plane\n>guess plane bird bomb",
    exe(message, args, handler) {
        if (message.author.team.guesses === false) return message.channel.send("**✖ | The spymaster hasn't given the clue!**");
      //  if (message.author.team.spymaster.id == message.author.id) return message.channel.send("**✖ | The spymaster cannot use this command!**");
        if (!args.length) return message.channel.send("**✖ | You need to provide at least 1 word!**");
        if (args.length > message.author.team.guesses) return message.channel.send("**✖ | You cannot guess this many words!**");
        let res = '';
        let sent = false;
        for (let wordA of args) {
            let og = message.channel.game.words.find(w => w.word == wordA.toLowerCase());
            if (message.author.team.guesses === 0) {
                sent = true;
                return message.channel.send(res);
            }
            const word = message.author.team.guess(wordA);
             if (!og) res += `**✖ | ${word} isn't on the board!**\n`;
             else if (word === 1) res += `**✖ | The word ${word} has already been guessed!**`;
             else if (word === false) {
                 sent = true;
                res += `The word **${og.word}** is a... || **${og.type}** word! ||\n`;
                message.channel.send(res);
                return message.author.team.guesses = 0;
             }else {
                 res += `The word **${og.word}** belongs to... || your team! You have **${message.author.team.guesses}** guesses this turn! ||.\n`;
             }
        }
        if (!sent) return message.channel.send(res);
    }
}