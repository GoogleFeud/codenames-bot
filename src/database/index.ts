

import {User, UserModel, IUser} from "./models/User";
import {Guild, GuildModel, IGuild} from "./models/Guild";

const userCache = new Map<string, UserModel>();
const guildCache = new Map<string, GuildModel>();

export async function getUser(id: string) : Promise<UserModel|undefined> {
    if (userCache.has(id)) return userCache.get(id);
    const user = await User.findByPk(id);
    if (!user) return;
    userCache.set(id, user);
    return user;
}

export async function findOrCreateUser(obj: IUser) : Promise<UserModel> {
    if (userCache.has(obj.id)) return userCache.get(obj.id) as UserModel;
    const user = (await User.findCreateFind({where: {id: obj.id}, defaults: obj}))[0];
    userCache.set(obj.id, user);
    return user;
}

export async function deleteUser(id: string) : Promise<void> {
    if (userCache.has(id)) userCache.delete(id);
    await User.destroy({where: {id: id} });
}

export async function getGuild(id: string) : Promise<GuildModel|undefined> {
    if (guildCache.has(id)) return guildCache.get(id);
    const guild = await Guild.findByPk(id);
    if (!guild) return;
    guildCache.set(id, guild);
    return guild;
}

export async function findOrCreateGuild(obj: IGuild) : Promise<GuildModel> {
    if (guildCache.has(obj.id)) return guildCache.get(obj.id) as GuildModel;
    const guild = (await Guild.findCreateFind({where: {id: obj.id}, defaults: obj}))[0];
    guildCache.set(obj.id, guild);
    return guild;
}

export async function sync() : Promise<void> {
    await User.sync();
    await Guild.sync();
}

