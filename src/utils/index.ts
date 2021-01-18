import { Client, MessageEmbedOptions } from "discord.js-light";
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

export function respond(client: Client, interaction: Interaction, data: string|Array<MessageEmbedOptions>, clientOnly = false) : Promise<unknown> {
    let bod: Record<string, unknown> = {};
    if (typeof data === "string") bod = {content: data, allowed_mentions: {parse: []}, flags: 1 << 6};
    else {
        const firstEmbed = data[0];
        if (!firstEmbed.footer) firstEmbed.footer = {text: interaction.member.nick || interaction.member.user.username};
        else firstEmbed.footer.text += ` | ${interaction.member.nick || interaction.member.user.username}`;
        bod = {embeds: data, allowed_mentions: {parse: []}};
        if (clientOnly) bod.flags = 1 << 6;
    }
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

export function rngArr<T>(arr: Array<T>) : T {
    return arr[Math.floor(Math.random() * arr.length)];
}