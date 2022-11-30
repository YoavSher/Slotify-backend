const express = require('express')
const router = express.Router()


const { addSongs, getUsersLikedSongs, likeSongByUser } = require('./song.controller')

router.post('/', addSongs)  //requireAuth
router.get('/user/:id', getUsersLikedSongs)  //requireAuth
router.post('/user', likeSongByUser)  //requireAuth



module.exports = router