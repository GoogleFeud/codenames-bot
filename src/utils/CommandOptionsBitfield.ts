
import {BitField, RecursiveReadonlyArray} from "discord.js";

export class CommandOptions extends BitField<POSSIBLE_FLAGS> {
    constructor(bits?: POSSIBLE_FLAGS|number|RecursiveReadonlyArray<POSSIBLE_FLAGS>) {
        super(bits);
    }

    static FLAGS = {
        REQUIRES_GAME_STARTED: 1 << 0,
        REQUIRES_GAMEMASTER: 1 << 1,
        REQUIRES_SPYMASTER: 1 << 2,
        NO_SPYMASTER: 1 << 3,
        REQUIRES_GAME_NOT_STARTED: 1 << 4,
        REQUIRES_IN_GAME: 1 << 5
    }

}

export type POSSIBLE_FLAGS = "REQUIRES_GAME_STARTED"|"REQUIRES_GAMEMASTER"|"REQUIRES_SPYMASTER"|"NO_SPYMASTER"|"REQUIRES_GAME_NOT_STARTED"|"REQUIRES_IN_GAME";

export declare interface CommandOptions {
    has(perm: POSSIBLE_FLAGS) : boolean;
}