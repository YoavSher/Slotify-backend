export { }

const express = require('express')
const router = express.Router()

const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getPlaylistSongs, addPlaylistSong, removeFromPlaylist, reIndexSongs } = require('./playlistSongs.controller')


router.get('/:id', getPlaylistSongs)  //requireAuth?
router.post('/', requireAuth, addPlaylistSong)  //requireAuth?
router.put('/:id', requireAuth, reIndexSongs)  //requireAuth?
router.delete('/:playlistId/', requireAuth, removeFromPlaylist)  //requireAuth


module.exports = router