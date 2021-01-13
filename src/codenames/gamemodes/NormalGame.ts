
import { rngBtw } from "../../utils";
import { TEAMS, WORD_TYPES } from "../../utils/enums";
import {Game} from "../structures/Game";
import { Team } from "../structures/Team";

export class NormalGame extends Game {
    red: Team
    blue: Team
    constructor(channelId: string) {
        super(channelId);
        this.red = new Team(this, TEAMS.RED);
        this.blue = new Team(this, TEAMS.BLUE);
    }

    start(customWords?: Array<string>) : void {
        this.red.wordsLeft = rngBtw(8, 9);
        this.blue.wordsLeft = this.red.wordsLeft === 9 ? 8:9;
        this.words.insert({
            neutral: 7,
            assassin: 1,
            red: this.red.wordsLeft,
            blue: this.blue.wordsLeft,
            presetWords: customWords || []
        });
        const wordArray = this.words.raw();
        this.board.draw(wordArray);
        this.masterBoard.draw(wordArray);
    }

    determineWinner() : number {
        if (this.red.wordsLeft === 0) return TEAMS.RED;
        else if (this.blue.wordsLeft === 0) return TEAMS.BLUE;
        else if (this.words.ofType(WORD_TYPES.ASSASSIN, true).some(w => w.guessedBy = this.red.id)) return TEAMS.RED;
        else if (this.words.ofType(WORD_TYPES.ASSASSIN, true).some(w => w.guessedBy === this.blue.id)) return TEAMS.BLUE;
        return 0;
    }

    
}