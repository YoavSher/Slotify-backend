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
const songService = require('./song.service');
function addSongs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const songs = req.body;
            const addedSongs = yield songService.add(songs);
        }
        catch (err) {
            logger.error('Failed to add songs', err);
            res.status(500).send({ err: 'Failed to add songs' });
        }
    });
}
function getSearchedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log('params:', req.params)
            const { searchTerm } = req.params;
            const songs = yield songService.getSearchedSongs(searchTerm);
            res.send(songs);
        }
        catch (err) {
            logger.error('Failed to get searched songs', err);
            res.status(500).send({ err: 'Failed to get searched songs' });
        }
    });
}
module.exports = {
    addSongs,
    getSearchedSongs
};
//# sourceMappingURL=song.controller.js.map