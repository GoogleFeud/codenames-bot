# codenames-bot

👏 Thank COVID-19 for making me update this bot. It's now compatible with the latest version of discord.js 👏

 ![owner](https://discordbots.org/api/widget/owner/606487052992905247.svg)

A fully automated discord bot for playing the award-winning party game [codenames](https://en.wikipedia.org/wiki/Codenames_(board_game)).

![show](https://i.imgur.com/K9qx1nW.gif)

## How To Use / Commands

Do `-tutorial` to see the tutorial. There everything is explained in detail.

`GameMaster` = The person who created the lobby (AKA the person who did `-configure`)


| Command       | Description   | Permissions  |
| ------------- | ------------- |------------- |
| help          | Get help!     | N/A          |
| game          | Check the game in this channel  | N/A |
| tutorial          | Check out the tutorial     | N/A  |
| gamemodes       | See all gamemodes  | N/A |
| configure       | Configure a lobby in this channel   | N/A |
| join          | Join the game in this channel  | `requiresGame` |
| leave          | Leave the game in this channel | `requiresGame` |
| spymaster       | Become the spymaster for your team | `requiresGame` |
| rng         | Randomize the teams and spymasters  | `requiresGame`, `requiresGameMaster` |
| start          | Starts the game in this channel  | `requiresGame`, `requiresGameMaster` |
| stop         | Stops the game  | `requiresGame`, `requiresGameMaster` |
| clue         | Give out a clue to your teammates | `requiresGame`, `requiresTurn`, `requiresSpymaster` |
| guess          | Guess words  | `requiresGame`, `requiresTurn` |
| endturn      | End your turn | `requiresGame`, `requiresTurn` |
| givemaster      | Give another player game master.  | `requiresGame`, `requiresGameMaster` |

## Self-Hosting

If you want to self-host the bot, clone or fork this repository. Then, do `npm i` in the folder where `package.json` is. **You must have node.js version ^12.0.0 installed.**

**Note:** Do not host on heruko! The `canvas` module breaks if it's hosted on heruko. The board won't be displayed correctly!

## Bugs, Suggestions, Feedback

If you want to report bugs, suggest new features or just give feedback about the bot, submit an issue [here](https://github.com/GoogleFeud/codenames-bot/issues) and give it the appropriate label.

