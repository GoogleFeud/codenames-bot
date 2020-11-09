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

### Requirements

- A Virtual Private Server (VPS) or a website where you can host the bot. (glitch, heroku). The OS of the VPS doesn't matter.
- Node.js **version ^12.0.0 and up**
- npm 
- If your OS is windows, you need the `Windows Build Tools`. Install them via `npm i --global --production windows-build-tools`
- If your OS is Linux/Ubuntu, you need the `build-essentials` package. Install it via `sudo apt-get install build-essential`
- A discord bot application. [Here's a good tutorial on how to create a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

### How to run

- Clone this repository
- Inside the root folder of the repo, run the command `npm i`
- Create a file in the root folder of the repo called `.env`. Inside it, paste the following:    
```
TOKEN=token
OWNER=id
``` 
Where `token` is your bot's token, which you can get from the bot application page, and `id` is your own discord id.    
- Run `node index` in the root folder of the repo.

### 

## Bugs, Suggestions, Feedback

If you want to report bugs, suggest new features or just give feedback about the bot, submit an issue [here](https://github.com/GoogleFeud/codenames-bot/issues) and give it the appropriate label.

