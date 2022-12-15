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
const songService = require('./playlistSongs.service');
function getPlaylistSongs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlistId = req.params.id;
            const playlistSongs = yield songService.getSongs(playlistId);
            res.json(playlistSongs);
        }
        catch (err) {
            logger.error('Failed to add songs', err);
            res.status(500).send({ err: 'Failed to add songs' });
        }
    });
}
function addPlaylistSong(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlistSong = req.body;
            const isSong = yield songService.addPlaylistSong(playlistSong);
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
    });
}
function removeFromPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isDeleted = yield songService.removeFromPlaylist(req.body);
            if (isDeleted)
                res.json('success');
            else
                throw new Error('Cannot delete song,try again later');
        }
        catch (err) {
            logger.error('Failed to remove song', err);
            res.status(500).send({ err: 'Failed to remove song' });
        }
    });
}
function reIndexSongs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log('req.body:', req.body)
            const isReOrdered = yield songService.reIndex(req.body);
            if (isReOrdered)
                res.json('success');
        }
        catch (err) {
            logger.error('Failed to reIndex', err);
            res.status(500).send({ err: 'Failed to reIndex' });
        }
    });
}
module.exports = {
    getPlaylistSongs,
    addPlaylistSong,
    removeFromPlaylist,
    reIndexSongs
};
//# sourceMappingURL=playlistSongs.controller.js.map