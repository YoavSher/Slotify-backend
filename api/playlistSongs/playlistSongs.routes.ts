export{}

const express = require('express')
const router = express.Router()

const { getPlaylistSongs ,addPlaylistSong,removeFromPlaylist} = require('./playlistSongs.controller')


router.post('/', addPlaylistSong)  //requireAuth?
router.get('/:id', getPlaylistSongs)  //requireAuth?
router.delete('/:playlistId/:songId', removeFromPlaylist)  //requireAuth


module.exports = router