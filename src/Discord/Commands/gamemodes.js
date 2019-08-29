
module.exports = {
    name: "gamemodes",
    description: "See all possible gamemodes!",
    aliases: ["gamemode"],
    exe(message, args, handler) {
        message.channel.send(`
\`2Team\` - The default gamemode. 2 teams: red and blue. 8/9 red/blue agents, 1 assassin and 7 bystanders.
\`1Team\` - 1 team (blue) tries to find all their agents. 10 blue agents and 15 assassins.

To select a gamemode, do: \`-configure [gamemode] [...words]\`. (Words are optional!). Example: \`-configure 1Team\`, \`-configure 1Team word1 word2 word3\`
        `)
    }
}