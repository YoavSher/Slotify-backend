import { Playlist } from "../../interfaces/playlist"
const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')


async function query() {
    try {
        const query = `SELECT playlists._id, name, image, creatorId, fullName FROM playlists
        INNER JOIN users
        ON users._id = playlists.creatorId`
        const playlists = await sqlService.runSQL(query)
        return playlists
    } catch (err) {
        logger.error('cannot find playlists', err)
        throw err
    }

}

async function add(userId: string) {
    try {

        const query = `INSERT INTO playlists (name, image, creatorId)
        VALUES ('New Playlist','https://thumbs.dreamstime.com/b/music-background-panorama-13786355.jpg',
        '${userId}')`
        await sqlService.runSQL(query)
        const [newPlaylist] = await sqlService.runSQL(`SELECT * FROM playlists WHERE _id=LAST_INSERT_ID()`)
        console.log('newPlaylist:', newPlaylist)
        return newPlaylist
    } catch (err) {
        logger.error('cannot add playlist', err)
        throw err
    }
}

async function update(playlist: Playlist) {
    try {
        // console.log('playlist:', playlist)
        const { _id, name, image } = playlist
        const query = `UPDATE playlists 
            SET name = '${name}', image='${image}'
            WHERE _id = ${_id}`
        await sqlService.runSQL(query)
    } catch (err) {
        logger.error('cannot update playlist', err)
        throw err
    }

}

async function remove(playlistId: number) {
    try {
        // console.log('playlist:', playlist)

        const query = `DELETE FROM playlists 
                        WHERE _id = ${playlistId}`
        await sqlService.runSQL(query)
    } catch (err) {
        logger.error('cannot delete playlist', err)
        throw err
    }
}


module.exports = {
    query,
    remove,
    add,
    // getById,
    update
}