"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlService = require('../../services/db.service');
async function getSongs(playlistId) {
    try {
        const query = `SELECT videoId,title,artist,image,duration,addedAt
        FROM playlistSongs
        INNER JOIN songs
        ON songs.videoId=playlistSongs.songId
        WHERE playlistId=${playlistId}
        ORDER BY idx;`;
        const playlistSongs = await sqlService.runSQL(query);
        return playlistSongs;
    }
    catch (err) {
        console.log(err);
    }
}
async function addPlaylistSong({ videoId, playlistId, idx, addedAt }) {
    try {
        const query = `INSERT INTO playlistSongs( playlistId, songId,addedAt,idx)
                VALUES (${playlistId},'${videoId}','${addedAt}',${idx});`;
        const action = await sqlService.runSQL(query);
        return action.affectedRows === 1;
    }
    catch (err) {
        throw err;
    }
}
async function removeFromPlaylist(removedSong) {
    try {
        const { videoId, playlistId, idx } = removedSong;
        const updateSongsIdxQuery = `UPDATE playlistSongs
        SET idx = idx - 1
        WHERE playlistId = ${playlistId} AND idx > ${idx - 1}`;
        await sqlService.runSQL(updateSongsIdxQuery);
        const deleteQuery = `DELETE FROM playlistSongs WHERE
        songId='${videoId}' AND playlistId=${playlistId}`;
        sqlService.runSQL(deleteQuery);
        return true;
    }
    catch (err) {
        throw err;
    }
}
async function reIndex(reIndexInfo) {
    const { playlistId, videoId, sourceIdx, destinationIdx } = reIndexInfo;
    try {
        if (sourceIdx > destinationIdx) {
            const incrementIdxsQuery = `UPDATE playlistSongs
             SET idx= idx + 1 
             WHERE playlistId =${playlistId}
              AND idx>=${destinationIdx}
               AND idx <${sourceIdx};`;
            await sqlService.runSQL(incrementIdxsQuery);
        }
        else {
            const decrementIdxsQuery = `UPDATE playlistSongs 
            SET idx= idx -1 
            WHERE playlistId =${playlistId}
            AND idx<=${destinationIdx}
            AND idx >${sourceIdx}`;
            await sqlService.runSQL(decrementIdxsQuery);
        }
        const moveSongQuery = `UPDATE playlistSongs
           SET idx = ${destinationIdx}
           WHERE playlistId=${playlistId} 
           AND songId ='${videoId}';
           `;
        await sqlService.runSQL(moveSongQuery);
        return true;
    }
    catch (err) {
        throw err;
    }
}
module.exports = {
    getSongs,
    addPlaylistSong,
    removeFromPlaylist,
    reIndex
};
//# sourceMappingURL=playlistSongs.service.js.map