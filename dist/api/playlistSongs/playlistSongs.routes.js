"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { getPlaylistSongs, addPlaylistSong, removeFromPlaylist, reIndexSongs } = require('./playlistSongs.controller');
router.get('/:id', getPlaylistSongs);
router.post('/', requireAuth, addPlaylistSong);
router.put('/:id', requireAuth, reIndexSongs);
router.delete('/:playlistId/', requireAuth, removeFromPlaylist);
module.exports = router;
//# sourceMappingURL=playlistSongs.routes.js.map