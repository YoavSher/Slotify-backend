import { PlaylistSong, Song } from "../../interfaces/song"

const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')



async function add(songs: Song[]) {
    try {
        songs.forEach(async ({ videoId, duration, image, artist, title }) => {
            try {
                const query = `INSERT INTO songs (videoId, title, artist, image,duration)
                VALUES ('${videoId}','${title}','${artist}','${image}',${duration})`

                await sqlService.runSQL(query)
            } catch (err) {
                logger.error('song already exists', err)
            }
        })
    } catch (err) {
        logger.error('cannot add song', err)
    }
}

async function getUserSongs(userId: number) {
    try {
        const query = `SELECT addedAt,videoId,title,artist,image,duration
        FROM usersLikedSongs
        INNER JOIN songs
        ON songs.videoId=usersLikedSongs.songId
        WHERE userId=${userId}
        ORDER BY addedAt DESC;`

        const likedSongs = await sqlService.runSQL(query)
        return likedSongs
    } catch (err) {
        console.log(err)
    }
}

async function addLikedSong(userId: number, songId: string) {
    try {
        const query = `INSERT INTO usersLikedSongs (userId,songId,addedAt)
        values(${userId},'${songId}','${Date.now()}');`
        await sqlService.runSQL(query)
        return true
    } catch (err) {
        throw err
    }
}
async function removeLikedSong(userId: number, songId: string) {
    try {
        const query = `DELETE FROM usersLikedSongs WHERE
         songId='${songId}' AND userId=${userId};` // one row should be affected
        await sqlService.runSQL(query)
        return true
    } catch (err) {
        throw err
    }
}


async function getPlaylistSongs(playlistId: number) {
    try {
        const query = `SELECT videoId,title,artist,image,duration
        FROM playlistSongs
        INNER JOIN songs
        ON songs.videoId=playlistSongs.songId
        WHERE playlistId=${playlistId};`

        const playlistSongs = await sqlService.runSQL(query)
        return playlistSongs
    } catch (err) {
        console.log(err)
    }
}

async function addPlaylistSong({ videoId, playlistId, idx, addedAt }: PlaylistSong) {
    try {
        const query = `INSERT INTO playlistSongs( playlistId, songId,idx)
        VALUES (${playlistId},'${videoId}',${idx});`
        await sqlService.runSQL(query)
        console.log('added to playlist!')
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
    add,
    getUserSongs,
    addLikedSong,
    removeLikedSong,
    getPlaylistSongs,
    addPlaylistSong
}