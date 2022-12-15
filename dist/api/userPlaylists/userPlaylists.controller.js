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
const userPlaylistsService = require('./userPlaylists.service');
const asyncLocalStorage = require('../../services/als.service');
function getUsersLikedPlaylists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('getting playlists');
            const userId = req.params.id;
            const likedPlaylists = yield userPlaylistsService.getUserPlaylists(userId);
            res.json(likedPlaylists);
        }
        catch (err) {
            logger.error('Failed to get user Playlists', err);
            res.status(500).send({ err: 'Failed to get user Playlists' });
        }
    });
}
function likePlaylistByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { playlistId } = req.body;
            const { loggedinUser } = asyncLocalStorage.getStore();
            const isLiked = yield userPlaylistsService.addLikedPlaylist(loggedinUser._id, playlistId);
            if (isLiked)
                res.json('sucsess');
        }
        catch (err) {
            logger.error('Failed to add playlist', err);
            res.status(500).send({ err: 'Failed to add playlist' });
        }
    });
}
function removeLikedPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlistId = req.params.id;
            const { loggedinUser } = asyncLocalStorage.getStore();
            const isDeleted = yield userPlaylistsService.removeLikedPlaylist(loggedinUser._id, playlistId);
            if (isDeleted)
                res.json('success');
        }
        catch (err) {
            logger.error('Failed to remove playlist', err);
            res.status(500).send({ err: 'Failed to remove playlist' });
        }
    });
}
function addToRecentlyPlayed(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { playlistId } = req.body;
            const { loggedinUser } = asyncLocalStorage.getStore();
            yield userPlaylistsService.addToRecentlyPlayed(loggedinUser._id, playlistId);
        }
        catch (err) {
            logger.error('Failed to add playlist to recently played', err);
        }
    });
}
function getUserRecentPlaylists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const recentPlaylists = yield userPlaylistsService.getUserRecentPlaylists(userId);
            res.json(recentPlaylists);
        }
        catch (err) {
            logger.error('Failed to get playlists', err);
        }
    });
}
module.exports = {
    likePlaylistByUser,
    removeLikedPlaylist,
    getUsersLikedPlaylists,
    addToRecentlyPlayed,
    getUserRecentPlaylists
};
//# sourceMappingURL=userPlaylists.controller.js.map