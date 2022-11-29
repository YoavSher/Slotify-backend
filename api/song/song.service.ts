import { Song } from "../../interfaces/song"

const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')



async function add(songs: Song[]) {
    console.log('songs:', songs)
    try {
        songs.forEach(async ({ videoId, duration, image, artist, title }) => {
            try {
                await sqlService.runSQL(`INSERT INTO songs (videoId, title, artist, image,duration)
                VALUES ('${videoId}','${title}','${artist}','${image}',${duration})`)
            } catch (err) {
                logger.error('song already exists', err)
            }
        })
    } catch (err) {
        logger.error('cannot add song', err)
    }
}


module.exports = {
    // query,
    // remove,
    add,
    // getById,
    // update
}