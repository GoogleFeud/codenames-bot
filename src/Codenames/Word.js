
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


class Word {
    constructor(word, data = {}) {
        this.word = word.toLowerCase();
        this.type = data.type;
        this.guessedBy = data.guessedBy;
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

    get emoji() {
        switch(this.type) {
            case "red": return "🔴";
            case "blue": return "🔵";
            case "neutral": return (Math.round(Math.random()) == 1) ? "👱":"👩"
            case "assassin": return "👤";
        }
    }

    get clearType() {
        switch(this.type) {
            case "red": return "red agent";
            case "blue": return "blue agent";
            case "neutral": return "bystander";
            case "assassin": return "assassin";
        }
    }

}

module.exports = Word;