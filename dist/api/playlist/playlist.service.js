"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const sqlService = require('../../services/db.service');
const usersPlaylistsService = require('../userPlaylists/userPlaylists.service');
const playlistSongsService = require('../playlistSongs/playlistSongs.service');
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT playlists._id, name, image, creatorId, fullName FROM playlists
        INNER JOIN users
        ON users._id = playlists.creatorId`;
            const playlists = yield sqlService.runSQL(query);
            return playlists;
        }
        catch (err) {
            logger.error('cannot find playlists', err);
            throw err;
        }
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT playlists._id, name, image, creatorId, fullName FROM playlists
        INNER JOIN users
        ON users._id = playlists.creatorId
        WHERE playlists._id = ${id}`;
            const [playlist] = yield sqlService.runSQL(query);
            const songs = yield playlistSongsService.getSongs(id);
            return { playlist, songs };
        }
        catch (err) {
            logger.error('cannot find playlist', err);
            throw err;
        }
    });
}
function add(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO playlists (name, image, creatorId)
        VALUES ('New Playlist','https://thumbs.dreamstime.com/b/music-background-panorama-13786355.jpg',
        '${userId}')`;
            yield sqlService.runSQL(query);
            const [newPlaylist] = yield sqlService.runSQL(`SELECT * FROM playlists WHERE _id=LAST_INSERT_ID()`);
            console.log('newPlaylist:', newPlaylist);
            const { _id, creatorId } = newPlaylist;
            yield usersPlaylistsService.addLikedPlaylist(creatorId, _id);
            return newPlaylist;
        }
        catch (err) {
            logger.error('cannot add playlist', err);
            throw err;
        }
    });
}
function update(playlist) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log('playlist:', playlist)
            const { _id, name, image } = playlist;
            const query = `UPDATE playlists 
            SET name = '${name}', image='${image}'
            WHERE _id = ${_id}`;
            yield sqlService.runSQL(query);
        }
        catch (err) {
            logger.error('cannot update playlist', err);
            throw err;
        }
    });
}
function remove(playlistId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log('playlist:', playlist)
            const deleteUserPlaylistQuery = `DELETE FROM usersLikedPlaylists WHERE
        playlistId=${playlistId}`;
            yield sqlService.runSQL(deleteUserPlaylistQuery);
            const deleteRecentPlaylistQuery = `DELETE FROM recentlyPlayedPlaylists 
        WHERE playlistId=${playlistId}`;
            yield sqlService.runSQL(deleteRecentPlaylistQuery);
            const deleteSongPlaylistQuery = `DELETE FROM playlistSongs WHERE
        playlistId=${playlistId}`;
            yield sqlService.runSQL(deleteSongPlaylistQuery);
            const deletePlaylistsQuery = `DELETE FROM playlists 
                        WHERE _id = ${playlistId}`;
            const queryInfo = yield sqlService.runSQL(deletePlaylistsQuery);
            return queryInfo.affectedRows === 1;
        }
        catch (err) {
            logger.error('cannot delete playlist', err);
            throw err;
        }
    });
}
function searchPlaylists(songsId, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const songsIds = songsId.split(',');
            let query = `SELECT DISTINCT _id,name,image,creatorId FROM playlistSongs
        INNER JOIN playlists
        ON playlists._id = playlistSongs.playlistId
        WHERE name LIKE '%${searchTerm}%'`;
            let idsStr = '';
            songsIds.forEach(id => idsStr += ` OR songId = '${id}'`);
            query += idsStr;
            const playlist = yield sqlService.runSQL(query);
            console.log('playlist:', playlist);
            return playlist;
        }
        catch (err) {
            logger.error('cannot get searched playlist', err);
            throw err;
        }
    });
}
module.exports = {
    query,
    remove,
    add,
    searchPlaylists,
    getById,
    update
};
//# sourceMappingURL=playlist.service.js.map