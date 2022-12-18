"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const userPlaylistsService = require('./userPlaylists.service');
const asyncLocalStorage = require('../../services/als.service');
async function getUsersLikedPlaylists(req, res) {
    try {
        console.log('getting playlists');
        const userId = req.params.id;
        const likedPlaylists = await userPlaylistsService.getUserPlaylists(userId);
        res.json(likedPlaylists);
    }
    catch (err) {
        logger.error('Failed to get user Playlists', err);
        res.status(500).send({ err: 'Failed to get user Playlists' });
    }
}
async function likePlaylistByUser(req, res) {
    try {
        const { playlistId } = req.body;
        const { loggedinUser } = asyncLocalStorage.getStore();
        const isLiked = await userPlaylistsService.addLikedPlaylist(loggedinUser._id, playlistId);
        if (isLiked)
            res.json('sucsess');
    }
    catch (err) {
        logger.error('Failed to add playlist', err);
        res.status(500).send({ err: 'Failed to add playlist' });
    }
}
async function removeLikedPlaylist(req, res) {
    try {
        const playlistId = req.params.id;
        const { loggedinUser } = asyncLocalStorage.getStore();
        const isDeleted = await userPlaylistsService.removeLikedPlaylist(loggedinUser._id, playlistId);
        if (isDeleted)
            res.json('success');
    }
    catch (err) {
        logger.error('Failed to remove playlist', err);
        res.status(500).send({ err: 'Failed to remove playlist' });
    }
}
async function addToRecentlyPlayed(req, res) {
    try {
        const { playlistId } = req.body;
        const { loggedinUser } = asyncLocalStorage.getStore();
        await userPlaylistsService.addToRecentlyPlayed(loggedinUser._id, playlistId);
    }
    catch (err) {
        logger.error('Failed to add playlist to recently played', err);
    }
}
async function getUserRecentPlaylists(req, res) {
    try {
        const userId = req.params.id;
        const recentPlaylists = await userPlaylistsService.getUserRecentPlaylists(userId);
        res.json(recentPlaylists);
    }
    catch (err) {
        logger.error('Failed to get playlists', err);
    }
}
module.exports = {
    likePlaylistByUser,
    removeLikedPlaylist,
    getUsersLikedPlaylists,
    addToRecentlyPlayed,
    getUserRecentPlaylists
};
//# sourceMappingURL=userPlaylists.controller.js.map