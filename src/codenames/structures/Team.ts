import { Collection } from "discord.js-light";
import { GUESS_RESPONSE, TEAMS } from "../../utils/enums";
import { Game } from "./Game";
import { Player } from "./Player";

export class Team {
    game: Game
    id: TEAMS
    players: Collection<string, Player>
    spymaster?: Player
    canEnd: boolean
    guesses?: number
    wordsLeft?: number
    constructor(game: Game, id: TEAMS) {
        this.game = game;
        this.id = id;
        this.players = new Collection();
        this.canEnd = false;
    }

    addPlayer(id: string) : Player {
        const player = new Player(id, this);
        this.players.set(id, player);
        return player;
    }

    guess(wordTxt: string) : GUESS_RESPONSE {
        const word = this.game.words.find(w => w.literal === wordTxt);
        if (!word) return GUESS_RESPONSE.NO_SUCH_WORD;
        if (word.guessedBy) return GUESS_RESPONSE.ALREADY_GUESSED;
        word.guessedBy = this.id;
        if (this.guesses !== undefined) this.guesses--;
        if (!this.canEnd) this.canEnd = true;
        word.update(this.game.board, false);
        word.update(this.game.masterBoard, true);
        return GUESS_RESPONSE.FINE;
    }

    get name() : string {
        switch (this.id) {
        case TEAMS.RED: return "red";
        case TEAMS.BLUE: return "blue";
        }
    }

    toString() : string {
        switch (this.id) {
        case TEAMS.RED: return "🔴 Red";
        case TEAMS.BLUE: return "🔵 Blue";
        }
    }

}
