
module.exports = {
    name: "legend",
    description: "See what all those colors mean on the board",
    exe(message, args, handler) {
        message.channel.send(`
\`FOR PHONE USERS\`

\`\`\`ml
words wrapped in '' - red words
words wrapped in "" - blue words
words with a capital first letter - neutral
\`\`\`

\`FOR SPYMASTERS\`

\`\`\`ml
Red: Red words which have been guessed appear 'like this'.
Blue: Blue words which have been guessed appear "like this".
Neutral: Neutral words which have been guessed appear Like This.
\`\`\`
`)
    }
}