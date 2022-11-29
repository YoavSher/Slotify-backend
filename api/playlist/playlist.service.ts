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

async function add() {
    try {
        // const collection = await dbService.getCollection('board')
        // await collection.insertOne(board)
        // return board
        sqlService.runSQL(`INSERT INTO playlist (name, imgUrl, tags, creatorId, likedByUsers, songs)
        VALUES ('New Playlist','https://thumbs.dreamstime.com/b/music-background-panorama-13786355.jpg',
        '[]', 1,'[]','[]')`)
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