


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
    
}