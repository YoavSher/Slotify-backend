const express = require('express')
const router = express.Router()


const { addSongs, getUsersLikedSongs, likeSongByUser, removeLikedSong } = require('./song.controller')

router.post('/', addSongs)  //requireAuth
router.get('/user/:id', getUsersLikedSongs)  //requireAuth
router.post('/user', likeSongByUser)  //requireAuth
router.delete('/user/:id', removeLikedSong)  //requireAuth



module.exports = router