"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const playlistService = require('./playlist.service');
const authService = require('../auth/auth.service');
const asyncLocalStorage = require('../../services/als.service');
async function getPlaylists(req, res) {
    try {
        const playlists = await playlistService.query();
        res.send(playlists);
    }
    catch (err) {
        logger.error('Cannot get playlists', err);
        res.status(500).send({ err: 'Failed to get playlists' });
    }
}
async function getPlaylistById(req, res) {
    try {
        const { id } = req.params;
        const fullPlaylist = await playlistService.getById(id);
        res.send(fullPlaylist);
    }
    catch (err) {
        logger.error('Cannot get playlist', err);
        res.status(500).send({ err: 'Failed to get playlist' });
    }
}
async function addPlaylist(req, res) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore();
        const addedPlaylist = await playlistService.add(loggedinUser._id);
        res.json(addedPlaylist);
    }
    catch (err) {
        logger.error('Failed to add playlist', err);
        res.status(500).send({ err: 'Failed to add playlist' });
    }
}
async function updatePlaylist(req, res) {
    try {
        const playlist = req.body;
        await playlistService.update(playlist);
    }
    catch (err) {
        logger.error('Failed to update playlist', err);
        res.status(500).send({ err: 'Failed to update playlist' });
    }
}
async function removePlaylist(req, res) {
    try {
        const playlistId = req.params.id;
        const info = await playlistService.remove(playlistId);
        res.send(info);
    }
    catch (err) {
        logger.error('Failed to remove playlist', err);
        res.status(500).send({ err: 'Failed to remove playlist' });
    }
}
async function getSearchedPlaylist(req, res) {
    try {
        const { searchTerm, songsIds } = req.params;
        const playlist = await playlistService.searchPlaylists(songsIds, searchTerm);
        res.send(playlist);
    }
    catch (err) {
        logger.error('Failed to get playlists', err);
        res.status(500).send({ err: 'Failed to get playlists' });
    }
}
async function getGenrePlaylists(req, res) {
    try {
        const { genre } = req.params;
        const playlists = await playlistService.getGenrePlaylists(genre);
        res.send(playlists);
    }
    catch (err) {
        logger.error('Failed to get genre playlists', err);
        res.status(500).send({ err: 'Failed to get genre playlists' });
    }
}
module.exports = {
    getPlaylists,
    getPlaylistById,
    addPlaylist,
    updatePlaylist,
    removePlaylist,
    getSearchedPlaylist,
    getGenrePlaylists
};
//# sourceMappingURL=playlist.controller.js.map