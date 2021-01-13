/* eslint-disable @typescript-eslint/no-unused-vars */

import { CommandContext, CommandExecuteRes} from "../..";
import { ARGUMENT_TYPES } from "../../../utils/enums";

export default {
    name: "eval",
    description: "evaluate javascript",
    devOnly: true,
    options: [
        {
            name: "code",
            description: "Code to evaluate",
            type: ARGUMENT_TYPES.STRING,
            required: true
        }
    ],
    execute: async (ctx: CommandContext) : Promise<CommandExecuteRes> => {
        if (!ctx.interaction.member.user || ctx.interaction.member.user.id !== ctx.config.ownerId) return;
        try {
            return `> ℹ️ | Result: ${JSON.stringify(await eval(ctx.args.code as string))}`;
        }catch(err) {
            return `> ❌ | ${err}`;
        }
    }
};