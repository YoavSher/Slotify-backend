import { Playlist } from "../../interfaces/playlist"
const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')
const usersPlaylistsService = require('../userPlaylists/userPlaylists.service')
const playlistSongsService = require('../playlistSongs/playlistSongs.service')

async function query() {

    try {
        const query = `SELECT playlists._id, name, image, creatorId, fullName FROM playlists
        INNER JOIN users
        ON users._id = playlists.creatorId
        LIMIT 35`
        const playlists = await sqlService.runSQL(query)
        return playlists
    } catch (err) {
        logger.error('cannot find playlists', err)
        throw err
    }

}

async function getById(id: number) {
    try {
        const query = `SELECT playlists._id, name, image, creatorId, fullName FROM playlists
        INNER JOIN users
        ON users._id = playlists.creatorId
        WHERE playlists._id = ${id}`
        const [playlist] = await sqlService.runSQL(query)
        const songs = await playlistSongsService.getSongs(id)
        return { playlist, songs }
    } catch (err) {
        logger.error('cannot find playlist', err)
        throw err
    }
}

async function add(userId: string) {

    try {

        const query = `INSERT INTO playlists (name, image, creatorId)
        VALUES ('New Playlist','https://thumbs.dreamstime.com/b/music-background-panorama-13786355.jpg',
        '${userId}')`
        await sqlService.runSQL(query)
        let res = await sqlService.runSQL(`SELECT playlists._id AS _id, name, image, creatorId, fullName FROM playlists
        INNER JOIN users
        ON users._id = playlists.creatorId
        WHERE playlists._id =LAST_INSERT_ID()`)

        if (res.length === 0) {
            // console.log('trying again');
            res = await sqlService.runSQL(`SELECT playlists._id AS _id, name, image, creatorId, fullName FROM playlists
            INNER JOIN users
            ON users._id = playlists.creatorId
            WHERE playlists._id =LAST_INSERT_ID()`)
        }

        const [newPlaylist] = res
        const { _id, creatorId } = newPlaylist
        await usersPlaylistsService.addLikedPlaylist(creatorId, _id)
        console.log('success');
        return newPlaylist
    } catch (err) {
        logger.error('cannot add playlist', err)
        throw err
    }
}

async function update(playlist: Playlist) {
    try {
        const { _id, name, image } = playlist
        const query = `UPDATE playlists 
            SET name = '${name}', image='${image}'
            WHERE _id = ${_id}`
        const updatedPlaylist = await sqlService.runSQL(query)
    } catch (err) {
        logger.error('cannot update playlist', err)
        throw err
    }

}

async function remove(playlistId: number) {
    try {

        const deleteUserPlaylistQuery = `DELETE FROM usersLikedPlaylists WHERE
        playlistId=${playlistId}`
        await sqlService.runSQL(deleteUserPlaylistQuery)

        const deleteRecentPlaylistQuery = `DELETE FROM recentlyPlayedPlaylists 
        WHERE playlistId=${playlistId}`

        await sqlService.runSQL(deleteRecentPlaylistQuery)

        const deleteSongPlaylistQuery = `DELETE FROM playlistSongs WHERE
        playlistId=${playlistId}`
        await sqlService.runSQL(deleteSongPlaylistQuery)

        const deletePlaylistsQuery = `DELETE FROM playlists 
                        WHERE _id = ${playlistId}`
        const queryInfo = await sqlService.runSQL(deletePlaylistsQuery)
        return queryInfo.affectedRows === 1

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
        return playlist
    } catch (err) {
        logger.error('cannot get searched playlist', err)
        throw err
    }
}

async function getGenrePlaylists(genre: string) {
    try {

        const query = `SELECT playlistId AS _id,name,image,creatorId,fullName FROM genrePlaylists
        INNER JOIN playlists
        ON genrePlaylists.playlistId = playlists._id
        INNER JOIN users
        ON users._id = playlists.creatorId
        WHERE genre = '${genre.toLocaleLowerCase()}'`
        const playlists = await sqlService.runSQL(query)
        return playlists
    } catch (err) {
        logger.error('cannot get genre playlists', err)
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    searchPlaylists,
    getById,
    update,
    getGenrePlaylists
}