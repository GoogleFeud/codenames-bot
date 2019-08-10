const Util = require("../../Util/Util.js");

module.exports = {
    name: "tutorial",
    description: "Learn how to play!",
    async exe(message, args, handler) {
        message.channel.send("```ml\n'Codenames' \"Tutorial\"```\n\nWelcome to the codenames bot tutorial! Before we begin, this game is **exactly the same** as the board game. If you don't know how to play the board game, read this: https://en.wikipedia.org/wiki/Codenames_(board_game).\n\n__Send Anything To Continue__");
        await Util.awaitConfirmation(message.channel, msg => msg.author.id === message.author.id);
        message.channel.send("```ml\n'Codenames' \"Tutorial\"```\n\nTo create a game lobby, do `-configure` in the channel you want to play in. Only **1** game can be played in the same channel at a time. The person who does the configure command is the **game master**. The game master can also start the game (`-start`), 'rng' the players by placing them on random teams (`-rng`) and end/stop/destroy the game lobby (`-stop`). You can also add custom words by providing them in the `-configure` command like so: `-configure word1 word2 word3 word4`\n\n__Send Anything To Continue__");
        await Util.awaitConfirmation(message.channel, msg => msg.author.id === message.author.id);
        message.channel.send("```ml\n'Codenames' \"Tutorial\"```\n\nOnce the lobby has been created, players can do `-join [team]`, where `[team]` is either `red` or `blue`, to join. If a player wants to become the spymaster for their team, they do `-spymaster`.\n\n__Send Anything To Continue__");
        await Util.awaitConfirmation(message.channel, msg => msg.author.id === message.author.id);
        message.channel.send("```ml\n'Codenames' \"Tutorial\"```\n\nThis is what the spymasters see at the start of every turn: https://imgur.com/vCfvr1g\n\nThe words in red are `red agents`, the words in blue are `blue agents`, the words in white are `bystanders`, and the word with __black background__ is the `assassin`. Before the spymaster's team can guess, the spymaster must give out a clue and the amount of guesees with `-clue [clue] [guesses]`, where `[clue]` is a 1 word clue and `[guesses]` is the number of guesses their team has this round.\n This is what the spymasters see later on, where guesses have been made: https://imgur.com/7F3cTb6\n\n__Send Anything To Continue__");
        await Util.awaitConfirmation(message.channel, msg => msg.author.id === message.author.id);
        message.channel.send("```ml\n'Codenames' \"Tutorial\"```\n\nOnce the spymaster has given out the clue, the players of their team have to make guesses. They do that with the `-guess [words]` command. `[words]` can be a single word, for example: `-guess microwave`, or it can be multiple words separated by a space: `-guess microwave horse road`. Players can also end their turn if they want to with the `-endturn` command. Players must make 1 guess before ending their turn.\n\n__Send Anything To Continue__");
        await Util.awaitConfirmation(message.channel, msg => msg.author.id === message.author.id);
        message.channel.send("```ml\n'Codenames' \"Tutorial\"```\n\nAnd that's it! Have fun using the bot!\n\nTo see the list of all commands, do: `-help`\nFound a bug? Create an issue here: https://github.com/GoogleFeud/codenames-bot/issues\nHave suggestions/feedback? Also create an issue: https://github.com/GoogleFeud/codenames-bot/issues\nEnjoying the bot? Star it!")
}

}