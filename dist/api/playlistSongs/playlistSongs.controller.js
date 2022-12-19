"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const songService = require('./playlistSongs.service');
async function getPlaylistSongs(req, res) {
    try {
        const playlistId = req.params.id;
        const playlistSongs = await songService.getSongs(playlistId);
        res.json(playlistSongs);
    }
    catch (err) {
        logger.error('Failed to add songs', err);
        res.status(500).send({ err: 'Failed to add songs' });
    }
}
async function addPlaylistSong(req, res) {
    try {
        const playlistSong = req.body;
        const isSong = await songService.addPlaylistSong(playlistSong);
        if (isSong)
            res.json('success');
        else
            throw new Error('Cannot add song,try again later');
    }
    catch (err) {
        logger.error('Failed to add songs', err);
        res.status(500).send({ err: 'Failed to add songs' });
        // maybe should do something more extreme if it fails
    }
}
async function removeFromPlaylist(req, res) {
    try {
        const isDeleted = await songService.removeFromPlaylist(req.body);
        if (isDeleted)
            res.json('success');
        else
            throw new Error('Cannot delete song,try again later');
    }
    catch (err) {
        logger.error('Failed to remove song', err);
        res.status(500).send({ err: 'Failed to remove song' });
    }
}
async function reIndexSongs(req, res) {
    try {
        // console.log('req.body:', req.body)
        const isReOrdered = await songService.reIndex(req.body);
        if (isReOrdered)
            res.json('success');
    }
    catch (err) {
        logger.error('Failed to reIndex', err);
        res.status(500).send({ err: 'Failed to reIndex' });
    }
}
module.exports = {
    getPlaylistSongs,
    addPlaylistSong,
    removeFromPlaylist,
    reIndexSongs
};
//# sourceMappingURL=playlistSongs.controller.js.map