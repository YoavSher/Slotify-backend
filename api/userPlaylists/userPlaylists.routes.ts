export { }
const express = require('express')
const router = express.Router()

const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { likePlaylistByUser, removeLikedPlaylist, getUsersLikedPlaylists, addToRecentlyPlayed, getUserRecentPlaylists } = require('./userPlaylists.controller')



router.get('/:id', requireAuth, getUsersLikedPlaylists)
router.post('/', requireAuth, likePlaylistByUser)
router.delete('/:id', requireAuth, removeLikedPlaylist)
router.post('/recent/', requireAuth, addToRecentlyPlayed)
router.get('/recent/:id', requireAuth, getUserRecentPlaylists)



module.exports = router