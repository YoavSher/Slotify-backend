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
const songService = require('./userSongs.service');
const asyncLocalStorage = require('../../services/als.service');
function getUsersLikedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const likedSongs = yield songService.getUserSongs(userId);
            res.json(likedSongs);
        }
        catch (err) {
            logger.error('Failed to add songs', err);
            res.status(500).send({ err: 'Failed to add songs' });
        }
    });
}
function likeSongByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { videoId } = req.body;
            const { loggedinUser } = asyncLocalStorage.getStore();
            const isLiked = yield songService.addLikedSong(loggedinUser._id, videoId);
            if (isLiked)
                res.json('sucsess');
        }
        catch (err) {
            logger.error('Failed to add songs', err);
            res.status(500).send({ err: 'Failed to add songs' });
        }
    });
}
function removeLikedSong(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params);
            const videoId = req.params.id;
            const { loggedinUser } = asyncLocalStorage.getStore();
            const isDeleted = yield songService.removeLikedSong(loggedinUser._id, videoId);
            if (isDeleted)
                res.json('success');
        }
        catch (err) {
            logger.error('Failed to remove songs', err);
            res.status(500).send({ err: 'Failed to remove songs' });
        }
    });
}
module.exports = {
    getUsersLikedSongs,
    likeSongByUser,
    removeLikedSong
};
//# sourceMappingURL=userSongs.controller.js.map