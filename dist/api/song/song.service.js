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
const sqlService = require('../../services/db.service');
function add(songs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            songs.forEach(({ videoId, duration, image, artist, title }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `INSERT INTO songs (videoId, title, artist, image,duration)
                VALUES ('${videoId}','${title}','${artist}','${image}',${duration})`;
                    yield sqlService.runSQL(query);
                }
                catch (err) {
                    // logger.error('song already exists', err)
                }
            }));
        }
        catch (err) {
            logger.error('cannot add song', err);
        }
    });
}
function getSearchedSongs(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM songs 
        WHERE artist LIKE '%${searchTerm}%'
        OR title LIKE '%${searchTerm}%' `;
            const searchedSongs = yield sqlService.runSQL(query);
            const songs = [...searchedSongs].slice(0, 20);
            // console.log('songs:', songs)
            return songs;
        }
        catch (err) {
            logger.error('cannot get songs', err);
        }
    });
}
module.exports = {
    add,
    getSearchedSongs
};
//# sourceMappingURL=song.service.js.map