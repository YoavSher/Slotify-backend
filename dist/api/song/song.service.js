"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const sqlService = require('../../services/db.service');
async function add(songs) {
    try {
        songs.forEach(async ({ videoId, duration, image, artist, title }) => {
            try {
                const query = `INSERT INTO songs (videoId, title, artist, image,duration)
                VALUES ('${videoId}','${title}','${artist}','${image}',${duration})`;
                await sqlService.runSQL(query);
            }
            catch (err) {
                logger.error('song already exists', err);
            }
        });
    }
    catch (err) {
        logger.error('cannot add song', err);
    }
}
async function getSearchedSongs(searchTerm) {
    try {
        const query = `SELECT * FROM songs 
        WHERE artist LIKE '%${searchTerm}%'
        OR title LIKE '%${searchTerm}%' `;
        const searchedSongs = await sqlService.runSQL(query);
        const songs = [...searchedSongs].slice(0, 20);
        // console.log('songs:', songs)
        return songs;
    }
    catch (err) {
        logger.error('cannot get songs', err);
    }
}
async function addSong(song) {
    try {
        const { videoId, duration, image, artist, title } = song;
        const query = `INSERT IGNORE INTO songs (videoId, title, artist, image,duration)
                    VALUES ('${videoId}','${title}','${artist}','${image}',${duration})`;
        const ans = await sqlService.runSQL(query);
        return;
    }
    catch (err) {
        logger.error('cannot add song', err);
    }
}
module.exports = {
    add,
    getSearchedSongs,
    addSong
};
//# sourceMappingURL=song.service.js.map