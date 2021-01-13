
import {Word} from "./Word";
import * as Words from "../words";
import { WORD_TYPES } from "../../utils/enums";
import { shuffle } from "../../utils";

export class WordList extends Array<Word> {
    constructor(options: WordListOptions) {
        super();
        const totalAmount = options.assassin + options.red + options.neutral + options.blue;
        const luckyWords = Words.random(totalAmount);
        for (const word of luckyWords) {
            if (options.assassin) {
                this.push(new Word(word, WORD_TYPES.ASSASSIN));
                options.assassin--;
            } else if (options.neutral) {
                this.push(new Word(word, WORD_TYPES.NEUTRAL));
                options.neutral--;
            } else if (options.blue) {
                this.push(new Word(word, WORD_TYPES.BLUE));
                options.blue--;
            } else if (options.red) {
                this.push(new Word(word, WORD_TYPES.RED));
                options.red--;
            }
        }
        shuffle(this);
    }

    unguessed() : Array<Word> {
        return this.filter(w => !w.guessedBy);
    }

    ofType(type: WORD_TYPES, guessed = false) : Array<Word> {
        return this.filter(w => w.type === type && Boolean(w.guessedBy) === guessed);
    }

}

export interface WordListOptions {
    red: number,
    blue: number,
    assassin: number,
    neutral: number
}