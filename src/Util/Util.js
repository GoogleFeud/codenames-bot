


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
    
}