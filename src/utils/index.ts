import { Client, MessageEmbed } from "discord.js-light";
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

export function respond(client: Client, interaction: Interaction, data: string|Array<MessageEmbed>) : Promise<unknown> {
    const bod = typeof data === "string" ? {content: data}:{embeds: data};
    // @ts-expect-error This "hack" is going to be used until discord.js supports global commands
    return client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 3,
        data: bod
    }
    });
}

export interface ResponseContent {
    content?: string,
    embeds?: Array<MessageEmbed>
}