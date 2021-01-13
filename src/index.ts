
import {createClient} from "./discord";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../config.json") as BotConfig;

(async () => {
    createClient(config);
    console.log("Bot booted!");
})();

export interface BotConfig {
    token: string,
    ownerId: string,
    devGuildId: string,
    test: boolean
}