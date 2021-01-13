import { WORD_TYPES } from "../../utils/enums";

const bystanderEmojis = ["👱", "👩", "👨‍🦰", "🧑🏿", "👨🏿"];
const assassinEmojis = ["🕵️", "🕵️‍♀️", "🕵🏿‍♂️", "🕵🏻‍♀️"];

export class Word {
    literal: string
    type: WORD_TYPES

    //TODO: Instead of string, guessedBy should be of type Player
    guessedBy?: string
    constructor(word: string, type: WORD_TYPES) {
        this.literal = word;
        this.type = type;
    }

    get emoji() : string {
        switch(this.type) {
        case WORD_TYPES.ASSASSIN: return assassinEmojis[Math.floor(Math.random() * assassinEmojis.length)];
        case WORD_TYPES.NEUTRAL: return bystanderEmojis[Math.floor(Math.random() * bystanderEmojis.length)];
        case WORD_TYPES.BLUE: return "🔵";
        case WORD_TYPES.RED: return "🔴";
        }
    } 

    get clearType() : string {
        switch (this.type) {
        case WORD_TYPES.ASSASSIN: return "assassin";
        case WORD_TYPES.NEUTRAL: return "bystander";
        case WORD_TYPES.RED: return "red agent";
        case WORD_TYPES.BLUE: return "blue agent";
        }
    }

    toString() : string {
        return this.literal;
    }
}
