export { }
const express = require('express')
const router = express.Router()

const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getUsersLikedSongs, likeSongByUser, removeLikedSong } = require('./userSongs.controller')



router.get('/:id', getUsersLikedSongs)  //requireAuth
router.post('/', requireAuth, likeSongByUser)  //requireAuth
router.delete('/:id', requireAuth, removeLikedSong)  //requireAuth



module.exports = router