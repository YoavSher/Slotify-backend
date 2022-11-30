import { Song } from "../../interfaces/song"

const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')



async function add(songs: Song[]) {
    console.log('songs:', songs)
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
        WHERE userId=${userId};`

        const likedSongs = await sqlService.runSQL(query)
        return likedSongs
    } catch (err) {
        console.log(err)
    }
}




module.exports = {
    add,
    getUserSongs
}