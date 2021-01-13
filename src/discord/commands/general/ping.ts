
//import { respond } from "../../utils";
import { CommandContext } from "../..";
import { ARGUMENT_TYPES } from "../../../utils/enums";

export default {
    name: "ping",
    description: "Ping pong!",
    options: [
        {
            name: "words",
            description: "The words you want to guess, separated by a comma or a white space",
            type: ARGUMENT_TYPES.STRING,
            required: true
        },
        {
            name: "user",
            description: "A user",
            type: ARGUMENT_TYPES.USER
        },
        {
            name: "magic_number",
            description: "A magic number",
            type: ARGUMENT_TYPES.INTEGER
        }
    ],
    execute: (ctx: CommandContext) : string|undefined => {
        return `Your words: ${ctx.args.words}`;
    }
};