
module.exports = {
    name: "invite",
    description: "Get an invite!",
    exe(message, args, handler) {
       message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=606487052992905247&permissions=3072&scope=bot");
}
}