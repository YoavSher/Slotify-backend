"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const songService = require('./userSongs.service');
const asyncLocalStorage = require('../../services/als.service');
async function getUsersLikedSongs(req, res) {
    try {
        const userId = req.params.id;
        const likedSongs = await songService.getUserSongs(userId);
        res.json(likedSongs);
    }
    catch (err) {
        logger.error('Failed to add songs', err);
        res.status(500).send({ err: 'Failed to add songs' });
    }
}
async function likeSongByUser(req, res) {
    try {
        const { song } = req.body;
        const { loggedinUser } = asyncLocalStorage.getStore();
        const isLiked = await songService.addLikedSong(loggedinUser._id, song);
        if (isLiked)
            res.json('sucsess');
    }
    catch (err) {
        logger.error('Failed to add songs', err);
        res.status(500).send({ err: 'Failed to add songs' });
    }
}
async function removeLikedSong(req, res) {
    try {
        const videoId = req.params.id;
        const { loggedinUser } = asyncLocalStorage.getStore();
        const isDeleted = await songService.removeLikedSong(loggedinUser._id, videoId);
        if (isDeleted)
            res.json('success');
    }
    catch (err) {
        logger.error('Failed to remove songs', err);
        res.status(500).send({ err: 'Failed to remove songs' });
    }
}
module.exports = {
    getUsersLikedSongs,
    likeSongByUser,
    removeLikedSong
};
//# sourceMappingURL=userSongs.controller.js.map