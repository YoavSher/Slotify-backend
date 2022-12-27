"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const songService = require('./song.service');
async function addSongs(req, res) {
    try {
        const songs = req.body;
        const addedSongs = await songService.add(songs);
    }
    catch (err) {
        logger.error('Failed to add songs', err);
        res.status(500).send({ err: 'Failed to add songs' });
    }
}
async function getSearchedSongs(req, res) {
    try {
        const { searchTerm } = req.params;
        const songs = await songService.getSearchedSongs(searchTerm);
        res.send(songs);
    }
    catch (err) {
        logger.error('Failed to get searched songs', err);
        res.status(500).send({ err: 'Failed to get searched songs' });
    }
}
module.exports = {
    addSongs,
    getSearchedSongs
};
//# sourceMappingURL=song.controller.js.map