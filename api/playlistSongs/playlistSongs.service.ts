import { PlaylistSong, Song } from "../../interfaces/song"

const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')


async function getSongs(playlistId: number) {
    try {
        const query = `SELECT videoId,title,artist,image,duration,addedAt
        FROM playlistSongs
        INNER JOIN songs
        ON songs.videoId=playlistSongs.songId
        WHERE playlistId=${playlistId}
        ORDER BY idx;`

        const playlistSongs = await sqlService.runSQL(query)
        return playlistSongs
    } catch (err) {
        console.log(err)
    }
}

async function addPlaylistSong({ videoId, playlistId, idx, addedAt }: PlaylistSong) {
    try {
        const query = `INSERT INTO playlistSongs( playlistId, songId,addedAt,idx)
                VALUES (${playlistId},'${videoId}','${addedAt}',${idx});`
        const action = await sqlService.runSQL(query)
        return action.affectedRows === 1
    } catch (err) {
        throw err
    }
}

interface removedSong {
    videoId: string,
    playlistId: number,
    idx: number
}

async function removeFromPlaylist(removedSong: removedSong) {
    try {

        const { videoId, playlistId, idx } = removedSong

        const updateSongsIdxQuery = `UPDATE playlistSongs
        SET idx = idx - 1
        WHERE playlistId = ${playlistId} AND idx > ${idx - 1}`
        await sqlService.runSQL(updateSongsIdxQuery)
        const deleteQuery = `DELETE FROM playlistSongs WHERE
        songId='${videoId}' AND playlistId=${playlistId}`
        sqlService.runSQL(deleteQuery)
        return true // do something with the returning packet
    } catch (err) {
        throw err
    }
}

interface reIndexInfo {
    playlistId: number,
    videoId: string,
    sourceIdx: number,
    destinationIdx: number
}
async function reIndex(reIndexInfo: reIndexInfo) {
    const { playlistId, videoId, sourceIdx, destinationIdx } = reIndexInfo
    try {
        if (sourceIdx > destinationIdx) {
            const incrementIdxsQuery = `UPDATE playlistSongs
             SET idx= idx + 1 
             WHERE playlistId =${playlistId}
              AND idx>=${destinationIdx}
               AND idx <${sourceIdx};`
            await sqlService.runSQL(incrementIdxsQuery)
        } else {
            const decrementIdxsQuery = `UPDATE playlistSongs 
            SET idx= idx -1 
            WHERE playlistId =${playlistId}
            AND idx<=${destinationIdx}
            AND idx >${sourceIdx}`
            await sqlService.runSQL(decrementIdxsQuery)
        }
        const moveSongQuery = `UPDATE playlistSongs
           SET idx = ${destinationIdx}
           WHERE playlistId=${playlistId} 
           AND songId ='${videoId}';
           `
        await sqlService.runSQL(moveSongQuery)

        return true
    } catch (err) {
        throw err
    }
}
//SQLS FOR RE ORDERING A LIST WHEN THE SOURCE IS HIGHER THEN THE TARGET
// 
// UPDATE playlistSongs SET idx= idx + 1 WHERE playlistId =${currplaylistid} AND idx>=${destinationIdx} AND idx <${sourceIdx};
// UPDATE playlistSongs SET idx = destinationIdx WHERE playlistId=1 AND songId ='1w7OgIMMRc4';

// UPDATE playlistSongs SET idx= idx -1  WHERE playlistId =${currplaylistid} AND idx<=${destinationIdx} AND idx >${sourceIdx};
// UPDATE playlistSongs SET idx = destinationIdx WHERE playlistId=1 AND songId ='1w7OgIMMRc4';

// for deleting it should be 

module.exports = {
    getSongs,
    addPlaylistSong,
    removeFromPlaylist,
    reIndex
}