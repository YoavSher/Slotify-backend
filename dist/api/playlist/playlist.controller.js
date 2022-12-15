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
const playlistService = require('./playlist.service');
const authService = require('../auth/auth.service');
const asyncLocalStorage = require('../../services/als.service');
function getPlaylists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlists = yield playlistService.query();
            res.send(playlists);
        }
        catch (err) {
            logger.error('Cannot get playlists', err);
            res.status(500).send({ err: 'Failed to get playlists' });
        }
    });
}
function getPlaylistById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log('req.params:', req.params)
            const { id } = req.params;
            const fullPlaylist = yield playlistService.getById(id);
            res.send(fullPlaylist);
        }
        catch (err) {
            logger.error('Cannot get playlist', err);
            res.status(500).send({ err: 'Failed to get playlist' });
        }
    });
}
function addPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const playlist = req.body
            const { loggedinUser } = asyncLocalStorage.getStore();
            const addedPlaylist = yield playlistService.add(loggedinUser._id);
            res.json(addedPlaylist);
        }
        catch (err) {
            logger.error('Failed to add playlist', err);
            res.status(500).send({ err: 'Failed to add playlist' });
        }
    });
}
function updatePlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlist = req.body;
            // console.log('playlist:', playlist)
            yield playlistService.update(playlist);
            // res.json(addedPlaylist)
        }
        catch (err) {
            logger.error('Failed to update playlist', err);
            res.status(500).send({ err: 'Failed to update playlist' });
        }
    });
}
function removePlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlistId = req.params.id;
            const info = yield playlistService.remove(playlistId);
            res.send(info);
        }
        catch (err) {
            logger.error('Failed to remove playlist', err);
            res.status(500).send({ err: 'Failed to remove playlist' });
        }
    });
}
function getSearchedPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('req.params:', req.params);
            const { searchTerm, songsIds } = req.params;
            const playlist = yield playlistService.searchPlaylists(songsIds, searchTerm);
            // console.log('playlist:', playlist)
            res.send(playlist);
        }
        catch (err) {
            logger.error('Failed to get playlists', err);
            res.status(500).send({ err: 'Failed to get playlists' });
        }
    });
}
module.exports = {
    getPlaylists,
    getPlaylistById,
    addPlaylist,
    updatePlaylist,
    removePlaylist,
    getSearchedPlaylist
};
//# sourceMappingURL=playlist.controller.js.map