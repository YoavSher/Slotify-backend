"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { addPlaylist, getPlaylists, updatePlaylist, getGenrePlaylists, removePlaylist, getSearchedPlaylist, getPlaylistById } = require('./playlist.controller');
router.get('/', getPlaylists);
router.get('/:id', getPlaylistById);
router.get('/genre/:genre', getGenrePlaylists);
router.get('/search/:searchTerm/:songsIds', getSearchedPlaylist);
router.post('/', requireAuth, addPlaylist);
router.put('/:id', requireAuth, updatePlaylist);
router.delete('/:id', requireAuth, removePlaylist);
module.exports = router;
//# sourceMappingURL=playlist.routes.js.map