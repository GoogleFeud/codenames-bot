

import {User, UserModel, IUser} from "./models/User";
import {Tournament, TournamentModel} from "./models/Tournament";
import {TournamentPlayer} from "./models/TournamentPlayer";
import {TournamentTeam} from "./models/TournamentTeam";

Tournament.hasMany(TournamentTeam, {foreignKey: "tourneyId", as: "teams"});
TournamentTeam.hasMany(TournamentPlayer, {foreignKey: "teamId", as: "players"});

const userCache = new Map<string, UserModel>();
const tournamentCache = new Map<string, TournamentModel>();

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

export async function getTournament(id: string) : Promise<TournamentModel|undefined> {
    if (tournamentCache.has(id)) return tournamentCache.get(id);
    const tourney = await Tournament.findByPk(id, {include: {all: true, nested: true}});
    if(!tourney) return;
    tournamentCache.set(id, tourney);
    return tourney;
}

export async function sync() : Promise<void> {
    await User.sync();
    await Tournament.sync();
    await TournamentTeam.sync();
    await TournamentPlayer.sync();
}
