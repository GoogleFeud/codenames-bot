
const types = {
    neutral: (word, ctx, master) => {
        if (master && !word.guessedBy) return ctx.colorWord(word.word, "white"); 
        if (word.guessedBy) {
            ctx.colorWordBox(word.word, "white");
           return ctx.colorWord(word.word, "black"); 
        };
        return null;
    },
    red: (word, ctx, master) => {
         if (master && !word.guessedBy) return ctx.colorWord(word.word, "#D13030");
         if (word.guessedBy) {
             ctx.colorWordBox(word.word, "#D13030");
             return ctx.colorWord(word.word, "black"); 
         }
         return null;
    },
    blue: (word, ctx, master) => {
        if (master && !word.guessedBy) return ctx.colorWord(word.word, "#4183cc");
        if (word.guessedBy) {
            ctx.colorWordBox(word.word, "#4183cc"); 
            ctx.colorWord(word.word, "black")
        }
        return null;
    },
    assassin: (word, ctx, master) => {
        if (master && !word.guessedBy) {
            ctx.colorWordBox(word.word, "black"); 
            ctx.colorWord(word.word, "white");
        }
        if (word.guessedBy) {
            ctx.colorWordBox(word.word, "#ccc"); 
            ctx.colorWord(word.word, "black");
        }
        return null;
    },
}

const other = {
    emoji: {
        red: "🔴",
        blue: "🔵",
        neutral: (Math.round(Math.random()) == 1) ? "👱":"👩",
        assassin: "👤"
    },
    real: {
        red: "red agent",
        blue: "blue agent",
        neutral: "bystander",
        assassin: "assassin"
    }
}


class Word {
    constructor(word, data = {}) {
        this.word = word;
        this.type = data.type;
        this.guessedBy = data.guessedBy;
        this.emoji = other.emoji[this.type];
        this.clearType = other.real[this.type];
    }

    setType(type) {
        this.type = type;
    }

    update(context, master) {
       return types[this.type](this, context, master);
    }

    toString() {
        return this.word;
    }

}

module.exports = Word;