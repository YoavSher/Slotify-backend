import { PlaylistSong, Song } from "../../interfaces/song"

const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')



async function getUserPlaylists(userId: number) {
    try {
        const query = `SELECT _id,name,image,creatorId
        FROM usersLikedPlaylists
        INNER JOIN playlists
        ON playlists._id=usersLikedPlaylists.playlistId
        WHERE userId=${userId};`
        const likedSongs = await sqlService.runSQL(query)
        return likedSongs
    } catch (err) {
        console.log(err)
    }
}

async function addLikedPlaylist(userId: number, playlistId: number) {
    try {
        const query = `INSERT INTO usersLikedPlaylists (userId,playlistId)
        values(${userId},${playlistId});`
        const action = await sqlService.runSQL(query)
        return action.affectedRows === 1
    } catch (err) {
        throw err
    }
}
async function removeLikedPlaylist(userId: number, playlistId: number) {
    try {
        const query = `DELETE FROM usersLikedPlaylists WHERE
         playlistId=${playlistId} AND userId=${userId};`
        const action = await sqlService.runSQL(query)
        return action.affectedRows === 1
    } catch (err) {
        throw err
    }
}


module.exports = {
    getUserPlaylists,
    removeLikedPlaylist,
    addLikedPlaylist
}