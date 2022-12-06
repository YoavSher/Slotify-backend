export{}

const express = require('express')
const router = express.Router()

const { getPlaylistSongs ,addPlaylistSong,removeFromPlaylist,reIndexSongs} = require('./playlistSongs.controller')


router.post('/', addPlaylistSong)  //requireAuth?
router.get('/:id', getPlaylistSongs)  //requireAuth?
router.put('/:id', reIndexSongs)  //requireAuth?
router.delete('/:playlistId/:songId', removeFromPlaylist)  //requireAuth


module.exports = router