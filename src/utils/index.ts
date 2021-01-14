import { Client, MessageEmbed, MessageEmbedOptions } from "discord.js-light";
import { Interaction } from "../discord";
import fs from "fs";


export function getFiles(folder: string) : Array<string> {
    const filePaths = [];
    const allFiles = fs.readdirSync(folder);
    for (const file of allFiles) {
        const path = `${folder}/${file}`;
        const fileStats = fs.statSync(path);
        if (fileStats.isFile()) filePaths.push(path);
        else filePaths.push(...getFiles(path));
    }
    return filePaths;
}

export function respond(client: Client, interaction: Interaction, data: string|Array<MessageEmbed|MessageEmbedOptions>) : Promise<unknown> {
    const bod = typeof data === "string" ? {content: data, allowed_mentions: {parse: []}}:{embeds: data, allowed_mentions: {parse: []}};
    // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
    return client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 3,
        data: bod
    }
    });
}

export function shuffle<T>(arr: Array<T>) : Array<T> {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function rngBtw(min: number, max: number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}