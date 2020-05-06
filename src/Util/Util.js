
const fetch = require("node-fetch");

module.exports = class Util {
    
    static rngArr(items) {
        return items[Math.floor(Math.random()*items.length)];
    }

    static rngBtw(min, max) {
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

    static maxLength(words) {
        return Math.max(...words.map(w => w.length));
    }

    static space(amount) {
        let res = "";
        for (let i=0; i < amount;i++) res += "\xa0";
        return res;
    }

    static awaitConfirmation(channel, filter, time) {
        return new Promise(async res => {
              const response = await channel.awaitMessages(filter, {max: 1, time: time});
              res(response.first());
        });
    }

    static hasNoRepeats(arr) {
        return arr.every(num => arr.indexOf(num) === arr.lastIndexOf(num));
    }

    static codeGen() {
        return '_' + Math.random().toString(36).substr(2, 5);
    }

    static DBL(token, handler, interval = 1800000) { // https://top.gg/api
        fetch("https://top.gg/api/bots/stats", {method: "POST", hostname: "top.gg", headers: {
            'content-type': "application/json",
            'authorization': token,
        }, body: JSON.stringify({
            server_count: handler.guilds.cache.size
        })}).catch(err => {});
        setInterval(() => {
            fetch("https://top.gg/api/bots/stats", {method: "POST", hostname: "top.gg", headers: {
                'content-type': "application/json",
                'authorization': token,
            }, body: JSON.stringify({
                server_count: handler.guilds.cache.size
            })}).catch(err => {});
        }, interval);
    }

    static permissions = {
        requiresGame: 0b1000,
        requiresTurn: 0b0100,
        requiresSpymaster: 0b0010,
        requiresGameMaster: 0b0001
    }

    static perm(commandPerm, requiredPerm) {
        return commandPerm & requiredPerm;
    }

    static addBits(...bits) {
        let tot = 0;
        for (let bit of bits) tot |= bit;
        return tot;
    }
    
}