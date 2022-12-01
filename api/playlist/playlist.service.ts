import { Playlist } from "../../interfaces/playlist"
const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')


async function query() {

}
// const newPlaylist = {
//     name: 'New Playlist',
//     imgUrl: 'https://thumbs.dreamstime.com/b/music-background-panorama-13786355.jpg',
//     tags: [],
//     creatorId: 1,
//     likedByUsers: [],
//     songs: []
// } as Playlist

async function add(userId: string) {
    try {

        const query = `INSERT INTO playlists (name, image, creatorId)
        VALUES ('New Playlist','https://thumbs.dreamstime.com/b/music-background-panorama-13786355.jpg',
        '${userId}')`
        sqlService.runSQL(query)
    } catch (err) {
        logger.error('cannot add board', err)
        throw err
    }
}





module.exports = {
    // query,
    // remove,
    add,
    // getById,
    // update
}