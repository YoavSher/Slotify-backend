export { }
const express = require('express')
const router = express.Router()

const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { likePlaylistByUser, removeLikedPlaylist, getUsersLikedPlaylists } = require('./userPlaylists.controller')
// getUsersLikedSongs,


router.get('/:id', requireAuth, getUsersLikedPlaylists)  //requireAuth
router.post('/', requireAuth, likePlaylistByUser)  //requireAuth
router.delete('/:id', requireAuth, removeLikedPlaylist)  //requireAuth



module.exports = router