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
const sqlService = require('../../services/db.service');
function getSongs(playlistId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT videoId,title,artist,image,duration,addedAt
        FROM playlistSongs
        INNER JOIN songs
        ON songs.videoId=playlistSongs.songId
        WHERE playlistId=${playlistId}
        ORDER BY idx;`;
            const playlistSongs = yield sqlService.runSQL(query);
            return playlistSongs;
        }
        catch (err) {
            console.log(err);
        }
    });
}
function addPlaylistSong({ videoId, playlistId, idx, addedAt }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO playlistSongs( playlistId, songId,addedAt,idx)
                VALUES (${playlistId},'${videoId}','${addedAt}',${idx});`;
            const action = yield sqlService.runSQL(query);
            return action.affectedRows === 1;
        }
        catch (err) {
            throw err;
        }
    });
}
function removeFromPlaylist(removedSong) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { videoId, playlistId, idx } = removedSong;
            const updateSongsIdxQuery = `UPDATE playlistSongs
        SET idx = idx - 1
        WHERE playlistId = ${playlistId} AND idx > ${idx - 1}`;
            yield sqlService.runSQL(updateSongsIdxQuery);
            const deleteQuery = `DELETE FROM playlistSongs WHERE
        songId='${videoId}' AND playlistId=${playlistId}`;
            sqlService.runSQL(deleteQuery);
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
function reIndex(reIndexInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { playlistId, videoId, sourceIdx, destinationIdx } = reIndexInfo;
        try {
            if (sourceIdx > destinationIdx) {
                const incrementIdxsQuery = `UPDATE playlistSongs
             SET idx= idx + 1 
             WHERE playlistId =${playlistId}
              AND idx>=${destinationIdx}
               AND idx <${sourceIdx};`;
                yield sqlService.runSQL(incrementIdxsQuery);
            }
            else {
                const decrementIdxsQuery = `UPDATE playlistSongs 
            SET idx= idx -1 
            WHERE playlistId =${playlistId}
            AND idx<=${destinationIdx}
            AND idx >${sourceIdx}`;
                yield sqlService.runSQL(decrementIdxsQuery);
            }
            const moveSongQuery = `UPDATE playlistSongs
           SET idx = ${destinationIdx}
           WHERE playlistId=${playlistId} 
           AND songId ='${videoId}';
           `;
            yield sqlService.runSQL(moveSongQuery);
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
module.exports = {
    getSongs,
    addPlaylistSong,
    removeFromPlaylist,
    reIndex
};
//# sourceMappingURL=playlistSongs.service.js.map