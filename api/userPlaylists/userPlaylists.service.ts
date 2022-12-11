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
        const playlists = await sqlService.runSQL(query)
        return playlists
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

async function addToRecentlyPlayed(userId: number, playlistId: number) {
    try {
        let query = `SELECT * FROM recentlyPlayedPlaylists WHERE userId=${userId};`
        let toRemove = false
        const recentlyPlayed = await sqlService.runSQL(query)
        const currPlaylist = recentlyPlayed.find((playlist: any) => playlist.playlistId === playlistId) // make it not any.
        if (currPlaylist) {
            query = `UPDATE recentlyPlayedPlaylists SET addedAt='${Date.now()}'
             WHERE playlistId=${playlistId} AND userId=${userId};`
            if (recentlyPlayed.length > 6) toRemove = true
            // if i am updating there is no chance i should have to remove
        } else {
            query = `INSERT INTO recentlyPlayedPlaylists(playlistId, userId, addedAt)
            values(${playlistId},${userId}, '${Date.now()}');`
            if (recentlyPlayed.length > 5) toRemove = true
        }
        await sqlService.runSQL(query)
        if (toRemove) {
            let addedFirst = { addedAt: Infinity, userId: 0, playlistId: 0 }
            recentlyPlayed.forEach((playlist: any) => {
                if (+playlist.addedAt < +addedFirst.addedAt) addedFirst = playlist
            })
            query = `DELETE FROM recentlyPlayedPlaylists 
            WHERE userId=${addedFirst.userId} and playlistId=${addedFirst.playlistId}`
            await sqlService.runSQL(query)
        }
    } catch (err) {
        throw err
    }
}

async function getUserRecentPlaylists(userId: number) {
    try {
        const query = `SELECT _id,name,image,creatorId
        FROM recentlyPlayedPlaylists
        INNER JOIN playlists
        ON playlists._id=recentlyPlayedPlaylists.playlistId
        WHERE userId=${userId};`
        const recentPlaylists = await sqlService.runSQL(query)
        return recentPlaylists
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getUserPlaylists,
    removeLikedPlaylist,
    addLikedPlaylist,
    addToRecentlyPlayed,
    getUserRecentPlaylists

}