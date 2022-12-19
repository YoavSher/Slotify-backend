import { Song } from "../../interfaces/song"

const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')
const songService = require('../song/song.service')


async function getUserSongs(userId: number) {
    try {
        const query = `SELECT addedAt,videoId,title,artist,image,duration
        FROM usersLikedSongs
        INNER JOIN songs
        ON songs.videoId=usersLikedSongs.songId
        WHERE userId=${userId};`


        const likedSongs = await sqlService.runSQL(query)
        return likedSongs
    } catch (err) {
        console.log(err)
    }
}

async function addLikedSong(userId: number, song: Song) {
    try {

        const isSongInDB = await songService.addSong(song)
        const query = `INSERT INTO usersLikedSongs (userId,songId,addedAt)
        values(${userId},'${song.videoId}','${Date.now()}');`
        await sqlService.runSQL(query)
        return true
    } catch (err) {
        throw err
    }
}
async function removeLikedSong(userId: number, songId: string) {
    try {
        const query = `DELETE FROM usersLikedSongs WHERE
         songId='${songId}' AND userId=${userId};`
        await sqlService.runSQL(query)
        return true
    } catch (err) {
        throw err
    }
}


module.exports = {
    getUserSongs,
    addLikedSong,
    removeLikedSong
}