import { CommandContext, CommandExecuteRes } from "../..";
import { NormalGame } from "../../../codenames/gamemodes/NormalGame";

export default {
    name: "game",
    description: "Get information about the game",
    execute: ({game}: CommandContext) : CommandExecuteRes => {
        if (!game) return [NormalGame.fakeDisplay()];
        return [game.display()];
    }
};