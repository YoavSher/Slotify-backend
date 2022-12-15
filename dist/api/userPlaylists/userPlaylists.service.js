"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const sqlService = require('../../services/db.service');
function getUserPlaylists(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT playlistId AS _id,name,image,creatorId,fullName
        FROM usersLikedPlaylists
        JOIN playlists
        ON playlists._id=usersLikedPlaylists.playlistId
        JOIN users
        ON users._id =usersLikedPlaylists.userId
        WHERE userId=${userId};`;
            const playlists = yield sqlService.runSQL(query);
            console.log(playlists);
            return playlists;
        }
        catch (err) {
            console.log(err);
        }
    });
}
function addLikedPlaylist(userId, playlistId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO usersLikedPlaylists (userId,playlistId)
        values(${userId},${playlistId});`;
            const action = yield sqlService.runSQL(query);
            return action.affectedRows === 1;
        }
        catch (err) {
            throw err;
        }
    });
}
function removeLikedPlaylist(userId, playlistId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `DELETE FROM usersLikedPlaylists WHERE
         playlistId=${playlistId} AND userId=${userId};`;
            const action = yield sqlService.runSQL(query);
            return action.affectedRows === 1;
        }
        catch (err) {
            throw err;
        }
    });
}
function addToRecentlyPlayed(userId, playlistId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `SELECT * FROM recentlyPlayedPlaylists WHERE userId=${userId};`;
            let toRemove = false;
            const recentlyPlayed = yield sqlService.runSQL(query);
            const currPlaylist = recentlyPlayed.find((playlist) => playlist.playlistId === playlistId); // make it not any.
            if (currPlaylist) {
                query = `UPDATE recentlyPlayedPlaylists SET addedAt='${Date.now()}'
             WHERE playlistId=${playlistId} AND userId=${userId};`;
                if (recentlyPlayed.length > 6)
                    toRemove = true;
            }
            else {
                query = `INSERT INTO recentlyPlayedPlaylists(playlistId, userId, addedAt)
            values(${playlistId},${userId}, '${Date.now()}');`;
                if (recentlyPlayed.length > 5)
                    toRemove = true;
            }
            yield sqlService.runSQL(query);
            if (toRemove) {
                let addedFirst = { addedAt: 'Infinity', userId: 0, playlistId: 0 };
                recentlyPlayed.forEach((playlist) => {
                    if (+playlist.addedAt < +addedFirst.addedAt)
                        addedFirst = playlist;
                });
                query = `DELETE FROM recentlyPlayedPlaylists 
            WHERE userId=${userId} and playlistId=${addedFirst.playlistId}`;
                yield sqlService.runSQL(query);
            }
        }
        catch (err) {
            throw err;
        }
    });
}
function getUserRecentPlaylists(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT playlistId AS _id,name,image,creatorId,fullName
        FROM recentlyPlayedPlaylists
        JOIN playlists
        ON playlists._id=recentlyPlayedPlaylists.playlistId
        JOIN users
        ON users._id =recentlyPlayedPlaylists.userId
        WHERE userId=${userId}
        ORDER BY addedAt DESC;`;
            const recentPlaylists = yield sqlService.runSQL(query);
            return recentPlaylists;
        }
        catch (err) {
            console.log(err);
        }
    });
}
module.exports = {
    getUserPlaylists,
    removeLikedPlaylist,
    addLikedPlaylist,
    addToRecentlyPlayed,
    getUserRecentPlaylists
};
//# sourceMappingURL=userPlaylists.service.js.map