import { Playlist } from "../../interfaces/playlist"
const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')
const usersPlaylistsService = require('../userPlaylists/userPlaylists.service')

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
        const { _id, creatorId } = newPlaylist
        await usersPlaylistsService.addLikedPlaylist(creatorId, _id)
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


async function searchPlaylists(songsId: string, searchTerm: string) {
    try {
        const songsIds = songsId.split(',')
        let query = `SELECT DISTINCT _id,name,image,creatorId FROM playlistSongs
        INNER JOIN playlists
        ON playlists._id = playlistSongs.playlistId
        WHERE name LIKE '%${searchTerm}%'`
        let idsStr = ''
        songsIds.forEach(id => idsStr += ` OR songId = '${id}'`)
        query += idsStr
        const playlist = await sqlService.runSQL(query)
        console.log('playlist:', playlist)
        return playlist
    } catch (err) {
        logger.error('cannot get searched playlist', err)
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    searchPlaylists,
    // getById,
    update
}