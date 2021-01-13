import { TEAMS, WORD_TYPES } from "../../utils/enums";
import { Grid } from "../Grid";

const bystanderEmojis = ["👱", "👩", "👨‍🦰", "🧑🏿", "👨🏿"];
const assassinEmojis = ["🕵️", "🕵️‍♀️", "🕵🏿‍♂️", "🕵🏻‍♀️"];

export class Word {
    literal: string
    type: WORD_TYPES

    guessedBy?: TEAMS
    constructor(word: string, type: WORD_TYPES) {
        this.literal = word;
        this.type = type;
    }

    update(board: Grid, master: boolean) : void {
        switch(this.type) {
        case WORD_TYPES.NEUTRAL:
            if (master && !this.guessedBy) board.colorWord(this.literal, "white");
            if (this.guessedBy) {
                board.colorBox(this.literal, "white");
                board.colorWord(this.literal, "black");
            }
            break;
        case WORD_TYPES.ASSASSIN:
            if (master && !this.guessedBy) {
                board.colorBox(this.literal, "black");
                board.colorWord(this.literal, "white");
            }
            if (this.guessedBy) {
                board.colorBox(this.literal, "gray");
                board.colorWord(this.literal, "black");
            }
            break;
        case WORD_TYPES.RED:
            if (master && !this.guessedBy) board.colorWord(this.literal, "#D13030");
            if (this.guessedBy) {
                board.colorBox(this.literal, "#D13030");
                board.colorWord(this.literal, "black");
            }
            break;
        case WORD_TYPES.BLUE:
            if (master && !this.guessedBy) board.colorWord(this.literal, "#4183cc");
            if (this.guessedBy) {
                board.colorBox(this.literal, "#4183cc");
                board.colorWord(this.literal, "black");
            }
            break;
        }
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
