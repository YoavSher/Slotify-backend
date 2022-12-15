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
function getUserSongs(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT addedAt,videoId,title,artist,image,duration
        FROM usersLikedSongs
        INNER JOIN songs
        ON songs.videoId=usersLikedSongs.songId
        WHERE userId=${userId};`;
            const likedSongs = yield sqlService.runSQL(query);
            return likedSongs;
        }
        catch (err) {
            console.log(err);
        }
    });
}
function addLikedSong(userId, songId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO usersLikedSongs (userId,songId,addedAt)
        values(${userId},'${songId}','${Date.now()}');`;
            yield sqlService.runSQL(query);
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
function removeLikedSong(userId, songId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `DELETE FROM usersLikedSongs WHERE
         songId='${songId}' AND userId=${userId};`;
            yield sqlService.runSQL(query);
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
module.exports = {
    getUserSongs,
    addLikedSong,
    removeLikedSong
};
//# sourceMappingURL=userSongs.service.js.map