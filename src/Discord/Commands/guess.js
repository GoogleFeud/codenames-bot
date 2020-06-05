const Util = require("../../Util/Util.js");

function handleWinner(game, res, handler, message) {
    const winner = game.isThereAWinner();
    if (typeof winner === "string") {
        game.masterBoard.sendAsMessage(game.channel, `${res}\n${winner}`);
        handler.games.delete(message.channel.id);
        return true;
    }
    if (winner) {
        game.updateMasterBoard();
        game.masterBoard.sendAsMessage(game.channel, `${res}\n**${winner.emoji} | \`${winner.name}\` (${winner.players.map(p => p.user.username).join(", ")}) wins!**`);
        handler.games.delete(message.channel.id);
        return true;
    }
}

module.exports = {
    name: "guess",
    description: "Guess a word!",
    permissions: Util.addBits(Util.permissions.requiresGame, Util.permissions.requiresTurn),
    usage: "-guess [words...]\n-guess plane\n-guess plane bird bomb",
    exe(message, args, handler, game, player) {
        if (!game.started) return;
        if (player.team.guesses === false) return message.channel.send("**✖ | The spymaster hasn't given the clue!**");
        if (player.team.spymaster.user.id == message.author.id) return message.channel.send("**✖ | The spymaster cannot use this command!**");
        if (!args.length) return message.channel.send("**✖ | You need to provide at least 1 word!**");
       if (args[0].includes(" | ")) args = args[0].split(" | ");
        if (!args.length) return message.channel.send("**✖ | You need to provide at least 1 word!**");
        if (args.length > player.team.guesses) return message.channel.send("**✖ | You cannot guess this many words!**");
        let res = '';
        let sent = false;
        for (let wordA of args) {
            let og = game.words.find(w => w.word == wordA);
            if (player.team.guesses === 0) {
                if (handleWinner(game, res, handler, message)) return;
                game.turn.canEnd = false;
                game.turn.guesses = false;
                game.clue = null;
                game.turn = game.other(player.team);
                message.channel.send(`${res}\n**${game.turn.emoji} | \`${game.turn}\` (${game.turn.players.map(p => p.user.username).join(", ")}), it's your turn!**`);
                game.displayBoard();
                return game.displayMasterBoard();
            }
            const word = player.team.guess(wordA);
             if (!og && !res.includes(`**✖ | \`${wordA}\` isn't on the board!**\n`)) res += `**✖ | \`${wordA}\` isn't on the board!**\n`;
             else if (word === 1 && !res.includes(`**✖ | The word \`${wordA}\` has already been guessed!**`)) res += `**✖ | The word \`${wordA}\` has already been guessed!**`;
             else if (word === false) {
                res += `**${og.emoji} | The word \`${og.word}\` is a${og.clearType.startsWith("a") ? "n":""} \`${og.clearType}\`!**\n`;
                if (handleWinner(game, res, handler, message)) return;
                sent = true;
                player.team.guesses = 0;
                game.turn.canEnd = false;
                game.turn.guesses = false;
                game.clue = null;
                game.turn = game.other(player.team);
                message.channel.send(`${res}\n**${game.turn.emoji} | \`${game.turn}\` (${game.turn.players.map(p => p.user.username).join(", ")}), it's your turn!**`);
                game.displayBoard();
                return game.displayMasterBoard();
             }else {
                 res += `**${og.emoji} | The word \`${og.word}\` is a \`${og.clearType}\`! You have \`${player.team.guesses}\` guesses left!**\n`;
             }
             if (handleWinner(game, res, handler, message)) return;
        }
        if (!sent) return message.channel.send(res);
    }
}
